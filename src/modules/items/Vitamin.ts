import { Currency, VitaminType } from '../GameConstants';
import GameHelper from '../GameHelper';
import Item from './Item';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
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

    checkCanUse(): boolean {
        if (!player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have any ${this.displayName} left...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

    get image() {
        return `assets/images/items/vitamin/${this.name}.png`;
    }
}
