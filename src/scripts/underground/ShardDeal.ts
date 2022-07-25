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
        this.shards.forEach(s => s.shardType = UndergroundItems.getByName(s.shardTypeString));
        this.item = {itemType: item, amount: itemAmount};
        this.questPointCost = this.item.itemType.basePrice / 4 || 1;
    }

    public static getDeals(town: GameConstants.ShardTraderLocations) {
        return ShardDeal.list[town];
    }

    public static canUse(town: GameConstants.ShardTraderLocations, i: number): boolean {
        const deal = ShardDeal.list[GameConstants.ShardTraderLocations[town]]?.peek()[i];
        if (!deal) {
            return false;
        }
        if (ItemList[deal.item.itemType.name].isSoldOut()) {
            return false;
        } else if (deal.questPointCost > App.game.wallet.currencies[GameConstants.Currency.questPoint]()) {
            return false;
        } else {
            return deal.shards.every((value) => player.getUndergroundItemAmount(value.shardType.id) >= value.amount);
        }
    }

    public static use(town: GameConstants.ShardTraderLocations, i: number, tradeTimes = 1) {
        const deal = ShardDeal.list[GameConstants.ShardTraderLocations[town]]?.peek()[i];
        if (ShardDeal.canUse(town, i)) {
            const trades = deal.shards.map(shard => {
                const amt = player.getUndergroundItemAmount(shard.shardType.id);
                const maxShardTrades = Math.floor(amt / shard.amount);
                return maxShardTrades;
            });
            const qp = App.game.wallet.currencies[GameConstants.Currency.questPoint]();
            const maxCurrencyTrades = Math.floor(qp / deal.questPointCost);
            const maxTrades = Math.min(maxCurrencyTrades,trades.reduce((a,b) => Math.min(a,b), tradeTimes));
            deal.shards.forEach((value) => Underground.gainMineItem(value.shardType.id, -value.amount * maxTrades));

            const amount = deal.item.amount * maxTrades;
            const multiple = amount > 1 ? 's' : '';
            deal.item.itemType.gain(deal.item.amount * maxTrades);
            App.game.wallet.loseAmount(new Amount(deal.questPointCost * maxTrades, GameConstants.Currency.questPoint));
            Notifier.notify({
                message: `You traded for ${amount.toLocaleString('en-US')} ${GameConstants.humanifyString(deal.item.itemType.displayName)}${multiple}`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.item_bought,
            });
        }
    }

    public static generateDeals() {
        this.generateKantoDeals();
        this.generateJohtoDeals();
        this.generateHoennDeals();
        this.generateSinnohDeals();
        this.generateUnovaDeals();
        this.generateKalosDeals();
        this.generateAlolaDeals();
    }

    public static generateKantoDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Cerulean City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Vermilion City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Thunder_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Lavender Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Grass_egg,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Saffron City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Moon_stone,
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
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList.Linking_cord,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Cinnabar Island']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_stone,
                    1),
            ]
        );
    }

    public static generateJohtoDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Azalea Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Kings_rock,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Ecruteak City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Soothe_bell,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Olivine City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_stone,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Metal_coat,
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
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Sun_stone,
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
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Upgrade,
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
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Dragon_scale,
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
                    ItemList.Kings_rock,
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
                    ItemList.Fighting_egg,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Slateport City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList.Linking_cord,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Mauville City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Metal_coat,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Verdanturf Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Soothe_bell,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Lavaridge Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_stone,
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
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Sun_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Fortree City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Leaf_stone,
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
                    ItemList.Upgrade,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Prism_scale,
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
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_scale,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Sootopolis City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_egg,
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
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Dragon_scale,
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
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Sun_stone,
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
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Kings_rock,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Eterna City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Leaf_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Hearthome City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Soothe_bell,
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
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Dawn_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Pastoria City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Prism_scale,
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
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Dragon_scale,
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
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList.Razor_fang,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Canalave City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Metal_coat,
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
                    ItemList.Upgrade,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Sunyshore City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_scale,
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
                    ItemList.Electirizer,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList.Magmarizer,
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
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ]
        );
    }

    public static generateUnovaDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Castelia City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Kings_rock,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Nimbasa City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Metal_coat,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Driftveil City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList.Razor_fang,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Mistralton City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Upgrade,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Lentimas Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_egg,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Undella Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_scale,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Lacunosa Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Fighting_egg,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Opelucid City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Dragon_scale,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Humilau City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Prism_scale,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Icirrus City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Black and White Park']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Sun_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Nacrene City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Soothe_bell,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Striaton City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Accumula Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Dawn_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Nuvema Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList.Electirizer,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList.Magmarizer,
                    1),
            ]
        );
    }

    public static generateKalosDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Camphrier Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Thunder_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Ambrette Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Cyllage City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Upgrade,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Prism_scale,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Geosenge Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Kings_rock,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Shalour City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Metal_coat,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Coumarine City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList.Electirizer,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList.Magmarizer,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Laverre City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_scale,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Pink Shard', amount: 75},
                    ],
                    ItemList.Sachet,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Pink Shard', amount: 75},
                    ],
                    ItemList.Whipped_dream,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Dendemille Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Dawn_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Anistar City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Sun_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList.Razor_fang,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Couriway Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Dragon_scale,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Snowbelle City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ]
        );
    }

    public static generateAlolaDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Hau\'oli City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Crimson Shard', amount: 75},
                    ],
                    ItemList.Dawn_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Heahea City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Kings_rock,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Metal_coat,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Paniola Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList.Water_egg,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Konikoni City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Yellow Shard', amount: 50},
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Soothe_bell,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Aether Paradise']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Upgrade,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Malie City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList.Electirizer,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'White Shard', amount: 75},
                    ],
                    ItemList.Magmarizer,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Tapu Village']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Lime Shard', amount: 75},
                    ],
                    ItemList.Razor_fang,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Cyan Shard', amount: 75},
                    ],
                    ItemList.Ice_stone,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Seafolk Village']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Deepsea_scale,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList.Prism_scale,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Pink Shard', amount: 75},
                    ],
                    ItemList.Sachet,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Pink Shard', amount: 75},
                    ],
                    ItemList.Whipped_dream,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Exeggutor Island']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList.Dragon_scale,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Black Shard', amount: 75},
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Altar of the Sunne and Moone']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList.Sun_stone,
                    1),
            ]
        );
    }
}
