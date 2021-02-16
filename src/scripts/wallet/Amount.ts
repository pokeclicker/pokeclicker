class Amount {
    amount: number;
    currency: GameConstants.Currency;


    constructor(amount: number, currency: GameConstants.Currency) {
        this.amount = Math.round(amount);
        this.currency = currency;
    }

    public toString() {
        return `Amount(${this.amount}, ${GameConstants.Currency[this.currency]})`;
    }
}
