/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
import { Currency } from '../GameConstants';
import GameHelper from '../GameHelper';
import Item from './Item';
import { MultiplierDecreaser } from './types';

// TODO: merge these classes somehow, maybe make Farming have a (shovels: Record<ItemName, number>) property
export class ShovelItem extends Item {
    constructor(basePrice: number, displayName: string, description: string) {
        super('Berry_Shovel', basePrice, Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry }, displayName, description, 'farm');
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.shovelAmt, amt);
    }
}

export class MulchShovelItem extends Item {
    constructor(basePrice: number, displayName: string, description: string) {
        super('Mulch_Shovel', basePrice, Currency.farmPoint, { multiplierDecreaser: MultiplierDecreaser.Berry }, displayName, description, 'farm');
    }

    gain(amt: number) {
        GameHelper.incrementObservable(App.game.farming.mulchShovelAmt, amt);
    }
}
