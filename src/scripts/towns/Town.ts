///<reference path="../shop/Shop.ts"/>
///<reference path="../items/Pokeball.ts"/>
///<reference path="../items/BattleItem.ts"/>
///<reference path="../items/EnergyRestore.ts"/>
///<reference path="../items/EvolutionStone.ts"/>
///<reference path="../items/PokeBlock.ts"/>
///<reference path="../items/Vitamin.ts"/>
class Town {
    private _name: KnockoutObservable<string>;
    private _gym?: KnockoutObservable<Gym>;
    private _shop?: KnockoutObservable<Shop>;
    private _dungeon?: KnockoutObservable<Dungeon>;
    private _reqRoutes: number[];
    private dungeonReq: string; // Dungeon that must be completed to access town
    public startingTown: boolean;

    constructor(name: string, routes: number[], shop?: Shop, dungeon?: Dungeon, dungeonReq?: string) {
        this._name = ko.observable(name);
        this._gym = ko.observable(gymList[name]);
        this._reqRoutes = routes;
        this._shop = ko.observable(shop);
        this._dungeon = ko.observable(dungeon);
        this.dungeonReq = dungeonReq;
        this.startingTown = GameConstants.StartingTowns.indexOf(this._name()) > -1
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

    public hasRouteReq() {
        for (let i of this.reqRoutes) {
            if (player.routeKills[i]() < player.routeKillsNeeded) {
                return false;
            }
        }

        return true;
    }

    public hasDungeonReq() {
        if (this.dungeonReq != undefined) {
            return 0 < player.dungeonsCleared[Statistics.getDungeonIndex(this.dungeonReq)]();
        } else {
            return true;
        }
    }

    public isUnlocked() {
        return this.hasRouteReq() && this.hasDungeonReq();
    }
}

class DungeonTown extends Town {
    private badgeReq: GameConstants.Badge;

    constructor(name: string, routes: number[], badge?: GameConstants.Badge) {
        super(name, routes, null, dungeonList[name]);
        this.badgeReq = badge;
    }

    public isUnlocked() {
        return (this.hasRouteReq() && player.hasBadge(this.badgeReq));
    }

}

const TownList: { [name: string]: Town | PokemonLeague } = {};

//Kanto Towns
let PewterCityShop = new Shop(["Pokeball", "Token_collector", "xExp","Dungeon_ticket"]);
TownList["Pewter City"] = new Town("Pewter City", [2], PewterCityShop);

let CeruleanCityShop = new Shop(["Water_stone", "xAttack", "Water_egg"]);
TownList["Cerulean City"] = new Town("Cerulean City", [4], CeruleanCityShop, dungeonList["Cerulean Cave"]);

let VermillionCityShop = new Shop(["Thunder_stone", "xExp", "Electric_egg"]);
TownList["Vermillion City"] = new Town("Vermillion City", [6], VermillionCityShop);

let CeladonCityShop = new Shop(["Eevee", "Porygon", "Jynx", "Mr. Mime", "Lickitung"]);
TownList["Celadon City"] = new Town("Celadon City", [8], CeladonCityShop);

let SaffronCityShop = new Shop(["Moon_stone", "xClick", "Leaf_stone", "Fighting_egg"]);
TownList["Saffron City"] = new Town("Saffron City", [5], SaffronCityShop);

let FuchsiaCityShop = new Shop(["Ultraball", "Trade_stone", "xExp", "Dragon_egg"]);
TownList["Fuchsia City"] = new Town("Fuchsia City", [18], FuchsiaCityShop);

let CinnabarIslandShop = new Shop(["Fire_stone", "Fire_egg", "SmallRestore", "Explorer_kit"]);
TownList["Cinnabar Island"] = new Town("Cinnabar Island", [20], CinnabarIslandShop, dungeonList["Pokemon Mansion"]);

let ViridianCityShop = new Shop(["xAttack", "xClick", "Mystery_egg"]);
TownList["Viridian City"] = new Town("Viridian City", [1], ViridianCityShop);

TownList["Pallet Town"] = new Town("Pallet Town", []);

let LavenderTownShop = new Shop(["Greatball", "Item_magnet", "Lucky_incense", "Grass_egg"]);
TownList["Lavender Town"] = new Town("Lavender Town", [10], LavenderTownShop, dungeonList["Pokemon Tower"]);

//Kanto Dungeons
TownList["Viridian Forest"] = new DungeonTown("Viridian Forest", [1]);
TownList["Digletts Cave"] = new DungeonTown("Digletts Cave", [1], GameConstants.Badge.Boulder);
TownList["Mt. Moon"] = new DungeonTown("Mt. Moon", [3], GameConstants.Badge.Boulder);
TownList["Rock Tunnel"] = new DungeonTown("Rock Tunnel", [9], GameConstants.Badge.Cascade);
TownList["Power Plant"] = new DungeonTown("Power Plant", [9], GameConstants.Badge.Cascade);
TownList["Pokemon Tower"] = new DungeonTown("Pokemon Tower", [10], GameConstants.Badge.Cascade);
TownList["Seafoam Islands"] = new DungeonTown("Seafoam Islands", [19], GameConstants.Badge.Soul);
TownList["Victory Road"] = new DungeonTown("Victory Road", [22], GameConstants.Badge.Earth);
TownList["Cerulean Cave"] = new DungeonTown("Cerulean Cave", [4], GameConstants.Badge.Elite_Champion);
TownList["Pokemon Mansion"] = new DungeonTown("Pokemon Mansion", [20], GameConstants.Badge.Soul);

//Johto Towns
let NewBarkTownShop = new Shop(["Pokeball"]);
TownList["New Bark Town"] = new Town("New Bark Town", [], NewBarkTownShop);

let CherrygroveCityShop = new Shop(["Greatball"]);
TownList["Cherrygrove City"] = new Town("Cherrygrove City", [29], CherrygroveCityShop);

let VioletCityShop = new Shop(["MediumRestore", "Togepi"]);
TownList["Violet City"] = new Town("Violet City", [31], VioletCityShop, dungeonList["Sprout Tower"]);

let AzaleaTownShop = new Shop(["Kings_rock"]);
TownList["Azalea Town"] = new Town("Azalea Town", [33], AzaleaTownShop, dungeonList["Slowpoke Well"]);

let GoldenrodCityShop = new Shop(["Sun_stone", "Upgrade"]);
TownList["Goldenrod City"] = new Town("Goldenrod City", [34], GoldenrodCityShop);

TownList["Ecruteak City"] = new Town("Ecruteak City", [37]);

let OlivineCityShop = new Shop(["Metal_coat"]);
TownList["Olivine City"] = new Town("Olivine City", [39], OlivineCityShop);

let CianwoodCityShop = new Shop(["Ultraball", "Time_stone"]);
TownList["Cianwood City"] = new Town("Cianwood City", [41], CianwoodCityShop);

TownList["Mahogany Town"] = new Town("Mahogany Town", [42], null, null, "Mt Mortar");

let BlackthornCityShop = new Shop(["LargeRestore", "Dragon_scale"]);
TownList["Blackthorn City"] = new Town("Blackthorn City", [44], BlackthornCityShop, null, "Ice Path");

//Johto Dungeons
TownList["Sprout Tower"] = new DungeonTown("Sprout Tower", [31]);
TownList["Ruins of Alph"] = new DungeonTown("Ruins of Alph", [32]);
TownList["Union Cave"] = new DungeonTown("Union Cave", [32]);
TownList["Slowpoke Well"] = new DungeonTown("Slowpoke Well", [33]);
TownList["Ilex Forest"] = new DungeonTown("Ilex Forest", [33]);
TownList["Burned Tower"] = new DungeonTown("Burned Tower", [37]);
TownList["Tin Tower"] = new DungeonTown("Tin Tower", [37]);
TownList["Whirl Islands"] = new DungeonTown("Whirl Islands", [41]);
TownList["Mt Mortar"] = new DungeonTown("Mt Mortar", [42]);
TownList["Ice Path"] = new DungeonTown("Ice Path", [44]);
TownList["Dark Cave"] = new DungeonTown("Dark Cave", [45]);
TownList["Mt Silver"] = new DungeonTown("Mt Silver", [28], GameConstants.Badge.Elite_Karen);
