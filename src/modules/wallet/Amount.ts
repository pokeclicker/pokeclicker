import { Currency } from '../GameConstants';

export default class Amount {
    constructor(
        public amount: number,
        public currency:Currency,
    ) {}
    public toString() {
        return `Amount(${this.amount}, ${Currency[this.currency]})`;
    }
}
