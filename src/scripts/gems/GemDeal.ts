type GemCost = {
    gemType: PokemonType,
    amount: number,
}

class GemDeal {
    public gems: GemCost[];
    public item: { itemType: Item, amount: number};
    public static list: Record<GameConstants.GemShops, KnockoutObservableArray<GemDeal>> = {};
    public isVisible(): boolean {
        return this.item.itemType.isVisible();
    }

    constructor(gemCosts: GemCost[], item: Item, itemAmount: number) {
        this.gems = gemCosts;
        this.item = {itemType: item, amount: itemAmount};
    }

    public static generateDeals() {
        GemDeal.list[GameConstants.GemShops.HoennFluteMaster] = ko.observableArray(this.generateHoennFluteDeals());
        GemDeal.list[GameConstants.GemShops.HoennStoneSalesman] = ko.observableArray(this.generateHoennStoneDeals());
        GemDeal.list[GameConstants.GemShops.UnovaFluteMaster] = ko.observableArray(this.generateUnovaFluteDeals());
        GemDeal.list[GameConstants.GemShops.FurfrouGemTrader] = ko.observableArray(this.generateFurfrouDeal());
        GemDeal.list[GameConstants.GemShops.KalosStoneSalesman] = ko.observableArray(this.generateKalosStoneDeals());
        GemDeal.list[GameConstants.GemShops.SilvallyTrader] = ko.observableArray(this.generateAlolaSilvallyDeal());
        GemDeal.list[GameConstants.GemShops.MagikarpJumpGemTrader] = ko.observableArray(this.generateMagikarpJumpDeal());
    }

    private static generateHoennFluteDeals() {
        const list = [];
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Grass, amount: 5000},
                {gemType: PokemonType.Flying, amount: 5000},
                {gemType: PokemonType.Electric, amount: 5000},
            ],
            ItemList.Yellow_Flute,
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Ground, amount: 5000},
                {gemType: PokemonType.Poison, amount: 5000},
                {gemType: PokemonType.Steel, amount: 5000},
            ],
            ItemList.Time_Flute,
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Dark, amount: 5000},
                {gemType: PokemonType.Psychic, amount: 5000},
                {gemType: PokemonType.Fighting, amount: 5000},
            ],
            ItemList.Black_Flute,
            1
        ));
        return list;
    }
    private static generateHoennStoneDeals() {
        const list = [];
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Grass, amount: 125000},
                {gemType: PokemonType.Dragon, amount: 125000},
            ],
            ItemList.Sceptilite,
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Fire, amount: 125000},
                {gemType: PokemonType.Fighting, amount: 125000},
            ],
            ItemList.Blazikenite,
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Water, amount: 125000},
                {gemType: PokemonType.Ground, amount: 125000},
            ],
            ItemList.Swampertite,
            1
        ));
        return list;
    }

    private static generateUnovaFluteDeals() {
        const list = [];

        list.push(new GemDeal(
            [
                {gemType: PokemonType.Fire, amount: 10000},
                {gemType: PokemonType.Rock, amount: 10000},
                {gemType: PokemonType.Dragon, amount: 10000},
            ],
            ItemList.Red_Flute,
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Normal, amount: 10000},
                {gemType: PokemonType.Fairy, amount: 10000},
                {gemType: PokemonType.Ice, amount: 10000},
            ],
            ItemList.White_Flute,
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Water, amount: 10000},
                {gemType: PokemonType.Bug, amount: 10000},
                {gemType: PokemonType.Ghost, amount: 10000},
            ],
            ItemList.Blue_Flute,
            1
        ));
        return list;
    }

    private static generateKalosStoneDeals() {
        const list = [];

        list.push(new GemDeal(
            [
                {gemType: PokemonType.Grass, amount: 125000},
                {gemType: PokemonType.Poison, amount: 125000},
            ],
            ItemList.Venusaurite,
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Fire, amount: 125000},
                {gemType: PokemonType.Dragon, amount: 125000},
            ],
            ItemList.Charizardite_X,
            1
        ));
        list.push(new GemDeal(
            [
                {gemType: PokemonType.Fire, amount: 125000},
                {gemType: PokemonType.Flying, amount: 125000},
            ],
            ItemList.Charizardite_Y,
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Water, amount: 250000}],
            ItemList.Blastoisinite,
            1
        ));
        return list;
    }

    private static generateFurfrouDeal() {
        const list = [];

        list.push(new GemDeal(
            [
                {gemType: PokemonType.Normal, amount: 1000000},
                {gemType: PokemonType.Water, amount: 1000000},
                {gemType: PokemonType.Grass, amount: 500000},
                {gemType: PokemonType.Fighting, amount: 500000},
                {gemType: PokemonType.Poison, amount: 500000},
                {gemType: PokemonType.Ground, amount: 500000},
                {gemType: PokemonType.Flying, amount: 500000},
                {gemType: PokemonType.Bug, amount: 500000},
                {gemType: PokemonType.Rock, amount: 500000},
                {gemType: PokemonType.Fire, amount: 250000},
                {gemType: PokemonType.Electric, amount: 250000},
                {gemType: PokemonType.Ice, amount: 250000},
                {gemType: PokemonType.Ghost, amount: 250000},
                {gemType: PokemonType.Steel, amount: 250000},
                {gemType: PokemonType.Psychic, amount: 250000},
                {gemType: PokemonType.Dragon, amount: 100000},
                {gemType: PokemonType.Dark, amount: 100000},
                {gemType: PokemonType.Fairy, amount: 100000},
            ],
            ItemList['Furfrou (La Reine)'],
            1
        ));
        return list;
    }

    private static generateAlolaSilvallyDeal() {
        const list = [];

        list.push(new GemDeal(
            [{gemType: PokemonType.Fighting, amount: 1000}],
            ItemList['Silvally (Fighting) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Fighting, amount: 75000}],
            ItemList['Silvally (Fighting) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Rock, amount: 1000}],
            ItemList['Silvally (Rock) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Rock, amount: 150000}],
            ItemList['Silvally (Rock) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Dark, amount: 1000}],
            ItemList['Silvally (Dark) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Dark, amount: 45000}],
            ItemList['Silvally (Dark) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Fairy, amount: 1000}],
            ItemList['Silvally (Fairy) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Fairy, amount: 45000}],
            ItemList['Silvally (Fairy) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Water, amount: 1000}],
            ItemList['Silvally (Water) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Water, amount: 250000}],
            ItemList['Silvally (Water) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Grass, amount: 1000}],
            ItemList['Silvally (Grass) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Grass, amount: 150000}],
            ItemList['Silvally (Grass) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Fire, amount: 1000}],
            ItemList['Silvally (Fire) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Fire, amount: 150000}],
            ItemList['Silvally (Fire) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Electric, amount: 1000}],
            ItemList['Silvally (Electric) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Electric, amount: 150000}],
            ItemList['Silvally (Electric) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Ice, amount: 1000}],
            ItemList['Silvally (Ice) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Ice, amount: 75000}],
            ItemList['Silvally (Ice) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Ground, amount: 1000}],
            ItemList['Silvally (Ground) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Ground, amount: 150000}],
            ItemList['Silvally (Ground) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Bug, amount: 1000}],
            ItemList['Silvally (Bug) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Bug, amount: 150000}],
            ItemList['Silvally (Bug) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Flying, amount: 1000}],
            ItemList['Silvally (Flying) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Flying, amount: 250000}],
            ItemList['Silvally (Flying) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Poison, amount: 1000}],
            ItemList['Silvally (Poison) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Poison, amount: 150000}],
            ItemList['Silvally (Poison) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Ghost, amount: 1000}],
            ItemList['Silvally (Ghost) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Ghost, amount: 75000}],
            ItemList['Silvally (Ghost) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Psychic, amount: 1000}],
            ItemList['Silvally (Psychic) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Psychic, amount: 75000}],
            ItemList['Silvally (Psychic) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Steel, amount: 1000}],
            ItemList['Silvally (Steel) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Steel, amount: 45000}],
            ItemList['Silvally (Steel) 2'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Dragon, amount: 1000}],
            ItemList['Silvally (Dragon) 1'],
            1
        ));
        list.push(new GemDeal(
            [{gemType: PokemonType.Dragon, amount: 45000}],
            ItemList['Silvally (Dragon) 2'],
            1
        ));
        return list;
    }

    private static generateMagikarpJumpDeal() {
        const list = [];

        list.push(new GemDeal(
            [{gemType: PokemonType.Water, amount: 1500000}],
            ItemList['Magikarp Brown Stripes'],
            1
        ));
        return list;
    }

    public static getDeals(shop: Shop) {
        if (shop instanceof GemMasterShop) {
            return GemDeal.list[shop.shop]();
        }
        return [];
    }

    public static canUse(shop: Shop, i: number): boolean {
        if (shop instanceof GemMasterShop) {
            const deal = GemDeal.list[shop.shop].peek()[i];
            if (ItemList[deal.item.itemType.name].isSoldOut()) {
                return false;
            } else {
                return deal.gems.every((value) => App.game.gems.gemWallet[value.gemType]() >= value.amount);
            }
        }
        return false;
    }

    public static use(shop: Shop, i: number, tradeTimes = 1) {
        if (shop instanceof GemMasterShop) {
            const deal = GemDeal.list[shop.shop].peek()[i];
            if (!App.game.badgeCase.hasBadge(BadgeEnums.Heat)) {
                Notifier.notify({
                    message: 'You are unable to use Flutes yet.\n<i>Visit the Gym in Lavaridge Town.</i>',
                    type: NotificationConstants.NotificationOption.danger,
                });
                return false;
            }
            if (GemDeal.canUse(shop, i)) {
                const trades = deal.gems.map(gem => {
                    const amt = App.game.gems.gemWallet[gem.gemType]();
                    const maxTrades = Math.floor(amt / gem.amount);
                    return maxTrades;
                });
                const maxTrades = trades.reduce((a,b) => Math.min(a,b), tradeTimes);
                deal.gems.forEach((value) =>
                    GameHelper.incrementObservable(App.game.gems.gemWallet[value.gemType], -value.amount * maxTrades));
                deal.item.itemType.gain(deal.item.amount * maxTrades);
            }
        }
        return false;
    }
}
