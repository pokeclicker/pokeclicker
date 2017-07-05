/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {

    private _money: KnockoutObservable<number>;
    private _dungeonTokens: KnockoutObservable<number>;
    private _caughtShinyList: KnockoutObservableArray<string>;
    private _route: KnockoutObservable<number>;
    private _caughtPokemonList: KnockoutObservableArray<CaughtPokemon>;
    private _routeKills: Array<KnockoutObservable<number>>;
    private _routeKillsNeeded: KnockoutObservable<number>;
    private _region: GameConstants.Region;
    private _gymBadges: KnockoutObservableArray<GameConstants.Badge>;
    private _pokeballs: number[];
    private _shinyList: boolean[];
    private _notCaughtBallSelection: GameConstants.Pokeball;
    private _alreadyCaughtBallSelection: GameConstants.Pokeball;
    private _town: KnockoutObservable<Town>;

    public clickAttackObservable: KnockoutComputed<number>;

    public pokemonAttackObservable: KnockoutComputed<number>;


    public routeKillsObservable(route: number): KnockoutComputed<number> {
        return ko.computed(function () {
            return Math.min(this.routeKillsNeeded, this.routeKills[route]());
        }, this);
    }

    constructor(savedPlayer?) {
        if (savedPlayer) {
            this._money = ko.observable(savedPlayer._money);
            this._dungeonTokens = ko.observable(savedPlayer._dungeonTokens);
            this._caughtShinyList = ko.observableArray<string>(savedPlayer._caughtShinyList);
            if (savedPlayer._route < 1) {
                this._route = ko.observable(1);
            } else {
                this._route = ko.observable(savedPlayer._route);
            }
            let tmpCaughtList = savedPlayer._caughtPokemonList.map((pokemon) => {
                let tmp = new CaughtPokemon(PokemonHelper.getPokemonByName(pokemon.name), pokemon.evolved, pokemon.attackBonus, pokemon.exp);
                return tmp
            });
            this._caughtPokemonList = ko.observableArray<CaughtPokemon>(tmpCaughtList);
            this._routeKills = savedPlayer._routeKills.map((killsOnRoute) => {
                return ko.observable(killsOnRoute)
            });
            this._routeKillsNeeded = ko.observable(savedPlayer._routeKillsNeeded);
            this._region = savedPlayer._region;
            this._gymBadges = ko.observableArray<GameConstants.Badge>(savedPlayer._gymBadges);
            this._pokeballs = savedPlayer._pokeballs;
            this._shinyList = savedPlayer._shinyList.map((bool) => {
                return ko.observable(bool)
            });
            this._notCaughtBallSelection = savedPlayer._notCaughtBallSelection;
            this._alreadyCaughtBallSelection = savedPlayer._alreadyCaughtBallSelection
        } else {
            this._money = ko.observable(0);
            this._dungeonTokens = ko.observable(0);
            this._caughtShinyList = ko.observableArray<string>();
            this._route = ko.observable(1);
            this._caughtPokemonList = ko.observableArray<CaughtPokemon>();
            this._routeKills = Array.apply(null, Array(GameConstants.AMOUNT_OF_ROUTES)).map(function () {
                return ko.observable(0)
            });
            this._routeKillsNeeded = ko.observable(10);
            this._region = GameConstants.Region.kanto;
            this._gymBadges = ko.observableArray<GameConstants.Badge>();
            this._pokeballs = [0, 0, 0, 0];
            this._shinyList = Array.apply(null, Array(GameConstants.AMOUNT_OF_POKEMONS)).map(Boolean.prototype.valueOf, false);
            this._notCaughtBallSelection = GameConstants.Pokeball.Masterball;
            this._alreadyCaughtBallSelection = GameConstants.Pokeball.Pokeball;
        }
        this.clickAttackObservable = ko.computed(function () {
            return this.calculateClickAttack()
        }, this);
        this.pokemonAttackObservable = ko.computed(function () {
            return this.calculatePokemonAttack(GameConstants.PokemonType.None, GameConstants.PokemonType.None);
        }, this);
    }

    public addRouteKill() {
        this.routeKills[this.route()](this.routeKills[this.route()]() + 1)
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */
    public calculatePokemonAttack(type1: GameConstants.PokemonType, type2: GameConstants.PokemonType): number {
        // TODO Calculate pokemon attack by checking the caught list, upgrades and multipliers.
        // TODO factor in types
        // TODO start at 0
        let attack = 5;
        for (let pokemon of this.caughtPokemonList) {
            attack += pokemon.attack();
        }

        // return attack;
        return 0;
    }

    public calculateClickAttack(): number {
        // TODO Calculate click attack by checking the caught list size, upgrades and multipliers.
        return 1000;
    }

    public calculateMoneyMultiplier(): number {
        // TODO Calculate money multiplier by checking upgrades and multipliers.
        return 1;
    }

    public calculateExpMultiplier(): number {
        // TODO Calculate exp multiplier by checking upgrades and multipliers.
        return 1;
    }

    public calculateDungeonTokenMultiplier(): number {
        // TODO Calculate dungeon token multiplier by checking upgrades and multipliers.
        return 1;
    }

    public calculateCatchTime(): number {
        // TODO Calculate catch time by checking upgrades and multipliers.
        return 10;
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param alreadyCaught if the pokémon is already caught.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public calculatePokeballToUse(alreadyCaught: boolean): GameConstants.Pokeball {
        let pref: GameConstants.Pokeball;
        if (alreadyCaught) {
            pref = this._alreadyCaughtBallSelection;
        } else {
            pref = this._notCaughtBallSelection;
        }

        let use: GameConstants.Pokeball.Pokeball;

        for (let i: number = pref; i >= 0; i--) {
            if (this._pokeballs[i] > 0) {
                use = i;
                break;
            }
        }
        return use;
    }


    /**
     * Loops through the caughtPokemonList to check if the pokémon is already caight
     * @param pokemonName name to search for.
     * @returns {boolean}
     */
    public alreadyCaughtPokemon(pokemonName: string) {
        console.log(this.caughtPokemonList);
        for (let i: number = 0; i < this.caughtPokemonList.length; i++) {
            if (this.caughtPokemonList[i].name == pokemonName) {
                return true;
            }
        }
        return false;
    }

    public alreadyCaughtPokemonShiny(pokemonName: string) {
        for (let i: number = 0; i < this.caughtShinyList().length; i++) {
            if (this.caughtShinyList()[i] == pokemonName) {
                return true;
            }
        }
        return false;
    }

    public capturePokemon(pokemonName: string, shiny: boolean = false) {
        if (!this.alreadyCaughtPokemon(pokemonName)) {
            let pokemonData = PokemonHelper.getPokemonByName(pokemonName);
            let caughtPokemon: CaughtPokemon = new CaughtPokemon(pokemonData, false, 0, 0);
            this._caughtPokemonList.push(caughtPokemon);
        }
    }

    public hasBadge(badge: GameConstants.Badge) {
        if (badge == undefined || GameConstants.Badge.None) {
            return true;
        }
        for (let i = 0; i < this._gymBadges().length; i++) {
            if (this._gymBadges()[i] == badge) {
                return true;
            }
        }
        return false;
    }

    public gainMoney(money: number) {
        // TODO add money multipliers
        this._money(Math.floor(this._money() + money));
    }

    public gainExp(exp: number, level: number, trainer: boolean) {
        // TODO add exp multipliers
        let trainerBonus = trainer ? 1.5 : 1;
        let expTotal = Math.floor(exp * level * trainerBonus / 9);

        for (let pokemon of this._caughtPokemonList()) {
            if (pokemon.levelObservable() < (this.gymBadges.length + 2) * 10) {
                pokemon.exp(pokemon.exp() + expTotal);
            }
        }
    }

    get routeKills(): Array<KnockoutObservable<number>> {
        return this._routeKills;
    }

    set routeKills(value: Array<KnockoutObservable<number>>) {
        this._routeKills = value;
    }

    public usePokeball(pokeBall: GameConstants.Pokeball): void {
        this._pokeballs[pokeBall]--;
    }

    get routeKillsNeeded(): number {
        return this._routeKillsNeeded();
    }

    set routeKillsNeeded(value: number) {
        this._routeKillsNeeded(value);
    }

    get route(): KnockoutObservable<number> {
        return this._route;
    }

    set route(value: KnockoutObservable<number>) {
        this._route = value;
    }

    get money(): number {
        return this._money();
    }

    get dungeonTokens(): KnockoutObservable<number> {
        return this._dungeonTokens;
    }

    get caughtPokemonList() {
        return this._caughtPokemonList();
    }

    get region(): GameConstants.Region {
        return this._region;
    }

    set region(value: GameConstants.Region) {
        this._region = value;
    }

    get pokeballs(): number[] {
        return this._pokeballs;
    }

    set pokeballs(value: number[]) {
        this._pokeballs = value;
    }

    get gymBadges(): GameConstants.Badge[] {
        return this._gymBadges();
    }

    set gymBadges(value: GameConstants.Badge[]) {
        this._gymBadges(value);
    }

    get shinyList(): boolean[] {
        return this._shinyList;
    }

    set shinyList(value: boolean[]) {
        this._shinyList = value;
    }

    get caughtShinyList(): KnockoutObservableArray<string> {
        return this._caughtShinyList;
    }

    set caughtShinyList(value: KnockoutObservableArray<string>) {
        this._caughtShinyList = value;
    }

    get alreadyCaughtBallSelection(): GameConstants.Pokeball {
        return this._alreadyCaughtBallSelection;
    }

    set alreadyCaughtBallSelection(value: GameConstants.Pokeball) {
        this._alreadyCaughtBallSelection = value;
    }

    get notCaughtBallSelection(): GameConstants.Pokeball {
        return this._notCaughtBallSelection;
    }

    set notCaughtBallSelection(value: GameConstants.Pokeball) {
        this._notCaughtBallSelection = value;
    }

    get town(): KnockoutObservable<Town> {
        return this._town;
    }

    set town(value: KnockoutObservable<Town>) {
        this._town = value;
    }

    public toJSON() {
        let keep = ["_money", "_dungeonTokens", "_caughtShinyList", "_route", "_caughtPokemonList", "_routeKills", "_routeKillsNeeded", "_region", "_gymBadges", "_pokeballs", "_shinyList", "_notCaughtBallSelection", "_alreadyCaughtBallSelection"];
        let plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep)
    }

}

