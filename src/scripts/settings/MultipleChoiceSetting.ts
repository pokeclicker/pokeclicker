/// <reference path="Setting.ts" />

class MultipleChoiceSetting extends Setting {
    constructor(name: string, displayName: string, defaultValue: any, options: GameConstants.Option[]) {
        super(name, displayName, options, defaultValue);
    }
}
