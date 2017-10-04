///<reference path="PokemonHelper.ts"/>
///<reference path="BattlePokemon.ts"/>

/**
 * Created by dennis on 27-06-17.
 */
class PokemonFactory {

    /**
     * Generate a wild pokemon based on route, region and the dataList.
     * @param route route that the player is on.
     * @param region region that the player is in.
     * @returns {any}
     */
    public static generateWildPokemon(route: number, region: GameConstants.Region): BattlePokemon {
        let name: string;
        if (route > 25 || route == 0) {
            return new BattlePokemon("Rattata", 19, GameConstants.PokemonType.Psychic, GameConstants.PokemonType.None, 10000, 1, 0, 0, 0, false, 1);
        }

        let mewEncounter: boolean = Math.random() < 1 / (GameConstants.MEW_CHANCE_ROUTE_25 + ( GameConstants.MEW_CHANCE_DIFF * (25 - route) / 24 ))
        if (mewEncounter) {
            name = "Mew";
        } else {
            let pokemonList: string[] = RouteHelper.getAvailablePokemonList(route, region);
            let rand: number = Math.floor(Math.random() * pokemonList.length);
            name = pokemonList[rand];
        }
        let basePokemon = PokemonHelper.getPokemonByName(name);
        let id = basePokemon.id;

        // TODO this monster formula needs to be improved. Preferably with graphs :D
        let maxHealth: number = Math.max(Math.floor(Math.pow((100 * Math.pow(route, 2.2) / 12), 1.15)), 20) || 20;

        let catchVariation = Math.floor(Math.random() * 7 - 3);

        let catchRate: number = Math.floor(Math.pow(basePokemon.catchRate, 0.75)) + catchVariation;
        let exp: number = basePokemon.exp;

        let deviation = Math.floor(Math.random() * 51) - 25;
        let money: number = Math.max(10, 3 * route + 5 * Math.pow(route, 1.15) + deviation);
        let shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, route * 2, catchRate, exp, money, shiny);
    }

    /**
     * Calculate if a shiny has spawned.
     * @param chance Base chance, should be from GameConstants.SHINY_CHANCE.*
     * @returns {boolean}
     */
    public static generateShiny(chance: number): boolean {
        chance = OakItemRunner.isActive("Shiny Charm") ? chance / (1 + OakItemRunner.calculateBonus("Shiny Charm") / 100) : chance;

        let rand: number = Math.floor(Math.random() * chance) + 1;

        if (rand <= 1) {
            Notifier.notify("You encounter a shiny Pokémon...", GameConstants.NotificationOption.warning);
            OakItemRunner.use("Shiny Charm");
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
    public static generateTrainerPokemon(gymName: string, index: number): BattlePokemon {
        let gym = gymList[gymName];
        let pokemon = gym.pokemons[index];
        let basePokemon = PokemonHelper.getPokemonByName(pokemon.name);

        let exp: number = basePokemon.exp * 1.5;
        let shiny = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        return new BattlePokemon(pokemon.name, basePokemon.id, basePokemon.type1, basePokemon.type2, pokemon.maxHealth, pokemon.level, 0, exp, 0, shiny, GameConstants.GYM_SHARDS)
    }

    public static generateDungeonPokemon(pokemonList: string[], chestsOpened: number, baseHealth: number, level: number): BattlePokemon {
        let random: number = GameConstants.randomIntBetween(0, pokemonList.length - 1);
        let name = pokemonList[random];
        let basePokemon = PokemonHelper.getPokemonByName(name);
        let id = basePokemon.id;
        let maxHealth: number = Math.floor(baseHealth * (1 + (chestsOpened / 5)));
        let catchVariation = Math.floor(Math.random() * 7 - 3);
        let catchRate: number = Math.floor(Math.pow(basePokemon.catchRate, 0.75)) + catchVariation;
        let exp: number = basePokemon.exp;
        let money: number = 0;
        let shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, money, shiny, GameConstants.DUNGEON_SHARDS);
    }

    public static generateDungeonBoss(bossPokemonList: DungeonBossPokemon[], chestsOpened: number): BattlePokemon {
        let random: number = GameConstants.randomIntBetween(0, bossPokemonList.length - 1);
        let bossPokemon = bossPokemonList[random];
        let name: string = bossPokemon.name;
        let basePokemon = PokemonHelper.getPokemonByName(name);
        let id = basePokemon.id;
        let maxHealth: number = Math.floor(bossPokemon.baseHealth * (1 + (chestsOpened / 5)));
        let catchVariation = Math.floor(Math.random() * 7 - 3);
        let catchRate: number = Math.floor(Math.pow(basePokemon.catchRate, 0.75)) + catchVariation;
        let exp: number = basePokemon.exp;
        let money: number = 0;
        let shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, bossPokemon.level, catchRate, exp, money, shiny, GameConstants.DUNGEON_BOSS_SHARDS);
    }

}