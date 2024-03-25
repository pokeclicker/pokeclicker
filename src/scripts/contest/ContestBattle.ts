///<reference path="../Battle.ts"/>
class ContestBattle extends Battle {

    static contest: Contest;
    static trainer: KnockoutObservable<ContestTrainer> = ko.observable(null);
    static trainerIndex: KnockoutObservable<number> = ko.observable(0);
    static pokemonIndex: KnockoutObservable<number> = ko.observable(0);
    static totalTrainers: KnockoutObservable<number> = ko.observable(0);

    public static pokemonAttack() {
        if (ContestRunner.running()) {
            const now = Date.now();
            if (this.lastPokemonAttack > now - 900) {
                return;
            }
            this.lastPokemonAttack = now;
            if (!this.enemyPokemon()?.isAlive()) {
                return;
            }
            this.enemyPokemon().damage(App.game.party.calculatePokemonAppeal(this.enemyPokemon().contestType1, this.enemyPokemon().contestType2, this.enemyPokemon().contestType3, true)); // TODO: filter mons, only of the type for current contest
            this.contest.rally(App.game.party.calculatePokemonAppeal(this.contest.contestType));

            // TODO: primary judging mode, uses party mons
            // this.enemyPokemon().rally(App.game.party.calculateOnePokemonAppeal(App.game.party.caughtPokemon.find((p) => p.name === this.enemyPokemon().name), 0, undefined, undefined, true)); // change enum with each contest

            if (!this.enemyPokemon().isAlive()) {
                this.defeatPokemon();
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
        this.enemyPokemon().defeat(true);
        this.totalTrainers(this.totalTrainers() + 1);

        // Make contest "route" regionless
        App.game.breeding.progressEggsBattle(this.contest.rank * 3 + 1, GameConstants.Region.none);

        // Check if all of the trainer's party has been used
        if (this.pokemonIndex() + 1 >= this.contest.getTrainerList()[this.trainerIndex()].getTeam().length) {

            // Reset pokemon index for next trainer
            this.pokemonIndex(0);

            // Loop through trainers
            if (this.trainerIndex() + 1 >= this.contest.getTrainerList().length) {
                this.trainerIndex(0);
            } else {
                this.trainerIndex(this.trainerIndex() + 1);
            }

        } else {
            // Move to next pokemon
            this.pokemonIndex(this.pokemonIndex() + 1);
        }

        this.generateNewEnemy();
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        this.trainer(this.contest.getTrainerList()[this.trainerIndex()]);
        this.enemyPokemon(PokemonFactory.generateContestTrainerPokemon(this.contest, this.trainerIndex(), this.pokemonIndex()));
    }

    // Increase and keep track of the amount of trainers defeated
    public static trainersDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return ContestBattle.totalTrainers();
    });
}
