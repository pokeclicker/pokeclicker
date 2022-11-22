import { Currency, VitaminType } from '../GameConstants';
import Item from './Item';
import { ItemList } from './ItemList';
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

ItemList.RareCandy = new Vitamin(VitaminType.RareCandy, Infinity, undefined, undefined, 'Rare Candy', 'A rare-to-find candy that currently has no use.');
ItemList.Protein = new Vitamin(VitaminType.Protein, 1e4, Currency.money, { multiplier: 1.1, multiplierDecrease: false, saveName: `${VitaminType[VitaminType.Protein]}|${Currency[Currency.money]}` }, undefined, 'Increases Pokémon attack bonus.<br/><i>(attack gained per breeding cycle)</i>');
