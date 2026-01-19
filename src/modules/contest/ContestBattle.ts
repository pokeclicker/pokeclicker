import type {
    Observable as KnockoutObservable,
    ObservableArray as KnockoutObservableArray,
} from 'knockout';
import Battle from '../battles/Battle';
import ContestOpponentStatus from '../enums/ContestOpponentStatus';
import ContestRank from '../enums/ContestRank';
import ContestType from '../enums/ContestType';
import { SECOND } from '../GameConstants';
import GameHelper from '../GameHelper';
import { MultiplierDecreaser } from '../items/types';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import ContestTypeHelper from '../types/ContestTypeHelper';
import Rand from '../utilities/Rand';
import ContestBattleDefault from './ContestBattleDefault';
import ContestBattlePokemon from './ContestBattlePokemon';
import ContestRunner from './ContestRunner';
import ContestScore from './ContestScore';
import ContestTrainer from './ContestTrainer';
import ContestTrainerList from './ContestTrainerList';
import DevelopmentRequirement from '../requirements/DevelopmentRequirement';

export default class ContestBattle extends Battle {
    // Mechanics
    // Used to generate enemies
    static trainers: KnockoutObservableArray<ContestTrainer> = ko.observableArray(null);
    static pokemons: KnockoutObservableArray<ContestBattlePokemon> = ko.observableArray(null);
    static trainersPartyIndex: KnockoutObservableArray<number> = ko.observableArray(null);
    // Rerolls trainer batch
    static prepareNextTrainerBatch: KnockoutObservable<boolean> = ko.observable(false);
    static lastTrainerRoll = Date.now();
    // Moves used
    static moveArray: KnockoutObservableArray<ContestType[]> = ko.observableArray(null);
    // Which opponent you have access to, usually overlaps with Spotlight status
    static selectedEnemy: KnockoutObservable<number> = ko.observable(0);

    // Gimmicks
    // Hoenn
    static beat: KnockoutObservable<number> = ko.observable(0);
    static totalJamTime: KnockoutObservable<number> = ko.observable(SECOND);
    // Help tab
    static infoBeat: KnockoutObservable<number> = ko.observable(0);
    // Testing
    public static toggleTesting: KnockoutObservable<boolean> = ko.observable(new DevelopmentRequirement().isCompleted());
    public static testAppeal: KnockoutObservable<number> = ko.observable(10);
    public static testTimer: KnockoutObservable<number> = ko.observable(10);

    // Rewards
    public static tokenReward: KnockoutObservable<number> = ko.observable(0);

    public static tick() {
        // Info tab has separate beat cycle
        if (GameHelper.counter % 500 === 0) {
            if (ContestBattle.infoBeat() >= 2) {
                ContestBattle.infoBeat(0);
            } else {
                ContestBattle.infoBeat(ContestBattle.infoBeat() + 1);
            }
        }

        if (ContestBattle.prepareNextTrainerBatch()) {
            // Give some time for players to process results
            const now = Date.now();
            if (now - 500 >= ContestBattle.lastTrainerRoll) {
                // Assess batch completion
                ContestBattle.exciteCrowd();
                // New batch
                ContestBattle.generateNewEnemy();
                ContestBattle.prepareNextTrainerBatch(false);
                ContestBattle.selectedEnemy(0);
            }
            // Keep counter and gimmick ticks from progressing during delay
            ContestBattle.counter = 0;
            return;
        }

        // Gimmicks
        switch (ContestRunner.rank()) {
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
                return ContestBattleDefault.tick();
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
            case ContestRank.Spectacular:
            case ContestRank['Brilliant Shining']:
            default:
                return;
        }
    }

    public static getActiveContestBattlePokemonAppeal() {
        return ContestBattle.testAppeal();
    }

    public static pokemonAppeal() {
        if (!ContestRunner.running()) {
            throw new Error('ContestRunner must be running');
        }

        // increase the audience bar
        let multiplier = 100;
        // Chain bonus
        multiplier += ContestScore.activeChain();
        // frenzy bonus
        if (ContestRunner.frenzyMode()) {
            multiplier += ContestBattle.contestClearedMultiplier();
        }
        // Jam penalty
        if (ContestRunner.jamTime() > 0) {
            multiplier /= 2;
        }
        // convert to single digit
        multiplier /= 100;

        // deal it
        const rallyAppeal = ContestBattle.getActiveContestBattlePokemonAppeal();
        ContestRunner.rally(rallyAppeal * multiplier);
    }

    /**
     * Generates new set of Contest Opponents
     */
    public static generateNewEnemy() {
        // Determine opponents on field
        const opponentAmount =  Math.min(ContestRunner.rank(), 5);
        // Shuffle trainers
        const opponents = Rand.shuffleArray(ContestBattle.getTrainerList().filter(t => !ContestBattle.trainers().some(tr => tr === t)));
        // Create observable arrays
        // Because some trainers have multiple mons, we track trainers in their own array, so we can refer to it for their next pokemon
        ContestBattle.trainers(new Array(opponentAmount).fill(null).map((_, i) => opponents[i] as ContestTrainer));
        ContestBattle.trainersPartyIndex(new Array(opponentAmount).fill(0));
        ContestBattle.moveArray(new Array(opponentAmount).fill([]));
        // Use trainer array to generate Contest Pokemon, aka - send out their first pokemon!
        ContestBattle.pokemons(new Array(opponentAmount).fill(null).map((_, i) => PokemonFactory.generateContestTrainerPokemon(ContestBattle.trainers()[i], 0)));
    }

    public static getTrainerList() {
        return ContestTrainerList.ContestOpponents[ContestRunner.rank()].filter(trainer => {
            return (trainer.options?.requirement) ? trainer.options.requirement.isCompleted() : true;
        });
    }

    /**
     * Brings out opponent's next pokemon, gives rewards if whole party defeated
     * @param index - index of pokemon to be defeated, defaults to `ContestBattle.selectedEnemy()` if empty
     * @param moveToNextTrainer - boolean for moving to next trainer on stage
     */
    public static defeatContestPokemon(index?: number, moveToNextTrainer = true) {
        const opponentIndex = index ?? ContestBattle.selectedEnemy();

        if (ContestBattle.pokemons()[opponentIndex].isRallied()) {
            ContestBattle.pokemonAppeal();

            // Eggs and stuff
            // uncomment when doable
            // PokemonHelper.incrementPokemonStatistics(opponent.id, PokemonStatisticsType.Defeated, opponent.shiny, opponent.gender, opponent.shadow);
            App.game.party.gainExp(30 + 10 * ContestRunner.rank(), 15 + Math.round(ContestScore.activeChain()), ContestRunner.frenzyMode());
            App.game.breeding.progressEggsBattle(Battle.route, player.region);
            player.lowerItemMultipliers(MultiplierDecreaser.Battle);

            // Score
            ContestScore.increaseScore(ContestScore.calculateMoveScore(ContestBattle.moveArray()[opponentIndex], ContestRunner.type()));

            // Check if more mons in trainer party
            if (ContestBattle.trainersPartyIndex()[opponentIndex] + 1 < ContestBattle.trainers()[opponentIndex].getTeam().length) {
                ContestBattle.trainersPartyIndex()[opponentIndex] = ContestBattle.trainersPartyIndex()[opponentIndex] + 1;
                ContestBattle.pokemons.splice(opponentIndex, 1,
                    PokemonFactory.generateContestTrainerPokemon(ContestBattle.trainers()[opponentIndex], ContestBattle.trainersPartyIndex()[opponentIndex]),
                );
                return;
            }

            // Frenzy rewards
            if (ContestRunner.frenzyMode()) {
                // score bonus
                ContestScore.increaseScore(1.5 * ContestScore.calculateMoveScore(ContestBattle.moveArray()[opponentIndex], ContestRunner.type()));
            }
        }

        // move to next trainer
        if (moveToNextTrainer) {
            ContestBattle.moveToNextTrainer();
        }
    }

    public static rallyPokemon(index: number) {
        ContestBattle.pokemons()[index].rally(ContestBattle.pokemons()[ContestBattle.selectedEnemy()].maxRapport());
        ContestBattle.pokemons()[index].status(ContestOpponentStatus.Appealed);
        return;
    }

    public static moveToNextTrainer() {
        if (!ContestRunner.running()) {
            return;
        }

        if (ContestBattle.pokemons().every(p => p.status() != ContestOpponentStatus.Waiting)) {
            return ContestBattle.resetTrainers();
        }

        let opponentIndex = ContestBattle.selectedEnemy();
        if (opponentIndex + 1 < ContestBattle.pokemons().length) {
            opponentIndex = opponentIndex + 1;
        } else {
            opponentIndex = 0;
        }

        return ContestBattle.selectedEnemy(opponentIndex);
    }

    public static resetTrainers() {
        const now = Date.now();
        ContestBattle.lastTrainerRoll = now;
        ContestBattle.prepareNextTrainerBatch(true);
        ContestBattle.counter = 0;
    }

    public static exciteCrowd() {
        if (ContestRunner.jamTime() > 0) {
            return;
        }

        // Failure
        if (ContestBattle.pokemons().some(p => p.status() === ContestOpponentStatus.Jammed)) {
            ContestBattle.totalJamTime(ContestRunner.rank() * SECOND);
            ContestRunner.jamTime(ContestRunner.rank() * SECOND);
            return;
        }

        // Success
        ContestRunner.crowdHype(Math.min(ContestRunner.crowdHype() + 1, 5));
        if (ContestRunner.crowdHype() >= 5) {
            if (!ContestRunner.frenzyMode()) {
                ContestRunner.frenzyTime(10 * SECOND);
            }
            ContestRunner.frenzyMode(true);
        }
        return;
    }

    // Keyboard controls
    // Spacebar
    public static contestAction() {
        if (!ContestRunner.running() || ContestBattle.prepareNextTrainerBatch()) {
            return;
        }
        switch (ContestRunner.rank()) {
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
                ContestBattleDefault.judgeBeat();
                break;
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
            case (ContestRank.Spectacular):
            case ContestRank['Brilliant Shining']:
            default:
                break;
        }
    }
    // Directional keys
    public static contestMove(direction: number) {
        if (!ContestRunner.running() || ContestBattle.prepareNextTrainerBatch() || !ContestBattle.pokemons()[ContestBattle.selectedEnemy()].usableMoves[direction].pp()) {
            return;
        }
        switch (ContestRunner.rank()) {
            case (ContestRank.Normal):
            case (ContestRank.Super):
            case (ContestRank.Hyper):
            case (ContestRank.Master):
                if (ContestRunner.frenzyMode()) {
                    return ContestBattle.useContestMove(direction);
                }
                return;
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
            case (ContestRank.Spectacular):
            case ContestRank['Brilliant Shining']:
            default:
                break;
        }
    }

    // Multipliers
    public static contestClearedMultiplier() {
        let contestsCleared = 0;
        GameHelper.enumNumbers(ContestRank).forEach(r =>
            GameHelper.enumNumbers(ContestType).forEach(ct => {
                contestsCleared += (Math.min(1, App.game.statistics.contestsWon[r][ct]() ?? 0) * (ct != ContestType.Balanced ? 1 : 2.5));
            }),
        );
        return Math.floor(contestsCleared);
    }

    /**
     * Adds the selected move to the moveArray array
     * @param direction - one of four pokemons moves
     */
    public static useContestMove(direction: number) {
        const move = ContestBattle.pokemons()[ContestBattle.selectedEnemy()].usableMoves[direction];
        move.pp(0);
        const newMoves = ContestBattle.moveArray()[ContestBattle.selectedEnemy()].concat(move.moveType);
        ContestBattle.moveArray.splice(ContestBattle.selectedEnemy(), 1, newMoves);

        let matchup = ContestRunner.type() === ContestType.Balanced ? 1 : ContestTypeHelper.getAppealModifier([move.moveType], [ContestRunner.type()]);
        ContestScore.increaseChain(Math.ceil(matchup));

        return;
    }

    // Rewards and Reward Log
    // Tokens
    public static addContestTokenReward(amount: number, finishedContest = false) {
        // gain tokens
        App.game.wallet.gainContestTokens(amount);
        // log token gain
        GameHelper.incrementObservable(ContestBattle.tokenReward, amount);
        Notifier.notify({
            title: 'Pokémon Contest',
            message: `${!finishedContest ? 'You got' : 'Congratulations! You won'} <img src="./assets/images/currency/contestToken.svg" height="16px"/> ${amount} Contest Tokens!`,
            type: NotificationConstants.NotificationOption.success,
            // TODO: setting to turn off contest notifications
        });
    }
}
