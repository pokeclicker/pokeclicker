import BaseSetting from './BaseSetting';

export default class MultiSetting<T> extends BaseSetting<T[], T> {
    private optionValues;

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

        if (this.optionValues === undefined) {
            this.optionValues = this.options.map((o) => o.value);
        }

        for (let i = 0; i < value.length; i += 1) {
            if (!this.optionValues.includes(value[i])) {
                return false;
            }
        }

        return true;
    }
}
