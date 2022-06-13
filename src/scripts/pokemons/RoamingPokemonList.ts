/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="../../declarations/subRegion/SubRegions.d.ts"/>
///<reference path="../../declarations/requirements/SubregionRequirement.d.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>

class RoamingPokemonList {
    public static list: Partial<Record<GameConstants.Region, Array<RoamingPokemon>>> = {};
    public static increasedChanceRoute: Array<KnockoutObservable<RegionRoute>> = new Array(GameHelper.enumLength(GameConstants.Region)).fill(0).map((route, region) => ko.observable(null));

    constructor() { }

    public static add(region: GameConstants.Region, roamer: RoamingPokemon): void {
        if (!RoamingPokemonList.list[region]) {
            RoamingPokemonList.list[region] = [];
        }
        RoamingPokemonList.list[region].push(roamer);
    }

    public static remove(region: GameConstants.Region, pokemonName: PokemonNameType): void {
        const index = RoamingPokemonList.list[region].findIndex(r => r.pokemon.name == pokemonName);
        if (index >= 0) {
            RoamingPokemonList.list[region].splice(index, 1);
        }
    }

    public static getRegionalRoamers(region: GameConstants.Region): Array<RoamingPokemon> {
        return RoamingPokemonList.list[region] ? RoamingPokemonList.list[region].filter(p => p.isRoaming()) : [];
    }

    public static getIncreasedChanceRouteByRegion(region: GameConstants.Region): KnockoutObservable<RegionRoute> {
        return this.increasedChanceRoute[region];
    }

    // How many hours between when the roaming Pokemon change routes for increased chances
    private static period = 8;

    public static generateIncreasedChanceRoutes(date = new Date()) {
        // Seed the random runmber generator
        SeededRand.seedWithDateHour(date, this.period);

        this.increasedChanceRoute.forEach((route, region) => {
            const routes = Routes.getRoutesByRegion(region);
            // Select a route
            const selectedRoute = SeededRand.fromArray(routes);
            route(selectedRoute);
        });
    }
}

// Kanto
RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon('Mew'));

// Johto
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon('Raikou', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon('Entei', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon('Suicune', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));

// Hoenn
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon('Latios', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon('Latias', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
// TODO: these need another way to be obtained
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon('Jirachi', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));

// Sinnoh
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon('Manaphy'));
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon('Mesprit', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))));
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon('Cresselia', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Fullmoon Island'))));

// Unova
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon('Tornadus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon('Thundurus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon('Meloetta (aria)', new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)));

// Kalos
RoamingPokemonList.add(GameConstants.Region.kalos, new RoamingPokemon('Zapdos', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(GameConstants.Region.kalos, new RoamingPokemon('Moltres', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(GameConstants.Region.kalos, new RoamingPokemon('Articuno', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(GameConstants.Region.kalos, new RoamingPokemon('Hoopa', new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)));

//Alola
RoamingPokemonList.add(GameConstants.Region.alola, new RoamingPokemon('Magearna', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));
RoamingPokemonList.add(GameConstants.Region.alola, new RoamingPokemon('Marshadow', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));
RoamingPokemonList.add(GameConstants.Region.alola, new RoamingPokemon('Zeraora', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));

//Galar
RoamingPokemonList.add(GameConstants.Region.galar, new RoamingPokemon('Galarian Zapdos', new MultiRequirement([
    new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill')),
    // TODO: uncomment this once Galar split into 2
    // new OneFromManyRequirement([
    //     new SubregionRequirement(GameConstants.Region.galar, SubRegions.getSubRegion(GameConstants.Region.galar, 'Galar North').id),
    //     new SubregionRequirement(GameConstants.Region.galar, SubRegions.getSubRegion(GameConstants.Region.galar, 'Galar South').id),
    // ]),
])));

//Galar - Isle of Armor
RoamingPokemonList.add(GameConstants.Region.galar, new RoamingPokemon('Zarude', new MultiRequirement([
    new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion),
    new SubregionRequirement(GameConstants.Region.galar, SubRegions.getSubRegion(GameConstants.Region.galar, 'Isle of Armor').id),
])));
RoamingPokemonList.add(GameConstants.Region.galar, new RoamingPokemon('Galarian Moltres', new MultiRequirement([
    new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill')),
    new SubregionRequirement(GameConstants.Region.galar, SubRegions.getSubRegion(GameConstants.Region.galar, 'Isle of Armor').id),
])));

//Galar - Crown Tundra
RoamingPokemonList.add(GameConstants.Region.galar, new RoamingPokemon('Spectrier', new MultiRequirement([
    new TemporaryBattleRequirement('Spectrier')
    new SubregionRequirement(GameConstants.Region.galar, SubRegions.getSubRegion(GameConstants.Region.galar, 'Crown Tundra').id),
])));
RoamingPokemonList.add(GameConstants.Region.galar, new RoamingPokemon('Glastrier', new MultiRequirement([
    new TemporaryBattleRequirement('Glastrier')
    new SubregionRequirement(GameConstants.Region.galar, SubRegions.getSubRegion(GameConstants.Region.galar, 'Crown Tundra').id),
])));
RoamingPokemonList.add(GameConstants.Region.galar, new RoamingPokemon('Galarian Articuno', new MultiRequirement([
    new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill')),
    new SubregionRequirement(GameConstants.Region.galar, SubRegions.getSubRegion(GameConstants.Region.galar, 'Crown Tundra').id),
])));
