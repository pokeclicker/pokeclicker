///<reference path="../Battle.ts"/>
class OneTimeBattleBattle extends Battle {

    static battle: OneTimeBattle;
    static index: KnockoutObservable<number> = ko.observable(0);
    static totalPokemons: KnockoutObservable<number> = ko.observable(0);

    public static pokemonAttack() {
        if (OneTimeBattleRunner.running()) {
            super.pokemonAttack();
        }
    }

    public static clickAttack() {
        if (OneTimeBattleRunner.running()) {
            super.clickAttack();
        }
    }
    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon() {
        OneTimeBattleBattle.enemyPokemon().defeat(true);

        // Make gym "route" regionless
        // App.game.breeding.progressEggsBattle(0, GameConstants.Region.none); TODO: set this
        OneTimeBattleBattle.index(OneTimeBattleBattle.index() + 1);

        if (OneTimeBattleBattle.index() >= OneTimeBattleBattle.battle.pokemons.length) {
            OneTimeBattleRunner.battleWon(OneTimeBattleBattle.battle);
        } else {
            OneTimeBattleBattle.generateNewEnemy();
        }
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);
    }

    /**
     * Reset the counter.
     */
    public static generateNewEnemy() {
        OneTimeBattleBattle.counter = 0;
        OneTimeBattleBattle.enemyPokemon(PokemonFactory.generateOneTimeBattlePokemon(OneTimeBattleBattle.battle, OneTimeBattleBattle.index()));
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return OneTimeBattleBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return OneTimeBattleBattle.totalPokemons() - OneTimeBattleBattle.index();
    })
}
