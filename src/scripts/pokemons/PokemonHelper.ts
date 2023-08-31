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

class PokemonHelper extends TmpPokemonHelper {
    /*
    PRETTY MUCH ONLY USED BY THE BOT BELOW
    */

    private static getPokemonRegionRoutesCache: {[name: string] : any}[] = [];
    public static getPokemonRegionRoutes(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none) {
        if (this.getPokemonRegionRoutesCache[maxRegion]) {
            return this.getPokemonRegionRoutesCache[maxRegion][pokemonName];
        }
        const regionRoutes = this.getPokemonRegionRoutesCache[maxRegion] = {};
        pokemonList.forEach(p => regionRoutes[p.name] = {});
        Routes.regionRoutes.forEach(routeData => {
            const region = routeData.region;
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none && region > maxRegion) {
                return false;
            }
            Object.entries(routeData.pokemon).forEach(([encounterType, pokemon]) => {
                Object.values(pokemon).flat().forEach((name: any) => {
                    if (name instanceof SpecialRoutePokemon) return false;
                    if (!regionRoutes[name][region]) {
                        regionRoutes[name][region] = [];
                    }
                    regionRoutes[name][region].push({ route: routeData.number });
                });
            });
            routeData.pokemon.special?.forEach(special => {
                special.pokemon.forEach((name: string) => {
                    if (!regionRoutes[name][region]) {
                        regionRoutes[name][region] = [];
                    }
                    regionRoutes[name][region].push({ route: routeData.number, requirements: special.req.hint() });
                });
            });
            return true;
        });
        return regionRoutes[pokemonName];
    }

    private static getPokemonDungeonsCache: {[name: string] : string[]}[] = [];
    public static getPokemonDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getPokemonDungeonsCache[maxRegion]) {
            return this.getPokemonDungeonsCache[maxRegion][pokemonName];
        }
        const dungeons = this.getPokemonDungeonsCache[maxRegion] = {};
        pokemonList.forEach(p => dungeons[p.name] = []);
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none) {
                const region = GameConstants.RegionDungeons.findIndex(d => d.includes(dungeonName));
                if (region > maxRegion) {
                    return false;
                }
            }
            // Dungeon Grunt
            dungeon.pokemonList.forEach((name) => {
                dungeons[name].push(dungeonName);
            });
        });
        return dungeons[pokemonName];
    }

    private static getPokemonBossDungeonsCache: {[name: string] : string[]}[] = [];
    public static getPokemonBossDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getPokemonBossDungeonsCache[maxRegion]) {
            return this.getPokemonBossDungeonsCache[maxRegion][pokemonName];
        }
        const dungeons = this.getPokemonBossDungeonsCache[maxRegion] = {};
        pokemonList.forEach(p => dungeons[p.name] = []);
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
                dungeons[boss.name].push(data);
            });
        });
        return dungeons[pokemonName];
    }

    private static getPokemonChestDungeonsCache: {[name: string] : string[]}[] = [];
    public static getPokemonChestDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getPokemonChestDungeonsCache[maxRegion]) {
            return this.getPokemonChestDungeonsCache[maxRegion][pokemonName];
        }
        const dungeons = this.getPokemonChestDungeonsCache[maxRegion] = {};
        pokemonList.forEach(p => dungeons[p.name] = []);
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
                if (i.loot in dungeons) {
                    const data = {
                        dungeon: dungeonName,
                        requirements: i.requirement?.hint(),
                    };
                    dungeons[i.loot].push(data);
                }
            });
        });
        return dungeons[pokemonName];
    }

    private static getShadowPokemonDungeonsCache: {[name: string] : string[]}[] = [];
    public static getShadowPokemonDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getShadowPokemonDungeonsCache[maxRegion]) {
            return this.getShadowPokemonDungeonsCache[maxRegion][pokemonName];
        }
        const dungeons = this.getShadowPokemonDungeonsCache[maxRegion] = {};
        pokemonList.forEach(p => dungeons[p.name] = []);
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none) {
                const region = GameConstants.RegionDungeons.findIndex(d => d.includes(dungeonName));
                if (region > maxRegion) {
                    return false;
                }
            }
            // Shadow Pokemon
            dungeon.allAvailableShadowPokemon().forEach(pokemon => {
                dungeons[pokemon].push(dungeonName);
            });
        });
        return dungeons[pokemonName];
    }

    private static getPokemonEggsCache: {[name: string] : string[]}[] = [];
    public static getPokemonEggs(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getPokemonEggsCache[maxRegion]) {
            return this.getPokemonEggsCache[maxRegion][pokemonName];
        }
        const eggTypes = this.getPokemonEggsCache[maxRegion] = {};
        pokemonList.forEach(p => eggTypes[p.name] = []);
        Object.entries(App.game.breeding.hatchList).forEach(([eggType, eggArr]) => {
            eggArr.forEach((pokemonArr, region) => {
                // If we only want to check up to a maximum region
                if (maxRegion != GameConstants.Region.none && region > maxRegion)  {
                    return false;
                }
                pokemonArr.forEach(name => {
                    eggTypes[name].push(EggType[eggType]);
                })
            });
        });
        return eggTypes[pokemonName];
    }

    private static getPokemonShopsCache: {[name: string] : string[]}[] = [];
    public static getPokemonShops(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getPokemonShopsCache[maxRegion]) {
            return this.getPokemonShopsCache[maxRegion][pokemonName];
        }
        const shops = this.getPokemonShopsCache[maxRegion] = {};
        pokemonList.forEach(p => shops[p.name] = []);
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
                    if (item.name in shops) {
                        shops[item.name].push(townName);
                    }
                }));
            }
        });
        return shops[pokemonName];
    }

    private static getPokemonRoamingRegionsCache: {[name: string] : string[]}[] = [];
    public static getPokemonRoamingRegions(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getPokemonRoamingRegionsCache[maxRegion]) {
            return this.getPokemonRoamingRegionsCache[maxRegion][pokemonName];
        }
        const regions = this.getPokemonRoamingRegionsCache[maxRegion] = {};
        pokemonList.forEach(p => regions[p.name] = []);
        Object.entries(RoamingPokemonList.list).forEach(([region, regionArr]) => {
            if (maxRegion != GameConstants.Region.none && (+region) > maxRegion) {
                return false;
            }
            RoamingPokemonList.roamerGroups[region].forEach((group, i) => {
                regionArr[i]?.forEach(r => {
                    if (r.pokemon.name in regions) {
                        const data = {
                            region: +region,
                            requirements: r.unlockRequirement?.hint(),
                            roamingGroup: group,
                        };
                        regions[r.pokemon.name].push(data);
                    }
                });
            });
        });
        return regions[pokemonName];
    }

    private static getPokemonParentsCache: {[name: string] : string[]}[] = [];
    public static getPokemonParents(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getPokemonParentsCache[maxRegion]) {
            return this.getPokemonParentsCache[maxRegion][pokemonName];
        }
        const parents = this.getPokemonParentsCache[maxRegion] = {};
        pokemonList.forEach(p => parents[p.name] = []);
        Object.entries(pokemonBabyPrevolutionMap).forEach(([parent, baby]) => {
            if (maxRegion != GameConstants.Region.none && pokemonMap[parent].nativeRegion > maxRegion) {
                return false;
            }
            parents[baby].push(parent);
        });
        return parents[pokemonName];
    }

    private static getPokemonFossilsCache: {[name: string] : string[]} = {};
    public static getPokemonFossils(pokemonName: PokemonNameType): Array<string> {
        if (this.getPokemonFossilsCache[pokemonName]) {
            return this.getPokemonFossilsCache[pokemonName];
        }
        const fossils = this.getPokemonFossilsCache = {};
        pokemonList.forEach(p => fossils[p.name] = []);
        Object.entries(GameConstants.FossilToPokemon).forEach(([fossil, pokemon]) => {
            fossils[pokemon].push(fossil);
        });
        return fossils[pokemonName];
    }

    private static getPokemonSafariChanceCache: {[name: string] : Record<GameConstants.Region, Record<number, number>>};
    public static getPokemonSafariChance(pokemonName: PokemonNameType): Record<GameConstants.Region, Record<number, number>> {
        if (this.getPokemonSafariChanceCache) {
            return this.getPokemonSafariChanceCache[pokemonName];
        }
        const list = this.getPokemonSafariChanceCache = {};
        pokemonList.forEach(p => list[p.name] = {});
        Object.entries(SafariPokemonList.list).forEach(([region]) => {
            if (region == GameConstants.Region.kalos.toString()) {
                // Friendly safari might cause infinite recursion
                return;
            }
            const zoneList = SafariPokemonList.list[region]();
            const safariWeight = zoneList.reduce((sum, p) => sum += p.weight, 0);
            zoneList.forEach(safariPokemon => {
                list[safariPokemon.name][+region] = list[safariPokemon.name][+region] || {};
                list[safariPokemon.name][+region][0] = +((SafariPokemon.calcPokemonWeight(safariPokemon) / safariWeight) * 100).toFixed(2);
            });
        });
        return list[pokemonName];
    }

    private static getPokemonPrevolutionCache: {[name: string] : EvoData[]}[] = [];
    public static getPokemonPrevolution(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<EvoData> {
        if (this.getPokemonPrevolutionCache[maxRegion]) {
            return this.getPokemonPrevolutionCache[maxRegion][pokemonName];
        }
        const evolutions = this.getPokemonPrevolutionCache[maxRegion] = {};
        pokemonList.forEach(p => evolutions[p.name] = []);
        const prevolutionPokemon = pokemonList.filter((p: PokemonListData) => p.evolutions);
        prevolutionPokemon.forEach((p: PokemonListData) => p.evolutions.forEach(e => {
            // ignore dummy evolutions
            if (e.trigger === EvoTrigger.NONE) {
                return false;
            }
            if (maxRegion != GameConstants.Region.none && p.nativeRegion > maxRegion) {
                return false;
            }
            evolutions[e.evolvedPokemon].push(e);
        }));
        return evolutions[pokemonName];
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

    private static getPokemonBattleFrontierCache: {[name: string] : number[]};
    public static getPokemonBattleFrontier(pokemonName: PokemonNameType): Array<number> {
        if (this.getPokemonBattleFrontierCache) {
            return this.getPokemonBattleFrontierCache[pokemonName];
        }
        const stages = this.getPokemonBattleFrontierCache = {};
        pokemonList.forEach(p => stages[p.name] = []);
        BattleFrontierMilestones.milestoneRewards.filter(m => m instanceof BattleFrontierMilestonePokemon).forEach(milestone => {
            if (milestone._description in stages) {
                stages[milestone._description].push(milestone.stage);
            }
        });
        return stages[pokemonName];
    }

    private static getPokemonWanderingCache: {[name: string] : string[]};
    public static getPokemonWandering(pokemonName: PokemonNameType): Array<string> {
        if (this.getPokemonWanderingCache) {
            return this.getPokemonWanderingCache[pokemonName];
        }
        const berries = this.getPokemonWanderingCache = {};
        pokemonList.forEach(p => berries[p.name] = []);
        Berry.baseWander.forEach(pokemon => {
            berries[pokemon] = ['Always'];
        });
        App.game.farming.berryData.forEach((berry) => {
            berry.wander.forEach(pokemon => {
                berries[pokemon].push(BerryType[berry.type]);
            });
        });
        return berries[pokemonName];
    }

    private static getPokemonDiscordCache: {[name: string] : number[]};
    public static getPokemonDiscord(pokemonName: PokemonNameType): Array<number> {
        if (this.getPokemonDiscordCache) {
            return this.getPokemonDiscordCache[pokemonName];
        }
        const codes = this.getPokemonDiscordCache = {};
        pokemonList.forEach(p => codes[p.name] = []);
        App.game.discord.codes.forEach(code => {
            if (code.name in codes) {
                codes[code.name].push(code.price);
            }
        });
        return codes[pokemonName];
    }

    private static getPokemonTempBattleRewardCache: {[name: string] : string[]};
    public static getPokemonTempBattleReward(pokemonName: PokemonNameType): Array<string> {
        if (this.getPokemonTempBattleRewardCache) {
            return this.getPokemonTempBattleRewardCache[pokemonName];
        }
        const tempBattleList = this.getPokemonTempBattleRewardCache = {};
        pokemonList.forEach(p => tempBattleList[p.name] = []);

        Object.entries(TemporaryBattleList).forEach(tempBattle => {
            const firstTimeRewardFunction = tempBattle[1].optionalArgs?.firstTimeRewardFunction?.toString();
            this.getPokemonRewards(firstTimeRewardFunction).forEach(pokemon => {
                tempBattleList[pokemon].push(tempBattle[0]);
            });
            const rewardFunction = tempBattle[1].optionalArgs?.rewardFunction?.toString();
            this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                tempBattleList[pokemon].push(tempBattle[0]);
            });

            if (tempBattle[1].optionalArgs?.isTrainerBattle === false) {
                tempBattle[1].getPokemonList().forEach(p => {
                    tempBattleList[p.name].push(tempBattle[0]);
                })
            }
        });
        return tempBattleList[pokemonName];
    }

    private static getPokemonGymRewardCache: {[name: string] : string[]};
    public static getPokemonGymReward(pokemonName: PokemonNameType): Array<string> {
        if (this.getPokemonGymRewardCache) {
            return this.getPokemonGymRewardCache[pokemonName];
        }
        const gymList = this.getPokemonGymRewardCache = {};
        pokemonList.forEach(p => gymList[p.name] = []);
        Object.values(GymList).forEach(gym => {
            const rewardFunction = gym.rewardFunction?.toString();
            this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                gymList[pokemon].push(gym.leaderName);
            });
        });
        return gymList[pokemonName];
    }

    private static getPokemonDungeonRewardCache: {[name: string] : string[]};
    public static getPokemonDungeonReward(pokemonName: PokemonNameType): Array<string> {
        if (this.getPokemonDungeonRewardCache) {
            return this.getPokemonDungeonRewardCache[pokemonName];
        }
        const dungeons = this.getPokemonDungeonRewardCache = {};
        pokemonList.forEach(p => dungeons[p.name] = []);
        Object.values(dungeonList).forEach(dungeon => {
            const rewardFunction = dungeon.rewardFunction?.toString();
            this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                dungeons[pokemon].push(dungeon.name);
            });
        });
        return dungeons[pokemonName];
    }

    private static getPokemonQuestLineRewardCache: {[name: string] : string[]};
    public static getPokemonQuestLineReward(pokemonName: PokemonNameType): Array<string> {
        if (this.getPokemonQuestLineRewardCache) {
            return this.getPokemonQuestLineRewardCache[pokemonName];
        }
        const questLines = this.getPokemonQuestLineRewardCache = {};
        pokemonList.forEach(p => questLines[p.name] = []);
        App.game.quests.questLines().forEach(questLine => questLine.quests().forEach(quest => {
            const rewardFunction = (quest as any).customReward?.toString();
            this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                questLines[pokemon].push(questLine.name);
            });
        }));
        return questLines[pokemonName];
    }

    private static getPokemonTradesCache: {[name: string] : string[]}[] = [];
    public static getPokemonTrades(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        if (this.getPokemonTradesCache[maxRegion]) {
            return this.getPokemonTradesCache[maxRegion][pokemonName];
        }
        const trades = this.getPokemonTradesCache[maxRegion] = {};
        pokemonList.forEach(p => trades[p.name] = []);
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
                        deals = GemDeal.list[shop.shop]?.();
                    } else if (shop instanceof ShardTraderShop) {
                        deals = ShardDeal.list[shop.location]?.();
                    } else if (shop instanceof BerryMasterShop) {
                        deals = BerryDeal.list[shop.location]?.();
                    }
                    deals?.forEach(deal => {
                        if (deal.item.itemType.type in trades) {
                            townTrades[deal.item.itemType.type] = true;
                        }
                    });
                }
                Object.keys(townTrades).forEach(pokemon => {
                    trades[pokemon].push(townName);
                });
            }
        });
        return trades[pokemonName];
    }

    private static getPokemonGiftsCache: {[name: string] : object[]}[] = [];
    public static getPokemonGifts(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<object> {
        if (this.getPokemonGiftsCache[maxRegion]) {
            return this.getPokemonGiftsCache[maxRegion][pokemonName];
        }
        const gifts = this.getPokemonGiftsCache[maxRegion] = {};
        pokemonList.forEach(p => gifts[p.name] = []);
        Object.entries(TownList).forEach(([townName, town]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none && town.region > maxRegion) {
                return false;
            }

            const npcs = town.npcs?.filter(n => n instanceof GiftNPC);
            npcs?.forEach(npc => {
                const rewardFunction = (npc as GiftNPC).giftFunction?.toString();
                this.getPokemonRewards(rewardFunction).forEach(pokemon => {
                    gifts[pokemon].push({
                        town: townName,
                        npc: npc.name,
                        requirements: npc.options?.requirement?.hint(),
                    });
                });
            });
        });
        return gifts[pokemonName];
    }

    public static getPokemonDreamOrbs(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        // Dream orbs are unavailable before Unova
        if (maxRegion !== GameConstants.Region.none && maxRegion < GameConstants.Region.unova) {
            return [];
        }
        return App.game.dreamOrbController.orbs.filter(orb => orb.items.some(dreamOrbLoot => {
            if (dreamOrbLoot.item.type === ItemType.item) {
                const item = ItemList[dreamOrbLoot.item.id];

                if (item instanceof PokemonItem && item.type === pokemonName) {
                    return true;
                }
            }
            return false;
        })).map(orb => orb.color);
    }

    public static getBattleCafeCombination(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): {spin?: GameConstants.AlcremieSpins, sweet?: GameConstants.AlcremieSweet} {
        if (maxRegion !== GameConstants.Region.none && maxRegion < GameConstants.Region.galar) {
            return null;
        }
        if (pokemonName === 'Milcery (Cheesy)') {
            return {spin: GameConstants.AlcremieSpins.Any3600};
        }
        let sweet, spin;
        for (sweet of GameHelper.enumNumbers(GameConstants.AlcremieSweet)) {
            for (spin of GameHelper.enumNumbers(GameConstants.AlcremieSpins)) {
                if (BattleCafeController.evolutions[sweet][spin]?.name === pokemonName) {
                    return {spin: spin, sweet: sweet};
                }
            }
        }
        return null;
    }

    public static getPokemonSafariItem(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Record<GameConstants.Region, {chance: number, requirement?: string }> {
        const res = {};
        Object.entries(SafariItemController.list).forEach(([region, list]) => {
            if (maxRegion !== GameConstants.Region.none && maxRegion < Number(region)) {
                return;
            }
            const item = list.find(it => it.item.id === pokemonName);
            if (item) {
                res[region] = {chance : item.weight / list.reduce((acc, it) => acc + it.weight, 0)};
                if (item.requirement) {
                    res[region].requirement = item.requirement.hint();
                }
            }
        });
        return res;
    }

    private static getPokemonRewards(rewardFunction: string) {
        const pokemonRewardRegex = /gainPokemonByName\('(.+?)'/g;
        const rewards = [];
        let match;
        while ((match = pokemonRewardRegex.exec(rewardFunction)) != null) {
            rewards.push(match[1]);
        }
        return rewards;
    }

    public static getPokemonLocations = (pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.MAX_AVAILABLE_REGION) => {
        const encounterTypes = {};
        // Routes
        const regionRoutes = PokemonHelper.getPokemonRegionRoutes(pokemonName, maxRegion);
        if (Object.keys(regionRoutes).length) {
            encounterTypes[PokemonLocationType.Route] = regionRoutes;
        }
        // Dungeons
        const dungeons = PokemonHelper.getPokemonDungeons(pokemonName, maxRegion);
        if (dungeons.length) {
            encounterTypes[PokemonLocationType.Dungeon] = dungeons;
        }
        // Dungeon Boss
        const bossDungeons = PokemonHelper.getPokemonBossDungeons(pokemonName, maxRegion);
        if (bossDungeons.length) {
            encounterTypes[PokemonLocationType.DungeonBoss] = bossDungeons;
        }
        // Dungeon Chest
        const chestDungeons = PokemonHelper.getPokemonChestDungeons(pokemonName, maxRegion);
        if (chestDungeons.length) {
            encounterTypes[PokemonLocationType.DungeonChest] = chestDungeons;
        }
        // Shadow Pokemon
        const shadowPokemon = PokemonHelper.getShadowPokemonDungeons(pokemonName, maxRegion);
        if (shadowPokemon.length) {
            encounterTypes[PokemonLocationType.ShadowPokemon] = shadowPokemon;
        }
        // Eggs
        const eggs = PokemonHelper.getPokemonEggs(pokemonName, maxRegion);
        if (eggs.length) {
            encounterTypes[PokemonLocationType.Egg] = eggs;
        }
        // Shops
        const shops = PokemonHelper.getPokemonShops(pokemonName, maxRegion);
        if (shops.length) {
            encounterTypes[PokemonLocationType.Shop] = shops;
        }
        // Roaming
        const roaming = PokemonHelper.getPokemonRoamingRegions(pokemonName, maxRegion);
        if (roaming.length) {
            encounterTypes[PokemonLocationType.Roaming] = roaming;
        }
        // Baby
        const parents = PokemonHelper.getPokemonParents(pokemonName, maxRegion);
        if (parents.length) {
            encounterTypes[PokemonLocationType.Baby] = parents;
        }
        // Fossil
        const fossils = PokemonHelper.getPokemonFossils(pokemonName);
        if (fossils.length) {
            encounterTypes[PokemonLocationType.Fossil] = fossils;
        }
        // Safari
        const safariChance = PokemonHelper.getPokemonSafariChance(pokemonName);
        if (Object.keys(safariChance).length) {
            encounterTypes[PokemonLocationType.Safari] = safariChance;
        }
        // Evolution
        const evolutions = PokemonHelper.getPokemonPrevolution(pokemonName, maxRegion);
        if (evolutions.length) {
            encounterTypes[PokemonLocationType.Evolution] = evolutions;
        }

        // Battle Frontier
        const battleFrontier = PokemonHelper.getPokemonBattleFrontier(pokemonName);
        if (battleFrontier.length) {
            encounterTypes[PokemonLocationType.BattleFrontier] = battleFrontier;
        }

        // Wandering
        const wandering = PokemonHelper.getPokemonWandering(pokemonName);
        if (wandering.length) {
            encounterTypes[PokemonLocationType.Wandering] = wandering;
        }

        // Discord
        const discord = PokemonHelper.getPokemonDiscord(pokemonName);
        if (discord.length) {
            encounterTypes[PokemonLocationType.Discord] = discord;
        }

        // Temp battle reward
        const tempBattle = PokemonHelper.getPokemonTempBattleReward(pokemonName);
        if (tempBattle.length) {
            encounterTypes[PokemonLocationType.TempBattleReward] = tempBattle;
        }

        // Gym reward
        const gymReward = PokemonHelper.getPokemonGymReward(pokemonName);
        if (gymReward.length) {
            encounterTypes[PokemonLocationType.GymReward] = gymReward;
        }

        // Dungeon reward
        const dungeonReward = PokemonHelper.getPokemonDungeonReward(pokemonName);
        if (dungeonReward.length) {
            encounterTypes[PokemonLocationType.DungeonReward] = dungeonReward;
        }

        // Quest Line reward
        const questLineReward = PokemonHelper.getPokemonQuestLineReward(pokemonName);
        if (questLineReward.length) {
            encounterTypes[PokemonLocationType.QuestLineReward] = questLineReward;
        }

        // Trades
        const trades = PokemonHelper.getPokemonTrades(pokemonName, maxRegion);
        if (trades.length) {
            encounterTypes[PokemonLocationType.Trade] = trades;
        }

        // Gift NPC
        const gifts = PokemonHelper.getPokemonGifts(pokemonName, maxRegion);
        if (gifts.length) {
            encounterTypes[PokemonLocationType.GiftNPC] = gifts;
        }

        // Dream Orbs
        const dreamOrbs = PokemonHelper.getPokemonDreamOrbs(pokemonName, maxRegion);
        if (dreamOrbs.length) {
            encounterTypes[PokemonLocationType.DreamOrb] = dreamOrbs;
        }

        // Battle Café
        const combination = PokemonHelper.getBattleCafeCombination(pokemonName, maxRegion);
        if (combination) {
            encounterTypes[PokemonLocationType.BattleCafe] = combination;
        }

        // Safari Items
        const safariItems = PokemonHelper.getPokemonSafariItem(pokemonName, maxRegion);
        if (Object.keys(safariItems).length) {
            encounterTypes[PokemonLocationType.SafariItem] = safariItems;
        }

        // Return the list of items
        return encounterTypes;
    }

    public static isObtainableAndNotEvable = (pokemonName: PokemonNameType) => {
        const locations = PokemonHelper.getPokemonLocations(pokemonName);
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
