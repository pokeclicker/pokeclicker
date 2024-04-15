///<reference path="../Battle.ts"/>
class ContestBattle extends Battle {

    static trainer: KnockoutObservable<ContestTrainer> = ko.observable(null);
    static trainerIndex: KnockoutObservable<number> = ko.observable(0);
    static pokemonIndex: KnockoutObservable<number> = ko.observable(0);
    static totalTrainers: KnockoutObservable<number> = ko.observable(0);

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
            // damage enemy using only pokemon of the contest's type
            ContestBattle.enemyPokemon().damage(ContestHelper.calculatePokemonContestAppeal(ContestBattle.enemyPokemon().contestType1, ContestBattle.enemyPokemon().contestType2, ContestBattle.enemyPokemon().contestType3, ContestHelper.getPartyPokemonByContestType(ContestRunner.type())));

            // TODO: primary judging mode, uses party mons
            // ContestBattle.enemyPokemon().rally(App.game.party.calculateOnePokemonContestAppeal(App.game.party.caughtPokemon.find((p) => p.name === ContestBattle.enemyPokemon().name), ContesRunner.type()));

            if (!ContestBattle.enemyPokemon().isAlive()) {
                // increase contest bar based off all party mons appeal + health of defeated pokemon
                ContestRunner.rally(
                    Math.floor(
                        (ContestBattle.enemyPokemon().maxHealth()
                        + ContestHelper.calculatePokemonContestAppeal(ContestRunner.type()))
                        * (1 + ContestBattle.pokemonIndex() * 0.2))
                );
                ContestBattle.defeatPokemon();
            }
        }
    }

    public static clickAttack() {
        if (ContestRunner.running()) {
            super.clickAttack();
        }
    }
    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon() {
        ContestBattle.enemyPokemon().defeat(true);

        // give trainer bonus for Contest Tokens if contest bar is full
        if (ContestRunner.isRallied()) {
            ContestBattle.totalTrainers(ContestBattle.totalTrainers() + 1);
        }

        // Make contest "route" regionless
        App.game.breeding.progressEggsBattle(ContestRunner.rank() * 3 + 1, GameConstants.Region.none);

        // Check if all of the trainer's party has been used
        if (ContestBattle.pokemonIndex() + 1 >= ContestRunner.getTrainerList()[ContestBattle.trainerIndex()].getTeam().length) {

            // Reset pokemon index for next trainer
            ContestBattle.pokemonIndex(0);

            // Loop through trainers
            if (ContestBattle.trainerIndex() + 1 >= ContestRunner.getTrainerList().length) {
                ContestBattle.trainerIndex(0);
            } else {
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
    }

    // Increase and keep track of the amount of trainers defeated
    public static trainersDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return ContestBattle.totalTrainers();
    });
}
