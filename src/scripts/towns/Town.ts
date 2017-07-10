class Town {
    private _name: KnockoutObservable<string>;
    private _gym?: KnockoutObservable<Gym>;
    private _shop?: KnockoutObservable<Shop>;
    private _dungeon?: KnockoutObservable<Dungeon>;
    private _reqRoutes: number[];


    constructor(name: string, routes: number[], shop?: Shop, dungeon?: Dungeon) {
        this._name = ko.observable(name);
        this._gym = ko.observable(gymList[name]);
        this._reqRoutes = routes;
        this._shop = ko.observable(shop);
        this._dungeon = ko.observable(dungeon);
    }

    get name(): KnockoutObservable<string> {
        return this._name;
    }

    get reqRoutes(): number[] {
        return this._reqRoutes;
    }

    get gym(): KnockoutObservable<Gym> {
        return this._gym;
    }

    get shop(): KnockoutObservable<Shop> {
        return this._shop;
    }

    get dungeon(): KnockoutObservable<Dungeon> {
        return this._dungeon;
    }
}

const TownList: { [name: string]: Town } = {};

//TODO Add all towns
TownList["Pewter City"] = new Town("Pewter City", [2]);
TownList["Cerulean City"] = new Town("Cerulean City", [4]);
TownList["Vermillion City"] = new Town("Vermillion City", [6]);
TownList["Celadon City"] = new Town("Celadon City", [8]);
TownList["Saffron City"] = new Town("Saffron City", [5]);
TownList["Fuchsia City"] = new Town("Fuchsia City", [18]);
TownList["Cinnabar Island"] = new Town("Cinnabar Island", [20]);
TownList["Viridian City"] = new Town("Viridian City", [1]);
TownList["Pallet Town"] = new Town("Pallet Town", []);
TownList["Lavender Town"] = new Town("Lavender Town", [10]);


//Dungeons
TownList["Viridian Forest"] = new Town("Viridian Forest", [1]);
TownList["Digletts Cave"] = new Town("Digletts Cave", [1]);
TownList["Mt. Moon"] = new Town("Mt. Moon", [3]);
TownList["Rock Tunnel"] = new Town("Rock Tunnel", [9]);
TownList["Power Plant"] = new Town("Power Plant", [9]);
TownList["Pokemon Tower"] = new Town("Pokemon Tower", [7, 10]);
TownList["Seafoam Islands"] = new Town("Seafoam Islands", [19]);
TownList["Victory Road"] = new Town("Victory Road", [22]);
TownList["Cerulean Cave"] = new Town("Cerulean Cave", [4]);
TownList["Pokemon Mansion"] = new Town("Pokemon Mansion", [20]);

