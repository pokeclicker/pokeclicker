class Pokeballs implements Feature {
    name: string = "Pokeball inventory";
    saveKey: string = "pokeballs";

    private pokeballCatchBonus: number[];
    private pokeballCatchTime: number[];

    private _pokeballs: Array<KnockoutObservable<number>>;
    private _notCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _alreadyCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;

    constructor() {
        this._pokeballs = [ko.observable(0), ko.observable(0), ko.observable(0), ko.observable(0)];
        this._notCaughtSelection = ko.observable(GameConstants.Pokeball.Pokeball);
        this._alreadyCaughtSelection = ko.observable(GameConstants.Pokeball.None);
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
        if(json == null){
            return
        }
        this._pokeballs = [
            ko.observable(json[GameConstants.Pokeball.Pokeball]),
            ko.observable(json[GameConstants.Pokeball.Greatball]),
            ko.observable(json[GameConstants.Pokeball.Ultraball]),
            ko.observable(json[GameConstants.Pokeball.Masterball]),
        ]
    }

    toJSON(): object {
        return [
            this._pokeballs[GameConstants.Pokeball.Pokeball](),
            this._pokeballs[GameConstants.Pokeball.Greatball](),
            this._pokeballs[GameConstants.Pokeball.Ultraball](),
            this._pokeballs[GameConstants.Pokeball.Masterball]()
        ];
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
