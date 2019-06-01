class Setting {
    name: string;
    options: GameConstants.Option[];
    defaultValue: any;
    value: any;

    // Leave options array empty to allow all options.
    constructor(name: string, options: GameConstants.Option[], defaultValue: any) {
        this.name = name;
        this.options = options;
        this.defaultValue = defaultValue;
        this.set(defaultValue);
    }

    set(value: any) {
        if (this.validValue(value)) {
            this.value = value;
            console.log("Set " + this.name + " to " + value)
        } else {
            Notifier.notify(value + " is not a valid value for setting " + this.name, GameConstants.NotificationOption.warning)
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

    isSelected(value: any): KnockoutComputed<boolean>{
        return ko.computed(function(){
            return this.value === value;
        }, this);
    }

    isUnlocked(value) {
        return true;
    }
}