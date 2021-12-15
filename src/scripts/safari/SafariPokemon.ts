class SafariPokemon implements PokemonInterface {
    name: PokemonNameType;
    id: number;
    type1: PokemonType;
    type2: PokemonType;
    shiny: boolean;
    baseCatchFactor: number;
    baseEscapeFactor: number;

    // Used for overworld sprites
    x = 0;
    y = 0;
    steps = 0;

    // Affects catch/flee chance
    private _angry: KnockoutObservable<number>;
    private _eating: KnockoutObservable<number>;
    private _eatingBait: KnockoutObservable<BaitType>;

    // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
    static readonly list: {
        name: PokemonNameType,
        weight: number
    }[] = [
        { name: 'Nidoran(F)', weight: 15 },
        { name: 'Nidorina', weight: 10 },
        { name: 'Nidoran(M)', weight: 25 },
        { name: 'Nidorino', weight: 10 },
        { name: 'Exeggcute', weight: 20 },
        { name: 'Paras', weight: 5 },
        { name: 'Parasect', weight: 15 },
        { name: 'Rhyhorn', weight: 10 },
        { name: 'Chansey', weight: 4 },
        { name: 'Scyther', weight: 4 },
        { name: 'Pinsir', weight: 4 },
        { name: 'Kangaskhan', weight: 15 },
        { name: 'Tauros', weight: 10 },
        { name: 'Cubone', weight: 10 },
        { name: 'Marowak', weight: 5 },
        { name: 'Tangela', weight: 4 },
    ];

    public static calcPokemonWeight(pokemon): number {
        return pokemon.weight * (App.game.party.alreadyCaughtPokemonByName(pokemon.name) ? 1 : 2);
    }

    constructor(name: PokemonNameType) {
        const data = PokemonHelper.getPokemonByName(name);

        this.name = data.name;
        this.id = data.id;
        this.type1 = data.type1;
        this.type2 = data.type2;
        this.shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SAFARI);
        GameHelper.incrementObservable(App.game.statistics.pokemonEncountered[this.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonEncountered);

        if (this.shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonEncountered[this.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonEncountered);

            Notifier.notify({
                message: `✨ You encountered a shiny ${name}! ✨`,
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.shiny_long,
                setting: NotificationConstants.NotificationSetting.encountered_shiny,
            });

            // Track shinies encountered, and rate of shinies
            LogEvent('encountered shiny', 'shiny pokemon', 'safari encounter',
                Math.floor(App.game.statistics.totalPokemonEncountered() / App.game.statistics.totalShinyPokemonEncountered()));
        }
        this.baseCatchFactor = data.catchRate * 1 / 6;
        this.baseEscapeFactor = 30;
        this._angry = ko.observable(0);
        this._eating = ko.observable(0);
        this._eatingBait = ko.observable(BaitType.Bait);
    }

    public get catchFactor(): number {
        const oakBonus = App.game.oakItems.calculateBonus(OakItems.OakItem.Magic_Ball);
        let catchF = this.baseCatchFactor + oakBonus;
        if (this.eating > 0) {
            catchF /= 2;
        }
        if (this.angry > 0) {
            catchF *= 2;
        }
        if (this.eatingBait === BaitType.Nanab) {
            catchF *= 1.5;
        }

        return Math.min(100, catchF);
    }

    public get escapeFactor(): number {
        let escapeF = this.baseEscapeFactor;
        if (this.eating > 0) {
            escapeF /= 4;
        }
        if (this.angry > 0) {
            escapeF *= 2;
        }
        if (this.eatingBait === BaitType.Razz) {
            escapeF /= 1.5;
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

    public static random() {
        const pokemon = Rand.fromWeightedArray(SafariPokemon.list, SafariPokemon.list.map(p => p.weight));
        return new SafariPokemon(pokemon.name);
    }
}
