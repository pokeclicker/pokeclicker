/// <reference path="./Shop.ts"/>

class BerryMasterShop extends Shop {
    constructor(
        public location: GameConstants.BerryTraderLocations,
        public items: Item[],
        public name: string = 'Berry Master',
        requirements?: (Requirement | OneFromManyRequirement)[]
    ) {
        super(items, name, requirements);
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#berryMasterModal').modal('show');
    }

    public amountInput = () => $('#berryMasterModal').find('input[name="amountOfItems"]');
}
