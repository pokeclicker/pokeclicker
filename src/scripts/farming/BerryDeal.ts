class BerryDeal {
    public berry: BerryType[];
    public item: Item | UndergroundItem;
    public berryAmount: number[];
    public itemAmount: number;

    public static list: KnockoutObservableArray<BerryDeal> = ko.observableArray();

    constructor(berry: BerryType[], berryAmount: number[], item: Item | UndergroundItem, itemAmount: number) {
        this.berry = berry;
        this.berryAmount = berryAmount;
        this.item = item;
        this.itemAmount = itemAmount;
    }

    private static randomBerry(berryList: BerryType[]): BerryType {
        return berryList[Math.floor(berryList.length * SeededRand.next())];
    }

    private static randomAmount(base: number, variance: number): number {
        return Math.max(1, base + Math.floor(variance * (SeededRand.next() - 0.5)));
    }

    private static randomBattleItem(): Item {
        const battleItem = Math.floor(Object.keys(BattleItems.BattleItem).length * SeededRand.next());
        return ItemList[battleItem];
    }

    private static randomEvoItem(): Item {
        const evoItem = Math.floor(Object.keys(EvoItems.EvoItem).length * SeededRand.next());
        return ItemList[evoItem];
    }

    private static randomUndergroundItem(): UndergroundItem {
        return UndergroundItem.list[Math.floor(UndergroundItem.list.length * SeededRand.next())];
    }

    public static generateDeals(date: Date) {
        SeededRand.seedWithDate(date);

        // Removing old deals
        BerryDeal.list.removeAll();

        this.generateJohtoDeals();
        this.generateHoennDeals();
        this.generateSinnohDeals();
    }

    private static generateJohtoDeals() {
        const firstGen = Farming.getGeneration(0);
        const secondGen = Farming.getGeneration(1);
        const thirdGen = Farming.getGeneration(2);

        BerryDeal.list.push(new BerryDeal(
            [
                this.randomBerry(firstGen),
                this.randomBerry(secondGen),
            ],
            [
                this.randomAmount(50, 20),
                this.randomAmount(20, 10),
            ],
            this.randomBattleItem(),
            this.randomAmount(5,2)
        ));

        BerryDeal.list.push(new BerryDeal(
            [
                this.randomBerry(firstGen),
                this.randomBerry(secondGen),
                this.randomBerry(thirdGen),
            ],
            [
                this.randomAmount(100, 30),
                this.randomAmount(50, 20),
                this.randomAmount(20, 10),
            ],
            this.randomEvoItem(),
            this.randomAmount(2,1)
        ));
    }

    private static generateHoennDeals() {
        const thirdGen = Farming.getGeneration(2);
        const fourthGen = Farming.getGeneration(3);

        const temp = [];
        const maxTries = 30;
        let i = 0;
        while (i < maxTries && temp.length < 3) {
            const deal = new BerryDeal(
                [
                    this.randomBerry(thirdGen),
                    this.randomBerry(fourthGen),
                ],
                [
                    this.randomAmount(50, 20),
                    this.randomAmount(20, 10),
                ],
                this.randomUndergroundItem(),
                this.randomAmount(2,1)
            );
            if (temp.every(madeDeal => madeDeal.item.name !== deal.item.name)) {
                temp.push(deal);
            }
            i++;
        }
        BerryDeal.list.push(...temp);
    }

    private static generateSinnohDeals() {
        const firstGen = Farming.getGeneration(0);
        const secondGen = Farming.getGeneration(1);
        const thirdGen = Farming.getGeneration(2);
        const fourthGen = Farming.getGeneration(3);
        const fifthGen = Farming.getGeneration(4);

        BerryDeal.list.push(new BerryDeal(
            [
                this.randomBerry(firstGen),
                this.randomBerry(secondGen),
                this.randomBerry(thirdGen),
                this.randomBerry(fourthGen),
                this.randomBerry(fifthGen),
            ],
            [
                this.randomAmount(400, 100),
                this.randomAmount(100, 30),
                this.randomAmount(50, 20),
                this.randomAmount(20, 10),
                this.randomAmount(7, 3),
            ],
            ItemList['Masterball'],
            1
        ));
    }

    public static canUse(i: number): boolean {
        const deal = BerryDeal.list.peek()[i];
        return deal.berry.every((value, idx) => App.game.farming.berryList[value]() >= deal.berryAmount[idx] );
    }

    public static use(i: number, tradeTimes = 1) {
        const deal = BerryDeal.list.peek()[i];
        if (BerryDeal.canUse(i)) {
            deal.berry.forEach((value, idx) => GameHelper.incrementObservable(App.game.farming.berryList[value], -idx * tradeTimes));
            if (deal.item instanceof UndergroundItem) {
                Underground.gainMineItem(deal.item.id, deal.itemAmount * tradeTimes);
            } else {
                deal.item.gain(deal.itemAmount * tradeTimes);
            }
            GameHelper.incrementObservable(App.game.statistics.undergroundDailyDealTrades);
        }
    }
}
