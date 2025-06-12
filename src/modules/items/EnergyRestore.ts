import { EnergyRestoreSize, Currency } from '../GameConstants';
import Item from './Item';

export default class EnergyRestore extends Item {
    type: EnergyRestoreSize;

    constructor(type: EnergyRestoreSize, basePrice: number, currency: Currency = Currency.money, displayName?: string) {
        super(EnergyRestoreSize[type], basePrice, currency, undefined, displayName, 'Restores Expert Energy in the Underground.');
        this.type = type;
    }

    use(): boolean {
        if (player.itemList[this.name]() <= 0) {
            return false;
        }
        player.loseItem(this.name, 1);
        return true;
    }
}
