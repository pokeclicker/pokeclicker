import { GameState, Region, Environment, MegaStoneType, AchievementOption } from '../../GameConstants';
import { ItemNameType } from '../../items/ItemNameType';
import { QuestLineNameType } from '../../quests/QuestLineNameType';
import GameStateRequirement from '../../requirements/GameStateRequirement';
import HoldingItemRequirement from '../../requirements/HoldingItemRequirement';
import InDungeonRequirement from '../../requirements/InDungeonRequirement';
import InEnvironmentRequirement from '../../requirements/InEnvironmentRequirement';
import InGymRequirement from '../../requirements/InGymRequirement';
import InRegionRequirement from '../../requirements/InRegionRequirement';
import QuestLineCompletedRequirement from '../../requirements/QuestLineCompletedRequirement';
import DayCyclePartRequirement from '../../requirements/DayCyclePartRequirement';
import MoonCyclePhaseRequirement from '../../requirements/MoonCyclePhaseRequirement';
import WeatherRequirement from '../../requirements/WeatherRequirement';
import WeatherType from '../../weather/WeatherType';
import MegaEvolveRequirement from '../../requirements/MegaEvolveRequirement';
import { EvoData, restrict } from './Base';
import DayCyclePart from '../../dayCycle/DayCyclePart';
import MoonCyclePhase from '../../moonCycle/MoonCyclePhase';
import PokemonAttackRequirement from '../../requirements/PokemonAttackRequirement';

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
    questName: QuestLineNameType,
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new QuestLineCompletedRequirement(questName),
);

export const weatherRestrict = <T extends EvoFn>(evo: T) => (
    weather: WeatherType[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new WeatherRequirement(weather),
);

export const dayCyclePartRestrict = <T extends EvoFn>(evo: T) => (
    dayCycleParts: DayCyclePart[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new DayCyclePartRequirement(dayCycleParts),
);

export const dayRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => dayCyclePartRestrict(evo)([DayCyclePart.Day, DayCyclePart.Dusk], ...rest);

export const nightRestrict = <T extends EvoFn>(evo: T) => (
    ...rest: Parameters<T>
) => dayCyclePartRestrict(evo)([DayCyclePart.Night, DayCyclePart.Dawn], ...rest);

export const moonCyclePhaseRestrict = <T extends EvoFn>(evo: T) => (
    moonCyclePhases: MoonCyclePhase[],
    ...rest: Parameters<T>
) => restrict(
    evo(...rest),
    new MoonCyclePhaseRequirement(moonCyclePhases),
);

export const megaEvolveRestrict = <T extends EvoFn>(evo: T) => (
    megaStone: MegaStoneType,
    ...rest: Parameters<T>
) => {
    const data = evo(...rest);
    data.ignoreECChange = true;
    return restrict(
        data,
        new MegaEvolveRequirement(data.basePokemon, megaStone),
    );
};

export const attackRestrict = <T extends EvoFn>(evo: T) => (
    attackMultiplier: number,
    ...rest: Parameters<T>
) => {
    const data = evo(...rest);
    return restrict(
        data,
        new PokemonAttackRequirement(data.basePokemon, attackMultiplier, AchievementOption.more),
    );

};
