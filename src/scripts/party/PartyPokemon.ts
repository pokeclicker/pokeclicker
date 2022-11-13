enum PartyPokemonSaveKeys {
    attackBonusPercent = 0,
    attackBonusAmount,
    proteinsUsed,
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
    megaStone
}

class PartyPokemon implements Saveable {
    saveKey: string;
    public exp = 0;
    public evs: KnockoutComputed<number>;
    _attack: KnockoutComputed<number>;

    defaults = {
        attackBonusPercent: 0,
        attackBonusAmount: 0,
        proteinsUsed: 0,
        exp: 0,
        breeding: false,
        shiny: false,
        category: 0,
        levelEvolutionTriggered: false,
        pokerus: GameConstants.Pokerus.Uninfected,
        effortPoints: 0,
        defaultFemaleSprite: false,
        hideShinyImage: false,
        nickname: '',
        megaStone: undefined,
    };

    // Saveable observables
    // Consider the Real evolution challenge before adding stuff here
    _breeding: KnockoutObservable<boolean>;
    _shiny: KnockoutObservable<boolean>;
    _level: KnockoutObservable<number>;
    _attackBonusPercent: KnockoutObservable<number>;
    _attackBonusAmount: KnockoutObservable<number>;
    _category: KnockoutObservable<number>;
    _translatedName: KnockoutObservable<string>;
    _nickname: KnockoutObservable<string>;
    _displayName: KnockoutComputed<string>;
    _pokerus: KnockoutObservable<GameConstants.Pokerus>;
    proteinsUsed: KnockoutObservable<number>;
    _effortPoints: KnockoutObservable<number>;
    heldItem: KnockoutObservable<HeldItem>;
    defaultFemaleSprite: KnockoutObservable<boolean>;
    hideShinyImage: KnockoutObservable<boolean>;
    _megaStone: KnockoutObservable<MegaStone>;

    constructor(
        public id: number,
        public name: PokemonNameType,
        public evolutions: EvoData[],
        public baseAttack: number,
        shiny = false,
        public gender
    ) {
        this.proteinsUsed = ko.observable(0).extend({ numeric: 0 });
        this._breeding = ko.observable(false).extend({ boolean: null });
        this._shiny = ko.observable(shiny).extend({ boolean: null });
        this._level = ko.observable(1).extend({ numeric: 0 });
        this._attackBonusPercent = ko.observable(0).extend({ numeric: 0 });
        this._attackBonusAmount = ko.observable(0).extend({ numeric: 0 });
        this._category = ko.observable(0).extend({ numeric: 0 });
        this._translatedName = PokemonHelper.displayName(name);
        this._pokerus = ko.observable(GameConstants.Pokerus.Uninfected).extend({ numeric: 0 });
        this._effortPoints = ko.observable(0).extend({ numeric: 0 });
        this.evs = ko.pureComputed(() => {
            const power = App.game.challenges.list.slowEVs.active() ? GameConstants.EP_CHALLENGE_MODIFIER : 1;
            return Math.floor(this.effortPoints / GameConstants.EP_EV_RATIO / power);
        });
        this.evs.subscribe((newValue) => {
            // Change Pokerus status to Resistant when reaching 50 EVs
            if (this.pokerus && this.pokerus < GameConstants.Pokerus.Resistant && newValue >= 50) {
                this.pokerus = GameConstants.Pokerus.Resistant;

                // Log and notify player
                Notifier.notify({
                    message: `${this.name} has become Resistant to Pokérus.`,
                    type: NotificationConstants.NotificationOption.info,
                    setting: NotificationConstants.NotificationSetting.General.pokerus,
                });
                App.game.logbook.newLog(LogBookTypes.NEW, createLogContent.resistantToPokerus({ pokemon: this.name }));
            }
        });
        this._attack = ko.pureComputed(() => this.calculateAttack());
        this.heldItem = ko.observable(undefined);
        this.defaultFemaleSprite = ko.observable(false);
        this.hideShinyImage = ko.observable(false);
        this._nickname = ko.observable();
        this._displayName = ko.pureComputed(() => this._nickname() ? this._nickname() : this._translatedName());
        this._megaStone = ko.observable(undefined);
    }

    public calculateAttack(ignoreLevel = false): number {
        const attackBonusMultiplier = 1 + (this.attackBonusPercent / 100);
        const levelMultiplier = ignoreLevel ? 1 : this.level / 100;
        const evsMultiplier = this.calculateEVAttackBonus();
        const heldItemMultiplier = this.heldItem && this.heldItem() instanceof AttackBonusHeldItem ? (this.heldItem() as AttackBonusHeldItem).attackBonus : 1;
        return Math.max(1, Math.floor((this.baseAttack * attackBonusMultiplier + this.attackBonusAmount) * levelMultiplier * evsMultiplier * heldItemMultiplier));
    }

    public calculateEVAttackBonus(): number {
        if (this.pokerus < GameConstants.Pokerus.Contagious) {
            return 1;
        }
        return (this.evs() < 50) ? (1 + 0.01 * this.evs()) : (Math.pow(this.evs(),Math.log(1.5) / Math.log(50)));
    }

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
                return i;
            }
        }
        return this.level;
    }

    public gainExp(exp: number) {
        this.exp += exp * this.getExpMultiplier();
        const oldLevel = this.level;
        const newLevel = this.calculateLevelFromExp();
        if (oldLevel !== newLevel) {
            this.level = newLevel;
            this.checkForLevelEvolution();
        }
    }

    private getExpMultiplier() {
        let result = 1;
        if (this.heldItem() && this.heldItem() instanceof ExpGainedBonusHeldItem) {
            result *= (this.heldItem() as ExpGainedBonusHeldItem).gainedBonus;
        }
        return result;
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

    public useProtein(amount: number): void {
        if (App.game.challenges.list.disableProteins.active()) {
            Notifier.notify({
                title: 'Challenge Mode',
                message: 'Proteins are disabled',
                type: NotificationConstants.NotificationOption.danger,
            });
            return;
        }

        const usesRemaining = this.proteinUsesRemaining();

        // If no more proteins can be used on this Pokemon
        if (!usesRemaining) {
            Notifier.notify({
                message: 'This Pokémon cannot increase their power any higher!',
                type: NotificationConstants.NotificationOption.warning,
            });
            return;
        }

        // The lowest number of amount they want to use, total in inventory, uses remaining for this Pokemon
        amount = Math.min(amount, player.itemList.Protein(), usesRemaining);

        // Apply the proteins
        if (ItemHandler.useItem('Protein', amount)) {
            GameHelper.incrementObservable(this.proteinsUsed, amount);
        }
    }

    proteinUsesRemaining = (): number => {
        // Allow 5 for every region visited (including Kanto)
        return (player.highestRegion() + 1) * 5 - this.proteinsUsed();
    };

    public hideFromProteinList = ko.pureComputed(() => {
        if (this._breeding()) {
            return true;
        }
        if (!new RegExp(Settings.getSetting('proteinSearchFilter').observableValue() , 'i').test(this.name)) {
            return true;
        }
        if (Settings.getSetting('proteinRegionFilter').observableValue() > -2) {
            if (PokemonHelper.calcNativeRegion(this.name) !== Settings.getSetting('proteinRegionFilter').observableValue()) {
                return true;
            }
        }
        const type = Settings.getSetting('proteinTypeFilter').observableValue();
        if (type > -2 && !pokemonMap[this.name].type.includes(type)) {
            return true;
        }
        if (this.proteinUsesRemaining() == 0 && Settings.getSetting('proteinHideMaxedPokemon').observableValue()) {
            return true;
        }
        if (this._shiny() && Settings.getSetting('proteinHideShinyPokemon').observableValue()) {
            return true;
        }
        return false;
    });

    public giveHeldItem = (heldItem: HeldItem): void => {
        if (!this.heldItem() || heldItem.name != this.heldItem().name) {
            if (heldItem && !heldItem.canUse(this)) {
                Notifier.notify({
                    message: `This pokémon cannot use ${heldItem.displayName}.`,
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
            if (App.game.party.caughtPokemon.some(p => p.heldItem() && p.heldItem().name == heldItem.name)) {
                Notifier.notify({
                    message: 'Only one of each held items can be used.',
                    type: NotificationConstants.NotificationOption.warning,
                });
                return;
            }

            if (App.game.party.caughtPokemon.filter(p => p.heldItem()).length >= 6) {
                Notifier.notify({
                    message: 'Only 6 pokemons can hold items at a time.',
                    type: NotificationConstants.NotificationOption.warning,
                });
                return;
            }
        }

        if (this.heldItem()) {
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

    public hideFromHeldItemList = ko.pureComputed(() => {
        if (this.heldItem()) {
            return true;
        }
        if (!HeldItem.heldItemSelected().canUse(this)) {
            return true;
        }
        if (!new RegExp(Settings.getSetting('heldItemSearchFilter').observableValue() , 'i').test(this.name)) {
            return true;
        }
        return false;
    });

    public giveMegastone(notify = true) {
        if (!this._megaStone() && this.evolutions?.some((evo) => evo.restrictions.some(r => r instanceof MegaEvolveRequirement))) {
            this._megaStone(new MegaStone(this.id, this.baseAttack, this._attack));
            if (notify) {
                Notifier.notify({
                    message: `${this.displayName} has gained a Mega Stone!`,
                    type: NotificationConstants.NotificationOption.success,
                });
            }
        }
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
        this.proteinsUsed = ko.observable(json[PartyPokemonSaveKeys.proteinsUsed] ?? this.defaults.proteinsUsed);
        this.exp = json[PartyPokemonSaveKeys.exp] ?? this.defaults.exp;
        this.breeding = json[PartyPokemonSaveKeys.breeding] ?? this.defaults.breeding;
        this.shiny = json[PartyPokemonSaveKeys.shiny] ?? this.defaults.shiny;
        this.category = json[PartyPokemonSaveKeys.category] ?? this.defaults.category;
        this.level = this.calculateLevelFromExp();
        this.pokerus = json[PartyPokemonSaveKeys.pokerus] ?? this.defaults.pokerus;
        this.effortPoints = json[PartyPokemonSaveKeys.effortPoints] ?? this.defaults.effortPoints;
        this.heldItem(json[PartyPokemonSaveKeys.heldItem] && ItemList[json[PartyPokemonSaveKeys.heldItem]] instanceof HeldItem ? ItemList[json[PartyPokemonSaveKeys.heldItem]] as HeldItem : undefined);
        this.defaultFemaleSprite(json[PartyPokemonSaveKeys.defaultFemaleSprite] ?? this.defaults.defaultFemaleSprite);
        this.hideShinyImage(json[PartyPokemonSaveKeys.hideShinyImage] ?? this.defaults.hideShinyImage);
        this._nickname(json[PartyPokemonSaveKeys.nickname] ? decodeURI(json[PartyPokemonSaveKeys.nickname]) : this.defaults.nickname);
        if (json[PartyPokemonSaveKeys.megaStone]) {
            this.giveMegastone(false);
        }

        if (this.evolutions != null) {
            for (const evolution of this.evolutions) {
                if (evolution.trigger === EvoTrigger.LEVEL) {
                    (evolution as LevelEvoData).triggered(json[PartyPokemonSaveKeys.levelEvolutionTriggered] ?? this.defaults.levelEvolutionTriggered);
                }
            }
        }
    }

    public toJSON() {
        let levelEvolutionTriggered = false;
        if (this.evolutions != null) {
            for (const evolution of this.evolutions) {
                if (evolution.trigger === EvoTrigger.LEVEL && (evolution as LevelEvoData).triggered()) {
                    levelEvolutionTriggered = true;
                }
            }
        }
        const output = {
            id: this.id,
            [PartyPokemonSaveKeys.attackBonusPercent]: this.attackBonusPercent,
            [PartyPokemonSaveKeys.attackBonusAmount]: this.attackBonusAmount,
            [PartyPokemonSaveKeys.proteinsUsed]: this.proteinsUsed(),
            [PartyPokemonSaveKeys.exp]: this.exp,
            [PartyPokemonSaveKeys.breeding]: this.breeding,
            [PartyPokemonSaveKeys.shiny]: this.shiny,
            [PartyPokemonSaveKeys.levelEvolutionTriggered]: levelEvolutionTriggered,
            [PartyPokemonSaveKeys.category]: this.category,
            [PartyPokemonSaveKeys.pokerus]: this.pokerus,
            [PartyPokemonSaveKeys.effortPoints]: this.effortPoints,
            [PartyPokemonSaveKeys.heldItem]: this.heldItem()?.name,
            [PartyPokemonSaveKeys.defaultFemaleSprite]: this.defaultFemaleSprite(),
            [PartyPokemonSaveKeys.hideShinyImage]: this.hideShinyImage(),
            [PartyPokemonSaveKeys.nickname]: this.nickname ? encodeURI(this.nickname) : undefined,
            [PartyPokemonSaveKeys.megaStone]: this.megaStone ? true : false,
        };

        // Don't save anything that is the default option
        Object.entries(output).forEach(([key, value]) => {
            if (value === this.defaults[PartyPokemonSaveKeys[key]]) {
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

    get category(): number {
        return this._category();
    }

    set category(index: number) {
        this._category(index);
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

    get megaStone(): MegaStone {
        return this._megaStone();
    }
}
