import PokemonType from '../enums/PokemonType';
import Amount from '../wallet/Amount';
import BerryType from '../enums/BerryType';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import GameHelper from '../GameHelper';
import { Currency } from '../GameConstants';

export type GenericTraderShopIdentifier = 'Palaeontologist' | 'EverstoneDealer';

/* eslint-disable @typescript-eslint/no-shadow */
export enum DealCostOrProfitType {
    Gem = 'Gem',
    Shard = 'Shard',
    Berry = 'Berry',
    Item = 'Item',
    Amount = 'Amount',
}
/* eslint-enable @typescript-eslint/no-shadow */

type DealCostProfit = {
    amount: number,
    hidePlayerInventory?: boolean,
};

type GemDealCost = {
    type: DealCostOrProfitType.Gem,
    gemType: PokemonType,
} & DealCostProfit;

type ShardDealCost = {
    type: DealCostOrProfitType.Shard,
    shardItem: Item,
} & DealCostProfit;

type BerryDealCost = {
    type: DealCostOrProfitType.Berry,
    berryType: BerryType,
} & DealCostProfit;

type ItemDealCost = {
    type: DealCostOrProfitType.Item,
    item: Item,
} & DealCostProfit;

type AmountDealCost = {
    type: DealCostOrProfitType.Amount,
    currency: Amount,
} & DealCostProfit;

export type DealCost = GemDealCost | ShardDealCost | BerryDealCost | ItemDealCost | AmountDealCost;

type ItemDealProfit = {
    type: DealCostOrProfitType.Item,
    item: Item,
} & DealCostProfit;

type AmountDealProfit = {
    type: DealCostOrProfitType.Amount,
    currency: Amount,
} & DealCostProfit;

export type DealProfit = ItemDealProfit | AmountDealProfit;

export default class GenericDeal {
    private _costs: DealCost[];
    private _profits: DealProfit[];

    get costs(): DealCost[] {
        return this._costs;
    }

    get profits(): DealProfit[] {
        return this._profits;
    }

    public static list: Partial<Record<GenericTraderShopIdentifier, KnockoutObservableArray<GenericDeal>>> = {};

    constructor(costs: DealCost[], profits: DealProfit[]) {
        this._costs = costs;
        this._profits = profits;
    }

    public isVisible(): boolean {
        return this._profits.every(profit => {
            switch (profit.type) {
                case DealCostOrProfitType.Item:
                    return profit.item.isVisible();
            }
            return true;
        });
    }

    public static getDeals(id: GenericTraderShopIdentifier) {
        return GenericDeal.list[id];
    }

    public static canUse(id: GenericTraderShopIdentifier, index: number): boolean {
        const deal = GenericDeal.list[id]?.peek()[index];
        if (!deal) {
            return false;
        }

        // If some of the profit results are not available, then this trade is not available
        if (this.anySoldOut(deal)) {
            return false;
        }

        // This trade is only available if all costs are available
        return this.maxTrades(deal) > 0;
    }

    public static use(id: GenericTraderShopIdentifier, index: number, tradeTimes = 1) {
        const deal = GenericDeal.list[id]?.peek()[index];
        if (!deal) {
            return false;
        }

        // Cap the amount of trades we want to do
        tradeTimes = Math.min(tradeTimes, this.maxTrades(deal));

        if (tradeTimes <= 0) {
            return false;
        }

        // Lose the cost
        deal._costs.forEach(cost => {
            switch (cost.type) {
                case DealCostOrProfitType.Item: player.loseItem(cost.item.name, cost.amount * tradeTimes); break;
                case DealCostOrProfitType.Shard: player.loseItem(cost.shardItem.name, cost.amount * tradeTimes); break;
                case DealCostOrProfitType.Berry: GameHelper.incrementObservable(App.game.farming.berryList[cost.berryType], -1 * cost.amount * tradeTimes); break;
                case DealCostOrProfitType.Gem: GameHelper.incrementObservable(App.game.gems.gemWallet[cost.gemType], -1 * cost.amount * tradeTimes); break;
                case DealCostOrProfitType.Amount: App.game.wallet.loseAmount(new Amount(cost.currency.amount * cost.amount * tradeTimes, cost.currency.currency)); break;
            }
        });

        // Gain the profit
        deal._profits.forEach(profit => {
            switch (profit.type) {
                case DealCostOrProfitType.Item: profit.item.gain(profit.amount * tradeTimes); break;
                case DealCostOrProfitType.Amount: App.game.wallet.addAmount(new Amount(profit.currency.amount * profit.amount * tradeTimes, profit.currency.currency), true); break;
            }
        });
    }

    public static anySoldOut(deal: GenericDeal) {
        return deal._profits.some(profit => {
            switch (profit.type) {
                case DealCostOrProfitType.Item:
                    return ItemList[profit.item.name].isSoldOut();
            }
            return false;
        });
    }

    public static maxTrades(deal: GenericDeal) {
        return Math.min(...deal._costs.map(cost => {
            switch (cost.type) {
                case DealCostOrProfitType.Item:
                    return Math.floor(player.itemList[cost.item.name]() / cost.amount);
                case DealCostOrProfitType.Shard:
                    return Math.floor(player.itemList[cost.shardItem.name]() / cost.amount);
                case DealCostOrProfitType.Berry:
                    return Math.floor(App.game.farming.berryList[cost.berryType]() / cost.amount);
                case DealCostOrProfitType.Gem:
                    return Math.floor(App.game.gems.gemWallet[cost.gemType]() / cost.amount);
                case DealCostOrProfitType.Amount:
                    return Math.floor(App.game.wallet.currencies[cost.currency.currency]() / cost.currency.amount * cost.amount);
            }
        }));
    }

    public static generateDeals() {
        GenericDeal.list.Palaeontologist = ko.observableArray([
            new GenericDeal(
                [
                    { type: DealCostOrProfitType.Item, item: ItemList.Palaeontologist_token, amount: 1 },
                ],
                [
                    { type: DealCostOrProfitType.Item, item: ItemList['Pikachu (Palaeontologist)'], amount: 1, hidePlayerInventory: true },
                ],
            ),
        ]);

        GenericDeal.list.EverstoneDealer = ko.observableArray([
            new GenericDeal(
                [
                    { type: DealCostOrProfitType.Amount, currency: new Amount(375, Currency.diamond), amount: 1 },
                ],
                [
                    { type: DealCostOrProfitType.Item, item: ItemList.Everstone, amount: 1 },
                ],
            ),
        ]);
    }
}
