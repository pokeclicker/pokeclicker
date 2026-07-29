import ContestOpponentStatus from '../enums/ContestOpponentStatus';
import ContestType from '../enums/ContestType';
import { SECOND } from '../GameConstants';
import ContestTypeHelper from '../types/ContestTypeHelper';
import ContestBattle from './ContestBattle';
import ContestBattleDefault from './ContestBattleDefault';
import ContestBattlePokemon from './ContestBattlePokemon';
import ContestHelper from './ContestHelper';
import ContestRunner from './ContestRunner';
import ContestScore from './ContestScore';

export default class ContestBattleSpectacular {
    public static tick() {
        if (ContestRunner.frenzyMode()) {
            ContestBattleDefault.changeBeat();
            return;
        }
        // Cycle through affected pokemon
        if (ContestBattle.counter >= 600) {
            if (ContestBattle.spotlightFormation() + 1 < ContestBattleSpectacular.moveRange(ContestBattle.selectedEnemy()).length) {
                ContestBattle.spotlightFormation(ContestBattle.spotlightFormation() + 1);
            } else {
                ContestBattle.spotlightFormation(0);
            }
            ContestBattle.counter = 0;
        }
    }

    // Controls
    // Spacebar
    public static contestAction() {
        if (ContestRunner.frenzyMode()) {
            ContestBattleSpectacular.judgeBeat();
            return;
        }

        const pk = ContestBattle.pokemons()[ContestBattle.selectedEnemy()];
        pk.rally(1);

        // Bonus for complete rally
        if (pk.isRallied()) {
            pk.status(ContestOpponentStatus.Spectacle);
            pk.usableMoves.every(m => m.pp(1));
            return;
        }

        // Penalty for incomplete rally
        pk.usableMoves.every(m => m.pp(0));
        ContestScore.breakChain();
        pk.status(ContestOpponentStatus.Jammed);
        ContestBattle.moveToNextTrainer();
        return;
    }

    // Directional keys
    public static useContestMove(direction: number) {
        const moves = ContestBattle.pokemons()[ContestBattle.selectedEnemy()].usableMoves;
        const move = moves[direction];

        if (ContestRunner.frenzyMode()) {
            // Reset pp to make moves available if switching selection
            moves.forEach(m => m.pp(1));
            // Choose all moves of the selected move's type
            const talentMoves = moves.filter(m => m.moveType === move.moveType);
            talentMoves.forEach(m => m.pp(0));
            // Apply only chosen moves to array
            const newMoves = talentMoves.flatMap(t => t.moveType);
            ContestBattle.moveArray.splice(ContestBattle.selectedEnemy(), 1, newMoves);
            return;
        }

        // Add move to move array
        ContestBattle.useContestMove(direction);

        // Penlaty
        if (moves.every(m => m.pp() <= 0)) {
            // Apply jammed status now, to make it easier to overwrite a few lines down
            ContestBattle.pokemons()[ContestBattle.selectedEnemy()].status(ContestOpponentStatus.Jammed);
        }

        // Define effectiveness
        const matchup = ContestBattle.activeSpectacularType() === ContestType.Balanced ? 1 :
            ContestTypeHelper.getAppealModifier([move.moveType], [ContestBattle.activeSpectacularType()]);
        // Score
        ContestScore.increaseChain(Math.floor(matchup)); // extra chain increase
        if (matchup <= 0) {
            ContestScore.breakChain();
        }
        // Use move
        ContestBattle.pokemons().filter(p => ContestBattle.getSpotlightStatus(ContestBattle.pokemons().indexOf(p)) && p.status() != ContestOpponentStatus.Appealed).forEach(p => {
            const supportAppeal = matchup > 0 ? matchup : -0.5;
            // don't lower support if rallied
            if (!p.isRallied()) {
                p.rally(2 * supportAppeal);
            }
            if (p.isRallied()) {
                // move to next party pokemon, or give Spectacle rewards
                ContestBattle.defeatContestPokemon(ContestBattle.pokemons().indexOf(p), false);
                // Apply status after defeat, reverts back from Spectacle status too
                p.status(ContestOpponentStatus.Appealed);
            }
        });

        // Spectacular Balanced gimmick, type relay
        if (ContestRunner.type() === ContestType.Balanced) {
            ContestBattle.activeSpectacularType(move.moveType);
        }

        // Safely move on to next trainer independent of Pokemon defeat
        ContestBattle.moveToNextTrainer();
        return;
    }

    // Gimmicks
    // Frenzy
    public static judgeBeat() {
        // default success
        ContestBattle.rallyPokemon(ContestBattle.selectedEnemy());
        ContestScore.increaseChain();

        // bonus success
        const pk = ContestBattle.pokemons()[ContestBattle.selectedEnemy()];
        const visual = Math.max(...pk.contestTypes.map(ct => ContestTypeHelper.contestTypeMatrix[ct][ContestRunner.type()] * 2));
        if (ContestBattle.beat() + visual >= 2) {
            pk.status(ContestOpponentStatus.Spectacle);
        }

        // save move type before defeating pokemon
        const activeSpectacularMove = ContestBattle.moveArray()[ContestBattle.selectedEnemy()][0] ?? ContestBattle.activeSpectacularType();

        // the usual
        ContestBattle.defeatContestPokemon();
        ContestBattle.beat(0);
        ContestBattle.counter = 0;

        // apply type relay gimmick after frenzy time reward
        if (ContestRunner.type() === ContestType.Balanced) {
            ContestBattle.activeSpectacularType(activeSpectacularMove);
        }

        return;
    }

    public static addFrenzyTime() {
        const multiplier = ContestScore.calculateMoveScore(ContestBattle.moveArray()[ContestBattle.selectedEnemy()], ContestBattle.activeSpectacularType(), 0);
        const time = Math.min(10 * SECOND, ContestRunner.frenzyTime() + multiplier * SECOND);
        ContestRunner.frenzyTime(time);
    }

    // Spectacle status Trainer rewards
    public static spectacularReward() {
        const opponentIndex = ContestBattle.selectedEnemy();
        // Roll for trainer item rewards
        ContestBattle.trainers()[opponentIndex].options?.itemReward?.forEach(i => ContestBattle.addContestItemReward(i, true));
        // Frenzy Time
        ContestBattleSpectacular.addFrenzyTime();
        // Score bonus
        const movesUsed = ContestBattle.moveArray()[ContestBattle.selectedEnemy()].filter(ct => ct === ContestBattle.activeSpectacularType());
        ContestScore.increaseChain(Math.max(1, movesUsed.length));
        // Berry bonus
        ContestBattle.addContestBerryReward(
            ContestBattle.trainers()[opponentIndex].options?.rankedBerryReward?.rank ?? ContestRunner.rank(),
            ContestBattle.trainers()[opponentIndex].options?.rankedBerryReward?.amount ?? 2,
            true,
        );
    }

    public static moveRange(performerIndex: number): number[][] {
        const choreos = [
            [1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1],
            [1, 1, 0, 1, 0],
            [0, 1, 0, 1, 1],
            [1, 1, 0, 0, 1],
            [1, 0, 0, 1, 1],
            [1, 0, 1, 1, 0],
            [0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1],
            [0, 1, 1, 1, 0],
        ];
        const activeFormations = choreos.filter((f) => f[performerIndex] > 0);
        return activeFormations;
    }

    public static contestHealth(pokemon: ContestBattlePokemon) {
        const oppStatus = pokemon.status();
        if (oppStatus === ContestOpponentStatus.Spectacle) {
            return ('⭐').repeat(5);
        }

        if (ContestRunner.frenzyMode()) {
            if (ContestBattle.pokemons().indexOf(pokemon) != ContestBattle.selectedEnemy()) {
                return new Array(5).fill('🔹').join('');
            }
            const visual = ContestBattle.beat() +
                Math.max(...ContestBattle.pokemons()[ContestBattle.pokemons().indexOf(pokemon)].contestTypes.map(ct =>
                    ContestTypeHelper.contestTypeMatrix[ct][ContestBattle.activeSpectacularType()] * 2,
                ));
            return ContestBattle.healthDisplayBeat(visual, '⭐', ContestHelper.getContestEmoji(ContestBattle.activeSpectacularType()), '🔹');
        }

        let heart = '🤍';
        if (oppStatus === ContestOpponentStatus.Jammed) {
            heart = '🖤';
            if (ContestBattle.prepareNextTrainerBatch()) {
                return (heart).repeat(5);
            }
        }
        return new Array(ContestHelper.getContestEmoji(ContestBattle.activeSpectacularType()).repeat(pokemon.support())).concat(heart.repeat(5 - pokemon.support())).join('');
    }
}
