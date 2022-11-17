import { Observable } from 'knockout';
import BadgeEnums from '../enums/Badges';
import {
    KantoSubRegions, JohtoSubRegions, HoennSubRegions, SinnohSubRegions, UnovaSubRegions, KalosSubRegions, AlolaSubRegions, GalarSubRegions, Region, getDungeonIndex,
} from '../GameConstants';
import GameHelper from '../GameHelper';
import ClearDungeonRequirement from '../requirements/ClearDungeonRequirement';
import GymBadgeRequirement from '../requirements/GymBadgeRequirement';
import MultiRequirement from '../requirements/MultiRequirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import QuestLineCompletedRequirement from '../requirements/QuestLineCompletedRequirement';
import QuestLineStepCompletedRequirement from '../requirements/QuestLineStepCompletedRequirement';
import RegionRoute from '../routes/RegionRoute';
import Routes from '../routes/Routes';
import SeededRand from '../utilities/SeededRand';
import { PokemonNameType } from './PokemonNameType';
import RoamingPokemon from './RoamingPokemon';

export default class RoamingPokemonList {
    public static roamerGroups = [
        [[KantoSubRegions.Kanto], [KantoSubRegions.Sevii123, KantoSubRegions.Sevii4567]],
        [[JohtoSubRegions.Johto]],
        [[HoennSubRegions.Hoenn]],
        [[SinnohSubRegions.Sinnoh]],
        [[UnovaSubRegions.Unova]],
        [[KalosSubRegions.Kalos]],
        [[AlolaSubRegions.MelemeleIsland, AlolaSubRegions.AkalaIsland, AlolaSubRegions.UlaulaIsland, AlolaSubRegions.PoniIsland]],
        [[GalarSubRegions.SouthGalar], [GalarSubRegions.NorthGalar], [GalarSubRegions.IsleofArmor], [GalarSubRegions.CrownTundra]],
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

    public static getSubRegionalGroupRoamers(region: Region, subRegionGroup: number): Array<RoamingPokemon> {
        return RoamingPokemonList.list[region] && RoamingPokemonList.list[region][subRegionGroup]
            ? RoamingPokemonList.list[region][subRegionGroup].filter((p) => p.isRoaming())
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
        return this.roamerGroups[region].findIndex((g) => g.includes(subRegion));
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
RoamingPokemonList.add(Region.hoenn, 0, new RoamingPokemon('Latios', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
RoamingPokemonList.add(Region.hoenn, 0, new RoamingPokemon('Latias', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
// TODO: these need another way to be obtained
RoamingPokemonList.add(Region.hoenn, 0, new RoamingPokemon('Jirachi', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));

// Sinnoh
RoamingPokemonList.add(Region.sinnoh, 0, new RoamingPokemon('Manaphy'));
RoamingPokemonList.add(Region.sinnoh, 0, new RoamingPokemon('Mesprit', new ClearDungeonRequirement(1, getDungeonIndex('Distortion World'))));
RoamingPokemonList.add(Region.sinnoh, 0, new RoamingPokemon('Cresselia', new ClearDungeonRequirement(1, getDungeonIndex('Fullmoon Island'))));

// Unova
RoamingPokemonList.add(Region.unova, 0, new RoamingPokemon('Tornadus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(Region.unova, 0, new RoamingPokemon('Thundurus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(Region.unova, 0, new RoamingPokemon('Meloetta (Aria)', new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)));

// Kalos
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Zapdos', new ClearDungeonRequirement(1, getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Moltres', new ClearDungeonRequirement(1, getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Articuno', new ClearDungeonRequirement(1, getDungeonIndex('Sea Spirit\'s Den'))));
RoamingPokemonList.add(Region.kalos, 0, new RoamingPokemon('Hoopa', new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)));

// Alola
RoamingPokemonList.add(Region.alola, 0, new RoamingPokemon('Magearna', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));
RoamingPokemonList.add(Region.alola, 0, new RoamingPokemon('Marshadow', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));
RoamingPokemonList.add(Region.alola, 0, new RoamingPokemon('Zeraora', new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)));

// Galar
RoamingPokemonList.add(Region.galar, 0, new RoamingPokemon('Galarian Zapdos', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));

// Galar - Isle of Armor
RoamingPokemonList.add(Region.galar, 2, new RoamingPokemon('Zarude', new QuestLineStepCompletedRequirement('Secrets of the Jungle', 1)));
RoamingPokemonList.add(Region.galar, 2, new RoamingPokemon('Galarian Moltres', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));

// Galar - Crown Tundra
RoamingPokemonList.add(Region.galar, 3, new RoamingPokemon('Spectrier', new QuestLineStepCompletedRequirement('The Crown of Galar', 6)));
RoamingPokemonList.add(Region.galar, 3, new RoamingPokemon('Glastrier', new QuestLineStepCompletedRequirement('The Crown of Galar', 6)));
RoamingPokemonList.add(Region.galar, 3, new RoamingPokemon('Galarian Articuno', new QuestLineStepCompletedRequirement('The Birds of the Dyna Tree', 5)));
