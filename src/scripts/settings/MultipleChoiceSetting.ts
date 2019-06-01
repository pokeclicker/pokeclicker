/// <reference path="Setting.ts" />

class MultipleChoiceSetting extends Setting {
    constructor(name: string, displayName: string, options: GameConstants.Option[], defaultValue: any) {
        super(name, displayName, options, defaultValue);
    }
}
