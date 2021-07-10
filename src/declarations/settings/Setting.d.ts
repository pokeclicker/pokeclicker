/// <reference path="knockout.d.ts"/>
/// <reference path="./SettingOption.d.ts"/>
declare class Setting<T> {
    name: string;
    displayName: string;
    options: SettingOption<T>[];
    defaultValue: T;
    value: T;
    observableValue: KnockoutObservable<T>;
    constructor(name: string, displayName: string, options: SettingOption<T>[], defaultValue: T);
    set(value: T): void;
    validValue(value: T): boolean;
    isSelected(value: T): KnockoutComputed<boolean>;
    isUnlocked(value: T): boolean;
}
