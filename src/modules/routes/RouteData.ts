import BadgeEnums from '../enums/Badges';
import {
    Region, KantoSubRegions, getDungeonIndex, AlolaSubRegions, GalarSubRegions, HoennSubRegions,
} from '../GameConstants';
import ClearDungeonRequirement from '../requirements/ClearDungeonRequirement';
import GymBadgeRequirement from '../requirements/GymBadgeRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';
import QuestLineCompletedRequirement from '../requirements/QuestLineCompletedRequirement';
import QuestLineStepCompletedRequirement from '../requirements/QuestLineStepCompletedRequirement';
import RouteKillRequirement from '../requirements/RouteKillRequirement';
import TemporaryBattleRequirement from '../requirements/TemporaryBattleRequirement';
import WeatherRequirement from '../requirements/WeatherRequirement';
import DevelopmentRequirement from '../requirements/DevelopmentRequirement';
import WeatherType from '../weather/WeatherType';
import RegionRoute from './RegionRoute';
import RoutePokemon from './RoutePokemon';
import Routes from './Routes';
import SpecialRoutePokemon from './SpecialRoutePokemon';

/*
KANTO
*/
Routes.add(new RegionRoute(
    'Kanto Route 1', Region.kanto, 1,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata'],
    }),
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 22', Region.kanto, 22,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Mankey'],
        water: ['Psyduck', 'Poliwag', 'Slowpoke', 'Goldeen', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 1)],
    1.1,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 2', Region.kanto, 2,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Caterpie', 'Weedle'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 1)],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 3', Region.kanto, 3,
    new RoutePokemon({
        land: ['Pidgey', 'Spearow', 'Nidoran(F)', 'Nidoran(M)', 'Jigglypuff', 'Mankey'],
    }),
    [
        new RouteKillRequirement(10, Region.kanto, 2),
        new GymBadgeRequirement(BadgeEnums.Boulder),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 4', Region.kanto, 4,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Mankey'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [
        new RouteKillRequirement(10, Region.kanto, 3),
        new ClearDungeonRequirement(1, getDungeonIndex('Mt. Moon')),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 24', Region.kanto, 24,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Oddish', 'Abra', 'Bellsprout'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new TemporaryBattleRequirement('Blue 2')],
    4.1,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 25', Region.kanto, 25,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Oddish', 'Abra', 'Bellsprout'],
        water: ['Psyduck', 'Poliwag', 'Tentacool', 'Slowpoke', 'Goldeen', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 24)],
    4.2,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 5', Region.kanto, 5,
    new RoutePokemon({
        land: ['Pidgey', 'Meowth', 'Oddish', 'Bellsprout'],
    }),
    [
        // Need to reach bills house
        new RouteKillRequirement(10, Region.kanto, 25),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 6', Region.kanto, 6,
    new RoutePokemon({
        land: ['Pidgey', 'Meowth', 'Oddish', 'Bellsprout'],
        water: ['Psyduck', 'Poliwag', 'Slowpoke', 'Goldeen', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 5)],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 11', Region.kanto, 11,
    new RoutePokemon({
        land: ['Spearow', 'Ekans', 'Sandshrew', 'Drowzee'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 6)],
    6.1,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 9', Region.kanto, 9,
    new RoutePokemon({
        land: ['Rattata', 'Spearow', 'Ekans', 'Sandshrew'],
    }),
    [
        new TemporaryBattleRequirement('Blue 3'),
        new GymBadgeRequirement(BadgeEnums.Cascade),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 10', Region.kanto, 10,
    new RoutePokemon({
        land: ['Spearow', 'Ekans', 'Sandshrew', 'Voltorb'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [
        new RouteKillRequirement(10, Region.kanto, 9),
        new ClearDungeonRequirement(1, getDungeonIndex('Rock Tunnel')),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 8', Region.kanto, 8,
    new RoutePokemon({
        land: ['Pidgey', 'Ekans', 'Sandshrew', 'Vulpix', 'Meowth', 'Growlithe'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 10)],
    10.1,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 7', Region.kanto, 7,
    new RoutePokemon({
        land: ['Pidgey', 'Vulpix', 'Oddish', 'Meowth', 'Growlithe', 'Bellsprout'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 8)],
    10.2,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 12', Region.kanto, 12,
    new RoutePokemon({
        land: ['Pidgey', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d'],
        water: ['Poliwag', 'Slowpoke', 'Slowbro', 'Goldeen', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 10)],
    undefined,
    KantoSubRegions.Kanto,

));
Routes.add(new RegionRoute(
    'Kanto Route 13', Region.kanto, 13,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Ditto'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [
        new OneFromManyRequirement([
            new TemporaryBattleRequirement('Snorlax route 12'),
            new RouteKillRequirement(10, Region.kanto, 14),
        ]),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 14', Region.kanto, 14,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Ditto'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.kanto, 13),
            new RouteKillRequirement(10, Region.kanto, 15),
        ]),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 15', Region.kanto, 15,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Ditto'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.kanto, 18),
            new RouteKillRequirement(10, Region.kanto, 14),
        ]),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 16', Region.kanto, 16,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Doduo'],
    }),
    [
        new OneFromManyRequirement([
            new TemporaryBattleRequirement('Snorlax route 16'),
            new RouteKillRequirement(10, Region.kanto, 17),
        ]),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 17', Region.kanto, 17,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.kanto, 16),
            new RouteKillRequirement(10, Region.kanto, 18),
        ]),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 18', Region.kanto, 18,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.kanto, 17),
            new RouteKillRequirement(10, Region.kanto, 15),
        ]),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 19', Region.kanto, 19,
    new RoutePokemon({
        water: ['Tentacool', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Soul)],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 20', Region.kanto, 20,
    new RoutePokemon({
        water: ['Tentacool', 'Krabby', 'Horsea', 'Shellder', 'Staryu', 'Magikarp'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.kanto, 21),
            new ClearDungeonRequirement(1, getDungeonIndex('Seafoam Islands')),
        ]),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 21', Region.kanto, 21,
    new RoutePokemon({
        land: ['Tangela'],
        water: ['Tentacool', 'Krabby', 'Horsea', 'Shellder', 'Staryu', 'Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Soul)],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Kanto Route 23', Region.kanto, 23,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Ekans', 'Arbok', 'Sandshrew', 'Sandslash', 'Mankey', 'Primeape'],
        water: ['Psyduck', 'Poliwag', 'Slowpoke', 'Goldeen', 'Magikarp'],
    }),
    [
        new RouteKillRequirement(10, Region.kanto, 22),
        new TemporaryBattleRequirement('Blue 6'),
    ],
    undefined,
    KantoSubRegions.Kanto,
));
Routes.add(new RegionRoute(
    'Treasure Beach', Region.kanto, 26,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Meowth', 'Persian', 'Psyduck', 'Slowpoke', 'Tangela'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Volcano)],
    21.1,
    KantoSubRegions.Sevii123,
    true,
    37487,
));
Routes.add(new RegionRoute(
    'Kindle Road', Region.kanto, 27,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Meowth', 'Persian', 'Psyduck', 'Geodude', 'Ponyta', 'Rapidash', 'Slowpoke'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Volcano)],
    21.2,
    KantoSubRegions.Sevii123,
    true,
    37487,
));
Routes.add(new RegionRoute(
    'Cape Brink', Region.kanto, 28,
    new RoutePokemon({
        land: ['Spearow', 'Fearow', 'Oddish', 'Gloom', 'Meowth', 'Persian', 'Psyduck', 'Golduck', 'Bellsprout', 'Weepinbell', 'Slowpoke', 'Slowbro'],
        water: ['Poliwag', 'Goldeen', 'Magikarp'],
    }),
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 0)],
    21.3,
    KantoSubRegions.Sevii123,
    true,
    37487,
));
Routes.add(new RegionRoute(
    'Bond Bridge', Region.kanto, 29,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Meowth', 'Persian', 'Psyduck', 'Bellsprout', 'Weepinbell', 'Slowpoke'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Horsea', 'Magikarp'],
    }),
    [new QuestLineStepCompletedRequirement('Bill\'s Errand', 3)],
    21.4,
    KantoSubRegions.Sevii123,
    true,
    37487,
));
Routes.add(new RegionRoute(
    'Five Isle Meadow', Region.kanto, 30,
    new RoutePokemon({
        land: ['Sentret', 'Pidgey', 'Pidgeotto', 'Hoppip', 'Meowth', 'Persian', 'Psyduck', 'Slowpoke'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler'],
    }),
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Memorial Pillar', Region.kanto, 31,
    new RoutePokemon({
        water: ['Hoppip', 'Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 30)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Water Labyrinth', Region.kanto, 32,
    new RoutePokemon({
        water: ['Hoppip', 'Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Resort Gorgeous', Region.kanto, 33,
    new RoutePokemon({
        water: ['Hoppip', 'Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 32)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Water Path', Region.kanto, 34,
    new RoutePokemon({
        land: ['Sentret', 'Spearow', 'Fearow', 'Oddish', 'Bellsprout', 'Meowth', 'Gloom', 'Weepinbell', 'Persian', 'Psyduck', 'Slowpoke'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler'],
    }),
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Green Path', Region.kanto, 35,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Pattern Bush'))],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Outcast Island', Region.kanto, 36,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 35)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Ruin Valley', Region.kanto, 37,
    new RoutePokemon({
        land: ['Natu', 'Spearow', 'Fearow', 'Meowth', 'Yanma', 'Wooper', 'Marill', 'Persian', 'Psyduck', 'Slowpoke', 'Wobbuffet'],
        water: ['Magikarp', 'Poliwag', 'Goldeen', 'Poliwhirl', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 34)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Canyon Entrance', Region.kanto, 38,
    new RoutePokemon({
        land: ['Sentret', 'Spearow', 'Fearow', 'Phanpy', 'Meowth', 'Persian', 'Psyduck', 'Slowpoke'],
    }),
    [new QuestLineStepCompletedRequirement('Celio\'s Errand', 5)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Sevault Canyon', Region.kanto, 39,
    new RoutePokemon({
        land: ['Geodude', 'Phanpy', 'Fearow', 'Meowth', 'Cubone', 'Marowak', 'Persian', 'Onix', 'Skarmory', 'Larvitar'],
        headbutt: ['Graveler'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 38)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1050000,
));
Routes.add(new RegionRoute(
    'Valencia Island', Region.kanto, 40,
    new RoutePokemon({
        land: ['Valencian Butterfree', 'Valencian Raticate', 'Valencian Vileplume', 'Valencian Paras', 'Valencian Weepinbell', 'Nidoran(M)', 'Nidoran(F)', 'Nidorina'],
        water: ['Gyarados', 'Cloyster', 'Poliwhirl'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Jade_Star)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1250000,
));

Routes.add(new RegionRoute(
    'Pinkan Forest', Region.kanto, 41,
    new RoutePokemon({
        land: ['Pinkan Caterpie', 'Pinkan Weedle', 'Pinkan Pidgey', 'Pinkan Vileplume', 'Pinkan Paras', 'Pinkan Venonat', 'Pinkan Mankey', 'Pinkan Exeggutor'],
    }),
    [
        new ClearDungeonRequirement(1, getDungeonIndex('Altering Cave')),
        new QuestLineCompletedRequirement('Celio\'s Errand'),
    ],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1250000,
));
Routes.add(new RegionRoute(
    'Pinkan Plains', Region.kanto, 42,
    new RoutePokemon({
        land: ['Pinkan Pidgey', 'Pinkan Rattata', 'Pinkan Nidoran(M)', 'Pinkan Nidoran(F)', 'Pinkan Diglett', 'Pinkan Bellsprout'],
    }),
    [new RouteKillRequirement(10, Region.kanto, 41)],
    undefined,
    KantoSubRegions.Sevii4567,
    true,
    1250000,
));

/*
JOHTO
*/
Routes.add(new RegionRoute(
    'Johto Route 29', Region.johto, 29,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Sentret', 'Hoothoot'],
        headbutt: ['Exeggcute', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_KantoChampion)],
));
Routes.add(new RegionRoute(
    'Johto Route 30', Region.johto, 30,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Hoothoot', 'Ledyba', 'Spinarak'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
        headbutt: ['Exeggcute', 'Pineco'],
    }),
    [new RouteKillRequirement(10, Region.johto, 29)],
));
Routes.add(new RegionRoute(
    'Johto Route 31', Region.johto, 31,
    new RoutePokemon({
        land: ['Pidgey', 'Rattata', 'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Poliwag', 'Hoothoot', 'Ledyba', 'Spinarak', 'Bellsprout'],
        water: ['Poliwhirl', 'Magikarp'],
        headbutt: ['Spearow', 'Exeggcute', 'Aipom', 'Pineco', 'Heracross'],
    }),
    [new TemporaryBattleRequirement('Silver 1')],
));
Routes.add(new RegionRoute(
    'Johto Route 32', Region.johto, 32,
    new RoutePokemon({
        land: ['Rattata', 'Ekans', 'Zubat', 'Bellsprout', 'Mareep', 'Hoppip', 'Wooper'],
        water: ['Tentacool', 'Tentacruel', 'Quagsire', 'Magikarp', 'Qwilfish'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Pineco'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Zephyr)],
));
Routes.add(new RegionRoute(
    'Johto Route 33', Region.johto, 33,
    new RoutePokemon({
        land: ['Spearow', 'Rattata', 'Ekans', 'Zubat', 'Hoppip'],
        headbutt: ['Aipom', 'Heracross'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Union Cave'))],
));
Routes.add(new RegionRoute(
    'Johto Route 34', Region.johto, 34,
    new RoutePokemon({
        land: ['Rattata', 'Abra', 'Drowzee', 'Ditto'],
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Magikarp', 'Staryu', 'Corsola', 'Kingler'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Ilex Forest'))],
));
Routes.add(new RegionRoute(
    'Johto Route 35', Region.johto, 35,
    new RoutePokemon({
        land: ['Pidgey', 'Nidoran(F)', 'Nidoran(M)', 'Abra', 'Drowzee', 'Ditto', 'Hoothoot', 'Yanma'],
        water: ['Psyduck', 'Golduck', 'Poliwag', 'Magikarp'],
        headbutt: ['Exeggcute', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, Region.johto, 34)],
));
Routes.add(new RegionRoute(
    'Johto Route 36', Region.johto, 36,
    new RoutePokemon({
        land: ['Pidgey', 'Nidoran(M)', 'Nidoran(F)', 'Vulpix', 'Growlithe', 'Hoothoot', 'Stantler'],
        headbutt: ['Exeggcute', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.johto, 35),
            new TemporaryBattleRequirement('Sudowoodo'),
        ]),
    ],
));
Routes.add(new RegionRoute(
    'Johto Route 37', Region.johto, 37,
    new RoutePokemon({
        land: ['Pidgey', 'Pidgeotto', 'Vulpix', 'Growlithe', 'Hoothoot', 'Ledyba', 'Spinarak', 'Stantler'],
        headbutt: ['Exeggcute', 'Pineco'],
    }),
    [
        new TemporaryBattleRequirement('Sudowoodo'),
        new RouteKillRequirement(10, Region.johto, 36),
    ],
));
Routes.add(new RegionRoute(
    'Johto Route 38', Region.johto, 38,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Meowth', 'Magnemite', 'Farfetch\'d', 'Tauros', 'Snubbull', 'Miltank'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, Region.johto, 37)],
));
Routes.add(new RegionRoute(
    'Johto Route 39', Region.johto, 39,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Meowth', 'Magnemite', 'Farfetch\'d', 'Tauros', 'Miltank'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, Region.johto, 38)],
));
Routes.add(new RegionRoute(
    'Johto Route 40', Region.johto, 40,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Krabby', 'Magikarp', 'Staryu', 'Corsola', 'Kingler'],
    }),
    [
        new RouteKillRequirement(10, Region.johto, 39),
        new GymBadgeRequirement(BadgeEnums.Fog),
    ],
));
Routes.add(new RegionRoute(
    'Johto Route 41', Region.johto, 41,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Mantine', 'Magikarp', 'Chinchou', 'Shellder'],
    }),
    [new RouteKillRequirement(10, Region.johto, 40)],
));
Routes.add(new RegionRoute(
    'Johto Route 42', Region.johto, 42,
    new RoutePokemon({
        land: ['Spearow', 'Zubat', 'Mankey', 'Mareep', 'Flaaffy'],
        water: ['Goldeen', 'Seaking', 'Magikarp'],
        headbutt: ['Aipom', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fog)],
));
Routes.add(new RegionRoute(
    'Johto Route 43', Region.johto, 43,
    new RoutePokemon({
        land: ['Pidgeotto', 'Venonat', 'Noctowl', 'Mareep', 'Flaaffy', 'Girafarig'],
        water: ['Magikarp', 'Poliwag'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Pineco'],
    }),
    [
        new OneFromManyRequirement([
            new MultiRequirement([
                new ClearDungeonRequirement(1, getDungeonIndex('Mt. Mortar')),
                new GymBadgeRequirement(BadgeEnums.Fog),
            ]),
            new RouteKillRequirement(10, Region.johto, 42),
        ]),
    ],
));
Routes.add(new RegionRoute(
    'Johto Route 44', Region.johto, 44,
    new RoutePokemon({
        land: ['Bellsprout', 'Weepinbell', 'Lickitung', 'Tangela'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Remoraid'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Radio Tower'))],
));
Routes.add(new RegionRoute(
    'Johto Route 45', Region.johto, 45,
    new RoutePokemon({
        land: ['Geodude', 'Graveler', 'Gligar', 'Teddiursa', 'Skarmory', 'Phanpy'],
        water: ['Magikarp', 'Poliwag', 'Dratini', 'Dragonair'],
        headbutt: ['Spearow', 'Aipom', 'Heracross'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Ice Path'))],
));
Routes.add(new RegionRoute(
    'Johto Route 46', Region.johto, 46,
    new RoutePokemon({
        land: ['Spearow', 'Rattata', 'Geodude'],
        headbutt: ['Aipom', 'Heracross'],
    }),
    [new RouteKillRequirement(10, Region.johto, 29)],
    29.1,
));
Routes.add(new RegionRoute(
    'Johto Route 47', Region.johto, 47,
    new RoutePokemon({
        land: ['Raticate', 'Spearow', 'Fearow', 'Gloom', 'Farfetch\'d', 'Ditto', 'Noctowl', 'Miltank'],
        water: ['Tentacool', 'Seel', 'Staryu', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Metapod', 'Butterfree', 'Kakuna', 'Beedrill', 'Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Mineral)],
));
Routes.add(new RegionRoute(
    'Johto Route 48', Region.johto, 48,
    new RoutePokemon({
        land: ['Fearow', 'Vulpix', 'Gloom', 'Diglett', 'Growlithe', 'Farfetch\'d', 'Tauros', 'Hoppip', 'Girafarig'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, Region.johto, 47)],
));
Routes.add(new RegionRoute(
    'Johto Route 26', Region.johto, 26,
    new RoutePokemon({
        land: ['Raticate', 'Arbok', 'Sandslash', 'Ponyta', 'Doduo', 'Dodrio', 'Quagsire'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new RouteKillRequirement(10, Region.johto, 27)],
    50,
));
Routes.add(new RegionRoute(
    'Johto Route 27', Region.johto, 27,
    new RoutePokemon({
        land: ['Raticate', 'Arbok', 'Sandslash', 'Ponyta', 'Doduo', 'Dodrio', 'Quagsire'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
        headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Tohjo Falls'))],
    49,
));
Routes.add(new RegionRoute(
    'Johto Route 28', Region.johto, 28,
    new RoutePokemon({
        land: ['Ponyta', 'Tangela', 'Donphan', 'Ursaring', 'Rapidash', 'Doduo', 'Dodrio', 'Sneasel', 'Murkrow'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
        headbutt: ['Natu', 'Aipom', 'Heracross'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
    51,
));

/*
HOENN
*/
Routes.add(new RegionRoute(
    'Hoenn Route 101', Region.hoenn, 101,
    new RoutePokemon({
        land: ['Wurmple', 'Poochyena', 'Zigzagoon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 102', Region.hoenn, 102,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Wurmple', 'Lotad', 'Zigzagoon', 'Ralts', 'Seedot'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Corphish'],
    }),
    [new TemporaryBattleRequirement('May 1')],
));
Routes.add(new RegionRoute(
    'Hoenn Route 103', Region.hoenn, 103,
    new RoutePokemon({
        land: ['Poochyena', 'Wingull', 'Zigzagoon'],
        water: ['Tentacool', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 101)],
    101.1,
));
Routes.add(new RegionRoute(
    'Hoenn Route 104', Region.hoenn, 104,
    new RoutePokemon({
        land: ['Poochyena', 'Wurmple', 'Marill', 'Taillow', 'Wingull'],
        water: ['Pelipper', 'Magikarp'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 102)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 105', Region.hoenn, 105,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)],
    115.1,
));
Routes.add(new RegionRoute(
    'Hoenn Route 106', Region.hoenn, 106,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.hoenn, 105),
            new RouteKillRequirement(10, Region.hoenn, 107),
        ]),
    ],
    115.2,
));
Routes.add(new RegionRoute(
    'Hoenn Route 107', Region.hoenn, 107,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.hoenn, 106),
            new RouteKillRequirement(10, Region.hoenn, 108),
        ]),
    ],
    115.3,
));
Routes.add(new RegionRoute(
    'Hoenn Route 108', Region.hoenn, 108,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.hoenn, 107),
            new RouteKillRequirement(10, Region.hoenn, 109),
        ]),
    ],
    115.4,
));
Routes.add(new RegionRoute(
    'Hoenn Route 109', Region.hoenn, 109,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)],
    115.5,
));
Routes.add(new RegionRoute(
    'Hoenn Route 110', Region.hoenn, 110,
    new RoutePokemon({
        land: ['Poochyena', 'Gulpin', 'Minun', 'Oddish', 'Wingull', 'Plusle'],
        water: ['Tentacool', 'Pelipper', 'Magikarp', 'Wailmer'],
        special:
        [new SpecialRoutePokemon(['Electrike'], new ObtainedPokemonRequirement('Electrike'))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Granite Cave'))],
));
Routes.add(new RegionRoute(
    'Hoenn Route 111', Region.hoenn, 111,
    new RoutePokemon({
        land: ['Sandshrew', 'Trapinch', 'Baltoy', 'Cacnea'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
        headbutt: ['Geodude'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Dynamo)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 112', Region.hoenn, 112,
    new RoutePokemon({
        land: ['Numel', 'Marill'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 111)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 113', Region.hoenn, 113,
    new RoutePokemon({
        land: ['Spinda', 'Slugma', 'Skarmory'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Fiery Path'))],
));
Routes.add(new RegionRoute(
    'Hoenn Route 114', Region.hoenn, 114,
    new RoutePokemon({
        land: ['Zangoose', 'Surskit', 'Swablu', 'Lotad', 'Lombre', 'Seviper', 'Nuzleaf'],
        water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
        headbutt: ['Geodude'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 113)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 115', Region.hoenn, 115,
    new RoutePokemon({
        land: ['Swablu', 'Taillow', 'Swellow', 'Jigglypuff', 'Wingull'],
        water: ['Tentacool', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Meteor Falls'))],
));
Routes.add(new RegionRoute(
    'Hoenn Route 116', Region.hoenn, 116,
    new RoutePokemon({
        land: ['Poochyena', 'Whismur', 'Nincada', 'Abra', 'Taillow', 'Skitty'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Petalburg Woods'))],
    104.1,
));
Routes.add(new RegionRoute(
    'Hoenn Route 117', Region.hoenn, 117,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Oddish', 'Marill', 'Illumise', 'Volbeat', 'Seedot'],
        water: ['Goldeen', 'Magikarp', 'Corphish'],
        special:
        [new SpecialRoutePokemon(['Roselia'], new ObtainedPokemonRequirement('Roselia'))],
    }),
    [new TemporaryBattleRequirement('May 3')],
    110.1,
));
Routes.add(new RegionRoute(
    'Hoenn Route 118', Region.hoenn, 118,
    new RoutePokemon({
        land: ['Zigzagoon', 'Linoone', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Pelipper', 'Magikarp', 'Carvanha', 'Sharpedo'],
        special:
        [
            new SpecialRoutePokemon(['Electrike'], new ObtainedPokemonRequirement('Electrike')),
            new SpecialRoutePokemon(['Manectric'], new ObtainedPokemonRequirement('Manectric')),
        ],
    }),
    [new GymBadgeRequirement(BadgeEnums.Balance)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 119', Region.hoenn, 119,
    new RoutePokemon({
        land: ['Zigzagoon', 'Linoone', 'Oddish', 'Tropius', 'Kecleon'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 118)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 120', Region.hoenn, 120,
    new RoutePokemon({
        land: ['Surskit', 'Poochyena', 'Mightyena', 'Oddish', 'Marill', 'Absol', 'Kecleon', 'Seedot'],
        water: ['Goldeen', 'Magikarp', 'Barboach'],
    }),
    [
        new ClearDungeonRequirement(1, getDungeonIndex('Weather Institute')),
        new TemporaryBattleRequirement('Kecleon 1'),
    ],
));
Routes.add(new RegionRoute(
    'Hoenn Route 121', Region.hoenn, 121,
    new RoutePokemon({
        land: ['Poochyena', 'Shuppet', 'Mightyena', 'Oddish', 'Gloom', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 120)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 122', Region.hoenn, 122,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 121)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 123', Region.hoenn, 123,
    new RoutePokemon({
        land: ['Poochyena', 'Shuppet', 'Mightyena', 'Oddish', 'Gloom', 'Wingull', 'Kecleon'],
        water: ['Tentacool', 'Pelipper', 'Magikarp', 'Wailmer'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 122)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 124', Region.hoenn, 124,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Clamperl', 'Relicanth'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Aqua Hideout'))],
));
Routes.add(new RegionRoute(
    'Hoenn Route 125', Region.hoenn, 125,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 124)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 126', Region.hoenn, 126,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Clamperl', 'Relicanth'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 124)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 127', Region.hoenn, 127,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.hoenn, 125),
            new RouteKillRequirement(10, Region.hoenn, 126),
        ]),
    ],
));
Routes.add(new RegionRoute(
    'Hoenn Route 128', Region.hoenn, 128,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Luvdisc', 'Wailmer', 'Corsola'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 127)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 129', Region.hoenn, 129,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Wailord', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 128)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 130', Region.hoenn, 130,
    new RoutePokemon({
        land: ['Wynaut'],
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 129)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 131', Region.hoenn, 131,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 130)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 132', Region.hoenn, 132,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 131)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 133', Region.hoenn, 133,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 132)],
));
Routes.add(new RegionRoute(
    'Hoenn Route 134', Region.hoenn, 134,
    new RoutePokemon({
        water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
    }),
    [new RouteKillRequirement(10, Region.hoenn, 133)],
));
Routes.add(new RegionRoute(
    'Rock Poké Spot', Region.hoenn, 135,
    new RoutePokemon({
        land: ['Sandshrew', 'Gligar', 'Trapinch'],
    }),
    [new DevelopmentRequirement(), new QuestLineStepCompletedRequirement('Shadows in the Desert', 1)],
    undefined,
    HoennSubRegions.Orre,
    true,
    1500000,
));
Routes.add(new RegionRoute(
    'Oasis Poké Spot', Region.hoenn, 136,
    new RoutePokemon({
        land: ['Hoppip', 'Phanpy', 'Surskit'],
    }),
    [new DevelopmentRequirement(), new QuestLineStepCompletedRequirement('Shadows in the Desert', 14)],
    undefined,
    HoennSubRegions.Orre,
    true,
    1500000,
));
Routes.add(new RegionRoute(
    'Cave Poké Spot', Region.hoenn, 137,
    new RoutePokemon({
        land: ['Zubat', 'Aron', 'Wooper'],
    }),
    [new DevelopmentRequirement(), new QuestLineStepCompletedRequirement('Shadows in the Desert', 17)],
    undefined,
    HoennSubRegions.Orre,
    true,
    1500000,
));

/*
SINNOH
*/
Routes.add(new RegionRoute(
    'Sinnoh Route 201', Region.sinnoh, 201,
    new RoutePokemon({
        land: ['Starly', 'Bidoof', 'Kricketot'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 202', Region.sinnoh, 202,
    new RoutePokemon({
        land: ['Starly', 'Bidoof', 'Kricketot', 'Shinx'],
    }),
    [
        new RouteKillRequirement(10, Region.sinnoh, 201),
        new TemporaryBattleRequirement('Barry 1'),
    ],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 203', Region.sinnoh, 203,
    new RoutePokemon({
        land: ['Zubat', 'Abra', 'Starly', 'Bidoof', 'Kricketot', 'Shinx'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [new TemporaryBattleRequirement('Barry 2')],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 204', Region.sinnoh, 204,
    new RoutePokemon({
        land: ['Zubat', 'Wurmple', 'Starly', 'Bidoof', 'Kricketot', 'Shinx', 'Budew'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Goldeen', 'Seaking', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 202)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 205', Region.sinnoh, 205,
    new RoutePokemon({
        land: ['Hoothoot', 'Wurmple', 'Silcoon', 'Beautifly', 'Cascoon', 'Dustox', 'Bidoof', 'Kricketot', 'Budew', 'Buizel', 'Shellos (West)'],
        water: ['Psyduck', 'Golduck', 'Tentacool', 'Tentacruel', 'Shellder', 'Magikarp', 'Gyarados', 'Gastrodon (West)', 'Finneon', 'Lumineon', 'Barboach', 'Whiscash'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Valley Windworks'))],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 206', Region.sinnoh, 206,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Gligar', 'Kricketune', 'Stunky'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Team Galactic Eterna Building'))],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 207', Region.sinnoh, 207,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Geodude', 'Ponyta', 'Kricketot'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 206)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 208', Region.sinnoh, 208,
    new RoutePokemon({
        land: ['Zubat', 'Ralts', 'Roselia', 'Bidoof', 'Bibarel', 'Budew'],
        water: ['Psyduck', 'Golduck', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Mt. Coronet South'))],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 209', Region.sinnoh, 209,
    new RoutePokemon({
        land: ['Zubat', 'Chansey', 'Ralts', 'Roselia', 'Duskull', 'Staravia', 'Bibarel'],
        water: ['Psyduck', 'Golduck', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados'],
    }),
    [new TemporaryBattleRequirement('Barry 3')],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 210', Region.sinnoh, 210,
    new RoutePokemon({
        land: ['Psyduck', 'Machop', 'Machoke', 'Geodude', 'Ponyta', 'Chansey', 'Scyther', 'Hoothoot', 'Noctowl', 'Roselia', 'Meditite', 'Swablu', 'Bibarel', 'Staravia'],
        water: ['Golduck', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 209)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 215', Region.sinnoh, 215,
    new RoutePokemon({
        land: ['Abra', 'Kadabra', 'Lickitung', 'Scyther', 'Marill', 'Staravia'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 210)],
    210.1,
));
Routes.add(new RegionRoute(
    'Sinnoh Route 214', Region.sinnoh, 214,
    new RoutePokemon({
        land: ['Zubat', 'Geodude', 'Graveler', 'Rhyhorn', 'Houndour', 'Stunky'],
        water: ['Psyduck', 'Golduck', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 215)],
    210.2,
));
Routes.add(new RegionRoute(
    'Sinnoh Route 213', Region.sinnoh, 213,
    new RoutePokemon({
        land: ['Wingull', 'Buizel', 'Shellos (East)', 'Chatot'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Gastrodon (East)'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 214)],
    210.3,
));
Routes.add(new RegionRoute(
    'Sinnoh Route 212', Region.sinnoh, 212,
    new RoutePokemon({
        land: ['Marill', 'Quagsire', 'Ralts', 'Kirlia', 'Roselia', 'Staravia', 'Buizel', 'Shellos (East)', 'Croagunk'],
        water: ['Psyduck', 'Golduck', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Gastrodon (East)'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 213)],
    210.4,
));
Routes.add(new RegionRoute(
    'Sinnoh Route 211', Region.sinnoh, 211,
    new RoutePokemon({
        land: ['Zubat', 'Machop', 'Machoke', 'Graveler', 'Hoothoot', 'Noctowl', 'Meditite', 'Bidoof', 'Chingling', 'Bronzor'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fen)],
    210.5,
));
Routes.add(new RegionRoute(
    'Sinnoh Route 218', Region.sinnoh, 218,
    new RoutePokemon({
        land: ['Mr. Mime', 'Floatzel', 'Gastrodon (West)', 'Glameow', 'Chatot'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Shellos (West)', 'Finneon', 'Lumineon'],
    }),
    [new TemporaryBattleRequirement('Galactic Boss Cyrus')],
    210.6,
));
Routes.add(new RegionRoute(
    'Sinnoh Route 216', Region.sinnoh, 216,
    new RoutePokemon({
        land: ['Zubat', 'Graveler', 'Sneasel', 'Meditite', 'Snorunt', 'Snover'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Mt. Coronet North'))],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 217', Region.sinnoh, 217,
    new RoutePokemon({
        land: ['Sneasel', 'Swinub', 'Snorunt', 'Snover'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 216)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 219', Region.sinnoh, 219,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Wingull', 'Pelipper', 'Clamperl', 'Finneon', 'Lumineon'],
    }),
    [new TemporaryBattleRequirement('Galactic Boss Cyrus')],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 220', Region.sinnoh, 220,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Chinchou', 'Wingull', 'Pelipper', 'Finneon', 'Lumineon'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 219)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 221', Region.sinnoh, 221,
    new RoutePokemon({
        land: ['Sudowoodo', 'Girafarig', 'Roselia', 'Floatzel', 'Shellos (West)', 'Gastrodon (West)', 'Stunky', 'Skuntank'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Pelipper', 'Clamperl', 'Finneon', 'Lumineon'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 220)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 222', Region.sinnoh, 222,
    new RoutePokemon({
        land: ['Magnemite', 'Magneton', 'Electabuzz', 'Wingull', 'Pelipper', 'Luxio', 'Floatzel', 'Gastrodon (East)', 'Glameow', 'Purugly', 'Chatot'],
        water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Sharpedo'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Distortion World'))],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 223', Region.sinnoh, 223,
    new RoutePokemon({
        water: ['Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Pelipper', 'Wailmer', 'Wailord', 'Mantyke'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Beacon)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 224', Region.sinnoh, 224,
    new RoutePokemon({
        land: ['Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Beautifly', 'Dustox', 'Roselia', 'Floatzel', 'Gastrodon (East)', 'Chatot'],
        water: ['Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Pelipper', 'Luvdisc'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 225', Region.sinnoh, 225,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Machoke', 'Graveler', 'Skuntank', 'Banette'],
        water: ['Psyduck', 'Golduck', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 226', Region.sinnoh, 226,
    new RoutePokemon({
        land: ['Rattata', 'Raticate', 'Fearow', 'Machoke', 'Graveler', 'Wingull', 'Banette'],
        water: ['Tentacruel', 'Horsea', 'Seadra', 'Magikarp', 'Gyarados', 'Pelipper', 'Relicanth'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 225)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 227', Region.sinnoh, 227,
    new RoutePokemon({
        land: ['Fearow', 'Golbat', 'Graveler', 'Weezing', 'Rhyhorn', 'Rhydon', 'Skarmory', 'Numel', 'Camerupt'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 226)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 228', Region.sinnoh, 228,
    new RoutePokemon({
        land: ['Diglett', 'Dugtrio', 'Rhydon', 'Cacnea', 'Cacturne', 'Hippowdon'],
        water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Gyarados', 'Barboach', 'Whiscash'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 226)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 229', Region.sinnoh, 229,
    new RoutePokemon({
        land: ['Pidgey', 'Ledian', 'Ariados', 'Beautifly', 'Dustox', 'Volbeat', 'Illumise', 'Roselia', 'Purugly'],
        water: ['Surskit', 'Masquerain', 'Goldeen', 'Seaking', 'Magikarp', 'Gyarados'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 228)],
));
Routes.add(new RegionRoute(
    'Sinnoh Route 230', Region.sinnoh, 230,
    new RoutePokemon({
        land: ['Oddish', 'Gloom', 'Bellsprout', 'Weepinbell', 'Wingull', 'Pelipper', 'Roselia', 'Floatzel'],
        water: ['Tentacruel', 'Magikarp', 'Gyarados', 'Remoraid', 'Octillery', 'Wailmer', 'Wailord', 'Sealeo'],
    }),
    [new RouteKillRequirement(10, Region.sinnoh, 229)],
));

/*
UNOVA
*/
Routes.add(new RegionRoute(
    'Unova Route 19', Region.unova, 19,
    new RoutePokemon({
        land: ['Patrat', 'Purrloin'],
        water: ['Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)],
    0.1,
));
Routes.add(new RegionRoute(
    'Unova Route 20', Region.unova, 20,
    new RoutePokemon({
        land: ['Sunkern', 'Pidove', 'Venipede', 'Patrat', 'Purrloin', 'Sewaddle'],
        water: ['Azurill', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [
        new RouteKillRequirement(10, Region.unova, 19),
        new TemporaryBattleRequirement('Hugh 1'),
    ],
    0.2,
));
Routes.add(new RegionRoute(
    'Unova Route 4', Region.unova, 4,
    new RoutePokemon({
        land: ['Sandile', 'Darumaka', 'Trubbish', 'Minccino', 'Scraggy'],
        water: ['Frillish'],
    }),
    [
        new GymBadgeRequirement(BadgeEnums.Toxic),
        new TemporaryBattleRequirement('Team Plasma Grunt 1'),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 1),
    ],
));
Routes.add(new RegionRoute(
    'Desert Resort', Region.unova, 25,
    new RoutePokemon({
        land: ['Sandshrew', 'Trapinch', 'Maractus', 'Darumaka', 'Dwebble', 'Scraggy', 'Sigilyph', 'Sandile'],
    }),
    [
        new RouteKillRequirement(10, Region.unova, 4),
        new TemporaryBattleRequirement('Colress 1'),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 2),
    ],
    4,
));
Routes.add(new RegionRoute(
    'Unova Route 5', Region.unova, 5,
    new RoutePokemon({
        land: ['Gothita', 'Minccino', 'Trubbish', 'Liepard', 'Solosis'],
    }),
    [
        new TemporaryBattleRequirement('Colress 1'),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 2),
    ],
));
Routes.add(new RegionRoute(
    'Unova Route 16', Region.unova, 16,
    new RoutePokemon({
        land: ['Gothita', 'Minccino', 'Trubbish', 'Liepard', 'Solosis'],
    }),
    [
        new TemporaryBattleRequirement('Colress 1'),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 2),
    ],
    5,
));
Routes.add(new RegionRoute(
    'Unova Route 6', Region.unova, 6,
    new RoutePokemon({
        land: ['Marill', 'Deerling (Spring)', 'Deerling (Autumn)', 'Karrablast', 'Tranquill', 'Foongus', 'Swadloon', 'Vanillite', 'Shelmet'],
        water: ['Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [
        new RouteKillRequirement(10, Region.unova, 5),
        new GymBadgeRequirement(BadgeEnums.Bolt),
        new TemporaryBattleRequirement('Team Plasma Grunt 2'),
        new TemporaryBattleRequirement('Team Plasma Grunt 3'),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 4),
    ],
));
Routes.add(new RegionRoute(
    'Unova Route 7', Region.unova, 7,
    new RoutePokemon({
        land: ['Zangoose', 'Seviper', 'Cubchoo', 'Deerling (Summer)', 'Deerling (Winter)', 'Watchog', 'Tranquill', 'Foongus'],
        special:
        [new SpecialRoutePokemon(['Zebstrika'], new ObtainedPokemonRequirement('Zebstrika'))],
    }),
    [
        new ClearDungeonRequirement(1, getDungeonIndex('Chargestone Cave')),
        new TemporaryBattleRequirement('Colress 2'),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 7),
    ],
));
Routes.add(new RegionRoute(
    'Unova Route 13', Region.unova, 13,
    new RoutePokemon({
        land: ['Tangela', 'Pelipper', 'Drifblim', 'Absol', 'Lunatone', 'Solrock'],
        water: ['Staryu', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Frillish'],
    }),
    [new TemporaryBattleRequirement('Hugh 4')],
));
Routes.add(new RegionRoute(
    'Undella Bay', Region.unova, 24,
    new RoutePokemon({
        water: ['Frillish', 'Mantyke', 'Spheal', 'Remoraid', 'Jellicent', 'Wailmer', 'Chinchou', 'Ducklett'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Reversal Mountain'))],
    13,
));
Routes.add(new RegionRoute(
    'Unova Route 14', Region.unova, 14,
    new RoutePokemon({
        land: ['Golduck', 'Swablu', 'Mienfoo', 'Drifblim', 'Absol', 'Altaria'],
        water: ['Buizel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Reversal Mountain'))],
    13,
));
Routes.add(new RegionRoute(
    'Unova Route 12', Region.unova, 12,
    new RoutePokemon({
        land: ['Pinsir', 'Heracross', 'Roselia', 'Combee', 'Vespiquen', 'Tranquill', 'Sewaddle'],
    }),
    [
        new RouteKillRequirement(10, Region.unova, 13),
        new TemporaryBattleRequirement('Zinzolin 1'),
        new QuestLineStepCompletedRequirement('Hollow Truth and Ideals', 10),
    ],
    13.1,
));
Routes.add(new RegionRoute(
    'Unova Route 11', Region.unova, 11,
    new RoutePokemon({
        land: ['Golduck', 'Marill', 'Gligar', 'Zangoose', 'Seviper', 'Karrablast', 'Amoonguss', 'Shelmet'],
        water: ['Buizel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, Region.unova, 12)],
    13.2,
));
Routes.add(new RegionRoute(
    'Unova Route 9', Region.unova, 9,
    new RoutePokemon({
        land: ['Muk', 'Swalot', 'Liepard', 'Garbodor', 'Minccino', 'Gothorita', 'Duosion', 'Pawniard'],
    }),
    [new RouteKillRequirement(10, Region.unova, 11)],
    13.3,
));
Routes.add(new RegionRoute(
    'Unova Route 21', Region.unova, 21,
    new RoutePokemon({
        water: ['Mantyke', 'Remoraid', 'Spheal', 'Luvdisc'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Seaside Cave'))],
));
Routes.add(new RegionRoute(
    'Unova Route 22', Region.unova, 22,
    new RoutePokemon({
        land: ['Golduck', 'Marill', 'Delibird', 'Pelipper', 'Lunatone', 'Solrock', 'Amoonguss', 'Mienfoo'],
        water: ['Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, Region.unova, 21)],
));
Routes.add(new RegionRoute(
    'Unova Route 23', Region.unova, 23,
    new RoutePokemon({
        land: ['Golduck', 'Gligar', 'Amoonguss', 'Mienfoo', 'Bouffalant', 'Rufflet', 'Vullaby'],
        water: ['Buizel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
        special:
        [
            new SpecialRoutePokemon(['Sawk'], new ObtainedPokemonRequirement('Sawk')),
            new SpecialRoutePokemon(['Throh'], new ObtainedPokemonRequirement('Throh')),
        ],
    }),
    [
        new ClearDungeonRequirement(1, getDungeonIndex('Giant Chasm')),
        new TemporaryBattleRequirement('Ghetsis 2'),
        new QuestLineCompletedRequirement('Hollow Truth and Ideals'),
    ],
));
Routes.add(new RegionRoute(
    'Unova Route 8', Region.unova, 8,
    new RoutePokemon({
        land: ['Croagunk', 'Tympole', 'Palpitoad', 'Karrablast', 'Shelmet', 'Stunfisk'],
    }),
    [
        new OneFromManyRequirement([
            new ClearDungeonRequirement(1, getDungeonIndex('Twist Mountain')),
            new MultiRequirement([
                new RouteKillRequirement(10, Region.unova, 9),
                new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
            ]),
        ]),
    ],
    23.1,
));
Routes.add(new RegionRoute(
    'Unova Route 15', Region.unova, 15,
    new RoutePokemon({
        land: ['Sandslash', 'Gligar', 'Pupitar', 'Swanna'],
        special:
        [
            new SpecialRoutePokemon(['Sawk'], new ObtainedPokemonRequirement('Sawk')),
            new SpecialRoutePokemon(['Throh'], new ObtainedPokemonRequirement('Throh')),
        ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.unova, 14),
            new RouteKillRequirement(10, Region.unova, 16),
        ]),
        new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
    ],
    23.1,
));
Routes.add(new RegionRoute(
    'Unova Route 3', Region.unova, 3,
    new RoutePokemon({
        land: ['Yanma', 'Yanmega', 'Watchog', 'Herdier', 'Purrloin', 'Tranquill'],
        special:
        [new SpecialRoutePokemon(['Zebstrika'], new ObtainedPokemonRequirement('Zebstrika'))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Pinwheel Forest'))],
    23.1,
));
Routes.add(new RegionRoute(
    'Unova Route 2', Region.unova, 2,
    new RoutePokemon({
        land: ['Jigglypuff', 'Lickitung', 'Watchog', 'Herdier', 'Liepard'],
    }),
    [new RouteKillRequirement(10, Region.unova, 3)],
    23.2,
));
Routes.add(new RegionRoute(
    'Unova Route 1', Region.unova, 1,
    new RoutePokemon({
        land: ['Jigglypuff', 'Watchog', 'Herdier', 'Scrafty'],
        water: ['Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, Region.unova, 2)],
    23.3,
));
Routes.add(new RegionRoute(
    'Unova Route 17', Region.unova, 17,
    new RoutePokemon({
        land: ['Frillish', 'Alomomola'],
    }),
    [new RouteKillRequirement(10, Region.unova, 1)],
    23.4,
));
Routes.add(new RegionRoute(
    'Unova Route 18', Region.unova, 18,
    new RoutePokemon({
        land: ['Tropius', 'Carnivine', 'Watchog', 'Crustle', 'Scrafty'],
        water: ['Frillish', 'Alomomola'],
        special:
        [
            new SpecialRoutePokemon(['Sawk'], new ObtainedPokemonRequirement('Sawk')),
            new SpecialRoutePokemon(['Throh'], new ObtainedPokemonRequirement('Throh')),
        ],
    }),
    [new RouteKillRequirement(10, Region.unova, 17)],
    23.5,
));

/*
KALOS
*/
Routes.add(new RegionRoute(
    'Kalos Route 1', Region.kalos, 1,
    new RoutePokemon({
        land: ['Bunnelby', 'Fletchling'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)],
));
Routes.add(new RegionRoute(
    'Kalos Route 2', Region.kalos, 2,
    new RoutePokemon({
        land: ['Caterpie', 'Weedle', 'Pidgey', 'Zigzagoon', 'Fletchling', 'Bunnelby', 'Scatterbug'],
    }),
    [new RouteKillRequirement(10, Region.kalos, 1)],
));
Routes.add(new RegionRoute(
    'Kalos Route 3', Region.kalos, 3,
    new RoutePokemon({
        land: ['Pidgey', 'Pikachu', 'Dunsparce', 'Azurill', 'Bidoof', 'Burmy (Plant)', 'Bunnelby', 'Fletchling'],
        water: ['Magikarp', 'Goldeen', 'Marill', 'Masquerain'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Santalune Forest'))],
));
Routes.add(new RegionRoute(
    'Kalos Route 22', Region.kalos, 22,
    new RoutePokemon({
        land: ['Psyduck', 'Farfetch\'d', 'Azumarill', 'Dunsparce', 'Azurill', 'Bidoof', 'Bibarel', 'Riolu', 'Bunnelby', 'Diggersby', 'Litleo'],
        water: ['Magikarp', 'Goldeen', 'Carvanha'],
    }),
    [new RouteKillRequirement(10, Region.kalos, 3)],
    3.1,
));
Routes.add(new RegionRoute(
    'Kalos Route 4', Region.kalos, 4,
    new RoutePokemon({
        land: ['Ledyba', 'Ralts', 'Skitty', 'Budew', 'Combee', 'Flabébé (Red)', 'Flabébé (Orange)', 'Flabébé (White)'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Bug)],
));
Routes.add(new RegionRoute(
    'Kalos Route 5', Region.kalos, 5,
    new RoutePokemon({
        land: ['Abra', 'Doduo', 'Plusle', 'Minun', 'Gulpin', 'Bunnelby', 'Skiddo', 'Pancham', 'Furfrou'],
    }),
    [new QuestLineStepCompletedRequirement('A Beautiful World', 1)],
));
Routes.add(new RegionRoute(
    'Kalos Route 6', Region.kalos, 6,
    new RoutePokemon({
        land: ['Oddish', 'Sentret', 'Nincada', 'Kecleon', 'Espurr', 'Honedge'],
    }),
    [new TemporaryBattleRequirement('Tierno 1')],
));
Routes.add(new RegionRoute(
    'Kalos Route 7', Region.kalos, 7,
    new RoutePokemon({
        land: ['Smeargle', 'Volbeat', 'Illumise', 'Roselia', 'Croagunk', 'Ducklett', 'Flabébé (Orange)', 'Flabébé (White)', 'Spritzee', 'Swirlix'],
    }),
    [new RouteKillRequirement(10, Region.kalos, 6)],
));
Routes.add(new RegionRoute(
    'Kalos Route 8', Region.kalos, 8,
    new RoutePokemon({
        land: ['Spoink', 'Zangoose', 'Seviper', 'Absol', 'Bagon', 'Drifloon', 'Mienfoo', 'Inkay'],
        water: ['Tentacool', 'Shellder', 'Staryu', 'Wailmer', 'Luvdisc', 'Skrelp', 'Clauncher'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Connecting Cave'))],
));
Routes.add(new RegionRoute(
    'Kalos Route 9', Region.kalos, 9,
    new RoutePokemon({
        land: ['Hippopotas', 'Sandile', 'Helioptile'],
    }),
    [new RouteKillRequirement(10, Region.kalos, 8)],
));
Routes.add(new RegionRoute(
    'Kalos Route 10', Region.kalos, 10,
    new RoutePokemon({
        land: ['Eevee', 'Snubbull', 'Houndour', 'Electrike', 'Sigilyph', 'Emolga', 'Golett', 'Hawlucha'],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Glittering Cave'))],
));
Routes.add(new RegionRoute(
    'Kalos Route 11', Region.kalos, 11,
    new RoutePokemon({
        land: ['Nidorina', 'Nidorino', 'Hariyama', 'Staravia', 'Chingling', 'Stunky', 'Throh', 'Sawk', 'Dedenne'],
    }),
    [
        new GymBadgeRequirement(BadgeEnums.Cliff),
        new RouteKillRequirement(10, Region.kalos, 10),
        new QuestLineStepCompletedRequirement('A Beautiful World', 8),
    ],
));
Routes.add(new RegionRoute(
    'Kalos Route 12', Region.kalos, 12,
    new RoutePokemon({
        land: ['Slowpoke', 'Exeggcute', 'Pinsir', 'Tauros', 'Heracross', 'Miltank', 'Pachirisu', 'Chatot'],
        water: ['Tentacool', 'Lapras', 'Remoraid', 'Clamperl', 'Mantyke'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Rumble)],
    // Replace req with Tower of Mastery dungeon if implemented.
));
Routes.add(new RegionRoute(
    'Kalos Route 13', Region.kalos, 13,
    new RoutePokemon({
        land: ['Dugtrio', 'Trapinch', 'Gible'],
    }),
    [new RouteKillRequirement(10, Region.kalos, 12)],
));
Routes.add(new RegionRoute(
    'Kalos Route 14', Region.kalos, 14,
    new RoutePokemon({
        land: ['Weepinbell', 'Haunter', 'Quagsire', 'Skorupi', 'Carnivine', 'Karrablast', 'Shelmet', 'Goomy'],
        water: ['Poliwag', 'Poliwhirl', 'Barboach', 'Stunfisk'],
    }),
    [new TemporaryBattleRequirement('Calem 3')],
));
Routes.add(new RegionRoute(
    'Kalos Route 15', Region.kalos, 15,
    new RoutePokemon({
        land: ['Mightyena', 'Skorupi', 'Watchog', 'Liepard', 'Foongus', 'Pawniard', 'Klefki'],
        water: ['Poliwag', 'Poliwhirl', 'Lombre', 'Floatzel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new QuestLineStepCompletedRequirement('A Beautiful World', 15)],
));
Routes.add(new RegionRoute(
    'Kalos Route 16', Region.kalos, 16,
    new RoutePokemon({
        land: ['Weepinbell', 'Floatzel', 'Skorupi', 'Foongus', 'Klefki', 'Phantump', 'Pumpkaboo (Average)', 'Pumpkaboo (Small)', 'Pumpkaboo (Large)', 'Pumpkaboo (Super Size)'],
        water: ['Poliwag', 'Poliwhirl', 'Lombre', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    }),
    [new RouteKillRequirement(10, Region.kalos, 15)],
));
Routes.add(new RegionRoute(
    'Kalos Route 17', Region.kalos, 17,
    new RoutePokemon({
        land: ['Sneasel', 'Delibird', 'Snover', 'Abomasnow'],
    }),
    [new QuestLineStepCompletedRequirement('A Beautiful World', 17)],
));
Routes.add(new RegionRoute(
    'Kalos Route 18', Region.kalos, 18,
    new RoutePokemon({
        land: ['Sandslash', 'Graveler', 'Pupitar', 'Lairon', 'Torkoal', 'Gurdurr', 'Heatmor', 'Durant'],
    }),
    [new QuestLineStepCompletedRequirement('A Beautiful World', 32)],
));
Routes.add(new RegionRoute(
    'Kalos Route 19', Region.kalos, 19,
    new RoutePokemon({
        land: ['Weepinbell', 'Haunter', 'Quagsire', 'Drapion', 'Carnivine', 'Karrablast', 'Shelmet', 'Sliggoo'],
        water: ['Poliwag', 'Poliwhirl', 'Barboach', 'Stunfisk', 'Politoed'],
    }),
    [new TemporaryBattleRequirement('Sycamore 2')],
));
Routes.add(new RegionRoute(
    'Kalos Route 20', Region.kalos, 20,
    new RoutePokemon({
        land: ['Jigglypuff', 'Noctowl', 'Zoroark', 'Gothorita', 'Amoonguss', 'Trevenant'],
    }),
    [new TemporaryBattleRequirement('Trevor')],
));
Routes.add(new RegionRoute(
    'Kalos Route 21', Region.kalos, 21,
    new RoutePokemon({
        land: ['Scyther', 'Ursaring', 'Spinda', 'Altaria', 'Floatzel'],
        water: ['Poliwag', 'Poliwhirl', 'Lombre', 'Basculin (Red-Striped)', 'Dratini', 'Dragonair'],
    }),
    [new TemporaryBattleRequirement('Trevor')],
));
Routes.add(new RegionRoute(
    'Azure Bay', Region.kalos, 23,
    new RoutePokemon({
        land: ['Slowpoke', 'Exeggcute', 'Chatot', 'Inkay'],
        water: ['Tentacool', 'Lapras', 'Chinchou', 'Remoraid', 'Luvdisc', 'Mantyke'],
    }),
    [new RouteKillRequirement(10, Region.kalos, 12)], 12,
));

// From here down :
// - No named routes
// - Missing numbered route
// - No requirements
/*
ALOLA
*/
Routes.add(new RegionRoute(
    'Alola Route 1', Region.alola, 1,
    new RoutePokemon({
        land: ['Caterpie', 'Alolan Rattata', 'Ledyba', 'Spinarak', 'Pichu', 'Buneary', 'Pikipek', 'Yungoos', 'Grubbin'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)],
    undefined,
    AlolaSubRegions.MelemeleIsland,
));
Routes.add(new RegionRoute(
    'Route 1 Hau\'oli Outskirts', Region.alola, 18,
    new RoutePokemon({
        land: ['Slowpoke', 'Wingull', 'Inkay'],
        water: ['Tentacool', 'Mantyke', 'Finneon'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new TemporaryBattleRequirement('Hau 2')],
    1.1,
    AlolaSubRegions.MelemeleIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 2', Region.alola, 2,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Spearow', 'Ekans', 'Alolan Meowth', 'Growlithe', 'Abra', 'Drowzee', 'Smeargle', 'Makuhita', 'Furfrou', 'Yungoos', 'Cutiefly'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Trainers\' School'))],
    undefined,
    AlolaSubRegions.MelemeleIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 3', Region.alola, 3,
    new RoutePokemon({
        land: ['Spearow', 'Mankey', 'Bagon', 'Rufflet', 'Vullaby', 'Hawlucha', 'Cutiefly'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Verdant Cavern'))],
    undefined,
    AlolaSubRegions.MelemeleIsland,
));
Routes.add(new RegionRoute(
    'Melemele Sea', Region.alola, 19,
    new RoutePokemon({
        water: ['Tentacool', 'Magikarp', 'Corsola', 'Remoraid', 'Wingull', 'Clamperl', 'Luvdisc', 'Mantyke', 'Finneon', 'Wishiwashi (Solo)'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Brooklet Hill'))],
    5.1,
    AlolaSubRegions.MelemeleIsland,
));
Routes.add(new RegionRoute(
    'Kala\'e Bay', Region.alola, 20,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Slowpoke', 'Wingull', 'Bagon', 'Yungoos'],
        water: ['Tentacool', 'Shellder', 'Magikarp', 'Remoraid', 'Shelgon', 'Finneon', 'Mantyke', 'Wishiwashi (Solo)'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],

    }),
    [
        new ClearDungeonRequirement(1, getDungeonIndex('Seaward Cave')),
        new ClearDungeonRequirement(1, getDungeonIndex('Brooklet Hill')),
    ],
    5.2,
    AlolaSubRegions.MelemeleIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 4', Region.alola, 4,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Eevee', 'Igglybuff', 'Lillipup', 'Pikipek', 'Yungoos', 'Grubbin', 'Mudbray'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [
        new TemporaryBattleRequirement('Dexio'),
        new TemporaryBattleRequirement('Sina'),
    ],
    undefined,
    AlolaSubRegions.AkalaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 5', Region.alola, 5,
    new RoutePokemon({
        land: ['Caterpie', 'Metapod', 'Butterfree', 'Bonsly', 'Lillipup', 'Pikipek', 'Trumbeak', 'Grubbin', 'Fomantis'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Paniola Ranch'))],
    undefined,
    AlolaSubRegions.AkalaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 6', Region.alola, 6,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Eevee', 'Igglybuff', 'Lillipup', 'Pikipek', 'Yungoos', 'Grubbin', 'Mudbray'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Brooklet Hill'))],
    undefined,
    AlolaSubRegions.AkalaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 7', Region.alola, 7,
    new RoutePokemon({
        water: ['Tentacool', 'Staryu', 'Magikarp', 'Wingull', 'Finneon', 'Wishiwashi (Solo)', 'Pyukumuku'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new TemporaryBattleRequirement('Battle Royal')],
    undefined,
    AlolaSubRegions.AkalaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 8', Region.alola, 8,
    new RoutePokemon({
        land: ['Alolan Rattata', 'Fletchling', 'Trumbeak', 'Yungoos', 'Stufful'],
        water: ['Tentacool', 'Magikarp', 'Chinchou', 'Remoraid', 'Finneon', 'Mantyke', 'Wishiwashi (Solo)'],
        special:
        [
            new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9)),
            new SpecialRoutePokemon(['Salandit'], new ObtainedPokemonRequirement('Salandit')),
            new SpecialRoutePokemon(['Wimpod'], new ObtainedPokemonRequirement('Wimpod')),
        ],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Wela Volcano Park'))],
    undefined,
    AlolaSubRegions.AkalaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 9', Region.alola, 9,
    new RoutePokemon({
        water: ['Magikarp', 'Corsola', 'Luvdisc', 'Wishiwashi (Solo)', 'Mareanie'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Diglett\'s Tunnel'))],
    undefined,
    AlolaSubRegions.AkalaIsland,
));
Routes.add(new RegionRoute(
    'Akala Outskirts', Region.alola, 21,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Natu', 'Wingull', 'Nosepass', 'Gumshoos', 'Stufful'],
        water: ['Magikarp', 'Chinchou', 'Wishiwashi (Solo)'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Memorial Hill'))],
    9.1,
    AlolaSubRegions.AkalaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 10', Region.alola, 10,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Ledian', 'Ariados', 'Skarmory', 'Pancham', 'Gumshoos', 'Pidgeot'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Malie Garden'))],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Mount Hokulani', Region.alola, 22,
    new RoutePokemon({
        land: ['Fearow', 'Ditto', 'Cleffa', 'Skarmory', 'Elekid', 'Beldum', 'Elgyem', 'Minior (Meteor)', 'Minior (Blue Core)', 'Minior (Green Core)', 'Minior (Indigo Core)', 'Minior (Orange Core)', 'Minior (Red Core)', 'Minior (Violet Core)', 'Minior (Yellow Core)'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new RouteKillRequirement(10, Region.alola, 10)],
    10.1,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 11', Region.alola, 11,
    new RoutePokemon({
        land: ['Parasect', 'Ledian', 'Ariados', 'Pancham', 'Trumbeak', 'Toucannon', 'Komala'],
        special:
        [
            new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9)),
            new SpecialRoutePokemon(['Shiinotic'], new ObtainedPokemonRequirement('Shiinotic')),
        ],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Malie Garden'))],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 12', Region.alola, 12,
    new RoutePokemon({
        land: ['Alolan Geodude', 'Alolan Graveler', 'Houndoom', 'Manectric', 'Torkoal', 'Mudbray'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [
        new RouteKillRequirement(10, Region.alola, 11),
        new ClearDungeonRequirement(1, getDungeonIndex('Hokulani Observatory')),
    ],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 13', Region.alola, 13,
    new RoutePokemon({
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Bruxish'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new RouteKillRequirement(10, Region.alola, 12)],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 14', Region.alola, 14,
    new RoutePokemon({
        water: ['Tentacruel', 'Magikarp', 'Pelipper', 'Finneon', 'Frillish', 'Wishiwashi (Solo)', 'Bruxish'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new RouteKillRequirement(10, Region.alola, 13)],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Haina Desert', Region.alola, 23,
    new RoutePokemon({
        land: ['Alolan Dugtrio', 'Trapinch', 'Baltoy', 'Gabite', 'Krokorok', 'Golett'],
        special: [
            new SpecialRoutePokemon(['Celesteela'], new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 11)),
            new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9)),
        ],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Thrifty Megamart'))],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 15', Region.alola, 15,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Slowpoke', 'Pelipper', 'Gumshoos', 'Sandygast'],
        water: ['Tentacruel', 'Magikarp', 'Clamperl', 'Finneon', 'Wishiwashi (Solo)', 'Bruxish'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new TemporaryBattleRequirement('Plumeria 2')],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 16', Region.alola, 16,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Slowpoke', 'Pelipper', 'Scraggy', 'Gumshoos'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new RouteKillRequirement(10, Region.alola, 15)],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Alola Route 17', Region.alola, 17,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Alolan Graveler', 'Ledian', 'Ariados', 'Scraggy', 'Bisharp', 'Gumshoos'],
        special: [
            new SpecialRoutePokemon(['Kartana'], new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 11)),
            new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9)),
        ],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Ula\'ula Meadow'))],
    undefined,
    AlolaSubRegions.UlaulaIsland,
));
Routes.add(new RegionRoute(
    'Poni Wilds', Region.alola, 24,
    new RoutePokemon({
        land: ['Granbull', 'Pelipper', 'Gastrodon (East)', 'Furfrou', 'Inkay'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Aether Foundation'))],
    undefined,
    AlolaSubRegions.PoniIsland,
));
Routes.add(new RegionRoute(
    'Ancient Poni Path', Region.alola, 25,
    new RoutePokemon({
        land: ['Granbull', 'Pelipper', 'Gastrodon (East)', 'Furfrou', 'Inkay'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new RouteKillRequirement(10, Region.alola, 24)],
    undefined,
    AlolaSubRegions.PoniIsland,
));
Routes.add(new RegionRoute(
    'Poni Breaker Coast', Region.alola, 26,
    new RoutePokemon({
        water: ['Tentacruel', 'Lapras', 'Magikarp', 'Pelipper', 'Carvanha', 'Wailmer', 'Relicanth', 'Gastrodon (East)', 'Lumineon'],
        special: [
            new SpecialRoutePokemon(['Wimpod'], new ObtainedPokemonRequirement('Wimpod')),
            new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9)),
        ],
    }),
    [new RouteKillRequirement(10, Region.alola, 25)],
    undefined,
    AlolaSubRegions.PoniIsland,
));
Routes.add(new RegionRoute(
    'Poni Grove', Region.alola, 27,
    new RoutePokemon({
        land: ['Pinsir', 'Heracross', 'Buneary', 'Riolu', 'Zoroark', 'Trumbeak', 'Toucannon'],
        special: [
            new SpecialRoutePokemon(['Blacephalon'], new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 15)),
            new SpecialRoutePokemon(['Stakataka'], new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 15)),
            new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9)),
        ],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
    undefined,
    AlolaSubRegions.PoniIsland,
));
Routes.add(new RegionRoute(
    'Poni Plains', Region.alola, 28,
    new RoutePokemon({
        land: ['Alolan Raticate', 'Fearow', 'Hypno', 'Tauros', 'Miltank', 'Pelipper', 'Hariyama', 'Ambipom', 'Cottonee', 'Petilil', 'Trumbeak', 'Toucannon', 'Gumshoos', 'Mudsdale', 'Pyroar'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],

    }),
    [new RouteKillRequirement(10, Region.alola, 27)],
    undefined,
    AlolaSubRegions.PoniIsland,
));
Routes.add(new RegionRoute(
    'Poni Coast', Region.alola, 29,
    new RoutePokemon({
        land: ['Alolan Dugtrio'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],
    }),
    [new RouteKillRequirement(10, Region.alola, 28)],
    undefined,
    AlolaSubRegions.PoniIsland,
));
Routes.add(new RegionRoute(
    'Poni Gauntlet', Region.alola, 30,
    new RoutePokemon({
        land: ['Pelipper', 'Lickitung', 'Golduck', 'Granbull', 'Inkay', 'Bewear'],
        water: ['Magikarp', 'Dratini', 'Dragonair', 'Barboach'],
        special: [new SpecialRoutePokemon(['Meltan'], new QuestLineStepCompletedRequirement('Let\'s Go, Meltan!', 9))],

    }),
    [new RouteKillRequirement(10, Region.alola, 29)],
    undefined,
    AlolaSubRegions.PoniIsland,
));

Routes.add(new RegionRoute(
    'Friend League Bridge', Region.alola, 31,
    new RoutePokemon({
        water: ['Magikarp'],
    }),
    [new QuestLineCompletedRequirement('Magikarp Jump')],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    33750,
));
Routes.add(new RegionRoute(
    'Quick League Bridge', Region.alola, 32,
    new RoutePokemon({
        water: ['Magikarp'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Friend_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    67500,
));
Routes.add(new RegionRoute(
    'Heavy League Bridge', Region.alola, 33,
    new RoutePokemon({
        water: ['Magikarp', 'Magikarp', 'Magikarp', 'Magikarp Calico (Orange, White)', 'Magikarp Orange Orca'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Quick_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    168750,
));
Routes.add(new RegionRoute(
    'Great League Bridge', Region.alola, 34,
    new RoutePokemon({
        water: ['Magikarp', 'Magikarp', 'Magikarp', 'Magikarp Orange Two-Tone', 'Magikarp Orange Dapples'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Heavy_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    270000,
));
Routes.add(new RegionRoute(
    'Fast League Bridge', Region.alola, 35,
    new RoutePokemon({
        water: ['Magikarp', 'Magikarp', 'Magikarp', 'Magikarp Calico (Orange, White, Black)', 'Magikarp Orange Two-Tone', 'Magikarp Calico (Orange, White)'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Great_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    506250,
));
Routes.add(new RegionRoute(
    'Luxury League Bridge', Region.alola, 36,
    new RoutePokemon({
        water: ['Magikarp', 'Magikarp', 'Magikarp', 'Magikarp Pink Two-Tone', 'Magikarp Calico (Orange, White, Black)', 'Magikarp Orange Dapples'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Fast_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    675000,
));
Routes.add(new RegionRoute(
    'Heal League Bridge', Region.alola, 37,
    new RoutePokemon({
        water: ['Magikarp', 'Magikarp', 'Magikarp', 'Magikarp Grey Bubbles', 'Magikarp Grey Patches', 'Magikarp Orange Dapples'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Luxury_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    1012500,
));
Routes.add(new RegionRoute(
    'Ultra League Bridge', Region.alola, 38,
    new RoutePokemon({
        water: ['Magikarp', 'Magikarp', 'Magikarp', 'Magikarp Calico (Orange, White, Black)', 'Magikarp Orange Two-Tone', 'Magikarp Calico (Orange, White)', 'Magikarp Apricot Tiger', 'Magikarp Apricot Zebra', 'Magikarp Brown Zebra'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Heal_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    1350000,
));
Routes.add(new RegionRoute(
    'Elite Four League Pier', Region.alola, 39,
    new RoutePokemon({
        water: ['Magikarp', 'Magikarp', 'Magikarp', 'Magikarp Black Forehead', 'Magikarp Pink Orca', 'Magikarp Grey Patches'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Ultra_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    2025000,
));
Routes.add(new RegionRoute(
    'Master League Pier', Region.alola, 40,
    new RoutePokemon({
        water: ['Magikarp', 'Magikarp', 'Magikarp', 'Magikarp Orange Mask', 'Magikarp Calico (Orange, Gold)', 'Magikarp Grey Bubbles'],
    }),
    [new GymBadgeRequirement(BadgeEnums.E4_League)],
    undefined,
    AlolaSubRegions.MagikarpJump,
    true,
    2700000,
));

/*
GALAR
*/
Routes.add(new RegionRoute(
    'Galar Route 1', Region.galar, 1,
    new RoutePokemon({
        land: ['Skwovet', 'Rookidee', 'Blipbug', 'Wooloo', 'Nickit', 'Caterpie', 'Hoothoot', 'Grubbin'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 2', Region.galar, 2,
    new RoutePokemon({
        land: ['Skwovet', 'Rookidee', 'Nickit', 'Chewtle', 'Yamper', 'Galarian Zigzagoon', 'Blipbug', 'Seedot', 'Hoothoot', 'Lotad', 'Purrloin'],
        water: ['Magikarp', 'Arrokuda'],
    }),
    [
        new RouteKillRequirement(10, Region.galar, 1),
        new TemporaryBattleRequirement('Mirages'),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Rolling Fields', Region.galar, 3,
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
    [new TemporaryBattleRequirement('Hop 2')],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Dappled Grove', Region.galar, 4,
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
    [new RouteKillRequirement(10, Region.galar, 3)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'West Lake Axewell', Region.galar, 5,
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
          new SpecialRoutePokemon(['Grapploct'], new MultiRequirement([new ObtainedPokemonRequirement('Grapploct'), new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Blizzard, WeatherType.Sunny, WeatherType.Sandstorm, WeatherType.Fog])])),
      ],
    }),
    [new RouteKillRequirement(10, Region.galar, 3)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'East Lake Axewell', Region.galar, 6,
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
          new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Onix', 'Minccino', 'Mudbray', 'Pancham', 'Frillish', 'Xatu', 'Mudsdale', 'Pelipper', 'Seaking'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Onix', 'Baltoy', 'Dwebble', 'Minccino', 'Pancham', 'Mudbray', 'Frillish', 'Xatu', 'Mudsdale', 'Seaking'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Purrloin', 'Munna', 'Minccino', 'Oddish', 'Frillish', 'Xatu', 'Bronzong', 'Jellicent', 'Lanturn', 'Cloyster'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, Region.galar, 3)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Giant\'s Seat', Region.galar, 7,
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
            new RouteKillRequirement(10, Region.galar, 8),
            new RouteKillRequirement(10, Region.galar, 9),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'South Lake Miloch', Region.galar, 8,
    new RoutePokemon({
        land: ['Machop', 'Tyrogue', 'Galvantula', 'Machoke', 'Thievul', 'Wingull', 'Drifloon'],
        water: ['Magikarp', 'Remoraid', 'Barboach', 'Pyukumuku', 'Goldeen'],
        special:
      [
          new SpecialRoutePokemon(['Corphish', 'Tympole', 'Stunky', 'Krabby', 'Lombre', 'Nuzleaf', 'Skuntank', 'Kingler', 'Crawdaunt', 'Drifblim', 'Seaking', 'Gyarados', 'Octillery'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Roselia', 'Corphish', 'Stunky', 'Krabby', 'Lombre', 'Nuzleaf', 'Skuntank', 'Drifblim', 'Seaking', 'Gyarados', 'Pelipper'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Corphish', 'Tympole', 'Stunky', 'Krabby', 'Palpitoad', 'Pelipper', 'Seaking', 'Jellicent', 'Gyarados'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Electrike', 'Corphish', 'Joltik', 'Stunky', 'Krabby', 'Tympole', 'Palpitoad', 'Kingler', 'Crawdaunt', 'Seaking', 'Lanturn', 'Gyarados', 'Pelipper'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Corphish', 'Snorunt', 'Vanillite', 'Snover', 'Krabby', 'Skuntank', 'Vanilluxe', 'Gyarados'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Snover', 'Klink', 'Vanillite', 'Delibird', 'Skuntank', 'Vanilluxe', 'Drifblim', 'Gyarados'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Vulpix', 'Growlithe', 'Nincada', 'Roselia', 'Baltoy', 'Stunky', 'Mudbray', 'Crustle', 'Whiscash', 'Pelipper', 'Gyarados', 'Octillery'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Wooper', 'Nincada', 'Baltoy', 'Tympole', 'Dwebble', 'Stunky', 'Mudbray', 'Skuntank', 'Whiscash', 'Seaking', 'Gyarados', 'Octillery'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Natu', 'Ralts', 'Corphish', 'Bronzor', 'Skuntank', 'Drifblim', 'Jellicent', 'Milotic', 'Octillery'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, Region.galar, 3)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'North Lake Miloch', Region.galar, 9,
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
          new SpecialRoutePokemon(['Natu', 'Ralts', 'Stufful', 'Drifloon', 'Purrloin', 'Wingull', 'Drifblim', 'Xatu', 'Lapras', 'Jellicent'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.galar, 6),
            new RouteKillRequirement(10, Region.galar, 7),
            new RouteKillRequirement(10, Region.galar, 8),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Axew\'s Eye', Region.galar, 10,
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
            new RouteKillRequirement(10, Region.galar, 6),
            new RouteKillRequirement(10, Region.galar, 25),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Watchtower Ruins', Region.galar, 11,
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
            new RouteKillRequirement(10, Region.galar, 4),
            new RouteKillRequirement(10, Region.galar, 5),
            new RouteKillRequirement(10, Region.galar, 6),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 3', Region.galar, 12,
    new RoutePokemon({
        land: ['Gossifleur', 'Corvisquire', 'Rookidee', 'Rolycoly', 'Sizzlipede', 'Vulpix', 'Growlithe', 'Tyrogue', 'Galarian Zigzagoon', 'Stunky', 'Trubbish', 'Cherubi', 'Mudbray', 'Pancham', 'Klink', 'Machop'],
        headbutt: ['Skwovet'],
    }),
    [new TemporaryBattleRequirement('Hop 3')],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 4', Region.galar, 13,
    new RoutePokemon({
        land: ['Yamper', 'Cutiefly', 'Wooloo', 'Milcery', 'Galarian Meowth', 'Budew', 'Ferroseed', 'Joltik', 'Pikachu', 'Eevee', 'Electrike', 'Pumpkaboo (Average)', 'Pumpkaboo (Small)', 'Pumpkaboo (Large)', 'Pumpkaboo (Super Size)', 'Diglett'],
        water: ['Magikarp', 'Goldeen', 'Chewtle'],
        headbutt: ['Skwovet'],
    }),
    [new TemporaryBattleRequirement('Bede 1')],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 5', Region.galar, 14,
    new RoutePokemon({
        land: ['Dottler', 'Drifloon', 'Applin', 'Eldegoss', 'Galarian Farfetch\'d', 'Wobbuffet', 'Minccino', 'Spritzee', 'Swirlix', 'Stufful', 'Espurr', 'Nincada', 'Dewpider', 'Nuzleaf', 'Lombre'],
        water: ['Magikarp', 'Chewtle', 'Goldeen'],
        headbutt: ['Skwovet'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Grass)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Motostoke Outskirts', Region.galar, 15,
    new RoutePokemon({
        land: ['Impidimp', 'Chewtle', 'Koffing', 'Hatenna', 'Noctowl', 'Throh', 'Sawk', 'Sudowoodo', 'Salandit', 'Pawniard', 'Scraggy', 'Croagunk', 'Roggenrola'],
    }),
    [new TemporaryBattleRequirement('Bede 2')],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Motostoke Riverbank', Region.galar, 16,
    new RoutePokemon({
        land: ['Purrloin', 'Corvisquire', 'Eldegoss', 'Sigilyph'],
        water: ['Arrokuda', 'Barraskewda', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Mareanie', 'Mantyke', 'Wailmer'],
        headbutt: ['Greedent', 'Skwovet', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Skorupi', 'Gossifleur', 'Wooloo', 'Munchlax', 'Noctowl', 'Dubwool', 'Snorlax', 'Drapion', 'Conkeldurr'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Koffing', 'Cutiefly', 'Rookidee', 'Sawk', 'Throh', 'Skorupi', 'Noctowl', 'Dubwool', 'Snorlax', 'Ribombee', 'Conkeldurr'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Skorupi', 'Wimpod', 'Chewtle', 'Dewpider', 'Karrablast', 'Shelmet', 'Binacle', 'Snorlax', 'Drapion', 'Conkeldurr'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Yamper', 'Skorupi', 'Chewtle', 'Shellos (East)', 'Wimpod', 'Boltund', 'Snorlax', 'Drapion', 'Conkeldurr'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Sneasel', 'Cutiefly', 'Vanillite', 'Wooloo', 'Noctowl', 'Snorlax', 'Ribombee', 'Conkeldurr'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Sneasel', 'Vanillite', 'Cutiefly', 'Pawniard', 'Ferroseed', 'Snorlax', 'Ribombee', 'Conkeldurr'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Rhyhorn', 'Skorupi', 'Salandit', 'Torkoal', 'Rolycoly', 'Litwick', 'Noctowl', 'Snorlax', 'Drapion', 'Rhydon'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Skorupi', 'Sudowoodo', 'Rolycoly', 'Rhyhorn', 'Onix', 'Noctowl', 'Snorlax', 'Ribombee', 'Rhydon'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Clefairy', 'Wobbuffet', 'Cutiefly', 'Duskull', 'Espurr', 'Elgyem', 'Noctowl', 'Clefable', 'Ribombee', 'Conkeldurr'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new MultiRequirement([
            new RouteKillRequirement(10, Region.galar, 9),
            new GymBadgeRequirement(BadgeEnums.Galar_Fire),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Bridge Field', Region.galar, 17,
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
    [new RouteKillRequirement(10, Region.galar, 16)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Stony Wilderness', Region.galar, 18,
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
    [new RouteKillRequirement(10, Region.galar, 17)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Giant\'s Mirror', Region.galar, 19,
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
          new SpecialRoutePokemon(['Swirlix', 'Spritzee', 'Morelull', 'Natu', 'Cutiefly', 'Gloom', 'Impidimp', 'Milcery', 'Mimikyu', 'Machamp', 'Sudowoodo', 'Xatu', 'Vikavolt', 'Frillish'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [
        new OneFromManyRequirement([
            new RouteKillRequirement(10, Region.galar, 18),
            new ClearDungeonRequirement(1, getDungeonIndex('Dusty Bowl')),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Giant\'s Cap', Region.galar, 20,
    new RoutePokemon({
        land: ['Minccino', 'Drednaw', 'Orbeetle', 'Corviknight', 'Coalossal', 'Rolycoly', 'Boldore', 'Rhydon'],
        water: ['Goldeen', 'Krabby', 'Corphish', 'Gyarados'],
        headbutt: ['Greedent', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Noctowl', 'Galarian Linoone', 'Liepard', 'Scraggy', 'Croagunk', 'Nuzleaf', 'Lombre', 'Dottler', 'Eldegoss', 'Stunky', 'Doublade', 'Cinccino', 'Gengar'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Galarian Linoone', 'Scraggy', 'Croagunk', 'Gloom', 'Noctowl', 'Eldegoss', 'Dottler', 'Munna', 'Karrablast', 'Shelmet', 'Doublade', 'Cinccino', 'Gengar'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Quagsire', 'Noctowl', 'Galarian Linoone', 'Palpitoad', 'Shellos (East)', 'Dottler', 'Eldegoss', 'Doublade', 'Seismitoad', 'Golisopod'], new WeatherRequirement([WeatherType.Rain])),
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
            new RouteKillRequirement(10, Region.galar, 18),
            new RouteKillRequirement(10, Region.galar, 21),
            new ClearDungeonRequirement(1, getDungeonIndex('Dusty Bowl')),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Lake of Outrage', Region.galar, 21,
    new RoutePokemon({
        land: ['Golurk', 'Ditto', 'Corviknight', 'Hatterene'],
        water: ['Mantyke', 'Mantine', 'Barraskewda', 'Lanturn', 'Qwilfish', 'Gyarados'],
        headbutt: ['Greedent', 'Cherubi'],
        special:
      [
          new SpecialRoutePokemon(['Beheeyem', 'Braviary', 'Mandibuzz', 'Sigilyph', 'Obstagoon', 'Bewear', 'Orbeetle', 'Leafeon', 'Gardevoir', 'Seaking', 'Lapras', 'Jellicent'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Garbodor', 'Drapion', 'Galarian Weezing', 'Hitmontop', 'Skuntank', 'Grimmsnarl', 'Pangoro', 'Falinks', 'Jangmo-o', 'Espeon', 'Shiinotic', 'Seaking', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Seismitoad', 'Araquanid', 'Golisopod', 'Rotom', 'Pelipper', 'Cramorant (Gulping)', 'Quagsire', 'Barbaracle', 'Deino', 'Goomy', 'Vaporeon', 'Shiinotic', 'Lapras', 'Jellicent'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Galvantula', 'Noivern', 'Haxorus', 'Morpeko', 'Rotom', 'Boltund', 'Jellicent', 'Zweilous', 'Drampa', 'Sliggoo', 'Hakamo-o', 'Jolteon', 'Gardevoir', 'Shiinotic', 'Seaking', 'Lapras'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Glalie', 'Vanilluxe', 'Abomasnow', 'Bergmite', 'Snom', 'Piloswine', 'Galarian Mr. Mime', 'Obstagoon', 'Eiscue (Ice Face)', 'Glaceon', 'Avalugg', 'Lapras'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Klinklang', 'Bisharp', 'Vanilluxe', 'Copperajah', 'Perrserker', 'Doublade', 'Togedemaru', 'Duraludon', 'Eiscue (Ice Face)', 'Glaceon', 'Avalugg', 'Lapras'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Ninetales', 'Arcanine', 'Durant', 'Heatmor', 'Lampent', 'Flygon', 'Rhydon', 'Coalossal', 'Sandaconda', 'Turtonator', 'Stonjourner', 'Jangmo-o', 'Larvitar', 'Flareon', 'Chandelure', 'Seaking', 'Pelipper', 'Jellicent'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Excadrill', 'Boldore', 'Zweilous', 'Pupitar', 'Dugtrio', 'Hippowdon', 'Obstagoon', 'Stonjourner', 'Umbreon', 'Rhydon', 'Seaking'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Wobbuffet', 'Gothitelle', 'Reuniclus', 'Claydol', 'Bronzong', 'Gardevoir', 'Sylveon', 'Milotic', 'Lapras', 'Seaking'], new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Dreepy'], new MultiRequirement([new ObtainedPokemonRequirement('Dreepy'), new WeatherRequirement([WeatherType.Overcast, WeatherType.Thunderstorm, WeatherType.Fog])])),
          new SpecialRoutePokemon(['Drakloak'], new MultiRequirement([new ObtainedPokemonRequirement('Drakloak'), new WeatherRequirement([WeatherType.Overcast, WeatherType.Rain, WeatherType.Thunderstorm, WeatherType.Fog])])),
          new SpecialRoutePokemon(['Grapploct'], new ObtainedPokemonRequirement('Grapploct')),
      ],
    }),
    [
        new MultiRequirement([
            new RouteKillRequirement(10, Region.galar, 20),
            new RouteKillRequirement(10, Region.galar, 25),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Hammerlocke Hills', Region.galar, 22,
    new RoutePokemon({
        land: ['Pumpkaboo (Average)', 'Pumpkaboo (Small)', 'Pumpkaboo (Large)', 'Pumpkaboo (Super Size)', 'Klink', 'Unfezant', 'Corvisquire', 'Hawlucha', 'Corviknight', 'Copperajah', 'Gourgeist (Average)', 'Gourgeist (Small)', 'Gourgeist (Large)', 'Gourgeist (Super Size)'],
        special:
      [
          new SpecialRoutePokemon(['Espurr', 'Inkay', 'Dubwool', 'Machoke', 'Sudowoodo', 'Wobbuffet', 'Stufful', 'Vileplume', 'Klang'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Machoke', 'Espurr', 'Inkay', 'Thievul', 'Wobbuffet', 'Stufful', 'Roserade', 'Klang'], new WeatherRequirement([WeatherType.Overcast])),
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
            new RouteKillRequirement(10, Region.galar, 19),
            new RouteKillRequirement(10, Region.galar, 20),
        ]),
    ],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 6', Region.galar, 23,
    new RoutePokemon({
        land: ['Silicobra', 'Torkoal', 'Duskull', 'Hippopotas', 'Skorupi', 'Heatmor', 'Durant', 'Hawlucha', 'Dugtrio', 'Trapinch', 'Axew', 'Maractus', 'Galarian Yamask', 'Helioptile'],
        water: ['Goldeen', 'Magikarp', 'Drednaw'],
        headbutt: ['Greedent'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Fire)],
    undefined,
    GalarSubRegions.NorthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 7', Region.galar, 24,
    new RoutePokemon({
        land: ['Thievul', 'Corviknight', 'Perrserker', 'Morpeko', 'Liepard', 'Seismitoad', 'Karrablast', 'Shelmet', 'Meowstic', 'Galvantula', 'Inkay'],
        headbutt: ['Greedent'],
    }),
    [new TemporaryBattleRequirement('Hop 6')],
    undefined,
    GalarSubRegions.NorthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 8', Region.galar, 25,
    new RoutePokemon({
        land: ['Sandaconda', 'Haunter', 'Rhyhorn', 'Dusclops', 'Bronzong', 'Hippowdon', 'Drapion', 'Solrock', 'Lunatone', 'Boldore', 'Gurdurr', 'Golett', 'Pawniard', 'Rufflet', 'Vullaby', 'Togedemaru', 'Crustle', 'Falinks'],
    }),
    [new RouteKillRequirement(10, Region.galar, 24)],
    undefined,
    GalarSubRegions.NorthGalar,
));
Routes.add(new RegionRoute(
    'Steamdrift Way', Region.galar, 26,
    new RoutePokemon({
        land: ['Sneasel', 'Delibird', 'Snover', 'Galarian Darumaka', 'Snorunt', 'Snom', 'Throh', 'Sawk', 'Vanillish'],
    }),
    [new RouteKillRequirement(10, Region.galar, 25)],
    undefined,
    GalarSubRegions.NorthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 2 Lakeside', Region.galar, 27,
    new RoutePokemon({
        land: ['Lotad', 'Seedot', 'Purrloin', 'Blipbug', 'Gossifleur', 'Chewtle', 'Galarian Zigzagoon', 'Nickit', 'Yamper', 'Obstagoon'],
        water: ['Lapras', 'Drednaw', 'Gyarados', 'Arrokuda', 'Barraskewda', 'Magikarp', 'Feebas'],
    }),
    [new RouteKillRequirement(10, Region.galar, 25)],
    undefined,
    GalarSubRegions.SouthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 9', Region.galar, 28,
    new RoutePokemon({
        land: ['Octillery', 'Kingler', 'Pyukumuku', 'Gastrodon (East)', 'Jellicent', 'Mareanie', 'Glalie', 'Pelipper', 'Pincurchin'],
        water: ['Wishiwashi (Solo)', 'Qwilfish', 'Mantyke'],
        special:
      [
          new SpecialRoutePokemon(['Cramorant'], new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Sunny, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy])),
          new SpecialRoutePokemon(['Cramorant (Gulping)'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Cramorant (Gorging)'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Clobbopus'], new ObtainedPokemonRequirement('Clobbopus')),
      ],
    }),
    [new QuestLineStepCompletedRequirement('The Darkest Day', 5)],
    undefined,
    GalarSubRegions.NorthGalar,
));
Routes.add(new RegionRoute(
    'Circhester Bay', Region.galar, 29,
    new RoutePokemon({
        land: ['Gastrodon (East)', 'Inkay', 'Octillery', 'Barbaracle', 'Bergmite', 'Toxapex', 'Dhelmise', 'Pincurchin'],
        water: ['Lapras', 'Mantine', 'Mantyke', 'Wailmer', 'Wailord', 'Remoraid'],
        special:
      [
          new SpecialRoutePokemon(['Cramorant'], new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Sunny, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy])),
          new SpecialRoutePokemon(['Cramorant (Gulping)'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Cramorant (Gorging)'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Clobbopus'], new ObtainedPokemonRequirement('Clobbopus')),
          new SpecialRoutePokemon(['Grapploct'], new ObtainedPokemonRequirement('Grapploct')),
      ],
        headbutt: ['Greedent'],
    }),
    [new RouteKillRequirement(10, Region.galar, 28)],
    undefined,
    GalarSubRegions.NorthGalar,
));
Routes.add(new RegionRoute(
    'Outer Spikemuth', Region.galar, 30,
    new RoutePokemon({
        land: ['Liepard', 'Thievul', 'Perrserker', 'Morpeko', 'Jellicent', 'Bergmite', 'Mareanie', 'Toxapex', 'Dhelmise'],
        headbutt: ['Greedent'],
        special: [new SpecialRoutePokemon(['Clobbopus'], new ObtainedPokemonRequirement('Clobbopus'))],
    }),
    [new RouteKillRequirement(10, Region.galar, 29)],
    undefined,
    GalarSubRegions.NorthGalar,
));
Routes.add(new RegionRoute(
    'Winter Hill Station', Region.galar, 31,
    new RoutePokemon({
        land: ['Snom', 'Rhydon', 'Galarian Darumaka', 'Galarian Mr. Mime', 'Vanillish', 'Klang', 'Glalie', 'Snover', 'Vanilluxe', 'Cubchoo'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Galar_Dragon)],
    undefined,
    GalarSubRegions.NorthGalar,
));
Routes.add(new RegionRoute(
    'Galar Route 10', Region.galar, 32,
    new RoutePokemon({
        land: ['Snom', 'Duraludon', 'Stonjourner', 'Beartic', 'Vanillish', 'Abomasnow', 'Galarian Darumaka', 'Galarian Mr. Mime', 'Sneasel', 'Snover', 'Cubchoo'],
        special:
      [
          new SpecialRoutePokemon(['Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Rain, WeatherType.Thunderstorm, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy])),
          new SpecialRoutePokemon(['Eiscue (Noice Face)'], new WeatherRequirement([WeatherType.Sunny])),
      ],
    }),
    [new RouteKillRequirement(10, Region.galar, 31)],
    undefined,
    GalarSubRegions.NorthGalar,
));

/*
ISLE OF ARMOR
*/
Routes.add(new RegionRoute(
    'Fields of Honour', Region.galar, 33,
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
            new TemporaryBattleRequirement('Klara 1'),
            new TemporaryBattleRequirement('Avery 1'),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Soothing Wetlands', Region.galar, 34,
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
    [new RouteKillRequirement(10, Region.galar, 33)],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Forest of Focus', Region.galar, 35,
    new RoutePokemon({
        land: ['Venipede', 'Foongus', 'Tangela', 'Pikachu', 'Passimian', 'Oranguru', 'Happiny', 'Karrablast'],
        water: ['Magikarp', 'Goldeen', 'Arrokuda', 'Corphish'],
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
            new RouteKillRequirement(10, Region.galar, 34),
            new RouteKillRequirement(10, Region.galar, 36),
            new RouteKillRequirement(10, Region.galar, 38),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Challenge Beach', Region.galar, 36,
    new RoutePokemon({
        land: ['Magnemite', 'Psyduck', 'Dedenne', 'Morpeko', 'Blipbug', 'Buneary', 'Jigglypuff', 'Happiny'],
        water: ['Magikarp', 'Wishiwashi (Solo)', 'Dhelmise', 'Staryu', 'Pelipper', 'Tentacool', 'Wingull'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Lopunny', 'Comfey', 'Drednaw', 'Marill', 'Cramorant', 'Kingler', 'Starmie', 'Tentacruel', 'Gyarados', 'Octillery', 'Barraskewda'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Chansey', 'Inkay', 'Drapion', 'Malamar', 'Drednaw', 'Crawdaunt', 'Drifblim', 'Swoobat', 'Cramorant', 'Toxapex', 'Starmie', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Shinx', 'Malamar', 'Crawdaunt', 'Golisopod', 'Cramorant (Gulping)', 'Drapion', 'Starmie', 'Kingler', 'Toxapex', 'Tentacruel', 'Cloyster', 'Gyarados', 'Jellicent', 'Barraskewda'], new WeatherRequirement([WeatherType.Rain])),
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
            new RouteKillRequirement(10, Region.galar, 34),
            new RouteKillRequirement(10, Region.galar, 35),
            new RouteKillRequirement(10, Region.galar, 42),
            new RouteKillRequirement(10, Region.galar, 44),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Loop Lagoon', Region.galar, 37,
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
          new SpecialRoutePokemon(['Grapploct'], new MultiRequirement([new ObtainedPokemonRequirement('Grapploct'), new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Sunny, WeatherType.Fog])])),
          new SpecialRoutePokemon(['Clobbopus'], new ObtainedPokemonRequirement('Clobbopus')),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [
        new OneFromManyRequirement([
            new ClearDungeonRequirement(1, getDungeonIndex('Courageous Cavern')),
            new RouteKillRequirement(10, Region.galar, 42),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Training Lowlands', Region.galar, 38,
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
            new RouteKillRequirement(10, Region.galar, 35),
            new ClearDungeonRequirement(1, getDungeonIndex('Brawlers\' Cave')),
            new RouteKillRequirement(10, Region.galar, 44),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Potbottom Desert', Region.galar, 39,
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
    [new ClearDungeonRequirement(1, getDungeonIndex('Warm-Up Tunnel'))],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Challenge Road', Region.galar, 40,
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
            new RouteKillRequirement(10, Region.galar, 38),
            new ClearDungeonRequirement(1, getDungeonIndex('Brawlers\' Cave')),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Workout Sea', Region.galar, 41,
    new RoutePokemon({
        land: ['Blipbug', 'Ditto', 'Exeggcute', 'Happiny'],
        water: ['Magikarp', 'Remoraid', 'Octillery', 'Sharpedo', 'Mantyke', 'Wingull', 'Tentacool', 'Clauncher', 'Skrelp', 'Gyarados', 'Clawitzer', 'Dragalge'],
        special:
      [
          new SpecialRoutePokemon(['Chansey', 'Exeggutor', 'Rotom (Mow)'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Chansey', 'Rotom (Fan)', 'Tentacruel', 'Jellicent'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Chansey', 'Rotom (Frost)', 'Pelipper'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Chansey', 'Rotom (Wash)', 'Pelipper', 'Chinchou', 'Lanturn'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Chansey', 'Exeggutor', 'Rotom (Heat)', 'Fletchinder'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Chansey', 'Rotom'], new WeatherRequirement([WeatherType.Sandstorm])),
          new SpecialRoutePokemon(['Blissey', 'Rotom', 'Drifloon', 'Jellicent', 'Wailord'], new WeatherRequirement([WeatherType.Fog])),
      ],
        headbutt: ['Skwovet', 'Applin'],
    }),
    [new RouteKillRequirement(10, Region.galar, 33)],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Stepping-Stone Sea', Region.galar, 42,
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
            new RouteKillRequirement(10, Region.galar, 36),
            new RouteKillRequirement(10, Region.galar, 37),
            new RouteKillRequirement(10, Region.galar, 41),
            new RouteKillRequirement(10, Region.galar, 43),
            new RouteKillRequirement(10, Region.galar, 44),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Insular Sea', Region.galar, 43,
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
            new RouteKillRequirement(10, Region.galar, 42),
            new RouteKillRequirement(10, Region.galar, 44),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Honeycalm Sea', Region.galar, 44,
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
            new RouteKillRequirement(10, Region.galar, 36),
            new RouteKillRequirement(10, Region.galar, 38),
            new RouteKillRequirement(10, Region.galar, 42),
            new RouteKillRequirement(10, Region.galar, 43),
        ]),
    ],
    undefined,
    GalarSubRegions.IsleofArmor,
));
Routes.add(new RegionRoute(
    'Honeycalm Island', Region.galar, 45,
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
    [new RouteKillRequirement(10, Region.galar, 44)],
    undefined,
    GalarSubRegions.IsleofArmor,
));

// Crown Tundra
Routes.add(new RegionRoute(
    'Slippery Slope', Region.galar, 46,
    new RoutePokemon({
        land: ['Snom', 'Piloswine', 'Jynx', 'Audino', 'Mime Jr.', 'Smoochum', 'Swinub'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Wooloo', 'Mamoswine', 'Snorlax'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Phantump', 'Trevenant', 'Weavile', 'Mamoswine'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Cryogonal', 'Mamoswine', 'Abomasnow', 'Swablu'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Mamoswine', 'Glalie', 'Froslass'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Wooloo', 'Magby', 'Snorlax', 'Mamoswine', 'Magmortar'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hatenna', 'Impidimp', 'Gothorita', 'Mimikyu', 'Duosion', 'Gothita', 'Solosis', 'Hattrem', 'Grimmsnarl', 'Gothitelle', 'Reuniclus'], new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Amaura'], new ObtainedPokemonRequirement('Amaura')),
      ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new TemporaryBattleRequirement('Peony')],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Frostpoint Field', Region.galar, 47,
    new RoutePokemon({
        land: ['Abomasnow', 'Jynx', 'Audino', 'Mime Jr.', 'Snover', 'Smoochum'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Wooloo', 'Nidoran(M)', 'Nidoran(F)', 'Snorlax'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Nidoran(M)', 'Nidoran(F)', 'Weavile', 'Snorlax'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Nidoran(M)', 'Nidoran(F)', 'Vanilluxe'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Nidoran(M)', 'Nidoran(F)', 'Vanilluxe', 'Absol', 'Eevee'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Magby', 'Nidoran(M)', 'Nidoran(F)', 'Snorlax'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Gothorita', 'Duosion', 'Mimikyu', 'Hatenna', 'Gothita', 'Solosis', 'Hatterene', 'Gothitelle', 'Reuniclus'], new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Amaura'], new ObtainedPokemonRequirement('Amaura')),
      ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, Region.galar, 46)],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Giant\'s Bed', Region.galar, 48,
    new RoutePokemon({
        land: ['Nidoran(M)', 'Nidoran(F)', 'Stonjourner', 'Bronzong', 'Audino', 'Mime Jr.', 'Shelmet', 'Nidorino', 'Nidorina'],
        water: ['Magikarp', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados', 'Whiscash', 'Feebas'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Gurdurr', 'Eevee', 'Wooloo', 'Nidoking', 'Nidoqueen', 'Conkeldurr', 'Leafeon', 'Snorlax'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Galarian Linoone', 'Lampent', 'Nidoking', 'Nidoqueen', 'Obstagoon', 'Umbreon', 'Snorlax', 'Chandelure', 'Altaria'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Nidoking', 'Nidoqueen', 'Obstagoon', 'Vaporeon', 'Snorlax'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Dewpider', 'Elekid', 'Electivire', 'Jolteon', 'Nidoking', 'Snorlax'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Snorunt', 'Cryogonal', 'Vanillish', 'Vanillite', 'Nidoking', 'Nidoqueen', 'Vanilluxe', 'Espeon', 'Glalie', 'Froslass', 'Snorlax'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Snorunt', 'Cryogonal', 'Vanillish', 'Absol', 'Vanillite', 'Glalie', 'Froslass', 'Glaceon', 'Nidoking', 'Nidoqueen', 'Vanilluxe', 'Snorlax'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Heatmor', 'Durant', 'Wooloo', 'Magby', 'Nidoqueen', 'Flareon', 'Magmortar', 'Snorlax'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Morgrem', 'Lampent', 'Clefairy', 'Mimikyu', 'Hatenna', 'Nidoking', 'Nidoqueen', 'Grimmsnarl', 'Hatterene', 'Clefable', 'Snorlax', 'Sylveon', 'Chandelure', 'Milotic'], new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Aerodactyl'], new ObtainedPokemonRequirement('Aerodactyl')),
          new SpecialRoutePokemon(['Lileep'], new ObtainedPokemonRequirement('Lileep')),
      ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, Region.galar, 47)],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Old Cemetery', Region.galar, 49,
    new RoutePokemon({
        land: ['Nidoran(M)', 'Nidoran(F)', 'Sinistea', 'Audino', 'Mime Jr.', 'Karrablast', 'Drakloak'],
        special:
      [
          new SpecialRoutePokemon(['Lampent', 'Phantump', 'Trevenant', 'Dragapult'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Dragapult'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Elekid', 'Dragapult'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Froslass', 'Dragapult'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Absol', 'Vanillite', 'Froslass', 'Dragapult'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Magmar', 'Heatmor', 'Durant', 'Magby', 'Dragapult'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Lampent', 'Galarian Ponyta', 'Mimikyu', 'Hatenna', 'Galarian Rapidash'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, Region.galar, 48)],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Giant\'s Foot', Region.galar, 50,
    new RoutePokemon({
        land: ['Copperajah', 'Bronzong', 'Stonjourner', 'Audino', 'Claydol', 'Mime Jr.', 'Cufant', 'Bronzor'],
        water: ['Magikarp', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados', 'Whiscash', 'Feebas'],
        special:
      [
          new SpecialRoutePokemon(['Centiskorch', 'Gurdurr', 'Sizzlipede'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Phantump', 'Altaria'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Electabuzz', 'Galvantula', 'Elekid'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Snorunt', 'Cryogonal', 'Vanillish', 'Vanillite'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Snorunt', 'Cryogonal', 'Vanillish', 'Vanillite', 'Absol'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Centiskorch', 'Magmar', 'Sizzlipede', 'Magby'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Morgrem', 'Mimikyu', 'Hatenna'], new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Omanyte'], new ObtainedPokemonRequirement('Omanyte')),
          new SpecialRoutePokemon(['Kabuto'], new ObtainedPokemonRequirement('Kabuto')),
          new SpecialRoutePokemon(['Lileep'], new ObtainedPokemonRequirement('Lileep')),
          new SpecialRoutePokemon(['Archen'], new ObtainedPokemonRequirement('Archen')),
      ],
        headbutt: ['Skwovet', 'Greedent'],
    }),
    [new RouteKillRequirement(10, Region.galar, 48)],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Frigid Sea', Region.galar, 51,
    new RoutePokemon({
        land: ['Bergmite', 'Mime Jr.', 'Audino'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Wailmer', 'Gyarados', 'Dhelmise', 'Spheal', 'Avalugg'],
        special:
      [
          new SpecialRoutePokemon(['Sealeo', 'Walrein', 'Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Sneasel', 'Altaria', 'Sealeo', 'Walrein', 'Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Sealeo', 'Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Electabuzz', 'Pincurchin', 'Dewpider', 'Elekid', 'Electivire', 'Sealeo', 'Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Vanillish', 'Beartic', 'Vanillite', 'Sealeo', 'Walrein', 'Cryogonal', 'Lapras', 'Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Hail, WeatherType.Sandstorm, WeatherType.Windy])),
          new SpecialRoutePokemon(['Eiscue (Noice Face)'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Vanillish', 'Beartic', 'Vanillite', 'Sealeo', 'Walrein', 'Cryogonal', 'Lapras', 'Absol', 'Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Hatenna', 'Hatterene', 'Sealeo', 'Walrein', 'Eiscue (Ice Face)'], new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Tirtouga'], new ObtainedPokemonRequirement('Tirtouga')),
          new SpecialRoutePokemon(['Carracosta'], new MultiRequirement([new ObtainedPokemonRequirement('Carracosta'), new WeatherRequirement([WeatherType.Clear, WeatherType.Rain, WeatherType.Thunderstorm])])),
      ],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Roaring-Sea Caves'))],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Three-Point Pass', Region.galar, 52,
    new RoutePokemon({
        land: ['Bronzong', 'Avalugg', 'Claydol', 'Golurk', 'Audino', 'Mime Jr.', 'Bronzor', 'Bergmite'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Wooloo', 'Dragapult'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Phantump', 'Dragapult'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Dewpider', 'Dragapult'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Dewpider', 'Elekid', 'Electivire'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Vanillite', 'Dragapult'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Absol', 'Vanillite', 'Dragapult'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Druddigon', 'Heatmor', 'Durant', 'Wooloo', 'Magby', 'Dragapult'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Hatenna', 'Dragapult'], new WeatherRequirement([WeatherType.Fog])),
      ],
    }),
    [new RouteKillRequirement(10, Region.galar, 51)],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Ballimere Lake', Region.galar, 53,
    new RoutePokemon({
        land: ['Boltund', 'Audino', 'Yamper', 'Mime Jr.', 'Aron'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Barboach', 'Gyarados', 'Whiscash', 'Feebas', 'Dratini', 'Relicanth'],
        special:
      [
          new SpecialRoutePokemon(['Gossifleur', 'Cottonee', 'Corvisquire', 'Shuckle', 'Eevee', 'Corviknight', 'Whimsicott', 'Coalossal'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Galarian Linoone', 'Morpeko', 'Noivern', 'Altaria', 'Obstagoon'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Araquanid', 'Cottonee', 'Noivern', 'Dewpider', 'Whimsicott', 'Dragonite', 'Eldegoss'], new WeatherRequirement([WeatherType.Rain])),
          new SpecialRoutePokemon(['Araquanid', 'Galvantula', 'Electabuzz', 'Morpeko', 'Dewpider', 'Elekid', 'Electivire', 'Dragonite', 'Coalossal', 'Dragonair'], new WeatherRequirement([WeatherType.Thunderstorm])),
          new SpecialRoutePokemon(['Cryogonal', 'Vanillish', 'Corvisquire', 'Vanillite', 'Vanilluxe', 'Coalossal'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Carkol', 'Magmar', 'Gossifleur', 'Shuckle', 'Magby', 'Magmortar'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Hattrem', 'Mimikyu', 'Hatenna', 'Hatterene', 'Coalossal', 'Dragonair'], new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Anorith'], new ObtainedPokemonRequirement('Anorith')),
          new SpecialRoutePokemon(['Armaldo'], new MultiRequirement([new ObtainedPokemonRequirement('Armaldo'), new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])])),
          new SpecialRoutePokemon(['Tyrunt'], new ObtainedPokemonRequirement('Tyrunt')),
          new SpecialRoutePokemon(['Tyrantrum'], new ObtainedPokemonRequirement('Tyrantrum')),
      ],
        headbutt: ['Skwovet', 'Greedent', 'Munchlax'],
    }),
    [new RouteKillRequirement(10, Region.galar, 48)],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Snowslide Slope', Region.galar, 54,
    new RoutePokemon({
        land: ['Snom', 'Beldum', 'Audino', 'Mime Jr.', 'Metang', 'Metagross'],
        water: ['Magikarp', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gyarados'],
        special:
      [
          new SpecialRoutePokemon(['Dubwool', 'Druddigon', 'Wooloo'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Phantump', 'Sneasel', 'Weavile', 'Trevenant'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Cryogonal', 'Snorunt', 'Vanillish', 'Beartic', 'Delibird', 'Vanillite', 'Glalie', 'Vanilluxe', 'Froslass'], new WeatherRequirement([WeatherType.Snow])),
          new SpecialRoutePokemon(['Cryogonal', 'Snorunt', 'Vanillish', 'Beartic', 'Delibird', 'Vanillite', 'Glalie', 'Vanilluxe', 'Froslass', 'Galarian Darumaka', 'Absol'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Dubwool', 'Magmar', 'Wooloo', 'Magby', 'Magmortar'], new WeatherRequirement([WeatherType.Sunny])),
          new SpecialRoutePokemon(['Morgrem', 'Mimikyu', 'Clefairy', 'Clefable', 'Grimmsnarl'], new WeatherRequirement([WeatherType.Fog])),
          new SpecialRoutePokemon(['Amaura'], new ObtainedPokemonRequirement('Amaura')),
          new SpecialRoutePokemon(['Aurorus'], new MultiRequirement([new ObtainedPokemonRequirement('Aurorus'), new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Blizzard, WeatherType.Fog])])),
      ],
    }),
    [new RouteKillRequirement(10, Region.galar, 48)],
    undefined,
    GalarSubRegions.CrownTundra,
));
Routes.add(new RegionRoute(
    'Path to the Peak', Region.galar, 55,
    new RoutePokemon({
        land: ['Snom', 'Frosmoth', 'Audino'],
        special:
      [
          new SpecialRoutePokemon(['Druddigon'], new WeatherRequirement([WeatherType.Clear])),
          new SpecialRoutePokemon(['Swablu', 'Altaria'], new WeatherRequirement([WeatherType.Overcast])),
          new SpecialRoutePokemon(['Absol'], new WeatherRequirement([WeatherType.Blizzard])),
          new SpecialRoutePokemon(['Druddigon', 'Salamence', 'Garchomp'], new WeatherRequirement([WeatherType.Sunny])),
      ],
    }),
    [new ClearDungeonRequirement(1, getDungeonIndex('Tunnel to the Top'))],
    undefined,
    GalarSubRegions.CrownTundra,
));

/*
Hisui
*/
Routes.add(new RegionRoute(
    'Aspiration Hill', Region.hisui, 1,
    new RoutePokemon({
        land: ['Bidoof', 'Starly', 'Shinx', 'Drifloon'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
));
Routes.add(new RegionRoute(
    'Horseshoe Plains', Region.hisui, 2,
    new RoutePokemon({
        land: ['Bidoof', 'Starly', 'Eevee', 'Drifloon', 'Buizel', 'Wurmple', 'Silcoon', 'Cascoon', 'Mime Jr.', 'Ponyta', 'Rapidash'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Sandgem Flats', Region.hisui, 3,
    new RoutePokemon({
        land: ['Mime Jr.', 'Mr. Mime', 'Drifblim', 'Abra', 'Kadabra', 'Luxio', 'Luxray', 'Shellos (West)', 'Gastrodon (West)', 'Alakazam', 'Staravia'],
        headbutt: ['Wormadam (Plant)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Deertrack Path', Region.hisui, 4,
    new RoutePokemon({
        land: ['Kricketot', 'Zubat', 'Munchlax', 'Starly', 'Drifloon'],
        headbutt: ['Burmy (Plant)', 'Geodude'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Deertrack Heights', Region.hisui, 5,
    new RoutePokemon({
        land: ['Geodude', 'Zubat', 'Golbat', 'Shinx', 'Stantler', 'Starly', 'Staravia', 'Chimchar', 'Monferno'],
        headbutt: ['Burmy (Plant)', 'Geodude'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Windswept Run', Region.hisui, 6,
    new RoutePokemon({
        land: ['Abra', 'Drifloon', 'Kricketot', 'Kricketune', 'Zubat', 'Buizel', 'Starly', 'Staravia'],
        headbutt: ['Burmy (Plant)', 'Geodude'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Nature\'s Pantry', Region.hisui, 7,
    new RoutePokemon({
        land: ['Kricketot', 'Kricketune', 'Pichu', 'Pikachu', 'Zubat', 'Paras', 'Parasect', 'Starly', 'Staravia'],
        headbutt: ['Burmy (Plant)', 'Geodude'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Worn Bridge', Region.hisui, 8,
    new RoutePokemon({
        land: ['Geodude', 'Zubat'],
        headbutt: ['Burmy (Plant)'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Gruelling Grove', Region.hisui, 9,
    new RoutePokemon({
        land: ['Combee', 'Heracross', 'Beautifly', 'Dustox', 'Mothim'],
        headbutt: ['Burmy (Plant)', 'Wormadam (Plant)'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Tidewater Dam', Region.hisui, 10,
    new RoutePokemon({
        land: ['Bidoof', 'Bibarel', 'Zubat', 'Golbat', 'Kricketot', 'Kricketune', 'Starly', 'Staravia'],
        headbutt: ['Burmy (Plant)', 'Geodude'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Obsidian Falls', Region.hisui, 11,
    new RoutePokemon({
        land: ['Gyarados'],
        water: ['Magikarp'],
        headbutt: ['Burmy (Plant)'],
    }),
    [new DevelopmentRequirement()],
));
// Basculegion
Routes.add(new RegionRoute(
    'Ramanas Island', Region.hisui, 12,
    new RoutePokemon({
        land: ['Shellos (West)', 'Gastrodon (West)', 'Aipom', 'Drifloon', 'Drifblim', 'Chimchar', 'Monferno', 'Infernape', 'Starly', 'Staravia'],
        headbutt: ['Combee', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Golden Lowlands', Region.hisui, 13,
    new RoutePokemon({
        land: ['Psyduck', 'Gastly', 'Budew', 'Kricketot', 'Kricketune', 'Paras', 'Parasect', 'Carnivine'],
        headbutt: ['Burmy (Sand)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Scarlet Bog', Region.hisui, 14,
    new RoutePokemon({
        land: ['Hippopotas', 'Hippowdon', 'Gastly', 'Haunter', 'Stunky', 'Skuntank', 'Croagunk', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Cloudpool Ridge', Region.hisui, 15,
    new RoutePokemon({
        land: ['Combee', 'Zubat', 'Golbat', 'Roselia', 'Kricketot', 'Kricketune', 'Paras', 'Parasect', 'Murkrow', 'Honchkrow', 'Roserade', 'Carnivine'],
        headbutt: ['Burmy (Sand)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Diamond Heath', Region.hisui, 16,
    new RoutePokemon({
        land: ['Paras', 'Parasect', 'Zubat', 'Golbat', 'Rhyhorn'],
        headbutt: ['Geodude', 'Graveler', 'Bonsly'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Cottonsedge Prairie', Region.hisui, 17,
    new RoutePokemon({
        land: ['Pachirisu', 'Togepi', 'Gastly', 'Haunter', 'Petilil'],
        headbutt: ['Combee', 'Vespiquen', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Droning Meadow', Region.hisui, 18,
    new RoutePokemon({
        land: ['Paras', 'Parasect', 'Gastly', 'Haunter', 'Bidoof', 'Bibarel', 'Yanma'],
        headbutt: ['Combee', 'Vespiquen', 'Pachirisu', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Bolderoll Slope', Region.hisui, 19,
    new RoutePokemon({
        land: ['Rhyhorn', 'Zubat', 'Zubat', 'Golbat', 'Geodude', 'Graveler'],
        headbutt: ['Burmy (Sand)'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Gapejaw Bog', Region.hisui, 20,
    new RoutePokemon({
        land: ['Bidoof', 'Bibarel', 'Gastly', 'Haunter', 'Croagunk', 'Tangela', 'Budew', 'Roselia', 'Geodude', 'Graveler', 'Ralts', 'Psyduck', 'Hippopotas', 'Tangrowth', 'Hippowdon', 'Carnivine', 'Yanma'],
        water: ['Barboach', 'Whiscash'],
        headbutt: ['Burmy (Sand)', 'Pachirisu'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Ursa\'s Ring', Region.hisui, 21,
    new RoutePokemon({
        land: ['Geodude', 'Graveler', 'Gastly', 'Haunter', 'Teddiursa', 'Ursaring', 'Yanma'],
        headbutt: ['Burmy (Sand)', 'Pachirisu'],
    }),
    [new DevelopmentRequirement()],
));
//Basculegion
Routes.add(new RegionRoute(
    'Holm of Trials', Region.hisui, 22,
    new RoutePokemon({
        land: ['Psyduck', 'Golduck', 'Gastly', 'Haunter', 'Croagunk', 'Toxicroak', 'Petilil', 'Goomy', 'Hisuian Sliggoo', 'Torterra', 'Carnivine'],
        headbutt: ['Burmy (Sand)', 'Pachirisu', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Crossing Slope', Region.hisui, 23,
    new RoutePokemon({
        land: ['Glameow', 'Purugly', 'Murkrow', 'Starly', 'Staravia', 'Drifloon', 'Drifblim'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Ginkgo Landing', Region.hisui, 24,
    new RoutePokemon({
        land: ['Skorupi', 'Murkrow', 'Spheal', 'Drifloon', 'Buizel', 'Floatzel', 'Walrein', 'Machoke'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Aipom Hill', Region.hisui, 25,
    new RoutePokemon({
        land: ['Aipom', 'Ambipom', 'Murkrow', 'Buizel', 'Floatzel', 'Combee', 'Mothim'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Bather\'s Lagoon', Region.hisui, 26,
    new RoutePokemon({
        land: ['Starly', 'Staravia', 'Togepi', 'Drifloon', 'Drifblim', 'Buizel', 'Floatzel', 'Psyduck', 'Golduck', 'Murkrow', 'Beautifly', 'Dustox'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Hideaway Bay', Region.hisui, 27,
    new RoutePokemon({
        land: ['Spheal', 'Sealeo', 'Murkrow', 'Happiny', 'Chansey', 'Aipom'],
        water: ['Remoraid'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Deadwood Haunt', Region.hisui, 28,
    new RoutePokemon({
        land: ['Duskull', 'Dusclops', 'Dusknoir', 'Chatot', 'Starly', 'Staravia', 'Staraptor', 'Drifloon', 'Drifblim'],
        headbutt: ['Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Sand\'s Reach', Region.hisui, 29,
    new RoutePokemon({
        land: ['Starly', 'Staravia', 'Drifloon', 'Drifblim'],
        water: ['Remoraid'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Castaway Shore', Region.hisui, 30,
    new RoutePokemon({
        land: ['Machop', 'Machoke', 'Murkrow', 'Skorupi', 'Drapion', 'Octillery'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Windbreak Stand', Region.hisui, 31,
    new RoutePokemon({
        land: ['Parasect', 'Stantler', 'Hisuian Growlithe'],
        headbutt: ['Wormadam (Trash)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Spring Path', Region.hisui, 32,
    new RoutePokemon({
        land: ['Bibarel', 'Toxicroak', 'Mothim'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Islespy Shore', Region.hisui, 33,
    new RoutePokemon({
        land: ['Sealeo', 'Walrein', 'Murkrow', 'Empoleon'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Tranquility Cove', Region.hisui, 34,
    new RoutePokemon({
        land: ['Shellos (East)', 'Staravia', 'Staraptor', 'Togepi', 'Togetic', 'Drifloon', 'Drifblim'],
        water: ['Mantyke', 'Mantine', 'Basculin (White-Striped)', 'Remoraid', 'Hisuian Qwilfish'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Geodude', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Lunker\'s Lair', Region.hisui, 35,
    new RoutePokemon({
        water: ['Tentacool', 'Tentacruel', 'Drifloon', 'Drifblim', 'Hisuian Qwilfish'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Seagrass Haven', Region.hisui, 36,
    new RoutePokemon({
        land: ['Shellos (East)', 'Gastrodon (East)'],
        water: ['Finneon', 'Lumineon', 'Drifloon', 'Drifblim', 'Tentacool', 'Tentacruel'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Tombolo Walk', Region.hisui, 37,
    new RoutePokemon({
        land: ['Happiny', 'Chansey'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Heavenward Lookout', Region.hisui, 38,
    new RoutePokemon({
        land: ['Luxio', 'Luxray', 'Paras', 'Parasect', 'Zubat', 'Golbat', 'Yanma', 'Yanmega'],
        headbutt: ['Burmy (Sand)', 'Wormadam (Sand)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Wayward Wood', Region.hisui, 39,
    new RoutePokemon({
        land: ['Stantler', 'Zubat', 'Golbat', 'Heracross', 'Paras', 'Parasect', 'Mothim'],
        water: ['Psyduck', 'Golduck'],
        headbutt: ['Bronzor'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Lonely Spring', Region.hisui, 40,
    new RoutePokemon({
        land: ['Carnivine'],
        water: ['Psyduck', 'Golduck'],
        headbutt: ['Cherubi', 'Cherrim (Overcast)', 'Bronzor'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Sonorous Path', Region.hisui, 41,
    new RoutePokemon({
        land: ['Shinx', 'Luxio', 'Luxray', 'Teddiursa', 'Ursaring'],
        headbutt: ['Heracross', 'Bronzor'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Celestica Trail', Region.hisui, 42,
    new RoutePokemon({
        land: ['Rhyhorn', 'Rhydon', 'Onix', 'Steelix', 'Hippopotas', 'Hippowdon', 'Chimecho', 'Hisuian Sneasel'],
        headbutt: ['Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Fabled Spring', Region.hisui, 43,
    new RoutePokemon({
        land: ['Cleffa', 'Clefairy', 'Clefable', 'Budew', 'Roselia'],
        water: ['Basculin (White-Striped)'],
        headbutt: ['Burmy (Sand)', 'Wormadam (Sand)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Bolderoll Ravine', Region.hisui, 44,
    new RoutePokemon({
        land: ['Geodude', 'Graveler', 'Golem', 'Gastly', 'Haunter', 'Machop', 'Machoke'],
        headbutt: ['Cherubi', 'Cherrim (Overcast)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Stonetooth Rows', Region.hisui, 45,
    new RoutePokemon({
        land: ['Bronzor', 'Bronzong', 'Rotom', 'Misdreavus', 'Mismagius'],
        headbutt: ['Burmy (Sand)', 'Wormadam (Sand)', 'Graveler'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Cloudcap Pass', Region.hisui, 46,
    new RoutePokemon({
        land: ['Elekid', 'Electabuzz', 'Electivire', 'Luxio', 'Luxray'],
        headbutt: ['Burmy (Sand)', 'Wormadam (Sand)', 'Nosepass'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Whiteout Valley', Region.hisui, 47,
    new RoutePokemon({
        land: ['Aipom', 'Snorunt'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Bonechill Wastes', Region.hisui, 48,
    new RoutePokemon({
        land: ['Swinub', 'Buneary', 'Lopunny', 'Gastly', 'Haunter', 'Glalie', 'Froslass', 'Bergmite', 'Snover', 'Abomasnow', 'Drifloon', 'Drifblim', 'Snorunt', 'Aipom', 'Piloswine'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Arena\'s Approach', Region.hisui, 49,
    new RoutePokemon({
        land: ['Machop', 'Machoke', 'Bergmite', 'Gligar', 'Duskull', 'Dusclops', 'Elekid', 'Electabuzz', 'Lickitung', 'Snorlax', 'Lucario', 'Lopunny', 'Aipom', 'Buneary', 'Munchlax', 'Riolu', 'Machamp', 'Piloswine'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Bergmite', 'Snorunt', 'Glalie'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Avalanche Slopes', Region.hisui, 50,
    new RoutePokemon({
        land: ['Aipom', 'Ambipom', 'Happiny', 'Chansey', 'Swinub', 'Piloswine', 'Gible', 'Gabite', 'Duskull', 'Dusclops', 'Snorunt', 'Glalie', 'Froslass', 'Lickitung', 'Lickilicky', 'Blissey', 'Garchomp'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Icebound Falls', Region.hisui, 51,
    new RoutePokemon({
        land: ['Machop', 'Machoke', 'Riolu', 'Lucario', 'Elekid', 'Electabuzz', 'Crobat'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Snorunt', 'Glalie'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Heart\'s Crag', Region.hisui, 52,
    new RoutePokemon({
        land: ['Ralts', 'Kirlia', 'Drifloon', 'Drifblim', 'Aipom', 'Ambipom', 'Gardevoir', 'Rufflet'],
        water: ['Basculin (White-Striped)'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Snorunt', 'Glalie'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Snowfall Hot Spring', Region.hisui, 53,
    new RoutePokemon({
        land: ['Machoke', 'Lickitung', 'Snorlax', 'Lucario', 'Lopunny', 'Machop', 'Aipom', 'Buneary', 'Munchlax', 'Riolu'],
    }),
    [new DevelopmentRequirement()],
));
Routes.add(new RegionRoute(
    'Glacier Terrace', Region.hisui, 54,
    new RoutePokemon({
        land: ['Gligar', 'Drifloon', 'Drifblim', 'Aipom', 'Snover', 'Hisuian Sneasel', 'Abomasnow'],
        headbutt: ['Burmy (Trash)', 'Wormadam (Trash)', 'Snorunt', 'Glalie'],
    }),
    [new DevelopmentRequirement()],
));

/*
Paldea
*/
// I am currently unsure if fixed encounter only pokemon should be included. They have been for now, and are clearly separated.
Routes.add(new RegionRoute(
    'Poco Path', Region.paldea, 1,
    new RoutePokemon({
        land: ['Lechonk', 'Pawmi', 'Tarountula', 'Hoppip', 'Fletchling', 'Scatterbug', 'Wingull', 'Buizel'],
        water: ['Magikarp', 'Arrokuda'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_Volo)],
));
Routes.add(new RegionRoute(
    'South Province (Area One)', Region.paldea, 2,
    new RoutePokemon({
        land: ['Hoppip', 'Paldean Wooper', 'Wingull', 'Ralts', 'Combee', 'Sunkern', 'Buizel', 'Pawmi', 'Gastly', 'Fletchling', 'Scatterbug', 'Spewpa', 'Oricorio (Pom-Pom)', 'Lechonk', 'Tarountula', 'Fidough', 'Happiny', 'Pichu', 'Bonsly', 'Skwovet', 'Shroodle', 'Bounsweet', 'Igglybuff', 'Drowzee', /*Fixed encounter only:*/'Wiglett', 'Pachirisu', 'Flamigo', 'Gimmighoul (Chest)'],
        water: ['Magikarp', 'Arrokuda', 'Azurill', 'Chewtle', 'Psyduck', 'Surskit'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
));
Routes.add(new RegionRoute(
    'South Province (Area Two)', Region.paldea, 3,
    new RoutePokemon({
        land: ['Pikachu', 'Jigglypuff', 'Eevee', 'Mareep', 'Hoppip', 'Starly', 'Fletchling', 'Smoliv', 'Fidough', 'Maschiff', 'Happiny', 'Pichu', 'Bonsly', 'Bounsweet', 'Skwovet', 'Shroodle', 'Applin', 'Igglybuff', 'Rockruff', 'Misdreavus', 'Makuhita', 'Skiddo', 'Yungoos', 'Nacli', 'Sunkern', 'Combee', 'Flabébé (Red)', 'Flabébé (Yellow)', 'Flabébé (Orange)', 'Flabébé (Blue)', 'Flabébé (White)', 'Kricketot', 'Diglett', 'Gastly', 'Drowzee', 'Bronzor', 'Tinkatink', 'Squawkabilly (Green)', 'Squawkabilly (Blue)', 'Squawkabilly (Yellow)', 'Squawkabilly (White)', /*Fixed encounter only:*/'Staravia', 'Vespiquen', 'Gimmighoul (Chest)'],
        water: ['Psyduck', 'Magikarp', 'Azurill', 'Buizel', 'Chewtle', 'Arrokuda', 'Tadbulb'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
));
Routes.add(new RegionRoute(
    'South Province (Area Three)', Region.paldea, 4,
    new RoutePokemon({
        land: ['Growlithe', 'Gulpin', 'Spoink', 'Shuppet', 'Shinx', 'Oricorio (Baile)', 'Rookidee', 'Nymble', 'Pawmi', 'Klawf', 'Murkrow', 'Dunsparce', 'Happiny', 'Tandemaus', 'Squawkabilly (Green)', 'Squawkabilly (Blue)', 'Squawkabilly (Yellow)', 'Squawkabilly (White)', 'Drifloon', 'Makuhita', 'Yungoos', 'Skiddo', 'Nacli', 'Gastly', 'Drowzee', 'Bronzor', 'Tinkatink', /*Fixed encounter only:*/'Talonflame', 'Staraptor', 'Gimmighoul (Chest)'],
    }),
    [new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)],
));
