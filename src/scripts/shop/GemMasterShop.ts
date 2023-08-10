/// <reference path="./Shop.ts"/>

class GemMasterShop extends Shop {
    constructor(
        public shop: GameConstants.GemShops,
        public name: string = 'Gem Master',
        requirements: (Requirement | OneFromManyRequirement)[] = [],
        hideBeforeUnlocked = false
    ) {
        super([], name, requirements,hideBeforeUnlocked);
    }

    public onclick(): void {
        ShopHandler.showShop(this);
        $('#gemMasterModal').modal('show');
    }

    public areaStatus() {
        const itemStatusArray = [super.areaStatus()];

        const deals = GemDeal.getDeals(this);
        if (deals) {
            const pokemonDeals = deals.filter(d => d.item.itemType instanceof PokemonItem && d.isVisible()).map(d => d.item.itemType.type) as PokemonNameType[];

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
}
