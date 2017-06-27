class Player {
    private static _money: number;
    private static _dungeonTokens: number;
    private static _caughtPokemonList = [];
    private static _route:number;
    private static _region: GameConstants.Region;
    private static _pokeballs: number[] = [3,2,4,1];

    // TODO Eh not a big fan of this name.
    private static _notCaughtBallSelection: GameConstants.Pokeball = GameConstants.Pokeball.Masterball;
    private static _alreadyCaughtBallSelection: GameConstants.Pokeball = GameConstants.Pokeball.Pokeball;

    public static calculatePokemonAttack(): number {
        // TODO Calculate pokemon attack by checking the caught list, upgrades and multipliers.
        return 1;
    }

    public static calculateClickAttack(): number {
        // TODO Calculate click attack by checking the caught list size, upgrades and multipliers.
        return 1;
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

    public static calculateCatchTime(): number{
        // TODO Calculate catch time by checking upgrades and multipliers.
        return 2000;
    }

    // TODO better name
    public static whichBallToUse(alreadyCaught:boolean): GameConstants.Pokeball{
        let pref: GameConstants.Pokeball;
        if(alreadyCaught){
            pref = this._alreadyCaughtBallSelection;
        } else {
            pref = this._notCaughtBallSelection;
        }

        let use: GameConstants.Pokeball;

        for(let i: number = pref; i>= 0; i--){
            console.log(i);
            if(this._pokeballs[i] > 0){
                use = i;
                break;
            }
        }
        return use;
    }

    public static alreadyCaughtPokemon(pokemonName:string){
        for(let i:number = 0; i<this.caughtPokemonList.length; i++){
            if(this.caughtPokemonList[i].name == pokemonName){
                return true;
            }
        }
        return false;
    }

    static gainMoney(money: number) {
        // TODO add money multipliers
    }

    static gainExp(exp: number) {
        // TODO add exp multipliers
    }

    public static get money(): number {
        return this._money;
    }

    public static get dungeonTokens(): number {
        return this._dungeonTokens;
    }

    public static get caughtPokemonList() {
        return this._caughtPokemonList;
    }

    static get route(): number {
        return this._route;
    }

    static set route(value: number) {
        this._route = value;
    }

    static get region(): GameConstants.Region {
        return this._region;
    }

    static set region(value: GameConstants.Region) {
        this._region = value;
    }


}