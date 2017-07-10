class DungeonBattle extends Battle {

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        DungeonRunner.fighting(false);
        player.gainMoney(this.enemyPokemon().money);
        player.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        player.addRouteKill();
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();

        let alreadyCaught: boolean = player.alreadyCaughtPokemon(this.enemyPokemon().name);
        let pokeBall: GameConstants.Pokeball = player.calculatePokeballToUse(alreadyCaught);

        if (pokeBall !== GameConstants.Pokeball.None) {
            DungeonBattle.pokeball = ko.observable(pokeBall);
            DungeonBattle.catching(true);
            setTimeout(
                () => {
                    this.throwPokeball(pokeBall);
                },
                player.calculateCatchTime()
            );
        }

        if(DungeonRunner.fightingBoss()){
            DungeonRunner.fightingBoss(false);
            DungeonRunner.dungeonWon();
        }
    }

    public static generateNewEnemy() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateDungeonPokemon(DungeonRunner.dungeon.pokemonList,DungeonRunner.chestsOpened, DungeonRunner.dungeon.baseHealth, DungeonRunner.dungeon.level));
    }

    public static generateNewBoss() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateDungeonBoss(DungeonRunner.dungeon.bossList,DungeonRunner.chestsOpened));
    }

}