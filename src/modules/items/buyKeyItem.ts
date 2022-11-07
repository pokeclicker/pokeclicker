import KeyItemType from '../enums/KeyItemType';
import { Currency } from '../GameConstants';
import Item from './Item';
import { ShopOptions } from './types';

export default class BuyKeyItem extends Item {
    item: KeyItemType;

    constructor(item: KeyItemType, basePrice: number, currency: Currency = Currency.questPoint, options?: ShopOptions, displayName?: string) {
        super(KeyItemType[item], basePrice, currency, { maxAmount: 1, ...options }, displayName);
        this.item = item;
    }

    totalPrice(amount: number) {
        let amt = amount;
        if (amt > this.maxAmount) {
            amt = this.maxAmount;
        }
        return this.basePrice * amt;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    gain(amt: number) {
        App.game.keyItems.gainKeyItem(this.item);
    }

    isAvailable(): boolean {
        return super.isAvailable() && !App.game.keyItems.hasKeyItem(this.item);
    }

    get image(): string {
        return `assets/images/keyitems/${this.name}.png`;
    }
}
