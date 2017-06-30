/**
 * Created by dennis on 26-06-17.
 */
class DataPokemon implements pokemonInterface {
    id: number;
    name: string;
    catchRate: number;
    evolution: string;
    evoLevel: number;
    type1: GameConstants.PokemonType;
    type2: GameConstants.PokemonType;
    attack: number;
    levelType: GameConstants.LevelType;
    exp: number;
    eggCycles: number;
    shiny: boolean;


    constructor(id: number, name: string, catchRate: number, evolution: string, type1: GameConstants.PokemonType, type2: GameConstants.PokemonType, attack: number, levelType: GameConstants.LevelType, exp: number, eggCycles: number) {
        this.id = id;
        this.name = name;
        this.catchRate = catchRate;
        this.evolution = evolution;
        this.evoLevel = 1000;
        this.type1 = type1;
        this.type2 = type2;
        this.attack = attack;
        this.levelType = levelType;
        this.exp = exp;
        this.eggCycles = eggCycles;
        this.shiny = false;
    }
}