import { BerryObjectiveConfig, berryObjectiveOption } from './objectives/BerryObjective';
import { CurrencyObjectiveConfig, currencyObjectiveOption } from './objectives/CurrencyObjective';
import { DungeonClearObjectiveConfig, dungeonClearObjectiveOption } from './objectives/DungeonClearObjective';
import { GemObjectiveConfig, gemObjectiveOption } from './objectives/GemObjective';
import { GymClearObjectiveConfig, gymClearObjectiveOption } from './objectives/GymClearObjective';
import { ItemObjectiveConfig, itemObjectiveOption } from './objectives/ItemObjective';
import { ObjectiveOption, ObjectiveType } from './objectives/ObjectiveTypes';
import { PartyAggregateObjectiveConfig, partyAggregateObjectiveOption } from './objectives/PartyAggregateObjective';
import { PokemonObjectiveConfig, pokemonObjectiveOption } from './objectives/PokemonObjective';
import { StatisticObjectiveConfig, statisticObjectiveOption } from './objectives/StatisticObjective';

export type ObjectiveConfig =
    | ItemObjectiveConfig
    | PokemonObjectiveConfig
    | CurrencyObjectiveConfig
    | StatisticObjectiveConfig
    | BerryObjectiveConfig
    | GymClearObjectiveConfig
    | DungeonClearObjectiveConfig
    | GemObjectiveConfig
    | PartyAggregateObjectiveConfig;

export type ObjectiveTypeToConfig = {
    [ObjectiveType.Item]: ItemObjectiveConfig;
    [ObjectiveType.Pokemon]: PokemonObjectiveConfig;
    [ObjectiveType.Currency]: CurrencyObjectiveConfig;
    [ObjectiveType.Statistic]: StatisticObjectiveConfig;
    [ObjectiveType.Berry]: BerryObjectiveConfig;
    [ObjectiveType.GymClear]: GymClearObjectiveConfig;
    [ObjectiveType.DungeonClear]: DungeonClearObjectiveConfig
    [ObjectiveType.Gem] : GemObjectiveConfig;
    [ObjectiveType.PartyAggregate]: PartyAggregateObjectiveConfig;
};

export const objectiveOptions: {
    [K in ObjectiveType]: ObjectiveOption<ObjectiveTypeToConfig[K]>;
} = {
    [ObjectiveType.Item]: itemObjectiveOption,
    [ObjectiveType.Pokemon]: pokemonObjectiveOption,
    [ObjectiveType.Currency]: currencyObjectiveOption,
    [ObjectiveType.Statistic]: statisticObjectiveOption,
    [ObjectiveType.Berry]: berryObjectiveOption,
    [ObjectiveType.GymClear]: gymClearObjectiveOption,
    [ObjectiveType.DungeonClear]: dungeonClearObjectiveOption,
    [ObjectiveType.Gem]: gemObjectiveOption,
    [ObjectiveType.PartyAggregate]: partyAggregateObjectiveOption,
};
