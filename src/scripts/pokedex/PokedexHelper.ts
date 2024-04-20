class PokedexHelper {

    public static initialize() {
        Object.values(PokedexFilters).forEach((filter) => {
            filter.value.subscribe(() => {
                PokedexHelper.scrollToTop();
                PokedexHelper.resetPokedexFlag.notifySubscribers();
            });
        });

        modalUtils.observableState.pokedexModalObservable.subscribe((modalState) => {
            // Resetting scrolling only works before modal is fully hidden
            if (modalState === 'hide') {
                PokedexHelper.scrollToTop();
            }
        });
    }

    public static getBackgroundColors(name: PokemonNameType): string {
        const pokemon = PokemonHelper.getPokemonByName(name);

        if (!this.pokemonSeen(pokemon.id)()) {
            return 'grey';
        }
        if (pokemon.type2 == PokemonType.None) {
            return GameConstants.TypeColor[pokemon.type1];
        }
        return `linear-gradient(90deg,${GameConstants.TypeColor[pokemon.type1]} 50%, ${GameConstants.TypeColor[pokemon.type2]} 50%)`;
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

    public static formatSearch(value: string) {
        if (/[^\d]/.test(value)) {
            PokedexFilters.name.value(new RegExp(`(${/^\/.+\/$/.test(value) ? value.slice(1, -1) : GameHelper.escapeStringRegex(value)})`, 'i'));
            PokedexFilters.id.value(-1);
        } else {
            PokedexFilters.id.value(value != '' ? +value : -1);
            PokedexFilters.name.value(new RegExp('', 'i'));
        }
    }

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
            const alreadyCaughtShadow = App.game.party.alreadyCaughtPokemon(pokemon.id, false, true);
            const alreadyCaughtPurified = App.game.party.alreadyCaughtPokemon(pokemon.id, false, true, true);

            // If the Pokemon shouldn't be unlocked yet
            const nativeRegion = PokemonHelper.calcNativeRegion(pokemon.name);
            if (nativeRegion > player.highestRegion() || nativeRegion == GameConstants.Region.none && !alreadyCaught) {
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

            // Check if the englishName or displayName contains the string
            const displayName = PokemonHelper.displayName(pokemon.name)();
            const filterName = PokedexFilters.name.value();
            const partyName = App.game.party.getPokemonByName(pokemon.name)?.displayName;
            if (!filterName.test(displayName) && !filterName.test(pokemon.name) && !(partyName != undefined && filterName.test(partyName))) {
                return false;
            }

            // Check ID
            const filterID = PokedexFilters.id.value();
            if (filterID > -1 && filterID != Math.floor(pokemon.id)) {
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
            const hasBaseFormInSameRegion = () => pokemonList.some((p) => Math.floor(p.id) == Math.floor(pokemon.id) && p.id < pokemon.id && PokemonHelper.calcNativeRegion(p.name) == nativeRegion);
            // Alternate forms that we haven't caught yet
            if (!alreadyCaught && pokemon.id != Math.floor(pokemon.id) && hasBaseFormInSameRegion()) {
                return false;
            }
            // Hide uncaught base forms if alternate non-regional form is caught
            if (!alreadyCaught && pokemon.id == Math.floor(pokemon.id) &&
                App.game.party._caughtPokemon().some((p) => Math.floor(p.id) == pokemon.id && PokemonHelper.calcNativeRegion(p.name) == nativeRegion)
            ) {
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

            // Only caught not shadow
            if (caughtShiny == 'caught-not-shadow' && (!alreadyCaught || alreadyCaughtShadow)) {
                return false;
            }

            // Only caught shadow
            if (caughtShiny == 'caught-shadow' && (!alreadyCaughtShadow || alreadyCaughtPurified)) {
                return false;
            }

            // Only caught purified
            if (caughtShiny == 'caught-purified' && !alreadyCaughtPurified) {
                return false;
            }

            /* Only base form if alternate exist (Zarbi, Basculin, ...)
             * Mainline regional forms are shown as they are part of dex completion
             */
            if (PokedexFilters.hideAlternate.value() && !Number.isInteger(pokemon.id) && hasBaseFormInSameRegion()) {
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

            if (PokedexFilters.category.value() != -1) {
                if (!alreadyCaught) {
                    return false;
                }
                const partyPokemon = App.game.party.getPokemon(pokemon.id);
                // Categorized only
                if (PokedexFilters.category.value() == -2 && partyPokemon.isUncategorized()) {
                    return false;
                }
                // Selected category
                if (PokedexFilters.category.value() >= 0 && !partyPokemon.category.includes(PokedexFilters.category.value())) {
                    return false;
                }
            }

            const uniqueTransformation = PokedexFilters.uniqueTransformation.value();
            // Only Base Pokémon with Mega available
            if (uniqueTransformation == 'mega-available' && !PokemonHelper.hasMegaEvolution(pokemon.name)) {
                // Another option: !(pokemon as PokemonListData).evolutions?.some((p) => p.restrictions.some(p => p instanceof MegaEvolveRequirement))
                return false;
            }
            // Only Base Pokémon without Mega Evolution
            if (uniqueTransformation == 'mega-unobtained' && !PokemonHelper.hasUncaughtMegaEvolution(pokemon.name)) {
                return false;
            }
            // Only Mega Pokémon
            if (uniqueTransformation == 'mega-evolution' && !PokemonHelper.isMegaEvolution(pokemon.name)) {
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

    // Flag for the LazyLoader
    public static resetPokedexFlag = ko.computed(() => modalUtils.observableState.pokedexModal === 'hidden');

    private static scrollToTop() {
        document.querySelector('#pokedex-pokemon-list-container .scrolling-div-pokedex').scrollTop = 0;
    }

    public static filteredListPartyPokemon(): Array<PartyPokemon> {
        return PokedexHelper.filteredList().map((p) => App.game.party.getPokemon(p.id)).filter((p) => p !== undefined);
    }
}
