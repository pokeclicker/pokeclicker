///<reference path="PokemonList.ts"/>
///<reference path="../GameConstants.ts"/>

class PokemonHelper {

    public static getPokemonByName(name: string): DataPokemon {
        let basePokemon = pokemonMap[name];
        let type2: GameConstants.PokemonType = basePokemon["type"][1] || GameConstants.PokemonType.None;
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

    public static calculateLevel(pokemon: CaughtPokemon): number {
        let level;
        switch (PokemonHelper.getPokemonByName(pokemon.name).levelType) {
            case GameConstants.LevelType.slow:
                level = Math.pow(pokemon.exp() * 4 / 5, 1 / 3);
                break;
            case GameConstants.LevelType.mediumslow:
                let y;
                for (let x = 1; x <= 100; x++) {
                    y = 6 / 5 * Math.pow(x, 3) - 15 * Math.pow(x, 2) + 100 * x - 140;
                    if (pokemon.exp >= y) {
                        level = x
                    } else {
                        break;
                    }
                }
                break;
            case GameConstants.LevelType.mediumfast:
                level = Math.pow(pokemon.exp(), 1 / 3);
                break;
            case GameConstants.LevelType.fast:
                level = Math.pow(pokemon.exp() * 5 / 4, 1 / 3);
                break;
            default:
                level = Math.pow(30 * pokemon.exp(), 0.475) / (6 * Math.sqrt(5));
                break;
        }
        return Math.max(1, Math.min(100, Math.floor(level)));
    }

    public static calculateAttack(attackBase: number, attackBonus: number, level: number): number {
        return Math.max(1, Math.floor((attackBase + attackBonus) * level / 100))
    }

}