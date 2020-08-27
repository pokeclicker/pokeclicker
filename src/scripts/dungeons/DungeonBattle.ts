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
        this.enemyPokemon().defeat();
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
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

        const enemyPokemon = this.enemyPokemon();
        GameHelper.incrementObservable(App.game.statistics.pokemonEncountered[enemyPokemon.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonEncountered);
        if (enemyPokemon.shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonEncountered[enemyPokemon.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonEncountered);
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
        GameHelper.incrementObservable(App.game.statistics.pokemonEncountered[this.enemyPokemon().id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonEncountered);

        if (this.enemyPokemon().shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonEncountered[this.enemyPokemon().id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonEncountered);
            App.game.logbook.newLog(LogBookTypes.SHINY, `You encountered a Shiny ${this.enemyPokemon().name} at ${player.town().dungeon().name()}.`);
        } else if (!App.game.party.alreadyCaughtPokemon(this.enemyPokemon().id)) {
            App.game.logbook.newLog(LogBookTypes.NEW, `You encountered a wild ${this.enemyPokemon().name} at ${player.town().dungeon().name()}.`);
        }
    }

}
