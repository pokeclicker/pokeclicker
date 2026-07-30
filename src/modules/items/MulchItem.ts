import MulchType from '../enums/MulchType';
import { Currency } from '../GameConstants';
import GameHelper from '../GameHelper';
import Item from './Item';
import { MultiplierDecreaser, ShopOptions } from './types';

export default class MulchItem extends Item {
    type: MulchType;

    constructor(type: MulchType, basePrice: number, displayName: string, description: string, options?: ShopOptions) {
        super(MulchType[type], basePrice, Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry, ...options }, displayName, description, 'farm');
        this.type = type;
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.mulchList[this.type], amt);
    }

    getBagAmount() {
        return App.game.farming.mulchList[this.type]();
    }
}
