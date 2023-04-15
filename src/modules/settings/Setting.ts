import BaseSetting from './BaseSetting';

export default class Setting<T> extends BaseSetting<T, T> {
    validValue(value: T): boolean {
        if (!this.isUnlocked(value)) {
            return false;
        }

        if (this.options.length === 0) {
            return true;
        }
        for (let i = 0; i < this.options.length; i += 1) {
            if (this.options[i].value === value) {
                return true;
            }
        }

        return false;
    }

    protected isSelected(value: T): boolean {
        return this.observableValue() === value;
    }
}
