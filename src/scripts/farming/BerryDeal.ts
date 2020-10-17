class BerryDeal {
    public berry: BerryType[];
    public item: Item;
    public berryAmount: number[];
    public itemAmount: number;

    public static list: KnockoutObservableArray<BerryDeal>[] = Array<KnockoutObservableArray<BerryDeal>>(GameConstants.MAX_AVAILABLE_REGION).fill(ko.observableArray());

    constructor(berry: BerryType[], berryAmount: number[], item: Item, itemAmount: number) {
        this.berry = berry;
        this.berryAmount = berryAmount;
        this.item = item;
        this.itemAmount = itemAmount;
    }

    private static randomBerry(berryList: BerryType[]): BerryType {
        return berryList[Math.floor(berryList.length * SeededRand.next())];
    }

    private static randomAmount(base: number, variance: number): number {
        return Math.max(1, base + Math.floor(variance * (SeededRand.next() - 0.5)));//Math.floor(3 * SeededRand.next()) + 1;
    }

    public static generateDeals(date: Date) {
        SeededRand.seedWithDate(date);

        // Removing old deals
        for (let i = 0;i < 3;i++) {
            BerryDeal.list[i].removeAll();
        }

        this.generateJohtoDeals();
        this.generateHoennDeals();
        this.generateSinnohDeals();

        /*
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
        */
    }

    private static generateJohtoDeals() {

        // Battle Items
        const firstGen = Farming.getGeneration(0);
        const secondGen = Farming.getGeneration(1);
        /*
        BerryDeal.list[GameConstants.Region.johto].push(new BerryDeal(
            [
                this.randomBerry(firstGen),
                this.randomBerry(secondGen),
            ],
            [
                this.randomAmount(50, 20),
                this.randomAmount(20, 10),
            ],
            ItemList['Boost_Mulch'],
            1
        ));
        */
    }

    private static generateHoennDeals() {

    }

    private static generateSinnohDeals() {

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
            GameHelper.incrementObservable(App.game.statistics.undergroundDailyDealTrades);
            Underground.sortMineItems(Underground.lastPropSort, false);
        }
    }
}
