import UndergroundItem from './UndergroundItem';

export enum SortOptions {
    default = 0,
    name = 1,
    quantity = 2,
    value = 3,
}

export type SortOptionConfig = {
    text: string;
    getValue: (treasure: UndergroundItem) => any;
    invert?: boolean;
};

export const SortOptionConfigs: Record<SortOptions, SortOptionConfig> = {
    [SortOptions.default]: {
        text: 'Default',
        getValue: treasure => treasure.id,
    },

    [SortOptions.name]: {
        text: 'Name',
        getValue: treasure => treasure.displayName,
    },

    [SortOptions.quantity]: {
        text: 'Quantity',
        getValue: treasure => player.itemList[treasure.itemName]?.() ?? 0,
    },

    [SortOptions.value]: {
        text: 'Value',
        getValue: treasure => treasure.value,
    },
};
