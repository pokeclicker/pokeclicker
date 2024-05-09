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

        const deals = GemDeals.getDeals(this.shop);
        if (deals) {
            const pokemonDeals = deals.filter(d => d.item.itemType instanceof PokemonItem && d.isVisible()).map(d => d.item.itemType.type) as PokemonNameType[];

            if (!RouteHelper.listCompleted(pokemonDeals, false)) {
                itemStatusArray.push(MapAreaStatus.uncaughtPokemon);
            }

            if (!RouteHelper.listCompleted(pokemonDeals, true)) {
                itemStatusArray.push(MapAreaStatus.uncaughtShinyPokemon);
            }

            if (Settings.getSetting(`--${MapAreaStatus[MapAreaStatus.missingResistant]}`).isUnlocked() && RouteHelper.minPokerus(pokemonDeals) < GameConstants.Pokerus.Resistant) {
                itemStatusArray.push(MapAreaStatus.missingResistant);
            }
        }
        return Math.min(...itemStatusArray);
    }
}
