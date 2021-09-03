class TownShop extends Shop {
    constructor(
        public items: Item[],
        public name = 'Poké Mart',
        public href = '#shopModal'
    ) {
        super(items, name, href);
    }

    get displayName() {
        const name = [];
        // Show town name first
        if (player.town()) {
            name.push(player.town().name);
        }
        // Show shop name or "Shop"
        name.push(this.name);
        return name.join(' ');
    }
}
