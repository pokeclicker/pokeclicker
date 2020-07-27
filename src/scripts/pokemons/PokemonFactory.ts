///<reference path="PokemonHelper.ts"/>
///<reference path="BattlePokemon.ts"/>

class PokemonFactory {

    /**
     * Generate a wild pokemon based on route, region and the dataList.
     * @param route route that the player is on.
     * @param region region that the player is in.
     * @returns {any}
     */
    public static generateWildPokemon(route: number, region: GameConstants.Region): BattlePokemon {
        if (!MapHelper.validRoute(route, region)) {
            return new BattlePokemon('Rattata', 19, PokemonType.Psychic, PokemonType.None, 10000, 1, 0, 0, 0, false, 1);
        }
        let name: string;

        if (PokemonFactory.roamingEncounter(route, region)) {
            const possible = GameConstants.RoamingPokemon[region];
            name = possible[Math.floor(Math.random() * possible.length)];
        } else {
            const pokemonList: string[] = RouteHelper.getAvailablePokemonList(route, region);
            const rand: number = Math.floor(Math.random() * pokemonList.length);
            name = pokemonList[rand];
        }
        const basePokemon = PokemonHelper.getPokemonByName(name);
        const id = basePokemon.id;

        // TODO this monster formula needs to be improved. Preferably with graphs :D
        const maxHealth: number = PokemonFactory.routeHealth(route, region);
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        const exp: number = basePokemon.exp;
        const level: number = this.routeLevel(route, region);

        const money: number = this.routeMoney(route,region);
        const shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        if (shiny) {
            Notifier.notify({ message: `✨ You encountered a shiny ${name}! ✨`, type: GameConstants.NotificationOption.warning, sound: GameConstants.NotificationSound.shiny_long });
        }
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, money, shiny);
    }

    public static routeLevel(route: number, region: GameConstants.Region): number {
        return route * 2;
    }

    public static routeHealth(route: number, region: GameConstants.Region): number {
        switch (region) {
            // Hoenn starts at route 101 need to reduce the total hp of pokemon on those routes.
            case GameConstants.Region.hoenn:
                route -= 54;
                break;
        }
        const health: number = Math.max(20, Math.floor(Math.pow((100 * Math.pow(route, 2.2) / 12), 1.15))) || 20;
        return health;
    }

    public static routeMoney(route: number, region: GameConstants.Region): number {
        switch (region) {
            // Hoenn starts at route 101 need to reduce the total money earned on those routes.
            case GameConstants.Region.hoenn:
                route -= 54;
                break;
        }
        const deviation = Math.floor(Math.random() * 51) - 25;
        const money: number = Math.max(10, 3 * route + 5 * Math.pow(route, 1.15) + deviation);

        return money;
    }

    public static routeDungeonTokens(route: number, region: GameConstants.Region): number {
        switch (region) {
            // Hoenn starts at route 101 need to reduce the total dungeon tokens earned on those routes.
            case GameConstants.Region.hoenn:
                route -= 54;
                break;
        }

        const tokens = Math.max(1, 6 * Math.pow(this.routeLevel(route,region) / 3, 1.05));

        return tokens;
    }

    /**
     * Calculate if a shiny has spawned.
     * @param chance Base chance, should be from GameConstants.SHINY_CHANCE.*
     * @returns {boolean}
     */
    public static generateShiny(chance: number): boolean {
        chance /= App.game.oakItems.calculateBonus(OakItems.OakItem.Shiny_Charm);

        const rand: number = Math.floor(Math.random() * chance) + 1;

        if (rand <= 1) {
            App.game.oakItems.use(OakItems.OakItem.Shiny_Charm);
            return true;
        }
        return false;
    }

    public static generatePartyPokemon(id: number) {
        const dataPokemon = PokemonHelper.getPokemonById(id);
        return new PartyPokemon(dataPokemon.id, dataPokemon.name, dataPokemon.evolutions, dataPokemon.attack, 0, 0, false);
    }

    /**
     * Generate a trainer pokemon based on gymName, index and the dataList.
     * @param gymName name of the gym that the player is fighting.
     * @param index index of the pokémon that is being generated.
     * @returns {any}
     */
    public static generateTrainerPokemon(gymName: string, index: number): BattlePokemon {
        const gym = gymList[gymName];
        const pokemon = gym.pokemons[index];
        const basePokemon = PokemonHelper.getPokemonByName(pokemon.name);

        const exp: number = basePokemon.exp * 1.5;
        const shiny = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        return new BattlePokemon(pokemon.name, basePokemon.id, basePokemon.type1, basePokemon.type2, pokemon.maxHealth, pokemon.level, 0, exp, 0, shiny, GameConstants.GYM_SHARDS);
    }

    public static generateDungeonPokemon(pokemonList: string[], chestsOpened: number, baseHealth: number, level: number): BattlePokemon {
        const random: number = GameConstants.randomIntBetween(0, pokemonList.length - 1);
        const name = pokemonList[random];
        const basePokemon = PokemonHelper.getPokemonByName(name);
        const id = basePokemon.id;
        const maxHealth: number = Math.floor(baseHealth * (1 + (chestsOpened / 5)));
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        const exp: number = basePokemon.exp;
        const money = 0;
        const shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        if (shiny) {
            Notifier.notify({ message: `✨ You encountered a shiny ${name}! ✨`, type: GameConstants.NotificationOption.warning, sound: GameConstants.NotificationSound.shiny_long });
        }
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, money, shiny, GameConstants.DUNGEON_SHARDS);
    }

    public static generateDungeonBoss(bossPokemonList: DungeonBossPokemon[], chestsOpened: number): BattlePokemon {
        const random: number = GameConstants.randomIntBetween(0, bossPokemonList.length - 1);
        const bossPokemon = bossPokemonList[random];
        const name: string = bossPokemon.name;
        const basePokemon = PokemonHelper.getPokemonByName(name);
        const id = basePokemon.id;
        const maxHealth: number = Math.floor(bossPokemon.baseHealth * (1 + (chestsOpened / 5)));
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        const exp: number = basePokemon.exp;
        const money = 0;
        const shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        if (shiny) {
            Notifier.notify({ message: `✨ You encountered a shiny ${name}! ✨`, type: GameConstants.NotificationOption.warning, sound: GameConstants.NotificationSound.shiny_long });
        }
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, bossPokemon.level, catchRate, exp, money, shiny, GameConstants.DUNGEON_BOSS_SHARDS);
    }

    private static roamingEncounter(route: number, region: GameConstants.Region): boolean {
        const routes = GameConstants.RegionRoute[region];
        const roamingPokemon = GameConstants.RoamingPokemon[region];
        if (!routes || !roamingPokemon) {
            return false;
        }
        return PokemonFactory.roamingChance(GameConstants.ROAMING_MAX_CHANCE, GameConstants.ROAMING_MIN_CHANCE, routes[1], routes[0], route);
    }

    private static roamingChance(max, min, maxRoute, minRoute, curRoute) {
        return Math.random() < 1 / (max + ( (min - max) * (maxRoute - curRoute) / (maxRoute - minRoute)));
    }

    private static catchRateHelper(baseCatchRate: number, noVariation = false) {
        const catchVariation = noVariation ? 0 : GameConstants.randomIntBetween(-3, 3);
        const catchRateRaw = Math.floor(Math.pow(baseCatchRate, 0.75)) + catchVariation;
        return GameConstants.clipNumber(catchRateRaw, 0, 100);
    }
}
