///<reference path="PokemonHelper.ts"/>
///<reference path="BattlePokemon.ts"/>

/**
 * Created by dennis on 27-06-17.
 */
class pokemonFactory {

    /**
     * Generate a wild pokemon based on route, region and the dataList.
     * @param route route that the player is on.
     * @param region region that the player is in.
     * @returns {any}
     */
    public static generateWildPokemon(route: number, region: GameConstants.Region): battlePokemon {
        if (route > 25) {
            return null;
        }

        let pokemonList: string[] = RouteHelper.getAvailablePokemonList(route, region);
        let rand: number = Math.floor(Math.random() * pokemonList.length);
        let name: string = pokemonList[rand];
        let basePokemon = PokemonHelper.getPokemonByName(name);
        let id = basePokemon["id"];

        let type1: PokemonTypes = PokemonHelper.typeStringToId(basePokemon["type"][0]);
        let type2: PokemonTypes = PokemonHelper.typeStringToId(basePokemon["type"][1]);
        if (type2 == null) {
            type2 = PokemonType.None;
        }

        // TODO this monster formula needs to be improved. Preferably with graphs :D
        let maxHealth: number = Math.max(Math.floor(Math.pow((100 * Math.pow(route, 2.2) * Math.pow(Player.caughtPokemonList.length - 1, 1.2) / 12), 1.15)), 20) || 20;

        let catchVariation = Math.floor(Math.random() * 7 - 3);

        let catchRate: number = Math.floor(Math.pow(basePokemon["catchRate"], 0.75)) + catchVariation;
        let exp: number = basePokemon["exp"];

        let deviation = Math.floor(Math.random() * 51) - 25;
        let money: number = Math.max(10, 3 * route + 5 * Math.pow(route, 1.15) + deviation);
        let shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        return new battlePokemon(name, id, type1, type2, maxHealth, route * 2, catchRate, exp, money, shiny);
    }

    /**
     * Calculate if a shiny has spawned.
     * @param chance Base chance, should be from GameConstants.SHINY_CHANCE.*
     * @returns {boolean}
     */
    public static generateShiny(chance: number): boolean {

        // TODO Factor in oak item
        // if(isActive("Shiny Charm")){
        //     chance /= getOakItemBonus("Shiny Charm");
        // }

        let rand: number = Math.floor(Math.random() * chance) + 1;

        if (rand <= 1) {
            console.log("Shiny!!!");
            return true;
        }
        return false;
    }

    /**
     * Generate a trainer pokemon based on gymName, index and the dataList.
     * @param gymName name of the gym that the player is fighting.
     * @param index index of the pokémon that is being generated.
     * @returns {any}
     */
    public static generateTrainerPokemon(gymName: string, index: number): battlePokemon {
        let gym = gymList[gymName];
        let pokemon = gym.pokemons[index];
        let basePokemon = PokemonHelper.getPokemonByName(pokemon.name);

        let type1: PokemonTypes = PokemonHelper.typeStringToId(basePokemon["type"][0]);
        let type2: PokemonTypes = PokemonHelper.typeStringToId(basePokemon["type"][1]);
        if (type2 == null) {
            type2 = PokemonType.None;
        }
        let exp: number = basePokemon["exp"] * 1.5;
        let shiny = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        return new battlePokemon(pokemon.name, basePokemon["id"], type1, type2, pokemon.maxHealth, pokemon.level, 0, exp, 0, shiny)
    }


}