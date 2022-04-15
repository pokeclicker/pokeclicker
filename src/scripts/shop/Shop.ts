///<reference path="../towns/TownContent.ts"/>

class Shop extends TownContent {
    public cssClass() {
        return ko.pureComputed(() => {
            return 'btn btn-secondary';
        });
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
    constructor(
        public items: Item[],
        public name = undefined,
        requirements: (Requirement | OneFromManyRequirement)[] = []
    ) {
        super(requirements);
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
}
