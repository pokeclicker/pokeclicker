class BugCatchingPokemon implements PokemonInterface {
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
    private _eatingBCBait: KnockoutObservable<BCBaitType>;

    // Lower weighted pokemon will appear less frequently, equally weighted are equally likely to appear
    static readonly list: {
        name: PokemonNameType,
        weight: number
    }[] = [
        { name: 'Caterpie', weight: 4 },
        { name: 'Metapod', weight: 3 },
        { name: 'Butterfree', weight: 2 },
        { name: 'Weedle', weight: 4 },
        { name: 'Kakuna', weight: 3 },
        { name: 'Beedrill', weight: 2 },
        { name: 'Paras', weight: 3 },
        { name: 'Parasect', weight: 2 },
        { name: 'Venonat', weight: 3 },
        { name: 'Venomoth', weight: 2 },
        { name: 'Scyther', weight: 2 },
        { name: 'Pinsir', weight: 2 },
        { name: 'Ledyba', weight: 3 },
        { name: 'Ledian', weight: 2 },
        { name: 'Spinarak', weight: 3 },
        { name: 'Ariados', weight: 2 },
        { name: 'Yanma', weight: 2 },
        { name: 'Pineco', weight: 3 },
        { name: 'Forretress', weight: 2 },
        { name: 'Shuckle', weight: 2 },
        { name: 'Heracross', weight: 2 },
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
        this.shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_BUGCATCHING);
        GameHelper.incrementObservable(App.game.statistics.pokemonEncountered[this.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonEncountered);

        if (this.shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonEncountered[this.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonEncountered);

            Notifier.notify({
                message: `✨ You encountered a shiny ${name}! ✨`,
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.General.shiny_long,
                setting: NotificationConstants.NotificationSetting.General.encountered_shiny,
            });

            // Track shinies encountered, and rate of shinies
            LogEvent('encountered shiny', 'shiny pokemon', 'bugCatching encounter',
                Math.floor(App.game.statistics.totalPokemonEncountered() / App.game.statistics.totalShinyPokemonEncountered()));
        }
        this.baseCatchFactor = data.catchRate * 1 / 6;
        this.baseEscapeFactor = 30;
        this._angry = ko.observable(0);
        this._eating = ko.observable(0);
        this._eatingBCBait = ko.observable(BCBaitType.BCBait);
    }

    public get catchFactor(): number {
        const oakBonus = App.game.oakItems.calculateBonus(OakItemType.Magic_Ball);
        let catchF = this.baseCatchFactor + oakBonus;
        if (this.eating > 0) {
            catchF /= 2;
        }
        if (this.angry > 0) {
            catchF *= 2;
        }
        if (this.eatingBCBait === BCBaitType.BCNanab) {
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
        if (this.eatingBCBait === BCBaitType.BCRazz) {
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

    public get eatingBCBait(): BCBaitType {
        return this._eatingBCBait();
    }

    public set eatingBCBait(value: BCBaitType) {
        this._eatingBCBait(value);
    }

    public static random() {
        const pokemon = Rand.fromWeightedArray(BugCatchingPokemon.list, BugCatchingPokemon.list.map(p => p.weight));
        return new BugCatchingPokemon(pokemon.name);
    }
}
