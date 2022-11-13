import { StoneType } from '../../GameConstants';
import { PokemonNameType } from '../PokemonNameType';
import { LevelEvolution, StoneEvolution } from './Base';
import {
    timeRestrict,
    dayRestrict,
    nightRestrict,
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

// TimeRestrictedLevelEvolution(start: number, end: number, basePokemon: string, evolvedPokemon: string, level: number)
export const TimeRestrictedLevelEvolution = timeRestrict(LevelEvolution);
// TimeRestrictedStoneEvolution(start: number, end: number, basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType
export const TimeRestrictedStoneEvolution = timeRestrict(StoneEvolution);

// DayTimedLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
export const DayTimedLevelEvolution = dayRestrict(LevelEvolution);
// NightTimedLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
export const NightTimedLevelEvolution = nightRestrict(LevelEvolution);

// DayTimedStoneEvolution(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
export const DayTimedStoneEvolution = dayRestrict(StoneEvolution);
// NightTimedStoneEvolution(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
export const NightTimedStoneEvolution = nightRestrict(StoneEvolution);

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

export const HeldItemLevelEvolution = heldItemRestrict(LevelEvolution);

export const WeatherRestrictedLevelEvolution = weatherRestrict(LevelEvolution);

const KeyStoneEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType) => StoneEvolution(basePokemon, evolvedPokemon, StoneType.Key_stone);

export const MegaEvolution = megaEvolveRestrict(KeyStoneEvolution);
