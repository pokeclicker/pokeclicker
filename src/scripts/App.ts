/// <reference path="../declarations/TemporaryScriptTypes.d.ts" />
/// <reference path="../declarations/DataStore/BadgeCase.d.ts" />
/// <reference path="../declarations/party/Category.d.ts"/>

class App {

    static readonly debug = false;
    static game: Game;
    static readonly isUsingClient = typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0;
    static translation = new Translate(Settings.getSetting('translation.language'));

    static start() {
        // Hide tooltips that stay on game load
        $('.tooltip').tooltip('hide');

        if (!App.debug) {
            Object.freeze(GameConstants);
        }

        Preload.load(App.debug).then(() => {
            ko.options.deferUpdates = true;

            console.log(`[${GameConstants.formatDate(new Date())}] %cLoading Game Data..`, 'color:#8e44ad;font-weight:900;');

            App.game = new Game();

            console.log(`[${GameConstants.formatDate(new Date())}] %cGame loaded`, 'color:#2ecc71;font-weight:900;');
            Notifier.notify({ message: 'Game loaded', type: NotificationConstants.NotificationOption.info });

            console.log(`[${GameConstants.formatDate(new Date())}] %cStarting game..`, 'color:#8e44ad;font-weight:900;');

            GameController.bindToolTips();
            GameController.addKeyListeners();

            App.game.initialize();
            GameLoadState.updateLoadState(GameLoadState.states.initialized);

            // Fix any settings that conflict with the now-loaded game data
            Settings.checkAndFix();

            // Fixes custom theme css if Default theme was different from save theme (must be done before bindings)
            document.body.className = 'no-select';
            ko.applyBindings(App.game);
            GameLoadState.updateLoadState(GameLoadState.states.appliedBindings);

            Preload.hideSplashScreen();

            App.game.start();
            GameLoadState.updateLoadState(GameLoadState.states.running);

            // Check if Mobile and deliver a warning around mobile compatability / performance issues
            const isMobile: boolean = /Mobile/.test(navigator.userAgent);
            const isTouchDevice: boolean = 'ontouchstart' in document.documentElement;
            const hasSeenWarning: string = localStorage.getItem('hasSeenMobileWarning');
            if (isMobile && isTouchDevice && hasSeenWarning != 'true') {
                Notifier.warning({
                    title: 'Mobile Device Detected',
                    message: 'Please Note: \n\nYou may experience performance issues playing on mobile, especially on older models. \n\nWhile it is ' +
                        'possible to play on a phone or tablet, please be aware that the controls and features are designed with a mouse and keyboard in ' +
                        'mind and may not work as well on a mobile device. \n\nFor the best gameplay experience we highly recommend playing on a PC ' +
                        'browser or our desktop client by <b><a href="https://github.com/RedSparr0w/Pokeclicker-desktop/releases/latest" target="_blank">downloading here</a>' +
                        '\n\nThank You!',
                }).then((result: boolean) => {
                    if (result) {
                        localStorage.setItem('hasSeenMobileWarning', 'true');
                    }
                });
            }

        });
    }
}

App satisfies TmpAppType;
