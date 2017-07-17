class DailyDeal {
    public item1: UndergroundItem;
    public item2: UndergroundItem;
    public amount1: number;
    public amount2: number;

    public static list: Array<DailyDeal> = [];

    constructor() {
        this.item1 = DailyDeal.randomItem();
        this.amount1 = DailyDeal.randomAmount();
        this.item2 = DailyDeal.randomItem();
        this.amount2 = DailyDeal.randomAmount();
    }

    private static randomItem(): UndergroundItem {
        return UndergroundItem.list[ Math.floor(UndergroundItem.list.length * SeededRand.next()) ];
    }

    private static randomAmount(): number {
        return Math.floor(3 * SeededRand.next()) + 1;
    }

    public static generateDeals(maxDeals: number, date: Date) {
        SeededRand.seedWithDate(date);
        
        for (let i=0; i<maxDeals; i++) {
            let deal = new DailyDeal();
            if (deal.isValid()) {
                DailyDeal.list.push(deal);
            }
        }
    }

    private isValid(): boolean {
        return ( (this.item1.name !== this.item2.name) && !DailyDeal.reverseDealExists(this.item1.name, this.item2.name) && !this.item1.isStone() )
    }

    private static reverseDealExists(name1: string, name2: string): boolean {
        for (let deal of DailyDeal.list) {
            if (deal.item2.name == name1) {
                if (deal.item1.name == name2) {
                    return true;
                } else {
                    return DailyDeal.reverseDealExists(deal.item1.name, name2);
                }
            }
        }
        return false;
    }

    public static canUse(index) {
        let deal = DailyDeal.list[index];
        let index = player.mineInventoryIndex(deal.item1.id)
        if (index > -1) {
            return player._mineInventory()[index].amount >= deal.amount1;
        } else {
            return false
        }
    }

    public static use(index) {
        console.log(DailyDeal.list[index]);
    }
}