///<reference path="../Battle.ts"/>
class TemporaryBattleBattle extends Battle {

    static battle: TemporaryBattle;
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
    /**
     * Award the player with exp, and go to the next pokemon
     */
    public static defeatPokemon() {
        TemporaryBattleBattle.enemyPokemon().defeat(this.battle.isTrainerBattle);

        // Make gym "route" regionless
        // App.game.breeding.progressEggsBattle(0, GameConstants.Region.none); TODO: set this
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
        TemporaryBattleBattle.counter = 0;
        TemporaryBattleBattle.enemyPokemon(PokemonFactory.generateTemporaryBattlePokemon(TemporaryBattleBattle.battle, TemporaryBattleBattle.index()));
    }

    public static pokemonsDefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.index();
    });

    public static pokemonsUndefeatedComputable: KnockoutComputed<number> = ko.pureComputed(() => {
        return TemporaryBattleBattle.totalPokemons() - TemporaryBattleBattle.index();
    })
}
