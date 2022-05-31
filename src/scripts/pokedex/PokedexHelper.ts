import TypeColor = GameConstants.TypeColor;

class PokedexHelper {
    public static toggleStatisticShiny = ko.observable(true);
    public static toggleAllShiny = ko.observable(true);

    public static getBackgroundColors(name: PokemonNameType): string {
        const pokemon = PokemonHelper.getPokemonByName(name);

        if (!this.pokemonSeen(pokemon.id)()) {
            return 'grey';
        }
        if (pokemon.type2 == PokemonType.None) {
            return TypeColor[pokemon.type1];
        }
        return `linear-gradient(90deg,${TypeColor[pokemon.type1]} 50%, ${TypeColor[pokemon.type2]} 50%)`;
    }

    /**
     * Returns true if you have seen the pokemon
     * @param {number} id
     * @returns {boolean}
     */
    public static pokemonSeen(id: number): KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            try {
                return App.game.statistics.pokemonEncountered[id]() > 0 || App.game.statistics.pokemonDefeated[id]() > 0 || App.game.statistics.pokemonCaptured[id]() > 0 || App.game.party.alreadyCaughtPokemon(id);
            } catch (error) {
                return false;
            }
        });
    }

    public static filteredList: KnockoutObservableArray<Record<string, any>> = ko.observableArray([]);


    public static updateList() {
        PokedexHelper.filteredList(PokedexHelper.getList());
    }

    public static getList(): Array<Record<string, any>> {
        const filter = PokedexHelper.getFilters();

        const highestEncountered = App.game.statistics.pokemonEncountered.highestID;
        const highestDefeated = App.game.statistics.pokemonDefeated.highestID;
        const highestCaught = App.game.statistics.pokemonCaptured.highestID;
        const highestDex = Math.max(highestEncountered, highestDefeated, highestCaught);

        return pokemonList.filter((pokemon) => {
            // Checks based on caught/shiny status
            const alreadyCaught = App.game.party.alreadyCaughtPokemon(pokemon.id);
            const alreadyCaughtShiny = App.game.party.alreadyCaughtPokemon(pokemon.id, true);

            // If the Pokemon shouldn't be unlocked yet
            const nativeRegion = PokemonHelper.calcNativeRegion(pokemon.name);
            if (nativeRegion > GameConstants.MAX_AVAILABLE_REGION || nativeRegion == GameConstants.Region.none) {
                return false;
            }

            // If not showing this region
            const region: (GameConstants.Region | null) = filter['region'] ? parseInt(filter['region'], 10) : null;
            if (region != null && region != nativeRegion && region > -1) {
                return false;
            }

            // Event Pokemon
            if (pokemon.id <= 0 && !alreadyCaught) {
                return false;
            }

            // If we haven't seen a pokemon this high yet
            if (pokemon.id > highestDex) {
                return false;
            }

            // Check if the name contains the string
            if (filter['name'] && !pokemon.name.toLowerCase().includes(filter['name'].toLowerCase().trim())) {
                return false;
            }

            // Check if either of the types match
            const type1: (PokemonType | null) = filter['type1'] > -2 ? parseInt(filter['type1'], 10) : null;
            const type2: (PokemonType | null) = filter['type2'] > -2 ? parseInt(filter['type2'], 10) : null;
            if ([type1, type2].includes(PokemonType.None)) {
                const type = (type1 == PokemonType.None) ? type2 : type1;
                if (!PokedexHelper.isPureType(pokemon, type)) {
                    return false;
                }
            } else if ((type1 != null && !(pokemon as PokemonListData).type.includes(type1)) || (type2 != null && !(pokemon as PokemonListData).type.includes(type2))) {
                return false;
            }

            // Alternate forms that we haven't caught yet
            if (!alreadyCaught && pokemon.id != Math.floor(pokemon.id)) {
                return false;
            }

            // Only uncaught
            if (filter['caught-shiny'] == 'uncaught' && alreadyCaught) {
                return false;
            }

            // All caught
            if (filter['caught-shiny'] == 'caught' && !alreadyCaught) {
                return false;
            }

            // Only caught not shiny
            if (filter['caught-shiny'] == 'caught-not-shiny' && (!alreadyCaught || alreadyCaughtShiny)) {
                return false;
            }

            // Only caught shiny
            if (filter['caught-shiny'] == 'caught-shiny' && !alreadyCaughtShiny) {
                return false;
            }

            // Only pokemon with a hold item
            if (filter['held-item'] && !BagHandler.displayName((pokemon as PokemonListData).heldItem)) {
                return false;
            }

            return true;
        }).sort((a:PokemonListData,b:PokemonListData) => { 
            let sortFn = PokedexHelper.compareBy(Settings.getSetting('pokedexSort').value, Settings.getSetting('pokedexSortDirection').value);
            const pokemonA:PokemonListData & Partial<PartyPokemon> = {...a, ...App.game.party.getPokemon(a.id)}
            const pokemonB:PokemonListData & Partial<PartyPokemon> = {...b, ...App.game.party.getPokemon(b.id)}

            return sortFn(pokemonA,pokemonB)

        });
    }

    private static getFilters() {
        const res = {};
        res['name'] = $('#nameFilter').val();
        res['type1'] = $('#pokedex-filter-type1').val();
        res['type2'] = $('#pokedex-filter-type2').val();
        res['region'] = $('#pokedex-filter-region').val();
        res['caught-shiny'] = $('#pokedex-filter-shiny-caught').val();
        res['held-item'] = $('#pokedex-filter-held-item').is(':checked');
        return res;
    }

    public static getImage(id: number) {
        let src = 'assets/images/';
        if (App.game.party.alreadyCaughtPokemon(id, true) && this.toggleAllShiny()) {
            src += 'shiny';
        }
        src += `pokemon/${id}.png`;
        return src;
    }

    public static getImageStatistics(id: number) {
        let src = 'assets/images/';
        if (App.game.party.alreadyCaughtPokemon(id, true) && this.toggleStatisticShiny()) {
            src += 'shiny';
        }
        src += `pokemon/${id}.png`;
        return src;
    }

    private static isPureType(pokemon: PokemonListData, type: (PokemonType | null)): boolean {
        return (pokemon.type.length === 1 && (type == null || pokemon.type[0] === type));
    }

    // Default value displayed at bottom of image
    public static displayValue = Settings.getSetting('pokedexDisplayFilter').observableValue || ko.observable('name');

    /**
     * Returns the string to display in the html
     * @param {PokemonListData} pokemon
     * @returns {string}
     */
    public static getDisplayValue(pokemon:PokemonListData): string {
        //If the pokemon is unseen we don't have any informations to display.
        if (!PokedexHelper.pokemonSeen(pokemon.id)()) {
            return null;
        }

        try {
            const partyPokemon:PartyPokemon = App.game.party.getPokemon(pokemon.id);
            switch (this.displayValue()) {
                case 'name': return pokemon.name;
                case 'attack': return `Attack: ${partyPokemon.attack.toLocaleString('en-US')}`;
                case 'attackBonus': return `Attack Bonus: ${Math.floor(partyPokemon.baseAttack * (GameConstants.BREEDING_ATTACK_BONUS / 100) + partyPokemon.proteinsUsed()).toLocaleString('en-US')}`;
                case 'baseAttack': return `Base Attack: ${pokemon.attack.toLocaleString('en-US')}`;
                case 'eggSteps': return `Egg Steps: ${App.game.breeding.getSteps(pokemon.eggCycles).toLocaleString('en-US')}`;
                case 'timesHatched': return `Hatches: ${App.game.statistics.pokemonHatched[pokemon.id]().toLocaleString('en-US')}`;
                case 'breedingEfficiency': return `Efficiency: ${((pokemon.attack * (GameConstants.BREEDING_ATTACK_BONUS / 100) + partyPokemon.proteinsUsed()) / pokemonMap[pokemon.name].eggCycles).toLocaleString('en-US', { maximumSignificantDigits: 2 })}`;
                case 'stepsPerAttack': return `Steps/Att: ${(App.game.breeding.getSteps(pokemonMap[pokemon.name].eggCycles) / (partyPokemon.baseAttack * (GameConstants.BREEDING_ATTACK_BONUS / 100) + partyPokemon.proteinsUsed())).toLocaleString('en-US', { maximumSignificantDigits: 2 })}`;
                case 'dexId': return `#${pokemon.id <= 0 ? '???' : Math.floor(pokemon.id).toString().padStart(3,'0')}`;
                case 'proteins': return `Proteins: ${partyPokemon.proteinsUsed()}`;
                case 'level' : return `Level: ${partyPokemon.level}`;
            }
        } catch { // Mostly because the pokemon is uncaught hence partyPokemon is undefined
            return null;
        }
    }

    /**
     * Returns true if the informations required about the pokemon is available
     * @param {PokemonListData} pokemon
     * @returns {boolean}
     */
    public static hasDisplayValue(pokemon:PokemonListData): KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            return Boolean(PokedexHelper.getDisplayValue(pokemon))
        });
    }

    public static compareBy(option: SortOptions, direction: boolean): (a: PokemonListData & Partial<PartyPokemon>, b: PokemonListData & Partial<PartyPokemon>) => number {
        return function (a, b) {
            let res = 0;
            let dir = (direction) ? -1 : 1;
            const config = SortOptionConfigs[option]

            const seenA = PokedexHelper.pokemonSeen(a.id)()
            const seenB = PokedexHelper.pokemonSeen(b.id)()

            //If one is not seen and we are sorting by something else than id.
            if ( !(seenA && seenB) && (option !== SortOptions.id) ) {
                if (seenA || seenB) {
                    return seenA ? -1 : 1;
                }
                //Both not seen, sort by id.
                return a.id - b.id;
            }

            // Getting the value (nullable)
            const aValue = config.getValue(a);
            const bValue = config.getValue(b);

            if (aValue && bValue) {
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
            }

            if (aValue || bValue) {
                return aValue ? -1 : 1;
            }
            
            return 0;
        };
    }

}

$(document).ready(() => {
    $('#pokemonStatisticsModal').on('hidden.bs.modal', () => {
        PokedexHelper.toggleStatisticShiny(true);
    });
});
