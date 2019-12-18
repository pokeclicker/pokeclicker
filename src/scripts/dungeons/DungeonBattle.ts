class DungeonBattle extends Battle {

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        DungeonRunner.fighting(false);
        player.gainMoney(this.enemyPokemon().money);
        player.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        player.gainShards(this.enemyPokemon());
        player.defeatedAmount[this.enemyPokemon().id](player.defeatedAmount[this.enemyPokemon().id]() + 1);
        BreedingHelper.progressEggs(Math.floor(Math.sqrt(DungeonRunner.dungeon.itemRoute)));
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();

        const pokemonName: string = this.enemyPokemon().name;
        const isShiny: boolean = this.enemyPokemon().shiny;
        const pokeBall: GameConstants.Pokeball = player.calculatePokeballToUse(pokemonName, isShiny);

        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch();
                    if (DungeonRunner.fightingBoss()) {
                        DungeonRunner.fightingBoss(false);
                        DungeonRunner.dungeonWon();
                    }
                },
                player.calculateCatchTime(pokeBall)
            );
        } else if (DungeonRunner.fightingBoss()) {
            DungeonRunner.fightingBoss(false);
            DungeonRunner.dungeonWon();
        }
    }

    public static generateNewEnemy() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateDungeonPokemon(DungeonRunner.dungeon.pokemonList, DungeonRunner.chestsOpened, DungeonRunner.dungeon.baseHealth, DungeonRunner.dungeon.level));
    }

    public static generateNewBoss() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateDungeonBoss(DungeonRunner.dungeon.bossList, DungeonRunner.chestsOpened));
    }

}
