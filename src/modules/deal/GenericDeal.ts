import PokemonType from '../enums/PokemonType';
import Amount from '../wallet/Amount';
import BerryType from '../enums/BerryType';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import GameHelper from '../GameHelper';
import { Currency, Region } from '../GameConstants';
import Requirement from '../requirements/Requirement';
import ObtainedPokemonRequirement from '../requirements/ObtainedPokemonRequirement';
import MaxRegionRequirement from '../requirements/MaxRegionRequirement';
import SeededRand from '../utilities/SeededRand';
import DealHelper from './DealHelper';
import { PokemonRestrictedAttackBonusHeldItem, TypeRestrictedAttackBonusHeldItem } from '../items/HeldItem';
import CustomRequirement from '../requirements/CustomRequirement';

export type GenericTraderShopIdentifier =
    'CoinChanger' |
    'PirateFence' |
    'Palaeontologist' |
    'EverstoneDealer' |
    'FossilCinnabarLab' |
    'FossilDevonCorporation' |
    'FossilOreburghMiningMuseum' |
    'FossilNacreneMuseum' |
    'FossilAmbretteFossilLab' |
    'FossilMasterGalarRoute6' |
    'ScentTrader' |
    'CeruleanCityShardTrader' | //Kanto Shard Traders
    'VermilionCityShardTrader' |
    'LavenderTownShardTrader' |
    'SaffronCityShardTrader' |
    'FuchsiaCityShardTrader' |
    'CinnabarIslandShardTrader' |
    'AzaleaTownShardTrader' | //Johto Shard Traders
    'EcruteakCityShardTrader' |
    'OlivineCityShardTrader' |
    'CianwoodCityShardTrader' |
    'MahoganyTownShardTrader' |
    'BlackthornCityShardTrader' |
    'PetalburgCityShardTrader' | //Hoenn Shard Traders
    'DewfordTownShardTrader' |
    'SlateportCityShardTrader' |
    'MauvilleCityShardTrader' |
    'VerdanturfTownShardTrader' |
    'FallarborTownShardTrader' |
    'LavaridgeTownShardTrader' |
    'FortreeCityShardTrader' |
    'MossdeepCityShardTrader' |
    'PacifidlogTownShardTrader' |
    'SootopolisCityShardTrader' |
    'EverGrandeCityShardTrader' |
    'PokémonHQLabShardTrader' |
    'SantasSecretDaycare' | //Sinnoh Shard Traders
    'OreburghCityShardTrader' |
    'FloaromaTownShardTrader' |
    'EternaCityShardTrader' |
    'HearthomeCityShardTrader' |
    'HallowedTower' |
    'SolaceonTownShardTrader' |
    'PastoriaCityShardTrader' |
    'CelesticTownShardTrader' |
    'PalParkShardTrader' |
    'CanalaveCityShardTrader' |
    'SnowpointCityShardTrader' |
    'SunyshoreCityShardTrader' |
    'SurvivalAreaShardTrader' |
    'ResortAreaShardTrader' |
    'CasteliaCityShardTrader' | //Unova Shard Traders
    'NimbasaCityShardTrader' |
    'DriftveilCityShardTrader' |
    'MistraltonCityShardTrader' |
    'LentimasTownShardTrader' |
    'UndellaTownShardTrader' |
    'LacunosaTownShardTrader' |
    'OpelucidCityShardTrader' |
    'HumilauCityShardTrader' |
    'IcirrusCityShardTrader' |
    'BlackandWhiteParkShardTrader' |
    'NacreneCityShardTrader' |
    'StriatonCityShardTrader' |
    'AccumulaTownShardTrader' |
    'NuvemaTownShardTrader' |
    'CamphrierTownShardTrader' | //Kalos Shard Traders
    'FurfrouShardTrader' |
    'AmbretteTownShardTrader' |
    'CyllageCityShardTrader' |
    'GeosengeTownShardTrader' |
    'ShalourCityShardTrader' |
    'CoumarineCityShardTrader' |
    'LaverreCityShardTrader' |
    'DendemilleTownShardTrader' |
    'AnistarCityShardTrader' |
    'CouriwayTownShardTrader' |
    'SnowbelleCityShardTrader' |
    'HauoliCityShardTrader' | //Alola Shard Traders
    'HeaheaCityShardTrader' |
    'PaniolaTownShardTrader' |
    'KonikoniCityShardTrader' |
    'AetherParadiseShardTrader' |
    'MalieCityShardTrader' |
    'TapuVillageShardTrader' |
    'SeafolkVillageShardTrader' |
    'ExeggutorIslandShardTrader' |
    'AltaroftheSunneandMooneShardTrader' |
    'MotostokeShardTrader' | //Galar Shard Traders
    'TurffieldShardTrader' |
    'HulburyShardTrader' |
    'StowonSideShardTrader' |
    'BallonleaShardTrader' |
    'HammerlockeShardTrader' |
    'CirchesterShardTrader' |
    'SpikemuthShardTrader' |
    'MasterDojoShardTrader' |
    'JubilifeVillageShardTrader'; //Hisui Shard Traders

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
    onTrade?: (tradeTimes: number) => void;
};

export default class GenericDeal {
    private readonly _costs: DealCost[];
    private readonly _profits: DealProfit[];
    private readonly _tradeRequirement?: Requirement;
    private readonly _visibleRequirement?: Requirement;
    private readonly _tradeButtonOverride?: string;
    private readonly _maxTrades?: number;
    private readonly _onTrade?: (tradeTimes: number) => void;

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
            onTrade = undefined,
        } = params;

        this._costs = costs;
        this._profits = profits;
        this._tradeRequirement = tradeRequirement;
        this._visibleRequirement = visibleRequirement;
        this._tradeButtonOverride = tradeButtonOverride;
        this._onTrade = onTrade;
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
                case DealCostOrProfitType.Berry: GameHelper.incrementObservable(App.game.farming.berryInventory[cost.berryType], -1 * cost.amount * tradeTimes); break;
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

        deal._onTrade?.(tradeTimes);
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
                    return Math.floor(App.game.farming.berryInventory[cost.berryType]() / cost.amount);
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
            case DealCostOrProfitType.Berry: return App.game.farming.berryInventory[a.berryType]();
            case DealCostOrProfitType.Item: return player.itemList[a.item.name]();
            case DealCostOrProfitType.Amount: return App.game.wallet.currencies[a.currency.currency]();
            default: return 0;
        }
    }

    public static generateDeals(date: Date) {

        SeededRand.seedWithDate(date);

        GenericDeal.list.CoinChanger = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_copper, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_silver, amount: 1 }],
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_copper, amount: 100 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 1 }],
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_silver, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 1 }],
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_silver, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_copper, amount: 10 }],
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_silver, amount: 10 }],
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_copper, amount: 100 }],
            }),
        ]);

        GenericDeal.list.PirateFence = ko.observableArray(this.generatePirateDeals(date));        

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
        GenericDeal.list.ScentTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Joy_Scent, amount: 12 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Excite_Scent, amount: 1 }],
                tradeButtonOverride: 'Refine',
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Excite_Scent, amount: 12 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Vivid_Scent, amount: 1 }],
                tradeButtonOverride: 'Refine',
            }),
        ]);
        //Kanto Shard Traders
        GenericDeal.list.CeruleanCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.VermilionCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.LavenderTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SaffronCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.FuchsiaCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],
                
            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],
                
            }),
        ]);
        GenericDeal.list.CinnabarIslandShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_stone, amount: 1 }],

            }),
        ]);
        //Johto Shard Traders
        GenericDeal.list.AzaleaTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kings_rock, amount: 1 }],

            }),
        ]);
        GenericDeal.list.EcruteakCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Soothe_bell, amount: 1 }],

            }),
        ]);
        GenericDeal.list.OlivineCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Metal_coat, amount: 1 }],

            }),
        ]);
        GenericDeal.list.CianwoodCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sun_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.MahoganyTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Upgrade, amount: 1 }],

            }),
        ]);
        GenericDeal.list.BlackthornCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_scale, amount: 1 }],

            }),
        ]);
        //Hoenn Shard Traders
        GenericDeal.list.PetalburgCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kings_rock, amount: 1 }],

            }),
        ]);
        GenericDeal.list.DewfordTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SlateportCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],

            }),
        ]);
        GenericDeal.list.MauvilleCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Metal_coat, amount: 1 }],

            }),
        ]);
        GenericDeal.list.VerdanturfTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Soothe_bell, amount: 1 }],

            }),
        ]);
        GenericDeal.list.LavaridgeTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.FallarborTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sun_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.FortreeCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.MossdeepCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Upgrade, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Prism_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.PacifidlogTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_tooth, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SootopolisCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.EverGrandeCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.PokémonHQLabShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kings_rock, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Soothe_bell, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Metal_coat, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sun_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Upgrade, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_scale, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Prism_scale, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_tooth, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_scale, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Shiny_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dusk_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dawn_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_claw, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_fang, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electirizer, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Magmarizer, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Protector, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dubious_disc, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Reaper_cloth, amount: 1 }],

            }),
        ]);
        //Sinnoh Shard Traders
        GenericDeal.list.SantasSecretDaycare = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Meadow_plate, amount: 5 },
                    { type: DealCostOrProfitType.Item, item: ItemList.Pixie_plate, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList['Elf Munchlax'], amount: 1, hidePlayerInventory: true }],
            }),
        ]);
        GenericDeal.list.OreburghCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sun_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.FloaromaTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kings_rock, amount: 1 }],

            }),
        ]);
        GenericDeal.list.EternaCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.HearthomeCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Soothe_bell, amount: 1 }],

            }),
        ]);
        GenericDeal.list.HallowedTower = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Odd_keystone, amount: 1 },
                    { type: DealCostOrProfitType.Amount, currency: new Amount(5000, Currency.diamond), amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Spiritomb, amount: 1, hidePlayerInventory: true }],
                tradeButtonOverride: 'Summon',
            }),
        ]);
        GenericDeal.list.SolaceonTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Shiny_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dusk_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dawn_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.PastoriaCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Prism_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.CelesticTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.PalParkShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_claw, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_fang, amount: 1 }],

            }),
        ]);
        GenericDeal.list.CanalaveCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Metal_coat, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SnowpointCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Upgrade, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SunyshoreCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_tooth, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SurvivalAreaShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electirizer, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Magmarizer, amount: 1 }],

            }),
        ]);
        GenericDeal.list.ResortAreaShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Protector, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dubious_disc, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Reaper_cloth, amount: 1 }],

            }),
        ]);
        //Unova Shard Traders
        GenericDeal.list.CasteliaCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kings_rock, amount: 1 }],

            }),
        ]);
        GenericDeal.list.NimbasaCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Metal_coat, amount: 1 }],

            }),
        ]);
        GenericDeal.list.DriftveilCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_claw, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_fang, amount: 1 }],

            }),
        ]);
        GenericDeal.list.MistraltonCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Upgrade, amount: 1 }],

            }),
        ]);
        GenericDeal.list.LentimasTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
        ]);
        GenericDeal.list.UndellaTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_tooth, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.LacunosaTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
        ]);
        GenericDeal.list.OpelucidCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.HumilauCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Prism_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.IcirrusCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Protector, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dubious_disc, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Reaper_cloth, amount: 1 }],

            }),
        ]);
        GenericDeal.list.BlackandWhiteParkShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sun_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.NacreneCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Soothe_bell, amount: 1 }],

            }),
        ]);
        GenericDeal.list.StriatonCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.AccumulaTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Shiny_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dusk_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dawn_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.NuvemaTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electirizer, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Magmarizer, amount: 1 }],

            }),
        ]);
        //Kalos Shard Traders
        GenericDeal.list.CamphrierTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.FurfrouShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 2500 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 2500 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 2500 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 2500 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 1000 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 1000 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 1000 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 500 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 500 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 500 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 500 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Pink_shard, amount: 250 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList['Furfrou (Star)'], amount: 1, hidePlayerInventory: true }],
            }),
        ]);
        GenericDeal.list.AmbretteTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.CyllageCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Upgrade, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Prism_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.GeosengeTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kings_rock, amount: 1 }],

            }),
        ]);
        GenericDeal.list.ShalourCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Metal_coat, amount: 1 }],

            }),
        ]);
        GenericDeal.list.CoumarineCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electirizer, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Magmarizer, amount: 1 }],

            }),
        ]);
        GenericDeal.list.LaverreCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_tooth, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_scale, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Pink_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sachet, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Pink_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Whipped_dream, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Pink_shard, amount: 1000 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Alakazite, amount: 1 }],

            }),
        ]);
        GenericDeal.list.DendemilleTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Shiny_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dusk_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dawn_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.AnistarCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sun_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_claw, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_fang, amount: 1 }],

            }),
        ]);
        GenericDeal.list.CouriwayTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SnowbelleCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Protector, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dubious_disc, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Reaper_cloth, amount: 1 }],

            }),
        ]);
        //Alola Shard Traders
        GenericDeal.list.HauoliCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Shiny_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dusk_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dawn_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.HeaheaCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kings_rock, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Metal_coat, amount: 1 }],

            }),
        ]);
        GenericDeal.list.PaniolaTownShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
        ]);
        GenericDeal.list.KonikoniCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Soothe_bell, amount: 1 }],

            }),
        ]);
        GenericDeal.list.AetherParadiseShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Upgrade, amount: 1 }],

            }),
        ]);
        GenericDeal.list.MalieCityShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electirizer, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Magmarizer, amount: 1 }],

            }),
        ]);
        GenericDeal.list.TapuVillageShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_claw, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_fang, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Cyan_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Ice_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SeafolkVillageShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_tooth, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_scale, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Prism_scale, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Pink_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sachet, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Pink_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Whipped_dream, amount: 1 }],

            }),
        ]);
        GenericDeal.list.ExeggutorIslandShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_scale, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Protector, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dubious_disc, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Reaper_cloth, amount: 1 }],

            }),
        ]);
        GenericDeal.list.AltaroftheSunneandMooneShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sun_stone, amount: 1 }],

            }),
        ]);
        //Galar Shard Traders
        GenericDeal.list.MotostokeShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Linking_cord, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Magmarizer, amount: 1 }],

            }),
        ]);
        GenericDeal.list.TurffieldShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Rose_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sweet_apple, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Rose_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Tart_apple, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Leaf_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sun_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.HulburyShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Kings_rock, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Prism_scale, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_tooth, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Ochre_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Deepsea_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.StowonSideShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Soothe_bell, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dawn_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dubious_disc, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Reaper_cloth, amount: 1 }],

            }),
        ]);
        GenericDeal.list.BallonleaShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Brown_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Cracked_pot, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Moon_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Shiny_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Pink_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Sachet, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Pink_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Whipped_dream, amount: 1 }],

            }),
        ]);
        GenericDeal.list.HammerlockeShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Grey_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Metal_coat, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Upgrade, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Purple_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_scale, amount: 1 }],

            }),
        ]);
        GenericDeal.list.CirchesterShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_claw, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Lime_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Razor_fang, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Black_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Protector, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Cyan_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Ice_stone, amount: 1 }],

            }),
        ]);
        GenericDeal.list.SpikemuthShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 40 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Thunder_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Crimson_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dusk_stone, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.White_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electirizer, amount: 1 }],

            }),
        ]);
        GenericDeal.list.MasterDojoShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Brown_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Galarica_cuff, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Brown_shard, amount: 30 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Galarica_wreath, amount: 1 }],

            }),
        ]);
        //Hisui Shard Traders TEST
        GenericDeal.list.JubilifeVillageShardTrader = ko.observableArray([
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 10 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fighting_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Electric_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Grass_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Fire_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 20 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Water_egg, amount: 1 }],

            }),
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Shard, shardItem: ItemList.Red_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Yellow_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Green_shard, amount: 5 },
                    { type: DealCostOrProfitType.Shard, shardItem: ItemList.Blue_shard, amount: 5 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Dragon_egg, amount: 1 }],

            }),
        ]);
    }

    public static generatePirateDeals(date: Date) {
        SeededRand.seedWithDate(date);
        
        const list = [];
        list.push(
            new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_copper, amount: 1 }],
                profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Ultraball, amount: 5, hidePlayerInventory: true }],
            }));

        for (let i = 0; i < 2; i++) {
            list.push(new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_silver, amount: 13 + SeededRand.intBetween(-2, 2) }],
                profits: [{ type: DealCostOrProfitType.Item, item: DealHelper.randomEvoItem(), amount: 1 }],
            }));
        }
        list.push(new GenericDeal({
            costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 2 }],
            profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Rare_Candy, amount: 1 }],
        }));

        const typeBoostItems = SeededRand.shuffleArray(
            Object.values(ItemList).filter((i) => i instanceof TypeRestrictedAttackBonusHeldItem),
        ).slice(0, 3);
        typeBoostItems.forEach((item) => {
            list.push(new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_silver, amount: 18 + SeededRand.intBetween(-3, 3) }],
                profits: [{ type: DealCostOrProfitType.Item, item, amount: 1 }],
                visibleRequirement: new MaxRegionRequirement(Region.johto),
            }));
        });

        const pokeballItems = SeededRand.shuffleArray(
            Object.values(ItemList).filter((i) => i.constructor.name === 'PokeballItem' && !['Pokeball', 'Greatball', 'Ultraball', 'Masterball'].includes(i.name)),
        ).slice(0, 2);
        pokeballItems.forEach((item) => {
            list.push(new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 10 }],
                profits: [{ type: DealCostOrProfitType.Item, item, amount: 5, hidePlayerInventory: true }],
                visibleRequirement: new MaxRegionRequirement(Region.sinnoh),
            }));
        });

        list.push(new GenericDeal({
            costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 1 }],
            profits: [{ type: DealCostOrProfitType.Item, item: ItemList['Zorua (Pirate)'], amount: 1, hidePlayerInventory: true }],
            visibleRequirement: new MaxRegionRequirement(Region.unova),
        }));
        list.push(new GenericDeal({
            costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 8 }],
            profits: [{ type: DealCostOrProfitType.Item, item: ItemList.Power_Bracer, amount: 1 }],
            visibleRequirement: new MaxRegionRequirement(Region.alola),
        }));

        const pokemonBoostItem = SeededRand.fromArray(
            Object.values(ItemList).filter((i) => i instanceof PokemonRestrictedAttackBonusHeldItem && (i as PokemonRestrictedAttackBonusHeldItem).regionUnlocked <= player.highestRegion()),
        );
        if (pokemonBoostItem) {
            list.push(new GenericDeal({
                costs: [{ type: DealCostOrProfitType.Item, item: ItemList.Relic_gold, amount: 300 + SeededRand.intBetween(-30, 30) }],
                profits: [
                    { type: DealCostOrProfitType.Item, item: pokemonBoostItem, amount: 1 },
                    { type: DealCostOrProfitType.Item, item: ItemList.Pirate_receipt, amount: 1, hidePlayerInventory: true }],
                visibleRequirement: new MaxRegionRequirement(Region.galar),
                tradeRequirement: new CustomRequirement(player.itemList.Pirate_receipt, 0, 'You already traded for this item today.'),
            }));
        }

        return list;
    }
}
