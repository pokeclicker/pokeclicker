import BaseSetting from './BaseSetting';
import SettingOption from './SettingOption';

export default class MultiSetting<T> extends BaseSetting<T[]> {
    private optionValues;

    constructor(
        name: string,
        displayName: string,
        options: SettingOption<T>[],
        defaultValue: T[],
    ) {
        super(
            name,
            displayName,
            options,
            defaultValue,
        );
        this.optionValues = options.map(o => o.value);
    }

    validValue(value: T[]): boolean {
        if (!this.isUnlocked(value)) {
            return false;
        }

        if (value.length === 0) {
            return true;
        }
        if (this.options.length === 0) {
            return false;
        }

        for (let i = 0; i < this.value.length; i += 1) {
            if (!this.optionValues.includes(value[i])) {
                return false;
            }
        }

        return true;
    }
}
