declare const modalUtils: { observableState: typeof observableState };

class PartyController {

    static getCaughtStatusByName(name: PokemonNameType): CaughtStatus {
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

    static getStoneEvolutionsCaughtStatus(id: number, evoType?: GameConstants.StoneType): CaughtStatus[] {
        const pokemon = App.game.party.caughtPokemon.find(p => p.id == id);
        const statuses: CaughtStatus[] = [];
        if (pokemon) {
            for (const evolution of pokemon.evolutions) {
                // skip other Restrictions to show all eevee evolutions for the region
                const regionStatisfied = PokemonHelper.calcNativeRegion(evolution.getEvolvedPokemon()) <= player.highestRegion();
                if (evolution instanceof StoneEvolution && evolution.stone == evoType && regionStatisfied) {
                    const pStatus = this.getCaughtStatusByName(evolution.getEvolvedPokemon());
                    statuses.push(pStatus);
                }
            }
        }
        return statuses;
    }

    static hasMultipleStoneEvolutionsAvailable(pokemonName: string, evoType: GameConstants.StoneType) {
        const pokemon = App.game.party.caughtPokemon.find(p => p.name == pokemonName);
        // We only want to check against pokemon that have multiple possible evolutions that can happen now
        let found = false;
        if (pokemon) {
            for (const evolution of pokemon.evolutions) {
                if (evolution instanceof StoneEvolution && evolution.stone == evoType && evolution.isSatisfied()) {
                    // If we've already found 1 evolution, then there are multiple possible evolutions
                    if (found) {
                        return true;
                    }
                    // We've found 1 possible evolution
                    found = true;
                }
            }
        }
        return false;
    }

    public static getMaxLevelPokemonList(): Array<PartyPokemon> {
        return App.game.party.caughtPokemon.filter((partyPokemon: PartyPokemon) => {
            return !partyPokemon.breeding && partyPokemon.level >= 100;
        });
    }

    static getSortedList = ko.pureComputed(() => {
        const list = [...App.game.party.caughtPokemon];
        return list.sort(PartyController.compareBy(Settings.getSetting('partySort').observableValue(), Settings.getSetting('partySortDirection').observableValue()));
    }).extend({ rateLimit: 500 });

    private static hatcherySortedList = [];
    static getHatcherySortedList = ko.pureComputed(() => {
        // If the breeding modal is open, we should sort it.
        if (modalUtils.observableState['breedingModal'] === 'show') {
            PartyController.hatcherySortedList = [...App.game.party.caughtPokemon];
            return PartyController.hatcherySortedList.sort(PartyController.compareBy(Settings.getSetting('hatcherySort').observableValue(), Settings.getSetting('hatcherySortDirection').observableValue()));
        }
        return PartyController.hatcherySortedList;
    }).extend({ rateLimit: 500 });


    private static proteinSortedList = [];
    static getProteinSortedList = ko.pureComputed(() => {
        // If the protein modal is open, we should sort it.
        if (modalUtils.observableState['pokemonSelectorModal'] === 'show') {
            PartyController.proteinSortedList = [...App.game.party.caughtPokemon];
            return PartyController.proteinSortedList.sort(PartyController.compareBy(Settings.getSetting('proteinSort').observableValue(), Settings.getSetting('proteinSortDirection').observableValue()));
        }
        return PartyController.proteinSortedList;
    }).extend({ rateLimit: 500 });

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
