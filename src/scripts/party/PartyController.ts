class PartyController {

    static getCaughtStatusByName(name: string): CaughtStatus {
        return this.getCaughtStatus(PokemonHelper.getPokemonByName(name).id)
    }

    static getCaughtStatus(id: number): CaughtStatus {
        if (App.game.party.alreadyCaughtPokemon(id, true)) {
            return CaughtStatus.CaughtShiny;
        }

        if (App.game.party.alreadyCaughtPokemon(id, false)) {
            return CaughtStatus.Caught;
        }

        return CaughtStatus.NotCaught
    }

    public static getMaxLevelPokemonList() {
        return App.game.party.caughtPokemon.filter((partyPokemon: PartyPokemon) => {
            return !partyPokemon.breeding && partyPokemon.levelObservable() >= 100;
        });
    }

    static getSortedList() {
        return App.game.party.caughtPokemon.sort(this.compareBy(Settings.getSetting('partySort').observableValue(), Settings.getSetting('partySortDirection').observableValue()));
    }


    public static compareBy(option: SortOptions, direction: boolean): (a: PartyPokemon, b: PartyPokemon) => number {
        return function (a, b) {
            let _a, _b, res, dir = (direction) ? -1 : 1;
            let property = SortOptions[option];

            //Convert to plain JS so that observables don't need to be accessed with brackets
            _a = ko.toJS(a);
            _b = ko.toJS(b);

            //CaughtPokemon doesn't have shiny property, create one for comparison if needed
            if (property == "shiny") {
                _a.shiny = Number(App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(a.name).id, true));
                _b.shiny = Number(App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(b.name).id, true));
            }

            if (option === SortOptions.attack || option == SortOptions.levelObservable || option == SortOptions.shiny) {
                dir *= -1;
            }

            //Compare by provided property
            if (_a[property] == _b[property]) {
                //If they are equal according to provided property, sort by id
                if (_a.id < _b.id) {
                    return -1;
                } else if (_a.id > _b.id) {
                    return 1;
                }
            } else if (_a[property] < _b[property]) {
                res = -1;
            } else if (_a[property] > _b[property]) {
                res = 1;
            } else {
                res = 0
            }

            return res * dir;
        }
    }


}
