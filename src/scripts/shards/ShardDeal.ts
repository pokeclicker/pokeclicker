type ShardCost = {
    shardType: PokemonType,
    amount: number,
}

class ShardDeal {
    public shards: ShardCost[];
    public item: { itemType: Item, amount: number};
    public static list: Record<GameConstants.Region, KnockoutObservableArray<ShardDeal>> = {};

    constructor(shardCosts: ShardCost[], item: Item, itemAmount: number) {
        this.shards = shardCosts;
        this.item = {itemType: item, amount: itemAmount};
    }

    public static generateDeals() {
        const shardMasterRegions = [GameConstants.Region.hoenn, GameConstants.Region.unova];

        for (const region of shardMasterRegions) {
            if (!ShardDeal.list[region]) {
                ShardDeal.list[region] = ko.observableArray();
            } else {
                ShardDeal.list[region].removeAll();
            }
        }

        ShardDeal.list[GameConstants.Region.hoenn].push(...this.generateHoennFluteDeals());
        ShardDeal.list[GameConstants.Region.unova].push(...this.generateUnovaFluteDeals());
    }

    private static generateHoennFluteDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Fire'], amount: 1000},
                {shardType: PokemonType['Fighting'], amount: 1000},
                {shardType: PokemonType['Poison'], amount: 1000},
            ],
            ItemList['Red_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Normal'], amount: 1000},
                {shardType: PokemonType['Bug'], amount: 1000},
                {shardType: PokemonType['Rock'], amount: 1000},
            ],
            ItemList['White_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Normal'], amount: 1000},
                {shardType: PokemonType['Flying'], amount: 1000},
                {shardType: PokemonType['Poison'], amount: 1000},
            ],
            ItemList['Black_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Dark'], amount: 1000},
                {shardType: PokemonType['Electric'], amount: 1000},
                {shardType: PokemonType['Steel'], amount: 1000},
            ],
            ItemList['Yellow_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Dark'], amount: 1000},
                {shardType: PokemonType['Ghost'], amount: 1000},
                {shardType: PokemonType['Ice'], amount: 1000},
            ],
            ItemList['Blue_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Fighting'], amount: 1000},
                {shardType: PokemonType['Ice'], amount: 1000},
                {shardType: PokemonType['Fairy'], amount: 1000},
            ],
            ItemList['Poke_Flute'],
            1
        ));
        return list;
    }

    private static generateUnovaFluteDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Dragon'], amount: 1000},
                {shardType: PokemonType['Ghost'], amount: 1000},
                {shardType: PokemonType['Psychic'], amount: 1000},
            ],
            ItemList['Azure_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Flying'], amount: 1000},
                {shardType: PokemonType['Dragon'], amount: 1000},
                {shardType: PokemonType['Psychic'], amount: 1000},
            ],
            ItemList['Eon_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Fire'], amount: 1000},
                {shardType: PokemonType['Ground'], amount: 1000},
                {shardType: PokemonType['Water'], amount: 1000},
            ],
            ItemList['Sun_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Rock'], amount: 1000},
                {shardType: PokemonType['Ground'], amount: 1000},
                {shardType: PokemonType['Electric'], amount: 1000},
            ],
            ItemList['Moon_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Grass'], amount: 1000},
                {shardType: PokemonType['Psychic'], amount: 1000},
                {shardType: PokemonType['Water'], amount: 1000},
            ],
            ItemList['Time_Flute'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: PokemonType['Grass'], amount: 1000},
                {shardType: PokemonType['Bug'], amount: 1000},
                {shardType: PokemonType['Fairy'], amount: 1000},
            ],
            ItemList['Grass_Flute'],
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
