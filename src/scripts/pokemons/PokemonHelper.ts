///<reference path="PokemonList.ts"/>
///<reference path="../GameConstants.ts"/>

class PokemonHelper {

    public static getPokemonByName(name:string){
        return pokemonMap[name];
    }

    public static typeStringToId(id:string){
        return GameConstants.PokemonType[id];
    }

    public static typeIdToString(id:number){
        return GameConstants.PokemonType[id];
    }

}