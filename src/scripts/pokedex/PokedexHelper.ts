import TypeColor = GameConstants.TypeColor;

class PokedexHelper {
    public static toggleStatisticShiny = ko.observable(true);
    public static hideShinyImages = ko.observable(false);

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
                return App.game.statistics.pokemonEncountered[id]() > 0 || App.game.statistics.pokemonDefeated[id]() > 0 || App.game.statistics.pokemonCaptured[id]() > 0 || App.game.party.alreadyCaughtPokemon(id) || App.game.statistics.pokemonSeen[id]() > 0;
            } catch (error) {
                return false;
            }
        });
    }

    private static cachedFilteredList: typeof pokemonList;
    public static filteredList = ko.pureComputed<typeof pokemonList>(() => {
        if (PokedexHelper.cachedFilteredList && modalUtils.observableState.pokedexModal !== 'show') {
            return PokedexHelper.cachedFilteredList;
        }

        PokedexHelper.cachedFilteredList = PokedexHelper.getList();
        return PokedexHelper.cachedFilteredList;
    })

    public static getList(): typeof pokemonList {
        // Peek a computed to avoid subscribing to 1000s of statistics
        const highestDex = ko.pureComputed(() => {
            const highestSeen = App.game.statistics.pokemonSeen.highestID;
            const highestEncountered = App.game.statistics.pokemonEncountered.highestID;
            const highestDefeated = App.game.statistics.pokemonDefeated.highestID;
            const highestCaught = App.game.statistics.pokemonCaptured.highestID;
            return Math.max(highestSeen, highestEncountered, highestDefeated, highestCaught);
        }).peek();

        return pokemonList.filter((pokemon) => {
            // Checks based on caught/shiny status
            const alreadyCaught = App.game.party.alreadyCaughtPokemon(pokemon.id);
            const alreadyCaughtShiny = App.game.party.alreadyCaughtPokemon(pokemon.id, true);

            // If the Pokemon shouldn't be unlocked yet
            const nativeRegion = PokemonHelper.calcNativeRegion(pokemon.name);
            if (nativeRegion > GameConstants.MAX_AVAILABLE_REGION || nativeRegion == GameConstants.Region.none && !alreadyCaught) {
                return false;
            }

            // If not showing this region
            const region: (GameConstants.Region | null) = PokedexFilters.region.value() ?? null;
            if (region != null && region != nativeRegion) {
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
            const name = PokemonHelper.displayName(pokemon.name)();
            if (!PokedexFilters.name.value().test(name)) {
                return false;
            }

            // Check if either of the types match
            const type1: (PokemonType | null) = PokedexFilters.type1.value();
            const type2: (PokemonType | null) = PokedexFilters.type2.value();
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
            // Hide uncaught base forms if alternative form is caught
            if (!alreadyCaught && pokemon.id == Math.floor(pokemon.id) && App.game.party._caughtPokemon().some((p) => Math.floor(p.id) == pokemon.id)) {
                return false;
            }

            const caughtShiny = PokedexFilters.caughtShiny.value();
            // Only uncaught
            if (caughtShiny == 'uncaught' && alreadyCaught) {
                return false;
            }

            // All caught
            if (caughtShiny == 'caught' && !alreadyCaught) {
                return false;
            }

            // Only caught not shiny
            if (caughtShiny == 'caught-not-shiny' && (!alreadyCaught || alreadyCaughtShiny)) {
                return false;
            }

            // Only caught shiny
            if (caughtShiny == 'caught-shiny' && !alreadyCaughtShiny) {
                return false;
            }

            /* Only base form if alternate exist (Zarbi, Basculin, ...)
             * if Mega are not alternative pokemon, this work
             * else change condition by `filter['hide-alternate'] && (!Number.isInteger(pokemon.id) || Math.sign(pokemon.id) === -1)`
             */
            if (PokedexFilters.hideAlternate.value() && !Number.isInteger(pokemon.id)) {
                return false;
            }

            // Only pokemon with a hold item
            if (PokedexFilters.heldItem.value() && !BagHandler.displayName((pokemon as PokemonListData).heldItem)) {
                return false;
            }

            // Only pokemon uninfected by pokerus || None
            if (PokedexFilters.statusPokerus.value() != -1 && PokedexFilters.statusPokerus.value() != App.game.party.getPokemon(pokemon.id)?.pokerus) {
                return false;
            }

            // Only pokemon with selected category
            if (PokedexFilters.category.value() != -1 && PokedexFilters.category.value() != App.game.party.getPokemon(pokemon.id)?.category) {
                return false;
            }

            const uniqueTransformation = PokedexFilters.uniqueTransformation.value();
            // Only Base Pokémon with Mega available
            if (uniqueTransformation == 'mega-available' && !(pokemon as PokemonListData).evolutions?.some((p) => p.evolvedPokemon.startsWith('Mega '))) {
                // Another option: !(pokemon as PokemonListData).evolutions?.some((p) => p.restrictions.some(p => p instanceof MegaEvolveRequirement))
                return false;
            }
            // Only Mega Pokémon
            if (uniqueTransformation == 'mega-pokemon' && !(pokemon as PokemonListData).name.startsWith('Mega ')) {
                return false;
            }

            return true;
        }) as typeof pokemonList;
    }

    // Gender ratio
    public static getGenderRatioData(pokemon) {
        const genderType = pokemon.gender.type;
        const genderRatio = pokemon.gender.femaleRatio;
        const genderObject = {'male': 0, 'female': 0};
        // console.log(pokemon);
        genderObject.male = 100 - (100 * genderRatio);
        genderObject.female = 100 * genderRatio;
        return genderObject;
    }

    private static isPureType(pokemon: PokemonListData, type: (PokemonType | null)): boolean {
        return (pokemon.type.length === 1 && (type == null || pokemon.type[0] === type));
    }
}

$(document).ready(() => {
    $('#pokemonStatisticsModal').on('hidden.bs.modal', () => {
        PokedexHelper.toggleStatisticShiny(true);
    });
});
