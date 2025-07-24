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

    public areaStatus() {
        const itemStatusArray = super.areaStatus();
        if (itemStatusArray.includes(areaStatus.locked)) {
            return [areaStatus.locked];
        }

        const berryListIndex = GameConstants.BerryTraderLocations[this.parent.name];
        if (berryListIndex > -1) {
            const berryDeals = BerryDeal.list[berryListIndex]();
            const berryTraderPokemon = berryDeals.filter(d => d.item.itemType instanceof PokemonItem).map(d => d.item.itemType.type) as PokemonNameType[];
            const statuses = MapHelper.getPokemonAreaStatus(berryTraderPokemon);
            itemStatusArray.push(...statuses);
        }
        return [...new Set(itemStatusArray)];
    }

}
