class Pokeballs implements Feature {
    name = 'Pokeballs';
    saveKey = 'pokeballs';

    defaults = {
        'pokeballs': [25, 0, 0, 0],
        'notCaughtSelection': GameConstants.Pokeball.Pokeball,
        'notCaughtShinySelection': GameConstants.Pokeball.Pokeball,
        'alreadyCaughtSelection': GameConstants.Pokeball.Pokeball,
        'alreadyCaughtShinySelection': GameConstants.Pokeball.Pokeball,
    };

    private pokeballCatchBonus: number[];
    private pokeballCatchTime: number[];

    public pokeballs: ArrayOfObservables<number>;
    private _notCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _notCaughtShinySelection: KnockoutObservable<GameConstants.Pokeball>;
    private _alreadyCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _alreadyCaughtShinySelection: KnockoutObservable<GameConstants.Pokeball>;

    constructor() {
        this.pokeballs = new ArrayOfObservables(this.defaults.pokeballs);
        this._notCaughtSelection = ko.observable(this.defaults.notCaughtSelection);
        this._notCaughtShinySelection = ko.observable(this.defaults.notCaughtShinySelection);
        this._alreadyCaughtSelection = ko.observable(this.defaults.alreadyCaughtSelection);
        this._alreadyCaughtShinySelection = ko.observable(this.defaults.alreadyCaughtShinySelection);
    }

    initialize(): void {
        this.pokeballCatchBonus = [0, 5, 10, 100];
        this.pokeballCatchTime = [1250, 1000, 750, 500];
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param id the pokemon we are trying to catch.
     * @param isShiny if the pokémon is shiny.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public calculatePokeballToUse(id: number, isShiny: boolean): GameConstants.Pokeball {
        const alreadyCaught = App.game.party.alreadyCaughtPokemon(id);
        const alreadyCaughtShiny = App.game.party.alreadyCaughtPokemon(id, true);
        let pref: GameConstants.Pokeball;
        // just check against alreadyCaughtShiny as this returns false when you don't have the pokemon yet.
        if (isShiny) {
            if (!alreadyCaughtShiny) {
                pref = this.notCaughtShinySelection;
            } else {
                pref = this.alreadyCaughtShinySelection;
            }
        } else {
            if (!alreadyCaught) {
                pref = this.notCaughtSelection;
            } else {
                pref = this.alreadyCaughtSelection;
            }
        }

        let use: GameConstants.Pokeball = GameConstants.Pokeball.None;

        // Check which Pokeballs we have in stock that are of equal or lesser than selection
        for (let i: number = pref; i >= 0; i--) {
            if (this.pokeballs[i] > 0) {
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
        this.pokeballs[ball] += amount;
    }

    usePokeball(ball: GameConstants.Pokeball): void {
        this.pokeballs[ball] -= 1;
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
            return;
        }

        if (json['pokeballs'] == null) {
            this.pokeballs = new ArrayOfObservables(this.defaults.pokeballs);
        } else {
            const pokeballsJson = json['pokeballs'];
            this.pokeballs = new ArrayOfObservables([
                pokeballsJson[GameConstants.Pokeball.Pokeball],
                pokeballsJson[GameConstants.Pokeball.Greatball],
                pokeballsJson[GameConstants.Pokeball.Ultraball],
                pokeballsJson[GameConstants.Pokeball.Masterball],
            ]);
        }
        this.notCaughtSelection = json['notCaughtSelection'] ?? this.defaults.notCaughtSelection;
        this.notCaughtShinySelection = json['notCaughtShinySelection'] ?? this.defaults.notCaughtShinySelection;
        this.alreadyCaughtSelection = json['alreadyCaughtSelection'] ?? this.defaults.alreadyCaughtSelection;
        this.alreadyCaughtShinySelection = json['alreadyCaughtShinySelection'] ?? this.defaults.alreadyCaughtShinySelection;
    }

    toJSON(): object {
        return {
            'pokeballs': [
                this.pokeballs[GameConstants.Pokeball.Pokeball],
                this.pokeballs[GameConstants.Pokeball.Greatball],
                this.pokeballs[GameConstants.Pokeball.Ultraball],
                this.pokeballs[GameConstants.Pokeball.Masterball],
            ],
            'notCaughtSelection': this.notCaughtSelection,
            'notCaughtShinySelection': this.notCaughtShinySelection,
            'alreadyCaughtSelection': this.alreadyCaughtSelection,
            'alreadyCaughtShinySelection': this.alreadyCaughtShinySelection,
        };
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

    // Knockout getters/setters
    get notCaughtSelection() {
        return this._notCaughtSelection();
    }

    set notCaughtSelection(ball: GameConstants.Pokeball) {
        this._notCaughtSelection(ball);
    }

    get notCaughtShinySelection() {
        return this._notCaughtShinySelection();
    }

    set notCaughtShinySelection(ball: GameConstants.Pokeball) {
        this._notCaughtShinySelection(ball);
    }

    get alreadyCaughtSelection() {
        return this._alreadyCaughtSelection();
    }

    set alreadyCaughtSelection(ball: GameConstants.Pokeball) {
        this._alreadyCaughtSelection(ball);
    }

    get alreadyCaughtShinySelection() {
        return this._alreadyCaughtShinySelection();
    }

    set alreadyCaughtShinySelection(ball: GameConstants.Pokeball) {
        this._alreadyCaughtShinySelection(ball);
    }
}
