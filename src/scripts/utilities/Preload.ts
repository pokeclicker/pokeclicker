class Preload {

    public static hideSplashScreen(fast = false) {
        if (fast) {
            $('.loader').hide();
        } else {
            $('.loader').fadeOut('slow');
        }
    }

    public static load(skipWait = false) {
        if (skipWait) {
            return new Promise(resolve => {
                //If you want to skip waiting, resolve immediately
                resolve();
                Preload.loadSplashScreen();
                Preload.loadSplashScreen();
                Preload.loadBackground();
                Preload.loadMap();
                Preload.loadTowns();
                Preload.hideSplashScreen(true);
            });
        } else {
            return new Promise(resolve => {
                Promise.all([
                    Preload.loadSplashScreen(),
                    Preload.loadSplashScreen(),
                    Preload.loadBackground(),
                    Preload.loadMap(),
                    Preload.loadTowns(),
                    // Preload.loadPokemon(),
                    Preload.minimumTime(),
                ]).then(() => {
                    resolve();
                }).catch((reason => {
                    console.error('Preload failed:', reason);
                }));
            });
        }
    }

    private static loadTowns() {
        const p = Array<Promise<number>>();
        for (const name in TownList) {
            if (name.includes('Elite') || name.includes('Champion')) {
                continue;
            }
            p.push(new Promise<number>(resolve => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve();
                img.src = `assets/images/towns/${name}.png`;
            }));

        }
        return Promise.all(p);
    }

    private static loadSplashScreen() {
        return new Promise<number>(resolve => {
            const img = new Image();
            img.onload = () => {
                const loader = $('#loader');
                loader.css('background', 'url(assets/images/background.png) top');
                loader.css('background-size', 'cover');
                loader.css('overflow-x', 'hidden');
                loader.css('background-color', '#7dad71');
                loader.css('background-repeat', 'repeat-x');
                resolve();
            };
            img.src = 'assets/images/background.png';

        });
    }

    private static loadBackground() {
        return new Promise<number>(resolve => {
            const img = new Image();
            img.onload = () => {
                const body = $('body');
                body.css('background', 'url(assets/images/background.png) top');
                body.css('background-size', 'cover');
                body.css('overflow-x', 'hidden');
                body.css('background-color', '#7dad71');
                body.css('background-repeat', 'repeat-x');
                resolve();
            };
            img.src = 'assets/images/background.png';
        });
    }

    private static loadPokemon() {
        const p = Array<Promise<number>>();
        for (let i = 1; i <= GameConstants.TotalPokemonsPerRegion[GameConstants.MAX_AVAILABLE_REGION]; i++) {
            p.push(new Promise<number>(resolve => {
                const img = new Image();
                img.onload = () => resolve();
                img.src = `assets/images/pokemon/${i}.png`;
            }));

        }
        return Promise.all(p);
    }

    private static minimumTime() {
        return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve();
            }, GameConstants.MIN_LOAD_TIME);
        });
    }

    private static loadMap() {
        /*
        return new Promise<number>(resolve => {
            let img = new Image();
            img.onload = () => {
                document.querySelector('image')
                    .setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'assets/images/kanto.png');
                resolve();
            };
            img.src = 'assets/images/kanto.png';
        })
        */
    }
}
