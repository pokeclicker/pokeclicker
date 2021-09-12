/// <reference path="../declarations/DataStore/BadgeCase.d.ts" />
/// <reference path="../declarations/GameHelper.d.ts" />

/**
 * Main game class.
 */
class Game {
    interval;
    public static achievementCounter = 0;

    // Features

    private _gameState: KnockoutObservable<GameConstants.GameState>;

    /**
     * TODO(@Isha) pass all features through the constructor
     */
    constructor(
        public update: Update,
        public profile: Profile,
        public breeding: Breeding,
        public pokeballs: Pokeballs,
        public wallet: Wallet,
        public keyItems: KeyItems,
        public badgeCase: BadgeCase,
        public oakItems: OakItems,
        public oakItemLoadouts: OakItemLoadouts,
        public categories: PokemonCategories,
        public party: Party,
        public shards: Shards,
        public underground: Underground,
        public farming: Farming,
        public logbook: LogBook,
        public redeemableCodes: RedeemableCodes,
        public statistics: Statistics,
        public quests: Quests,
        public specialEvents: SpecialEvents,
        public discord: Discord,
        public achievementTracker: AchievementTracker,
        public challenges: Challenges,
        public battleFrontier: BattleFrontier,
        public multiplier: Multiplier
    ) {
        this._gameState = ko.observable(GameConstants.GameState.paused);

        AchievementHandler.initialize(multiplier, challenges);
        FarmController.initialize();
        EffectEngineRunner.initialize(multiplier);
    }

    load() {
        const saveJSON = localStorage.getItem(`save${Save.key}`);

        const saveObject = JSON.parse(saveJSON || '{}');

        Object.keys(this).filter(key => this[key]?.saveKey).forEach(key => {
            try {
                const saveKey = this[key].saveKey;
                // Load our save object or the default save data
                this[key].fromJSON(saveObject[saveKey] || this[key].toJSON());
            } catch (error) {
                console.error('Unable to load sava data from JSON for:', key, '\nError:\n', error);
            }
        });
    }

    initialize() {
        this.profile.initialize();
        this.breeding.initialize();
        this.pokeballs.initialize();
        this.keyItems.initialize();
        this.oakItems.initialize();
        this.underground.initialize();
        this.farming.initialize();
        this.specialEvents.initialize();
        this.load();

        // TODO refactor to proper initialization methods
        Battle.generateNewEnemy();
        this.farming.resetAuras();
        //Safari.load();
        Underground.energyTick(this.underground.getEnergyRegenTime());
        AchievementHandler.calculateMaxBonus(); //recalculate bonus based on active challenges

        const now = new Date();
        DailyDeal.generateDeals(this.underground.getDailyDealsMax(), now);
        BerryDeal.generateDeals(now);
        Weather.generateWeather(now);
        RoamingPokemonList.generateIncreasedChanceRoutes(now);

        this.computeOfflineEarnings();
        this.checkAndFix();

        // If the player isn't on a route, they're in a town/dungeon
        this.gameState = player.route() ? GameConstants.GameState.fighting : GameConstants.GameState.town;
    }

    computeOfflineEarnings() {
        const now = Date.now();
        const timeDiffInSeconds = Math.floor((now - player._lastSeen) / 1000);
        if (timeDiffInSeconds > 1) {
            // Only allow up to 24 hours worth of bonuses
            const timeDiffOverride = Math.min(86400, timeDiffInSeconds);
            let region: GameConstants.Region = player.region;
            let route: number = player.route() || GameConstants.StartingRoutes[region];
            if (!MapHelper.validRoute(route, region)) {
                route = 1;
                region = GameConstants.Region.kanto;
            }
            const availablePokemonMap = RouteHelper.getAvailablePokemonList(route, region).map(name => pokemonMap[name]);
            const maxHealth: number = PokemonFactory.routeHealth(route, region);
            let hitsToKill = 0;
            for (const pokemon of availablePokemonMap) {
                const type1: PokemonType = pokemon.type[0];
                const type2: PokemonType = pokemon.type.length > 1 ? pokemon.type[1] : PokemonType.None;
                const attackAgainstPokemon = App.game.party.calculatePokemonAttack(type1, type2);
                const currentHitsToKill: number = Math.ceil(maxHealth / attackAgainstPokemon);
                hitsToKill += currentHitsToKill;
            }
            hitsToKill = Math.ceil(hitsToKill / availablePokemonMap.length);
            const numberOfPokemonDefeated = Math.floor(timeDiffOverride / hitsToKill);
            const routeMoney: number = PokemonFactory.routeMoney(player.route(), player.region, false);
            const baseMoneyToEarn = numberOfPokemonDefeated * routeMoney;
            const moneyToEarn = Math.floor(baseMoneyToEarn * 0.5);//Debuff for offline money
            App.game.wallet.gainMoney(moneyToEarn, true);

            Notifier.notify({
                type: NotificationConstants.NotificationOption.info,
                title: 'Offline progress',
                message: `Defeated: ${numberOfPokemonDefeated.toLocaleString('en-US')} Pokémon\nEarned: <img src="./assets/images/currency/money.svg" height="24px"/> ${moneyToEarn.toLocaleString('en-US')}`,
                timeout: 2 * GameConstants.MINUTE,
            });
        }
    }

    checkAndFix() {
        // Quest box not showing (game thinking tutorial is not completed)
        if (App.game.quests.getQuestLine('Tutorial Quests').state() == QuestLineState.inactive) {
            if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Pewter City')]() >= 1) {
                // Defeated Brock, Has completed the Tutorial
                App.game.quests.getQuestLine('Tutorial Quests').state(QuestLineState.ended);
            } else if (player.starter() >= 0) {
                // Has chosen a starter, Tutorial is started
                App.game.quests.getQuestLine('Tutorial Quests').state(QuestLineState.started);
                App.game.quests.getQuestLine('Tutorial Quests').beginQuest(App.game.quests.getQuestLine('Tutorial Quests').curQuest());
            }
        }
        // Battle Frontier not accessable (chances are people broke this themselves, but whatever...)
        if (App.game.quests.getQuestLine('Mystery of Deoxys').state() == QuestLineState.inactive) {
            if (App.game.statistics.battleFrontierHighestStageCompleted() >= 100) {
                // Defeated Brock, Has completed the Tutorial
                App.game.quests.getQuestLine('Mystery of Deoxys').state(QuestLineState.ended);
            } else if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Champion Wallace')]() >= 1) {
                // Has chosen a starter, Tutorial is started
                App.game.quests.getQuestLine('Mystery of Deoxys').state(QuestLineState.started);
                App.game.quests.getQuestLine('Mystery of Deoxys').beginQuest(App.game.quests.getQuestLine('Mystery of Deoxys').curQuest());
            }
        }
    }

    start() {
        console.log(`[${GameConstants.formatDate(new Date())}] %cGame started`, 'color:#2ecc71;font-weight:900;');
        if (player.starter() === GameConstants.Starter.None) {
            StartSequenceRunner.start();
        }
        this.interval = setInterval(this.gameTick.bind(this), GameConstants.TICK_TIME);
    }

    stop() {
        clearTimeout(this.interval);
    }

    gameTick() {
        // Acheivements
        Game.achievementCounter += GameConstants.TICK_TIME;
        if (Game.achievementCounter >= GameConstants.ACHIEVEMENT_TICK) {
            Game.achievementCounter = 0;
            AchievementHandler.checkAchievements();
            GameHelper.incrementObservable(App.game.statistics.secondsPlayed);
        }

        // Battles
        switch (this.gameState) {
            case GameConstants.GameState.fighting: {
                Battle.counter += GameConstants.TICK_TIME;
                if (Battle.counter >= GameConstants.BATTLE_TICK) {
                    Battle.tick();
                }
                break;
            }
            case GameConstants.GameState.gym: {
                GymBattle.counter += GameConstants.TICK_TIME;
                if (GymBattle.counter >= GameConstants.BATTLE_TICK) {
                    GymBattle.tick();
                }
                GymRunner.tick();
                break;
            }
            case GameConstants.GameState.dungeon: {
                DungeonBattle.counter += GameConstants.TICK_TIME;
                if (DungeonBattle.counter >= GameConstants.BATTLE_TICK) {
                    DungeonBattle.tick();
                }
                DungeonRunner.tick();
                break;
            }
            case GameConstants.GameState.battleFrontier: {
                BattleFrontierBattle.counter += GameConstants.TICK_TIME;
                if (BattleFrontierBattle.counter >= GameConstants.BATTLE_FRONTIER_TICK) {
                    BattleFrontierBattle.tick();
                }
                BattleFrontierRunner.tick();
                break;
            }
        }

        // Auto Save
        Save.counter += GameConstants.TICK_TIME;
        if (Save.counter > GameConstants.SAVE_TICK) {
            const old = new Date(player._lastSeen);
            const now = new Date();

            // Check if it's a new day
            if (old.toLocaleDateString() !== now.toLocaleDateString()) {
                // Give the player a free quest refresh
                this.quests.freeRefresh(true);
                //Refresh the Underground deals
                DailyDeal.generateDeals(this.underground.getDailyDealsMax(), now);
                BerryDeal.generateDeals(now);
                Notifier.notify({
                    title: 'It\'s a new day!',
                    message: 'Your Underground deals have been updated.<br/><i>You have a free quest refresh.</i>',
                    type: NotificationConstants.NotificationOption.info,
                    timeout: 3e4,
                });
            }

            // Check if it's a new hour
            if (old.getHours() !== now.getHours()) {
                Weather.generateWeather(now);
                RoamingPokemonList.generateIncreasedChanceRoutes(now);
            }

            // Save the game
            player._lastSeen = Date.now();
            Save.store(player);
        }

        // Underground
        Underground.counter += GameConstants.TICK_TIME;
        if (Underground.counter >= GameConstants.UNDERGROUND_TICK) {
            Underground.energyTick(Math.max(0, Underground.energyTick() - 1));
            if (Underground.energyTick() == 0) {
                // Check completed in case mine is locked out
                Mine.checkCompleted();
                this.underground.gainEnergy();
                Underground.energyTick(this.underground.getEnergyRegenTime());
            }
            Underground.counter = 0;
        }

        // Farm
        this.farming.update(GameConstants.TICK_TIME / GameConstants.SECOND);

        // Effect Engine (battle items)
        EffectEngineRunner.counter += GameConstants.TICK_TIME;
        if (EffectEngineRunner.counter >= GameConstants.EFFECT_ENGINE_TICK) {
            EffectEngineRunner.tick();
        }

        // Game timers
        GameHelper.counter += GameConstants.TICK_TIME;
        if (GameHelper.counter >= GameConstants.MINUTE) {
            GameHelper.tick();
        }
    }

    save() {

    }

    // Knockout getters/setters
    get gameState() {
        return this._gameState();
    }

    set gameState(value) {
        this._gameState(value);
    }
}
