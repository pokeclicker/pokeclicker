class GemMasterShop extends Shop {
    constructor(
        public items: Item[],
        public name: string = 'Gem Master'
    ) {
        super(items, name);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#gemMasterModal').modal('show');
    }
}
