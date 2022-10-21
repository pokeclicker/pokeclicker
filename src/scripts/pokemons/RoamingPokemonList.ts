/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="../../declarations/subRegion/SubRegions.d.ts"/>
///<reference path="../../declarations/requirements/SubregionRequirement.d.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>

class RoamingPokemonList {
    public static roamerGroups = [
        [[GameConstants.KantoSubRegions.Kanto], [GameConstants.KantoSubRegions.Sevii123, GameConstants.KantoSubRegions.Sevii4567]],
        [[GameConstants.JohtoSubRegions.Johto]],
        [[GameConstants.HoennSubRegions.Hoenn]],
        [[GameConstants.SinnohSubRegions.Sinnoh]],
        [[GameConstants.UnovaSubRegions.Unova]],
        [[GameConstants.KalosSubRegions.Kalos]],
        [[GameConstants.AlolaSubRegions.MelemeleIsland, GameConstants.AlolaSubRegions.AkalaIsland, GameConstants.AlolaSubRegions.UlaulaIsland, GameConstants.AlolaSubRegions.PoniIsland]],
        [[GameConstants.GalarSubRegions.SouthGalar], [GameConstants.GalarSubRegions.NorthGalar], [GameConstants.GalarSubRegions.IsleofArmor], [GameConstants.GalarSubRegions.CrownTundra]],
    ];

    public static list: Partial<Record<GameConstants.Region, Array<Array<RoamingPokemon>>>> = {};
    public static increasedChanceRoute: Array<Array<KnockoutObservable<RegionRoute>>> = new Array(GameHelper.enumLength(GameConstants.Region) - 2) // Remove None and Final
        .fill(0).map((v, i) => new Array(RoamingPokemonList.roamerGroups[i].length)
            .fill(0).map(() => ko.observable(undefined)));

    constructor() { }

    public static add(region: GameConstants.Region, subRegionGroup: number, roamer: RoamingPokemon): void {
        if (!RoamingPokemonList.list[region]) {
            RoamingPokemonList.list[region] = [];
        }
        if (!RoamingPokemonList.list[region][subRegionGroup]) {
            RoamingPokemonList.list[region][subRegionGroup] = [];
        }
        RoamingPokemonList.list[region][subRegionGroup].push(roamer);
    }

    public static remove(region: GameConstants.Region, subRegionGroup: number, pokemonName: PokemonNameType): void {
        const index = RoamingPokemonList.list[region][subRegionGroup].findIndex(r => r.pokemon.name == pokemonName);
        if (index >= 0) {
            RoamingPokemonList.list[region][subRegionGroup].splice(index, 1);
        }
    }

    public static getSubRegionalGroupRoamers(region: GameConstants.Region, subRegionGroup: number): Array<RoamingPokemon> {
        return RoamingPokemonList.list[region] && RoamingPokemonList.list[region][subRegionGroup] ?
            RoamingPokemonList.list[region][subRegionGroup].filter(p => p.isRoaming()) :
            [];
    }

    public static getIncreasedChanceRouteBySubRegionGroup(region: GameConstants.Region, subRegionGroup: number): KnockoutObservable<RegionRoute> {
        return RoamingPokemonList.increasedChanceRoute[region]?.[subRegionGroup];
    }

    // How many hours between when the roaming Pokemon change routes for increased chances
    private static period = 8;

    public static generateIncreasedChanceRoutes(date = new Date()) {
        // Seed the random runmber generator
        SeededRand.seedWithDateHour(date, this.period);

        RoamingPokemonList.increasedChanceRoute.forEach((subRegionGroups, region) => {
            subRegionGroups.forEach((route, group) => {
                const routes = Routes.getRoutesByRegion(region).filter(r => this.findGroup(region, r.subRegion ?? 0) === group);
                // Select a route
                const selectedRoute = SeededRand.fromArray(routes);
                route(selectedRoute);
            });
        });
    }

    public static findGroup(region: GameConstants.Region, subRegion: number) {
        return this.roamerGroups[region].findIndex(g => g.includes(subRegion));
    }
}

// Kanto
RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Mew'));

//Kanto - Sevii Islands
RoamingPokemonList.add(GameConstants.Region.kanto, 1, new RoamingPokemon('Raikou', new QuestLineCompletedRequirement('Celio\'s Errand')));
RoamingPokemonList.add(GameConstants.Region.kanto, 1, new RoamingPokemon('Entei', new QuestLineCompletedRequirement('Celio\'s Errand')));
RoamingPokemonList.add(GameConstants.Region.kanto, 1, new RoamingPokemon('Suicune', new MultiRequirement([new QuestLineCompletedRequirement('Celio\'s Errand'), new ObtainedPokemonRequirement(pokemonMap.Suicune)])));
RoamingPokemonList.add(GameConstants.Region.kanto, 1, new RoamingPokemon('Pink Butterfree', new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion)));
RoamingPokemonList.add(GameConstants.Region.kanto, 1, new RoamingPokemon('Ash\'s Butterfree', new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion)));

// Johto
RoamingPokemonList.add(GameConstants.Region.johto, 0, new RoamingPokemon('Raikou', new QuestLineStepCompletedRequirement('The Legendary Beasts', 2)));
RoamingPokemonList.add(GameConstants.Region.johto, 0, new RoamingPokemon('Entei', new QuestLineStepCompletedRequirement('The Legendary Beasts', 2)));

// Hoenn
RoamingPokemonList.add(GameConstants.Region.hoenn, 0, new RoamingPokemon('Latios', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
RoamingPokemonList.add(GameConstants.Region.hoenn, 0, new RoamingPokemon('Latias', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
// TODO: these need another way to be obtained
RoamingPokemonList.add(GameConstants.Region.hoenn, 0, new RoamingPokemon('Jirachi', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));

// Sinnoh
RoamingPokemonList.add(GameConstants.Region.sinnoh, 0, new RoamingPokemon('Manaphy'));
RoamingPokemonList.add(GameConstants.Region.sinnoh, 0, new RoamingPokemon('Mesprit', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))));
RoamingPokemonList.add(GameConstants.Region.sinnoh, 0, new RoamingPokemon('Cresselia', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Fullmoon Island'))));

// Unova
RoamingPokemonList.add(GameConstants.Region.unova, 0, new RoamingPokemon('Tornadus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(GameConstants.Region.unova, 0, new RoamingPokemon('Thundurus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(GameConstants.Region.unova, 0, new RoamingPokemon('Meloetta (Aria)', new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)));

// Kalos
RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Zapdos', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Moltres', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Articuno', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Hoopa', new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)));

//Alola
RoamingPokemonList.add(GameConstants.Region.alola, 0, new RoamingPokemon('Magearna', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));
RoamingPokemonList.add(GameConstants.Region.alola, 0, new RoamingPokemon('Marshadow', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));
RoamingPokemonList.add(GameConstants.Region.alola, 0, new RoamingPokemon('Zeraora', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));

//Galar
RoamingPokemonList.add(GameConstants.Region.galar, 0, new RoamingPokemon('Galarian Zapdos', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));

//Galar - Isle of Armor
RoamingPokemonList.add(GameConstants.Region.galar, 2, new RoamingPokemon('Zarude', new QuestLineStepCompletedRequirement('Secrets of the Jungle', 1)));
RoamingPokemonList.add(GameConstants.Region.galar, 2, new RoamingPokemon('Galarian Moltres', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));

//Galar - Crown Tundra
RoamingPokemonList.add(GameConstants.Region.galar, 3, new RoamingPokemon('Spectrier', new QuestLineStepCompletedRequirement('The Crown of Galar', 6)));
RoamingPokemonList.add(GameConstants.Region.galar, 3, new RoamingPokemon('Glastrier', new QuestLineStepCompletedRequirement('The Crown of Galar', 6)));
RoamingPokemonList.add(GameConstants.Region.galar, 3, new RoamingPokemon('Galarian Articuno', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));
