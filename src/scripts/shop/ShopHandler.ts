class ShopHandler {
    static shopObservable: KnockoutObservable<Shop> = ko.observable(new Shop([]));
    static selected: KnockoutObservable<number> = ko.observable(-1);


    public static showShop(shop: Shop) {
        Game.gameState(GameConstants.GameState.idle);

        this.shopObservable(shop);

        Game.gameState(GameConstants.GameState.shop);

    }

    public static setSelected(i: number) {
        this.selected(i);
    }

    public static buyItem(i: number) {
        let item: Item = this.shopObservable().items()[i];

        if (player.hasMoney(item.price())) {
            player.payMoney(item.price());
            item.buy();
            item.increasePriceMultiplier();
        } else {
            //TODO make alert that shows you don't have enough money
        }

    }

    public static resetAmount() {
        let input = $("input[name='amountOfItems']");
        input.val(1).change()
    }

    public static increaseAmount(n: number) {
        let input = $("input[name='amountOfItems']");
        let currentVal: number = parseInt(input.val().toString());
        input.val(currentVal + n).change()
    }

    public static calculateCss(i: number): string {
        if (this.selected() == i) {
            return "shopItem clickable btn shopItemSelected"
        } else {
            return "shopItem clickable btn"
        }
    }
}