import { Computed } from 'knockout';
import {
    BattleItemType, humanifyString, ITEM_USE_TIME, formatTime,
} from '../GameConstants';
import type BattleItem from '../items/BattleItem';
import Multiplier from '../multiplier/Multiplier';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';

export default class EffectEngineRunner {
    public static counter = 0;
    public static multipliers = ['×1', '×10', '×100', '×1000', 'All'];
    public static multIndex = ko.observable(0);
    public static amountToUse = ko.pureComputed(() => (
        // Either the digits specified, or All (Infinity)
        Number(EffectEngineRunner.multipliers[EffectEngineRunner.multIndex()].replace(/\D/g, '')) || Infinity));

    public static initialize(multiplier: Multiplier, items: BattleItem[]) {
        items.forEach((item) => {
            if (item.multiplierType) {
                multiplier.addBonus(item.multiplierType, () => (this.isActive(item.name)() ? item.multiplyBy : 1));
            }
        });
    }

    public static tick() {
        this.counter = 0;
        const timeToReduce = 1;
        Object.values(BattleItemType).forEach((itemName) => {
            const timeRemaining = player.effectList[itemName]();
            if (timeRemaining > 0) {
                player.effectList[itemName](Math.max(0, timeRemaining - timeToReduce));
                this.updateFormattedTimeLeft(itemName);
            }
            if (player.effectList[itemName]() === 5) {
                Notifier.notify({
                    message: `The ${humanifyString(itemName)}'s effect is about to wear off!`,
                    type: NotificationConstants.NotificationOption.warning,
                    sound: NotificationConstants.NotificationSound.General.battle_item_timer,
                    setting: NotificationConstants.NotificationSetting.Items.battle_item_timer,
                });
            }
        });
    }

    public static incrementMultiplier() {
        this.multIndex((this.multIndex() + 1) % this.multipliers.length);
    }

    public static decrementMultiplier() {
        this.multIndex((this.multIndex() + this.multipliers.length - 1) % this.multipliers.length);
    }

    public static getEffect(itemName: string) {
        if (!player) {
            return 0;
        }
        return player.effectList[itemName]();
    }

    public static addEffect(itemName: string, amount: number) {
        player.effectList[itemName](Math.max(0, player.effectList[itemName]() + (ITEM_USE_TIME * amount)));
        this.updateFormattedTimeLeft(itemName);
    }

    public static updateFormattedTimeLeft(itemName: string) {
        const times = formatTime(player.effectList[itemName]()).split(':');
        if (+times[0] > 99) {
            return player.effectTimer[itemName]('99h+');
        } if (+times[0] > 0) {
            return player.effectTimer[itemName](`${+times[0]}h`);
        }
        times.shift();
        return player.effectTimer[itemName](times.join(':'));
    }

    public static getDungeonTokenMultiplier() {
        return this.isActive(BattleItemType.Token_collector)() ? 1.5 : 1;
    }

    public static isActive(itemName: string): Computed<boolean> {
        return ko.pureComputed(() => {
            if (!player) {
                return false;
            }
            return !!player.effectList[itemName]();
        });
    }
}
