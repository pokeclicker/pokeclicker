import { Currency } from '../GameConstants';

export default class Amount {
    amount: number;
    currency: Currency;

    constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
    }

    public toString() {
        return `Amount(${this.amount}, ${Currency[this.currency]})`;
    }
}
