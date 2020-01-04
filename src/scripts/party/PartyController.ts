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
            let res, dir = (direction) ? -1 : 1;

            let aValue;
            let bValue;
            switch (option) {
                case SortOptions.id:
                    aValue = a.id;
                    bValue = b.id;
                    break;
                case SortOptions.name:
                    aValue = a.name;
                    bValue = b.name;
                    break;
                case SortOptions.attack:
                    aValue = a.calculateAttack();
                    bValue = b.calculateAttack();
                    break;
                case SortOptions.levelObservable:
                    aValue = a.calculateLevel();
                    bValue = b.calculateLevel();
                    break;
                case SortOptions.shiny:
                    aValue = Number(App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(a.name).id, true));
                    bValue = Number(App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(b.name).id, true));


            }
            if (option === SortOptions.attack || option == SortOptions.levelObservable || option == SortOptions.shiny) {
                dir *= -1;
            }

            //Compare by provided property
            if (aValue == bValue) {
                //If they are equal according to provided property, sort by id
                return a.id - b.id;
            } else if (aValue < bValue) {
                res = -1;
            } else if (aValue > bValue) {
                res = 1;
            } else {
                res = 0
            }

            return res * dir;
        }
    }


}
