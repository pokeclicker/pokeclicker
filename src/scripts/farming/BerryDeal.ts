class BerryDeal {
    public berries: { berryType: BerryType, amount: number}[];
    public item: { itemType: Item, amount: number};

    public static list: Record<GameConstants.BerryTraderLocations, KnockoutObservableArray<BerryDeal>> = {};

    constructor(berry: BerryType[], berryAmount: number[], item: Item, itemAmount: number) {
        this.berries = [];
        berry.forEach((berry, idx) => {
            this.berries.push({berryType: berry, amount: berryAmount[idx]});
        });
        this.item = {itemType: item, amount: itemAmount};
    }

    public static getDeals(town: GameConstants.BerryTraderLocations) {
        return BerryDeal.list[town];
    }

    private static randomBerry(berryList: BerryType[]): BerryType {
        return SeededRand.fromArray(berryList);
    }

    private static randomBattleItem(): Item {
        const battleItem = SeededRand.fromArray(GameHelper.enumStrings(GameConstants.BattleItemType));
        return ItemList[battleItem];
    }

    private static randomEvoItem(): Item {
        const evoItem = SeededRand.fromArray(GameHelper.enumStrings(GameConstants.StoneType).filter(name => !(['None', 'Black_DNA', 'White_DNA', 'Solar_light', 'Key_stone', 'Lunar_light', 'Pure_light', 'Black_mane_hair', 'White_mane_hair']).includes(name)));
        return ItemList[evoItem];
    }

    private static randomUndergroundItem(): Item {
        return ItemList[SeededRand.fromArray(UndergroundItems.list.filter(item => item.valueType !== UndergroundItemValueType.MegaStone)).itemName];
    }

    private static randomPokeballDeal(): BerryDeal {
        const firstGen = Farming.getGeneration(0);
        const secondGen = Farming.getGeneration(1);
        const thirdGen = Farming.getGeneration(2);

        return SeededRand.fromArray([
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                ],
                ItemList.Fastball,
                1
            ),
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                ],
                ItemList.Quickball,
                1
            ),
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                ],
                ItemList.Timerball,
                1
            ),
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                ],
                ItemList.Duskball,
                1
            ),
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                    this.randomBerry(thirdGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                    SeededRand.intBetween(5, 10),
                ],
                ItemList.Luxuryball,
                1
            ),
        ]);
    }

    public static generateDeals(date: Date) {
        SeededRand.seedWithDate(date);

        const berryMasterTowns = [GameConstants.BerryTraderLocations['Goldenrod City'], GameConstants.BerryTraderLocations['Mauville City'], GameConstants.BerryTraderLocations['Hearthome City'], GameConstants.BerryTraderLocations['Pinkan Pokémon Reserve'], GameConstants.BerryTraderLocations['Secret Berry Shop'], GameConstants.BerryTraderLocations['Driftveil City']];

        // Removing old deals
        for (const town of berryMasterTowns) {
            if (!BerryDeal.list[town]) {
                BerryDeal.list[town] = ko.observableArray();
            } else {
                BerryDeal.list[town].removeAll();
            }
        }
        BerryDeal.list[GameConstants.BerryTraderLocations['Goldenrod City']].push(...this.generateGoldenrodDeals());
        BerryDeal.list[GameConstants.BerryTraderLocations['Mauville City']].push(...this.generateMauvilleDeals());
        BerryDeal.list[GameConstants.BerryTraderLocations['Pinkan Pokémon Reserve']].push(...this.generatePinkanDeals());
        BerryDeal.list[GameConstants.BerryTraderLocations['Hearthome City']].push(...this.generateHearthomeDeals());
        BerryDeal.list[GameConstants.BerryTraderLocations['Secret Berry Shop']].push(...this.generateSecretBerryShopDeals());
        BerryDeal.list[GameConstants.BerryTraderLocations['Driftveil City']].push(...this.generateDriftveilDeals());
    }

    private static generateGoldenrodDeals() {
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

        list.push(this.randomPokeballDeal());

        return list;
    }

    private static generateMauvilleDeals() {
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

    private static generateHearthomeDeals() {
        const firstGen = Farming.getGeneration(0);
        const secondGen = Farming.getGeneration(1);
        const thirdGen = Farming.getGeneration(2);
        const fourthGen = Farming.getGeneration(3);
        const fifthGen = [ // only use berries that can grow in under a day so players have time to grow them
            BerryType.Micle,
            BerryType.Custap,
            BerryType.Jaboca,
            BerryType.Rowap,
            BerryType.Kee,
            BerryType.Maranga,
        ];

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
                SeededRand.intBetween(500, 1000),
                SeededRand.intBetween(200, 500),
                SeededRand.intBetween(100, 200),
                SeededRand.intBetween(50, 100),
                SeededRand.intBetween(10, 50),
            ],
            ItemList.Masterball,
            1
        ));

        list.push(new BerryDeal(
            [this.randomBerry(fourthGen)],
            [SeededRand.intBetween(50, 100)],
            ItemList.Protein,
            1
        ));

        list.push(new BerryDeal(
            [this.randomBerry(fifthGen)],
            [SeededRand.intBetween(10, 50)],
            ItemList.Calcium,
            1
        ));

        return [SeededRand.fromArray(list)];
    }

    private static generatePinkanDeals() {
        const list = [];
        list.push(new BerryDeal(
            [BerryType.Pinkan],
            [SeededRand.intBetween(40, 60)],
            ItemList['Pinkan Arbok'],
            1
        ));
        list.push(new BerryDeal(
            [BerryType.Pinkan],
            [SeededRand.intBetween(20, 40)],
            ItemList['Pinkan Oddish'],
            1
        ));
        list.push(new BerryDeal(
            [BerryType.Pinkan],
            [SeededRand.intBetween(40, 60)],
            ItemList['Pinkan Poliwhirl'],
            1
        ));
        list.push(new BerryDeal(
            [BerryType.Pinkan],
            [SeededRand.intBetween(20, 40)],
            ItemList['Pinkan Geodude'],
            1
        ));
        list.push(new BerryDeal(
            [BerryType.Pinkan],
            [SeededRand.intBetween(80, 100)],
            ItemList['Pinkan Weezing'],
            1
        ));
        list.push(new BerryDeal(
            [BerryType.Pinkan],
            [SeededRand.intBetween(80, 100)],
            ItemList['Pinkan Scyther'],
            1
        ));
        list.push(new BerryDeal(
            [BerryType.Pinkan],
            [SeededRand.intBetween(80, 100)],
            ItemList['Pinkan Electabuzz'],
            1
        ));

        return list;
    }

    private static generateSecretBerryShopDeals() {
        const list = [];
        list.push(new BerryDeal(
            [BerryType.Snover],
            [SeededRand.intBetween(80, 100)],
            ItemList['Grotle (Acorn)'],
            1
        ));

        return list;
    }

    private static generateDriftveilDeals() {
        const firstGen = Farming.getGeneration(0);
        const secondGen = Farming.getGeneration(1);
        const thirdGen = Farming.getGeneration(2);
        const fourthGen = Farming.getGeneration(3);
        const fifthGen = [ // only use berries that can grow in under a day so players have time to grow them
            BerryType.Micle,
            BerryType.Custap,
            BerryType.Jaboca,
            BerryType.Rowap,
            BerryType.Kee,
            BerryType.Maranga,
        ];

        const pokeballList = [
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                    this.randomBerry(thirdGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                    SeededRand.intBetween(5, 10),
                ],
                ItemList.Diveball,
                1
            ),
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                    this.randomBerry(thirdGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                    SeededRand.intBetween(5, 10),
                ],
                ItemList.Lureball,
                1
            ),
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                    this.randomBerry(thirdGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                    SeededRand.intBetween(5, 10),
                ],
                ItemList.Nestball,
                1
            ),
            new BerryDeal(
                [
                    this.randomBerry(firstGen),
                    this.randomBerry(secondGen),
                    this.randomBerry(thirdGen),
                ],
                [
                    SeededRand.intBetween(20, 40),
                    SeededRand.intBetween(5, 15),
                    SeededRand.intBetween(5, 10),
                ],
                ItemList.Repeatball,
                1
            ),
        ];

        const vitaminList = [
            new BerryDeal(
                [this.randomBerry(fourthGen)],
                [SeededRand.intBetween(50, 100)],
                ItemList.Protein,
                1
            ),
            new BerryDeal(
                [this.randomBerry(fifthGen)],
                [SeededRand.intBetween(10, 50)],
                ItemList.Calcium,
                1
            ),
            new BerryDeal(
                [this.randomBerry(fifthGen)],
                [SeededRand.intBetween(10, 50)],
                ItemList.Carbos,
                1
            ),
        ];

        return [
            SeededRand.fromArray(pokeballList),
            SeededRand.fromArray(vitaminList),
        ];
    }

    public static canUse(town: GameConstants.BerryTraderLocations, i: number): boolean {
        const deal = BerryDeal.list[town]?.peek()[i];
        if (!deal) {
            return false;
        } else {
            return deal.berries.every((value) => App.game.farming.berryList[value.berryType]() >= value.amount);
        }
    }

    public static use(town: GameConstants.BerryTraderLocations, i: number, tradeTimes = 1) {
        const deal = BerryDeal.list[town]?.peek()[i];
        if (BerryDeal.canUse(town, i)) {
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

            const amount = deal.item.amount * maxTrades;
            Notifier.notify({
                message: `You traded for ${amount.toLocaleString('en-US')} × <img src="${deal.item.itemType.image}" height="24px"/> ${GameConstants.pluralizeString(GameConstants.humanifyString(deal.item.itemType.displayName), amount)}.`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.item_bought,
            });
        }
    }
}
