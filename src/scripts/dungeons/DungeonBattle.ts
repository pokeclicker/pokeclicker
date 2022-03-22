/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../Battle.ts" />

class DungeonBattle extends Battle {

    static trainer: KnockoutObservable<DungeonTrainer> = ko.observable(null);
    static trainerPokemonIndex: KnockoutObservable<number> = ko.observable(0);

    public static remainingTrainerPokemon: KnockoutComputed<number> = ko.pureComputed(() => {
        if (!DungeonBattle.trainer()) {
            return 0;
        }
        return DungeonBattle.trainer().team.length - DungeonBattle.trainerPokemonIndex();
    });

    public static defeatedTrainerPokemon: KnockoutComputed<number> = ko.pureComputed(() => {
        if (!DungeonBattle.trainer()) {
            return 0;
        }
        return DungeonBattle.trainerPokemonIndex();
    });

    /**
     * Award the player with money and exp, and throw a Pokéball if applicable
     */
    public static defeatPokemon() {
        const enemyPokemon: BattlePokemon = this.enemyPokemon();

        // Handle Trainer Pokemon defeat
        if (this.trainer()) {
            this.defeatTrainerPokemon();
            return;
        }

        DungeonRunner.fighting(false);
        if (DungeonRunner.fightingBoss()) {
            DungeonRunner.fightingBoss(false);
            DungeonRunner.defeatedBoss(true);
        }
        enemyPokemon.defeat();
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        // Clearing Dungeon tile
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
        DungeonRunner.map.currentTile().calculateCssClass();

        // Attempting to catch Pokemon
        const isShiny: boolean = enemyPokemon.shiny;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny);
        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(enemyPokemon, pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch(enemyPokemon);
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

    /**
     * Handles defeating a trainer Pokemon
     */
    private static defeatTrainerPokemon() {
        this.enemyPokemon().defeat(true);

        GameHelper.incrementObservable(this.trainerPokemonIndex);
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        // No Pokemon left, trainer defeated
        if (this.trainerPokemonIndex() >= this.trainer().team.length) {
            // rewards for defeating trainer
            if (this.trainer().options.reward) {
                // Custom reward amount on defeat
                App.game.wallet.addAmount(this.trainer().options.reward);
            } else {
                const dungeonCost = DungeonRunner.dungeon.tokenCost;
                // Reward back 50% or 100% (boss) of the total dungeon DT cost as money (excludes achievement multiplier)
                const money = Math.round(dungeonCost * (DungeonRunner.fightingBoss() ? 1 : 0.5));
                App.game.wallet.gainMoney(money, true);
                // Reward back 4% or 10% (boss) of the total dungeon DT cost (excludes achievement multiplier)
                const tokens = Math.round(dungeonCost * (DungeonRunner.fightingBoss() ? 0.1 : 0.04));
                App.game.wallet.gainDungeonTokens(tokens, true);
            }

            DungeonRunner.fighting(false);
            this.trainer(null);
            this.trainerPokemonIndex(0);

            // Clearing Dungeon tile
            DungeonRunner.map.currentTile().type(GameConstants.DungeonTile.empty);
            DungeonRunner.map.currentTile().calculateCssClass();

            // Update boss
            if (DungeonRunner.fightingBoss()) {
                DungeonRunner.fightingBoss(false);
                DungeonRunner.defeatedBoss(true);
                DungeonRunner.dungeonWon();
            }
        // Generate next trainer Pokemon
        } else {
            this.generateTrainerPokemon();
        }
    }

    public static generateNewEnemy() {
        this.catching(false);
        this.counter = 0;

        // Finding enemy from enemyList
        const enemy = Rand.fromWeightedArray(DungeonRunner.dungeon.availableMinions(), DungeonRunner.dungeon.weightList);
        // Pokemon
        if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {
            const pokemon = (typeof enemy === 'string') ? enemy : (<DetailedPokemon>enemy).pokemon;
            const enemyPokemon = PokemonFactory.generateDungeonPokemon(pokemon, DungeonRunner.chestsOpened, DungeonRunner.dungeon.baseHealth, DungeonRunner.dungeonLevel());
            this.enemyPokemon(enemyPokemon);

            GameHelper.incrementObservable(App.game.statistics.pokemonEncountered[enemyPokemon.id]);
            GameHelper.incrementObservable(App.game.statistics.totalPokemonEncountered);
            if (enemyPokemon.shiny) {
                GameHelper.incrementObservable(App.game.statistics.shinyPokemonEncountered[enemyPokemon.id]);
                GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonEncountered);
                App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().dungeon.name}] You encountered a Shiny ${this.enemyPokemon().name}.`);
            } else if (!App.game.party.alreadyCaughtPokemon(this.enemyPokemon().id)) {
                App.game.logbook.newLog(LogBookTypes.NEW, `[${player.town().dungeon.name}] You encountered a wild ${this.enemyPokemon().name}.`);
            }
        // Trainer
        } else {
            const trainer = <DungeonTrainer>enemy;
            this.trainer(trainer);
            this.trainerPokemonIndex(0);

            this.generateTrainerPokemon();
        }

        DungeonRunner.fighting(true);
    }

    public static generateNewLootEnemy(pokemon: PokemonNameType) {
        this.catching(false);
        this.counter = 0;
        const enemyPokemon = PokemonFactory.generateDungeonPokemon(pokemon
            , DungeonRunner.chestsOpened, DungeonRunner.dungeon.baseHealth * 2, DungeonRunner.dungeonLevel());
        this.enemyPokemon(enemyPokemon);

        GameHelper.incrementObservable(App.game.statistics.pokemonEncountered[enemyPokemon.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonEncountered);
        if (enemyPokemon.shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonEncountered[enemyPokemon.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonEncountered);
            App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().dungeon.name}] You encountered a Shiny ${this.enemyPokemon().name}.`);
        } else if (!App.game.party.alreadyCaughtPokemon(this.enemyPokemon().id)) {
            App.game.logbook.newLog(LogBookTypes.NEW, `[${player.town().dungeon.name}] You encountered a wild ${this.enemyPokemon().name}.`);
        }
        DungeonRunner.fighting(true);
    }

    /**
     * Handles generating the enemy Trainer Pokemon
     */
    public static generateTrainerPokemon() {
        this.counter = 0;

        const pokemon = this.trainer().team[this.trainerPokemonIndex()];
        const baseHealth = DungeonRunner.fightingBoss() ? pokemon.maxHealth : DungeonRunner.dungeon.baseHealth;
        const level = DungeonRunner.fightingBoss() ? pokemon.level : DungeonRunner.dungeonLevel();
        const enemyPokemon = PokemonFactory.generateDungeonTrainerPokemon(pokemon, DungeonRunner.chestsOpened, baseHealth, level);

        this.enemyPokemon(enemyPokemon);
    }

    public static generateNewBoss() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.counter = 0;

        // Finding boss from bossList
        const enemy = Rand.fromWeightedArray(DungeonRunner.dungeon.availableBosses(), DungeonRunner.dungeon.bossWeightList);
        // Pokemon
        if (enemy instanceof DungeonBossPokemon) {
            this.enemyPokemon(PokemonFactory.generateDungeonBoss(enemy, DungeonRunner.chestsOpened));
            GameHelper.incrementObservable(App.game.statistics.pokemonEncountered[this.enemyPokemon().id]);
            GameHelper.incrementObservable(App.game.statistics.totalPokemonEncountered);

            if (this.enemyPokemon().shiny) {
                GameHelper.incrementObservable(App.game.statistics.shinyPokemonEncountered[this.enemyPokemon().id]);
                GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonEncountered);
                App.game.logbook.newLog(LogBookTypes.SHINY, `[${player.town().dungeon.name}] You encountered a Shiny ${this.enemyPokemon().name}.`);
            } else if (!App.game.party.alreadyCaughtPokemon(this.enemyPokemon().id)) {
                App.game.logbook.newLog(LogBookTypes.NEW, `[${player.town().dungeon.name}] You encountered a wild ${this.enemyPokemon().name}.`);
            }
        } else {
            this.trainer(enemy);
            this.trainerPokemonIndex(0);

            this.generateTrainerPokemon();
        }
    }

}
