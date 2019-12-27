class App {

    static readonly debug = false;

    static start() {
        if (!App.debug)
            Object.freeze(GameConstants);

        Preload.load(App.debug).then(function () {
            OakItemRunner.initialize();
            UndergroundItem.initialize();
            game = new Game();

            Notifier.notify("Game loaded", GameConstants.NotificationOption.info);

            GameController.bindToolTips();

            PokedexHelper.populateTypeFilters();
            PokedexHelper.updateList();

            ko.applyBindings(game);
            ko.options.deferUpdates = true;

            GameController.applyRouteBindings();
            Preload.hideSplashScreen();
            game.start();

        });
    }
}
