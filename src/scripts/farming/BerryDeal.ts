class BerryDeal {
    public berries: { berryType: BerryType, amount: number}[];
    public item: { itemType: Item | UndergroundItem, amount: number};

    public static list: Record<GameConstants.Region, KnockoutObservableArray<BerryDeal>> = {};

    constructor(berry: BerryType[], berryAmount: number[], item: Item | UndergroundItem, itemAmount: number) {
        this.berries = [];
        berry.forEach((berry, idx) => {
            this.berries.push({berryType: berry, amount: berryAmount[idx]});
        });
        this.item = {itemType: item, amount: itemAmount};
    }

    private static randomBerry(berryList: BerryType[]): BerryType {
        return berryList[Math.floor(berryList.length * SeededRand.next())];
    }

    private static randomBattleItem(): Item {
        const battleItem = SeededRand.fromEnum(BattleItems.BattleItem);
        return ItemList[BattleItems.BattleItem[battleItem]];
    }

    private static randomEvoItem(): Item {
        const evoItem = SeededRand.fromEnum(EvoItems.EvoItem);
        return ItemList[EvoItems.EvoItem[evoItem]];
    }

    private static randomUndergroundItem(): UndergroundItem {
        return SeededRand.fromArray(UndergroundItem.list);
    }

    public static getDeals(region: GameConstants.Region) {
        return BerryDeal.list[region];
    }

    public static generateDeals(date: Date) {
        SeededRand.seedWithDate(date);

        const berryMasterRegions = [GameConstants.Region.johto, GameConstants.Region.hoenn, GameConstants.Region.sinnoh];

        // Removing old deals
        for (const region of berryMasterRegions) {
            if (!BerryDeal.list[region]) {
                BerryDeal.list[region] = ko.observableArray();
            } else {
                BerryDeal.list[region].removeAll();
            }
        }

        BerryDeal.list[GameConstants.Region.johto].push(...this.generateJohtoDeals());
        BerryDeal.list[GameConstants.Region.hoenn].push(...this.generateHoennDeals());
        BerryDeal.list[GameConstants.Region.sinnoh].push(...this.generateSinnohDeals());
    }

    private static generateJohtoDeals() {
        const firstGen = Farming.getGeneration(0);
        const secondGen = Farming.getGeneration(1);
        const thirdGen = Farming.getGeneration(2);

        const list = [];

        list.push(new BerryDeal(
            [
                this.randomBerry(firstGen),
                this.randomBerry(secondGen),
            ],
            [
                SeededRand.intBetween(30, 70),
                SeededRand.intBetween(10, 30),
            ],
            this.randomBattleItem(),
            SeededRand.intBetween(3, 7)
        ));

        list.push(new BerryDeal(
            [
                this.randomBerry(firstGen),
                this.randomBerry(secondGen),
                this.randomBerry(thirdGen),
            ],
            [
                SeededRand.intBetween(70, 130),
                SeededRand.intBetween(30, 70),
                SeededRand.intBetween(10, 30),
            ],
            this.randomEvoItem(),
            SeededRand.intBetween(1, 3)
        ));

        return list;
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
                    SeededRand.intBetween(30, 70),
                    SeededRand.intBetween(10, 30),
                ],
                this.randomUndergroundItem(),
                SeededRand.intBetween(1, 3)
            );
            if (temp.every(madeDeal => madeDeal.item.name !== deal.item.itemType.name)) {
                temp.push(deal);
            }
            i++;
        }
        return temp;
    }

    private static generateSinnohDeals() {
        const firstGen = Farming.getGeneration(0);
        const secondGen = Farming.getGeneration(1);
        const thirdGen = Farming.getGeneration(2);
        const fourthGen = Farming.getGeneration(3);
        const fifthGen = Farming.getGeneration(4);

        const list = [];

        list.push(new BerryDeal(
            [
                this.randomBerry(firstGen),
                this.randomBerry(secondGen),
                this.randomBerry(thirdGen),
                this.randomBerry(fourthGen),
                this.randomBerry(fifthGen),
            ],
            [
                SeededRand.intBetween(300, 500),
                SeededRand.intBetween(70, 130),
                SeededRand.intBetween(30, 70),
                SeededRand.intBetween(10, 30),
                SeededRand.intBetween(4, 11),
            ],
            ItemList['Masterball'],
            1
        ));

        return list;
    }

    public static canUse(region: GameConstants.Region, i: number): boolean {
        const deal = BerryDeal.list[region].peek()[i];
        return deal.berries.every((value) => App.game.farming.berryList[value.berryType]() >= value.amount );
    }

    public static use(region: GameConstants.Region, i: number, tradeTimes = 1) {
        const deal = BerryDeal.list[region].peek()[i];
        if (BerryDeal.canUse(region, i)) {
            const trades = deal.berries.map(berry => {
                const amt = App.game.farming.berryList[berry.berryType]();
                const maxTrades = Math.floor(amt / berry.amount);
                return maxTrades;
            });
            const maxTrades = trades.reduce((a,b) => Math.min(a,b), tradeTimes);
            deal.berries.forEach((value) => GameHelper.incrementObservable(App.game.farming.berryList[value.berryType], -value.amount * maxTrades));
            if (deal.item.itemType instanceof UndergroundItem) {
                Underground.gainMineItem(deal.item.itemType.id, deal.item.amount * maxTrades);
            } else {
                deal.item.itemType.gain(deal.item.amount * maxTrades);
            }
            GameHelper.incrementObservable(App.game.statistics.berryDailyDealTrades);
        }
    }
}
