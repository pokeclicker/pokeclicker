/// <reference path="./MultiplierType.d.ts"/>
declare type GetMultiplierFunction = (useBonus: boolean) => number;
declare type MultTypeString = keyof typeof MultiplierType;
declare class Multiplier {
    private multipliers;
    constructor();
    addBonus(type: MultTypeString, bonusFunction: GetMultiplierFunction): void;
    getBonus(type: MultTypeString, useBonus?: boolean): number;
} {};
