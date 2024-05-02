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

    getFormattedTooltip(item): string {
        let tooltipString = '';
        tooltipString += `<div><strong>${item.displayName}</strong></div>`;
        tooltipString += `<div>${item.getDescription()}</div>`;
        tooltipString += '<br/>';
        tooltipString += '<div><strong>Consumes:</strong></div>';
        tooltipString += '<table class="w-100">';
        for (const gem of item.gemTypes) {
            tooltipString += '<tr>';
            tooltipString += `<td class="text-left" px-1">${gem} gems</td>`;
            tooltipString += `<td class="text-right" px-1">(${App.game.gems.gemWallet[PokemonType[gem]]().toLocaleString('en-US')})</td>`;
            tooltipString += '</tr>';
        }
        tooltipString += '</table>';
        return tooltipString;
    }

    public getMultiplier() {
        return (this.multiplyBy - 1) * (AchievementHandler.achievementBonus() + 1) + 1;
    }

    isSoldOut(): boolean {
        return player.itemList[this.name]() > 0 || FluteEffectRunner.isActive(FluteItemType[this.name])();
    }

    checkCanUse(): boolean {
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
