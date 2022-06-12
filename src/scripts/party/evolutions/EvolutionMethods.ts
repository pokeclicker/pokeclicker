/// <reference path="./StoneEvolution.ts" />
/// <reference path="./LevelEvolution.ts" />
/// <reference path="./DungeonRestriction.ts" />
/// <reference path="./GymRestriction.ts" />
/// <reference path="./TimedRestriction.ts" />
/// <reference path="./EnvironmentRestriction.ts" />

// Used for custom time ranges
function TimeRestrictedBase<T extends MinimalEvo>(Base: T) {
    return function (start: number, end: number, ...rest: ConstructorParameters<T>) {
        const tmpClass = TimeRestricted(start, end, Base);
        return new tmpClass(...rest);
    };
}
// new TimeRestrictedLevelEvolution(start: number, end: number, basePokemon: string, evolvedPokemon: string, level: number)
const TimeRestrictedLevelEvolution = TimeRestrictedBase(LevelEvolution);

// new DayTimedLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
const DayTimedLevelEvolution = DayTimeRestricted(LevelEvolution);
// new NightTimedLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
const NightTimedLevelEvolution = NightTimeRestricted(LevelEvolution);

// new DayTimedStoneEvolution(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
const DayTimedStoneEvolution = DayTimeRestricted(StoneEvolution);
// NightTimedStoneEvolution(basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
const NightTimedStoneEvolution = NightTimeRestricted(StoneEvolution);

// new DungeonRestrictedLevelEvolution(dungeon: string, basePokemon: string, evolvedPokemon: string, level: number)
const DungeonRestrictedLevelEvolution = DungeonRestricted(LevelEvolution);

// new AnyDungeonLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
const AnyDungeonLevelEvolution = AnyDungeonRestricted(LevelEvolution);

// new AnyGymLevelEvolution(basePokemon: string, evolvedPokemon: string, level: number)
const AnyGymLevelEvolution = AnyGymRestricted(LevelEvolution);

// new EnvironmentRestrictedLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
// an Environment is any key of GameConstants.Environments, eg 'Cave' or 'PowerPlant'
const EnvironmentRestrictedLevelEvolution = EnvironmentRestricted(LevelEvolution);

// new EnvironmentDungeonLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
const EnvironmentDungeonLevelEvolution = EnvironmentRestricted(AnyDungeonLevelEvolution);

// new EnvironmentGymLevelEvolution(environment: Environment, basePokemon: string, evolvedPokemon: string, level: number)
const EnvironmentGymLevelEvolution = EnvironmentRestricted(AnyGymLevelEvolution);

// RegionStoneEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, stone: GameConstants.StoneType)
const RegionStoneEvolution = RegionRestricted(StoneEvolution);

// new RegionLevelEvolution(region: GameConstants.Region, basePokemon: string, evolvedPokemon: string, level: number)
const RegionLevelEvolution = RegionRestricted(LevelEvolution);
