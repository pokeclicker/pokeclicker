/// <reference path="../declarations/DataStore/BadgeCase.d.ts" />
/// <reference path="../declarations/GameHelper.d.ts" />
/// <reference path="../declarations/party/Category.d.ts"/>

/**
 * Main game class.
 */
class Game {
    frameRequest;
    public static achievementCounter = 0;

    // Features

    private _gameState: KnockoutObservable<GameConstants.GameState>;
    private worker: Worker;

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
        public gems: Gems,
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
        AchievementHandler.initialize(this.multiplier, this.challenges);
        FarmController.initialize();
        EffectEngineRunner.initialize(this.multiplier);
        FluteEffectRunner.initialize(this.multiplier);
        ItemHandler.initilizeEvoStones();
        this.profile.initialize();
        this.breeding.initialize();
        this.pokeballs.initialize();
        this.keyItems.initialize();
        this.oakItems.initialize();
        this.underground.initialize();
        this.farming.initialize();
        this.specialEvents.initialize();
        this.load();

        // Update if the achievements are already completed
        AchievementHandler.preCheckAchievements();

        // TODO refactor to proper initialization methods
        if (player.starter() != GameConstants.Starter.None) {
            Battle.generateNewEnemy();
        } else {
            const battlePokemon = new BattlePokemon('MissingNo.', 0, PokemonType.None, PokemonType.None, 0, 0, 0, 0, new Amount(0, GameConstants.Currency.money), false);
            Battle.enemyPokemon(battlePokemon);
        }
        this.farming.resetAuras();
        //Safari.load();
        Underground.energyTick(this.underground.getEnergyRegenTime());
        AchievementHandler.calculateMaxBonus(); //recalculate bonus based on active challenges

        const now = new Date();
        SeededDateRand.seedWithDate(now);
        DailyDeal.generateDeals(this.underground.getDailyDealsMax(), now);
        BerryDeal.generateDeals(now);
        Weather.generateWeather(now);
        GemDeal.generateDeals();
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
            if (numberOfPokemonDefeated === 0) {
                return;
            }
            const routeMoney: number = PokemonFactory.routeMoney(player.route(), player.region, false);
            const baseMoneyToEarn = numberOfPokemonDefeated * routeMoney;
            const moneyToEarn = Math.floor(baseMoneyToEarn * 0.5);//Debuff for offline money
            App.game.wallet.gainMoney(moneyToEarn, true);

            Notifier.notify({
                type: NotificationConstants.NotificationOption.info,
                title: 'Offline progress',
                message: `Defeated: ${numberOfPokemonDefeated.toLocaleString('en-US')} Pokémon\nEarned: <img src="./assets/images/currency/money.svg" height="24px"/> ${moneyToEarn.toLocaleString('en-US')}`,
                strippedMessage: `Defeated: ${numberOfPokemonDefeated.toLocaleString('en-US')} Pokémon\nEarned: ${moneyToEarn.toLocaleString('en-US')} money`,
                timeout: 2 * GameConstants.MINUTE,
                setting: NotificationConstants.NotificationSetting.General.offline_earnings,
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
                // Defeated stage 100, has obtained deoxys
                App.game.quests.getQuestLine('Mystery of Deoxys').state(QuestLineState.ended);
            } else if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Champion Wallace')]() >= 1) {
                // Has defeated the Hoenn champion, Quest is started
                App.game.quests.getQuestLine('Mystery of Deoxys').state(QuestLineState.started);
                App.game.quests.getQuestLine('Mystery of Deoxys').beginQuest(App.game.quests.getQuestLine('Mystery of Deoxys').curQuest());
            }
        }
        // Mining expedition questline
        if (App.game.quests.getQuestLine('Mining Expedition').state() == QuestLineState.inactive) {
            if (App.game.party.alreadyCaughtPokemon(142)) {
                // Has obtained Aerodactyl
                App.game.quests.getQuestLine('Mining Expedition').state(QuestLineState.ended);
            } else if (App.game.badgeCase.badgeList[BadgeEnums.Soul]()) {
                // Has the soul badge, Quest is started
                App.game.quests.getQuestLine('Mining Expedition').state(QuestLineState.started);
                App.game.quests.getQuestLine('Mining Expedition').beginQuest(App.game.quests.getQuestLine('Mining Expedition').curQuest());
            }
        }
        // Check if Koga has been defeated, but have no safari ticket yet
        if (App.game.badgeCase.badgeList[BadgeEnums.Soul]() && !App.game.keyItems.itemList[KeyItemType.Safari_ticket].isUnlocked()) {
            App.game.keyItems.gainKeyItem(KeyItemType.Safari_ticket, true);
        }
        // Check if Giovanni has been defeated, but have no gem case yet
        if (App.game.badgeCase.badgeList[BadgeEnums.Earth]() && !App.game.keyItems.itemList[KeyItemType.Gem_case].isUnlocked()) {
            App.game.keyItems.gainKeyItem(KeyItemType.Gem_case, true);
        }
        // Check that none of our quest are less than their initial value
        App.game.quests.questLines().filter(q => q.state() == 1).forEach(questLine => {
            const quest = questLine.curQuestObject();
            if (quest.initial() > quest.focus()) {
                quest.initial(quest.focus());
            }
        });
    }

    start() {
        console.log(`[${GameConstants.formatDate(new Date())}] %cGame started`, 'color:#2ecc71;font-weight:900;');
        if (player.starter() === GameConstants.Starter.None) {
            StartSequenceRunner.start();
        }

        let pageHidden = document.hidden;

        // requestAnimationFrame (consistent if page visible)
        let lastFrameTime = 0;
        let ticks = 0;
        const tick = (currentFrameTime) => {
            // Don't process while page hidden
            if (pageHidden) {
                this.frameRequest = requestAnimationFrame(tick);
                return;
            }

            const delta = currentFrameTime - lastFrameTime;
            ticks += delta;
            lastFrameTime = currentFrameTime;
            if (ticks >= GameConstants.TICK_TIME) {
                // Skip the ticks if we have too many...
                if (ticks >= GameConstants.TICK_TIME * 2) {
                    ticks = 0;
                } else {
                    ticks -= GameConstants.TICK_TIME;
                }
                this.gameTick();
            }
            this.frameRequest = requestAnimationFrame(tick);
        };
        this.frameRequest = requestAnimationFrame(tick);

        // Try start our webworker so we can process stuff while the page isn't focused
        try {
            console.log(`[${GameConstants.formatDate(new Date())}] %cStarting web worker..`, 'color:#8e44ad;font-weight:900;');
            const blob = new Blob([
                `
                // Window visibility state
                let pageHidden = false;
                self.onmessage = function(e) {
                    if (e.data.pageHidden != undefined) {
                        pageHidden = e.data.pageHidden;
                    }
                };

                // setInterval (slightly slower on FireFox)
                const tickInterval = setInterval(() => {
                    // Don't process while page visible
                    if (!pageHidden) return;

                    postMessage('tick')
                }, ${GameConstants.TICK_TIME});
                `,
            ]);
            const blobURL = window.URL.createObjectURL(blob);

            this.worker = new Worker(blobURL);
            // use a setTimeout to queue the event
            this.worker?.addEventListener('message', () => Settings.getSetting('useWebWorkerForGameTicks').value ? this.gameTick() : null);

            // Let our worker know if the page is visible or not
            document.addEventListener('visibilitychange', () => {
                if (pageHidden != document.hidden) {
                    pageHidden = document.hidden;
                    this.worker.postMessage({'pageHidden': pageHidden});
                }
            });
            this.worker.postMessage({'pageHidden': pageHidden});
            if (this.worker) {
                console.log(`[${GameConstants.formatDate(new Date())}] %cWeb worker started`, 'color:#2ecc71;font-weight:900;');
            }
        } catch (e) {
            console.error(`[${GameConstants.formatDate(new Date())}] Web worker error`, e);
        }

        window.onbeforeunload = () => {
            this.save();
        };
    }

    stop() {
        cancelAnimationFrame(this.frameRequest);
        window.onbeforeunload = () => {};
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
            case GameConstants.GameState.temporaryBattle: {
                TemporaryBattleBattle.counter += GameConstants.TICK_TIME;
                if (TemporaryBattleBattle.counter >= GameConstants.BATTLE_TICK) {
                    TemporaryBattleBattle.tick();
                }
                TemporaryBattleRunner.tick();
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
                SeededDateRand.seedWithDate(now);
                // Give the player a free quest refresh
                this.quests.freeRefresh(true);
                //Refresh the Underground deals
                DailyDeal.generateDeals(this.underground.getDailyDealsMax(), now);
                BerryDeal.generateDeals(now);
                if (this.underground.canAccess() || App.game.quests.isDailyQuestsUnlocked()) {
                    Notifier.notify({
                        title: 'It\'s a new day!',
                        message: `${this.underground.canAccess() ? 'Your Underground deals have been updated.\n' : ''}` +
                        `${App.game.quests.isDailyQuestsUnlocked() ? '<i>You have a free quest refresh.</i>' : ''}`,
                        type: NotificationConstants.NotificationOption.info,
                        timeout: 3e4,
                    });
                }
                DayOfWeekRequirement.date(now.getDay());
            }

            // Check if it's a new hour
            if (old.getHours() !== now.getHours()) {
                Weather.generateWeather(now);
                RoamingPokemonList.generateIncreasedChanceRoutes(now);
            }

            this.save();
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

        // Effect Engine (battle items and flutes)
        EffectEngineRunner.counter += GameConstants.TICK_TIME;
        if (EffectEngineRunner.counter >= GameConstants.EFFECT_ENGINE_TICK) {
            EffectEngineRunner.tick();
        }
        FluteEffectRunner.counter += GameConstants.TICK_TIME;
        if (FluteEffectRunner.counter >= GameConstants.EFFECT_ENGINE_TICK) {
            FluteEffectRunner.tick();
        }

        // Game timers
        GameHelper.counter += GameConstants.TICK_TIME;
        if (GameHelper.counter >= GameConstants.MINUTE) {
            GameHelper.tick();
        }
    }

    save() {
        player._lastSeen = Date.now();
        Save.store(player);
    }

    // Knockout getters/setters
    get gameState() {
        return this._gameState();
    }

    set gameState(value) {
        this._gameState(value);
    }
}
