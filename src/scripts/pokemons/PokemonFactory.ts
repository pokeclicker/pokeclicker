///<reference path="PokemonHelper.ts"/>
///<reference path="BattlePokemon.ts"/>

class PokemonFactory {

    /**
     * Generate a wild pokemon based on route, region and the dataList.
     * @param route route that the player is on.
     * @param region region that the player is in.
     * @returns {any}
     */
    public static generateWildPokemon(route: number, region: RegionName): BattlePokemon {
        if (!MapHelper.validRoute(route, region)) {
            console.error(`Invalid route ${route} in region ${RegionName[region]}`);
            return new BattlePokemon('Rattata', 19, PokemonType.Psychic, PokemonType.None, 10000, 1, 0, 0, 0, false, 1);
        }

        let possiblePokemon: string[] = [];
        if (PokemonFactory.roamingEncounter(route)) {
            possiblePokemon = GameConstants.RoamingPokemon[region];
        }
        if (possiblePokemon.length === 0) {
            possiblePokemon = App.game.world.getRegion(region).getRoute(route).getAvailablePokemon();
        }

        if (possiblePokemon.length === 0) {
            console.error(`Could not find pokemon to spawn on route ${route} in region ${RegionName[region]}`);
            return new BattlePokemon('Rattata', 19, PokemonType.Psychic, PokemonType.None, 10000, 1, 0, 0, 0, false, 1);
        }

        const name = GameConstants.randomElement(possiblePokemon);
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
            Notifier.notify(`✨ You encountered a shiny ${name}! ✨`, GameConstants.NotificationOption.warning);
        }
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, money, shiny);
    }

    public static routeLevel(route: number, region: RegionName): number {
        return route * 2;
    }

    public static routeHealth(route: number, region: RegionName): number {
        switch (region) {
            // Hoenn starts at route 101 need to reduce the total hp of pokemon on those routes.
            case RegionName.hoenn:
                route -= 54;
                break;
        }
        return Math.max(Math.floor(Math.pow((100 * Math.pow(route, 2.2) / 12), 1.15)), 20) || 20;
    }

    public static routeMoney(route: number, region: RegionName): number {
        const deviation = Math.floor(Math.random() * 51) - 25;
        const money: number = Math.max(10, 3 * route + 5 * Math.pow(route, 1.15) + deviation);

        return money;
    }

    public static routeDungeonTokens(route: number, region: RegionName): number {
        const tokens = 6 * Math.pow(this.routeLevel(route,region) / 3, 1.05);

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
    public static generateTrainerPokemon(pokemon: GymPokemon, index: number): BattlePokemon {
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
            Notifier.notify(`✨ You encountered a shiny ${name}! ✨`, GameConstants.NotificationOption.warning);
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
            Notifier.notify(`✨ You encountered a shiny ${name}! ✨`, GameConstants.NotificationOption.warning);
        }
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, bossPokemon.level, catchRate, exp, money, shiny, GameConstants.DUNGEON_BOSS_SHARDS);
    }

    private static roamingEncounter(route): boolean {
        switch (App.game.world.currentRegion) {
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
        const catchVariation = GameConstants.randomIntBetween(-3, 3);
        const catchRateRaw = Math.floor(Math.pow(baseCatchRate, 0.75)) + catchVariation;
        return GameConstants.clipNumber(catchRateRaw, 0, 100);
    }
}
