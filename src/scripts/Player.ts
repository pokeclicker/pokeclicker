///<reference path="upgrades/Upgrade.ts"/>
/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {

    public achievementsCompleted: { [name: string]: boolean };

    private _route: KnockoutObservable<number>;

    private _defeatedAmount: Array<KnockoutObservable<number>>;

    private _routeKills: Array<KnockoutObservable<number>>;
    private _routeKillsNeeded: KnockoutObservable<number>;
    private _region: KnockoutObservable<GameConstants.Region>;
    private _town: KnockoutObservable<Town>;
    private _currentTown: KnockoutObservable<string>;
    private _starter: GameConstants.Starter;

    constructor(savedPlayer?) {
        const saved: boolean = (savedPlayer != null);
        savedPlayer = savedPlayer || {};
        this._lastSeen = savedPlayer._lastSeen || 0
        this._region = ko.observable(savedPlayer._region);
        if (MapHelper.validRoute(savedPlayer._route, savedPlayer._region)) {
            this._route = ko.observable(savedPlayer._route)
        } else {
            switch (savedPlayer._region) {
                case 0:
                    this._route = ko.observable(1);
                    break;
                case 1:
                    this._route = ko.observable(29);
                    break;
                default:
                    this._route = ko.observable(1);
                    this._region = ko.observable(GameConstants.Region.kanto);
            }
        }

        this._routeKills = [...Array(GameConstants.AMOUNT_OF_ROUTES + 1)].map(function (val, index) {
            return ko.observable(savedPlayer._routeKills ? (savedPlayer._routeKills[index] || 0) : 0)
        });

        this._defeatedAmount = [...Array(pokemonList.length + 1)].map(function (val, index) {
            return ko.observable(savedPlayer._defeatedAmount ? (savedPlayer._defeatedAmount[index] || 0) : 0)
        });
        this._caughtAmount = [...Array(pokemonList.length + 1)].map(function (val, index) {
            return ko.observable(savedPlayer._caughtAmount ? (savedPlayer._caughtAmount[index] || 0) : 0)
        });
        this._routeKillsNeeded = ko.observable(savedPlayer._routeKillsNeeded || 10);
        this._town = ko.observable(TownList['Pallet Town']);
        this._currentTown = ko.observable('');
        this._starter = savedPlayer._starter != undefined ? savedPlayer._starter : GameConstants.Starter.None;

        console.log(savedPlayer._itemList);

        this._itemList = Save.initializeItemlist();
        if (savedPlayer._itemList) {
            for (const key in savedPlayer._itemList) {
                this._itemList[key] = ko.observable(savedPlayer._itemList[key]);
            }
        }

        this._itemMultipliers = savedPlayer._itemMultipliers || Save.initializeMultipliers();

        // TODO(@Isha) move to underground classes.
        this.mineInventory = new ObservableArrayProxy(savedPlayer.mineInventory || []);
        for (const item of this.mineInventory) {
            item.amount = ko.observable(item.amount);
        }

        this._shardUpgrades = Save.initializeShards(savedPlayer._shardUpgrades);

        this.achievementsCompleted = savedPlayer.achievementsCompleted || {};

        this._shardsCollected = [...Array<number>(18)].map((value, index) => {
            return ko.observable(savedPlayer._shardsCollected ? savedPlayer._shardsCollected[index] : 0);
        });

        const today = new Date();
        const lastSeen = new Date(this._lastSeen);
        if (today.toLocaleDateString() == lastSeen.toLocaleDateString()) {
            this.questRefreshes = savedPlayer.questRefreshes;
            if (savedPlayer.completedQuestList) {
                this.completedQuestList = savedPlayer.completedQuestList.map((bool) => {
                    return ko.observable(bool)
                });
            } else {
                this.completedQuestList = [...Array(GameConstants.QUESTS_PER_SET)].map(() => {
                    return ko.observable(false)
                });
            }

            this.currentQuests = ko.observableArray(savedPlayer.currentQuests || []);
            for (const q of this.currentQuests()) {
                q.initial = ko.observable(q.initial);
            }
        } else {
            this.questRefreshes = 0;
            this.completedQuestList = [...Array(GameConstants.QUESTS_PER_SET)].map(() => {
                return ko.observable(false)
            });
            this.currentQuests = ko.observableArray([]);
        }
        this._questXP = ko.observable(savedPlayer._questXP || 0);

        this._shinyCatches = ko.observable(savedPlayer._shinyCatches || 0);

        this._lastSeen = Date.now();
        this.statistics = new Statistics(savedPlayer.statistics);

        this.berryList = [...Array(GameConstants.AMOUNT_OF_BERRIES)].map(function (val, index) {
            return ko.observable(savedPlayer.berryList ? (savedPlayer.berryList[index] || 0) : 0)
        });
        this.plotList = Save.initializePlots(savedPlayer.plotList);
        this.effectList = Save.initializeEffects(savedPlayer.effectList || {});
        this.highestRegion = ko.observable(savedPlayer.highestRegion || 0);

        this.tutorialProgress = ko.observable(savedPlayer.tutorialProgress || 0);
        this.tutorialState = savedPlayer.tutorialState;
        this.tutorialComplete = ko.observable(!!savedPlayer.tutorialComplete);

    }

    private _itemList: { [name: string]: KnockoutObservable<number> };

    // TODO(@Isha) move to underground classes.
    public mineInventory: ObservableArrayProxy<any>;

    private _shardUpgrades: Array<Array<KnockoutObservable<number>>>;
    private _shardsCollected: Array<KnockoutObservable<number>>;

    public statistics: Statistics;

    public completedQuestList: Array<KnockoutObservable<boolean>>;
    public questRefreshes: number;
    public _questXP: KnockoutObservable<number>;
    public _lastSeen: number;
    public currentQuests: KnockoutObservableArray<any>;
    private _shinyCatches: KnockoutObservable<number>;

    public plotList: KnockoutObservable<Plot>[];
    public berryList: KnockoutObservable<number>[];

    public effectList: { [name: string]: KnockoutObservable<number> } = {};

    public tutorialProgress: KnockoutObservable<number>;
    public tutorialState: any;
    public tutorialComplete: KnockoutObservable<boolean>;

    private highestRegion: KnockoutObservable<GameConstants.Region>;

    public routeKillsObservable(route: number): KnockoutComputed<number> {
        return ko.computed(function () {
            return Math.min(this.routeKillsNeeded, this.routeKills[route]());
        }, this);
    }

    public addRouteKill() {
        this.routeKills[this.route()](this.routeKills[this.route()]() + 1)
    }

    set defeatedAmount(value: Array<KnockoutObservable<number>>) {
        this._defeatedAmount = value;
    }

    get defeatedAmount(): Array<KnockoutObservable<number>> {
        return this._defeatedAmount;
    }

    private _caughtAmount: Array<KnockoutObservable<number>>;

    set itemList(value: { [p: string]: KnockoutObservable<number> }) {
        this._itemList = value;
    }

    get itemList(): { [p: string]: KnockoutObservable<number> } {
        return this._itemList;
    }

    public gainShards(pokemon: BattlePokemon) {
        let typeNum = GameConstants.PokemonType[pokemon.type1];
        player._shardsCollected[typeNum](player._shardsCollected[typeNum]() + pokemon.shardReward);
        GameHelper.incrementObservable(player.statistics.totalShards[typeNum], pokemon.shardReward)
        if (pokemon.type2 != GameConstants.PokemonType.None) {
            typeNum = GameConstants.PokemonType[pokemon.type2];
            player._shardsCollected[typeNum](player._shardsCollected[typeNum]() + pokemon.shardReward);
            GameHelper.incrementObservable(player.statistics.totalShards[typeNum], pokemon.shardReward)
        }
    }

    public buyShardUpgrade(typeNum: number, effectNum: number) {
        if (this.canBuyShardUpgrade(typeNum, effectNum)) {
            this._shardsCollected[typeNum](this._shardsCollected[typeNum]() - this.getShardUpgradeCost(typeNum, effectNum));
            this._shardUpgrades[typeNum][effectNum](this._shardUpgrades[typeNum][effectNum]() + 1);
        }
    }

    public shardUpgradeMaxed(typeNum: number, effectNum: number): boolean {
        return this._shardUpgrades[typeNum][effectNum]() >= GameConstants.MAX_SHARD_UPGRADES;
    }

    public canBuyShardUpgrade(typeNum: number, effectNum: number): boolean {
        const lessThanMax = !this.shardUpgradeMaxed(typeNum, effectNum);
        const hasEnoughShards = this._shardsCollected[typeNum]() >= this.getShardUpgradeCost(typeNum, effectNum);
        return lessThanMax && hasEnoughShards;
    }

    public getShardUpgradeCost(typeNum: number, effectNum: number): number {
        const cost = (this._shardUpgrades[typeNum][effectNum]() + 1) * GameConstants.SHARD_UPGRADE_COST;
        return cost;
    }

    get caughtAmount(): Array<KnockoutObservable<number>> {
        return this._caughtAmount;
    }

    set caughtAmount(value: Array<KnockoutObservable<number>>) {
        this._caughtAmount = value;
    }

    private _itemMultipliers: { [name: string]: number };

    get itemMultipliers(): { [p: string]: number } {
        return this._itemMultipliers;
    }

    get routeKills(): Array<KnockoutObservable<number>> {
        return this._routeKills;
    }

    set routeKills(value: Array<KnockoutObservable<number>>) {
        this._routeKills = value;
    }

    get routeKillsNeeded(): number {
        return this._routeKillsNeeded();
    }

    set routeKillsNeeded(value: number) {
        this._routeKillsNeeded(value);
    }

    get route(): KnockoutObservable<number> {
        return this._route;
    }

    set route(value: KnockoutObservable<number>) {
        this._route = value;
    }

    get region(): GameConstants.Region {
        return this._region();
    }

    set region(value: GameConstants.Region) {
        this._region(value);
    }

    get town(): KnockoutObservable<Town> {
        return this._town;
    }

    set town(value: KnockoutObservable<Town>) {
        this._town = value;
    }

    get currentTown(): KnockoutObservable<string> {
        return this._currentTown;
    }

    set currentTown(value: KnockoutObservable<string>) {
        this._currentTown = value;
    }

    get starter(): GameConstants.Starter {
        return this._starter;
    }

    set starter(value: GameConstants.Starter) {
        this._starter = value;
    }

    public gainItem(itemName: string, amount: number) {
        this._itemList[itemName](this._itemList[itemName]() + amount);
    }

    public loseItem(itemName: string, amount: number) {
        this._itemList[itemName](this._itemList[itemName]() - amount);
    }

    public lowerItemMultipliers() {
        for (const obj in ItemList) {
            const item = ItemList[obj];
            item.decreasePriceMultiplier();
        }
    }

    // TODO(@Isha) move to underground classes.
    public hasMineItems() {
        for (let i = 0; i < this.mineInventory.length; i++) {
            if (this.mineInventory[i].amount() > 0) {
                return true;
            }
        }
        return false;
    }

    public getRandomBerry() {
        const i = GameHelper.getIndexFromDistribution(GameConstants.BerryDistribution);
        Notifier.notify(`You got a ${GameConstants.BerryType[i]} berry!`, GameConstants.NotificationOption.success);
        let amount = 1;
        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.Item_magnet)()) {
            if (Math.random() < 0.5) {
                amount += 1;
            }
        }
        player.berryList[i](player.berryList[i]() + amount);
    }

    // TODO(@Isha) move to underground classes.
    public mineInventoryIndex(id: number): number {
        for (let i = 0; i < player.mineInventory.length; i++) {
            if (player.mineInventory[i].id === id) {
                return i;
            }
        }
        return -1;
    }

    // TODO(@Isha) move to underground classes.
    public getUndergroundItemAmount(id: number) {
        const index = this.mineInventoryIndex(id);
        if (index > -1) {
            return player.mineInventory[index].amount();
        } else {
            return 0;
        }
    }

    public unlockPlot() {
        let i = 0;
        while (i < this.plotList.length && this.plotList[i]().isUnlocked()) {
            i++;
        }
        if (i == this.plotList.length) {
            return;
        }
        this.plotList[i]().isUnlocked(true);
    }

    get shardUpgrades(): Array<Array<KnockoutObservable<number>>> {
        return this._shardUpgrades;
    }

    set shardUpgrades(value: Array<Array<KnockoutObservable<number>>>) {
        this._shardUpgrades = value;
    }

    get shardsCollected(): Array<KnockoutObservable<number>> {
        return this._shardsCollected;
    }

    set shardsCollected(value: Array<KnockoutObservable<number>>) {
        this._shardsCollected = value;
    }

    get questLevel(): number {
        return QuestHelper.xpToLevel(player.questXP);
    }

    public percentToNextQuestLevel(): number {
        const current = this.questLevel;
        const requiredForCurrent = QuestHelper.levelToXP(current);
        const requiredForNext = QuestHelper.levelToXP(current + 1);
        return 100 * (this.questXP - requiredForCurrent) / (requiredForNext - requiredForCurrent);
    }

    get shinyCatches(): number {
        return this._shinyCatches();
    }

    set shinyCatches(value: number) {
        this._shinyCatches(value);
    }

    get questXP(): number {
        return this._questXP();
    }

    set questXP(value: number) {
        this._questXP(value);
    }

    public toJSON() {
        const keep = [
            '_route',
            '_defeatedAmount',
            '_caughtAmount',
            '_routeKills',
            '_routeKillsNeeded',
            '_region',
            '_starter',
            '_itemList',
            '_itemMultipliers',
            // TODO(@Isha) remove.
            'mineInventory',
            // TODO(@Isha) remove.
            '_mineLayersCleared',
            '_shardUpgrades',
            '_shardsCollected',
            'achievementsCompleted',
            'completedQuestList',
            'questRefreshes',
            '_questXP',
            '_lastSeen',
            'currentQuests',
            '_shinyCatches',
            'gymDefeats',
            'statistics',
            'achievementsCompleted',
            'plotList',
            'berryList',
            'effectList',
            'highestRegion',
            'tutorialProgress',
            'tutorialState',
            'tutorialComplete',
        ];
        const plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep)
    }
}
