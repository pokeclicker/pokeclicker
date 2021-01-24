
class ItemData implements Saveable {
    saveKey = 'itemData';

    defaults = {
        amount: 0,
        unlocked: false,
    }

    public amount: KnockoutObservable<number>;
    public unlocked: KnockoutObservable<boolean>;

    constructor() {
        this.amount = ko.observable(this.defaults.amount);
        this.unlocked = ko.observable(this.defaults.unlocked);
    }

    toJSON(): Record<string, any> {
        return {
            amount: this.amount(),
            unlocked: this.unlocked(),
        };
    }
    fromJSON(json: Record<string, any>): void {
        if (!json) {
            this.amount(this.defaults.amount);
            this.unlocked(this.defaults.unlocked);
        } else {
            this.amount(json.hasOwnProperty('amount') ? json['amount'] : this.defaults.amount);
            this.unlocked(json.hasOwnProperty('unlocked') ? json['unlocked'] : this.defaults.unlocked);
        }
    }
}
