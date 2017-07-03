class Town {
    private name: KnockoutObservable<string>;
    private gym?: Gym;
    private dungeon?: Dungeon;
    private shop: Shop;
    public reqRoutes: number[];


    constructor(name: string, routes: number[], shop?: Shop, dungeon?: Dungeon) {
        this.name = ko.observable(name);
        this.gym = gymList[name];
        this.reqRoutes = routes;
    }

}

const TownList:{[name : string] : Town } = {};

TownList["Pewter City"] = new Town("Pewter City", [2]);