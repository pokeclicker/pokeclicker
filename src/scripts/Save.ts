class Save {

    static counter: number = 0;

    public static store(player: Player) {
        //TODO encode in base-64
        let json = JSON.stringify(player);
        localStorage.setItem("player", json);
        localStorage.setItem("mine", Mine.serialize());
        this.counter = 0;
        console.log("Game saved")
    }

    public static load(): Player {
        let saved = localStorage.getItem("player");
        if (saved) {
            return new Player(JSON.parse(saved));
        } else {
            return new Player()
        }
    }

    public static loadMine() {
        let mine = localStorage.getItem("mine");
        if (mine) {
            Mine.loadSavedMine(JSON.parse(mine));
        } else {
            Mine.loadMine();
        }
    }

    public static reset(): void {
        localStorage.setItem("player", null);
        location.reload()
    }

    /** Filters an object by property names
     * @param     object : any The object you want to filter
     * @param       keep : string[] An array of property names that should be kept
     * @returns {Object} : The original object with only the specified properties
     */
    public static filter(object: any, keep: string[]): Object {
        let filtered = {}, prop;
        for (prop in object) {
            if (keep.indexOf(prop) > -1) {
                filtered[prop] = object[prop]
            }
        }
        return filtered
    }

    public static initializeMultipliers(): { [name: string]: number } {
        let res = {};
        for (let obj in ItemList) {
            res[obj] = 1;
        }
        return res;
    }

    public static initializeItemlist(): { [name: string]: number } {
        let res = {};
        for (let obj in ItemList) {
            res[obj] = 0;
        }
        return res;
    }

    public static initializeShards(saved?: Array<Array<number>>): Array<Array<KnockoutObservable<number>>> {
        let res;
        if (saved) {
            res = saved.map((type) => {
                return type.map((effectiveness) => {
                    return ko.observable(effectiveness)
                })
            });
        } else {
            res = [];
            for (let item in GameConstants.PokemonType) {
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

    public static loadFromTextArea() {
        let json = $('#loadTextArea').val().toString();
        let player = new Player(JSON.parse(json));
        Save.store(player);
        location.reload()
    }

    public static convert() {
        let base64 = $('#convertTextArea').val().toString();
        let json = atob(base64);
        let p = JSON.parse(json);
        Save.convertShinies(p.caughtPokemonList);
    }

    public static convertShinies(list: Array<string>) {
        for (let pokemon of list) {
            let shiny = parseInt(pokemon['shiny']);
            let name = pokemon['name'];
            if (shiny == 1 && player.convertedShinyList().indexOf(name) == -1 && player.caughtShinyList.indexOf(name) == -1) {
                player.convertedShinyList.push(pokemon['name'])
            }
        }
        Notifier.notify("Success! You can pick up your shinies from Oak's lab", GameConstants.NotificationOption.success)
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    $('#saveModal').on('show.bs.modal', function () {
        $('#saveTextArea').text(JSON.stringify(player));
    });
});