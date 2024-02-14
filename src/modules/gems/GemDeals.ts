import GemDeal from './GemDeal';
import GemDealList from './GemDealList';
import type { ObservableArray as KnockoutObservableArray } from 'knockout';
import BadgeEnums from '../enums/Badges';
import { GemShops } from '../GameConstants';
import { ItemList } from '../items/ItemList';
import GameHelper from '../GameHelper';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';

declare interface GemMasterShop { shop: GemShops; } // TODO remove this when GemMasterShop is moved to modules

export default class GemDeals {
    public static list: Record<GemShops, KnockoutObservableArray<GemDeal>> = {
        ...GemDealList, // static deals
    };

    public static generateDeals() {
        // No randomly-generated deals exist right now
    }

    public static getDeals(shop: GemMasterShop) {
        // @ts-ignore
        if (shop instanceof GemMasterShop) {
            return GemDeals.list[shop.shop]();
        }
        return [];
    }

    public static canUse(shop: GemMasterShop, i: number): boolean {
        // @ts-ignore
        if (shop instanceof GemMasterShop) {
            const deal = GemDeals.list[shop.shop].peek()[i];
            if (ItemList[deal.item.itemType.name].isSoldOut()) {
                return false;
            } else {
                return deal.gems.every((value) => App.game.gems.gemWallet[value.gemType]() >= value.amount);
            }
        }
        return false;
    }

    public static use(shop: GemMasterShop, i: number, tradeTimes = 1) {
        // @ts-ignore
        if (shop instanceof GemMasterShop) {
            const deal = GemDeals.list[shop.shop].peek()[i];
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
                const maxTrades = trades.reduce((a, b) => Math.min(a, b), tradeTimes);
                deal.gems.forEach((value) =>
                    GameHelper.incrementObservable(App.game.gems.gemWallet[value.gemType], -value.amount * maxTrades));
                deal.item.itemType.gain(deal.item.amount * maxTrades);
            }
        }
        return false;
    }
}
