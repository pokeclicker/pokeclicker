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
}
