import { GameState, Region, Environment } from '../../GameConstants';
import { ItemNameType } from '../../items/ItemNameType';
import GameStateRequirement from '../../requirements/GameStateRequirement';
import HoldingItemRequirement from '../../requirements/HoldingItemRequirement';
import InDungeonRequirement from '../../requirements/InDungeonRequirement';
import InEnvironmentRequirement from '../../requirements/InEnvironmentRequirement';
import InGymRequirement from '../../requirements/InGymRequirement';
import InRegionRequirement from '../../requirements/InRegionRequirement';
import QuestLineRequirement from '../../requirements/QuestLineRequirement';
import TimeRequirement from '../../requirements/TimeRequirement';
import WeatherRequirement from '../../requirements/WeatherRequirement';
import WeatherType from '../../weather/WeatherType';
import MegaEvolveRequirement from '../../requirements/MegaEvolveRequirement';
import { EvoData, restrict } from './Base';

export type EvoFn = (...args: unknown[]) => EvoData;

export const anyDungeonRestrict = (evo: EvoFn) => (
    ...rest: Parameters<EvoFn>
) => restrict(
    evo(...rest),
    new GameStateRequirement(GameState.dungeon),
);

export const dungeonRestrict = <T extends EvoFn>(evo: T) => (
    dungeon: string,
    ...rest: Parameters<T>
) => restrict(
    anyDungeonRestrict(evo)(...rest),
    new InDungeonRequirement(dungeon),
);

export const anyGymRestrict = (evo: EvoFn) => (
    ...rest: Parameters<EvoFn>
) => restrict(
    evo(...rest),
    new GameStateRequirement(GameState.gym),
);

export const GymRestrict = <T extends EvoFn>(evo: T) => (
    town: string,
    ...rest: Parameters<T>
) => restrict(
    anyGymRestrict(evo)(...rest),
    new InGymRequirement(town),
);

export const regionRestrict = <T extends EvoFn>(evo: T) => (
    regions: Region[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new InRegionRequirement(regions),
);

export const environmentRestrict = <T extends EvoFn>(evo: T) => (
    environment: Environment,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new InEnvironmentRequirement(environment),
);

export const heldItemRestrict = <T extends EvoFn>(evo: T) => (
    heldItemName: ItemNameType,
    ...rest: Parameters<T>
) => {
    const data = evo(...rest);
    return restrict(
        data,
        new HoldingItemRequirement(data.basePokemon, heldItemName),
    );
};

export const questlineRestrict = <T extends EvoFn>(evo: T) => (
    questName: string,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new QuestLineRequirement(questName),
);

export const weatherRestrict = <T extends EvoFn>(evo: T) => (
    weather: WeatherType[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new WeatherRequirement(weather),
);

export const timeRestrict = <T extends EvoFn>(evo: T) => (
    startHour: number,
    endHour: number,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new TimeRequirement(startHour, endHour),
);

export const dayRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => timeRestrict(evo)(6, 18, ...rest);

export const nightRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => timeRestrict(evo)(18, 6, ...rest);

export const megaEvolveRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => {
    const data = evo(...rest);
    return restrict(
        data,
        new MegaEvolveRequirement(data.basePokemon),
    );
};
