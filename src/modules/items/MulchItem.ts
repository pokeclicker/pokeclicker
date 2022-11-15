import MulchType from '../enums/MulchType';
import { Currency } from '../GameConstants';
import GameHelper from '../GameHelper';
import Item from './Item';
import { MultiplierDecreaser } from './types';

export default class MulchItem extends Item {
    type: MulchType;

    constructor(type: MulchType, basePrice: number, displayName: string, description: string) {
        super(MulchType[type], basePrice, Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry }, displayName, description, 'farm');
        this.type = type;
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.mulchList[this.type], amt);
    }
}
