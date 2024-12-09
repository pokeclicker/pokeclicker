import PokeBlockColor from '../enums/PokeBlockColor';
import Item from './Item';

export default class PokeBlock extends Item {
    type: PokeBlockColor;

    constructor(color: PokeBlockColor, basePrice: number, description?: string, pixelated = true) {
        super(`PokeBlock_${PokeBlockColor[color]}`, basePrice, undefined, {}, undefined, description, 'pokeblock', pixelated);
        this.type = color;
    }
    
    get description(): string {
        return this._description || `A ${PokeBlockColor[this.type]} Pokéblock.`;
    }
}
