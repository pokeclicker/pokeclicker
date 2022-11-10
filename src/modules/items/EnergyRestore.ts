import { EnergyRestoreSize, Currency } from '../GameConstants';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Item from './Item';

export default class EnergyRestore extends Item {
    type: EnergyRestoreSize;

    constructor(type: EnergyRestoreSize, basePrice: number, currency: Currency = Currency.money, displayName?: string) {
        super(EnergyRestoreSize[type], basePrice, currency, undefined, displayName, 'Restores Energy in the Underground.');
        this.type = type;
    }

    use(): boolean {
        if (player.itemList[this.name]() <= 0) {
            return false;
        }
        if (App.game.underground.energy === App.game.underground.getMaxEnergy()) {
            Notifier.notify({
                message: 'Your mining energy is already full!',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        App.game.underground.gainEnergyThroughItem(this.type);
        player.loseItem(this.name, 1);
        return true;
    }
}
