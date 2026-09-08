/// <reference path="../../declarations/GameHelper.d.ts" />

interface DungeonBattleCatchState {
    pokemon: BattlePokemon;
    pokeball: GameConstants.Pokeball;
    catchRateActual: number;
}

class DungeonBattle extends Battle {

    static trainer: KnockoutObservable<DungeonTrainer> = ko.observable(null);
    static trainerPokemonIndex: KnockoutObservable<number> = ko.observable(0);
    static catchingPokemons: KnockoutObservableArray<DungeonBattleCatchState> = ko.observableArray([]);
    static enemyPokemonView: KnockoutComputed<Array<BattlePokemon | null>> = ko.pureComputed(() => {
        return DungeonBattle.visibleEnemyPokemon(
            DungeonBattle.isDoubleTrainerBattle(),
            (enemyPokemon) => enemyPokemon.isAlive() || DungeonBattle.isCatchingPokemon(enemyPokemon)
        );
    });

    public static isDoubleTrainerBattle: KnockoutComputed<boolean> = ko.pureComputed(() => {
        return !!DungeonBattle.trainer()?.options?.isDoubleBattle;
    });

    public static remainingTrainerPokemon: KnockoutComputed<number> = ko.pureComputed(() => {
        if (!DungeonBattle.trainer()) {
            return 0;
        }
        return DungeonBattle.trainer().getTeam().length - DungeonBattle.trainerPokemonIndex();
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
    public static defeatPokemon(enemyPokemon = this.firstEnemyPokemon()) {
        if (!enemyPokemon) {
            return;
        }

        // Handle Trainer Pokemon defeat
        if (this.trainer()) {
            this.defeatTrainerPokemon(enemyPokemon);
            return;
        }

        DungeonRunner.fighting(false);
        if (DungeonRunner.fightingLootEnemy) {
            DungeonRunner.fightingLootEnemy = false;
        } else if (!DungeonRunner.fightingBoss()) {
            GameHelper.incrementObservable(DungeonRunner.encountersWon);
        }

        if (DungeonRunner.fightingBoss()) {
            DungeonRunner.fightingBoss(false);
            DungeonRunner.defeatedBoss(enemyPokemon.name);
        }
        enemyPokemon.defeat();
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        // Clearing Dungeon tile
        DungeonRunner.map.currentTile().type(GameConstants.DungeonTileType.empty);
        DungeonRunner.map.currentTile().calculateCssClass();

        // Attempting to catch Pokemon
        const isShiny: boolean = enemyPokemon.shiny;
        const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
        const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
        const route = player.town?.dungeon?.difficultyRoute || 1;
        const region = player.region;
        if (pokeBall !== GameConstants.Pokeball.None) {
            this.prepareCatch(enemyPokemon, pokeBall);
            setTimeout(
                () => {
                    this.attemptCatch(enemyPokemon, route, region);
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
    private static defeatTrainerPokemon(enemyPokemon: BattlePokemon) {
        enemyPokemon.defeat(true);

        GameHelper.incrementObservable(this.trainerPokemonIndex);
        App.game.breeding.progressEggsBattle(DungeonRunner.dungeon.difficultyRoute, player.region);
        player.lowerItemMultipliers(MultiplierDecreaser.Battle);

        if (enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow) {
            // Attempting to catch Pokemon
            const isShiny: boolean = enemyPokemon.shiny;
            const isShadow: boolean = enemyPokemon.shadow == GameConstants.ShadowStatus.Shadow;
            const pokeBall: GameConstants.Pokeball = App.game.pokeballs.calculatePokeballToUse(enemyPokemon.id, isShiny, isShadow, enemyPokemon.encounterType);
            const route = player.town?.dungeon?.difficultyRoute || 1;
            const region = player.region;
            if (pokeBall !== GameConstants.Pokeball.None) {
                const catchState = this.prepareTrainerCatch(enemyPokemon, pokeBall);
                setTimeout(
                    () => {
                        this.resolveCatchAttempt(enemyPokemon, route, region, catchState.catchRateActual, catchState.pokeball);
                        this.removeTrainerCatchState(enemyPokemon);
                        this.nextTrainerPokemon(enemyPokemon);
                    },
                    App.game.pokeballs.calculateCatchTime(pokeBall)
                );
            } else {
                DungeonBattle.nextTrainerPokemon(enemyPokemon);
            }
        } else {
            DungeonBattle.nextTrainerPokemon(enemyPokemon);
        }
    }


    private static nextTrainerPokemon(defeatedPokemon: BattlePokemon) {
        const trainer = this.trainer();
        if (!trainer) {
            return;
        }
        // No Pokemon left, trainer defeated
        if (this.trainerPokemonIndex() >= trainer.getTeam().length) {
            if (this.catchingPokemons().length) {
                return;
            }
            // rewards for defeating trainer
            if (trainer.options?.reward) {
                // Custom reward amount on defeat
                App.game.wallet.addAmount(trainer.options.reward);
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
            GameHelper.incrementObservable(DungeonRunner.encountersWon);
            if (DungeonRunner.fightingBoss()) {
                DungeonRunner.defeatedBoss(trainer.name);
            }
            this.trainer(null);
            this.trainerPokemonIndex(0);

            // Clearing Dungeon tile
            DungeonRunner.map.currentTile().type(GameConstants.DungeonTileType.empty);
            DungeonRunner.map.currentTile().calculateCssClass();

            // Update boss
            if (DungeonRunner.fightingBoss()) {
                DungeonRunner.fightingBoss(false);
                DungeonRunner.dungeonWon();
            }
        // Generate next trainer Pokemon
        } else {
            this.continueEnemyPokemon(
                defeatedPokemon,
                this.trainerPokemonIndex(),
                trainer.getTeam().length,
                (pokemonIndex) => this.generateTrainerPokemonByIndex(pokemonIndex)
            );
        }
    }

    public static generateNewEnemy() {
        this.catching(false);
        this.catchingPokemons([]);
        this.counter = 0;

        // Finding enemy from enemyList
        const enemy = Rand.fromWeightedArray(DungeonRunner.dungeon.availableMinions(), DungeonRunner.dungeon.weightList);
        // Pokemon
        if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {
            const pokemon = (typeof enemy === 'string') ? enemy : (<DetailedPokemon>enemy).pokemon;
            const enemyPokemon = PokemonFactory.generateDungeonPokemon(pokemon, DungeonRunner.chestsOpened(), DungeonRunner.dungeon.baseHealth, DungeonRunner.dungeonLevel());
            this.setEnemyPokemon(enemyPokemon);

            PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
            // Shiny
            if (enemyPokemon.shiny) {
                App.game.logbook.newLog(
                    LogBookTypes.SHINY,
                    App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                        ? createLogContent.encounterShinyDupe({
                            location: player.town.dungeon.name,
                            pokemon: enemyPokemon.name,
                        })
                        : createLogContent.encounterShiny({
                            location: player.town.dungeon.name,
                            pokemon: enemyPokemon.name,
                        })
                );
            } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) {
                App.game.logbook.newLog(
                    LogBookTypes.NEW,
                    createLogContent.encounterWild({
                        location: player.town.dungeon.name,
                        pokemon: enemyPokemon.name,
                    })
                );
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
        this.catchingPokemons([]);
        this.counter = 0;
        const enemyPokemon = PokemonFactory.generateDungeonPokemon(pokemon
            , DungeonRunner.chestsOpened(), DungeonRunner.dungeon.baseHealth * 2, DungeonRunner.dungeonLevel(), true);
        this.setEnemyPokemon(enemyPokemon);
        PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
        // Shiny
        if (enemyPokemon.shiny) {
            App.game.logbook.newLog(
                LogBookTypes.SHINY,
                App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                    ? createLogContent.encounterShinyDupe({
                        location: player.town.dungeon.name,
                        pokemon: enemyPokemon.name,
                    })
                    : createLogContent.encounterShiny({
                        location: player.town.dungeon.name,
                        pokemon: enemyPokemon.name,
                    })
            );
        } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) {
            App.game.logbook.newLog(
                LogBookTypes.NEW,
                createLogContent.encounterWild({
                    location: player.town.dungeon.name,
                    pokemon: enemyPokemon.name,
                })
            );
        }
        DungeonRunner.fighting(true);
    }

    /**
     * Handles generating the enemy Trainer Pokemon
     */
    public static generateTrainerPokemon() {
        this.counter = 0;
        this.startEnemyPokemon(
            this.trainer().getTeam().length,
            (pokemonIndex) => this.generateTrainerPokemonByIndex(pokemonIndex),
            this.isDoubleTrainerBattle() ? 2 : 1
        );
    }

    private static generateTrainerPokemonByIndex(pokemonIndex: number): BattlePokemon {
        const pokemon = this.trainer().getTeam()[pokemonIndex];
        const baseHealth = DungeonRunner.fightingBoss() ? pokemon.maxHealth : DungeonRunner.dungeon.baseHealth;
        const level = DungeonRunner.fightingBoss() ? pokemon.level : DungeonRunner.dungeonLevel();
        return PokemonFactory.generateDungeonTrainerPokemon(pokemon, DungeonRunner.chestsOpened(), baseHealth, level, DungeonRunner.fightingBoss(), this.trainer().getTeam().length);
    }

    public static generateNewBoss() {
        DungeonRunner.fighting(true);
        this.catching(false);
        this.catchingPokemons([]);
        this.counter = 0;

        // Finding boss from bossList
        const enemy = Rand.fromWeightedArray(DungeonRunner.dungeon.availableBosses(), DungeonRunner.dungeon.bossWeightList);
        // Pokemon
        if (enemy instanceof DungeonBossPokemon) {
            const enemyPokemon = PokemonFactory.generateDungeonBoss(enemy, DungeonRunner.chestsOpened());
            this.setEnemyPokemon(enemyPokemon);
            PokemonHelper.incrementPokemonStatistics(enemyPokemon.id, GameConstants.PokemonStatisticsType.Encountered, enemyPokemon.shiny, enemyPokemon.gender, enemyPokemon.shadow);
            // Shiny
            if (enemyPokemon.shiny) {
                App.game.logbook.newLog(
                    LogBookTypes.SHINY,
                    App.game.party.alreadyCaughtPokemon(enemyPokemon.id, true)
                        ? createLogContent.encounterShinyDupe({
                            location: player.town.dungeon.name,
                            pokemon: enemyPokemon.name,
                        })
                        : createLogContent.encounterShiny({
                            location: player.town.dungeon.name,
                            pokemon: enemyPokemon.name,
                        })
                );
            } else if (!App.game.party.alreadyCaughtPokemon(enemyPokemon.id)) {
                App.game.logbook.newLog(
                    LogBookTypes.NEW,
                    createLogContent.encounterWild({
                        location: player.town.dungeon.name,
                        pokemon: enemyPokemon.name,
                    })
                );
            }
        } else {
            this.trainer(enemy);
            this.trainerPokemonIndex(0);

            this.generateTrainerPokemon();
        }
    }

    public static isCatchingPokemon(pokemon: BattlePokemon): boolean {
        return !!pokemon && this.catchingPokemons().some((catchState) => catchState.pokemon === pokemon);
    }

    public static getCatchState(pokemon: BattlePokemon): DungeonBattleCatchState {
        return this.catchingPokemons().find((catchState) => catchState.pokemon === pokemon);
    }

    private static prepareTrainerCatch(enemyPokemon: BattlePokemon, pokeball: GameConstants.Pokeball): DungeonBattleCatchState {
        const catchState = {
            pokemon: enemyPokemon,
            pokeball,
            catchRateActual: this.calculateActualCatchRate(enemyPokemon, pokeball),
        };
        this.catchingPokemons.push(catchState);
        this.pokeball(pokeball);
        this.catchRateActual(catchState.catchRateActual);
        this.catching(true);
        App.game.pokeballs.usePokeball(pokeball);
        return catchState;
    }

    private static removeTrainerCatchState(enemyPokemon: BattlePokemon): void {
        this.catchingPokemons.remove((catchState) => catchState.pokemon === enemyPokemon);
        this.catching(this.catchingPokemons().length > 0);
        if (!this.catching()) {
            this.catchRateActual(null);
        }
    }

}
