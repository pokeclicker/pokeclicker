import Item from './Item';
import FluteEffectRunner from '../gems/FluteEffectRunner';
import { FluteItemType } from '../GameConstants';
import type PokemonType from '../enums/PokemonType';
import type MultiplierType from '../multiplier/MultiplierType';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';

export default class FluteItem extends Item {
    name: FluteItemType;

    constructor(
        name: FluteItemType,
        description: string,
        public gemTypes: (keyof typeof PokemonType)[],
        public multiplierType: keyof typeof MultiplierType,
        public multiplyBy: number,
    ) {
        super(name, Infinity, undefined, { maxAmount : 1 }, undefined, description, 'fluteItem');
    }

    use(): boolean {
        FluteEffectRunner.toggleEffect(this.name);
        return true;
    }

    getDescription(): string {
        return `+${(this.getMultiplier() - 1).toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 })} bonus to ${this.description}`;
    }

    public getMultiplier() {
        return (this.multiplyBy - 1) * (AchievementHandler.achievementBonus() + 1) + 1;
    }

    isSoldOut(): boolean {
        return player.itemList[this.name]() > 0 || FluteEffectRunner.isActive(FluteItemType[this.name])();
    }

    checkCanUse(): boolean {
        if (App.game.challenges.list.disableGems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Gems are Disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (App.game.challenges.list.disableBattleItems.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Battle Items are Disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (!FluteEffectRunner.isActive(FluteItemType[this.name])() && !player.itemList[this.name]()) {
            Notifier.notify({
                message: `You don't have the ${this.displayName}...`,
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (FluteEffectRunner.getLowestGem(this.name) <= FluteEffectRunner.numActiveFlutes() + 1) {
            Notifier.notify({
                message: 'You don\'t have enough gems to use this Flute.',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

}


