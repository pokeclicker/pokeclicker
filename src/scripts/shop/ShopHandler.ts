///<reference path="Shop.ts"/>
class ShopHandler {
    static shopObservable: KnockoutObservable<Shop> = ko.observable(new Shop([]));
    static selected: KnockoutObservable<number> = ko.observable(0);
    static amount: KnockoutObservable<number> = ko.observable(1);

    public static showShop(shop: Shop) {
        this.setSelected(0);
        this.resetAmount();
        this.shopObservable(shop);

        for (let i = 0; i < shop.items().length; i++) {
            let item: Item = shop.items()[i];
            item.price(Math.round(item.basePrice * player.itemMultipliers[item.name()]));
        }
    }

    public static setSelected(i: number) {
        this.selected(i);
    }

    public static buyItem() {
        let item: Item = this.shopObservable().items()[ShopHandler.selected()];
        item.buy(this.amount());
        ShopHandler.resetAmount();
    }

    public static resetAmount() {
        let input = $("input[name='amountOfItems']");
        input.val(1).change();
    }

    public static increaseAmount(n: number) {
        let input = $("input[name='amountOfItems']");
        let newVal = (parseInt(input.val().toString()) || 0) + n;
        input.val(newVal > 1 ? newVal : 1).change();
    }

    public static maxAmount(n: number) {
        const item: Item = this.shopObservable().items()[ShopHandler.selected()];
        const input = $("input[name='amountOfItems']");

        if (!item || !item.isAvailable()){
          return input.val(0).change();
        }
        
        input.val(item.maxAmount(App.game.wallet.currencies[item.currency])).change();
    }

    public static calculateCss(i: number): string {
        if (this.selected() == i) {
            return "shopItem clickable btn btn-secondary active"
        } else {
            return "shopItem clickable btn btn-secondary"
        }
    }

    public static calculateButtonCss(): string {
        let item: Item = this.shopObservable().items()[ShopHandler.selected()];

        if (item && !(item.isAvailable() && App.game.wallet.hasAmount(new Amount(item.totalPrice(this.amount()), item.currency)))
                || this.amount() < 1) {
            return "btn btn-danger smallButton smallFont"
        } else {
            return "btn btn-success smallButton smallFont"
        }
    }
}
