/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="RegionRoute.ts"/>
///<reference path="../../scripts/GameConstants.d.ts" />
/// <reference path="../weather/WeatherType.ts"/>
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
            new SpecialRoutePokemon('Castform', [new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Sandstorm, WeatherType.Windy])]),
            new SpecialRoutePokemon('Castform (sunny)', [new WeatherRequirement([WeatherType.Sunny])]),
            new SpecialRoutePokemon('Castform (rainy)', [new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])]),
            new SpecialRoutePokemon('Castform (snowy)', [new WeatherRequirement([WeatherType.Snow, WeatherType.Blizzard, WeatherType.Hail, WeatherType.Fog])]),
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
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Pyre'))]
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
        land: ['Zubat', 'Geodude', 'Graveler', 'Ponyta', 'Rhyhorn', 'Sudowoodo', 'Girafarig', 'Houndour', 'Kricketune', 'Stunky', 'Hippopotas'],
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
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)]
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
        land: ['Ledyba', 'Ralts', 'Skitty', 'Budew', 'Combee', 'Flabébé (Red)', 'Flabébé (Orange)', 'Flabébé (White)', 'Flabébé (Yellow)'],
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
        land: ['Smeargle', 'Volbeat', 'Illumise', 'Roselia', 'Croagunk', 'Ducklett', 'Flabébé (Yellow)', 'Flabébé (Blue)', 'Flabébé (Orange)', 'Flabébé (White)', 'Spritzee', 'Swirlix'],
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
    [new GymBadgeRequirement(BadgeEnums.Fairy)]
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
        land: ['Pikipek', 'Yungoos', 'Grubbin'],
    })
));
Routes.add(new RegionRoute(
    'Alola Route 3', GameConstants.Region.alola, 3,
    new RoutePokemon({
        land: ['Cutiefly', 'Rockruff', 'Oricorio', 'Crabrawler'],
    })
));
Routes.add(new RegionRoute(
    'Alola Route 5', GameConstants.Region.alola, 5,
    new RoutePokemon({
        land: ['Mudbray', 'Dewpider', 'Salandit', 'Stufful'],
    })
));
Routes.add(new RegionRoute(
    'Alola Route 14', GameConstants.Region.alola, 14,
    new RoutePokemon({
        land: ['Turtonator', 'Togedemaru', 'Mimikyu'],
    })
));

/*
GALAR
*/
Routes.add(new RegionRoute(
    'Galar Route 1', GameConstants.Region.galar, 1,
    new RoutePokemon({
        land: ['Skwovet', 'Rookidee', 'Blipbug', 'Wooloo', 'Nickit'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 2', GameConstants.Region.galar, 2,
    new RoutePokemon({
        land: ['Skwovet', 'Rookidee', 'Nickit', 'Chewtle', 'Yamper'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 3', GameConstants.Region.galar, 3,
    new RoutePokemon({
        land: ['Gossifleur', 'Rookidee', 'Corvisquire', 'Skwovet', 'Rolycoly', 'Sizzlipede'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 4', GameConstants.Region.galar, 4,
    new RoutePokemon({
        land: ['Yamper', 'Wooloo', 'Milcery'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 5', GameConstants.Region.galar, 5,
    new RoutePokemon({
        land: ['Dottler', 'Applin', 'Eldegoss'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 6', GameConstants.Region.galar, 6,
    new RoutePokemon({
        land: ['Silicobra'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 7', GameConstants.Region.galar, 7,
    new RoutePokemon({
        land: ['Thievul', 'Toxel', 'Corviknight', 'Perrserker', 'Morpeko'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 8', GameConstants.Region.galar, 8,
    new RoutePokemon({
        land: ['Sandaconda', 'Falinks'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 9', GameConstants.Region.galar, 9,
    new RoutePokemon({
        land: ['Cramorant', 'Clobbopus', 'Grapploct', 'Pincurchin'],
    })
));
Routes.add(new RegionRoute(
    'Galar Route 10', GameConstants.Region.galar, 10,
    new RoutePokemon({
        land: ['Snom', 'Duraludon', 'Stonjourner', 'Eiscue'],
    })
));
