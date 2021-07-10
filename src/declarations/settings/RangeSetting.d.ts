/// <reference path="./Setting.d.ts"/>
declare class RangeSetting extends Setting<number> {
    minValue: number;
    maxValue: number;
    step: number;
    constructor(name: string, displayName: string, minValue: number, maxValue: number, step: number, defaultValue: number);
    validValue(value: number): boolean;
}
