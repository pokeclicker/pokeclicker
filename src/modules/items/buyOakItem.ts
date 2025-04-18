import { Currency } from '../GameConstants';
import Item from './Item';
import {ItemNameType} from './ItemNameType';

export default class BuyOakItem extends Item {
    constructor(name: ItemNameType, basePrice: number, currency: Currency = Currency.questPoint) {
        super(name, basePrice, currency, { maxAmount: 1 }, undefined, 'Purchase to unlock this Oak Item');
    }

    totalPrice(amount: number) {
        let amt = amount;
        if (amt > this.maxAmount) {
            amt = this.maxAmount;
        }
        return this.basePrice * amt;
    }

    isSoldOut(): boolean {
        return player.itemList[this.name]() >= this.maxAmount;
    }

    get image(): string {
        return `assets/images/oakitems/${this.name}.png`;
    }
}
