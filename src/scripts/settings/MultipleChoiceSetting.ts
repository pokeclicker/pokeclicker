/// <reference path="Setting.ts" />

class MultipleChoiceSetting extends Setting {
    constructor(name: string, displayName: string, options: SettingOption[], defaultValue: any) {
        super(name, displayName, options, defaultValue);
    }
}
