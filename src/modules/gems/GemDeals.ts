import GemDeal from './GemDeal';
import GemDealList from './GemDealList';
import type { ObservableArray as KnockoutObservableArray } from 'knockout';
import BadgeEnums from '../enums/Badges';
import { GemShops } from '../GameConstants';
import { ItemList } from '../items/ItemList';
import GameHelper from '../GameHelper';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';

export default class GemDeals {
    public static list: Record<GemShops, KnockoutObservableArray<GemDeal>> = {
        ...GemDealList, // static deals
    };

    public static generateDeals() {
        // No randomly-generated deals exist right now
    }

    public static getDeals(shop: GemShops) {
        return GemDeals.list[shop]?.() ?? [];
    }

    public static canUse(shop: GemShops, i: number): boolean {
        const deal = GemDeals.list[shop]?.peek()[i];
        if (!deal || ItemList[deal.item.itemType.name].isSoldOut()) {
            return false;
        } else {
            const playerAmount = player.itemList[deal.item.itemType.name]();
            return deal.gems.every((value) => App.game.gems.gemWallet[value.gemType]() >= value.amount)
                && Number.isSafeInteger(playerAmount + deal.item.amount);
        }
    }

    public static use(shop: GemShops, i: number, tradeTimes = 1) {
        const deal = GemDeals.list[shop]?.peek()[i];
        if (!deal) {
            return false;
        }
        if (!App.game.badgeCase.hasBadge(BadgeEnums.Heat)) {
            Notifier.notify({
                message: 'You are unable to use Flutes yet.\n<i>Visit the Gym in Lavaridge Town.</i>',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (GemDeals.canUse(shop, i)) {
            const trades = deal.gems.map(gem => {
                const amt = App.game.gems.gemWallet[gem.gemType]();
                const maxTrades = Math.floor(amt / gem.amount);
                return maxTrades;
            });
            const playerAmount = player.itemList[deal.item.itemType.name]();
            const maxSafeTrades = Math.floor((Number.MAX_SAFE_INTEGER - playerAmount) / deal.item.amount);
            const maxTrades = Math.min(trades.reduce((a, b) => Math.min(a, b), tradeTimes), maxSafeTrades);
            deal.gems.forEach((value) =>
                GameHelper.incrementObservable(App.game.gems.gemWallet[value.gemType], -value.amount * maxTrades));
            deal.item.itemType.gain(deal.item.amount * maxTrades);
        }
    }
}
