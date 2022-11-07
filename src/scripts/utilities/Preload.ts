class Preload {
    static itemsToLoad = [];
    static itemsLoaded = [];
    static itemsErrored = [];

    public static itemLoading(item: any = 0) {
        this.itemsToLoad.push(item);
        this.updateProgressBar();
    }

    public static itemLoaded(item: any = 0) {
        this.itemsLoaded.push(item);
        this.updateProgressBar();
    }

    public static itemErrored(item: any = 0) {
        this.itemsErrored.push(item);
        this.updateProgressBar();
    }

    public static updateProgressBar() {
        const toLoad = this.itemsToLoad.length;
        const loaded = this.itemsLoaded.length;
        const errored = this.itemsErrored.length;

        // Update the progress bar
        const progressBarEl = document.getElementById('preload-progress-bar');
        progressBarEl.style.width = `${(loaded + errored) / toLoad * 100}%`;

        // Update the text
        const progressTextEl = document.getElementById('preload-progress-text');
        progressTextEl.innerText = `${loaded +  errored} / ${toLoad}`;
    }

    public static hideSplashScreen(fast = false) {
        $('#game').removeClass('loading');
        if (fast) {
            $('#loader').hide();
        } else {
            $('#loader').fadeOut('slow');
        }
        // Remove the splash screen
        setTimeout(() => {
            $('#loader').remove();
        }, 1000);
    }

    public static load(skipWait = false): Promise<void> {
        console.log(`[${GameConstants.formatDate(new Date())}] %cPreloading Images..`, 'color:#8e44ad;font-weight:900;');
        if (skipWait) {
            return new Promise(resolve => {
                //If you want to skip waiting, resolve immediately
                resolve();
                // Preload.loadTowns();
                // Preload.loadUndergroundItems();
                // Preload.loadMap();
                // Preload.loadPokemon(),
                Preload.hideSplashScreen(true);
            });
        } else {
            return new Promise(resolve => {
                // Incase something is taking too long to load
                const forceLoad = setTimeout(() => {
                    console.log(`[${GameConstants.formatDate(new Date())}] %cPreloading images taking too long, Skipping..`, 'color:#c0392b;font-weight:900;');
                    resolve();
                }, GameConstants.MAX_LOAD_TIME);

                Promise.all([
                    // Preload.loadTowns(),
                    // Preload.loadUndergroundItems(),
                    // Preload.loadMap(),
                    // Preload.loadPokemon(),
                    Preload.minimumTime(),
                ]).then(() => {
                    clearTimeout(forceLoad);
                    console.log(`[${GameConstants.formatDate(new Date())}] %cPreloaded images`, 'color:#2ecc71;font-weight:900;');
                    // Give the progress bar a little bit of time to finish the animation
                    setTimeout(() => {
                        resolve();
                    }, 600);
                }).catch((reason => {
                    console.log(`[${GameConstants.formatDate(new Date())}] %cPreload images failed..`, 'color:#c0392b;font-weight:900;');
                    console.error('Preload images failed:', reason);
                    clearTimeout(forceLoad);
                    resolve();
                }));
            });
        }
    }

    private static loadTowns() {
        const p = Array<Promise<void>>();
        for (const name in TownList) {
            // Skip unreleased towns unless a feature flag has enabled them
            if (
                !(<any>window).featureFlags?.preloadUnreleasedTowns && TownList[name].region > GameConstants.MAX_AVAILABLE_REGION
            ) {
                continue;
            }
            // Skip fake towns that exist for the Elite
            if (name.includes('Elite') || name.includes('Champion')) {
                continue;
            }
            Preload.itemLoading(name);
            p.push(new Promise<void>(resolve => {
                const img = new Image();
                img.onload = () => {
                    Preload.itemLoaded(`town-${name}`);
                    resolve();
                };
                img.onerror = () => {
                    Preload.itemErrored(`town-${name}`);
                    console.warn('Failed to load town image:', name);
                    resolve();
                };
                img.src = `assets/images/towns/${name}.png`;
            }));

        }
        return Promise.all(p);
    }

    private static loadPokemon() {
        const p = Array<Promise<void>>();
        for (let i = 1; i <= GameConstants.MaxIDPerRegion[GameConstants.MAX_AVAILABLE_REGION]; i++) {
            Preload.itemLoading(i);
            p.push(new Promise<void>(resolve => {
                const img = new Image();
                img.onload = () => {
                    Preload.itemLoaded(i);
                    resolve();
                };
                img.onerror = () => {
                    Preload.itemErrored(i);
                    console.warn('Failed to load image for pokemon:', i);
                    resolve();
                };
                img.src = `assets/images/pokemon/${i}.png`;
            }));

        }
        return Promise.all(p);
    }

    private static loadUndergroundItems() {
        const p = Array<Promise<void>>();
        UndergroundItems.list.forEach(item => {
            Preload.itemLoading(item.id);
            p.push(new Promise<void>(resolve => {
                const img = new Image();
                img.onload = () => {
                    Preload.itemLoaded(item.id);
                    resolve();
                };
                img.onerror = () => {
                    Preload.itemErrored(item.id);
                    console.warn('Failed to load image for Underground item:', item.name);
                    resolve();
                };
                img.src = item.undergroundImage;
            }));
        });
        return Promise.all(p);
    }

    private static minimumTime() {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                resolve();
            }, GameConstants.MIN_LOAD_TIME);
        });
    }

    private static loadMap() {
        // TODO: preload the map background images?
        /*
        return new Promise<number>(resolve => {
            let img = new Image();
            img.onload = () => {
                document.querySelector('image')
                    .setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'assets/images/kanto.png');
                resolve();
            };
            img.onerror = () => {
                console.log('Failed to load map image:', name);
                resolve();
            }
            img.src = 'assets/images/kanto.png';
        })
        */
    }
}
