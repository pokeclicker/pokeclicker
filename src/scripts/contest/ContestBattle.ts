///<reference path="../Battle.ts"/>
class ContestBattle extends Battle {
    static enemyPokemon: KnockoutObservable<ContestBattlePokemon> = ko.observable(null);

    static trainer: KnockoutObservable<ContestTrainer> = ko.observable(null);
    static trainerIndex: KnockoutObservable<number> = ko.observable(0);
    static pokemonIndex: KnockoutObservable<number> = ko.observable(0);
    static trainerStreak: KnockoutObservable<number> = ko.observable(0);
    static clickTypes: KnockoutObservableArray<ContestType> = ko.observableArray([]);
    static clickCombo: KnockoutObservable<number> = ko.observable(0);

    public static pokemonAttack() {
        if (ContestRunner.running()) {
            const now = Date.now();
            if (ContestBattle.lastPokemonAttack > now - 900) {
                return;
            }
            ContestBattle.lastPokemonAttack = now;
            if (!ContestBattle.enemyPokemon()?.isAlive()) {
                return;
            }
            // damage enemy and rally audience every tick
            ContestBattle.enemyPokemon().damage(ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), ContestBattle.enemyPokemon().contestTypes));
            // increase the audience bar
            ContestRunner.rally(ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), [ContestRunner.type()]));

            if (!ContestBattle.enemyPokemon().isAlive()) {
                // increase audience bar based off health, type, and index of defeated pokemon
                ContestRunner.rally(
                    Math.floor(
                        (ContestBattle.enemyPokemon().maxHealth()
                        * 0.2
                        * ContestTypeHelper.getAppealModifier(ContestBattle.enemyPokemon().contestTypes, [ContestRunner.type()])
                        * (1 + ContestBattle.pokemonIndex() * 0.2))
                    )
                );
                ContestBattle.defeatPokemon();
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
        ContestBattle.enemyPokemon().defeat(true);

        // Make contest "route" regionless
        App.game.breeding.progressEggsBattle(ContestRunner.rank() * 3 + 1, GameConstants.Region.none);

        // Check if all of the trainer's party has been used
        if (ContestBattle.pokemonIndex() + 1 >= ContestRunner.getTrainerList()[ContestBattle.trainerIndex()].getTeam().length) {

            // Reset pokemon index for next trainer
            ContestBattle.pokemonIndex(0);
            // increase trainer streak
            ContestBattle.trainerStreak(ContestBattle.trainerStreak() + 1);

            // Loop through trainers
            if (ContestBattle.trainerIndex() + 1 >= ContestRunner.getTrainerList().length) {
                ContestBattle.trainerIndex(0);
            } else {
                // move to next trainer
                ContestBattle.trainerIndex(ContestBattle.trainerIndex() + 1);
            }

        } else {
            // Move to next pokemon
            ContestBattle.pokemonIndex(ContestBattle.pokemonIndex() + 1);
        }

        ContestBattle.generateNewEnemy();
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        ContestBattle.counter = 0;
        ContestBattle.trainer(ContestRunner.getTrainerList()[ContestBattle.trainerIndex()]);
        ContestBattle.enemyPokemon(PokemonFactory.generateContestTrainerPokemon(ContestBattle.trainerIndex(), ContestBattle.pokemonIndex()));

        // increase the opposing pokemon's hp slightly with each trainer defeated
        const multiplier = 80 * ContestRunner.rank() * (1 + 0.2 * ContestBattle.trainerStreak());
        ContestBattle.enemyPokemon().health(ContestBattle.enemyPokemon().health() * multiplier);
        ContestBattle.enemyPokemon().maxHealth(ContestBattle.enemyPokemon().maxHealth() * multiplier);
    }

    public static updateClickCombo() {
        if (ContestBattle.enemyPokemon() != null) {
            switch (ContestRunner.rank()) {
                case ContestRank.Normal:
                case ContestRank.Super:
                case ContestRank.Hyper:
                case ContestRank.Master:
                    // Increase combo based on type matchup
                    ContestBattle.clickCombo(ContestBattle.clickCombo() + (2 * ContestTypeHelper.getAppealModifier(ContestBattle.enemyPokemon().contestTypes, [ContestRunner.type()])));
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
        if (ContestBattle.enemyPokemon()) {
            const pokemonAppeal = ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), ContestBattle.enemyPokemon().contestTypes);
            return `${pokemonAppeal.toLocaleString('en-US')} against`;
        } else {
            return '';
        }
    }).extend({rateLimit: 1000});
}
