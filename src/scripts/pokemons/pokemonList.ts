const pokemonList = [
    {
        "id": 1,
        "name": "Bulbasaur",
        "catchRate": 45,
        "evolution": "Ivysaur",
        "evoLevel": 16, "type": [
        "Grass",
        "Poison"
    ],
        "attack": 65,
        "route": 100,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 64,
        "eggCycles": 20
    },
    {
        "id": 2,
        "name": "Ivysaur",
        "catchRate": 45,
        "evolution": "Venusaur",
        "evoLevel": 32, "type": [
        "Grass",
        "Poison"
    ],
        "attack": 80,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 142,
        "eggCycles": 20
    },
    {
        "id": 3,
        "name": "Venusaur",
        "catchRate": 45,
        "evolution": null, "type": [
        "Grass",
        "Poison"
    ],
        "attack": 100,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 236,
        "eggCycles": 20
    },
    {
        "id": 4,
        "name": "Charmander",
        "catchRate": 45,
        "evolution": "Charmeleon",
        "evoLevel": 16, "type": [
        "Fire"
    ],
        "attack": 60,
        "route": 100,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 62,
        "eggCycles": 20
    },
    {
        "id": 5,
        "name": "Charmeleon",
        "catchRate": 45,
        "evolution": "Charizard",
        "evoLevel": 36, "type": [
        "Fire"
    ],
        "attack": 80,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 142,
        "eggCycles": 20
    },
    {
        "id": 6,
        "name": "Charizard",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null,

        "type": [
            "Fire",
            "Flying"
        ],
        "attack": 105,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 240,
        "eggCycles": 20
    },
    {
        "id": 7,
        "name": "Squirtle",
        "catchRate": 45,
        "evolution": "Wartortle",
        "evoLevel": 16, "type": [
        "Water"
    ],
        "attack": 50,
        "route": 100,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 63,
        "eggCycles": 20
    },
    {
        "id": 8,
        "name": "Wartortle",
        "catchRate": 45,
        "evolution": "Blastoise",
        "evoLevel": 36, "type": [
        "Water"
    ],
        "attack": 65,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 142,
        "eggCycles": 20
    },
    {
        "id": 9,
        "name": "Blastoise",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water"
    ],
        "attack": 85,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 239,
        "eggCycles": 20
    },
    {
        "id": 10,
        "name": "Caterpie",
        "catchRate": 255,
        "evolution": "Metapod",
        "evoLevel": 7, "type": [
        "Bug"
    ],
        "attack": 30,
        "route": 2,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 39,
        "eggCycles": 10
    },
    {
        "id": 11,
        "name": "Metapod",
        "catchRate": 120,
        "evolution": "Butterfree",
        "evoLevel": 10, "type": [
        "Bug"
    ],
        "attack": 25,
        "route": 24,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 72,
        "eggCycles": 10
    },
    {
        "id": 12,
        "name": "Butterfree",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Bug",
        "Flying"
    ],
        "attack": 90,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 173,
        "eggCycles": 10
    },
    {
        "id": 13,
        "name": "Weedle",
        "catchRate": 255,
        "evolution": "Kakuna",
        "evoLevel": 7, "type": [
        "Bug",
        "Poison"
    ],
        "attack": 35,
        "route": 2,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 39,
        "eggCycles": 10
    },
    {
        "id": 14,
        "name": "Kakuna",
        "catchRate": 120,
        "evolution": "Beedrill",
        "evoLevel": 10, "type": [
        "Bug",
        "Poison"
    ],
        "attack": 25,
        "route": 24,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 72,
        "eggCycles": 10
    },
    {
        "id": 15,
        "name": "Beedrill",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Bug",
        "Poison"
    ],
        "attack": 90,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 173,
        "eggCycles": 10
    },
    {
        "id": 16,
        "name": "Pidgey",
        "catchRate": 255,
        "evolution": "Pidgeotto",
        "evoLevel": 18, "type": [
        "Normal",
        "Flying"
    ],
        "attack": 45,
        "route": 1,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 50,
        "eggCycles": 15
    },
    {
        "id": 17,
        "name": "Pidgeotto",
        "catchRate": 120,
        "evolution": "Pidgeot",
        "evoLevel": 36, "type": [
        "Normal",
        "Flying"
    ],
        "attack": 60,
        "route": 24,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 122,
        "eggCycles": 15
    },
    {
        "id": 18,
        "name": "Pidgeot",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal",
        "Flying"
    ],
        "attack": 80,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 211,
        "eggCycles": 15
    },
    {
        "id": 19,
        "name": "Rattata",
        "catchRate": 255,
        "evolution": "Raticate",
        "evoLevel": 20, "type": [
        "Normal"
    ],
        "attack": 56,
        "route": 1,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 51,
        "eggCycles": 15
    },
    {
        "id": 20,
        "name": "Raticate",
        "catchRate": 127,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 81,
        "route": 16,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 145,
        "eggCycles": 15
    },
    {
        "id": 21,
        "name": "Spearow",
        "catchRate": 255,
        "evolution": "Fearow",
        "evoLevel": 20, "type": [
        "Normal",
        "Flying"
    ],
        "attack": 60,
        "route": 3,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 52,
        "eggCycles": 15
    },
    {
        "id": 22,
        "name": "Fearow",
        "catchRate": 90,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal",
        "Flying"
    ],
        "attack": 90,
        "route": 9,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 155,
        "eggCycles": 15
    },
    {
        "id": 23,
        "name": "Ekans",
        "catchRate": 255,
        "evolution": "Arbok",
        "evoLevel": 22, "type": [
        "Poison"
    ],
        "attack": 60,
        "route": 4,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 58,
        "eggCycles": 20
    },
    {
        "id": 24,
        "name": "Arbok",
        "catchRate": 90,
        "evolution": null,
        "evoLevel": null, "type": [
        "Poison"
    ],
        "attack": 85,
        "route": 23,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 153,
        "eggCycles": 20
    },
    {
        "id": 25,
        "name": "Pikachu",
        "catchRate": 190,
        "evolution": "Raichu",
        "evoLevel": "Thunder Stone", "type": [
        "Electric"
    ],
        "attack": 55,
        "route": 25,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 105,
        "eggCycles": 20
    },
    {
        "id": 26,
        "name": "Raichu",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Electric"
    ],
        "attack": 90,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 214,
        "eggCycles": 20
    },
    {
        "id": 27,
        "name": "Sandshrew",
        "catchRate": 255,
        "evolution": "Sandslash",
        "evoLevel": 22, "type": [
        "Ground"
    ],
        "attack": 75,
        "route": 3,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 60,
        "eggCycles": 20
    },
    {
        "id": 28,
        "name": "Sandslash",
        "catchRate": 90,
        "evolution": null,
        "evoLevel": null, "type": [
        "Ground"
    ],
        "attack": 100,
        "route": 23,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 158,
        "eggCycles": 20
    },
    {
        "id": 29,
        "name": "Nidoran(F)",
        "catchRate": 235,
        "evolution": "Nidorina",
        "evoLevel": 16, "type": [
        "Poison"
    ],
        "attack": 47,
        "route": 2,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 55,
        "eggCycles": 20
    },
    {
        "id": 30,
        "name": "Nidorina",
        "catchRate": 120,
        "evolution": "Nidoqueen",
        "evoLevel": "Moon Stone", "type": [
        "Poison"
    ],
        "attack": 62,
        "route": 9,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 128,
        "eggCycles": 20
    },
    {
        "id": 31,
        "name": "Nidoqueen",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Poison",
        "Ground"
    ],
        "attack": 92,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 223,
        "eggCycles": 20
    },
    {
        "id": 32,
        "name": "Nidoran(M)",
        "catchRate": 235,
        "evolution": "Nidorino",
        "evoLevel": 16, "type": [
        "Poison"
    ],
        "attack": 57,
        "route": 2,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 55,
        "eggCycles": 20
    },
    {
        "id": 33,
        "name": "Nidorino",
        "catchRate": 120,
        "evolution": "Nidoking",
        "evoLevel": "Moon Stone", "type": [
        "Poison"
    ],
        "attack": 72,
        "route": 9,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 128,
        "eggCycles": 20
    },
    {
        "id": 34,
        "name": "Nidoking",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Poison",
        "Ground"
    ],
        "attack": 102,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 223,
        "eggCycles": 20
    },
    {
        "id": 35,
        "name": "Clefairy",
        "catchRate": 150,
        "evolution": "Clefable",
        "evoLevel": "Moon Stone", "type": [
        "Fairy"
    ],
        "attack": 60,
        "route": 25,
        "health": 100,
        "levelType": "fast",
        "baseXpGain": 113,
        "eggCycles": 20
    },
    {
        "id": 36,
        "name": "Clefable",
        "catchRate": 25,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fairy"
    ],
        "attack": 95,
        "health": 100,
        "levelType": "fast",
        "baseXpGain": 213,
        "eggCycles": 20
    },
    {
        "id": 37,
        "name": "Vulpix",
        "catchRate": 190,
        "evolution": "Ninetales",
        "evoLevel": "Fire Stone", "type": [
        "Fire"
    ],
        "attack": 50,
        "route": 7,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 60,
        "eggCycles": 20
    },
    {
        "id": 38,
        "name": "Ninetales",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fire"
    ],
        "attack": 81,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 177,
        "eggCycles": 20
    },
    {
        "id": 39,
        "name": "Jigglypuff",
        "catchRate": 170,
        "evolution": "Wigglytuff",
        "evoLevel": "Moon Stone", "type": [
        "Normal",
        "Fairy"
    ],
        "attack": 45,
        "route": 3,
        "health": 100,
        "levelType": "fast",
        "baseXpGain": 95,
        "eggCycles": 20
    },
    {
        "id": 40,
        "name": "Wigglytuff",
        "catchRate": 50,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal",
        "Fairy"
    ],
        "attack": 85,
        "health": 100,
        "levelType": "fast",
        "baseXpGain": 191,
        "eggCycles": 20
    },
    {
        "id": 41,
        "name": "Zubat",
        "catchRate": 255,
        "evolution": "Golbat",
        "evoLevel": 22, "type": [
        "Poison",
        "Flying"
    ],
        "attack": 45,
        "route": 26,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 49,
        "eggCycles": 15
    },
    {
        "id": 42,
        "name": "Golbat",
        "catchRate": 90,
        "evolution": null,
        "evoLevel": null, "type": [
        "Poison",
        "Flying"
    ],
        "attack": 80,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 159,
        "eggCycles": 15
    },
    {
        "id": 43,
        "name": "Oddish",
        "catchRate": 255,
        "evolution": "Gloom",
        "evoLevel": 21, "type": [
        "Grass",
        "Poison"
    ],
        "attack": 75,
        "route": 5,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 64,
        "eggCycles": 20
    },
    {
        "id": 44,
        "name": "Gloom",
        "catchRate": 120,
        "evolution": "Vileplume",
        "evoLevel": "Leaf Stone", "type": [
        "Grass",
        "Poison"
    ],
        "attack": 85,
        "route": 12,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 138,
        "eggCycles": 20
    },
    {
        "id": 45,
        "name": "Vileplume",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Grass",
        "Poison"
    ],
        "attack": 110,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 216,
        "eggCycles": 20
    },
    {
        "id": 46,
        "name": "Paras",
        "catchRate": 190,
        "evolution": "Parasect",
        "evoLevel": 24, "type": [
        "Bug",
        "Grass"
    ],
        "attack": 70,
        "route": 27,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 57,
        "eggCycles": 20
    },
    {
        "id": 47,
        "name": "Parasect",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Bug",
        "Grass"
    ],
        "attack": 95,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 142,
        "eggCycles": 20
    },
    {
        "id": 48,
        "name": "Venonat",
        "catchRate": 190,
        "evolution": "Venomoth",
        "evoLevel": 31, "type": [
        "Bug",
        "Poison"
    ],
        "attack": 55,
        "route": 12,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 61,
        "eggCycles": 20
    },
    {
        "id": 49,
        "name": "Venomoth",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Bug",
        "Poison"
    ],
        "attack": 90,
        "route": 14,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 158,
        "eggCycles": 20
    },
    {
        "id": 50,
        "name": "Diglett",
        "catchRate": 255,
        "evolution": "Dugtrio",
        "evoLevel": 26, "type": [
        "Ground"
    ],
        "attack": 55,
        "route": 28,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 53,
        "eggCycles": 20
    },
    {
        "id": 51,
        "name": "Dugtrio",
        "catchRate": 50,
        "evolution": null,
        "evoLevel": null, "type": [
        "Ground"
    ],
        "attack": 80,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 142,
        "eggCycles": 20
    },
    {
        "id": 52,
        "name": "Meowth",
        "catchRate": 255,
        "evolution": "Persian",
        "evoLevel": 28, "type": [
        "Normal"
    ],
        "attack": 45,
        "route": 5,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 58,
        "eggCycles": 20
    },
    {
        "id": 53,
        "name": "Persian",
        "catchRate": 90,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 70,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 154,
        "eggCycles": 20
    },
    {
        "id": 54,
        "name": "Psyduck",
        "catchRate": 190,
        "evolution": "Golduck",
        "evoLevel": 33, "type": [
        "Water"
    ],
        "attack": 65,
        "route": 4,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 64,
        "eggCycles": 20
    },
    {
        "id": 55,
        "name": "Golduck",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water"
    ],
        "attack": 95,
        "route": 6,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 175,
        "eggCycles": 20
    },
    {
        "id": 56,
        "name": "Mankey",
        "catchRate": 190,
        "evolution": "Primeape",
        "evoLevel": 28, "type": [
        "Fighting"
    ],
        "attack": 80,
        "route": 3,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 61,
        "eggCycles": 20
    },
    {
        "id": 57,
        "name": "Primeape",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fighting"
    ],
        "attack": 105,
        "route": 23,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 159,
        "eggCycles": 20
    },
    {
        "id": 58,
        "name": "Growlithe",
        "catchRate": 190,
        "evolution": "Arcanine",
        "evoLevel": "Fire Stone", "type": [
        "Fire"
    ],
        "attack": 70,
        "route": 7,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 70,
        "eggCycles": 20
    },
    {
        "id": 59,
        "name": "Arcanine",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fire"
    ],
        "attack": 110,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 194,
        "eggCycles": 20
    },
    {
        "id": 60,
        "name": "Poliwag",
        "catchRate": 255,
        "evolution": "Poliwhirl",
        "evoLevel": 25, "type": [
        "Water"
    ],
        "attack": 50,
        "route": 4,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 60,
        "eggCycles": 20
    },
    {
        "id": 61,
        "name": "Poliwhirl",
        "catchRate": 120,
        "evolution": "Poliwrath",
        "evoLevel": "Water Stone", "type": [
        "Water"
    ],
        "attack": 65,
        "route": 10,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 135,
        "eggCycles": 20
    },
    {
        "id": 62,
        "name": "Poliwrath",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water",
        "Fighting"
    ],
        "attack": 95,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 225,
        "eggCycles": 20
    },
    {
        "id": 63,
        "name": "Abra",
        "catchRate": 200,
        "evolution": "Kadabra",
        "evoLevel": 16, "type": [
        "Psychic"
    ],
        "attack": 105,
        "route": 5,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 62,
        "eggCycles": 20
    },
    {
        "id": 64,
        "name": "Kadabra",
        "catchRate": 100,
        "evolution": "Alakazam",
        "evoLevel": "Trade Stone", "type": [
        "Psychic"
    ],
        "attack": 120,
        "route": 8,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 140,
        "eggCycles": 20
    },
    {
        "id": 65,
        "name": "Alakazam",
        "catchRate": 50,
        "evolution": null,
        "evoLevel": null, "type": [
        "Psychic"
    ],
        "attack": 135,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 221,
        "eggCycles": 20
    },
    {
        "id": 66,
        "name": "Machop",
        "catchRate": 180,
        "evolution": "Machoke",
        "evoLevel": 28, "type": [
        "Fighting"
    ],
        "attack": 80,
        "route": 10,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 61,
        "eggCycles": 20
    },
    {
        "id": 67,
        "name": "Machoke",
        "catchRate": 90,
        "evolution": "Machamp",
        "evoLevel": "Trade Stone", "type": [
        "Fighting"
    ],
        "attack": 100,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 142,
        "eggCycles": 20
    },
    {
        "id": 68,
        "name": "Machamp",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fighting"
    ],
        "attack": 130,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 227,
        "eggCycles": 20
    },
    {
        "id": 69,
        "name": "Bellsprout",
        "catchRate": 255,
        "evolution": "Weepinbell",
        "evoLevel": 21, "type": [
        "Grass",
        "Poison"
    ],
        "attack": 75,
        "route": 5,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 60,
        "eggCycles": 20
    },
    {
        "id": 70,
        "name": "Weepinbell",
        "catchRate": 120,
        "evolution": "Victreebel",
        "evoLevel": "Leaf Stone", "type": [
        "Grass",
        "Poison"
    ],
        "attack": 90,
        "route": 12,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 137,
        "eggCycles": 20
    },
    {
        "id": 71,
        "name": "Victreebel",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Grass",
        "Poison"
    ],
        "attack": 105,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 216,
        "eggCycles": 20
    },
    {
        "id": 72,
        "name": "Tentacool",
        "catchRate": 190,
        "evolution": "Tentacruel",
        "evoLevel": 30, "type": [
        "Water",
        "Poison"
    ],
        "attack": 50,
        "route": 11,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 67,
        "eggCycles": 20
    },
    {
        "id": 73,
        "name": "Tentacruel",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water",
        "Poison"
    ],
        "attack": 80,
        "route": 19,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 180,
        "eggCycles": 20
    },
    {
        "id": 74,
        "name": "Geodude",
        "catchRate": 255,
        "evolution": "Graveler",
        "evoLevel": 25, "type": [
        "Rock",
        "Ground"
    ],
        "attack": 80,
        "route": 18,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 60,
        "eggCycles": 15
    },
    {
        "id": 75,
        "name": "Graveler",
        "catchRate": 120,
        "evolution": "Golem",
        "evoLevel": "Trade Stone", "type": [
        "Rock",
        "Ground"
    ],
        "attack": 95,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 137,
        "eggCycles": 15
    },
    {
        "id": 76,
        "name": "Golem",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Rock",
        "Ground"
    ],
        "attack": 120,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 218,
        "eggCycles": 15
    },
    {
        "id": 77,
        "name": "Ponyta",
        "catchRate": 190,
        "evolution": "Rapidash",
        "evoLevel": 40, "type": [
        "Fire"
    ],
        "attack": 85,
        "route": 17,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 82,
        "eggCycles": 20
    },
    {
        "id": 78,
        "name": "Rapidash",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fire"
    ],
        "attack": 100,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 175,
        "eggCycles": 20
    },
    {
        "id": 79,
        "name": "Slowpoke",
        "catchRate": 190,
        "evolution": "Slowbro",
        "evoLevel": 37, "type": [
        "Water",
        "Psychic"
    ],
        "attack": 65,
        "route": 10,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 63,
        "eggCycles": 20
    },
    {
        "id": 80,
        "name": "Slowbro",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water",
        "Psychic"
    ],
        "attack": 100,
        "route": 12,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 172,
        "eggCycles": 20
    },
    {
        "id": 81,
        "name": "Magnemite",
        "catchRate": 190,
        "evolution": "Magneton",
        "evoLevel": 30, "type": [
        "Electric",
        "Steel"
    ],
        "attack": 95,
        "route": 10,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 65,
        "eggCycles": 20
    },
    {
        "id": 82,
        "name": "Magneton",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Electric",
        "Steel"
    ],
        "attack": 120,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 163,
        "eggCycles": 20
    },
    {
        "id": 83,
        "name": "Farfetch'd",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal",
        "Flying"
    ],
        "attack": 65,
        "route": 12,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 123,
        "eggCycles": 20
    },
    {
        "id": 84,
        "name": "Doduo",
        "catchRate": 190,
        "evolution": "Dodrio",
        "evoLevel": 31, "type": [
        "Normal",
        "Flying"
    ],
        "attack": 85,
        "route": 16,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 62,
        "eggCycles": 20
    },
    {
        "id": 85,
        "name": "Dodrio",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal",
        "Flying"
    ],
        "attack": 110,
        "route": 17,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 161,
        "eggCycles": 20
    },
    {
        "id": 86,
        "name": "Seel",
        "catchRate": 190,
        "evolution": "Dewgong",
        "evoLevel": 34, "type": [
        "Water"
    ],
        "attack": 45,
        "route": 30,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 65,
        "eggCycles": 20
    },
    {
        "id": 87,
        "name": "Dewgong",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water",
        "Ice"
    ],
        "attack": 70,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 166,
        "eggCycles": 20
    },
    {
        "id": 88,
        "name": "Grimer",
        "catchRate": 190,
        "evolution": "Muk",
        "evoLevel": 38, "type": [
        "Poison"
    ],
        "attack": 80,
        "route": 31,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 65,
        "eggCycles": 20
    },
    {
        "id": 89,
        "name": "Muk",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Poison"
    ],
        "attack": 105,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 175,
        "eggCycles": 20
    },
    {
        "id": 90,
        "name": "Shellder",
        "catchRate": 190,
        "evolution": "Cloyster",
        "evoLevel": "Water Stone", "type": [
        "Water"
    ],
        "attack": 65,
        "route": 6,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 61,
        "eggCycles": 20
    },
    {
        "id": 91,
        "name": "Cloyster",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water",
        "Ice"
    ],
        "attack": 95,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 184,
        "eggCycles": 20
    },
    {
        "id": 92,
        "name": "Gastly",
        "catchRate": 190,
        "evolution": "Haunter",
        "evoLevel": 25, "type": [
        "Ghost",
        "Poison"
    ],
        "attack": 100,
        "route": 32,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 62,
        "eggCycles": 20
    },
    {
        "id": 93,
        "name": "Haunter",
        "catchRate": 90,
        "evolution": "Gengar",
        "evoLevel": "Trade Stone", "type": [
        "Ghost",
        "Poison"
    ],
        "attack": 115,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 142,
        "eggCycles": 20
    },
    {
        "id": 94,
        "name": "Gengar",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Ghost",
        "Poison"
    ],
        "attack": 130,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 225,
        "eggCycles": 20
    },
    {
        "id": 95,
        "name": "Onix",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Rock",
        "Ground"
    ],
        "attack": 45,
        "route": 32,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 77,
        "eggCycles": 25
    },
    {
        "id": 96,
        "name": "Drowzee",
        "catchRate": 190,
        "evolution": "Hypno",
        "evoLevel": 26, "type": [
        "Psychic"
    ],
        "attack": 48,
        "route": 11,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 66,
        "eggCycles": 20
    },
    {
        "id": 97,
        "name": "Hypno",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Psychic"
    ],
        "attack": 73,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 169,
        "eggCycles": 20
    },
    {
        "id": 98,
        "name": "Krabby",
        "catchRate": 225,
        "evolution": "Kingler",
        "evoLevel": 28, "type": [
        "Water"
    ],
        "attack": 105,
        "route": 4,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 65,
        "eggCycles": 20
    },
    {
        "id": 99,
        "name": "Kingler",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water"
    ],
        "attack": 130,
        "route": 10,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 166,
        "eggCycles": 20
    },
    {
        "id": 100,
        "name": "Voltorb",
        "catchRate": 190,
        "evolution": "Electrode",
        "evoLevel": 30, "type": [
        "Electric"
    ],
        "attack": 55,
        "route": 10,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 66,
        "eggCycles": 20
    },
    {
        "id": 101,
        "name": "Electrode",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Electric"
    ],
        "attack": 80,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 168,
        "eggCycles": 20
    },
    {
        "id": 102,
        "name": "Exeggcute",
        "catchRate": 90,
        "evolution": "Exeggutor",
        "evoLevel": "Leaf Stone", "type": [
        "Grass",
        "Psychic"
    ],
        "attack": 60,
        "route": 32,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 65,
        "eggCycles": 20
    },
    {
        "id": 103,
        "name": "Exeggutor",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Grass",
        "Psychic"
    ],
        "attack": 125,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 182,
        "eggCycles": 20
    },
    {
        "id": 104,
        "name": "Cubone",
        "catchRate": 190,
        "evolution": "Marowak",
        "evoLevel": 28, "type": [
        "Ground"
    ],
        "attack": 50,
        "route": 33,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 64,
        "eggCycles": 20
    },
    {
        "id": 105,
        "name": "Marowak",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Ground"
    ],
        "attack": 80,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 149,
        "eggCycles": 20
    },
    {
        "id": 106,
        "name": "Hitmonlee",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fighting"
    ],
        "attack": 120,
        "route": 34,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 159,
        "eggCycles": 25
    },
    {
        "id": 107,
        "name": "Hitmonchan",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fighting"
    ],
        "attack": 105,
        "route": 34,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 159,
        "eggCycles": 25
    },
    {
        "id": 108,
        "name": "Lickitung",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 60,
        "route": 33,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 77,
        "eggCycles": 20
    },
    {
        "id": 109,
        "name": "Koffing",
        "catchRate": 190,
        "evolution": "Weezing",
        "evoLevel": 35, "type": [
        "Poison"
    ],
        "attack": 65,
        "route": 31,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 68,
        "eggCycles": 20
    },
    {
        "id": 110,
        "name": "Weezing",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Poison"
    ],
        "attack": 90,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 172,
        "eggCycles": 20
    },
    {
        "id": 111,
        "name": "Rhyhorn",
        "catchRate": 120,
        "evolution": "Rhydon",
        "evoLevel": 42, "type": [
        "Ground",
        "Rock"
    ],
        "attack": 85,
        "route": 35,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 69,
        "eggCycles": 20
    },
    {
        "id": 112,
        "name": "Rhydon",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Ground",
        "Rock"
    ],
        "attack": 130,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 170,
        "eggCycles": 20
    },
    {
        "id": 113,
        "name": "Chansey",
        "catchRate": 30,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 35,
        "route": 30,
        "health": 100,
        "levelType": "fast",
        "baseXpGain": 395,
        "eggCycles": 40
    },
    {
        "id": 114,
        "name": "Tangela",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Grass"
    ],
        "attack": 100,
        "route": 21,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 87,
        "eggCycles": 20
    },
    {
        "id": 115,
        "name": "Kangaskhan",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 95,
        "route": 35,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 172,
        "eggCycles": 20
    },
    {
        "id": 116,
        "name": "Horsea",
        "catchRate": 225,
        "evolution": "Seadra",
        "evoLevel": 32, "type": [
        "Water"
    ],
        "attack": 70,
        "route": 10,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 59,
        "eggCycles": 20
    },
    {
        "id": 117,
        "name": "Seadra",
        "catchRate": 75,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water"
    ],
        "attack": 95,
        "route": 12,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 154,
        "eggCycles": 20
    },
    {
        "id": 118,
        "name": "Goldeen",
        "catchRate": 225,
        "evolution": "Seaking",
        "evoLevel": 33, "type": [
        "Water"
    ],
        "attack": 67,
        "route": 4,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 64,
        "eggCycles": 20
    },
    {
        "id": 119,
        "name": "Seaking",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water"
    ],
        "attack": 92,
        "route": 4,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 158,
        "eggCycles": 20
    },
    {
        "id": 120,
        "name": "Staryu",
        "catchRate": 225,
        "evolution": "Starmie",
        "evoLevel": "Water Stone", "type": [
        "Water"
    ],
        "attack": 70,
        "route": 19,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 68,
        "eggCycles": 20
    },
    {
        "id": 121,
        "name": "Starmie",
        "catchRate": 60,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water",
        "Psychic"
    ],
        "attack": 100,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 182,
        "eggCycles": 20
    },
    {
        "id": 122,
        "name": "Mr. Mime",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Psychic",
        "Fairy"
    ],
        "attack": 100,
        "route": 36,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 161,
        "eggCycles": 25
    },
    {
        "id": 123,
        "name": "Scyther",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Bug",
        "Flying"
    ],
        "attack": 110,
        "route": 35,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 100,
        "eggCycles": 25
    },
    {
        "id": 124,
        "name": "Jynx",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Ice",
        "Psychic"
    ],
        "attack": 115,
        "route": 36,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 159,
        "eggCycles": 25
    },
    {
        "id": 125,
        "name": "Electabuzz",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Electric"
    ],
        "attack": 95,
        "route": 36,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 172,
        "eggCycles": 25
    },
    {
        "id": 126,
        "name": "Magmar",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fire"
    ],
        "attack": 100,
        "route": 37,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 173,
        "eggCycles": 25
    },
    {
        "id": 127,
        "name": "Pinsir",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Bug"
    ],
        "attack": 125,
        "route": 37,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 175,
        "eggCycles": 25
    },
    {
        "id": 128,
        "name": "Tauros",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 100,
        "route": 38,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 172,
        "eggCycles": 20
    },
    {
        "id": 129,
        "name": "Magikarp",
        "catchRate": 255,
        "evolution": "Gyarados",
        "evoLevel": 20, "type": [
        "Water"
    ],
        "attack": 15,
        "route": 4,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 40,
        "eggCycles": 5
    },
    {
        "id": 130,
        "name": "Gyarados",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water",
        "Flying"
    ],
        "attack": 125,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 189,
        "eggCycles": 5
    },
    {
        "id": 131,
        "name": "Lapras",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water",
        "Ice"
    ],
        "attack": 85,
        "route": 37,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 187,
        "eggCycles": 40
    },
    {
        "id": 132,
        "name": "Ditto",
        "catchRate": 35,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 48,
        "route": 13,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 101,
        "eggCycles": 20
    },
    {
        "id": 133,
        "name": "Eevee",
        "catchRate": 45,
        "evolution": "Vaporeon, Jolteon, Flareon",
        "evoLevel": "Water Stone, Thunder Stone, Fire Stone", "type": [
        "Normal"
    ],
        "attack": 55,
        "route": 36,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 65,
        "eggCycles": 35
    },
    {
        "id": 134,
        "name": "Vaporeon",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Water"
    ],
        "attack": 110,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 184,
        "eggCycles": 35
    },
    {
        "id": 135,
        "name": "Jolteon",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Electric"
    ],
        "attack": 110,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 184,
        "eggCycles": 35
    },
    {
        "id": 136,
        "name": "Flareon",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fire"
    ],
        "attack": 130,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 184,
        "eggCycles": 35
    },
    {
        "id": 137,
        "name": "Porygon",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 85,
        "route": 38,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 79,
        "eggCycles": 20
    },
    {
        "id": 138,
        "name": "Omanyte",
        "catchRate": 45,
        "evolution": "Omastar",
        "evoLevel": 40, "type": [
        "Rock",
        "Water"
    ],
        "attack": 90,
        "route": 39,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 71,
        "eggCycles": 30
    },
    {
        "id": 139,
        "name": "Omastar",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Rock",
        "Water"
    ],
        "attack": 115,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 173,
        "eggCycles": 30
    },
    {
        "id": 140,
        "name": "Kabuto",
        "catchRate": 45,
        "evolution": "Kabutops",
        "evoLevel": 40, "type": [
        "Rock",
        "Water"
    ],
        "attack": 80,
        "route": 39,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 71,
        "eggCycles": 30
    },
    {
        "id": 141,
        "name": "Kabutops",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Rock",
        "Water"
    ],
        "attack": 115,
        "health": 100,
        "levelType": "medium fast",
        "baseXpGain": 173,
        "eggCycles": 30
    },
    {
        "id": 142,
        "name": "Aerodactyl",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Rock",
        "Flying"
    ],
        "attack": 105,
        "route": 39,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 180,
        "eggCycles": 30
    },
    {
        "id": 143,
        "name": "Snorlax",
        "catchRate": 25,
        "evolution": null,
        "evoLevel": null, "type": [
        "Normal"
    ],
        "attack": 110,
        "route": 16,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 189,
        "eggCycles": 40
    },
    {
        "id": 144,
        "name": "Articuno",
        "catchRate": 3,
        "evolution": null,
        "evoLevel": null, "type": [
        "Ice",
        "Flying"
    ],
        "attack": 95,
        "route": 100,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 261,
        "eggCycles": 80
    },
    {
        "id": 145,
        "name": "Zapdos",
        "catchRate": 3,
        "evolution": null,
        "evoLevel": null, "type": [
        "Electric",
        "Flying"
    ],
        "attack": 125,
        "route": 100,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 261,
        "eggCycles": 80
    },
    {
        "id": 146,
        "name": "Moltres",
        "catchRate": 3,
        "evolution": null,
        "evoLevel": null, "type": [
        "Fire",
        "Flying"
    ],
        "attack": 125,
        "route": 100,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 261,
        "eggCycles": 80
    },
    {
        "id": 147,
        "name": "Dratini",
        "catchRate": 45,
        "evolution": "Dragonair",
        "evoLevel": 30, "type": [
        "Dragon"
    ],
        "attack": 64,
        "route": 36,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 60,
        "eggCycles": 40
    },
    {
        "id": 148,
        "name": "Dragonair",
        "catchRate": 45,
        "evolution": "Dragonite",
        "evoLevel": 55, "type": [
        "Dragon"
    ],
        "attack": 84,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 147,
        "eggCycles": 40
    },
    {
        "id": 149,
        "name": "Dragonite",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Dragon",
        "Flying"
    ],
        "attack": 134,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 270,
        "eggCycles": 40
    },
    {
        "id": 150,
        "name": "Mewtwo",
        "catchRate": 3,
        "evolution": null,
        "evoLevel": null, "type": [
        "Psychic"
    ],
        "attack": 154,
        "route": 100,
        "health": 100,
        "levelType": "slow",
        "baseXpGain": 306,
        "eggCycles": 120
    },
    {
        "id": 151,
        "name": "Mew",
        "catchRate": 45,
        "evolution": null,
        "evoLevel": null, "type": [
        "Psychic"
    ],
        "attack": 100,
        "route": 100,
        "health": 100,
        "levelType": "medium slow",
        "baseXpGain": 270,
        "eggCycles": 120
    }
];