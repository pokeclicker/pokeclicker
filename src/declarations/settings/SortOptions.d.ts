 declare enum SortOptions {
    id = 0,
    name = 1,
    attack = 2,
    level = 3,
    shiny = 4,
    baseAttack = 5,
    breedingEfficiency = 6,
    eggCycles = 7,
    timesHatched = 8,
    category = 9,
    proteinsUsed = 10
} declare type SortOptionConfig = {
    text: string;
    getValue: (p: any) => any;
    invert?: boolean;
}; declare const SortOptionConfigs: Record<SortOptions, SortOptionConfig>;
