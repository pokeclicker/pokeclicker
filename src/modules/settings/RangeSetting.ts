import Setting from './Setting';
import SettingOption from './SettingOption';

export default class RangeSetting extends Setting<number> {
    constructor(
        name: string,
        displayName: string,
        public minValue: number,
        public maxValue: number,
        public step: number,
        defaultValue: number,
    ) {
        super(
            name,
            displayName,
            [
                new SettingOption<number>(minValue.toString(), minValue),
                new SettingOption<number>(maxValue.toString(), maxValue),
            ],
            defaultValue,
        );
    }

    validValue(value: number): boolean {
        if (!this.isUnlocked(value)) {
            return false;
        }

        return value >= this.minValue && value <= this.maxValue;
    }
}
