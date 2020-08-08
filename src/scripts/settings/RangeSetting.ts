class RangeSetting extends Setting {
    constructor(name: string, displayName: string, public minValue: number, public maxValue: number, public step: number, defaultValue: number) {
        super(
            name,
            displayName,
            [
                new SettingOption(minValue.toString(), minValue),
                new SettingOption(maxValue.toString(), maxValue),
            ],
            defaultValue
        );
    }

    validValue(value: number) {
        if (!this.isUnlocked(value)) {
            return false;
        }

        return value >= this.minValue && value <= this.maxValue;
    }
}
