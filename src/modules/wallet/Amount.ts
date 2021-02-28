import { Currency } from '../GameConstants';

export default class Amount {
    constructor(
        public amount: number,
        public currency: Currency,
    ) {
        this.amount = Math.round(amount);
        this.currency = currency;
    }

    public toString() {
        return `Amount(${this.amount}, ${Currency[this.currency]})`;
    }
}
