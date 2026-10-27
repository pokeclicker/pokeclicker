///<reference path="../towns/TownContent.ts"/>

class Shop extends TownContent {
    public cssClass() {
        return 'btn btn-secondary';
    }
    public text(): string {
        return this.name ?? App.translation.ui('shop.pokeMart', 'Poké Mart');
    }
    public isVisible(): boolean {
        if (!super.isVisible()) {
            return false;
        }
        return !(this.hideBeforeUnlocked && !this.isUnlocked());
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#shopModal').modal('show');
    }
    public tooltip = 'Visit shops to buy items.';
    constructor(
        public items: Item[],
        public name: string | undefined = undefined,
        requirements: (Requirement | OneFromManyRequirement)[] = [],
        private hideBeforeUnlocked = false
    ) {
        super(requirements);
    }

    public areaStatus() {
        const itemStatusArray = super.areaStatus();
        if (itemStatusArray.includes(areaStatus.locked)) {
            return [areaStatus.locked];
        }
        const pokemon = this.items.filter(i => i instanceof PokemonItem).map(i => i.type);
        itemStatusArray.push(...MapHelper.getPokemonAreaStatus(pokemon));
        return itemStatusArray;
    }

    get displayName() {
        if (this.name) {
            return this.name;
        }
        if (!this.parent) {
            return App.translation.ui('shop.pokeMart', 'Poké Mart');
        }
        return App.translation.ui('shop.pokeMartOf', 'Poké Mart {{town}}', { town: this.parent.name });
    }

    public amountInput = () => $('#shopModal').find('input[name="amountOfItems"]');
}
