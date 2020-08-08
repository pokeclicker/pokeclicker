class DailyDeal {
    public item1: UndergroundItem;
    public item2: UndergroundItem;
    public amount1: number;
    public amount2: number;

    public static list: KnockoutObservableArray<DailyDeal> = ko.observableArray();

    constructor() {
        this.item1 = DailyDeal.randomItem();
        this.amount1 = DailyDeal.randomAmount();
        this.item2 = DailyDeal.randomItem();
        this.amount2 = DailyDeal.randomAmount();
    }

    private static randomItem(): UndergroundItem {
        return UndergroundItem.list[Math.floor(UndergroundItem.list.length * SeededRand.next())];
    }

    private static randomAmount(): number {
        return Math.floor(3 * SeededRand.next()) + 1;
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

    private isValid(dealList: Array<DailyDeal>): boolean {
        return ( (this.item1.name !== this.item2.name) && !DailyDeal.reverseDealExists(this.item1.name, this.item2.name, dealList) && !this.item1.isStone() );
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
        const index = player.mineInventoryIndex(deal.item1.id);
        if (index > -1) {
            return player.mineInventory[index].amount() >= deal.amount1;
        } else {
            return false;
        }
    }

    public static use(i: number, tradeTimes = 1) {
        const deal = DailyDeal.list.peek()[i];
        const item1Index = player.mineInventoryIndex(deal.item1.id);
        if (DailyDeal.canUse(i)) {
            const amt = player.mineInventory[item1Index].amount();
            const maxTrades = Math.floor(amt / deal.amount1);
            tradeTimes = Math.min(tradeTimes, maxTrades);
            player.mineInventory[item1Index].amount(amt - (deal.amount1 * tradeTimes));
            Underground.gainMineItem(deal.item2.id, deal.amount2 * tradeTimes);
            //player._statistics.dailyDealsUsed(player._statistics.dailyDealsUsed()+1);
        }
    }
}
