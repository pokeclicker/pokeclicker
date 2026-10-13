class GymBattle extends Battle {

    static gym: Gym;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);
    static enemyPokemonView: KnockoutComputed<Array<BattlePokemon | null>> = ko.pureComputed(() => {
        return GymBattle.visibleEnemyPokemon(GymBattle.gym?.optionalArgs.isDoubleBattle);
    });

    public static pokemonAttack() {
        if (GymRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack(targetPokemon = this.firstEnemyPokemon()) {
        if (!GymRunner.running()) {
            return;
        }
        super.clickAttack(targetPokemon);
    }

    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon(enemyPokemon = this.firstEnemyPokemon()) {
        if (!enemyPokemon) {
            return;
        }
        enemyPokemon.defeat(true);

        // Make gym "route" regionless
        App.game.breeding.progressEggsBattle(this.gym.badgeReward * 3 + 1, GameConstants.Region.none);
        this.index(this.index() + 1);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        if (this.index() >= this.gym.getPokemonList().length) {
            GymRunner.gymWon(this.gym);
        } else {
            this.continueEnemyPokemon(
                enemyPokemon,
                this.index(),
                this.gym.getPokemonList().length,
                (pokemonIndex) => PokemonFactory.generateGymPokemon(this.gym, pokemonIndex)
            );
        }
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.counter = 0;
        this.startEnemyPokemon(
            this.gym.getPokemonList().length,
            (pokemonIndex) => PokemonFactory.generateGymPokemon(this.gym, pokemonIndex),
            this.gym.optionalArgs.isDoubleBattle ? 2 : 1
        );
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return GymBattle.totalPokemons() - GymBattle.index();
    })

}
