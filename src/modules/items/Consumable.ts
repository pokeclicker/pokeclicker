import { Currency, ConsumableType } from '../GameConstants';
import Item from './Item';
import { ShopOptions } from './types';

export default class Consumable extends Item {
    type: ConsumableType;

    constructor(
        type: ConsumableType,
        basePrice: number, currency: Currency = Currency.money, options?: ShopOptions,
        displayName?: string,
        description?: string,
    ) {
        super(ConsumableType[type], basePrice, currency, options, displayName, description, 'consumable');
        this.type = type;
    }
}
