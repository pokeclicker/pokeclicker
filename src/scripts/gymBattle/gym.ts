///<reference path="gymPokemon.ts"/>
///<reference path="../pokemons/pokemonFactory.ts"/>

import PokemonType = gameConstants.PokemonType;
class gym {
    leaderName: string;
    town: string;
    pokemons: gymPokemon[];
    badgeReward: string;
    moneyReward: number;
    badgeReq: number;


    constructor(leaderName: string, town: string, pokemons: gymPokemon[], badgeReward: string, moneyReward: number, badgeReq: number) {
        this.leaderName = leaderName;
        this.town = town;
        this.pokemons = pokemons;
        this.badgeReward = badgeReward;
        this.moneyReward = moneyReward;
        this.badgeReq = badgeReq;
    }
}

const gymList: { [townName: string]: gym } = {};
gymList["Pewter City"] = new gym(
    "Brock",
    "Pewter City",
    [new gymPokemon("Geodude", 550, 12),
        new gymPokemon("Onix", 1110, 14)],
    "Boulder",
    250,
    0);
gymList["Cerulean City"] = new gym(
    "Misty",
    "Celadon City",
    [new gymPokemon("Staryu", 4000, 18),
        new gymPokemon("Starmie", 6000, 21)],
    "Cascade",
    500,
    1
);
gymList["Vermillion City"] = new gym(
    "Lt. Surge",
    "Vermillion City",
    [new gymPokemon("Voltorb", 9780, 21),
        new gymPokemon("Pikachu", 13040, 18),
        new gymPokemon("Raichu", 14775, 24)],
    "Thunder",
    1000,
    2
);
gymList["Celadon City"] = new gym(
    "Erika",
    "Celadon City",
    [new gymPokemon("Victreebel", 17830, 29),
        new gymPokemon("Tangela", 20210, 24),
        new gymPokemon("Vileplume", 21400, 29)],
    "Rainbow",
    1500,
    3
);
gymList["Saffron City"] = new gym(
    "Sabrina",
    "Saffron City",
    [new gymPokemon("Kadabra", 16810, 38),
        new gymPokemon("Mr. Mime", 18340, 37),
        new gymPokemon("Venomoth", 19870, 38),
        new gymPokemon("Alakazam", 21400, 43)],
    "Marsh",
    2500,
    4
);
gymList["Fuchsia City"] = new gym(
    "Koga",
    "Fuchsia City",
    [new gymPokemon("Koffing", 23333, 38),
        new gymPokemon("Muk", 24000, 37),
        new gymPokemon("Koffing", 26667, 38),
        new gymPokemon("Weezing", 30000, 43)],
    "Marsh",
    3500,
    5
);
gymList["Cinnabar Island City"] = new gym(
    "Blaine",
    "Cinnabar Island City",
    [new gymPokemon("Growlithe", 27870, 42),
        new gymPokemon("Ponyta", 30960, 40),
        new gymPokemon("Rapidash", 34060, 42),
        new gymPokemon("Arcanine", 37155, 47)],
    "Volcano",
    5000,
    6
);
gymList["Viridian City"] = new gym(
    "Giovanni",
    "Viridian City",
    [new gymPokemon("Rhyhorn", 27460, 45),
        new gymPokemon("Dugtrio", 29960, 42),
        new gymPokemon("Nidoqueen", 29960, 44),
        new gymPokemon("Nidoking", 32452, 45),
        new gymPokemon("Rhydon", 34950, 50)],
    "Earth",
    6000,
    7
);
gymList["Lorelei"] = new gym(
    "Elite Lorelei",
    "Indigo Plateau Gym",
    [new gymPokemon("Dewgong", 30810, 52),
        new gymPokemon("Cloyster", 33380, 51),
        new gymPokemon("Slowbro", 35950, 52),
        new gymPokemon("Jynx", 38510, 54),
        new gymPokemon("Lapras", 44182, 54),],
    "E1",
    7500,
    8
);
gymList["Bruno"] = new gym(
    "Elite Bruno",
    "Indigo Plateau Gym",
    [new gymPokemon("Onix", 32950, 51),
        new gymPokemon("Hitmonchan", 35300, 53),
        new gymPokemon("Hitmonlee", 37660, 53),
        new gymPokemon("Onix", 40010, 54),
        new gymPokemon("Machamp", 42360, 56),],
    "E2",
    7500,
    9
);
gymList["Agatha"] = new gym(
    "Elite Agatha",
    "Indigo Plateau Gym",
    [new gymPokemon("Gengar", 35045, 54),
        new gymPokemon("Golbat", 36660, 54),
        new gymPokemon("Haunter", 48950, 53),
        new gymPokemon("Arbok", 41241, 56),
        new gymPokemon("Gengar", 45824, 58),],
    "E3",
    7500,
    10
);
gymList["Lance"] = new gym(
    "Elite Lance",
    "Indigo Plateau Gym",
    [new gymPokemon("Gyarados", 37320, 56),
        new gymPokemon("Dragonair", 39390, 54),
        new gymPokemon("Dragonair", 41160, 54),
        new gymPokemon("Aerodactyl", 43540, 58),
        new gymPokemon("Dragonite", 45610, 60),],
    "E4",
    7500,
    11
);
//TODO make champion gym