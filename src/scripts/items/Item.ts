abstract class Item {
    name: KnockoutObservable<string>;
    basePrice: number;
    priceMultiplier: number;

    constructor(name: string, basePrice: number, priceMultiplier: number) {
        this.name = ko.observable(name);
        this.basePrice = basePrice;
        this.priceMultiplier = priceMultiplier;
    }

    public price(): KnockoutComputed<number> {
        return ko.computed(function () {
            return this.basePrice * this.priceMultiplier;
        })
    }

    abstract onBuy();

    abstract onUse();

}
