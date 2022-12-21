/// <reference path="./Shop.ts"/>

class ShardTraderShop extends Shop {
    constructor(
        public location: GameConstants.ShardTraderLocations,
        public name: string = 'Shard Trader'
    ) {
        super([], name);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#shardTraderModal').modal('show');
    }
}
