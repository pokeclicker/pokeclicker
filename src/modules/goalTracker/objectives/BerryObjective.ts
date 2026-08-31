import { Observable } from 'knockout';
import { ObjectiveOption } from './ObjectiveTypes';
import BerryType from '../../enums/BerryType';

export interface BerryObjectiveConfig {
    berry: Observable<BerryType>;
}

const berryValues = ko.pureComputed(() => {
    return App.game.farming.unlockedBerries.reduce((options, isUnlocked, i) => {
        if (isUnlocked()) {
            options.push({
                name: `#${(i + 1).toString().padStart(2, '0')} - ${BerryType[i]}`,
                value: i,
            });
        }
        return options;
    }, []);
});

export const berryObjectiveOption: ObjectiveOption<BerryObjectiveConfig> = {
    options: [
        {
            key: 'berry',
            label: 'Berry',
            searchable: true,
            values: () => berryValues(),
        },
    ],
    getProgress: (config: BerryObjectiveConfig): number => {
        const berry = config.berry?.();
        return App.game.farming.berryList[berry]?.() ?? 0;
    },
    createConfig: (): BerryObjectiveConfig => ({ berry: ko.observable() }),
    getDisplayName: (config: BerryObjectiveConfig) => {
        const berry = config.berry();
        if (berry === undefined) return 'Unconfigured Objective';
        return `${BerryType[berry]} Berries`;
    },
};
