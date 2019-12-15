class Preload {

    public static hideSplashScreen(fast: boolean = false) {
        if (fast) {
            $('.loader').hide();
        } else {
            $('.loader').fadeOut("slow")
        }
    }

    public static load(skipWait: boolean = false) {
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
            })
        } else {
            return new Promise(resolve => {
                Promise.all([Preload.loadSplashScreen(),
                    Preload.loadSplashScreen(),
                    Preload.loadBackground(),
                    Preload.loadMap(),
                    Preload.loadTowns(),
                    // Preload.loadPokemon(),
                    Preload.minimumTime()
                ]).then(() => {
                    resolve();
                }).catch((reason => {
                    console.log(reason);
                }));
            });
        }
    }

    private static loadTowns() {
        let p = Array<Promise<number>>();
        for (let name in TownList) {
            if (name.indexOf("Elite") !== -1 || name.indexOf("Champion") !== -1) {
                continue;
            }
            p.push(new Promise<number>(resolve => {
                let img = new Image();
                img.onload = () => resolve();
                img.onerror = () => resolve();
                img.src = `assets/images/towns/${name}.png`;
            }));

        }
        return Promise.all(p);
    }

    private static loadSplashScreen() {
        return new Promise<number>(resolve => {
            let img = new Image();
            img.onload = () => {
                let loader = $('#loader');
                loader.css('background', 'url(assets/images/background.png) top');
                loader.css('background-size', 'cover');
                resolve();
            };
            img.src = 'assets/images/background.png';

        });
    }

    private static loadBackground() {
        return new Promise<number>(resolve => {
            let img = new Image();
            img.onload = () => {
                let body = $('body');
                body.css('background', 'url(assets/images/background.png) top');
                body.css('background-size', 'cover');
                resolve();
            };
            img.src = 'assets/images/background.png';
        });
    }

    private static loadPokemon() {
        let p = Array<Promise<number>>();
        for (let i = 1; i <= GameConstants.AMOUNT_OF_POKEMONS; i++) {
            p.push(new Promise<number>(resolve => {
                let img = new Image();
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
            }, GameConstants.MIN_LOAD_TIME)
        })
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