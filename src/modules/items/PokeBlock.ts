import PokeBlockColor from '../enums/PokeBlockColor';
import Item from './Item';

export default class PokeBlock extends Item {
    type: PokeBlockColor;

    constructor(color: PokeBlockColor, basePrice: number, description?: string) {
        super(`PokeBlock_${PokeBlockColor[color]}`, basePrice, undefined, {}, undefined, description);
        this.type = color;
    }
    
    get description(): string {
        return this._description || 'Unobtainable item for future uses';
    }

    get image() {
        return `assets/images/items/pokeblock/${this.name}.png`;
    }
}
