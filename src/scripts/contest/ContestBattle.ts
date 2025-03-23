///<reference path="../Battle.ts"/>
class ContestBattle extends Battle {
    static trainers: KnockoutObservableArray<ContestTrainer> = ko.observableArray(null);
    static pokemons: KnockoutObservableArray<ContestBattlePokemon> = ko.observableArray(null);
    static pokemonIndexArray: Array<KnockoutObservable<number>> = new Array(1).fill(ko.observable(null));
    static enemyIndexes: KnockoutObservableArray<number> = ko.observableArray(null);

    static trainerStreak: KnockoutObservable<number> = ko.observable(0);
    static clickCombo: KnockoutObservable<number> = ko.observable(0);

    static selectedEnemy: KnockoutObservable<number> = ko.observable(-1);

    public static enemyTypes(index: number) {
        if (index >= 0) {
            return ContestBattle.pokemons()[index].contestTypes;
        } else {
            return [ContestRunner.type()];
        }
    }

    public static pokemonAttack() {
        if (ContestRunner.running()) {
            const now = Date.now();
            if (ContestBattle.lastPokemonAttack > now - 900) {
                return;
            }
            ContestBattle.lastPokemonAttack = now;

            // increase the audience bar
            ContestRunner.rally(ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), [ContestRunner.type()]));

            if (ContestBattle.pokemons().some(p => !p?.isAlive)) {
                ContestBattle.pokemons().filter(p => !p?.isAlive).forEach(() => ContestBattle.defeatPokemon());
            }
        }
    }

    public static clickAttack() {
        return ContestBattle.updateClickCombo();
    }

    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon() {
        const enemyIndex = ContestBattle.pokemons().findIndex(p => !p?.isAlive());

        if (ContestBattle.pokemons()[enemyIndex].contestTypes.includes(ContestRunner.type())) {
            ContestRunner.appealGauge(Math.min(ContestRunner.appealGauge() + 1, 5));
        }

        ContestBattle.pokemons()[enemyIndex].defeat(true);
        ContestBattle.pokemonIndexArray[enemyIndex](ContestBattle.pokemonIndexArray[enemyIndex]() + 1);

        if (ContestBattle.pokemonIndexArray[enemyIndex]() + 1 >= ContestBattle.trainers()[enemyIndex].getTeam().length) {
            // increase trainer streak
            ContestBattle.trainerStreak(ContestBattle.trainerStreak() + 1);
            // increase statistic
            GameHelper.incrementObservable(App.game.statistics.contestTrainersDefeated[ContestRunner.rank()][ContestRunner.type()]);
            // give reward
            if (ContestBattle.trainers()[enemyIndex].options?.berryReward) {
                ContestBattle.trainers()[enemyIndex].options?.berryReward?.filter(br => !br.requirement || br.requirement?.isCompleted()).forEach(br => {
                    App.game.farming.gainBerry(br.berry, br.amount, false);
                    Notifier.notify({
                        message: `${ContestBattle.trainers()[enemyIndex].name} defeated. ${BerryType[br.berry]} rewarded.`,
                        type: NotificationConstants.NotificationOption.success,
                    });
                })
            }
            if (ContestBattle.trainers()[enemyIndex].options?.itemReward) {
                ContestBattle.trainers()[enemyIndex].options?.itemReward?.filter(ir => !ir.requirement || ir.requirement?.isCompleted()).forEach(ir => {
                    player.gainItem(ir.item, ir.amount);
                    Notifier.notify({
                        message: `${ContestBattle.trainers()[enemyIndex].name} defeated. ${ItemList[ir.item].displayName} rewarded.`,
                        type: NotificationConstants.NotificationOption.success,
                    });
                })
            }
        }

        // Make contest "route" regionless
        App.game.breeding.progressEggsBattle(ContestRunner.rank() * 3 + 1, GameConstants.Region.none);

        ContestBattle.generateNewEnemy();

        player.lowerItemMultipliers(MultiplierDecreaser.Battle); //todo: ContestBattle
    }

    public static generateTrainers() {
        // max and default of 4
        const opponentAmount = ContestRunner.rank() != ContestRank.Practice ? Math.min(ContestRunner.rank(), 4) : 4;
        const opponents = Rand.shuffleArray(ContestRunner.getTrainerList());
        ContestBattle.enemyIndexes(new Array((opponentAmount)).fill(null).map((_,i) => i));
        ContestBattle.trainers(new Array(opponentAmount).fill(null).map((_,i) => opponents[i]));
        ContestBattle.pokemonIndexArray = new Array(opponentAmount).fill(ko.observable(0));
        ContestBattle.pokemons(new Array(opponentAmount).fill(null));
        ContestBattle.pokemons().forEach(() => ContestBattle.generateNewEnemy());
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        // do we need this???????? idk
        // ContestBattle.counter = 0;

        // trainer, enemy, and pokemon indexes are in the same position
        const enemyIndex = ContestBattle.pokemons().findIndex(p => p === null || !p?.isAlive());

        // Check if all of the trainer's party has been used
        if (ContestBattle.pokemonIndexArray[enemyIndex]() + 1 >= ContestBattle.trainers()[enemyIndex].getTeam().length) {

            // Reset pokemon index for next trainer
            ContestBattle.pokemonIndexArray[enemyIndex](0);

            // Select new trainer and pokemon
            const newTrainer = Rand.fromArray(ContestRunner.getTrainerList().filter(t => !ContestBattle.trainers().some(tr => tr === t)));
            ContestBattle.trainers()[enemyIndex] = newTrainer;
            ContestBattle.trainers.notifySubscribers();
            ContestBattle.pokemons()[enemyIndex] = PokemonFactory.generateContestTrainerPokemon(newTrainer, 0);
            ContestBattle.pokemons.notifySubscribers();

        } else {
            // Move to next pokemon
            ContestBattle.pokemons()[enemyIndex] = PokemonFactory.generateContestTrainerPokemon(ContestBattle.trainers()[enemyIndex], ContestBattle.pokemonIndexArray[enemyIndex]());
            ContestBattle.pokemons.notifySubscribers();
    
        }

        // increase the opposing pokemon's hp slightly with each trainer defeated
        const multiplier = Math.max(ContestRunner.rank(), 1) + ContestRunner.encoreRounds();
        ContestBattle.pokemons()[enemyIndex].health(ContestBattle.pokemons()[enemyIndex].health() * multiplier);
        ContestBattle.pokemons()[enemyIndex].maxHealth(ContestBattle.pokemons()[enemyIndex].maxHealth() * multiplier);
    }

    public static endContest() {
        ContestBattle.trainers([]);
        ContestBattle.pokemons([]);
        ContestBattle.pokemonIndexArray = [];
        ContestBattle.enemyIndexes([]);
    }

    }

    public static updateClickCombo() {
        /*
        if (ContestBattle.enemyPokemon() != null) {
            switch (ContestRunner.rank()) {
                case ContestRank.Normal:
                case ContestRank.Super:
                case ContestRank.Hyper:
                case ContestRank.Master:
                    // Increase combo based on type matchup
                    // ContestBattle.clickCombo(ContestBattle.clickCombo() + (ContestBattle.trainer().options?.clickPerk ?? 2 * ContestTypeHelper.getAppealModifier(ContestBattle.enemyPokemon().contestTypes, [ContestRunner.type()])));
                    break;
                case ContestRank.Practice:
                case ContestRank['Super Normal']:
                case ContestRank['Super Great']:
                case ContestRank['Super Ultra']:
                case ContestRank['Super Master']:
                    // store clicked types in a const
                    const clickedTypes = ContestBattle.clickTypes();
                    // switch out clickTypes
                    ContestBattle.clickTypes(ContestBattle.enemyPokemon().contestTypes);
        
                    // Build up or break combo
                    if (clickedTypes.some(ct => ContestBattle.clickTypes().includes(ct))) {
                        ContestBattle.clickCombo(ContestBattle.clickCombo() + 1 + (2 * ContestTypeHelper.getAppealModifier(ContestBattle.enemyPokemon().contestTypes, [ContestRunner.type()])));
                    } else {
                        // Give reward
                        App.game.wallet.gainContestTokens(Math.max(ContestBattle.trainerStreak() * (ContestBattle.clickCombo() / 100), 1));
                        // Break combo
                        ContestBattle.clickCombo(1 + (2 * ContestTypeHelper.getAppealModifier(ContestBattle.enemyPokemon().contestTypes, [ContestRunner.type()])));
                    }
                    break;
                case ContestRank.Spectacular:
                case ContestRank['Brilliant Shining']:
                    // TODO: this
                    break;
            }
        }
        */
        return;
    }

    // Computables for contestView
    public static trainerBonusComputable: KnockoutComputed<string> = ko.pureComputed(() => {
        return `Trainer Streak: ${ContestBattle.trainerStreak()}`;
    });

    public static encoreBonusComputable: KnockoutComputed<string> = ko.pureComputed(() => {
        return `Bonus Round: ${ContestRunner.encoreRounds()}/${ContestRunner.rank()}`;
    });

    public static clickBonusComputable: KnockoutComputed<string> = ko.pureComputed(() => {
        return `Click Combo: ${ContestBattle.clickCombo()}`;
    });

    public static pokemonContestAppealTooltip: KnockoutComputed<string> = ko.pureComputed(() => {
        // if (ContestBattle.enemyPokemon()) {
        //     const pokemonAppeal = ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), ContestBattle.enemyPokemon().contestTypes);
        //     return `${pokemonAppeal.toLocaleString('en-US')} against`;
        // } else {
            return '';
        // }
    }).extend({rateLimit: 1000});
}
