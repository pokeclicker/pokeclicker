/// <reference path="./Setting.d.ts"/>
/// <reference path="./SettingOption.d.ts"/>
declare class Settings {
    static list: Setting<any>[];
    static add(setting: Setting<any>): void;
    static load(dict: any): void;
    static setSettingByName(name: string, value: any): void;
    static getSetting(name: string): Setting<any>;
    static save(): string;
    static enumToSettingOptionArray(obj: any, filter?: (v: any) => boolean): SettingOption<string>[];
}
