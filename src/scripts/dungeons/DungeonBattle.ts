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
        App.game.party.gainExp(this.enemyPokemon().exp, this.enemyPokemon().level, false);
        this.gainShardsAfterBattle();
        player.defeatedAmount[this.enemyPokemon().id](player.defeatedAmount[this.enemyPokemon().id]() + 1);
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.itemRoute, player.region);
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

        if (this.enemyPokemon().shiny) {
            App.game.logbook.newLog(LogBookTypes.SHINY, `You encountered a Shiny ${this.enemyPokemon().name} at ${player.town().dungeon().name()}.`);
        } else if (!App.game.party.alreadyCaughtPokemon(this.enemyPokemon().id)) {
            App.game.logbook.newLog(LogBookTypes.NEW, `You encountered a wild ${this.enemyPokemon().name} at ${player.town().dungeon().name()}.`);
        }

        DungeonRunner.fighting(true);
    }

    public static generateNewBoss() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.counter = 0;
        this.enemyPokemon(PokemonFactory.generateDungeonBoss(DungeonRunner.dungeon.bossList, DungeonRunner.chestsOpened));

        if (this.enemyPokemon().shiny) {
            App.game.logbook.newLog(LogBookTypes.SHINY, `You encountered a Shiny ${this.enemyPokemon().name} at ${player.town().dungeon().name()}.`);
        } else if (!App.game.party.alreadyCaughtPokemon(this.enemyPokemon().id)) {
            App.game.logbook.newLog(LogBookTypes.NEW, `You encountered a wild ${this.enemyPokemon().name} at ${player.town().dungeon().name()}.`);
        }
    }

}
