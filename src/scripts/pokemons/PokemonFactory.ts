///<reference path="../../declarations/globals.d.ts"/>
///<reference path="PokemonHelper.ts"/>
///<reference path="BattlePokemon.ts"/>

class PokemonFactory {

    /**
     * Generate a wild pokemon based on route, region and the dataList.
     * @param route route that the player is on.
     * @param region region that the player is in.
     * @returns {any}
     */
    public static generateWildPokemon(route: number, region: GameConstants.Region, subRegion: SubRegion): BattlePokemon {
        if (!MapHelper.validRoute(route, region)) {
            return new BattlePokemon('MissingNo.', 0, PokemonType.None, PokemonType.None, 0, 0, 0, 0, new Amount(0, GameConstants.Currency.money), false, 0, GameConstants.BattlePokemonGender.NoGender, GameConstants.ShadowStatus.None, EncounterType.route);
        }
        let name: PokemonNameType;

        const roaming = PokemonFactory.roamingEncounter(route, region, subRegion);
        if (roaming) {
            name = PokemonFactory.generateRoamingEncounter(region, subRegion);
        } else {
            name = Rand.fromArray(RouteHelper.getAvailablePokemonList(route, region));
        }
        const basePokemon = PokemonHelper.getPokemonByName(name);
        const id = basePokemon.id;
        const routeAvgHp = (region, route) => {
            const poke = [...new Set(Object.values(Routes.getRoute(region, route).pokemon).flat().map(p => p.pokemon ?? p).flat())];
            const total = poke.map(p => pokemonMap[p].base.hitpoints).reduce((s, a) => s + a, 0);
            return total / poke.length;
        };

        // TODO this monster formula needs to be improved. Preferably with graphs :D
        // Health has a +/- 10% variable based on base health stat compared to the average of the route
        const maxHealth: number = Math.round(PokemonFactory.routeHealth(route, region) * (0.9 + (basePokemon.hitpoints / routeAvgHp(region, route)) / 10));
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        const exp: number = basePokemon.exp;
        const level: number = this.routeLevel(route, region);
        const heldItem: BagItem = this.generateHeldItem(basePokemon.heldItem, GameConstants.ROUTE_HELD_ITEM_MODIFIER);
        const money: number = this.routeMoney(route,region);
        const shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        const gender = this.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
        const encounterType = roaming ? EncounterType.roamer : EncounterType.route;

        if (shiny) {
            Notifier.notify({
                message: `✨ You encountered a shiny ${PokemonHelper.displayName(name)()}! ✨`,
                pokemonImage: PokemonHelper.getImage(id, shiny, basePokemon.gender),
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.General.shiny_long,
                setting: NotificationConstants.NotificationSetting.General.encountered_shiny,
            });
        }
        if (roaming) {
            Notifier.notify({
                message: `You encountered a roaming ${name}!`,
                pokemonImage: PokemonHelper.getImage(id, shiny, basePokemon.gender),
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.General.roaming,
                setting: NotificationConstants.NotificationSetting.General.encountered_roaming,
            });
            App.game.logbook.newLog(
                LogBookTypes.ROAMER,
                (shiny
                    ? App.game.party.alreadyCaughtPokemon(id, true)
                        ? createLogContent.roamerShinyDupe
                        : createLogContent.roamerShiny
                    : createLogContent.roamer
                )({
                    location: Routes.getRoute(player.region, player.route).routeName,
                    pokemon: name,
                })
            );
        }
        const ep = GameConstants.BASE_EP_YIELD * (roaming ? GameConstants.ROAMER_EP_MODIFIER : 1);
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, new Amount(money, GameConstants.Currency.money), shiny, 1, gender, GameConstants.ShadowStatus.None, encounterType, heldItem, ep);
    }

    public static routeLevel(route: number, region: GameConstants.Region): number {
        return Math.floor(20 * Math.pow(MapHelper.normalizeRoute(route, region),(1 / 2.25)));
    }

    public static routeHealth(route: number, region: GameConstants.Region): number {
        const regionRoute = Routes.regionRoutes.find((routeData) => routeData.region === region && routeData.number === route);
        if (regionRoute?.routeHealth) {
            return regionRoute.routeHealth;
        }
        route = MapHelper.normalizeRoute(route, region);
        const health: number = Math.max(20, Math.floor(Math.pow((100 * Math.pow(route, 2.2) / 12), 1.15) * (1 + region / 20))) || 20;
        return health;
    }

    public static routeMoney(route: number, region: GameConstants.Region, useRandomDeviation = true): number {
        route = MapHelper.normalizeRoute(route, region);
        //If it's not random, we take the mean value (truncated)
        const deviation = useRandomDeviation ? Rand.intBetween(-25, 25) : 12;
        const money: number = Math.max(10, 3 * route + 5 * Math.pow(route, 1.15) + deviation);

        return money;
    }

    public static routeDungeonTokens(route: number, region: GameConstants.Region): number {
        route = MapHelper.normalizeRoute(route, region);

        const tokens = Math.max(1, 6 * Math.pow(route * 2 / (2.8 / (1 + region / 3)), 1.08));

        return tokens;
    }

    /**
     * Calculate if a shiny has spawned.
     * @param chance Base chance, should be from GameConstants.SHINY_CHANCE.*
     * @returns {boolean}
     */
    public static generateShiny(chance: number, skipBonus = false): boolean {
        const bonus = skipBonus ? 1 : App.game.multiplier.getBonus('shiny');

        if (Rand.chance(chance / bonus)) {
            App.game.oakItems.use(OakItemType.Shiny_Charm);
            return true;
        }
        return false;
    }

    public static generatePartyPokemon(id: number, shiny = false, gender = GameConstants.BattlePokemonGender.NoGender, shadow = GameConstants.ShadowStatus.None): PartyPokemon {
        const dataPokemon = PokemonHelper.getPokemonById(id);
        return new PartyPokemon(dataPokemon.id, dataPokemon.name, dataPokemon.evolutions, dataPokemon.attack, dataPokemon.eggCycles, shiny, gender, shadow);
    }

    /**
     * Generate a Gym trainer pokemon based on gymName, index and the dataList.
     * @param gymName name of the gym that the player is fighting.
     * @param index index of the Pokémon that is being generated.
     * @returns {any}
     */
    public static generateGymPokemon(gym: Gym, index: number): BattlePokemon {
        const pokemon = gym.getPokemonList()[index];
        const basePokemon = PokemonHelper.getPokemonByName(pokemon.name);

        const exp: number = basePokemon.exp;
        const shiny = pokemon.shiny ? pokemon.shiny : this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        const gender = this.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
        const shadow = pokemon.shadow;
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        return new BattlePokemon(pokemon.name, basePokemon.id, basePokemon.type1, basePokemon.type2, pokemon.maxHealth, pokemon.level, catchRate, exp, new Amount(0, GameConstants.Currency.money), shiny, GameConstants.GYM_GEMS, gender, shadow, EncounterType.trainer);
    }

    public static generateDungeonPokemon(name: PokemonNameType, chestsOpened: number, baseHealth: number, level: number, mimic = false): BattlePokemon {
        const basePokemon = PokemonHelper.getPokemonByName(name);
        const id = basePokemon.id;
        const maxHealth: number = Math.floor(baseHealth * (1 + (chestsOpened / 5)));
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        const exp: number = basePokemon.exp;
        const money = 0;
        const heldItem = this.generateHeldItem(basePokemon.heldItem, GameConstants.DUNGEON_HELD_ITEM_MODIFIER);
        const shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_DUNGEON);
        const gender = this.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
        if (shiny) {
            Notifier.notify({
                message: `✨ You encountered a shiny ${PokemonHelper.displayName(name)()}! ✨`,
                pokemonImage: PokemonHelper.getImage(id, shiny, basePokemon.gender),
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.General.shiny_long,
                setting: NotificationConstants.NotificationSetting.General.encountered_shiny,
            });
        }

        const ep = GameConstants.BASE_EP_YIELD * (mimic ? GameConstants.DUNGEON_BOSS_EP_MODIFIER : GameConstants.DUNGEON_EP_MODIFIER);
        const et = mimic ? EncounterType.mimic : EncounterType.dungeon;
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, new Amount(money, GameConstants.Currency.money), shiny, GameConstants.DUNGEON_GEMS, gender, GameConstants.ShadowStatus.None, et, heldItem, ep);
    }

    public static generateDungeonTrainerPokemon(pokemon: GymPokemon, chestsOpened: number, baseHealth: number, level: number, isBoss: boolean): BattlePokemon {
        const name = pokemon.name;
        const basePokemon = PokemonHelper.getPokemonByName(name);
        const maxHealth: number = Math.floor(baseHealth * (1 + (chestsOpened / 5)));
        const exp: number = basePokemon.exp;
        const shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_DUNGEON);
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        // Reward 2% or 5% (boss) of dungeon DT cost when the trainer mons are defeated
        const money = 0;
        const gender = this.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
        const shadow = pokemon.shadow;
        const ep = GameConstants.BASE_EP_YIELD * (isBoss ? GameConstants.DUNGEON_BOSS_EP_MODIFIER : GameConstants.DUNGEON_EP_MODIFIER);
        return new BattlePokemon(name, basePokemon.id, basePokemon.type1, basePokemon.type2, maxHealth, level, catchRate, exp, new Amount(money, GameConstants.Currency.money), shiny, GameConstants.DUNGEON_GEMS, gender, shadow, EncounterType.trainer, undefined, ep);
    }

    public static generateDungeonBoss(bossPokemon: DungeonBossPokemon, chestsOpened: number): BattlePokemon {
        const name: PokemonNameType = bossPokemon.name;
        const basePokemon = PokemonHelper.getPokemonByName(name);
        const id = basePokemon.id;
        const maxHealth: number = Math.floor(bossPokemon.baseHealth * (1 + (chestsOpened / 5)));
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        const exp: number = basePokemon.exp;
        const money = 0;
        const heldItem = this.generateHeldItem(basePokemon.heldItem, GameConstants.DUNGEON_BOSS_HELD_ITEM_MODIFIER);
        const shiny: boolean = this.generateShiny(GameConstants.SHINY_CHANCE_DUNGEON);
        const gender = this.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
        if (shiny) {
            Notifier.notify({
                message: `✨ You encountered a shiny ${PokemonHelper.displayName(name)()}! ✨`,
                pokemonImage: PokemonHelper.getImage(id, shiny, basePokemon.gender),
                type: NotificationConstants.NotificationOption.warning,
                sound: NotificationConstants.NotificationSound.General.shiny_long,
                setting: NotificationConstants.NotificationSetting.General.encountered_shiny,
            });
        }
        const ep = GameConstants.BASE_EP_YIELD * GameConstants.DUNGEON_BOSS_EP_MODIFIER;
        return new BattlePokemon(name, id, basePokemon.type1, basePokemon.type2, maxHealth, bossPokemon.level, catchRate, exp, new Amount(money, GameConstants.Currency.money), shiny, GameConstants.DUNGEON_BOSS_GEMS, gender, GameConstants.ShadowStatus.None, EncounterType.dungeonBoss, heldItem, ep);
    }

    public static generateTemporaryBattlePokemon(battle: TemporaryBattle, index: number): BattlePokemon {
        const pokemon = battle.getPokemonList()[index];
        const basePokemon = PokemonHelper.getPokemonByName(pokemon.name);
        const catchRate: number = this.catchRateHelper(basePokemon.catchRate);
        const encounterType = battle.optionalArgs.isTrainerBattle
            ? EncounterType.trainer
            : App.game.gameState === GameConstants.GameState.dungeon
                ? EncounterType.dungeon
                : EncounterType.route;

        const exp: number = basePokemon.exp;
        const shiny = pokemon.shiny ? pokemon.shiny : this.generateShiny(GameConstants.SHINY_CHANCE_BATTLE);
        const gender = this.generateGender(basePokemon.gender.femaleRatio, basePokemon.gender.type);
        const shadow = pokemon.shadow;
        return new BattlePokemon(pokemon.name, basePokemon.id, basePokemon.type1, basePokemon.type2, pokemon.maxHealth, pokemon.level, catchRate, exp, new Amount(0, GameConstants.Currency.money), shiny, GameConstants.GYM_GEMS, gender, shadow, encounterType);
    }

    private static generateRoamingEncounter(region: GameConstants.Region, subRegion: SubRegion): PokemonNameType {
        const possible = RoamingPokemonList.getSubRegionalGroupRoamers(region, RoamingPokemonList.findGroup(region, subRegion.id));

        // Double the chance of encountering a roaming Pokemon you have not yet caught
        return Rand.fromWeightedArray(possible, possible.map(r => App.game.party.alreadyCaughtPokemonByName(r.pokemon.name) ? 1 : 2)).pokemon.name;
    }

    private static roamingEncounter(routeNum: number, region: GameConstants.Region, subRegion: SubRegion): boolean {
        // Map to the route numbers
        const route = Routes.getRoute(region, routeNum);
        const routes = Routes.getRoutesByRegion(region).map(r => MapHelper.normalizeRoute(r.number, region));

        // Check if the dice rolls in their favor
        const encounter = PokemonFactory.roamingChance(Math.max(...routes), Math.min(...routes), route, region, subRegion);
        if (!encounter) {
            return false;
        }

        // There is likely to be a roamer available, so we can check this last
        const roamingPokemon = RoamingPokemonList.getSubRegionalGroupRoamers(region, RoamingPokemonList.findGroup(region, subRegion.id));
        if (!routes || !routes.length || !roamingPokemon || !roamingPokemon.length) {
            return false;
        }

        // Roaming encounter
        return true;
    }

    private static roamingChance(maxRoute: number, minRoute: number, curRoute: RegionRoute, region: GameConstants.Region, subRegion: SubRegion, max = GameConstants.ROAMING_MAX_CHANCE, min = GameConstants.ROAMING_MIN_CHANCE, skipBonus = false) {
        const bonus = skipBonus ? 1 : App.game.multiplier.getBonus('roaming');
        const routeNum = MapHelper.normalizeRoute(curRoute?.number, region);
        // Check if we should have increased chances on this route (3 x rate)
        const increasedChance = RoamingPokemonList.getIncreasedChanceRouteBySubRegionGroup(player.region, RoamingPokemonList.findGroup(region, subRegion.id))()?.number == curRoute?.number;
        const roamingChance = (max + ( (min - max) * (maxRoute - routeNum) / (maxRoute - minRoute))) / ((increasedChance ? 3 : 1) * bonus);
        return Rand.chance(roamingChance);
    }

    private static catchRateHelper(baseCatchRate: number, noVariation = false): number {
        const catchVariation = noVariation ? 0 : Rand.intBetween(-3, 3);
        const catchRateRaw = Math.floor(Math.pow(baseCatchRate, 0.75)) + catchVariation;
        return GameConstants.clipNumber(catchRateRaw, 0, 100);
    }

    private static generateHeldItem(item: BagItem, modifier: number): BagItem | null {
        if (!item || !BagHandler.displayName(item)) {
            return null;
        }

        let chance = GameConstants.HELD_ITEM_CHANCE;

        // Apply drop chance by item type
        switch (item.type) {
            case ItemType.underground:
                chance = GameConstants.HELD_UNDERGROUND_ITEM_CHANCE;
                break;
        }

        // Apply drop chance by item ID
        switch (item.id) {
            case 'Griseous_Orb':
                chance = GameConstants.GRISEOUS_ITEM_CHANCE;
                break;
            case 'Black_DNA':
            case 'White_DNA':
                chance = GameConstants.DNA_ITEM_CHANCE;
                break;
            case 'Solar_light':
            case 'Lunar_light':
            case 'Pure_light':
                chance = GameConstants.LIGHT_ITEM_CHANCE;
                break;
            case 'Rusted_Sword':
            case 'Rusted_Shield':
                chance = GameConstants.RUST_ITEM_CHANCE;
                break;
            case 'Black_mane_hair':
            case 'White_mane_hair':
                chance = GameConstants.MANE_ITEM_CHANCE;
                break;
            case 'Magikarp_Biscuit':
                chance = GameConstants.HELD_MAGIKARP_BISCUIT;
                break;
            case 'Rare_Candy':
                chance = GameConstants.HELD_CANDY_ITEM_CHANCE;
                break;
            case 'Christmas_present':
                chance = GameConstants.CHRISTMAS_ITEM_CHANCE;
                break;
        }

        chance /= modifier;

        if (EffectEngineRunner.isActive(GameConstants.BattleItemType.Dowsing_machine)()) {
            chance /= 1.5;
        }

        if (Rand.chance(chance)) {
            return item;
        }

        return null;
    }

    // Gender functions
    /**
     * generateGender but using Pokemon ID
     */
    public static generateGenderById(id) {
        const pokemon = PokemonHelper.getPokemonById(id);
        return this.generateGender(pokemon.gender.femaleRatio, pokemon.gender.type);
    }

    /**
     * Calculate which gender has the pokemon.
     * @param chance Base chance, should be from GameConstants under Gender Ratio comment
     * @param genderType Gender type (Genderless, male only, etc.), should be from GameConstants under Gender Types comment
     * @returns GameConstants.BattlePokemonGender
     */
    public static generateGender(chance: number, genderType: GameConstants.Genders): GameConstants.BattlePokemonGender {
        let gender;
        switch (genderType) {
            case GameConstants.Genders.Genderless:
                gender = GameConstants.BattlePokemonGender.NoGender;
                break;
            case GameConstants.Genders.MaleFemale:
                if (Rand.chance(chance)) { // Female
                    gender = GameConstants.BattlePokemonGender.Female;
                } else { // Male
                    gender = GameConstants.BattlePokemonGender.Male;
                }
                break;
            default:
                console.warn('Invalid gender');
        }
        return gender;
    }

    public static generateWandererData(plot: Plot): WandererPokemon {
        const berry = plot.berryData;
        const mulch = plot.mulch;
        const availablePokemon = [];
        const weights = [];
        berry.wander.forEach((p, i) => {
            if (pokemonMap[p].nativeRegion <= player.highestRegion()) {
                availablePokemon.push(p);
                weights.push(mulch === MulchType.Gooey_Mulch && i >= Berry.baseWander.length ? 2 : 1);
            }
        });
        const pokemon = Rand.fromWeightedArray(availablePokemon, weights);
        const pokemonData = pokemonMap[pokemon];
        const shiny = PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_FARM);
        const catchChance = PokemonFactory.catchRateHelper(pokemonData.catchRate + 25, true);
        const wanderer = new WandererPokemon(pokemon, berry.type, catchChance, shiny);
        return wanderer;
    }
}

PokemonFactory satisfies TmpPokemonFactoryType;
