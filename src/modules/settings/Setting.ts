import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
} from 'knockout';
import BaseSetting from './BaseSetting';
import SettingOption from './SettingOption';

export default class Setting<T> extends BaseSetting<T> {

    // Leave options array empty to allow all options.
    constructor(
        name: string,
        defaultDisplayName: string,
        options: SettingOption<T>[],
        defaultValue: T,
    ) {
        super(
            name,
            defaultDisplayName,
            options,
            defaultValue,
        );
    }

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
}
