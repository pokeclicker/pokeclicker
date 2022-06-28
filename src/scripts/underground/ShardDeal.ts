type ShardCost = {
    shardTypeString: string,
    shardType?: UndergroundItem,
    amount: number,
}

class ShardDeal {
    public shards: ShardCost[];
    public item: { itemType: Item, amount: number};
    public questPointCost: number;
    public static list: Record<GameConstants.ShardTraderLocations, KnockoutObservableArray<ShardDeal>> = {};

    constructor(shardCosts: ShardCost[], item: Item, itemAmount: number) {
        this.shards = shardCosts;
        this.shards.forEach(s => s.shardType = Underground.getMineItemByName(s.shardTypeString));
        this.item = {itemType: item, amount: itemAmount};
        this.questPointCost = this.item.itemType.basePrice / 4 || 1;
    }

    public static getDeals(town: GameConstants.ShardTraderLocations) {
        return ShardDeal.list[town];
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

    public static generateDeals() {
        this.generateKantoDeals();
        this.generateJohtoDeals();
        this.generateHoennDeals();
        this.generateSinnohDeals();
    }

    public static generateKantoDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Cerulean City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Vermilion City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Electric_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Thunder_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Lavender Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Grass_egg'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Saffron City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 100},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList['Fighting_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Leaf_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList['Moon_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Fuchsia City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList['Dragon_egg'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList['Trade_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Cinnabar Island']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_stone'],
                    1),
            ]
        );
    }

    public static generateJohtoDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Azalea Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Grass_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Leaf_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Kings_rock'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Ecruteak City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Soothe_bell'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Olivine City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Electric_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_stone'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Thunder_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Metal_coat'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Cianwood City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList['Fighting_egg'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Sun_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Mahogany Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList['Trade_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList['Upgrade'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Blackthorn City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList['Dragon_egg'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList['Dragon_scale'],
                    1),
            ]
        );
    }
    public static generateHoennDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Petalburg City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Kings_rock'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Dewford Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList['Fighting_egg'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Slateport City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_egg'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList['Trade_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Mauville City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Electric_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Thunder_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 100},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Metal_coat'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Verdanturf Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Grass_egg'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Thunder_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 100},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Soothe_bell'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Lavaridge Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 75}],
                    ItemList['Fire_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Fallarbor Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList['Moon_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Sun_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Fortree City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Leaf_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Mossdeep City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList['Upgrade'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList['Prism_scale'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Pacifidlog Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList['Deepsea_tooth'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList['Deepsea_scale'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Sootopolis City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 75}],
                    ItemList['Water_egg'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Ever Grande City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList['Dragon_egg'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList['Dragon_scale'],
                    1),
            ]
        );
    }
    public static generateSinnohDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Oreburgh City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList['Moon_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Sun_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Floaroma Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList['Trade_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Kings_rock'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Eterna City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Grass_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Leaf_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Hearthome City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Soothe_bell'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Solaceon Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList['Shiny_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList['Dusk_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList['Dawn_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Pastoria City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList['Prism_scale'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Celestic Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList['Dragon_egg'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList['Dragon_scale'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Pal Park']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList['Razor_claw'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList['Razor_fang'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Canalave City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 75},
                    ],
                    ItemList['Fighting_egg'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Metal_coat'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Snowpoint City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList['Upgrade'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Sunyshore City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Electric_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Thunder_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList['Deepsea_tooth'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList['Deepsea_scale'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Survival Area']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList['Electirizer'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList['Magmarizer'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Resort Area']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList['Protector'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList['Dubious_disc'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList['Reaper_cloth'],
                    1),
            ]
        );
    }

/*
    }
    //Unova
    private static generateCasteliaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_egg'],
            1
        ));
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
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Kings_rock'],
            1
        ));
        return list;
    }

    private static generateNimbasaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Grass_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Electric_egg'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Metal_coat'],
            1
        ));
        return list;
    }

    private static generateDriftveilShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Lime Shard'), amount: 75},
            ],
            ItemList['Razor_claw'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Lime Shard'), amount: 75},
            ],
            ItemList['Razor_fang'],
            1
        ));
        return list;
    }

    private static generateMistraltonShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Thunder_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Purple Shard'), amount: 75},
            ],
            ItemList['Upgrade'],
            1
        ));
        return list;
    }

    private static generateLentimasShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_egg'],
            1
        ));
        return list;
    }

    private static generateUndellaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_tooth'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_scale'],
            1
        ));
        return list;
    }

    private static generateLacunosaShardDeals() {
        const list = [];

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

    private static generateOpelucidShardDeals() {
        const list = [];

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
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Purple Shard'), amount: 75},
            ],
            ItemList['Dragon_scale'],
            1
        ));
        return list;
    }

    private static generateHumilauShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Prism_scale'],
            1
        ));
        return list;
    }

    private static generateIcirrusShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Protector'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Dubious_disc'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Reaper_cloth'],
            1
        ));
        return list;
    }

    private static generateBlackwhiteparkShardDeals() {
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
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Sun_stone'],
            1
        ));
        return list;
    }

    private static generateNacreneShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Soothe_bell'],
            1
        ));
        return list;
    }

    private static generateStriatonShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Leaf_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_stone'],
            1
        ));
        return list;
    }

    private static generateAccumulaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Shiny_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Dusk_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Dawn_stone'],
            1
        ));
        return list;
    }

    private static generateNuvemaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('White Shard'), amount: 75},
            ],
            ItemList['Electirizer'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('White Shard'), amount: 75},
            ],
            ItemList['Magmarizer'],
            1
        ));
        return list;
    }

    //Kalos
    private static generateCamphrierShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Electric_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Thunder_stone'],
            1
        ));
        return list;
    }

    private static generateAmbretteShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_stone'],
            1
        ));
        return list;
    }

    private static generateCyllageShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Upgrade'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Prism_scale'],
            1
        ));
        return list;
    }

    private static generateGeosengeShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Kings_rock'],
            1
        ));
        return list;
    }

    private static generateShalourShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
            ],
            ItemList['Fighting_egg'],
            1
        ));
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
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Metal_coat'],
            1
        ));
        return list;
    }

    private static generateCoumarineShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Grass_egg'],
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
                {shardType: Underground.getMineItemByName('White Shard'), amount: 75},
            ],
            ItemList['Electirizer'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('White Shard'), amount: 75},
            ],
            ItemList['Magmarizer'],
            1
        ));
        return list;
    }

    private static generateLaverreShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_tooth'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_scale'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Pink Shard'), amount: 75},
            ],
            ItemList['Sachet'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Pink Shard'), amount: 75},
            ],
            ItemList['Whipped_dream'],
            1
        ));
        return list;
    }

    private static generateDendemilleShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Shiny_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Dusk_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Dawn_stone'],
            1
        ));
        return list;
    }

    private static generateAnistarShardDeals() {
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
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Sun_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Lime Shard'), amount: 75},
            ],
            ItemList['Razor_claw'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Lime Shard'), amount: 75},
            ],
            ItemList['Razor_fang'],
            1
        ));
        return list;
    }

    private static generateCouriwayShardDeals() {
        const list = [];

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
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Purple Shard'), amount: 75},
            ],
            ItemList['Dragon_scale'],
            1
        ));
        return list;
    }

    private static generateSnowbelleShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Protector'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Dubious_disc'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Reaper_cloth'],
            1
        ));
        return list;
    }

    private static generateHauoliShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Shiny_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Dusk_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Dawn_stone'],
            1
        ));
        return list;
    }

    private static generateHeaheaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Kings_rock'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Metal_coat'],
            1
        ));
        return list;
    }

    private static generatePaniolaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Grass_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_egg'],
            1
        ));
        return list;
    }

    private static generateKonikoniShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_stone'],
            1
        ));
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
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Soothe_bell'],
            1
        ));
        return list;
    }

    private static generateAetherparadiseShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Purple Shard'), amount: 75},
            ],
            ItemList['Upgrade'],
            1
        ));
        return list;
    }

    private static generateMalieShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Electric_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Thunder_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('White Shard'), amount: 75},
            ],
            ItemList['Electirizer'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('White Shard'), amount: 75},
            ],
            ItemList['Magmarizer'],
            1
        ));
        return list;
    }

    private static generateTapuShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Lime Shard'), amount: 75},
            ],
            ItemList['Razor_claw'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Lime Shard'), amount: 75},
            ],
            ItemList['Razor_fang'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Cyan Shard'), amount: 75},
            ],
            ItemList['Ice_stone'],
            1
        ));
        return list;
    }

    private static generateSeafolkShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
            ],
            ItemList['Fighting_egg'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_tooth'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_scale'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Prism_scale'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Pink Shard'), amount: 75},
            ],
            ItemList['Sachet'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Pink Shard'), amount: 75},
            ],
            ItemList['Whipped_dream'],
            1
        ));
        return list;
    }

    private static generateExeggutorislandShardDeals() {
        const list = [];

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
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Leaf_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Purple Shard'), amount: 75},
            ],
            ItemList['Dragon_scale'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Protector'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Dubious_disc'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Reaper_cloth'],
            1
        ));
        return list;
    }

    private static generateAltarsunnemooneShardDeals() {
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
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Sun_stone'],
            1
        ));
        return list;
    }*/
}
