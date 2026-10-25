import { Observable } from 'knockout';
import BadgeEnums from '../enums/Badges';
import {
    KantoSubregions, JohtoSubregions, HoennSubregions, SinnohSubregions, UnovaSubregions, KalosSubregions, AlolaSubregions, GalarSubregions, HisuiSubregions, PaldeaSubregions, Subregions, Region,
    getDungeonIndex, Starter,
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
import StatisticRequirement from '../requirements/StatisticRequirement';
import { getPokemonByName } from './PokemonHelper';
import OneFromManyRequirement from '../requirements/OneFromManyRequirement';

export default class RoamingPokemonList {
    public static roamerGroups: RoamingGroup[][] = [
        [new RoamingGroup('Kanto', [KantoSubregions.Kanto]), new RoamingGroup('Kanto - Sevii Islands', [KantoSubregions.Sevii123, KantoSubregions.Sevii4567])],
        [new RoamingGroup('Johto', [JohtoSubregions.Johto])],
        [new RoamingGroup('Hoenn', [HoennSubregions.Hoenn]), new RoamingGroup('Hoenn - Orre', [HoennSubregions.Orre])],
        [new RoamingGroup('Sinnoh', [SinnohSubregions.Sinnoh])],
        [new RoamingGroup('Unova', [UnovaSubregions.Unova])],
        [new RoamingGroup('Kalos', [KalosSubregions.Kalos])],
        [new RoamingGroup('Alola', [AlolaSubregions.MelemeleIsland, AlolaSubregions.AkalaIsland, AlolaSubregions.UlaulaIsland, AlolaSubregions.PoniIsland]), new RoamingGroup('Alola - Magikarp Jump', [AlolaSubregions.MagikarpJump])],
        [new RoamingGroup('Galar - South', [GalarSubregions.SouthGalar]), new RoamingGroup('Galar - North', [GalarSubregions.NorthGalar]), new RoamingGroup('Galar - Isle of Armor', [GalarSubregions.IsleofArmor]), new RoamingGroup('Galar - Crown Tundra', [GalarSubregions.CrownTundra])],
        [new RoamingGroup('Hisui', [HisuiSubregions.Hisui])],
        [new RoamingGroup('Paldea', [PaldeaSubregions.Paldea]), new RoamingGroup('Paldea - Kitakami', [PaldeaSubregions.Kitakami]), new RoamingGroup('Paldea - Blueberry Academy', [PaldeaSubregions.BlueberryAcademy])],
    ];

    public static list: Partial<Record<Region, Array<Array<RoamingPokemon>>>> = {};
    public static increasedChanceRoute: Array<Array<Observable<RegionRoute>>> = new Array(GameHelper.enumLength(Region) - 2) // Remove None and Final
        .fill(0).map((v, i) => new Array(RoamingPokemonList.roamerGroups[i].length)
            .fill(0).map(() => ko.observable(undefined)));

    // How many hours between when the roaming Pokemon change routes for increased chances
    private static period = 8;

    public static add(region: Region, subregionGroup: number, roamer: RoamingPokemon): void {
        if (!RoamingPokemonList.list[region]) {
            RoamingPokemonList.list[region] = [];
        }
        if (!RoamingPokemonList.list[region][subregionGroup]) {
            RoamingPokemonList.list[region][subregionGroup] = [];
        }
        RoamingPokemonList.list[region][subregionGroup].push(roamer);
    }

    public static remove(region: Region, subregionGroup: number, pokemonName: PokemonNameType): void {
        const index = RoamingPokemonList.list[region][subregionGroup].findIndex((r) => r.pokemon.name === pokemonName);
        if (index >= 0) {
            RoamingPokemonList.list[region][subregionGroup].splice(index, 1);
        }
    }

    public static getSubregionalGroupRoamers(region: Region, subregionGroup: number): Array<RoamingPokemon> {
        return RoamingPokemonList.list[region] && RoamingPokemonList.list[region][subregionGroup]
            ? RoamingPokemonList.list[region][subregionGroup].filter((p) => p.isRoaming())
            : [];
    }

    public static getIncreasedChanceRouteBySubregionGroup(region: Region, subregionGroup: number): Observable<RegionRoute> {
        return RoamingPokemonList.increasedChanceRoute[region]?.[subregionGroup];
    }

    public static getGroupSubregions(region: Region, subregionGroup: number): Subregions[] {
        return [...RoamingPokemonList.roamerGroups[region][subregionGroup].subregions];
    }

    public static generateIncreasedChanceRoutes(date = new Date()) {
        // Seed the random runmber generator
        SeededRand.seedWithDateHour(date, this.period);

        RoamingPokemonList.increasedChanceRoute.forEach((subregionGroups, region) => {
            subregionGroups.forEach((route, group) => {
                const routes = Routes.getRoutesByRegion(region).filter((r) => this.findGroup(region, r.subregion ?? 0) === group);
                // Select a route
                const selectedRoute = SeededRand.fromArray(routes);
                route(selectedRoute);
            });
        });
    }

    public static findGroup(region: Region, subregion: number): number {
        return this.roamerGroups[region].findIndex((g) => g.subregions.includes(subregion));
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
RoamingPokemonList.add(Region.hoenn, 0, new RoamingPokemon('Latios', new OneFromManyRequirement([new MultiRequirement([new QuestLineStepCompletedRequirement('The Eon Duo', 3), new ObtainedPokemonRequirement('Latias')]), new QuestLineCompletedRequirement('The Eon Duo')])));
RoamingPokemonList.add(Region.hoenn, 0, new RoamingPokemon('Latias', new OneFromManyRequirement([new MultiRequirement([new QuestLineStepCompletedRequirement('The Eon Duo', 3), new ObtainedPokemonRequirement('Latios')]), new QuestLineCompletedRequirement('The Eon Duo')])));
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
RoamingPokemonList.add(Region.alola, 0, new RoamingPokemon('Mimikyu (Busted)', new StatisticRequirement(['shinyPokemonDefeated', getPokemonByName('Mimikyu').id], 5, 'Defeat 5 shiny Mimikyu')));
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
// Pirate (Aug 29 - Sep 19)
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Captain Charizard',  new SpecialEventRequirement('A Pirate\'s Life')));
// Halloween (Oct 30 - Nov 5)
// Let's Go Pikachu Eevee (Nov 16 - Nov 23)
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Let\'s Go Pikachu', new SpecialEventRequirement('Let\'s GO!')));
RoamingPokemonList.add(Region.kanto, 0, new RoamingPokemon('Let\'s Go Eevee', new SpecialEventRequirement('Let\'s GO!')));
// Christmas (Dec 18 - Dec 31)
// Add to every roaming group that has at least one roamer
RoamingPokemonList.roamerGroups.forEach((regionGroups, region) => {
    regionGroups.forEach((_, subregionGroup) => {
        if (RoamingPokemonList.list[region][subregionGroup]?.length) {
            RoamingPokemonList.add(region, subregionGroup, new RoamingPokemon('Santa Snorlax', new SpecialEventRequirement('Merry Christmas!')));
        }
    });
});
RoamingPokemonList.add(Region.johto, 0, new RoamingPokemon('Reindeer Stantler', new SpecialEventRequirement('Merry Christmas!')));
