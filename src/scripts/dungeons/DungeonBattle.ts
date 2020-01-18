class DungeonBattle extends Battle {

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        DungeonRunner.fighting(false);
        if (DungeonRunner.fightingBoss()) {
            DungeonRunner.fightingBoss(false);
            DungeonRunner.defeatedBoss(true);
        }
        App.game.wallet.gainMoney(this.enemyPokemon().money);
        App.game.party.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        player.gainShards(this.enemyPokemon().type1, this.enemyPokemon().shardReward);
        player.gainShards(this.enemyPokemon().type2, this.enemyPokemon().shardReward);
        player.defeatedAmount[this.enemyPokemon().id](player.defeatedAmount[this.enemyPokemon().id]() + 1);
        App.game.breeding.progressEggs(Math.floor(Math.sqrt(DungeonRunner.dungeon.itemRoute)));
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();

        const isShiny: boolean = this.enemyPokemon().shiny;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(this.enemyPokemon().id, isShiny);

        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch();
                    if (DungeonRunner.defeatedBoss()) {
                        DungeonRunner.dungeonWon();
                    }
                },
                App.game.pokeballs.calculateCatchTime(pokeBall)
            );
        } else if (DungeonRunner.defeatedBoss()) {
            DungeonRunner.dungeonWon();
        }
    }

    public static generateNewEnemy() {
        this.catching(false);
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateDungeonPokemon(DungeonRunner.dungeon.pokemonList, DungeonRunner.chestsOpened, DungeonRunner.dungeon.baseHealth, DungeonRunner.dungeon.level));
        DungeonRunner.fighting(true);
    }

    public static generateNewBoss() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateDungeonBoss(DungeonRunner.dungeon.bossList, DungeonRunner.chestsOpened));
    }

}
