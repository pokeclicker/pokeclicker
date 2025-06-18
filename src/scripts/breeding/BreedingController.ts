/// <reference path="../../declarations/enums/CaughtStatus.d.ts"/>
/// <reference path="../../declarations/breeding/EggType.d.ts" />
/// <reference path="../../declarations/utilities/DisplayObservables.d.ts" />
/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/koExtenders.d.ts" />
/// <reference path="../party/PartyController.ts" />

class BreedingController {
    public static selectedEggItem: KnockoutObservable<GameConstants.EggItemType> = ko.observable(undefined);

    public static initialize() {
        // Track view settings for hatchery list rerendering
        const hatcheryListSettings = [...breedingFilterSettingKeys, 'hatcherySort', 'hatcherySortDirection'];

        hatcheryListSettings.forEach((setting) => {
            Settings.getSetting(setting).observableValue.subscribe(() => {
                BreedingController.viewResetWaiting(true);
                BreedingController.hatcherySortedFilteredList.evaluateEarly();
            });
        });

        // Reset hatchery display upon modal close
        DisplayObservables.modalState.breedingModalObservable.subscribe((modalState) => {
            // Resetting scrolling only works before modal is fully hidden
            if (modalState === 'hide') {
                BreedingController.scrollToTop();
                BreedingController.resetFilteredListNotifier.notifySubscribers();
            } else if (modalState === 'hidden') {
                BreedingController.resetHatcheryView();
            }
        });
    }

    public static openBreedingModal() {
        if (App.game.breeding.canAccess()) {
            $('#breedingModal').modal('show');
        } else {
            Notifier.notify({
                message: 'You do not have access to the Day Care yet.\n<i>Clear Route 3 first.</i>',
                type: NotificationConstants.NotificationOption.warning,
            });
        }
    }

    public static getEggCssClass(egg: Egg): string {
        const animationType = Settings.getSetting('eggAnimation').observableValue();
        if (animationType === 'none') {
            return '';
        }

        if (egg.progress() >= 100) {
            return 'hatching';
        }

        return (animationType === 'almost' && egg.stepsRemaining() <= 50) ?  'hatchingSoon' : '';
    }

    public static getEggSpots(pokemonName: PokemonNameType) {
        const pokemon = pokemonMap[pokemonName];

        if (EggSpots.customPattern[pokemon.name]) {
            return EggSpots.customPattern[pokemon.name];
        }

        const seed = pokemon.id * pokemon.type.reduce((a,b) => a * (b + 1), 1);
        SeededRand.seed(seed);
        SeededRand.seed(SeededRand.intBetween(0, 1000));
        return SeededRand.fromArray(EggSpots.spotTypes);
    }

    public static getQueueImage([type, id]: HatcheryQueueEntry) {
        if (type == EggType.Pokemon) {
            return PokemonHelper.getImage(id);
        } else if (type == EggType.EggItem) {
            return `assets/images/breeding/${GameConstants.EggItemType[id]}.png`;
        }
        return '';
    }

    public static getEggPokemonName(egg: Egg): string | null {
        return egg.type === EggType.Pokemon ? egg.partyPokemon()?.name : null;
    }

    public static formatSearch(value: string) {
        if (/[^\d]/.test(value)) {
            // non-integer, use as name filter
            Settings.setSettingByName('breedingNameFilter', value);
            Settings.setSettingByName('breedingIDFilter', -1);
        } else {
            // integer, use as ID filter
            Settings.setSettingByName('breedingIDFilter', (value != '' ? +value : -1));
            Settings.setSettingByName('breedingNameFilter', '');
        }
    }

    public static getSearchString() {
        const name = Settings.getSetting('breedingNameFilter').value;
        const id = Settings.getSetting('breedingIDFilter').value;
        return id == -1 ? name : id;
    }

    public static getRegionFilterString() {
        const unlockedRegionsMask = (2 << player.highestRegion()) - 1;
        const showRegions = Settings.getSetting('breedingRegionFilter').observableValue() & unlockedRegionsMask;
        if (showRegions == unlockedRegionsMask) {
            return 'All';
        } else if (showRegions > 0) {
            const highestBit = Math.floor(Math.log2(showRegions));
            let txt = GameConstants.camelCaseToString(GameConstants.Region[highestBit]);
            if (showRegions > (1 << highestBit)) {
                txt += ' & more';
            }
            return txt;
        } else {
            return 'None';
        }
    }

    public static isPureType(pokemon: PartyPokemon, type: (PokemonType | null)): boolean {
        const pokemonData = pokemonMap[pokemon.name];
        return ((type == null || pokemonData.type[0] === type) && (pokemonData.type[1] == undefined || pokemonData.type[1] == PokemonType.None));
    }

    // Value displayed at bottom of image
    public static getDisplayValue(pokemon: PartyPokemon): string {
        const pokemonData = pokemonMap[pokemon.name];
        switch (Settings.getSetting('breedingDisplayTextSetting').observableValue()) {
            case 'attackBonus': return `Attack Bonus: ${Math.floor(pokemon.getBreedingAttackBonus() * BreedingController.calculateRegionalMultiplier(pokemon)).toLocaleString('en-US')}`;
            case 'baseAttack': return `Base Attack: ${pokemon.baseAttack.toLocaleString('en-US')}`;
            case 'eggSteps': return `Egg Steps: ${pokemon.getEggSteps().toLocaleString('en-US')}`;
            case 'timesHatched': return `Hatches: ${App.game.statistics.pokemonHatched[pokemonData.id]().toLocaleString('en-US')}`;
            case 'breedingEfficiency': return `Efficiency: ${(pokemon.breedingEfficiency() * BreedingController.calculateRegionalMultiplier(pokemon)).toLocaleString('en-US', { maximumFractionDigits: 3 })}`;
            case 'stepsPerAttack': return `Steps/Att: ${(pokemon.getEggSteps() / (pokemon.getBreedingAttackBonus() * BreedingController.calculateRegionalMultiplier(pokemon))).toLocaleString('en-US', { maximumFractionDigits: 3 })}`;
            case 'dexId': return `#${pokemon.id <= 0 ? '???' : Math.floor(pokemon.id).toString().padStart(3,'0')}`;
            case 'vitamins': return `Vitamins: ${pokemon.totalVitaminsUsed()}`;
            case 'evs': return `EVs: ${pokemon.evs().toLocaleString('en-US')}`;
            case 'attack':
            default:
                return `Attack: ${Math.floor(pokemon.attack * BreedingController.calculateRegionalMultiplier(pokemon)).toLocaleString('en-US')}`;
        }
    }

    public static calculateRegionalMultiplier(pokemon: PartyPokemon): number {
        // Check if regional debuff is active
        if (App.game.challenges.list.regionalAttackDebuff.active()) {
            // Check if regional debuff being applied for sorting
            const regionalAttackDebuff = Settings.getSetting('breedingRegionalAttackDebuffSetting').observableValue();
            if (regionalAttackDebuff > -1 && PokemonHelper.calcNativeRegion(pokemon.name) !== regionalAttackDebuff) {
                return App.game.party.getRegionAttackMultiplier();
            }
        }
        return 1.0;
    }

    public static calcEggOdds(eggItem: GameConstants.EggItemType, pokemon: PokemonNameType): number {
        const hatchList = App.game.breeding.hatchList[eggItem];
        const region = hatchList.findIndex(r => r.includes(pokemon));

        if (region === -1) {
            return 0;
        }

        const regionPoolCount = eggItem === GameConstants.EggItemType.Mystery_egg
            ? Object.values(App.game.breeding.hatchList).reduce((total, eggTypePool) => total += eggTypePool[region].length, 0)
            : hatchList[region].length;

        const regionDiff = 1 + (player.highestRegion() - Math.max(1, region));
        // odds of this region pool
        const odds = 1 / Math.pow(2, regionDiff);
        // odds of pokemon in this region pool
        return odds / regionPoolCount;
    }

    // Queue size limit setting
    public static queueSizeLimit = ko.observable(-1);

    // Used to pause hatchery list until all the filteredList changes are available
    // Otherwise changing the filters would render removing and adding entries at different times
    public static viewResetWaiting = ko.observable(false);
    private static viewResetReady = false;

    // Pausable access to the sorted list for the modal, with view logic
    private static _cachedSortedFilteredList = [];
    public static viewSortedFilteredList: KnockoutComputed<Array<PartyPokemon>> = ko.pureComputed(() => {
        // Pause updates while the modal is closed
        if (DisplayObservables.modalState.breedingModal === 'show') {
            BreedingController._cachedSortedFilteredList = BreedingController.hatcherySortedFilteredList();
            // Finish resetting the LazyLoader display after filters change
            if (BreedingController.viewResetReady) {
                BreedingController.resetHatcheryView();
            }
        }
        return BreedingController._cachedSortedFilteredList;
    });

    // Sorted list of pokemon that match hatchery filters
    private static hatcherySortedFilteredList = ko.pureComputed(() => {
        const hatcheryList = Array.from(BreedingController.hatcheryFilteredList());
        // Don't adjust attack based on region if debuff is disabled
        const region = App.game.challenges.list.regionalAttackDebuff.active() ? Settings.getSetting('breedingRegionalAttackDebuffSetting').observableValue() : -1;
        hatcheryList.sort(PartyController.compareBy(Settings.getSetting('hatcherySort').observableValue(), Settings.getSetting('hatcherySortDirection').observableValue(), region));
        // If a filter or sort order just changed
        if (BreedingController.viewResetWaiting.peek()) {
            // Ready to rerender now that the list is up to date
            BreedingController.viewResetReady = true;
        }
        return hatcheryList;
    }).extend({ skippableRateLimit: 500 }) as KnockoutComputed<PartyPokemon[]> & SkippableRateLimit;  // Lets us rerender immediately after filter changes

    // Filters for pokemon that match hatchery filters
    private static hatcheryFilteredList: KnockoutComputed<PartyPokemon[]> = ko.pureComputed(() => {
        // Subscribe to force view resets even when none of the pokemon.matchesHatcheryFilters() computeds change
        BreedingController.resetFilteredListNotifier();
        return App.game.party.caughtPokemon.filter((pokemon) => pokemon.matchesHatcheryFilters());
    }).extend({ rateLimit: 100 }); // deferUpdates isn't good enough to prevent lag

    // Used to reset the LazyLoaderdisplay
    public static resetHatcheryFlag = ko.computed(() => DisplayObservables.modalState.breedingModal === 'hidden');

    private static resetFilteredListNotifier = ko.observable(null);

    private static resetHatcheryView() {
        BreedingController.scrollToTop();
        BreedingController.resetHatcheryFlag.notifySubscribers();
        BreedingController.viewResetWaiting(false);
        BreedingController.viewResetReady = false;
    }

    private static scrollToTop() {
        document.querySelector('#breeding-pokemon-list-container .scrolling-div-breeding-list').scrollTop = 0;
    }
}
