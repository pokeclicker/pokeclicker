///<reference path="../GameConstants.ts"/>

class Cost {
    amount: number;
    currency: GameConstants.Currency;


    constructor(amount: number, currency: GameConstants.Currency) {
        this.amount = amount;
        this.currency = currency;
    }
}