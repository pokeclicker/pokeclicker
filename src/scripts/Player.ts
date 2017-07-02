/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {


    private static _money: KnockoutObservable<number> = ko.observable(0);
    private static _dungeonTokens: number = 0;
    private static _caughtShinyList: KnockoutObservableArray<string> = ko.observableArray<string>();
    private static _route: KnockoutObservable<number> = ko.observable(1);
    public static _caughtPokemonList: KnockoutObservableArray<CaughtPokemon> = ko.observableArray<CaughtPokemon>();
    private static _routeKills: Array<KnockoutObservable<number>> = Array.apply(null, Array(GameConstants.AMOUNT_OF_ROUTES)).map(function () {
        return ko.observable(0)
    });
    private static _routeKillsNeeded: KnockoutObservable<number> = ko.observable(10);

    private static _region: GameConstants.Region = GameConstants.Region.kanto;
    private static _gymBadges: GameConstants.Badge[] = [];
    private static _pokeballs: number[] = [0, 0, 0, 0];
    private static _shinyList: boolean[] = Array.apply(null, Array(GameConstants.AMOUNT_OF_POKEMONS)).map(Boolean.prototype.valueOf, false);

    private static _notCaughtBallSelection: GameConstants.Pokeball = GameConstants.Pokeball.Masterball;
    private static _alreadyCaughtBallSelection: GameConstants.Pokeball = GameConstants.Pokeball.Pokeball;

    public static clickAttackObservable: KnockoutComputed<number> = ko.computed(function () {
        return Player.calculateClickAttack()
    });

    public static pokemonAttackObservable: KnockoutComputed<number> = ko.computed(function () {
        return Player.calculatePokemonAttack(GameConstants.PokemonType.None, GameConstants.PokemonType.None);
    });

    public static routeKillsObservable: KnockoutComputed<number> = ko.computed(function () {
        return Math.min(Player.routeKillsNeeded(),Player.routeKills[Player.route()]());
    });

    public static addRouteKill() {
        Player.routeKills[Player.route()](Player.routeKills[Player.route()]() + 1)
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */
    public static calculatePokemonAttack(type1: GameConstants.PokemonType, type2: GameConstants.PokemonType): number {
        // TODO Calculate pokemon attack by checking the caught list, upgrades and multipliers.
        // TODO factor in types
        // TODO start at 0
        let attack = 5;
        for (let pokemon of this.caughtPokemonList){
            attack += pokemon.attack();
        }

        return attack;
    }

    public static calculateClickAttack(): number {
        // TODO Calculate click attack by checking the caught list size, upgrades and multipliers.
        return 10;
    }

    public static calculateMoneyMultiplier(): number {
        // TODO Calculate money multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateExpMultiplier(): number {
        // TODO Calculate exp multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateDungeonTokenMultiplier(): number {
        // TODO Calculate dungeon token multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateCatchTime(): number {
        // TODO Calculate catch time by checking upgrades and multipliers.
        return 10;
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param alreadyCaught if the pokémon is already caught.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public static calculatePokeballToUse(alreadyCaught: boolean): GameConstants.Pokeball {
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
    public static alreadyCaughtPokemon(pokemonName: string) {
        console.log(Player.caughtPokemonList);
        for (let i: number = 0; i < Player.caughtPokemonList.length; i++) {
            if (Player.caughtPokemonList[i].name == pokemonName) {
                return true;
            }
        }
        return false;
    }

    public static alreadyCaughtPokemonShiny(pokemonName: string) {
        for (let i: number = 0; i < this.caughtShinyList().length; i++) {
            if (this.caughtShinyList()[i] == pokemonName) {
                return true;
            }
        }
        return false;
    }

    public static capturePokemon(pokemonName: string, shiny: boolean = false) {
        if (!Player.alreadyCaughtPokemon(pokemonName)) {
            let pokemonData = PokemonHelper.getPokemonByName(pokemonName);
            let caughtPokemon: CaughtPokemon = new CaughtPokemon(pokemonData, false, 0, 0);
            Player._caughtPokemonList.push(caughtPokemon);
        }
    }

    public static hasBadge(badge: GameConstants.Badge) {
        if (badge == undefined || GameConstants.Badge.None) {
            return true;
        }
        for (let i = 0; i < this._gymBadges.length; i++) {
            if (this._gymBadges[i] == badge) {
                return true;
            }
        }
        return false;
    }

    static gainMoney(money: number) {
        // TODO add money multipliers
        this._money(Math.floor(this._money() + money));
    }

    static gainExp(exp: number, level: number, trainer: boolean) {
        // TODO add exp multipliers
        let trainerBonus = trainer ? 1.5 : 1;
        let expTotal = Math.floor(exp * level * trainerBonus / 9);

        for (let pokemon of this._caughtPokemonList()) {
            if (pokemon.levelObservable() < (this.gymBadges.length + 2) * 10) {
                pokemon.exp(pokemon.exp() + expTotal);
            }
        }
    }

    static get routeKills(): Array<KnockoutObservable<number>> {
        return this._routeKills;
    }

    static set routeKills(value: Array<KnockoutObservable<number>>) {
        this._routeKills = value;
    }

    static usePokeball(pokeBall: GameConstants.Pokeball): void {
        this._pokeballs[pokeBall]--;
    }

    static get routeKillsNeeded(): KnockoutObservable<number> {
        return this._routeKillsNeeded;
    }

    static set routeKillsNeeded(value: KnockoutObservable<number>) {
        this._routeKillsNeeded = value;
    }

    static get route(): KnockoutObservable<number> {
        return this._route;
    }

    static set route(value: KnockoutObservable<number>) {
        this._route = value;
    }

    public static get money(): number {
        return this._money();
    }

    public static get dungeonTokens(): number {
        return this._dungeonTokens;
    }

    public static get caughtPokemonList() {
        return this._caughtPokemonList();
    }

    static get region(): GameConstants.Region {
        return this._region;
    }

    static set region(value: GameConstants.Region) {
        this._region = value;
    }

    static get pokeballs(): number[] {
        return this._pokeballs;
    }

    static set pokeballs(value: number[]) {
        this._pokeballs = value;
    }

    static get gymBadges(): GameConstants.Badge[] {
        return this._gymBadges;
    }

    static set gymBadges(value: GameConstants.Badge[]) {
        this._gymBadges = value;
    }

    static get shinyList(): boolean[] {
        return this._shinyList;
    }

    static set shinyList(value: boolean[]) {
        this._shinyList = value;
    }

    static get caughtShinyList(): KnockoutObservableArray<string> {
        return this._caughtShinyList;
    }

    static set caughtShinyList(value: KnockoutObservableArray<string>) {
        this._caughtShinyList = value;
    }

}

