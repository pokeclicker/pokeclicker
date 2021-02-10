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
RoamingPokemonList.add(GameConstants.Region.kanto, new RoamingPokemon('Mew'));

// Johto
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon('Raikou', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon('Entei', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));
RoamingPokemonList.add(GameConstants.Region.johto, new RoamingPokemon('Suicune', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Burned Tower'))));

// Hoenn
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon('Latios', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon('Latias', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));
// TODO: these need another way to be obtained
RoamingPokemonList.add(GameConstants.Region.hoenn, new RoamingPokemon('Jirachi', new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)));

// Sinnoh
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon('Manaphy'));
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon('Mesprit', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Lake Verity'))));
RoamingPokemonList.add(GameConstants.Region.sinnoh, new RoamingPokemon('Cresselia', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Fullmoon Island'))));

// Unova
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon('Tornadus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon('Thundurus', new GymBadgeRequirement(BadgeEnums.Legend)));
RoamingPokemonList.add(GameConstants.Region.unova, new RoamingPokemon('Meloetta (aria)', new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)));

//Galar
RoamingPokemonList.add(GameConstants.Region.galar, new RoamingPokemon('Galarian Articuno', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill'))));


//Isle of Armor
RoamingPokemonList.add(GameConstants.Region.armor, new RoamingPokemon('Zarude', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)));
RoamingPokemonList.add(GameConstants.Region.armor, new RoamingPokemon('Galarian Moltres', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill'))));

//Crown Tundra
RoamingPokemonList.add(GameConstants.Region.crown, new RoamingPokemon('Spectrier', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)));
RoamingPokemonList.add(GameConstants.Region.crown, new RoamingPokemon('Glastrier', new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)));
RoamingPokemonList.add(GameConstants.Region.crown, new RoamingPokemon('Galarian Zapdos', new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Dyna Tree Hill'))));
