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

    public areaStatus(): number {
        const itemStatusArray = [super.areaStatus()];
        const deals = GenericDeal.getDeals(this.traderID)?.();

        if ((deals?.length || 0) > 0) {
            const pokemonDeals: PokemonNameType[] = deals
                .flatMap(deal => deal.profits)
                .filter(profit => {
                    if (profit.type === DealCostOrProfitType.Item) {
                        return profit.item.isVisible() && profit.item instanceof PokemonItem;
                    }
                    return false;
                })
                .map(profit => (profit as unknown as ItemDealProfit).item.type) as PokemonNameType[];

            if (!RouteHelper.listCompleted(pokemonDeals, false)) {
                itemStatusArray.push(areaStatus.uncaughtPokemon);
            }

            if (!RouteHelper.listCompleted(pokemonDeals, true)) {
                itemStatusArray.push(areaStatus.uncaughtShinyPokemon);
            }

            if (Settings.getSetting(`--${areaStatus[areaStatus.missingResistant]}`).isUnlocked() && RouteHelper.minPokerus(pokemonDeals) < GameConstants.Pokerus.Resistant) {
                itemStatusArray.push(areaStatus.missingResistant);
            }
        }

        return Math.min(...itemStatusArray);
    }

    public isVisible(): boolean {
        if (super.isVisible()) {
            const deals = GenericDeal.getDeals(this.traderID)?.();
            return deals?.some(deal => deal.isVisible()) ?? true;
        }
        return false;
    }
}
