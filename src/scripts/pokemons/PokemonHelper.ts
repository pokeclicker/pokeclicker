///<reference path="pokemonList.ts"/>

class PokemonHelper {

    public static findPokemonByName(name:string){
        for(let i = 0; i< pokemonList.length; i++){
            if(pokemonList[i].name == name){
                return pokemonList[i];
            }
        }
    }

    public static typeStringToId(id:string){
        return gameConstants.PokemonType[id];
    }

    public static typeIdToString(id:number){
        return gameConstants.PokemonType[id];
    }

}