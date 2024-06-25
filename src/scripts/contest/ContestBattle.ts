///<reference path="../Battle.ts"/>
class ContestBattle extends Battle {
    static enemyPokemon: KnockoutObservable<ContestBattlePokemon> = ko.observable(null);

    static trainer: KnockoutObservable<ContestTrainer> = ko.observable(null);
    static trainerIndex: KnockoutObservable<number> = ko.observable(0);
    static pokemonIndex: KnockoutObservable<number> = ko.observable(0);
    static trainerStreak: KnockoutObservable<number> = ko.observable(0);

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
            ContestBattle.enemyPokemon().damage(ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), ContestBattle.enemyPokemon().contestType1, ContestBattle.enemyPokemon().contestType2, ContestBattle.enemyPokemon().contestType3));
            // increase the audience bar
            ContestRunner.rally(ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), ContestRunner.type()));

            if (!ContestBattle.enemyPokemon().isAlive()) {
                // increase audience bar based off health, type, and index of defeated pokemon
                ContestRunner.rally(
                    Math.floor(
                        (ContestBattle.enemyPokemon().maxHealth()
                        * 0.2
                        * ContestTypeHelper.getAppealModifier(ContestBattle.enemyPokemon().contestType1, ContestBattle.enemyPokemon().contestType2, ContestBattle.enemyPokemon().contestType3, ContestRunner.type(), ContestType.None, ContestType.None)
                        * (1 + ContestBattle.pokemonIndex() * 0.2))
                    )
                );
                ContestBattle.defeatPokemon();
            }
        }
    }

    public static clickAttack() {
        if (ContestRunner.running()) {
            return;
        }
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

    // Increase and keep track of the amount of trainers defeated
    public static trainerBonusComputable: KnockoutComputed<string> = ko.pureComputed(() => {
        const rank = ContestRunner.isRallied() ? ContestRunner.rank() : 1;
        return `Trainer Streak: ${ContestBattle.trainerStreak()} (+${Math.floor(0.1 * ContestBattle.trainerStreak() * rank)} <img src="./assets/images/currency/contestToken.svg" height="16px"/>)`;
    });

    public static pokemonContestAppealTooltip: KnockoutComputed<string> = ko.pureComputed(() => {
        if (ContestBattle.enemyPokemon()) {
            const pokemonAppeal = ContestHelper.calculatePokemonContestAppeal(ContestRunner.rank(), ContestRunner.type(), ContestBattle.enemyPokemon().contestType1, ContestBattle.enemyPokemon().contestType2, ContestBattle.enemyPokemon().contestType3);
            return `${pokemonAppeal.toLocaleString('en-US')} against`;
        } else {
            return '';
        }
    }).extend({rateLimit: 1000});
}
