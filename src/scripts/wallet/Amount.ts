// TODO(@Isha) refactor into a more generic 'amount', not just a decreasing amount.
class Amount {
    amount: number;
    currency: GameConstants.Currency;


    constructor(amount: number, currency: GameConstants.Currency) {
        this.amount = amount;
        this.currency = currency;
    }
}
