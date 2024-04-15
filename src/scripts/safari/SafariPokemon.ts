class SafariPokemon implements PokemonInterface {
    name: PokemonNameType;
    id: number;
    type1: PokemonType;
    type2: PokemonType;
    shiny: boolean;
    baseCatchFactor: number;
    baseEscapeFactor: number;
    gender: GameConstants.BattlePokemonGender;
    shadow = GameConstants.ShadowStatus.None;

    // Used for overworld sprites
    x = 0;
    y = 0;
    steps = 0;

    // Affects catch/flee chance
    private _angry: KnockoutObservable<number>;
    private _eating: KnockoutObservable<number>;
    private _eatingBait: KnockoutObservable<BaitType>;
    private _displayName: KnockoutObservable<string>;
    levelModifier: number;

    constructor(name: PokemonNameType) {
        const data = PokemonHelper.getPokemonByName(name);

        this.name = data.name;
        this.id = data.id;
        this.type1 = data.type1;
        this.type2 = data.type2;
        this.shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SAFARI);
        this._displayName = PokemonHelper.displayName(name);
        this.gender = PokemonFactory.generateGender(data.gender.femaleRatio, data.gender.type);
        PokemonHelper.incrementPokemonStatistics(this.id, GameConstants.PokemonStatisticsType.Encountered, this.shiny, this.gender, GameConstants.ShadowStatus.None);
        // Shiny
        if (this.shiny) {
            Notifier.notify({
                message: `✨ You encountered a shiny ${this.displayName}! ✨`,
                pokemonImage: PokemonHelper.getImage(this.id, this.shiny, this.gender),
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.General.shiny_long,
                setting: NotificationConstants.NotificationSetting.General.encountered_shiny,
            });
        }
        this.baseCatchFactor = data.catchRate * 1 / 6;
        this.baseEscapeFactor = 30;
        this._angry = ko.observable(0);
        this._eating = ko.observable(0);
        this._eatingBait = ko.observable(BaitType.Bait);
        this.levelModifier = (Safari.safariLevel() - 1) / 50;
    }

    public static calcPokemonWeight(pokemon): number {
        return pokemon.weight * (App.game.party.alreadyCaughtPokemonByName(pokemon.name) ? 1 : 2);
    }

    public get catchFactor(): number {
        const oakBonus = App.game.oakItems.calculateBonus(OakItemType.Magic_Ball);
        let catchF = this.baseCatchFactor + oakBonus + (this.levelModifier * 10);
        if (this.eating > 0) {
            catchF /= 2 - this.levelModifier;
        }
        if (this.angry > 0) {
            catchF *= 2 + this.levelModifier;
        }
        if (this.eatingBait === BaitType.Nanab) {
            catchF *= 1.5 + this.levelModifier;
        }

        return Math.min(100, catchF);
    }

    public get escapeFactor(): number {
        let escapeF = this.baseEscapeFactor;
        if (this.eating > 0) {
            escapeF /= 4 + this.levelModifier;
        }
        if (this.angry > 0) {
            escapeF *= 2 - this.levelModifier;
        }
        if (this.eatingBait === BaitType.Razz) {
            escapeF /= 1.5 + this.levelModifier;
        }

        return escapeF;
    }

    public get angry(): number {
        return this._angry();
    }

    public set angry(value: number) {
        this._angry(value);
    }

    public get eating(): number {
        return this._eating();
    }

    public set eating(value: number) {
        this._eating(value);
    }

    public get eatingBait(): BaitType {
        return this._eatingBait();
    }

    public set eatingBait(value: BaitType) {
        this._eatingBait(value);
    }

    public static random(environment = SafariEnvironments.Grass) {
        // Get a random pokemon from current region and zone for Safari Zone
        const safariPokemon = SafariPokemonList.list[Safari.activeRegion()]().filter(
            (p) => p.isAvailable() && p.environments.includes(environment)
        );
        const pokemon = Rand.fromWeightedArray(safariPokemon, safariPokemon.map(p => p.weight));
        return new SafariPokemon(pokemon.name);
    }

    public get displayName() {
        return this._displayName();
    }
}
