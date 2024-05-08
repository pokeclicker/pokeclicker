import { Currency, ConsumableType } from '../GameConstants';
import Consumable from './Consumable';
import { ShopOptions } from './types';

export default class AttackGainConsumable extends Consumable {
    constructor(
        type: ConsumableType,
        basePrice: number,
        currency: Currency = Currency.money,
        options?: ShopOptions,
        displayName?: string,
        description?: string,
        public bonusMultiplier: number = 1,
        canUse?: (pokemon: any) => boolean,
    ) {
        super(type, basePrice, currency, options, displayName, description, canUse);
    }
}
