class DataPokemon implements pokemonInterface {
    id: number;
    name: string;
    catchRate: number;
    evolutions: Evolution[];
    evolution: any[];
    evoLevel: any[];
    type1: GameConstants.PokemonType;
    type2: GameConstants.PokemonType;
    attack: number;
    levelType: LevelType;
    exp: number;
    eggCycles: number;
    shiny: boolean;

    constructor(id: number, name: string, catchRate: number, evolutions: Evolution[], evolution: any[], evoLevel: any[], type1: GameConstants.PokemonType, type2: GameConstants.PokemonType, attack: number, levelType: LevelType, exp: number, eggCycles: number) {
        this.id = id;
        this.name = name;
        this.catchRate = catchRate;
        this.evolutions = evolutions;
        this.evolution = evolution;
        this.evoLevel = evoLevel;
        this.type1 = type1;
        this.type2 = type2;
        this.attack = attack;
        this.levelType = levelType;
        this.exp = exp;
        this.eggCycles = eggCycles;
        this.shiny = false;
    }

}
