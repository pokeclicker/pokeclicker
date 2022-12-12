type GemCost = {
    gemType: PokemonType,
    amount: number,
}

class GemDeal {
    public gems: GemCost[];
    public item: { itemType: Item, amount: number};
    public static list: Record<GameConstants.Region, KnockoutObservableArray<GemDeal>> = {};

    constructor(gemCosts: GemCost[], item: Item, itemAmount: number) {
        this.gems = gemCosts;
        this.item = {itemType: item, amount: itemAmount};
    }

    public static generateDeals() {
        const gemMasterRegions = [GameConstants.Region.hoenn, GameConstants.Region.unova, GameConstants.Region.kalos, GameConstants.Region.alola];

        for (const region of gemMasterRegions) {
            if (!GemDeal.list[region]) {
                GemDeal.list[region] = ko.observableArray();
            } else {
                GemDeal.list[region].removeAll();
            }
        }

        GemDeal.list[GameConstants.Region.hoenn].push(...this.generateHoennFluteDeals());
        GemDeal.list[GameConstants.Region.unova].push(...this.generateUnovaFluteDeals());
        GemDeal.list[GameConstants.Region.kalos].push(...this.generateFurfrouDeal());
        GemDeal.list[GameConstants.Region.alola].push(...this.generateMagikarpJumpDeal());
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

    private static generateMagikarpJumpDeal() {
        const list = [];

        list.push(new GemDeal(
            [{gemType: PokemonType.Water, amount: 1500000}],
            ItemList['Magikarp Brown Stripes'],
            1
        ));
        return list;
    }

    public static getDeals(region: GameConstants.Region) {
        return GemDeal.list[region];
    }

    public static canUse(region: GameConstants.Region, i: number): boolean {
        const deal = GemDeal.list[region].peek()[i];
        if (ItemList[deal.item.itemType.name].isSoldOut()) {
            return false;
        } else {
            return deal.gems.every((value) => App.game.gems.gemWallet[value.gemType]() >= value.amount);
        }
    }

    public static use(region: GameConstants.Region, i: number, tradeTimes = 1) {
        const deal = GemDeal.list[region].peek()[i];
        if (!App.game.badgeCase.hasBadge(BadgeEnums.Heat)) {
            Notifier.notify({
                message: 'You are unable to use Flutes yet.\n<i>Visit the Gym in Lavaridge Town.</i>',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        if (GemDeal.canUse(region, i)) {
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

    public static isFluteDeal(region: GameConstants.Region, i: number): boolean {
        const deal = GemDeal.list[region].peek()[i];
        return deal.item.itemType instanceof FluteItem;
    }
}
