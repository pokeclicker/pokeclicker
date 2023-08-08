import { ShardTraderLocations, Currency, pluralizeString, humanifyString } from '../GameConstants';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import NotificationConstants from '../notifications/NotificationConstants';
import Notifier from '../notifications/Notifier';
import Amount from '../wallet/Amount';
import { Underground } from './Underground';
import UndergroundItem from './UndergroundItem';
import UndergroundItems from './UndergroundItems';

type ShardCost = {
    shardTypeString: string,
    shardType?: UndergroundItem,
    amount: number,
};

export class ShardDeal {
    public shards: ShardCost[];
    public item: { itemType: Item, amount: number };
    public questPointCost: number;
    public static list: Partial<Record<ShardTraderLocations, KnockoutObservableArray<ShardDeal>>> = {};

    constructor(shardCosts: ShardCost[], item: Item, itemAmount: number) {
        this.shards = shardCosts;
        this.shards.forEach((s) => { s.shardType = UndergroundItems.getByName(s.shardTypeString); });
        this.item = { itemType: item, amount: itemAmount };
        this.questPointCost = this.item.itemType.basePrice / 4 || 1;
    }

    public static getDeals(town: ShardTraderLocations) {
        return ShardDeal.list[town];
    }

    public static canUse(town: ShardTraderLocations, i: number): boolean {
        const deal = ShardDeal.list[town]?.peek()[i];
        if (!deal) {
            return false;
        }
        if (ItemList[deal.item.itemType.name].isSoldOut()) {
            return false;
        } else if (deal.questPointCost > App.game.wallet.currencies[Currency.questPoint]()) {
            return false;
        } else {
            return deal.shards.every((value) => player.getUndergroundItemAmount(value.shardType.id) >= value.amount);
        }
    }

    public static use(town: ShardTraderLocations, i: number, tradeTimes = 1) {
        const deal = ShardDeal.list[town]?.peek()[i];
        if (ShardDeal.canUse(town, i)) {
            const trades = deal.shards.map(shard => {
                const amt = player.getUndergroundItemAmount(shard.shardType.id);
                const maxShardTrades = Math.floor(amt / shard.amount);
                return maxShardTrades;
            });
            const qp = App.game.wallet.currencies[Currency.questPoint]();
            const maxCurrencyTrades = Math.floor(qp / deal.questPointCost);
            const maxTrades = Math.min(maxCurrencyTrades, trades.reduce((a, b) => Math.min(a, b), tradeTimes));
            deal.shards.forEach((value) => Underground.gainMineItem(value.shardType.id, -value.amount * maxTrades));

            const amount = deal.item.amount * maxTrades;
            deal.item.itemType.gain(deal.item.amount * maxTrades);
            App.game.wallet.loseAmount(new Amount(deal.questPointCost * maxTrades, Currency.questPoint));
            Notifier.notify({
                message: `You traded for ${amount.toLocaleString('en-US')} × <img src="${deal.item.itemType.image}" height="24px"/> ${pluralizeString(humanifyString(deal.item.itemType.displayName), amount)}.`,
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
        this.generateGalarDeals();
    }

    public static generateKantoDeals() {
        ShardDeal.list[ShardTraderLocations['Cerulean City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 40 }],
                    ItemList.Water_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Vermilion City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 20 }],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Lavender Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 20 }],
                    ItemList.Grass_egg,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Saffron City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 10 },
                        { shardTypeString: 'Blue Shard', amount: 10 },
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Fuchsia City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5 },
                        { shardTypeString: 'Yellow Shard', amount: 5 },
                        { shardTypeString: 'Green Shard', amount: 5 },
                        { shardTypeString: 'Blue Shard', amount: 5 },
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Cinnabar Island']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 20 }],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
            ],
        );
    }

    public static generateJohtoDeals() {
        ShardDeal.list[ShardTraderLocations['Azalea Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 20 }],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Kings_rock,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Ecruteak City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 20 }],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Soothe_bell,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Olivine City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 20 }],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 40 }],
                    ItemList.Water_stone,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Metal_coat,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Cianwood City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 10 },
                        { shardTypeString: 'Blue Shard', amount: 10 },
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Sun_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Mahogany Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Upgrade,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Blackthorn City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5 },
                        { shardTypeString: 'Yellow Shard', amount: 5 },
                        { shardTypeString: 'Green Shard', amount: 5 },
                        { shardTypeString: 'Blue Shard', amount: 5 },
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Dragon_scale,
                    1),
            ],
        );
    }

    public static generateHoennDeals() {
        ShardDeal.list[ShardTraderLocations['Petalburg City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Kings_rock,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Dewford Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 10 },
                        { shardTypeString: 'Blue Shard', amount: 10 },
                    ],
                    ItemList.Fighting_egg,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Slateport City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Mauville City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 20 }],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Metal_coat,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Verdanturf Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 20 }],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Soothe_bell,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Lavaridge Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 20 }],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Fallarbor Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Sun_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Fortree City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Mossdeep City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Upgrade,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Prism_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Pacifidlog Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Sootopolis City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Ever Grande City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5 },
                        { shardTypeString: 'Yellow Shard', amount: 5 },
                        { shardTypeString: 'Green Shard', amount: 5 },
                        { shardTypeString: 'Blue Shard', amount: 5 },
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Dragon_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Pokemon HQ Lab']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 40 }],
                    ItemList.Water_stone,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Kings_rock,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Soothe_bell,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Metal_coat,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Sun_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Upgrade,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Dragon_scale,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Prism_scale,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_scale,
                    1),
            ],
        );
    }

    public static generateSinnohDeals() {
        ShardDeal.list[ShardTraderLocations['Oreburgh City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Sun_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Floaroma Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Kings_rock,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Eterna City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 20 }],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Hearthome City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 20 }],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Soothe_bell,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Solaceon Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dawn_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Pastoria City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 40 }],
                    ItemList.Water_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Prism_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Celestic Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5 },
                        { shardTypeString: 'Yellow Shard', amount: 5 },
                        { shardTypeString: 'Green Shard', amount: 5 },
                        { shardTypeString: 'Blue Shard', amount: 5 },
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Dragon_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Pal Park']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_fang,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Canalave City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 10 },
                        { shardTypeString: 'Blue Shard', amount: 10 },
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Metal_coat,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Snowpoint City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Upgrade,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Sunyshore City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 20 }],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Survival Area']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Electirizer,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Magmarizer,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Resort Area']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ],
        );
    }

    public static generateUnovaDeals() {
        ShardDeal.list[ShardTraderLocations['Castelia City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Kings_rock,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Nimbasa City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 20 }],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 20 }],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Metal_coat,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Driftveil City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_fang,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Mistralton City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Upgrade,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Lentimas Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 20 }],
                    ItemList.Fire_egg,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Undella Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Lacunosa Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 10 },
                        { shardTypeString: 'Blue Shard', amount: 10 },
                    ],
                    ItemList.Fighting_egg,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Opelucid City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5 },
                        { shardTypeString: 'Yellow Shard', amount: 5 },
                        { shardTypeString: 'Green Shard', amount: 5 },
                        { shardTypeString: 'Blue Shard', amount: 5 },
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Dragon_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Humilau City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Prism_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Icirrus City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Black and White Park']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Sun_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Nacrene City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Soothe_bell,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Striaton City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 40 }],
                    ItemList.Water_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Accumula Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dawn_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Nuvema Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Electirizer,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Magmarizer,
                    1),
            ],
        );
    }

    public static generateKalosDeals() {
        ShardDeal.list[ShardTraderLocations['Camphrier Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 20 }],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Ambrette Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 40 }],
                    ItemList.Water_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Cyllage City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Upgrade,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Prism_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Geosenge Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 20 }],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Kings_rock,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Shalour City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 10 },
                        { shardTypeString: 'Blue Shard', amount: 10 },
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Metal_coat,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Coumarine City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 20 }],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Electirizer,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Magmarizer,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Laverre City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_scale,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Pink Shard', amount: 30 },
                    ],
                    ItemList.Sachet,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Pink Shard', amount: 30 },
                    ],
                    ItemList.Whipped_dream,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Pink Shard', amount: 1000 }],
                    ItemList.Alakazite,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Dendemille Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dawn_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Anistar City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Sun_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_fang,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Couriway Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5 },
                        { shardTypeString: 'Yellow Shard', amount: 5 },
                        { shardTypeString: 'Green Shard', amount: 5 },
                        { shardTypeString: 'Blue Shard', amount: 5 },
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Dragon_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Snowbelle City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Parfum Palace']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5000 },
                        { shardTypeString: 'Yellow Shard', amount: 5000 },
                        { shardTypeString: 'Green Shard', amount: 5000 },
                        { shardTypeString: 'Blue Shard', amount: 5000 },
                        { shardTypeString: 'Grey Shard', amount: 2000 },
                        { shardTypeString: 'Purple Shard', amount: 2000 },
                        { shardTypeString: 'Ochre Shard', amount: 2000 },
                        { shardTypeString: 'Black Shard', amount: 1000 },
                        { shardTypeString: 'Crimson Shard', amount: 1000 },
                        { shardTypeString: 'Lime Shard', amount: 1000 },
                        { shardTypeString: 'White Shard', amount: 1000 },
                        { shardTypeString: 'Pink Shard', amount: 500 },
                    ],
                    ItemList['Furfrou (Star)'],
                    1),
            ],
        );
    }

    public static generateAlolaDeals() {
        ShardDeal.list[ShardTraderLocations['Hau\'oli City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dawn_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Heahea City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 40 }],
                    ItemList.Water_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Kings_rock,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Metal_coat,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Paniola Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 20 }],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 20 }],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Konikoni City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Soothe_bell,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Aether Paradise']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Upgrade,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Malie City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 20 }],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Electirizer,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Magmarizer,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Tapu Village']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_fang,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Cyan Shard', amount: 30 },
                    ],
                    ItemList.Ice_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Seafolk Village']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 10 },
                        { shardTypeString: 'Blue Shard', amount: 10 },
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_scale,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Prism_scale,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Pink Shard', amount: 30 },
                    ],
                    ItemList.Sachet,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Pink Shard', amount: 30 },
                    ],
                    ItemList.Whipped_dream,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Exeggutor Island']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5 },
                        { shardTypeString: 'Yellow Shard', amount: 5 },
                        { shardTypeString: 'Green Shard', amount: 5 },
                        { shardTypeString: 'Blue Shard', amount: 5 },
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Dragon_scale,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Altar of the Sunne and Moone']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Sun_stone,
                    1),
            ],
        );
    }
    public static generateGalarDeals() {
        ShardDeal.list[ShardTraderLocations.Turffield] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 20 }],
                    ItemList.Grass_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Rose Shard', amount: 30 },
                    ],
                    ItemList.Sweet_apple,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Rose Shard', amount: 30 },
                    ],
                    ItemList.Tart_apple,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Green Shard', amount: 40 }],
                    ItemList.Leaf_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Sun_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations.Hulbury] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 20 }],
                    ItemList.Water_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Blue Shard', amount: 40 }],
                    ItemList.Water_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Kings_rock,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Prism_scale,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_tooth,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Ochre Shard', amount: 30 },
                    ],
                    ItemList.Deepsea_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations.Motostoke] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 20 }],
                    ItemList.Fire_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Red Shard', amount: 40 }],
                    ItemList.Fire_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                    ],
                    ItemList.Linking_cord,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Magmarizer,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations.Hammerlocke] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 5 },
                        { shardTypeString: 'Yellow Shard', amount: 5 },
                        { shardTypeString: 'Green Shard', amount: 5 },
                        { shardTypeString: 'Blue Shard', amount: 5 },
                    ],
                    ItemList.Dragon_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Metal_coat,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Upgrade,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Purple Shard', amount: 30 },
                    ],
                    ItemList.Dragon_scale,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Route 6']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Fossilized Bird', amount: 1 },
                        { shardTypeString: 'Fossilized Drake', amount: 1 },
                    ],
                    ItemList.Dracozolt,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Fossilized Bird', amount: 1 },
                        { shardTypeString: 'Fossilized Dino', amount: 1 },
                    ],
                    ItemList.Arctozolt,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Fossilized Fish', amount: 1 },
                        { shardTypeString: 'Fossilized Drake', amount: 1 },
                    ],
                    ItemList.Dracovish,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Fossilized Fish', amount: 1 },
                        { shardTypeString: 'Fossilized Dino', amount: 1 },
                    ],
                    ItemList.Arctovish,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Stow-on-Side']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 10 },
                        { shardTypeString: 'Blue Shard', amount: 10 },
                    ],
                    ItemList.Fighting_egg,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Grey Shard', amount: 30 },
                    ],
                    ItemList.Soothe_bell,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dawn_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Dubious_disc,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Reaper_cloth,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations.Ballonlea] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Brown Shard', amount: 30 },
                    ],
                    ItemList.Cracked_pot,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Blue Shard', amount: 20 },
                    ],
                    ItemList.Moon_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Shiny_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Pink Shard', amount: 30 },
                    ],
                    ItemList.Sachet,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Pink Shard', amount: 30 },
                    ],
                    ItemList.Whipped_dream,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations.Circhester] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_claw,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Lime Shard', amount: 30 },
                    ],
                    ItemList.Razor_fang,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Black Shard', amount: 30 },
                    ],
                    ItemList.Protector,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Cyan Shard', amount: 30 },
                    ],
                    ItemList.Ice_stone,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations.Spikemuth] = ko.observableArray(
            [
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 20 }],
                    ItemList.Electric_egg,
                    1),
                new ShardDeal(
                    [{ shardTypeString: 'Yellow Shard', amount: 40 }],
                    ItemList.Thunder_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Blue Shard', amount: 20 },
                        { shardTypeString: 'Crimson Shard', amount: 30 },
                    ],
                    ItemList.Dusk_stone,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'White Shard', amount: 30 },
                    ],
                    ItemList.Electirizer,
                    1),
            ],
        );
        ShardDeal.list[ShardTraderLocations['Master Dojo']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: 'Brown Shard', amount: 30 },
                    ],
                    ItemList.Galarica_cuff,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Green Shard', amount: 20 },
                        { shardTypeString: 'Brown Shard', amount: 30 },
                    ],
                    ItemList.Galarica_wreath,
                    1),
            ],
        );
    }
    public static generateHisuiDeals() {
        ShardDeal.list[ShardTraderLocations['Jubilife Village']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        { shardTypeString: 'Red Shard', amount: 20 },
                        { shardTypeString: /*'Beige Shard'*/'Brown Shard', amount: 30 },
                    ],
                    ItemList.Black_augurite,
                    1),
                new ShardDeal(
                    [
                        { shardTypeString: 'Yellow Shard', amount: 20 },
                        { shardTypeString: /*'Beige Shard'*/'Brown Shard', amount: 30 },
                    ],
                    ItemList.Peat_block,
                    1),
            ],
        );
    }
}
