class Wallet implements Feature {
    name: string = "Wallet";
    saveKey: string;
    currencies: ArrayOfObservables<number>;

    defaults = {
        currencies: [0, 0, 0, 0, 0]
    };


    constructor() {
        this.currencies = new ArrayOfObservables(this.defaults.currencies);
    }

    public gainMoney(amount: number, origin?: string) {

        // Good
        // let eventBonus = App.game.eventCalendar.getMoneyMultiplier(origin);

        // Good
        // let xMultiplier = App.game.getSomething();
        // let yMultiplier = App.game.getSomethingElse();
        //
        // amount *= eventBonus * xMultiplier * yMultiplier;
        //
        // Statistics.addTotalMoney(origin);
        this.addAmount(new Amount(amount, Currency.money))
    }

    private addAmount(amount: Amount) {
        this.currencies[amount.currency] += amount.amount;
    };

    public hasAmount(amount: Amount) {
        return this.currencies[amount.currency] >= amount.amount;
    };

    public loseAmount(amount: Amount) {
        this.currencies[amount.currency] -= amount.amount;
    };


    initialize(): void {
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: object): void {
    }

    toJSON(): object {
        return undefined;
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}
