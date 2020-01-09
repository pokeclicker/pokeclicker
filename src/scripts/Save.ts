class Save {

    static counter = 0;

    public static store(player: Player) {
        const json = JSON.stringify(player);
        localStorage.setItem('player', json);
        localStorage.setItem('mine', Mine.serialize());
        localStorage.setItem('settings', Settings.save());
        localStorage.setItem('save', JSON.stringify(this.getSaveObject()));

        this.counter = 0;
        console.log('Game saved');
    }

    public static getSaveObject() {
        const saveObject = {};

        saveObject[Underground.saveKey] = Underground.save();
        saveObject[App.game.breeding.saveKey] = App.game.breeding.toJSON();
        saveObject[App.game.pokeballs.saveKey] = App.game.pokeballs.toJSON();
        saveObject[App.game.wallet.saveKey] = App.game.wallet.toJSON();
        saveObject[App.game.keyItems.saveKey] = App.game.keyItems.toJSON();
        saveObject[App.game.badgeCase.saveKey] = App.game.badgeCase.toJSON();
        saveObject[App.game.oakItems.saveKey] = App.game.oakItems.toJSON();
        saveObject[App.game.party.saveKey] = App.game.party.toJSON();

        return saveObject;
    }

    public static load(): Player {
        const saved = localStorage.getItem('player');

        const settings = localStorage.getItem('settings');
        Settings.load(JSON.parse(settings));


        const saveJSON = localStorage.getItem('save');
        if (saveJSON !== null) {
            const saveObject = JSON.parse(saveJSON);
            Underground.load(saveObject[Underground.saveKey]);
        }

        if (saved !== 'null') {
            return new Player(JSON.parse(saved));
        } else {
            return new Player();
        }
    }

    public static download() {
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(btoa(JSON.stringify({player, save: this.getSaveObject()})))}`);
        const currentdate = new Date();
        const datestr = currentdate.toISOString().replace('T', ' ').slice(0, 19);
        const filename = `PokeClickerSave_${datestr}.txt`;
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    public static loadMine() {
        const mine = localStorage.getItem('mine');
        if (mine) {
            Mine.loadSavedMine(JSON.parse(mine));
        } else {
            Mine.loadMine();
        }
    }

    public static reset(): void {
        const confirmDelete = prompt('Are you sure you want reset?\nIf so, type \'DELETE\'');

        if (confirmDelete == 'DELETE') {
            localStorage.removeItem('player');
            localStorage.removeItem('mine');
            localStorage.removeItem('save');

            location.reload();
        }
    }

    /** Filters an object by property names
     * @param     object : any The object you want to filter
     * @param       keep : string[] An array of property names that should be kept
     * @returns {Object} : The original object with only the specified properties
     */
    public static filter(object: any, keep: string[]): Record<string, any> {
        const filtered = {};
        let prop;
        for (prop in object) {
            if (keep.indexOf(prop) > -1) {
                filtered[prop] = object[prop];
            }
        }
        return filtered;
    }

    public static initializeMultipliers(): { [name: string]: number } {
        const res = {};
        for (const obj in ItemList) {
            res[obj] = 1;
        }
        return res;
    }

    public static initializeItemlist(): { [name: string]: KnockoutObservable<number> } {
        const res = {};
        for (const obj in ItemList) {
            res[obj] = ko.observable(0);
        }
        return res;
    }

    public static initializePlots(saved?: Array<any>): KnockoutObservable<Plot>[] {
        let plotList: Array<KnockoutObservable<Plot>>;
        if (saved) {
            plotList = saved.map((p) => {
                let berry;
                if (p.berry) {
                    berry = new Berry(p.berry.type, p.berry.harvestTime, p.berry.moneyValue, p.berry.farmValue);
                } else {
                    berry = null;
                }
                const plot = new Plot(p.isUnlocked, p.exp, p.level, p.boosted, berry, p.timeLeft);
                return ko.observable(plot);
            });
        } else {
            plotList = [...Array(GameConstants.AMOUNT_OF_PLOTS)].map(function (val, index) {
                if (index == 0) {
                    return ko.observable(new Plot(true, 0, 0, false, null, 0));
                }
                return ko.observable(new Plot(false, 0, 0, false, null, 0));
            });
        }
        return plotList;
    }

    public static initializeShards(saved?: Array<Array<number>>): Array<Array<KnockoutObservable<number>>> {
        let res;
        if (saved) {
            res = saved.map((type) => {
                return type.map((effectiveness) => {
                    return ko.observable(effectiveness);
                });
            });
        } else {
            res = [];
            for (const item in GameConstants.PokemonType) {
                if (!isNaN(Number(item))) {
                    res[item] = [];
                    res[item][GameConstants.TypeEffectiveness.Immune] = ko.observable(0);
                    res[item][GameConstants.TypeEffectiveness.NotVery] = ko.observable(0);
                    res[item][GameConstants.TypeEffectiveness.Normal] = ko.observable(0);
                    res[item][GameConstants.TypeEffectiveness.Very] = ko.observable(0);
                }
            }
        }

        return res;
    }

    public static initializeEffects(saved?: Array<string>): { [name: string]: KnockoutObservable<number> } {
        const res = {};
        for (const obj in GameConstants.BattleItemType) {
            res[obj] = ko.observable(saved ? saved[obj] || 0 : 0);
        }
        return res;
    }

    public static loadFromFile(file) {
        const fileToRead = file;
        const fr = new FileReader();
        fr.readAsText(fileToRead);

        setTimeout(function () {
            try {
                const decoded = atob(fr.result as string);
                console.debug('decoded:', decoded);
                const json = JSON.parse(decoded);
                console.debug('json:', json);
                if (decoded && json && json.player && json.save) {
                    localStorage.setItem('player', JSON.stringify(json.player));
                    localStorage.setItem('save', JSON.stringify(json.save));
                    location.reload();
                } else {
                    Notifier.notify('This is not a valid decoded savefile', GameConstants.NotificationOption.danger);
                }
            } catch (err) {
                Notifier.notify('This is not a valid savefile', GameConstants.NotificationOption.danger);
            }
        }, 1000);
    }

    public static convert() {
        const base64 = $('#convertTextArea').val().toString();
        const json = atob(base64);
        const p = JSON.parse(json);
        Save.convertShinies(p.caughtPokemonList);
        $('#saveModal').modal('hide');
    }

    // TODO (@Isha) reimplement
    public static convertShinies(list: Array<string>) {
        // let converted = [];
        // for (let pokemon of list) {
        //     let shiny = parseInt(pokemon['shiny']);
        //     let name = pokemon['name'];
        //     if (shiny == 1 && player.caughtShinyList.indexOf(name) == -1) {
        //         player.caughtShinyList().push(pokemon['name']);
        //         converted.push(pokemon['name']);
        //     }
        // }
        // if (converted.length > 0) {
        //     Notifier.notify("You have gained the following shinies: " + converted, GameConstants.NotificationOption.success)
        // }
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    $('#saveModal').on('show.bs.modal', function () {
        $('#saveTextArea').text(JSON.stringify(player));
    });
});
