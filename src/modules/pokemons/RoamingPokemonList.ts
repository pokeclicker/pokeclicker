import { Observable } from 'knockout';
import BadgeEnums from '../enums/Badges';
import {
    KantoSubRegions, JohtoSubRegions, HoennSubRegions, SinnohSubRegions, UnovaSubRegions, KalosSubRegions, AlolaSubRegions, GalarSubRegions, HisuiSubRegions, PaldeaSubRegions, Region,
    getDungeonIndex, Starter, ResearchLevel,
} from '../GameConstants';
import GameHelper from '../GameHelper';
import ClearDungeonRequirement from '../requirements/ClearDungeonRequirement';
import GymBadgeRequirement from '../requirements/GymBadgeRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import QuestLineCompletedRequirement from '../requirements/QuestLineCompletedRequirement';
import QuestLineStepCompletedRequirement from '../requirements/QuestLineStepCompletedRequirement';
import TemporaryBattleRequirement from '../requirements/TemporaryBattleRequirement';
import StarterRequirement from '../requirements/StarterRequirement';
import RegionRoute from '../routes/RegionRoute';
import Routes from '../routes/Routes';
import SeededRand from '../utilities/SeededRand';
import { PokemonNameType } from './PokemonNameType';
import RoamingPokemon from './RoamingPokemon';
import RoamingGroup from './RoamingGroup';
import SpecialEventRequirement from '../requirements/SpecialEventRequirement';
import MoonCyclePhaseRequirement from '../requirements/MoonCyclePhaseRequirement';
import MoonCyclePhase from '../moonCycle/MoonCyclePhase';
import RouteKillRequirement from '../requirements/RouteKillRequirement';
import DayCyclePartRequirement from '../requirements/DayCyclePartRequirement';
import StatisticRequirement from '../requirements/StatisticRequirement';
import DayCyclePart from '../dayCycle/DayCyclePart';

export default class RoamingPokemonList {
    public static roamerGroups: RoamingGroup[][] = [
        [new RoamingGroup('Kanto', [KantoSubRegions.Kanto]), new RoamingGroup('Kanto - Sevii Islands', [KantoSubRegions.Sevii123, KantoSubRegions.Sevii4567])],
        [new RoamingGroup('Johto', [JohtoSubRegions.Johto])],
        [new RoamingGroup('Hoenn', [HoennSubRegions.Hoenn]), new RoamingGroup('Hoenn - Orre', [HoennSubRegions.Orre])],
        [new RoamingGroup('Sinnoh', [SinnohSubRegions.Sinnoh])],
        [new RoamingGroup('Unova', [UnovaSubRegions.Unova])],
        [new RoamingGroup('Kalos', [KalosSubRegions.Kalos])],
        [new RoamingGroup('Alola', [AlolaSubRegions.MelemeleIsland, AlolaSubRegions.AkalaIsland, AlolaSubRegions.UlaulaIsland, AlolaSubRegions.PoniIsland]), new RoamingGroup('Alola - Magikarp Jump', [AlolaSubRegions.MagikarpJump])],
        [new RoamingGroup('Galar - South', [GalarSubRegions.SouthGalar]), new RoamingGroup('Galar - North', [GalarSubRegions.NorthGalar]), new RoamingGroup('Galar - Isle of Armor', [GalarSubRegions.IsleofArmor]), new RoamingGroup('Galar - Crown Tundra', [GalarSubRegions.CrownTundra]), new RoamingGroup('Galar - Lental', [GalarSubRegions.Lental])],
        [new RoamingGroup('Hisui', [HisuiSubRegions.Hisui])],
        [new RoamingGroup('Paldea', [PaldeaSubRegions.Paldea]), new RoamingGroup('Paldea - Kitakami', [PaldeaSubRegions.Kitakami]), new RoamingGroup('Paldea - Blueberry Academy', [PaldeaSubRegions.BlueberryAcademy])],
    ];

    public static list: Partial<Record<Region, Array<Array<RoamingPokemon>>>> = {};
    public static increasedChanceRoute: Array<Array<Observable<RegionRoute>>> = new Array(GameHelper.enumLength(Region) - 2) // Remove None and Final
        .fill(0).map((v, i) => new Array(RoamingPokemonList.roamerGroups[i].length)
            .fill(0).map(() => ko.observable(undefined)));

    // How many hours between when the roaming Pokemon change routes for increased chances
    private static period = 8;

    public static add(region: Region, subRegionGroup: number, roamer: RoamingPokemon): void {
        if (!RoamingPokemonList.list[region]) {
            RoamingPokemonList.list[region] = [];
        }
        if (!RoamingPokemonList.list[region][subRegionGroup]) {
            RoamingPokemonList.list[region][subRegionGroup] = [];
        }
        RoamingPokemonList.list[region][subRegionGroup].push(roamer);
    }

    public static remove(region: Region, subRegionGroup: number, pokemonName: PokemonNameType): void {
        const index = RoamingPokemonList.list[region][subRegionGroup].findIndex((r) => r.pokemon.name === pokemonName);
        if (index >= 0) {
            RoamingPokemonList.list[region][subRegionGroup].splice(index, 1);
        }
    }

    public static getSubRegionalGroupRoamers(region: Region, subRegionGroup: number, route: number): Array<RoamingPokemon> {
        return RoamingPokemonList.list[region] && RoamingPokemonList.list[region][subRegionGroup]
            ? RoamingPokemonList.list[region][subRegionGroup].filter((p) => p.isRoaming(route))
            : [];
    }

    public static getIncreasedChanceRouteBySubRegionGroup(region: Region, subRegionGroup: number): Observable<RegionRoute> {
        return RoamingPokemonList.increasedChanceRoute[region]?.[subRegionGroup];
    }

    public static generateIncreasedChanceRoutes(date = new Date()) {
        // Seed the random runmber generator
        SeededRand.seedWithDateHour(date, this.period);

        RoamingPokemonList.increasedChanceRoute.forEach((subRegionGroups, region) => {
            subRegionGroups.forEach((route, group) => {
                const routes = Routes.getRoutesByRegion(region).filter((r) => this.findGroup(region, r.subRegion ?? 0) === group);
                // Select a route
                const selectedRoute = SeededRand.fromArray(routes);
                route(selectedRoute);
            });
        });
    }

    public static findGroup(region: Region, subRegion: number) {
        return this.roamerGroups[region].findIndex((g) => g.subRegions.includes(subRegion));
    }
}

// Kanto
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Mew'));

// Kanto - Sevii Islands
RoamingPokemonList.add(Region.kanto, 1, new RoamingPokemon('Raikou', new QuestLineCompletedRequirement('Celio\'s Errand')));
RoamingPokemonList.add(Region.kanto, 1, new RoamingPokemon('Entei', new QuestLineCompletedRequirement('Celio\'s Errand')));
RoamingPokemonList.add(Region.kanto, 1, new RoamingPokemon('Suicune', new MultiRequirement([new QuestLineCompletedRequirement('Celio\'s Errand'), new ObtainedPokemonRequirement('Suicune')])));
RoamingPokemonList.add(Region.kanto, 1, new RoamingPokemon('Pink Butterfree', new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion)));
RoamingPokemonList.add(Region.kanto, 1, new RoamingPokemon('Ash\'s Butterfree', new GymBadgeRequirement(BadgeEnums.Elite_OrangeChampion)));

// Johto
RoamingPokemonList.add(Region.johto, 0, new RoamingPokemon('Raikou', new QuestLineStepCompletedRequirement('The Legendary Beasts', 3)));
RoamingPokemonList.add(Region.johto, 0, new RoamingPokemon('Entei', new QuestLineStepCompletedRequirement('The Legendary Beasts', 3)));

// Hoenn
RoamingPokemonList.add(Region.hoenn, 0, new RoamingPokemon('Latios', new QuestLineStepCompletedRequirement('The Eon Duo', 3)));
RoamingPokemonList.add(Region.hoenn, 0, new RoamingPokemon('Latias', new QuestLineStepCompletedRequirement('The Eon Duo', 3)));
RoamingPokemonList.add(Region.hoenn, 0, new RoamingPokemon('Jirachi', new QuestLineStepCompletedRequirement('Wish Maker', 8)));
// Orre
RoamingPokemonList.add(Region.hoenn, 1, new RoamingPokemon('Ho-Oh', new QuestLineCompletedRequirement('Shadows in the Desert')));
RoamingPokemonList.add(Region.hoenn, 1, new RoamingPokemon('Bonsly', new QuestLineCompletedRequirement('Gale of Darkness')));

// Sinnoh
RoamingPokemonList.add(Region.sinnoh, 0, new RoamingPokemon('Manaphy', new QuestLineCompletedRequirement('Recover the Precious Egg!')));
RoamingPokemonList.add(Region.sinnoh, 0, new RoamingPokemon('Mesprit', new ClearDungeonRequirement(1, getDungeonIndex('Distortion World'))));
RoamingPokemonList.add(Region.sinnoh, 0, new RoamingPokemon('Cresselia', new MultiRequirement([new ClearDungeonRequirement(1, getDungeonIndex('Fullmoon Island')), new MoonCyclePhaseRequirement([MoonCyclePhase.FullMoon, MoonCyclePhase.WaxingGibbous, MoonCyclePhase.WaningGibbous, MoonCyclePhase.FirstQuarter, MoonCyclePhase.ThirdQuarter])])));
RoamingPokemonList.add(Region.sinnoh, 0, new RoamingPokemon('Darkrai', new MultiRequirement([new ClearDungeonRequirement(1, getDungeonIndex('Newmoon Island')), new MoonCyclePhaseRequirement([MoonCyclePhase.NewMoon, MoonCyclePhase.WaxingCrescent, MoonCyclePhase.WaningCrescent])])));

// Unova
RoamingPokemonList.add(Region.unova, 0, new RoamingPokemon('Tornadus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(Region.unova, 0, new RoamingPokemon('Thundurus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(Region.unova, 0, new RoamingPokemon('Meloetta (Aria)', new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)));
RoamingPokemonList.add(Region.unova, 0, new RoamingPokemon('Genesect (High-Speed)', new QuestLineCompletedRequirement('The Legend Awakened')));

// Kalos
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Zapdos', new MultiRequirement([new ClearDungeonRequirement(1, getDungeonIndex('Sea Spirit\'s Den')), new StarterRequirement(Region.kalos, Starter.Fire)])));
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Moltres', new MultiRequirement([new ClearDungeonRequirement(1, getDungeonIndex('Sea Spirit\'s Den')), new StarterRequirement(Region.kalos, Starter.Water)])));
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Articuno', new MultiRequirement([new ClearDungeonRequirement(1, getDungeonIndex('Sea Spirit\'s Den')), new StarterRequirement(Region.kalos, Starter.Grass)])));
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Hoopa', new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)));
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Ash-Greninja', new TemporaryBattleRequirement('Ash Ketchum Kalos')));

// Alola
RoamingPokemonList.add(Region.alola, 0, new RoamingPokemon('Magearna', new GymBadgeRequirement(BadgeEnums.Champion_Stamp)));
RoamingPokemonList.add(Region.alola, 0, new RoamingPokemon('Marshadow', new GymBadgeRequirement(BadgeEnums.Champion_Stamp)));
RoamingPokemonList.add(Region.alola, 0, new RoamingPokemon('Zeraora', new GymBadgeRequirement(BadgeEnums.Champion_Stamp)));
// Magikarp Jump
RoamingPokemonList.add(Region.alola, 1, new RoamingPokemon('Magikarp Purple Diamonds', new GymBadgeRequirement(BadgeEnums.Luxury_League)));
RoamingPokemonList.add(Region.alola, 1, new RoamingPokemon('Magikarp Apricot Stripes', new GymBadgeRequirement(BadgeEnums.Heal_League)));
RoamingPokemonList.add(Region.alola, 1, new RoamingPokemon('Magikarp Violet Raindrops', new GymBadgeRequirement(BadgeEnums.Master_League)));

// Galar
RoamingPokemonList.add(Region.galar, 0, new RoamingPokemon('Galarian Zapdos', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));

// Galar - Isle of Armor
RoamingPokemonList.add(Region.galar, 2, new RoamingPokemon('Zarude', new QuestLineStepCompletedRequirement('Secrets of the Jungle', 1)));
RoamingPokemonList.add(Region.galar, 2, new RoamingPokemon('Galarian Moltres', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));

// Galar - Crown Tundra
RoamingPokemonList.add(Region.galar, 3, new RoamingPokemon('Spectrier', new QuestLineStepCompletedRequirement('The Crown of Galar', 6)));
RoamingPokemonList.add(Region.galar, 3, new RoamingPokemon('Glastrier', new QuestLineStepCompletedRequirement('The Crown of Galar', 6)));
RoamingPokemonList.add(Region.galar, 3, new RoamingPokemon('Galarian Articuno', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));

// Lental
// Could use OneFromManyRequirement, but this helps emphasize they have standalone requirements for day/night
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Shaymin (Land)', new MultiRequirement([new ObtainedPokemonRequirement('Shaymin (Land)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 56), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [56]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Shaymin (Land)', new MultiRequirement([new ObtainedPokemonRequirement('Shaymin (Land)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 56), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [56]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Mew', new MultiRequirement([new ObtainedPokemonRequirement('Mew'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 57), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [57]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Mew', new MultiRequirement([new ObtainedPokemonRequirement('Mew'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 57), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [57]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Ho-Oh', new MultiRequirement([new ObtainedPokemonRequirement('Ho-Oh'), new QuestLineCompletedRequirement('New Pokémon Snap'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 61)]), [61]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Celebi', new MultiRequirement([new ObtainedPokemonRequirement('Celebi'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 62)]), [62]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Manaphy', new MultiRequirement([new ObtainedPokemonRequirement('Manaphy'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 63), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [63]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Lugia', new MultiRequirement([new ObtainedPokemonRequirement('Lugia'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 64)]), [64]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Suicune', new MultiRequirement([new ObtainedPokemonRequirement('Suicune'), new QuestLineCompletedRequirement('New Pokémon Snap'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 66), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [66]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Diancie', new MultiRequirement([new ObtainedPokemonRequirement('Diancie'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 67)]), [67]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Jirachi', new MultiRequirement([new ObtainedPokemonRequirement('Jirachi'), new QuestLineCompletedRequirement('New Pokémon Snap'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 68)]), [68]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Zeraora', new MultiRequirement([new ObtainedPokemonRequirement('Zeraora'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 70), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Zeraora', new MultiRequirement([new ObtainedPokemonRequirement('Zeraora'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 70), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
// Pokémon Island
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Zapdos', new StatisticRequirement(['pokemonHatched', 145], 100), [72]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Moltres', new StatisticRequirement(['pokemonHatched', 146], 10), [73]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Articuno', new StatisticRequirement(['pokemonHatched', 144], 10), [75]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Mew', new QuestLineCompletedRequirement('Pokémon Snap 64'), [71, 72, 73, 74, 75, 76]));

// Hisui
RoamingPokemonList.add(Region.hisui, 0, new RoamingPokemon('Tornadus', new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 1)));
RoamingPokemonList.add(Region.hisui, 0, new RoamingPokemon('Thundurus', new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 1)));
RoamingPokemonList.add(Region.hisui, 0, new RoamingPokemon('Landorus', new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 1)));
RoamingPokemonList.add(Region.hisui, 0, new RoamingPokemon('Enamorus', new QuestLineStepCompletedRequirement('Incarnate Forces of Hisui', 3)));

// Paldea
RoamingPokemonList.add(Region.paldea, 0, new RoamingPokemon('Gimmighoul (Roaming)'));

// Events
// Lunar New Year (Jan 24 - Feb 7)
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Vivillon (Fancy)', new SpecialEventRequirement('Lunar New Year')));
RoamingPokemonList.add(Region.galar, 0, new RoamingPokemon('Vivillon (Fancy)', new SpecialEventRequirement('Lunar New Year')));
RoamingPokemonList.add(Region.galar, 2, new RoamingPokemon('Vivillon (Fancy)', new SpecialEventRequirement('Lunar New Year')));
RoamingPokemonList.add(Region.galar, 3, new RoamingPokemon('Vivillon (Fancy)', new SpecialEventRequirement('Lunar New Year')));
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Vivillon (Meadow)', new SpecialEventRequirement('Lunar New Year')));
RoamingPokemonList.add(Region.alola, 0, new RoamingPokemon('Vivillon (Meadow)', new SpecialEventRequirement('Lunar New Year')));
// Lunar New Year Vivillon for New Pokémon Snap
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Meadow)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Meadow)'), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [56]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Garden)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Garden)'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 56), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [56]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Monsoon)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Monsoon)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 57), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [57]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Jungle)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Jungle)'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 57), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [57]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Jungle)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Jungle)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 57), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [57]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (River)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (River)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 57), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [57]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Marine)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Marine)'), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [58]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Marine)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Marine)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [58]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Sandstorm)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Sandstorm)'), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [59]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Sun)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Sun)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 59), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [59]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Savanna)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Savanna)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 59), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [59]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Meadow)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Meadow)'), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [60]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Garden)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Garden)'), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [60]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Garden)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Garden)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [60]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (High Plains)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (High Plains)'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 61)]), [61]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Modern)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Modern)'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 62)]), [62]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Elegant)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Elegant)'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 62)]), [62]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Ocean)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Ocean)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [63]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Fancy)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Fancy)')]), [65]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Poké Ball)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Poké Ball)')]), [65]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Tundra)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Tundra)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 66), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [66]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Polar)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Polar)'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 66), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [66]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Icy Snow)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Icy Snow)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 66), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [66]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Jungle)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Jungle)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 67)]), [67]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Archipelago)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Archipelago)'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 67)]), [67]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Continental)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Continental)'), new RouteKillRequirement(ResearchLevel[3], Region.galar, 68)]), [68]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Jungle)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Jungle)'), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [69]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (River)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (River)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 69), new DayCyclePartRequirement([DayCyclePart.Dawn, DayCyclePart.Day])]), [69]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Jungle)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Jungle)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [69]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (River)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (River)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [69]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Monsoon)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Monsoon)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [69]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Savanna)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Savanna)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Sun)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Sun)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Sandstorm)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Sandstorm)'), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Ocean)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Ocean)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 70), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Modern)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Modern)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 70), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Tundra)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Tundra)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 70), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Marine)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Marine)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 70), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Jungle)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Jungle)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 70), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
RoamingPokemonList.add(Region.galar, 4, new RoamingPokemon('Vivillon (Polar)', new MultiRequirement([new SpecialEventRequirement('Lunar New Year'), new ObtainedPokemonRequirement('Vivillon (Polar)'), new RouteKillRequirement(ResearchLevel[2], Region.galar, 70), new DayCyclePartRequirement([DayCyclePart.Dusk, DayCyclePart.Night])]), [70]));
// Hoopa Day (Apr 1 - Apr 2)
// Easter (Apr 8 - Apr 29)
// Golden Week (Apr 29 - May 6)
// Flying Pikachu (Jul 6 - Jul 12)
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Flying Pikachu', new SpecialEventRequirement('Flying Pikachu')));
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Red Spearow', new SpecialEventRequirement('Flying Pikachu')));
// First movie anniversay (Jul 18 - Jul 24)
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Bulbasaur (Clone)', new MultiRequirement([new SpecialEventRequirement('Mewtwo strikes back!'), new ClearDungeonRequirement(1, getDungeonIndex('New Island'))])));
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Charmander (Clone)', new MultiRequirement([new SpecialEventRequirement('Mewtwo strikes back!'), new ClearDungeonRequirement(1, getDungeonIndex('New Island'))])));
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Squirtle (Clone)', new MultiRequirement([new SpecialEventRequirement('Mewtwo strikes back!'), new ClearDungeonRequirement(1, getDungeonIndex('New Island'))])));
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Pikachu (Clone)', new MultiRequirement([new SpecialEventRequirement('Mewtwo strikes back!'), new ObtainedPokemonRequirement('Pikachu (Clone)')])));
// Halloween (Oct 30 - Nov 5)
// Let's Go Pikachu Eevee (Nov 16 - Nov 23)
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Let\'s Go Pikachu', new SpecialEventRequirement('Let\'s GO!')));
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Let\'s Go Eevee', new SpecialEventRequirement('Let\'s GO!')));
// Christmas (Dec 18 - Dec 31)
// Add to every roaming group that has at least one roamer
RoamingPokemonList.roamerGroups.forEach((regionGroups, region) => {
    regionGroups.forEach((_, subRegionGroup) => {
        if (RoamingPokemonList.list[region][subRegionGroup]?.length) {
            RoamingPokemonList.add(region, subRegionGroup, new RoamingPokemon('Santa Snorlax', new SpecialEventRequirement('Merry Christmas!')));
        }
    });
});
RoamingPokemonList.add(Region.johto, 0, new RoamingPokemon('Reindeer Stantler', new SpecialEventRequirement('Merry Christmas!')));
