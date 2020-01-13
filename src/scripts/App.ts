class App {

    static readonly debug = false;
    static game: Game;

    static start() {
        if (!App.debug) {
            Object.freeze(GameConstants);
        }

        Preload.load(App.debug).then(function () {
            UndergroundItem.initialize();
            App.game = new Game(
                new Breeding(),
                new Pokeballs(),
                new Wallet(),
                new KeyItems(),
                new BadgeCase(BadgeCase.Badge.Elite_JohtoChampion),
                new OakItems([20, 50, 100]),
                new Party(),
                new Farming(),
                new World(),
                new RedeemableCodes()
            );

            Notifier.notify('Game loaded', GameConstants.NotificationOption.info);

            GameController.bindToolTips();
            GameController.addKeyListeners();

            PokedexHelper.populateTypeFilters();
            PokedexHelper.updateList();

            App.game.initialize();
            App.game.load();
            ko.applyBindings(App.game);
            ko.options.deferUpdates = true;

            GameController.applyRouteBindings();
            Preload.hideSplashScreen();

            App.game.start();

        });
    }
}
