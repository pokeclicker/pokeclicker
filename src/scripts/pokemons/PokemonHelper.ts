///<reference path="PokemonList.ts"/>
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

class PokemonHelper {

    public static getPokemonsWithEvolution(evoType: GameConstants.StoneType): PartyPokemon[] {
        return App.game.party.caughtPokemon.filter((partyPokemon: PartyPokemon) => {
            if (!partyPokemon.evolutions) {
                return false;
            }
            for (const evolution of partyPokemon.evolutions) {
                if (evolution instanceof StoneEvolution && evolution.stone == evoType && evolution.isSatisfied() && PokemonHelper.calcNativeRegion(evolution.getEvolvedPokemon()) <= player.highestRegion()) {
                    return true;
                }
            }
            return false;
        }).sort((a, b) => a.id - b.id);
    }

    public static getEvolution(id: number, evoType: GameConstants.StoneType): string {
        const pokemon = App.game.party.getPokemon(id);
        if (pokemon) {
            for (const evolution of pokemon.evolutions) {
                if (evolution instanceof StoneEvolution && evolution.stone == evoType) {
                    return evolution.getEvolvedPokemon();
                }
            }
        }
        return '';
    }

    public static getPokemonById(id: number): DataPokemon {
        return this.getPokemonByName(pokemonMap[id].name);
    }

    public static getPokemonByName(name: PokemonNameType): DataPokemon {
        const basePokemon = pokemonMap[name];
        if (!basePokemon) {
            console.warn('Could not find pokemon', name);
            return;
        }

        const type1 = basePokemon.type[0];
        const type2: PokemonType = basePokemon.type[1] ?? PokemonType.None;

        const eggCycles: number = basePokemon.eggCycles || 20;
        return new DataPokemon(basePokemon.id, basePokemon.name, basePokemon.catchRate, basePokemon.evolutions, type1, type2, basePokemon.attack, basePokemon.base.hitpoints, basePokemon.levelType, basePokemon.exp, eggCycles, basePokemon.heldItem, basePokemon.gender);
    }

    public static typeStringToId(id: string) {
        return PokemonType[id];
    }

    public static typeIdToString(id: number) {
        return PokemonType[id];
    }

    public static getImage(pokemonId: number, shiny: boolean = undefined, gender: boolean = undefined): string {
        let src = 'assets/images/';
        if (shiny === undefined) {
            shiny = App.game.party.alreadyCaughtPokemon(pokemonId, true);
        }
        if (gender === undefined) {
            gender = App.game.party.getPokemon(pokemonId)?.defaultFemaleSprite() ?? false;
        }

        if (shiny) {
            src += 'shiny';
        }
        let genderString = '';
        // If Pokémon is female, use the female sprite, otherwise use the male/genderless one
        const hasDiff = this.getPokemonById(pokemonId).gender.visualDifference;
        if (hasDiff) {
            if (gender) {
                genderString = '-f';
            }
        }
        src += `pokemon/${pokemonId}${genderString}.png`;
        return src;
    }

    public static getPokeballImage(pokemonName: PokemonNameType): string {
        let src = '';
        if (App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id)) {
            src = 'assets/images/pokeball/Pokeball-';
            if (App.game.party.alreadyCaughtPokemon(PokemonHelper.getPokemonByName(pokemonName).id, true)) {
                src += 'shiny-';
            }
            src += 'small.png';
        }
        return src;
    }


    public static calcNativeRegion(pokemonName: PokemonNameType) {
        const pokemon = pokemonMap[pokemonName];
        if (pokemon.nativeRegion != undefined) {
            return pokemon.nativeRegion;
        }
        const id = pokemon.id;
        const region = GameConstants.MaxIDPerRegion.findIndex(maxRegionID => maxRegionID >= Math.floor(id));
        return region >= 0 ? region : GameConstants.Region.none;
    }

    public static calcUniquePokemonsByRegion(region: GameConstants.Region) {
        return new Set(pokemonList.filter(p => p.id > 0 && PokemonHelper.calcNativeRegion(p.name) === region).map(p => Math.floor(p.id))).size;
    }

    // To have encounter/caught/defeat/hatch statistics in a single place
    public static incrementPokemonStatistics(pokemonId: number, statistic: string, shiny: boolean, gender: number) {
        const pokemonStatistics = {
            'Captured': App.game.statistics.pokemonCaptured[pokemonId],
            'Defeated': App.game.statistics.pokemonDefeated[pokemonId],
            'Encountered': App.game.statistics.pokemonEncountered[pokemonId],
            'Hatched': App.game.statistics.pokemonHatched[pokemonId],
            'MaleCaptured': App.game.statistics.malePokemonCaptured[pokemonId],
            'MaleDefeated': App.game.statistics.malePokemonDefeated[pokemonId],
            'MaleEncountered': App.game.statistics.malePokemonEncountered[pokemonId],
            'MaleHatched': App.game.statistics.malePokemonHatched[pokemonId],
            'FemaleCaptured': App.game.statistics.femalePokemonCaptured[pokemonId],
            'FemaleDefeated': App.game.statistics.femalePokemonDefeated[pokemonId],
            'FemaleEncountered': App.game.statistics.femalePokemonEncountered[pokemonId],
            'FemaleHatched': App.game.statistics.femalePokemonHatched[pokemonId],
            'ShinyCaptured': App.game.statistics.shinyPokemonCaptured[pokemonId],
            'ShinyDefeated': App.game.statistics.shinyPokemonDefeated[pokemonId],
            'ShinyEncountered': App.game.statistics.shinyPokemonEncountered[pokemonId],
            'ShinyHatched': App.game.statistics.shinyPokemonHatched[pokemonId],
            'ShinyMaleCaptured': App.game.statistics.shinyMalePokemonCaptured[pokemonId],
            'ShinyMaleDefeated': App.game.statistics.shinyMalePokemonDefeated[pokemonId],
            'ShinyMaleEncountered': App.game.statistics.shinyMalePokemonEncountered[pokemonId],
            'ShinyMaleHatched': App.game.statistics.shinyMalePokemonHatched[pokemonId],
            'ShinyFemaleCaptured': App.game.statistics.shinyFemalePokemonCaptured[pokemonId],
            'ShinyFemaleDefeated': App.game.statistics.shinyFemalePokemonDefeated[pokemonId],
            'ShinyFemaleEncountered': App.game.statistics.shinyFemalePokemonEncountered[pokemonId],
            'ShinyFemaleHatched': App.game.statistics.shinyFemalePokemonHatched[pokemonId],
        };
        const totalStatistics = {
            'Captured': App.game.statistics.totalPokemonCaptured,
            'Defeated': App.game.statistics.totalPokemonDefeated,
            'Encountered': App.game.statistics.totalPokemonEncountered,
            'Hatched': App.game.statistics.totalPokemonHatched,
            'MaleCaptured': App.game.statistics.totalMalePokemonCaptured,
            'MaleDefeated': App.game.statistics.totalMalePokemonDefeated,
            'MaleEncountered': App.game.statistics.totalMalePokemonEncountered,
            'MaleHatched': App.game.statistics.totalMalePokemonHatched,
            'FemaleCaptured': App.game.statistics.totalFemalePokemonCaptured,
            'FemaleDefeated': App.game.statistics.totalFemalePokemonDefeated,
            'FemaleEncountered': App.game.statistics.totalFemalePokemonEncountered,
            'FemaleHatched': App.game.statistics.totalFemalePokemonHatched,
            'GenderlessCaptured': App.game.statistics.totalGenderlessPokemonCaptured,
            'GenderlessDefeated': App.game.statistics.totalGenderlessPokemonDefeated,
            'GenderlessEncountered': App.game.statistics.totalGenderlessPokemonEncountered,
            'GenderlessHatched': App.game.statistics.totalGenderlessPokemonHatched,
            'ShinyCaptured': App.game.statistics.totalShinyPokemonCaptured,
            'ShinyDefeated': App.game.statistics.totalShinyPokemonDefeated,
            'ShinyEncountered': App.game.statistics.totalShinyPokemonEncountered,
            'ShinyHatched': App.game.statistics.totalShinyPokemonHatched,
            'ShinyMaleCaptured': App.game.statistics.totalShinyMalePokemonCaptured,
            'ShinyMaleDefeated': App.game.statistics.totalShinyMalePokemonDefeated,
            'ShinyMaleEncountered': App.game.statistics.totalShinyMalePokemonEncountered,
            'ShinyMaleHatched': App.game.statistics.totalShinyMalePokemonHatched,
            'ShinyFemaleCaptured': App.game.statistics.totalShinyFemalePokemonCaptured,
            'ShinyFemaleDefeated': App.game.statistics.totalShinyFemalePokemonDefeated,
            'ShinyFemaleEncountered': App.game.statistics.totalShinyFemalePokemonEncountered,
            'ShinyFemaleHatched': App.game.statistics.totalShinyFemalePokemonHatched,
            'ShinyGenderlessCaptured': App.game.statistics.totalShinyGenderlessPokemonCaptured,
            'ShinyGenderlessDefeated': App.game.statistics.totalShinyGenderlessPokemonDefeated,
            'ShinyGenderlessEncountered': App.game.statistics.totalShinyGenderlessPokemonEncountered,
            'ShinyGenderlessHatched': App.game.statistics.totalShinyGenderlessPokemonHatched,
        };
        let genderString = '';
        // Gender Statistics
        if (gender === GameConstants.BattlePokemonGender.Male) {
            genderString = 'Male';
        } else if (gender === GameConstants.BattlePokemonGender.Female) {
            genderString = 'Female';
        } else if (gender === GameConstants.BattlePokemonGender.NoGender) {
            genderString = 'Genderless';
        }
        GameHelper.incrementObservable(pokemonStatistics[statistic]);
        GameHelper.incrementObservable(totalStatistics[statistic]);
        // Gender
        if (gender != GameConstants.BattlePokemonGender.NoGender) {
            GameHelper.incrementObservable(pokemonStatistics[genderString + statistic]);
        }
        GameHelper.incrementObservable(totalStatistics[genderString + statistic]);
        if (shiny) {
            const shinyString = 'Shiny';
            GameHelper.incrementObservable(pokemonStatistics[shinyString + statistic]);
            GameHelper.incrementObservable(totalStatistics[shinyString + statistic]);
            // Gender
            if (gender != GameConstants.BattlePokemonGender.NoGender) {
                GameHelper.incrementObservable(pokemonStatistics[shinyString + genderString + statistic]);
            }
            GameHelper.incrementObservable(totalStatistics[shinyString + genderString + statistic]);
        }
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

    public static getPokemonSafariChance(pokemonName: PokemonNameType): number {
        const safariWeight = SafariPokemon.list.reduce((sum, p) => sum += p.weight, 0);
        const safariPokemon = SafariPokemon.list.find(p => p.name == pokemonName);
        return safariPokemon ? +((SafariPokemon.calcPokemonWeight(safariPokemon) / safariWeight) * 100).toFixed(2) : 0;
    }

    public static getPokemonPrevolution(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Array<Evolution> {
        const evolutions = [];
        const prevolutionPokemon = pokemonList.filter((p: PokemonListData) => p.evolutions?.find(e => e.getEvolvedPokemon() == pokemonName));
        prevolutionPokemon.forEach((p: PokemonListData) => p.evolutions.forEach(e => {
            if (e.getEvolvedPokemon() == pokemonName) {
                if (maxRegion != GameConstants.Region.none && p.nativeRegion > maxRegion) {
                    return false;
                }
                evolutions.push(e);
            }
        }));
        return evolutions;
    }

    public static getPokemonLevelPrevolution(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Evolution {
        const evolutionPokemon = pokemonList.find((p: PokemonListData) => p.evolutions?.find(e => e.type.includes(EvolutionType.Level) && e.getEvolvedPokemon() == pokemonName));
        if (maxRegion != GameConstants.Region.none && pokemonMap[evolutionPokemon.name].nativeRegion > maxRegion) {
            return;
        }
        return (evolutionPokemon as PokemonListData)?.evolutions?.find(e => e.getEvolvedPokemon() == pokemonName);
    }

    public static getPokemonStonePrevolution(pokemonName: PokemonNameType, maxRegion: GameConstants.Region = GameConstants.Region.none): Evolution {
        const evolutionPokemon = pokemonList.find((p: PokemonListData) => p.evolutions?.find(e => e.type.includes(EvolutionType.Stone) && e.getEvolvedPokemon() == pokemonName));
        if (maxRegion != GameConstants.Region.none && pokemonMap[evolutionPokemon.name].nativeRegion > maxRegion) {
            return;
        }
        return (evolutionPokemon as PokemonListData)?.evolutions?.find(e => e.getEvolvedPokemon() == pokemonName);
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
        if (safariChance) {
            encounterTypes[PokemonLocationType.Safari] = `${safariChance}%`;
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
