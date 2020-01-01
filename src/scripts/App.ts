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
            App.game = new Game(new Breeding(), new Pokeballs(), new Wallet(), new BadgeCase(BadgeCase.Badge.Elite_JohtoChampion + 1));

            KeyItemHandler.initialize();
            AchievementHandler.initialize();
            player.gainKeyItem("Coin case", true);
            player.gainKeyItem("Teachy tv", true);
            player.gainKeyItem("Pokeball bag", true);
            Notifier.notify("Game loaded", GameConstants.NotificationOption.info);

            GameController.bindToolTips();
            GameController.addKeyListeners();

            PokedexHelper.populateTypeFilters();
            PokedexHelper.updateList();

            ko.applyBindings(App.game);
            ko.options.deferUpdates = true;

            GameController.applyRouteBindings();
            Preload.hideSplashScreen();

            App.game.initialize();
            App.game.start();

        });
    }
}
