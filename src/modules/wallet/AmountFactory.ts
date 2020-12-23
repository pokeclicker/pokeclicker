import { Currency } from '../GameConstants';
import Amount from './Amount';

export default abstract class AmountFactory {
    static createArray(amounts: number[], currency: Currency): Amount[] {
        const array = [];
        for (let i = 0; i < amounts.length; i += 1) {
            array.push(new Amount(amounts[i], currency));
        }
        return array;
    }
}
