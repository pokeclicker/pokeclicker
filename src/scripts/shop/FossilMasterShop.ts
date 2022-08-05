class FossilMasterShop extends Shop {
    constructor(
        public location: GameConstants.FossilMasterLocations,
        public name: string = 'Fossil Master'
    ) {
        super([], name);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#fossilMasterModal').modal('show');
    }
}
