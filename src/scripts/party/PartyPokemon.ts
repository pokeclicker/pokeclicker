/// <reference path="../../declarations/party/LevelType.d.ts" />

enum PartyPokemonSaveKeys {
    attackBonusPercent = 0,
    attackBonusAmount,
    vitaminsUsed,
    exp,
    breeding,
    shiny,
    category,
    levelEvolutionTriggered,
    pokerus,
    effortPoints,
    heldItem,
    defaultFemaleSprite,
    hideShinyImage,
    nickname,
    shadow,
    showShadowImage,
}

class PartyPokemon implements Saveable {
    saveKey: string;
    public exp = 0;
    public evs: KnockoutComputed<number>;
    _attack: KnockoutComputed<number>;
    private _canUseHeldItem: KnockoutComputed<boolean>;

    defaults = {
        attackBonusPercent: 0,
        attackBonusAmount: 0,
        vitaminsUsed: {},
        exp: 0,
        breeding: false,
        shiny: false,
        category: [0],
        levelEvolutionTriggered: false,
        pokerus: GameConstants.Pokerus.Uninfected,
        effortPoints: 0,
        defaultFemaleSprite: false,
        hideShinyImage: false,
        nickname: '',
        shadow: GameConstants.ShadowStatus.None,
        showShadowImage: false,
    };

    // Saveable observables
    // Consider the Real evolution challenge before adding stuff here
    _breeding: KnockoutObservable<boolean>;
    _shiny: KnockoutObservable<boolean>;
    _level: KnockoutObservable<number>;
    _attackBonusPercent: KnockoutObservable<number>;
    _attackBonusAmount: KnockoutObservable<number>;
    _category: KnockoutObservableArray<number>;
    _translatedName: KnockoutObservable<string>;
    _nickname: KnockoutObservable<string>;
    _displayName: KnockoutComputed<string>;
    _pokerus: KnockoutObservable<GameConstants.Pokerus>;
    vitaminsUsed: Record<GameConstants.VitaminType, KnockoutObservable<number>>;
    _effortPoints: KnockoutObservable<number>;
    heldItem: KnockoutObservable<HeldItem>;
    defaultFemaleSprite: KnockoutObservable<boolean>;
    hideShinyImage: KnockoutObservable<boolean>;
    _shadow: KnockoutObservable<GameConstants.ShadowStatus>;
    _showShadowImage: KnockoutObservable<boolean>;

    constructor(
        public id: number,
        public name: PokemonNameType,
        public evolutions: EvoData[],
        public baseAttack: number,
        public eggCycles: number,
        shiny = false,
        public gender,
        shadow: GameConstants.ShadowStatus
    ) {
        this.vitaminsUsed = Object.fromEntries(GameHelper.enumNumbers(GameConstants.VitaminType).map((vitamin) => {
            return [vitamin, ko.observable(0).extend({ numeric: 0 })];
        })) as Record<GameConstants.VitaminType, KnockoutObservable<number>>;
        this._breeding = ko.observable(false).extend({ boolean: null });
        this._shiny = ko.observable(shiny).extend({ boolean: null });
        this._level = ko.observable(1).extend({ numeric: 0 });
        this._attackBonusPercent = ko.observable(0).extend({ numeric: 0 });
        this._attackBonusAmount = ko.observable(0).extend({ numeric: 0 });
        this._category = ko.observableArray([0]);
        this._translatedName = PokemonHelper.displayName(name);
        this._pokerus = ko.observable(GameConstants.Pokerus.Uninfected).extend({ numeric: 0 });
        this._effortPoints = ko.observable(0).extend({ numeric: 0 });
        this.evs = ko.pureComputed(() => {
            return Math.floor(this.calculateEVs());
        });
        const resistantSub = this.evs.subscribe((newValue) => {
            // Change Pokerus status to Resistant when reaching 50 EVs
            if (this.pokerus && newValue >= 50) {
                // Only notify if not yet Resistant, i.e. not when game loads already-Resistant party members
                if (this.pokerus < GameConstants.Pokerus.Resistant) {
                    this.pokerus = GameConstants.Pokerus.Resistant;

                    // Log and notify player
                    Notifier.notify({
                        message: `${this.name} has become Resistant to Pokérus.`,
                        pokemonImage: PokemonHelper.getImage(this.id),
                        type: NotificationConstants.NotificationOption.info,
                        sound: NotificationConstants.NotificationSound.General.pokerus,
                        setting: NotificationConstants.NotificationSetting.General.pokerus,
                    });
                    App.game.logbook.newLog(LogBookTypes.NEW, createLogContent.resistantToPokerus({ pokemon: this.name }));
                }
                resistantSub.dispose();
            }
        });
        this.heldItem = ko.observable(undefined);
        this.defaultFemaleSprite = ko.observable(false);
        this.hideShinyImage = ko.observable(false);
        this._nickname = ko.observable();
        this._displayName = ko.pureComputed(() => this._nickname() ? this._nickname() : this._translatedName());
        this._shadow = ko.observable(shadow);
        this._showShadowImage = ko.observable(false);
        this._attack = ko.computed(() => this.calculateAttack());
        this._canUseHeldItem = ko.pureComputed(() => this.heldItem()?.canUse(this));
        this._canUseHeldItem.subscribe((canUse) => {
            if (!canUse && this.heldItem()) {
                this.addOrRemoveHeldItem(this.heldItem());
            }
        });
        this._category.subscribe((newValue) => {
            if (!newValue.length) {
                this._category.push(0); // add None category
            } else if (newValue.length > 1) {
                this.removeCategory(0); // remove None category
            }
        });
    }

    public calculateAttack(ignoreLevel = false): number {
        const attackBonusMultiplier = 1 + (this.attackBonusPercent / 100);
        const levelMultiplier = ignoreLevel ? 1 : this.level / 100;
        const evsMultiplier = this.calculateEVAttackBonus();
        const heldItemMultiplier = this.heldItemAttackBonus();
        const shadowMultiplier = this.shadowAttackBonus();
        return Math.max(1, Math.floor((this.baseAttack * attackBonusMultiplier + this.attackBonusAmount) * levelMultiplier * evsMultiplier * heldItemMultiplier * shadowMultiplier));
    }

    public clickAttackBonus = ko.pureComputed((): number => {
        // Caught + Shiny + Resistant + Purified
        const bonus = 1 + +this.shiny + +(this.pokerus >= GameConstants.Pokerus.Resistant) + +(this.shadow == GameConstants.ShadowStatus.Purified);
        const heldItemMultiplier = this.heldItem() instanceof HybridAttackBonusHeldItem ? (this.heldItem() as HybridAttackBonusHeldItem).clickAttackBonus : 1;
        return bonus * heldItemMultiplier;
    });

    public canCatchPokerus(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItemType.Pokerus_virus);
    }

    public calculatePokerusTypes(): Set<number> {
        // Egg can't hatch and valid Egg has pokerus
        const eggTypes: Set<number> = new Set();
        for (let i = 0; i < App.game.breeding.eggList.length; i++) {
            if (i > App.game.breeding.hatcheryHelpers.hired().length - 1) {
                const egg = App.game.breeding.eggList[i]();
                if (!egg.canHatch() && !egg.isNone()) {
                    const pokerus = App.game.party.getPokemon(pokemonMap[egg.pokemon].id)?.pokerus;
                    if (pokerus && pokerus >= GameConstants.Pokerus.Contagious) {
                        eggTypes.add(PokemonHelper.getPokemonByName(pokemonMap[App.game.breeding.eggList[i]().pokemon].name).type1);
                        eggTypes.add(PokemonHelper.getPokemonByName(pokemonMap[App.game.breeding.eggList[i]().pokemon].name).type2);
                    }
                }
            }
        }
        if (eggTypes.has(PokemonType.None)) {
            eggTypes.delete(PokemonType.None);
        }
        return eggTypes;
    }

    public calculatePokerus(index: number) {
        const eggTypes = this.calculatePokerusTypes();
        for (let i = index; i < App.game.breeding.eggList.length; i++) {
            const pokemon = App.game.breeding.eggList[i]().partyPokemon();
            if (pokemon && pokemon.pokerus == GameConstants.Pokerus.Uninfected) {
                const dataPokemon = PokemonHelper.getPokemonByName(pokemon.name);
                if (eggTypes.has(dataPokemon.type1) || eggTypes.has(dataPokemon.type2)) {
                    pokemon.pokerus = GameConstants.Pokerus.Infected;
                }
            }
        }
    }

    calculateLevelFromExp() {
        const levelType = PokemonHelper.getPokemonByName(this.name).levelType;
        for (let i = this.level - 1; i < levelRequirements[levelType].length; i++) {
            if (levelRequirements[levelType][i] > this.exp) {
                return Math.min(i, App.game.badgeCase.maxLevel());
            }
        }
        return this.level;
    }

    public calculateEVs(): number {
        const power = App.game.challenges.list.slowEVs.active.peek() ? GameConstants.EP_CHALLENGE_MODIFIER : 1;
        return this._effortPoints() / GameConstants.EP_EV_RATIO / power;
    }

    public gainExp(exp: number) : number {
        const expGained = exp * this.getExpMultiplier();
        if (this.level < App.game.badgeCase.maxLevel()) {
            this.exp += expGained;

            const oldLevel = this.level;
            const newLevel = this.calculateLevelFromExp();
            if (oldLevel !== newLevel) {
                this.level = newLevel;
                this.checkForLevelEvolution();
            }
        }
        return expGained;
    }

    private getExpMultiplier() {
        let result = 1;
        if (this.heldItem() && this.heldItem() instanceof ExpGainedBonusHeldItem) {
            result *= (this.heldItem() as ExpGainedBonusHeldItem).gainedBonus;
        }
        return result;
    }

    public gainLevels(amount: number): number {
        if (amount < 0) {
            throw new Error(`PartyPokemon ${this.name} cannot gain negative levels!`);
        }
        const oldLevel = this.level;
        const newLevel = Math.min(this.level + amount, App.game.badgeCase.maxLevel());
        if (oldLevel !== newLevel) {
            this.level = newLevel;
            // Adjust exp to match
            const levelType = PokemonHelper.getPokemonByName(this.name).levelType;
            this.exp = levelRequirements[levelType][newLevel - 1];
            // Just leveled up so...
            this.checkForLevelEvolution();
        }
        return newLevel - oldLevel;
    }

    public checkForLevelEvolution() {
        if (this.breeding || this.evolutions == null || this.evolutions.length == 0) {
            return;
        }

        for (const evo of this.evolutions) {
            if (evo.trigger === EvoTrigger.LEVEL && EvolutionHandler.isSatisfied(evo)) {
                EvolutionHandler.evolve(evo);
            }
        }
    }

    public canUseStone(stoneType: GameConstants.StoneType): boolean {
        return this.evolutions?.filter(
            (evo) => evo.trigger === EvoTrigger.STONE
                && (evo as StoneEvoData).stone == stoneType
                && EvolutionHandler.isSatisfied(evo)
        ).length > 0;
    }

    public useStone(stoneType: GameConstants.StoneType): boolean {
        const possibleEvolutions: EvoData[] = [];
        for (const evo of this.evolutions) {
            if (evo.trigger === EvoTrigger.STONE && (evo as StoneEvoData).stone == stoneType && EvolutionHandler.isSatisfied(evo)) {
                possibleEvolutions.push(evo);
            }
        }
        if (possibleEvolutions.length !== 0) {
            return EvolutionHandler.evolve(Rand.fromArray(possibleEvolutions));
        }
        return false;
    }

    public useVitamin(vitamin: GameConstants.VitaminType, amount: number): void {
        if (App.game.challenges.list.disableVitamins.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Vitamins are disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        if (this.breeding) {
            Notifier.notify({
                message: 'Vitamins cannot be modified for Pokémon in the hatchery or queue.',
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }

        const usesRemaining = this.vitaminUsesRemaining();

        // If no more vitamins can be used on this Pokemon
        if (!usesRemaining) {
            Notifier.notify({
                message: 'This Pokémon cannot increase their power any higher!',
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }

        // The lowest number of amount they want to use, total in inventory, uses remaining for this Pokemon
        amount = Math.min(amount, player.itemList[GameConstants.VitaminType[vitamin]](), usesRemaining);

        // Apply the vitamin
        if (ItemHandler.useItem(GameConstants.VitaminType[vitamin], amount)) {
            GameHelper.incrementObservable(this.vitaminsUsed[vitamin], amount);
        }
    }

    public removeVitamin(vitamin: GameConstants.VitaminType, amount: number): void {
        if (this.breeding) {
            Notifier.notify({
                message: 'Vitamins cannot be modified for Pokémon in the hatchery or queue.',
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }

        const vitaminName = GameConstants.VitaminType[vitamin];
        amount = Math.min(amount, this.vitaminsUsed[vitamin]());

        if (amount <= 0) {
            Notifier.notify({
                message: `This Pokémon doesn't have any ${vitaminName} to remove!`,
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }

        GameHelper.incrementObservable(this.vitaminsUsed[vitamin], -amount);
        GameHelper.incrementObservable(player.itemList[vitaminName], amount);
    }

    public useConsumable(type: GameConstants.ConsumableType, amount: number): void {
        const itemName = GameConstants.ConsumableType[type];
        if (!player.itemList[itemName]()) {
            return Notifier.notify({
                message : `You do not have any more ${ItemList[itemName].displayName}`,
                type : NotificationConstants.NotificationOption.danger,
            });
        }

        switch (type) {
            case GameConstants.ConsumableType.Rare_Candy:
            case GameConstants.ConsumableType.Magikarp_Biscuit:
                amount = Math.min(amount, player.itemList[itemName]());
                if (this.breeding) {
                    return Notifier.notify({
                        message : `You cannot use ${ItemList[itemName].displayName} on Pokémon in the hatchery.`,
                        type : NotificationConstants.NotificationOption.danger,
                    });
                }
                const curAttack = this.calculateAttack(true);
                const bonus = GameConstants.BREEDING_ATTACK_BONUS * ((ItemList[itemName] as AttackGainConsumable).bonusMultiplier ?? 1);
                GameHelper.incrementObservable(this._attackBonusPercent, bonus * amount);
                Notifier.notify({
                    message : `${this.displayName} gained ${this.calculateAttack(true) - curAttack} attack points`,
                    type : NotificationConstants.NotificationOption.success,
                    pokemonImage : PokemonHelper.getImage(this.id),
                });
                const levelsGained = this.gainLevels(amount);
                if (levelsGained === 0) {
                    // Rare Candies cause level evolutions even at max level
                    this.checkForLevelEvolution();
                }
                break;
            default :
        }
        GameHelper.incrementObservable(player.itemList[itemName], -amount);
        Notifier.notify({
            message : `You used ${amount} of ${ItemList[itemName].displayName}`,
            type : NotificationConstants.NotificationOption.success,
            image : ItemList[itemName].image,
        });
    }

    totalVitaminsUsed = ko.pureComputed((): number => {
        return Object.values(this.vitaminsUsed).reduce((sum, obs) => sum + obs(), 0);
    });

    vitaminUsesRemaining = ko.pureComputed((): number => {
        // Allow 5 for every region visited (including Kanto)
        return (player.highestRegion() + 1) * 5 - this.totalVitaminsUsed();
    });

    calculateEVAttackBonus = ko.pureComputed((): number => {
        if (this.pokerus < GameConstants.Pokerus.Contagious) {
            return 1;
        }
        return (this.evs() < 50) ? (1 + 0.01 * this.evs()) : (Math.pow(this.evs(), Math.log(1.5) / Math.log(50)));
    });

    getEggSteps = ko.pureComputed((): number => {
        const div = 300;
        const extraCycles = (this.vitaminsUsed[GameConstants.VitaminType.Calcium]() + this.vitaminsUsed[GameConstants.VitaminType.Protein]()) / 2;
        const steps = App.game.breeding.getSteps(this.eggCycles + extraCycles);
        return steps <= div ? steps : Math.round(((steps / div) ** (1 - this.vitaminsUsed[GameConstants.VitaminType.Carbos]() / 70)) * div);
    });

    getBreedingAttackBonus = ko.pureComputed((): number => {
        const attackBonusPercent = (GameConstants.BREEDING_ATTACK_BONUS + this.vitaminsUsed[GameConstants.VitaminType.Calcium]()) / 100;
        const proteinBoost = this.vitaminsUsed[GameConstants.VitaminType.Protein]();
        let attackBonus = (this.baseAttack * attackBonusPercent) + proteinBoost;
        if (Settings.getSetting('breedingEfficiencyAllModifiers').observableValue()) {
            attackBonus *= this.calculateEVAttackBonus() * this.heldItemAttackBonus() * this.shadowAttackBonus();
        }
        return attackBonus;
    });

    heldItemAttackBonus = ko.pureComputed((): number => {
        return this.heldItem && this.heldItem() instanceof AttackBonusHeldItem ? (this.heldItem() as AttackBonusHeldItem).attackBonus : 1;
    });

    shadowAttackBonus = ko.pureComputed((): number => {
        return this.shadow == GameConstants.ShadowStatus.Shadow ? 0.8 : (this.shadow == GameConstants.ShadowStatus.Purified ? 1.2 : 1);
    });

    breedingEfficiency = ko.pureComputed((): number => {
        const breedingAttackBonus = this.getBreedingAttackBonus();
        return (breedingAttackBonus / this.getEggSteps()) * GameConstants.EGG_CYCLE_MULTIPLIER;
    });

    public isHatchable = ko.pureComputed(() => {
        return !(this.breeding || this.level < 100);
    });

    public isHatchableFiltered = ko.pureComputed(() => {
        return this.isHatchable() && this.matchesHatcheryFilters();
    });

    public matchesHatcheryFilters = ko.pureComputed(() => {
        // Check if search matches englishName or displayName
        const nameFilterSetting = Settings.getSetting('breedingNameFilter') as SearchSetting;
        if (nameFilterSetting.observableValue() != '') {
            const nameFilter = nameFilterSetting.regex();
            const displayName = PokemonHelper.displayName(this.name)();
            const partyName = this.displayName;
            if (!nameFilter.test(displayName) && !nameFilter.test(this.name) && !(partyName != undefined && nameFilter.test(partyName))) {
                return false;
            }
        }

        // Check if search matches species number
        const idFilter = Settings.getSetting('breedingIDFilter').observableValue();
        if (idFilter > -1 && idFilter != Math.floor(this.id)) {
            return false;
        }

        // Check based on categories
        const categoryFilter = Settings.getSetting('breedingCategoryFilter').observableValue();
        // Categorized only
        if (categoryFilter == -2 && this.isUncategorized()) {
            return false;
        }
        // Selected category
        if (categoryFilter >= 0 && !this.category.includes(categoryFilter)) {
            return false;
        }

        // Check based on shiny status
        const shinyFilter = Settings.getSetting('breedingShinyFilter').observableValue();
        if (shinyFilter >= 0 && +this.shiny !== shinyFilter) {
            return false;
        }

        // Check based on native region
        const unlockedRegionsMask = (2 << player.highestRegion()) - 1;
        const regionFilterMask = Settings.getSetting('breedingRegionFilter').observableValue() & unlockedRegionsMask;
        if (regionFilterMask !== unlockedRegionsMask) {
            const nativeRegion = PokemonHelper.calcNativeRegion(this.name);
            // With the region filter active, regionless pokemon should be shown only if no regions are selected
            const nativeRegionInFilter = nativeRegion !== GameConstants.Region.none ?
                (1 << nativeRegion) & regionFilterMask :
                regionFilterMask === 0;
            if (!nativeRegionInFilter) {
                return false;
            }
        }

        // Check based on Pokerus status
        const pokerusFilter = Settings.getSetting('breedingPokerusFilter').observableValue();
        if (pokerusFilter > -1 && this.pokerus !== pokerusFilter) {
            return false;
        }

        const uniqueTransformationFilter = Settings.getSetting('breedingUniqueTransformationFilter').observableValue();
        const pokemon = PokemonHelper.getPokemonById(this.id);
        // Only Base Pokémon with Mega available
        if (uniqueTransformationFilter == 'mega-available' && !PokemonHelper.hasMegaEvolution(pokemon.name)) {
            return false;
        }
        // Only Base Pokémon without Mega Evolution
        if (uniqueTransformationFilter == 'mega-unobtained' && !PokemonHelper.hasUncaughtMegaEvolution(pokemon.name)) {
            return false;
        }
        // Only Mega Pokémon
        if (uniqueTransformationFilter == 'mega-evolution' && !PokemonHelper.isMegaEvolution(pokemon.name)) {
            return false;
        }

        // Check to exclude alternate forms
        const hideAltFilter = Settings.getSetting('breedingHideAltFilter').observableValue();
        if (hideAltFilter && !Number.isInteger(pokemon.id)) {
            // Don't exclude alt forms native to a different region, as they're considered a main form for that region's progression
            const nativeRegion = PokemonHelper.calcNativeRegion(this.name);
            const hasBaseFormInSameRegion = pokemonList.some((p) => Math.floor(p.id) == Math.floor(pokemon.id) && p.id < pokemon.id && PokemonHelper.calcNativeRegion(p.name) == nativeRegion);
            if (hasBaseFormInSameRegion) {
                return false;
            }
        }

        // Check if either of the types match
        const type1: (PokemonType | null) = Settings.getSetting('breedingType1Filter').observableValue();
        const type2: (PokemonType | null) = Settings.getSetting('breedingType2Filter').observableValue();
        if (type1 !== null || type2 !== null) {
            const { type: types } = pokemonMap[this.name];
            if ([type1, type2].includes(PokemonType.None)) {
                const type = (type1 == PokemonType.None) ? type2 : type1;
                if (!BreedingController.isPureType(this, type)) {
                    return false;
                }
            } else if ((type1 !== null && !types.includes(type1)) || (type2 !== null && !types.includes(type2))) {
                return false;
            }
        }

        return true;
    });

    public giveHeldItem = (heldItem: HeldItem): void => {
        if (!this.heldItem() || heldItem.name != this.heldItem().name) {
            if (heldItem && !heldItem.canUse(this)) {
                Notifier.notify({
                    message: `This Pokémon cannot use ${heldItem.displayName}.`,
                    type: NotificationConstants.NotificationOption.warning,
                });
                return;
            }
            if (player.amountOfItem(heldItem.name) < 1) {
                Notifier.notify({
                    message: `You don't have any ${heldItem.displayName} left.`,
                    type: NotificationConstants.NotificationOption.warning,
                });
                return;
            }
        }

        if (this.heldItem() && Settings.getSetting('confirmChangeHeldItem').value) {
            Notifier.confirm({
                title: 'Remove held item',
                message: 'Held items are one time use only.\nRemoved items will be lost.\nAre you sure you want to remove it?',
                confirm: 'Remove',
                type: NotificationConstants.NotificationOption.warning,
            }).then((confirmed) => {
                if (confirmed) {
                    this.addOrRemoveHeldItem(heldItem);
                }
            });
        } else { // Notifier.confirm is async
            this.addOrRemoveHeldItem(heldItem);
        }
    }

    private addOrRemoveHeldItem(heldItem: HeldItem) {
        if (this.heldItem() && this.heldItem().name == heldItem.name) {
            this.heldItem(undefined);
        } else {
            player.loseItem(heldItem.name, 1);
            this.heldItem(heldItem);
        }
    }

    public addCategory(id: number) {
        if (id === 0) {
            this.resetCategory();
        } else if (!this.category.includes(id)) {
            this._category.push(id);
        }
    }

    public removeCategory(id: number) {
        if (id === 0 && this.category.length === 1) {
            // Can't remove None category without another category present
            return;
        }
        const index = this.category.indexOf(id);
        if (index > -1) {
            this._category.splice(index, 1);
        }
    }

    public toggleCategory(id: number) {
        if (this.category.includes(id)) {
            this.removeCategory(id);
        } else {
            this.addCategory(id);
        }
    }

    public resetCategory(): void {
        this.category = [...this.defaults.category];
    }

    public isUncategorized = ko.pureComputed(() => this.category[0] === 0 && this.category.length === 1);

    public getCategorySortValues(): Array<number> {
        return PokemonCategories.categories().map((c, i) => [c.id, i])
            .filter(([id, _]) => this.category.includes(id))
            .map(([_, index]) => index);
    }

    public fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        if (json.id == null) {
            return;
        }

        this.attackBonusPercent = json[PartyPokemonSaveKeys.attackBonusPercent] ?? this.defaults.attackBonusPercent;
        this.attackBonusAmount = json[PartyPokemonSaveKeys.attackBonusAmount] ?? this.defaults.attackBonusAmount;
        if (json[PartyPokemonSaveKeys.vitaminsUsed]) {
            Object.entries(json[PartyPokemonSaveKeys.vitaminsUsed]).forEach(([i, v]) => {
                this.vitaminsUsed[i](v ?? 0);
            });
        }
        this.exp = json[PartyPokemonSaveKeys.exp] ?? this.defaults.exp;
        this.breeding = json[PartyPokemonSaveKeys.breeding] ?? this.defaults.breeding;
        this.shiny = json[PartyPokemonSaveKeys.shiny] ?? this.defaults.shiny;
        this.category = json[PartyPokemonSaveKeys.category] ?? [...this.defaults.category];
        this.level = this.calculateLevelFromExp();
        this.pokerus = json[PartyPokemonSaveKeys.pokerus] ?? this.defaults.pokerus;
        this.effortPoints = json[PartyPokemonSaveKeys.effortPoints] ?? this.defaults.effortPoints;
        this.heldItem(json[PartyPokemonSaveKeys.heldItem] && ItemList[json[PartyPokemonSaveKeys.heldItem]] instanceof HeldItem ? ItemList[json[PartyPokemonSaveKeys.heldItem]] as HeldItem : undefined);
        this.defaultFemaleSprite(json[PartyPokemonSaveKeys.defaultFemaleSprite] ?? this.defaults.defaultFemaleSprite);
        this.hideShinyImage(json[PartyPokemonSaveKeys.hideShinyImage] ?? this.defaults.hideShinyImage);
        this._nickname(json[PartyPokemonSaveKeys.nickname] || this.defaults.nickname);
        this.shadow = json[PartyPokemonSaveKeys.shadow] ?? this.defaults.shadow;
        this._showShadowImage(json[PartyPokemonSaveKeys.showShadowImage] ?? this.defaults.showShadowImage);
    }

    public toJSON() {
        const output = {
            id: this.id,
            [PartyPokemonSaveKeys.attackBonusPercent]: this.attackBonusPercent,
            [PartyPokemonSaveKeys.attackBonusAmount]: this.attackBonusAmount,
            [PartyPokemonSaveKeys.vitaminsUsed]: ko.toJS(this.vitaminsUsed),
            [PartyPokemonSaveKeys.exp]: this.exp,
            [PartyPokemonSaveKeys.breeding]: this.breeding,
            [PartyPokemonSaveKeys.shiny]: this.shiny,
            [PartyPokemonSaveKeys.category]: this.isUncategorized() ? undefined : this.category,
            [PartyPokemonSaveKeys.pokerus]: this.pokerus,
            [PartyPokemonSaveKeys.effortPoints]: this.effortPoints,
            [PartyPokemonSaveKeys.heldItem]: this.heldItem()?.name,
            [PartyPokemonSaveKeys.defaultFemaleSprite]: this.defaultFemaleSprite(),
            [PartyPokemonSaveKeys.hideShinyImage]: this.hideShinyImage(),
            [PartyPokemonSaveKeys.nickname]: this.nickname || undefined,
            [PartyPokemonSaveKeys.shadow]: this.shadow,
            [PartyPokemonSaveKeys.showShadowImage]: this._showShadowImage(),
        };

        // Don't save anything that is the default option
        Object.entries(output).forEach(([key, value]) => {
            const defaultValue = this.defaults[PartyPokemonSaveKeys[key]];
            if (Array.isArray(value) && Array.isArray(defaultValue)) {
                // Compare array contents
                if (value.length === defaultValue.length && value.every((v, i) => v === defaultValue[i])) {
                    delete output[key];
                }
            } else if (value === defaultValue) {
                delete output[key];
            }
        });

        return output;
    }

    // Knockout getters/setter
    get level(): number {
        return this._level();
    }

    set level(level: number) {
        this._level(level);
    }

    get attack(): number {
        return this._attack();
    }

    get attackBonusAmount(): number {
        return this._attackBonusAmount();
    }

    set attackBonusAmount(attackBonusAmount: number) {
        this._attackBonusAmount(attackBonusAmount);
    }

    get attackBonusPercent(): number {
        return this._attackBonusPercent();
    }

    set attackBonusPercent(attackBonusPercent: number) {
        this._attackBonusPercent(attackBonusPercent);
    }

    get breeding(): boolean {
        return this._breeding();
    }

    set breeding(bool: boolean) {
        this._breeding(bool);
    }

    get pokerus(): GameConstants.Pokerus {
        return this._pokerus();
    }

    set pokerus(index: GameConstants.Pokerus) {
        this._pokerus(index);
    }

    get effortPoints(): number {
        return this._effortPoints();
    }

    set effortPoints(amount: number) {
        this._effortPoints(amount);
    }

    get shiny(): boolean {
        return this._shiny();
    }

    set shiny(bool: boolean) {
        this._shiny(bool);
    }

    get category(): Array<number> {
        return this._category();
    }

    set category(value: Array<number>) {
        this._category(value);
    }

    get nickname(): string {
        return this._nickname();
    }

    set nickname(nickname: string) {
        this._nickname(nickname);
    }

    get displayName(): string {
        return this._displayName();
    }

    get shadow(): GameConstants.ShadowStatus {
        return this._shadow();
    }

    set shadow(value: GameConstants.ShadowStatus) {
        this._shadow(value);
    }

    get showShadowImage(): boolean {
        return this._showShadowImage();
    }

    set showShadowImage(value: boolean) {
        this._showShadowImage(value);
    }
}
