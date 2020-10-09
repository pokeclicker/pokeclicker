///<reference path="../badgeCase/BadgeTypes.ts"/>

class RoamingPokemonList {
    public static list: Partial<Record<GameConstants.Region, Array<RoamingPokemon>>> = {};

    constructor() { }

    public static add(region: GameConstants.Region, roamer: RoamingPokemon): void {
        if (!RoamingPokemonList.list[region]) {
            RoamingPokemonList.list[region] = [];
        }
        RoamingPokemonList.list[region].push(roamer);
    }

    public static remove(region: GameConstants.Region, pokemonName: string): void {
        const index = RoamingPokemonList.list[region].findIndex(r => r.pokemon.name == pokemonName);
        if (index >= 0) {
            RoamingPokemonList.list[region].splice(index, 1);
        }
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
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Latios, undefined, new GymBadgeRequirement(BadgeTypes.Elite_HoennChampion)));
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Latias, undefined, new GymBadgeRequirement(BadgeTypes.Elite_HoennChampion)));
// TODO: these need another way to be obtained
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Jirachi, undefined, new GymBadgeRequirement(BadgeTypes.Elite_HoennChampion)));


// Sinnoh
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon(pokemonMap.Manaphy));
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon(pokemonMap.Mesprit, undefined, new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Lake Verity'))));
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon(pokemonMap.Cresselia, undefined, new ClearDungeonRequirement(1, Statistics.getDungeonIndex('Fullmoon Island'))));

// Unova
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon(pokemonMap.Tornadus));
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon(pokemonMap.Thundurus));
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon(pokemonMap.Meloetta, undefined, new GymBadgeRequirement(BadgeCase.Badge.Elite_UnovaChampion)));
