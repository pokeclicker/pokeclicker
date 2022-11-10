/// <reference path="./Shop.ts"/>

class GemMasterShop extends Shop {
    constructor(
        public name: string = 'Gem Master'
    ) {
        super([], name);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#gemMasterModal').modal('show');
    }
}
