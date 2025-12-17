import CaughtStatus from '../enums/CaughtStatus';
import { Currency, EggItemType } from '../GameConstants';
import CaughtIndicatingItem from './CaughtIndicatingItem';

export default class EggItem extends CaughtIndicatingItem {
    type: EggItemType;

    constructor(type: EggItemType, basePrice: number, currency: Currency = Currency.questPoint, displayName?: string) {
        super(EggItemType[type], basePrice, currency, undefined, displayName, 'An egg. Can be hatched in the Day Care.', 'egg');
        this.type = type;
    }

    use(): boolean {
        return this.addToHatchery();
    }

    addToHatchery(): boolean {
        return App.game.breeding.addEggItemToHatchery(this.type);
    }

    getCaughtStatus(): CaughtStatus {
        if (this.type === EggItemType.Mystery_egg) {
            return App.game.breeding.getAllCaughtStatus();
        } else {
            return App.game.breeding.getTypeCaughtStatus(this.type);
        }
    }
}
