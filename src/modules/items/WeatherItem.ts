import Item from './Item';
import { Currency } from '../GameConstants';

export default class WeatherItem extends Item {
    constructor(id: string, displayName: string, description: string) {
        super(id, Infinity, Currency.money, undefined, displayName, description, 'weather');
    }
}
