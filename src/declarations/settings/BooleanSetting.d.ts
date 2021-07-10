/// <reference path="./Setting.d.ts"/>
declare class BooleanSetting extends Setting<boolean> {
    constructor(name: string, displayName: string, defaultValue: boolean);
    toggle(): void;
}
