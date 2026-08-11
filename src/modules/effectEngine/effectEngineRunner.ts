import { Computed } from 'knockout';
import {
    BattleItemType, humanifyString, ITEM_USE_TIME, formatTime,
    formatSecondsToTime,
} from '../GameConstants';
import type BattleItem from '../items/BattleItem';
import Multiplier from '../multiplier/Multiplier';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import { ItemList } from '../items/ItemList';

export default class EffectEngineRunner {
    public static counter = 0;
    public static multipliers = ['×1', '×10', '×100', '×1000', 'All'];
    public static itemSpeedCosts = [1, 2, 3, 6];
    public static multIndex = ko.observable(0);
    public static amountToUse = ko.pureComputed(() => (
        // Either the digits specified, or All (Infinity)
        Number(EffectEngineRunner.multipliers[EffectEngineRunner.multIndex()].replace(/\D/g, '')) || Infinity));

    public static initialize(multiplier: Multiplier, items: BattleItem[]) {
        items.forEach((item) => {
            if (item.multiplierType) {
                multiplier.addBonus(item.multiplierType, () => (this.isActive(item.name)() ? item.multiplyBy + this.getItemSpeedBoost() : 1), item.displayName);
            }
        });
    }

    public static tick() {
        this.counter = 0;
        const timeToReduce = this.getItemSpeedCost();
        Object.values(BattleItemType).forEach((itemName) => {
            const timeRemaining = player.effectList[itemName]();
            if (timeRemaining > 0) {
                player.effectList[itemName](Math.max(0, timeRemaining - timeToReduce));
                this.updateFormattedTimeLeft(itemName, timeToReduce);
            }
            if (player.effectList[itemName]() <= 5 * timeToReduce && player.effectList[itemName]() > 4 * timeToReduce) {
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

    public static incrementEffectSpeed() {
        player.effectSpeedIndex = (player.effectSpeedIndex + this.itemSpeedCosts.length + 1) % this.itemSpeedCosts.length;
    }

    public static decrementEffectSpeed() {
        player.effectSpeedIndex = (player.effectSpeedIndex + this.itemSpeedCosts.length - 1) % this.itemSpeedCosts.length;
    }

    public static getItemSpeedBoost(): number {
        return player.effectSpeedIndex / 10;
    }

    public static getItemSpeedCost(): number {
        return this.itemSpeedCosts[player.effectSpeedIndex];
    }

    public static getEffect(itemName: string) {
        if (!player) {
            return 0;
        }
        return player.effectList[itemName]();
    }

    public static addEffect(itemName: string, amount: number) {
        player.effectList[itemName](Math.max(0, player.effectList[itemName]() + (ITEM_USE_TIME * amount)));
        this.updateFormattedTimeLeft(itemName, this.getItemSpeedCost());
    }

    public static updateFormattedTimeLeft(itemName: string, speed: number) {
        const times = formatTime(Math.ceil(player.effectList[itemName]() / speed)).split(':');
        if (+times[0] > 99) {
            return player.effectTimer[itemName]('99h+');
        } if (+times[0] > 0) {
            return player.effectTimer[itemName](`${+times[0]}h`);
        }
        times.shift();
        return player.effectTimer[itemName](times.join(':'));
    }

    public static getDungeonTokenMultiplier() {
        return this.isActive(BattleItemType.Token_collector)() ? (ItemList.Token_collector as BattleItem).multiplyBy + this.getItemSpeedBoost() : 1;
    }

    public static getExtraLootChanceMultiplier(): number {
        return this.isActive(BattleItemType.Dowsing_machine)() ? (ItemList.Dowsing_machine as BattleItem).multiplyBy + this.getItemSpeedBoost() : 1;
    }

    public static isActive(itemName: string): Computed<boolean> {
        return ko.pureComputed(() => {
            if (!player) {
                return false;
            }
            return !!player.effectList[itemName]();
        });
    }

    public static getDescription(itemName: string) {
        const item: BattleItem = ItemList[itemName];
        const bonus = `${(item.multiplyBy + this.getItemSpeedBoost()) * 100 - 100}%`;
        const time = `${ITEM_USE_TIME / this.getItemSpeedCost()}`;
        return item.getDescription().replace('$duration$', time).replace('$bonus$', bonus);
    }

    public static getEffectRunningOut(itemName: string) {
        return player.effectList[itemName]() <= 5 * this.getItemSpeedCost();
    }

    public static getEffectFullTime(itemName: string) {
        return formatSecondsToTime(Math.ceil(player.effectList[itemName]() / this.getItemSpeedCost()));
    }
}
