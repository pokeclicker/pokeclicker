import BaseSetting from './BaseSetting';

export default class MultiSetting<T> extends BaseSetting<T[], T> {
    private optionValues: T[];

    validValue(value: T[]): boolean {
        if (!this.isUnlocked(value)) {
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

    protected calcIsSelected(value: T): boolean {
        return this.observableValue().includes(value);
    }
}
