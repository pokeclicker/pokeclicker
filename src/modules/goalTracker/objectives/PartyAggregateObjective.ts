import { Observable, PureComputed } from 'knockout';
import { ObjectiveOption } from './ObjectiveTypes';
import { SortOptionConfigs, SortOptions } from '../../settings/SortOptions';
import { PartyAggregateType } from '../PartyAggregateType';

export interface PartyAggregateObjectiveConfig {
    metric: Observable<string>;
    aggregateType: Observable<PartyAggregateType>;
    threshold: Observable<number>;
}

const partyValueCache = new Map<SortOptions, PureComputed<number[]>>();
const partyValues = (metric: SortOptions): number[] => {
    if (!partyValueCache.has(metric)) {
        partyValueCache.set(metric, ko.pureComputed(
            () => App.game.party.caughtPokemon.map(p => SortOptionConfigs[metric].getValue(p)),
        ).extend({ rateLimit: 1000 }));
    }
    return partyValueCache.get(metric)();
};

export const partyAggregateObjectiveOption: ObjectiveOption<PartyAggregateObjectiveConfig> = {
    label: 'Party Aggregate',
    options: [
        {
            key: 'metric',
            label: 'Metric',
            values: () => {
                return [
                    SortOptions.attackMaxLevel,
                    SortOptions.evs,
                    SortOptions.evBonus,
                ].map((option) => ({ name: SortOptionConfigs[option].text, value: SortOptions[option] }));
            },
        },
        {
            key: 'aggregateType',
            label: 'Aggregate Type',
            values: () => [
                { name: 'Lowest in Party', value: PartyAggregateType.Minimum },
                { name: 'Highest in Party', value: PartyAggregateType.Maximum },
                { name: 'Total Combined', value: PartyAggregateType.Sum },
                { name: 'Count: Pokémon Above...', value: PartyAggregateType.CountAbove },
                { name: 'Count: Pokémon Below...', value: PartyAggregateType.CountBelow },
            ],
        },
        {
            key: 'threshold',
            label: 'Metric Threshold',
            type: 'number',
            visible: (config: PartyAggregateObjectiveConfig) => {
                const type = config.aggregateType();
                return type === PartyAggregateType.CountAbove || type === PartyAggregateType.CountBelow;
            },
        },
    ],
    getProgress: (config: PartyAggregateObjectiveConfig): number => {
        const metric = config.metric?.();
        const type = config.aggregateType?.();
        const threshold = Number(config.threshold?.()) || 0;

        if (metric === undefined || type === undefined) return 0;

        const sortOption = SortOptions[metric];
        if (sortOption === undefined) return 0;

        const values = partyValues(sortOption);
        switch (type) {
            case PartyAggregateType.Minimum:
                return values.length ? Math.min(...values) : 0;
            case PartyAggregateType.Maximum:
                return values.length ? Math.max(...values) : 0;
            case PartyAggregateType.Sum:
                return values.reduce((sum, val) => sum + val, 0);
            case PartyAggregateType.CountAbove:
                return values.filter(v => v >= threshold).length;
            case PartyAggregateType.CountBelow:
                return values.filter(v => v <= threshold).length;
            default:
                return 0;
        }
    },
    createConfig: (): PartyAggregateObjectiveConfig => ({
        metric: ko.observable(),
        aggregateType: ko.observable(),
        threshold: ko.observable(0),
    }),
    getDisplayName: (config: PartyAggregateObjectiveConfig) => {
        const metric = config.metric();
        const type = config.aggregateType();
        const threshold = Number(config.threshold?.()) || 0;

        if (metric === undefined || type === undefined) return 'Unconfigured Objective';

        const metricLabel = SortOptionConfigs[SortOptions[metric]]?.text ?? 'Unknown Metric';

        switch (type) {
            case PartyAggregateType.Minimum:
                return `Lowest [${metricLabel}] in Party`;
            case PartyAggregateType.Maximum:
                return `Highest [${metricLabel}] in Party`;
            case PartyAggregateType.Sum:
                return `Total Party [${metricLabel}]`;
            case PartyAggregateType.CountAbove:
                return `Pokémon with ${threshold.toLocaleString('en-US')} or higher [${metricLabel}]`;
            case PartyAggregateType.CountBelow:
                return `Pokémon with ${threshold.toLocaleString('en-US')} or lower [${metricLabel}]`;
            default:
                return 'Unconfigured Objective';
        }
    },
};
