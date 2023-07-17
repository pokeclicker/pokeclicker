import { Currency, ConsumableType } from '../GameConstants';
import Item from './Item';
import { ShopOptions } from './types';

export default class Consumable extends Item {
    type: ConsumableType;

    constructor(
        type: ConsumableType,
        public actuallyUse: (amount: number, name: string) => boolean,
        basePrice: number, currency: Currency = Currency.money, options?: ShopOptions,
        displayName?: string,
        description?: string,
    ) {
        super(ConsumableType[type], basePrice, currency, options, displayName, description);
        this.type = type;
    }

    use(amount: number, pokemonName: string): boolean {
        if (!this.checkCanUse()) {
            return false;
        }
        amount = Math.min(amount, player.itemList[this.name]());
        if (this.actuallyUse(amount, pokemonName)) {
            player.loseItem(this.name, amount);
            return true;
        }
        return false;
    }

    get image() {
        return `assets/images/items/consumable/${this.name}.png`;
    }
}
