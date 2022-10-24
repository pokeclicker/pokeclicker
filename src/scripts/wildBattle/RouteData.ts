
/// <reference path="../../declarations/routes/Routes.d.ts"/>
/// <reference path="../../declarations/enums/Badges.d.ts"/>
/// <reference path="../../declarations/weather/WeatherType.d.ts"/>
/// <reference path="../../declarations/requirements/WeatherRequirement.d.ts"/>
/// <reference path="../../declarations/subRegion/SubRegions.d.ts"/>
/*
KANTO
*/
Routes.add(new RegionRoute(
    'Kanto Route 1', GameConstants.Region.kanto, 1,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata'],
    }),
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 22', GameConstants.Region.kanto, 22,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Mankey'],
        water: ['Psyduck', 'Poliwag', 'Slowpoke', 'Goldeen', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)],
    1.1,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 2', GameConstants.Region.kanto, 2,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Caterpie', 'Weedle'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 1)],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 3', GameConstants.Region.kanto, 3,
    new RoutePokemon({
        land: ['Pidgey', 'Spearow', 'Nidoran(F)', 'Nidoran(M)', 'Jigglypuff', 'Mankey'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 2),
        new GymBadgeRequirement(BadgeEnums.Boulder),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 4', GameConstants.Region.kanto, 4,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Mankey'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 3),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Moon')),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 24', GameConstants.Region.kanto, 24,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Oddish', 'Abra', 'Bellsprout'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 4)],
    4.1,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 25', GameConstants.Region.kanto, 25,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Oddish', 'Abra', 'Bellsprout'],
        water: ['Psyduck', 'Poliwag', 'Tentacool', 'Slowpoke', 'Goldeen', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 24)],
    4.2,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 5', GameConstants.Region.kanto, 5,
    new RoutePokemon({
        land: ['Pidgey', 'Meowth', 'Oddish', 'Bellsprout'],
    }),
    [
        // Need to reach bills house
        new RouteKillRequirement(10, GameConstants.Region.kanto, 25),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 6', GameConstants.Region.kanto, 6,
    new RoutePokemon({
        land: ['Pidgey', 'Meowth', 'Oddish', 'Bellsprout'],
        water: ['Psyduck', 'Poliwag', 'Slowpoke', 'Goldeen', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 5)],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 11', GameConstants.Region.kanto, 11,
    new RoutePokemon({
        land: ['Spearow', 'Ekans', 'Sandshrew', 'Drowzee'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 6)],
    6.1,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 9', GameConstants.Region.kanto, 9,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Ekans', 'Sandshrew'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 6),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 10', GameConstants.Region.kanto, 10,
    new RoutePokemon({
        land: ['Spearow', 'Ekans', 'Sandshrew', 'Voltorb'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 9),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Rock Tunnel')),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 8', GameConstants.Region.kanto, 8,
    new RoutePokemon({
        land: ['Pidgey', 'Ekans', 'Sandshrew', 'Vulpix', 'Meowth', 'Growlithe'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
    10.1,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 7', GameConstants.Region.kanto, 7,
    new RoutePokemon({
        land: ['Pidgey', 'Vulpix', 'Oddish', 'Meowth', 'Growlithe', 'Bellsprout'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 8)],
    10.2,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 12', GameConstants.Region.kanto, 12,
    new RoutePokemon({
        land: ['Pidgey', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d'],
        water: ['Poliwag', 'Slowpoke', 'Slowbro', 'Goldeen', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 10)],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 13', GameConstants.Region.kanto, 13,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Ditto'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [
        new OneFromManyRequirement([
            new TemporaryBattleRequirement('Snorlax route 12'),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 14),
        ]),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 14', GameConstants.Region.kanto, 14,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Ditto'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 13),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ]),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 15', GameConstants.Region.kanto, 15,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Ditto'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 14),
        ]),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 16', GameConstants.Region.kanto, 16,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Doduo'],
    }),
    [
        new OneFromManyRequirement([
            new TemporaryBattleRequirement('Snorlax route 16'),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 17),
        ]),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 17', GameConstants.Region.kanto, 17,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 16),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 18),
        ]),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 18', GameConstants.Region.kanto, 18,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 17),
            new RouteKillRequirement(10, GameConstants.Region.kanto, 15),
        ]),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 19', GameConstants.Region.kanto, 19,
    new RoutePokemon({
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Soul)],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 20', GameConstants.Region.kanto, 20,
    new RoutePokemon({
        water: ['Tentacool', 'Krabby', 'Horsea', 'Shellder', 'Staryu', 'Magikarp'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.kanto, 21),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seafoam Islands')),
        ]),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 21', GameConstants.Region.kanto, 21,
    new RoutePokemon({
        land: ['Tangela'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Shellder', 'Staryu', 'Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Soul)],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Kanto Route 23', GameConstants.Region.kanto, 23,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Ekans', 'Arbok', 'Sandshrew', 'Sandslash', 'Mankey', 'Primeape'],
        water: ['Psyduck', 'Poliwag', 'Slowpoke', 'Goldeen', 'Magikarp'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.kanto, 22),
        new GymBadgeRequirement(BadgeEnums.Earth),
    ],
    undefined,
    GameConstants.KantoSubRegions.Kanto
));
Routes.add(new RegionRoute(
    'Treasure Beach', GameConstants.Region.kanto, 26,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Meowth', 'Persian', 'Psyduck', 'Slowpoke', 'Tangela'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Volcano)],
    21.1,
    GameConstants.KantoSubRegions.Sevii123,
    true,
    37487
));
Routes.add(new RegionRoute(
    'Kindle Road', GameConstants.Region.kanto, 27,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Meowth', 'Persian', 'Psyduck', 'Geodude', 'Ponyta', 'Rapidash', 'Slowpoke'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Volcano)],
    21.2,
    GameConstants.KantoSubRegions.Sevii123,
    true,
    37487
));
Routes.add(new RegionRoute(
    'Cape Brink', GameConstants.Region.kanto, 28,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Oddish', 'Gloom', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Bellsprout', 'Weepinbell', 'Slowpoke', 'Slowbro'],
        water: ['Psyduck', 'Golduck', 'Poliwag', 'Slowpoke', 'Slowbro', 'Goldeen', 'Magikarp'],
    }),
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 0)],
    21.3,
    GameConstants.KantoSubRegions.Sevii123,
    true,
    37487
));
Routes.add(new RegionRoute(
    'Bond Bridge', GameConstants.Region.kanto, 29,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Meowth', 'Persian', 'Psyduck', 'Bellsprout', 'Weepinbell', 'Slowpoke'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 3)],
    21.4,
    GameConstants.KantoSubRegions.Sevii123,
    true,
    37487
));
Routes.add(new RegionRoute(
    'Five Isle Meadow', GameConstants.Region.kanto, 30,
    new RoutePokemon({
        land: ['Sentret', 'Pidgey', 'Pidgeotto', 'Hoppip', 'Meowth', 'Persian', 'Psyduck', 'Slowpoke'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler'],
    }),
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Memorial Pillar', GameConstants.Region.kanto, 31,
    new RoutePokemon({
        water: ['Hoppip', 'Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 30)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Water Labyrinth', GameConstants.Region.kanto, 32,
    new RoutePokemon({
        water: ['Hoppip', 'Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Resort Gorgeous', GameConstants.Region.kanto, 33,
    new RoutePokemon({
        water: ['Hoppip', 'Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 32)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Water Path', GameConstants.Region.kanto, 34,
    new RoutePokemon({
        land: ['Sentret', 'Spearow', 'Fearow', 'Oddish', 'Bellsprout', 'Meowth', 'Gloom', 'Weepinbell', 'Persian', 'Psyduck', 'Slowpoke'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler'],
    }),
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Green Path', GameConstants.Region.kanto, 35,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Pattern Bush'))],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Outcast Island', GameConstants.Region.kanto, 36,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 35)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Ruin Valley', GameConstants.Region.kanto, 37,
    new RoutePokemon({
        land: ['Natu', 'Spearow', 'Fearow', 'Meowth', 'Yanma', 'Wooper', 'Marill', 'Persian', 'Psyduck', 'Slowpoke', 'Wobbuffet'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Poliwhirl', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 34)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Canyon Entrance', GameConstants.Region.kanto, 38,
    new RoutePokemon({
        land: ['Sentret', 'Spearow', 'Fearow', 'Phanpy', 'Meowth', 'Persian', 'Psyduck', 'Slowpoke'],
    }),
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Sevault Canyon', GameConstants.Region.kanto, 39,
    new RoutePokemon({
        land: ['Geodude', 'Phanpy', 'Fearow', 'Meowth', 'Cubone', 'Marowak', 'Persian', 'Onix', 'Skarmory', 'Larvitar'],
        headbutt: ['Graveler'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 38)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1050000
));
Routes.add(new RegionRoute(
    'Valencia Island', GameConstants.Region.kanto, 40,
    new RoutePokemon({
        land: ['Valencian Butterfree', 'Valencian Raticate', 'Valencian Vileplume', 'Valencian Paras', 'Valencian Weepinbell', 'Nidoran(M)', 'Nidoran(F)', 'Nidorina'],
        water: ['Gyarados', 'Cloyster', 'Poliwhirl'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Jade_Star)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1250000
));

Routes.add(new RegionRoute(
    'Pinkan Forest', GameConstants.Region.kanto, 41,
    new RoutePokemon({
        land: ['Pinkan Caterpie', 'Pinkan Weedle', 'Pinkan Pidgey', 'Pinkan Vileplume', 'Pinkan Paras', 'Pinkan Venonat', 'Pinkan Mankey', 'Pinkan Exeggutor'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Altering Cave')),
        new QuestLineCompletedRequirement('Celio\'s Errand'),
    ],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1250000
));
Routes.add(new RegionRoute(
    'Pinkan Plains', GameConstants.Region.kanto, 42,
    new RoutePokemon({
        land: ['Pinkan Pidgey', 'Pinkan Rattata', 'Pinkan Nidoran(M)', 'Pinkan Nidoran(F)', 'Pinkan Diglett', 'Pinkan Bellsprout'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kanto, 41)],
    undefined,
    GameConstants.KantoSubRegions.Sevii4567,
    true,
    1250000
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
        land: ['Pidgey', 'Nidoran(M)', 'Nidoran(F)', 'Vulpix', 'Growlithe', 'Hoothoot', 'Stantler'],
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
    [new TemporaryBattleRequirement('Sudowoodo')]
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
    [
        new OneFromManyRequirement([
            new MultiRequirement([
                new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Mortar')),
                new GymBadgeRequirement(BadgeEnums.Fog),
            ]),
            new RouteKillRequirement(10, GameConstants.Region.johto, 42),
        ]),
    ]
));
Routes.add(new RegionRoute(
    'Johto Route 44', GameConstants.Region.johto, 44,
    new RoutePokemon({
        land: ['Bellsprout', 'Weepinbell', 'Lickitung', 'Tangela'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Remoraid'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Radio Tower'))]
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
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tohjo Falls'))],
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
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Granite Cave'))]
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
          new SpecialRoutePokemon(['Castform (Sunny)'], new MultiRequirement([
              new ObtainedPokemonRequirement(pokemonMap.Castform),
              new WeatherRequirement([WeatherType.Sunny]),
          ])),
          new SpecialRoutePokemon(['Castform (Rainy)'], new MultiRequirement([
              new ObtainedPokemonRequirement(pokemonMap.Castform),
              new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm]),
          ])),
          new SpecialRoutePokemon(['Castform (Snowy)'], new MultiRequirement([
              new ObtainedPokemonRequirement(pokemonMap.Castform),
              new WeatherRequirement([WeatherType.Snow, WeatherType.Blizzard, WeatherType.Hail, WeatherType.Fog]),
          ])),
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
    [
        new RouteKillRequirement(10, GameConstants.Region.hoenn, 119),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute')),
    ]
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
    [new RouteKillRequirement(10, GameConstants.Region.hoenn, 121)]
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
        land: ['Hoothoot', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Bidoof', 'Kricketot', 'Budew', 'Buizel', 'Shellos (West)'],
        water: ['Psyduck', 'Golduck', 'Tentacool', 'Tentacruel', 'Shellder', 'Magikarp', 'Gyarados', 'Shellos (West)', 'Gastrodon (West)', 'Finneon', 'Lumineon', 'Barboach', 'Whiscash'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Valley Windworks'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 206', GameConstants.Region.sinnoh, 206,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Gligar', 'Kricketune', 'Stunky'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building'))]
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
        land: ['Zubat', 'Ralts', 'Roselia', 'Bidoof', 'Bibarel', 'Budew'],
        water: ['Psyduck', 'Golduck', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Coronet South'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 209', GameConstants.Region.sinnoh, 209,
    new RoutePokemon({
        land: ['Zubat', 'Chansey', 'Ralts', 'Roselia', 'Duskull', 'Staravia', 'Bibarel'],
        water: ['Psyduck', 'Golduck', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Relic)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 210', GameConstants.Region.sinnoh, 210,
    new RoutePokemon({
        land: ['Psyduck', 'Machop', 'Machoke', 'Geodude', 'Ponyta', 'Chansey', 'Scyther', 'Hoothoot', 'Noctowl', 'Roselia', 'Meditite', 'Swablu', 'Bibarel', 'Staravia'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 209)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 215', GameConstants.Region.sinnoh, 215,
    new RoutePokemon({
        land: ['Abra', 'Kadabra', 'Lickitung', 'Scyther', 'Marill', 'Staravia'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 210)],
    210.1
));
Routes.add(new RegionRoute(
    'Sinnoh Route 214', GameConstants.Region.sinnoh, 214,
    new RoutePokemon({
        land: ['Zubat', 'Geodude', 'Graveler', 'Rhyhorn', 'Houndour', 'Stunky'],
        water: ['Psyduck', 'Golduck', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 215)],
    210.2
));
Routes.add(new RegionRoute(
    'Sinnoh Route 213', GameConstants.Region.sinnoh, 213,
    new RoutePokemon({
        land: ['Wingull', 'Buizel', 'Shellos (East)', 'Chatot'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Wingull', 'Shellos (East)', 'Gastrodon (East)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 214)],
    210.3
));
Routes.add(new RegionRoute(
    'Sinnoh Route 212', GameConstants.Region.sinnoh, 212,
    new RoutePokemon({
        land: ['Marill', 'Quagsire', 'Ralts', 'Kirlia', 'Roselia', 'Staravia', 'Buizel', 'Shellos (East)', 'Croagunk'],
        water: ['Psyduck', 'Golduck', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Shellos (East)', 'Gastrodon (East)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 213)],
    210.4
));
Routes.add(new RegionRoute(
    'Sinnoh Route 211', GameConstants.Region.sinnoh, 211,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Machoke', 'Graveler', 'Hoothoot', 'Noctowl', 'Meditite', 'Bidoof', 'Chingling', 'Bronzor'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fen)],
    210.5
));
Routes.add(new RegionRoute(
    'Sinnoh Route 218', GameConstants.Region.sinnoh, 218,
    new RoutePokemon({
        land: ['Mr. Mime', 'Floatzel', 'Gastrodon (West)', 'Glameow', 'Chatot'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Shellos (West)', 'Gastrodon (West)', 'Finneon', 'Lumineon'],
    }),
    [new TemporaryBattleRequirement('Galactic Boss Cyrus')],
    210.6
));
Routes.add(new RegionRoute(
    'Sinnoh Route 216', GameConstants.Region.sinnoh, 216,
    new RoutePokemon({
        land: ['Zubat', 'Graveler', 'Sneasel', 'Meditite', 'Snorunt', 'Snover'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Coronet North'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 217', GameConstants.Region.sinnoh, 217,
    new RoutePokemon({
        land: ['Sneasel', 'Swinub', 'Snorunt', 'Snover'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 216)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 219', GameConstants.Region.sinnoh, 219,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Wingull', 'Pelipper', 'Clamperl', 'Finneon', 'Lumineon'],
    }),
    [new TemporaryBattleRequirement('Galactic Boss Cyrus')]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 220', GameConstants.Region.sinnoh, 220,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Chinchou', 'Wingull', 'Pelipper', 'Finneon', 'Lumineon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 219)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 221', GameConstants.Region.sinnoh, 221,
    new RoutePokemon({
        land: ['Sudowoodo', 'Girafarig', 'Roselia', 'Floatzel', 'Shellos (West)', 'Gastrodon (West)', 'Stunky', 'Skuntank'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Pelipper', 'Clamperl', 'Finneon', 'Lumineon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 220)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 222', GameConstants.Region.sinnoh, 222,
    new RoutePokemon({
        land: ['Magnemite', 'Magneton', 'Electabuzz', 'Wingull', 'Pelipper', 'Luxio', 'Floatzel', 'Gastrodon (East)', 'Glameow', 'Purugly', 'Chatot'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Wingull', 'Pelipper', 'Sharpedo'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 223', GameConstants.Region.sinnoh, 223,
    new RoutePokemon({
        water: ['Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Pelipper', 'Wailmer', 'Wailord', 'Mantyke'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Beacon)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 224', GameConstants.Region.sinnoh, 224,
    new RoutePokemon({
        land: ['Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Beautifly', 'Dustox', 'Roselia', 'Floatzel', 'Gastrodon (East)', 'Chatot'],
        water: ['Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Pelipper', 'Luvdisc', 'Gastrodon (East)'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 225', GameConstants.Region.sinnoh, 225,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Machoke', 'Graveler', 'Skuntank', 'Banette'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 226', GameConstants.Region.sinnoh, 226,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Fearow', 'Machoke', 'Graveler', 'Wingull', 'Banette'],
        water: ['Tentacruel', 'Horsea', 'Seadra', 'Magikarp', 'Gyarados', 'Wingull', 'Pelipper', 'Relicanth'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 225)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 227', GameConstants.Region.sinnoh, 227,
    new RoutePokemon({
        land: ['Fearow', 'Golbat', 'Graveler', 'Weezing', 'Rhyhorn', 'Rhydon', 'Skarmory', 'Numel', 'Camerupt'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 226)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 228', GameConstants.Region.sinnoh, 228,
    new RoutePokemon({
        land: ['Diglett', 'Dugtrio', 'Rhydon', 'Cacnea', 'Cacturne', 'Hippowdon'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 226)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 229', GameConstants.Region.sinnoh, 229,
    new RoutePokemon({
        land: ['Pidgey', 'Ledian', 'Ariados', 'Beautifly', 'Dustox', 'Volbeat', 'Illumise', 'Roselia', 'Purugly'],
        water: ['Surskit', 'Masquerain', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.sinnoh, 228)]
));
Routes.add(new RegionRoute(
    'Sinnoh Route 230', GameConstants.Region.sinnoh, 230,
    new RoutePokemon({
        land: ['Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Wingull', 'Pelipper', 'Roselia', 'Floatzel'],
        water: ['Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Wingull', 'Pelipper', 'Wailmer', 'Wailord', 'Sealeo'],
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
    [
        new GymBadgeRequirement(BadgeEnums.Toxic),
        new TemporaryBattleRequirement('Team Plasma Grunt 1'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 1),
    ]
));
Routes.add(new RegionRoute(
    'Desert Resort', GameConstants.Region.unova, 25,
    new RoutePokemon({
        land: ['Sandshrew', 'Trapinch', 'Maractus', 'Darumaka', 'Dwebble', 'Scraggy', 'Sigilyph', 'Sandile'],
        water: [],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 4),
        new GymBadgeRequirement(BadgeEnums.Insect),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 2),
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
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 2),
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
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 2),
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
        new TemporaryBattleRequirement('Team Plasma Grunt 2'),
        new TemporaryBattleRequirement('Team Plasma Grunt 3'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 4),
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
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 7),
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
    [
        new RouteKillRequirement(10, GameConstants.Region.unova, 13),
        new TemporaryBattleRequirement('Zinzolin 1'),
        new QuestLineStepCompletedRequirement('Quest for the DNA Splicers', 10),
    ],
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
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm')),
        new TemporaryBattleRequirement('Ghetsis 2'),
        new QuestLineCompletedRequirement('Quest for the DNA Splicers'),
    ]
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
        land: ['Bunnelby', 'Fletchling'],
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
        land: ['Pidgey', 'Pikachu', 'Dunsparce', 'Azurill', 'Bidoof', 'Burmy (Plant)', 'Bunnelby', 'Fletchling', 'Dunsparce'],
        water: ['Magikarp', 'Goldeen', 'Marill', 'Masquerain'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Santalune Forest'))]
));
Routes.add(new RegionRoute(
    'Kalos Route 22', GameConstants.Region.kalos, 22,
    new RoutePokemon({
        land: ['Psyduck', 'Farfetch\'d', 'Azumarill', 'Dunsparce', 'Azurill', 'Bidoof', 'Bibarel', 'Riolu', 'Bunnelby', 'Diggersby', 'Litleo'],
        water: ['Magikarp', 'Goldeen', 'Azumarill', 'Carvanha'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 3)],
    3.1
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
    [new RouteKillRequirement(10, GameConstants.Region.kalos, 6)]
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
    [
        new GymBadgeRequirement(BadgeEnums.Cliff),
        new RouteKillRequirement(10, GameConstants.Region.kalos, 10),
    ]
));
Routes.add(new RegionRoute(
    'Kalos Route 12', GameConstants.Region.kalos, 12,
    new RoutePokemon({
        land: ['Slowpoke', 'Exeggcute', 'Pinsir', 'Tauros', 'Heracross', 'Miltank', 'Pachirisu', 'Chatot'],
        water: ['Tentacool', 'Lapras', 'Remoraid', 'Clamperl', 'Mantyke'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Rumble)]
    // Replace req with Tower of Mastery dungeon if implemented.
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
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Poké Ball Factory'))]
    // Replace req with Poké Ball Factory dungeon if implemented.
));
Routes.add(new RegionRoute(
    'Kalos Route 16', GameConstants.Region.kalos, 16,
    new RoutePokemon({
        land: ['Weepinbell', 'Floatzel', 'Skorupi', 'Foongus', 'Klefki', 'Phantump', 'Pumpkaboo (Average)', 'Pumpkaboo (Small)', 'Pumpkaboo (Large)', 'Pumpkaboo (Super Size)'],
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
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
    undefined,
    GameConstants.AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Route 1 Hau\'oli Outskirts', GameConstants.Region.alola, 18,
    new RoutePokemon({
        land: ['Slowpoke', 'Wingull', 'Inkay'],
        water: ['Tentacool', 'Mantyke', 'Finneon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 1)],
    1.1,
    GameConstants.AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Alola Route 2', GameConstants.Region.alola, 2,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Spearow', 'Ekans', 'Alolan Meowth', 'Growlithe', 'Abra', 'Drowzee', 'Smeargle', 'Makuhita', 'Furfrou', 'Yungoos', 'Cutiefly'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Trainers\' School'))],
    undefined,
    GameConstants.AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Alola Route 3', GameConstants.Region.alola, 3,
    new RoutePokemon({
        land: ['Spearow', 'Mankey', 'Bagon', 'Rufflet', 'Vullaby', 'Hawlucha', 'Cutiefly'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Verdant Cavern'))],
    undefined,
    GameConstants.AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Melemele Sea', GameConstants.Region.alola, 19,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Corsola', 'Remoraid', 'Wingull', 'Clamperl', 'Luvdisc', 'Mantyke', 'Finneon', 'Wishiwashi (Solo)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill'))],
    5.1,
    GameConstants.AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Kala\'e Bay', GameConstants.Region.alola, 20,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Slowpoke', 'Wingull', 'Bagon', 'Yungoos'],
        water: ['Tentacool', 'Shellder', 'Magikarp', 'Remoraid', 'Wingull', 'Finneon', 'Mantyke', 'Wishiwashi (Solo)'],
    }),
    [
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Seaward Cave')),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill')),
    ],
    5.2,
    GameConstants.AlolaSubRegions.MelemeleIsland
));
Routes.add(new RegionRoute(
    'Alola Route 4', GameConstants.Region.alola, 4,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Eevee', 'Igglybuff', 'Lillipup', 'Pikipek', 'Yungoos', 'Grubbin', 'Mudbray'],
    }),
    [new GymBadgeRequirement(BadgeEnums.FightiniumZ)],
    undefined,
    GameConstants.AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 5', GameConstants.Region.alola, 5,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Butterfree', 'Bonsly', 'Lillipup', 'Pikipek', 'Trumbeak', 'Grubbin', 'Fomantis'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Paniola Ranch'))],
    undefined,
    GameConstants.AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 6', GameConstants.Region.alola, 6,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Eevee', 'Igglybuff', 'Lillipup', 'Pikipek', 'Yungoos', 'Grubbin', 'Mudbray'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brooklet Hill'))],
    undefined,
    GameConstants.AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 7', GameConstants.Region.alola, 7,
    new RoutePokemon({
        water: ['Tentacool', 'Staryu', 'Magikarp', 'Wingull', 'Finneon', 'Wishiwashi (Solo)', 'Pyukumuku'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 6)],
    undefined,
    GameConstants.AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 8', GameConstants.Region.alola, 8,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Fletchling', 'Trumbeak', 'Yungoos', 'Stufful'],
        water: ['Tentacool', 'Magikarp', 'Chinchou', 'Remoraid', 'Finneon', 'Mantyke', 'Wishiwashi (Solo)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Wela Volcano Park'))],
    undefined,
    GameConstants.AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 9', GameConstants.Region.alola, 9,
    new RoutePokemon({
        water: ['Magikarp', 'Corsola', 'Luvdisc', 'Wishiwashi (Solo)', 'Mareanie'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Diglett\'s Tunnel'))],
    undefined,
    GameConstants.AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Akala Outskirts', GameConstants.Region.alola, 21,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Natu', 'Wingull', 'Nosepass', 'Gumshoos', 'Stufful'],
        water: ['Magikarp', 'Chinchou', 'Wishiwashi (Solo)'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Memorial Hill'))],
    9.1,
    GameConstants.AlolaSubRegions.AkalaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 10', GameConstants.Region.alola, 10,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Ledian', 'Ariados', 'Skarmory', 'Pancham', 'Gumshoos'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Malie Garden'))],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Mount Hokulani', GameConstants.Region.alola, 22,
    new RoutePokemon({
        land: ['Fearow', 'Ditto', 'Cleffa', 'Skarmory', 'Elekid', 'Beldum', 'Elgyem', 'Minior (Meteor)', 'Minior (Blue Core)', 'Minior (Green Core)', 'Minior (Indigo Core)', 'Minior (Orange Core)', 'Minior (Red Core)', 'Minior (Violet Core)', 'Minior (Yellow Core)'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 10)],
    10.1,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 11', GameConstants.Region.alola, 11,
    new RoutePokemon({
        land: ['Parasect', 'Ledian', 'Ariados', 'Pancham', 'Trumbeak', 'Komala'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Malie Garden'))],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 12', GameConstants.Region.alola, 12,
    new RoutePokemon({
        land: ['Alolan Geodude', 'Alolan Graveler', 'Houndoom', 'Manectric', 'Torkoal', 'Mudbray'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.alola, 11),
        new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Hokulani Observatory')),
    ],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 13', GameConstants.Region.alola, 13,
    new RoutePokemon({
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Bruxish'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 12)],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 14', GameConstants.Region.alola, 14,
    new RoutePokemon({
        water: ['Tentacruel', 'Magikarp', 'Pelipper', 'Finneon', 'Frillish', 'Wishiwashi (Solo)', 'Bruxish'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 13)],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Haina Desert', GameConstants.Region.alola, 23,
    new RoutePokemon({
        land: ['Alolan Dugtrio', 'Trapinch', 'Baltoy', 'Gabite', 'Krokorok', 'Golett'],
        special: [new SpecialRoutePokemon(['Celesteela'], new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 11))],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 15', GameConstants.Region.alola, 15,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Slowpoke', 'Pelipper', 'Gumshoos', 'Sandygast'],
        water: ['Tentacruel', 'Magikarp', 'Clamperl', 'Finneon', 'Wishiwashi (Solo)', 'Bruxish'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Thrifty Megamart'))],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 16', GameConstants.Region.alola, 16,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Slowpoke', 'Pelipper', 'Scraggy', 'Gumshoos'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 15)],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Alola Route 17', GameConstants.Region.alola, 17,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Alolan Graveler', 'Ledian', 'Ariados', 'Scraggy', 'Bisharp', 'Gumshoos'],
        special: [new SpecialRoutePokemon(['Kartana'], new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 11))],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Ula\'ula Meadow'))],
    undefined,
    GameConstants.AlolaSubRegions.UlaulaIsland
));
Routes.add(new RegionRoute(
    'Poni Wilds', GameConstants.Region.alola, 24,
    new RoutePokemon({
        land: ['Granbull', 'Pelipper', 'Gastrodon (East)', 'Furfrou', 'Inkay'],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Aether Foundation'))],
    undefined,
    GameConstants.AlolaSubRegions.PoniIsland
));
Routes.add(new RegionRoute(
    'Ancient Poni Path', GameConstants.Region.alola, 25,
    new RoutePokemon({
        land: ['Granbull', 'Pelipper', 'Gastrodon (East)', 'Furfrou', 'Inkay'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 24)],
    undefined,
    GameConstants.AlolaSubRegions.PoniIsland
));
Routes.add(new RegionRoute(
    'Poni Breaker Coast', GameConstants.Region.alola, 26,
    new RoutePokemon({
        water: ['Tentacruel', 'Lapras', 'Magikarp', 'Pelipper', 'Carvanha', 'Wailmer', 'Relicanth', 'Gastrodon (East)', 'Lumineon'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 25)],
    undefined,
    GameConstants.AlolaSubRegions.PoniIsland
));
Routes.add(new RegionRoute(
    'Poni Grove', GameConstants.Region.alola, 27,
    new RoutePokemon({
        land: ['Pinsir', 'Heracross', 'Buneary', 'Riolu', 'Zoroark', 'Trumbeak'],
        special: [
            new SpecialRoutePokemon(['Blacephalon'], new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 15)),
            new SpecialRoutePokemon(['Stakataka'], new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 15)),
        ],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
    undefined,
    GameConstants.AlolaSubRegions.PoniIsland
));
Routes.add(new RegionRoute(
    'Poni Plains', GameConstants.Region.alola, 28,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Hypno', 'Tauros', 'Miltank', 'Pelipper', 'Hariyama', 'Cottonee', 'Petilil', 'Trumbeak', 'Gumshoos', 'Mudsdale'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 27)],
    undefined,
    GameConstants.AlolaSubRegions.PoniIsland
));
Routes.add(new RegionRoute(
    'Poni Coast', GameConstants.Region.alola, 29,
    new RoutePokemon({
        land: ['Alolan Dugtrio'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 28)],
    undefined,
    GameConstants.AlolaSubRegions.PoniIsland
));
Routes.add(new RegionRoute(
    'Poni Gauntlet', GameConstants.Region.alola, 30,
    new RoutePokemon({
        land: ['Pelipper', 'Lickitung', 'Golduck', 'Granbull', 'Inkay', 'Bewear'],
        water: ['Magikarp', 'Dratini', 'Barboach'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.alola, 29)],
    undefined,
    GameConstants.AlolaSubRegions.PoniIsland
));

/*
GALAR
*/
Routes.add(new RegionRoute(
    'Galar Route 1', GameConstants.Region.galar, 1,
    new RoutePokemon({
        land: ['Skwovet', 'Rookidee', 'Blipbug', 'Wooloo', 'Nickit', 'Caterpie', 'Hoothoot', 'Grubbin'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 2', GameConstants.Region.galar, 2,
    new RoutePokemon({
        land: ['Skwovet', 'Rookidee', 'Nickit', 'Chewtle', 'Yamper', 'Galarian Zigzagoon', 'Blipbug', 'Seedot', 'Hoothoot', 'Lotad', 'Purrloin'],
        water: ['Magikarp', 'Arrokuda'],
    }),
    [
        new RouteKillRequirement(10, GameConstants.Region.galar, 1),
        new TemporaryBattleRequirement('Mirages'),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
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
    [new TemporaryBattleRequirement('Hop2')],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
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
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'West Lake Axwell', GameConstants.Region.galar, 5,
    new RoutePokemon({
        water: ['Goldeen', 'Magikarp', 'Remoraid', 'Wishiwashi (Solo)', 'Drednaw', 'Gyarados'],
        special:
      [
          new SpecialRoutePokemon(['Krabby', 'Wooper', 'Wingull', 'Bounsweet', 'Purrloin', 'Tympole', 'Frillish', 'Kingler', 'Quagsire', 'Pelipper', 'Cloyster', 'Lapras', 'Seaking'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Krabby', 'Wooper', 'Tyrogue', 'Pancham', 'Lotad', 'Seedot', 'Budew', 'Purrloin', 'Tympole', 'Frillish', 'Palpitoad', 'Quagsire', 'Pelipper', 'Jellicent', 'Seaking'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Krabby', 'Wooper', 'Wingull', 'Tympole', 'Frillish', 'Pelipper', 'Quagsire', 'Jellicent', 'Lapras'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Krabby', 'Electrike', 'Tympole', 'Joltik', 'Wooper', 'Wingull', 'Chinchou', 'Pelipper', 'Quagsire', 'Lanturn', 'Lapras'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Delibird', 'Wingull', 'Snorunt', 'Vanillite', 'Purrloin', 'Tympole', 'Shellder', 'Frillish', 'Palpitoad', 'Diggersby', 'Vanilluxe', 'Lapras'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Delibird', 'Vanillite', 'Klink', 'Bunnelby', 'Krabby', 'Tympole', 'Frillish', 'Palpitoad', 'Vanilluxe', 'Lapras'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Baltoy', 'Bunnelby', 'Pancham', 'Purrloin', 'Dwebble', 'Frillish', 'Diggersby', 'Pelipper'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Wooper', 'Nincada', 'Baltoy', 'Mudbray', 'Purrloin', 'Dwebble', 'Bunnelby', 'Frillish', 'Palpitoad', 'Diggersby', 'Seaking'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Krabby', 'Natu', 'Wingull', 'Ralts', 'Wooper', 'Purrloin', 'Tympole', 'Frillish', 'Palpitoad', 'Quagsire', 'Jellicent', 'Cloyster', 'Lapras'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
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
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
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
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 8),
            new RouteKillRequirement(10, GameConstants.Region.galar, 9),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
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
    [new RouteKillRequirement(10, GameConstants.Region.galar, 3)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
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
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 6),
            new RouteKillRequirement(10, GameConstants.Region.galar, 7),
            new RouteKillRequirement(10, GameConstants.Region.galar, 8),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Axew\'s Eye', GameConstants.Region.galar, 10,
    new RoutePokemon({
        land: ['Diggersby', 'Bewear'],
        headbutt: ['Greedent', 'Cherubi'],
        water: ['Octillery', 'Magikarp', 'Wishiwashi (Solo)', 'Gyarados'],
        special:
      [
          new SpecialRoutePokemon(['Kingler', 'Axew', 'Machoke', 'Unfezant', 'Steenee', 'Haxorus', 'Cramorant'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Machoke', 'Axew', 'Kingler', 'Roselia', 'Gloom', 'Unfezant', 'Haxorus', 'Cramorant'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Crawdaunt', 'Axew', 'Seismitoad', 'Pelipper', 'Charjabug', 'Unfezant', 'Haxorus', 'Cramorant (Gulping)'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Seismitoad', 'Crawdaunt', 'Kingler', 'Manectric', 'Unfezant', 'Cramorant (Gorging)'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Snover', 'Vanillish', 'Delibird', 'Unfezant', 'Abomasnow', 'Cramorant'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cramorant'], new WeatherRequirement([WeatherType.Hail, WeatherType.Windy])),
          new SpecialRoutePokemon(['Snover', 'Bronzong', 'Vanillish', 'Klink', 'Delibird', 'Abomasnow', 'Cramorant'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Crustle', 'Mudsdale', 'Vulpix', 'Growlithe', 'Unfezant', 'Haxorus', 'Cramorant'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Mudsdale', 'Crustle', 'Claydol', 'Baltoy', 'Haxorus', 'Cramorant'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Drifblim', 'Claydol', 'Axew', 'Munna', 'Liepard', 'Unfezant', 'Haxorus', 'Cramorant'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 6),
            new RouteKillRequirement(10, GameConstants.Region.galar, 25),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Watchtower Ruins', GameConstants.Region.galar, 11,
    new RoutePokemon({
        land: ['Duskull', 'Corviknight', 'Woobat', 'Noibat'],
        headbutt: ['Skwovet', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Golett', 'Drifloon', 'Bounsweet', 'Pidove', 'Drifblim', 'Golurk'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Gastly', 'Oddish', 'Drifloon', 'Machop', 'Bounsweet', 'Haunter', 'Dusclops'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Gastly', 'Wingull', 'Purrloin', 'Tympole', 'Pidove', 'Haunter', 'Dusclops'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Gastly', 'Drifloon', 'Purrloin', 'Electrike', 'Grubbin', 'Pidove', 'Haunter', 'Dusclops'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Drifloon', 'Delibird', 'Snorunt', 'Snover', 'Drifblim', 'Glalie'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Delibird', 'Gastly', 'Purrloin', 'Snover', 'Snorunt', 'Drifloon', 'Haunter', 'Glalie'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Drifloon', 'Vulpix', 'Growlithe', 'Shuckle', 'Golett', 'Drifblim', 'Golurk'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Gastly', 'Shuckle', 'Purrloin', 'Golett', 'Dwebble', 'Pidove', 'Haunter', 'Dusclops'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Gastly', 'Ralts', 'Purrloin', 'Pidove', 'Haunter', 'Golurk'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 4),
            new RouteKillRequirement(10, GameConstants.Region.galar, 5),
            new RouteKillRequirement(10, GameConstants.Region.galar, 6),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 3', GameConstants.Region.galar, 12,
    new RoutePokemon({
        land: ['Gossifleur', 'Corvisquire', 'Rookidee', 'Rolycoly', 'Sizzlipede', 'Vulpix', 'Growlithe', 'Tyrogue', 'Galarian Zigzagoon', 'Stunky', 'Trubbish', 'Cherubi', 'Mudbray','Pancham', 'Klink', 'Machop'],
        headbutt: ['Skwovet', 'Cherubi'],
    }),
    [new TemporaryBattleRequirement('Hop3')],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 4', GameConstants.Region.galar, 13,
    new RoutePokemon({
        land: ['Yamper', 'Cutiefly', 'Wooloo', 'Milcery', 'Galarian Meowth', 'Budew', 'Ferroseed', 'Joltik', 'Pikachu', 'Eevee', 'Electrike', 'Pumpkaboo (Average)', 'Pumpkaboo (Small)', 'Pumpkaboo (Large)', 'Pumpkaboo (Super Size)', 'Diglett'],
        water: ['Magikarp', 'Goldeen', 'Chewtle'],
        headbutt: ['Skwovet'],
    }),
    [new TemporaryBattleRequirement('Bede1')],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 5', GameConstants.Region.galar, 14,
    new RoutePokemon({
        land: ['Dottler', 'Drifloon', 'Applin', 'Eldegoss', 'Galarian Farfetch\'d', 'Wobbuffet', 'Minccino', 'Spritzee', 'Swirlix', 'Stufful', 'Espurr', 'Nincada', 'Dewpider', 'Nuzleaf', 'Lombre'],
        water: ['Magikarp', 'Chewtle', 'Goldeen'],
        headbutt: ['Skwovet'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Grass)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Motostoke Outskirts', GameConstants.Region.galar, 15,
    new RoutePokemon({
        land: ['Impidimp', 'Chewtle', 'Koffing', 'Hatenna', 'Noctowl', 'Throh', 'Sawk', 'Sudowoodo', 'Salandit', 'Pawniard', 'Scraggy', 'Croagunk', 'Roggenrola'],
    }),
    [new TemporaryBattleRequirement('Bede2')],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Motostoke Riverbank', GameConstants.Region.galar, 16,
    new RoutePokemon({
        land: ['Purrloin', 'Corvisquire', 'Eldegoss', 'Sigilyph'],
        water: ['Arrokuda', 'Barraskewda', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Mareanie', 'Mantyke', 'Wailmer'],
        headbutt: ['Greedent', 'Skwovet', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Skorupi', 'Gossifleur', 'Wooloo', 'Munchlax', 'Noctowl', 'Dubwool', 'Snorlax', 'Drapion', 'Conkeldurr'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Koffing', 'Cutiefly', 'Rookidee', 'Sawk', 'Throh', 'Skorupi', 'Noctowl', 'Dubwool', 'Snorlax', 'Ribombee', 'Conkeldurr'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Skorupi', 'Wimpod', 'Chewtle', 'Dewpider', 'Karrablast', 'Shelmet', 'Binacle', 'Snorlax', 'Drapion', 'Conkeldurr'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Yamper', 'Skorupi', 'Mareanie', 'Chewtle', 'Shellos (East)', 'Wimpod', 'Boltund', 'Snorlax', 'Drapion', 'Conkeldurr'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Sneasel', 'Cutiefly', 'Vanillite', 'Wooloo', 'Noctowl', 'Snorlax', 'Ribombee', 'Conkeldurr'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Sneasel', 'Vanillite', 'Cutiefly', 'Pawniard', 'Ferroseed', 'Snorlax', 'Ribombee', 'Conkeldurr'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Rhyhorn', 'Skorupi', 'Salandit', 'Torkoal', 'Rolycoly', 'Litwick', 'Noctowl', 'Snorlax', 'Drapion', 'Rhydon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Skorupi', 'Sudowoodo', 'Rolycoly', 'Rhyhorn', 'Onix', 'Noctowl', 'Snorlax', 'Ribombee', 'Rhydon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Clefairy', 'Wobbuffet', 'Cutiefly', 'Duskull', 'Espurr', 'Elgyem', 'Noctowl', 'Clefable', 'Ribombee', 'Conkeldurr'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 9),
            new GymBadgeRequirement(BadgeEnums.Galar_Fire),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Bridge Field', GameConstants.Region.galar, 17,
    new RoutePokemon({
        land: ['Galarian Zigzagoon', 'Noibat', 'Palpitoad', 'Ferroseed', 'Garbodor', 'Galarian Linoone', 'Ferrothorn', 'Obstagoon', 'Woobat', 'Tranquill'],
        water: ['Drednaw', 'Lanturn', 'Qwilfish', 'Gyarados', 'Magikarp', 'Goldeen', 'Inkay'],
        headbutt: ['Greedent', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Cutiefly', 'Wobbuffet', 'Liepard', 'Togepi', 'Ribombee', 'Golisopod', 'Bewear', 'Seismitoad', 'Beheeyem', 'Noivern', 'Gallade', 'Seaking', 'Cufant'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Cutiefly', 'Scraggy', 'Croagunk', 'Sawk', 'Throh', 'Elgyem', 'Cufant', 'Karrablast', 'Thievul', 'Diggersby', 'Shelmet', 'Togepi', 'Ribombee', 'Drapion', 'Pangoro', 'Seismitoad', 'Beheeyem', 'Noivern', 'Gallade', 'Seaking'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Stufful', 'Cramorant (Gulping)', 'Bronzor', 'Binacle', 'Shellos (East)', 'Wimpod', 'Golisopod', 'Bewear', 'Seismitoad', 'Bronzong', 'Noivern', 'Gallade', 'Jellicent'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Stufful', 'Frillish', 'Bronzor', 'Binacle', 'Shellos (East)', 'Bewear', 'Golisopod', 'Seismitoad', 'Bronzong', 'Noivern', 'Gallade'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cubchoo', 'Sneasel', 'Stufful', 'Thievul', 'Vanillite', 'Vanilluxe', 'Bewear', 'Beheeyem', 'Noctowl', 'Beartic'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Sneasel', 'Cubchoo', 'Cufant', 'Mawile', 'Vanillite', 'Vanilluxe', 'Bewear', 'Beheeyem', 'Noivern', 'Weavile'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Maractus', 'Cutiefly', 'Wobbuffet', 'Baltoy', 'Cufant', 'Litwick', 'Thievul', 'Carkol', 'Ribombee', 'Rhydon', 'Pangoro', 'Bewear', 'Beheeyem', 'Noivern', 'Gallade', 'Pelipper'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Bonsly', 'Stufful', 'Scraggy', 'Croagunk', 'Baltoy', 'Rhyhorn', 'Rufflet', 'Sudowoodo', 'Bewear', 'Rhydon', 'Claydol', 'Noivern', 'Gallade', 'Seaking'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Cutiefly', 'Munna', 'Stufful', 'Elgyem', 'Milcery', 'Litwick', 'Thievul', 'Togepi', 'Ribombee', 'Mimikyu', 'Bewear', 'Seismitoad', 'Beheeyem', 'Noivern', 'Musharna', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 16)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Stony Wilderness', GameConstants.Region.galar, 18,
    new RoutePokemon({
        land: ['Baltoy', 'Golett', 'Rhydon', 'Dusknoir', 'Golurk', 'Grimmsnarl', 'Tranquill', 'Sigilyph'],
        special:
      [
          new SpecialRoutePokemon(['Galarian Zigzagoon', 'Ninjask', 'Tyrogue', 'Gurdurr', 'Boldore', 'Ribombee', 'Impidimp', 'Eldegoss', 'Claydol', 'Tsareena', 'Crustle'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Machoke', 'Scraggy', 'Croagunk', 'Galarian Zigzagoon', 'Cottonee', 'Swirlix', 'Spritzee', 'Ribombee', 'Impidimp', 'Claydol', 'Tsareena', 'Crustle', 'Unfezant'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Ninjask', 'Dewpider', 'Galarian Zigzagoon', 'Cramorant (Gulping)', 'Bronzor', 'Barboach', 'Shellos (East)', 'Impidimp', 'Pikachu', 'Bronzong', 'Araquanid'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Yamper', 'Dewpider', 'Pikachu', 'Bronzor', 'Gurdurr', 'Boldore', 'Impidimp', 'Applin', 'Bronzong', 'Araquanid'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cubchoo', 'Galarian Zigzagoon', 'Sneasel', 'Bronzor', 'Impidimp', 'Gurdurr', 'Boldore', 'Bronzong', 'Tsareena', 'Crustle'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Sneasel', 'Cubchoo', 'Galarian Zigzagoon', 'Ferroseed', 'Bronzor', 'Pawniard', 'Impidimp', 'Bronzong', 'Tsareena', 'Crustle'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Maractus', 'Galarian Zigzagoon', 'Salandit', 'Carkol', 'Gurdurr', 'Boldore', 'Impidimp', 'Drilbur', 'Claydol', 'Tsareena', 'Crustle'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Bonsly', 'Galarian Zigzagoon', 'Dwebble', 'Rhyhorn', 'Boldore', 'Drilbur', 'Shuckle', 'Claydol', 'Tsareena', 'Crustle'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Hatenna', 'Munna', 'Galarian Zigzagoon', 'Nickit', 'Bronzor', 'Thievul', 'Dottler', 'Impidimp', 'Togetic', 'Bronzong', 'Tsareena', 'Crustle'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 17)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Giant\'s Mirror', GameConstants.Region.galar, 19,
    new RoutePokemon({
        land: ['Koffing', 'Machop', 'Steelix', 'Perrserker', 'Shellos (East)', 'Gastrodon (East)', 'Dugtrio', 'Galarian Corsola', 'Boldore', 'Excadrill', 'Tranquill', 'Corvisquire'],
        water: ['Drednaw', 'Mareanie', 'Chinchou', 'Gyarados'],
        headbutt: ['Greedent', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Woobat', 'Pumpkaboo (Average)', 'Pumpkaboo (Small)', 'Pumpkaboo (Large)', 'Pumpkaboo (Super Size)', 'Nickit', 'Gloom', 'Skorupi', 'Dottler', 'Budew', 'Machamp', 'Bellossom', 'Unfezant', 'Frillish'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Butterfree', 'Sawk', 'Throh', 'Galarian Farfetch\'d', 'Gloom', 'Skorupi', 'Roselia', 'Dottler', 'Machamp', 'Vileplume', 'Unfezant', 'Frillish'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Wimpod', 'Palpitoad', 'Natu', 'Chewtle', 'Gloom', 'Skorupi', 'Dottler', 'Seismitoad', 'Vileplume', 'Xatu', 'Frillish'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Helioptile', 'Joltik', 'Yamper', 'Natu', 'Gloom', 'Applin', 'Skorupi', 'Machamp', 'Vileplume', 'Xatu', 'Frillish'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Vanillite', 'Cubchoo', 'Natu', 'Delibird', 'Swinub', 'Snover', 'Abomasnow', 'Vileplume', 'Xatu', 'Vikavolt', 'Inkay'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Pawniard', 'Vanillite', 'Cubchoo', 'Natu', 'Swinub', 'Snover', 'Machamp', 'Vileplume', 'Xatu', 'Vikavolt', 'Frillish'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Durant', 'Heatmor', 'Gloom', 'Diglett', 'Skorupi', 'Torkoal', 'Machamp', 'Sudowoodo', 'Unfezant', 'Vikavolt', 'Frillish'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Rhyhorn', 'Drilbur', 'Hippowdon', 'Diggersby', 'Dottler', 'Machamp', 'Vileplume', 'Xatu', 'Vikavolt', 'Frillish'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Swirlix', 'Spritzee','Morelull', 'Natu', 'Cutiefly', 'Gloom', 'Impidimp', 'Milcery', 'Mimikyu', 'Machamp', 'Sudowoodo', 'Xatu', 'Vikavolt', 'Frillish'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 18),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dusty Bowl')),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Giant\'s Cap', GameConstants.Region.galar, 20,
    new RoutePokemon({
        land: ['Minccino', 'Drednaw', 'Orbeetle', 'Corviknight', 'Coalossal', 'Rolycoly', 'Boldore', 'Rhydon'],
        water: ['Goldeen', 'Krabby', 'Corphish', 'Gyarados'],
        headbutt: ['Greedent', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Noctowl', 'Galarian Linoone', 'Liepard', 'Scraggy', 'Croagunk', 'Nuzleaf', 'Lombre', 'Dottler', 'Eldegoss', 'Stunky', 'Doublade', 'Cinccino', 'Gengar'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Galarian Linoone', 'Scraggy', 'Croagunk', 'Gloom', 'Noctowl', 'Eldegoss', 'Dottler', 'Munna', 'Karrablast', 'Shelmet', 'Doublade', 'Cinccino', 'Gengar'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Quagsire', 'Noctowl', 'Galarian Linoone', 'Palpitoad', 'Shellos (East)', 'Dottler', 'Eldegoss', 'Doublade', 'Seismitoad','Golisopod'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Quagsire', 'Manectric', 'Noctowl', 'Joltik', 'Shellos (East)', 'Dottler', 'Doublade', 'Galvantula', 'Gengar'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Vanillite', 'Sneasel', 'Galarian Linoone', 'Noctowl', 'Snover', 'Snorunt', 'Delibird', 'Dottler', 'Doublade', 'Glalie', 'Beartic'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Sneasel', 'Vanillite', 'Galarian Linoone', 'Riolu', 'Snorunt', 'Pawniard', 'Delibird', 'Dottler', 'Doublade', 'Glalie', 'Gengar'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Carkol', 'Diggersby', 'Torkoal', 'Noctowl', 'Golett', 'Baltoy', 'Drilbur', 'Dugtrio', 'Doublade', 'Excadrill', 'Gengar'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Carkol', 'Diggersby', 'Noctowl', 'Shuckle', 'Golett', 'Drilbur', 'Mudbray', 'Dottler', 'Doublade', 'Excadrill', 'Gengar'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Gothita', 'Solosis', 'Clefairy', 'Noctowl', 'Galarian Linoone', 'Munna', 'Dottler', 'Duskull', 'Eldegoss', 'Aegislash (Shield)', 'Cinccino', 'Gengar'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 18),
            new RouteKillRequirement(10, GameConstants.Region.galar, 21),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dusty Bowl')),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Lake of Outrage', GameConstants.Region.galar, 21,
    new RoutePokemon({
        land: ['Golurk', 'Ditto', 'Corviknight', 'Hatterene'],
        water: ['Mantyke', 'Mantine', 'Barraskewda', 'Lanturn', 'Qwilfish', 'Gyarados'],
        headbutt: ['Greedent', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Beheeyem', 'Braviary', 'Mandibuzz', 'Sigilyph', 'Obstagoon', 'Bewear', 'Orbeetle', 'Leafeon', 'Gardevoir', 'Seaking', 'Lapras', 'Jellicent'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Garbodor', 'Drapion', 'Galarian Weezing', 'Hitmontop', 'Skuntank', 'Grimmsnarl', 'Pangoro', 'Falinks', 'Jangmo-o', 'Espeon', 'Shiinotic', 'Seaking', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Seismitoad', 'Araquanid', 'Golisopod', 'Rotom', 'Pelipper', 'Cramorant (Gulping)', 'Quagsire', 'Barbaracle', 'Deino', 'Goomy', 'Vaporeon', 'Shiinotic', 'Lapras', 'Jellicent'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Galvantula', 'Noivern', 'Haxorus', 'Morpeko', 'Rotom', 'Boltund', 'Jellicent', 'Zweilous', 'Drampa', 'Sliggoo', 'Hakamo-o', 'Jolteon', 'Gardevoir', 'Shiinotic', 'Seaking', 'Lapras', 'Jellicent'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Glalie', 'Vanilluxe', 'Abomasnow', 'Bergmite', 'Snom', 'Piloswine', 'Galarian Mr. Mime', 'Obstagoon', 'Eiscue (Ice Face)', 'Glaceon', 'Avalugg', 'Lapras'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Klinklang', 'Bisharp', 'Vanilluxe', 'Copperajah', 'Perrserker', 'Doublade', 'Togedemaru', 'Duraludon', 'Eiscue (Ice Face)', 'Glaceon', 'Avalugg', 'Lapras'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Ninetales', 'Arcanine', 'Durant', 'Heatmor', 'Lampent', 'Flygon', 'Rhydon', 'Coalossal', 'Sandaconda', 'Turtonator', 'Stonjourner', 'Jangmo-o', 'Larvitar', 'Flareon', 'Chandelure', 'Seaking', 'Pelipper', 'Jellicent'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Excadrill', 'Boldore', 'Zweilous', 'Pupitar', 'Dugtrio', 'Hippowdon', 'Obstagoon', 'Stonjourner', 'Umbreon', 'Rhydon', 'Seaking'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Wobbuffet', 'Gothitelle', 'Reuniclus', 'Claydol', 'Bronzong', 'Gardevoir', 'Sylveon', 'Milotic', 'Lapras', 'Seaking'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new MultiRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 20),
            new RouteKillRequirement(10, GameConstants.Region.galar, 25),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Hammerlocke Hills', GameConstants.Region.galar, 22,
    new RoutePokemon({
        land: ['Pumpkaboo (Average)', 'Pumpkaboo (Small)', 'Pumpkaboo (Large)', 'Pumpkaboo (Super Size)', 'Klink', 'Unfezant', 'Corvisquire', 'Hawlucha', 'Corviknight', 'Copperajah', 'Gourgeist (Average)', 'Gourgeist (Small)', 'Gourgeist (Large)', 'Gourgeist (Super Size)'],
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
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 19),
            new RouteKillRequirement(10, GameConstants.Region.galar, 20),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 6', GameConstants.Region.galar, 23,
    new RoutePokemon({
        land: ['Silicobra', 'Torkoal', 'Duskull', 'Hippopotas', 'Skorupi', 'Heatmor', 'Durant', 'Hawlucha', 'Dugtrio', 'Trapinch', 'Axew', 'Maractus', 'Galarian Yamask', 'Helioptile'],
        water: ['Goldeen', 'Magikarp', 'Drednaw'],
        headbutt: ['Greedent'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Fire)],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 7', GameConstants.Region.galar, 24,
    new RoutePokemon({
        land: ['Thievul', 'Corviknight', 'Perrserker', 'Morpeko', 'Liepard', 'Seismitoad', 'Karrablast', 'Shelmet', 'Meowstic', 'Galvantula', 'Inkay'],
        headbutt: ['Greedent'],
    }),
    [new TemporaryBattleRequirement('Hop6')],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 8', GameConstants.Region.galar, 25,
    new RoutePokemon({
        land: ['Sandaconda', 'Haunter', 'Rhyhorn', 'Dusclops', 'Bronzong', 'Hippowdon', 'Drapion', 'Solrock', 'Lunatone', 'Boldore', 'Gurdurr', 'Golett', 'Pawniard', 'Rufflet', 'Vullaby', 'Togedemaru', 'Crustle', 'Falinks'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 24)],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));
Routes.add(new RegionRoute(
    'Steamdrift Way', GameConstants.Region.galar, 26,
    new RoutePokemon({
        land: ['Sneasel', 'Delibird', 'Snover', 'Galarian Darumaka', 'Snorunt', 'Snom', 'Throh', 'Sawk', 'Vanillish'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 25)],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 2 Lakeside', GameConstants.Region.galar, 27,
    new RoutePokemon({
        land: ['Lotad', 'Seedot', 'Purrloin', 'Blipbug', 'Gossifleur','Chewtle', 'Galarian Zigzagoon', 'Nickit', 'Yamper', 'Obstagoon'],
        water: ['Lapras', 'Drednaw', 'Gyarados', 'Arrokuda','Barraskewda', 'Magikarp', 'Feebas'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 25)],
    undefined,
    GameConstants.GalarSubRegions.SouthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 9', GameConstants.Region.galar, 28,
    new RoutePokemon({
        land: ['Octillery', 'Kingler', 'Pyukumuku', 'Gastrodon (East)', 'Jellicent', 'Mareanie', 'Glalie', 'Pelipper', 'Pincurchin'],
        water: ['Wishiwashi (Solo)', 'Qwilfish', 'Mantyke'],
        special:
      [
          new SpecialRoutePokemon(['Cramorant'], new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Sunny, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy])),
          new SpecialRoutePokemon(['Cramorant (Gulping)'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Cramorant (Gorging)'], new WeatherRequirement([WeatherType.Thunderstorm])),
      ],
    }),
    [new QuestLineStepCompletedRequirement('The Darkest Day', 5)],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));
Routes.add(new RegionRoute(
    'Circhester Bay', GameConstants.Region.galar, 29,
    new RoutePokemon({
        land: ['Gastrodon (East)', 'Inkay', 'Octillery', 'Barbaracle', 'Bergmite', 'Toxapex', 'Dhelmise', 'Pincurchin'],
        water: ['Lapras', 'Mantine', 'Mantyke', 'Wailmer', 'Wailord', 'Remoraid'],
        special:
      [
          new SpecialRoutePokemon(['Cramorant'], new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Sunny, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy])),
          new SpecialRoutePokemon(['Cramorant (Gulping)'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Cramorant (Gorging)'], new WeatherRequirement([WeatherType.Thunderstorm])),
      ],
        headbutt: ['Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 28)],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));
Routes.add(new RegionRoute(
    'Outer Spikemuth', GameConstants.Region.galar, 30,
    new RoutePokemon({
        land: ['Liepard', 'Thievul', 'Perrserker','Morpeko', 'Jellicent', 'Bergmite', 'Mareanie','Toxapex', 'Dhelmise'],
        headbutt: ['Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 29)],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));
Routes.add(new RegionRoute(
    'Winter Hill Station', GameConstants.Region.galar, 31,
    new RoutePokemon({
        land: ['Snom', 'Rhydon', 'Galarian Darumaka','Galarian Mr. Mime', 'Vanillish', 'Klang', 'Glalie', 'Snover', 'Vanilluxe', 'Cubchoo'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Dragon)],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));
Routes.add(new RegionRoute(
    'Galar Route 10', GameConstants.Region.galar, 32,
    new RoutePokemon({
        land: ['Snom', 'Duraludon', 'Stonjourner', 'Beartic', 'Vanillish', 'Abomasnow', 'Galarian Darumaka','Galarian Mr. Mime', 'Sneasel', 'Snover', 'Cubchoo'],
        special:
      [
          new SpecialRoutePokemon(['Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Rain, WeatherType.Thunderstorm, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy])),
          new SpecialRoutePokemon(['Eiscue (No Ice Face)'], new WeatherRequirement([WeatherType.Sunny])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 31)],
    undefined,
    GameConstants.GalarSubRegions.NorthGalar
));

/*
ISLE OF ARMOR
*/
Routes.add(new RegionRoute(
    'Fields of Honour', GameConstants.Region.galar, 33,
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
    [
        new MultiRequirement([
            new TemporaryBattleRequirement('Klara1'),
            new TemporaryBattleRequirement('Avery1'),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Soothing Wetlands', GameConstants.Region.galar, 34,
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
    [new RouteKillRequirement(10, GameConstants.Region.galar, 33)],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Forest of Focus', GameConstants.Region.galar, 35,
    new RoutePokemon({
        land: ['Venipede', 'Foongus', 'Tangela', 'Pikachu', 'Passimian', 'Oranguru', 'Happiny', 'Karrablast'],
        water: ['Magikarp', 'Goldeen', 'Arrokuda', 'Corphish', 'Cramorant'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Tangrowth', 'Amoonguss', 'Whiscash', 'Cramorant'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Chansey', 'Pawniard', 'Croagunk', 'Amoonguss', 'Scolipede', 'Crawdaunt', 'Whiscash', 'Cramorant'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Corphish', 'Crawdaunt', 'Shelmet', 'Accelgor', 'Goomy', 'Golduck', 'Amoonguss', 'Barraskewda', 'Cramorant (Gulping)'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Chansey', 'Corphish', 'Goomy', 'Raichu', 'Luxray', 'Pichu', 'Shelmet', 'Crawdaunt', 'Barraskewda', 'Cramorant (Gorging)'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Chansey', 'Fomantis', 'Pinsir', 'Heracross', 'Tangrowth', 'Lurantis', 'Larvesta', 'Comfey', 'Amoonguss', 'Whiscash', 'Cramorant'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Cramorant'], new WeatherRequirement([WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Windy])),
          new SpecialRoutePokemon(['Chansey', 'Silicobra', 'Sandslash', 'Escavalier', 'Cubone', 'Whiscash', 'Cramorant'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Blissey', 'Zorua', 'Wigglytuff', 'Comfey', 'Azumarill', 'Gardevoir', 'Jigglypuff', 'Barraskewda', 'Cramorant'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin', 'Emolga'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 34),
            new RouteKillRequirement(10, GameConstants.Region.galar, 36),
            new RouteKillRequirement(10, GameConstants.Region.galar, 38),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Challenge Beach', GameConstants.Region.galar, 36,
    new RoutePokemon({
        land: ['Magnemite', 'Psyduck', 'Dedenne', 'Morpeko', 'Blipbug', 'Buneary', 'Jigglypuff', 'Happiny'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Dhelmise', 'Staryu', 'Pelipper', 'Tentacool', 'Wingull'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Lopunny', 'Comfey', 'Drednaw', 'Marill', 'Cramorant', 'Kingler', 'Starmie', 'Tentacruel', 'Gyarados', 'Octillery', 'Barraskewda'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Chansey', 'Inkay', 'Drapion', 'Malamar', 'Drednaw', 'Crawdaunt', 'Drifblim', 'Swoobat', 'Cramorant (Gulping)', 'Toxapex', 'Starmie', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Shinx', 'Malamar', 'Crawdaunt', 'Golisopod', 'Cramorant', 'Drapion', 'Starmie', 'Kingler', 'Toxapex', 'Tentacruel', 'Cloyster', 'Gyarados', 'Jellicent', 'Barraskewda'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Chansey', 'Shinx', 'Magneton', 'Raichu', 'Drednaw', 'Golduck', 'Luxray', 'Magnezone', 'Starmie', 'Toxapex', 'Lanturn', 'Barraskewda', 'Cramorant (Gorging)'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cramorant'], new WeatherRequirement([WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Windy])),
          new SpecialRoutePokemon(['Chansey', 'Fomantis', 'Lilligant', 'Lurantis', 'Fletchinder', 'Drednaw', 'Golduck', 'Volcarona', 'Cramorant', 'Kingler', 'Starmie', 'Tentacruel', 'Gyarados', 'Octillery', 'Barraskewda'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Chansey', 'Lopunny', 'Drednaw', 'Cramorant', 'Marill', 'Kingler', 'Starmie', 'Tentacruel', 'Gyarados', 'Octillery', 'Barraskewda'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Blissey', 'Wigglytuff', 'Comfey', 'Lopunny', 'Drifblim', 'Azumarill', 'Cramorant', 'Starmie', 'Toxapex', 'Cloyster', 'Lanturn', 'Jellicent', 'Barraskewda'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 34),
            new RouteKillRequirement(10, GameConstants.Region.galar, 35),
            new RouteKillRequirement(10, GameConstants.Region.galar, 42),
            new RouteKillRequirement(10, GameConstants.Region.galar, 44),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Loop Lagoon', GameConstants.Region.galar, 37,
    new RoutePokemon({
        land: ['Sandygast', 'Wingull', 'Mareanie', 'Pincurchin', 'Dwebble', 'Blipbug', 'Happiny'],
        water: ['Magikarp', 'Shellder', 'Cloyster'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Drednaw', 'Alakazam', 'Rockruff', 'Gyarados', 'Tentacruel', 'Octillery'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Chansey', 'Inkay', 'Malamar', 'Toxapex', 'Palossand', 'Zoroark', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Krabby', 'Malamar', 'Toxapex', 'Alakazam', 'Pelipper', 'Tentacruel', 'Gyarados'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Chansey', 'Krabby', 'Luxio', 'Magnezone', 'Luxray', 'Lanturn', 'Gyarados'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Chansey', 'Fletchling', 'Drednaw', 'Larvesta', 'Talonflame', 'Tentacruel', 'Octillery', 'Gyarados'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Chansey', 'Drednaw', 'Palossand', 'Alakazam', 'Larvesta', 'Tentacruel', 'Octillery', 'Gyarados'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Blissey', 'Drifloon', 'Wigglytuff', 'Toxapex', 'Palossand', 'Zoroark', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Courageous Cavern')),
            new RouteKillRequirement(10, GameConstants.Region.galar, 42),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Training Lowlands', GameConstants.Region.galar, 38,
    new RoutePokemon({
        land: ['Lillipup', 'Tauros', 'Miltank', 'Scyther', 'Pinsir', 'Heracross', 'Blipbug', 'Happiny'],
        water: ['Magikarp', 'Carvanha', 'Sharpedo', 'Corphish', 'Arrokuda', 'Staryu'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Stoutland', 'Kangaskhan', 'Herdier', 'Golduck', 'Kingler', 'Barraskewda', 'Cramorant'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Chansey', 'Inkay', 'Bisharp', 'Drapion', 'Swoobat', 'Kangaskhan', 'Karrablast', 'Golduck', 'Malamar', 'Kingler', 'Crawdaunt', 'Cramorant'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Shinx', 'Kingler', 'Pelipper', 'Malamar', 'Shelmet', 'Scrafty', 'Toxicroak', 'Golduck', 'Barraskewda', 'Cramorant (Gulping)'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Chansey', 'Shinx', 'Luxray', 'Luxio', 'Magneton', 'Accelgor', 'Scrafty', 'Toxicroak', 'Golduck', 'Kingler', 'Barraskewda', 'Cramorant (Gorging)'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cramorant'], new WeatherRequirement([WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Windy])),
          new SpecialRoutePokemon(['Chansey', 'Fomantis', 'Lilligant', 'Fletchinder', 'Talonflame', 'Drapion', 'Golduck', 'Kingler', 'Barraskewda', 'Cramorant'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Chansey', 'Silicobra', 'Scizor', 'Crustle', 'Skarmory', 'Escavalier', 'Jangmo-o', 'Kingler', 'Barraskewda', 'Cramorant'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Blissey', 'Wigglytuff', 'Comfey', 'Drifblim', 'Herdier', 'Azumarill', 'Gardevoir', 'Barraskewda', 'Cramorant'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 35),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brawlers\' Cave')),
            new RouteKillRequirement(10, GameConstants.Region.galar, 44),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Potbottom Desert', GameConstants.Region.galar, 39,
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
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Warm-Up Tunnel'))],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Challenge Road', GameConstants.Region.galar, 40,
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
            new RouteKillRequirement(10, GameConstants.Region.galar, 38),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Brawlers\' Cave')),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Workout Sea', GameConstants.Region.galar, 41,
    new RoutePokemon({
        land: ['Blipbug', 'Ditto', 'Exeggcute', 'Happiny'],
        water: ['Magikarp', 'Remoraid', 'Octillery', 'Sharpedo', 'Mantyke', 'Wingull', 'Tentacool', 'Clauncher', 'Skrelp', 'Gyarados', 'Clawitzer', 'Dragalge'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Exeggutor', 'Rotom (Mow)'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Chansey', 'Rotom (Fan)', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Rotom (Frost)', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Chansey', 'Rotom (Wash)', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Chansey', 'Exeggutor', 'Rotom (Heat)', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Chansey', 'Rotom'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Blissey', 'Rotom', 'Drifloon', 'Jellicent', 'Wailord'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 33)],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Stepping-Stone Sea', GameConstants.Region.galar, 42,
    new RoutePokemon({
        land: ['Blipbug', 'Exeggcute', 'Happiny', 'Wingull'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Sharpedo', 'Tentacool', 'Frillish', 'Gyarados', 'Clauncher', 'Skrelp', 'Clawitzer', 'Dragalge'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Mantyke'], new WeatherRequirement([WeatherType.Clear, WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Chansey', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Chansey', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Chansey', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Blissey', 'Drifloon', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 36),
            new RouteKillRequirement(10, GameConstants.Region.galar, 37),
            new RouteKillRequirement(10, GameConstants.Region.galar, 41),
            new RouteKillRequirement(10, GameConstants.Region.galar, 43),
            new RouteKillRequirement(10, GameConstants.Region.galar, 44),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Insular Sea', GameConstants.Region.galar, 43,
    new RoutePokemon({
        land: ['Blipbug', 'Wingull', 'Exeggcute', 'Happiny'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Sharpedo', 'Tentacool', 'Horsea', 'Gyarados', 'Clauncher', 'Skrelp', 'Clawitzer', 'Dragalge'],
        special:
      [
          new SpecialRoutePokemon(['Exeggutor', 'Mantyke'], new WeatherRequirement([WeatherType.Clear, WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Zoroark', 'Pelipper', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Exeggutor', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Magnezone', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Volcarona', 'Exeggutor', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Alakazam', 'Comfey', 'Drifloon', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 42),
            new RouteKillRequirement(10, GameConstants.Region.galar, 44),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Honeycalm Sea', GameConstants.Region.galar, 44,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Wishiwashi (Solo)', 'Sharpedo', 'Wingull', 'Wailmer', 'Clauncher', 'Skrelp', 'Gyarados', 'Clawitzer', 'Dragalge'],
        special:
      [
          new SpecialRoutePokemon(['Mantyke', 'Seadra'], new WeatherRequirement([WeatherType.Clear, WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Tentacruel', 'Jellicent', 'Seadra'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Pelipper', 'Seadra'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Pelipper', 'Chinchou', 'Lanturn', 'Kingdra'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Fletchinder', 'Seadra'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Drifloon', 'Jellicent', 'Seadra'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, GameConstants.Region.galar, 36),
            new RouteKillRequirement(10, GameConstants.Region.galar, 38),
            new RouteKillRequirement(10, GameConstants.Region.galar, 42),
            new RouteKillRequirement(10, GameConstants.Region.galar, 43),
        ]),
    ],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));
Routes.add(new RegionRoute(
    'Honeycalm Island', GameConstants.Region.galar, 45,
    new RoutePokemon({
        land: ['Blipbug', 'Combee', 'Petilil', 'Happiny'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Wingull', 'Tentacool', 'Wailmer', 'Gyarados', 'Clauncher', 'Skrelp', 'Clawitzer', 'Dragalge'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Lilligant', 'Mantyke'], new WeatherRequirement([WeatherType.Clear, WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Chansey', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Chansey', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Chansey', 'Lilligant', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Blissey', 'Comfey', 'Drifloon', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 44)],
    undefined,
    GameConstants.GalarSubRegions.IsleofArmor
));

//Crown Tundra
Routes.add(new RegionRoute(
    'Slippery Slope', GameConstants.Region.galar, 46,
    new RoutePokemon({
        land: ['Snom', 'Piloswine', 'Jynx', 'Audino', 'Mime Jr.', 'Smoochum', 'Swinub'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Wooloo', 'Mamoswine', 'Snorlax'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Phantump', 'Trevenant', 'Weavile', 'Mamoswine'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Cryogonal', 'Mamoswine', 'Abomasnow', 'Swablu'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Mamoswine', 'Glalie', 'Froslass'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Wooloo', 'Magby', 'Snorlax', 'Magmar', 'Mamoswine', 'Magmortar'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hatenna', 'Impidimp', 'Gothorita', 'Mimikyu', 'Duosion', 'Gothita', 'Solosis', 'Hattrem', 'Grimmsnarl', 'Gothitelle', 'Reuniclus'],  new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Amaura'], new ObtainedPokemonRequirement(pokemonMap.Amaura)),
      ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new TemporaryBattleRequirement('Peony')],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Frostpoint Field', GameConstants.Region.galar, 47,
    new RoutePokemon({
        land: ['Abomasnow', 'Jynx', 'Audino', 'Mime Jr.', 'Snover', 'Smoochum'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Wooloo', 'Nidoran(M)', 'Nidoran(F)', 'Snorlax'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Nidoran(M)', 'Nidoran(F)', 'Weavile', 'Snorlax'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Nidoran(M)', 'Nidoran(F)', 'Vanilluxe'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Nidoran(M)', 'Nidoran(F)', 'Vanilluxe', 'Absol', 'Eevee'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Magby', 'Nidoran(M)', 'Nidoran(F)', 'Snorlax', 'Magmar'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Gothorita', 'Duosion', 'Mimikyu', 'Hatenna', 'Gothita', 'Solosis', 'Hatterene', 'Gothitelle', 'Reuniclus'],  new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Amaura'], new ObtainedPokemonRequirement(pokemonMap.Amaura)),
      ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 46)],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Giant\'s Bed', GameConstants.Region.galar, 48,
    new RoutePokemon({
        land: ['Nidoran(M)', 'Nidoran(F)', 'Stonjourner', 'Bronzong', 'Audino', 'Mime Jr.', 'Shelmet', 'Nidorino', 'Nidorina'],
        water: ['Magikarp', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados', 'Whiscash', 'Feebas'],
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
          new SpecialRoutePokemon(['Aerodactyl'], new ObtainedPokemonRequirement(pokemonMap.Aerodactyl)),
          new SpecialRoutePokemon(['Lileep'], new ObtainedPokemonRequirement(pokemonMap.Lileep)),
      ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 47)],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Old Cemetery', GameConstants.Region.galar, 49,
    new RoutePokemon({
        land: ['Nidoran(M)', 'Nidoran(F)', 'Sinistea', 'Audino', 'Mime Jr.', 'Karrablast'],
        special:
      [
          new SpecialRoutePokemon(['Lampent', 'Phantump', 'Trevenant'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Elekid'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Froslass'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Absol', 'Vanillite', 'Froslass'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Magmar', 'Heatmor', 'Durant', 'Magby'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Lampent', 'Galarian Ponyta', 'Mimikyu', 'Hatenna', 'Galarian Rapidash'],  new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 48)],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Giant\'s Foot', GameConstants.Region.galar, 50,
    new RoutePokemon({
        land: ['Copperajah', 'Bronzong', 'Stonjourner', 'Audino', 'Claydol', 'Mime Jr.', 'Cufant', 'Bronzor'],
        water: ['Magikarp', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados', 'Whiscash', 'Feebas'],
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
          new SpecialRoutePokemon(['Omanyte'], new ObtainedPokemonRequirement(pokemonMap.Omanyte)),
          new SpecialRoutePokemon(['Kabuto'], new ObtainedPokemonRequirement(pokemonMap.Kabuto)),
          new SpecialRoutePokemon(['Lileep'], new ObtainedPokemonRequirement(pokemonMap.Lileep)),
          new SpecialRoutePokemon(['Archen'], new ObtainedPokemonRequirement(pokemonMap.Archen)),
      ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 48)],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Frigid Sea', GameConstants.Region.galar, 51,
    new RoutePokemon({
        land: ['Bergmite', 'Mime Jr.', 'Audino'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Wailmer', 'Gyarados', 'Dhelmise', 'Spheal', 'Avalugg', 'Wailmer'],
        special:
      [
          new SpecialRoutePokemon(['Sealeo', 'Walrein', 'Eiscue (Ice Face)'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Altaria', 'Sealeo', 'Walrein', 'Eiscue (Ice Face)'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Sealeo', 'Eiscue (Ice Face)'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Electabuzz', 'Pincurchin', 'Dewpider', 'Elekid', 'Electivire', 'Sealeo', 'Eiscue (Ice Face)'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Vanillish', 'Beartic', 'Vanillite', 'Sealeo', 'Walrein', 'Cryogonal', 'Lapras', 'Eiscue (Ice Face)'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Eiscue (Ice Face)'],  new WeatherRequirement([WeatherType.Hail, WeatherType.Sandstorm, WeatherType.Windy])),
          new SpecialRoutePokemon(['Vanillish', 'Beartic', 'Vanillite', 'Sealeo', 'Walrein', 'Cryogonal', 'Lapras', 'Beartic', 'Lapras', 'Absol', 'Eiscue (Ice Face)'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Hatenna', 'Hatterene', 'Sealeo', 'Walrein', 'Eiscue (Ice Face)'],  new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Tirtouga'], new ObtainedPokemonRequirement(pokemonMap.Tirtouga)),
          new SpecialRoutePokemon(['Carracosta'], new MultiRequirement([new ObtainedPokemonRequirement(pokemonMap.Carracosta), new WeatherRequirement([WeatherType.Clear, WeatherType.Rain, WeatherType.Thunderstorm])])),
      ],
    }),
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Roaring-Sea Caves'))],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Three-Point Pass', GameConstants.Region.galar, 52,
    new RoutePokemon({
        land: ['Bronzong', 'Avalugg', 'Claydol', 'Golurk', 'Audino', 'Mime Jr.', 'Bronzor', 'Bergmite'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Wooloo'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Phantump'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Dewpider', 'Elekid', 'Electivire'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Absol', 'Vanillite'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Druddigon', 'Heatmor', 'Durant', 'Wooloo', 'Magby'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Hatenna'],  new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 51)],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Ballimere Lake', GameConstants.Region.galar, 53,
    new RoutePokemon({
        land: ['Boltund', 'Audino', 'Skwovet', 'Yamper', 'Mime Jr.', 'Aron'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Barboach', 'Gyarados', 'Whiscash', 'Feebas', 'Dratini', 'Relicanth'],
        special:
      [
          new SpecialRoutePokemon(['Gossifleur', 'Cottonee', 'Corvisquire', 'Shuckle', 'Eevee', 'Corviknight', 'Whimsicott', 'Coalossal'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Galarian Linoone', 'Morpeko', 'Noivern', 'Altaria', 'Obstagoon'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Cottonee', 'Noivern', 'Dewpider', 'Whimsicott', 'Dragonite', 'Eldegoss'],  new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Morpeko', 'Dewpider', 'Elekid', 'Electivire', 'Dragonite', 'Coalossal', 'Dragonair'],  new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Corvisquire', 'Vanillite', 'Vanilluxe', 'Coalossal'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Carkol', 'Magmar', 'Gossifleur', 'Shuckle', 'Magby', 'Magmortar'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Hatenna', 'Hatterene', 'Coalossal', 'Dragonair'],  new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Anorith'], new ObtainedPokemonRequirement(pokemonMap.Anorith)),
          new SpecialRoutePokemon(['Armaldo'], new MultiRequirement([new ObtainedPokemonRequirement(pokemonMap.Armaldo), new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])])),
          new SpecialRoutePokemon(['Tyrunt'], new ObtainedPokemonRequirement(pokemonMap.Tyrunt)),
          new SpecialRoutePokemon(['Tyrantrum'], new ObtainedPokemonRequirement(pokemonMap.Tyrantrum)),
      ],
        headbutt: ['Skwovet', 'Greedent', 'Munchlax'],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 48)],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Snowslide Slope', GameConstants.Region.galar, 54,
    new RoutePokemon({
        land: ['Snom', 'Beldum', 'Audino', 'Mime Jr.', 'Metang', 'Metagross'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Druddigon', 'Wooloo'],  new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Phantump', 'Sneasel', 'Weavile', 'Trevenant'],  new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Cryogonal', 'Snorunt', 'Vanillish', 'Beartic', 'Delibird', 'Vanillite', 'Glalie', 'Vanilluxe', 'Froslass'],  new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Snorunt', 'Vanillish', 'Beartic', 'Delibird', 'Vanillite', 'Glalie', 'Vanilluxe', 'Froslass', 'Galarian Darumaka', 'Absol'],  new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Wooloo', 'Magby', 'Magmortar'],  new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Morgrem', 'Mimikyu', 'Clefairy', 'Clefable', 'Grimmsnarl'],  new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Amaura'], new ObtainedPokemonRequirement(pokemonMap.Amaura)),
          new SpecialRoutePokemon(['Aurorus'], new MultiRequirement([new ObtainedPokemonRequirement(pokemonMap.Aurorus), new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Blizzard, WeatherType.Fog])])),
      ],
    }),
    [new RouteKillRequirement(10, GameConstants.Region.galar, 48)],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
Routes.add(new RegionRoute(
    'Path to the Peak', GameConstants.Region.galar, 55,
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
    [new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Tunnel to the Top'))],
    undefined,
    GameConstants.GalarSubRegions.CrownTundra
));
