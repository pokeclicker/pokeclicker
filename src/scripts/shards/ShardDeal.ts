class ShardDeal {
    public shards: { shardType: ShardType, amount: number}[];
    public item: { itemType: Item, amount: number};

    public static list: Record<GameConstants.Region, KnockoutObservableArray<ShardDeal>> = {};

    constructor(shard: ShardType[], shardAmount: number[], item: Item, itemAmount: number) {
        this.shards = [];
        shard.forEach((shard, idx) => {
            this.shards.push({shardType: shard, amount: shardAmount[idx]});
        });
        this.item = {itemType: item, amount: itemAmount};
    }

    public static generateDeals() {
        const shardMasterRegions = [GameConstants.Region.hoenn];

        for (const region of shardMasterRegions) {
            if (!ShardDeal.list[region]) {
                ShardDeal.list[region] = ko.observableArray();
            } else {
                ShardDeal.list[region].removeAll();
            }
        }

        ShardDeal.list[GameConstants.Region.hoenn].push(...this.generateFluteDeals());
    }

    private static generateFluteDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                ShardType['Fighting'],
                ShardType['Fire'],
                ShardType['Poison'],
            ],
            [
                1000,
                1000,
                1000,
            ],
            ItemList['Red_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                ShardType['Normal'],
                ShardType['Bug'],
                ShardType['Rock'],
            ],
            [
                1000,
                1000,
                1000,
            ],
            ItemList['White_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                ShardType['Normal'],
                ShardType['Flying'],
                ShardType['Poison'],
            ],
            [
                1000,
                1000,
                1000,
            ],
            ItemList['Black_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                ShardType['Dark'],
                ShardType['Electric'],
                ShardType['Steel'],
            ],
            [
                1000,
                1000,
                1000,
            ],
            ItemList['Yellow_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                ShardType['Dark'],
                ShardType['Ghost'],
                ShardType['Ice'],
            ],
            [
                1000,
                1000,
                1000,
            ],
            ItemList['Blue_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                ShardType['Fighting'],
                ShardType['Ice'],
                ShardType['Fairy'],
            ],
            [
                1000,
                1000,
                1000,
            ],
            ItemList['Poke_Flute'],
            1
        ));
        return list;
    }

    public static getDeals(region: GameConstants.Region) {
        return ShardDeal.list[region];
    }

    public static canUse(region: GameConstants.Region, i: number): boolean {
        const deal = ShardDeal.list[region].peek()[i];
        if (player.itemList[deal.item.itemType.name]() > 0 || fluteEffectRunner.isActive(GameConstants.FluteItemType[deal.item.itemType.name])()) {
            return false;
        } else {
            return deal.shards.every((value) => App.game.shards.shardWallet[value.shardType]() >= value.amount);
        }
    }

    public static use(region: GameConstants.Region, i: number, tradeTimes = 1) {
        const deal = ShardDeal.list[region].peek()[i];
        if (ShardDeal.canUse(region, i)) {
            const trades = deal.shards.map(shard => {
                const amt = App.game.shards.shardWallet[shard.shardType]();
                const maxTrades = Math.floor(amt / shard.amount);
                return maxTrades;
            });
            const maxTrades = trades.reduce((a,b) => Math.min(a,b), tradeTimes);
            deal.shards.forEach((value) =>
                GameHelper.incrementObservable(App.game.shards.shardWallet[value.shardType], -value.amount * maxTrades));
            deal.item.itemType.gain(deal.item.amount * maxTrades);
        }
    }

    public static isFluteDeal(region: GameConstants.Region, i: number): boolean {
        const deal = ShardDeal.list[region].peek()[i];
        return deal.item.itemType instanceof FluteItem;
    }
}
