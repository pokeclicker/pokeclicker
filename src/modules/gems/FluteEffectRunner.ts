import type {
    Observable as KnockoutObservable,
    ObservableArray as KnockoutObservableArray,
    Computed as KnockoutComputed,
} from 'knockout';
import type Multiplier from '../multiplier/Multiplier';
import GameHelper from '../GameHelper';
import { ItemList } from '../items/ItemList';
import type FluteItem from '../items/FluteItem';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import {
    FluteItemType,
    humanifyString,
    formatSecondsToTime,
    formatTime,
    MINUTE,
} from '../GameConstants';
import PokemonType from '../enums/PokemonType';
import { LogBookTypes } from '../logbook/LogBookTypes';
import { createLogContent } from '../logbook/helpers';

export default class FluteEffectRunner {
    public static counter = 0;
    public static numActiveFlutes: KnockoutObservable<number> = ko.observable(0);
    public static activeGemTypes: KnockoutObservableArray<number> = ko.observableArray();

    public static additionalInfoTooltip: KnockoutComputed<string> = ko.pureComputed(() => {
        const tooltip = [];

        // List all types boosted
        if (this.activeGemTypes().length < 18) {
            this.activeGemTypes().forEach(idx => {
                tooltip.push(`<i>${PokemonType[idx]}<i/>`);
            });
        } else {
            tooltip.push('<i>All Types<i/>');
        }

        // Adding header when active
        if (tooltip.length) {
            tooltip.unshift('+0.5% boost to:');
        }

        return tooltip.join('<br>');
    });

    public static initialize(multiplier: Multiplier) {
        FluteEffectRunner.numActiveFlutes(0);
        GameHelper.enumStrings(FluteItemType).forEach((itemName: FluteItemType) => {
            const item = (ItemList[itemName] as FluteItem);
            if (item.multiplierType) {
                multiplier.addBonus(item.multiplierType, () => this.getFluteMultiplier(itemName), item.displayName);
            }
            if (this.isActive(itemName)()) {
                GameHelper.incrementObservable(this.numActiveFlutes, 1);
            }
        });
        this.updateActiveGemTypes();
    }

    public static tick() {
        this.counter = 0;

        GameHelper.enumStrings(FluteItemType).forEach((itemName: FluteItemType) => {
            if (this.getLowestGem(itemName) > 0 && this.isActive(itemName)()) {
                player.effectList[itemName](Math.max(0, this.getLowestGem(itemName) - this.numActiveFlutes()));
                this.updateFormattedTimeLeft(itemName);
                if (this.numActiveFlutes() >= this.getLowestGem(itemName)) {
                    this.removeEffect(itemName);
                    Notifier.notify({
                        message: `You ran out of gems for the ${humanifyString(itemName)}'s effect!`,
                        type: NotificationConstants.NotificationOption.danger,
                        sound: NotificationConstants.NotificationSound.General.battle_item_timer,
                        setting: NotificationConstants.NotificationSetting.Items.battle_item_timer,
                        timeout: 1 * MINUTE,
                    });
                    App.game.logbook.newLog(
                        LogBookTypes.OTHER,
                        createLogContent.fluteRanOutOfGems({ flute: humanifyString(itemName) }),
                    );
                }
            }
        });
        this.gemCost();
    }

    public static getLowestGem(itemName: string) {
        const item = (ItemList[itemName] as FluteItem);
        const gemArray = item.gemTypes.map(idx => App.game.gems.gemWallet[PokemonType[idx]]());
        const gemMaxTime = Math.min(...gemArray);
        return gemMaxTime;
    }

    public static updateActiveGemTypes() {
        this.activeGemTypes.removeAll();
        const gemTypes: Set<number> = new Set();
        GameHelper.enumStrings(FluteItemType).forEach((itemName: FluteItemType) => {
            if (FluteEffectRunner.isActive(itemName)()) {
                const item = (ItemList[itemName] as FluteItem);
                item.gemTypes.forEach(idx => gemTypes.add(PokemonType[idx]));
            }
        });
        [...gemTypes].forEach(x => this.activeGemTypes.push(x));
    }

    public static gemCost() {
        this.activeGemTypes().forEach(idx => App.game.gems.gainGems(-this.numActiveFlutes(), idx));
    }

    public static getEffect(itemName: FluteItemType) {
        if (!player) {
            return 0;
        }
        return player.effectList[itemName]();
    }

    public static toggleEffect(itemName: FluteItemType) {

        if (this.isActive(itemName)()) {
            this.removeEffect(itemName);
            return;
        }

        player.effectList[itemName](Math.max(0, player.effectList[itemName]() + FluteEffectRunner.getLowestGem(itemName)));
        GameHelper.incrementObservable(this.numActiveFlutes, 1);
        this.updateFormattedTimeLeft(itemName);
        this.updateActiveGemTypes();
    }

    public static removeEffect(itemName: FluteItemType) {
        player.effectList[itemName](0);
        GameHelper.incrementObservable(this.numActiveFlutes, -1);
        this.updateFormattedTimeLeft(itemName);
        player.gainItem(itemName, 1);
        this.updateActiveGemTypes();
    }

    public static fluteFormattedTime(itemName: FluteItemType): number {
        return (player.effectList[itemName]() / this.numActiveFlutes());
    }

    public static fluteTooltip(itemName: FluteItemType): string {
        const str = [];
        str.push(`<strong>Time Remaining:</strong><br> ${formatSecondsToTime(this.fluteFormattedTime(itemName))}`);
        return str.join('<br>');
    }

    public static updateFormattedTimeLeft(itemName: FluteItemType) {
        const times = formatTime(this.fluteFormattedTime(itemName)).split(':');
        if (+times[0] > 99) {
            return player.effectTimer[itemName]('99h+');
        } else if (+times[0] > 0) {
            return player.effectTimer[itemName](`${+times[0]}h`);
        }
        times.shift();
        player.effectTimer[itemName](times.join(':'));
    }

    public static getFluteMultiplier(itemName: FluteItemType) {
        const flute = (ItemList[itemName] as FluteItem);
        return this.isActive(flute.name)() ? flute.getMultiplier() : 1;
    }


    public static isActive(itemName: FluteItemType): KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            if (!player) {
                return false;
            }
            return !!player.effectList[itemName]();
        });
    }

    public static fluteGemTooltip(item): string {
        let tooltipString = '';
        tooltipString += '<div><strong>Consumes:</strong></div>';
        tooltipString += '<table class="w-100">';
        for (const gem of item.gemTypes) {
            tooltipString += '<tr>';
            tooltipString += `<td class="text-left" px-1">${gem} gems</td>`;
            tooltipString += '<td></td>';
            tooltipString += `<td class="text-right" px-1">(${App.game.gems.gemWallet[PokemonType[gem]]().toLocaleString('en-US')})</td>`;
            tooltipString += '</tr>';
        }
        tooltipString += '</table>';
        return tooltipString;
    }
}
