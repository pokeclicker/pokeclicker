/// <reference path="SettingOption.ts" />

class Setting {
    name: string;
    displayName: string;
    options: SettingOption[];
    defaultValue: any;
    value: any;
    observableValue: KnockoutObservable<any>;

    // Leave options array empty to allow all options.
    constructor(name: string, displayName: string, options: SettingOption[], defaultValue: any) {
        this.name = name;
        this.displayName = displayName;
        this.options = options;
        this.defaultValue = defaultValue;
        this.observableValue = ko.observable(this.defaultValue);
        this.set(defaultValue);
    }

    set(value: any) {
        if (this.validValue(value)) {
            this.value = value;
            this.observableValue(value);
        } else {
            console.warn(`${value} is not a valid value for setting ${this.name}`);
        }
    }

    validValue(value: any) {
        if (!this.isUnlocked(value)) {
            return false;
        }

        if (this.options.length === 0) {
            return true;
        }
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].value === value) {
                return true;
            }
        }

        return false;
    }

    isSelected(value: any): KnockoutComputed<boolean> {
        return ko.pureComputed(function () {
            return this.observableValue() === value;
        }, this);
    }

    isUnlocked(value) {
        return true;
    }
}
