class ShardMasterShop extends Shop {
    constructor(
        public items: Item[],
        public name: string = 'Shard Master'
    ) {
        super(items, name);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#shardMasterModal').modal('show');
    }
}
