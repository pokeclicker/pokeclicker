///<reference path="GymPokemon.ts"/>
///<reference path="../pokemons/PokemonFactory.ts"/>

import PokemonType = GameConstants.PokemonType;


/**
 * Gym class.
 */
class Gym {
    leaderName: string;
    town: string;
    pokemons: GymPokemon[];
    badgeReward: string;
    moneyReward: number;
    badgeReq: number;


    constructor(leaderName: string, town: string, pokemons: GymPokemon[], badgeReward: string, moneyReward: number, badgeReq: number) {
        this.leaderName = leaderName;
        this.town = town;
        this.pokemons = pokemons;
        this.badgeReward = badgeReward;
        this.moneyReward = moneyReward;
        this.badgeReq = badgeReq;
    }
}

/**
 * Data list that contains all gyms, accessible by townName.
 * @type {{}}
 */
const gymList: { [townName: string]: Gym } = {};
gymList["Pewter City"] = new Gym(
    "Brock",
    "Pewter City",
    [new GymPokemon("Geodude", 550, 12),
        new GymPokemon("Onix", 1110, 14)],
    "Boulder",
    250,
    0);
gymList["Cerulean City"] = new Gym(
    "Misty",
    "Celadon City",
    [new GymPokemon("Staryu", 4000, 18),
        new GymPokemon("Starmie", 6000, 21)],
    "Cascade",
    500,
    1
);
gymList["Vermillion City"] = new Gym(
    "Lt. Surge",
    "Vermillion City",
    [new GymPokemon("Voltorb", 9780, 21),
        new GymPokemon("Pikachu", 13040, 18),
        new GymPokemon("Raichu", 14775, 24)],
    "Thunder",
    1000,
    2
);
gymList["Celadon City"] = new Gym(
    "Erika",
    "Celadon City",
    [new GymPokemon("Victreebel", 17830, 29),
        new GymPokemon("Tangela", 20210, 24),
        new GymPokemon("Vileplume", 21400, 29)],
    "Rainbow",
    1500,
    3
);
gymList["Saffron City"] = new Gym(
    "Sabrina",
    "Saffron City",
    [new GymPokemon("Kadabra", 16810, 38),
        new GymPokemon("Mr. Mime", 18340, 37),
        new GymPokemon("Venomoth", 19870, 38),
        new GymPokemon("Alakazam", 21400, 43)],
    "Marsh",
    2500,
    4
);
gymList["Fuchsia City"] = new Gym(
    "Koga",
    "Fuchsia City",
    [new GymPokemon("Koffing", 23333, 38),
        new GymPokemon("Muk", 24000, 37),
        new GymPokemon("Koffing", 26667, 38),
        new GymPokemon("Weezing", 30000, 43)],
    "Marsh",
    3500,
    5
);
gymList["Cinnabar Island City"] = new Gym(
    "Blaine",
    "Cinnabar Island City",
    [new GymPokemon("Growlithe", 27870, 42),
        new GymPokemon("Ponyta", 30960, 40),
        new GymPokemon("Rapidash", 34060, 42),
        new GymPokemon("Arcanine", 37155, 47)],
    "Volcano",
    5000,
    6
);
gymList["Viridian City"] = new Gym(
    "Giovanni",
    "Viridian City",
    [new GymPokemon("Rhyhorn", 27460, 45),
        new GymPokemon("Dugtrio", 29960, 42),
        new GymPokemon("Nidoqueen", 29960, 44),
        new GymPokemon("Nidoking", 32452, 45),
        new GymPokemon("Rhydon", 34950, 50)],
    "Earth",
    6000,
    7
);
gymList["Lorelei"] = new Gym(
    "Elite Lorelei",
    "Indigo Plateau Gym",
    [new GymPokemon("Dewgong", 30810, 52),
        new GymPokemon("Cloyster", 33380, 51),
        new GymPokemon("Slowbro", 35950, 52),
        new GymPokemon("Jynx", 38510, 54),
        new GymPokemon("Lapras", 44182, 54),],
    "E1",
    7500,
    8
);
gymList["Bruno"] = new Gym(
    "Elite Bruno",
    "Indigo Plateau Gym",
    [new GymPokemon("Onix", 32950, 51),
        new GymPokemon("Hitmonchan", 35300, 53),
        new GymPokemon("Hitmonlee", 37660, 53),
        new GymPokemon("Onix", 40010, 54),
        new GymPokemon("Machamp", 42360, 56),],
    "E2",
    7500,
    9
);
gymList["Agatha"] = new Gym(
    "Elite Agatha",
    "Indigo Plateau Gym",
    [new GymPokemon("Gengar", 35045, 54),
        new GymPokemon("Golbat", 36660, 54),
        new GymPokemon("Haunter", 48950, 53),
        new GymPokemon("Arbok", 41241, 56),
        new GymPokemon("Gengar", 45824, 58),],
    "E3",
    7500,
    10
);
gymList["Lance"] = new Gym(
    "Elite Lance",
    "Indigo Plateau Gym",
    [new GymPokemon("Gyarados", 37320, 56),
        new GymPokemon("Dragonair", 39390, 54),
        new GymPokemon("Dragonair", 41160, 54),
        new GymPokemon("Aerodactyl", 43540, 58),
        new GymPokemon("Dragonite", 45610, 60),],
    "E4",
    7500,
    11
);
//TODO make champion Gym
