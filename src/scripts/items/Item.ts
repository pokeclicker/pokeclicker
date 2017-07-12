abstract class Item {
    name: KnockoutObservable<string>;
    basePrice: number;
    type: any;
    currency: GameConstants.Currency;
    price: KnockoutObservable<number>;

    constructor(name: string, basePrice: number, priceMultiplier: number, currency: GameConstants.Currency) {
        this.name = ko.observable(name);
        this.basePrice = basePrice;
        this.currency = currency;
        this.price = ko.observable(this.basePrice);
    }

    abstract buy(n: number);

    abstract use();

    increasePriceMultiplier(n = 1) {
        player.itemMultipliers[this.name()] = player.itemMultipliers[this.name()] * Math.pow(GameConstants.ITEM_PRICE_MULTIPLIER, n);
        this.price(Math.round(this.basePrice * player.itemMultipliers[this.name()]));
    }

    decreasePriceMultiplier(n = 1) {
        player.itemMultipliers[this.name()] = Math.max(1, player.itemMultipliers[this.name()] - GameConstants.ITEM_PRICE_DEDUCT);
        this.price(Math.round(this.basePrice * player.itemMultipliers[this.name()]));
    }

    public static initializeMultipliers(): { [name: string]: number } {
        let res = {};
        for (let obj in ItemList) {
            res[obj] = 1;
        }
        return res;
    }

    public static initializeItemlist(): { [name: string]: number } {
        let res = {};
        for (let obj in ItemList) {
            res[obj] = 0;
        }
        return res;
    }

}

const ItemList: { [name: string]: Item } = {};
