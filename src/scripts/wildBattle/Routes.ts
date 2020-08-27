///<reference path="RegionRoute.ts"/>
class Routes {
    public static regionRoutes = [];
    constructor() {}

    public static add(route: RegionRoute) {
        this.regionRoutes.push(route);
        // Sort the routes so we can normalize the route number
        this.sortRegionRoutes();
    }

    public static sortRegionRoutes() {
        this.regionRoutes
            .sort((routeA, routeB) => routeA.orderNumber - routeB.orderNumber)
            .sort((routeA, routeB) => routeA.region - routeB.region);
    }

    public static getRoute(region: GameConstants.Region, route: number): RegionRoute {
        return this.regionRoutes.find(routeData => routeData.region == region && routeData.number == route);
    }

    public static getRoutesByRegion(region: GameConstants.Region) {
        return this.regionRoutes.filter(routeData => routeData.region == region);
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
    GameConstants.Region.kanto, 1,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata'],
    })
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 2,
    new RoutePokemon({
        land: ['Caterpie', 'Weedle', 'Rattata', 'Nidoran(F)', 'Nidoran(M)'],
    }),
    [new RouteKillRequirement(10, 1)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 3,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Spearow', 'Sandshrew', 'Jigglypuff', 'Mankey'],
    }),
    [
        new RouteKillRequirement(10, 2),
        new GymBadgeRequirement(BadgeCase.Badge.Boulder),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 4,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Mankey'],
        water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby', 'Seaking'],
    }),
    [
        new RouteKillRequirement(10, 3),
        new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Mt. Moon')),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 24,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Pidgey', 'Pidgeotto', 'Oddish', 'Venonat', 'Abra', 'Bellsprout'],
        water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby', 'Seaking'],
    }),
    [new RouteKillRequirement(10, 4)],
    4.1
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 25,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Pidgeotto', 'Oddish', 'Venonat', 'Abra', 'Bellsprout'],
        water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby'],
    }),
    [new RouteKillRequirement(10, 24)],
    4.2
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 5,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Abra', 'Bellsprout'],
    }),
    [
        // Need to reach bills house
        new RouteKillRequirement(10, 25),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 6,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Abra', 'Bellsprout'],
        water: ['Poliwag', 'Goldeen', 'Shellder', 'Krabby'],
    }),
    [new RouteKillRequirement(10, 5)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 11,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Raticate', 'Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Drowzee'],
        water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby', 'Horsea'],
    }),
    [new RouteKillRequirement(10, 6)],
    6.1
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 9,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Sandshrew', 'Nidoran(F)', 'Nidoran(M)', 'Nidorina', 'Nidorino'],
    }),
    [
        new RouteKillRequirement(10, 6),
        new GymBadgeRequirement(BadgeCase.Badge.Cascade),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 10,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Ekans', 'Sandshrew', 'Nidoran(F)', 'Nidoran(M)', 'Machop', 'Magnemite', 'Voltorb'],
        water: ['Poliwag', 'Goldeen', 'Poliwhirl', 'Slowpoke', 'Krabby', 'Kingler', 'Horsea'],
    }),
    [
        new RouteKillRequirement(10, 9),
        new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Rock Tunnel')),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 7,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Vulpix', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Growlithe', 'Abra', 'Bellsprout'],
    }),
    [new RouteKillRequirement(10, 10)],
    10.1
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 8,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Ekans', 'Sandshrew', 'Vulpix', 'Jigglypuff', 'Meowth', 'Mankey', 'Growlithe', 'Abra', 'Kadabra'],
    }),
    [new RouteKillRequirement(10, 7)],
    10.2
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 12,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Snorlax'],
        water: ['Slowbro', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Krabby', 'Horsea', 'Seadra'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Pokemon Tower'))]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 13,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Ditto'],
        water: ['Slowbro', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Krabby', 'Horsea', 'Seadra'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 12),
            new RouteKillRequirement(10, 14),
        ]),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 14,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Venomoth', 'Bellsprout', 'Weepinbell', 'Ditto'],
        water: ['Poliwag', 'Goldeen'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 13),
            new RouteKillRequirement(10, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 15,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Venomoth', 'Bellsprout', 'Weepinbell', 'Ditto'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 18),
            new RouteKillRequirement(10, 14),
        ]),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 16,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo', 'Snorlax'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Pokemon Tower'))]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 17,
    new RoutePokemon({
        land: ['Raticate', 'Spearow', 'Fearow', 'Ponyta', 'Doduo', 'Dodrio'],
        water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 16),
            new RouteKillRequirement(10, 18),
        ]),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 18,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo'],
        water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 17),
            new RouteKillRequirement(10, 15),
        ]),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 19,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Soul)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 20,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 21),
            new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Seafoam Islands')),
        ]),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 21,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Raticate', 'Tangela'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Soul)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 22,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Nidoran(F)', 'Nidoran(M)', 'Mankey'],
        water: ['Poliwag', 'Poliwhirl', 'Goldeen'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Earth)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.kanto, 23,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Ekans', 'Arbok', 'Sandshrew', 'Sandslash', 'Nidorina', 'Nidorino', 'Mankey', 'Primeape', 'Ditto'],
        water: ['Poliwag', 'Goldeen', 'Poliwhirl', 'Slowbro', 'Kingler', 'Seadra', 'Seaking'],
    }),
    [new RouteKillRequirement(10, 22)]
));

/*
JOHTO
*/
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 29,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Sentret', 'Hoothoot'],
        headbutt: ['Exeggcute', 'Ledyba', 'Spinarak', 'Hoothoot', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_KantoChampion)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 30,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Hoothoot', 'Ledyba', 'Spinarak'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, 29)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 31,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Poliwag', 'Hoothoot', 'Ledyba', 'Spinarak', 'Bellsprout'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
        headbutt: ['Spearow', 'Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Aipom', 'Pineco', 'Heracross'],
    }),
    [new RouteKillRequirement(10, 30)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 32,
    new RoutePokemon({
        land: ['Rattata', 'Ekans', 'Zubat', 'Bellsprout', 'Mareep', 'Hoppip', 'Wooper'],
        water: ['Tentacool', 'Tentacruel', 'Quagsire', 'Magikarp', 'Qwilfish'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Zephyr)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 33,
    new RoutePokemon({
        land: ['Spearow', 'Rattata', 'Ekans', 'Zubat', 'Hoppip'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Union Cave'))]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 34,
    new RoutePokemon({
        land: ['Rattata', 'Abra', 'Drowzee', 'Ditto'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Magikarp', 'Staryu', 'Corsola', 'Kingler'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Ilex Forest'))]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 35,
    new RoutePokemon({
        land: ['Pidgey', 'Nidoran(F)', 'Nidoran(M)', 'Abra', 'Drowzee', 'Ditto', 'Hoothoot', 'Yanma'],
        water: ['Psyduck', 'Golduck', 'Poliwag', 'Magikarp'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, 34)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 36,
    new RoutePokemon({
        land: ['Pidgey', 'Nidoran(M)', 'Nidoran(F)', 'Vulpix', 'Growlithe', 'Hoothoot', 'Stantler', 'Sudowoodo'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Plain)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 37,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Vulpix', 'Growlithe', 'Hoothoot', 'Ledyba', 'Spinarak', 'Stantler'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, 36)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 38,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Meowth', 'Magnemite', 'Farfetch\'d', 'Tauros', 'Snubbull', 'Miltank'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, 37)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 39,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Meowth', 'Magnemite', 'Farfetch\'d', 'Tauros', 'Miltank'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, 38)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 40,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Magikarp', 'Staryu', 'Corsola', 'Kingler'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Fog)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 41,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Mantine', 'Magikarp', 'Chinchou', 'Shellder'],
    }),
    [new RouteKillRequirement(10, 40)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 42,
    new RoutePokemon({
        land: ['Spearow', 'Zubat', 'Mankey', 'Mareep', 'Flaaffy'],
        water: ['Goldeen', 'Seaking', 'Magikarp'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Fog)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 43,
    new RoutePokemon({
        land: ['Pidgeotto', 'Venonat', 'Noctowl', 'Mareep', 'Flaaffy', 'Girafarig'],
        water: ['Magikarp', 'Poliwag'],
        headbutt: ['Venonat', 'Exeggcute', 'Hoothoot', 'Pineco'],
    }),
    [new RouteKillRequirement(10, 42)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 44,
    new RoutePokemon({
        land: ['Bellsprout', 'Weepinbell', 'Lickitung', 'Tangela'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Remoraid'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [
        new GymBadgeRequirement(BadgeCase.Badge.Mineral),
        new GymBadgeRequirement(BadgeCase.Badge.Glacier),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 45,
    new RoutePokemon({
        land: ['Geodude', 'Graveler', 'Gligar', 'Teddiursa', 'Skarmory', 'Phanpy'],
        water: ['Magikarp', 'Poliwag', 'Dratini'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Ice Path'))]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 46,
    new RoutePokemon({
        land: ['Spearow', 'Rattata', 'Geodude'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new RouteKillRequirement(10, 29)],
    29.1
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 47,
    new RoutePokemon({
        land: ['Raticate', 'Spearow', 'Fearow', 'Gloom', 'Farfetch\'d', 'Ditto', 'Noctowl', 'Miltank'],
        water: ['Tentacool', 'Seel', 'Staryu', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Metapod', 'Butterfree', 'Kakuna', 'Beedrill', 'Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Mineral)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 48,
    new RoutePokemon({
        land: ['Fearow', 'Vulpix', 'Gloom', 'Diglett', 'Growlithe', 'Farfetch\'d', 'Tauros', 'Hoppip', 'Girafarig'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, 47)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 26,
    new RoutePokemon({
        land: ['Raticate', 'Arbok', 'Sandslash', 'Ponyta', 'Doduo', 'Dodrio', 'Quagsire'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, 27)],
    50
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 27,
    new RoutePokemon({
        land: ['Raticate', 'Arbok', 'Sandslash', 'Ponyta', 'Doduo', 'Dodrio', 'Quagsire'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Rising)],
    49
));
Routes.add(new RegionRoute(
    GameConstants.Region.johto, 28,
    new RoutePokemon({
        land: ['Ponyta', 'Tangela', 'Donphan', 'Ursaring', 'Rapidash', 'Doduo', 'Dodrio', 'Sneasel', 'Murkrow'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
        headbutt: ['Natu', 'Aipom', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_JohtoChampion)],
    51
));

/*
HOENN
*/
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 101,
    new RoutePokemon({
        land: ['Wurmple', 'Poochyena', 'Zigzagoon'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_JohtoChampion)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 102,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Wurmple', 'Lotad', 'Zigzagoon', 'Ralts', 'Seedot'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Corphish'],
    }),
    [new RouteKillRequirement(10, 101)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 103,
    new RoutePokemon({
        land: ['Poochyena', 'Wingull', 'Zigzagoon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, 101)],
    101.1
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 104,
    new RoutePokemon({
        land: ['Poochyena', 'Wurmple', 'Marill', 'Taillow', 'Wingull'],
        water: ['Wingull', 'Pelipper', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, 102)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 105,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Balance)],
    115.1
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 106,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 105),
            new RouteKillRequirement(10, 107),
        ]),
    ],
    115.2
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 107,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 106),
            new RouteKillRequirement(10, 108),
        ]),
    ],
    115.3
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 108,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 107),
            new RouteKillRequirement(10, 109),
        ]),
    ],
    115.4
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 109,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Balance)],
    115.5
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 110,
    new RoutePokemon({
        land: ['Poochyena', 'Electrike', 'Gulpin', 'Minun', 'Oddish', 'Wingull', 'Plusle'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Granite Cave')),
        new GymBadgeRequirement(BadgeCase.Badge.Knuckle),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 111,
    new RoutePokemon({
        land: ['Sandshrew', 'Trapinch', 'Baltoy', 'Cacnea'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
        headbutt: ['Geodude'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Dynamo)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 112,
    new RoutePokemon({
        land: ['Numel', 'Marill'],
    }),
    [new RouteKillRequirement(10, 111)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 113,
    new RoutePokemon({
        land: ['Spinda', 'Slugma', 'Skarmory'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Fiery Path'))]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 114,
    new RoutePokemon({
        land: ['Zangoose', 'Surskit', 'Swablu', 'Lotad', 'Lombre', 'Seviper', 'Nuzleaf'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
        headbutt: ['Geodude'],
    }),
    [new RouteKillRequirement(10, 113)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 115,
    new RoutePokemon({
        land: ['Swablu', 'Taillow', 'Swellow', 'Jigglypuff', 'Wingull'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Meteor Falls'))]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 116,
    new RoutePokemon({
        land: ['Poochyena', 'Whismur', 'Nincada', 'Abra', 'Taillow', 'Skitty'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Petalburg Woods'))],
    104.1
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 117,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Oddish', 'Marill', 'Illumise', 'Volbeat', 'Seedot'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Corphish'],
    }),
    [new RouteKillRequirement(10, 110)],
    110.1
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 118,
    new RoutePokemon({
        land: ['Zigzagoon', 'Electrike', 'Linoone', 'Manectric', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha', 'Sharpedo'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Balance)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 119,
    new RoutePokemon({
        land: ['Zigzagoon', 'Linoone', 'Oddish', 'Tropius', 'Kecleon', 'Castform', 'Castform (sunny)', 'Castform (rainy)', 'Castform (snowy)'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha'],
    }),
    [new RouteKillRequirement(10, 118)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 120,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Mightyena', 'Oddish', 'Marill', 'Absol', 'Kecleon', 'Seedot'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
    }),
    [new RouteKillRequirement(10, 119)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 121,
    new RoutePokemon({
        land: ['Poochyena', 'Shuppet', 'Mightyena', 'Oddish', 'Gloom', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new RouteKillRequirement(10, 120)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 122,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [
        new RouteKillRequirement(10, 121),
        new GymBadgeRequirement(BadgeCase.Badge.Feather),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 123,
    new RoutePokemon({
        land: ['Poochyena', 'Shuppet', 'Mightyena', 'Oddish', 'Gloom', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new RouteKillRequirement(10, 122)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 124,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Clamperl', 'Relicanth'],
    }),
    [new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Mt. Pyre'))]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 125,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, 124)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 126,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Clamperl', 'Relicanth'],
    }),
    [new RouteKillRequirement(10, 124)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 127,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, 125),
            new RouteKillRequirement(10, 126),
        ]),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 128,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Luvdisc', 'Wailmer', 'Corsola'],
    }),
    [new RouteKillRequirement(10, 127)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 129,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Wailord', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, 128)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 130,
    new RoutePokemon({
        land: ['Wynaut'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, 129)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 131,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, 130)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 132,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, 131)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 133,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, 132)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.hoenn, 134,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, 133)]
));

/*
SINNOH
*/
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 201,
    new RoutePokemon({
        land: ['Starly', 'Bidoof', 'Kricketot'],
    }),
    [new GymBadgeRequirement(BadgeCase.Badge.Elite_HoennChampion)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 202,
    new RoutePokemon({
        land: ['Starly', 'Bidoof', 'Kricketot', 'Shinx'],
    }),
    [new RouteKillRequirement(10, 201)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 203,
    new RoutePokemon({
        land: ['Zubat', 'Abra', 'Starly', 'Bidoof', 'Kricketot', 'Shinx'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, 202)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 204,
    new RoutePokemon({
        land: ['Zubat', 'Wurmple', 'Starly', 'Bidoof', 'Kricketot', 'Shinx', 'Budew'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, 202)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 205,
    new RoutePokemon({
        land: ['Bidoof', 'Hoothoot', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Kricketot', 'Budew', 'Drifloon'],
        water: ['Wingull', 'Pelipper', 'Buizel', 'Tentacool', 'Tentacruel', 'Shellos (west)', 'Gastrodon (west)', 'Magikarp', 'Finneon', 'Shellder', 'Gyarados', 'Lumineon', 'Psyduck', 'Golduck', 'Barboach', 'Whiscash'],
    }),
    [
        new RouteKillRequirement(10, 204),
        new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Ravaged Path')),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 206,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Gligar', 'Kricketot', 'Kricketune', 'Stunky', 'Bronzor'],
    }),
    [
        new RouteKillRequirement(10, 205),
        new GymBadgeRequirement(BadgeCase.Badge.Forest),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 207,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Kricketot'],
    }),
    [new RouteKillRequirement(10, 206)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 208,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Ralts', 'Meditite', 'Roselia', 'Bidoof', 'Bibarel', 'Budew'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Barboach', 'Gyarados', 'Whiscash', 'Seaking'],
    }),
    [
        new RouteKillRequirement(10, 207),
        new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Mt. Coronet South')),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 209,
    new RoutePokemon({
        land: ['Zubat', 'Gastly', 'Chansey', 'Ralts', 'Roselia', 'Duskull', 'Starly', 'Staravia', 'Bibarel', 'Bonsly', 'Mime Jr.'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [
        new RouteKillRequirement(10, 208),
        new GymBadgeRequirement(BadgeCase.Badge.Relic),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 210,
    new RoutePokemon({
        land: ['Geodude', 'Ponyta', 'Chansey', 'Scyther', 'Hoothoot', 'Noctowl', 'Roselia', 'Staravia', 'Kricketune', 'Bonsly', 'Mime jr.', 'Machop', 'Machoke', 'Meditite', 'Swablu', 'Bibarel', 'Hippopotas'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Barboach', 'Whiscash', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, 209)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 211,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Hoothoot', 'Meditite', 'Bidoof', 'Machoke', 'Graveler', 'Noctowl', 'Chingling', 'Bronzor'],
    }),
    [
        new RouteKillRequirement(10, 213),
        new GymBadgeRequirement(BadgeCase.Badge.Fen),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 212,
    new RoutePokemon({
        land: ['Ralts', 'Kirlia', 'Roselia', 'Starly', 'Staravia', 'Kricketune', 'Budew'],
        water: ['Marill', 'Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Gyarados', 'Seaking'],
    }),
    [
        new RouteKillRequirement(10, 213),
        new GymBadgeRequirement(BadgeCase.Badge.Fen),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 213,
    new RoutePokemon({
        land: ['Chatot'],
        water: ['Buizel', 'Floatzel', 'Tentacool', 'Tentacruel', 'Wingull', 'Pelipper', 'Shellos (east)', 'Gastrodon (east)', 'Magikarp', 'Remoraid', 'Gyarados', 'Octillery', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, 214)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 214,
    new RoutePokemon({
        land: ['Zubat', 'Geodude', 'Graveler', 'Ponyta', 'Rhyhorn', 'Sudowoodo', 'Girafarig', 'Houndour', 'kricketune', 'Stunky'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, 215)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 215,
    new RoutePokemon({
        land: ['Abra', 'Kadabra', 'Geodude', 'Ponyta', 'Lickitung', 'Scyther', 'Staravia', 'Kricketune', 'Marill'],
    }),
    [new RouteKillRequirement(10, 210)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 216,
    new RoutePokemon({
        land: ['Zubat', 'Machoke', 'Graveler', 'Noctowl', 'Sneasel', 'Meditite', 'Snorunt', 'Snover'],
    }),
    [
        new RouteKillRequirement(10, 218),
        new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Mt. Coronet North')),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 217,
    new RoutePokemon({
        land: ['Zubat', 'Machoke', 'Noctowl', 'Sneasel', 'Swinub', 'Meditite', 'Medicham', 'Snorunt', 'Snover'],
    }),
    [new RouteKillRequirement(10, 216)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 218,
    new RoutePokemon({
        land: ['Mr. Mime', 'Glameow', 'Chatot'],
        water: ['Wingull', 'Floatzel', 'Shellos (west)', 'Gastrodon (west)', 'Tentacool', 'Tentacruel', 'Pelipper', 'Magikarp', 'Finneon', 'Gyarados', 'Lumineon'],
    }),
    [
        new RouteKillRequirement(10, 213),
        new GymBadgeRequirement(BadgeCase.Badge.Fen),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 219,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Wingull', 'Pelipper', 'Magikarp', 'Finneon', 'Lumineon', 'Gyarados', 'Clamperl'],
    }),
    [
        new RouteKillRequirement(10, 213),
        new GymBadgeRequirement(BadgeCase.Badge.Fen),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 220,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Wingull', 'Pelipper', 'Magikarp', 'Finneon', 'Lumineon', 'Gyarados', 'Chinchou', 'Lanturn'],
    }),
    [new RouteKillRequirement(10, 219)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 221,
    new RoutePokemon({
        land: ['Sudowoodo', 'Girafarig', 'Roselia', 'Stunky', 'Skuntank'],
        water: ['Wingull', 'Floatzel', 'Shellos (west)', 'Gastrodon (west)', 'Tentacool', 'Tentacruel', 'Pelipper', 'Magikarp', 'Finneon', 'Lumineon', 'Gyarados', 'Clamperl'],
    }),
    [new RouteKillRequirement(10, 220)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 222,
    new RoutePokemon({
        land: ['Magnemite', 'Magneton', 'Mr. Mime', 'Electabuzz', 'Luxio', 'Glameow', 'Purugly', 'Chatot'],
        water: ['Wingull', 'Pelipper', 'Floatzel', 'Gastrodon (east)', 'Tentacool', 'Tentacruel', 'Magikarp', 'Remoraid', 'Gyarados', 'Octillery', 'Sharpedo'],
    }),
    [
        new RouteKillRequirement(10, 217),
        new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Distortion World')),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 223,
    new RoutePokemon({
        water: ['Tentacruel', 'Pelipper', 'Mantyke', 'Magikarp', 'Remoraid', 'Octillery', 'Gyarados', 'Wailmer', 'Wailord'],
    }),
    [
        new RouteKillRequirement(10, 222),
        new GymBadgeRequirement(BadgeCase.Badge.Beacon),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 224,
    new RoutePokemon({
        land: ['Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Beautifly', 'Dustox', 'Roselia', 'Chatot'],
        water: ['Pelipper', 'Buizel', 'Floatzel', 'Shellos (east)', 'Gastrodon (east)', 'Tentacruel', 'Magikarp', 'Remoraid', 'Gyarados', 'Octillery', 'Luvdisc'],
    }),
    [
        new RouteKillRequirement(10, 223),
        new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Victory Road Sinnoh')),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 225,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Machoke', 'Graveler', 'Roselia', 'Skuntank', 'Banette'],
        water: ['Psyduck', 'Golduck', 'Poliwhirl', 'Magikarp', 'Barboach', 'Gyarados', 'Whiscash'],
    }),
    [
        new RouteKillRequirement(10, 224),
        new GymBadgeRequirement(BadgeCase.Badge.Elite_SinnohChampion),
    ]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 226,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Machoke', 'Graveler', 'Banette'],
        water: ['Golduck', 'Tentacruel', 'Seel', 'Dewgong', 'Wingull', 'Pelipper', 'Spheal', 'Sealeo', 'Magikarp', 'Horsea', 'Seadra', 'Gyarados', 'Relicanth'],
    }),
    [new RouteKillRequirement(10, 225)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 227,
    new RoutePokemon({
        land: ['Fearow', 'Golbat', 'Graveler', 'Weezing', 'Rhyhorn', 'Rhydon', 'Skarmory', 'Numel', 'Camerupt', 'Banette'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Barboach', 'Gyarados', 'Whiscash'],
    }),
    [new RouteKillRequirement(10, 226)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 228,
    new RoutePokemon({
        land: ['Diglett', 'Dugtrio', 'Rhydon', 'Cacnea', 'Cacturne', 'Hippowdon'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Barboach', 'Whiscash', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, 226)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 229,
    new RoutePokemon({
        land: ['Pidgey', 'Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Scyther', 'Pinsir', 'Ledian', 'Ariados', 'Beautifly', 'Dustox', 'Volbeat', 'Illumise', 'Roselia', 'Purugly'],
        water: ['Wingull', 'Pelipper', 'Surskit', 'Masquerain', 'Magikarp', 'Goldeen', 'Gyarados', 'Seaking'],
    }),
    [new RouteKillRequirement(10, 228)]
));
Routes.add(new RegionRoute(
    GameConstants.Region.sinnoh, 230,
    new RoutePokemon({
        land: ['Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Beautifly', 'Dustox', 'Roselia'],
        water: ['Golduck', 'Wingull', 'Pelipper', 'Floatzel', 'Gastrodon (east)', 'Tentacruel', 'Seel', 'Dewgong', 'Spheal', 'Sealeo', 'Magikarp', 'Remoraid', 'Gyarados', 'Octillery', 'Wailmer', 'Wailord'],
    }),
    [new RouteKillRequirement(10, 229)]
));
