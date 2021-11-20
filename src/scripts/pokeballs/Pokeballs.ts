/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="Pokeball.ts" />

class Pokeballs implements Feature {
    name = 'Pokeballs';
    saveKey = 'pokeballs';

    defaults = {
        alreadyCaughtSelection: GameConstants.Pokeball.None,
        alreadyCaughtShinySelection: GameConstants.Pokeball.Pokeball,
        notCaughtSelection: GameConstants.Pokeball.Pokeball,
        notCaughtShinySelection: GameConstants.Pokeball.Pokeball,
    };

    public pokeballs: Pokeball[];
    private _alreadyCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _alreadyCaughtShinySelection: KnockoutObservable<GameConstants.Pokeball>;
    private _notCaughtSelection: KnockoutObservable<GameConstants.Pokeball>;
    private _notCaughtShinySelection: KnockoutObservable<GameConstants.Pokeball>;

    public selectedSelection: KnockoutObservable<KnockoutObservable<GameConstants.Pokeball>>;
    public selectedTitle: KnockoutObservable<string>;

    constructor() {
        this.pokeballs = [
            new Pokeball(GameConstants.Pokeball.Pokeball, () => 0, 1250, 'A standard Pokéball', undefined, 25),
            new Pokeball(GameConstants.Pokeball.Greatball, () => 5, 1000, '+5% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Ultraball, () => 10, 750, '+10% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Masterball, () => 100, 500, '100% chance to catch'),
            new Pokeball(GameConstants.Pokeball.Fastball, () => 0, 500, 'Reduced catch time', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Quickball, () => {
                if (App.game.gameState == GameConstants.GameState.fighting && player.route()) {
                    const kills = App.game.statistics.routeKills[GameConstants.Region[player.region]]?.[player.route()]?.() || 0;
                    // between 15 (0 kills) → 0 (4012 kills)
                    return Math.min(15, Math.max(0, Math.pow(16, 1 - Math.pow(Math.max(0, kills - 10), 0.6) / 145) - 1));
                }
                return 0;
            }, 1000, 'Increased catch rate on routes with less Pokémon defeated', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Timerball, () => {
                if (App.game.gameState == GameConstants.GameState.fighting && player.route()) {
                    const kills = App.game.statistics.routeKills[GameConstants.Region[player.region]]?.[player.route()]?.() || 0;
                    // between 0 (0 kills) → 15 (9920 kills)
                    return Math.min(15, Math.max(0, Math.pow(16, Math.pow(kills, 0.6) / 250) - 1));
                }
                return 0;
            }, 1000, 'Increased catch rate on routes with more Pokémon defeated', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            new Pokeball(GameConstants.Pokeball.Duskball, () => {
                const now = new Date();
                // If player in a dungeon or it's night time
                if (App.game.gameState == GameConstants.GameState.dungeon || now.getHours() >= 18 || now.getHours() < 6) {
                    return 15;
                }
                return 0;
            }, 1000, 'Increased catch rate at night time or in dungeons', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
            // TODO: this needs some sort of bonus, possibly extra dungeon tokens
            new Pokeball(GameConstants.Pokeball.Luxuryball, () => 0, 1250, 'A Luxury Pokéball', new RouteKillRequirement(10, GameConstants.Region.johto, 34)),
        ];
        this._alreadyCaughtSelection = ko.observable(this.defaults.alreadyCaughtSelection);
        this._alreadyCaughtShinySelection = ko.observable(this.defaults.alreadyCaughtShinySelection);
        this._notCaughtSelection = ko.observable(this.defaults.notCaughtSelection);
        this._notCaughtShinySelection = ko.observable(this.defaults.notCaughtShinySelection);
        this.selectedTitle = ko.observable('');
        this.selectedSelection = ko.observable(this._alreadyCaughtSelection);
    }

    initialize(): void {
        ([
            this._alreadyCaughtSelection,
            this._alreadyCaughtShinySelection,
            this._notCaughtSelection,
            this._notCaughtShinySelection,
        ]).forEach(selection => {
            selection.subscribe(value => {
                // switch to Ultraball if Masterball is selected
                if (value == GameConstants.Pokeball.Masterball && App.game.challenges.list.disableMasterballs.active()) {
                    selection(GameConstants.Pokeball.Ultraball);
                    Notifier.notify({
                        title: 'Challenge Mode',
                        message: 'Masterballs are disabled!',
                        type: NotificationConstants.NotificationOption.danger,
                    });
                } else if (!this.pokeballs[value]?.unlocked()) {
                    selection(GameConstants.Pokeball.None);
                }
            });
        });
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param id the pokemon we are trying to catch.
     * @param isShiny if the Pokémon is shiny.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public calculatePokeballToUse(id: number, isShiny: boolean): GameConstants.Pokeball {
        const alreadyCaught = App.game.party.alreadyCaughtPokemon(id);
        const alreadyCaughtShiny = App.game.party.alreadyCaughtPokemon(id, true);
        let pref: GameConstants.Pokeball;
        // just check against alreadyCaughtShiny as this returns false when you don't have the pokemon yet.
        if (isShiny) {
            if (!alreadyCaughtShiny) {
                // if the pokemon is also not caught, use the higher selection since a notCaughtShiny is also a notCaught pokemon
                pref = !alreadyCaught ? Math.max(this.notCaughtSelection, this.notCaughtShinySelection) : this.notCaughtShinySelection;
            } else {
                // if the shiny is already caught, use the higher selection since the pokemon is also a caught pokemon
                pref = Math.max(this.alreadyCaughtSelection, this.alreadyCaughtShinySelection);
            }
        } else {
            if (!alreadyCaught) {
                pref = this.notCaughtSelection;
            } else {
                pref = this.alreadyCaughtSelection;
            }
        }

        let use: GameConstants.Pokeball = GameConstants.Pokeball.None;

        if (this.pokeballs[pref]?.quantity()) {
            return pref;
        } else if (pref <= GameConstants.Pokeball.Masterball) {
            // Check which Pokeballs we have in stock that are of equal or lesser than selection (upto Masterball)
            for (let i: number = pref; i >= 0; i--) {
                if (this.pokeballs[i].quantity() > 0) {
                    use = i;
                    break;
                }
            }
            return use;
        } else {
            // Use a normal Pokeball or None if we don't have Pokeballs in stock
            return this.pokeballs[GameConstants.Pokeball.Pokeball].quantity() ? GameConstants.Pokeball.Pokeball : GameConstants.Pokeball.None;
        }
    }

    calculateCatchTime(ball: GameConstants.Pokeball): number {
        return this.pokeballs[ball].catchTime;
    }

    gainPokeballs(ball: GameConstants.Pokeball, amount: number): void {
        GameHelper.incrementObservable(this.pokeballs[ball].quantity, amount);
    }

    usePokeball(ball: GameConstants.Pokeball): void {
        GameHelper.incrementObservable(this.pokeballs[ball].quantity, -1);
        GameHelper.incrementObservable(App.game.statistics.pokeballsUsed[ball]);
    }

    getCatchBonus(ball: GameConstants.Pokeball): number {
        return this.pokeballs[ball].catchBonus();
    }

    getBallQuantity(ball: GameConstants.Pokeball): number {
        const pokeball = this.pokeballs[ball];
        return pokeball ? pokeball.quantity() : 0;
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        if (json['pokeballs'] != null) {
            json['pokeballs'].map((amt: number, type: number) => this.pokeballs[type].quantity(amt));
        }
        this.notCaughtSelection = json['notCaughtSelection'] ?? this.defaults.notCaughtSelection;
        this.notCaughtShinySelection = json['notCaughtShinySelection'] ?? this.defaults.notCaughtShinySelection;
        this.alreadyCaughtSelection = json['alreadyCaughtSelection'] ?? this.defaults.alreadyCaughtSelection;
        this.alreadyCaughtShinySelection = json['alreadyCaughtShinySelection'] ?? this.defaults.alreadyCaughtShinySelection;
    }

    toJSON(): Record<string, any> {
        return {
            'pokeballs': this.pokeballs.map(p => p.quantity()),
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
