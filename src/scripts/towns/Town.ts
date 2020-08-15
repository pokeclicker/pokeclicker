/* eslint-disable array-bracket-newline */
///<reference path="../achievements/GymBadgeRequirement.ts"/>
///<reference path="../achievements/OneFromManyRequirement.ts"/>
class Town {
    public name: KnockoutObservable<string>;
    public gym?: KnockoutObservable<Gym>;
    public requirements: (Requirement | OneFromManyRequirement)[];
    public shop?: KnockoutObservable<Shop>;
    public dungeon?: KnockoutObservable<Dungeon>;
    public startingTown: boolean;

    constructor(name: string, requirements: (Requirement | OneFromManyRequirement)[] = [], shop?: Shop, dungeon?: Dungeon) {
        this.name = ko.observable(name);
        this.gym = ko.observable(gymList[name]);
        this.requirements = requirements || [];
        this.shop = ko.observable(shop);
        this.dungeon = ko.observable(dungeon);
        this.startingTown = GameConstants.StartingTowns.includes(this.name());
    }

    public isUnlocked() {
        return this.requirements.every(requirement => requirement.isCompleted());
    }
}

class DungeonTown extends Town {
    constructor(name: string, requirements: (Requirement | OneFromManyRequirement)[] = []) {
        super(name, requirements, null, dungeonList[name]);
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
    ItemList['Mystery_egg'],
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
    ItemList['Pokeball'],
    ItemList['xAttack'],
    ItemList['xClick'],
    ItemList['Dungeon_ticket'],
]);
const LavenderTownShop = new Shop([
    ItemList['Greatball'],
    ItemList['Item_magnet'],
    ItemList['Lucky_incense'],
    ItemList['Grass_egg'],
]);

//Kanto Towns
TownList['Pewter City'] = new Town('Pewter City', [new RouteKillRequirement(10, 2), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Viridian Forest'))], PewterCityShop);
TownList['Cerulean City'] = new Town('Cerulean City', [new RouteKillRequirement(10, 4)], CeruleanCityShop, dungeonList['Cerulean Cave']);
TownList['Vermillion City'] = new Town('Vermillion City', [new RouteKillRequirement(10, 6)], VermillionCityShop);
TownList['Celadon City'] = new Town('Celadon City', [new RouteKillRequirement(10, 8)], CeladonCityShop);
TownList['Saffron City'] = new Town('Saffron City', [new GymBadgeRequirement(BadgeCase.Badge.Rainbow)], SaffronCityShop);
TownList['Fuchsia City'] = new Town('Fuchsia City', [new OneFromManyRequirement([new RouteKillRequirement(10, 18), new RouteKillRequirement(10, 15)])], FuchsiaCityShop);
TownList['Cinnabar Island'] = new Town('Cinnabar Island', [new OneFromManyRequirement([new RouteKillRequirement(10, 20), new RouteKillRequirement(10, 21)])], CinnabarIslandShop, dungeonList['Pokemon Mansion']);
TownList['Viridian City'] = new Town('Viridian City', [new RouteKillRequirement(10, 1)], ViridianCityShop);
TownList['Pallet Town'] = new Town('Pallet Town', []);
TownList['Lavender Town'] = new Town('Lavender Town', [new RouteKillRequirement(10, 10)], LavenderTownShop, dungeonList['Pokemon Tower']);

//Kanto Dungeons
TownList['Viridian Forest'] = new DungeonTown('Viridian Forest', [new RouteKillRequirement(10, 2)]);
TownList['Mt. Moon'] = new DungeonTown('Mt. Moon', [new RouteKillRequirement(10,3)]);
TownList['Digletts Cave'] = new DungeonTown('Digletts Cave', [new RouteKillRequirement(10, 6)]);
TownList['Rock Tunnel'] = new DungeonTown('Rock Tunnel', [new RouteKillRequirement(10, 9), new GymBadgeRequirement(BadgeCase.Badge.Cascade)]);
TownList['Power Plant'] = new DungeonTown('Power Plant', [new RouteKillRequirement(10, 9), new GymBadgeRequirement(BadgeCase.Badge.Soul)]);
TownList['Pokemon Tower'] = new DungeonTown('Pokemon Tower', [new RouteKillRequirement(10, 10), new GymBadgeRequirement(BadgeCase.Badge.Rainbow)]);
TownList['Seafoam Islands'] = new DungeonTown('Seafoam Islands', [new RouteKillRequirement(10, 19)]);
TownList['Pokemon Mansion'] = new DungeonTown('Pokemon Mansion', [new OneFromManyRequirement([new RouteKillRequirement(10, 20), new RouteKillRequirement(10, 21)])]);
TownList['Victory Road'] = new DungeonTown('Victory Road', [new RouteKillRequirement(10, 23)]);
TownList['Cerulean Cave'] = new DungeonTown('Cerulean Cave', [new GymBadgeRequirement(BadgeCase.Badge.Elite_KantoChampion)]);

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
TownList['Cherrygrove City'] = new Town('Cherrygrove City', [new RouteKillRequirement(10, 29)], CherrygroveCityShop);
TownList['Violet City'] = new Town('Violet City', [new RouteKillRequirement(10, 31)], VioletCityShop, dungeonList['Sprout Tower']);
TownList['Azalea Town'] = new Town('Azalea Town', [new RouteKillRequirement(10, 33)], AzaleaTownShop, dungeonList['Slowpoke Well']);
TownList['Goldenrod City'] = new Town('Goldenrod City', [new RouteKillRequirement(10, 34)], GoldenrodCityShop);
TownList['Ecruteak City'] = new Town('Ecruteak City', [new RouteKillRequirement(10, 37)]);
TownList['Olivine City'] = new Town('Olivine City', [new RouteKillRequirement(10, 39)], OlivineCityShop);
TownList['Cianwood City'] = new Town('Cianwood City', [new RouteKillRequirement(10, 41)], CianwoodCityShop);
TownList['Mahogany Town'] = new Town('Mahogany Town', [new RouteKillRequirement(10, 42), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Mt Mortar'))]);
TownList['Blackthorn City'] = new Town('Blackthorn City', [new RouteKillRequirement(10, 44), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Ice Path'))], BlackthornCityShop);

//Johto Dungeons
TownList['Sprout Tower'] = new DungeonTown('Sprout Tower', [new RouteKillRequirement(10, 31), new GymBadgeRequirement(BadgeCase.Badge.Elite_KantoChampion)]);
TownList['Ruins of Alph'] = new DungeonTown('Ruins of Alph', [new RouteKillRequirement(10, 32), new GymBadgeRequirement(BadgeCase.Badge.Zephyr)]);
TownList['Union Cave'] = new DungeonTown('Union Cave', [new RouteKillRequirement(10, 32), new GymBadgeRequirement(BadgeCase.Badge.Zephyr)]);
TownList['Slowpoke Well'] = new DungeonTown('Slowpoke Well', [new RouteKillRequirement(10, 33), new GymBadgeRequirement(BadgeCase.Badge.Zephyr)]);
TownList['Ilex Forest'] = new DungeonTown('Ilex Forest', [new RouteKillRequirement(10, 33), new GymBadgeRequirement(BadgeCase.Badge.Hive)]);
TownList['Burned Tower'] = new DungeonTown('Burned Tower', [new RouteKillRequirement(10, 37), new GymBadgeRequirement(BadgeCase.Badge.Fog)]);
TownList['Tin Tower'] = new DungeonTown('Tin Tower', [new RouteKillRequirement(10, 37), new GymBadgeRequirement(BadgeCase.Badge.Fog)]);
TownList['Whirl Islands'] = new DungeonTown('Whirl Islands', [new RouteKillRequirement(10, 41), new GymBadgeRequirement(BadgeCase.Badge.Storm)]);
TownList['Mt Mortar'] = new DungeonTown('Mt Mortar', [new RouteKillRequirement(10, 42), new GymBadgeRequirement(BadgeCase.Badge.Storm)]);
TownList['Ice Path'] = new DungeonTown('Ice Path', [new RouteKillRequirement(10, 44), new GymBadgeRequirement(BadgeCase.Badge.Glacier)]);
TownList['Dark Cave'] = new DungeonTown('Dark Cave', [new RouteKillRequirement(10, 45), new GymBadgeRequirement(BadgeCase.Badge.Rising)]);
TownList['Mt Silver'] = new DungeonTown('Mt Silver', [new RouteKillRequirement(10, 28), new GymBadgeRequirement(BadgeCase.Badge.Elite_Karen)]);

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
// TODO: finalize items and prices
const BattleFrontierShop = new Shop([
    new PokeballItem(GameConstants.Pokeball.Ultraball, 1, GameConstants.Currency.battlePoint),
    new PokeballItem(GameConstants.Pokeball.Masterball, 500, GameConstants.Currency.battlePoint , { multiplier: 1.35, multiplierDecrease: false, saveName: `${GameConstants.Pokeball[GameConstants.Pokeball.Masterball]}|${GameConstants.Currency[GameConstants.Currency.battlePoint]}` }),
    new EnergyRestore(GameConstants.EnergyRestoreSize.SmallRestore, 10, GameConstants.Currency.battlePoint),
    new EnergyRestore(GameConstants.EnergyRestoreSize.MediumRestore, 20, GameConstants.Currency.battlePoint),
    new EnergyRestore(GameConstants.EnergyRestoreSize.LargeRestore, 40, GameConstants.Currency.battlePoint),
]);

//Hoenn Towns
TownList['Littleroot Town'] = new Town('Littleroot Town', [], LittleRootTownShop);
TownList['Oldale Town'] = new Town('Oldale Town', [new RouteKillRequirement(10, 101)]);
TownList['Petalburg City'] = new Town('Petalburg City', [new RouteKillRequirement(10, 102)]);
TownList['Rustboro City'] = new Town('Rustboro City', [new RouteKillRequirement(10, 104), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Petalburg Woods'))]);
TownList['Dewford Town'] = new Town('Dewford Town', [new RouteKillRequirement(10, 116), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Rusturf Tunnel'))]);
TownList['Slateport City'] = new Town('Slateport City', [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Granite Cave'))]);
TownList['Mauville City'] = new Town('Mauville City', [new RouteKillRequirement(10, 110)]);
TownList['Verdanturf Town'] = new Town('Verdanturf Town', [new RouteKillRequirement(10, 117)]);
TownList['Lavaridge Town'] = new Town('Lavaridge Town', [new RouteKillRequirement(10, 115), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Mt. Chimney'))]);
TownList['Fallarbor Town'] = new Town('Fallarbor Town', [new RouteKillRequirement(10, 113)]);
TownList['Fortree City'] = new Town('Fortree City', [new RouteKillRequirement(10, 119)]);
TownList['LilyCove City'] = new Town('LilyCove City', [new RouteKillRequirement(10, 121), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Mt. Pyre'))], LilyCoveCityShop);
TownList['Mossdeep City'] = new Town('Mossdeep City', [new RouteKillRequirement(10, 125), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Shoal Cave'))], MossdeepCityShop);
TownList['Sootopolis City'] = new Town('Sootopolis City', [new RouteKillRequirement(10, 126), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Cave of Origin'))]);
TownList['Ever Grande City'] = new Town('Ever Grande City', [new RouteKillRequirement(10, 128)]);
TownList['Pokemon League Hoenn'] = new Town('Pokemon League', [new RouteKillRequirement(10, 128), new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Victory Road Hoenn'))]);
TownList['Pacifidlog Town'] = new Town('Pacifidlog Town', [new RouteKillRequirement(10, 131)]);
TownList['Battle Frontier'] = new Town('Battle Frontier', [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Victory Road Hoenn'))], BattleFrontierShop);

//Hoenn Dungeons
TownList['Petalburg Woods'] = new DungeonTown('Petalburg Woods', [new RouteKillRequirement(10, 104)]);
TownList['Rusturf Tunnel'] = new DungeonTown('Rusturf Tunnel', [new RouteKillRequirement(10, 116), new GymBadgeRequirement(BadgeCase.Badge.Stone)]);
TownList['Granite Cave'] = new DungeonTown('Granite Cave', [new RouteKillRequirement(10, 116), new GymBadgeRequirement(BadgeCase.Badge.Knuckle)]);
TownList['Fiery Path'] = new DungeonTown('Fiery Path', [new RouteKillRequirement(10, 111), new GymBadgeRequirement(BadgeCase.Badge.Dynamo)]);
TownList['Meteor Falls'] = new DungeonTown('Meteor Falls', [new RouteKillRequirement(10, 114)]);
TownList['Mt. Chimney'] = new DungeonTown('Mt. Chimney', [new RouteKillRequirement(10, 115)]);
TownList['Jagged Pass'] = new DungeonTown('Jagged Pass', [new RouteKillRequirement(10, 115)]);
TownList['New Mauville'] = new DungeonTown('New Mauville', [new RouteKillRequirement(10, 112), new GymBadgeRequirement(BadgeCase.Badge.Heat)]);
TownList['Mt. Pyre'] = new DungeonTown('Mt. Pyre', [new RouteKillRequirement(10, 122)]);
TownList['Shoal Cave'] = new DungeonTown('Shoal Cave', [new RouteKillRequirement(10, 125)]);
TownList['Cave of Origin'] = new DungeonTown('Cave of Origin', [new RouteKillRequirement(10, 126)]);
TownList['Seafloor Cavern'] = new DungeonTown('Seafloor Cavern', [new RouteKillRequirement(10, 127)]);
TownList['Sky Pillar'] = new DungeonTown('Sky Pillar', [new RouteKillRequirement(10, 131)]);
TownList['Victory Road Hoenn'] = new DungeonTown('Victory Road Hoenn', [new RouteKillRequirement(10, 128), new GymBadgeRequirement(BadgeCase.Badge.Rain)]);
