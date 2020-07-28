class PartyController {

    static getCaughtStatusByName(name: string): CaughtStatus {
        return this.getCaughtStatus(PokemonHelper.getPokemonByName(name).id);
    }

    static getCaughtStatus(id: number): CaughtStatus {
        if (App.game.party.alreadyCaughtPokemon(id, true)) {
            return CaughtStatus.CaughtShiny;
        }

        if (App.game.party.alreadyCaughtPokemon(id, false)) {
            return CaughtStatus.Caught;
        }

        return CaughtStatus.NotCaught;
    }

    static getEvolutionsCaughtStatus(id: number, evoType?: GameConstants.StoneType): CaughtStatus {
        let status = CaughtStatus.CaughtShiny;
        const pokemon = App.game.party.caughtPokemon.find(p => p.id == id);
        if (pokemon) {
            for (const evolution of pokemon.evolutions) {
                if (evolution instanceof StoneEvolution && evolution.stone == evoType) {
                    const pStatus = this.getCaughtStatusByName(evolution.evolvedPokemon);
                    if (pStatus < status) {
                        status = pStatus;
                    }
                }
            }
        }
        return status;
    }

    public static getMaxLevelPokemonList(): Array<PartyPokemon> {
        return App.game.party.caughtPokemon.filter((partyPokemon: PartyPokemon) => {
            return !partyPokemon.breeding && partyPokemon.level >= 100;
        });
    }

    static getSortedList() {
        return ko.pureComputed(function() {
            return App.game.party._caughtPokemon.sort(PartyController.compareBy(Settings.getSetting('partySort').observableValue(), Settings.getSetting('partySortDirection').observableValue()));
        }).extend({rateLimit: 500});
    }


    public static compareBy(option: SortOptions, direction: boolean): (a: PartyPokemon, b: PartyPokemon) => number {
        return function (a, b) {
            let res, dir = (direction) ? -1 : 1;
            const config = SortOptionConfigs[option];

            const aValue = config.getValue(a);
            const bValue = config.getValue(b);

            if (config.invert) {
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
                res = 0;
            }

            return res * dir;
        };
    }


}
