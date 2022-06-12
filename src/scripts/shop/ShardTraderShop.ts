class ShardTraderShop extends Shop {
    constructor(
        public name: string = 'Shard Trader'
    ) {
        super([], name);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#shardTraderModal').modal('show');
    }
}
