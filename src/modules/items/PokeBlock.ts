import FlavorType from '../enums/FlavorType';
import { PokeBlockColor, Currency } from '../GameConstants';
import Item from './Item';

interface BlockFlavor {
    type: FlavorType,
    value: number,
}

export default class PokeBlock extends Item {
    type: PokeBlockColor;
    flavors: BlockFlavor[];

    constructor(color: PokeBlockColor, basePrice: number, flavors: number[] = [0, 0, 0, 0, 0], description?: string) {
        super(`PokeBlock_${PokeBlockColor[color]}`, basePrice, undefined, {}, undefined, description);
        this.type = color;
        this.flavors = [];
        for (let i = 0; i < 5; i++) {
            this.flavors.push({type: i, value: flavors[i]});
        }
    }
    
    get description(): string {
        return this._description || 'Unobtainable item for future uses';
    }

    get image() {
        return `assets/images/items/pokeblock/${this.name}.png`;
    }
}
