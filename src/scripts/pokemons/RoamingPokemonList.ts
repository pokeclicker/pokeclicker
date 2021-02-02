/// <reference path="../../declarations/enums/Badges.d.ts"/>

class RoamingPokemonList {
    public static list: Partial<Record<GameConstants.Region, Array<RoamingPokemon>>> = {};

    constructor() { }

    public static add(region: GameConstants.Region, roamer: RoamingPokemon): void {
        if (!RoamingPokemonList.list[region]) {
            RoamingPokemonList.list[region] = [];
        }
        RoamingPokemonList.list[region].push(roamer);
    }

    public static remove(region: GameConstants.Region, pokemonName: PokemonNameType): void {
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
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Raikou,  undefined, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Entei,   undefined, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon(pokemonMap.Suicune, undefined, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));

// Hoenn
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Latios, undefined, new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Latias, undefined, new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
// TODO: these need another way to be obtained
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon(pokemonMap.Jirachi, undefined, new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));

// Sinnoh
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon(pokemonMap.Manaphy));
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon(pokemonMap.Mesprit, undefined, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Verity'))));
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon(pokemonMap.Cresselia, undefined, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Fullmoon Island'))));

// Unova
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon(pokemonMap.Tornadus, undefined, new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon(pokemonMap.Thundurus, undefined, new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon(pokemonMap['Meloetta (aria)'], undefined, new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)));

// Kalos
RoamingPokemonList.add(GameConstants.Region.kalos, new RoamingPokemon(pokemonMap.Hoopa, undefined, new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)));
RoamingPokemonList.add(GameConstants.Region.kalos, new RoamingPokemon(pokemonMap.Diancie, undefined, new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)));
RoamingPokemonList.add(GameConstants.Region.kalos, new RoamingPokemon(pokemonMap.Volcanion, undefined, new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)));

//Galar
RoamingPokemonList.add(GameConstants.Region.galar, new RoamingPokemon(pokemonMap['Zapdos (Galar)'], undefined, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill'))));


//Isle of Armor
RoamingPokemonList.add(GameConstants.Region.armor, new RoamingPokemon(pokemonMap.Zarude, undefined, new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)));
RoamingPokemonList.add(GameConstants.Region.armor, new RoamingPokemon(pokemonMap['Moltres (Galar)'], undefined, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill'))));

//Crown Tundra
RoamingPokemonList.add(GameConstants.Region.crown, new RoamingPokemon(pokemonMap.Spectrier, undefined, new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)));
RoamingPokemonList.add(GameConstants.Region.crown, new RoamingPokemon(pokemonMap.Glastrier, undefined, new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)));
RoamingPokemonList.add(GameConstants.Region.crown, new RoamingPokemon(pokemonMap['Zapdos (Galar)'], undefined, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill'))));
