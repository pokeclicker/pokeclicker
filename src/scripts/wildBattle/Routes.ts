/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="RegionRoute.ts"/>
///<reference path="../../scripts/GameConstants.d.ts" />
/// <reference path="../../declarations/weather/WeatherType.d.ts"/>
/// <reference path="../achievements/WeatherRequirement.ts"/>

class Routes {
    public static regionRoutes: RegionRoute[] = [];
    constructor() {}

    public static add(route: RegionRoute): void {
        this.regionRoutes.push(route);
        // Sort the routes so we can normalize the route number
        this.sortRegionRoutes();
    }

    public static sortRegionRoutes(): void {
        this.regionRoutes
            .sort((routeA, routeB) => routeA.orderNumber - routeB.orderNumber)
            .sort((routeA, routeB) => routeA.region - routeB.region);
    }

    public static getRoute(region: GameConstants.Region, route: number): RegionRoute {
        return this.regionRoutes.find(routeData => routeData.region == region && routeData.number == route);
    }

    public static getRoutesByRegion(region: GameConstants.Region): RegionRoute[] {
        return this.regionRoutes.filter(routeData => routeData.region == region);
    }

    public static getRegionByRoute(route: number): GameConstants.Region {
        return this.regionRoutes.find(routeData => routeData.number == route).region;
    }

    public static getName(route: number, region: number): string {
        return this.regionRoutes.find(routeData => routeData.region == region && routeData.number == route).routeName;
    }

    public static unnormalizeRoute(normalizedRoute: number): number {
        return this.regionRoutes[normalizedRoute - 1].number;
    }
    public static normalizedNumber(region: GameConstants.Region, route: number): number {
        if (region == GameConstants.Region.none) {
            return route;
        }
        return this.regionRoutes.findIndex(routeData => routeData.region == region && routeData.number == route) + 1;
    }
}

/*
KANTO
*/
Routes.add(new RegionRoute(
    'Kanto Route 1', GameConstants.Region.kanto, 1,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata'],
    })
));
Routes.add(new RegionRoute(
    'Kanto Route 22', GameConstants.Region.kanto, 22,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Nidoran(F)', 'Nidoran(M)', 'Mankey'],
        water: ['Magikarp', 'Poliwag', 'Poliwhirl', 'Goldeen'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)],
    1.1
));
Routes.add(new RegionRoute(
    'Kanto Route 2', GameConstants.Region.kanto, 2,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Nidoran(F)', 'Nidoran(M)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)]
));
Routes.add(new RegionRoute(
    'Kanto Route 3', GameConstants.Region.kanto, 3,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Sandshrew', 'Mankey'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 2),
        new GymBadgeRequirement(BadgeEnums.Boulder),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 4', GameConstants.Region.kanto, 4,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Mankey'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Seaking'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 3),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Moon')),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 24', GameConstants.Region.kanto, 24,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Venonat', 'Bellsprout'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Seaking'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
    4.1
));
Routes.add(new RegionRoute(
    'Kanto Route 25', GameConstants.Region.kanto, 25,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Venonat', 'Bellsprout'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Krabby', 'Kingler'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 24)],
    4.2
));
Routes.add(new RegionRoute(
    'Kanto Route 5', GameConstants.Region.kanto, 5,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Jigglypuff', 'Meowth', 'Abra'],
    }),
    [
        // Need to reach bills house
        new RouteKillRequirement(10, GameConstants.Region.kanto, 25),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 6', GameConstants.Region.kanto, 6,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Jigglypuff', 'Meowth', 'Abra'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Poliwag', 'Goldeen'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 5)]
));
Routes.add(new RegionRoute(
    'Kanto Route 11', GameConstants.Region.kanto, 11,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Raticate', 'Rattata', 'Drowzee'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Horsea'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)],
    6.1
));
Routes.add(new RegionRoute(
    'Kanto Route 9', GameConstants.Region.kanto, 9,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Nidoran(F)', 'Nidoran(M)', 'Nidorina', 'Nidorino'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 6),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 10', GameConstants.Region.kanto, 10,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Nidoran(F)', 'Nidoran(M)', 'Machop', 'Magnemite'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Krabby', 'Kingler', 'Horsea'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rock Tunnel')),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 8', GameConstants.Region.kanto, 8,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Vulpix', 'Jigglypuff', 'Meowth', 'Abra', 'Kadabra'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
    10.1
));
Routes.add(new RegionRoute(
    'Kanto Route 7', GameConstants.Region.kanto, 7,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Vulpix', 'Jigglypuff', 'Meowth', 'Abra'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 8)],
    10.2
));
Routes.add(new RegionRoute(
    'Kanto Route 12', GameConstants.Region.kanto, 12,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Snorlax'],
        water: ['Slowpoke', 'Slowbro', 'Magikarp', 'Poliwag', 'Goldeen', 'Horsea', 'Seadra'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokemon Tower'))]
));
Routes.add(new RegionRoute(
    'Kanto Route 13', GameConstants.Region.kanto, 13,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Farfetch\'d'],
        water: ['Slowpoke', 'Slowbro', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Horsea', 'Seadra'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 12),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 14),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 14', GameConstants.Region.kanto, 14,
    new RoutePokemon({
        land: ['Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Venomoth', 'Bellsprout', 'Weepinbell'],
        water: ['Magikarp', 'Poliwag', 'Goldeen'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 13),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 15', GameConstants.Region.kanto, 15,
    new RoutePokemon({
        land: ['Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Venomoth', 'Bellsprout', 'Weepinbell'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 14),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 16', GameConstants.Region.kanto, 16,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo', 'Snorlax'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokemon Tower'))]
));
Routes.add(new RegionRoute(
    'Kanto Route 17', GameConstants.Region.kanto, 17,
    new RoutePokemon({
        land: ['Fearow', 'Ponyta', 'Doduo', 'Dodrio'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Shellder'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 16),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 18', GameConstants.Region.kanto, 18,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Shellder'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 17),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 19', GameConstants.Region.kanto, 19,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Staryu'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Soul)]
));
Routes.add(new RegionRoute(
    'Kanto Route 20', GameConstants.Region.kanto, 20,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Staryu'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seafoam Islands')),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Kanto Route 21', GameConstants.Region.kanto, 21,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Raticate', 'Tangela'],
        water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Staryu'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Soul)]
));
Routes.add(new RegionRoute(
    'Kanto Route 23', GameConstants.Region.kanto, 23,
    new RoutePokemon({
        land: ['Fearow', 'Nidorina', 'Nidorino', 'Mankey', 'Primeape'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Poliwhirl'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 22),
        new GymBadgeRequirement(BadgeEnums.Earth),
    ]
));

/*
JOHTO
*/
Routes.add(new RegionRoute(
    'Johto Route 29', GameConstants.Region.johto, 29,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Sentret', 'Hoothoot'],
        headbutt: ['Exeggcute', 'Ledyba', 'Spinarak', 'Hoothoot', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)]
));
Routes.add(new RegionRoute(
    'Johto Route 30', GameConstants.Region.johto, 30,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Hoothoot', 'Ledyba', 'Spinarak'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 29)]
));
Routes.add(new RegionRoute(
    'Johto Route 31', GameConstants.Region.johto, 31,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Poliwag', 'Hoothoot', 'Ledyba', 'Spinarak', 'Bellsprout'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
        headbutt: ['Spearow', 'Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Aipom', 'Pineco', 'Heracross'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 30)]
));
Routes.add(new RegionRoute(
    'Johto Route 32', GameConstants.Region.johto, 32,
    new RoutePokemon({
        land: ['Rattata', 'Ekans', 'Zubat', 'Bellsprout', 'Mareep', 'Hoppip', 'Wooper'],
        water: ['Tentacool', 'Tentacruel', 'Quagsire', 'Magikarp', 'Qwilfish'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Zephyr)]
));
Routes.add(new RegionRoute(
    'Johto Route 33', GameConstants.Region.johto, 33,
    new RoutePokemon({
        land: ['Spearow', 'Rattata', 'Ekans', 'Zubat', 'Hoppip'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Union Cave'))]
));
Routes.add(new RegionRoute(
    'Johto Route 34', GameConstants.Region.johto, 34,
    new RoutePokemon({
        land: ['Rattata', 'Abra', 'Drowzee', 'Ditto'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Magikarp', 'Staryu', 'Corsola', 'Kingler'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ilex Forest'))]
));
Routes.add(new RegionRoute(
    'Johto Route 35', GameConstants.Region.johto, 35,
    new RoutePokemon({
        land: ['Pidgey', 'Nidoran(F)', 'Nidoran(M)', 'Abra', 'Drowzee', 'Ditto', 'Hoothoot', 'Yanma'],
        water: ['Psyduck', 'Golduck', 'Poliwag', 'Magikarp'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 34)]
));
Routes.add(new RegionRoute(
    'Johto Route 36', GameConstants.Region.johto, 36,
    new RoutePokemon({
        land: ['Pidgey', 'Nidoran(M)', 'Nidoran(F)', 'Vulpix', 'Growlithe', 'Hoothoot', 'Stantler', 'Sudowoodo'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Plain)]
));
Routes.add(new RegionRoute(
    'Johto Route 37', GameConstants.Region.johto, 37,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Vulpix', 'Growlithe', 'Hoothoot', 'Ledyba', 'Spinarak', 'Stantler'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 36)]
));
Routes.add(new RegionRoute(
    'Johto Route 38', GameConstants.Region.johto, 38,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Meowth', 'Magnemite', 'Farfetch\'d', 'Tauros', 'Snubbull', 'Miltank'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 37)]
));
Routes.add(new RegionRoute(
    'Johto Route 39', GameConstants.Region.johto, 39,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Meowth', 'Magnemite', 'Farfetch\'d', 'Tauros', 'Miltank'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 38)]
));
Routes.add(new RegionRoute(
    'Johto Route 40', GameConstants.Region.johto, 40,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Magikarp', 'Staryu', 'Corsola', 'Kingler'],
    }),
    [

        new RouteKillRequirement(10, GameConstants.Region.johto, 39),
        new GymBadgeRequirement(BadgeEnums.Fog),
    ]
));
Routes.add(new RegionRoute(
    'Johto Route 41', GameConstants.Region.johto, 41,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Mantine', 'Magikarp', 'Chinchou', 'Shellder'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 40)]
));
Routes.add(new RegionRoute(
    'Johto Route 42', GameConstants.Region.johto, 42,
    new RoutePokemon({
        land: ['Spearow', 'Zubat', 'Mankey', 'Mareep', 'Flaaffy'],
        water: ['Goldeen', 'Seaking', 'Magikarp'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fog)]
));
Routes.add(new RegionRoute(
    'Johto Route 43', GameConstants.Region.johto, 43,
    new RoutePokemon({
        land: ['Pidgeotto', 'Venonat', 'Noctowl', 'Mareep', 'Flaaffy', 'Girafarig'],
        water: ['Magikarp', 'Poliwag'],
        headbutt: ['Venonat', 'Exeggcute', 'Hoothoot', 'Pineco'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 42)]
));
Routes.add(new RegionRoute(
    'Johto Route 44', GameConstants.Region.johto, 44,
    new RoutePokemon({
        land: ['Bellsprout', 'Weepinbell', 'Lickitung', 'Tangela'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Remoraid'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [
        new GymBadgeRequirement(BadgeEnums.Mineral),
        new GymBadgeRequirement(BadgeEnums.Glacier),
    ]
));
Routes.add(new RegionRoute(
    'Johto Route 45', GameConstants.Region.johto, 45,
    new RoutePokemon({
        land: ['Geodude', 'Graveler', 'Gligar', 'Teddiursa', 'Skarmory', 'Phanpy'],
        water: ['Magikarp', 'Poliwag', 'Dratini'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ice Path'))]
));
Routes.add(new RegionRoute(
    'Johto Route 46', GameConstants.Region.johto, 46,
    new RoutePokemon({
        land: ['Spearow', 'Rattata', 'Geodude'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 29)],
    29.1
));
Routes.add(new RegionRoute(
    'Johto Route 47', GameConstants.Region.johto, 47,
    new RoutePokemon({
        land: ['Raticate', 'Spearow', 'Fearow', 'Gloom', 'Farfetch\'d', 'Ditto', 'Noctowl', 'Miltank'],
        water: ['Tentacool', 'Seel', 'Staryu', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Metapod', 'Butterfree', 'Kakuna', 'Beedrill', 'Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Mineral)]
));
Routes.add(new RegionRoute(
    'Johto Route 48', GameConstants.Region.johto, 48,
    new RoutePokemon({
        land: ['Fearow', 'Vulpix', 'Gloom', 'Diglett', 'Growlithe', 'Farfetch\'d', 'Tauros', 'Hoppip', 'Girafarig'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 47)]
));
Routes.add(new RegionRoute(
    'Johto Route 26', GameConstants.Region.johto, 26,
    new RoutePokemon({
        land: ['Raticate', 'Arbok', 'Sandslash', 'Ponyta', 'Doduo', 'Dodrio', 'Quagsire'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.johto, 27)],
    50
));
Routes.add(new RegionRoute(
    'Johto Route 27', GameConstants.Region.johto, 27,
    new RoutePokemon({
        land: ['Raticate', 'Arbok', 'Sandslash', 'Ponyta', 'Doduo', 'Dodrio', 'Quagsire'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Rising)],
    49
));
Routes.add(new RegionRoute(
    'Johto Route 28', GameConstants.Region.johto, 28,
    new RoutePokemon({
        land: ['Ponyta', 'Tangela', 'Donphan', 'Ursaring', 'Rapidash', 'Doduo', 'Dodrio', 'Sneasel', 'Murkrow'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
        headbutt: ['Natu', 'Aipom', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
    51
));

/*
HOENN
*/
Routes.add(new RegionRoute(
    'Hoenn Route 101', GameConstants.Region.hoenn, 101,
    new RoutePokemon({
        land: ['Wurmple', 'Poochyena', 'Zigzagoon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 102', GameConstants.Region.hoenn, 102,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Wurmple', 'Lotad', 'Zigzagoon', 'Ralts', 'Seedot'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Corphish'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 103', GameConstants.Region.hoenn, 103,
    new RoutePokemon({
        land: ['Poochyena', 'Wingull', 'Zigzagoon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 101)],
    101.1
));
Routes.add(new RegionRoute(
    'Hoenn Route 104', GameConstants.Region.hoenn, 104,
    new RoutePokemon({
        land: ['Poochyena', 'Wurmple', 'Marill', 'Taillow', 'Wingull'],
        water: ['Wingull', 'Pelipper', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 102)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 105', GameConstants.Region.hoenn, 105,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)],
    115.1
));
Routes.add(new RegionRoute(
    'Hoenn Route 106', GameConstants.Region.hoenn, 106,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 105),
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 107),
        ]),
    ],
    115.2
));
Routes.add(new RegionRoute(
    'Hoenn Route 107', GameConstants.Region.hoenn, 107,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 106),
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 108),
        ]),
    ],
    115.3
));
Routes.add(new RegionRoute(
    'Hoenn Route 108', GameConstants.Region.hoenn, 108,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 107),
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 109),
        ]),
    ],
    115.4
));
Routes.add(new RegionRoute(
    'Hoenn Route 109', GameConstants.Region.hoenn, 109,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)],
    115.5
));
Routes.add(new RegionRoute(
    'Hoenn Route 110', GameConstants.Region.hoenn, 110,
    new RoutePokemon({
        land: ['Poochyena', 'Gulpin', 'Minun', 'Oddish', 'Wingull', 'Plusle'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Granite Cave')),
        new GymBadgeRequirement(BadgeEnums.Knuckle),
    ]
));
Routes.add(new RegionRoute(
    'Hoenn Route 111', GameConstants.Region.hoenn, 111,
    new RoutePokemon({
        land: ['Sandshrew', 'Trapinch', 'Baltoy', 'Cacnea'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
        headbutt: ['Geodude'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Dynamo)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 112', GameConstants.Region.hoenn, 112,
    new RoutePokemon({
        land: ['Numel', 'Marill'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 111)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 113', GameConstants.Region.hoenn, 113,
    new RoutePokemon({
        land: ['Spinda', 'Slugma', 'Skarmory'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Fiery Path'))]
));
Routes.add(new RegionRoute(
    'Hoenn Route 114', GameConstants.Region.hoenn, 114,
    new RoutePokemon({
        land: ['Zangoose', 'Surskit', 'Swablu', 'Lotad', 'Lombre', 'Seviper', 'Nuzleaf'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
        headbutt: ['Geodude'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 113)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 115', GameConstants.Region.hoenn, 115,
    new RoutePokemon({
        land: ['Swablu', 'Taillow', 'Swellow', 'Jigglypuff', 'Wingull'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Meteor Falls'))]
));
Routes.add(new RegionRoute(
    'Hoenn Route 116', GameConstants.Region.hoenn, 116,
    new RoutePokemon({
        land: ['Poochyena', 'Whismur', 'Nincada', 'Abra', 'Taillow', 'Skitty'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))],
    104.1
));
Routes.add(new RegionRoute(
    'Hoenn Route 117', GameConstants.Region.hoenn, 117,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Oddish', 'Marill', 'Illumise', 'Volbeat', 'Seedot'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Corphish'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 110)],
    110.1
));
Routes.add(new RegionRoute(
    'Hoenn Route 118', GameConstants.Region.hoenn, 118,
    new RoutePokemon({
        land: ['Zigzagoon', 'Linoone', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha', 'Sharpedo'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 119', GameConstants.Region.hoenn, 119,
    new RoutePokemon({
        land: ['Zigzagoon', 'Linoone', 'Oddish', 'Tropius', 'Kecleon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha'],
        special:
        [
            new SpecialRoutePokemon(['Castform'], new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Sandstorm, WeatherType.Windy])),
            new SpecialRoutePokemon(['Castform (sunny)'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Castform (rainy)'], new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Castform (snowy)'], new WeatherRequirement([WeatherType.Snow, WeatherType.Blizzard, WeatherType.Hail, WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 118)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 120', GameConstants.Region.hoenn, 120,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Mightyena', 'Oddish', 'Marill', 'Absol', 'Kecleon', 'Seedot'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 119)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 121', GameConstants.Region.hoenn, 121,
    new RoutePokemon({
        land: ['Poochyena', 'Shuppet', 'Mightyena', 'Oddish', 'Gloom', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 120)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 122', GameConstants.Region.hoenn, 122,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 121),
        new GymBadgeRequirement(BadgeEnums.Feather),
    ]
));
Routes.add(new RegionRoute(
    'Hoenn Route 123', GameConstants.Region.hoenn, 123,
    new RoutePokemon({
        land: ['Poochyena', 'Shuppet', 'Mightyena', 'Oddish', 'Gloom', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 122)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 124', GameConstants.Region.hoenn, 124,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Clamperl', 'Relicanth'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aqua Hideout'))]
));
Routes.add(new RegionRoute(
    'Hoenn Route 125', GameConstants.Region.hoenn, 125,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 124)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 126', GameConstants.Region.hoenn, 126,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Clamperl', 'Relicanth'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 124)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 127', GameConstants.Region.hoenn, 127,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 125),
            new RouteKillRequirement(10, GameConstants.Region.hoenn, 126),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Hoenn Route 128', GameConstants.Region.hoenn, 128,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Luvdisc', 'Wailmer', 'Corsola'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 127)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 129', GameConstants.Region.hoenn, 129,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Wailord', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 128)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 130', GameConstants.Region.hoenn, 130,
    new RoutePokemon({
        land: ['Wynaut'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 129)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 131', GameConstants.Region.hoenn, 131,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 130)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 132', GameConstants.Region.hoenn, 132,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 131)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 133', GameConstants.Region.hoenn, 133,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 132)]
));
Routes.add(new RegionRoute(
    'Hoenn Route 134', GameConstants.Region.hoenn, 134,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 133)]
));

/*
SINNOH
*/
Routes.add(new RegionRoute(
    'Sinnoh Route 201', GameConstants.Region.sinnoh, 201,
    new RoutePokemon({
        land: ['Starly', 'Bidoof', 'Kricketot'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 202', GameConstants.Region.sinnoh, 202,
    new RoutePokemon({
        land: ['Starly', 'Bidoof', 'Kricketot', 'Shinx'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 201)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 203', GameConstants.Region.sinnoh, 203,
    new RoutePokemon({
        land: ['Zubat', 'Abra', 'Starly', 'Bidoof', 'Kricketot', 'Shinx'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 204', GameConstants.Region.sinnoh, 204,
    new RoutePokemon({
        land: ['Zubat', 'Wurmple', 'Starly', 'Bidoof', 'Kricketot', 'Shinx', 'Budew'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 202)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 205', GameConstants.Region.sinnoh, 205,
    new RoutePokemon({
        land: ['Bidoof', 'Hoothoot', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Kricketot', 'Budew', 'Drifloon'],
        water: ['Wingull', 'Pelipper', 'Buizel', 'Tentacool', 'Tentacruel', 'Shellos (west)', 'Gastrodon (west)', 'Magikarp', 'Finneon', 'Shellder', 'Gyarados', 'Lumineon', 'Psyduck', 'Golduck', 'Barboach', 'Whiscash'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 204),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ravaged Path')),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 206', GameConstants.Region.sinnoh, 206,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Gligar', 'Kricketot', 'Kricketune', 'Stunky', 'Bronzor'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 205),
        new GymBadgeRequirement(BadgeEnums.Forest),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 207', GameConstants.Region.sinnoh, 207,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Kricketot'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 206)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 208', GameConstants.Region.sinnoh, 208,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Ralts', 'Meditite', 'Roselia', 'Bidoof', 'Bibarel', 'Budew'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Barboach', 'Gyarados', 'Whiscash', 'Seaking'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 207),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Coronet South')),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 209', GameConstants.Region.sinnoh, 209,
    new RoutePokemon({
        land: ['Zubat', 'Gastly', 'Chansey', 'Ralts', 'Roselia', 'Duskull', 'Starly', 'Staravia', 'Bibarel', 'Bonsly', 'Mime Jr.'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 208),
        new GymBadgeRequirement(BadgeEnums.Relic),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 210', GameConstants.Region.sinnoh, 210,
    new RoutePokemon({
        land: ['Geodude', 'Ponyta', 'Chansey', 'Scyther', 'Hoothoot', 'Noctowl', 'Roselia', 'Staravia', 'Kricketune', 'Bonsly', 'Mime Jr.', 'Machop', 'Machoke', 'Meditite', 'Swablu', 'Bibarel'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Barboach', 'Whiscash', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 211', GameConstants.Region.sinnoh, 211,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Hoothoot', 'Meditite', 'Bidoof', 'Machoke', 'Graveler', 'Noctowl', 'Chingling', 'Bronzor'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213),
        new GymBadgeRequirement(BadgeEnums.Fen),
    ],
    210.5
));
Routes.add(new RegionRoute(
    'Sinnoh Route 212', GameConstants.Region.sinnoh, 212,
    new RoutePokemon({
        land: ['Ralts', 'Kirlia', 'Roselia', 'Starly', 'Staravia', 'Kricketune', 'Budew', 'Croagunk'],
        water: ['Marill', 'Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Gyarados', 'Seaking'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213),
        new GymBadgeRequirement(BadgeEnums.Fen),
    ],
    210.4
));
Routes.add(new RegionRoute(
    'Sinnoh Route 213', GameConstants.Region.sinnoh, 213,
    new RoutePokemon({
        land: ['Chatot'],
        water: ['Buizel', 'Floatzel', 'Tentacool', 'Tentacruel', 'Wingull', 'Pelipper', 'Shellos (east)', 'Gastrodon (east)', 'Magikarp', 'Remoraid', 'Gyarados', 'Octillery', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 214)],
    210.3
));
Routes.add(new RegionRoute(
    'Sinnoh Route 214', GameConstants.Region.sinnoh, 214,
    new RoutePokemon({
        land: ['Zubat', 'Geodude', 'Graveler', 'Ponyta', 'Rhyhorn', 'Sudowoodo', 'Girafarig', 'Houndour', 'Kricketune', 'Stunky'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 215)],
    210.2
));
Routes.add(new RegionRoute(
    'Sinnoh Route 215', GameConstants.Region.sinnoh, 215,
    new RoutePokemon({
        land: ['Abra', 'Kadabra', 'Geodude', 'Ponyta', 'Lickitung', 'Scyther', 'Staravia', 'Kricketune', 'Marill'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 210)],
    210.1
));
Routes.add(new RegionRoute(
    'Sinnoh Route 216', GameConstants.Region.sinnoh, 216,
    new RoutePokemon({
        land: ['Zubat', 'Machoke', 'Graveler', 'Noctowl', 'Sneasel', 'Meditite', 'Snorunt', 'Snover'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 218),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Coronet North')),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 217', GameConstants.Region.sinnoh, 217,
    new RoutePokemon({
        land: ['Zubat', 'Machoke', 'Noctowl', 'Sneasel', 'Swinub', 'Meditite', 'Medicham', 'Snorunt', 'Snover'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 216)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 218', GameConstants.Region.sinnoh, 218,
    new RoutePokemon({
        land: ['Mr. Mime', 'Glameow', 'Chatot'],
        water: ['Wingull', 'Floatzel', 'Shellos (west)', 'Gastrodon (west)', 'Tentacool', 'Tentacruel', 'Pelipper', 'Magikarp', 'Finneon', 'Gyarados', 'Lumineon'],
    }),
    [

        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213),
        new GymBadgeRequirement(BadgeEnums.Fen),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 219', GameConstants.Region.sinnoh, 219,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Wingull', 'Pelipper', 'Magikarp', 'Finneon', 'Lumineon', 'Gyarados', 'Clamperl'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213),
        new GymBadgeRequirement(BadgeEnums.Fen),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 220', GameConstants.Region.sinnoh, 220,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Wingull', 'Pelipper', 'Magikarp', 'Finneon', 'Lumineon', 'Gyarados', 'Chinchou', 'Lanturn'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 219)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 221', GameConstants.Region.sinnoh, 221,
    new RoutePokemon({
        land: ['Sudowoodo', 'Girafarig', 'Roselia', 'Stunky', 'Skuntank'],
        water: ['Wingull', 'Floatzel', 'Shellos (west)', 'Gastrodon (west)', 'Tentacool', 'Tentacruel', 'Pelipper', 'Magikarp', 'Finneon', 'Lumineon', 'Gyarados', 'Clamperl'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 220)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 222', GameConstants.Region.sinnoh, 222,
    new RoutePokemon({
        land: ['Magnemite', 'Magneton', 'Mr. Mime', 'Electabuzz', 'Luxio', 'Glameow', 'Purugly', 'Chatot'],
        water: ['Wingull', 'Pelipper', 'Floatzel', 'Gastrodon (east)', 'Tentacool', 'Tentacruel', 'Magikarp', 'Remoraid', 'Gyarados', 'Octillery', 'Sharpedo'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 217),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World')),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 223', GameConstants.Region.sinnoh, 223,
    new RoutePokemon({
        water: ['Tentacruel', 'Pelipper', 'Mantyke', 'Magikarp', 'Remoraid', 'Octillery', 'Gyarados', 'Wailmer', 'Wailord'],
    }),
    [

        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 222),
        new GymBadgeRequirement(BadgeEnums.Beacon),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 224', GameConstants.Region.sinnoh, 224,
    new RoutePokemon({
        land: ['Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Beautifly', 'Dustox', 'Roselia', 'Chatot'],
        water: ['Pelipper', 'Buizel', 'Floatzel', 'Shellos (east)', 'Gastrodon (east)', 'Tentacruel', 'Magikarp', 'Remoraid', 'Gyarados', 'Octillery', 'Luvdisc'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 223),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Victory Road Sinnoh')),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 225', GameConstants.Region.sinnoh, 225,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Machoke', 'Graveler', 'Roselia', 'Skuntank', 'Banette'],
        water: ['Psyduck', 'Golduck', 'Poliwhirl', 'Magikarp', 'Barboach', 'Gyarados', 'Whiscash'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.sinnoh, 224),
        new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion),
    ]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 226', GameConstants.Region.sinnoh, 226,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Machoke', 'Graveler', 'Banette'],
        water: ['Golduck', 'Tentacruel', 'Seel', 'Dewgong', 'Wingull', 'Pelipper', 'Spheal', 'Sealeo', 'Magikarp', 'Horsea', 'Seadra', 'Gyarados', 'Relicanth'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 227', GameConstants.Region.sinnoh, 227,
    new RoutePokemon({
        land: ['Fearow', 'Golbat', 'Graveler', 'Weezing', 'Rhyhorn', 'Rhydon', 'Skarmory', 'Numel', 'Camerupt', 'Banette'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Barboach', 'Gyarados', 'Whiscash'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 226)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 228', GameConstants.Region.sinnoh, 228,
    new RoutePokemon({
        land: ['Diglett', 'Dugtrio', 'Rhydon', 'Cacnea', 'Cacturne', 'Hippowdon'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Barboach', 'Whiscash', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 226)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 229', GameConstants.Region.sinnoh, 229,
    new RoutePokemon({
        land: ['Pidgey', 'Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Scyther', 'Pinsir', 'Ledian', 'Ariados', 'Beautifly', 'Dustox', 'Volbeat', 'Illumise', 'Roselia', 'Purugly'],
        water: ['Wingull', 'Pelipper', 'Surskit', 'Masquerain', 'Magikarp', 'Goldeen', 'Gyarados', 'Seaking'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 228)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 230', GameConstants.Region.sinnoh, 230,
    new RoutePokemon({
        land: ['Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Beautifly', 'Dustox', 'Roselia'],
        water: ['Golduck', 'Wingull', 'Pelipper', 'Floatzel', 'Gastrodon (east)', 'Tentacruel', 'Seel', 'Dewgong', 'Spheal', 'Sealeo', 'Magikarp', 'Remoraid', 'Gyarados', 'Octillery', 'Wailmer', 'Wailord'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 229)]
));


/*
UNOVA
*/
Routes.add(new RegionRoute(
    'Unova Route 19', GameConstants.Region.unova, 19,
    new RoutePokemon({
        land: ['Patrat', 'Purrloin'],
        water: ['Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
    0.1
));
Routes.add(new RegionRoute(
    'Unova Route 20', GameConstants.Region.unova, 20,
    new RoutePokemon({
        land: ['Sunkern', 'Pidove', 'Venipede', 'Patrat', 'Purrloin', 'Sewaddle'],
        water: ['Azurill', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 19)],
    0.2
));
Routes.add(new RegionRoute(
    'Unova Route 4', GameConstants.Region.unova, 4,
    new RoutePokemon({
        land: ['Sandile', 'Darumaka', 'Trubbish', 'Minccino', 'Scraggy'],
        water: ['Frillish'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Toxic)]
));
Routes.add(new RegionRoute(
    'Desert Resort', GameConstants.Region.unova, 25,
    new RoutePokemon({
        land: ['Sandshrew', 'Trapinch', 'Maractus', 'Darumaka', 'Dwebble', 'Scraggy', 'Sigilyph', 'Sandile'],
        water: [],
    }),
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.unova, 4),
            new GymBadgeRequirement(BadgeEnums.Insect),
        ]),
    ],
    4
));
Routes.add(new RegionRoute(
    'Unova Route 5', GameConstants.Region.unova, 5,
    new RoutePokemon({
        land: ['Gothita', 'Minccino', 'Trubbish', 'Liepard', 'Solosis'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 4),
        new GymBadgeRequirement(BadgeEnums.Insect),
    ]
));
Routes.add(new RegionRoute(
    'Unova Route 16', GameConstants.Region.unova, 16,
    new RoutePokemon({
        land: ['Gothita', 'Minccino', 'Trubbish', 'Liepard', 'Solosis'],
    }),
    [

        new RouteKillRequirement(10, GameConstants.Region.unova, 4),
        new GymBadgeRequirement(BadgeEnums.Insect),
    ],
    5
));
Routes.add(new RegionRoute(
    'Unova Route 6', GameConstants.Region.unova, 6,
    new RoutePokemon({
        land: ['Marill', 'Deerling (Spring)', 'Deerling (Autumn)', 'Karrablast', 'Tranquill', 'Foongus', 'Swadloon', 'Vanillite', 'Shelmet'],
        water: ['Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 5),
        new GymBadgeRequirement(BadgeEnums.Bolt),
    ]
));
Routes.add(new RegionRoute(
    'Unova Route 7', GameConstants.Region.unova, 7,
    new RoutePokemon({
        land: ['Zangoose', 'Seviper', 'Cubchoo', 'Deerling (Summer)', 'Deerling (Winter)', 'Watchog', 'Tranquill', 'Foongus'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Chargestone Cave')),
        new GymBadgeRequirement(BadgeEnums.Quake),
    ]
));
Routes.add(new RegionRoute(
    'Unova Route 13', GameConstants.Region.unova, 13,
    new RoutePokemon({
        land: ['Tangela', 'Pelipper', 'Drifblim', 'Absol', 'Lunatone', 'Solrock'],
        water: ['Staryu', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Frillish'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))]
));
Routes.add(new RegionRoute(
    'Undella Bay', GameConstants.Region.unova, 24,
    new RoutePokemon({
        land: [],
        water: ['Frillish', 'Mantyke', 'Spheal', 'Remoraid', 'Jellicent', 'Wailmer', 'Chinchou', 'Ducklett'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    13
));
Routes.add(new RegionRoute(
    'Unova Route 14', GameConstants.Region.unova, 14,
    new RoutePokemon({
        land: ['Golduck', 'Swablu', 'Mienfoo', 'Drifblim', 'Absol', 'Altaria'],
        water: ['Buizel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Reversal Mountain'))],
    13
));
Routes.add(new RegionRoute(
    'Unova Route 12', GameConstants.Region.unova, 12,
    new RoutePokemon({
        land: ['Pinsir', 'Heracross', 'Roselia', 'Combee', 'Tranquill', 'Sewaddle'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 13)],
    13.1
));
Routes.add(new RegionRoute(
    'Unova Route 11', GameConstants.Region.unova, 11,
    new RoutePokemon({
        land: ['Golduck', 'Marill', 'Gligar', 'Zangoose', 'Seviper', 'Karrablast', 'Amoonguss', 'Shelmet'],
        water: ['Buizel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 12)],
    13.2
));
Routes.add(new RegionRoute(
    'Unova Route 9', GameConstants.Region.unova, 9,
    new RoutePokemon({
        land: ['Muk', 'Liepard', 'Garbodor', 'Minccino', 'Gothorita', 'Duosion', 'Pawniard'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 11)],
    13.3
));
Routes.add(new RegionRoute(
    'Unova Route 21', GameConstants.Region.unova, 21,
    new RoutePokemon({
        water: ['Mantyke', 'Remoraid', 'Spheal', 'Luvdisc'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seaside Cave'))]
));
Routes.add(new RegionRoute(
    'Unova Route 22', GameConstants.Region.unova, 22,
    new RoutePokemon({
        land: ['Golduck', 'Marill', 'Delibird', 'Pelipper', 'Lunatone', 'Solrock', 'Amoonguss', 'Mienfoo'],
        water: ['Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 21)]
));
Routes.add(new RegionRoute(
    'Unova Route 23', GameConstants.Region.unova, 23,
    new RoutePokemon({
        land: ['Golduck', 'Gligar', 'Amoonguss', 'Mienfoo', 'Bouffalant', 'Rufflet', 'Vullaby'],
        water: ['Buizel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))]
));
Routes.add(new RegionRoute(
    'Unova Route 8', GameConstants.Region.unova, 8,
    new RoutePokemon({
        land: ['Croagunk', 'Tympole', 'Palpitoad', 'Karrablast', 'Shelmet', 'Stunfisk'],
    }),
    [
        new OneFromManyRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Twist Mountain')),
            new MultiRequirement([
                new RouteKillRequirement(10, GameConstants.Region.unova, 9),
                new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
            ]),
        ]),
    ],
    23.1
));
Routes.add(new RegionRoute(
    'Unova Route 15', GameConstants.Region.unova, 15,
    new RoutePokemon({
        land: ['Sandslash', 'Gligar', 'Pupitar'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.unova, 14),
            new RouteKillRequirement(10, GameConstants.Region.unova, 16),
        ]),
        new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
    ],
    23.1
));
Routes.add(new RegionRoute(
    'Unova Route 3', GameConstants.Region.unova, 3,
    new RoutePokemon({
        land: ['Yanma', 'Watchog', 'Herdier', 'Purrloin', 'Tranquill'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pinwheel Forest'))],
    23.1
));
Routes.add(new RegionRoute(
    'Unova Route 2', GameConstants.Region.unova, 2,
    new RoutePokemon({
        land: ['Jigglypuff', 'Lickitung', 'Watchog', 'Herdier', 'Liepard'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 3)],
    23.2
));
Routes.add(new RegionRoute(
    'Unova Route 1', GameConstants.Region.unova, 1,
    new RoutePokemon({
        land: ['Jigglypuff', 'Watchog', 'Herdier', 'Scrafty'],
        water: ['Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 2)],
    23.3
));
Routes.add(new RegionRoute(
    'Unova Route 17', GameConstants.Region.unova, 17,
    new RoutePokemon({
        land: ['Frillish', 'Alomomola'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 1)],
    23.4
));
Routes.add(new RegionRoute(
    'Unova Route 18', GameConstants.Region.unova, 18,
    new RoutePokemon({
        land: ['Tropius', 'Carnivine', 'Watchog', 'Crustle', 'Scrafty'],
        water: ['Frillish', 'Alomomola'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.unova, 17)],
    23.5
));

/*
KALOS
*/
Routes.add(new RegionRoute(
    'Kalos Route 1', GameConstants.Region.kalos, 1,
    new RoutePokemon({
        land: ['Rattata'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
));
Routes.add(new RegionRoute(
    'Kalos Route 2', GameConstants.Region.kalos, 2,
    new RoutePokemon({
        land: ['Caterpie', 'Weedle', 'Pidgey', 'Zigzagoon', 'Fletchling', 'Bunnelby', 'Scatterbug'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 1)]
));
Routes.add(new RegionRoute(
    'Kalos Route 3', GameConstants.Region.kalos, 3,
    new RoutePokemon({
        land: ['Pidgey', 'Pikachu', 'Dunsparce', 'Azurill', 'Bidoof', 'Burmy (plant)', 'Bunnelby', 'Fletchling', 'Dunsparce'],
        water: ['Magikarp', 'Goldeen', 'Marill', 'Masquerain'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Santalune Forest'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 4', GameConstants.Region.kalos, 4,
    new RoutePokemon({
        land: ['Ledyba', 'Ralts', 'Skitty', 'Budew', 'Combee', 'Flabébé (Red)', 'Flabébé (Orange)', 'Flabébé (White)'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Bug)]
));
Routes.add(new RegionRoute(
    'Kalos Route 5', GameConstants.Region.kalos, 5,
    new RoutePokemon({
        land: ['Abra', 'Doduo', 'Plusle', 'Minun', 'Gulpin', 'Bunnelby', 'Skiddo', 'Pancham', 'Furfrou'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 4)]
));
Routes.add(new RegionRoute(
    'Kalos Route 6', GameConstants.Region.kalos, 6,
    new RoutePokemon({
        land: ['Oddish', 'Sentret', 'Nincada', 'Kecleon', 'Espurr', 'Honedge'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 5)]
));
Routes.add(new RegionRoute(
    'Kalos Route 7', GameConstants.Region.kalos, 7,
    new RoutePokemon({
        land: ['Smeargle', 'Volbeat', 'Illumise', 'Roselia', 'Croagunk', 'Ducklett', 'Flabébé (Orange)', 'Flabébé (White)', 'Spritzee', 'Swirlix'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Parfum Palace'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 8', GameConstants.Region.kalos, 8,
    new RoutePokemon({
        land: ['Spoink', 'Zangoose', 'Seviper', 'Absol', 'Bagon', 'Drifloon', 'Mienfoo', 'Inkay'],
        water: ['Tentacool', 'Shellder', 'Staryu', 'Wailmer', 'Luvdisc', 'Skrelp', 'Clauncher'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Connecting Cave'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 9', GameConstants.Region.kalos, 9,
    new RoutePokemon({
        land: ['Hippopotas', 'Sandile', 'Helioptile'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 8)]
));
Routes.add(new RegionRoute(
    'Kalos Route 10', GameConstants.Region.kalos, 10,
    new RoutePokemon({
        land: ['Eevee', 'Snubbull', 'Houndour', 'Electrike', 'Sigilyph', 'Emolga', 'Golett', 'Hawlucha'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Glittering Cave'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 11', GameConstants.Region.kalos, 11,
    new RoutePokemon({
        land: ['Nidorina', 'Nidorino', 'Hariyama', 'Staravia', 'Chingling', 'Stunky', 'Throh', 'Sawk', 'Dedenne'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Cliff)]
));
Routes.add(new RegionRoute(
    'Kalos Route 12', GameConstants.Region.kalos, 12,
    new RoutePokemon({
        land: ['Slowpoke', 'Exeggcute', 'Pinsir', 'Tauros', 'Heracross', 'Miltank', 'Pachirisu', 'Chatot'],
        water: ['Tentacool', 'Lapras', 'Remoraid', 'Clamperl', 'Mantyke'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Rumble)]
    //Replace req with Tower of Mastery dungeon if implemented.
));
Routes.add(new RegionRoute(
    'Kalos Route 13', GameConstants.Region.kalos, 13,
    new RoutePokemon({
        land: ['Dugtrio', 'Trapinch', 'Gible'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)]
));
Routes.add(new RegionRoute(
    'Kalos Route 14', GameConstants.Region.kalos, 14,
    new RoutePokemon({
        land: ['Weepinbell', 'Haunter', 'Quagsire', 'Skorupi', 'Carnivine', 'Karrablast', 'Shelmet', 'Goomy'],
        water: ['Poliwag', 'Poliwhirl', 'Barboach', 'Stunfisk'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Voltage)]
));
Routes.add(new RegionRoute(
    'Kalos Route 15', GameConstants.Region.kalos, 15,
    new RoutePokemon({
        land: ['Mightyena', 'Skorupi', 'Watchog', 'Liepard', 'Foongus', 'Pawniard', 'Klefki'],
        water: ['Poliwag', 'Poliwhirl', 'Lombre', 'Floatzel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pokéball Factory'))]
    //Replace req with Pokéball Factory dungeon if implemented.
));
Routes.add(new RegionRoute(
    'Kalos Route 16', GameConstants.Region.kalos, 16,
    new RoutePokemon({
        land: ['Weepinbell', 'Floatzel', 'Skorupi', 'Foongus', 'Klefki', 'Phantump', 'Pumpkaboo'],
        water: ['Poliwag', 'Poliwhirl', 'Lombre', 'Floatzel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 15)]
));
Routes.add(new RegionRoute(
    'Kalos Route 17', GameConstants.Region.kalos, 17,
    new RoutePokemon({
        land: ['Sneasel', 'Delibird', 'Snover', 'Abomasnow'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Frost Cavern'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 18', GameConstants.Region.kalos, 18,
    new RoutePokemon({
        land: ['Sandslash', 'Graveler', 'Pupitar', 'Lairon', 'Torkoal', 'Gurdurr', 'Heatmor', 'Durant'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Flare Secret HQ'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 19', GameConstants.Region.kalos, 19,
    new RoutePokemon({
        land: ['Weepinbell', 'Haunter', 'Quagsire', 'Drapion', 'Carnivine', 'Karrablast', 'Shelmet', 'Sliggoo'],
        water: ['Poliwag', 'Poliwhirl', 'Barboach', 'Stunfisk', 'Politoed'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 18)]
));
Routes.add(new RegionRoute(
    'Kalos Route 20', GameConstants.Region.kalos, 20,
    new RoutePokemon({
        land: ['Jigglypuff', 'Noctowl', 'Zoroark', 'Gothorita', 'Amoonguss', 'Trevenant'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)]
));
Routes.add(new RegionRoute(
    'Kalos Route 21', GameConstants.Region.kalos, 21,
    new RoutePokemon({
        land: ['Scyther', 'Ursaring', 'Spinda', 'Altaria', 'Floatzel'],
        water: ['Poliwag', 'Poliwhirl', 'Lombre', 'Floatzel', 'Basculin (Red-Striped)', 'Dratini'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 19)]
));
Routes.add(new RegionRoute(
    'Kalos Route 22', GameConstants.Region.kalos, 22,
    new RoutePokemon({
        land: ['Psyduck', 'Farfetch\'d', 'Azumarill', 'Dunsparce', 'Azurill', 'Bidoof', 'Bibarel', 'Riolu', 'Bunnelby', 'Diggersby', 'Litleo'],
        water: ['Magikarp', 'Goldeen', 'Azumarill', 'Carvanha'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 3)]
));
Routes.add(new RegionRoute(
    'Azure Bay', GameConstants.Region.kalos, 23,
    new RoutePokemon({
        land: ['Slowpoke', 'Exeggcute', 'Chatot', 'Inkay'],
        water: ['Tentacool', 'Lapras', 'Chinchou', 'Remoraid', 'Luvdisc', 'Mantyke'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 12)], 12
));

// From here down :
// - No named routes
// - Missing numbered route
// - No requirements
/*
ALOLA
*/
Routes.add(new RegionRoute(
    'Alola Route 1', GameConstants.Region.alola, 1,
    new RoutePokemon({
        land: ['Caterpie', 'Alolan Rattata', 'Ledyba', 'Spinarak', 'Pichu', 'Buneary', 'Pikipek', 'Yungoos', 'Grubbin'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)]
));
Routes.add(new RegionRoute(
    'Route 1 Hau\'oli Outskirts', GameConstants.Region.alola, 18,
    new RoutePokemon({
        land: ['Slowpoke', 'Wingull', 'Inkay'],
        water: ['Tentacool', 'Mantyke', 'Finneon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 1)],
    1.1
));
Routes.add(new RegionRoute(
    'Alola Route 2', GameConstants.Region.alola, 2,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Spearow', 'Ekans', 'Alolan Meowth', 'Growlithe', 'Abra', 'Drowzee', 'Smeargle', 'Makuhita', 'Furfrou', 'Yungoos', 'Cutiefly'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Trainers\' School'))]
));
Routes.add(new RegionRoute(
    'Alola Route 3', GameConstants.Region.alola, 3,
    new RoutePokemon({
        land: ['Spearow', 'Mankey', 'Bagon', 'Rufflet', 'Vullaby', 'Hawlucha', 'Cutiefly'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Verdant Cavern'))]
));
Routes.add(new RegionRoute(
    'Melemele Sea', GameConstants.Region.alola, 19,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Corsola', 'Remoraid', 'Wingull', 'Clamperl', 'Luvdisc', 'Mantyke', 'Finneon', 'Wishiwashi (Solo)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill'))],
    5.1
));
Routes.add(new RegionRoute(
    'Kala\e Bay', GameConstants.Region.alola, 20,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Slowpoke', 'Wingull', 'Bagon', 'Yungoos'],
        water: ['Tentacool', 'Shellder', 'Magikarp', 'Remoraid', 'Wingull', 'Finneon', 'Mantyke', 'Wishiwashi (Solo)'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seaward Cave')),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill')),
    ],
    5.2
));
Routes.add(new RegionRoute(
    'Alola Route 4', GameConstants.Region.alola, 4,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Eevee', 'Igglybuff', 'Lillipup', 'Pikipek', 'Yungoos', 'Grubbin', 'Mudbray'],
    }),
    [new GymBadgeRequirement(BadgeEnums.MelemeleKahuna)]
));
Routes.add(new RegionRoute(
    'Alola Route 5', GameConstants.Region.alola, 5,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Butterfree', 'Bonsly', 'Lillipup', 'Pikipek', 'Trumbeak', 'Grubbin', 'Fomantis'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Paniola Ranch'))]
));
Routes.add(new RegionRoute(
    'Alola Route 6', GameConstants.Region.alola, 6,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Eevee', 'Igglybuff', 'Lillipup', 'Pikipek', 'Yungoos', 'Grubbin', 'Mudbray', 'Oricorio (Pa\'u)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill'))]
));
Routes.add(new RegionRoute(
    'Alola Route 7', GameConstants.Region.alola, 7,
    new RoutePokemon({
        water: ['Tentacool', 'Staryu', 'Magikarp', 'Wingull', 'Finneon', 'Wishiwashi (Solo)', 'Pyukumuku'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 6)]
));
Routes.add(new RegionRoute(
    'Alola Route 8', GameConstants.Region.alola, 8,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Fletchling', 'Trumbeak', 'Yungoos', 'Stufful'],
        water: ['Tentacool', 'Magikarp', 'Chinchou', 'Remoraid', 'Finneon', 'Mantyke', 'Wishiwashi (Solo)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Wela Volcano Park'))]
));
Routes.add(new RegionRoute(
    'Alola Route 9', GameConstants.Region.alola, 9,
    new RoutePokemon({
        water: ['Magikarp', 'Corsola', 'Luvdisc', 'Wishiwashi (Solo)', 'Mareanie'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Diglett\'s Tunnel'))]
));
Routes.add(new RegionRoute(
    'Alola Akala Outskirts', GameConstants.Region.alola, 21,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Natu', 'Wingull', 'Nosepass', 'Gumshoos', 'Stufful'],
        water: ['Magikarp', 'Chinchou', 'Wishiwashi (Solo)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Memorial Hill'))],
    9.1
));
Routes.add(new RegionRoute(
    'Alola Route 10', GameConstants.Region.alola, 10,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Ledian', 'Ariados', 'Skarmory', 'Pancham', 'Gumshoos'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Malie Garden'))]
));
Routes.add(new RegionRoute(
    'Mount Hokulani', GameConstants.Region.alola, 22,
    new RoutePokemon({
        land: ['Fearow', 'Ditto', 'Cleffa', 'Skarmory', 'Elekid', 'Beldum', 'Elgyem', 'Minior (Meteor)', 'Minior (Blue-core)', 'Minior (Green-core)', 'Minior (Indigo-core)', 'Minior (Orange-core)', 'Minior (Red-core)', 'Minior (Violet-core)', 'Minior (Yellow-core)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 10)],
    10.1
));
Routes.add(new RegionRoute(
    'Alola Route 11', GameConstants.Region.alola, 11,
    new RoutePokemon({
        land: ['Parasect', 'Ledian', 'Ariados', 'Pancham', 'Trumbeak', 'Komala'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Malie Garden'))]
));
Routes.add(new RegionRoute(
    'Alola Route 12', GameConstants.Region.alola, 12,
    new RoutePokemon({
        land: ['Alolan Geodude', 'Alolan Graveler', 'Houndoom', 'Manectric', 'Torkoal', 'Mudbray'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 11),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Hokulani Observatory')),
    ]
));
Routes.add(new RegionRoute(
    'Alola Route 13', GameConstants.Region.alola, 13,
    new RoutePokemon({
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Bruxish'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 12)]
));
Routes.add(new RegionRoute(
    'Alola Route 14', GameConstants.Region.alola, 14,
    new RoutePokemon({
        water: ['Tentacruel', 'Magikarp', 'Pelipper', 'Finneon', 'Frillish', 'Wishiwashi (Solo)', 'Bruxish'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 13)]
));
Routes.add(new RegionRoute(
    'Alola Haina Desert', GameConstants.Region.alola, 23,
    new RoutePokemon({
        land: ['Alolan Dugtrio', 'Trapinch', 'Baltoy', 'Gabite', 'Krokorok', 'Golett'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))]
));
Routes.add(new RegionRoute(
    'Alola Route 15', GameConstants.Region.alola, 15,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Slowpoke', 'Pelipper', 'Gumshoos'],
        water: ['Tentacruel', 'Magikarp', 'Clamperl', 'Finneon', 'Wishiwashi (Solo)', 'Bruxish'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))]
));
Routes.add(new RegionRoute(
    'Alola Route 16', GameConstants.Region.alola, 16,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Slowpoke', 'Pelipper', 'Scraggy', 'Gumshoos'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 15)]
));
Routes.add(new RegionRoute(
    'Alola Route 17', GameConstants.Region.alola, 17,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Alolan Graveler', 'Ledian', 'Ariados', 'Scraggy', 'Bisharp', 'Gumshoos'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ula\'ula Meadow'))]
));
Routes.add(new RegionRoute(
    'Poni Wilds', GameConstants.Region.alola, 24,
    new RoutePokemon({
        land: ['Granbull', 'Pelipper', 'Gastrodon (east)', 'Furfrou', 'Inkay'],
        water: ['Dhelmise'],
    }),
    [new GymBadgeRequirement(BadgeEnums.UlaulaKahuna)] //replace with Aether Paradise 2 if implemented
));
Routes.add(new RegionRoute(
    'Ancient Poni Path', GameConstants.Region.alola, 25,
    new RoutePokemon({
        land: ['Granbull', 'Pelipper', 'Gastrodon (east)', 'Furfrou', 'Inkay'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 24)]
));
Routes.add(new RegionRoute(
    'Poni Breaker Coast', GameConstants.Region.alola, 26,
    new RoutePokemon({
        water: ['Tentacruel', 'Lapras', 'Magikarp', 'Pelipper', 'Carvanha', 'Wailmer', 'Relicanth', 'Gastrodon (east)', 'Lumineon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 25)]
));
Routes.add(new RegionRoute(
    'Poni Grove', GameConstants.Region.alola, 27,
    new RoutePokemon({
        land: ['Pinsir', 'Heracross', 'Buneary', 'Riolu', 'Zoroark', 'Trumbeak'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)]
));
Routes.add(new RegionRoute(
    'Poni Plains', GameConstants.Region.alola, 28,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Hypno', 'Tauros', 'Miltank', 'Pelipper', 'Hariyama', 'Cottonee', 'Petilil', 'Trumbeak', 'Gumshoos', 'Mudsdale'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 27)]
));
Routes.add(new RegionRoute(
    'Poni Coast', GameConstants.Region.alola, 29,
    new RoutePokemon({
        land: ['Alolan Dugtrio'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 28)]
));
Routes.add(new RegionRoute(
    'Poni Gauntlet', GameConstants.Region.alola, 30,
    new RoutePokemon({
        land: ['Pelipper', 'Lickitung', 'Golduck', 'Granbull', 'Inkay', 'Bewear'],
        water: ['Magikarp', 'Dratini', 'Barboach'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 29)]
));

/*
GALAR
*/
Routes.add(new RegionRoute(
    'Galar Route 1', GameConstants.Region.galar, 1,
    new RoutePokemon({
        land: ['Skwovet', 'Rookidee', 'Blipbug', 'Wooloo', 'Nickit', 'Caterpie', 'Hoothoot', 'Grubbin'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Slumbering Weald'))]
));
Routes.add(new RegionRoute(
    'Galar Route 2', GameConstants.Region.galar, 2,
    new RoutePokemon({
        land: ['Skwovet', 'Rookidee', 'Nickit', 'Chewtle', 'Yamper', 'Galarian Zigzagoon', 'Seedot', 'Hoothoot', 'Lotad', 'Purrloin'],
        water: ['Magikarp', 'Arrokuda'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 1)]
));
Routes.add(new RegionRoute(
    'Rolling Fields', GameConstants.Region.galar, 3,
    new RoutePokemon({
        land: ['Diglett', 'Butterfree', 'Pidove', 'Roggenrola', 'Tyrogue', 'Metapod', 'Pancham', 'Bunnelby', 'Onix', 'Ninjask', 'Diggersby', 'Dubwool'],
        headbutt: ['Cherubi', 'Skwovet'],
        special:
        [
            new SpecialRoutePokemon(['Combee', 'Mudsdale', 'Pangoro', 'Roselia', 'Vespiquen', 'Bounsweet', 'Minccino'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Pangoro', 'Mudsdale', 'Roselia', 'Ralts', 'Budew', 'Oddish'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Roselia', 'Lotad', 'Nuzleaf', 'Wingull', 'Pelipper', 'Pangoro', 'Haunter'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Electrike', 'Haunter', 'Pangoro', 'Pikachu', 'Manectric', 'Wingull', 'Joltik'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Vanillite', 'Piloswine', 'Roselia', 'Minccino', 'Swinub'], new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Delibird', 'Swinub', 'Snorunt', 'Vanillite', 'Mime Jr.', 'Piloswine'], new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Baltoy', 'Mudbray', 'Roselia', 'Pangoro', 'Mudsdale'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Baltoy', 'Dwebble', 'Golett', 'Roselia', 'Crustle', 'Mudsdale'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Mudsdale', 'Natu', 'Munna', 'Ralts', 'Kirlia', 'Roselia', 'Gardevoir'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 2)]
));
Routes.add(new RegionRoute(
    'Dappled Grove', GameConstants.Region.galar, 4,
    new RoutePokemon({
        land: ['Lombre', 'Nuzleaf', 'Orbeetle', 'Bewear'],
        headbutt: ['Cherubi', 'Skwovet'],
        special:
        [

            new SpecialRoutePokemon(['Shiftry', 'Ludicolo', 'Vileplume', 'Bunnelby', 'Hoothoot', 'Oddish', 'Bounsweet', 'Budew', 'Seedot', 'Lotad'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Shiftry', 'Ludicolo', 'Vileplume', 'Tyrogue', 'Hoothoot', 'Oddish', 'Stufful', 'Stunky', 'Budew', 'Seedot', 'Lotad'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Lotad', 'Seedot', 'Budew', 'Tympole', 'Grubbin', 'Oddish', 'Bunnelby', 'Seismitoad', 'Ludicolo', 'Shiftry'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Electrike', 'Tympole', 'Seismitoad', 'Shiftry', 'Ludicolo', 'Oddish', 'Lotad', 'Seedot', 'Joltik', 'Budew', 'Grubbin'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Snorunt', 'Snover', 'Vanillite', 'Bunnelby', 'Hoothoot', 'Delibird', 'Vanillish', 'Pangoro'], new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Delibird', 'Vanillish', 'Snorunt', 'Vanillite', 'Klink', 'Bunnelby', 'Pangoro'], new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Baltoy', 'Mudbray', 'Budew', 'Pangoro', 'Claydol', 'Bunnelby'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Baltoy', 'Golett', 'Bunnelby', 'Bounsweet', 'Hoothoot', 'Claydol', 'Pangoro'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Mudsdale', 'Natu', 'Munna', 'Ralts', 'Kirlia', 'Roselia', 'Gardevoir'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)]
));
Routes.add(new RegionRoute(
    'West Lake Axwell', GameConstants.Region.galar, 5,
    new RoutePokemon({
        water: ['Goldeen', 'Magikarp', 'Remoraid', 'Wishiwashi (Solo)', 'Drednaw', 'Gyarados'],
        special:
        [
            new SpecialRoutePokemon(['Krabby', 'Wooper', 'Wingull', 'Bounsweet', 'Purrloin', 'Tympole', 'Frillish', 'Kingler', 'Quagsire', 'Pelipper', 'Grapploct', 'Cloyster', 'Lapras', 'Seaking'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Krabby', 'Wooper', 'Tyrogue', 'Pancham', 'Lotad', 'Seedot', 'Budew', 'Purrloin', 'Tympole', 'Frillish', 'Palpitoad', 'Quagsire', 'Pelipper', 'Grapploct', 'Jellicent', 'Seaking'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Krabby', 'Wooper', 'Wingull', 'Tympole', 'Frillish', 'Pelipper', 'Quagsire', 'Jellicent', 'Lapras'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Krabby', 'Electrike', 'Tympole', 'Joltik', 'Wooper', 'Wingull', 'Chinchou', 'Pelipper', 'Quagsire', 'Lanturn', 'Lapras'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Delibird', 'Wingull', 'Snorunt', 'Vanillite', 'Purrloin', 'Tympole', 'Shellder', 'Frillish', 'Palpitoad', 'Diggersby', 'Vanilluxe', 'Grapploct', 'Lapras'], new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Delibird', 'Vanillite', 'Klink', 'Bunnelby', 'Krabby', 'Tympole', 'Frillish', 'Palpitoad', 'Vanilluxe', 'Grapploct', 'Lapras'], new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Baltoy', 'Bunnelby', 'Pancham', 'Purrloin', 'Dwebble', 'Frillish', 'Diggersby', 'Pelipper', 'Grapploct'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Wooper', 'Nincada', 'Baltoy', 'Mudbray', 'Purrloin', 'Dwebble', 'Bunnelby', 'Frillish', 'Palpitoad', 'Diggersby', 'Seaking', 'Grapploct'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Krabby', 'Natu', 'Wingull', 'Ralts', 'Wooper', 'Purrloin', 'Tympole', 'Frillish', 'Palpitoad', 'Quagsire', 'Jellicent', 'Grapploct', 'Cloyster', 'Lapras'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)]
));
Routes.add(new RegionRoute(
    'East Lake Axwell', GameConstants.Region.galar, 6,
    new RoutePokemon({
        land: ['Stufful', 'Butterfree', 'Pidove'],
        water: ['Shellder', 'Magikarp', 'Goldeen', 'Wishiwashi (Solo)', 'Gyarados', 'Wingull'],
        special:
        [
            new SpecialRoutePokemon(['Oddish', 'Bounsweet', 'Bunnelby', 'Frillish', 'Xatu', 'Garbodor', 'Jellicent', 'Seaking', 'Pelipper', 'Lanturn', 'Cloyster'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Oddish', 'Budew', 'Minccino', 'Pancham', 'Frillish', 'Xatu', 'Garbodor', 'Jellicent', 'Pelipper', 'Seaking'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Oddish', 'Grubbin', 'Frillish', 'Pelipper', 'Garbodor', 'Jellicent'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Oddish', 'Electrike', 'Joltik', 'Pancham', 'Chinchou', 'Pelipper', 'Garbodor', 'Jellicent', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Snorunt', 'Snover', 'Minccino', 'Pancham', 'Vanillite', 'Frillish', 'Xatu', 'Piloswine', 'Vanilluxe'], new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Snover', 'Minccino', 'Vanillite', 'Snorunt', 'Pancham', 'Xatu', 'Piloswine', 'Vanilluxe'], new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Onix', 'Minccino', 'Mudbray', 'Pancham', 'Frillish','Xatu', 'Mudsdale', 'Pelipper', 'Seaking'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Onix', 'Baltoy', 'Dwebble', 'Minccino', 'Pancham', 'Mudbray', 'Frillish', 'Xatu', 'Mudsdale', 'Seaking'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Purrloin', 'Munna', 'Minccino', 'Oddish', 'Frillish', 'Xatu', 'Bronzong', 'Jellicent', 'Lanturn', 'Cloyster'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 5)]
));
Routes.add(new RegionRoute(
    'Giant\'s Seat', GameConstants.Region.galar, 7,
    new RoutePokemon({
        land: ['Bewear', 'Bronzor', 'Steelix', 'Duraludon', 'Bisharp'],
        water: ['Shellder', 'Cloyster', 'Gyarados', 'Pyukumuku'],
        headbutt: ['Cherubi', 'Greedent'],
        special:
        [
            new SpecialRoutePokemon(['Onix', 'Tranquill', 'Diggersby', 'Machop', 'Machoke', 'Lombre', 'Nuzleaf', 'Stufful', 'Rhydon', 'Vikavolt'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Machoke', 'Haunter', 'Onix', 'Machop', 'Gastly', 'Tyrogue', 'Bronzong', 'Vikavolt'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Quagsire', 'Lombre', 'Nuzleaf', 'Gastly', 'Wooper', 'Bronzong', 'Galvantula'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Crawdaunt', 'Manectric', 'Electrike', 'Palpitoad', 'Bronzong', 'Galvantula'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Swinub', 'Delibird', 'Machop', 'Snorunt', 'Snover', 'Abomasnow', 'Glalie'], new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Swinub', 'Delibird', 'Snorunt', 'Snover', 'Abomasnow', 'Glalie'], new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Onix', 'Dwebble', 'Mudsdale', 'Vulpix', 'Growlithe', 'Gastly', 'Mudbray', 'Vikavolt'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Onix', 'Dwebble', 'Mudsdale', 'Machop', 'Golett', 'Stufful', 'Golurk', 'Vikavolt'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Xatu', 'Liepard', 'Gastly', 'Natu', 'Duskull', 'Munna', 'Dusclops', 'Musharna'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)]
));
Routes.add(new RegionRoute(
    'South Lake Miloch', GameConstants.Region.galar, 8,
    new RoutePokemon({
        land: ['Machop', 'Tyrogue', 'Galvantula', 'Machoke', 'Thievul', 'Wingull', 'Drifloon'],
        water: ['Magikarp', 'Remoraid', 'Barboach', 'Pyukumuku', 'Goldeen'],
        special:
        [
            new SpecialRoutePokemon(['Corphish', 'Tympole', 'Stunky','Krabby', 'Lombre', 'Nuzleaf', 'Skuntank', 'Kingler', 'Crawdaunt', 'Drifblim', 'Seaking', 'Gyarados', 'Octillery'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Tyrogue', 'Roselia', 'Corphish', 'Stunky', 'Krabby', 'Lombre', 'Nuzleaf', 'Skuntank', 'Machoke', 'Drifblim', 'Seaking', 'Gyarados', 'Pelipper'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Corphish', 'Tympole', 'Stunky', 'Krabby', 'Palpitoad', 'Pelipper', 'Seaking', 'Jellicent', 'Gyarados'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Electrike', 'Corphish', 'Joltik', 'Stunky', 'Krabby', 'Tympole', 'Pyukumuku', 'Palpitoad', 'Kingler', 'Crawdaunt', 'Seaking', 'Lanturn', 'Gyarados', 'Pelipper'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Corphish', 'Snorunt', 'Vanillite', 'Snover', 'Krabby', 'Skuntank', 'Machoke', 'Vanilluxe', 'Gyarados'], new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Snover', 'Klink', 'Vanillite', 'Delibird', 'Skuntank', 'Machoke', 'Vanilluxe', 'Drifblim', 'Gyarados'], new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Nincada', 'Roselia', 'Baltoy', 'Stunky', 'Mudbray', 'Crustle', 'Machoke', 'Whiscash', 'Pelipper', 'Gyarados', 'Octillery'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Wooper', 'Nincada', 'Baltoy', 'Tympole', 'Dwebble', 'Stunky', 'Mudbray', 'Skuntank', 'Machoke', 'Whiscash', 'Seaking', 'Gyarados', 'Octillery'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Natu', 'Ralts', 'Corphish', 'Bronzor', 'Drifloon', 'Skuntank', 'Drifblim', 'Jellicent', 'Milotic', 'Octillery'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)]
));
Routes.add(new RegionRoute(
    'North Lake Miloch', GameConstants.Region.galar, 9,
    new RoutePokemon({
        land: ['Stunky', 'Boltund', 'Liepard', 'Corviknight'],
        headbutt: ['Skwovet', 'Cherubi'],
        water: ['Frillish', 'Magikarp', 'Basculin (Blue-Striped)', 'Basculin (Red-Striped)', 'Barboach'],
        special:
        [
            new SpecialRoutePokemon(['Pidove', 'Diggersby', 'Stufful', 'Bunnelby', 'Drifloon', 'Wingull', 'Lucario', 'Xatu', 'Lapras', 'Jellicent', 'Drifblim', 'Whiscash'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Machop', 'Gastly', 'Stufful', 'Purrloin', 'Drifloon', 'Wingull', 'Seismitoad', 'Xatu', 'Gyarados', 'Jellicent', 'Drifblim', 'Whiscash'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Tympole', 'Grubbin', 'Stufful', 'Purrloin', 'Palpitoad', 'Wingull', 'Skuntank', 'Pelipper', 'Lapras', 'Jellicent', 'Seaking'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Joltik', 'Grubbin', 'Stufful', 'Purrloin', 'Palpitoad', 'Drifloon', 'Seismitoad', 'Pelipper', 'Lapras', 'Jellicent', 'Seaking', 'Whiscash'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Delibird', 'Snorunt', 'Snover', 'Stufful', 'Purrloin', 'Vanillite', 'Drifloon', 'Wingull', 'Vanillish', 'Xatu', 'Lapras', 'Vanilluxe'], new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Delibird', 'Snorunt', 'Snover', 'Purrloin', 'Vanillite', 'Klink', 'Drifloon', 'Vanillish', 'Xatu', 'Lapras', 'Vanilluxe', 'Drifblim'], new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Baltoy', 'Dwebble', 'Mudbray', 'Stufful', 'Bunnelby', 'Drifloon', 'Wingull', 'Skuntank', 'Xatu', 'Gyarados', 'Pelipper', 'Whiscash'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Baltoy', 'Dwebble', 'Mudbray', 'Golett', 'Bunnelby', 'Drifloon', 'Skuntank', 'Xatu', 'Gyarados', 'Seaking', 'Whiscash'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Natu', 'Ralts', 'Stufful', 'Drifloon', 'Ralts', 'Purrloin', 'Wingull', 'Drifblim', 'Xatu', 'Lapras', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 7)]
));
Routes.add(new RegionRoute(
    'Galar Route 3', GameConstants.Region.galar, 10,
    new RoutePokemon({
        land: ['Gossifleur', 'Corvisquire', 'Rookidee', 'Skwovet', 'Rolycoly', 'Sizzlipede', 'Vulpix', 'Growlithe', 'Tyrogue', 'Galarian Zigzagoon', 'Stunky', 'Trubbish', 'Cherubi', 'Mudbray','Pancham', 'Klink', 'Machop'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 6)]
));
Routes.add(new RegionRoute(
    'Galar Route 4', GameConstants.Region.galar, 11,
    new RoutePokemon({
        land: ['Yamper', 'Cutiefly', 'Wooloo', 'Milcery', 'Galarian Meowth', 'Budew', 'Ferroseed', 'Joltik', 'Pikachu', 'Eevee', 'Electrike', 'Pumpkaboo', 'Diglett'],
        water: ['Magikarp', 'Goldeen', 'Chewtle'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine'))]
));
Routes.add(new RegionRoute(
    'Galar Route 5', GameConstants.Region.galar, 12,
    new RoutePokemon({
        land: ['Dottler', 'Drifloon', 'Applin', 'Eldegoss', 'Galarian Farfetch\'d', 'Wobbuffet', 'Minccino', 'Spritzee', 'Swirlix', 'Stufful', 'Espurr', 'Nincada', 'Dewpider', 'Nuzleaf', 'Lombre'],
        water: ['Magikarp', 'Chewtle', 'Goldeen'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Grass)]
));
Routes.add(new RegionRoute(
    'Motostoke Outskirts', GameConstants.Region.galar, 13,
    new RoutePokemon({
        land: ['Impidimp', 'Chewtle', 'Koffing', 'Hatenna', 'Noctowl', 'Throh', 'Sawk', 'Sudowoodo', 'Salandit', 'Pawniard', 'Scraggy', 'Croagunk', 'Roggenrola'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Galar Mine No. 2'))]
));
Routes.add(new RegionRoute(
    'Hammerlocke Hills', GameConstants.Region.galar, 14,
    new RoutePokemon({
        land: ['Pumpkaboo', 'Klink', 'Unfezant', 'Corvisquire', 'Hawlucha', 'Corviknight', 'Copperajah', 'Gourgeist'],
        special:
        [
            new SpecialRoutePokemon(['Espurr', 'Inkay', 'Dubwool', 'Machoke', 'Sudowoodo', 'Wobbuffet', 'Stufful', 'Vileplume', 'Klang'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Machoke', 'Espurr', 'Inkay', 'Hawlucha', 'Thievul', 'Wobbuffet', 'Stufful', 'Roserade', 'Klang'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Klang', 'Vileplume', 'Palpitoad', 'Wobbuffet', 'Machoke', 'Inkay', 'Shelmet', 'Karrablast', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Karrablast', 'Shelmet', 'Espurr', 'Charjabug', 'Machoke', 'Wobbuffet', 'Wimpod', 'Vileplume', 'Klinklang'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Espurr', 'Inkay', 'Wobbuffet', 'Sneasel', 'Snorunt', 'Cubchoo', 'Abomasnow', 'Klang'], new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Klinklang', 'Abomasnow', 'Snorunt', 'Sneasel', 'Wobbuffet', 'Machoke', 'Inkay', 'Honedge', 'Vanillite'], new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Baltoy', 'Espurr', 'Inkay', 'Machoke', 'Sudowoodo', 'Wobbuffet', 'Maractus', 'Vileplume', 'Klinklang'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Dugtrio', 'Drilbur', 'Dwebble', 'Espurr', 'Machoke', 'Sudowoodo', 'Trapinch', 'Axew', 'Wobbuffet', 'Vileplume', 'Klinklang'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Klinklang', 'Roserade', 'Morelull', 'Honedge', 'Gastly', 'Impidimp', 'Hatenna', 'Inkay', 'Espurr'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dusty Bowl'))]
));
Routes.add(new RegionRoute(
    'Galar Route 6', GameConstants.Region.galar, 15,
    new RoutePokemon({
        land: ['Silicobra', 'Torkoal', 'Duskull', 'Hippopotas', 'Skorupi', 'Heatmor', 'Durant', 'Hawlucha', 'Dugtrio', 'Trapinch', 'Axew', 'Maractus', 'Galarian Yamask', 'Helioptile'],
        water: ['Goldeen', 'Magikarp', 'Drednaw'],
        headbutt: ['Greedent'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Fire)]
));
Routes.add(new RegionRoute(
    'Galar Route 7', GameConstants.Region.galar, 16,
    new RoutePokemon({
        land: ['Thievul', 'Corviknight', 'Perrserker', 'Morpeko', 'Liepard', 'Seismitoad', 'Karrablast', 'Shelmet', 'Meowstic', 'Corviknight', 'Galvantula', 'Inkay', 'Thievul', 'Perrserker', 'Morpeko'],
        headbutt: ['Greedent'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Fairy)]
));
Routes.add(new RegionRoute(
    'Galar Route 8', GameConstants.Region.galar, 17,
    new RoutePokemon({
        land: ['Sandaconda', 'Haunter', 'Rhyhorn', 'Dusclops', 'Bronzong', 'Hippowdon', 'Drapion', 'Solrock', 'Lunatone', 'Boldore', 'Gurdurr', 'Golett', 'Pawniard', 'Rufflet','Vullaby', 'Togedemaru', 'Crustle'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 16)]
));
Routes.add(new RegionRoute(
    'Steamdrift Way', GameConstants.Region.galar, 18,
    new RoutePokemon({
        land: ['Sneasel', 'Delibird', 'Snover', 'Galarian Darumaka', 'Snorunt', 'Snom', 'Throh', 'Sawk', 'Vanillish'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 17)]
));
Routes.add(new RegionRoute(
    'Galar Route 2 Lakeside', GameConstants.Region.galar, 19,
    new RoutePokemon({
        land: ['Lotad', 'Seedot', 'Purrloin', 'Blipbug', 'Gossifleur','Chewtle', 'Galarian Zigzagoon', 'Nickit', 'Yamper', 'Obstagoon'],
        water: ['Lapras', 'Drednaw', 'Gyarados', 'Arrokuda','Barraskewda', 'Magikarp', 'Feebas'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Rock)]
));
Routes.add(new RegionRoute(
    'Galar Route 9', GameConstants.Region.galar, 20,
    new RoutePokemon({
        land: ['Cramorant', 'Octillery', 'Kingler', 'Pyukumuku', 'Gastrodon (east)', 'Jellicent', 'Mareanie', 'Glalie'],
        water: ['Wishiwashi (Solo)', 'Qwilfish', 'Mantyke'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Rock)]
));
Routes.add(new RegionRoute(
    'Circhester Bay', GameConstants.Region.galar, 21,
    new RoutePokemon({
        land: ['Gastrodon (east)', 'Inkay', 'Cramorant', 'Octillery', 'Barbaracle', 'Bergmite', 'Toxapex', 'Dhelmise', 'Clobbopus'],
        water: ['Lapras', 'Mantine', 'Mantyke', 'Wailmer', 'Wailord', 'Remoraid', 'Grapploct'],
        headbutt: ['Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 20)]
));
Routes.add(new RegionRoute(
    'Outer Spikemuth', GameConstants.Region.galar, 22,
    new RoutePokemon({
        land: ['Liepard', 'Thievul', 'Perrserker','Morpeko', 'Morpeko (hangry)', 'Jellicent', 'Bergmite', 'Mareanie','Toxapex', 'Dhelmise', 'Clobbopus'],
        headbutt: ['Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 21)]
));
Routes.add(new RegionRoute(
    'Galar Route 10 Station', GameConstants.Region.galar, 23,
    new RoutePokemon({
        land: ['Snom', 'Rhydon', 'Galarian Darumaka','Galarian Mr. Mime', 'Vanillish', 'Klang', 'Glalie', 'Snover', 'Vanilluxe', 'Cubchoo'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Dragon)]
));
Routes.add(new RegionRoute(
    'Galar Route 10 North', GameConstants.Region.galar, 24,
    new RoutePokemon({
        land: ['Snom', 'Duraludon', 'Stonjourner', 'Eiscue', 'Eiscue (noice)', 'Beartic', 'Vanillish', 'Abomasnow', 'Galarian Darumaka','Galarian Mr. Mime', 'Sneasel', 'Snover', 'Cubchoo'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 23)]
));

/*
ISLE OF ARMOR
*/
Routes.add(new RegionRoute(
    'Fields of Honor', GameConstants.Region.armor, 1,
    new RoutePokemon({
        land: ['Galarian Slowpoke', 'Buneary', 'Jigglypuff', 'Abra', 'Klefki', 'Blipbug', 'Happiny'],
        water: ['Magikarp', 'Remoraid', 'Octillery', 'Tentacool', 'Wingull', 'Mantyke', 'Starmie'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Kingler', 'Rockruff', 'Lopunny', 'Toxapex', 'Comfey'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Inkay', 'Chansey', 'Toxapex', 'Zorua', 'Malamar', 'Kingler', 'Tentacruel'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Krabby', 'Chansey', 'Marill', 'Malamar', 'Kingler', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Krabby', 'Chansey', 'Pikachu', 'Luxio', 'Kingler', 'Pelipper'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Fomantis', 'Chansey', 'Kingler', 'Rockruff', 'Lopunny', 'Drednaw', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Comfey', 'Lopunny', 'Kingler'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Ralts', 'Blissey', 'Zorua', 'Wigglytuff', 'Toxapex', 'Kadabra', 'Drifloon'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
));
Routes.add(new RegionRoute(
    'Soothing Wetlands', GameConstants.Region.armor, 2,
    new RoutePokemon({
        land: ['Skorupi', 'Dunsparce', 'Bouffalant', 'Lickitung', 'Shelmet', 'Happiny'],
        water: ['Magikarp', 'Barboach', 'Whiscash', 'Wooper', 'Chewtle'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Lickilicky', 'Lopunny', 'Rockruff', 'Quagsire', 'Drapion', 'Drednaw', 'Comfey'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Pawniard', 'Croagunk', 'Drapion', 'Malamar', 'Zorua', 'Quagsire', 'Drednaw', 'Scraggy'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Corphish', 'Goomy', 'Drapion', 'Malamar', 'Quagsire', 'Lickilicky', 'Marill', 'Poliwhirl', 'Politoed'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Corphish', 'Goomy', 'Luxray', 'Luxio', 'Raichu', 'Pikachu', 'Poliwhirl', 'Politoed'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Fomantis', 'Talonflame', 'Lilligant', 'Fletchinder', 'Comfey', 'Drednaw', 'Quagsire'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Lickilicky', 'Lopunny', 'Comfey', 'Quagsire', 'Drapion', 'Drednaw'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Kadabra', 'Wigglytuff', 'Zorua', 'Quagsire', 'Azumarill', 'Comfey', 'Poliwhirl'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 1),
            new RouteKillRequirement(10, GameConstants.Region.armor, 3),
            new RouteKillRequirement(10, GameConstants.Region.armor, 4),
            new RouteKillRequirement(10, GameConstants.Region.armor, 5),
            new RouteKillRequirement(10, GameConstants.Region.armor, 11),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Forest of Focus', GameConstants.Region.armor, 3,
    new RoutePokemon({
        land: ['Venipede', 'Foongus', 'Tangela', 'Pikachu', 'Passimian', 'Oranguru', 'Happiny', 'Karrablast'],
        water: ['Magikarp', 'Goldeen', 'Arrokuda', 'Corphish', 'Cramorant'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Tangrowth', 'Amoonguss', 'Whiscash'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Pawniard', 'Croagunk', 'Amoonguss', 'Scolipede', 'Crawdaunt', 'Whiscash'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Corphish', 'Crawdaunt', 'Shelmet', 'Accelgor', 'Goomy', 'Golduck', 'Amoonguss', 'Barraskewda'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Corphish', 'Goomy', 'Raichu', 'Luxray', 'Pichu', 'Shelmet', 'Crawdaunt', 'Barraskewda'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Fomantis', 'Pinsir', 'Heracross', 'Tangrowth', 'Lurantis', 'Larvesta', 'Comfey', 'Amoonguss', 'Whiscash'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Silicobra', 'Sandslash', 'Escavalier', 'Cubone', 'Whiscash'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Zorua', 'Wigglytuff', 'Comfey', 'Azumarill', 'Gardevoir', 'Jigglypuff', 'Barraskewda'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin', 'Emolga'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 2),
            new RouteKillRequirement(10, GameConstants.Region.armor, 4),
            new RouteKillRequirement(10, GameConstants.Region.armor, 7),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Challenge Beach', GameConstants.Region.armor, 4,
    new RoutePokemon({
        land: ['Magnemite', 'Psyduck', 'Dedenne', 'Morpeko', 'Blipbug', 'Buneary', 'Jigglypuff', 'Happiny'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Dhelmise', 'Staryu', 'Pelipper', 'Tentacool', 'Wingull'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Lopunny', 'Comfey', 'Drednaw', 'Marill', 'Cramorant', 'Kingler', 'Starmie', 'Tentacruel', 'Gyarados', 'Octillery', 'Barraskewda'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Inkay', 'Drapion', 'Malamar', 'Drednaw', 'Crawdaunt', 'Drifblim', 'Swoobat', 'Cramorant', 'Toxapex', 'Starmie', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Shinx', 'Malamar', 'Crawdaunt', 'Golisopod', 'Cramorant', 'Drapion', 'Starmie', 'Kingler', 'Toxapex', 'Tentacruel', 'Cloyster', 'Gyarados', 'Jellicent', 'Barraskewda'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Shinx', 'Magneton', 'Raichu', 'Drednaw', 'Golduck', 'Luxray', 'Magnezone', 'Starmie', 'Toxapex', 'Lanturn', 'Barraskewda'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Fomantis', 'Lilligant', 'Lurantis', 'Fletchinder', 'Drednaw', 'Golduck', 'Volcarona', 'Cramorant', 'Kingler', 'Starmie', 'Tentacruel', 'Gyarados', 'Octillery', 'Barraskewda'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Lopunny', 'Drednaw', 'Cramorant', 'Marill', 'Kingler', 'Starmie', 'Tentacruel', 'Gyarados', 'Octillery', 'Barraskewda'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Wigglytuff', 'Comfey', 'Lopunny', 'Drifblim', 'Azumarill', 'Cramorant', 'Starmie', 'Toxapex', 'Cloyster', 'Lanturn', 'Jellicent', 'Barraskewda'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 2),
            new RouteKillRequirement(10, GameConstants.Region.armor, 3),
            new RouteKillRequirement(10, GameConstants.Region.armor, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Courageous Cavern', GameConstants.Region.armor, 5,
    new RoutePokemon({
        land: ['Pincurchin', 'Dwebble', 'Crustle', 'Druddigon', 'Golisopod', 'Swoobat', 'Drednaw'],
        water: ['Magikarp', 'Shellder', 'Cloyster', 'Tentacool', 'Clobbopus', 'Chewtle', 'Tentacruel', 'Whiscash'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Woobat', 'Wimpod'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Woobat', 'Wimpod'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Woobat', 'Wimpod'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Woobat', 'Wimpod'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Woobat', 'Wimpod'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Woobat', 'Wimpod'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 1),
            new RouteKillRequirement(10, GameConstants.Region.armor, 2),
            new RouteKillRequirement(10, GameConstants.Region.armor, 4),
            new RouteKillRequirement(10, GameConstants.Region.armor, 6),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Loop Lagoon', GameConstants.Region.armor, 6,
    new RoutePokemon({
        land: ['Sandygast', 'Clobbopus', 'Wingull', 'Mareanie', 'Pincurchin', 'Dwebble', 'Blipbug', 'Happiny'],
        water: ['Magikarp', 'Shellder', 'Cloyster'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Drednaw', 'Grapploct', 'Alakazam', 'Rockruff', 'Gyarados', 'Tentacruel', 'Octillery'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Inkay', 'Malamar', 'Toxapex', 'Grapploct', 'Palossand', 'Zoroark', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Krabby', 'Malamar', 'Toxapex', 'Alakazam', 'Pelipper', 'Tentacruel', 'Gyarados'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Krabby', 'Luxio', 'Magnezone', 'Luxray', 'Lanturn', 'Gyarados'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Fletchling', 'Drednaw', 'Grapploct', 'Larvesta', 'Talonflame', 'Tentacruel', 'Octillery', 'Gyarados'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Drednaw', 'Grapploct', 'Palossand', 'Alakazam', 'Larvesta', 'Tentacruel', 'Octillery', 'Gyarados'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Drifloon', 'Wigglytuff', 'Toxapex', 'Grapploct', 'Palossand', 'Zoroark', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 5),
            new RouteKillRequirement(10, GameConstants.Region.armor, 13),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Training Lowlands', GameConstants.Region.armor, 7,
    new RoutePokemon({
        land: ['Lillipup', 'Tauros', 'Miltank', 'Scyther', 'Pinsir', 'Heracross', 'Blipbug', 'Happiny'],
        water: ['Magikarp', 'Carvanha', 'Sharpedo', 'Corphish', 'Arrokuda', 'Cramorant', 'Staryu'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Stoutland', 'Kangaskhan', 'Herdier', 'Golduck', 'Kingler', 'Barraskewda'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Inkay', 'Bisharp', 'Drapion', 'Swoobat', 'Kangaskhan', 'Karrablast', 'Golduck', 'Malamar', 'Kingler', 'Crawdaunt'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Shinx', 'Kingler', 'Pelipper', 'Malamar', 'Shelmet', 'Scrafty', 'Toxicroak', 'Golduck', 'Barraskewda'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Shinx', 'Luxray', 'Luxio', 'Magneton', 'Accelgor', 'Scrafty', 'Toxicroak', 'Golduck', 'Kingler', 'Barraskewda'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Fomantis', 'Lilligant', 'Fletchinder', 'Talonflame', 'Drapion', 'Golduck', 'Kingler', 'Barraskewda'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Silicobra', 'Scizor', 'Crustle', 'Skarmory', 'Escavalier', 'Jangmo-o', 'Kingler', 'Barraskewda'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Wigglytuff', 'Comfey', 'Drifblim', 'Herdier', 'Azumarill', 'Gardevoir', 'Barraskewda'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 2),
            new RouteKillRequirement(10, GameConstants.Region.armor, 10),
            new RouteKillRequirement(10, GameConstants.Region.armor, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Warm-Up Tunnel', GameConstants.Region.armor, 8,
    new RoutePokemon({
        land: ['Sandshrew', 'Cubone', 'Torkoal', 'Kangaskhan'],
        special:
        [
            new SpecialRoutePokemon(['Chansey'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.armor, 7)]
));
Routes.add(new RegionRoute(
    'Potbottom Desert', GameConstants.Region.armor, 9,
    new RoutePokemon({
        land: ['Sandile', 'Rhyhorn', 'Torkoal', 'Rufflet', 'Vullaby', 'Braviary', 'Mandibuzz'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Rhyperior', 'Marowak', 'Rhydon', 'Sandaconda'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Pawniard', 'Jangmo-o', 'Krookodile', 'Krokorok'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Shinx', 'Krookodile', 'Krokorok'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Krookodile', 'Krokorok'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Fletchling', 'Rhyperior', 'Marowak', 'Sandaconda', 'Rhydon', 'Volcarona'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Silicobra', 'Scraggy', 'Rhyperior', 'Sandslash', 'Rhydon'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Rhyperior', 'Marowak', 'Sandaconda'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.armor, 8)]
));
Routes.add(new RegionRoute(
    'Challenge Road', GameConstants.Region.armor, 10,
    new RoutePokemon({
        land: ['Skorupi', 'Dunsparce', 'Bouffalant', 'Lickitung', 'Shelmet', 'Happiny'],
        water: ['Magikarp', 'Barboach', 'Whiscash', 'Wooper', 'Chewtle'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Lickilicky', 'Lopunny', 'Rockruff', 'Quagsire', 'Drapion', 'Drednaw', 'Comfey'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Pawniard', 'Croagunk', 'Drapion', 'Malamar', 'Zorua', 'Quagsire', 'Drednaw', 'Scraggy'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Corphish', 'Goomy', 'Drapion', 'Malamar', 'Quagsire', 'Lickilicky', 'Marill', 'Poliwhirl', 'Politoed'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Corphish', 'Goomy', 'Luxray', 'Luxio', 'Raichu', 'Pikachu', 'Poliwhirl', 'Politoed'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Fomantis', 'Talonflame', 'Lilligant', 'Fletchinder', 'Comfey', 'Drednaw', 'Quagsire'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Lickilicky', 'Lopunny', 'Comfey', 'Quagsire', 'Drapion', 'Drednaw'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Kadabra', 'Wigglytuff', 'Zorua', 'Quagsire', 'Azumarill', 'Comfey', 'Poliwhirl'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 7),
            new RouteKillRequirement(10, GameConstants.Region.armor, 11),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Brawlers Cave', GameConstants.Region.armor, 11,
    new RoutePokemon({
        land: ['Whismur', 'Woobat', 'Azurill', 'Lickitung', 'Poliwrath', 'Loudred', 'Swoobat', 'Druddigon', 'Golduck', 'Gigalith'],
        water: ['Poliwag', 'Barboach', 'Whiscash'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Poliwag'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Poliwag'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Poliwag'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Poliwag'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Poliwag'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Psyduck'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Psyduck'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 2),
            new RouteKillRequirement(10, GameConstants.Region.armor, 10),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Workout Sea', GameConstants.Region.armor, 12,
    new RoutePokemon({
        land: ['Blipbug', 'Ditto', 'Exeggcute', 'Happiny'],
        water: ['Magikarp', 'Remoraid', 'Octillery', 'Sharpedo', 'Mantyke', 'Wingull', 'Tentacool', 'Clauncher', 'Skrelp', 'Gyarados', 'Clawitzer', 'Dragalge'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Exeggutor', 'Rotom (mow)'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Rotom (fan)', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Rotom (frost)', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Rotom (wash)', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Exeggutor', 'Rotom (heat)', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Rotom'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Rotom', 'Drifloon', 'Jellicent', 'Wailord'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 1),
            new RouteKillRequirement(10, GameConstants.Region.armor, 11),
            new RouteKillRequirement(10, GameConstants.Region.armor, 13),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Stepping-Stone Sea', GameConstants.Region.armor, 13,
    new RoutePokemon({
        land: ['Blipbug', 'Exeggcute', 'Happiny', 'Wingull'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Sharpedo', 'Tentacool', 'Frillish', 'Gyarados', 'Clauncher', 'Skrelp', 'Clawitzer', 'Dragalge'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Mantyke'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Mantyke'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Drifloon', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin', 'Flapple', 'Appletun'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 4),
            new RouteKillRequirement(10, GameConstants.Region.armor, 6),
            new RouteKillRequirement(10, GameConstants.Region.armor, 12),
            new RouteKillRequirement(10, GameConstants.Region.armor, 14),
            new RouteKillRequirement(10, GameConstants.Region.armor, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Insular Sea', GameConstants.Region.armor, 14,
    new RoutePokemon({
        land: ['Blipbug', 'Wingull', 'Exeggcute', 'Happiny'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Sharpedo', 'Tentacool', 'Horsea', 'Gyarados', 'Clauncher', 'Skrelp', 'Clawitzer', 'Dragalge'],
        special:
        [
            new SpecialRoutePokemon(['Exeggutor', 'Mantyke'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Zoroark', 'Pelipper', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Exeggutor', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Magnezone', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Volcarona', 'Exeggutor', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Exeggutor', 'Mantyke'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Alakazam', 'Comfey', 'Drifloon', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 13),
            new RouteKillRequirement(10, GameConstants.Region.armor, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Honeycalm Sea', GameConstants.Region.armor, 15,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Wishiwashi (Solo)', 'Sharpedo', 'Wingull', 'Wailmer', 'Clauncher', 'Skrelp', 'Gyarados', 'Clawitzer', 'Dragalge'],
        special:
        [
            new SpecialRoutePokemon(['Mantyke', 'Seadra'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Tentacruel', 'Jellicent', 'Seadra'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Pelipper', 'Seadra'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Pelipper', 'Chinchou', 'Lanturn', 'Kingdra'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Fletchinder', 'Seadra'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Mantyke', 'Seadra'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Drifloon', 'Jellicent', 'Seadra'], new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.armor, 4),
            new RouteKillRequirement(10, GameConstants.Region.armor, 7),
            new RouteKillRequirement(10, GameConstants.Region.armor, 13),
            new RouteKillRequirement(10, GameConstants.Region.armor, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Honeycalm Island', GameConstants.Region.armor, 16,
    new RoutePokemon({
        land: ['Blipbug', 'Combee', 'Petilil', 'Happiny'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Wingull', 'Tentacool', 'Wailmer', 'Gyarados', 'Clauncher', 'Skrelp', 'Clawitzer', 'Dragalge'],
        special:
        [
            new SpecialRoutePokemon(['Chansey', 'Lilligant', 'Mantyke'], new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Chansey', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Chansey', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Chansey', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Chansey', 'Lilligant', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Chansey', 'Lilligant', 'Mantyke'], new WeatherRequirement([WeatherType.Sandstorm])),
            new SpecialRoutePokemon(['Blissey', 'Comfey', 'Drifloon', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.armor, 15)]
));

//Crown Tundra
Routes.add(new RegionRoute(
    'Slippery Slope', GameConstants.Region.crown, 1,
    new RoutePokemon({
        land: ['Snom', 'Piloswine', 'Jynx', 'Amaura', 'Audino', 'Mime Jr.', 'Smoochum', 'Swinub'],
        special:
        [
            new SpecialRoutePokemon(['Dubwool', 'Wooloo', 'Mamoswine', 'Snorlax'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Phantump', 'Trevenant', 'Weavile', 'Mamoswine'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Cryogonal', 'Mamoswine', 'Abomasnow', 'Swablu'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Cryogonal', 'Mamoswine', 'Glalie', 'Froslass'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Wooloo', 'Magby', 'Snorlax', 'Magmar', 'Mamoswine', 'Magmortar'],  new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Hatenna', 'Impidimp', 'Gothorita', 'Mimikyu', 'Duosion', 'Gothita', 'Solosis', 'Hattrem', 'Grimmsnarl', 'Gothitelle', 'Reuniclus'],  new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)]
));
Routes.add(new RegionRoute(
    'Frostpoint Field', GameConstants.Region.crown, 2,
    new RoutePokemon({
        land: ['Abomasnow', 'Jynx', 'Amaura', 'Audino', 'Mime Jr.', 'Snover', 'Smoochum'],
        special:
        [
            new SpecialRoutePokemon(['Dubwool', 'Wooloo', 'Nidoran(M)', 'Nidoran(F)', 'Snorlax'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Nidoran(M)', 'Nidoran(F)', 'Weavile', 'Snorlax'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Nidoran(M)', 'Nidoran(F)', 'Vanilluxe'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Nidoran(M)', 'Nidoran(F)', 'Vanilluxe', 'Absol', 'Eevee'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Magby', 'Nidoran(M)', 'Nidoran(F)', 'Snorlax', 'Magmar'],  new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Hattrem', 'Gothorita', 'Duosion', 'Mimikyu', 'Hatenna', 'Gothita', 'Solosis', 'Hatterene', 'Gothitelle', 'Reuniclus'],  new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 1)]
));
Routes.add(new RegionRoute(
    'Giants Bed', GameConstants.Region.crown, 3,
    new RoutePokemon({
        land: ['Nidoran(M)', 'Nidoran(F)', 'Stonjourner', 'Bronzong', 'Audino', 'Mime Jr.', 'Shelmet', 'Nidorino', 'Nidorina', 'Aerodactyl'],
        water: ['Magikarp', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados', 'Whiscash', 'Lileep', 'Feebas'],
        special:
        [
            new SpecialRoutePokemon(['Dubwool', 'Gurdurr', 'Eevee', 'Wooloo', 'Nidoking', 'Nidoqueen', 'Conkeldurr', 'Leafeon', 'Snorlax'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Swablu', 'Galarian Linoone', 'Lampent', 'Nidoking', 'Nidoqueen', 'Obstagoon', 'Umbreon', 'Snorlax', 'Chandelure', 'Altaria'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Nidoking', 'Nidoqueen', 'Obstagoon', 'Vaporeon', 'Snorlax'],  new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Dewpider', 'Elekid', 'Electivire', 'Jolteon', 'Nidoking', 'Snorlax'],  new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Snorunt', 'Cryogonal', 'Vanillish', 'Vanillite', 'Nidoking', 'Nidoqueen', 'Vanilluxe', 'Espeon', 'Glalie', 'Froslass', 'Snorlax'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Snorunt', 'Cryogonal', 'Vanillish', 'Absol', 'Vanillite', 'Glalie', 'Froslass', 'Glaceon', 'Greedent', 'Nidoking', 'Nidoqueen', 'Vanilluxe', 'Snorlax'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Heatmor', 'Durant', 'Wooloo', 'Magby', 'Nidoqueen', 'Flareon', 'Magmortar', 'Snorlax'],  new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Hattrem', 'Morgrem', 'Lampent', 'Clefairy', 'Mimikyu', 'Hatenna', 'Nidoking', 'Nidoqueen', 'Grimmsnarl', 'Hatterene', 'Clefable', 'Snorlax', 'Sylveon', 'Chandelure', 'Milotic'],  new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 2)]
));
Routes.add(new RegionRoute(
    'Old Cemetery', GameConstants.Region.crown, 4,
    new RoutePokemon({
        land: ['Nidoran(M)', 'Nidoran(F)', 'Sinistea', 'Drakloak', 'Audino', 'Mime Jr.', 'Karrablast'],
        special:
        [
            new SpecialRoutePokemon(['Polteageist', 'Dragapult'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Lampent', 'Phantump', 'Trevenant', 'Dragapult'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Polteageist', 'Dragapult'],  new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Elekid', 'Dragapult', 'Polteageist'],  new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Froslass', 'Dragapult'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Absol', 'Vanillite', 'Polteageist', 'Froslass'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Magmar', 'Heatmor', 'Durant', 'Magby', 'Polteageist', 'Dragapult'],  new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Hattrem', 'Lampent', 'Galarian Ponyta', 'Mimikyu', 'Hatenna', 'Polteageist', 'Galarian Rapidash'],  new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 3)]
));
Routes.add(new RegionRoute(
    'Giants Foot', GameConstants.Region.crown, 5,
    new RoutePokemon({
        land: ['Copperajah', 'Bronzong', 'Stonjourner', 'Archen', 'Audino', 'Claydol', 'Mime Jr.', 'Cufant', 'Bronzor'],
        water: ['Magikarp', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados', 'Whiscash', 'Lileep', 'Feebas', 'Omanyte', 'Kabuto'],
        special:
        [
            new SpecialRoutePokemon(['Centiskorch', 'Gurdurr', 'Sizzlipede'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Swablu', 'Phantump', 'Altaria'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Araquanid', 'Dewpider'],  new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Electabuzz', 'Galvantula', 'Elekid'],  new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Snorunt', 'Cryogonal', 'Vanillish', 'Vanillite'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Snorunt', 'Cryogonal', 'Vanillish', 'Vanillite', 'Absol'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Centiskorch', 'Magmar', 'Sizzlipede' , 'Magby'], new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Hattrem', 'Morgrem', 'Mimikyu', 'Hatenna'],  new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 3)]
));
Routes.add(new RegionRoute(
    'Roaring-Sea Caves', GameConstants.Region.crown, 6,
    new RoutePokemon({
        land: ['Zubat', 'Carbink', 'Piloswine', 'Deino', 'Larvitar', 'Riolu', 'Audino', 'Lucario', 'Golbat', 'Hydreigon', 'Tyranitar', 'Omastar', 'Kabutops', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Magikarp', 'Omanyte', 'Kabuto', 'Feebas'],
        special:
        [
            new SpecialRoutePokemon(['Vanillish'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Vanillish'],  new WeatherRequirement([WeatherType.Blizzard])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 5)]
));
Routes.add(new RegionRoute(
    'Frigid Sea', GameConstants.Region.crown, 7,
    new RoutePokemon({
        land: ['Bergmite', 'Mime Jr.', 'Audino'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Wailmer', 'Gyarados', 'Dhelmise', 'Spheal', 'Avalugg', 'Eiscue', 'Tirtouga', 'Wailmer'],
        special:
        [
            new SpecialRoutePokemon(['Sealeo', 'Walrein', 'Carracosta'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Altaria', 'Sealeo', 'Walrein'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Sealeo', 'Carracosta'],  new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Araquanid', 'Electabuzz', 'Pincurchin', 'Dewpider', 'Elekid', 'Electivire', 'Sealeo', 'Carracosta'],  new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Vanillish', 'Beartic', 'Vanillite', 'Sealeo', 'Walrein', 'Cryogonal', 'Lapras'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Vanillish', 'Beartic', 'Vanillite', 'Sealeo', 'Walrein', 'Cryogonal', 'Lapras', 'Beartic', 'Lapras', 'Absol'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Hatenna', 'Hatterene', 'Sealeo', 'Walrein'],  new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 6)]
));
Routes.add(new RegionRoute(
    'Three-Point Pass', GameConstants.Region.crown, 8,
    new RoutePokemon({
        land: ['Bronzong', 'Avalugg', 'Claydol', 'Golurk', 'Audino', 'Mime Jr.', 'Bronzor', 'Bergmite'],
        special:
        [
            new SpecialRoutePokemon(['Dubwool', 'Wooloo', 'Dragapult'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Swablu', 'Phantump', 'Dragapult'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Dragapult'],  new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Dewpider', 'Elekid', 'Electivire'],  new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Dragapult'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Absol', 'Vanillite', 'Dragapult'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Druddigon', 'Heatmor', 'Durant', 'Wooloo', 'Magby', 'Dragapult'],  new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Hatenna', 'Dragapult'],  new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 7)]
));
Routes.add(new RegionRoute(
    'Lakeside Cave', GameConstants.Region.crown, 9,
    new RoutePokemon({
        land: ['Zubat', 'Aron', 'Carbink', 'Carkol', 'Ferroseed', 'Mawile', 'Sableye', 'Noivern', 'Audino', 'Aggron', 'Coalossal', 'Lairon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 10)]
));
Routes.add(new RegionRoute(
    'Ballimere Lake', GameConstants.Region.crown, 10,
    new RoutePokemon({
        land: ['Boltund', 'Tyrunt', 'Audino', 'Skwovet', 'Yamper', 'Mime Jr.', 'Spiritomb', 'Tyrantrum', 'Aron'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Barboach', 'Gyarados', 'Whiscash', 'Feebas', 'Dratini', 'Anorith', 'Relicanth'],
        special:
        [
            new SpecialRoutePokemon(['Gossifleur', 'Cottonee', 'Corvisquire', 'Shuckle', 'Eevee', 'Indeedee', 'Corviknight', 'Whimsicott', 'Coalossal'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Swablu', 'Linoone', 'Morpeko', 'Noivern', 'Altaria', 'Obstagoon'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Araquanid', 'Cottonee', 'Noivern', 'Dewpider', 'Whimsicott', 'Dragonite', 'Eldegoss', 'Armaldo'],  new WeatherRequirement([WeatherType.Rain])),
            new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Morpeko', 'Dewpider', 'Elekid', 'Electivire', 'Dragonite', 'Armaldo', 'Coalossal', 'Dragonair'],  new WeatherRequirement([WeatherType.Thunderstorm])),
            new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Corvisquire', 'Vanillite', 'Vanilluxe', 'Coalossal'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Carkol', 'Magmar', 'Gossifleur', 'Shuckle', 'Magby', 'Magmortar'],  new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Indeedee', 'Hatenna', 'Hatterene', 'Coalossal', 'Dragonair'],  new WeatherRequirement([WeatherType.Fog])),
        ],
        headbutt: ['Skwovet', 'Greedent', 'Munchlax'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 3)]
));
Routes.add(new RegionRoute(
    'Snowslide Slope', GameConstants.Region.crown, 11,
    new RoutePokemon({
        land: ['Snom', 'Beldum', 'Amaura', 'Audino', 'Mime Jr.', 'Metang', 'Metagross'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados'],
        special:
        [
            new SpecialRoutePokemon(['Dubwool', 'Druddigon', 'Wooloo', 'Aurorus'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Phantump', 'Sneasel', 'Weavile', 'Trevenant', 'Aurorus'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Cryogonal', 'Snorunt', 'Vanillish', 'Beartic', 'Delibird', 'Vanillite', 'Glalie', 'Vanilluxe', 'Froslass', 'Aurorus'],  new WeatherRequirement([WeatherType.Snow])),
            new SpecialRoutePokemon(['Cryogonal', 'Snorunt', 'Vanillish', 'Beartic', 'Delibird', 'Vanillite', 'Glalie', 'Vanilluxe', 'Froslass', 'Aurorus', 'Galarian Darumaka', 'Absol', 'Galarian Darmanitan'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Wooloo', 'Magby', 'Magmortar'],  new WeatherRequirement([WeatherType.Sunny])),
            new SpecialRoutePokemon(['Morgrem', 'Mimikyu', 'Clefairy', 'Clefable', 'Grimmsnarl', 'Aurorus'],  new WeatherRequirement([WeatherType.Fog])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 3)]
));
Routes.add(new RegionRoute(
    'Tunnel to the Top', GameConstants.Region.crown, 12,
    new RoutePokemon({
        land: ['Zubat', 'Carbink', 'Snorunt', 'Bagon', 'Gible', 'Clefairy', 'Audino', 'Froslass', 'Salamence', 'Garchomp', 'Clefable', 'Druddigon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 11)]
));
Routes.add(new RegionRoute(
    'Path to the Peak', GameConstants.Region.crown, 13,
    new RoutePokemon({
        land: ['Snom', 'Frosmoth','Audino'],
        special:
        [
            new SpecialRoutePokemon(['Druddigon'],  new WeatherRequirement([WeatherType.Clear])),
            new SpecialRoutePokemon(['Swablu', 'Altaria'],  new WeatherRequirement([WeatherType.Overcast])),
            new SpecialRoutePokemon(['Absol'],  new WeatherRequirement([WeatherType.Blizzard])),
            new SpecialRoutePokemon(['Druddigon', 'Salamence', 'Garchomp'],  new WeatherRequirement([WeatherType.Sunny])),
        ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.crown, 12)]
));
