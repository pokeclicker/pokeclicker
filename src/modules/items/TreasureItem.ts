import Item from './Item';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { Currency } from '../GameConstants';

export default class TreasureItem extends Item {

    constructor(id: string, public valueType: UndergroundItemValueType, displayName?: string) {
        super(id, Infinity, Currency.diamond, undefined, displayName, `${displayName || id} dug out from the Underground.`);
    }

    get image() {
        return `assets/images/${this.valueType === UndergroundItemValueType.Fossil ? 'breeding' : 'items/underground'}/${this.displayName}.png`;
    }
}
