class ShardMasterShop extends Shop {
    constructor(
        public items: Item[],
        public name: string = 'Shard Master',
        public href = '#shardMasterModal'
    ) {
        super(items, name, href);
    }
}

