import { Currency } from '../GameConstants';
import Amount from './Amount';

export default abstract class AmountFactory {
    static createArray(amounts: number[], currency: Currency): Amount[] {
        return amounts.map((amt) => new Amount(amt, currency));
    }
}
