import { Currency, VitaminType } from '../GameConstants';
import Item from './Item';
import { ShopOptions } from './types';

export default class Vitamin extends Item {
    type: VitaminType;

    constructor(type: VitaminType, basePrice: number, currency: Currency = Currency.money, options?: ShopOptions, displayName?: string, description?: string) {
        super(VitaminType[type], basePrice, currency, options, displayName, description);
        this.type = type;
    }

    // eslint-disable-next-line class-methods-use-this
    use(): boolean {
        return true;
    }

    get image() {
        return `assets/images/items/vitamin/${this.displayName}.png`;
    }
}
