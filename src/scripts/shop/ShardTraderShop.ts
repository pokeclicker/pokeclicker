/// <reference path="./Shop.ts"/>

class ShardTraderShop extends Shop {
    constructor(
        public location: GameConstants.ShardTraderLocations,
        public name: string = 'Shard Trader',
        public hidePlayerInventory: boolean = false,
        public currencyName: string = 'Item'
    ) {
        super([], name);
    }

    public onclick(): void {
        ShopHandler.showShop(this);
        $('#shardTraderModal').modal('show');
    }

    public areaStatus() {
        const itemStatusArray = super.areaStatus();
        if (itemStatusArray.includes(areaStatus.locked)) {
            return [areaStatus.locked];
        }

        const deals = ShardDeal.getDeals(this.location)?.();
        if (deals) {
            const pokemonDeals = deals.filter(d => d.item.itemType instanceof PokemonItem && d.item.itemType.isVisible()).map(d => d.item.itemType.type) as PokemonNameType[];
            const statuses = MapHelper.getPokemonAreaStatus(pokemonDeals);
            itemStatusArray.push(...statuses);
        }
        return [...new Set(itemStatusArray)];
    }

    public isVisible(): boolean {
        if (super.isVisible()) {
            const deals = ShardDeal.getDeals(this.location)?.();
            return deals?.some(d => d.item.itemType.isVisible()) ?? true;
        }
        return false;
    }
}
