/// <reference path="../declarations/TemporaryScriptTypes.d.ts" />
/// <reference path="../declarations/DataStore/BadgeCase.d.ts" />
/// <reference path="../declarations/GameHelper.d.ts" />
/// <reference path="../declarations/party/Category.d.ts"/>
/// <reference path="../declarations/effectEngine/effectEngineRunner.d.ts"/>
/// <reference path="../declarations/items/ItemHandler.d.ts"/>

/**
 * Main game class.
 */
class Game implements TmpGameType {
    frameRequest;
    public static achievementCounter = 0;
    private _gameState: KnockoutObservable<GameConstants.GameState>;
    private worker: Worker;

    // Features
    public update: Update;
    public profile: Profile;
    public breeding: Breeding;
    public pokeballs: Pokeballs;
    public pokeballFilters: PokeballFilters;
    public wallet: Wallet;
    public keyItems: KeyItems;
    public badgeCase: BadgeCase;
    public oakItems: OakItems;
    public oakItemLoadouts: OakItemLoadouts;
    public categories: PokemonCategories;
    public party: Party;
    public gems: Gems;
    public underground: Underground;
    public farming: Farming;
    public logbook: LogBook;
    public redeemableCodes: RedeemableCodes;
    public statistics: Statistics;
    public quests: Quests;
    public specialEvents: SpecialEvents;
    public discord: Discord;
    public achievementTracker: AchievementTracker;
    public challenges: Challenges;
    public battleFrontier: BattleFrontier;
    public multiplier: Multiplier;
    public saveReminder: SaveReminder;
    public battleCafe: BattleCafeSaveObject;
    public dreamOrbController: DreamOrbController;
    public purifyChamber: PurifyChamber;
    public weatherApp: WeatherApp;
    public zMoves: ZMoves;
    public pokemonContest: PokemonContest;

    constructor() {
        // Needs to be loaded first so save data can be updated (specifically "player" data)
        this.update = new Update();
        this.multiplier = new Multiplier();

        // Load player
        player = Save.load();

        // Load other Features
        this.profile = new Profile();
        this.breeding = new Breeding(this.multiplier);
        this.pokeballs = new Pokeballs();
        this.pokeballFilters = new PokeballFilters();
        this.wallet = new Wallet(this.multiplier);
        this.keyItems = new KeyItems();
        this.badgeCase = new BadgeCase();
        this.oakItems = new OakItems([20, 50, 100], this.multiplier);
        this.oakItemLoadouts = new OakItemLoadouts();
        this.categories = new PokemonCategories();
        this.party = new Party(this.multiplier);
        this.gems = new Gems();
        this.underground = new Underground();
        this.farming = new Farming(this.multiplier);
        this.logbook = new LogBook();
        this.redeemableCodes = new RedeemableCodes();
        this.statistics = new Statistics();
        this.quests = new Quests();
        this.specialEvents = new SpecialEvents();
        this.discord = new Discord();
        this.achievementTracker = new AchievementTracker();
        this.challenges = new Challenges();
        this.battleFrontier = new BattleFrontier();
        this.saveReminder = new SaveReminder();
        this.battleCafe = new BattleCafeSaveObject();
        this.dreamOrbController = new DreamOrbController();
        this.purifyChamber = new PurifyChamber();
        this.weatherApp = new WeatherApp();
        this.zMoves = new ZMoves();
        this.pokemonContest = new PokemonContest();

        this._gameState = ko.observable(GameConstants.GameState.loading);
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

        AchievementHandler.fromJSON(saveObject.achievements);
    }

    initialize() {
        AchievementHandler.initialize(this.multiplier, this.challenges);
        FarmController.initialize();
        EffectEngineRunner.initialize(this.multiplier, GameHelper.enumStrings(GameConstants.BattleItemType).map((name) => ItemList[name]));
        ItemHandler.initializeItems();
        BreedingController.initialize();
        PokedexHelper.initialize();
        this.profile.initialize();
        this.breeding.initialize();
        this.pokeballs.initialize();
        this.keyItems.initialize();
        this.oakItems.initialize();
        this.underground.initialize();
        this.farming.initialize();
        this.specialEvents.initialize();
        this.pokeballFilters.initialize();
        this.load();

        // Unlock achievements that have already been completed, avoids renotifying
        AchievementHandler.preCheckAchievements();
        // Flute bonuses depend on achievements so should be initialized afterwards
        // but the bonuses can affect some achievements so we need to recheck them once flutes are online
        FluteEffectRunner.initialize(this.multiplier);
        AchievementHandler.preCheckAchievements();

        // TODO refactor to proper initialization methods
        if (player.regionStarters[GameConstants.Region.kanto]() != GameConstants.Starter.None) {
            Battle.generateNewEnemy();
        } else {
            const battlePokemon = new BattlePokemon('MissingNo.', 0, PokemonType.None, PokemonType.None, 0, 0, 0, 0, new Amount(0, GameConstants.Currency.money), false, 0, GameConstants.BattlePokemonGender.NoGender, GameConstants.ShadowStatus.None, EncounterType.route);
            Battle.enemyPokemon(battlePokemon);
        }
        //Safari.load();
        AchievementHandler.calculateMaxBonus(); //recalculate bonus based on active challenges

        const now = new Date();
        SeededDateRand.seedWithDate(now);
        BerryDeal.generateDeals(now);
        Weather.generateWeather(now);
        GemDeals.generateDeals();
        ShardDeal.generateDeals();
        GenericDeal.generateDeals();
        SafariPokemonList.generateSafariLists();
        RoamingPokemonList.generateIncreasedChanceRoutes(now);
        WeatherApp.initialize();
        PokemonContestController.generateDailyContest(now);
        DamageCalculator.initialize();

        if (Settings.getSetting('disableOfflineProgress').value === false) {
            this.computeOfflineEarnings();
        }
        this.checkAndFix();

        if (Settings.getSetting('disableAutoSave').value === true) {
            Notifier.notify({
                type: NotificationConstants.NotificationOption.danger,
                title: 'Auto Save Disabled',
                message: 'You have disabled auto saving! Be sure to manually save before exiting or any progress will be lost!',
                timeout: 5 * GameConstants.MINUTE,
            });
        }

        // If the player isn't on a route, they're in a town/dungeon
        this.gameState = player.route ? GameConstants.GameState.fighting : GameConstants.GameState.town;
    }

    computeOfflineEarnings() {
        const now = Date.now();
        const timeDiffInSeconds = Math.floor((now - player._lastSeen) / 1000);
        if (timeDiffInSeconds > 1) {
            // Only allow up to 24 hours worth of bonuses
            const timeDiffOverride = Math.min(86400, timeDiffInSeconds);
            let region: GameConstants.Region = player.region;
            let route: number = player.route || GameConstants.StartingRoutes[region];
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
            const routeMoney: number = PokemonFactory.routeMoney(player.route, player.region, false);
            const baseMoneyToEarn = numberOfPokemonDefeated * routeMoney;
            const moneyToEarn = Math.floor(baseMoneyToEarn * 0.5);//Debuff for offline money
            App.game.wallet.gainMoney(moneyToEarn, true);

            Notifier.notify({
                type: NotificationConstants.NotificationOption.info,
                title: 'Offline Bonus',
                message: `Defeated: ${numberOfPokemonDefeated.toLocaleString('en-US')} Pokémon\nEarned: <img src="./assets/images/currency/money.svg" height="24px"/> ${moneyToEarn.toLocaleString('en-US')}`,
                strippedMessage: `Defeated: ${numberOfPokemonDefeated.toLocaleString('en-US')} Pokémon\nEarned: ${moneyToEarn.toLocaleString('en-US')} Pokédollars`,
                timeout: 2 * GameConstants.MINUTE,
                setting: NotificationConstants.NotificationSetting.General.offline_earnings,
            });

            // Dream orbs
            if ((new DreamOrbTownContent()).isUnlocked()) {
                const orbsUnlocked = App.game.dreamOrbController.orbs.filter((o) => !o.requirement || o.requirement.isCompleted());
                const orbsEarned = Math.floor(timeDiffOverride / 3600);
                if (orbsEarned > 0) {
                    const orbAmounts = Object.fromEntries(orbsUnlocked.map(o => [o.color, 0]));
                    for (let i = 0; i < orbsEarned; i++) {
                        const orb = Rand.fromArray(orbsUnlocked);
                        GameHelper.incrementObservable(orb.amount);
                        orbAmounts[orb.color]++;
                    }
                    const messageAppend = Object.keys(orbAmounts).filter(key => orbAmounts[key] > 0).map(key => `<li>${orbAmounts[key]} ${key}</li>`).join('');
                    Notifier.notify({
                        type: NotificationConstants.NotificationOption.info,
                        title: 'Dream Orbs',
                        message: `Gained ${orbsEarned} Dream Orbs while offline:<br /><ul class="mb-0">${messageAppend}</ul>`,
                        timeout: 2 * GameConstants.MINUTE,
                        setting: NotificationConstants.NotificationSetting.General.offline_earnings,
                    });
                }
            }
        }
    }

    checkAndFix() {
        // Quest box not showing (game thinking tutorial is not completed)
        if (App.game.quests.getQuestLine('Tutorial Quests').state() == QuestLineState.inactive) {
            if (App.game.statistics.gymsDefeated[GameConstants.getGymIndex('Pewter City')]() >= 1) {
                // Defeated Brock, Has completed the Tutorial
                App.game.quests.getQuestLine('Tutorial Quests').state(QuestLineState.ended);
            } else if (player.regionStarters[GameConstants.Region.kanto]() > GameConstants.Starter.None) {
                // Has chosen a starter, Tutorial is started
                App.game.quests.getQuestLine('Tutorial Quests').state(QuestLineState.started);
                App.game.quests.getQuestLine('Tutorial Quests').beginQuest(App.game.quests.getQuestLine('Tutorial Quests').curQuest());
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
        App.game.quests.questLines().filter(q => q.state() == 1 && q.curQuest() < q.quests().length).forEach(questLine => {
            const quest = questLine.curQuestObject();
            if (quest instanceof MultipleQuestsQuest) {
                quest.quests.forEach((q) => {
                    if (q.initial() > q.focus()) {
                        q.initial(q.focus());
                    }
                });
            } else {
                if (quest.initial() > quest.focus()) {
                    quest.initial(quest.focus());
                    questLine.curQuestInitial(quest.initial());
                }
            }
        });
        // Check for breeding pokemons not in queue
        const breeding = [...App.game.breeding.eggList.map((l) => l().pokemon), ...App.game.breeding.queueList()];
        App.game.party.caughtPokemon.filter((p) => p.breeding).forEach((p) => {
            if (!breeding.includes(p.id)) {
                p.breeding = false;
            }
        });
        // Egg partyPokemon requires App.game.party and cannot be set until after loading is complete
        App.game.breeding.eggList.filter(e => e().pokemon).forEach(e => {
            e().setPartyPokemon();
        });

        // Kick player out of Client Island if they are not on the client
        if (!App.isUsingClient && player._townName === 'Client Island') {
            MapHelper.moveToTown('One Island');
        }
    }

    start() {
        console.log(`[${GameConstants.formatDate(new Date())}] %cGame started`, 'color:#2ecc71;font-weight:900;');
        if (player.regionStarters[GameConstants.Region.kanto]() === GameConstants.Starter.None) {
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

            document.addEventListener('visibilitychange', () => {
                // Let our worker know if the page is visible or not
                if (pageHidden != document.hidden) {
                    pageHidden = document.hidden;
                    this.worker.postMessage({'pageHidden': pageHidden});
                }

                // Save resources by not displaying updates if game is not currently visible
                const gameEl = document.getElementById('game');
                document.hidden ? gameEl.classList.add('hidden') : gameEl.classList.remove('hidden');
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

        console.log('%cStop!', 'color: red; font-size: 36px; font-weight: bold;');
        console.log('%cThis is a browser feature intended for developers. If you were told to copy-paste or enter something here to obtain an easter egg or unlock a secret, it can corrupt your save file, cause bugs, or otherwise break your game.', 'color: red; font-size: 16px;');
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
                // Time traveller flag
                if (old > now) {
                    Notifier.notify({
                        title: 'Welcome Time Traveller!',
                        message: `Please ensure you keep a backup of your old save as travelling through time can cause some serious problems.

                        Any Pokémon you may have obtained in the future could cease to exist which could corrupt your save file!`,
                        type: NotificationConstants.NotificationOption.danger,
                        timeout: GameConstants.HOUR,
                    });
                    player._timeTraveller = true;
                }

                GameHelper.updateDay();

                SeededDateRand.seedWithDate(now);
                // Give the player a free quest refresh
                this.quests.freeRefresh(true);
                //Refresh the Underground deals
                BerryDeal.generateDeals(now);
                if (App.game.quests.isDailyQuestsUnlocked()) {
                    Notifier.notify({
                        title: 'It\'s a new day!',
                        message: `${App.game.quests.isDailyQuestsUnlocked() ? '<i>You have a free quest refresh.</i>' : ''}`,
                        type: NotificationConstants.NotificationOption.info,
                        timeout: 3e4,
                    });
                }
                // Give the players more Battle Cafe spins
                BattleCafeController.spinsLeft(BattleCafeController.spinsPerDay());
                // Generate the weather forecast
                WeatherApp.initialize();
                // Refresh Friend Safari Pokemon List
                SafariPokemonList.generateKalosSafariList();

                // Reset some temporary battles
                Object.values(TemporaryBattleList).forEach(t => {
                    if (t.optionalArgs?.resetDaily) {
                        this.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(t.name)](0);
                    }
                });
            }

            // Check if it's a new hour
            if (old.getHours() !== now.getHours()) {
                Weather.generateWeather(now);
                RoamingPokemonList.generateIncreasedChanceRoutes(now);
                // Check if it's weather change time
                if (now.getHours() % Weather.period === 0) {
                    WeatherApp.checkDateHasPassed();
                }
            }

            player._lastSeen = Date.now();
            this.save();
        }

        // Underground
        if (this.underground.canAccess()) {
            this.underground.update(GameConstants.TICK_TIME / GameConstants.SECOND);
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

        this.zMoves.counter += GameConstants.TICK_TIME;
        if (this.zMoves.counter >= GameConstants.ZMOVE_TICK) {
            this.zMoves.tick();
        }

        // Game timers
        GameHelper.counter += GameConstants.TICK_TIME;
        if (GameHelper.counter >= GameConstants.MINUTE) {
            GameHelper.tick();
        }

        // Check our save reminder once every 5 minutes
        SaveReminder.counter += GameConstants.TICK_TIME;
        if (SaveReminder.counter >= 5 * GameConstants.MINUTE) {
            SaveReminder.tick();
        }

        // update event calendar
        this.specialEvents.counter += GameConstants.TICK_TIME;
        if (this.specialEvents.counter >= GameConstants.SPECIAL_EVENT_TICK) {
            this.specialEvents.tick();
        }
    }

    save() {
        if (Settings.getSetting('disableAutoSave').value === false) {
            Save.store(player);
        }
    }

    // Knockout getters/setters
    get gameState() {
        return this._gameState();
    }

    set gameState(value) {
        this._gameState(value);
    }
}
