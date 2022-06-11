class BerryMasterShop extends Shop {
    constructor(
        public items: Item[],
        public name: string = 'Berry Master'
    ) {
        super(items, name);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#berryMasterModal').modal('show');
    }

    public amountInput = () => $('#berryMasterModal').find('input[name="amountOfItems"]');
}

