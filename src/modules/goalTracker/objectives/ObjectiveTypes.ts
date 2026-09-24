export enum ObjectiveType {
    Item,
    Pokemon,
    Currency,
    Statistic,
    Berry,
    GymClear,
    DungeonClear,
    Gem,
    PartyAggregate,
}

export interface ObjectiveOption<TConfig> {
    label?: string;
    options: {
        [K in keyof TConfig]: {
            key: K;
            label: string;
            type?: 'dropdown' | 'number';
            searchable?: boolean;
            values?: (config?: TConfig) => { name: string; value: any }[];
            visible?: (config: TConfig) => boolean;
        }
    }[keyof TConfig][];
    // Read from inside a computed (Objective's, or a binding's), so plain values track dependencies just fine
    getProgress: (config: TConfig) => number;
    getDisplayName?: (config: TConfig) => string;
    createConfig: () => TConfig;
}
