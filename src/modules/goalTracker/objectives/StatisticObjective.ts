import { Observable } from 'knockout';
import { ObjectiveOption } from './ObjectiveTypes';
import { camelCaseToString } from '../../GameConstants';

export interface StatisticObjectiveConfig {
    statistic: Observable<string>;
}

const statisticValues = ko.pureComputed(() => {
    return [...App.game.statistics.observables]
        .sort((a, b) => a.localeCompare(b))
        .map(s => ({ name: camelCaseToString(s), value: s }));
});

export const statisticObjectiveOption: ObjectiveOption<StatisticObjectiveConfig> = {
    options: [
        {
            key: 'statistic',
            label: 'Statistic',
            searchable: true,
            values: () => statisticValues(),
        },
    ],
    getProgress: (config: StatisticObjectiveConfig): number => {
        const statistic = config.statistic?.();
        return App.game.statistics[statistic]?.() ?? 0;
    },
    createConfig: (): StatisticObjectiveConfig => ({ statistic: ko.observable() }),
    getDisplayName: (config: StatisticObjectiveConfig) => {
        const statistic = config.statistic();
        if (statistic === undefined) return 'Unconfigured Objective';
        return camelCaseToString(statistic);
    },
};
