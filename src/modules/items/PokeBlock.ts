import { PokeBlockColor, Currency } from '../GameConstants';
import Item from './Item';

export default class PokeBlock extends Item {
    type: PokeBlockColor;

    constructor(color: PokeBlockColor, basePrice: number, currency: Currency = Currency.money) {
        super(`PokeBlock_${PokeBlockColor[color]}`, basePrice, currency);
        this.type = color;
    }
    
    get description(): string {
        return this._description || `A ${this.type} Pokéblock.`;
    }
}
