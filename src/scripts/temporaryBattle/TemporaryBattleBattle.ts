class TemporaryBattleBattle extends Battle {

    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);

    public static pokemonAttack() {
        if (TemporaryBattleRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack() {
        if (TemporaryBattleRunner.running()) {
            super.clickAttack();
        }
    }


    public static defeatPokemon() {
        const enemyPokemon = super.enemyPokemon();
        if (!TemporaryBattleBattle.battle.optionalArgs.isTrainerBattle || enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow) {
            // Attempting to catch Pokemon
            const isShiny: boolean = enemyPokemon.shiny;
            const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
            const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
            if (pokeBall !== GameConstants.Pokeball.None) {
                this.prepareCatch(enemyPokemon, pokeBall);
                setTimeout(
                    () => {
                        this.attemptCatch(enemyPokemon, 1, player.region);
                        this.endFight();
                    },
                    App.game.pokeballs.calculateCatchTime(pokeBall)
                );
            } else {
                this.endFight();
            }
        } else {
            this.endFight();
        }
    }

    private static endFight() {
        if (TemporaryBattleBattle.index() >= TemporaryBattleBattle.battle.getPokemonList().length) {
            TemporaryBattleRunner.battleWon(TemporaryBattleBattle.battle);
        } else {
            TemporaryBattleBattle.generateNewEnemy();
        }

        TemporaryBattleBattle.enemyPokemon().defeat(this.battle.optionalArgs.isTrainerBattle ?? true);

        TemporaryBattleBattle.index(TemporaryBattleBattle.index() + 1);

        if (TemporaryBattleBattle.index() >= TemporaryBattleBattle.battle.getPokemonList().length) {
            TemporaryBattleRunner.battleWon(TemporaryBattleBattle.battle);
        } else {
            TemporaryBattleBattle.generateNewEnemy();
        }
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        this.catching(false);
        TemporaryBattleBattle.counter = 0;
        TemporaryBattleBattle.enemyPokemon(PokemonFactory.generateTemporaryBattlePokemon(TemporaryBattleBattle.battle, TemporaryBattleBattle.index()));
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.totalPokemons() - TemporaryBattleBattle.index();
    })

    static get battle(): TemporaryBattle {
        return TemporaryBattleRunner.battleObservable();
    }

    static set battle(battle: TemporaryBattle) {
        TemporaryBattleRunner.battleObservable(battle);
    }
}
