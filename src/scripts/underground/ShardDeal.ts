type ShardCost = {
    shardType: UndergroundItem,
    amount: number,
}

class ShardDeal {
    public shards: ShardCost[];
    public item: { itemType: Item, amount: number};
    public questPointCost: number;
    public static list: Record<GameConstants.ShardTraderLocations, KnockoutObservableArray<ShardDeal>> = {};

    constructor(shardCosts: ShardCost[], item: Item, itemAmount: number) {
        this.shards = shardCosts;
        this.item = {itemType: item, amount: itemAmount};
        this.questPointCost = this.item.itemType.basePrice / 4 || 1;
    }

    public static generateDeals() {
        const shardMasterTowns = [
            GameConstants.ShardTraderLocations['Cerulean City'],
            GameConstants.ShardTraderLocations['Vermilion City'],
            GameConstants.ShardTraderLocations['Lavender Town'],
            GameConstants.ShardTraderLocations['Saffron City'],
            GameConstants.ShardTraderLocations['Fuchsia City'],
            GameConstants.ShardTraderLocations['Cinnabar Island'],
        ];

        for (const town of shardMasterTowns) {
            if (!ShardDeal.list[town]) {
                ShardDeal.list[town] = ko.observableArray();
            } else {
                ShardDeal.list[town].removeAll();
            }
        }

        ShardDeal.list[GameConstants.ShardTraderLocations['Cerulean City']].push(...this.generateCeruleanShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Vermilion City']].push(...this.generateVermilionShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Lavender Town']].push(...this.generateLavenderShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Saffron City']].push(...this.generateSaffronShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Fuchsia City']].push(...this.generateFuchsiaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Cinnabar Island']].push(...this.generateCinnabarShardDeals());
        //ShardDeal.list[GameConstants.Region.johto].push(...this.generateJohtoShardDeals());
        //ShardDeal.list[GameConstants.Region.hoenn].push(...this.generateHoennShardDeals());
        //ShardDeal.list[GameConstants.Region.sinnoh].push(...this.generateSinnohShardDeals());
        //ShardDeal.list[GameConstants.Region.kalos].push(...this.generateKalosShardDeals());
    }

    private static generateCeruleanShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_egg'],
            1
        ));
        return list;
    }

    private static generateVermilionShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Thunder_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Electric_egg'],
            1
        ));
        return list;
    }

    private static generateLavenderShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Grass_egg'],
            1
        ));
        return list;
    }

    private static generateSaffronShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
            ],
            ItemList['Moon_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Leaf_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
            ],
            ItemList['Fighting_egg'],
            1
        ));
        return list;
    }

    private static generateFuchsiaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
            ],
            ItemList['Trade_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 25},
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 25},
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 25},
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 25},
            ],
            ItemList['Dragon_egg'],
            1
        ));
        return list;
    }

    private static generateCinnabarShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_egg'],
            1
        ));
        return list;
    }


    public static getDeals(town: GameConstants.ShardTraderLocations) {
        return ShardDeal.list[GameConstants.ShardTraderLocations[town]];
    }

    public static canUse(town: GameConstants.ShardTraderLocations, i: number): boolean {
        const deal = ShardDeal.list[GameConstants.ShardTraderLocations[town]].peek()[i];
        if (ItemList[deal.item.itemType.name].isSoldOut()) {
            return false;
        } else if (deal.questPointCost > App.game.wallet.currencies[GameConstants.Currency.questPoint]()) {
            return false;
        } else {
            return deal.shards.every((value) => player.getUndergroundItemAmount(value.shardType.id) >= value.amount);
        }
    }

    public static use(town: GameConstants.ShardTraderLocations, i: number, tradeTimes = 1) {
        const deal = ShardDeal.list[GameConstants.ShardTraderLocations[town]].peek()[i];
        if (ShardDeal.canUse(town, i)) {
            const trades = deal.shards.map(shard => {
                const amt = player.getUndergroundItemAmount(shard.shardType.id);
                const maxShardTrades = Math.floor(amt / shard.amount);
                return maxShardTrades;
            });
            const qp = App.game.wallet.currencies[GameConstants.Currency.questPoint]();
            const maxCurrencyTrades = Math.floor(qp / deal.questPointCost);
            const maxTrades = Math.min(maxCurrencyTrades,trades.reduce((a,b) => Math.min(a,b), tradeTimes));
            deal.shards.forEach((value) =>
                Underground.gainMineItem(value.shardType.id, -value.amount * maxTrades));
            deal.item.itemType.gain(deal.item.amount * maxTrades);
            App.game.wallet.loseAmount(new Amount(deal.questPointCost * maxTrades, GameConstants.Currency.questPoint));
        }
    }
}
