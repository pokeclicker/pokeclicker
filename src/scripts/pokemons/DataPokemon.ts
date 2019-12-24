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

    constructor(id: number, name: string, catchRate: number, evolution: string, evoLevel: number, type1: GameConstants.PokemonType, type2: GameConstants.PokemonType, attack: number, levelType: GameConstants.LevelType, exp: number, eggCycles: number) {
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
        this.shiny = false;
    }

    public evolutionByIndex(index, filterMaxRegion, returnAllEvolutions = false){
      if (!this.evolution){
          return;
      }
      let evolutions = this.evolution[index].constructor === Array ? this.evolution[index] : [this.evolution[index]];

      if (filterMaxRegion && player){
          evolutions = evolutions.filter(p=>PokemonHelper.calcNativeRegion(p) <= player.highestRegion());
      }

      if (!evolutions.length){
          return;
      }

      if (returnAllEvolutions){
        return evolutions;
      }

      return evolutions[Math.floor(Math.random() * evolutions.length)];
    }
}
