class Town {
    private _name: KnockoutObservable<string>;
    private _gym?: KnockoutObservable<Gym>;
    private _shop?: KnockoutObservable<Shop>;
    private _dungeon?: KnockoutObservable<Dungeon>;
    private _reqRoutes: number[];
    public dungeonReq: string; // Dungeon that must be completed to access town
    public startingTown: boolean;

    constructor(name: string, routes: number[], shop?: Shop, dungeon?: Dungeon, dungeonReq?: string) {
        this._name = ko.observable(name);
        this._gym = ko.observable(gymList[name]);
        this._reqRoutes = routes;
        this._shop = ko.observable(shop);
        this._dungeon = ko.observable(dungeon);
        this.dungeonReq = dungeonReq;
        this.startingTown = GameConstants.StartingTowns.includes(this._name());
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
        for (const i of this.reqRoutes) {
            if (App.game.statistics.routeKills[i]() < GameConstants.ROUTE_KILLS_NEEDED) {
                return false;
            }
        }

        return true;
    }

    public hasDungeonReq() {
        if (this.dungeonReq != undefined) {
            return 0 < App.game.statistics.dungeonsCleared[Statistics.getDungeonIndex(this.dungeonReq)]();
        } else {
            return true;
        }
    }

    public isUnlocked() {
        return this.hasRouteReq() && this.hasDungeonReq();
    }
}

class DungeonTown extends Town {
    public badgeReq: BadgeCase.Badge;

    constructor(name: string, routes: number[], badge?: BadgeCase.Badge) {
        super(name, routes, null, dungeonList[name]);
        this.badgeReq = badge;
    }

    public isUnlocked() {
        return (this.hasRouteReq() && App.game.badgeCase.hasBadge(this.badgeReq));
    }

}

const TownList: { [name: string]: Town | PokemonLeague } = {};

//Kanto Towns
const PewterCityShop = new Shop(['Pokeball', 'Token_collector', 'xExp','Dungeon_ticket']);
TownList['Pewter City'] = new Town('Pewter City', [2], PewterCityShop);

const CeruleanCityShop = new Shop(['Water_stone', 'xAttack', 'Water_egg']);
TownList['Cerulean City'] = new Town('Cerulean City', [4], CeruleanCityShop, dungeonList['Cerulean Cave']);

const VermillionCityShop = new Shop(['Thunder_stone', 'xExp', 'Electric_egg']);
TownList['Vermillion City'] = new Town('Vermillion City', [6], VermillionCityShop);

const CeladonCityShop = new Shop(['Eevee', 'Porygon', 'Jynx', 'Mr. Mime', 'Lickitung']);
TownList['Celadon City'] = new Town('Celadon City', [8], CeladonCityShop);

const SaffronCityShop = new Shop(['Moon_stone', 'xClick', 'Leaf_stone', 'Fighting_egg']);
TownList['Saffron City'] = new Town('Saffron City', [5], SaffronCityShop);

const FuchsiaCityShop = new Shop(['Ultraball', 'Trade_stone', 'xExp', 'Dragon_egg']);
TownList['Fuchsia City'] = new Town('Fuchsia City', [18], FuchsiaCityShop);

const CinnabarIslandShop = new Shop(['Fire_stone', 'Fire_egg', 'SmallRestore', 'Explorer_kit']);
TownList['Cinnabar Island'] = new Town('Cinnabar Island', [20], CinnabarIslandShop, dungeonList['Pokemon Mansion']);

const ViridianCityShop = new Shop(['xAttack', 'xClick', 'Mystery_egg']);
TownList['Viridian City'] = new Town('Viridian City', [1], ViridianCityShop);

TownList['Pallet Town'] = new Town('Pallet Town', []);

const LavenderTownShop = new Shop(['Greatball', 'Item_magnet', 'Lucky_incense', 'Grass_egg']);
TownList['Lavender Town'] = new Town('Lavender Town', [10], LavenderTownShop, dungeonList['Pokemon Tower']);

//Kanto Dungeons
TownList['Viridian Forest'] = new DungeonTown('Viridian Forest', [1]);
TownList['Digletts Cave'] = new DungeonTown('Digletts Cave', [1], BadgeCase.Badge.Boulder);
TownList['Mt. Moon'] = new DungeonTown('Mt. Moon', [3], BadgeCase.Badge.Boulder);
TownList['Rock Tunnel'] = new DungeonTown('Rock Tunnel', [9], BadgeCase.Badge.Cascade);
TownList['Power Plant'] = new DungeonTown('Power Plant', [9], BadgeCase.Badge.Cascade);
TownList['Pokemon Tower'] = new DungeonTown('Pokemon Tower', [10], BadgeCase.Badge.Cascade);
TownList['Seafoam Islands'] = new DungeonTown('Seafoam Islands', [19], BadgeCase.Badge.Soul);
TownList['Victory Road'] = new DungeonTown('Victory Road', [22], BadgeCase.Badge.Earth);
TownList['Cerulean Cave'] = new DungeonTown('Cerulean Cave', [4], BadgeCase.Badge.Elite_KantoChampion);
TownList['Pokemon Mansion'] = new DungeonTown('Pokemon Mansion', [20], BadgeCase.Badge.Soul);

//Johto Towns
const NewBarkTownShop = new Shop(['Pokeball']);
TownList['New Bark Town'] = new Town('New Bark Town', [], NewBarkTownShop);

const CherrygroveCityShop = new Shop(['Greatball']);
TownList['Cherrygrove City'] = new Town('Cherrygrove City', [29], CherrygroveCityShop);

const VioletCityShop = new Shop(['MediumRestore', 'Togepi']);
TownList['Violet City'] = new Town('Violet City', [31], VioletCityShop, dungeonList['Sprout Tower']);

const AzaleaTownShop = new Shop(['Kings_rock']);
TownList['Azalea Town'] = new Town('Azalea Town', [33], AzaleaTownShop, dungeonList['Slowpoke Well']);

const GoldenrodCityShop = new Shop(['Sun_stone', 'Upgrade']);
TownList['Goldenrod City'] = new Town('Goldenrod City', [34], GoldenrodCityShop);

TownList['Ecruteak City'] = new Town('Ecruteak City', [37]);

const OlivineCityShop = new Shop(['Metal_coat']);
TownList['Olivine City'] = new Town('Olivine City', [39], OlivineCityShop);

const CianwoodCityShop = new Shop(['Ultraball', 'Time_stone']);
TownList['Cianwood City'] = new Town('Cianwood City', [41], CianwoodCityShop);

TownList['Mahogany Town'] = new Town('Mahogany Town', [42], null, null, 'Mt Mortar');

const BlackthornCityShop = new Shop(['LargeRestore', 'Dragon_scale']);
TownList['Blackthorn City'] = new Town('Blackthorn City', [44], BlackthornCityShop, null, 'Ice Path');

//Johto Dungeons
TownList['Sprout Tower'] = new DungeonTown('Sprout Tower', [31]);
TownList['Ruins of Alph'] = new DungeonTown('Ruins of Alph', [32]);
TownList['Union Cave'] = new DungeonTown('Union Cave', [32]);
TownList['Slowpoke Well'] = new DungeonTown('Slowpoke Well', [33]);
TownList['Ilex Forest'] = new DungeonTown('Ilex Forest', [33]);
TownList['Burned Tower'] = new DungeonTown('Burned Tower', [37]);
TownList['Tin Tower'] = new DungeonTown('Tin Tower', [37]);
TownList['Whirl Islands'] = new DungeonTown('Whirl Islands', [41]);
TownList['Mt Mortar'] = new DungeonTown('Mt Mortar', [42]);
TownList['Ice Path'] = new DungeonTown('Ice Path', [44]);
TownList['Dark Cave'] = new DungeonTown('Dark Cave', [45]);
TownList['Mt Silver'] = new DungeonTown('Mt Silver', [28], BadgeCase.Badge.Elite_Karen);

//Hoenn Towns
const LittleRootTownShop = new Shop(['Pokeball']);
TownList['Littleroot Town'] = new Town('Littleroot Town', [], LittleRootTownShop);
TownList['Oldale Town'] = new Town('Oldale Town', [101]);
TownList['Petalburg City'] = new Town('Petalburg City', [102]);
TownList['Rustboro City'] = new Town('Rustboro City', [104], null, null, 'Petalburg Woods');
TownList['Dewford Town'] = new Town('Dewford Town', [116], null, null, 'Rusturf Tunnel');
TownList['Slateport City'] = new Town('Slateport City', [], null, null, 'Granite Cave');
TownList['Mauville City'] = new Town('Mauville City', [110]);
TownList['Verdanturf Town'] = new Town('Verdanturf Town', [117]);
TownList['Lavaridge Town'] = new Town('Lavaridge Town', [115], null, null, 'Mt. Chimney');
TownList['Fallarbor Town'] = new Town('Fallarbor Town', [113]);
TownList['Fortree City'] = new Town('Fortree City', [119]);

const LilyCoveCityShop = new Shop(['Pokeball', 'Greatball', 'Ultraball', 'SmallRestore', 'MediumRestore', 'LargeRestore', 'xAttack', 'xClick', 'xExp', 'Token_collector', 'Item_magnet', 'Lucky_incense']);
TownList['LilyCove City'] = new Town('LilyCove City', [121], LilyCoveCityShop, null, 'Mt. Pyre');
const MossdeepCityShop = new Shop(['Beldum']);
TownList['Mossdeep City'] = new Town('Mossdeep City', [125], MossdeepCityShop, null, 'Shoal Cave');
TownList['Sootopolis City'] = new Town('Sootopolis City', [126], null, null, 'Cave of Origin');
TownList['Ever Grande City'] = new Town('Ever Grande City', [128]);
TownList['Pokemon League Hoenn'] = new Town('Pokemon League', [128], null, null, 'Victory Road Hoenn');
TownList['Pacifidlog Town'] = new Town('Pacifidlog Town', [131]);

//Hoenn Dungeons
TownList['Petalburg Woods'] = new DungeonTown('Petalburg Woods', [104]);
TownList['Rusturf Tunnel'] = new DungeonTown('Rusturf Tunnel', [116], BadgeCase.Badge.Stone);
TownList['Granite Cave'] = new DungeonTown('Granite Cave', [116], BadgeCase.Badge.Knuckle);
TownList['Fiery Path'] = new DungeonTown('Fiery Path', [111], BadgeCase.Badge.Dynamo);
TownList['Meteor Falls'] = new DungeonTown('Meteor Falls', [114]);
TownList['Mt. Chimney'] = new DungeonTown('Mt. Chimney', [115]);
TownList['Jagged Pass'] = new DungeonTown('Jagged Pass', [115]);
TownList['New Mauville'] = new DungeonTown('New Mauville', [112], BadgeCase.Badge.Heat);
TownList['Mt. Pyre'] = new DungeonTown('Mt. Pyre', [122]);
TownList['Shoal Cave'] = new DungeonTown('Shoal Cave', [125]);
TownList['Cave of Origin'] = new DungeonTown('Cave of Origin', [126]);
TownList['Seafloor Cavern'] = new DungeonTown('Seafloor Cavern', [127]);
TownList['Sky Pillar'] = new DungeonTown('Sky Pillar', [131]);
TownList['Victory Road Hoenn'] = new DungeonTown('Victory Road Hoenn', [128], BadgeCase.Badge.Rain);
