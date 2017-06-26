/**
 * Created by dennis on 26-06-17.
 */
class dataPokemon implements pokemonInterface {
    id: number;
    name: string;
    catchRate: number;
    evolution: string;
    evoLevel: number;
    type1: gameConstants.PokemonType;
    type2: gameConstants.PokemonType;
    attack: number;
    levelType: gameConstants.LevelType;
    exp: number;
    eggCycles: number;
    shiny: boolean;


    constructor(id: number, name: string, catchRate: number, evolution: string, evoLevel: number, type1: gameConstants.PokemonType, type2: gameConstants.PokemonType, attack: number, levelType: gameConstants.LevelType, exp: number, eggCycles: number, shiny: boolean) {
        this.id = id;
        this.name = name;
        this.catchRate = catchRate;
        this.evolution = evolution;
        this.evoLevel = evoLevel;
        this.type1 = type1;
        this.type2 = type2;
        this.attack = attack;
        this.levelType = levelType;
        this.exp = exp;
        this.eggCycles = eggCycles;
        this.shiny = shiny;
    }
}