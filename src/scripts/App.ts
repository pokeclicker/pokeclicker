class App {

    static readonly debug = false;
    static game: Game;

    static start() {
        if (!App.debug) {
            Object.freeze(GameConstants);
        }

        Preload.load(App.debug).then(() => {
            ko.options.deferUpdates = true;
            
            console.log(`[${GameConstants.formatDate(new Date())}] %cLoading Game Data..`, 'color:#8e44ad;font-weight:900;');
            // Needs to be loaded first so save data can be updated (specifically "player" data)
            const update = new Update();

            UndergroundItem.initialize();
            player = Save.load();
            App.game = new Game(
                update,
                new Breeding(),
                new Pokeballs(),
                new Wallet(),
                new KeyItems(),
                new BadgeCase(),
                new OakItems([20, 50, 100]),
                new Party(),
                new Shards(),
                new Farming(),
                new LogBook(),
                new RedeemableCodes(),
                new Statistics(),
                new Quests(),
                new SpecialEvents(),
                new Discord()
            );

            console.log(`[${GameConstants.formatDate(new Date())}] %cGame loaded`, 'color:#8e44ad;font-weight:900;');
            Notifier.notify({ message: 'Game loaded', type: GameConstants.NotificationOption.info });

            GameController.bindToolTips();
            GameController.addKeyListeners();

            PokedexHelper.populateTypeFilters();
            PokedexHelper.updateList();

            App.game.initialize();
            ko.applyBindings(App.game);

            GameController.applyRouteBindings();
            Preload.hideSplashScreen();

            App.game.start();

        });
    }
}
