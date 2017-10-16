///<reference path="Town.ts"/>
class PokemonLeague extends Town {
    public gymList: KnockoutObservableArray<KnockoutObservable<Gym>>;

    constructor(name: string, routes: number[], shop: Shop, dungeonReq: string, gyms: string[]) {
        super(name, routes, shop, null, dungeonReq);
        this.gym(null);
        this.gymList = ko.observableArray<KnockoutObservable<Gym>>();
        for (let gym of gyms) {
            this.gymList.push(ko.observable(gymList[gym]));
        }
    }

    public setupGymTowns() {
        for (let gym of this.gymList()) {
            TownList[gym().town] = TownList[this.name()];
        }
    }
}

let indigoPlateauGyms = ["Elite Lorelei", "Elite Bruno", "Elite Agatha", "Elite Lance", "Champion Blue"];
TownList["Indigo Plateau"] = new PokemonLeague("Indigo Plateau", [23], new Shop(["Ultraball"]), "Victory Road", indigoPlateauGyms);
(<PokemonLeague>TownList["Indigo Plateau"]).setupGymTowns();

let indigoPlateau2Gyms = ["Elite Will", "Elite Koga", "Elite Bruno2", "Elite Karen", "Champion Lance"];
TownList["Indigo Plateau 2.0"] = new PokemonLeague("Indigo Plateau 2.0", [27], null, null, indigoPlateau2Gyms);
(<PokemonLeague>TownList["Indigo Plateau 2.0"]).setupGymTowns();