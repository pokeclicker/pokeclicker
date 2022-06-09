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
            GameConstants.ShardTraderLocations['Azalea Town'],
            GameConstants.ShardTraderLocations['Ecruteak City'],
            GameConstants.ShardTraderLocations['Olivine City'],
            GameConstants.ShardTraderLocations['Cianwood City'],
            GameConstants.ShardTraderLocations['Mahogany Town'],
            GameConstants.ShardTraderLocations['Blackthorn City'],
            GameConstants.ShardTraderLocations['Petalburg City'],
            GameConstants.ShardTraderLocations['Dewford Town'],
            GameConstants.ShardTraderLocations['Slateport City'],
            GameConstants.ShardTraderLocations['Mauville City'],
            GameConstants.ShardTraderLocations['Verdanturf Town'],
            GameConstants.ShardTraderLocations['Lavaridge Town'],
            GameConstants.ShardTraderLocations['Fallarbor Town'],
            GameConstants.ShardTraderLocations['Fortree City'],
            GameConstants.ShardTraderLocations['Mossdeep City'],
            GameConstants.ShardTraderLocations['Pacifidlog Town'],
            GameConstants.ShardTraderLocations['Sootopolis City'],
            GameConstants.ShardTraderLocations['Ever Grande City'],
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
        ShardDeal.list[GameConstants.ShardTraderLocations['Azalea Town']].push(...this.generateAzaleaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Ecruteak City']].push(...this.generateEcruteakShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Olivine City']].push(...this.generateOlivineShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Cianwood City']].push(...this.generateCianwoodShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Mahogany Town']].push(...this.generateMahoganyShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Blackthorn City']].push(...this.generateBlackthornShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Petalburg City']].push(...this.generatePetalburgShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Dewford Town']].push(...this.generateDewfordShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Slateport City']].push(...this.generateSlateportShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Mauville City']].push(...this.generateMauvilleShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Verdanturf Town']].push(...this.generateVerdanturfShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Lavaridge Town']].push(...this.generateLavaridgeShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Fallarbor Town']].push(...this.generateFallarborShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Fortree City']].push(...this.generateFortreeShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Mossdeep City']].push(...this.generateMossdeepShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Pacifidlog Town']].push(...this.generatePacifidlogShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Sootopolis City']].push(...this.generateSootopolisShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Ever Grande City']].push(...this.generateEvergrandeShardDeals());
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

    private static generateAzaleaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Kings_rock'],
            1
        ));
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
        return list;
    }

    private static generateEcruteakShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_egg'],
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
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_stone'],
            1
        ));
        return list;
    }

    private static generateOlivineShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Metal_coat'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Electric_egg'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Thunder_stone'],
            1
        ));
        return list;
    }

    private static generateCianwoodShardDeals() {
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
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Sun_stone'],
            1
        ));
        return list;
    }

    private static generateMahoganyShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Purple Shard'), amount: 75},
            ],
            ItemList['Upgrade'],
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
        return list;
    }

    private static generateBlackthornShardDeals() {
        const list = [];

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

    private static generatePetalburgShardDeals() {
        const list = [];

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

    private static generateDewfordShardDeals() {
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

    private static generateSlateportShardDeals() {
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
        return list;
    }

    private static generateMauvilleShardDeals() {
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
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Metal_coat'],
            1
        ));
        return list;
    }

    private static generateVerdanturfShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Grass_egg'],
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

    private static generateLavaridgeShardDeals() {
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
        return list;
    }

    private static generateFallarborShardDeals() {
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

    private static generateFortreeShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Leaf_stone'],
            1
        ));
        return list;
    }
    private static generateMossdeepShardDeals() {
        const list = [];

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
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Purple Shard'), amount: 75},
            ],
            ItemList['Upgrade'],
            1
        ));
        return list;
    }

    private static generatePacifidlogShardDeals() {
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

    private static generateSootopolisShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_egg'],
            1
        ));
        return list;
    }

    private static generateEvergrandeShardDeals() {
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
