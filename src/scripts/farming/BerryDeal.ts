class BerryDeal {
    public berries: { berryType: BerryType, amount: number}[];
    public item: { itemType: Item | UndergroundItem, amount: number};

    public static list: KnockoutObservableArray<BerryDeal> = ko.observableArray();

    constructor(berry: BerryType[], berryAmount: number[], item: Item | UndergroundItem, itemAmount: number) {
        this.berries = [];
        berry.forEach((berry, idx) => {
            this.berries.push({berryType: berry, amount: berryAmount[idx]});
        }, this);
        this.item = {itemType: item, amount: itemAmount};
    }

    private static randomBerry(berryList: BerryType[]): BerryType {
        return berryList[Math.floor(berryList.length * SeededRand.next())];
    }

    private static randomAmount(base: number, variance: number): number {
        return Math.max(1, base + Math.floor(variance * (SeededRand.next() - 0.5)));
    }

    private static randomBattleItem(): Item {
        const battleItem = Math.floor(Object.keys(BattleItems.BattleItem).length / 2 * SeededRand.next());
        return ItemList[BattleItems.BattleItem[battleItem]];
    }

    private static randomEvoItem(): Item {
        const evoItem = Math.floor(Object.keys(EvoItems.EvoItem).length / 2 * SeededRand.next());
        return ItemList[EvoItems.EvoItem[evoItem]];
    }

    private static randomUndergroundItem(): UndergroundItem {
        return UndergroundItem.list[Math.floor(UndergroundItem.list.length * SeededRand.next())];
    }

    public static getDeals(region: GameConstants.Region) {
        switch (region) {
            case GameConstants.Region.johto:
                return BerryDeal.list.slice(0,2);
            case GameConstants.Region.hoenn:
                return BerryDeal.list.slice(2,5);
            case GameConstants.Region.sinnoh:
                return BerryDeal.list.slice(5);
        }
        return [];
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
            if (temp.every(madeDeal => madeDeal.item.name !== deal.item.itemType.name)) {
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
        return deal.berries.every((value) => App.game.farming.berryList[value.berryType]() >= value.amount );
    }

    public static use(i: number, tradeTimes = 1) {
        const deal = BerryDeal.list.peek()[i];
        if (BerryDeal.canUse(i)) {
            deal.berries.forEach((value) => GameHelper.incrementObservable(App.game.farming.berryList[value.berryType], -value.amount * tradeTimes));
            if (deal.item.itemType instanceof UndergroundItem) {
                Underground.gainMineItem(deal.item.itemType.id, deal.item.amount * tradeTimes);
            } else {
                deal.item.itemType.gain(deal.item.amount * tradeTimes);
            }
            GameHelper.incrementObservable(App.game.statistics.undergroundDailyDealTrades);
        }
    }
}
