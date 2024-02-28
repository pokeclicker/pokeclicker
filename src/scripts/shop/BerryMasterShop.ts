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
        const itemStatusArray = [super.areaStatus()];

        const berryListIndex = GameConstants.BerryTraderLocations[this.parent.name];
        if (berryListIndex > -1) {
            const berryDeals = BerryDeal.list[berryListIndex]();
            const berryTraderPokemon = berryDeals.filter(d => d.item.itemType instanceof PokemonItem).map(d => d.item.itemType.type) as PokemonNameType[];

            if (!RouteHelper.listCompleted(berryTraderPokemon, false)) {
                itemStatusArray.push(AreaStatus.uncaughtPokemon);
            }

            if (!RouteHelper.listCompleted(berryTraderPokemon, true)) {
                itemStatusArray.push(AreaStatus.uncaughtShinyPokemon);
            }

            if (Settings.getSetting(`--${AreaStatus[AreaStatus.missingResistant]}`).isUnlocked() && RouteHelper.minPokerus(berryTraderPokemon) < GameConstants.Pokerus.Resistant) {
                itemStatusArray.push(AreaStatus.missingResistant);
            }
        }
        return Math.min(...itemStatusArray);
    }

}
