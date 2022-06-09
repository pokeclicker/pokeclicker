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
            //Kanto
            GameConstants.ShardTraderLocations['Cerulean City'],
            GameConstants.ShardTraderLocations['Vermilion City'],
            GameConstants.ShardTraderLocations['Lavender Town'],
            GameConstants.ShardTraderLocations['Saffron City'],
            GameConstants.ShardTraderLocations['Fuchsia City'],
            GameConstants.ShardTraderLocations['Cinnabar Island'],
            //Johto
            GameConstants.ShardTraderLocations['Azalea Town'],
            GameConstants.ShardTraderLocations['Ecruteak City'],
            GameConstants.ShardTraderLocations['Olivine City'],
            GameConstants.ShardTraderLocations['Cianwood City'],
            GameConstants.ShardTraderLocations['Mahogany Town'],
            GameConstants.ShardTraderLocations['Blackthorn City'],
            //Hoenn
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
        ];

        for (const town of shardMasterTowns) {
            if (!ShardDeal.list[town]) {
                ShardDeal.list[town] = ko.observableArray();
            } else {
                ShardDeal.list[town].removeAll();
            }
        }

        //Kanto
        ShardDeal.list[GameConstants.ShardTraderLocations['Cerulean City']].push(...this.generateCeruleanShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Vermilion City']].push(...this.generateVermilionShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Lavender Town']].push(...this.generateLavenderShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Saffron City']].push(...this.generateSaffronShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Fuchsia City']].push(...this.generateFuchsiaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Cinnabar Island']].push(...this.generateCinnabarShardDeals());
        //Johto
        ShardDeal.list[GameConstants.ShardTraderLocations['Azalea Town']].push(...this.generateAzaleaShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Ecruteak City']].push(...this.generateEcruteakShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Olivine City']].push(...this.generateOlivineShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Cianwood City']].push(...this.generateCianwoodShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Mahogany Town']].push(...this.generateMahoganyShardDeals());
        ShardDeal.list[GameConstants.ShardTraderLocations['Blackthorn City']].push(...this.generateBlackthornShardDeals());
        //Hoenn
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
        //ShardDeal.list[GameConstants.Region.kalos].push(...this.generateKalosShardDeals());
    }

    //Kanto
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

    //Johto
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

    //Hoenn
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
