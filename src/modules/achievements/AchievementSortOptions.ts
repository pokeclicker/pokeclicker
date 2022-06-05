export enum AchievementSortOptions {
    default = 0,
    progress = 1,
    bonus = 2,
}

export type AchievementSortOptionConfig = {
    // Display text in sort dropdown
    text: string;

    // How to get the comparison value from an Achievement
    getValue: (a) => any;

    // true if the default sort direction should be descending
    invert?: boolean;
};

export const AchievementSortOptionConfigs: Record<AchievementSortOptions, AchievementSortOptionConfig> = {
    [AchievementSortOptions.default]: {
        text: 'Default',
        getValue: () => null,
    },

    [AchievementSortOptions.progress]: {
        text: 'Progress',
        getValue: (a) => parseFloat(a.getProgressPercentage()),
    },

    [AchievementSortOptions.bonus]: {
        text: 'Bonus %',
        getValue: (a) => a.bonus,
    },
};
