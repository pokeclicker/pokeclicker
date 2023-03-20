///<reference path="../GameConstants.d.ts"/>

class PokemonHelper extends TmpPokemonHelper {
    /*
    PRETTY MUCH ONLY USED BY THE BOT BELOW
    */

    public static getPokemonRegionRoutes(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none) {
        const regionRoutes = {};
        Routes.regionRoutes.forEach(routeData => {
            const region = routeData.region;
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none && region > maxRegion) {
                return false;
            }
            Object.entries(routeData.pokemon).forEach(([encounterType, pokemon]) => {
                if (Object.values(pokemon).flat().includes(pokemonName)) {
                    if (!regionRoutes[region]) {
                        regionRoutes[region] = [];
                    }
                    regionRoutes[region].push({ route: routeData.number });
                }
            });
            routeData.pokemon.special?.forEach(special => {
                if (special.pokemon.includes(pokemonName)) {
                    if (!regionRoutes[region]) {
                        regionRoutes[region] = [];
                    }
                    regionRoutes[region].push({ route: routeData.number, requirements: special.req.hint() });
                }
            });
            return true;
        });
        return regionRoutes;
    }

    public static getPokemonDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const dungeons = [];
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none) {
                const region = GameConstants.RegionDungeons.findIndex(d => d.includes(dungeonName));
                if (region > maxRegion) {
                    return false;
                }
            }
            // Dungeon Grunt
            if (dungeon.pokemonList.includes(pokemonName)) {
                dungeons.push(dungeonName);
            }
        });
        return dungeons;
    }

    public static getPokemonBossDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const dungeons = [];
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // If we only want to check up to a maximum region
            if (maxRegion != GameConstants.Region.none) {
                const region = GameConstants.RegionDungeons.findIndex(d => d.includes(dungeonName));
                if (region > maxRegion) {
                    return false;
                }
            }
            // Dungeon Boss
            const boss = dungeon.availableBosses(false, true).find(boss => boss.name == pokemonName);
            if (boss) {
                const data = {
                    dungeon: dungeonName,
                    requirements: boss.options?.requirement?.hint(),
                };
                dungeons.push(data);
            }
        });
        return dungeons;
    }

    public static getPokemonChestDungeons(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const dungeons = [];
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
                if (i.loot == pokemonName) {
                    const data = {
                        dungeon: dungeonName,
                        requirements: i.requirement?.hint(),
                    };
                    dungeons.push(data);
                }
            });
        });
        return dungeons;
    }

    public static getPokemonEggs(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const eggTypes = [];
        Object.entries(App.game.breeding.hatchList).forEach(([eggType, eggArr]) => {
            eggArr.forEach((pokemonArr, region) => {
                // If we only want to check up to a maximum region
                if (maxRegion != GameConstants.Region.none && region > maxRegion) {
                    return false;
                }
                if (pokemonArr.includes(pokemonName)) {
                    eggTypes.push(EggType[eggType]);
                }
            });
        });
        return eggTypes;
    }

    public static getPokemonShops(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const shops = [];
        Object.entries(TownList).forEach(([townName, town]) => {
            // Check if the shop has items
            const townShops = town.content.filter(c => c instanceof Shop && c.items);
            if (townShops.length) {
                // If we only want to check up to a maximum region
                const region = town.region;
                if (maxRegion != GameConstants.Region.none && region > maxRegion) {
                    return false;
                }
                const hasPokemon = townShops.find(ts => (ts as Shop).items?.find(item => item.name == pokemonName));
                if (hasPokemon) {
                    shops.push(townName);
                }
            }
        });
        return shops;
    }

    public static getPokemonRoamingRegions(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const regions = [];
        Object.entries(RoamingPokemonList.list).forEach(([region, regionArr]) => {
            if (maxRegion != GameConstants.Region.none && (+region) > maxRegion) {
                return false;
            }
            RoamingPokemonList.roamerGroups[region].forEach((group, i) => {
                const pokemon = regionArr[i]?.find(r => r.pokemon.name == pokemonName);
                if (pokemon) {
                    const data = {
                        region: +region,
                        requirements: pokemon.unlockRequirement?.hint(),
                        roamingGroup: group,
                    };
                    regions.push(data);
                }
            });
        });
        return regions;
    }

    public static getPokemonParents(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<string> {
        const parents = [];
        Object.entries(pokemonBabyPrevolutionMap).forEach(([parent, baby]) => {
            if (baby == pokemonName) {
                if (maxRegion != GameConstants.Region.none && pokemonMap[parent].nativeRegion > maxRegion) {
                    return false;
                }
                parents.push(parent);
            }
        });
        return parents;
    }

    public static getPokemonFossils(pokemonName: PokemonNameType): Array<string> {
        const fossils = [];
        Object.entries(GameConstants.FossilToPokemon).forEach(([fossil, pokemon]) => {
            if (pokemon == pokemonName) {
                fossils.push(fossil);
            }
        });
        return fossils;
    }

    public static getPokemonSafariChance(pokemonName: PokemonNameType): Record<GameConstants.Region, Record<number, number>> {
        const list = {};
        Object.entries(SafariPokemonList.list).forEach(([region, zones]) => {
            zones().forEach((p, zone) => {
                if (zone == GameConstants.Region.kalos) {
                    // Friendly safari might cause infinit recursion
                    return;
                }
                const safariWeight = p.safariPokemon.reduce((sum, p) => sum += p.weight, 0);
                const safariPokemon = p.safariPokemon.find(p => p.name == pokemonName);
                if (safariPokemon) {
                    list[+region] = list[+region] || {};
                    list[+region][zone] = +((SafariPokemon.calcPokemonWeight(safariPokemon) / safariWeight) * 100).toFixed(2);
                }
            });
        });
        return list;
    }

    public static getPokemonPrevolution(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<EvoData> {
        const evolutions = [];
        const prevolutionPokemon = pokemonList.filter((p: PokemonListData) => p.evolutions?.find(e => e.evolvedPokemon == pokemonName));
        prevolutionPokemon.forEach((p: PokemonListData) => p.evolutions.forEach(e => {
            if (e.evolvedPokemon == pokemonName) {
                // ignore dummy evolutions
                if (e.trigger === EvoTrigger.NONE) {
                    return false;
                }
                if (maxRegion != GameConstants.Region.none && p.nativeRegion > maxRegion) {
                    return false;
                }
                evolutions.push(e);
            }
        }));
        return evolutions;
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
        const stages = [];
        BattleFrontierMilestones.milestoneRewards.filter(m => m instanceof BattleFrontierMilestonePokemon).forEach(milestone => {
            if (milestone._description == pokemonName) {
                stages.push(milestone.stage);
            }
        });
        return stages;
    }

    public static getPokemonWandering(pokemonName: PokemonNameType): Array<string> {
        const berries = [];
        if (Berry.baseWander.includes(pokemonName)) {
            return ['Always'];
        }
        App.game.farming.berryData.forEach((berry) => {
            if (berry.wander.includes(pokemonName)) {
                berries.push(BerryType[berry.type]);
            }
        });
        return berries;
    }

    public static getPokemonDiscord(pokemonName: PokemonNameType): Array<number> {
        const codes = [];
        App.game.discord.codes.forEach(code => {
            if (code.name == pokemonName) {
                codes.push(code.price);
            }
        });
        return codes;
    }

    public static getPokemonTempBattleReward(pokemonName: PokemonNameType): Array<string> {
        const tempBattleList = [];
        Object.entries(TemporaryBattleList).forEach(tempBattle => {
            if (tempBattle[1].optionalArgs?.firstTimeRewardFunction?.toString().includes(`'${pokemonName}'`) ||
                tempBattle[1].optionalArgs?.rewardFunction?.toString().includes(`'${pokemonName}'`) ||
                (tempBattle[1].optionalArgs?.isTrainerBattle === false && tempBattle[1].getPokemonList().some((p) => p.name === pokemonName))) {
                tempBattleList.push(tempBattle[0]);
            }
        });
        return tempBattleList;
    }

    public static getPokemonGymReward(pokemonName: PokemonNameType): Array<string> {
        const gymList = [];
        Object.values(GymList).forEach(gym => {
            if (gym.rewardFunction?.toString().includes(`'${pokemonName}'`)) {
                gymList.push(gym.leaderName);
            }
        });
        return gymList;
    }

    public static getPokemonDungeonReward(pokemonName: PokemonNameType): Array<string> {
        const dungeons = [];
        Object.values(dungeonList).forEach(dungeon => {
            if (dungeon.rewardFunction?.toString().includes(`'${pokemonName}'`)) {
                dungeons.push(dungeon.name);
            }
        });
        return dungeons;
    }

    public static getPokemonQuestLineReward(pokemonName: PokemonNameType): Array<string> {
        const questLines = [];
        App.game.quests.questLines().forEach(questLine => questLine.quests().forEach(quest => {
            if ((quest as any).customReward?.toString().includes(`'${pokemonName}'`)) {
                questLines.push(questLine.name);
            }
        }));
        return questLines;
    }

    public static getPokemonLocations = (pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none, locationTypes: Array<number> = []) => {
        const encounterTypes = {};
        const encounterFunction = {};
        // Routes
        encounterFunction[GameConstants.PokemonLocationType.Route] = () => PokemonHelper.getPokemonRegionRoutes(pokemonName, maxRegion);
        // Dungeons
        encounterFunction[GameConstants.PokemonLocationType.Dungeon] = () => PokemonHelper.getPokemonDungeons(pokemonName, maxRegion);
        // Dungeon Boss
        encounterFunction[GameConstants.PokemonLocationType.DungeonBoss] = () => PokemonHelper.getPokemonBossDungeons(pokemonName, maxRegion);
        // Dungeon Chest
        encounterFunction[GameConstants.PokemonLocationType.DungeonChest] = () => PokemonHelper.getPokemonChestDungeons(pokemonName, maxRegion);
        // Eggs
        encounterFunction[GameConstants.PokemonLocationType.Egg] = () => PokemonHelper.getPokemonEggs(pokemonName, maxRegion);
        // Shops
        encounterFunction[GameConstants.PokemonLocationType.Shop] = () => PokemonHelper.getPokemonShops(pokemonName, maxRegion);
        // Roaming
        encounterFunction[GameConstants.PokemonLocationType.Roaming] = () => PokemonHelper.getPokemonRoamingRegions(pokemonName, maxRegion);
        // Baby
        encounterFunction[GameConstants.PokemonLocationType.Baby] = () => PokemonHelper.getPokemonParents(pokemonName, maxRegion);
        // Fossil
        encounterFunction[GameConstants.PokemonLocationType.Fossil] = () => PokemonHelper.getPokemonFossils(pokemonName);
        // Safari
        encounterFunction[GameConstants.PokemonLocationType.Safari] = () => PokemonHelper.getPokemonSafariChance(pokemonName);
        // Evolution
        encounterFunction[GameConstants.PokemonLocationType.Evolution] = () => PokemonHelper.getPokemonPrevolution(pokemonName, maxRegion);
        // Battle Frontier
        encounterFunction[GameConstants.PokemonLocationType.BattleFrontier] = () => PokemonHelper.getPokemonBattleFrontier(pokemonName);
        // Wandering
        encounterFunction[GameConstants.PokemonLocationType.Wandering] = () => PokemonHelper.getPokemonWandering(pokemonName);
        // Discord
        encounterFunction[GameConstants.PokemonLocationType.Discord] = () => PokemonHelper.getPokemonDiscord(pokemonName);
        // Temp battle reward
        encounterFunction[GameConstants.PokemonLocationType.TempBattleReward] = () => PokemonHelper.getPokemonTempBattleReward(pokemonName);
        // Gym reward
        encounterFunction[GameConstants.PokemonLocationType.GymReward] = () => PokemonHelper.getPokemonGymReward(pokemonName);
        // Dungeon reward
        encounterFunction[GameConstants.PokemonLocationType.DungeonReward] = () => PokemonHelper.getPokemonDungeonReward(pokemonName);
        // Quest Line reward
        encounterFunction[GameConstants.PokemonLocationType.QuestLineReward] = () => PokemonHelper.getPokemonQuestLineReward(pokemonName);
        // Filter and return the list of items
        Object.keys(encounterFunction).forEach((type) => {
            if (locationTypes.length == 0 || locationTypes.includes(+type)) {
                const result = encounterFunction[type]();
                if (Object.keys(result).length > 0) {
                    encounterTypes[type] = result;
                }
            }
        });
        return encounterTypes;
    }

    public static hasEvableLocations = (pokemonName: PokemonNameType) => {
        return Object.keys(PokemonHelper.getPokemonLocations(
            pokemonName,
            GameConstants.Region.none,
            [
                GameConstants.PokemonLocationType.Dungeon,
                GameConstants.PokemonLocationType.DungeonBoss,
                GameConstants.PokemonLocationType.DungeonChest,
                GameConstants.PokemonLocationType.Evolution,
                GameConstants.PokemonLocationType.Roaming,
                GameConstants.PokemonLocationType.Route,
                GameConstants.PokemonLocationType.Safari,
                GameConstants.PokemonLocationType.Shop,
                GameConstants.PokemonLocationType.Wandering,
            ]
        )).length > 0;
    };
}
