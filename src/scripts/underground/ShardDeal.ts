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
    }

    public static generateKantoDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Cerulean City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_stone'],
                    1
                ),
                new ShardDeal(
                    [{shardTypeString: 'Blue Shard', amount: 100}],
                    ItemList['Water_egg'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Vermilion City']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Thunder_stone'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Yellow Shard', amount: 100}],
                    ItemList['Electric_egg'],
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
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList['Moon_stone'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Leaf_stone'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 100},
                        {shardTypeString: 'Blue Shard', amount: 50},
                    ],
                    ItemList['Fighting_egg'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Fuchsia City']] = ko.observableArray(
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
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList['Dragon_egg'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Cinnabar Island']] = ko.observableArray(
            [
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_stone'],
                    1
                ),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_egg'],
                    1),
            ]
        );
    }

    public static generateJohtoDeals() {
        ShardDeal.list[GameConstants.ShardTraderLocations['Azalea Town']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Kings_rock'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Grass_egg'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Green Shard', amount: 100}],
                    ItemList['Grass_egg'],
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
                    [
                        {shardTypeString: 'Green Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Soothe_bell'],
                    1),
                new ShardDeal(
                    [{shardTypeString: 'Red Shard', amount: 100}],
                    ItemList['Fire_stone'],
                    1),
            ]
        );
        ShardDeal.list[GameConstants.ShardTraderLocations['Olivine City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Grey Shard', amount: 75},
                    ],
                    ItemList['Metal_coat'],
                    1),
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
                        {shardTypeString: 'Yellow Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList['Upgrade'],
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
        ShardDeal.list[GameConstants.ShardTraderLocations['Blackthorn City']] = ko.observableArray(
            [
                new ShardDeal(
                    [
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Purple Shard', amount: 75},
                    ],
                    ItemList['Dragon_scale'],
                    1),
                new ShardDeal(
                    [
                        {shardTypeString: 'Red Shard', amount: 25},
                        {shardTypeString: 'Yellow Shard', amount: 25},
                        {shardTypeString: 'Green Shard', amount: 25},
                        {shardTypeString: 'Blue Shard', amount: 25},
                    ],
                    ItemList['Dragon_egg'],
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
                        {shardTypeString: 'Blue Shard', amount: 50},
                        {shardTypeString: 'Ochre Shard', amount: 75},
                    ],
                    ItemList['Prism_scale'],
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

    /*
            //Sinnoh
            GameConstants.ShardTraderLocations['Jubilife City'],
            GameConstants.ShardTraderLocations['Floaroma Town'],
            GameConstants.ShardTraderLocations['Eterna City'],
            GameConstants.ShardTraderLocations['Hearthome City'],
            GameConstants.ShardTraderLocations['Solaceon Town'],
            GameConstants.ShardTraderLocations['Pastoria City'],
            GameConstants.ShardTraderLocations['Celestic Town'],
            GameConstants.ShardTraderLocations['Pal Park'],
            GameConstants.ShardTraderLocations['Canalave City'],
            GameConstants.ShardTraderLocations['Snowpoint City'],
            GameConstants.ShardTraderLocations['Sunyshore City'],
            GameConstants.ShardTraderLocations['Survival Area'],
            GameConstants.ShardTraderLocations['Resort Area'],
            //Unova
            GameConstants.ShardTraderLocations['Castelia City'],
            GameConstants.ShardTraderLocations['Nimbasa City'],
            GameConstants.ShardTraderLocations['Driftveil City'],
            GameConstants.ShardTraderLocations['Mistralton City'],
            GameConstants.ShardTraderLocations['Lentimas Town'],
            GameConstants.ShardTraderLocations['Undella Town'],
            GameConstants.ShardTraderLocations['Lacunosa Town'],
            GameConstants.ShardTraderLocations['Opelucid City'],
            GameConstants.ShardTraderLocations['Humilau City'],
            GameConstants.ShardTraderLocations['Icirrus City'],
            GameConstants.ShardTraderLocations['Black and White Park'],
            GameConstants.ShardTraderLocations['Nacrene City'],
            GameConstants.ShardTraderLocations['Striaton City'],
            GameConstants.ShardTraderLocations['Accumula Town'],
            GameConstants.ShardTraderLocations['Nuvema Town'],
            //Kalos
            GameConstants.ShardTraderLocations['Camphrier Town'],
            GameConstants.ShardTraderLocations['Ambrette Town'],
            GameConstants.ShardTraderLocations['Geosenge Town'],
            GameConstants.ShardTraderLocations['Shalour City'],
            GameConstants.ShardTraderLocations['Coumarine City'],
            GameConstants.ShardTraderLocations['Laverre City'],
            GameConstants.ShardTraderLocations['Dendemille Town'],
            GameConstants.ShardTraderLocations['Anistar City'],
            GameConstants.ShardTraderLocations['Couriway Town'],
            GameConstants.ShardTraderLocations['Snowbelle City'],
            //Alola
            GameConstants.ShardTraderLocations['Hau\'oli City'],
            GameConstants.ShardTraderLocations['Heahea City'],
            GameConstants.ShardTraderLocations['Paniola Town'],
            GameConstants.ShardTraderLocations['Konikoni City'],
            GameConstants.ShardTraderLocations['Aether Paradise'],
            GameConstants.ShardTraderLocations['Malie City'],
            GameConstants.ShardTraderLocations['Tapu Village'],
            GameConstants.ShardTraderLocations['Seafolk Village'],
            GameConstants.ShardTraderLocations['Exeggutor Island'],
            GameConstants.ShardTraderLocations['Altar of the Sunne and Moone'],
        ];

        for (const town of shardMasterTowns) {
            if (!ShardDeal.list[town]) {
                ShardDeal.list[town] = ko.observableArray();
            } else {
                ShardDeal.list[town].removeAll();
            }
        }


        //Sinnoh
        ShardDeal.list[GameConstants.ShardTraderLocations['Jubilife City']].push(...this.generateJubilifeShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Floaroma Town']].push(...this.generateFloaromaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Eterna City']].push(...this.generateEternaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Hearthome City']].push(...this.generateHearthomeShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Solaceon Town']].push(...this.generateSolaceonShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Pastoria City']].push(...this.generatePastoriaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Celestic Town']].push(...this.generateCelesticShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Pal Park']].push(...this.generatePalparkShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Canalave City']].push(...this.generateCanalaveShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Snowpoint City']].push(...this.generateSnowpointShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Sunyshore City']].push(...this.generateSunyshoreShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Survival Area']].push(...this.generateSurvivalareaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Resort Area']].push(...this.generateResortareaShardDeals());
        //Unova
        ShardDeal.list[GameConstants.ShardTraderLocations['Castelia City']].push(...this.generateCasteliaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Nimbasa City']].push(...this.generateNimbasaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Driftveil City']].push(...this.generateDriftveilShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Mistralton City']].push(...this.generateMistraltonShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Lentimas Town']].push(...this.generateLentimasShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Undella Town']].push(...this.generateUndellaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Lacunosa Town']].push(...this.generateLacunosaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Opelucid City']].push(...this.generateOpelucidShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Humilau City']].push(...this.generateHumilauShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Icirrus City']].push(...this.generateIcirrusShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Black and White Park']].push(...this.generateBlackwhiteparkShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Nacrene City']].push(...this.generateNacreneShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Striaton City']].push(...this.generateStriatonShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Accumula Town']].push(...this.generateAccumulaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Nuvema Town']].push(...this.generateNuvemaShardDeals());
        //Kalos
        ShardDeal.list[GameConstants.ShardTraderLocations['Camphrier Town']].push(...this.generateCamphrierShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Ambrette Town']].push(...this.generateAmbretteShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Geosenge Town']].push(...this.generateGeosengeShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Shalour City']].push(...this.generateShalourShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Coumarine City']].push(...this.generateCoumarineShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Laverre City']].push(...this.generateLaverreShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Dendemille Town']].push(...this.generateDendemilleShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Anistar City']].push(...this.generateAnistarShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Couriway Town']].push(...this.generateCouriwayShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Snowbelle City']].push(...this.generateSnowbelleShardDeals());
        //Alola
        ShardDeal.list[GameConstants.ShardTraderLocations['Hau\'oli City']].push(...this.generateHauoliShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Heahea City']].push(...this.generateHeaheaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Paniola Town']].push(...this.generatePaniolaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Konikoni City']].push(...this.generateKonikoniShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Aether Paradise']].push(...this.generateAetherparadiseShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Malie City']].push(...this.generateMalieShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Tapu Village']].push(...this.generateTapuShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Seafolk Village']].push(...this.generateSeafolkShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Exeggutor Island']].push(...this.generateExeggutorislandShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Altar of the Sunne and Moone']].push(...this.generateAltarsunnemooneShardDeals());
    }


    //Sinnoh
    private static generateJubilifeShardDeals() {
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

    private static generateFloaromaShardDeals() {
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
            [
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
            ],
            ItemList['Trade_stone'],
            1
        ));
        return list;
    }

    private static generateEternaShardDeals() {
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
        return list;
    }

    private static generateHearthomeShardDeals() {
        const list = [];

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

    private static generateSolaceonShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Dawn_stone'],
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
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Shiny_stone'],
            1
        ));
        return list;
    }

    private static generatePastoriaShardDeals() {
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

    private static generateCelesticShardDeals() {
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

    private static generatePalparkShardDeals() {
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

    private static generateCanalaveShardDeals() {
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
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Metal_coat'],
            1
        ));
        return list;
    }

    private static generateSnowpointShardDeals() {
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

    private static generateSunyshoreShardDeals() {
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
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_scale'],
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
        return list;
    }

    private static generateSurvivalareaShardDeals() {
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

    private static generateResortareaShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Reaper_cloth'],
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
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Protector'],
            1
        ));
        return list;
    }

    //Unova
    private static generateCasteliaShardDeals() {
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
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_egg'],
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
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_scale'],
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
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Protector'],
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

    private static generateStriatonShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Green Shard'), amount: 100}],
            ItemList['Leaf_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Blue Shard'), amount: 100}],
            ItemList['Water_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Red Shard'), amount: 100}],
            ItemList['Fire_stone'],
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

    private static generateAccumulaShardDeals() {
        const list = [];

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
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Shiny_stone'],
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
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Metal_coat'],
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
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_tooth'],
            1
        ));
        return list;
    }

    private static generateDendemilleShardDeals() {
        const list = [];

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
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Crimson Shard'), amount: 75},
            ],
            ItemList['Shiny_stone'],
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

    private static generateAnistarShardDeals() {
        const list = [];

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
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
            ],
            ItemList['Moon_stone'],
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
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Black Shard'), amount: 75},
            ],
            ItemList['Reaper_cloth'],
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
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Metal_coat'],
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
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Soothe_bell'],
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
            ItemList['Thunder_stone'],
            1
        ));
        list.push(new ShardDeal(
            [{shardType: Underground.getMineItemByName('Yellow Shard'), amount: 100}],
            ItemList['Electric_egg'],
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
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Yellow Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('White Shard'), amount: 75},
            ],
            ItemList['Electirizer'],
            1
        ));
        return list;
    }

    private static generateTapuShardDeals() {
        const list = [];

        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Cyan Shard'), amount: 75},
            ],
            ItemList['Ice_stone'],
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
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Ochre Shard'), amount: 75},
            ],
            ItemList['Deepsea_scale'],
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
                {shardType: Underground.getMineItemByName('Red Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Grey Shard'), amount: 75},
            ],
            ItemList['Sun_stone'],
            1
        ));
        list.push(new ShardDeal(
            [
                {shardType: Underground.getMineItemByName('Green Shard'), amount: 50},
                {shardType: Underground.getMineItemByName('Blue Shard'), amount: 50},
            ],
            ItemList['Moon_stone'],
            1
        ));
        return list;
    }*/
}
