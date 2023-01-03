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
}

class PokemonHelper extends TmpPokemonHelper {

    // Can't move to modules yet because it wants to know what a PartyPokemon looks like
    // TODO: Maybe this one should be on Party too...
    public static getPokemonsWithEvolution(evoType: GameConstants.StoneType): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((partyPokemon: PartyPokemon) => {
            if (!partyPokemon.evolutions) {
                return false;
            }
            for (const evolution of partyPokemon.evolutions) {
                if (evolution.trigger === EvoTrigger.STONE && (evolution as StoneEvoData).stone == evoType && EvolutionHandler.isSatisfied(evolution) && PokemonHelper.calcNativeRegion(evolution.evolvedPokemon) <= player.highestRegion()) {
                    return true;
                }
            }
            return false;
        }).sort((a, b) => a.id - b.id);
    }

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
                if (maxRegion != GameConstants.Region.none && region > maxRegion)  {
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
            const pokemon = regionArr.flat().find(r => r.pokemon.name == pokemonName);
            if (pokemon) {
                const data = {
                    region: +region,
                    requirements: pokemon.unlockRequirement?.hint(),
                };
                regions.push(data);
            }
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

    public static getPokemonLocations = (pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none) => {
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

        // Wandering
        const discord = PokemonHelper.getPokemonDiscord(pokemonName);
        if (discord.length) {
            encounterTypes[PokemonLocationType.Discord] = discord;
        }

        // Return the list of items
        return encounterTypes;
    }
}
