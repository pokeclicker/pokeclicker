class App {

    static readonly debug = false;
    static game: Game;

    static start() {
        if (!App.debug) {
            Object.freeze(GameConstants);
        }

        Preload.load(App.debug).then(function () {
            OakItemRunner.initialize();
            UndergroundItem.initialize();
            App.game = new Game(
                new Breeding(),
                new Pokeballs(),
                new Wallet(),
                new KeyItems(),
                );

            Notifier.notify("Game loaded", GameConstants.NotificationOption.info);

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
