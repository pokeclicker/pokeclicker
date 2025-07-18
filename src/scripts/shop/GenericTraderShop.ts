/// <reference path="./Shop.ts"/>

class GenericTraderShop extends Shop {
    constructor(
        public traderID: GenericTraderShopIdentifier,
        public traderName: string = 'Trader',
        public hidePlayerInventory: boolean = false,
        requirements: (Requirement | OneFromManyRequirement)[] = []
    ) {
        super([], traderName, requirements);
    }

    public onclick() {
        ShopHandler.showShop(this);
        $('#genericTraderModal').modal('show');
    }

    public areaStatus() {
        const itemStatusArray = super.areaStatus();
        if (itemStatusArray.includes(areaStatus.locked)) {
            return [areaStatus.locked];
        }
        const deals = GenericDeal.getDeals(this.traderID)?.();

        if (deals?.length) {
            const pokemonDeals: PokemonNameType[] = deals
                .flatMap(deal => deal.profits)
                .filter(profit => {
                    if (profit.type === DealCostOrProfitType.Item) {
                        return profit.item.isVisible() && profit.item instanceof PokemonItem;
                    }
                    return false;
                })
                .map(profit => (profit as unknown as ItemDealProfit).item.type) as PokemonNameType[];
            const statuses = MapHelper.getPokemonAreaStatus(pokemonDeals);
            itemStatusArray.push(...statuses);
        }

        return [...new Set(itemStatusArray)];
    }

    public isVisible(): boolean {
        if (super.isVisible()) {
            const deals = GenericDeal.getDeals(this.traderID)?.();
            return deals?.some(deal => deal.isVisible()) ?? true;
        }
        return false;
    }
}
