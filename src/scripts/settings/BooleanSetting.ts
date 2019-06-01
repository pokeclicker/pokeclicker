/// <reference path="MultipleChoiceSetting.ts" />

class BooleanSetting extends MultipleChoiceSetting {
    constructor(name: string, displayName: string, defaultValue: boolean) {
        super(
            name,
            displayName,
            [
                new GameConstants.Option("On", true),
                new GameConstants.Option("Off", false)
            ],
            defaultValue
        );
    }

    toggle() {
        this.set(!this.value);
    }
}
