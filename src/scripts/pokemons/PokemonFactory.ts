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
        if (!MapHelper.validRoute(route, region)) {
            return new BattlePokemon("Rattata", 19, GameConstants.PokemonType.Psychic, GameConstants.PokemonType.None, 10000, 1, 0, 0, 0, false, 1);
        }
        let name: string;

        if (PokemonFactory.roamingEncounter(route)) {
            let possible = GameConstants.RoamingPokemon[region];
            name = possible[Math.floor(Math.random() * possible.length)];
        } else {
            let pokemonList: string[] = RouteHelper.getAvailablePokemonList(route, region);
            let rand: number = Math.floor(Math.random() * pokemonList.length);
            name = pokemonList[rand];
        }
        let basePokemon = PokemonHelper.getPokemonByName(name);
        let id = basePokemon.id;

        // TODO this monster formula needs to be improved. Preferably with graphs :D
        let maxHealth: number = PokemonFactory.routeHealth(route);
        let catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        let exp: number = basePokemon.exp;

        let deviation = Math.floor(Math.random() * 51) - 25;
        let money: number = Math.max(10, 3 * route + 5 * Math.pow(route, 1.15) + deviation);
        let shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        if (shiny) Notifier.notify(`✨ You encountered a shiny ${name}! ✨`, GameConstants.NotificationOption.warning);
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, route * 2, catchRate, exp, money, shiny);
    }

    public static routeHealth(route: number): number {
        return Math.max(Math.floor(Math.pow((100 * Math.pow(route, 2.2) / 12), 1.15)), 20) || 20;
    }

    /**
     * Calculate if a shiny has spawned.
     * @param chance Base chance, should be from GameConstants.SHINY_CHANCE.*
     * @returns {boolean}
     */
    public static generateShiny(chance: number): boolean {
        chance = OakItemRunner.isActive(GameConstants.OakItem.Shiny_Charm) ? chance / (1 + OakItemRunner.calculateBonus(GameConstants.OakItem.Shiny_Charm) / 100) : chance;

        let rand: number = Math.floor(Math.random() * chance) + 1;

        if (rand <= 1) {
            OakItemRunner.use(GameConstants.OakItem.Shiny_Charm);
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
        let catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        let exp: number = basePokemon.exp;
        let money: number = 0;
        let shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        if (shiny) Notifier.notify(`✨ You encountered a shiny ${name}! ✨`, GameConstants.NotificationOption.warning);
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, money, shiny, GameConstants.DUNGEON_SHARDS);
    }

    public static generateDungeonBoss(bossPokemonList: DungeonBossPokemon[], chestsOpened: number): BattlePokemon {
        let random: number = GameConstants.randomIntBetween(0, bossPokemonList.length - 1);
        let bossPokemon = bossPokemonList[random];
        let name: string = bossPokemon.name;
        let basePokemon = PokemonHelper.getPokemonByName(name);
        let id = basePokemon.id;
        let maxHealth: number = Math.floor(bossPokemon.baseHealth * (1 + (chestsOpened / 5)));
        let catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        let exp: number = basePokemon.exp;
        let money: number = 0;
        let shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        if (shiny) Notifier.notify(`✨ You encountered a shiny ${name}! ✨`, GameConstants.NotificationOption.warning);
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, bossPokemon.level, catchRate, exp, money, shiny, GameConstants.DUNGEON_BOSS_SHARDS);
    }

    private static roamingEncounter(route): boolean {
        switch (player.region) {
            case 0:
                return PokemonFactory.roamingChance(GameConstants.ROAMING_MAX_CHANCE, GameConstants.ROAMING_MIN_CHANCE, 25, 1, route);
            case 1:
                return PokemonFactory.roamingChance(GameConstants.ROAMING_MAX_CHANCE, GameConstants.ROAMING_MIN_CHANCE, 46, 26, route);
            default:
                return false;
        }
    }

    private static roamingChance(max, min, maxRoute, minRoute, curRoute) {
        return Math.random() < 1 / (max + ( (min - max) * (maxRoute - curRoute) / (maxRoute - minRoute)));
    }

    private static catchRateHelper(baseCatchRate: number) {
        let catchVariation = GameConstants.randomIntBetween(-3, 3);
        let catchRateRaw = Math.floor(Math.pow(baseCatchRate, 0.75)) + catchVariation;
        return GameConstants.clipNumber(catchRateRaw, 0, 100);
    }
}
