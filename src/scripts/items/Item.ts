///<reference path="../shop/ShopHandler.ts"/>
abstract class Item {
    name: KnockoutObservable<string>;
    basePrice: number;
    type: any;
    currency: GameConstants.Currency;
    price: KnockoutObservable<number>;
    totalPrice: KnockoutComputed<number>;

    constructor(name: string, basePrice: number, priceMultiplier: number, currency: GameConstants.Currency) {
        this.name = ko.observable(name);
        this.basePrice = basePrice;
        this.currency = currency;
        this.price = ko.observable(this.basePrice);
        this.totalPrice = name === "Pokeball" ?
            ko.computed(() => {
                let amount: number;
                if (ShopHandler == null) {
                    amount = 1;
                } else {
                    amount = ShopHandler.amount();
                }
                return basePrice * amount;
            }) :
            ko.computed(() => {
                let amount: number;
                if (ShopHandler == null) {
                    amount = 1;
                } else {
                    amount = ShopHandler.amount();
                }
                let res = (this.price() * (1 - Math.pow(GameConstants.ITEM_PRICE_MULTIPLIER, amount))) / (1 - GameConstants.ITEM_PRICE_MULTIPLIER);
                return Math.floor(res);
            })
    }

    abstract buy(n: number);

    abstract use();

    isAvailable(): boolean {
        return true;
    }

    protected _increaseCount(n: number) {
        player.itemList[this.name()](player.itemList[this.name()]() + n);
    }

    protected _decreaseCount(n: number) {
        player.itemList[this.name()](player.itemList[this.name()]() - n);
    }

    increasePriceMultiplier(n = 1) {
        player.itemMultipliers[this.name()] = player.itemMultipliers[this.name()] * Math.pow(GameConstants.ITEM_PRICE_MULTIPLIER, n);
        this.price(Math.round(this.basePrice * player.itemMultipliers[this.name()]));
    }

    decreasePriceMultiplier(n = 1) {
        player.itemMultipliers[this.name()] = Math.max(1, player.itemMultipliers[this.name()] / Math.pow(GameConstants.ITEM_PRICE_DEDUCT, n));
        this.price(Math.round(this.basePrice * player.itemMultipliers[this.name()]));
    }

}

const ItemList: { [name: string]: Item } = {};
