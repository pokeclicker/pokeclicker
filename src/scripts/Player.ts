///<reference path="upgrades/Upgrade.ts"/>
/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {

    public achievementsCompleted: { [name: string]: boolean };

    private _route: KnockoutObservable<number>;

    private _region: KnockoutObservable<GameConstants.Region>;
    private _town: KnockoutObservable<Town>;
    private _currentTown: KnockoutObservable<string>;
    private _starter: GameConstants.Starter;

    constructor(savedPlayer?) {
        const saved: boolean = (savedPlayer != null);
        savedPlayer = savedPlayer || {};
        this._lastSeen = savedPlayer._lastSeen || 0;
        this._region = ko.observable(savedPlayer._region);
        if (MapHelper.validRoute(savedPlayer._route, savedPlayer._region)) {
            this._route = ko.observable(savedPlayer._route);
        } else {
            switch (savedPlayer._region) {
                case 0:
                    this._route = ko.observable(1);
                    break;
                case 1:
                    this._route = ko.observable(29);
                    break;
                case 2:
                    this._route = ko.observable(101);
                    break;
                default:
                    this._route = ko.observable(1);
                    this._region = ko.observable(GameConstants.Region.kanto);
            }
        }

        this._town = ko.observable(TownList['Pallet Town']);
        this._currentTown = ko.observable('');
        this._starter = savedPlayer._starter != undefined ? savedPlayer._starter : GameConstants.Starter.None;

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

        this.achievementsCompleted = savedPlayer.achievementsCompleted || {};

        const today = new Date();
        const lastSeen = new Date(this._lastSeen);

        this._lastSeen = Date.now();

        this.effectList = Save.initializeEffects(savedPlayer.effectList || {});
        this.effectTimer = Save.initializeEffectTimer(savedPlayer.effectTimer || {});
        this.highestRegion = ko.observable(savedPlayer.highestRegion || 0);

    }

    private _itemList: { [name: string]: KnockoutObservable<number> };

    // TODO(@Isha) move to underground classes.
    public mineInventory: ObservableArrayProxy<any>;

    public _lastSeen: number;

    public effectList: { [name: string]: KnockoutObservable<number> } = {};
    public effectTimer: { [name: string]: KnockoutObservable<string> } = {};

    private highestRegion: KnockoutObservable<GameConstants.Region>;

    set itemList(value: { [p: string]: KnockoutObservable<number> }) {
        this._itemList = value;
    }

    get itemList(): { [p: string]: KnockoutObservable<number> } {
        return this._itemList;
    }

    private _itemMultipliers: { [name: string]: number };

    get itemMultipliers(): { [p: string]: number } {
        return this._itemMultipliers;
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

    public toJSON() {
        const keep = [
            '_route',
            '_region',
            '_starter',
            '_itemList',
            '_itemMultipliers',
            // TODO(@Isha) remove.
            'mineInventory',
            // TODO(@Isha) remove.
            '_mineLayersCleared',
            'achievementsCompleted',
            '_lastSeen',
            'gymDefeats',
            'achievementsCompleted',
            'effectList',
            'effectTimer',
            'highestRegion',
        ];
        const plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep);
    }
}
