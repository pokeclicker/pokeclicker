import PokemonType from '../enums/PokemonType';
import Amount from '../wallet/Amount';
import BerryType from '../enums/BerryType';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import GameHelper from '../GameHelper';
import { Currency } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';

export type GenericTraderShopIdentifier =
    'Palaeontologist' |
    'EverstoneDealer' |
    'FossilCinnabarLab' |
    'FossilDevonCorporation' |
    'FossilOreburghMiningMuseum' |
    'FossilNacreneMuseum' |
    'FossilAmbretteFossilLab' |
    'FossilMasterGalarRoute6';

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

type GenericDealParams = {
    costs: DealCost[];
    profits: DealProfit[];
    tradeRequirement?: Requirement;
    visibleRequirement?: Requirement;
    tradeButtonOverride?: string;
};

export default class GenericDeal {
    private readonly _costs: DealCost[];
    private readonly _profits: DealProfit[];
    private readonly _tradeRequirement?: Requirement;
    private readonly _visibleRequirement?: Requirement;
    private readonly _tradeButtonOverride?: string;

    get costs(): DealCost[] {
        return this._costs;
    }

    get profits(): DealProfit[] {
        return this._profits;
    }

    get requirement(): Requirement | undefined {
        return this._tradeRequirement;
    }

    get tradeButtonOverride(): string | undefined {
        return this._tradeButtonOverride;
    }

    public static list: Partial<Record<GenericTraderShopIdentifier, KnockoutObservableArray<GenericDeal>>> = {};

    constructor(params: GenericDealParams) {
        const {
            costs,
            profits,
            tradeRequirement = undefined,
            visibleRequirement = undefined,
            tradeButtonOverride = undefined,
        } = params;

        this._costs = costs;
        this._profits = profits;
        this._tradeRequirement = tradeRequirement;
        this._visibleRequirement = visibleRequirement;
        this._tradeButtonOverride = tradeButtonOverride;
    }

    public isVisible(): boolean {
        return this._profits.every(profit => {
            switch (profit.type) {
                case DealCostOrProfitType.Item:
                    return profit.item.isVisible();
            }
            return true;
        }) && (!this._visibleRequirement || this._visibleRequirement?.isCompleted());
    }

    public static getDeals(id: GenericTraderShopIdentifier) {
        return GenericDeal.list[id];
    }

    public static isLocked(id: GenericTraderShopIdentifier, index: number): boolean {
        const deal = GenericDeal.list[id]?.peek()[index];
        if (!deal) {
            return false;
        }

        if (!deal.requirement) {
            return false;
        }

        return !deal.requirement.isCompleted();
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

        // If this deal has a requirement that was not yet met
        if (deal.requirement && !deal.requirement?.isCompleted()) {
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

    public static inventoryAmount(a: DealCost | DealProfit): number {
        switch (a.type) {
            case DealCostOrProfitType.Gem: return App.game.gems.gemWallet[a.gemType]();
            case DealCostOrProfitType.Shard: return player.itemList[a.shardItem.name]();
            case DealCostOrProfitType.Berry: return App.game.farming.berryList[a.berryType]();
            case DealCostOrProfitType.Item: return player.itemList[a.item.name]();
            case DealCostOrProfitType.Amount: return App.game.wallet.currencies[a.currency.currency]();
            default: return 0;
        }
    }

    public static generateDeals() {
        GenericDeal.list.Palaeontologist = ko.observableArray([
            new GenericDeal({
                costs: [ { type: DealCostOrProfitType.Item, item: ItemList.Palaeontologist_token, amount: 1 } ],
                profits: [ { type: DealCostOrProfitType.Item, item: ItemList['Pikachu (Palaeontologist)'], amount: 1, hidePlayerInventory: true } ],
            }),
            new GenericDeal({
                costs: [ { type: DealCostOrProfitType.Item, item: ItemList.Palaeontologist_token, amount: 1 } ],
                profits: [ { type: DealCostOrProfitType.Amount, currency: new Amount(750, Currency.diamond), amount: 1 } ],
            }),
        ]);

        GenericDeal.list.EverstoneDealer = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Amount, currency: new Amount(375, Currency.diamond), amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Everstone, amount: 1 }],
            }),
        ]);

        GenericDeal.list.FossilCinnabarLab = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Helix_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Omanyte, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Helix_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Omastar, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Omastar'),
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Dome_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kabuto, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Dome_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kabutops, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Kabutops'),
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Old_amber, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Aerodactyl, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
        ]);

        GenericDeal.list.FossilDevonCorporation = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Root_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Lileep, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Root_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Cradily, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Cradily'),
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Claw_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Anorith, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Claw_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Armaldo, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Armaldo'),
            }),
        ]);

        GenericDeal.list.FossilOreburghMiningMuseum = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Skull_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Cranidos, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Skull_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Rampardos, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Rampardos'),
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Armor_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Shieldon, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Armor_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Bastiodon, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Bastiodon'),
            }),
        ]);

        GenericDeal.list.FossilNacreneMuseum = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Cover_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Tirtouga, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Cover_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Carracosta, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Carracosta'),
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Plume_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Archen, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Plume_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Archeops, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Archeops'),
            }),
        ]);

        GenericDeal.list.FossilAmbretteFossilLab = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Jaw_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Tyrunt, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Jaw_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Tyrantrum, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Tyrantrum'),
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Sail_fossil, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Amaura, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Sail_fossil, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Aurorus, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
                tradeRequirement: new ObtainedPokemonRequirement('Aurorus'),
            }),
        ]);

        GenericDeal.list.FossilMasterGalarRoute6 = ko.observableArray([
            new GenericDeal({
                costs: [
                    { type: DealCostOrProfitType.Item, item: ItemList.Fossilized_bird, amount: 1 },
                    { type: DealCostOrProfitType.Item, item: ItemList.Fossilized_drake, amount: 1 },
                    { type: DealCostOrProfitType.Amount, currency: new Amount(25000, Currency.questPoint), amount: 1 },
                ],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dracozolt, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [
                    { type: DealCostOrProfitType.Item, item: ItemList.Fossilized_bird, amount: 1 },
                    { type: DealCostOrProfitType.Item, item: ItemList.Fossilized_dino, amount: 1 },
                    { type: DealCostOrProfitType.Amount, currency: new Amount(25000, Currency.questPoint), amount: 1 },
                ],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Arctozolt, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [
                    { type: DealCostOrProfitType.Item, item: ItemList.Fossilized_fish, amount: 1 },
                    { type: DealCostOrProfitType.Item, item: ItemList.Fossilized_drake, amount: 1 },
                    { type: DealCostOrProfitType.Amount, currency: new Amount(25000, Currency.questPoint), amount: 1 },
                ],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dracovish, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
            new GenericDeal({
                costs: [
                    { type: DealCostOrProfitType.Item, item: ItemList.Fossilized_fish, amount: 1 },
                    { type: DealCostOrProfitType.Item, item: ItemList.Fossilized_dino, amount: 1 },
                    { type: DealCostOrProfitType.Amount, currency: new Amount(25000, Currency.questPoint), amount: 1 },
                ],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Arctovish, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Revive',
            }),
        ]);
    }
}
