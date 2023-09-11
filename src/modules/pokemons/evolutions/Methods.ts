import { StoneType } from '../../GameConstants';
import { PokemonNameType } from '../PokemonNameType';
import { LevelEvolution, StoneEvolution } from './Base';
import {
    dayCyclePartRestrict,
    dayRestrict,
    nightRestrict,
    moonCyclePhaseRestrict,
    dungeonRestrict,
    anyDungeonRestrict,
    anyGymRestrict,
    environmentRestrict,
    regionRestrict,
    questlineRestrict,
    heldItemRestrict,
    weatherRestrict,
    megaEvolveRestrict,
} from './Restrictions';

// DayCyclePartRestrictedLevelEvolution(start: number, end: number, basePokemon: string, evolvedPokemon: string, level: number)
export const DayCyclePartRestrictedLevelEvolution = dayCyclePartRestrict(LevelEvolution);
// DayCyclePartRestrictedStoneEvolution(start: number, end: number, basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType
export const DayCyclePartRestrictedStoneEvolution = dayCyclePartRestrict(StoneEvolution);

// DayTimedLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
export const DayTimedLevelEvolution = dayRestrict(LevelEvolution);
// NightTimedLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
export const NightTimedLevelEvolution = nightRestrict(LevelEvolution);

// DayTimedStoneEvolution(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
export const DayTimedStoneEvolution = dayRestrict(StoneEvolution);
// NightTimedStoneEvolution(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
export const NightTimedStoneEvolution = nightRestrict(StoneEvolution);

// MoonCyclePhaseRestrictedLevelEvolution(phase: MoonCyclePhase.PhaseName, basePokemon: string, evolvedPokemon: string, level: number)
export const MoonCyclePhaseLevelEvolution = moonCyclePhaseRestrict(LevelEvolution);
// MoonCyclePhaseRestrictedStoneEvolution(phase: MoonCyclePhase.PhaseName, basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType
export const MoonCyclePhaseStoneEvolution = moonCyclePhaseRestrict(StoneEvolution);

// DungeonRestrictedLevelEvolution(dungeon: string, basePokemon: string, evolvedPokemon: string, level: number)
export const DungeonRestrictedLevelEvolution = dungeonRestrict(LevelEvolution);

// AnyDungeonLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
export const AnyDungeonLevelEvolution = anyDungeonRestrict(LevelEvolution);

// AnyGymLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
export const AnyGymLevelEvolution = anyGymRestrict(LevelEvolution);

// EnvironmentRestrictedLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
// an Environment is any key of GameConstants.Environments, eg 'Cave' or 'PowerPlant'
export const EnvironmentRestrictedLevelEvolution = environmentRestrict(LevelEvolution);

// EnvironmentDungeonLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
export const EnvironmentDungeonLevelEvolution = environmentRestrict(AnyDungeonLevelEvolution);

// EnvironmentGymLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
export const EnvironmentGymLevelEvolution = environmentRestrict(AnyGymLevelEvolution);

// RegionStoneEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
export const RegionStoneEvolution = regionRestrict(StoneEvolution);

// RegionLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
export const RegionLevelEvolution = regionRestrict(LevelEvolution);

// RegionLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
export const RegionDayTimedLevelEvolution = regionRestrict(DayTimedLevelEvolution);

// RegionLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
export const RegionNightTimedLevelEvolution = regionRestrict(NightTimedLevelEvolution);


// QuestlineLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
export const QuestlineLevelEvolution = questlineRestrict(LevelEvolution);

// QuestlineStoneEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
export const QuestlineStoneEvolution = questlineRestrict(StoneEvolution);

export const HeldItemLevelEvolution = heldItemRestrict(LevelEvolution);

export const WeatherRestrictedLevelEvolution = weatherRestrict(LevelEvolution);

const KeyStoneEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType) => StoneEvolution(basePokemon, evolvedPokemon, StoneType.Key_stone);

export const MegaEvolution = megaEvolveRestrict(KeyStoneEvolution);

// DayTimedMegaEvolution(megaStone: GameConstants.MegaStoneType, basePokemon: string, evolvedPokemon: string)
export const DayTimedMegaEvolution = dayRestrict(MegaEvolution);

// NightTimedMegaEvolution(megaStone: GameConstants.MegaStoneType, basePokemon: string, evolvedPokemon: string)
export const NightTimedMegaEvolution = nightRestrict(MegaEvolution);
