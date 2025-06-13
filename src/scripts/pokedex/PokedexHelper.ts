class PokedexHelper {

    public static initialize() {
        pokedexFilterSettingKeys.forEach((filter) => {
            Settings.getSetting(filter).observableValue.subscribe(() => {
                PokedexHelper.scrollToTop();
                PokedexHelper.resetPokedexFlag.notifySubscribers();
            });
        });

        DisplayObservables.modalState.pokedexModalObservable.subscribe((modalState) => {
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
        if (PokedexHelper.cachedFilteredList && DisplayObservables.modalState.pokedexModal !== 'show') {
            return PokedexHelper.cachedFilteredList;
        }

        PokedexHelper.cachedFilteredList = PokedexHelper.getList();
        return PokedexHelper.cachedFilteredList;
    })


    public static formatSearch(value: string) {
        if (/[^\d]/.test(value)) {
            // non-integer, use as name filter
            Settings.setSettingByName('pokedexNameFilter', value);
            Settings.setSettingByName('pokedexIDFilter', -1);
        } else {
            // integer, use as ID filter
            Settings.setSettingByName('pokedexIDFilter', (value != '' ? +value : -1));
            Settings.setSettingByName('pokedexNameFilter', '');
        }
    }

    public static getSearchString() {
        const name = Settings.getSetting('pokedexNameFilter').value;
        const id = Settings.getSetting('pokedexIDFilter').value;
        return id == -1 ? name : id;
    }

    public static getList(): typeof pokemonList {
        // Peek a computed to avoid subscribing to 1000s of statistics
        const highestDex = ko.pureComputed(() => {
            const highestSeen = App.game.statistics.pokemonSeen.highestID;
            const highestEncountered = App.game.statistics.pokemonEncountered.highestID;
            const highestDefeated = App.game.statistics.pokemonDefeated.highestID;
            const highestCaught = App.game.statistics.pokemonCaptured.highestID;
            const highestRegionID = player.hasBeatenChampOfRegion() ? GameConstants.MaxIDPerRegion[player.highestRegion()] : -1;
            return Math.max(highestSeen, highestEncountered, highestDefeated, highestCaught, highestRegionID);
        }).peek();

        const shadowPokemon = PokemonHelper.getAllShadowPokemon.peek();

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
            const region: (GameConstants.Region | null) = Settings.getSetting('pokedexRegionFilter').observableValue();
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

            const nameFilterSetting = Settings.getSetting('pokedexNameFilter') as SearchSetting;
            if (nameFilterSetting.observableValue() != '') {
                const nameFilter = nameFilterSetting.regex();
                const displayName = PokemonHelper.displayName(pokemon.name)();
                const partyName = App.game.party.getPokemonByName(pokemon.name)?.displayName;
                if (!nameFilter.test(displayName) && !nameFilter.test(pokemon.name) && !(partyName != undefined && nameFilter.test(partyName))) {
                    return false;
                }
            }

            // Check ID
            const filterID = Settings.getSetting('pokedexIDFilter').observableValue();
            if (filterID > -1 && filterID != Math.floor(pokemon.id)) {
                return false;
            }

            // Check if either of the types match
            const type1: (PokemonType | null) = Settings.getSetting('pokedexType1Filter').observableValue();
            const type2: (PokemonType | null) = Settings.getSetting('pokedexType2Filter').observableValue();
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
                App.game.party.caughtPokemon.some((p) => Math.floor(p.id) == pokemon.id && PokemonHelper.calcNativeRegion(p.name) == nativeRegion)
            ) {
                return false;
            }

            const caughtStatus = Settings.getSetting('pokedexCaughtFilter').observableValue();

            // Only uncaught
            if (caughtStatus == 'uncaught' && alreadyCaught) {
                return false;
            }

            // All caught
            if (caughtStatus == 'caught' && !alreadyCaught) {
                return false;
            }

            // Only caught not shiny
            if (caughtStatus == 'caught-not-shiny' && (!alreadyCaught || alreadyCaughtShiny)) {
                return false;
            }

            // Only caught shiny
            if (caughtStatus == 'caught-shiny' && !alreadyCaughtShiny) {
                return false;
            }

            // Only caught not shadow
            if (caughtStatus == 'caught-not-shadow' && (!alreadyCaught || alreadyCaughtShadow || !shadowPokemon.has(pokemon.name))) {
                return false;
            }

            // Only caught shadow
            if (caughtStatus == 'caught-shadow' && (!alreadyCaughtShadow || alreadyCaughtPurified)) {
                return false;
            }

            // Only caught purified
            if (caughtStatus == 'caught-purified' && !alreadyCaughtPurified) {
                return false;
            }

            /* Only base form if alternate exist (Unown, Basculin, ...)
             * Mainline regional forms are shown as they are part of dex completion
             */
            if (Settings.getSetting('pokedexHideAltFilter').observableValue() && !Number.isInteger(pokemon.id) && hasBaseFormInSameRegion()) {
                return false;
            }

            // Only pokemon with a hold item
            if (Settings.getSetting('pokedexHeldItemFilter').observableValue() && !BagHandler.displayName((pokemon as PokemonListData).heldItem)) {
                return false;
            }

            // Only pokemon with this pokerus status
            const pokerusFilter = Settings.getSetting('pokedexPokerusFilter').observableValue();
            if (pokerusFilter != -1 && pokerusFilter !== App.game.party.getPokemon(pokemon.id)?.pokerus) {
                return false;
            }

            // Only pokemon with selected category
            const categoryFilter = Settings.getSetting('pokedexCategoryFilter').observableValue();
            if (categoryFilter != -1) {
                if (!alreadyCaught) {
                    return false;
                }
                const partyPokemon = App.game.party.getPokemon(pokemon.id);
                // Categorized only
                if (categoryFilter == -2 && partyPokemon.isUncategorized()) {
                    return false;
                }
                // Selected category
                if (categoryFilter >= 0 && !partyPokemon.category.includes(categoryFilter)) {
                    return false;
                }
            }

            const uniqueTransformation = Settings.getSetting('pokedexUniqueTransformationFilter').observableValue();
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
    public static resetPokedexFlag = ko.computed(() => DisplayObservables.modalState.pokedexModal === 'hidden');

    private static scrollToTop() {
        document.querySelector('#pokedex-pokemon-list-container .scrolling-div-pokedex').scrollTop = 0;
    }

    public static filteredListPartyPokemon(): Array<PartyPokemon> {
        return PokedexHelper.filteredList().map((p) => App.game.party.getPokemon(p.id)).filter((p) => p !== undefined);
    }
}
