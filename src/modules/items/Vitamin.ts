import { Currency, VitaminType } from '../GameConstants';
import GameHelper from '../GameHelper';
import Item from './Item';
import { ShopOptions } from './types';

export default class Vitamin extends Item {
    type: VitaminType;

    constructor(type: VitaminType, basePrice: number, currency: Currency = Currency.money, options?: ShopOptions, displayName?: string, description?: string) {
        super(VitaminType[type], basePrice, currency, options, displayName, description);
        this.type = type;
    }

    gain(n: number) {
        super.gain(n);

        GameHelper.incrementObservable(App.game.statistics.totalVitaminsPurchased, n);
        GameHelper.incrementObservable(App.game.statistics.totalVitaminsObtained, n);
    }

    // eslint-disable-next-line class-methods-use-this
    use(): boolean {
        return true;
    }

    get image() {
        return `assets/images/items/vitamin/${this.displayName}.png`;
    }
}
