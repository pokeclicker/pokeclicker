import EffectEngineRunner from '../effectEngine/effectEngineRunner';
import { BattleItemType, Currency } from '../GameConstants';
import MultiplierType from '../multiplier/MultiplierType';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Item from './Item';

export default class BattleItem extends Item {
    type: BattleItemType;

    constructor(
        type: BattleItemType,
        description: string,
        basePrice: number,
        currency: Currency = Currency.money,
        displayName?: string,
        public multiplierType?: keyof typeof MultiplierType,
        public multiplyBy?: number,
    ) {
        super(BattleItemType[type], basePrice, currency, undefined, displayName, description, 'battleItem');
        this.type = type;
    }

    use(amount: number): boolean {
        EffectEngineRunner.addEffect(this.name, amount);
        return true;
    }

    checkCanUse(): boolean {
        if (App.game.challenges.list.disableBattleItems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Battle Items are disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have any ${this.displayName}s left...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }
}
