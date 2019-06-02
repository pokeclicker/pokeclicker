///<reference path="../GameConstants.ts"/>

// TODO(@Isha) refactor into a more generic 'amount', not just a decreasing amount.
class Cost {
    amount: number;
    currency: GameConstants.Currency;


    constructor(amount: number, currency: GameConstants.Currency) {
        this.amount = amount;
        this.currency = currency;
    }
}
