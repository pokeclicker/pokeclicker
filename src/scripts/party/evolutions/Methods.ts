/// <reference path="./Restrictions.ts" />
/// <reference path="./Base.ts" />

// TimeRestrictedLevelEvolution(start: number, end: number, basePokemon: string, evolvedPokemon: string, level: number)
const TimeRestrictedLevelEvolution = timeRestrict(LevelEvolution);
// TimeRestrictedStoneEvolution(start: number, end: number, basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType
const TimeRestrictedStoneEvolution = timeRestrict(StoneEvolution);

// DayTimedLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
const DayTimedLevelEvolution = dayRestrict(LevelEvolution);
// NightTimedLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
const NightTimedLevelEvolution = nightRestrict(LevelEvolution);

// DayTimedStoneEvolution(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
const DayTimedStoneEvolution = dayRestrict(StoneEvolution);
// NightTimedStoneEvolution(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
const NightTimedStoneEvolution = nightRestrict(StoneEvolution);

// DungeonRestrictedLevelEvolution(dungeon: string, basePokemon: string, evolvedPokemon: string, level: number)
const DungeonRestrictedLevelEvolution = dungeonRestrict(LevelEvolution);

// AnyDungeonLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
const AnyDungeonLevelEvolution = anyDungeonRestrict(LevelEvolution);

// AnyGymLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
const AnyGymLevelEvolution = anyGymRestrict(LevelEvolution);

// EnvironmentRestrictedLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
// an Environment is any key of GameConstants.Environments, eg 'Cave' or 'PowerPlant'
const EnvironmentRestrictedLevelEvolution = environmentRestrict(LevelEvolution);

// EnvironmentDungeonLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
const EnvironmentDungeonLevelEvolution = environmentRestrict(AnyDungeonLevelEvolution);

// EnvironmentGymLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
const EnvironmentGymLevelEvolution = environmentRestrict(AnyGymLevelEvolution);

// RegionStoneEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
const RegionStoneEvolution = regionRestrict(StoneEvolution);

// RegionLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
const RegionLevelEvolution = regionRestrict(LevelEvolution);

// RegionLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
const RegionDayTimedLevelEvolution = regionRestrict(DayTimedLevelEvolution);

// RegionLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
const RegionNightTimedLevelEvolution = regionRestrict(NightTimedLevelEvolution);

// QuestlineLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
const QuestlineLevelEvolution = questlineRestrict(LevelEvolution);

const HeldItemLevelEvolution = heldItemRestrict(LevelEvolution);

const WeatherRestrictedLevelEvolution = weatherRestrict(LevelEvolution);
