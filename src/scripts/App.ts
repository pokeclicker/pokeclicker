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
            App.game = new Game(new Breeding());

            Notifier.notify("Game loaded", GameConstants.NotificationOption.info);

            GameController.bindToolTips();

            PokedexHelper.populateTypeFilters();
            PokedexHelper.updateList();

            ko.applyBindings(App.game);
            ko.options.deferUpdates = true;

            GameController.applyRouteBindings();
            Preload.hideSplashScreen();
            App.game.start();

        });
    }
}
