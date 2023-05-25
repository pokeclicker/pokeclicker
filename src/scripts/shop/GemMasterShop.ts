/// <reference path="./Shop.ts"/>

class GemMasterShop extends Shop {
    constructor(
        public shop: GameConstants.GemShops,
        public name: string = 'Gem Master',
        requirements: (Requirement | OneFromManyRequirement)[] = [],
        hideBeforeUnlocked = false
    ) {
        super([], name, requirements,hideBeforeUnlocked);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#gemMasterModal').modal('show');
    }
}
