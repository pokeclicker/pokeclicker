class RoamingPokemonList {
    public static list: Array<Array<RoamingPokemon>> = new Array(GameConstants.MAX_AVAILABLE_REGION).fill([]);

    constructor() {

    }

    public static add(region: GameConstants.Region, roamer: RoamingPokemon): void {
        this.list[region].push(roamer);
    }

    public static getRegionalRoamers(region: GameConstants.Region): Array<RoamingPokemon> {
        return this.list[region].filter(p => p.isRoaming());
    }
}

// Kanto
RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon(pokemonMap.Mew));

// Johto
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Raikou, undefined, new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Entei, undefined, new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Suicune, undefined, new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Burned Tower'))));

// Hoenn
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Latios));
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Latias));


// Sinnoh
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon(pokemonMap.Manaphy));