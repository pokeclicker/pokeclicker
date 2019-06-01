/// <reference path="Setting.ts" />

class MultipleChoiceSetting extends Setting {
    constructor(name: string, defaultValue: any, options: GameConstants.Option[]) {
        super(name, options, defaultValue);
    }
}
