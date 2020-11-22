abstract class Machine implements Saveable {

    saveKey: string;
    defaults: {
        amount: 0,
    }

    private _amount: KnockoutObservable<number>;

    constructor(
        public id: Lab.Machine,
        public name: string,
        public description: string,
        public width: number,
        public height: number
    ) {
        this._amount = ko.observable<number>(0);
    }

    /**
     * Handles updating the machine
     */
    abstract update(delta: number): void;

    toJSON(): Record<string, any> {
        return {
            amount: this.amount,
        };
    }
    fromJSON(json: Record<string, any>): void {
        this.amount = json.hasOwnProperty('amount') ? json['amount'] : this.defaults.amount;
    }

    get image(): string {
        return `assets/images/lab/machines/${this.name}.png`;
    }

    get amount(): number {
        return this._amount();
    }

    set amount(value: number) {
        this._amount(value);
    }

}
