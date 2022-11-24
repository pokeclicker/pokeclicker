import {
    ObservableArray as KnockoutObservableArray,
} from 'knockout';
import BadgeEnums from '../enums/Badges';
import PokemonType from '../enums/PokemonType';
import { Region } from '../GameConstants';
import GameHelper from '../GameHelper';
import FluteItem from '../items/FluteItem';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';

export type GemCost = {
    gemType: PokemonType,
    amount: number,
};

export default class GemDeal {
    public static list: Record<Region, KnockoutObservableArray<GemDeal>> = {
        '-1': undefined,
        0: undefined,
        1: undefined,
        2: undefined,
        3: undefined,
        4: undefined,
        5: undefined,
        6: undefined,
        7: undefined,
        8: undefined,
    };

    public gems: GemCost[];
    public item: { itemType: Item, amount: number};

    constructor(gemCosts: GemCost[], item: Item, itemAmount: number) {
        this.gems = gemCosts;
        this.item = { itemType: item, amount: itemAmount };
    }

    public static generateDeals() {
        const gemMasterRegions = [Region.hoenn, Region.unova, Region.kalos];

        gemMasterRegions.forEach((region) => {
            if (!GemDeal.list[region]) {
                GemDeal.list[region] = ko.observableArray();
            } else {
                GemDeal.list[region].removeAll();
            }
        });

        GemDeal.list[Region.hoenn].push(...this.generateHoennFluteDeals());
        GemDeal.list[Region.unova].push(...this.generateUnovaFluteDeals());
        GemDeal.list[Region.kalos].push(...this.generateFurfrouDeal());
    }

    public static getDeals(region: Region) {
        return GemDeal.list[region];
    }

    public static canUse(region: Region, i: number): boolean {
        const deal = GemDeal.list[region].peek()[i];
        if (ItemList[deal.item.itemType.name].isSoldOut()) {
            return false;
        }

        return deal.gems.every((value) => App.game.gems.gemWallet[value.gemType]() >= value.amount);
    }

    public static use(region: Region, i: number, tradeTimes = 1): boolean {
        const deal = GemDeal.list[region].peek()[i];
        if (!App.game.badgeCase.hasBadge(BadgeEnums.Heat)) {
            Notifier.notify({
                message: 'You are unable to use Flutes yet.\n<i>Visit the Gym in Lavaridge Town.</i>',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (GemDeal.canUse(region, i)) {
            const trades = deal.gems.map((gem) => {
                const amt = App.game.gems.gemWallet[gem.gemType]();
                const maxTrades = Math.floor(amt / gem.amount);
                return maxTrades;
            });
            const maxTrades = trades.reduce((a, b) => Math.min(a, b), tradeTimes);
            deal.gems.forEach((value) => {
                GameHelper.incrementObservable(App.game.gems.gemWallet[value.gemType], -value.amount * maxTrades);
            });
            deal.item.itemType.gain(deal.item.amount * maxTrades);
            return true;
        }
        return false;
    }

    public static isFluteDeal(region: Region, i: number): boolean {
        const deal = GemDeal.list[region].peek()[i];
        return deal.item.itemType instanceof FluteItem;
    }

    private static generateHoennFluteDeals() {
        const list = [];

        list.push(new GemDeal(
            [
                { gemType: PokemonType.Grass, amount: 5000 },
                { gemType: PokemonType.Flying, amount: 5000 },
                { gemType: PokemonType.Electric, amount: 5000 },
            ],
            ItemList.Yellow_Flute,
            1,
        ));
        list.push(new GemDeal(
            [
                { gemType: PokemonType.Ground, amount: 5000 },
                { gemType: PokemonType.Poison, amount: 5000 },
                { gemType: PokemonType.Steel, amount: 5000 },
            ],
            ItemList.Time_Flute,
            1,
        ));
        list.push(new GemDeal(
            [
                { gemType: PokemonType.Dark, amount: 5000 },
                { gemType: PokemonType.Psychic, amount: 5000 },
                { gemType: PokemonType.Fighting, amount: 5000 },
            ],
            ItemList.Black_Flute,
            1,
        ));
        return list;
    }

    private static generateUnovaFluteDeals() {
        const list = [];

        list.push(new GemDeal(
            [
                { gemType: PokemonType.Fire, amount: 10000 },
                { gemType: PokemonType.Rock, amount: 10000 },
                { gemType: PokemonType.Dragon, amount: 10000 },
            ],
            ItemList.Red_Flute,
            1,
        ));
        list.push(new GemDeal(
            [
                { gemType: PokemonType.Normal, amount: 10000 },
                { gemType: PokemonType.Fairy, amount: 10000 },
                { gemType: PokemonType.Ice, amount: 10000 },
            ],
            ItemList.White_Flute,
            1,
        ));
        list.push(new GemDeal(
            [
                { gemType: PokemonType.Water, amount: 10000 },
                { gemType: PokemonType.Bug, amount: 10000 },
                { gemType: PokemonType.Ghost, amount: 10000 },
            ],
            ItemList.Blue_Flute,
            1,
        ));
        return list;
    }

    private static generateFurfrouDeal() {
        const list = [];

        list.push(new GemDeal(
            [
                { gemType: PokemonType.Normal, amount: 1000000 },
                { gemType: PokemonType.Water, amount: 1000000 },
                { gemType: PokemonType.Grass, amount: 500000 },
                { gemType: PokemonType.Fighting, amount: 500000 },
                { gemType: PokemonType.Poison, amount: 500000 },
                { gemType: PokemonType.Ground, amount: 500000 },
                { gemType: PokemonType.Flying, amount: 500000 },
                { gemType: PokemonType.Bug, amount: 500000 },
                { gemType: PokemonType.Rock, amount: 500000 },
                { gemType: PokemonType.Fire, amount: 250000 },
                { gemType: PokemonType.Electric, amount: 250000 },
                { gemType: PokemonType.Ice, amount: 250000 },
                { gemType: PokemonType.Ghost, amount: 250000 },
                { gemType: PokemonType.Steel, amount: 250000 },
                { gemType: PokemonType.Psychic, amount: 250000 },
                { gemType: PokemonType.Dragon, amount: 100000 },
                { gemType: PokemonType.Dark, amount: 100000 },
                { gemType: PokemonType.Fairy, amount: 100000 },
            ],
            ItemList['Furfrou (La Reine)'],
            1,
        ));
        return list;
    }
}
