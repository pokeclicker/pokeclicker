///<reference path="../Battle.ts"/>
///<reference path="../contest/ContestBattlePokemon.ts"/>
///<reference path="../contest/ContestBattleDance.ts"/>
///<reference path="../contest/ContestTrainer.ts"/>
///<reference path="../contest/ContestRunner.ts"/>
///<reference path="../contest/ContestHelper.ts"/>
///<reference path="../contest/ContestBattleSpectacular.ts"/>
///<reference path="../App.ts"/>
///<reference path="../../declarations/enums/ContestOpponentStatus.d.ts"/>
///<reference path="../../declarations/items/ItemList.d.ts"/>
///<reference path="../../declarations/pokemons/PokemonHelper.d.ts"/>
///<reference path="../../declarations/utilities/Rand.d.ts"/>

class ContestBattle extends Battle {
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

    // Modes
    static danceMode: KnockoutObservable<boolean> = ko.observable(false);
    static frenzyMode: KnockoutObservable<boolean> = ko.observable(false);

    // Gimmicks
        // Hoenn
    static beat: KnockoutObservable<number> = ko.observable(0);
    static totalJamTime: KnockoutObservable<number> = ko.observable(GameConstants.SECOND);
        // Sinnoh
    static crotchetValue: KnockoutObservable<number> = ko.observable(0);
    static finishingPose: KnockoutObservableArray<number> = ko.observableArray(null);
        // Help tab
    static infoBeat: KnockoutObservable<number> = ko.observable(0);
    static infoCrotchetValue: KnockoutObservable<number> = ko.observable(0);
        // Testing
    public static testAppeal: KnockoutObservable<number> = ko.observable(10);

    // Rewards
    public static tokenReward: KnockoutObservable<number> = ko.observable(0);
    public static berryRewardLog: KnockoutObservableArray<contestBerryReward> = ko.observableArray(
        // Map them by number so we can display them already sorted
        GameHelper.enumNumbers(BerryType).map((b) => Object({ berry: b, amount: ko.observable(0) }) as contestBerryReward)
    );
    public static itemRewardLog: KnockoutObservableArray<contestItemReward> = ko.observableArray(null);

    public static tick() {
        // Info tab has separate beat cycle
        if (GameHelper.counter % 500 === 0) {
            if (ContestBattle.infoBeat() >= 2) {
                ContestBattle.infoBeat(0);
                const typeValues = [ContestType.Cool, ContestType.Beautiful, ContestType.Cute, ContestType.Smart, ContestType.Tough];
                ContestBattle.infoCrotchetValue(typeValues[(ContestBattle.infoCrotchetValue() + 1) % 5]);
            } else {
                ContestBattle.infoBeat(ContestBattle.infoBeat() + 1);
            }
        }

        if (ContestBattle.prepareNextTrainerBatch()) {
            // Give some time to process results
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
                return ContestBattleDance.tick();
            case ContestRank.Spectacular:
                return ContestBattleSpectacular.tick();
            case ContestRank['Brilliant Shining']: // not coded yet
            default:
                return;
        }
    }

    public static pokemonAppeal() {
        if (!ContestRunner.running()) {
            throw new Error('ContestRunner must be running');
        }

        // increase the audience bar
        let multiplier = 100;
        // chains are mainly used for score, so their boost to appeal is adjusted to not inflate it
        multiplier += Math.max(0, ContestScore.activeChain() * 10 - 10);
        // frenzy bonus
        if (ContestBattle.frenzyMode()) {
            multiplier += ContestBattle.contestClearedMultiplier();
        }
        // Jam penalty
        if (ContestRunner.jamTime() > 0) {
            multiplier /= 2;
        }
        // convert to single digit
        multiplier /= 100;

        // (commented out for testing) const rallyAppeal = ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), [ContestRunner.type()]) * multiplier;
        ContestRunner.rally(ContestBattle.testAppeal() * multiplier);
    }

    /**
     * Generates new set of Contest Opponents
     */
    public static generateNewEnemy() {
        // Determine opponents on field
        const opponentAmount = !ContestHelper.isDanceHall(ContestRunner.rank()) ? Math.min(ContestRunner.rank(), 5) : Math.max(4, ContestRunner.rank() - 5);
        // Shuffle trainers
        const opponents = Rand.shuffleArray(ContestRunner.getTrainerList().filter(t => !ContestBattle.trainers().some(tr => tr === t)));
        // Create observable arrays
        // Because some trainers have multiple mons, we track trainers in their own array, so we can refer to it for their next pokemon
        ContestBattle.trainers(new Array(opponentAmount).fill(null).map((_,i) => opponents[i] as ContestTrainer));
        ContestBattle.trainersPartyIndex(new Array(opponentAmount).fill(0));
        ContestBattle.moveArray(new Array(opponentAmount).fill([]));
        ContestBattle.finishingPose(new Array(opponentAmount).fill(undefined));
        // Use trainer array to generate Contest Pokemon, aka - send out their first pokemon!
        ContestBattle.pokemons(new Array(opponentAmount).fill(null).map((_,i) => PokemonFactory.generateContestTrainerPokemon(ContestBattle.trainers()[i], 0)));
    }

    /**
     * Brings out opponent's next pokemon, gives rewards if whole party defeated
     * @param index - index of pokemon to be defeated, defaults to `ContestBattle.selectedEnemy()` if empty
     * @param moveToNextTrainer - boolean for moving to next trainer on stage
     */
    public static defeatContestPokemon(index?: number, moveToNextTrainer = true) {
        const opponentIndex = index ?? ContestBattle.selectedEnemy();
        const opponent = ContestBattle.pokemons()[opponentIndex];

        if (ContestBattle.pokemons()[opponentIndex].isRallied()) {
            // Assess bonus before appeal is added
            if (ContestRunner.isRallied()) {
                ContestBattle.addContestTokenReward(ContestBattle.pokemons()[opponentIndex].reward.amount);
            }

            ContestBattle.pokemonAppeal();

            // Eggs and stuff
            PokemonHelper.incrementPokemonStatistics(opponent.id, GameConstants.PokemonStatisticsType.Defeated, opponent.shiny, opponent.gender, opponent.shadow);
            App.game.party.gainExp(ContestRunner.rank(), ContestScore.activeChain(), ContestBattle.frenzyMode());
            App.game.breeding.progressEggsBattle(Battle.route, player.region);
            player.lowerItemMultipliers(MultiplierDecreaser.Battle);

            // Score
            ContestScore.increaseChain(Math.min(10, ContestRunner.rank() || 5 + 1));
            ContestScore.increaseScore(ContestScore.calculateMoveScore(ContestBattle.moveArray()[opponentIndex], ContestRunner.type()));

            // Check if more mons in trainer party
            if (ContestBattle.trainersPartyIndex()[opponentIndex] + 1 < ContestBattle.trainers()[opponentIndex].getTeam().length) {
                ContestBattle.trainersPartyIndex()[opponentIndex] = ContestBattle.trainersPartyIndex()[opponentIndex] + 1;
                ContestBattle.pokemons.splice(opponentIndex, 1, PokemonFactory.generateContestTrainerPokemon(ContestBattle.trainers()[opponentIndex], ContestBattle.trainersPartyIndex()[opponentIndex]));
                return;
            }

            // Apply spectacular (trainer) rewards
            if (opponent.status() === ContestOpponentStatus.Spectacle) {
                ContestBattleSpectacular.spectacularReward();
            }

            // Frenzy rewards
            if (ContestBattle.frenzyMode()) {
                // score bonus
                ContestScore.increaseScore((ContestRunner.rank() / 10) * ContestScore.calculateMoveScore(ContestBattle.moveArray()[opponentIndex], ContestRunner.type()));
                // dancing gives more tokens but no berries, to make ranks more distinct
                if (!ContestBattle.danceMode()) {
                    ContestBattle.addContestBerryReward(ContestRunner.rank(), ContestBattle.getBerryMultiplier());
                } else {
                    const tokRew = Math.round(opponent.reward.amount * (10 + opponent.danceHearts()) / 10);
                    if (opponent.danceHearts() > 0) {
                        ContestBattle.addContestTokenReward(tokRew);
                    }
                }
                ContestHelper.itemRewards().forEach(i => ContestBattle.addContestItemReward(i));
            }
        }

        // move to next trainer
        if (moveToNextTrainer) {
            ContestBattle.moveToNextTrainer();
        }
    }

    public static rallyPokemon(index: number) {
        ContestBattle.pokemons()[index].rally(ContestBattle.pokemons()[ContestBattle.selectedEnemy()].maxHealth());
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
            if (this.danceMode()) {
                ContestScore.breakChain();
                ContestRunner.crowdHype(Math.max(0, ContestRunner.crowdHype() - 1));
            } else {
                ContestBattle.totalJamTime(ContestRunner.rank() * GameConstants.SECOND);
                ContestRunner.jamTime(ContestRunner.rank() * GameConstants.SECOND);
            }
            return;
        }

        // Success
        ContestRunner.crowdHype(Math.min(ContestRunner.crowdHype() + 1, 5));
        if (ContestBattle.danceMode()) {
            ContestScore.increaseScore(ContestBattleDance.danceHeartScoreBonus());
        }
        if (ContestRunner.crowdHype() >= 5) {
            if (!ContestBattle.frenzyMode()) {
                ContestRunner.frenzyTime(10 * GameConstants.SECOND);
                // Reset spectacular type upon frenzy activation
                ContestBattleSpectacular.activeSpectacularType(ContestRunner.type());
            }
            ContestBattle.frenzyMode(true);
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
                ContestBattleDance.judgeBeat();
                break;
            case (ContestRank.Spectacular):
                ContestBattleSpectacular.contestAction();
                break;
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
                if (ContestBattle.frenzyMode()) {
                    return ContestBattle.useContestMove(direction);
                }
                return;
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                ContestBattleDance.dance(direction);
                break;
            case (ContestRank.Spectacular):
                return ContestBattleSpectacular.useContestMove(direction);
            case ContestRank['Brilliant Shining']: // not coded yet
            default:
                break;
        }
    }

    // Multipliers
    public static contestClearedMultiplier() {
        let contestsCleared = 0;
        GameHelper.enumNumbers(ContestRank).forEach(r =>
            GameHelper.enumNumbers(ContestType).forEach(ct =>
                contestsCleared += (Math.min(1, App.game.statistics.contestHighestRound[r][ct]() ?? 0) * (ct != ContestType.Balanced ? 1 : 2.5))
            )
        );
        return Math.floor(contestsCleared);
    }

    public static getBerryMultiplier(): number {
        // check if any move pool has a good matchup against the running contest type
        let sum = 0;
        ContestBattle.moveArray().forEach(ct => {
            sum += ContestTypeHelper.getAppealModifier(ct, [ContestRunner.type()]);
        })
        // consolidate all attacks
        let multiplier = 1;
        ContestBattle.moveArray().flatMap(ct => ct).forEach(moveType => {
            const matchup = ContestTypeHelper.getAppealModifier([moveType], [ContestRunner.type()]);
            multiplier += matchup ? matchup : -1;
            }
        )
        return sum * Math.max(multiplier, 1);
    }

    /**
     * Adds the selected move to the moveArray array
     * @param direction - one of four pokemons moves
     * @returns 
     */
    public static useContestMove(direction: number) {
        const move = ContestBattle.pokemons()[ContestBattle.selectedEnemy()].usableMoves[direction];
        move.pp(0);
        const newMoves = ContestBattle.moveArray()[ContestBattle.selectedEnemy()].concat(move.moveType);
        ContestBattle.moveArray.splice(ContestBattle.selectedEnemy(), 1, newMoves);
        return;
    }

    // Rewards and Reward Log
    // Tokens
    public static addContestTokenReward(amount: number) {
        // gain tokens
        App.game.wallet.gainContestTokens(amount);
        // log token gain
        GameHelper.incrementObservable(ContestBattle.tokenReward, amount);
    }

    // Berries
    public static addContestBerryReward(rank: ContestRank, multiplier: number, trainerReward = false) {
        if (!multiplier) {
            return;
        }
        const b = ContestHelper.getContestBerryReward(rank ?? ContestRunner.rank(), trainerReward);
        const amount = Math.ceil(b.amount() * multiplier);
        // give the berry
        App.game.farming.gainBerry(b.berry, amount, false);
        Notifier.notify({
            title: 'Pokémon Contest',
            message: `The audience threw you ${amount} ${BerryType[b.berry]} ${amount > 1 ? 'Berries' : 'Berry'}!`,
            image: FarmController.getBerryImage(b.berry),
            type: NotificationConstants.NotificationOption.success,
        });
        // log the berry
        ContestBattle.berryRewardLog()[b.berry].amount(ContestBattle.berryRewardLog()[b.berry].amount() + amount);
    }

    // Items
    public static addContestItemReward(item: contestItemReward, trainerItem?: boolean) {
        // check for availability
        const reqComplete = item.requirement?.isCompleted() ?? true;
        const chanceLuck = Rand.chance(item.chance ?? 1);
        if (!chanceLuck || !reqComplete) {
            return;
        }
        // check for item limit
        let gain = item.amount();
        if (item.amountLimit) {
            if (player.itemList[item.item]() >= item.amountLimit) {
                return;
            }
            gain = Math.min(item.amountLimit, item.amount());
        }
        // give the item
        player.gainItem(item.item, gain);
        Notifier.notify({
            title: 'Pokémon Contest',
            message: trainerItem ? `${ContestBattle.trainers()[ContestBattle.selectedEnemy()].name} & ${ContestBattle.pokemons()[ContestBattle.selectedEnemy()].nickname} tossed you a favor!` : 'The audience threw you a reward!',
            image: ItemList[item.item].image,
            type: NotificationConstants.NotificationOption.success,
        });
        // log the item
        const oldAmount = ContestBattle.itemRewardLog().find(i => i.item === item.item)?.amount() ?? 0;
        const newAmount = oldAmount + gain;
        ContestBattle.itemRewardLog(ContestBattle.itemRewardLog().filter(i => i.item != item.item).concat({item: item.item, amount: ko.observable(newAmount)}).sort((a,b) => b.amount() - a.amount()));
    }

    // HTML display
    // Appeal hearts
    public static maxAppealComputable: KnockoutComputed<string> = ko.pureComputed(() => {
        const appealLeft = '🤍';
        const appeal = ContestHelper.getContestEmoji(ContestRunner.type());
        if (!ContestRunner.jamTime()) {
            const hypePoints = Math.min(5, ContestRunner.crowdHype());
            return appeal.repeat(hypePoints).concat(appealLeft.repeat(5 - hypePoints));
        }

        // Jamming is specific to Hoenn contests and prevents riling up the crowd for its duration, so we turn the emojis into a timer
        const jam = '🖤';
        const jamTickInterval = ContestBattle.totalJamTime() / 5;
        return jam.repeat(Math.ceil(ContestRunner.jamTime() / jamTickInterval)).concat(Math.ceil(ContestRunner.jamTime() / jamTickInterval) === 5 ? '' : '🩶').concat(appealLeft.repeat(Math.max(4 - Math.ceil(ContestRunner.jamTime() / jamTickInterval), 0)));
    })

    // Highlight selected/affected Pokemon
    public static getSpotlightStatus(index: number): boolean {
        if (ContestBattle.prepareNextTrainerBatch()) {
            return false;
        }
        if (ContestBattle.danceMode()) {
            return ContestBattle.pokemons()[index].contestTypes.includes(ContestBattle.crotchetValue()) || ContestBattle.frenzyMode();
        }
        if (ContestRunner.rank() === ContestRank.Spectacular && !ContestBattle.frenzyMode()) {
            return Boolean(ContestBattleSpectacular.moveRange(ContestBattle.selectedEnemy())[ContestBattleSpectacular.spotlightFormation()][index]);
        }
        return index === ContestBattle.selectedEnemy();
    }

    public static getSpotlightGrayscaleStatus(index: number): boolean {
        if (ContestRunner.rank() === ContestRank.Spectacular) {
            return ContestBattle.selectedEnemy() != index;
        }
        if (ContestBattle.danceMode() && ContestBattle.frenzyMode()) {
            return index != ContestBattle.selectedEnemy();
        }
        return false;
    }

    public static contestHealth(pokemon: ContestBattlePokemon) {
        const oppStatus = pokemon.status();
        if (oppStatus === ContestOpponentStatus.Appealed){
            return ('💖').repeat(5);
        }
        switch (ContestRunner.rank()) {
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
                return ContestBattleDefault.contestHealth(pokemon);
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                return ContestBattleDance.contestHealth(pokemon);
            case ContestRank.Spectacular:
                return ContestBattleSpectacular.contestHealth(pokemon);
            case ContestRank['Brilliant Shining']: // not coded yet
            default:
                return new Array(5).fill('🤍').join('');
        }
    }

    public static healthDisplayBeat(grade: number, emojiSucceed: string, emojiFail: string, emojiNeutral: string, beat = ContestBattle.beat()) {
        const hearts = new Array(beat * 2 + 1).fill(grade >= 2 ? emojiSucceed : emojiFail);
        const hpBar = new Array(2).fill(emojiNeutral).splice(0, 2 - Math.max(0, beat));
        return hpBar.concat(hearts).concat(hpBar).join('');
    }

    // Table HTML
    public static trainerInfo(index: number) {
        let action = '';
        switch (ContestRunner.rank()) {
            case ContestRank.Normal:
            case ContestRank.Super:
            case ContestRank.Hyper:
            case ContestRank.Master:
                action = ContestBattle.frenzyMode() ? 'Moves' : 'Appeal';
                break;
            case ContestRank.Spectacular:
                action = ContestBattle.frenzyMode() ? 'Spectacular Talent' : 'Moves'
                break;
            case ContestRank.Practice:
            case ContestRank['Super Normal']:
            case ContestRank['Super Great']:
            case ContestRank['Super Ultra']:
            case ContestRank['Super Master']:
                if (ContestBattle.frenzyMode()) {
                    action = 'Moves';
                    break;
                }
                return 'Dance Beat';
            case ContestRank['Brilliant Shining']: // not coded yet
                break;
        }
        return `${ContestBattle.trainers()[index].name.replace(/\d/g,'')}\'s ${ContestBattle.pokemons()[index].nickname}\'s ${action}`;
    }

    public static enemyTypes(index: number) {
        return ContestBattle.danceMode() ? [ContestBattle.crotchetValue()] : ContestBattle.pokemons()[index].contestTypes;
    }

    public static contestViewGimmickBar(rank: ContestRank): string {
        if (ContestBattle.frenzyMode() || rank === ContestRank.Spectacular) {
            return 'contestMovesTemplate';
        }
        return 'contestBeatTemplate';
    }

    public static getBattleViewTitle() {
    const heart = ContestHelper.getContestEmoji(ContestRunner.type());
    let emoji = '🤍';
    if (ContestRunner.contestRankObservable().filter(rank => rank > ContestRank.Practice).every(rank => {
        ContestRunner.contestTypeObservable().every(
            type => new ContestWonRequirement(1, rank, type).isCompleted()
        )}
    )) {
        emoji = '💖';
    }
        return !ContestRunner.running() ? `${emoji}Contest Hall${emoji}` : `${heart}${ContestRank[ContestRunner.rank()]} Rank ${ContestType[ContestRunner.type()]}${heart}`;
    }
}
