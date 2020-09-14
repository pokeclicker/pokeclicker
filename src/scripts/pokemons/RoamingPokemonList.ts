class RoamingPokemonList {
    public static list: Array<Array<RoamingPokemon>> = [];

    constructor() { }

    public static add(region: GameConstants.Region, roamer: RoamingPokemon): void {
        if (!RoamingPokemonList.list[region]) {
            RoamingPokemonList.list[region] = [];
        }
        RoamingPokemonList.list[region].push(roamer);
    }

    public static getRegionalRoamers(region: GameConstants.Region): Array<RoamingPokemon> {
        return RoamingPokemonList.list[region] ? RoamingPokemonList.list[region].filter(p => p.isRoaming()) : [];
    }
}

// Kanto
RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon(pokemonMap.Mew));

// Johto
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Raikou,  undefined, new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Entei,   undefined, new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Suicune, undefined, new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Burned Tower'))));

// Hoenn
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Latios, undefined, new GymBadgeRequirement(BadgeCase.Badge.Elite_HoennChampion)));
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Latias, undefined, new GymBadgeRequirement(BadgeCase.Badge.Elite_HoennChampion)));


// Sinnoh
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon(pokemonMap.Manaphy));