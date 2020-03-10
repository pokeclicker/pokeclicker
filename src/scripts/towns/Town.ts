///<reference path="../shop/ShopName.ts"/>
///<reference path="../worldmap/worldRequirements/RouteRequirement.ts"/>
///<reference path="../worldmap/worldRequirements/DungeonRequirement.ts"/>
class Town extends WorldLocation {
    requirements: WorldRequirement[];

    private _name: KnockoutObservable<string>;
    public gyms: GymLeaderName[];
    public shops: ShopName[];
    public dungeons: DungeonName[];
    public dungeonReq: string; // Dungeon that must be completed to access town
    public startingTown: boolean;

    constructor(name: string, requirements: WorldRequirement[] = [], shops: ShopName[] = [], gyms: GymLeaderName[] = [], dungeons: DungeonName[] = []) {
        super();
        this._name = ko.observable(name);
        this.gyms = gyms;
        this.requirements = requirements;
        this.shops = shops;
        this.dungeons = dungeons;
        this.startingTown = GameConstants.StartingTowns.indexOf(this._name()) > -1;
    }

    get name(): KnockoutObservable<string> {
        return this._name;
    }

    //TODO refactor to WorldLocation
    public isUnlocked() {
        return !this.requirements.filter(req => !req.isCompleted()).length;
    }

}

class DungeonEntrance extends Town {
    // TODO fix later
    constructor(name: DungeonName, requirements: WorldRequirement[]) {
        super(DungeonName[name], requirements, [], [], [name]);
    }
}

const TownList: { [name: string]: Town  } = {};

//Kanto Towns
TownList['Pewter_City'] = new Town('Pewter_City', [new RouteRequirement(2)], [ShopName.Pewter_City], [GymLeaderName.Brock]);
TownList['Cerulean_City'] = new Town('Cerulean_City', [new RouteRequirement(4)], [ShopName.Cerulean_City], [GymLeaderName.Misty], [DungeonName.Cerulean_Cave]);
TownList['Vermillion_City'] = new Town('Vermillion_City', [new RouteRequirement(6)], [ShopName.Vermillion_City], [GymLeaderName['Lt._Surge']]);
TownList['Celadon_City'] = new Town('Celadon_City', [new RouteRequirement(8)], [ShopName.Celadon_City], [GymLeaderName.Erika]);
TownList['Saffron_City'] = new Town('Saffron_City', [new RouteRequirement(5)], [ShopName.Saffron_City], [GymLeaderName.Sabrina]);
TownList['Fuchsia_City'] = new Town('Fuchsia_City', [new RouteRequirement(18)], [ShopName.Fuchsia_City], [GymLeaderName.Koga]);
TownList['Cinnabar_Island'] = new Town('Cinnabar_Island', [new RouteRequirement(20)], [ShopName.Cinnabar_Island], [GymLeaderName.Blaine], [DungeonName.Pokemon_Mansion]);
TownList['Viridian_City'] = new Town('Viridian_City', [new RouteRequirement(1)], [ShopName.Viridian_City], [GymLeaderName.Giovanni]);
TownList['Pallet_Town'] = new Town('Pallet_Town');
TownList['Lavender_Town'] = new Town('Lavender_Town', [new RouteRequirement(10)], [ShopName.Lavender_Town], [], [DungeonName.Pokemon_Tower]);
TownList['Indigo_Plateau_Kanto'] = new Town('Indigo_Plateau_Kanto', [new RouteRequirement(23)], [], [GymLeaderName.Lorelei, GymLeaderName.Bruno, GymLeaderName.Agatha, GymLeaderName.Lance, GymLeaderName.Blue],[]);

//Kanto Dungeons
TownList['Viridian_Forest'] = new DungeonEntrance(DungeonName.Viridian_Forest, [new RouteRequirement(1)]);
TownList['Digletts_Cave'] = new DungeonEntrance(DungeonName.Digletts_Cave, [new RouteRequirement(2), new BadgeRequirement(BadgeCase.Badge.Boulder)]);
TownList['Mt._Moon'] = new DungeonEntrance(DungeonName['Mt._Moon'], [new RouteRequirement(3), new BadgeRequirement(BadgeCase.Badge.Boulder)]);
TownList['Rock_Tunnel'] = new DungeonEntrance(DungeonName.Rock_Tunnel, [new RouteRequirement(9), new BadgeRequirement(BadgeCase.Badge.Cascade)]);
TownList['Power_Plant'] = new DungeonEntrance(DungeonName.Power_Plant, [new RouteRequirement(9), new BadgeRequirement(BadgeCase.Badge.Cascade)]);
TownList['Pokemon_Tower'] = new DungeonEntrance(DungeonName.Pokemon_Tower, [new RouteRequirement(10), new BadgeRequirement(BadgeCase.Badge.Cascade)]);
TownList['Seafoam_Islands'] = new DungeonEntrance(DungeonName.Seafoam_Islands, [new RouteRequirement(19), new BadgeRequirement(BadgeCase.Badge.Soul)]);
TownList['Victory_Road'] = new DungeonEntrance(DungeonName.Victory_Road, [new RouteRequirement(22), new BadgeRequirement(BadgeCase.Badge.Earth)]);
TownList['Cerulean_Cave'] = new DungeonEntrance(DungeonName.Cerulean_Cave, [new RouteRequirement(4), new BadgeRequirement(BadgeCase.Badge.Elite_KantoChampion)]);
TownList['Pokemon_Mansion'] = new DungeonEntrance(DungeonName.Pokemon_Mansion, [new RouteRequirement(20), new BadgeRequirement(BadgeCase.Badge.Soul)]);

//Johto Towns
TownList['New_Bark_Town'] = new Town('New_Bark_Town', [], [ShopName.New_Bark_Town]);
TownList['Cherrygrove_City'] = new Town('Cherrygrove_City', [new RouteRequirement(29)], [ShopName.Cherrygrove_City]);
TownList['Violet_City'] = new Town('Violet_City', [new RouteRequirement(31)], [ShopName.Violet_City], [], [DungeonName.Sprout_Tower]);
TownList['Azalea_Town'] = new Town('Azalea_Town', [new RouteRequirement(33)], [ShopName.Azalea_Town], [], [DungeonName.Slowpoke_Well]);
TownList['Goldenrod_City'] = new Town('Goldenrod_City', [new RouteRequirement(34)], [ShopName.Goldenrod_City]);
TownList['Ecruteak_City'] = new Town('Ecruteak_City', [new RouteRequirement(37)]);
TownList['Olivine_City'] = new Town('Olivine_City', [new RouteRequirement(39)], [ShopName.Olivine_City]);
TownList['Cianwood_City'] = new Town('Cianwood_City', [new RouteRequirement(41)], [ShopName.Cianwood_City]);
TownList['Mahogany_Town'] = new Town('Mahogany_Town', [new RouteRequirement(42), new DungeonRequirement(DungeonName.Mt_Mortar)]);
TownList['Blackthorn_City'] = new Town('Blackthorn_City', [new RouteRequirement(44), new DungeonRequirement(DungeonName.Ice_Path)], [ShopName.Blackthorn_City]);

//Johto Dungeons
TownList['Sprout_Tower'] = new DungeonEntrance(DungeonName.Sprout_Tower, [new RouteRequirement(31)]);
TownList['Ruins_of_Alph'] = new DungeonEntrance(DungeonName.Ruins_of_Alph, [new RouteRequirement(32)]);
TownList['Union_Cave'] = new DungeonEntrance(DungeonName.Union_Cave, [new RouteRequirement(32)]);
TownList['Slowpoke_Well'] = new DungeonEntrance(DungeonName.Slowpoke_Well, [new RouteRequirement(33)]);
TownList['Ilex_Forest'] = new DungeonEntrance(DungeonName.Ilex_Forest, [new RouteRequirement(33)]);
TownList['Burned_Tower'] = new DungeonEntrance(DungeonName.Burned_Tower, [new RouteRequirement(37)]);
TownList['Tin_Tower'] = new DungeonEntrance(DungeonName.Tin_Tower, [new RouteRequirement(37)]);
TownList['Whirl_Islands'] = new DungeonEntrance(DungeonName.Whirl_Islands, [new RouteRequirement(41)]);
TownList['Mt_Mortar'] = new DungeonEntrance(DungeonName.Mt_Mortar, [new RouteRequirement(42)]);
TownList['Ice_Path'] = new DungeonEntrance(DungeonName.Ice_Path, [new RouteRequirement(44)]);
TownList['Dark_Cave'] = new DungeonEntrance(DungeonName.Dark_Cave, [new RouteRequirement(45)]);
TownList['Mt_Silver'] = new DungeonEntrance(DungeonName.Mt_Silver, [new RouteRequirement(28), new BadgeRequirement(BadgeCase.Badge.Elite_Karen)]);

//Hoenn Towns
// TownList['Littleroot Town'] = new Town('Littleroot Town', []);
// TownList['Oldale Town'] = new Town('Oldale Town', [101]);
// TownList['Petalburg City'] = new Town('Petalburg City', [102]);
// TownList['Rustboro City'] = new Town('Rustboro City', [104], null, null, 'Petalburg Woods');
// TownList['Dewford Town'] = new Town('Dewford Town', [116], null, null, 'Rusturf Tunnel');
// TownList['Slateport City'] = new Town('Slateport City', [], null, null, 'Granite Cave');
// TownList['Mauville City'] = new Town('Mauville City', [110]);
// TownList['Verdanturf Town'] = new Town('Verdanturf Town', [117]);
// TownList['Lavaridge Town'] = new Town('Lavaridge Town', [115], null, null, 'Mt. Chimney');
// TownList['Fallarbor Town'] = new Town('Fallarbor Town', [113]);
// TownList['Fortree City'] = new Town('Fortree City', [119]);
// TownList['Lilycove City'] = new Town('LilyCove City', [121], null, null, 'Mt. Pyre');
// TownList['Mossdeep City'] = new Town('Mossdeep City', [125], null, null, 'Shoal Cave');
// TownList['Sootopolis City'] = new Town('Sootopolis City', [126], null, null, 'Cave of Origin');
// TownList['Ever Grande City'] = new Town('Ever Grande City', [128]);
// TownList['Pokemon League Hoenn'] = new Town('Pokemon League', [128], null, null, 'Victory Road Hoenn');
// TownList['Pacifidlog Town'] = new Town('Pacifidlog Town', [131]);

//Hoenn Dungeons
// TownList['Petalburg Woods'] = new DungeonEntrance(DungeonName.Petalburg Woods, [new RouteRequirement(104)]);
// TownList['Rusturf Tunnel'] = new DungeonEntrance(DungeonName.Rusturf Tunnel, [new RouteRequirement(116), new BadgeRequirement(BadgeCase.Badge.Stone)]);
// TownList['Granite Cave'] = new DungeonEntrance(DungeonName.Granite Cave, [new RouteRequirement(116), new BadgeRequirement(BadgeCase.Badge.Knuckle)]);
// TownList['Fiery Path'] = new DungeonEntrance(DungeonName.Fiery Path, [new RouteRequirement(111), new BadgeRequirement(BadgeCase.Badge.Dynamo)]);
// TownList['Meteor Falls'] = new DungeonEntrance(DungeonName.Meteor Falls, [new RouteRequirement(114)]);
// TownList['Mt. Chimney'] = new DungeonEntrance(DungeonName.Mt. Chimney, [new RouteRequirement(115)]);
// TownList['Jagged Pass'] = new DungeonEntrance(DungeonName.Jagged Pass, [new RouteRequirement(115)]);
// TownList['New Mauville'] = new DungeonEntrance(DungeonName.New Mauville, [new RouteRequirement(112), new BadgeRequirement(BadgeCase.Badge.Heat)]);
// TownList['Mt. Pyre'] = new DungeonEntrance(DungeonName.Mt. Pyre, [new RouteRequirement(122)]);
// TownList['Shoal Cave'] = new DungeonEntrance(DungeonName.Shoal Cave, [new RouteRequirement(125)]);
// TownList['Cave of Origin'] = new DungeonEntrance(DungeonName.Cave of Origin, [new RouteRequirement(126)]);
// TownList['Seafloor Cavern'] = new DungeonEntrance(DungeonName.Seafloor Cavern, [new RouteRequirement(127)]);
// TownList['Sky Pillar'] = new DungeonEntrance(DungeonName.Sky Pillar, [new RouteRequirement(131)]);
// TownList['Victory Road Hoenn'] = new DungeonEntrance(DungeonName.Victory Road Hoenn, [new RouteRequirement(128), new BadgeRequirement(BadgeCase.Badge.Rain)]);
