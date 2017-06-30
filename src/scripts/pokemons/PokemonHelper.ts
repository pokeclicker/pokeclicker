///<reference path="PokemonList.ts"/>
///<reference path="../GameConstants.ts"/>

class PokemonHelper {

    public static getPokemonByName(name: string) {
        let basePokemon = pokemonMap[name];
        let type2: GameConstants.PokemonType = basePokemon["type"][0] || GameConstants.PokemonType.None;
        let evoLevel = basePokemon["evoLevel"] || 101;
        let eggCycles: number = basePokemon["eggCycles"] || 20;
        return new DataPokemon(basePokemon["id"], basePokemon["name"], basePokemon["catchRate"], basePokemon["evolution"], evoLevel, basePokemon["type"][0], type2, basePokemon["attack"], basePokemon["levelType"], basePokemon["exp"], eggCycles);
    }

    public static typeStringToId(id: string) {
        return GameConstants.PokemonType[id];
    }

    public static typeIdToString(id: number) {
        return GameConstants.PokemonType[id];
    }

}