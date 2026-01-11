/// <reference path="../declarations/TemporaryScriptTypes.d.ts" />
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

class Player implements TmpPlayerType {

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
    private _createdTime: number;

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
        this.subregionObject = ko.pureComputed(() => SubRegions.getSubRegionById(this.region, this.subregion));
        this._route = ko.observable(savedPlayer._route);
        // Check that the route is valid, otherwise set it to the regions starting route (route 0 means they are in a town)
        if (this.route > 0 && !MapHelper.validRoute(this.route, this.region)) {
            this.route = GameConstants.StartingRoutes[this.region];
        }
        // Return player to last town or starter town if their town no longer exist for whatever reason
        this._townName = TownList[savedPlayer._townName] ? savedPlayer._townName : GameConstants.StartingTowns[this.region];
        this._town = ko.observable(TownList[this._townName]);
        this._town.subscribe(value => this._townName = value.name);

        this.highestRegion = ko.observable(savedPlayer.highestRegion || 0);
        this.highestSubRegion = ko.observable(savedPlayer.highestSubRegion || 0);

        this.regionStarters = new Array<KnockoutObservable<number>>();
        for (let i = 0; i <= GameConstants.MAX_AVAILABLE_REGION; i++) {
            this.regionStarters.push(ko.observable(savedPlayer.regionStarters?.[i] ?? GameConstants.Starter.None));
        }

        this._itemList = Save.initializeItemlist();
        if (savedPlayer._itemList) {
            for (const key in savedPlayer._itemList) {
                if (this.itemList[key]) {
                    this.itemList[key](savedPlayer._itemList[key]);
                }
            }
        }

        this._itemMultipliers = savedPlayer._itemMultipliers || Save.initializeMultipliers();

        this.effectList = Save.initializeEffects(savedPlayer.effectList || {});
        this.effectTimer = Save.initializeEffectTimer();

        // Save game origins, useful for tracking down any errors that may not be related to the main game
        this._origins = [...new Set((savedPlayer._origins || [])).add(window.location?.origin)];

        this.trainerId = savedPlayer.trainerId || Rand.intBetween(0, 999999).toString().padStart(6, '0');
        this._createdTime = savedPlayer._createdTime ?? Date.now();
    }

    private _itemList: { [name: string]: KnockoutObservable<number> };

    public _lastSeen: number;

    public effectList: { [name: string]: KnockoutObservable<number> } = {};
    public effectTimer: { [name: string]: KnockoutObservable<string> } = {};

    public highestRegion: KnockoutObservable<GameConstants.Region>;
    public highestSubRegion: KnockoutObservable<number>;

    get itemList(): { [p: string]: KnockoutObservable<number> } {
        return this._itemList;
    }

    public amountOfItem(itemName: string) {
        return this.itemList[itemName]();
    }

    private _itemMultipliers: { [name: string]: number };

    get itemMultipliers(): { [p: string]: number } {
        return this._itemMultipliers;
    }

    get route(): number {
        return this._route();
    }

    set route(value: number) {
        this._route(value);
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
            value = Math.max(...SubRegions.getSubRegions(this.region).filter(sr => sr.unlocked()).map(sr => sr.id));
        }
        if (value > Math.max(...SubRegions.getSubRegions(this.region).filter(sr => sr.unlocked()).map(sr => sr.id))) {
            value = 0;
        }
        const changedSubregions = value !== this.subregion;

        this._subregion(value);
        if (value > this.highestSubRegion()) {
            this.highestSubRegion(value);
        }

        if (changedSubregions) {
            const subregion = SubRegions.getSubRegionById(this.region, value);
            if (subregion.startRoute && subregion.startRoute !== this.route) {
                MapHelper.moveToRoute(subregion.startRoute, this.region);
            } else if (subregion.startTown && subregion.startTown !== this.town.name) {
                MapHelper.moveToTown(subregion.startTown);
            }
        }
    }

    get town(): Town {
        return this._town();
    }

    set town(value: Town) {
        this._town(value);
    }

    public gainItem(itemName: string, amount: number) {
        this.itemList[itemName](this.itemList[itemName]() + amount);
    }

    public loseItem(itemName: string, amount: number) {
        this.itemList[itemName](this.itemList[itemName]() - amount);
    }

    public lowerItemMultipliers(multiplierDecreaser: MultiplierDecreaser, amount = 1) {
        for (const obj in ItemList) {
            const item = ItemList[obj];
            item.decreasePriceMultiplier(amount, multiplierDecreaser);
        }
    }

    public hasMegaStone(megaStone: GameConstants.MegaStoneType): boolean {
        return this.itemList[GameConstants.MegaStoneType[megaStone]]() > 0;
    }

    public gainMegaStone(megaStone: GameConstants.MegaStoneType, notify = true) {
        const name = GameConstants.MegaStoneType[megaStone];
        if (!this.itemList[name]()) {
            this.gainItem(name, 1);
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

    public pickStarter(index: number) {
        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
        App.game.party.gainPokemonById(GameConstants.RegionalStarters[this.region][index], shiny);
        this.regionStarters[this.region](index);
    }

    public hasBeatenChampOfRegion(region: GameConstants.Region = this.highestRegion()) {
        const champion = GameConstants.RegionGyms[region].find(gym => GymList[gym]?.flags.champion);
        return champion === undefined ? false : App.game.badgeCase.hasBadge(GymList[champion].badgeReward);
    }

    get createdTime(): number {
        return this._createdTime;
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
            '_createdTime',
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
