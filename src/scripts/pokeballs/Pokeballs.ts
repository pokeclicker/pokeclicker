class Pokeballs implements Feature {
    name: string = "Pokeball inventory";
    saveKey: string = "pokeballs";

    defaults = {
        'pokeballs': [ko.observable(10), ko.observable(0), ko.observable(0), ko.observable(0)],
        'notCaughtSelection': GameConstants.Pokeball.Pokeball,
        'alreadyCaughtSelection': GameConstants.Pokeball.None,
    };

    private pokeballCatchBonus: number[];
    private pokeballCatchTime: number[];

    protected _pokeballs: Array<KnockoutObservable<number>>;
    private _notCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _alreadyCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;

    constructor() {
        this._pokeballs = this.defaults.pokeballs;
        this._notCaughtSelection = ko.observable(this.defaults.notCaughtSelection);
        this._alreadyCaughtSelection = ko.observable(this.defaults.alreadyCaughtSelection);
    }

    initialize(): void {
        this.pokeballCatchBonus = [0, 5, 10, 100];
        this.pokeballCatchTime = [1250, 1000, 750, 500];
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param pokemonName the pokemon we are trying to catch.
     * @param isShiny if the pokémon is shiny.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public calculatePokeballToUse(pokemonName: string, isShiny: boolean): GameConstants.Pokeball {
        const alreadyCaught = player.alreadyCaughtPokemon(pokemonName);
        const alreadyCaughtShiny = player.alreadyCaughtPokemonShiny(pokemonName);
        let pref: GameConstants.Pokeball;
        // just check against alreadyCaughtShiny as this returns false when you don't have the pokemon yet.
        if (!alreadyCaught || (!alreadyCaughtShiny && isShiny)) {
            pref = this.notCaughtSelection;
        } else {
            pref = this.alreadyCaughtSelection;
        }

        let use: GameConstants.Pokeball = GameConstants.Pokeball.None;

        // Check which Pokeballs we have in stock that are of equal or lesser than selection
        for (let i: number = pref; i >= 0; i--) {
            if (this._pokeballs[i]() > 0) {
                use = i;
                break;
            }
        }
        return use;
    }

    calculateCatchTime(ball: GameConstants.Pokeball): number {
        return this.pokeballCatchTime[ball];
    }

    gainPokeballs(ball: GameConstants.Pokeball, amount: number) {
        this._pokeballs[ball](this._pokeballs[ball]() + amount)
    }

    usePokeball(ball: GameConstants.Pokeball): void {
        this._pokeballs[ball](this._pokeballs[ball]() - 1);
        GameHelper.incrementObservable(player.statistics.pokeballsUsed[ball]);
    }

    getCatchBonus(ball: GameConstants.Pokeball) {
        return this.pokeballCatchBonus[ball];
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: object): void {
        if (json == null) {
            return
        }

        if (json["pokeballs"] == null) {
            this._pokeballs = this.defaults.pokeballs;
        } else {
            let pokeballsJson = json["pokeballs"];
            this._pokeballs = [
                ko.observable(pokeballsJson[GameConstants.Pokeball.Pokeball]),
                ko.observable(pokeballsJson[GameConstants.Pokeball.Greatball]),
                ko.observable(pokeballsJson[GameConstants.Pokeball.Ultraball]),
                ko.observable(pokeballsJson[GameConstants.Pokeball.Masterball]),
            ];
        }
        this.notCaughtSelection = json["notCaughtSelection"] || this.defaults.notCaughtSelection;
        this.alreadyCaughtSelection = json["alreadyCaughtSelection"] || this.defaults.alreadyCaughtSelection;
    }

    toJSON(): object {
        return {
            "pokeballs": [
                this._pokeballs[GameConstants.Pokeball.Pokeball](),
                this._pokeballs[GameConstants.Pokeball.Greatball](),
                this._pokeballs[GameConstants.Pokeball.Ultraball](),
                this._pokeballs[GameConstants.Pokeball.Masterball]()
            ],
            "notCaughtSelection": this.notCaughtSelection,
            "alreadyCaughtSelection": this.alreadyCaughtSelection
        }
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

    pokeballsObservable(ball: GameConstants.Pokeball): KnockoutComputed<number> {
        return ko.computed(function () {
            return this._pokeballs[ball]();
        }, this);
    }

    // Knockout getters/setters
    get alreadyCaughtSelection() {
        return this._alreadyCaughtSelection();
    }

    set alreadyCaughtSelection(ball: GameConstants.Pokeball) {
        this._alreadyCaughtSelection(ball);
    }

    get notCaughtSelection() {
        return this._notCaughtSelection();
    }

    set notCaughtSelection(ball: GameConstants.Pokeball) {
        this._notCaughtSelection(ball);
    }
}
