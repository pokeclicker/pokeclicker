/**
 * Main game class.
 */
class Game {
    interval;
    public static achievementCounter = 0;

    // Features
    public update: Update;
    public breeding: Breeding;
    public pokeballs: Pokeballs;
    public wallet: Wallet;
    public keyItems: KeyItems;
    public badgeCase: BadgeCase;
    public oakItems: OakItems;
    public party: Party;
    public shards: Shards;
    public farming: Farming;
    public logbook: LogBook;
    public redeemableCodes: RedeemableCodes;
    public statistics: Statistics;

    private _gameState: KnockoutObservable<GameConstants.GameState>;

    /**
     * TODO(@Isha) pass all features through the constructor
     */
    constructor(
        update: Update,
        breeding: Breeding,
        pokeballs: Pokeballs,
        wallet: Wallet,
        keyItems: KeyItems,
        badgeCase: BadgeCase,
        oakItems: OakItems,
        party: Party,
        shards: Shards,
        farming: Farming,
        logbook: LogBook,
        codes: RedeemableCodes,
        statistics: Statistics
    ) {
        this.update = update;
        this.breeding = breeding;
        this.pokeballs = pokeballs;
        this.wallet = wallet;
        this.keyItems = keyItems;
        this.badgeCase = badgeCase;
        this.oakItems = oakItems;
        this.party = party;
        this.shards = shards;
        this.farming = farming;
        this.logbook = logbook;
        this.redeemableCodes = codes;
        this.statistics = statistics;

        this._gameState = ko.observable(GameConstants.GameState.paused);


        player = Save.load();

        AchievementHandler.initialize();
    }

    load() {
        const saveJSON = localStorage.getItem('save');

        if (saveJSON !== null) {
            const saveObject = JSON.parse(saveJSON);

            Object.keys(saveObject).filter(key => this[key]?.saveKey).forEach(key => {
                this[key].fromJSON(saveObject[key]);
            });
        }
    }

    initialize() {
        this.breeding.initialize();
        this.pokeballs.initialize();
        this.keyItems.initialize();
        this.oakItems.initialize();
        this.farming.initialize();
        this.load();
        this.update.check();

        // TODO refactor to proper initialization methods
        Battle.generateNewEnemy();
        //Safari.load();
        Save.loadMine();
        Underground.energyTick(Underground.getEnergyRegenTime());
        DailyDeal.generateDeals(Underground.getDailyDealsMax(), new Date());
        QuestHelper.generateQuests(player.questLevel, player.questRefreshes, new Date());
        QuestHelper.loadCurrentQuests(player.currentQuests);
        if (!player.tutorialComplete()) {
            QuestLineHelper.createTutorial();
            QuestLineHelper.tutorial.resumeAt(player.tutorialProgress(), player.tutorialState);
        }

        this.gameState = GameConstants.GameState.fighting;
    }

    start() {
        console.log('%cGame started', 'color:limegreen;font-weight:900;');
        if (player.starter === GameConstants.Starter.None) {
            StartSequenceRunner.start();
        }
        this.interval = setInterval(this.gameTick.bind(this), GameConstants.TICK_TIME);
    }

    stop() {
        clearTimeout(this.interval);
    }

    gameTick() {
        // Update tick counters
        EffectEngineRunner.counter += GameConstants.TICK_TIME;
        Game.achievementCounter += GameConstants.TICK_TIME;
        if (Game.achievementCounter > GameConstants.ACHIEVEMENT_TICK) {
            Game.achievementCounter = 0;
            AchievementHandler.checkAchievements();
        }
        Save.counter += GameConstants.TICK_TIME;
        Underground.counter += GameConstants.TICK_TIME;

        GameHelper.counter += GameConstants.TICK_TIME;
        switch (this.gameState) {
            case GameConstants.GameState.fighting: {
                Battle.counter += GameConstants.TICK_TIME;
                if (Battle.counter > GameConstants.BATTLE_TICK) {
                    Battle.tick();
                }
                break;
            }
            case GameConstants.GameState.gym: {
                GymBattle.counter += GameConstants.TICK_TIME;
                if (GymBattle.counter > GameConstants.BATTLE_TICK) {
                    GymBattle.tick();
                }
                GymRunner.tick();
                break;
            }
            case GameConstants.GameState.dungeon: {
                DungeonBattle.counter += GameConstants.TICK_TIME;
                if (DungeonBattle.counter > GameConstants.BATTLE_TICK) {
                    DungeonBattle.tick();
                }
                DungeonRunner.tick();
                break;
            }
        }

        if (Save.counter > GameConstants.SAVE_TICK) {
            const now = new Date();
            if (new Date(player._lastSeen).toLocaleDateString() !== now.toLocaleDateString()) {
                player.questRefreshes = 0;
                QuestHelper.quitAllQuests();
                QuestHelper.clearQuests();
                QuestHelper.generateQuests(player.questLevel, player.questRefreshes, now);
                DailyDeal.generateDeals(Underground.getDailyDealsMax(), now);
                Notifier.notify({ message: 'It\'s a new day! Your quests and underground deals have been updated.', type: GameConstants.NotificationOption.info, timeout: 1e4 });
            }
            player._lastSeen = Date.now();
            Save.store(player);
        }

        if (Underground.counter > GameConstants.UNDERGROUND_TICK) {
            Underground.energyTick(Math.max(0, Underground.energyTick() - 1));
            if (Underground.energyTick() == 0) {
                Underground.gainEnergy();
                Underground.energyTick(Underground.getEnergyRegenTime());
            }
            Underground.counter = 0;
        }

        this.farming.update(GameConstants.TICK_TIME / 1000);

        if (EffectEngineRunner.counter > GameConstants.EFFECT_ENGINE_TICK) {
            EffectEngineRunner.tick();
        }

        if (GameHelper.counter > 60 * 1000) {
            GameHelper.updateTime();
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
