class DataPokemon implements PokemonInterface {
    id: number;
    name: string;
    catchRate: number;
    evolutions: Evolution[];
    type1: PokemonType;
    type2: PokemonType;
    attack: number;
    levelType: LevelType;
    exp: number;
    eggCycles: number;
    shiny: boolean;

    constructor(id: number, name: string, catchRate: number, evolutions: Evolution[], type1: PokemonType, type2: PokemonType, attack: number, levelType: LevelType, exp: number, eggCycles: number) {
        this.id = id;
        this.name = name;
        this.catchRate = catchRate;
        this.evolutions = evolutions;
        this.type1 = type1;
        this.type2 = type2;
        this.attack = attack;
        this.levelType = levelType;
        this.exp = exp;
        this.eggCycles = eggCycles;
        this.shiny = false;
    }

}
