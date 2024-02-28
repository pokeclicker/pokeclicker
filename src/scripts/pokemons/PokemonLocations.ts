///<reference path="../GameConstants.d.ts"/>

enum PokemonLocationType {
    Route,
    Roaming,
    Dungeon,
    DungeonBoss,
    DungeonChest,
    Evolution,
    Egg,
    Baby,
    Shop,
    Fossil,
    Safari,
    BattleFrontier,
    Wandering,
    Discord,
    QuestLineReward,
    TempBattleReward,
    GymReward,
    DungeonReward,
    Trade,
    GiftNPC,
    ShadowPokemon,
    DreamOrb,
    BattleCafe,
    SafariItem
}

class PokemonLocations {
    /*
    PRETTY MUCH ONLY USED BY THE BOT BELOW
    */
    private static readonly pokemonLocationsCache = {};
    private static readonly pokemonNames: string[] = pokemonList.map(p => p.name);

    private static getCache<T>(cacheName: string) {
        let cache: {[name: string]: T} = this.pokemonLocationsCache[cacheName];
        if (!cache) {
            this.pokemonLocationsCache[cacheName] = cache = {};
        }
        return cache;
    }

    // RegionalCache is an array of caches, allowing the results from different maxRegions to co-exist
    private static getRegionalCache<T>(cacheName: string) {
        let cache: {[name: string]: T}[] = this.pokemonLocationsCache[cacheName];
        if (!cache) {
            this.pokemonLocationsCache[cacheName] = cache = [];
        }
        return cache;
    }

    private static initRegionalCacheLine<T>(cache, maxRegion: GameConstants.Region, defaultValue: { new(): T; }): {[name: string]: T} {
        const cacheLine = cache[maxRegion] = {};
        return this.initCacheLine(cacheLine, defaultValue);
    }

    private static initCacheLine<T>(cacheLine, defaultValue: { new(): T; }): {[name: string]: T} {
        this.pokemonNames.forEach(name => cacheLine[name] = new defaultValue());
        return cacheLine;
    }

    public static getPokemonRegionRoutes(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): {[name: string]: Array<object>} {
        const cache = this.getRegionalCache<{[name: string]: Array<object>}>(this.getPokemonRegionRoutes.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Object);
        Routes.regionRoutes.forEach(routeData => {
            const region = routeData.region;
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none && region > maxRegion) {
                return false;
            }
            Object.entries(routeData.pokemon).forEach(([encounterType, pokemon]) => {
                new Set(Object.values(pokemon).flat()).forEach((name: any) => {
                    if (name instanceof SpecialRoutePokemon) {
                        return false;
                    }
                    if (!cacheLine[name][region]) {
                        cacheLine[name][region] = new Array<object>;
                    }
                    cacheLine[name][region].push({ route: routeData.number });
                });
            });
            routeData.pokemon.special?.forEach(special => {
                special.pokemon.forEach((name: string) => {
                    if (!cacheLine[name][region]) {
                        cacheLine[name][region] = new Array<object>;
                    }
                    cacheLine[name][region].push({ route: routeData.number, requirements: special.req.hint() });
                });
            });
            return true;
        });
        return cacheLine[pokemonName] as {[name: string]: Array<object>};
    }

    public static getPokemonDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<object> {
        const cache = this.getRegionalCache<object[]>(this.getPokemonDungeons.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<object>);
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none) {
                const region = GameConstants.RegionDungeons.findIndex(d => d.includes(dungeonName));
                if (region > maxRegion) {
                    return false;
                }
            }
            // Dungeon Grunt
            dungeon.enemyList.forEach((enemy) => {
                // Skip trainers
                if (enemy instanceof DungeonTrainer) {
                    return;
                }

                if (typeof enemy === 'string') {
                    cacheLine[enemy].push({ dungeon: dungeonName });
                } else if (enemy.hasOwnProperty('pokemon')) {
                    cacheLine[(<DetailedPokemon>enemy).pokemon].push({
                        dungeon: dungeonName,
                        requirements: enemy?.options?.requirement?.hint(),
                    });
                }
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonBossDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<object> {
        const cache = this.getRegionalCache<object[]>(this.getPokemonBossDungeons.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<object>);
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none) {
                const region = GameConstants.RegionDungeons.findIndex(d => d.includes(dungeonName));
                if (region > maxRegion) {
                    return false;
                }
            }
            // Dungeon Boss
            dungeon.availableBosses(false, true).forEach(boss => {
                const data = {
                    dungeon: dungeonName,
                    requirements: boss.options?.requirement?.hint(),
                };
                cacheLine[boss.name].push(data);
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonChestDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<object> {
        const cache = this.getRegionalCache<object[]>(this.getPokemonChestDungeons.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<object>);
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none) {
                const region = GameConstants.RegionDungeons.findIndex(d => d.includes(dungeonName));
                if (region > maxRegion) {
                    return false;
                }
            }
            // Dungeon Chest
            Object.values(dungeon.lootTable).flat().forEach(i => {
                if (this.pokemonNames.includes(i.loot)) {
                    const data = {
                        dungeon: dungeonName,
                        requirements: i.requirement?.hint(),
                    };
                    cacheLine[i.loot].push(data);
                }
            });
        });
        return cacheLine[pokemonName];
    }

    public static getShadowPokemonDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const cache = this.getRegionalCache<string[]>(this.getShadowPokemonDungeons.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<string>);
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none) {
                const region = GameConstants.RegionDungeons.findIndex(d => d.includes(dungeonName));
                if (region > maxRegion) {
                    return false;
                }
            }
            // Shadow Pokemon
            new Set(dungeon.allAvailableShadowPokemon()).forEach(pokemon => {
                cacheLine[pokemon].push(dungeonName);
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonEggs(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const cache = this.getRegionalCache<string[]>(this.getPokemonEggs.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<string>);
        Object.entries(App.game.breeding.hatchList).forEach(([eggType, eggArr]) => {
            eggArr.forEach((pokemonArr, region) => {
                // If we only want to check up to a maximum region
                if (maxRegion != GameConstants.Region.none && region > maxRegion)  {
                    return false;
                }
                pokemonArr.forEach(name => {
                    cacheLine[name].push(EggType[eggType]);
                });
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonShops(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const cache = this.getRegionalCache<string[]>(this.getPokemonShops.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<string>);
        Object.entries(TownList).forEach(([townName, town]) => {
            // Check if the shop has items
            const townShops = town.content.filter(c => c instanceof Shop && c.items);
            if (townShops.length) {
                // If we only want to check up to a maximum region
                const region = town.region;
                if (maxRegion != GameConstants.Region.none && region > maxRegion) {
                    return false;
                }
                townShops.find(ts => (ts as Shop).items?.forEach(item => {
                    if (this.pokemonNames.includes(item.name)) {
                        cacheLine[item.name].push(townName);
                    }
                }));
            }
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonRoamingRegions(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<object> {
        const cache = this.getRegionalCache<object[]>(this.getPokemonRoamingRegions.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<object>);
        Object.entries(RoamingPokemonList.list).forEach(([region, regionArr]) => {
            if (maxRegion != GameConstants.Region.none && (+region) > maxRegion) {
                return false;
            }
            RoamingPokemonList.roamerGroups[region].forEach((group, i) => {
                regionArr[i]?.forEach(r => {
                    if (this.pokemonNames.includes(r.pokemon.name)) {
                        const data = {
                            region: +region,
                            requirements: r.unlockRequirement?.hint(),
                            roamingGroup: group,
                        };
                        cacheLine[r.pokemon.name].push(data);
                    }
                });
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonParents(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const cache = this.getRegionalCache<string[]>(this.getPokemonParents.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<string>);
        Object.entries(pokemonBabyPrevolutionMap).forEach(([parent, baby]) => {
            if (maxRegion != GameConstants.Region.none && pokemonMap[parent].nativeRegion > maxRegion) {
                return false;
            }
            cacheLine[baby].push(parent);
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonFossils(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const cache = this.getRegionalCache<string[]>(this.getPokemonFossils.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<string>);
        Object.entries(GameConstants.FossilToPokemon).forEach(([fossil, pokemon]) => {
            cacheLine[pokemon].push(fossil);
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonSafariChance(pokemonName: PokemonNameType): Record<GameConstants.Region, Record<number, number>> {
        const cache = this.getCache<Record<GameConstants.Region, Record<number, number>>>(this.getPokemonSafariChance.name);
        if (cache[pokemonName]) {
            return cache[pokemonName];
        }
        const cacheLine = this.initCacheLine(cache, Object);
        Object.entries(SafariPokemonList.list).forEach(([region]) => {
            if (region == GameConstants.Region.kalos.toString()) {
                // Friendly safari might cause infinite recursion
                return;
            }
            const zoneList = SafariPokemonList.list[region]();
            const safariWeight = zoneList.reduce((sum, p) => sum += p.weight, 0);
            zoneList.forEach(safariPokemon => {
                cacheLine[safariPokemon.name][+region] = cacheLine[safariPokemon.name][+region] || {};
                cacheLine[safariPokemon.name][+region][0] = +((SafariPokemon.calcPokemonWeight(safariPokemon) / safariWeight) * 100).toFixed(2);
            });
        });
        return cacheLine[pokemonName] as Record<GameConstants.Region, Record<number, number>>;
    }

    public static getPokemonPrevolution(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<EvoData> {
        const cache = this.getRegionalCache<EvoData[]>(this.getPokemonPrevolution.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<EvoData>);
        const prevolutionPokemon = pokemonList.filter((p: PokemonListData) => p.evolutions);
        prevolutionPokemon.forEach((p: PokemonListData) => p.evolutions.forEach(e => {
            // ignore dummy evolutions
            if (e.trigger === EvoTrigger.NONE) {
                return false;
            }
            if (maxRegion != GameConstants.Region.none && p.nativeRegion > maxRegion) {
                return false;
            }
            cacheLine[e.evolvedPokemon].push(e);
        }));
        return cacheLine[pokemonName];
    }

    public static getPokemonLevelPrevolution(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): EvoData {
        const evolutionPokemon = pokemonList.find((p: PokemonListData) => p.evolutions?.find(e => e.trigger === EvoTrigger.LEVEL && e.evolvedPokemon == pokemonName));
        if (maxRegion != GameConstants.Region.none && pokemonMap[evolutionPokemon.name].nativeRegion > maxRegion) {
            return;
        }
        return (evolutionPokemon as PokemonListData)?.evolutions?.find(e => e.evolvedPokemon == pokemonName);
    }

    public static getPokemonStonePrevolution(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): EvoData {
        const evolutionPokemon = pokemonList.find((p: PokemonListData) => p.evolutions?.find(e => e.trigger === EvoTrigger.STONE && e.evolvedPokemon == pokemonName));
        if (maxRegion != GameConstants.Region.none && pokemonMap[evolutionPokemon.name].nativeRegion > maxRegion) {
            return;
        }
        return (evolutionPokemon as PokemonListData)?.evolutions?.find(e => e.evolvedPokemon == pokemonName);
    }

    public static getPokemonBattleFrontier(pokemonName: PokemonNameType): Array<number> {
        const cache = this.getCache<number[]>(this.getPokemonBattleFrontier.name);
        if (cache[pokemonName]) {
            return cache[pokemonName];
        }
        const cacheLine = this.initCacheLine(cache, Array<number>);
        pokemonList.forEach(p => cacheLine[p.name] = []);
        BattleFrontierMilestones.milestoneRewards.filter(m => m instanceof BattleFrontierMilestonePokemon).forEach(milestone => {
            if (this.pokemonNames.includes(milestone._description)) {
                cacheLine[milestone._description].push(milestone.stage);
            }
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonWandering(pokemonName: PokemonNameType): Array<string> {
        const cache = this.getCache<string[]>(this.getPokemonWandering.name);
        if (cache[pokemonName]) {
            return cache[pokemonName];
        }
        const cacheLine = this.initCacheLine(cache, Array<string>);
        Berry.baseWander.forEach(pokemon => {
            cacheLine[pokemon] = ['Always'];
        });
        App.game.farming.berryData.forEach((berry) => {
            berry.wander.forEach(pokemon => {
                if (cacheLine[pokemon][0] !== 'Always') {
                    cacheLine[pokemon].push(BerryType[berry.type]);
                }
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonDiscord(pokemonName: PokemonNameType): Array<number> {
        const cache = this.getCache<number[]>(this.getPokemonDiscord.name);
        if (cache[pokemonName]) {
            return cache[pokemonName];
        }
        const cacheLine = this.initCacheLine(cache, Array<number>);
        App.game.discord.codes.forEach(code => {
            if (this.pokemonNames.includes(code.name)) {
                cacheLine[code.name].push(code.price);
            }
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonTempBattleReward(pokemonName: PokemonNameType): Array<string> {
        const cache = this.getCache<string[]>(this.getPokemonTempBattleReward.name);
        if (cache[pokemonName]) {
            return cache[pokemonName];
        }
        const cacheLine = this.initCacheLine(cache, Array<string>);

        Object.entries(TemporaryBattleList).forEach(tempBattle => {
            const firstTimeRewardFunction = tempBattle[1].optionalArgs?.firstTimeRewardFunction?.toString();
            this.getPokemonRewards(firstTimeRewardFunction).forEach(pokemon => {
                cacheLine[pokemon].push(tempBattle[0]);
            });
            const rewardFunction = tempBattle[1].optionalArgs?.rewardFunction?.toString();
            this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                cacheLine[pokemon].push(tempBattle[0]);
            });

            if (tempBattle[1].optionalArgs?.isTrainerBattle === false) {
                tempBattle[1].getPokemonList().forEach(p => {
                    cacheLine[p.name].push(tempBattle[0]);
                });
            }
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonGymReward(pokemonName: PokemonNameType): Array<string> {
        const cache = this.getCache<string[]>(this.getPokemonGymReward.name);
        if (cache[pokemonName]) {
            return cache[pokemonName];
        }
        const cacheLine = this.initCacheLine(cache, Array<string>);
        Object.values(GymList).forEach(gym => {
            const rewardFunction = gym.rewardFunction?.toString();
            this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                cacheLine[pokemon].push(gym.leaderName);
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonDungeonReward(pokemonName: PokemonNameType): Array<string> {
        const cache = this.getCache<string[]>(this.getPokemonDungeonReward.name);
        if (cache[pokemonName]) {
            return cache[pokemonName];
        }
        const cacheLine = this.initCacheLine(cache, Array<string>);
        Object.values(dungeonList).forEach(dungeon => {
            const rewardFunction = dungeon.rewardFunction?.toString();
            this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                cacheLine[pokemon].push(dungeon.name);
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonQuestLineReward(pokemonName: PokemonNameType): Array<string> {
        const cache = this.getCache<string[]>(this.getPokemonQuestLineReward.name);
        if (cache[pokemonName]) {
            return cache[pokemonName];
        }
        const cacheLine = this.initCacheLine(cache, Array<string>);
        App.game.quests.questLines().forEach(questLine => questLine.quests().forEach(quest => {
            const rewardFunction = (quest as any).customReward?.toString();
            this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                cacheLine[pokemon].push(questLine.name);
            });
        }));
        return cacheLine[pokemonName];
    }

    public static getPokemonTrades(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const cache = this.getRegionalCache<string[]>(this.getPokemonTrades.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<string>);
        Object.entries(TownList).forEach(([townName, town]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none && town.region > maxRegion) {
                return false;
            }

            const townShops = town.content.filter(c => c instanceof Shop);
            if (townShops.length) {
                const townTrades = {};
                for (let i = 0; i < townShops.length; i++) {
                    const shop = townShops[i];
                    let deals;
                    if (shop instanceof GemMasterShop) {
                        deals = GemDeals.list[shop.shop]?.();
                    } else if (shop instanceof ShardTraderShop) {
                        deals = ShardDeal.list[shop.location]?.();
                    } else if (shop instanceof BerryMasterShop) {
                        deals = BerryDeal.list[shop.location]?.();
                    }
                    deals?.forEach(deal => {
                        if (this.pokemonNames.includes(deal.item.itemType.type)) {
                            townTrades[deal.item.itemType.type] = true;
                        }
                    });
                }
                Object.keys(townTrades).forEach(pokemon => {
                    cacheLine[pokemon].push(townName);
                });
            }
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonGifts(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<object> {
        const cache = this.getRegionalCache<object[]>(this.getPokemonGifts.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<object>);
        Object.entries(TownList).forEach(([townName, town]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none && town.region > maxRegion) {
                return false;
            }

            const npcs = town.npcs?.filter(n => n instanceof GiftNPC);
            npcs?.forEach(npc => {
                const rewardFunction = (npc as GiftNPC).giftFunction?.toString();
                this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                    cacheLine[pokemon].push({
                        town: townName,
                        npc: npc.name,
                        requirements: npc.options?.requirement?.hint(),
                    });
                });
            });
        });
        return cacheLine[pokemonName];
    }

    public static getPokemonDreamOrbs(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const cache = this.getRegionalCache<string[]>(this.getPokemonDreamOrbs.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Array<string>);
        // Dream orbs are unavailable before Unova
        if (maxRegion !== GameConstants.Region.none && maxRegion < GameConstants.Region.unova) {
            return cacheLine[pokemonName];
        }
        App.game.dreamOrbController.orbs.forEach(orb => orb.items.forEach(dreamOrbLoot => {
            if (dreamOrbLoot.item.type === ItemType.item) {
                const item = ItemList[dreamOrbLoot.item.id];
                if (item instanceof PokemonItem && this.pokemonNames.includes(item.type)) {
                    cacheLine[item.type].push(orb.color);
                }
            }
        }));
        return cacheLine[pokemonName];
    }

    public static getBattleCafeCombination(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): {spin?: GameConstants.AlcremieSpins, sweet?: GameConstants.AlcremieSweet} {
        const cache = this.getRegionalCache<object>(this.getBattleCafeCombination.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Object);
        if (maxRegion !== GameConstants.Region.none && maxRegion < GameConstants.Region.galar) {
            return cacheLine[pokemonName];
        }
        cacheLine['Milcery (Cheesy)'] = {spin: GameConstants.AlcremieSpins.Any3600};
        let sweet: GameConstants.AlcremieSpins, spin: GameConstants.AlcremieSweet;
        for (sweet of GameHelper.enumNumbers(GameConstants.AlcremieSweet)) {
            for (spin of GameHelper.enumNumbers(GameConstants.AlcremieSpins)) {
                const spinReward = BattleCafeController.evolutions[sweet][spin]?.name;
                if (this.pokemonNames.includes(spinReward)) {
                    cacheLine[spinReward] = {spin: spin, sweet: sweet};
                }
            }
        }
        return cacheLine[pokemonName];
    }

    public static getPokemonSafariItem(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Record<GameConstants.Region, {chance: number, requirement?: string }> {
        const cache = this.getRegionalCache<Record<GameConstants.Region, {chance: number, requirement?: string }>>(this.getPokemonSafariItem.name);
        if (cache[maxRegion]) {
            return cache[maxRegion][pokemonName];
        }
        const cacheLine = this.initRegionalCacheLine(cache, maxRegion, Object);
        Object.entries(SafariItemController.list).forEach(([region, list]) => {
            if (maxRegion !== GameConstants.Region.none && maxRegion < Number(region)) {
                return;
            }
            list.forEach(item => {
                const pokemonItem = item.item.id as string;
                if (this.pokemonNames.includes(pokemonItem)) {
                    cacheLine[pokemonItem][region] = {chance : item.weight / list.reduce((acc, it) => acc + it.weight, 0)};
                    if (item.requirement) {
                        cacheLine[pokemonItem][region].requirement = item.requirement.hint();
                    }
                }
            });
        });
        return cacheLine[pokemonName] as Record<GameConstants.Region, {chance: number, requirement?: string }>;
    }

    private static getPokemonRewards(rewardFunction: string) {
        // Example reward function: App.game.party.gainPokemonByName('Eevee')
        const pokemonRewardRegex = /gainPokemonByName\('(.+?)'/g;
        const rewards = [];
        let match;
        while ((match = pokemonRewardRegex.exec(rewardFunction)) != null) {
            // match[1] is the contents of the capture group, e.g. "Eevee"
            rewards.push(match[1]);
        }
        return rewards;
    }

    public static getPokemonLocations = (pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.MAX_AVAILABLE_REGION) => {
        const encounterTypes = {};
        // Routes
        const regionRoutes = PokemonLocations.getPokemonRegionRoutes(pokemonName, maxRegion);
        if (Object.keys(regionRoutes).length) {
            encounterTypes[PokemonLocationType.Route] = regionRoutes;
        }
        // Dungeons
        const dungeons = PokemonLocations.getPokemonDungeons(pokemonName, maxRegion);
        if (dungeons.length) {
            encounterTypes[PokemonLocationType.Dungeon] = dungeons;
        }
        // Dungeon Boss
        const bossDungeons = PokemonLocations.getPokemonBossDungeons(pokemonName, maxRegion);
        if (bossDungeons.length) {
            encounterTypes[PokemonLocationType.DungeonBoss] = bossDungeons;
        }
        // Dungeon Chest
        const chestDungeons = PokemonLocations.getPokemonChestDungeons(pokemonName, maxRegion);
        if (chestDungeons.length) {
            encounterTypes[PokemonLocationType.DungeonChest] = chestDungeons;
        }
        // Shadow Pokemon
        const shadowPokemon = PokemonLocations.getShadowPokemonDungeons(pokemonName, maxRegion);
        if (shadowPokemon.length) {
            encounterTypes[PokemonLocationType.ShadowPokemon] = shadowPokemon;
        }
        // Eggs
        const eggs = PokemonLocations.getPokemonEggs(pokemonName, maxRegion);
        if (eggs.length) {
            encounterTypes[PokemonLocationType.Egg] = eggs;
        }
        // Shops
        const shops = PokemonLocations.getPokemonShops(pokemonName, maxRegion);
        if (shops.length) {
            encounterTypes[PokemonLocationType.Shop] = shops;
        }
        // Roaming
        const roaming = PokemonLocations.getPokemonRoamingRegions(pokemonName, maxRegion);
        if (roaming.length) {
            encounterTypes[PokemonLocationType.Roaming] = roaming;
        }
        // Baby
        const parents = PokemonLocations.getPokemonParents(pokemonName, maxRegion);
        if (parents.length) {
            encounterTypes[PokemonLocationType.Baby] = parents;
        }
        // Fossil
        const fossils = PokemonLocations.getPokemonFossils(pokemonName);
        if (fossils.length) {
            encounterTypes[PokemonLocationType.Fossil] = fossils;
        }
        // Safari
        const safariChance = PokemonLocations.getPokemonSafariChance(pokemonName);
        if (Object.keys(safariChance).length) {
            encounterTypes[PokemonLocationType.Safari] = safariChance;
        }
        // Evolution
        const evolutions = PokemonLocations.getPokemonPrevolution(pokemonName, maxRegion);
        if (evolutions.length) {
            encounterTypes[PokemonLocationType.Evolution] = evolutions;
        }

        // Battle Frontier
        const battleFrontier = PokemonLocations.getPokemonBattleFrontier(pokemonName);
        if (battleFrontier.length) {
            encounterTypes[PokemonLocationType.BattleFrontier] = battleFrontier;
        }

        // Wandering
        const wandering = PokemonLocations.getPokemonWandering(pokemonName);
        if (wandering.length) {
            encounterTypes[PokemonLocationType.Wandering] = wandering;
        }

        // Discord
        const discord = PokemonLocations.getPokemonDiscord(pokemonName);
        if (discord.length) {
            encounterTypes[PokemonLocationType.Discord] = discord;
        }

        // Temp battle reward
        const tempBattle = PokemonLocations.getPokemonTempBattleReward(pokemonName);
        if (tempBattle.length) {
            encounterTypes[PokemonLocationType.TempBattleReward] = tempBattle;
        }

        // Gym reward
        const gymReward = PokemonLocations.getPokemonGymReward(pokemonName);
        if (gymReward.length) {
            encounterTypes[PokemonLocationType.GymReward] = gymReward;
        }

        // Dungeon reward
        const dungeonReward = PokemonLocations.getPokemonDungeonReward(pokemonName);
        if (dungeonReward.length) {
            encounterTypes[PokemonLocationType.DungeonReward] = dungeonReward;
        }

        // Quest Line reward
        const questLineReward = PokemonLocations.getPokemonQuestLineReward(pokemonName);
        if (questLineReward.length) {
            encounterTypes[PokemonLocationType.QuestLineReward] = questLineReward;
        }

        // Trades
        const trades = PokemonLocations.getPokemonTrades(pokemonName, maxRegion);
        if (trades.length) {
            encounterTypes[PokemonLocationType.Trade] = trades;
        }

        // Gift NPC
        const gifts = PokemonLocations.getPokemonGifts(pokemonName, maxRegion);
        if (gifts.length) {
            encounterTypes[PokemonLocationType.GiftNPC] = gifts;
        }

        // Dream Orbs
        const dreamOrbs = PokemonLocations.getPokemonDreamOrbs(pokemonName, maxRegion);
        if (dreamOrbs.length) {
            encounterTypes[PokemonLocationType.DreamOrb] = dreamOrbs;
        }

        // Battle Café
        const combination = PokemonLocations.getBattleCafeCombination(pokemonName, maxRegion);
        if (Object.keys(combination).length) {
            encounterTypes[PokemonLocationType.BattleCafe] = combination;
        }

        // Safari Items
        const safariItems = PokemonLocations.getPokemonSafariItem(pokemonName, maxRegion);
        if (Object.keys(safariItems).length) {
            encounterTypes[PokemonLocationType.SafariItem] = safariItems;
        }

        // Return the list of items
        return encounterTypes;
    }

    public static isObtainableAndNotEvable = (pokemonName: PokemonNameType) => {
        const locations = PokemonLocations.getPokemonLocations(pokemonName);
        const isEvable = locations[PokemonLocationType.Dungeon] ||
            locations[PokemonLocationType.DungeonBoss] ||
            locations[PokemonLocationType.DungeonChest] ||
            (locations[PokemonLocationType.Evolution] as EvoData[])?.some((evo) => evo.trigger === EvoTrigger.STONE) || // Only stone evolutions gives EVs
            locations[PokemonLocationType.Roaming] ||
            locations[PokemonLocationType.Route] ||
            locations[PokemonLocationType.Safari] ||
            locations[PokemonLocationType.Shop] ||
            locations[PokemonLocationType.Wandering] ||
            locations[PokemonLocationType.Trade] ||
            locations[PokemonLocationType.ShadowPokemon] ||
            locations[PokemonLocationType.DreamOrb] ||
            locations[PokemonLocationType.BattleCafe] ||
            locations[PokemonLocationType.SafariItem];
        return !isEvable && Object.keys(locations).length;
    };
}
