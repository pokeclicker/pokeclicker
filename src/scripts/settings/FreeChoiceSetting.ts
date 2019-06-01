/// <reference path="Setting.ts" />

class FreeChoiceSetting extends Setting {
    constructor(name: string, displayName: string, defaultValue: any) {
        super(name, displayName, [], defaultValue);
    }
}
