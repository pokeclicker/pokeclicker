/// <reference path="MultipleChoiceSetting.ts" />

class BooleanSetting extends MultipleChoiceSetting {
    constructor(name: string, displayName: string, defaultValue: boolean) {
        super(
            name,
            displayName,
            [
                new SettingOption('On', true),
                new SettingOption('Off', false),
            ],
            defaultValue
        );
    }

    toggle() {
        this.set(!this.value);
    }
}
