import { Currency } from '../GameConstants';

export default class Amount {
    constructor(
        public amount: number,
        public currency:Currency,
    ) {}
}
