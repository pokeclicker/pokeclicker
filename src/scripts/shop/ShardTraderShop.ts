/// <reference path="./Shop.ts"/>

class ShardTraderShop extends Shop {
    constructor(
        public location: GameConstants.ShardTraderLocations,
        public name: string = 'Shard Trader',
        public hidePlayerInventory: boolean = false,
        public currencyName: string = 'Shards'
    ) {
        super([], name);
    }

    public onclick(): void {
        ShopHandler.showShop(this);
        $('#shardTraderModal').modal('show');
    }

    public areaStatus() {
        const itemStatusArray = [super.areaStatus()];

        const deals = ShardDeal.getDeals(this.location)?.();
        if (deals) {
            const pokemonDeals = deals.filter(d => d.item.itemType instanceof PokemonItem && d.item.itemType.isVisible()).map(d => d.item.itemType.type) as PokemonNameType[];

            if (!RouteHelper.listCompleted(pokemonDeals, false)) {
                itemStatusArray.push(AreaStatus.uncaughtPokemon);
            }

            if (!RouteHelper.listCompleted(pokemonDeals, true)) {
                itemStatusArray.push(AreaStatus.uncaughtShinyPokemon);
            }

            if (Settings.getSetting(`--${AreaStatus[AreaStatus.missingResistant]}`).isUnlocked() && RouteHelper.minPokerus(pokemonDeals) < GameConstants.Pokerus.Resistant) {
                itemStatusArray.push(AreaStatus.missingResistant);
            }
        }
        return Math.min(...itemStatusArray);
    }

    public isVisible(): boolean {
        if (super.isVisible()) {
            const deals = ShardDeal.getDeals(this.location)?.();
            return deals?.some(d => d.item.itemType.isVisible()) ?? true;
        }
        return false;
    }
}
