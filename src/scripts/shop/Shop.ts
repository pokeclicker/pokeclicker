class Shop {
    constructor(
        public items: Item[],
        public name = 'Poké Mart',
        public href = '#shopModal'
    ) { }

    get displayName() {
        return this.name;
    }
}
