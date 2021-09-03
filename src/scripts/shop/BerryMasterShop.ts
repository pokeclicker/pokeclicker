class BerryMasterShop extends Shop {
    constructor(
        public items: Item[],
        public name: string = 'Berry Master',
        public href = '#berryMasterModal'
    ) {
        super(items, name, href);
    }
}

