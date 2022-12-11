/// <reference path="./Shop.ts"/>

class GemMasterShop extends Shop {
    constructor(
        public name: string = 'Gem Master',
        requirements: (Requirement | OneFromManyRequirement)[] = []
    ) {
        super([], name, requirements);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#gemMasterModal').modal('show');
    }
}
