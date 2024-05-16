import { Currency, ConsumableType } from '../GameConstants';
import Item from './Item';
import { ShopOptions } from './types';

export default class Consumable extends Item {
    type: ConsumableType;
    _canUse: (pokemon: any) => boolean;

    constructor(
        type: ConsumableType,
        basePrice: number, currency: Currency = Currency.money, options?: ShopOptions,
        displayName?: string,
        description?: string,
        canUse?: (pokemon: any) => boolean,
    ) {
        super(ConsumableType[type], basePrice, currency, options, displayName, description, 'consumable');
        this.type = type;
        this._canUse = canUse;
    }

    canUse(pokemon: { [key: string]: any, id : number }): boolean {
        return this._canUse?.(pokemon) ?? true;
    }
}
