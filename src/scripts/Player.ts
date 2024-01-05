/// <reference path="../declarations/upgrades/Upgrade.d.ts" />

/**
 * Required modules before porting:
 * Save.ts
 * upgrades/Upgrade.ts
 * towns/Town.ts - Town, TownList
 * worldmap/MapHelper.ts
 * items/Item.ts - ItemList
 */

/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {

    private _route: KnockoutObservable<number>;
    private _region: KnockoutObservable<GameConstants.Region>;
    private _subregion: KnockoutObservable<number>;
    private _townName: string;
    private _town: KnockoutObservable<Town>;
    private _timeTraveller = false;
    private _origins: Array<any>;
    public regionStarters: Array<KnockoutObservable<GameConstants.Starter>>;
    public subregionObject: KnockoutObservable<SubRegion>;
    public trainerId: string;

    constructor(savedPlayer?) {
        const saved: boolean = (savedPlayer != null);
        savedPlayer = savedPlayer || {
            _region: GameConstants.Region.kanto,
            _route: 1,
        };
        this._lastSeen = savedPlayer._lastSeen || 0;
        this._timeTraveller = savedPlayer._timeTraveller || false;
        if (this._lastSeen > Date.now()) {
            Notifier.notify({
                title: 'Welcome Time Traveller!',
                message: 'Please ensure you keep a backup of your old save as travelling through time can cause some serious problems.\n\nAny Pokémon you may have obtained in the future could cease to exist which could corrupt your save file!',
                type: NotificationConstants.NotificationOption.danger,
                timeout: GameConstants.HOUR,
            });
            this._timeTraveller = true;
        }
        this._region = ko.observable(savedPlayer._region);
        this._subregion = ko.observable(savedPlayer._subregion || 0);
        this.subregionObject = ko.pureComputed(() => SubRegions.getSubRegionById(this._region(), this._subregion()));
        this._route = ko.observable(savedPlayer._route);
        // Check that the route is valid, otherwise set it to the regions starting route (route 0 means they are in a town)
        if (this._route() > 0 && !MapHelper.validRoute(this._route(), this._region())) {
            this._route(GameConstants.StartingRoutes[this._region()]);
        }
        // Return player to last town or starter town if their town no longer exist for whatever reason
        this._townName = TownList[savedPlayer._townName] ? savedPlayer._townName : GameConstants.StartingTowns[this._region()];
        this._town = ko.observable(TownList[this._townName]);
        this._town.subscribe(value => this._townName = value.name);

        this.regionStarters = new Array<KnockoutObservable<number>>();
        for (let i = 0; i <= GameConstants.MAX_AVAILABLE_REGION; i++) {
            if (savedPlayer.regionStarters && savedPlayer.regionStarters[i] != undefined) {
                this.regionStarters.push(ko.observable(savedPlayer.regionStarters[i]));
            } else if (i < (savedPlayer.highestRegion ?? 0)) {
                this.regionStarters.push(ko.observable(GameConstants.Starter.Grass));
            } else if (i == (savedPlayer.highestRegion ?? 0)) {
                this.regionStarters.push(ko.observable(GameConstants.Starter.None));
                if (i != GameConstants.Region.kanto) { // Kanto has it's own starter code
                    if (this._region() != i) {
                        this._region(i);
                        this._subregion(0);
                        this.route(undefined);
                        this._townName = GameConstants.StartingTowns[i];
                        this._town = ko.observable(TownList[this._townName]);
                    }
                    $('#pickStarterModal').modal('show');
                }
            } else {
                this.regionStarters.push(ko.observable(GameConstants.Starter.None));
            }
        }

        this._itemList = Save.initializeItemlist();
        if (savedPlayer._itemList) {
            for (const key in savedPlayer._itemList) {
                if (this._itemList[key]) {
                    this._itemList[key](savedPlayer._itemList[key]);
                }
            }
        }

        this._itemMultipliers = savedPlayer._itemMultipliers || Save.initializeMultipliers();

        this.effectList = Save.initializeEffects(savedPlayer.effectList || {});
        this.effectTimer = Save.initializeEffectTimer();
        this.highestRegion = ko.observable(savedPlayer.highestRegion || 0);
        this.highestSubRegion = ko.observable(savedPlayer.highestSubRegion || 0);

        // Save game origins, useful for tracking down any errors that may not be related to the main game
        this._origins = [...new Set((savedPlayer._origins || [])).add(window.location?.origin)];

        this.trainerId = savedPlayer.trainerId || Rand.intBetween(0, 999999).toString().padStart(6, '0');
    }

    private _itemList: { [name: string]: KnockoutObservable<number> };

    public _lastSeen: number;

    public effectList: { [name: string]: KnockoutObservable<number> } = {};
    public effectTimer: { [name: string]: KnockoutObservable<string> } = {};

    public highestRegion: KnockoutObservable<GameConstants.Region>;
    public highestSubRegion: KnockoutObservable<number>;

    set itemList(value: { [p: string]: KnockoutObservable<number> }) {
        this._itemList = value;
    }

    get itemList(): { [p: string]: KnockoutObservable<number> } {
        return this._itemList;
    }

    public amountOfItem(itemName: string) {
        return this._itemList[itemName]();
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

    get subregion(): number {
        return this._subregion();
    }

    set subregion(value: number) {
        if (value < 0) {
            value = Math.max(...SubRegions.getSubRegions(player.region).filter(sr => sr.unlocked()).map(sr => sr.id));
        }
        if (value > Math.max(...SubRegions.getSubRegions(player.region).filter(sr => sr.unlocked()).map(sr => sr.id))) {
            value = 0;
        }
        this._subregion(value);
        if (value > this.highestSubRegion()) {
            this.highestSubRegion(value);
        }
        const subregion = SubRegions.getSubRegionById(this.region, value);

        if (subregion.startRoute) {
            MapHelper.moveToRoute(subregion.startRoute, player.region);
        } else if (subregion.startTown) {
            MapHelper.moveToTown(subregion.startTown);
        }
    }

    get town(): KnockoutObservable<Town> {
        return this._town;
    }

    set town(value: KnockoutObservable<Town>) {
        this._town = value;
    }

    public gainItem(itemName: string, amount: number) {
        this._itemList[itemName](this._itemList[itemName]() + amount);
    }

    public loseItem(itemName: string, amount: number) {
        this._itemList[itemName](this._itemList[itemName]() - amount);
    }

    public lowerItemMultipliers(multiplierDecreaser: MultiplierDecreaser, amount = 1) {
        for (const obj in ItemList) {
            const item = ItemList[obj];
            item.decreasePriceMultiplier(amount, multiplierDecreaser);
        }
    }

    public hasMegaStone(megaStone: GameConstants.MegaStoneType): boolean {
        return this._itemList[GameConstants.MegaStoneType[megaStone]]() > 0;
    }

    public gainMegaStone(megaStone: GameConstants.MegaStoneType, notify = true) {
        const name = GameConstants.MegaStoneType[megaStone];
        if (!this._itemList[name]()) {
            player.gainItem(name, 1);
        }

        if (notify) {
            const item = ItemList[GameConstants.MegaStoneType[megaStone]] as MegaStoneItem;
            const partyPokemon = App.game.party.getPokemonByName(item.basePokemon);
            Notifier.notify({
                message: partyPokemon ? `${partyPokemon.displayName} has gained a Mega Stone!` : `You have gained a Mega Stone for ${item.basePokemon}!`,
                type: NotificationConstants.NotificationOption.success,
            });
        }
    }

    public toJSON() {
        const keep = [
            '_route',
            '_region',
            '_subregion',
            '_townName',
            '_itemList',
            '_itemMultipliers',
            '_lastSeen',
            '_timeTraveller',
            '_origins',
            'effectList',
            'highestRegion',
            'highestSubRegion',
            'regionStarters',
            'trainerId',
        ];
        const plainJS = ko.toJS(this);
        Object.entries(plainJS._itemMultipliers).forEach(([key, value]) => {
            if (value <= 1) {
                delete plainJS._itemMultipliers[key];
            }
        });
        Object.entries(plainJS._itemList).forEach(([key, value]) => {
            if (!value) {
                delete plainJS._itemList[key];
            }
        });
        Object.entries(plainJS.effectList).forEach(([key, value]) => {
            if (!value) {
                delete plainJS.effectList[key];
            }
        });
        return Save.filter(plainJS, keep);
    }
}
