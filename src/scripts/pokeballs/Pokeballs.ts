class Pokeballs implements Feature {
    name: string = "Pokeball inventory";
    saveKey: string = "pokeballs";

    private pokeballCatchBonus = [0, 5, 10, 100,];
    private pokeballCatchTime = [1250, 1000, 750, 500,];

    private _pokeballs: Array<KnockoutObservable<number>>;
    private _notCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _alreadyCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;

    constructor() {
        this._pokeballs = [ko.observable(0), ko.observable(0), ko.observable(0), ko.observable(0)];
        this._notCaughtSelection = ko.observable(GameConstants.Pokeball.Pokeball);
        this._alreadyCaughtSelection = ko.observable(GameConstants.Pokeball.None);
    }

    initialize(): void {
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
            pref = player._notCaughtBallSelection();
        } else {
            pref = player._alreadyCaughtBallSelection();
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

    public calculateCatchTime(ball: GameConstants.Pokeball): number {
        return this.pokeballCatchTime[ball];
    }

    getCatchBonus(ball: GameConstants.Pokeball) {
        return this.pokeballCatchBonus[ball];
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: object): void {
    }


    toJSON(): object {
        return undefined;
    }

    update(delta: number): void {
    }

    public gainPokeballs(ball: GameConstants.Pokeball, amount: number) {
        this._pokeballs[ball](this._pokeballs[ball]() + amount)
    }

    public usePokeball(ball: GameConstants.Pokeball): void {
        this._pokeballs[ball](this._pokeballs[ball]() - 1);
        GameHelper.incrementObservable(player.statistics.pokeballsUsed[ball]);
    }

    public pokeballsObservable(ball: GameConstants.Pokeball): KnockoutComputed<number> {
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
