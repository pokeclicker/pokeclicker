///<reference path="../player.ts"/>


class randomBattlePokemonGenerator {

    public static generate(route: number, region: gameConstants.Regions): battlePokemon {
        if (route > 25) {
            return null;
        }

        let pokemonList: string[] = RouteHelper.getAvailablePokemonList(route, region);
        let rand: number = Math.floor(Math.random() * pokemonList.length);
        let name: string = pokemonList[rand];
        let basePokemon = PokemonHelper.findPokemonByName(name);
        let id = basePokemon["id"];

        let type1: PokemonTypes = PokemonHelper.typeStringToId(basePokemon["type"][0]);
        let type2: PokemonTypes = PokemonHelper.typeStringToId(basePokemon["type"][1]);

        // TODO this monster formula needs to be improved. Preferably with graphs :D
        let maxHealth: number = Math.max(Math.floor(Math.pow((100 * Math.pow(route, 2.2) * Math.pow(player.caughtPokemonList.length - 1, 1.2) / 12), 1.15)), 20) || 20;

        let catchVariation = Math.floor(Math.random() * 7 - 3);

        let catchRate: number = Math.floor(Math.pow(basePokemon["catchrate"], 0.75)) + catchVariation;
        let exp: number = basePokemon["exp"];

        let deviation = Math.floor(Math.random() * 51) - 25;
        let money: number = Math.max(10, 3 * route + 5 * Math.pow(route, 1.15) + deviation);
        let shiny: boolean = this.generateShiny();
        return new battlePokemon(name, id, type1, type2, maxHealth, catchRate, exp, money, shiny);
    }

    public static generateShiny(): boolean {

        let chance = gameConstants.SHINY_CHANCE_BATTLE;

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


}