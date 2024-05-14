import { ObservableArray } from 'knockout';
import SeededRand from '../utilities/SeededRand';
import GameHelper from '../GameHelper';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import { Underground } from './Underground';
import UndergroundItem from './UndergroundItem';
import UndergroundItems from './UndergroundItems';

export class DailyDeal {
    public item1: UndergroundItem;
    public item2: UndergroundItem;
    public amount1: number;
    public amount2: number;

    public static list: ObservableArray<DailyDeal> = ko.observableArray();

    constructor() {
        this.item1 = DailyDeal.randomItem();
        this.amount1 = 1;
        this.item2 = DailyDeal.randomItem();
        this.amount2 = 1;
    }

    public static generateDeals(maxDeals: number, date: Date) {
        SeededRand.seedWithDate(date);

        DailyDeal.list.removeAll();
        const temp = [];
        const maxTries = maxDeals * 10;
        let i = 0;
        while (i < maxTries && temp.length < maxDeals) {
            const deal = new DailyDeal();
            if (deal.isValid(temp)) {
                temp.push(deal);
            }
            i++;
        }
        DailyDeal.list.push(...temp);
    }

    private static randomItem(): UndergroundItem {
        // Exclude mega stones from daily deals
        return SeededRand.fromArray(UndergroundItems.list.filter(item => item.valueType !== UndergroundItemValueType.MegaStone));
    }

    private isValid(dealList: Array<DailyDeal>): boolean {
        const item1Name = this.item1.name;
        const item2Name = this.item2.name;

        if (item1Name == item2Name) {
            return false;
        }

        // Left side item cannot be Evolution Item or Shard
        if (
            this.item1.valueType == UndergroundItemValueType.EvolutionItem
            || this.item1.valueType == UndergroundItemValueType.Shard
        ) {
            return false;
        }

        if (DailyDeal.sameDealExists(item1Name, item2Name, dealList)) {
            return false;
        }

        if (DailyDeal.reverseDealExists(item1Name, item2Name, dealList)) {
            return false;
        }

        return true;
    }

    private static sameDealExists(name1: string, name2: string, dealList: Array<DailyDeal>): boolean {
        for (const deal of dealList) {
            if (deal.item1.name == name1 && deal.item2.name == name2) {
                return true;
            }
        }
        return false;
    }

    private static reverseDealExists(name1: string, name2: string, dealList: Array<DailyDeal>): boolean {
        for (const deal of dealList) {
            if (deal.item2.name == name1) {
                if (deal.item1.name == name2) {
                    return true;
                } else {
                    return DailyDeal.reverseDealExists(deal.item1.name, name2, dealList);
                }
            }
        }
        return false;
    }

    public static canUse(i: number): boolean {
        const deal = DailyDeal.list.peek()[i];
        const amount = player.itemList[deal.item1.itemName]();
        return amount >= deal.amount1;
    }

    public static use(i: number, tradeTimes = 1) {
        const deal = DailyDeal.list.peek()[i];
        if (DailyDeal.canUse(i)) {
            const amt = player.itemList[deal.item1.itemName]();
            const maxTrades = Math.floor(amt / deal.amount1);
            tradeTimes = Math.min(tradeTimes, maxTrades);
            player.loseItem(deal.item1.itemName, deal.amount1 * tradeTimes);
            Underground.gainMineItem(deal.item2.id, deal.amount2 * tradeTimes);
            GameHelper.incrementObservable(App.game.statistics.undergroundDailyDealTrades, tradeTimes);
        }
    }
}
