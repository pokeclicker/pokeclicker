/* eslint-disable array-bracket-newline */
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

const pokeMartShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_egg'],
    ItemList['Item_magnet'],
    ItemList['Token_collector'],
    ItemList['Lucky_incense'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
    ItemList['LargeRestore'],
]);

//Kanto Shops
const PewterCityShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Token_collector'],
    ItemList['Lucky_egg'],
    ItemList['Dungeon_ticket'],
]);
const CeruleanCityShop = new Shop([
    ItemList['Water_stone'],
    ItemList['xAttack'],
    ItemList['Water_egg'],
]);
const VermillionCityShop = new Shop([
    ItemList['Thunder_stone'],
    ItemList['Lucky_egg'],
    ItemList['Electric_egg'],
]);
const CeladonCityShop = new Shop([
    ItemList['Eevee'],
    ItemList['Porygon'],
    ItemList['Jynx'],
    ItemList['Mr. Mime'],
    ItemList['Lickitung'],
]);
const SaffronCityShop = new Shop([
    ItemList['Moon_stone'],
    ItemList['xClick'],
    ItemList['Leaf_stone'],
    ItemList['Fighting_egg'],
]);
const FuchsiaCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Trade_stone'],
    ItemList['Lucky_egg'],
    ItemList['Dragon_egg'],
]);
const CinnabarIslandShop = new Shop([
    ItemList['Fire_stone'],
    ItemList['Fire_egg'],
    ItemList['SmallRestore'],
    ItemList['Explorer_kit'],
]);
const ViridianCityShop = new Shop([
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Mystery_egg'],
]);
const LavenderTownShop = new Shop([
    ItemList['Greatball'],
    ItemList['Item_magnet'],
    ItemList['Lucky_incense'],
    ItemList['Grass_egg'],
]);

//Kanto Towns
TownList['Pewter City'] = new Town('Pewter City', [2], PewterCityShop);
TownList['Cerulean City'] = new Town('Cerulean City', [4], CeruleanCityShop, dungeonList['Cerulean Cave']);
TownList['Vermillion City'] = new Town('Vermillion City', [6], VermillionCityShop);
TownList['Celadon City'] = new Town('Celadon City', [8], CeladonCityShop);
TownList['Saffron City'] = new Town('Saffron City', [5], SaffronCityShop);
TownList['Fuchsia City'] = new Town('Fuchsia City', [18], FuchsiaCityShop);
TownList['Cinnabar Island'] = new Town('Cinnabar Island', [20], CinnabarIslandShop, dungeonList['Pokemon Mansion']);
TownList['Viridian City'] = new Town('Viridian City', [1], ViridianCityShop);
TownList['Pallet Town'] = new Town('Pallet Town', []);
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

//Johto Shops
const NewBarkTownShop = new Shop([
    ItemList['Pokeball'],
]);
const CherrygroveCityShop = new Shop([
    ItemList['Greatball'],
]);
const VioletCityShop = new Shop([
    ItemList['MediumRestore'],
    ItemList['Togepi'],
]);
const AzaleaTownShop = new Shop([
    ItemList['Kings_rock'],
]);
const GoldenrodCityShop = new Shop([
    ItemList['Sun_stone'],
    ItemList['Upgrade'],
]);
const OlivineCityShop = new Shop([
    ItemList['Metal_coat'],
]);
const CianwoodCityShop = new Shop([
    ItemList['Ultraball'],
    ItemList['Time_stone'],
]);
const BlackthornCityShop = new Shop([
    ItemList['LargeRestore'],
    ItemList['Dragon_scale'],
]);

//Johto Towns
TownList['New Bark Town'] = new Town('New Bark Town', [], NewBarkTownShop);
TownList['Cherrygrove City'] = new Town('Cherrygrove City', [29], CherrygroveCityShop);
TownList['Violet City'] = new Town('Violet City', [31], VioletCityShop, dungeonList['Sprout Tower']);
TownList['Azalea Town'] = new Town('Azalea Town', [33], AzaleaTownShop, dungeonList['Slowpoke Well']);
TownList['Goldenrod City'] = new Town('Goldenrod City', [34], GoldenrodCityShop);
TownList['Ecruteak City'] = new Town('Ecruteak City', [37]);
TownList['Olivine City'] = new Town('Olivine City', [39], OlivineCityShop);
TownList['Cianwood City'] = new Town('Cianwood City', [41], CianwoodCityShop);
TownList['Mahogany Town'] = new Town('Mahogany Town', [42], null, null, 'Mt Mortar');
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

//Hoenn Shops
const LittleRootTownShop = new Shop([
    ItemList['Pokeball'],
]);
const LilyCoveCityShop = new Shop([
    ItemList['Pokeball'],
    ItemList['Greatball'],
    ItemList['Ultraball'],
    ItemList['SmallRestore'],
    ItemList['MediumRestore'],
    ItemList['LargeRestore'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Lucky_egg'],
    ItemList['Token_collector'],
    ItemList['Item_magnet'],
    ItemList['Lucky_incense'],
]);
const MossdeepCityShop = new Shop([
    ItemList['Beldum'],
]);

//Hoenn Towns
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
TownList['LilyCove City'] = new Town('LilyCove City', [121], LilyCoveCityShop, null, 'Mt. Pyre');
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
