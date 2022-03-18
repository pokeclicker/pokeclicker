class GemMasterShop extends Shop {
    constructor(
        public items: Item[],
        public name: string = 'Gem Master',
        public href = '#gemMasterModal'
    ) {
        super(items, name, href);
    }
}
