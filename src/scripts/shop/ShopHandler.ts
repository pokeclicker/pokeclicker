class ShopHandler {
    static shopObservable: KnockoutObservable<Shop> = ko.observable(new Shop([]));

    public static showShop(shop: Shop) {
        Game.gameState(GameConstants.GameState.idle);
        this.shopObservable(shop);

        Game.gameState(GameConstants.GameState.shop);

    }
}