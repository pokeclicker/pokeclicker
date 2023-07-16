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
            const pokemonDeals = deals.filter(d => d.item.itemType instanceof PokemonItem).map(d => d.item.itemType.type) as PokemonNameType[];

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
