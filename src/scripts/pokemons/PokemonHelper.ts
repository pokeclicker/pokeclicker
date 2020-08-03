///<reference path="PokemonList.ts"/>
///<reference path="../GameConstants.ts"/>

enum PokemonLocationType {
    Route,
    Roaming,
    Dungeon,
    DungeonBoss,
    LevelEvolution,
    StoneEvolution,
    Egg,
    Baby,
    Shop,
    Fossil,
    Safari,
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
        });
    }

    public static getEvolution(id: number, evoType: GameConstants.StoneType): string {
        const pokemon = App.game.party.caughtPokemon.find(p => p.id == id);
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

    public static getPokemonByName(name: string): DataPokemon {
        const basePokemon = pokemonMap[name];
        if (!basePokemon) {
            console.warn('Could not find pokemon', name);
            return;
        }

        const type1 = basePokemon['type'][0];
        const type2: PokemonType = basePokemon['type'][1] ?? PokemonType.None;

        const eggCycles: number = basePokemon['eggCycles'] || 20;
        return new DataPokemon(basePokemon['id'], basePokemon['name'], basePokemon['catchRate'], basePokemon['evolutions'], type1, type2, basePokemon['attack'], basePokemon['levelType'], basePokemon['exp'], eggCycles);
    }

    public static typeStringToId(id: string) {
        return PokemonType[id];
    }

    public static typeIdToString(id: number) {
        return PokemonType[id];
    }

    public static getImage(pokemon: PokemonInterface, shiny: boolean): string {
        let src = 'assets/images/';
        if (shiny) {
            src += 'shiny';
        }
        src += `pokemon/${pokemon.id}.png`;
        return src;
    }

    public static getPokeballImage(pokemonName: string): string {
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


    public static calcNativeRegion(pokemonName: string) {
        const pokemon = pokemonMap[pokemonName];
        if (pokemon.nativeRegion != undefined) {
            return pokemon.nativeRegion;
        }
        const id = pokemon.id;
        const region = GameConstants.TotalPokemonsPerRegion.findIndex(maxRegionID => maxRegionID >= id);
        return region >= 0 ? region : GameConstants.Region.none;
    }

    public static getPokemonRegionRoutes(pokemonName: string) {
        const regionRoutes = {};
        Object.entries(pokemonsPerRoute).forEach(([region, routes]) => {
            Object.entries(routes).forEach(([route, encounterType]) => {
                if (Object.values(encounterType).flat().includes(pokemonName)) {
                    if (!regionRoutes[region]) {
                        regionRoutes[region] = [];
                    }
                    regionRoutes[region].push(route);
                }
            });
        });
        return regionRoutes;
    }

    public static getPokemonDungeons(pokemonName: string): Array<string> {
        const dungeons = [];
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // Dungeon Grunt
            if (dungeon.pokemonList.includes(pokemonName)) {
                dungeons.push(dungeonName);
            }
        });
        return dungeons;
    }

    public static getPokemonBossDungeons(pokemonName: string): Array<string> {
        const dungeons = [];
        Object.entries(dungeonList).forEach(([dungeonName, dungeon]) => {
            // Dungeon Boss
            const isBoss = dungeon.bossList.find(boss => boss.name == pokemonName);
            if (isBoss) {
                dungeons.push(dungeonName);
            }
        });
        return dungeons;
    }

    public static getPokemonEggs(pokemonName: string): Array<string> {
        const eggTypes = [];
        Object.entries(App.game.breeding.hatchList).forEach(([eggType, pokemonArr]) => {
            if (pokemonArr.flat().includes(pokemonName)) {
                eggTypes.push(EggType[eggType]);
            }
        });
        return eggTypes;
    }

    public static getPokemonShops(pokemonName: string): Array<string> {
        const shops = [];
        Object.entries(TownList).forEach(([townName, town]) => {
            if (town.shop() && town.shop().items()) {
                const hasPokemon = town.shop().items().find(item => item.name() == pokemonName);
                if (hasPokemon) {
                    shops.push(townName);
                }
            }
        });
        return shops;
    }

    public static getPokemonRoamingRegions(pokemonName: string): Array<string> {
        const regions = [];
        Object.entries(GameConstants.RoamingPokemon).forEach(([region, pokemonArr]) => {
            if (pokemonArr.includes(pokemonName)) {
                regions.push(region);
            }
        });
        return regions;
    }

    public static getPokemonParents(pokemonName: string): Array<string> {
        const parents = [];
        Object.entries(pokemonDevolutionMap).forEach(([parent, baby]) => {
            if (baby == pokemonName) {
                parents.push(parent);
            }
        });
        return parents;
    }

    public static getPokemonFossils(pokemonName: string): Array<string> {
        const fossils = [];
        Object.entries(GameConstants.FossilToPokemon).forEach(([fossil, pokemon]) => {
            if (pokemon == pokemonName) {
                fossils.push(fossil);
            }
        });
        return fossils;
    }

    public static getPokemonSafariChance(pokemonName: string): number {
        const safariPokemon = SafariPokemon.list.find(p => p.name == pokemonName);
        return safariPokemon ? +((safariPokemon.weight / SafariPokemon.listWeight) * 100).toFixed(2) : 0;
    }

    public static getPokemonLevelPrevolution(pokemonName: string): Evolution {
        const evolutionPokemon = pokemonList.find(p => p.evolutions ? p.evolutions.find(e => e instanceof LevelEvolution && e.getEvolvedPokemon() == pokemonName) : null);
        return evolutionPokemon ? evolutionPokemon.evolutions.find(e => e.getEvolvedPokemon() == pokemonName) : undefined;
    }

    public static getPokemonStonePrevolution(pokemonName: string): Evolution {
        const evolutionPokemon = pokemonList.find(p => p.evolutions ? p.evolutions.find(e => e instanceof StoneEvolution && e.getEvolvedPokemon() == pokemonName) : null);
        return evolutionPokemon ? evolutionPokemon.evolutions.find(e => e.getEvolvedPokemon() == pokemonName) : undefined;
    }
    
    public static getPokemonLocations = (pokemonName: string) => {
        const encounterTypes = {};
        // Routes
        const regionRoutes = PokemonHelper.getPokemonRegionRoutes(pokemonName);
        if (Object.keys(regionRoutes).length) {
            encounterTypes[PokemonLocationType.Route] = regionRoutes;
        }
        // Dungeons
        const dungeons = PokemonHelper.getPokemonDungeons(pokemonName);
        if (dungeons.length) {
            encounterTypes[PokemonLocationType.Dungeon] = dungeons;
        }
        // Dungeon Boss
        const bossDungeons = PokemonHelper.getPokemonBossDungeons(pokemonName);
        if (bossDungeons.length) {
            encounterTypes[PokemonLocationType.DungeonBoss] = bossDungeons;
        }
        // Eggs
        const eggs = PokemonHelper.getPokemonEggs(pokemonName);
        if (eggs.length) {
            encounterTypes[PokemonLocationType.Egg] = eggs;
        }
        // Shops
        const shops = PokemonHelper.getPokemonShops(pokemonName);
        if (shops.length) {
            encounterTypes[PokemonLocationType.Shop] = shops;
        }
        // Roaming
        const roaming = PokemonHelper.getPokemonRoamingRegions(pokemonName);
        if (roaming.length) {
            encounterTypes[PokemonLocationType.Roaming] = roaming;
        }
        // Baby
        const parents = PokemonHelper.getPokemonParents(pokemonName);
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
        // Level Evolution
        const levelEvolution = PokemonHelper.getPokemonLevelPrevolution(pokemonName);
        if (levelEvolution) {
            encounterTypes[PokemonLocationType.LevelEvolution] = levelEvolution;
        }
        // Stone Evolution
        const stoneEvolution = PokemonHelper.getPokemonStonePrevolution(pokemonName);
        if (stoneEvolution) {
            encounterTypes[PokemonLocationType.StoneEvolution] = stoneEvolution;
        }

        // Return the list of items
        return encounterTypes;
    }
}
