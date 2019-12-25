/**
 * Pokémon data, accessible by name or id.
 * @type {{}}
 */

const pokemonMap: { [name: string]: any } = {};
const pokemonMapId: { [id: number]: any } = {};
const pokemonDevolutionMap: {[name: string]: string} = {};

/**
 * Datalist that contains all Pokémon data
 */
const pokemonList: {
  id: number,
  name: string,
  catchRate: number,
  evolution?: any[],
  evoLevel?: any[],
  type: string[],
  attack: number,
  levelType: string,
  exp: number,
  eggCycles: number
}[] = [
    {
        "id": 1,
        "name": "Bulbasaur",
        "catchRate": 45,
        "evolution": ["Ivysaur"],
        "evoLevel": [16],
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 65,
        "levelType": "mediumslow",
        "exp": 64,
        "eggCycles": 20
    },
    {
        "id": 2,
        "name": "Ivysaur",
        "catchRate": 45,
        "evolution": ["Venusaur"],
        "evoLevel": [32],
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 80,
        "levelType": "mediumslow",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 3,
        "name": "Venusaur",
        "catchRate": 45,
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 100,
        "levelType": "mediumslow",
        "exp": 236,
        "eggCycles": 20
    },
    {
        "id": 4,
        "name": "Charmander",
        "catchRate": 45,
        "evolution": ["Charmeleon"],
        "evoLevel": [16],
        "type": [
            "Fire"
        ],
        "attack": 60,
        "levelType": "mediumslow",
        "exp": 62,
        "eggCycles": 20
    },
    {
        "id": 5,
        "name": "Charmeleon",
        "catchRate": 45,
        "evolution": ["Charizard"],
        "evoLevel": [36],
        "type": [
            "Fire"
        ],
        "attack": 80,
        "levelType": "mediumslow",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 6,
        "name": "Charizard",
        "catchRate": 45,
        "type": [
            "Fire",
            "Flying"
        ],
        "attack": 105,
        "levelType": "mediumslow",
        "exp": 240,
        "eggCycles": 20
    },
    {
        "id": 7,
        "name": "Squirtle",
        "catchRate": 45,
        "evolution": ["Wartortle"],
        "evoLevel": [16],
        "type": [
            "Water"
        ],
        "attack": 50,
        "levelType": "mediumslow",
        "exp": 63,
        "eggCycles": 20
    },
    {
        "id": 8,
        "name": "Wartortle",
        "catchRate": 45,
        "evolution": ["Blastoise"],
        "evoLevel": [36],
        "type": [
            "Water"
        ],
        "attack": 65,
        "levelType": "mediumslow",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 9,
        "name": "Blastoise",
        "catchRate": 45,
        "type": [
            "Water"
        ],
        "attack": 85,
        "levelType": "mediumslow",
        "exp": 239,
        "eggCycles": 20
    },
    {
        "id": 10,
        "name": "Caterpie",
        "catchRate": 255,
        "evolution": ["Metapod"],
        "evoLevel": [7],
        "type": [
            "Bug"
        ],
        "attack": 30,
        "levelType": "mediumfast",
        "exp": 39,
        "eggCycles": 15
    },
    {
        "id": 11,
        "name": "Metapod",
        "catchRate": 120,
        "evolution": ["Butterfree"],
        "evoLevel": [10],
        "type": [
            "Bug"
        ],
        "attack": 25,
        "levelType": "mediumfast",
        "exp": 72,
        "eggCycles": 15
    },
    {
        "id": 12,
        "name": "Butterfree",
        "catchRate": 45,
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 178,
        "eggCycles": 15
    },
    {
        "id": 13,
        "name": "Weedle",
        "catchRate": 255,
        "evolution": ["Kakuna"],
        "evoLevel": [7],
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 35,
        "levelType": "mediumfast",
        "exp": 39,
        "eggCycles": 15
    },
    {
        "id": 14,
        "name": "Kakuna",
        "catchRate": 120,
        "evolution": ["Beedrill"],
        "evoLevel": [10],
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 25,
        "levelType": "mediumfast",
        "exp": 72,
        "eggCycles": 15
    },
    {
        "id": 15,
        "name": "Beedrill",
        "catchRate": 45,
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 178,
        "eggCycles": 15
    },
    {
        "id": 16,
        "name": "Pidgey",
        "catchRate": 255,
        "evolution": ["Pidgeotto"],
        "evoLevel": [18],
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 45,
        "levelType": "mediumslow",
        "exp": 50,
        "eggCycles": 15
    },
    {
        "id": 17,
        "name": "Pidgeotto",
        "catchRate": 120,
        "evolution": ["Pidgeot"],
        "evoLevel": [36],
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 60,
        "levelType": "mediumslow",
        "exp": 122,
        "eggCycles": 15
    },
    {
        "id": 18,
        "name": "Pidgeot",
        "catchRate": 45,
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 80,
        "levelType": "mediumslow",
        "exp": 216,
        "eggCycles": 15
    },
    {
        "id": 19,
        "name": "Rattata",
        "catchRate": 255,
        "evolution": ["Raticate"],
        "evoLevel": [20],
        "type": [
            "Normal"
        ],
        "attack": 56,
        "levelType": "mediumfast",
        "exp": 51,
        "eggCycles": 15
    },
    {
        "id": 20,
        "name": "Raticate",
        "catchRate": 127,
        "type": [
            "Normal"
        ],
        "attack": 81,
        "levelType": "mediumfast",
        "exp": 145,
        "eggCycles": 15
    },
    {
        "id": 21,
        "name": "Spearow",
        "catchRate": 255,
        "evolution": ["Fearow"],
        "evoLevel": [20],
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 60,
        "levelType": "mediumfast",
        "exp": 52,
        "eggCycles": 15
    },
    {
        "id": 22,
        "name": "Fearow",
        "catchRate": 90,
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 155,
        "eggCycles": 15
    },
    {
        "id": 23,
        "name": "Ekans",
        "catchRate": 255,
        "evolution": ["Arbok"],
        "evoLevel": [22],
        "type": [
            "Poison"
        ],
        "attack": 60,
        "levelType": "mediumfast",
        "exp": 58,
        "eggCycles": 20
    },
    {
        "id": 24,
        "name": "Arbok",
        "catchRate": 90,
        "type": [
            "Poison"
        ],
        "attack": 85,
        "levelType": "mediumfast",
        "exp": 157,
        "eggCycles": 20
    },
    {
        "id": 25,
        "name": "Pikachu",
        "catchRate": 190,
        "evolution": ["Raichu"],
        "evoLevel": ["Thunder_stone"],
        "type": [
            "Electric"
        ],
        "attack": 55,
        "levelType": "mediumfast",
        "exp": 112,
        "eggCycles": 10
    },
    {
        "id": 26,
        "name": "Raichu",
        "catchRate": 75,
        "type": [
            "Electric"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 218,
        "eggCycles": 10
    },
    {
        "id": 27,
        "name": "Sandshrew",
        "catchRate": 255,
        "evolution": ["Sandslash"],
        "evoLevel": [22],
        "type": [
            "Ground"
        ],
        "attack": 75,
        "levelType": "mediumfast",
        "exp": 60,
        "eggCycles": 20
    },
    {
        "id": 28,
        "name": "Sandslash",
        "catchRate": 90,
        "type": [
            "Ground"
        ],
        "attack": 100,
        "levelType": "mediumfast",
        "exp": 158,
        "eggCycles": 20
    },
    {
        "id": 29,
        "name": "Nidoran(F)",
        "catchRate": 235,
        "evolution": ["Nidorina"],
        "evoLevel": [16],
        "type": [
            "Poison"
        ],
        "attack": 47,
        "levelType": "mediumslow",
        "exp": 55,
        "eggCycles": 20
    },
    {
        "id": 30,
        "name": "Nidorina",
        "catchRate": 120,
        "evolution": ["Nidoqueen"],
        "evoLevel": ["Moon_stone"],
        "type": [
            "Poison"
        ],
        "attack": 62,
        "levelType": "mediumslow",
        "exp": 128,
        "eggCycles": 20
    },
    {
        "id": 31,
        "name": "Nidoqueen",
        "catchRate": 45,
        "type": [
            "Poison",
            "Ground"
        ],
        "attack": 92,
        "levelType": "mediumslow",
        "exp": 227,
        "eggCycles": 20
    },
    {
        "id": 32,
        "name": "Nidoran(M)",
        "catchRate": 235,
        "evolution": ["Nidorino"],
        "evoLevel": [16],
        "type": [
            "Poison"
        ],
        "attack": 57,
        "levelType": "mediumslow",
        "exp": 55,
        "eggCycles": 20
    },
    {
        "id": 33,
        "name": "Nidorino",
        "catchRate": 120,
        "evolution": ["Nidoking"],
        "evoLevel": ["Moon_stone"],
        "type": [
            "Poison"
        ],
        "attack": 72,
        "levelType": "mediumslow",
        "exp": 128,
        "eggCycles": 20
    },
    {
        "id": 34,
        "name": "Nidoking",
        "catchRate": 45,
        "type": [
            "Poison",
            "Ground"
        ],
        "attack": 102,
        "levelType": "mediumslow",
        "exp": 227,
        "eggCycles": 20
    },
    {
        "id": 35,
        "name": "Clefairy",
        "catchRate": 150,
        "evolution": ["Clefable"],
        "evoLevel": ["Moon_stone"],
        "type": [
            "Fairy"
        ],
        "attack": 60,
        "levelType": "fast",
        "exp": 113,
        "eggCycles": 10
    },
    {
        "id": 36,
        "name": "Clefable",
        "catchRate": 25,
        "type": [
            "Fairy"
        ],
        "attack": 95,
        "levelType": "fast",
        "exp": 217,
        "eggCycles": 10
    },
    {
        "id": 37,
        "name": "Vulpix",
        "catchRate": 190,
        "evolution": ["Ninetales"],
        "evoLevel": ["Fire_stone"],
        "type": [
            "Fire"
        ],
        "attack": 50,
        "levelType": "mediumfast",
        "exp": 60,
        "eggCycles": 20
    },
    {
        "id": 38,
        "name": "Ninetales",
        "catchRate": 75,
        "type": [
            "Fire"
        ],
        "attack": 81,
        "levelType": "mediumfast",
        "exp": 177,
        "eggCycles": 20
    },
    {
        "id": 39,
        "name": "Jigglypuff",
        "catchRate": 170,
        "evolution": ["Wigglytuff"],
        "evoLevel": ["Moon_stone"],
        "type": [
            "Normal",
            "Fairy"
        ],
        "attack": 45,
        "levelType": "fast",
        "exp": 95,
        "eggCycles": 10
    },
    {
        "id": 40,
        "name": "Wigglytuff",
        "catchRate": 50,
        "type": [
            "Normal",
            "Fairy"
        ],
        "attack": 85,
        "levelType": "fast",
        "exp": 196,
        "eggCycles": 10
    },
    {
        "id": 41,
        "name": "Zubat",
        "catchRate": 255,
        "evolution": ["Golbat"],
        "evoLevel": [22],
        "type": [
            "Poison",
            "Flying"
        ],
        "attack": 45,
        "levelType": "mediumfast",
        "exp": 49,
        "eggCycles": 15
    },
    {
        "id": 42,
        "name": "Golbat",
        "catchRate": 90,
        "evolution": ["Crobat"],
        "evoLevel": [100],
        "type": [
            "Poison",
            "Flying"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 159,
        "eggCycles": 15
    },
    {
        "id": 43,
        "name": "Oddish",
        "catchRate": 255,
        "evolution": ["Gloom"],
        "evoLevel": [21],
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 75,
        "levelType": "mediumslow",
        "exp": 64,
        "eggCycles": 20
    },
    {
        "id": 44,
        "name": "Gloom",
        "catchRate": 120,
        "evolution": [
            "Vileplume",
            "Bellossom"
        ],
        "evoLevel": [
            "Leaf_stone",
            "Sun_stone"
        ],
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 85,
        "levelType": "mediumslow",
        "exp": 138,
        "eggCycles": 20
    },
    {
        "id": 45,
        "name": "Vileplume",
        "catchRate": 45,
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 110,
        "levelType": "mediumslow",
        "exp": 221,
        "eggCycles": 20
    },
    {
        "id": 46,
        "name": "Paras",
        "catchRate": 190,
        "evolution": ["Parasect"],
        "evoLevel": [24],
        "type": [
            "Bug",
            "Grass"
        ],
        "attack": 70,
        "levelType": "mediumfast",
        "exp": 57,
        "eggCycles": 20
    },
    {
        "id": 47,
        "name": "Parasect",
        "catchRate": 75,
        "type": [
            "Bug",
            "Grass"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 48,
        "name": "Venonat",
        "catchRate": 190,
        "evolution": ["Venomoth"],
        "evoLevel": [31],
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 55,
        "levelType": "mediumfast",
        "exp": 61,
        "eggCycles": 20
    },
    {
        "id": 49,
        "name": "Venomoth",
        "catchRate": 75,
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 158,
        "eggCycles": 20
    },
    {
        "id": 50,
        "name": "Diglett",
        "catchRate": 255,
        "evolution": ["Dugtrio"],
        "evoLevel": [26],
        "type": [
            "Ground"
        ],
        "attack": 55,
        "levelType": "mediumfast",
        "exp": 53,
        "eggCycles": 20
    },
    {
        "id": 51,
        "name": "Dugtrio",
        "catchRate": 50,
        "type": [
            "Ground"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 149,
        "eggCycles": 20
    },
    {
        "id": 52,
        "name": "Meowth",
        "catchRate": 255,
        "evolution": ["Persian"],
        "evoLevel": [28],
        "type": [
            "Normal"
        ],
        "attack": 45,
        "levelType": "mediumfast",
        "exp": 58,
        "eggCycles": 20
    },
    {
        "id": 53,
        "name": "Persian",
        "catchRate": 90,
        "type": [
            "Normal"
        ],
        "attack": 70,
        "levelType": "mediumfast",
        "exp": 154,
        "eggCycles": 20
    },
    {
        "id": 54,
        "name": "Psyduck",
        "catchRate": 190,
        "evolution": ["Golduck"],
        "evoLevel": [33],
        "type": [
            "Water"
        ],
        "attack": 65,
        "levelType": "mediumfast",
        "exp": 64,
        "eggCycles": 20
    },
    {
        "id": 55,
        "name": "Golduck",
        "catchRate": 75,
        "type": [
            "Water"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 175,
        "eggCycles": 20
    },
    {
        "id": 56,
        "name": "Mankey",
        "catchRate": 190,
        "evolution": ["Primeape"],
        "evoLevel": [28],
        "type": [
            "Fighting"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 61,
        "eggCycles": 20
    },
    {
        "id": 57,
        "name": "Primeape",
        "catchRate": 75,
        "type": [
            "Fighting"
        ],
        "attack": 105,
        "levelType": "mediumfast",
        "exp": 159,
        "eggCycles": 20
    },
    {
        "id": 58,
        "name": "Growlithe",
        "catchRate": 190,
        "evolution": ["Arcanine"],
        "evoLevel": ["Fire_stone"],
        "type": [
            "Fire"
        ],
        "attack": 70,
        "levelType": "slow",
        "exp": 70,
        "eggCycles": 20
    },
    {
        "id": 59,
        "name": "Arcanine",
        "catchRate": 75,
        "type": [
            "Fire"
        ],
        "attack": 110,
        "levelType": "slow",
        "exp": 194,
        "eggCycles": 20
    },
    {
        "id": 60,
        "name": "Poliwag",
        "catchRate": 255,
        "evolution": ["Poliwhirl"],
        "evoLevel": [25],
        "type": [
            "Water"
        ],
        "attack": 50,
        "levelType": "mediumslow",
        "exp": 60,
        "eggCycles": 20
    },
    {
        "id": 61,
        "name": "Poliwhirl",
        "catchRate": 120,
        "evolution": [
            "Poliwrath",
            "Politoed"
        ],
        "evoLevel": [
            "Water_stone",
            "Kings_rock"
        ],
        "type": [
            "Water"
        ],
        "attack": 65,
        "levelType": "mediumslow",
        "exp": 135,
        "eggCycles": 20
    },
    {
        "id": 62,
        "name": "Poliwrath",
        "catchRate": 45,
        "type": [
            "Water",
            "Fighting"
        ],
        "attack": 95,
        "levelType": "mediumslow",
        "exp": 230,
        "eggCycles": 20
    },
    {
        "id": 63,
        "name": "Abra",
        "catchRate": 200,
        "evolution": ["Kadabra"],
        "evoLevel": [16],
        "type": [
            "Psychic"
        ],
        "attack": 105,
        "levelType": "mediumslow",
        "exp": 62,
        "eggCycles": 20
    },
    {
        "id": 64,
        "name": "Kadabra",
        "catchRate": 100,
        "evolution": ["Alakazam"],
        "evoLevel": ["Trade_stone"],
        "type": [
            "Psychic"
        ],
        "attack": 120,
        "levelType": "mediumslow",
        "exp": 140,
        "eggCycles": 20
    },
    {
        "id": 65,
        "name": "Alakazam",
        "catchRate": 50,
        "type": [
            "Psychic"
        ],
        "attack": 135,
        "levelType": "mediumslow",
        "exp": 225,
        "eggCycles": 20
    },
    {
        "id": 66,
        "name": "Machop",
        "catchRate": 180,
        "evolution": ["Machoke"],
        "evoLevel": [28],
        "type": [
            "Fighting"
        ],
        "attack": 80,
        "levelType": "mediumslow",
        "exp": 61,
        "eggCycles": 20
    },
    {
        "id": 67,
        "name": "Machoke",
        "catchRate": 90,
        "evolution": ["Machamp"],
        "evoLevel": ["Trade_stone"],
        "type": [
            "Fighting"
        ],
        "attack": 100,
        "levelType": "mediumslow",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 68,
        "name": "Machamp",
        "catchRate": 45,
        "type": [
            "Fighting"
        ],
        "attack": 130,
        "levelType": "mediumslow",
        "exp": 227,
        "eggCycles": 20
    },
    {
        "id": 69,
        "name": "Bellsprout",
        "catchRate": 255,
        "evolution": ["Weepinbell"],
        "evoLevel": [21],
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 75,
        "levelType": "mediumslow",
        "exp": 60,
        "eggCycles": 20
    },
    {
        "id": 70,
        "name": "Weepinbell",
        "catchRate": 120,
        "evolution": ["Victreebel"],
        "evoLevel": ["Leaf_stone"],
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 90,
        "levelType": "mediumslow",
        "exp": 137,
        "eggCycles": 20
    },
    {
        "id": 71,
        "name": "Victreebel",
        "catchRate": 45,
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 105,
        "levelType": "mediumslow",
        "exp": 221,
        "eggCycles": 20
    },
    {
        "id": 72,
        "name": "Tentacool",
        "catchRate": 190,
        "evolution": ["Tentacruel"],
        "evoLevel": [30],
        "type": [
            "Water",
            "Poison"
        ],
        "attack": 50,
        "levelType": "slow",
        "exp": 67,
        "eggCycles": 20
    },
    {
        "id": 73,
        "name": "Tentacruel",
        "catchRate": 60,
        "type": [
            "Water",
            "Poison"
        ],
        "attack": 80,
        "levelType": "slow",
        "exp": 180,
        "eggCycles": 20
    },
    {
        "id": 74,
        "name": "Geodude",
        "catchRate": 255,
        "evolution": ["Graveler"],
        "evoLevel": [25],
        "type": [
            "Rock",
            "Ground"
        ],
        "attack": 80,
        "levelType": "mediumslow",
        "exp": 60,
        "eggCycles": 15
    },
    {
        "id": 75,
        "name": "Graveler",
        "catchRate": 120,
        "evolution": ["Golem"],
        "evoLevel": ["Trade_stone"],
        "type": [
            "Rock",
            "Ground"
        ],
        "attack": 95,
        "levelType": "mediumslow",
        "exp": 137,
        "eggCycles": 15
    },
    {
        "id": 76,
        "name": "Golem",
        "catchRate": 45,
        "type": [
            "Rock",
            "Ground"
        ],
        "attack": 120,
        "levelType": "mediumslow",
        "exp": 223,
        "eggCycles": 15
    },
    {
        "id": 77,
        "name": "Ponyta",
        "catchRate": 190,
        "evolution": ["Rapidash"],
        "evoLevel": [40],
        "type": [
            "Fire"
        ],
        "attack": 85,
        "levelType": "mediumfast",
        "exp": 82,
        "eggCycles": 20
    },
    {
        "id": 78,
        "name": "Rapidash",
        "catchRate": 60,
        "type": [
            "Fire"
        ],
        "attack": 100,
        "levelType": "mediumfast",
        "exp": 175,
        "eggCycles": 20
    },
    {
        "id": 79,
        "name": "Slowpoke",
        "catchRate": 190,
        "evolution": [
            "Slowbro",
            "Slowking"
        ],
        "evoLevel": [
            37,
            "Kings_rock"
        ],
        "type": [
            "Water",
            "Psychic"
        ],
        "attack": 65,
        "levelType": "mediumfast",
        "exp": 63,
        "eggCycles": 20
    },
    {
        "id": 80,
        "name": "Slowbro",
        "catchRate": 75,
        "type": [
            "Water",
            "Psychic"
        ],
        "attack": 100,
        "levelType": "mediumfast",
        "exp": 172,
        "eggCycles": 20
    },
    {
        "id": 81,
        "name": "Magnemite",
        "catchRate": 190,
        "evolution": ["Magneton"],
        "evoLevel": [30],
        "type": [
            "Electric",
            "Steel"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 65,
        "eggCycles": 20
    },
    {
        "id": 82,
        "name": "Magneton",
        "catchRate": 60,
        "type": [
            "Electric",
            "Steel"
        ],
        "attack": 120,
        "levelType": "mediumfast",
        "exp": 163,
        "eggCycles": 20,
        "evolution": ["Magnezone"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 83,
        "name": "Farfetch'd",
        "catchRate": 45,
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 65,
        "levelType": "mediumfast",
        "exp": 132,
        "eggCycles": 20,
        "evolution": ["Sirfetch'd"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 84,
        "name": "Doduo",
        "catchRate": 190,
        "evolution": ["Dodrio"],
        "evoLevel": [31],
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 85,
        "levelType": "mediumfast",
        "exp": 62,
        "eggCycles": 20
    },
    {
        "id": 85,
        "name": "Dodrio",
        "catchRate": 45,
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 110,
        "levelType": "mediumfast",
        "exp": 165,
        "eggCycles": 20
    },
    {
        "id": 86,
        "name": "Seel",
        "catchRate": 190,
        "evolution": ["Dewgong"],
        "evoLevel": [34],
        "type": [
            "Water"
        ],
        "attack": 45,
        "levelType": "mediumfast",
        "exp": 65,
        "eggCycles": 20
    },
    {
        "id": 87,
        "name": "Dewgong",
        "catchRate": 75,
        "type": [
            "Water",
            "Ice"
        ],
        "attack": 70,
        "levelType": "mediumfast",
        "exp": 166,
        "eggCycles": 20
    },
    {
        "id": 88,
        "name": "Grimer",
        "catchRate": 190,
        "evolution": ["Muk"],
        "evoLevel": [38],
        "type": [
            "Poison"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 65,
        "eggCycles": 20
    },
    {
        "id": 89,
        "name": "Muk",
        "catchRate": 75,
        "type": [
            "Poison"
        ],
        "attack": 105,
        "levelType": "mediumfast",
        "exp": 175,
        "eggCycles": 20
    },
    {
        "id": 90,
        "name": "Shellder",
        "catchRate": 190,
        "evolution": ["Cloyster"],
        "evoLevel": ["Water_stone"],
        "type": [
            "Water"
        ],
        "attack": 65,
        "levelType": "slow",
        "exp": 61,
        "eggCycles": 20
    },
    {
        "id": 91,
        "name": "Cloyster",
        "catchRate": 60,
        "type": [
            "Water",
            "Ice"
        ],
        "attack": 95,
        "levelType": "slow",
        "exp": 184,
        "eggCycles": 20
    },
    {
        "id": 92,
        "name": "Gastly",
        "catchRate": 190,
        "evolution": ["Haunter"],
        "evoLevel": [25],
        "type": [
            "Ghost",
            "Poison"
        ],
        "attack": 100,
        "levelType": "mediumslow",
        "exp": 62,
        "eggCycles": 20
    },
    {
        "id": 93,
        "name": "Haunter",
        "catchRate": 90,
        "evolution": ["Gengar"],
        "evoLevel": ["Trade_stone"],
        "type": [
            "Ghost",
            "Poison"
        ],
        "attack": 115,
        "levelType": "mediumslow",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 94,
        "name": "Gengar",
        "catchRate": 45,
        "type": [
            "Ghost",
            "Poison"
        ],
        "attack": 130,
        "levelType": "mediumslow",
        "exp": 225,
        "eggCycles": 20
    },
    {
        "id": 95,
        "name": "Onix",
        "catchRate": 45,
        "evolution": ["Steelix"],
        "evoLevel": ["Metal_coat"],
        "type": [
            "Rock",
            "Ground"
        ],
        "attack": 45,
        "levelType": "mediumfast",
        "exp": 77,
        "eggCycles": 25
    },
    {
        "id": 96,
        "name": "Drowzee",
        "catchRate": 190,
        "evolution": ["Hypno"],
        "evoLevel": [26],
        "type": [
            "Psychic"
        ],
        "attack": 48,
        "levelType": "mediumfast",
        "exp": 66,
        "eggCycles": 20
    },
    {
        "id": 97,
        "name": "Hypno",
        "catchRate": 75,
        "type": [
            "Psychic"
        ],
        "attack": 73,
        "levelType": "mediumfast",
        "exp": 169,
        "eggCycles": 20
    },
    {
        "id": 98,
        "name": "Krabby",
        "catchRate": 225,
        "evolution": ["Kingler"],
        "evoLevel": [28],
        "type": [
            "Water"
        ],
        "attack": 105,
        "levelType": "mediumfast",
        "exp": 65,
        "eggCycles": 20
    },
    {
        "id": 99,
        "name": "Kingler",
        "catchRate": 60,
        "type": [
            "Water"
        ],
        "attack": 130,
        "levelType": "mediumfast",
        "exp": 166,
        "eggCycles": 20
    },
    {
        "id": 100,
        "name": "Voltorb",
        "catchRate": 190,
        "evolution": ["Electrode"],
        "evoLevel": [30],
        "type": [
            "Electric"
        ],
        "attack": 55,
        "levelType": "mediumfast",
        "exp": 66,
        "eggCycles": 20
    },
    {
        "id": 101,
        "name": "Electrode",
        "catchRate": 60,
        "type": [
            "Electric"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 172,
        "eggCycles": 20
    },
    {
        "id": 102,
        "name": "Exeggcute",
        "catchRate": 90,
        "evolution": ["Exeggutor"],
        "evoLevel": ["Leaf_stone"],
        "type": [
            "Grass",
            "Psychic"
        ],
        "attack": 60,
        "levelType": "slow",
        "exp": 65,
        "eggCycles": 20
    },
    {
        "id": 103,
        "name": "Exeggutor",
        "catchRate": 45,
        "type": [
            "Grass",
            "Psychic"
        ],
        "attack": 125,
        "levelType": "slow",
        "exp": 186,
        "eggCycles": 20
    },
    {
        "id": 104,
        "name": "Cubone",
        "catchRate": 190,
        "evolution": ["Marowak"],
        "evoLevel": [28],
        "type": [
            "Ground"
        ],
        "attack": 50,
        "levelType": "mediumfast",
        "exp": 64,
        "eggCycles": 20
    },
    {
        "id": 105,
        "name": "Marowak",
        "catchRate": 75,
        "type": [
            "Ground"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 149,
        "eggCycles": 20
    },
    {
        "id": 106,
        "name": "Hitmonlee",
        "catchRate": 45,
        "type": [
            "Fighting"
        ],
        "attack": 120,
        "levelType": "mediumfast",
        "exp": 159,
        "eggCycles": 25
    },
    {
        "id": 107,
        "name": "Hitmonchan",
        "catchRate": 45,
        "type": [
            "Fighting"
        ],
        "attack": 105,
        "levelType": "mediumfast",
        "exp": 159,
        "eggCycles": 25
    },
    {
        "id": 108,
        "name": "Lickitung",
        "catchRate": 45,
        "type": [
            "Normal"
        ],
        "attack": 60,
        "levelType": "mediumfast",
        "exp": 77,
        "eggCycles": 20,
        "evolution": ["Lickilicky"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 109,
        "name": "Koffing",
        "catchRate": 190,
        "evolution": ["Weezing"],
        "evoLevel": [35],
        "type": [
            "Poison"
        ],
        "attack": 65,
        "levelType": "mediumfast",
        "exp": 68,
        "eggCycles": 20
    },
    {
        "id": 110,
        "name": "Weezing",
        "catchRate": 60,
        "type": [
            "Poison"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 172,
        "eggCycles": 20
    },
    {
        "id": 111,
        "name": "Rhyhorn",
        "catchRate": 120,
        "evolution": ["Rhydon"],
        "evoLevel": [42],
        "type": [
            "Ground",
            "Rock"
        ],
        "attack": 85,
        "levelType": "slow",
        "exp": 69,
        "eggCycles": 20
    },
    {
        "id": 112,
        "name": "Rhydon",
        "catchRate": 60,
        "type": [
            "Ground",
            "Rock"
        ],
        "attack": 130,
        "levelType": "slow",
        "exp": 170,
        "eggCycles": 20,
        "evolution": ["Rhyperior"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 113,
        "name": "Chansey",
        "catchRate": 30,
        "evolution": ["Blissey"],
        "evoLevel": [100],
        "type": [
            "Normal"
        ],
        "attack": 35,
        "levelType": "fast",
        "exp": 395,
        "eggCycles": 40
    },
    {
        "id": 114,
        "name": "Tangela",
        "catchRate": 45,
        "type": [
            "Grass"
        ],
        "attack": 100,
        "levelType": "mediumfast",
        "exp": 87,
        "eggCycles": 20,
        "evolution": ["Tangrowth"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 115,
        "name": "Kangaskhan",
        "catchRate": 45,
        "type": [
            "Normal"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 172,
        "eggCycles": 20
    },
    {
        "id": 116,
        "name": "Horsea",
        "catchRate": 225,
        "evolution": ["Seadra"],
        "evoLevel": [32],
        "type": [
            "Water"
        ],
        "attack": 70,
        "levelType": "mediumfast",
        "exp": 59,
        "eggCycles": 20
    },
    {
        "id": 117,
        "name": "Seadra",
        "catchRate": 75,
        "evolution": ["Kingdra"],
        "evoLevel": ["Dragon_scale"],
        "type": [
            "Water"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 154,
        "eggCycles": 20
    },
    {
        "id": 118,
        "name": "Goldeen",
        "catchRate": 225,
        "evolution": ["Seaking"],
        "evoLevel": [33],
        "type": [
            "Water"
        ],
        "attack": 67,
        "levelType": "mediumfast",
        "exp": 64,
        "eggCycles": 20
    },
    {
        "id": 119,
        "name": "Seaking",
        "catchRate": 60,
        "type": [
            "Water"
        ],
        "attack": 92,
        "levelType": "mediumfast",
        "exp": 158,
        "eggCycles": 20
    },
    {
        "id": 120,
        "name": "Staryu",
        "catchRate": 225,
        "evolution": ["Starmie"],
        "evoLevel": ["Water_stone"],
        "type": [
            "Water"
        ],
        "attack": 70,
        "levelType": "slow",
        "exp": 68,
        "eggCycles": 20
    },
    {
        "id": 121,
        "name": "Starmie",
        "catchRate": 60,
        "type": [
            "Water",
            "Psychic"
        ],
        "attack": 100,
        "levelType": "slow",
        "exp": 182,
        "eggCycles": 20
    },
    {
        "id": 122,
        "name": "Mr. Mime",
        "catchRate": 45,
        "type": [
            "Psychic",
            "Fairy"
        ],
        "attack": 100,
        "levelType": "mediumfast",
        "exp": 161,
        "eggCycles": 25
    },
    {
        "id": 123,
        "name": "Scyther",
        "catchRate": 45,
        "evolution": ["Scizor"],
        "evoLevel": ["Metal_coat"],
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 110,
        "levelType": "mediumfast",
        "exp": 100,
        "eggCycles": 25
    },
    {
        "id": 124,
        "name": "Jynx",
        "catchRate": 45,
        "type": [
            "Ice",
            "Psychic"
        ],
        "attack": 115,
        "levelType": "mediumfast",
        "exp": 159,
        "eggCycles": 25
    },
    {
        "id": 125,
        "name": "Electabuzz",
        "catchRate": 45,
        "type": [
            "Electric"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 172,
        "eggCycles": 25,
        "evolution": ["Electivire"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 126,
        "name": "Magmar",
        "catchRate": 45,
        "type": [
            "Fire"
        ],
        "attack": 100,
        "levelType": "mediumfast",
        "exp": 173,
        "eggCycles": 25,
        "evolution": ["Magmortar"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 127,
        "name": "Pinsir",
        "catchRate": 45,
        "type": [
            "Bug"
        ],
        "attack": 125,
        "levelType": "slow",
        "exp": 175,
        "eggCycles": 25
    },
    {
        "id": 128,
        "name": "Tauros",
        "catchRate": 45,
        "type": [
            "Normal"
        ],
        "attack": 100,
        "levelType": "slow",
        "exp": 172,
        "eggCycles": 20
    },
    {
        "id": 129,
        "name": "Magikarp",
        "catchRate": 255,
        "evolution": ["Gyarados"],
        "evoLevel": [20],
        "type": [
            "Water"
        ],
        "attack": 15,
        "levelType": "slow",
        "exp": 40,
        "eggCycles": 5
    },
    {
        "id": 130,
        "name": "Gyarados",
        "catchRate": 45,
        "type": [
            "Water",
            "Flying"
        ],
        "attack": 125,
        "levelType": "slow",
        "exp": 189,
        "eggCycles": 5
    },
    {
        "id": 131,
        "name": "Lapras",
        "catchRate": 45,
        "type": [
            "Water",
            "Ice"
        ],
        "attack": 85,
        "levelType": "slow",
        "exp": 187,
        "eggCycles": 40
    },
    {
        "id": 132,
        "name": "Ditto",
        "catchRate": 35,
        "type": [
            "Normal"
        ],
        "attack": 48,
        "levelType": "mediumfast",
        "exp": 101,
        "eggCycles": 20
    },
    {
        "id": 133,
        "name": "Eevee",
        "catchRate": 255,
        "evolution": [
            "Vaporeon",
            "Jolteon",
            "Flareon",
            [
                "Espeon",
                "Umbreon"
            ]
        ],
        "evoLevel": [
            "Water_stone",
            "Thunder_stone",
            "Fire_stone",
            "Time_stone"
        ],
        "type": [
            "Normal"
        ],
        "attack": 55,
        "levelType": "mediumfast",
        "exp": 65,
        "eggCycles": 35
    },
    {
        "id": 134,
        "name": "Vaporeon",
        "catchRate": 45,
        "type": [
            "Water"
        ],
        "attack": 110,
        "levelType": "mediumfast",
        "exp": 184,
        "eggCycles": 35
    },
    {
        "id": 135,
        "name": "Jolteon",
        "catchRate": 45,
        "type": [
            "Electric"
        ],
        "attack": 110,
        "levelType": "mediumfast",
        "exp": 184,
        "eggCycles": 35
    },
    {
        "id": 136,
        "name": "Flareon",
        "catchRate": 45,
        "type": [
            "Fire"
        ],
        "attack": 130,
        "levelType": "mediumfast",
        "exp": 184,
        "eggCycles": 35
    },
    {
        "id": 137,
        "name": "Porygon",
        "catchRate": 45,
        "evolution": ["Porygon2"],
        "evoLevel": ["Upgrade"],
        "type": [
            "Normal"
        ],
        "attack": 85,
        "levelType": "mediumfast",
        "exp": 79,
        "eggCycles": 20
    },
    {
        "id": 138,
        "name": "Omanyte",
        "catchRate": 45,
        "evolution": ["Omastar"],
        "evoLevel": [40],
        "type": [
            "Rock",
            "Water"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 71,
        "eggCycles": 30
    },
    {
        "id": 139,
        "name": "Omastar",
        "catchRate": 45,
        "type": [
            "Rock",
            "Water"
        ],
        "attack": 115,
        "levelType": "mediumfast",
        "exp": 173,
        "eggCycles": 30
    },
    {
        "id": 140,
        "name": "Kabuto",
        "catchRate": 45,
        "evolution": ["Kabutops"],
        "evoLevel": [40],
        "type": [
            "Rock",
            "Water"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 71,
        "eggCycles": 30
    },
    {
        "id": 141,
        "name": "Kabutops",
        "catchRate": 45,
        "type": [
            "Rock",
            "Water"
        ],
        "attack": 115,
        "levelType": "mediumfast",
        "exp": 173,
        "eggCycles": 30
    },
    {
        "id": 142,
        "name": "Aerodactyl",
        "catchRate": 45,
        "type": [
            "Rock",
            "Flying"
        ],
        "attack": 105,
        "levelType": "slow",
        "exp": 180,
        "eggCycles": 35
    },
    {
        "id": 143,
        "name": "Snorlax",
        "catchRate": 25,
        "type": [
            "Normal"
        ],
        "attack": 110,
        "levelType": "slow",
        "exp": 189,
        "eggCycles": 40
    },
    {
        "id": 144,
        "name": "Articuno",
        "catchRate": 3,
        "type": [
            "Ice",
            "Flying"
        ],
        "attack": 95,
        "levelType": "slow",
        "exp": 261,
        "eggCycles": 80
    },
    {
        "id": 145,
        "name": "Zapdos",
        "catchRate": 3,
        "type": [
            "Electric",
            "Flying"
        ],
        "attack": 125,
        "levelType": "slow",
        "exp": 261,
        "eggCycles": 80
    },
    {
        "id": 146,
        "name": "Moltres",
        "catchRate": 3,
        "type": [
            "Fire",
            "Flying"
        ],
        "attack": 125,
        "levelType": "slow",
        "exp": 261,
        "eggCycles": 80
    },
    {
        "id": 147,
        "name": "Dratini",
        "catchRate": 45,
        "evolution": ["Dragonair"],
        "evoLevel": [30],
        "type": [
            "Dragon"
        ],
        "attack": 64,
        "levelType": "slow",
        "exp": 60,
        "eggCycles": 40
    },
    {
        "id": 148,
        "name": "Dragonair",
        "catchRate": 45,
        "evolution": ["Dragonite"],
        "evoLevel": [55],
        "type": [
            "Dragon"
        ],
        "attack": 84,
        "levelType": "slow",
        "exp": 147,
        "eggCycles": 40
    },
    {
        "id": 149,
        "name": "Dragonite",
        "catchRate": 45,
        "type": [
            "Dragon",
            "Flying"
        ],
        "attack": 134,
        "levelType": "slow",
        "exp": 270,
        "eggCycles": 40
    },
    {
        "id": 150,
        "name": "Mewtwo",
        "catchRate": 3,
        "type": [
            "Psychic"
        ],
        "attack": 154,
        "levelType": "slow",
        "exp": 306,
        "eggCycles": 120
    },
    {
        "id": 151,
        "name": "Mew",
        "catchRate": 45,
        "type": [
            "Psychic"
        ],
        "attack": 100,
        "levelType": "mediumslow",
        "exp": 270,
        "eggCycles": 120
    },
    {
        "id": 152,
        "name": "Chikorita",
        "catchRate": 45,
        "evolution": ["Bayleef"],
        "evoLevel": [16],
        "type": [
            "Grass"
        ],
        "attack": 65,
        "levelType": "mediumslow",
        "exp": 64,
        "eggCycles": 20
    },
    {
        "id": 153,
        "name": "Bayleef",
        "catchRate": 45,
        "evolution": ["Meganium"],
        "evoLevel": [32],
        "type": [
            "Grass"
        ],
        "attack": 80,
        "levelType": "mediumslow",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 154,
        "name": "Meganium",
        "catchRate": 45,
        "type": [
            "Grass"
        ],
        "attack": 100,
        "levelType": "mediumslow",
        "exp": 236,
        "eggCycles": 20
    },
    {
        "id": 155,
        "name": "Cyndaquil",
        "catchRate": 45,
        "evolution": ["Quilava"],
        "evoLevel": [14],
        "type": [
            "Fire"
        ],
        "attack": 52,
        "levelType": "mediumslow",
        "exp": 62,
        "eggCycles": 20
    },
    {
        "id": 156,
        "name": "Quilava",
        "catchRate": 45,
        "evolution": ["Typhlosion"],
        "evoLevel": [36],
        "type": [
            "Fire"
        ],
        "attack": 65,
        "levelType": "mediumslow",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 157,
        "name": "Typhlosion",
        "catchRate": 45,
        "type": [
            "Fire"
        ],
        "attack": 85,
        "levelType": "mediumslow",
        "exp": 240,
        "eggCycles": 20
    },
    {
        "id": 158,
        "name": "Totodile",
        "catchRate": 45,
        "evolution": ["Croconaw"],
        "evoLevel": [18],
        "type": [
            "Water"
        ],
        "attack": 65,
        "levelType": "mediumslow",
        "exp": 63,
        "eggCycles": 20
    },
    {
        "id": 159,
        "name": "Croconaw",
        "catchRate": 45,
        "evolution": ["Feraligatr"],
        "evoLevel": [30],
        "type": [
            "Water"
        ],
        "attack": 80,
        "levelType": "mediumslow",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 160,
        "name": "Feraligatr",
        "catchRate": 45,
        "type": [
            "Water"
        ],
        "attack": 105,
        "levelType": "mediumslow",
        "exp": 239,
        "eggCycles": 20
    },
    {
        "id": 161,
        "name": "Sentret",
        "catchRate": 255,
        "evolution": ["Furret"],
        "evoLevel": [15],
        "type": [
            "Normal"
        ],
        "attack": 46,
        "levelType": "mediumfast",
        "exp": 43,
        "eggCycles": 15
    },
    {
        "id": 162,
        "name": "Furret",
        "catchRate": 90,
        "type": [
            "Normal"
        ],
        "attack": 76,
        "levelType": "mediumfast",
        "exp": 145,
        "eggCycles": 15
    },
    {
        "id": 163,
        "name": "Hoothoot",
        "catchRate": 255,
        "evolution": ["Noctowl"],
        "evoLevel": [20],
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 56,
        "levelType": "mediumfast",
        "exp": 52,
        "eggCycles": 15
    },
    {
        "id": 164,
        "name": "Noctowl",
        "catchRate": 90,
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 96,
        "levelType": "mediumfast",
        "exp": 158,
        "eggCycles": 15
    },
    {
        "id": 165,
        "name": "Ledyba",
        "catchRate": 255,
        "evolution": ["Ledian"],
        "evoLevel": [18],
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 80,
        "levelType": "fast",
        "exp": 53,
        "eggCycles": 15
    },
    {
        "id": 166,
        "name": "Ledian",
        "catchRate": 90,
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 110,
        "levelType": "fast",
        "exp": 137,
        "eggCycles": 15
    },
    {
        "id": 167,
        "name": "Spinarak",
        "catchRate": 255,
        "evolution": ["Ariados"],
        "evoLevel": [22],
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 60,
        "levelType": "fast",
        "exp": 50,
        "eggCycles": 15
    },
    {
        "id": 168,
        "name": "Ariados",
        "catchRate": 90,
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 90,
        "levelType": "fast",
        "exp": 140,
        "eggCycles": 15
    },
    {
        "id": 169,
        "name": "Crobat",
        "catchRate": 90,
        "type": [
            "Poison",
            "Flying"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 241,
        "eggCycles": 15
    },
    {
        "id": 170,
        "name": "Chinchou",
        "catchRate": 190,
        "evolution": ["Lanturn"],
        "evoLevel": [27],
        "type": [
            "Water",
            "Electric"
        ],
        "attack": 56,
        "levelType": "slow",
        "exp": 66,
        "eggCycles": 20
    },
    {
        "id": 171,
        "name": "Lanturn",
        "catchRate": 75,
        "type": [
            "Water",
            "Electric"
        ],
        "attack": 76,
        "levelType": "slow",
        "exp": 161,
        "eggCycles": 20
    },
    {
        "id": 172,
        "name": "Pichu",
        "catchRate": 190,
        "evolution": ["Pikachu"],
        "evoLevel": [100],
        "type": [
            "Electric"
        ],
        "attack": 40,
        "levelType": "mediumfast",
        "exp": 41,
        "eggCycles": 10
    },
    {
        "id": 173,
        "name": "Cleffa",
        "catchRate": 150,
        "evolution": ["Clefairy"],
        "evoLevel": [100],
        "type": [
            "Fairy"
        ],
        "attack": 55,
        "levelType": "fast",
        "exp": 44,
        "eggCycles": 10
    },
    {
        "id": 174,
        "name": "Igglybuff",
        "catchRate": 170,
        "evolution": ["Jigglypuff"],
        "evoLevel": [100],
        "type": [
            "Normal",
            "Fairy"
        ],
        "attack": 30,
        "levelType": "fast",
        "exp": 42,
        "eggCycles": 10
    },
    {
        "id": 175,
        "name": "Togepi",
        "catchRate": 190,
        "evolution": ["Togetic"],
        "evoLevel": [100],
        "type": [
            "Fairy"
        ],
        "attack": 65,
        "levelType": "fast",
        "exp": 49,
        "eggCycles": 10
    },
    {
        "id": 176,
        "name": "Togetic",
        "catchRate": 75,
        "type": [
            "Fairy",
            "Flying"
        ],
        "attack": 105,
        "levelType": "fast",
        "exp": 142,
        "eggCycles": 10,
        "evolution": ["Togekiss"],
        "evoLevel": ["Shiny_stone"]
    },
    {
        "id": 177,
        "name": "Natu",
        "catchRate": 190,
        "evolution": ["Xatu"],
        "evoLevel": [25],
        "type": [
            "Psychic",
            "Flying"
        ],
        "attack": 50,
        "levelType": "mediumfast",
        "exp": 64,
        "eggCycles": 20
    },
    {
        "id": 178,
        "name": "Xatu",
        "catchRate": 75,
        "type": [
            "Psychic",
            "Flying"
        ],
        "attack": 75,
        "levelType": "mediumfast",
        "exp": 165,
        "eggCycles": 20
    },
    {
        "id": 179,
        "name": "Mareep",
        "catchRate": 235,
        "evolution": ["Flaaffy"],
        "evoLevel": [15],
        "type": [
            "Electric"
        ],
        "attack": 45,
        "levelType": "mediumslow",
        "exp": 56,
        "eggCycles": 20
    },
    {
        "id": 180,
        "name": "Flaaffy",
        "catchRate": 120,
        "evolution": ["Ampharos"],
        "evoLevel": [30],
        "type": [
            "Electric"
        ],
        "attack": 60,
        "levelType": "mediumslow",
        "exp": 128,
        "eggCycles": 20
    },
    {
        "id": 181,
        "name": "Ampharos",
        "catchRate": 45,
        "type": [
            "Electric"
        ],
        "attack": 110,
        "levelType": "mediumslow",
        "exp": 230,
        "eggCycles": 20
    },
    {
        "id": 182,
        "name": "Bellossom",
        "catchRate": 45,
        "type": [
            "Grass"
        ],
        "attack": 100,
        "levelType": "mediumslow",
        "exp": 221,
        "eggCycles": 20
    },
    {
        "id": 183,
        "name": "Marill",
        "catchRate": 190,
        "evolution": ["Azumarill"],
        "evoLevel": [18],
        "type": [
            "Water",
            "Fairy"
        ],
        "attack": 50,
        "levelType": "fast",
        "exp": 88,
        "eggCycles": 10
    },
    {
        "id": 184,
        "name": "Azumarill",
        "catchRate": 75,
        "type": [
            "Water",
            "Fairy"
        ],
        "attack": 80,
        "levelType": "fast",
        "exp": 189,
        "eggCycles": 10
    },
    {
        "id": 185,
        "name": "Sudowoodo",
        "catchRate": 65,
        "type": [
            "Rock"
        ],
        "attack": 100,
        "levelType": "mediumfast",
        "exp": 144,
        "eggCycles": 20
    },
    {
        "id": 186,
        "name": "Politoed",
        "catchRate": 45,
        "type": [
            "Water"
        ],
        "attack": 100,
        "levelType": "mediumslow",
        "exp": 225,
        "eggCycles": 20
    },
    {
        "id": 187,
        "name": "Hoppip",
        "catchRate": 255,
        "evolution": ["Skiploom"],
        "evoLevel": [18],
        "type": [
            "Grass",
            "Flying"
        ],
        "attack": 55,
        "levelType": "mediumslow",
        "exp": 50,
        "eggCycles": 20
    },
    {
        "id": 188,
        "name": "Skiploom",
        "catchRate": 120,
        "evolution": ["Jumpluff"],
        "evoLevel": [27],
        "type": [
            "Grass",
            "Flying"
        ],
        "attack": 65,
        "levelType": "mediumslow",
        "exp": 119,
        "eggCycles": 20
    },
    {
        "id": 189,
        "name": "Jumpluff",
        "catchRate": 45,
        "type": [
            "Grass",
            "Flying"
        ],
        "attack": 95,
        "levelType": "mediumslow",
        "exp": 207,
        "eggCycles": 20
    },
    {
        "id": 190,
        "name": "Aipom",
        "catchRate": 45,
        "type": [
            "Normal"
        ],
        "attack": 70,
        "levelType": "fast",
        "exp": 72,
        "eggCycles": 20,
        "evolution": ["Ambipom"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 191,
        "name": "Sunkern",
        "catchRate": 235,
        "evolution": ["Sunflora"],
        "evoLevel": ["Sun_stone"],
        "type": [
            "Grass"
        ],
        "attack": 30,
        "levelType": "mediumslow",
        "exp": 36,
        "eggCycles": 20
    },
    {
        "id": 192,
        "name": "Sunflora",
        "catchRate": 120,
        "type": [
            "Grass"
        ],
        "attack": 85,
        "levelType": "mediumslow",
        "exp": 149,
        "eggCycles": 20
    },
    {
        "id": 193,
        "name": "Yanma",
        "catchRate": 75,
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 65,
        "levelType": "mediumfast",
        "exp": 78,
        "eggCycles": 20,
        "evolution": ["Yanmega"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 194,
        "name": "Wooper",
        "catchRate": 255,
        "evolution": ["Quagsire"],
        "evoLevel": [20],
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 45,
        "levelType": "mediumfast",
        "exp": 42,
        "eggCycles": 20
    },
    {
        "id": 195,
        "name": "Quagsire",
        "catchRate": 90,
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 85,
        "levelType": "mediumfast",
        "exp": 151,
        "eggCycles": 20
    },
    {
        "id": 196,
        "name": "Espeon",
        "catchRate": 45,
        "type": [
            "Psychic"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 184,
        "eggCycles": 35
    },
    {
        "id": 197,
        "name": "Umbreon",
        "catchRate": 45,
        "type": [
            "Dark"
        ],
        "attack": 130,
        "levelType": "mediumfast",
        "exp": 184,
        "eggCycles": 35
    },
    {
        "id": 198,
        "name": "Murkrow",
        "catchRate": 30,
        "type": [
            "Dark",
            "Flying"
        ],
        "attack": 85,
        "levelType": "mediumslow",
        "exp": 81,
        "eggCycles": 20,
        "evolution": ["Honchkrow"],
        "evoLevel": ["Dusk_stone"]
    },
    {
        "id": 199,
        "name": "Slowking",
        "catchRate": 70,
        "type": [
            "Water",
            "Psychic"
        ],
        "attack": 110,
        "levelType": "mediumfast",
        "exp": 172,
        "eggCycles": 20
    },
    {
        "id": 200,
        "name": "Misdreavus",
        "catchRate": 45,
        "type": [
            "Ghost"
        ],
        "attack": 85,
        "levelType": "fast",
        "exp": 87,
        "eggCycles": 25,
        "evolution": ["Mismagius"],
        "evoLevel": ["Dusk_stone"]
    },
    {
        "id": 201,
        "name": "Unown",
        "catchRate": 225,
        "type": [
            "Psychic"
        ],
        "attack": 72,
        "levelType": "mediumfast",
        "exp": 118,
        "eggCycles": 40
    },
    {
        "id": 202,
        "name": "Wobbuffet",
        "catchRate": 45,
        "type": [
            "Psychic"
        ],
        "attack": 58,
        "levelType": "mediumfast",
        "exp": 142,
        "eggCycles": 20
    },
    {
        "id": 203,
        "name": "Girafarig",
        "catchRate": 60,
        "type": [
            "Normal",
            "Psychic"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 159,
        "eggCycles": 20
    },
    {
        "id": 204,
        "name": "Pineco",
        "catchRate": 190,
        "evolution": ["Forretress"],
        "evoLevel": [31],
        "type": [
            "Bug"
        ],
        "attack": 65,
        "levelType": "mediumfast",
        "exp": 58,
        "eggCycles": 20
    },
    {
        "id": 205,
        "name": "Forretress",
        "catchRate": 75,
        "type": [
            "Bug",
            "Steel"
        ],
        "attack": 90,
        "levelType": "mediumfast",
        "exp": 163,
        "eggCycles": 20
    },
    {
        "id": 206,
        "name": "Dunsparce",
        "catchRate": 190,
        "type": [
            "Normal"
        ],
        "attack": 70,
        "levelType": "mediumfast",
        "exp": 145,
        "eggCycles": 20
    },
    {
        "id": 207,
        "name": "Gligar",
        "catchRate": 60,
        "type": [
            "Ground",
            "Flying"
        ],
        "attack": 75,
        "levelType": "mediumslow",
        "exp": 86,
        "eggCycles": 20,
        "evolution": ["Gliscor"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 208,
        "name": "Steelix",
        "catchRate": 25,
        "type": [
            "Steel",
            "Ground"
        ],
        "attack": 125,
        "levelType": "mediumfast",
        "exp": 179,
        "eggCycles": 25
    },
    {
        "id": 209,
        "name": "Snubbull",
        "catchRate": 190,
        "evolution": ["Granbull"],
        "evoLevel": [23],
        "type": [
            "Fairy"
        ],
        "attack": 80,
        "levelType": "fast",
        "exp": 60,
        "eggCycles": 20
    },
    {
        "id": 210,
        "name": "Granbull",
        "catchRate": 75,
        "type": [
            "Fairy"
        ],
        "attack": 120,
        "levelType": "fast",
        "exp": 158,
        "eggCycles": 20
    },
    {
        "id": 211,
        "name": "Qwilfish",
        "catchRate": 45,
        "type": [
            "Water",
            "Poison"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 88,
        "eggCycles": 20
    },
    {
        "id": 212,
        "name": "Scizor",
        "catchRate": 25,
        "type": [
            "Bug",
            "Steel"
        ],
        "attack": 150,
        "levelType": "mediumfast",
        "exp": 175,
        "eggCycles": 25
    },
    {
        "id": 213,
        "name": "Shuckle",
        "catchRate": 190,
        "type": [
            "Bug",
            "Rock"
        ],
        "attack": 230,
        "levelType": "mediumslow",
        "exp": 177,
        "eggCycles": 20
    },
    {
        "id": 214,
        "name": "Heracross",
        "catchRate": 45,
        "type": [
            "Bug",
            "Fighting"
        ],
        "attack": 185,
        "levelType": "slow",
        "exp": 175,
        "eggCycles": 25
    },
    {
        "id": 215,
        "name": "Sneasel",
        "catchRate": 60,
        "type": [
            "Dark",
            "Ice"
        ],
        "attack": 95,
        "levelType": "mediumslow",
        "exp": 86,
        "eggCycles": 20,
        "evolution": ["Weavile"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 216,
        "name": "Teddiursa",
        "catchRate": 120,
        "evolution": ["Ursaring"],
        "evoLevel": [30],
        "type": [
            "Normal"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 66,
        "eggCycles": 20
    },
    {
        "id": 217,
        "name": "Ursaring",
        "catchRate": 60,
        "type": [
            "Normal"
        ],
        "attack": 130,
        "levelType": "mediumfast",
        "exp": 175,
        "eggCycles": 20
    },
    {
        "id": 218,
        "name": "Slugma",
        "catchRate": 190,
        "evolution": ["Magcargo"],
        "evoLevel": [38],
        "type": [
            "Fire"
        ],
        "attack": 40,
        "levelType": "mediumfast",
        "exp": 50,
        "eggCycles": 20
    },
    {
        "id": 219,
        "name": "Magcargo",
        "catchRate": 75,
        "type": [
            "Fire",
            "Rock"
        ],
        "attack": 80,
        "levelType": "mediumfast",
        "exp": 151,
        "eggCycles": 20
    },
    {
        "id": 220,
        "name": "Swinub",
        "catchRate": 225,
        "evolution": ["Piloswine"],
        "evoLevel": [33],
        "type": [
            "Ice",
            "Ground"
        ],
        "attack": 50,
        "levelType": "slow",
        "exp": 50,
        "eggCycles": 20
    },
    {
        "id": 221,
        "name": "Piloswine",
        "catchRate": 75,
        "type": [
            "Ice",
            "Ground"
        ],
        "attack": 100,
        "levelType": "slow",
        "exp": 158,
        "eggCycles": 20,
        "evolution": ["Mamoswine"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 222,
        "name": "Corsola",
        "catchRate": 60,
        "type": [
            "Water",
            "Rock"
        ],
        "attack": 95,
        "levelType": "fast",
        "exp": 144,
        "eggCycles": 20
    },
    {
        "id": 223,
        "name": "Remoraid",
        "catchRate": 190,
        "evolution": ["Octillery"],
        "evoLevel": [25],
        "type": [
            "Water"
        ],
        "attack": 65,
        "levelType": "mediumfast",
        "exp": 60,
        "eggCycles": 20
    },
    {
        "id": 224,
        "name": "Octillery",
        "catchRate": 75,
        "type": [
            "Water"
        ],
        "attack": 105,
        "levelType": "mediumfast",
        "exp": 168,
        "eggCycles": 20
    },
    {
        "id": 225,
        "name": "Delibird",
        "catchRate": 45,
        "type": [
            "Ice",
            "Flying"
        ],
        "attack": 55,
        "levelType": "fast",
        "exp": 116,
        "eggCycles": 20
    },
    {
        "id": 226,
        "name": "Mantine",
        "catchRate": 25,
        "type": [
            "Water",
            "Flying"
        ],
        "attack": 140,
        "levelType": "slow",
        "exp": 170,
        "eggCycles": 25
    },
    {
        "id": 227,
        "name": "Skarmory",
        "catchRate": 25,
        "type": [
            "Steel",
            "Flying"
        ],
        "attack": 80,
        "levelType": "slow",
        "exp": 163,
        "eggCycles": 25
    },
    {
        "id": 228,
        "name": "Houndour",
        "catchRate": 120,
        "evolution": ["Houndoom"],
        "evoLevel": [24],
        "type": [
            "Dark",
            "Fire"
        ],
        "attack": 60,
        "levelType": "slow",
        "exp": 66,
        "eggCycles": 20
    },
    {
        "id": 229,
        "name": "Houndoom",
        "catchRate": 45,
        "type": [
            "Dark",
            "Fire"
        ],
        "attack": 90,
        "levelType": "slow",
        "exp": 175,
        "eggCycles": 20
    },
    {
        "id": 230,
        "name": "Kingdra",
        "catchRate": 45,
        "type": [
            "Water",
            "Dragon"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 243,
        "eggCycles": 20
    },
    {
        "id": 231,
        "name": "Phanpy",
        "catchRate": 120,
        "evolution": ["Donphan"],
        "evoLevel": [25],
        "type": [
            "Ground"
        ],
        "attack": 60,
        "levelType": "mediumfast",
        "exp": 66,
        "eggCycles": 20
    },
    {
        "id": 232,
        "name": "Donphan",
        "catchRate": 60,
        "type": [
            "Ground"
        ],
        "attack": 120,
        "levelType": "mediumfast",
        "exp": 175,
        "eggCycles": 20
    },
    {
        "id": 233,
        "name": "Porygon2",
        "catchRate": 45,
        "type": [
            "Normal"
        ],
        "attack": 95,
        "levelType": "mediumfast",
        "exp": 180,
        "eggCycles": 20,
        "evolution": ["Porygon-Z"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 234,
        "name": "Stantler",
        "catchRate": 45,
        "type": [
            "Normal"
        ],
        "attack": 95,
        "levelType": "slow",
        "exp": 163,
        "eggCycles": 20
    },
    {
        "id": 235,
        "name": "Smeargle",
        "catchRate": 45,
        "type": [
            "Normal"
        ],
        "attack": 45,
        "levelType": "fast",
        "exp": 88,
        "eggCycles": 20
    },
    {
        "id": 236,
        "name": "Tyrogue",
        "catchRate": 75,
        "evolution": [
            [
                "Hitmonlee",
                "Hitmonchan",
                "Hitmontop"
            ]
        ],
        "evoLevel": [
            20
        ],
        "type": [
            "Fighting"
        ],
        "attack": 35,
        "levelType": "mediumfast",
        "exp": 42,
        "eggCycles": 25
    },
    {
        "id": 237,
        "name": "Hitmontop",
        "catchRate": 45,
        "type": [
            "Fighting"
        ],
        "attack": 110,
        "levelType": "mediumfast",
        "exp": 159,
        "eggCycles": 25
    },
    {
        "id": 238,
        "name": "Smoochum",
        "catchRate": 45,
        "evolution": ["Jynx"],
        "evoLevel": [30],
        "type": [
            "Ice",
            "Psychic"
        ],
        "attack": 65,
        "levelType": "mediumfast",
        "exp": 61,
        "eggCycles": 25
    },
    {
        "id": 239,
        "name": "Elekid",
        "catchRate": 45,
        "evolution": ["Electabuzz"],
        "evoLevel": [30],
        "type": [
            "Electric"
        ],
        "attack": 63,
        "levelType": "mediumfast",
        "exp": 72,
        "eggCycles": 25
    },
    {
        "id": 240,
        "name": "Magby",
        "catchRate": 45,
        "evolution": ["Magmar"],
        "evoLevel": [30],
        "type": [
            "Fire"
        ],
        "attack": 75,
        "levelType": "mediumfast",
        "exp": 73,
        "eggCycles": 25
    },
    {
        "id": 241,
        "name": "Miltank",
        "catchRate": 45,
        "type": [
            "Normal"
        ],
        "attack": 80,
        "levelType": "slow",
        "exp": 172,
        "eggCycles": 20
    },
    {
        "id": 242,
        "name": "Blissey",
        "catchRate": 30,
        "type": [
            "Normal"
        ],
        "attack": 135,
        "levelType": "fast",
        "exp": 608,
        "eggCycles": 40
    },
    {
        "id": 243,
        "name": "Raikou",
        "catchRate": 3,
        "type": [
            "Electric"
        ],
        "attack": 100,
        "levelType": "slow",
        "exp": 261,
        "eggCycles": 80
    },
    {
        "id": 244,
        "name": "Entei",
        "catchRate": 3,
        "type": [
            "Fire"
        ],
        "attack": 115,
        "levelType": "slow",
        "exp": 261,
        "eggCycles": 80
    },
    {
        "id": 245,
        "name": "Suicune",
        "catchRate": 3,
        "type": [
            "Water"
        ],
        "attack": 115,
        "levelType": "slow",
        "exp": 261,
        "eggCycles": 80
    },
    {
        "id": 246,
        "name": "Larvitar",
        "catchRate": 45,
        "evolution": ["Pupitar"],
        "evoLevel": [30],
        "type": [
            "Rock",
            "Ground"
        ],
        "attack": 64,
        "levelType": "slow",
        "exp": 60,
        "eggCycles": 40
    },
    {
        "id": 247,
        "name": "Pupitar",
        "catchRate": 45,
        "evolution": ["Tyranitar"],
        "evoLevel": [55],
        "type": [
            "Rock",
            "Ground"
        ],
        "attack": 84,
        "levelType": "slow",
        "exp": 144,
        "eggCycles": 40
    },
    {
        "id": 248,
        "name": "Tyranitar",
        "catchRate": 45,
        "type": [
            "Rock",
            "Dark"
        ],
        "attack": 164,
        "levelType": "slow",
        "exp": 270,
        "eggCycles": 40
    },
    {
        "id": 249,
        "name": "Lugia",
        "catchRate": 3,
        "type": [
            "Psychic",
            "Flying"
        ],
        "attack": 154,
        "levelType": "slow",
        "exp": 306,
        "eggCycles": 120
    },
    {
        "id": 250,
        "name": "Ho-Oh",
        "catchRate": 3,
        "type": [
            "Fire",
            "Flying"
        ],
        "attack": 154,
        "levelType": "slow",
        "exp": 306,
        "eggCycles": 120
    },
    {
        "id": 251,
        "name": "Celebi",
        "catchRate": 45,
        "type": [
            "Psychic",
            "Grass"
        ],
        "attack": 100,
        "levelType": "mediumslow",
        "exp": 270,
        "eggCycles": 120
    },
    {
        "id": 252,
        "name": "Treecko",
        "type": [
            "Grass"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 62,
        "catchRate": 45,
        "evolution": ["Grovyle"],
        "evoLevel": [16]
    },
    {
        "id": 253,
        "name": "Grovyle",
        "type": [
            "Grass"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 45,
        "evolution": ["Sceptile"],
        "evoLevel": [36]
    },
    {
        "id": 254,
        "name": "Sceptile",
        "type": [
            "Grass"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 255,
        "name": "Torchic",
        "type": [
            "Fire"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 62,
        "catchRate": 45,
        "evolution": ["Combusken"],
        "evoLevel": [16]
    },
    {
        "id": 256,
        "name": "Combusken",
        "type": [
            "Fire",
            "Fighting"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 45,
        "evolution": ["Blaziken"],
        "evoLevel": [36]
    },
    {
        "id": 257,
        "name": "Blaziken",
        "type": [
            "Fire",
            "Fighting"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 258,
        "name": "Mudkip",
        "type": [
            "Water"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 62,
        "catchRate": 45,
        "evolution": ["Marshtomp"],
        "evoLevel": [16]
    },
    {
        "id": 259,
        "name": "Marshtomp",
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 45,
        "evolution": ["Swampert"],
        "evoLevel": [36]
    },
    {
        "id": 260,
        "name": "Swampert",
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 241,
        "catchRate": 45
    },
    {
        "id": 261,
        "name": "Poochyena",
        "type": [
            "Dark"
        ],
        "attack": 55,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 56,
        "catchRate": 255,
        "evolution": ["Mightyena"],
        "evoLevel": [18]
    },
    {
        "id": 262,
        "name": "Mightyena",
        "type": [
            "Dark"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 147,
        "catchRate": 127
    },
    {
        "id": 263,
        "name": "Zigzagoon",
        "type": [
            "Normal"
        ],
        "attack": 60,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 56,
        "catchRate": 255,
        "evolution": ["Linoone"],
        "evoLevel": [20]
    },
    {
        "id": 264,
        "name": "Linoone",
        "type": [
            "Normal"
        ],
        "attack": 100,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 147,
        "catchRate": 90,
        "evolution": ["Obstagoon"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 265,
        "name": "Wurmple",
        "type": [
            "Bug"
        ],
        "attack": 45,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 56,
        "catchRate": 255,
        "evolution": [
            [
                "Silcoon",
                "Cascoon"
            ]
        ],
        "evoLevel": [7]
    },
    {
        "id": 266,
        "name": "Silcoon",
        "type": [
            "Bug"
        ],
        "attack": 55,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 72,
        "catchRate": 120,
        "evolution": ["Beautifly"],
        "evoLevel": [10]
    },
    {
        "id": 267,
        "name": "Beautifly",
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 100,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 178,
        "catchRate": 45
    },
    {
        "id": 268,
        "name": "Cascoon",
        "type": [
            "Bug"
        ],
        "attack": 55,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 72,
        "catchRate": 120
    },
    {
        "id": 269,
        "name": "Dustox",
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 45
    },
    {
        "id": 270,
        "name": "Lotad",
        "type": [
            "Water",
            "Grass"
        ],
        "attack": 50,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 44,
        "catchRate": 255,
        "evolution": ["Lombre"],
        "evoLevel": [14]
    },
    {
        "id": 271,
        "name": "Lombre",
        "type": [
            "Water",
            "Grass"
        ],
        "attack": 70,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 119,
        "catchRate": 120,
        "evolution": ["Ludicolo"],
        "evoLevel": ["Water_stone"]
    },
    {
        "id": 272,
        "name": "Ludicolo",
        "type": [
            "Water",
            "Grass"
        ],
        "attack": 100,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 216,
        "catchRate": 45
    },
    {
        "id": 273,
        "name": "Seedot",
        "type": [
            "Grass"
        ],
        "attack": 50,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 44,
        "catchRate": 255,
        "evolution": ["Nuzleaf"],
        "evoLevel": [14]
    },
    {
        "id": 274,
        "name": "Nuzleaf",
        "type": [
            "Grass",
            "Dark"
        ],
        "attack": 70,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 119,
        "catchRate": 120,
        "evolution": ["Shiftry"],
        "evoLevel": ["Leaf_stone"]
    },
    {
        "id": 275,
        "name": "Shiftry",
        "type": [
            "Grass",
            "Dark"
        ],
        "attack": 100,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 216,
        "catchRate": 45
    },
    {
        "id": 276,
        "name": "Taillow",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 54,
        "catchRate": 200,
        "evolution": ["Swellow"],
        "evoLevel": [22]
    },
    {
        "id": 277,
        "name": "Swellow",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 125,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 159,
        "catchRate": 45
    },
    {
        "id": 278,
        "name": "Wingull",
        "type": [
            "Water",
            "Flying"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 54,
        "catchRate": 190,
        "evolution": ["Pelipper"],
        "evoLevel": [25]
    },
    {
        "id": 279,
        "name": "Pelipper",
        "type": [
            "Water",
            "Flying"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 154,
        "catchRate": 45
    },
    {
        "id": 280,
        "name": "Ralts",
        "type": [
            "Psychic",
            "Fairy"
        ],
        "attack": 45,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 40,
        "catchRate": 235,
        "evolution": ["Kirlia"],
        "evoLevel": [20]
    },
    {
        "id": 281,
        "name": "Kirlia",
        "type": [
            "Psychic",
            "Fairy"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 97,
        "catchRate": 120,
        "evolution": ["Gardevoir"],
        "evoLevel": [30]
    },
    {
        "id": 282,
        "name": "Gardevoir",
        "type": [
            "Psychic",
            "Fairy"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 233,
        "catchRate": 45
    },
    {
        "id": 283,
        "name": "Surskit",
        "type": [
            "Bug",
            "Water"
        ],
        "attack": 65,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 54,
        "catchRate": 200,
        "evolution": ["Masquerain"],
        "evoLevel": [22]
    },
    {
        "id": 284,
        "name": "Masquerain",
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 100,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 159,
        "catchRate": 75
    },
    {
        "id": 285,
        "name": "Shroomish",
        "type": [
            "Grass"
        ],
        "attack": 60,
        "eggCycles": 15,
        "levelType": "fluctuating",
        "exp": 59,
        "catchRate": 255,
        "evolution": ["Breloom"],
        "evoLevel": [23]
    },
    {
        "id": 286,
        "name": "Breloom",
        "type": [
            "Grass",
            "Fighting"
        ],
        "attack": 130,
        "eggCycles": 15,
        "levelType": "fluctuating",
        "exp": 161,
        "catchRate": 90
    },
    {
        "id": 287,
        "name": "Slakoth",
        "type": [
            "Normal"
        ],
        "attack": 60,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": 56,
        "catchRate": 255,
        "evolution": ["Vigoroth"],
        "evoLevel": [18]
    },
    {
        "id": 288,
        "name": "Vigoroth",
        "type": [
            "Normal"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": 154,
        "catchRate": 120,
        "evolution": ["Slaking"],
        "evoLevel": [36]
    },
    {
        "id": 289,
        "name": "Slaking",
        "type": [
            "Normal"
        ],
        "attack": 160,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": 252,
        "catchRate": 45
    },
    {
        "id": 290,
        "name": "Nincada",
        "type": [
            "Bug",
            "Ground"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "erratic",
        "exp": 53,
        "catchRate": 255,
        "evolution": ["Ninjask"],
        "evoLevel": [20]
    },
    {
        "id": 291,
        "name": "Ninjask",
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 160,
        "eggCycles": 15,
        "levelType": "erratic",
        "exp": 160,
        "catchRate": 120
    },
    {
        "id": 292,
        "name": "Shedinja",
        "type": [
            "Bug",
            "Ghost"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "erratic",
        "exp": 83,
        "catchRate": 45
    },
    {
        "id": 293,
        "name": "Whismur",
        "type": [
            "Normal"
        ],
        "attack": 64,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 48,
        "catchRate": 190,
        "evolution": ["Loudred"],
        "evoLevel": [20]
    },
    {
        "id": 294,
        "name": "Loudred",
        "type": [
            "Normal"
        ],
        "attack": 84,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 126,
        "catchRate": 120,
        "evolution": ["Exploud"],
        "evoLevel": [40]
    },
    {
        "id": 295,
        "name": "Exploud",
        "type": [
            "Normal"
        ],
        "attack": 104,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 221,
        "catchRate": 45
    },
    {
        "id": 296,
        "name": "Makuhita",
        "type": [
            "Fighting"
        ],
        "attack": 72,
        "eggCycles": 20,
        "levelType": "fluctuating",
        "exp": 47,
        "catchRate": 180,
        "evolution": ["Hariyama"],
        "evoLevel": [24]
    },
    {
        "id": 297,
        "name": "Hariyama",
        "type": [
            "Fighting"
        ],
        "attack": 144,
        "eggCycles": 20,
        "levelType": "fluctuating",
        "exp": 166,
        "catchRate": 200
    },
    {
        "id": 298,
        "name": "Azurill",
        "type": [
            "Normal",
            "Fairy"
        ],
        "attack": 50,
        "eggCycles": 10,
        "levelType": "fast",
        "exp": 38,
        "catchRate": 150,
        "evolution": ["Marill"],
        "evoLevel": [100]
    },
    {
        "id": 299,
        "name": "Nosepass",
        "type": [
            "Rock"
        ],
        "attack": 135,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 75,
        "catchRate": 255,
        "evolution": ["Probopass"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 300,
        "name": "Skitty",
        "type": [
            "Normal"
        ],
        "attack": 50,
        "eggCycles": 15,
        "levelType": "fast",
        "exp": 52,
        "catchRate": 255,
        "evolution": ["Delcatty"],
        "evoLevel": ["Moon_stone"]
    },
    {
        "id": 301,
        "name": "Delcatty",
        "type": [
            "Normal"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "fast",
        "exp": 140,
        "catchRate": 60
    },
    {
        "id": 302,
        "name": "Sableye",
        "type": [
            "Dark",
            "Ghost"
        ],
        "attack": 75,
        "eggCycles": 25,
        "levelType": "mediumslow",
        "exp": 133,
        "catchRate": 45
    },
    {
        "id": 303,
        "name": "Mawile",
        "type": [
            "Steel",
            "Fairy"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 133,
        "catchRate": 45
    },
    {
        "id": 304,
        "name": "Aron",
        "type": [
            "Steel",
            "Rock"
        ],
        "attack": 100,
        "eggCycles": 35,
        "levelType": "slow",
        "exp": 66,
        "catchRate": 180,
        "evolution": ["Lairon"],
        "evoLevel": [32]
    },
    {
        "id": 305,
        "name": "Lairon",
        "type": [
            "Steel",
            "Rock"
        ],
        "attack": 140,
        "eggCycles": 35,
        "levelType": "slow",
        "exp": 151,
        "catchRate": 90,
        "evolution": ["Aggron"],
        "evoLevel": [42]
    },
    {
        "id": 306,
        "name": "Aggron",
        "type": [
            "Steel",
            "Rock"
        ],
        "attack": 180,
        "eggCycles": 35,
        "levelType": "slow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 307,
        "name": "Meditite",
        "type": [
            "Fighting",
            "Psychic"
        ],
        "attack": 60,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 56,
        "catchRate": 180,
        "evolution": ["Medicham"],
        "evoLevel": [37]
    },
    {
        "id": 308,
        "name": "Medicham",
        "type": [
            "Fighting",
            "Psychic"
        ],
        "attack": 80,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 144,
        "catchRate": 90
    },
    {
        "id": 309,
        "name": "Electrike",
        "type": [
            "Electric"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 59,
        "catchRate": 120,
        "evolution": ["Manectric"],
        "evoLevel": [26]
    },
    {
        "id": 310,
        "name": "Manectric",
        "type": [
            "Electric"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 166,
        "catchRate": 45
    },
    {
        "id": 311,
        "name": "Plusle",
        "type": [
            "Electric"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 142,
        "catchRate": 200
    },
    {
        "id": 312,
        "name": "Minun",
        "type": [
            "Electric"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 142,
        "catchRate": 200
    },
    {
        "id": 313,
        "name": "Volbeat",
        "type": [
            "Bug"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "erratic",
        "exp": 151,
        "catchRate": 150
    },
    {
        "id": 314,
        "name": "Illumise",
        "type": [
            "Bug"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "fluctuating",
        "exp": 151,
        "catchRate": 150
    },
    {
        "id": 315,
        "name": "Roselia",
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 140,
        "catchRate": 150,
        "evolution": ["Roserade"],
        "evoLevel": ["Shiny_stone"]
    },
    {
        "id": 316,
        "name": "Gulpin",
        "type": [
            "Poison"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "fluctuating",
        "exp": 60,
        "catchRate": 225,
        "evolution": ["Swalot"],
        "evoLevel": [26]
    },
    {
        "id": 317,
        "name": "Swalot",
        "type": [
            "Poison"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "fluctuating",
        "exp": 163,
        "catchRate": 75
    },
    {
        "id": 318,
        "name": "Carvanha",
        "type": [
            "Water",
            "Dark"
        ],
        "attack": 90,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 61,
        "catchRate": 225,
        "evolution": ["Sharpedo"],
        "evoLevel": [30]
    },
    {
        "id": 319,
        "name": "Sharpedo",
        "type": [
            "Water",
            "Dark"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 161,
        "catchRate": 60
    },
    {
        "id": 320,
        "name": "Wailmer",
        "type": [
            "Water"
        ],
        "attack": 130,
        "eggCycles": 40,
        "levelType": "fluctuating",
        "exp": 80,
        "catchRate": 125,
        "evolution": ["Wailord"],
        "evoLevel": [40]
    },
    {
        "id": 321,
        "name": "Wailord",
        "type": [
            "Water"
        ],
        "attack": 170,
        "eggCycles": 40,
        "levelType": "fluctuating",
        "exp": 175,
        "catchRate": 60
    },
    {
        "id": 322,
        "name": "Numel",
        "type": [
            "Fire",
            "Ground"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 255,
        "evolution": ["Camerupt"],
        "evoLevel": [33]
    },
    {
        "id": 323,
        "name": "Camerupt",
        "type": [
            "Fire",
            "Ground"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 161,
        "catchRate": 150
    },
    {
        "id": 324,
        "name": "Torkoal",
        "type": [
            "Fire"
        ],
        "attack": 140,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 165,
        "catchRate": 90
    },
    {
        "id": 325,
        "name": "Spoink",
        "type": [
            "Psychic"
        ],
        "attack": 80,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 66,
        "catchRate": 255,
        "evolution": ["Grumpig"],
        "evoLevel": [32]
    },
    {
        "id": 326,
        "name": "Grumpig",
        "type": [
            "Psychic"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 165,
        "catchRate": 60
    },
    {
        "id": 327,
        "name": "Spinda",
        "type": [
            "Normal"
        ],
        "attack": 60,
        "eggCycles": 15,
        "levelType": "fast",
        "exp": 126,
        "catchRate": 255
    },
    {
        "id": 328,
        "name": "Trapinch",
        "type": [
            "Ground"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 58,
        "catchRate": 255,
        "evolution": ["Vibrava"],
        "evoLevel": [35]
    },
    {
        "id": 329,
        "name": "Vibrava",
        "type": [
            "Ground",
            "Dragon"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 119,
        "catchRate": 120,
        "evolution": ["Flygon"],
        "evoLevel": [45]
    },
    {
        "id": 330,
        "name": "Flygon",
        "type": [
            "Ground",
            "Dragon"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 234,
        "catchRate": 45
    },
    {
        "id": 331,
        "name": "Cacnea",
        "type": [
            "Grass"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 67,
        "catchRate": 190,
        "evolution": ["Cacturne"],
        "evoLevel": [32]
    },
    {
        "id": 332,
        "name": "Cacturne",
        "type": [
            "Grass",
            "Dark"
        ],
        "attack": 115,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 166,
        "catchRate": 60
    },
    {
        "id": 333,
        "name": "Swablu",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 75,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 62,
        "catchRate": 255,
        "evolution": ["Altaria"],
        "evoLevel": [35]
    },
    {
        "id": 334,
        "name": "Altaria",
        "type": [
            "Dragon",
            "Flying"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 172,
        "catchRate": 45
    },
    {
        "id": 335,
        "name": "Zangoose",
        "type": [
            "Normal"
        ],
        "attack": 115,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 160,
        "catchRate": 90
    },
    {
        "id": 336,
        "name": "Seviper",
        "type": [
            "Poison"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "fluctuating",
        "exp": 160,
        "catchRate": 90
    },
    {
        "id": 337,
        "name": "Lunatone",
        "type": [
            "Rock",
            "Psychic"
        ],
        "attack": 95,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 161,
        "catchRate": 45
    },
    {
        "id": 338,
        "name": "Solrock",
        "type": [
            "Rock",
            "Psychic"
        ],
        "attack": 95,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 161,
        "catchRate": 45
    },
    {
        "id": 339,
        "name": "Barboach",
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 60,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 58,
        "catchRate": 190,
        "evolution": ["Whiscash"],
        "evoLevel": [30]
    },
    {
        "id": 340,
        "name": "Whiscash",
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 164,
        "catchRate": 75
    },
    {
        "id": 341,
        "name": "Corphish",
        "type": [
            "Water"
        ],
        "attack": 80,
        "eggCycles": 15,
        "levelType": "fluctuating",
        "exp": 62,
        "catchRate": 205,
        "evolution": ["Crawdaunt"],
        "evoLevel": [30]
    },
    {
        "id": 342,
        "name": "Crawdaunt",
        "type": [
            "Water",
            "Dark"
        ],
        "attack": 120,
        "eggCycles": 15,
        "levelType": "fluctuating",
        "exp": 164,
        "catchRate": 155
    },
    {
        "id": 343,
        "name": "Baltoy",
        "type": [
            "Ground",
            "Psychic"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 60,
        "catchRate": 255,
        "evolution": ["Claydol"],
        "evoLevel": [36]
    },
    {
        "id": 344,
        "name": "Claydol",
        "type": [
            "Ground",
            "Psychic"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 175,
        "catchRate": 90
    },
    {
        "id": 345,
        "name": "Lileep",
        "type": [
            "Rock",
            "Grass"
        ],
        "attack": 87,
        "eggCycles": 30,
        "levelType": "erratic",
        "exp": 71,
        "catchRate": 45,
        "evolution": ["Cradily"],
        "evoLevel": [40]
    },
    {
        "id": 346,
        "name": "Cradily",
        "type": [
            "Rock",
            "Grass"
        ],
        "attack": 107,
        "eggCycles": 30,
        "levelType": "erratic",
        "exp": 173,
        "catchRate": 45
    },
    {
        "id": 347,
        "name": "Anorith",
        "type": [
            "Rock",
            "Bug"
        ],
        "attack": 95,
        "eggCycles": 30,
        "levelType": "erratic",
        "exp": 71,
        "catchRate": 45,
        "evolution": ["Armaldo"],
        "evoLevel": [40]
    },
    {
        "id": 348,
        "name": "Armaldo",
        "type": [
            "Rock",
            "Bug"
        ],
        "attack": 125,
        "eggCycles": 30,
        "levelType": "erratic",
        "exp": 173,
        "catchRate": 45
    },
    {
        "id": 349,
        "name": "Feebas",
        "type": [
            "Water"
        ],
        "attack": 80,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 40,
        "catchRate": 255,
        "evolution": ["Milotic"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 350,
        "name": "Milotic",
        "type": [
            "Water"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 189,
        "catchRate": 60
    },
    {
        "id": 351,
        "name": "Castform",
        "type": [
            "Normal"
        ],
        "attack": 70,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 147,
        "catchRate": 45
    },
    {
        "id": 352,
        "name": "Kecleon",
        "type": [
            "Normal"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 154,
        "catchRate": 200
    },
    {
        "id": 353,
        "name": "Shuppet",
        "type": [
            "Ghost"
        ],
        "attack": 75,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 59,
        "catchRate": 225,
        "evolution": ["Banette"],
        "evoLevel": [37]
    },
    {
        "id": 354,
        "name": "Banette",
        "type": [
            "Ghost"
        ],
        "attack": 115,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 159,
        "catchRate": 45
    },
    {
        "id": 355,
        "name": "Duskull",
        "type": [
            "Ghost"
        ],
        "attack": 90,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 59,
        "catchRate": 190,
        "evolution": ["Dusclops"],
        "evoLevel": [37]
    },
    {
        "id": 356,
        "name": "Dusclops",
        "type": [
            "Ghost"
        ],
        "attack": 130,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 159,
        "catchRate": 90,
        "evolution": ["Dusknoir"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 357,
        "name": "Tropius",
        "type": [
            "Grass",
            "Flying"
        ],
        "attack": 99,
        "eggCycles": 25,
        "levelType": "slow",
        "exp": 161,
        "catchRate": 200
    },
    {
        "id": 358,
        "name": "Chimecho",
        "type": [
            "Psychic"
        ],
        "attack": 95,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 159,
        "catchRate": 45
    },
    {
        "id": 359,
        "name": "Absol",
        "type": [
            "Dark"
        ],
        "attack": 130,
        "eggCycles": 25,
        "levelType": "mediumslow",
        "exp": 163,
        "catchRate": 30
    },
    {
        "id": 360,
        "name": "Wynaut",
        "type": [
            "Psychic"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 52,
        "catchRate": 125,
        "evolution": ["Wobbuffet"],
        "evoLevel": [15]
    },
    {
        "id": 361,
        "name": "Snorunt",
        "type": [
            "Ice"
        ],
        "attack": 50,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 60,
        "catchRate": 190,
        "evolution": ["Glalie"],
        "evoLevel": [42]
    },
    {
        "id": 362,
        "name": "Glalie",
        "type": [
            "Ice"
        ],
        "attack": 80,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 75
    },
    {
        "id": 363,
        "name": "Spheal",
        "type": [
            "Ice",
            "Water"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 58,
        "catchRate": 255,
        "evolution": ["Sealeo"],
        "evoLevel": [32]
    },
    {
        "id": 364,
        "name": "Sealeo",
        "type": [
            "Ice",
            "Water"
        ],
        "attack": 90,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 144,
        "catchRate": 120,
        "evolution": ["Walrein"],
        "evoLevel": [44]
    },
    {
        "id": 365,
        "name": "Walrein",
        "type": [
            "Ice",
            "Water"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 366,
        "name": "Clamperl",
        "type": [
            "Water"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 69,
        "catchRate": 255,
        "evolution": ["Huntail"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 367,
        "name": "Huntail",
        "type": [
            "Water"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 170,
        "catchRate": 60
    },
    {
        "id": 368,
        "name": "Gorebyss",
        "type": [
            "Water"
        ],
        "attack": 114,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 170,
        "catchRate": 60
    },
    {
        "id": 369,
        "name": "Relicanth",
        "type": [
            "Water",
            "Rock"
        ],
        "attack": 130,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 170,
        "catchRate": 25
    },
    {
        "id": 370,
        "name": "Luvdisc",
        "type": [
            "Water"
        ],
        "attack": 97,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 116,
        "catchRate": 225
    },
    {
        "id": 371,
        "name": "Bagon",
        "type": [
            "Dragon"
        ],
        "attack": 75,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 60,
        "catchRate": 45,
        "evolution": ["Shelgon"],
        "evoLevel": [30]
    },
    {
        "id": 372,
        "name": "Shelgon",
        "type": [
            "Dragon"
        ],
        "attack": 100,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 147,
        "catchRate": 45,
        "evolution": ["Salamence"],
        "evoLevel": [50]
    },
    {
        "id": 373,
        "name": "Salamence",
        "type": [
            "Dragon",
            "Flying"
        ],
        "attack": 135,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 45
    },
    {
        "id": 374,
        "name": "Beldum",
        "type": [
            "Steel",
            "Psychic"
        ],
        "attack": 80,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 60,
        "catchRate": 3,
        "evolution": ["Metang"],
        "evoLevel": [20]
    },
    {
        "id": 375,
        "name": "Metang",
        "type": [
            "Steel",
            "Psychic"
        ],
        "attack": 100,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 147,
        "catchRate": 3,
        "evolution": ["Metagross"],
        "evoLevel": [45]
    },
    {
        "id": 376,
        "name": "Metagross",
        "type": [
            "Steel",
            "Psychic"
        ],
        "attack": 135,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 377,
        "name": "Regirock",
        "type": [
            "Rock"
        ],
        "attack": 200,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 378,
        "name": "Regice",
        "type": [
            "Ice"
        ],
        "attack": 200,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 379,
        "name": "Registeel",
        "type": [
            "Steel"
        ],
        "attack": 150,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 380,
        "name": "Latias",
        "type": [
            "Dragon",
            "Psychic"
        ],
        "attack": 130,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 381,
        "name": "Latios",
        "type": [
            "Dragon",
            "Psychic"
        ],
        "attack": 130,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 382,
        "name": "Kyogre",
        "type": [
            "Water"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 302,
        "catchRate": 3
    },
    {
        "id": 383,
        "name": "Groudon",
        "type": [
            "Ground"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 302,
        "catchRate": 3
    },
    {
        "id": 384,
        "name": "Rayquaza",
        "type": [
            "Dragon",
            "Flying"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 306,
        "catchRate": 45
    },
    {
        "id": 385,
        "name": "Jirachi",
        "type": [
            "Steel",
            "Psychic"
        ],
        "attack": 100,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 386,
        "name": "Deoxys\nNormal Forme",
        "type": [
            "Psychic"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 387,
        "name": "Turtwig",
        "type": [
            "Grass"
        ],
        "attack": 68,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 64,
        "catchRate": 45,
        "evolution": ["Grotle"],
        "evoLevel": [18]
    },
    {
        "id": 388,
        "name": "Grotle",
        "type": [
            "Grass"
        ],
        "attack": 89,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 45,
        "evolution": ["Torterra"],
        "evoLevel": [32]
    },
    {
        "id": 389,
        "name": "Torterra",
        "type": [
            "Grass",
            "Ground"
        ],
        "attack": 109,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 236,
        "catchRate": 45
    },
    {
        "id": 390,
        "name": "Chimchar",
        "type": [
            "Fire"
        ],
        "attack": 61,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 62,
        "catchRate": 45,
        "evolution": ["Monferno"],
        "evoLevel": [14]
    },
    {
        "id": 391,
        "name": "Monferno",
        "type": [
            "Fire",
            "Fighting"
        ],
        "attack": 81,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 45,
        "evolution": ["Infernape"],
        "evoLevel": [36]
    },
    {
        "id": 392,
        "name": "Infernape",
        "type": [
            "Fire",
            "Fighting"
        ],
        "attack": 108,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 240,
        "catchRate": 45
    },
    {
        "id": 393,
        "name": "Piplup",
        "type": [
            "Water"
        ],
        "attack": 61,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 63,
        "catchRate": 45,
        "evolution": ["Prinplup"],
        "evoLevel": [16]
    },
    {
        "id": 394,
        "name": "Prinplup",
        "type": [
            "Water"
        ],
        "attack": 81,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 45,
        "evolution": ["Empoleon"],
        "evoLevel": [36]
    },
    {
        "id": 395,
        "name": "Empoleon",
        "type": [
            "Water",
            "Steel"
        ],
        "attack": 111,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 396,
        "name": "Starly",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 60,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 49,
        "catchRate": 255,
        "evolution": ["Staravia"],
        "evoLevel": [14]
    },
    {
        "id": 397,
        "name": "Staravia",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 80,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 119,
        "catchRate": 120,
        "evolution": ["Staraptor"],
        "evoLevel": [34]
    },
    {
        "id": 398,
        "name": "Staraptor",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 120,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 218,
        "catchRate": 45
    },
    {
        "id": 399,
        "name": "Bidoof",
        "type": [
            "Normal"
        ],
        "attack": 59,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 50,
        "catchRate": 255,
        "evolution": ["Bibarel"],
        "evoLevel": [15]
    },
    {
        "id": 400,
        "name": "Bibarel",
        "type": [
            "Normal",
            "Water"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 144,
        "catchRate": 127
    },
    {
        "id": 401,
        "name": "Kricketot",
        "type": [
            "Bug"
        ],
        "attack": 41,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 39,
        "catchRate": 255,
        "evolution": ["Kricketune"],
        "evoLevel": [10]
    },
    {
        "id": 402,
        "name": "Kricketune",
        "type": [
            "Bug"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 134,
        "catchRate": 45
    },
    {
        "id": 403,
        "name": "Shinx",
        "type": [
            "Electric"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 53,
        "catchRate": 235,
        "evolution": ["Luxio"],
        "evoLevel": [15]
    },
    {
        "id": 404,
        "name": "Luxio",
        "type": [
            "Electric"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 127,
        "catchRate": 120,
        "evolution": ["Luxray"],
        "evoLevel": [30]
    },
    {
        "id": 405,
        "name": "Luxray",
        "type": [
            "Electric"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 235,
        "catchRate": 45
    },
    {
        "id": 406,
        "name": "Budew",
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 56,
        "catchRate": 255,
        "evolution": ["Roselia"],
        "evoLevel": [100]
    },
    {
        "id": 407,
        "name": "Roserade",
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 232,
        "catchRate": 75
    },
    {
        "id": 408,
        "name": "Cranidos",
        "type": [
            "Rock"
        ],
        "attack": 125,
        "eggCycles": 30,
        "levelType": "erratic",
        "exp": 70,
        "catchRate": 45,
        "evolution": ["Rampardos"],
        "evoLevel": [30]
    },
    {
        "id": 409,
        "name": "Rampardos",
        "type": [
            "Rock"
        ],
        "attack": 165,
        "eggCycles": 30,
        "levelType": "erratic",
        "exp": 173,
        "catchRate": 45
    },
    {
        "id": 410,
        "name": "Shieldon",
        "type": [
            "Rock",
            "Steel"
        ],
        "attack": 118,
        "eggCycles": 30,
        "levelType": "erratic",
        "exp": 70,
        "catchRate": 45,
        "evolution": ["Bastiodon"],
        "evoLevel": [30]
    },
    {
        "id": 411,
        "name": "Bastiodon",
        "type": [
            "Rock",
            "Steel"
        ],
        "attack": 168,
        "eggCycles": 30,
        "levelType": "erratic",
        "exp": 173,
        "catchRate": 45
    },
    {
        "id": 412,
        "name": "Burmy",
        "type": [
            "Bug"
        ],
        "attack": 45,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 45,
        "catchRate": 120,
        "evolution": ["Wormadam"],
        "evoLevel": [20]
    },
    {
        "id": 413,
        "name": "Wormadam\nPlant Cloak",
        "type": [
            "Bug",
            "Grass"
        ],
        "attack": 105,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 148,
        "catchRate": 45
    },
    {
        "id": 414,
        "name": "Mothim",
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 94,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 148,
        "catchRate": 45
    },
    {
        "id": 415,
        "name": "Combee",
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 70,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 49,
        "catchRate": 120,
        "evolution": ["Vespiquen"],
        "evoLevel": [21]
    },
    {
        "id": 416,
        "name": "Vespiquen",
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 102,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 166,
        "catchRate": 45
    },
    {
        "id": 417,
        "name": "Pachirisu",
        "type": [
            "Electric"
        ],
        "attack": 95,
        "eggCycles": 10,
        "levelType": "mediumfast",
        "exp": 142,
        "catchRate": 200
    },
    {
        "id": 418,
        "name": "Buizel",
        "type": [
            "Water"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 66,
        "catchRate": 190,
        "evolution": ["Floatzel"],
        "evoLevel": [26]
    },
    {
        "id": 419,
        "name": "Floatzel",
        "type": [
            "Water"
        ],
        "attack": 115,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 75
    },
    {
        "id": 420,
        "name": "Cherubi",
        "type": [
            "Grass"
        ],
        "attack": 62,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 55,
        "catchRate": 190,
        "evolution": ["Cherrim"],
        "evoLevel": [25]
    },
    {
        "id": 421,
        "name": "Cherrim",
        "type": [
            "Grass"
        ],
        "attack": 87,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 158,
        "catchRate": 75
    },
    {
        "id": 422,
        "name": "Shellos",
        "type": [
            "Water"
        ],
        "attack": 76,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 65,
        "catchRate": 190,
        "evolution": ["Gastrodon"],
        "evoLevel": [30]
    },
    {
        "id": 423,
        "name": "Gastrodon",
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 111,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 166,
        "catchRate": 75
    },
    {
        "id": 424,
        "name": "Ambipom",
        "type": [
            "Normal"
        ],
        "attack": 115,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 169,
        "catchRate": 45
    },
    {
        "id": 425,
        "name": "Drifloon",
        "type": [
            "Ghost",
            "Flying"
        ],
        "attack": 90,
        "eggCycles": 30,
        "levelType": "fluctuating",
        "exp": 70,
        "catchRate": 125,
        "evolution": ["Drifblim"],
        "evoLevel": [28]
    },
    {
        "id": 426,
        "name": "Drifblim",
        "type": [
            "Ghost",
            "Flying"
        ],
        "attack": 150,
        "eggCycles": 30,
        "levelType": "fluctuating",
        "exp": 174,
        "catchRate": 60
    },
    {
        "id": 427,
        "name": "Buneary",
        "type": [
            "Normal"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 70,
        "catchRate": 190,
        "evolution": ["Lopunny"],
        "evoLevel": [100]
    },
    {
        "id": 428,
        "name": "Lopunny",
        "type": [
            "Normal"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 60
    },
    {
        "id": 429,
        "name": "Mismagius",
        "type": [
            "Ghost"
        ],
        "attack": 105,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 173,
        "catchRate": 45
    },
    {
        "id": 430,
        "name": "Honchkrow",
        "type": [
            "Dark",
            "Flying"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 177,
        "catchRate": 30
    },
    {
        "id": 431,
        "name": "Glameow",
        "type": [
            "Normal"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 62,
        "catchRate": 190,
        "evolution": ["Purugly"],
        "evoLevel": [38]
    },
    {
        "id": 432,
        "name": "Purugly",
        "type": [
            "Normal"
        ],
        "attack": 112,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 158,
        "catchRate": 75
    },
    {
        "id": 433,
        "name": "Chingling",
        "type": [
            "Psychic"
        ],
        "attack": 65,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 57,
        "catchRate": 120,
        "evolution": ["Chimecho"],
        "evoLevel": [100]
    },
    {
        "id": 434,
        "name": "Stunky",
        "type": [
            "Poison",
            "Dark"
        ],
        "attack": 74,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 66,
        "catchRate": 225,
        "evolution": ["Skuntank"],
        "evoLevel": [34]
    },
    {
        "id": 435,
        "name": "Skuntank",
        "type": [
            "Poison",
            "Dark"
        ],
        "attack": 103,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 60
    },
    {
        "id": 436,
        "name": "Bronzor",
        "type": [
            "Steel",
            "Psychic"
        ],
        "attack": 86,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 60,
        "catchRate": 255,
        "evolution": ["Bronzong"],
        "evoLevel": [33]
    },
    {
        "id": 437,
        "name": "Bronzong",
        "type": [
            "Steel",
            "Psychic"
        ],
        "attack": 116,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 175,
        "catchRate": 90
    },
    {
        "id": 438,
        "name": "Bonsly",
        "type": [
            "Rock"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 58,
        "catchRate": 255,
        "evolution": ["Sudowoodo"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 439,
        "name": "Mime Jr.",
        "type": [
            "Psychic",
            "Fairy"
        ],
        "attack": 90,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 62,
        "catchRate": 145,
        "evolution": ["Mr. Mime"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 440,
        "name": "Happiny",
        "type": [
            "Normal"
        ],
        "attack": 100,
        "eggCycles": 40,
        "levelType": "fast",
        "exp": 110,
        "catchRate": 130,
        "evolution": ["Chansey"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 441,
        "name": "Chatot",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 92,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 144,
        "catchRate": 30
    },
    {
        "id": 442,
        "name": "Spiritomb",
        "type": [
            "Ghost",
            "Dark"
        ],
        "attack": 108,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 170,
        "catchRate": 100
    },
    {
        "id": 443,
        "name": "Gible",
        "type": [
            "Dragon",
            "Ground"
        ],
        "attack": 70,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 60,
        "catchRate": 45,
        "evolution": ["Gabite"],
        "evoLevel": [24]
    },
    {
        "id": 444,
        "name": "Gabite",
        "type": [
            "Dragon",
            "Ground"
        ],
        "attack": 90,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 144,
        "catchRate": 45,
        "evolution": ["Garchomp"],
        "evoLevel": [48]
    },
    {
        "id": 445,
        "name": "Garchomp",
        "type": [
            "Dragon",
            "Ground"
        ],
        "attack": 130,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 45
    },
    {
        "id": 446,
        "name": "Munchlax",
        "type": [
            "Normal"
        ],
        "attack": 135,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 78,
        "catchRate": 50,
        "evolution": ["Snorlax"],
        "evoLevel": [100]
    },
    {
        "id": 447,
        "name": "Riolu",
        "type": [
            "Fighting"
        ],
        "attack": 70,
        "eggCycles": 25,
        "levelType": "mediumslow",
        "exp": 57,
        "catchRate": 75,
        "evolution": ["Lucario"],
        "evoLevel": [100]
    },
    {
        "id": 448,
        "name": "Lucario",
        "type": [
            "Fighting",
            "Steel"
        ],
        "attack": 115,
        "eggCycles": 25,
        "levelType": "mediumslow",
        "exp": 184,
        "catchRate": 45
    },
    {
        "id": 449,
        "name": "Hippopotas",
        "type": [
            "Ground"
        ],
        "attack": 78,
        "eggCycles": 30,
        "levelType": "slow",
        "exp": 66,
        "catchRate": 140,
        "evolution": ["Hippowdon"],
        "evoLevel": [34]
    },
    {
        "id": 450,
        "name": "Hippowdon",
        "type": [
            "Ground"
        ],
        "attack": 118,
        "eggCycles": 30,
        "levelType": "slow",
        "exp": 184,
        "catchRate": 60
    },
    {
        "id": 451,
        "name": "Skorupi",
        "type": [
            "Poison",
            "Bug"
        ],
        "attack": 90,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 66,
        "catchRate": 120,
        "evolution": ["Drapion"],
        "evoLevel": [40]
    },
    {
        "id": 452,
        "name": "Drapion",
        "type": [
            "Poison",
            "Dark"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 175,
        "catchRate": 45
    },
    {
        "id": 453,
        "name": "Croagunk",
        "type": [
            "Poison",
            "Fighting"
        ],
        "attack": 61,
        "eggCycles": 10,
        "levelType": "mediumfast",
        "exp": 60,
        "catchRate": 140,
        "evolution": ["Toxicroak"],
        "evoLevel": [37]
    },
    {
        "id": 454,
        "name": "Toxicroak",
        "type": [
            "Poison",
            "Fighting"
        ],
        "attack": 106,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 172,
        "catchRate": 75
    },
    {
        "id": 455,
        "name": "Carnivine",
        "type": [
            "Grass"
        ],
        "attack": 100,
        "eggCycles": 25,
        "levelType": "slow",
        "exp": 159,
        "catchRate": 200
    },
    {
        "id": 456,
        "name": "Finneon",
        "type": [
            "Water"
        ],
        "attack": 66,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 66,
        "catchRate": 190,
        "evolution": ["Lumineon"],
        "evoLevel": [31]
    },
    {
        "id": 457,
        "name": "Lumineon",
        "type": [
            "Water"
        ],
        "attack": 91,
        "eggCycles": 20,
        "levelType": "erratic",
        "exp": 161,
        "catchRate": 75
    },
    {
        "id": 458,
        "name": "Mantyke",
        "type": [
            "Water",
            "Flying"
        ],
        "attack": 120,
        "eggCycles": 25,
        "levelType": "slow",
        "exp": 69,
        "catchRate": 25,
        "evolution": ["Mantine"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 459,
        "name": "Snover",
        "type": [
            "Grass",
            "Ice"
        ],
        "attack": 62,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 67,
        "catchRate": 120,
        "evolution": ["Abomasnow"],
        "evoLevel": [40]
    },
    {
        "id": 460,
        "name": "Abomasnow",
        "type": [
            "Grass",
            "Ice"
        ],
        "attack": 92,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 173,
        "catchRate": 60
    },
    {
        "id": 461,
        "name": "Weavile",
        "type": [
            "Dark",
            "Ice"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 179,
        "catchRate": 45
    },
    {
        "id": 462,
        "name": "Magnezone",
        "type": [
            "Electric",
            "Steel"
        ],
        "attack": 130,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 241,
        "catchRate": 30
    },
    {
        "id": 463,
        "name": "Lickilicky",
        "type": [
            "Normal"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 180,
        "catchRate": 30
    },
    {
        "id": 464,
        "name": "Rhyperior",
        "type": [
            "Ground",
            "Rock"
        ],
        "attack": 140,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 241,
        "catchRate": 30
    },
    {
        "id": 465,
        "name": "Tangrowth",
        "type": [
            "Grass"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 187,
        "catchRate": 30
    },
    {
        "id": 466,
        "name": "Electivire",
        "type": [
            "Electric"
        ],
        "attack": 123,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 243,
        "catchRate": 30
    },
    {
        "id": 467,
        "name": "Magmortar",
        "type": [
            "Fire"
        ],
        "attack": 125,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 243,
        "catchRate": 30
    },
    {
        "id": 468,
        "name": "Togekiss",
        "type": [
            "Fairy",
            "Flying"
        ],
        "attack": 120,
        "eggCycles": 10,
        "levelType": "fast",
        "exp": 245,
        "catchRate": 30
    },
    {
        "id": 469,
        "name": "Yanmega",
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 116,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 180,
        "catchRate": 30
    },
    {
        "id": 470,
        "name": "Leafeon",
        "type": [
            "Grass"
        ],
        "attack": 130,
        "eggCycles": 35,
        "levelType": "mediumfast",
        "exp": 184,
        "catchRate": 45
    },
    {
        "id": 471,
        "name": "Glaceon",
        "type": [
            "Ice"
        ],
        "attack": 130,
        "eggCycles": 35,
        "levelType": "mediumfast",
        "exp": 184,
        "catchRate": 45
    },
    {
        "id": 472,
        "name": "Gliscor",
        "type": [
            "Ground",
            "Flying"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 179,
        "catchRate": 30
    },
    {
        "id": 473,
        "name": "Mamoswine",
        "type": [
            "Ice",
            "Ground"
        ],
        "attack": 130,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 239,
        "catchRate": 50
    },
    {
        "id": 474,
        "name": "Porygon-Z",
        "type": [
            "Normal"
        ],
        "attack": 135,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 241,
        "catchRate": 30
    },
    {
        "id": 475,
        "name": "Gallade",
        "type": [
            "Psychic",
            "Fighting"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 233,
        "catchRate": 45
    },
    {
        "id": 476,
        "name": "Probopass",
        "type": [
            "Rock",
            "Steel"
        ],
        "attack": 150,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 184,
        "catchRate": 60
    },
    {
        "id": 477,
        "name": "Dusknoir",
        "type": [
            "Ghost"
        ],
        "attack": 135,
        "eggCycles": 25,
        "levelType": "fast",
        "exp": 236,
        "catchRate": 45
    },
    {
        "id": 478,
        "name": "Froslass",
        "type": [
            "Ice",
            "Ghost"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 75
    },
    {
        "id": 479,
        "name": "Rotom",
        "type": [
            "Electric",
            "Ghost"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 182,
        "catchRate": 45
    },
    {
        "id": 480,
        "name": "Uxie",
        "type": [
            "Psychic"
        ],
        "attack": 130,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 481,
        "name": "Mesprit",
        "type": [
            "Psychic"
        ],
        "attack": 105,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 482,
        "name": "Azelf",
        "type": [
            "Psychic"
        ],
        "attack": 125,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 483,
        "name": "Dialga",
        "type": [
            "Steel",
            "Dragon"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 306,
        "catchRate": 3
    },
    {
        "id": 484,
        "name": "Palkia",
        "type": [
            "Water",
            "Dragon"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 306,
        "catchRate": 3
    },
    {
        "id": 485,
        "name": "Heatran",
        "type": [
            "Fire",
            "Steel"
        ],
        "attack": 130,
        "eggCycles": 10,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 486,
        "name": "Regigigas",
        "type": [
            "Normal"
        ],
        "attack": 160,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 302,
        "catchRate": 3
    },
    {
        "id": 487,
        "name": "Giratina\nAltered Forme",
        "type": [
            "Ghost",
            "Dragon"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 306,
        "catchRate": 3
    },
    {
        "id": 488,
        "name": "Cresselia",
        "type": [
            "Psychic"
        ],
        "attack": 130,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 489,
        "name": "Phione",
        "type": [
            "Water"
        ],
        "attack": 80,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 216,
        "catchRate": 30
    },
    {
        "id": 490,
        "name": "Manaphy",
        "type": [
            "Water"
        ],
        "attack": 100,
        "eggCycles": 10,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 491,
        "name": "Darkrai",
        "type": [
            "Dark"
        ],
        "attack": 135,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 492,
        "name": "Shaymin\nLand Forme",
        "type": [
            "Grass"
        ],
        "attack": 100,
        "eggCycles": 120,
        "levelType": "mediumslow",
        "exp": 270,
        "catchRate": 45
    },
    {
        "id": 493,
        "name": "Arceus",
        "type": [
            "Normal"
        ],
        "attack": 120,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 324,
        "catchRate": 3
    },
    {
        "id": 494,
        "name": "Victini",
        "type": [
            "Psychic",
            "Fire"
        ],
        "attack": 100,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 495,
        "name": "Snivy",
        "type": [
            "Grass"
        ],
        "attack": 63,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 62,
        "catchRate": 45,
        "evolution": ["Servine"],
        "evoLevel": [17]
    },
    {
        "id": 496,
        "name": "Servine",
        "type": [
            "Grass"
        ],
        "attack": 83,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 145,
        "catchRate": 45,
        "evolution": ["Serperior"],
        "evoLevel": [36]
    },
    {
        "id": 497,
        "name": "Serperior",
        "type": [
            "Grass"
        ],
        "attack": 113,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 238,
        "catchRate": 45
    },
    {
        "id": 498,
        "name": "Tepig",
        "type": [
            "Fire"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 62,
        "catchRate": 45,
        "evolution": ["Pignite"],
        "evoLevel": [17]
    },
    {
        "id": 499,
        "name": "Pignite",
        "type": [
            "Fire",
            "Fighting"
        ],
        "attack": 93,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 146,
        "catchRate": 45,
        "evolution": ["Emboar"],
        "evoLevel": [36]
    },
    {
        "id": 500,
        "name": "Emboar",
        "type": [
            "Fire",
            "Fighting"
        ],
        "attack": 123,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 238,
        "catchRate": 45
    },
    {
        "id": 501,
        "name": "Oshawott",
        "type": [
            "Water"
        ],
        "attack": 63,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 62,
        "catchRate": 45,
        "evolution": ["Dewott"],
        "evoLevel": [17]
    },
    {
        "id": 502,
        "name": "Dewott",
        "type": [
            "Water"
        ],
        "attack": 83,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 145,
        "catchRate": 45,
        "evolution": ["Samurott"],
        "evoLevel": [36]
    },
    {
        "id": 503,
        "name": "Samurott",
        "type": [
            "Water"
        ],
        "attack": 108,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 238,
        "catchRate": 45
    },
    {
        "id": 504,
        "name": "Patrat",
        "type": [
            "Normal"
        ],
        "attack": 55,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 51,
        "catchRate": 255,
        "evolution": ["Watchog"],
        "evoLevel": [20]
    },
    {
        "id": 505,
        "name": "Watchog",
        "type": [
            "Normal"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 147,
        "catchRate": 255
    },
    {
        "id": 506,
        "name": "Lillipup",
        "type": [
            "Normal"
        ],
        "attack": 60,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 55,
        "catchRate": 255,
        "evolution": ["Herdier"],
        "evoLevel": [16]
    },
    {
        "id": 507,
        "name": "Herdier",
        "type": [
            "Normal"
        ],
        "attack": 80,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 130,
        "catchRate": 120,
        "evolution": ["Stoutland"],
        "evoLevel": [32]
    },
    {
        "id": 508,
        "name": "Stoutland",
        "type": [
            "Normal"
        ],
        "attack": 110,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 225,
        "catchRate": 45
    },
    {
        "id": 509,
        "name": "Purrloin",
        "type": [
            "Dark"
        ],
        "attack": 66,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 56,
        "catchRate": 255,
        "evolution": ["Liepard"],
        "evoLevel": [20]
    },
    {
        "id": 510,
        "name": "Liepard",
        "type": [
            "Dark"
        ],
        "attack": 106,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 156,
        "catchRate": 90
    },
    {
        "id": 511,
        "name": "Pansage",
        "type": [
            "Grass"
        ],
        "attack": 64,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 63,
        "catchRate": 190,
        "evolution": ["Simisage"],
        "evoLevel": ["Leaf_stone"]
    },
    {
        "id": 512,
        "name": "Simisage",
        "type": [
            "Grass"
        ],
        "attack": 101,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 174,
        "catchRate": 75
    },
    {
        "id": 513,
        "name": "Pansear",
        "type": [
            "Fire"
        ],
        "attack": 64,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 63,
        "catchRate": 190,
        "evolution": ["Simisear"],
        "evoLevel": ["Fire_stone"]
    },
    {
        "id": 514,
        "name": "Simisear",
        "type": [
            "Fire"
        ],
        "attack": 101,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 174,
        "catchRate": 75
    },
    {
        "id": 515,
        "name": "Panpour",
        "type": [
            "Water"
        ],
        "attack": 64,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 63,
        "catchRate": 190,
        "evolution": ["Simipour"],
        "evoLevel": ["Water_stone"]
    },
    {
        "id": 516,
        "name": "Simipour",
        "type": [
            "Water"
        ],
        "attack": 101,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 174,
        "catchRate": 75
    },
    {
        "id": 517,
        "name": "Munna",
        "type": [
            "Psychic"
        ],
        "attack": 76,
        "eggCycles": 10,
        "levelType": "fast",
        "exp": 58,
        "catchRate": 190,
        "evolution": ["Musharna"],
        "evoLevel": ["Moon_stone"]
    },
    {
        "id": 518,
        "name": "Musharna",
        "type": [
            "Psychic"
        ],
        "attack": 116,
        "eggCycles": 10,
        "levelType": "fast",
        "exp": 170,
        "catchRate": 75
    },
    {
        "id": 519,
        "name": "Pidove",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 55,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 53,
        "catchRate": 255,
        "evolution": ["Tranquill"],
        "evoLevel": [21]
    },
    {
        "id": 520,
        "name": "Tranquill",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 77,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 125,
        "catchRate": 120,
        "evolution": ["Unfezant"],
        "evoLevel": [32]
    },
    {
        "id": 521,
        "name": "Unfezant",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 115,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 220,
        "catchRate": 45
    },
    {
        "id": 522,
        "name": "Blitzle",
        "type": [
            "Electric"
        ],
        "attack": 76,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 59,
        "catchRate": 190,
        "evolution": ["Zebstrika"],
        "evoLevel": [27]
    },
    {
        "id": 523,
        "name": "Zebstrika",
        "type": [
            "Electric"
        ],
        "attack": 116,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 174,
        "catchRate": 75
    },
    {
        "id": 524,
        "name": "Roggenrola",
        "type": [
            "Rock"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 56,
        "catchRate": 255,
        "evolution": ["Boldore"],
        "evoLevel": [25]
    },
    {
        "id": 525,
        "name": "Boldore",
        "type": [
            "Rock"
        ],
        "attack": 105,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 137,
        "catchRate": 120,
        "evolution": ["Gigalith"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 526,
        "name": "Gigalith",
        "type": [
            "Rock"
        ],
        "attack": 135,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 232,
        "catchRate": 45
    },
    {
        "id": 527,
        "name": "Woobat",
        "type": [
            "Psychic",
            "Flying"
        ],
        "attack": 72,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 65,
        "catchRate": 190,
        "evolution": ["Swoobat"],
        "evoLevel": [100]
    },
    {
        "id": 528,
        "name": "Swoobat",
        "type": [
            "Psychic",
            "Flying"
        ],
        "attack": 114,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 149,
        "catchRate": 45
    },
    {
        "id": 529,
        "name": "Drilbur",
        "type": [
            "Ground"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 66,
        "catchRate": 120,
        "evolution": ["Excadrill"],
        "evoLevel": [31]
    },
    {
        "id": 530,
        "name": "Excadrill",
        "type": [
            "Ground",
            "Steel"
        ],
        "attack": 135,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 178,
        "catchRate": 60
    },
    {
        "id": 531,
        "name": "Audino",
        "type": [
            "Normal"
        ],
        "attack": 103,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 390,
        "catchRate": 255
    },
    {
        "id": 532,
        "name": "Timburr",
        "type": [
            "Fighting"
        ],
        "attack": 80,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 61,
        "catchRate": 180,
        "evolution": ["Gurdurr"],
        "evoLevel": [25]
    },
    {
        "id": 533,
        "name": "Gurdurr",
        "type": [
            "Fighting"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 90,
        "evolution": ["Conkeldurr"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 534,
        "name": "Conkeldurr",
        "type": [
            "Fighting"
        ],
        "attack": 140,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 227,
        "catchRate": 45
    },
    {
        "id": 535,
        "name": "Tympole",
        "type": [
            "Water"
        ],
        "attack": 64,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 59,
        "catchRate": 255,
        "evolution": ["Palpitoad"],
        "evoLevel": [25]
    },
    {
        "id": 536,
        "name": "Palpitoad",
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 75,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 134,
        "catchRate": 120,
        "evolution": ["Seismitoad"],
        "evoLevel": [36]
    },
    {
        "id": 537,
        "name": "Seismitoad",
        "type": [
            "Water",
            "Ground"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 229,
        "catchRate": 45
    },
    {
        "id": 538,
        "name": "Throh",
        "type": [
            "Fighting"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 163,
        "catchRate": 45
    },
    {
        "id": 539,
        "name": "Sawk",
        "type": [
            "Fighting"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 163,
        "catchRate": 45
    },
    {
        "id": 540,
        "name": "Sewaddle",
        "type": [
            "Bug",
            "Grass"
        ],
        "attack": 70,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 62,
        "catchRate": 255,
        "evolution": ["Swadloon"],
        "evoLevel": [20]
    },
    {
        "id": 541,
        "name": "Swadloon",
        "type": [
            "Bug",
            "Grass"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 133,
        "catchRate": 120,
        "evolution": ["Leavanny"],
        "evoLevel": [100]
    },
    {
        "id": 542,
        "name": "Leavanny",
        "type": [
            "Bug",
            "Grass"
        ],
        "attack": 103,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 225,
        "catchRate": 45
    },
    {
        "id": 543,
        "name": "Venipede",
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 59,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 52,
        "catchRate": 255,
        "evolution": ["Whirlipede"],
        "evoLevel": [22]
    },
    {
        "id": 544,
        "name": "Whirlipede",
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 99,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 126,
        "catchRate": 120,
        "evolution": ["Scolipede"],
        "evoLevel": [30]
    },
    {
        "id": 545,
        "name": "Scolipede",
        "type": [
            "Bug",
            "Poison"
        ],
        "attack": 112,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 218,
        "catchRate": 45
    },
    {
        "id": 546,
        "name": "Cottonee",
        "type": [
            "Grass",
            "Fairy"
        ],
        "attack": 66,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 56,
        "catchRate": 190,
        "evolution": ["Whimsicott"],
        "evoLevel": ["Sun_stone"]
    },
    {
        "id": 547,
        "name": "Whimsicott",
        "type": [
            "Grass",
            "Fairy"
        ],
        "attack": 116,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 75
    },
    {
        "id": 548,
        "name": "Petilil",
        "type": [
            "Grass"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 56,
        "catchRate": 190,
        "evolution": ["Lilligant"],
        "evoLevel": ["Sun_stone"]
    },
    {
        "id": 549,
        "name": "Lilligant",
        "type": [
            "Grass"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 75
    },
    {
        "id": 550,
        "name": "Basculin\nRed-Striped Form",
        "type": [
            "Water"
        ],
        "attack": 98,
        "eggCycles": 40,
        "levelType": "mediumfast",
        "exp": 161,
        "catchRate": 25
    },
    {
        "id": 551,
        "name": "Sandile",
        "type": [
            "Ground",
            "Dark"
        ],
        "attack": 72,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 58,
        "catchRate": 180,
        "evolution": ["Krokorok"],
        "evoLevel": [29]
    },
    {
        "id": 552,
        "name": "Krokorok",
        "type": [
            "Ground",
            "Dark"
        ],
        "attack": 82,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 123,
        "catchRate": 90,
        "evolution": ["Krookodile"],
        "evoLevel": [40]
    },
    {
        "id": 553,
        "name": "Krookodile",
        "type": [
            "Ground",
            "Dark"
        ],
        "attack": 117,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 234,
        "catchRate": 45
    },
    {
        "id": 554,
        "name": "Darumaka",
        "type": [
            "Fire"
        ],
        "attack": 90,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 63,
        "catchRate": 120,
        "evolution": ["Darmanitan"],
        "evoLevel": [35]
    },
    {
        "id": 555,
        "name": "Darmanitan\nStandard Mode",
        "type": [
            "Fire"
        ],
        "attack": 140,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 189,
        "catchRate": 60
    },
    {
        "id": 556,
        "name": "Maractus",
        "type": [
            "Grass"
        ],
        "attack": 106,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 161,
        "catchRate": 255
    },
    {
        "id": 557,
        "name": "Dwebble",
        "type": [
            "Bug",
            "Rock"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 65,
        "catchRate": 190,
        "evolution": ["Crustle"],
        "evoLevel": [34]
    },
    {
        "id": 558,
        "name": "Crustle",
        "type": [
            "Bug",
            "Rock"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 170,
        "catchRate": 75
    },
    {
        "id": 559,
        "name": "Scraggy",
        "type": [
            "Dark",
            "Fighting"
        ],
        "attack": 75,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 70,
        "catchRate": 180,
        "evolution": ["Scrafty"],
        "evoLevel": [39]
    },
    {
        "id": 560,
        "name": "Scrafty",
        "type": [
            "Dark",
            "Fighting"
        ],
        "attack": 115,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 171,
        "catchRate": 90
    },
    {
        "id": 561,
        "name": "Sigilyph",
        "type": [
            "Psychic",
            "Flying"
        ],
        "attack": 103,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 172,
        "catchRate": 45
    },
    {
        "id": 562,
        "name": "Yamask",
        "type": [
            "Ghost"
        ],
        "attack": 85,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 190,
        "evolution": ["Cofagrigus"],
        "evoLevel": [34]
    },
    {
        "id": 563,
        "name": "Cofagrigus",
        "type": [
            "Ghost"
        ],
        "attack": 145,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 169,
        "catchRate": 90
    },
    {
        "id": 564,
        "name": "Tirtouga",
        "type": [
            "Water",
            "Rock"
        ],
        "attack": 103,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 71,
        "catchRate": 45,
        "evolution": ["Carracosta"],
        "evoLevel": [37]
    },
    {
        "id": 565,
        "name": "Carracosta",
        "type": [
            "Water",
            "Rock"
        ],
        "attack": 133,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 45
    },
    {
        "id": 566,
        "name": "Archen",
        "type": [
            "Rock",
            "Flying"
        ],
        "attack": 112,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 71,
        "catchRate": 45,
        "evolution": ["Archeops"],
        "evoLevel": [37]
    },
    {
        "id": 567,
        "name": "Archeops",
        "type": [
            "Rock",
            "Flying"
        ],
        "attack": 140,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 177,
        "catchRate": 45
    },
    {
        "id": 568,
        "name": "Trubbish",
        "type": [
            "Poison"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 66,
        "catchRate": 190,
        "evolution": ["Garbodor"],
        "evoLevel": [36]
    },
    {
        "id": 569,
        "name": "Garbodor",
        "type": [
            "Poison"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 166,
        "catchRate": 60
    },
    {
        "id": 570,
        "name": "Zorua",
        "type": [
            "Dark"
        ],
        "attack": 80,
        "eggCycles": 25,
        "levelType": "mediumslow",
        "exp": 66,
        "catchRate": 75,
        "evolution": ["Zoroark"],
        "evoLevel": [30]
    },
    {
        "id": 571,
        "name": "Zoroark",
        "type": [
            "Dark"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 179,
        "catchRate": 45
    },
    {
        "id": 572,
        "name": "Minccino",
        "type": [
            "Normal"
        ],
        "attack": 75,
        "eggCycles": 15,
        "levelType": "fast",
        "exp": 60,
        "catchRate": 255,
        "evolution": ["Cinccino"],
        "evoLevel": ["Shiny_stone"]
    },
    {
        "id": 573,
        "name": "Cinccino",
        "type": [
            "Normal"
        ],
        "attack": 115,
        "eggCycles": 15,
        "levelType": "fast",
        "exp": 165,
        "catchRate": 60
    },
    {
        "id": 574,
        "name": "Gothita",
        "type": [
            "Psychic"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 58,
        "catchRate": 200,
        "evolution": ["Gothorita"],
        "evoLevel": [32]
    },
    {
        "id": 575,
        "name": "Gothorita",
        "type": [
            "Psychic"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 137,
        "catchRate": 100,
        "evolution": ["Gothitelle"],
        "evoLevel": [41]
    },
    {
        "id": 576,
        "name": "Gothitelle",
        "type": [
            "Psychic"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 221,
        "catchRate": 50
    },
    {
        "id": 577,
        "name": "Solosis",
        "type": [
            "Psychic"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 58,
        "catchRate": 200,
        "evolution": ["Duosion"],
        "evoLevel": [32]
    },
    {
        "id": 578,
        "name": "Duosion",
        "type": [
            "Psychic"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 130,
        "catchRate": 100,
        "evolution": ["Reuniclus"],
        "evoLevel": [41]
    },
    {
        "id": 579,
        "name": "Reuniclus",
        "type": [
            "Psychic"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 221,
        "catchRate": 50
    },
    {
        "id": 580,
        "name": "Ducklett",
        "type": [
            "Water",
            "Flying"
        ],
        "attack": 62,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 190,
        "evolution": ["Swanna"],
        "evoLevel": [35]
    },
    {
        "id": 581,
        "name": "Swanna",
        "type": [
            "Water",
            "Flying"
        ],
        "attack": 98,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 166,
        "catchRate": 45
    },
    {
        "id": 582,
        "name": "Vanillite",
        "type": [
            "Ice"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 61,
        "catchRate": 255,
        "evolution": ["Vanillish"],
        "evoLevel": [35]
    },
    {
        "id": 583,
        "name": "Vanillish",
        "type": [
            "Ice"
        ],
        "attack": 80,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 138,
        "catchRate": 120,
        "evolution": ["Vanilluxe"],
        "evoLevel": [47]
    },
    {
        "id": 584,
        "name": "Vanilluxe",
        "type": [
            "Ice"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 241,
        "catchRate": 45
    },
    {
        "id": 585,
        "name": "Deerling",
        "type": [
            "Normal",
            "Grass"
        ],
        "attack": 75,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 67,
        "catchRate": 190,
        "evolution": ["Sawsbuck"],
        "evoLevel": [34]
    },
    {
        "id": 586,
        "name": "Sawsbuck",
        "type": [
            "Normal",
            "Grass"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 166,
        "catchRate": 75
    },
    {
        "id": 587,
        "name": "Emolga",
        "type": [
            "Electric",
            "Flying"
        ],
        "attack": 103,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 150,
        "catchRate": 200
    },
    {
        "id": 588,
        "name": "Karrablast",
        "type": [
            "Bug"
        ],
        "attack": 75,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 63,
        "catchRate": 200,
        "evolution": ["Escavalier"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 589,
        "name": "Escavalier",
        "type": [
            "Bug",
            "Steel"
        ],
        "attack": 135,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 75
    },
    {
        "id": 590,
        "name": "Foongus",
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 69,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 59,
        "catchRate": 190,
        "evolution": ["Amoonguss"],
        "evoLevel": [39]
    },
    {
        "id": 591,
        "name": "Amoonguss",
        "type": [
            "Grass",
            "Poison"
        ],
        "attack": 114,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 162,
        "catchRate": 75
    },
    {
        "id": 592,
        "name": "Frillish",
        "type": [
            "Water",
            "Ghost"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 67,
        "catchRate": 190,
        "evolution": ["Jellicent"],
        "evoLevel": [40]
    },
    {
        "id": 593,
        "name": "Jellicent",
        "type": [
            "Water",
            "Ghost"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 60
    },
    {
        "id": 594,
        "name": "Alomomola",
        "type": [
            "Water"
        ],
        "attack": 165,
        "eggCycles": 40,
        "levelType": "fast",
        "exp": 165,
        "catchRate": 75
    },
    {
        "id": 595,
        "name": "Joltik",
        "type": [
            "Bug",
            "Electric"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 64,
        "catchRate": 190,
        "evolution": ["Galvantula"],
        "evoLevel": [36]
    },
    {
        "id": 596,
        "name": "Galvantula",
        "type": [
            "Bug",
            "Electric"
        ],
        "attack": 108,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 165,
        "catchRate": 75
    },
    {
        "id": 597,
        "name": "Ferroseed",
        "type": [
            "Grass",
            "Steel"
        ],
        "attack": 91,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 255,
        "evolution": ["Ferrothorn"],
        "evoLevel": [40]
    },
    {
        "id": 598,
        "name": "Ferrothorn",
        "type": [
            "Grass",
            "Steel"
        ],
        "attack": 131,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 171,
        "catchRate": 90
    },
    {
        "id": 599,
        "name": "Klink",
        "type": [
            "Steel"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 60,
        "catchRate": 130,
        "evolution": ["Klang"],
        "evoLevel": [38]
    },
    {
        "id": 600,
        "name": "Klang",
        "type": [
            "Steel"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 154,
        "catchRate": 60,
        "evolution": ["Klinklang"],
        "evoLevel": [49]
    },
    {
        "id": 601,
        "name": "Klinklang",
        "type": [
            "Steel"
        ],
        "attack": 115,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 234,
        "catchRate": 30
    },
    {
        "id": 602,
        "name": "Tynamo",
        "type": [
            "Electric"
        ],
        "attack": 60,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 55,
        "catchRate": 190,
        "evolution": ["Eelektrik"],
        "evoLevel": [39]
    },
    {
        "id": 603,
        "name": "Eelektrik",
        "type": [
            "Electric"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 142,
        "catchRate": 60,
        "evolution": ["Eelektross"],
        "evoLevel": ["Thunder_stone"]
    },
    {
        "id": 604,
        "name": "Eelektross",
        "type": [
            "Electric"
        ],
        "attack": 115,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 232,
        "catchRate": 30
    },
    {
        "id": 605,
        "name": "Elgyem",
        "type": [
            "Psychic"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 67,
        "catchRate": 255,
        "evolution": ["Beheeyem"],
        "evoLevel": [42]
    },
    {
        "id": 606,
        "name": "Beheeyem",
        "type": [
            "Psychic"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 170,
        "catchRate": 90
    },
    {
        "id": 607,
        "name": "Litwick",
        "type": [
            "Ghost",
            "Fire"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 55,
        "catchRate": 190,
        "evolution": ["Lampent"],
        "evoLevel": [41]
    },
    {
        "id": 608,
        "name": "Lampent",
        "type": [
            "Ghost",
            "Fire"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 130,
        "catchRate": 90,
        "evolution": ["Chandelure"],
        "evoLevel": ["Dusk_stone"]
    },
    {
        "id": 609,
        "name": "Chandelure",
        "type": [
            "Ghost",
            "Fire"
        ],
        "attack": 145,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 234,
        "catchRate": 45
    },
    {
        "id": 610,
        "name": "Axew",
        "type": [
            "Dragon"
        ],
        "attack": 87,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 64,
        "catchRate": 75,
        "evolution": ["Fraxure"],
        "evoLevel": [38]
    },
    {
        "id": 611,
        "name": "Fraxure",
        "type": [
            "Dragon"
        ],
        "attack": 117,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 144,
        "catchRate": 60,
        "evolution": ["Haxorus"],
        "evoLevel": [48]
    },
    {
        "id": 612,
        "name": "Haxorus",
        "type": [
            "Dragon"
        ],
        "attack": 147,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 243,
        "catchRate": 45
    },
    {
        "id": 613,
        "name": "Cubchoo",
        "type": [
            "Ice"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 120,
        "evolution": ["Beartic"],
        "evoLevel": [37]
    },
    {
        "id": 614,
        "name": "Beartic",
        "type": [
            "Ice"
        ],
        "attack": 130,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 177,
        "catchRate": 60
    },
    {
        "id": 615,
        "name": "Cryogonal",
        "type": [
            "Ice"
        ],
        "attack": 135,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 180,
        "catchRate": 25
    },
    {
        "id": 616,
        "name": "Shelmet",
        "type": [
            "Bug"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 200,
        "evolution": ["Accelgor"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 617,
        "name": "Accelgor",
        "type": [
            "Bug"
        ],
        "attack": 145,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 75
    },
    {
        "id": 618,
        "name": "Stunfisk",
        "type": [
            "Ground",
            "Electric"
        ],
        "attack": 109,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 165,
        "catchRate": 75
    },
    {
        "id": 619,
        "name": "Mienfoo",
        "type": [
            "Fighting"
        ],
        "attack": 85,
        "eggCycles": 25,
        "levelType": "mediumslow",
        "exp": 70,
        "catchRate": 180,
        "evolution": ["Mienshao"],
        "evoLevel": [50]
    },
    {
        "id": 620,
        "name": "Mienshao",
        "type": [
            "Fighting"
        ],
        "attack": 125,
        "eggCycles": 25,
        "levelType": "mediumslow",
        "exp": 179,
        "catchRate": 45
    },
    {
        "id": 621,
        "name": "Druddigon",
        "type": [
            "Dragon"
        ],
        "attack": 120,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 170,
        "catchRate": 45
    },
    {
        "id": 622,
        "name": "Golett",
        "type": [
            "Ground",
            "Ghost"
        ],
        "attack": 74,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 190,
        "evolution": ["Golurk"],
        "evoLevel": [43]
    },
    {
        "id": 623,
        "name": "Golurk",
        "type": [
            "Ground",
            "Ghost"
        ],
        "attack": 124,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 169,
        "catchRate": 90
    },
    {
        "id": 624,
        "name": "Pawniard",
        "type": [
            "Dark",
            "Steel"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 68,
        "catchRate": 120,
        "evolution": ["Bisharp"],
        "evoLevel": [52]
    },
    {
        "id": 625,
        "name": "Bisharp",
        "type": [
            "Dark",
            "Steel"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 172,
        "catchRate": 45
    },
    {
        "id": 626,
        "name": "Bouffalant",
        "type": [
            "Normal"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 172,
        "catchRate": 45
    },
    {
        "id": 627,
        "name": "Rufflet",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 83,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 70,
        "catchRate": 190,
        "evolution": ["Braviary"],
        "evoLevel": [54]
    },
    {
        "id": 628,
        "name": "Braviary",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 123,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 179,
        "catchRate": 60
    },
    {
        "id": 629,
        "name": "Vullaby",
        "type": [
            "Dark",
            "Flying"
        ],
        "attack": 75,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 74,
        "catchRate": 190,
        "evolution": ["Mandibuzz"],
        "evoLevel": [54]
    },
    {
        "id": 630,
        "name": "Mandibuzz",
        "type": [
            "Dark",
            "Flying"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 179,
        "catchRate": 60
    },
    {
        "id": 631,
        "name": "Heatmor",
        "type": [
            "Fire"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 169,
        "catchRate": 90
    },
    {
        "id": 632,
        "name": "Durant",
        "type": [
            "Bug",
            "Steel"
        ],
        "attack": 112,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 169,
        "catchRate": 90
    },
    {
        "id": 633,
        "name": "Deino",
        "type": [
            "Dark",
            "Dragon"
        ],
        "attack": 65,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 60,
        "catchRate": 45,
        "evolution": ["Zweilous"],
        "evoLevel": [50]
    },
    {
        "id": 634,
        "name": "Zweilous",
        "type": [
            "Dark",
            "Dragon"
        ],
        "attack": 85,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 147,
        "catchRate": 45,
        "evolution": ["Hydreigon"],
        "evoLevel": [64]
    },
    {
        "id": 635,
        "name": "Hydreigon",
        "type": [
            "Dark",
            "Dragon"
        ],
        "attack": 125,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 45
    },
    {
        "id": 636,
        "name": "Larvesta",
        "type": [
            "Bug",
            "Fire"
        ],
        "attack": 85,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 72,
        "catchRate": 45,
        "evolution": ["Volcarona"],
        "evoLevel": [59]
    },
    {
        "id": 637,
        "name": "Volcarona",
        "type": [
            "Bug",
            "Fire"
        ],
        "attack": 135,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 248,
        "catchRate": 15
    },
    {
        "id": 638,
        "name": "Cobalion",
        "type": [
            "Steel",
            "Fighting"
        ],
        "attack": 129,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 639,
        "name": "Terrakion",
        "type": [
            "Rock",
            "Fighting"
        ],
        "attack": 129,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 640,
        "name": "Virizion",
        "type": [
            "Grass",
            "Fighting"
        ],
        "attack": 129,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 641,
        "name": "Tornadus\nIncarnate Forme",
        "type": [
            "Flying"
        ],
        "attack": 125,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 642,
        "name": "Thundurus\nIncarnate Forme",
        "type": [
            "Electric",
            "Flying"
        ],
        "attack": 125,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 643,
        "name": "Reshiram",
        "type": [
            "Dragon",
            "Fire"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 306,
        "catchRate": 3
    },
    {
        "id": 644,
        "name": "Zekrom",
        "type": [
            "Dragon",
            "Electric"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 306,
        "catchRate": 3
    },
    {
        "id": 645,
        "name": "Landorus\nIncarnate Forme",
        "type": [
            "Ground",
            "Flying"
        ],
        "attack": 125,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 646,
        "name": "Kyurem",
        "type": [
            "Dragon",
            "Ice"
        ],
        "attack": 130,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 315,
        "catchRate": 3
    },
    {
        "id": 647,
        "name": "Keldeo\nOrdinary Forme",
        "type": [
            "Water",
            "Fighting"
        ],
        "attack": 129,
        "eggCycles": 80,
        "levelType": "slow",
        "exp": 261,
        "catchRate": 3
    },
    {
        "id": 648,
        "name": "Meloetta\nAria Forme",
        "type": [
            "Normal",
            "Psychic"
        ],
        "attack": 128,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 649,
        "name": "Genesect",
        "type": [
            "Bug",
            "Steel"
        ],
        "attack": 120,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 650,
        "name": "Chespin",
        "type": [
            "Grass"
        ],
        "attack": 65,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 63,
        "catchRate": 45,
        "evolution": ["Quilladin"],
        "evoLevel": [16]
    },
    {
        "id": 651,
        "name": "Quilladin",
        "type": [
            "Grass"
        ],
        "attack": 95,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 45,
        "evolution": ["Chesnaught"],
        "evoLevel": [36]
    },
    {
        "id": 652,
        "name": "Chesnaught",
        "type": [
            "Grass",
            "Fighting"
        ],
        "attack": 122,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 653,
        "name": "Fennekin",
        "type": [
            "Fire"
        ],
        "attack": 62,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 61,
        "catchRate": 45,
        "evolution": ["Braixen"],
        "evoLevel": [16]
    },
    {
        "id": 654,
        "name": "Braixen",
        "type": [
            "Fire"
        ],
        "attack": 90,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 143,
        "catchRate": 45,
        "evolution": ["Delphox"],
        "evoLevel": [36]
    },
    {
        "id": 655,
        "name": "Delphox",
        "type": [
            "Fire",
            "Psychic"
        ],
        "attack": 114,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 240,
        "catchRate": 45
    },
    {
        "id": 656,
        "name": "Froakie",
        "type": [
            "Water"
        ],
        "attack": 71,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 63,
        "catchRate": 45,
        "evolution": ["Frogadier"],
        "evoLevel": [16]
    },
    {
        "id": 657,
        "name": "Frogadier",
        "type": [
            "Water"
        ],
        "attack": 97,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 142,
        "catchRate": 45,
        "evolution": ["Greninja"],
        "evoLevel": [36]
    },
    {
        "id": 658,
        "name": "Greninja",
        "type": [
            "Water",
            "Dark"
        ],
        "attack": 122,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 659,
        "name": "Bunnelby",
        "type": [
            "Normal"
        ],
        "attack": 57,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 47,
        "catchRate": 255,
        "evolution": ["Diggersby"],
        "evoLevel": [20]
    },
    {
        "id": 660,
        "name": "Diggersby",
        "type": [
            "Normal",
            "Ground"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 148,
        "catchRate": 127
    },
    {
        "id": 661,
        "name": "Fletchling",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 62,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 56,
        "catchRate": 255,
        "evolution": ["Fletchinder"],
        "evoLevel": [17]
    },
    {
        "id": 662,
        "name": "Fletchinder",
        "type": [
            "Fire",
            "Flying"
        ],
        "attack": 84,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 134,
        "catchRate": 120,
        "evolution": ["Talonflame"],
        "evoLevel": [35]
    },
    {
        "id": 663,
        "name": "Talonflame",
        "type": [
            "Fire",
            "Flying"
        ],
        "attack": 126,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 175,
        "catchRate": 45
    },
    {
        "id": 664,
        "name": "Scatterbug",
        "type": [
            "Bug"
        ],
        "attack": 40,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 40,
        "catchRate": 255,
        "evolution": ["Spewpa"],
        "evoLevel": [9]
    },
    {
        "id": 665,
        "name": "Spewpa",
        "type": [
            "Bug"
        ],
        "attack": 60,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 75,
        "catchRate": 120,
        "evolution": ["Vivillon"],
        "evoLevel": [12]
    },
    {
        "id": 666,
        "name": "Vivillon",
        "type": [
            "Bug",
            "Flying"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 185,
        "catchRate": 45
    },
    {
        "id": 667,
        "name": "Litleo",
        "type": [
            "Fire",
            "Normal"
        ],
        "attack": 73,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 74,
        "catchRate": 220,
        "evolution": ["Pyroar"],
        "evoLevel": [35]
    },
    {
        "id": 668,
        "name": "Pyroar",
        "type": [
            "Fire",
            "Normal"
        ],
        "attack": 109,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 177,
        "catchRate": 65
    },
    {
        "id": 669,
        "name": "Flabébé",
        "type": [
            "Fairy"
        ],
        "attack": 79,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 225,
        "evolution": ["Floette"],
        "evoLevel": [19]
    },
    {
        "id": 670,
        "name": "Floette",
        "type": [
            "Fairy"
        ],
        "attack": 98,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 130,
        "catchRate": 120,
        "evolution": ["Florges"],
        "evoLevel": ["Shiny_stone"]
    },
    {
        "id": 671,
        "name": "Florges",
        "type": [
            "Fairy"
        ],
        "attack": 154,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 248,
        "catchRate": 45
    },
    {
        "id": 672,
        "name": "Skiddo",
        "type": [
            "Grass"
        ],
        "attack": 66,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 70,
        "catchRate": 200,
        "evolution": ["Gogoat"],
        "evoLevel": [32]
    },
    {
        "id": 673,
        "name": "Gogoat",
        "type": [
            "Grass"
        ],
        "attack": 123,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 186,
        "catchRate": 45
    },
    {
        "id": 674,
        "name": "Pancham",
        "type": [
            "Fighting"
        ],
        "attack": 82,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 70,
        "catchRate": 220,
        "evolution": ["Pangoro"],
        "evoLevel": [32]
    },
    {
        "id": 675,
        "name": "Pangoro",
        "type": [
            "Fighting",
            "Dark"
        ],
        "attack": 124,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 65
    },
    {
        "id": 676,
        "name": "Furfrou",
        "type": [
            "Normal"
        ],
        "attack": 102,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 165,
        "catchRate": 160
    },
    {
        "id": 677,
        "name": "Espurr",
        "type": [
            "Psychic"
        ],
        "attack": 68,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 71,
        "catchRate": 190,
        "evolution": ["Meowstic"],
        "evoLevel": [25]
    },
    {
        "id": 678,
        "name": "Meowstic\nMale",
        "type": [
            "Psychic"
        ],
        "attack": 104,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 163,
        "catchRate": 75
    },
    {
        "id": 679,
        "name": "Honedge",
        "type": [
            "Steel",
            "Ghost"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 65,
        "catchRate": 180,
        "evolution": ["Doublade"],
        "evoLevel": [35]
    },
    {
        "id": 680,
        "name": "Doublade",
        "type": [
            "Steel",
            "Ghost"
        ],
        "attack": 150,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 157,
        "catchRate": 90,
        "evolution": ["Aegislash"],
        "evoLevel": ["Dusk_stone"]
    },
    {
        "id": 681,
        "name": "Aegislash\nBlade Forme",
        "type": [
            "Steel",
            "Ghost"
        ],
        "attack": 150,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 234,
        "catchRate": 45
    },
    {
        "id": 682,
        "name": "Spritzee",
        "type": [
            "Fairy"
        ],
        "attack": 78,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 68,
        "catchRate": 200,
        "evolution": ["Aromatisse"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 683,
        "name": "Aromatisse",
        "type": [
            "Fairy"
        ],
        "attack": 101,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 162,
        "catchRate": 140
    },
    {
        "id": 684,
        "name": "Swirlix",
        "type": [
            "Fairy"
        ],
        "attack": 66,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 68,
        "catchRate": 200,
        "evolution": ["Slurpuff"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 685,
        "name": "Slurpuff",
        "type": [
            "Fairy"
        ],
        "attack": 86,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 140
    },
    {
        "id": 686,
        "name": "Inkay",
        "type": [
            "Dark",
            "Psychic"
        ],
        "attack": 54,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 58,
        "catchRate": 190,
        "evolution": ["Malamar"],
        "evoLevel": [30]
    },
    {
        "id": 687,
        "name": "Malamar",
        "type": [
            "Dark",
            "Psychic"
        ],
        "attack": 92,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 169,
        "catchRate": 80
    },
    {
        "id": 688,
        "name": "Binacle",
        "type": [
            "Rock",
            "Water"
        ],
        "attack": 67,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 120,
        "evolution": ["Barbaracle"],
        "evoLevel": [39]
    },
    {
        "id": 689,
        "name": "Barbaracle",
        "type": [
            "Rock",
            "Water"
        ],
        "attack": 115,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 175,
        "catchRate": 45
    },
    {
        "id": 690,
        "name": "Skrelp",
        "type": [
            "Poison",
            "Water"
        ],
        "attack": 60,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 64,
        "catchRate": 225,
        "evolution": ["Dragalge"],
        "evoLevel": [48]
    },
    {
        "id": 691,
        "name": "Dragalge",
        "type": [
            "Poison",
            "Dragon"
        ],
        "attack": 123,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 55
    },
    {
        "id": 692,
        "name": "Clauncher",
        "type": [
            "Water"
        ],
        "attack": 63,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": 66,
        "catchRate": 225,
        "evolution": ["Clawitzer"],
        "evoLevel": [37]
    },
    {
        "id": 693,
        "name": "Clawitzer",
        "type": [
            "Water"
        ],
        "attack": 120,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": 100,
        "catchRate": 55
    },
    {
        "id": 694,
        "name": "Helioptile",
        "type": [
            "Electric",
            "Normal"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 58,
        "catchRate": 190,
        "evolution": ["Heliolisk"],
        "evoLevel": ["Sun_stone"]
    },
    {
        "id": 695,
        "name": "Heliolisk",
        "type": [
            "Electric",
            "Normal"
        ],
        "attack": 109,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 75
    },
    {
        "id": 696,
        "name": "Tyrunt",
        "type": [
            "Rock",
            "Dragon"
        ],
        "attack": 89,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 72,
        "catchRate": 45,
        "evolution": ["Tyrantrum"],
        "evoLevel": [39]
    },
    {
        "id": 697,
        "name": "Tyrantrum",
        "type": [
            "Rock",
            "Dragon"
        ],
        "attack": 121,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 182,
        "catchRate": 45
    },
    {
        "id": 698,
        "name": "Amaura",
        "type": [
            "Rock",
            "Ice"
        ],
        "attack": 77,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 72,
        "catchRate": 45,
        "evolution": ["Aurorus"],
        "evoLevel": [39]
    },
    {
        "id": 699,
        "name": "Aurorus",
        "type": [
            "Rock",
            "Ice"
        ],
        "attack": 123,
        "eggCycles": 30,
        "levelType": "mediumfast",
        "exp": 104,
        "catchRate": 45
    },
    {
        "id": 700,
        "name": "Sylveon",
        "type": [
            "Fairy"
        ],
        "attack": 130,
        "eggCycles": 35,
        "levelType": "mediumfast",
        "exp": 184,
        "catchRate": 45
    },
    {
        "id": 701,
        "name": "Hawlucha",
        "type": [
            "Fighting",
            "Flying"
        ],
        "attack": 118,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 175,
        "catchRate": 100
    },
    {
        "id": 702,
        "name": "Dedenne",
        "type": [
            "Electric",
            "Fairy"
        ],
        "attack": 101,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 151,
        "catchRate": 180
    },
    {
        "id": 703,
        "name": "Carbink",
        "type": [
            "Rock",
            "Fairy"
        ],
        "attack": 150,
        "eggCycles": 25,
        "levelType": "slow",
        "exp": 100,
        "catchRate": 60
    },
    {
        "id": 704,
        "name": "Goomy",
        "type": [
            "Dragon"
        ],
        "attack": 75,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 60,
        "catchRate": 45,
        "evolution": ["Sliggoo"],
        "evoLevel": [40]
    },
    {
        "id": 705,
        "name": "Sliggoo",
        "type": [
            "Dragon"
        ],
        "attack": 113,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 158,
        "catchRate": 45,
        "evolution": ["Goodra"],
        "evoLevel": [50]
    },
    {
        "id": 706,
        "name": "Goodra",
        "type": [
            "Dragon"
        ],
        "attack": 150,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 45
    },
    {
        "id": 707,
        "name": "Klefki",
        "type": [
            "Steel",
            "Fairy"
        ],
        "attack": 91,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 165,
        "catchRate": 75
    },
    {
        "id": 708,
        "name": "Phantump",
        "type": [
            "Ghost",
            "Grass"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 62,
        "catchRate": 120,
        "evolution": ["Trevenant"],
        "evoLevel": ["Trade_stone"]
    },
    {
        "id": 709,
        "name": "Trevenant",
        "type": [
            "Ghost",
            "Grass"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 166,
        "catchRate": 60
    },
    {
        "id": 710,
        "name": "Pumpkaboo\nAverage Size",
        "type": [
            "Ghost",
            "Grass"
        ],
        "attack": 70,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 67,
        "catchRate": 120
    },
    {
        "id": 711,
        "name": "Gourgeist\nAverage Size",
        "type": [
            "Ghost",
            "Grass"
        ],
        "attack": 122,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 60
    },
    {
        "id": 712,
        "name": "Bergmite",
        "type": [
            "Ice"
        ],
        "attack": 85,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 190,
        "evolution": ["Avalugg"],
        "evoLevel": [37]
    },
    {
        "id": 713,
        "name": "Avalugg",
        "type": [
            "Ice"
        ],
        "attack": 184,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 180,
        "catchRate": 55
    },
    {
        "id": 714,
        "name": "Noibat",
        "type": [
            "Flying",
            "Dragon"
        ],
        "attack": 55,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 49,
        "catchRate": 190,
        "evolution": ["Noivern"],
        "evoLevel": [48]
    },
    {
        "id": 715,
        "name": "Noivern",
        "type": [
            "Flying",
            "Dragon"
        ],
        "attack": 123,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 187,
        "catchRate": 45
    },
    {
        "id": 716,
        "name": "Xerneas",
        "type": [
            "Fairy"
        ],
        "attack": 131,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 306,
        "catchRate": 45
    },
    {
        "id": 717,
        "name": "Yveltal",
        "type": [
            "Dark",
            "Flying"
        ],
        "attack": 131,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 306,
        "catchRate": 45
    },
    {
        "id": 718,
        "name": "Zygarde\n50% Forme",
        "type": [
            "Dragon",
            "Ground"
        ],
        "attack": 121,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 719,
        "name": "Diancie",
        "type": [
            "Rock",
            "Fairy"
        ],
        "attack": 150,
        "eggCycles": 25,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 720,
        "name": "Hoopa\nHoopa Confined",
        "type": [
            "Psychic",
            "Ghost"
        ],
        "attack": 150,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 721,
        "name": "Volcanion",
        "type": [
            "Fire",
            "Water"
        ],
        "attack": 130,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 722,
        "name": "Rowlet",
        "type": [
            "Grass",
            "Flying"
        ],
        "attack": 68,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 64,
        "catchRate": 45,
        "evolution": ["Dartrix"],
        "evoLevel": [17]
    },
    {
        "id": 723,
        "name": "Dartrix",
        "type": [
            "Grass",
            "Flying"
        ],
        "attack": 78,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 147,
        "catchRate": 45,
        "evolution": ["Decidueye"],
        "evoLevel": [34]
    },
    {
        "id": 724,
        "name": "Decidueye",
        "type": [
            "Grass",
            "Ghost"
        ],
        "attack": 107,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 725,
        "name": "Litten",
        "type": [
            "Fire"
        ],
        "attack": 70,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 64,
        "catchRate": 45,
        "evolution": ["Torracat"],
        "evoLevel": [17]
    },
    {
        "id": 726,
        "name": "Torracat",
        "type": [
            "Fire"
        ],
        "attack": 90,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 147,
        "catchRate": 45,
        "evolution": ["Incineroar"],
        "evoLevel": [34]
    },
    {
        "id": 727,
        "name": "Incineroar",
        "type": [
            "Fire",
            "Dark"
        ],
        "attack": 115,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 728,
        "name": "Popplio",
        "type": [
            "Water"
        ],
        "attack": 66,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 64,
        "catchRate": 45,
        "evolution": ["Brionne"],
        "evoLevel": [17]
    },
    {
        "id": 729,
        "name": "Brionne",
        "type": [
            "Water"
        ],
        "attack": 91,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 147,
        "catchRate": 45,
        "evolution": ["Primarina"],
        "evoLevel": [34]
    },
    {
        "id": 730,
        "name": "Primarina",
        "type": [
            "Water",
            "Fairy"
        ],
        "attack": 126,
        "eggCycles": 15,
        "levelType": "mediumslow",
        "exp": 239,
        "catchRate": 45
    },
    {
        "id": 731,
        "name": "Pikipek",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 75,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 53,
        "catchRate": 255,
        "evolution": ["Trumbeak"],
        "evoLevel": [14]
    },
    {
        "id": 732,
        "name": "Trumbeak",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 85,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 124,
        "catchRate": 120,
        "evolution": ["Toucannon"],
        "evoLevel": [28]
    },
    {
        "id": 733,
        "name": "Toucannon",
        "type": [
            "Normal",
            "Flying"
        ],
        "attack": 120,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 218,
        "catchRate": 45
    },
    {
        "id": 734,
        "name": "Yungoos",
        "type": [
            "Normal"
        ],
        "attack": 70,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 51,
        "catchRate": 255,
        "evolution": ["Gumshoos"],
        "evoLevel": [20]
    },
    {
        "id": 735,
        "name": "Gumshoos",
        "type": [
            "Normal"
        ],
        "attack": 110,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 146,
        "catchRate": 127
    },
    {
        "id": 736,
        "name": "Grubbin",
        "type": [
            "Bug"
        ],
        "attack": 62,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 60,
        "catchRate": 255,
        "evolution": ["Charjabug"],
        "evoLevel": [20]
    },
    {
        "id": 737,
        "name": "Charjabug",
        "type": [
            "Bug",
            "Electric"
        ],
        "attack": 95,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 140,
        "catchRate": 120,
        "evolution": ["Vikavolt"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 738,
        "name": "Vikavolt",
        "type": [
            "Bug",
            "Electric"
        ],
        "attack": 145,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 225,
        "catchRate": 45
    },
    {
        "id": 739,
        "name": "Crabrawler",
        "type": [
            "Fighting"
        ],
        "attack": 82,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 68,
        "catchRate": 225,
        "evolution": ["Crabominable"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 740,
        "name": "Crabominable",
        "type": [
            "Fighting",
            "Ice"
        ],
        "attack": 132,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 167,
        "catchRate": 60
    },
    {
        "id": 741,
        "name": "Oricorio\nBaile Style",
        "type": [
            "Fire",
            "Flying"
        ],
        "attack": 98,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 167,
        "catchRate": 45
    },
    {
        "id": 742,
        "name": "Cutiefly",
        "type": [
            "Bug",
            "Fairy"
        ],
        "attack": 84,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 190,
        "evolution": ["Ribombee"],
        "evoLevel": [25]
    },
    {
        "id": 743,
        "name": "Ribombee",
        "type": [
            "Bug",
            "Fairy"
        ],
        "attack": 124,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 162,
        "catchRate": 75
    },
    {
        "id": 744,
        "name": "Rockruff",
        "type": [
            "Rock"
        ],
        "attack": 65,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 56,
        "catchRate": 190,
        "evolution": ["Lycanroc"],
        "evoLevel": [25]
    },
    {
        "id": 745,
        "name": "Lycanroc\nMidday Form",
        "type": [
            "Rock"
        ],
        "attack": 115,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 170,
        "catchRate": 90
    },
    {
        "id": 746,
        "name": "Wishiwashi\nSolo Form",
        "type": [
            "Water"
        ],
        "attack": 45,
        "eggCycles": 15,
        "levelType": "fast",
        "exp": 61,
        "catchRate": 60
    },
    {
        "id": 747,
        "name": "Mareanie",
        "type": [
            "Poison",
            "Water"
        ],
        "attack": 62,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 61,
        "catchRate": 190,
        "evolution": ["Toxapex"],
        "evoLevel": [38]
    },
    {
        "id": 748,
        "name": "Toxapex",
        "type": [
            "Poison",
            "Water"
        ],
        "attack": 152,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 173,
        "catchRate": 75
    },
    {
        "id": 749,
        "name": "Mudbray",
        "type": [
            "Ground"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 77,
        "catchRate": 190,
        "evolution": ["Mudsdale"],
        "evoLevel": [30]
    },
    {
        "id": 750,
        "name": "Mudsdale",
        "type": [
            "Ground"
        ],
        "attack": 125,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 175,
        "catchRate": 60
    },
    {
        "id": 751,
        "name": "Dewpider",
        "type": [
            "Water",
            "Bug"
        ],
        "attack": 72,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 54,
        "catchRate": 200,
        "evolution": ["Araquanid"],
        "evoLevel": [22]
    },
    {
        "id": 752,
        "name": "Araquanid",
        "type": [
            "Water",
            "Bug"
        ],
        "attack": 132,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 159,
        "catchRate": 100
    },
    {
        "id": 753,
        "name": "Fomantis",
        "type": [
            "Grass"
        ],
        "attack": 55,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 50,
        "catchRate": 190,
        "evolution": ["Lurantis"],
        "evoLevel": [34]
    },
    {
        "id": 754,
        "name": "Lurantis",
        "type": [
            "Grass"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 75
    },
    {
        "id": 755,
        "name": "Morelull",
        "type": [
            "Grass",
            "Fairy"
        ],
        "attack": 75,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 57,
        "catchRate": 190,
        "evolution": ["Shiinotic"],
        "evoLevel": [24]
    },
    {
        "id": 756,
        "name": "Shiinotic",
        "type": [
            "Grass",
            "Fairy"
        ],
        "attack": 100,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 142,
        "catchRate": 75
    },
    {
        "id": 757,
        "name": "Salandit",
        "type": [
            "Poison",
            "Fire"
        ],
        "attack": 77,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 64,
        "catchRate": 120,
        "evolution": ["Salazzle"],
        "evoLevel": [33]
    },
    {
        "id": 758,
        "name": "Salazzle",
        "type": [
            "Poison",
            "Fire"
        ],
        "attack": 117,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 45
    },
    {
        "id": 759,
        "name": "Stufful",
        "type": [
            "Normal",
            "Fighting"
        ],
        "attack": 75,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 68,
        "catchRate": 140,
        "evolution": ["Bewear"],
        "evoLevel": [27]
    },
    {
        "id": 760,
        "name": "Bewear",
        "type": [
            "Normal",
            "Fighting"
        ],
        "attack": 125,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 175,
        "catchRate": 70
    },
    {
        "id": 761,
        "name": "Bounsweet",
        "type": [
            "Grass"
        ],
        "attack": 42,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 42,
        "catchRate": 235,
        "evolution": ["Steenee"],
        "evoLevel": [18]
    },
    {
        "id": 762,
        "name": "Steenee",
        "type": [
            "Grass"
        ],
        "attack": 62,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 102,
        "catchRate": 120,
        "evolution": ["Tsareena"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 763,
        "name": "Tsareena",
        "type": [
            "Grass"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "mediumslow",
        "exp": 230,
        "catchRate": 45
    },
    {
        "id": 764,
        "name": "Comfey",
        "type": [
            "Fairy"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "fast",
        "exp": 170,
        "catchRate": 60
    },
    {
        "id": 765,
        "name": "Oranguru",
        "type": [
            "Normal",
            "Psychic"
        ],
        "attack": 110,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 172,
        "catchRate": 45
    },
    {
        "id": 766,
        "name": "Passimian",
        "type": [
            "Fighting"
        ],
        "attack": 120,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 172,
        "catchRate": 45
    },
    {
        "id": 767,
        "name": "Wimpod",
        "type": [
            "Bug",
            "Water"
        ],
        "attack": 80,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 46,
        "catchRate": 90,
        "evolution": ["Golisopod"],
        "evoLevel": [30]
    },
    {
        "id": 768,
        "name": "Golisopod",
        "type": [
            "Bug",
            "Water"
        ],
        "attack": 140,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 186,
        "catchRate": 45
    },
    {
        "id": 769,
        "name": "Sandygast",
        "type": [
            "Ghost",
            "Ground"
        ],
        "attack": 80,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 64,
        "catchRate": 140,
        "evolution": ["Palossand"],
        "evoLevel": [42]
    },
    {
        "id": 770,
        "name": "Palossand",
        "type": [
            "Ghost",
            "Ground"
        ],
        "attack": 110,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 168,
        "catchRate": 60
    },
    {
        "id": 771,
        "name": "Pyukumuku",
        "type": [
            "Water"
        ],
        "attack": 130,
        "eggCycles": 15,
        "levelType": "fast",
        "exp": 144,
        "catchRate": 60
    },
    {
        "id": 772,
        "name": "Type: Null",
        "type": [
            "Normal"
        ],
        "attack": 95,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 107,
        "catchRate": 3,
        "evolution": ["Silvally"],
        "evoLevel": [100]
    },
    {
        "id": 773,
        "name": "Silvally",
        "type": [
            "Normal"
        ],
        "attack": 95,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 3
    },
    {
        "id": 774,
        "name": "Minior\nMeteor Form",
        "type": [
            "Rock",
            "Flying"
        ],
        "attack": 100,
        "eggCycles": 25,
        "levelType": "mediumslow",
        "exp": 154,
        "catchRate": 30
    },
    {
        "id": 775,
        "name": "Komala",
        "type": [
            "Normal"
        ],
        "attack": 115,
        "eggCycles": 20,
        "levelType": "slow",
        "exp": 168,
        "catchRate": 45
    },
    {
        "id": 776,
        "name": "Turtonator",
        "type": [
            "Fire",
            "Dragon"
        ],
        "attack": 135,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 170,
        "catchRate": 70
    },
    {
        "id": 777,
        "name": "Togedemaru",
        "type": [
            "Electric",
            "Steel"
        ],
        "attack": 98,
        "eggCycles": 10,
        "levelType": "mediumfast",
        "exp": 152,
        "catchRate": 180
    },
    {
        "id": 778,
        "name": "Mimikyu",
        "type": [
            "Ghost",
            "Fairy"
        ],
        "attack": 105,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 167,
        "catchRate": 45
    },
    {
        "id": 779,
        "name": "Bruxish",
        "type": [
            "Water",
            "Psychic"
        ],
        "attack": 105,
        "eggCycles": 15,
        "levelType": "mediumfast",
        "exp": 166,
        "catchRate": 80
    },
    {
        "id": 780,
        "name": "Drampa",
        "type": [
            "Normal",
            "Dragon"
        ],
        "attack": 135,
        "eggCycles": 20,
        "levelType": "mediumfast",
        "exp": 170,
        "catchRate": 70
    },
    {
        "id": 781,
        "name": "Dhelmise",
        "type": [
            "Ghost",
            "Grass"
        ],
        "attack": 131,
        "eggCycles": 25,
        "levelType": "mediumfast",
        "exp": 181,
        "catchRate": 25
    },
    {
        "id": 782,
        "name": "Jangmo-o",
        "type": [
            "Dragon"
        ],
        "attack": 65,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 60,
        "catchRate": 45,
        "evolution": ["Hakamo-o"],
        "evoLevel": [35]
    },
    {
        "id": 783,
        "name": "Hakamo-o",
        "type": [
            "Dragon",
            "Fighting"
        ],
        "attack": 90,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 147,
        "catchRate": 45,
        "evolution": ["Kommo-o"],
        "evoLevel": [45]
    },
    {
        "id": 784,
        "name": "Kommo-o",
        "type": [
            "Dragon",
            "Fighting"
        ],
        "attack": 125,
        "eggCycles": 40,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 45
    },
    {
        "id": 785,
        "name": "Tapu Koko",
        "type": [
            "Electric",
            "Fairy"
        ],
        "attack": 130,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": null,
        "catchRate": 3
    },
    {
        "id": 786,
        "name": "Tapu Lele",
        "type": [
            "Psychic",
            "Fairy"
        ],
        "attack": 130,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": null,
        "catchRate": 3
    },
    {
        "id": 787,
        "name": "Tapu Bulu",
        "type": [
            "Grass",
            "Fairy"
        ],
        "attack": 130,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": null,
        "catchRate": 3
    },
    {
        "id": 788,
        "name": "Tapu Fini",
        "type": [
            "Water",
            "Fairy"
        ],
        "attack": 130,
        "eggCycles": 15,
        "levelType": "slow",
        "exp": null,
        "catchRate": 3
    },
    {
        "id": 789,
        "name": "Cosmog",
        "type": [
            "Psychic"
        ],
        "attack": 43,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 40,
        "catchRate": 45,
        "evolution": ["Cosmoem"],
        "evoLevel": [43]
    },
    {
        "id": 790,
        "name": "Cosmoem",
        "type": [
            "Psychic"
        ],
        "attack": 131,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45,
        "evolution": ["Solgaleo"],
        "evoLevel": [53]
    },
    {
        "id": 791,
        "name": "Solgaleo",
        "type": [
            "Psychic",
            "Steel"
        ],
        "attack": 137,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 792,
        "name": "Lunala",
        "type": [
            "Psychic",
            "Ghost"
        ],
        "attack": 137,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 793,
        "name": "Nihilego",
        "type": [
            "Rock",
            "Poison"
        ],
        "attack": 131,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 794,
        "name": "Buzzwole",
        "type": [
            "Bug",
            "Fighting"
        ],
        "attack": 139,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 795,
        "name": "Pheromosa",
        "type": [
            "Bug",
            "Fighting"
        ],
        "attack": 151,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 796,
        "name": "Xurkitree",
        "type": [
            "Electric"
        ],
        "attack": 173,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 797,
        "name": "Celesteela",
        "type": [
            "Steel",
            "Flying"
        ],
        "attack": 107,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 798,
        "name": "Kartana",
        "type": [
            "Grass",
            "Steel"
        ],
        "attack": 181,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 799,
        "name": "Guzzlord",
        "type": [
            "Dark",
            "Dragon"
        ],
        "attack": 223,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 45
    },
    {
        "id": 800,
        "name": "Necrozma",
        "type": [
            "Psychic"
        ],
        "attack": 127,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 255
    },
    {
        "id": 801,
        "name": "Magearna",
        "type": [
            "Steel",
            "Fairy"
        ],
        "attack": 130,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 3
    },
    {
        "id": 802,
        "name": "Marshadow",
        "type": [
            "Fighting",
            "Ghost"
        ],
        "attack": 125,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": null,
        "catchRate": 3
    },
    {
        "id": 803,
        "name": "Poipole",
        "type": [
            "Poison"
        ],
        "attack": 73,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 189,
        "catchRate": 45,
        "evolution": ["Naganadel"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 804,
        "name": "Naganadel",
        "type": [
            "Poison",
            "Dragon"
        ],
        "attack": 127,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 243,
        "catchRate": 45
    },
    {
        "id": 805,
        "name": "Stakataka",
        "type": [
            "Rock",
            "Steel"
        ],
        "attack": 211,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 257,
        "catchRate": 30
    },
    {
        "id": 806,
        "name": "Blacephalon",
        "type": [
            "Fire",
            "Ghost"
        ],
        "attack": 151,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 257,
        "catchRate": 30
    },
    {
        "id": 807,
        "name": "Zeraora",
        "type": [
            "Electric"
        ],
        "attack": 143,
        "eggCycles": 120,
        "levelType": "slow",
        "exp": 270,
        "catchRate": 3
    },
    {
        "id": 808,
        "name": "Meltan",
        "type": [
            "Steel"
        ],
        "attack": 65,
        "levelType": "slow",
        "catchRate": 3,
        "evolution": ["Melmetal"],
        "evoLevel": ["_____TODO_____"]
    },
    {
        "id": 809,
        "name": "Melmetal",
        "type": [
            "Steel"
        ],
        "attack": 143,
        "levelType": "slow",
        "catchRate": 3
    }
];

// TODO move to its own initialize method that gets called on game start.
pokemonList.forEach(p=>{
    if (p.evolution){
        if (p.evolution.constructor !== Array){
            p.evolution = [p.evolution];
        }
        p.evolution.forEach(evo => pokemonDevolutionMap[evo] = p.name);
    }
    if (p.evoLevel && p.evoLevel.constructor !== Array){
        p.evoLevel = [p.evoLevel];
    }
    pokemonMap[p.name] = p;
    pokemonMapId[p.id] = p;
});
