import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
} from 'knockout';
import SettingOption from './SettingOption';

export default class Setting {
    name: string;
    displayName: string;
    options: SettingOption[];
    defaultValue: any;
    value: any;
    observableValue: KnockoutObservable<any>;

    // Leave options array empty to allow all options.
    constructor(
        name: string,
        displayName: string,
        options: SettingOption[],
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        defaultValue: any,
    ) {
        this.name = name;
        this.displayName = displayName;
        this.options = options;
        this.defaultValue = defaultValue;
        this.observableValue = ko.observable(this.defaultValue);
        this.set(defaultValue);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    set(value: any): void {
        if (this.validValue(value)) {
            this.value = value;
            this.observableValue(value);
        } else {
            // eslint-disable-next-line no-console
            console.warn(`${value} is not a valid value for setting ${this.name}`);
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    validValue(value: any): boolean {
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    isSelected(value: any): KnockoutComputed<boolean> {
        return ko.pureComputed(() => (this.observableValue() === value), this);
    }

    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-unused-vars, class-methods-use-this
    isUnlocked(value: any): boolean {
        return true;
    }
}
