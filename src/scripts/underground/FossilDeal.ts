type FossilPieceCost = {
    fossilPieceTypeString: string,
    fossilPieceType?: UndergroundItem,
    amount: number,
}

class FossilDeal {
    public fossilpieces: FossilPieceCost[];
    public item: { itemType: Item, amount: number};
    public questPointCost: number;
    public static list: Record<GameConstants.FossilMasterLocations, KnockoutObservableArray<FossilDeal>> = {};

    constructor(fossilPieceCosts: FossilPieceCost[], item: Item, itemAmount: number) {
        this.fossilpieces = fossilPieceCosts;
        this.fossilpieces.forEach(s => s.fossilPieceType = UndergroundItems.getByName(s.fossilPieceTypeString));
        this.item = {itemType: item, amount: itemAmount};
        this.questPointCost = 10000;
    }

    public static getDeals(town: GameConstants.FossilMasterLocations) {
        return FossilDeal.list[town];
    }

    public static canUse(town: GameConstants.FossilMasterLocations, i: number): boolean {
        const deal = FossilDeal.list[GameConstants.FossilMasterLocations[town]]?.peek()[i];
        if (!deal) {
            return false;
        }
        if (ItemList[deal.item.itemType.name].isSoldOut()) {
            return false;
        } else if (deal.questPointCost > App.game.wallet.currencies[GameConstants.Currency.questPoint]()) {
            return false;
        } else {
            return deal.shards.every((value) => player.getUndergroundItemAmount(value.fossilPieceType.id) >= value.amount);
        }
    }

    public static use(town: GameConstants.FossilMasterLocations, i: number, tradeTimes = 1) {
        const deal = FossilDeal.list[GameConstants.FossilMasterLocations[town]]?.peek()[i];
        if (FossilDeal.canUse(town, i)) {
            const trades = deal.fossilpieces.map(fossilpiece => {
                const amt = player.getUndergroundItemAmount(fossilpiece.fossilPieceType.id);
                const maxFossilTrades = Math.floor(amt / fossilpiece.amount);
                return maxFossilTrades;
            });
            const qp = App.game.wallet.currencies[GameConstants.Currency.questPoint]();
            const maxCurrencyTrades = Math.floor(qp / deal.questPointCost);
            const maxTrades = Math.min(maxCurrencyTrades,trades.reduce((a,b) => Math.min(a,b), tradeTimes));
            deal.fossilpieces.forEach((value) => Underground.gainMineItem(value.fossilPieceType.id, -value.amount * maxTrades));

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
        this.generateGalarDeals();
    }

    public static generateGalarDeals() {
        FossilDeal.list[GameConstants.FossilMasterLocations['Stow-on-Side']] = ko.observableArray(
            [
                new FossilDeal(
                    [
                        {fossilPieceTypeString: 'Fossilized Bird', amount: 1},
                        {fossilPieceTypeString: 'Fossilized Drake', amount: 1},
                    ],
                    ItemList.Dracozolt,
                    1),
                new FossilDeal(
                    [
                        {fossilPieceTypeString: 'Fossilized Bird', amount: 1},
                        {fossilPieceTypeString: 'Fossilized Dino', amount: 1},
                    ],
                    ItemList.Arctozolt,
                    1),
                new FossilDeal(
                    [
                        {fossilPieceTypeString: 'Fossilized Fish', amount: 1},
                        {fossilPieceTypeString: 'Fossilized Drake', amount: 1},
                    ],
                    ItemList.Dracovish,
                    1),
                new FossilDeal(
                    [
                        {fossilPieceTypeString: 'Fossilized Fish', amount: 1},
                        {fossilPieceTypeString: 'Fossilized Dino', amount: 1},
                    ],
                    ItemList.Arctovish,
                    1),
            ]
        );
    }
}
