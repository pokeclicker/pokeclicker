class Save {

    static counter = 0;

    public static store(player: Player) {
        const json = JSON.stringify(player);
        localStorage.setItem('player', json);
        localStorage.setItem('mine', Mine.serialize());
        localStorage.setItem('settings', Settings.save());
        localStorage.setItem('save', JSON.stringify(this.getSaveObject()));

        this.counter = 0;
        console.log('%cGame saved', 'color:#3498db;font-weight:900;');
    }

    public static getSaveObject() {
        const saveObject = {};

        saveObject[Underground.saveKey] = Underground.save();

        Object.keys(App.game).filter(key => App.game[key].saveKey).forEach(key => {
            saveObject[App.game[key].saveKey] = App.game[key].toJSON();
        });

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
        const datestr = GameConstants.formatDate(new Date());
        const filename = `[v${App.game.update.version}] PokeClickerSave_${datestr}.txt`;
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
            if (keep.includes(prop)) {
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
            for (const item in PokemonType) {
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

    public static initializeEffectTimer(saved?: Array<string>): { [name: string]: KnockoutObservable<string> } {
        const res = {};
        for (const obj in GameConstants.BattleItemType) {
            res[obj] = ko.observable(saved ? saved[obj] || '00:00' : '00:00');
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
                    Notifier.notify({ message: 'This is not a valid decoded savefile', type: GameConstants.NotificationOption.danger });
                }
            } catch (err) {
                Notifier.notify({ message: 'This is not a valid savefile', type: GameConstants.NotificationOption.danger });
            }
        }, 1000);
    }

    public static convert() {
        const base64 = $('#convertTextArea').val().toString();
        try {
            const json = atob(base64);
            const p = JSON.parse(json);
            Save.convertShinies(p.caughtPokemonList);
            $('#saveModal').modal('hide');
        } catch (e) {
            Notifier.notify({ message: 'Invalid save data.', type: GameConstants.NotificationOption.danger });
        }
    }

    public static convertShinies(list: Array<any>) {
        const converted = [];
        list = list.filter(p => p.shiny);
        for (const pokemon of list) {
            const id = +pokemon.id;
            if (!App.game.party.shinyPokemon.includes(id)) {
                converted.push(pokemon.name);
                App.game.party.shinyPokemon.push(id);
            }
        }
        if (converted.length > 0) {
            Notifier.notify({ message: `You have gained the following shiny Pokémon:</br>${converted.join(',</br>')}`, type: GameConstants.NotificationOption.success, timeout: 1e4 });
        } else {
            Notifier.notify({ message: 'No new shiny Pokémon to import.', type: GameConstants.NotificationOption.info });
        }
    }
}

document.addEventListener('DOMContentLoaded', function (event) {
    $('#saveModal').on('show.bs.modal', function () {
        $('#saveTextArea').text(JSON.stringify(player));
    });
});
