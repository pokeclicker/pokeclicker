///<reference path="../towns/TownContent.ts"/>

class Shop extends TownContent {
    public cssClass() {
        return 'btn btn-secondary';
    }
    public text(): string {
        return this.name ?? 'Poké Mart';
    }
    public isVisible(): boolean {
        return true;
    }
    public onclick(): void {
        ShopHandler.showShop(this);
        $('#shopModal').modal('show');
    }
    public tooltip = 'Visit shops to buy items.';
    constructor(
        public items: Item[],
        public name = undefined,
        requirements: (Requirement | OneFromManyRequirement)[] = []
    ) {
        super(requirements);
    }

    public areaStatus() {
        const itemStatusArray = [areaStatus.completed];
        this.items.forEach(i => {
            if (i instanceof PokemonItem) {
                if (i.getCaughtStatus() == CaughtStatus.NotCaught) {
                    itemStatusArray.push(areaStatus.uncaughtPokemon);
                } else if (i.getCaughtStatus() == CaughtStatus.Caught) {
                    itemStatusArray.push(areaStatus.uncaughtShinyPokemon);
                } else if (i.getPokerusStatus() < GameConstants.Pokerus.Resistant) {
                    itemStatusArray.push(areaStatus.missingResistant);
                }
            }
        });
        return Math.min(...itemStatusArray);
    }

    get displayName() {
        if (this.name) {
            return this.name;
        }
        if (!this.parent) {
            return 'Poké Mart';
        }
        return `Poké Mart ${this.parent.name}`;
    }

    public amountInput = () => $('#shopModal').find('input[name="amountOfItems"]');
}
