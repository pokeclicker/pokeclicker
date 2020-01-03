///<reference path="../pokemons/PokemonEnum.ts"/>
/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */
const pokemonsPerRoute = {
    0: {
        1: {
            land: [Pokemon.Pidgey, Pokemon.Rattata],
            water: [],
            headbutt: []
        },
        2: {
            land: [Pokemon.Caterpie, Pokemon.Weedle, Pokemon.Rattata, Pokemon.NidoranF, Pokemon.NidoranM],
            water: [],
            headbutt: []
        },
        3: {
            land: [Pokemon.Pidgey, Pokemon.Rattata, Pokemon.Spearow, Pokemon.Sandshrew, Pokemon.Jigglypuff, Pokemon.Mankey],
            water: [],
            headbutt: []
        },
        4: {
            land: [Pokemon.Rattata, Pokemon.Spearow, Pokemon.Ekans, Pokemon.Sandshrew, Pokemon.Mankey],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Psyduck, Pokemon.Krabby, Pokemon.Seaking],
            headbutt: []
        },
        5: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Rattata, Pokemon.Jigglypuff, Pokemon.Oddish, Pokemon.Meowth, Pokemon.Mankey, Pokemon.Abra, Pokemon.Bellsprout],
            water: [],
            headbutt: []
        },
        6: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Rattata, Pokemon.Jigglypuff, Pokemon.Oddish, Pokemon.Meowth, Pokemon.Mankey, Pokemon.Abra, Pokemon.Bellsprout],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Shellder, Pokemon.Krabby],
            headbutt: []
        },
        7: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Rattata, Pokemon.Vulpix, Pokemon.Jigglypuff, Pokemon.Oddish, Pokemon.Meowth, Pokemon.Mankey, Pokemon.Growlithe, Pokemon.Abra, Pokemon.Bellsprout],
            water: [],
            headbutt: []
        },
        8: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Rattata, Pokemon.Ekans, Pokemon.Sandshrew, Pokemon.Vulpix, Pokemon.Jigglypuff, Pokemon.Meowth, Pokemon.Mankey, Pokemon.Growlithe, Pokemon.Abra, Pokemon.Kadabra],
            water: [],
            headbutt: []
        },
        9: {
            land: [Pokemon.Rattata, Pokemon.Raticate, Pokemon.Spearow, Pokemon.Fearow, Pokemon.Ekans, Pokemon.Sandshrew, Pokemon.NidoranF, Pokemon.NidoranM, Pokemon.Nidorina, Pokemon.Nidorino],
            water: [],
            headbutt: []
        },
        10: {
            land: [Pokemon.Rattata, Pokemon.Raticate, Pokemon.Spearow, Pokemon.Ekans, Pokemon.Sandshrew, Pokemon.NidoranF, Pokemon.NidoranM, Pokemon.Machop, Pokemon.Magnemite, Pokemon.Voltorb],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Poliwhirl, Pokemon.Slowpoke, Pokemon.Krabby, Pokemon.Kingler, Pokemon.Horsea],
            headbutt: []
        },
        11: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Raticate, Pokemon.Rattata, Pokemon.Spearow, Pokemon.Ekans, Pokemon.Sandshrew, Pokemon.Drowzee],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Tentacool, Pokemon.Shellder, Pokemon.Krabby, Pokemon.Horsea],
            headbutt: []
        },
        12: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Oddish, Pokemon.Gloom, Pokemon.Venonat, Pokemon.Bellsprout, Pokemon.Weepinbell, Pokemon.Farfetchd, Pokemon.Snorlax],
            water: [Pokemon.Slowbro, Pokemon.Magikarp, Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Tentacool, Pokemon.Krabby, Pokemon.Horsea, Pokemon.Seadra],
            headbutt: []
        },
        13: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Oddish, Pokemon.Gloom, Pokemon.Venonat, Pokemon.Bellsprout, Pokemon.Weepinbell, Pokemon.Farfetchd, Pokemon.Ditto],
            water: [Pokemon.Slowbro, Pokemon.Magikarp, Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Tentacool, Pokemon.Krabby, Pokemon.Horsea, Pokemon.Seadra],
            headbutt: []
        },
        14: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Oddish, Pokemon.Gloom, Pokemon.Venonat, Pokemon.Venomoth, Pokemon.Bellsprout, Pokemon.Weepinbell, Pokemon.Ditto],
            water: [Pokemon.Poliwag, Pokemon.Goldeen],
            headbutt: []
        },
        15: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Oddish, Pokemon.Gloom, Pokemon.Venonat, Pokemon.Venomoth, Pokemon.Bellsprout, Pokemon.Weepinbell, Pokemon.Ditto],
            water: [],
            headbutt: []
        },
        16: {
            land: [Pokemon.Rattata, Pokemon.Raticate, Pokemon.Spearow, Pokemon.Fearow, Pokemon.Doduo, Pokemon.Snorlax],
            water: [],
            headbutt: []
        },
        17: {
            land: [Pokemon.Raticate, Pokemon.Spearow, Pokemon.Fearow, Pokemon.Ponyta, Pokemon.Doduo, Pokemon.Dodrio],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Tentacool, Pokemon.Shellder, Pokemon.Krabby],
            headbutt: []
        },
        18: {
            land: [Pokemon.Rattata, Pokemon.Raticate, Pokemon.Spearow, Pokemon.Fearow, Pokemon.Doduo],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Tentacool, Pokemon.Shellder, Pokemon.Krabby],
            headbutt: []
        },
        19: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Magikarp, Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Tentacruel, Pokemon.Shellder, Pokemon.Horsea, Pokemon.Staryu],
            headbutt: []
        },
        20: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Magikarp, Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Tentacruel, Pokemon.Shellder, Pokemon.Horsea, Pokemon.Staryu],
            headbutt: []
        },
        21: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Rattata, Pokemon.Raticate, Pokemon.Tangela],
            water: [Pokemon.Magikarp, Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Tentacruel, Pokemon.Shellder, Pokemon.Horsea, Pokemon.Staryu],
            headbutt: []
        },
        22: {
            land: [Pokemon.Rattata, Pokemon.Spearow, Pokemon.NidoranF, Pokemon.NidoranM, Pokemon.Mankey],
            water: [Pokemon.Poliwag, Pokemon.Poliwhirl, Pokemon.Goldeen],
            headbutt: []
        },
        23: {
            land: [Pokemon.Spearow, Pokemon.Fearow, Pokemon.Ekans, Pokemon.Arbok, Pokemon.Sandshrew, Pokemon.Sandslash, Pokemon.Nidorina, Pokemon.Nidorino, Pokemon.Mankey, Pokemon.Primeape, Pokemon.Ditto],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Poliwhirl, Pokemon.Slowbro, Pokemon.Kingler, Pokemon.Seadra, Pokemon.Seaking],
            headbutt: []
        },
        24: {
            land: [Pokemon.Caterpie, Pokemon.Metapod, Pokemon.Weedle, Pokemon.Kakuna, Pokemon.Pidgey, Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Oddish, Pokemon.Venonat, Pokemon.Abra, Pokemon.Bellsprout],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Psyduck, Pokemon.Krabby, Pokemon.Seaking],
            headbutt: []
        },
        25: {
            land: [Pokemon.Caterpie, Pokemon.Metapod, Pokemon.Weedle, Pokemon.Kakuna, Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Oddish, Pokemon.Venonat, Pokemon.Abra, Pokemon.Bellsprout],
            water: [Pokemon.Poliwag, Pokemon.Goldeen, Pokemon.Psyduck, Pokemon.Krabby],
            headbutt: []
        }
    },
    1: {
        26: {
            land: [Pokemon.Raticate, Pokemon.Arbok, Pokemon.Sandslash, Pokemon.Ponyta, Pokemon.Doduo, Pokemon.Dodrio, Pokemon.Quagsire],
            water: [Pokemon.Tentacool, Pokemon.Tentacruel, Pokemon.Magikarp, Pokemon.Shellder, Pokemon.Chinchou, Pokemon.Lanturn],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        27: {
            land: [Pokemon.Raticate, Pokemon.Arbok, Pokemon.Sandslash, Pokemon.Ponyta, Pokemon.Doduo, Pokemon.Dodrio, Pokemon.Quagsire],
            water: [Pokemon.Tentacool, Pokemon.Tentacruel, Pokemon.Magikarp, Pokemon.Shellder, Pokemon.Chinchou, Pokemon.Lanturn],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        28: {
            land: [Pokemon.Ponyta, Pokemon.Tangela, Pokemon.Donphan, Pokemon.Ursaring, Pokemon.Rapidash, Pokemon.Doduo, Pokemon.Dodrio, Pokemon.Sneasel, Pokemon.Murkrow],
            water: [Pokemon.Poliwag, Pokemon.Poliwhirl, Pokemon.Magikarp],
            headbutt: [Pokemon.Natu, Pokemon.Aipom, Pokemon.Heracross]
        },
        29: {
            land: [Pokemon.Pidgey, Pokemon.Rattata, Pokemon.Sentret, Pokemon.Hoothoot],
            water: [],
            headbutt: [Pokemon.Exeggcute, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Hoothoot, Pokemon.Pineco]
        },
        30: {
            land: [Pokemon.Pidgey, Pokemon.Rattata, Pokemon.Caterpie, Pokemon.Metapod, Pokemon.Weedle, Pokemon.Kakuna, Pokemon.Zubat, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak],
            water: [Pokemon.Poliwag, Pokemon.Poliwhirl, Pokemon.Magikarp],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        31: {
            land: [Pokemon.Pidgey, Pokemon.Rattata, Pokemon.Caterpie, Pokemon.Metapod, Pokemon.Weedle, Pokemon.Kakuna, Pokemon.Zubat, Pokemon.Poliwag, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Bellsprout],
            water: [Pokemon.Poliwag, Pokemon.Poliwhirl, Pokemon.Magikarp],
            headbutt: [Pokemon.Spearow, Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Aipom, Pokemon.Pineco, Pokemon.Heracross]
        },
        32: {
            land: [Pokemon.Rattata, Pokemon.Ekans, Pokemon.Zubat, Pokemon.Bellsprout, Pokemon.Mareep, Pokemon.Hoppip, Pokemon.Wooper],
            water: [Pokemon.Tentacool, Pokemon.Tentacruel, Pokemon.Quagsire, Pokemon.Magikarp, Pokemon.Qwilfish],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Pineco]
        },
        33: {
            land: [Pokemon.Spearow, Pokemon.Rattata, Pokemon.Ekans, Pokemon.Zubat, Pokemon.Hoppip],
            water: [],
            headbutt: [Pokemon.Spearow, Pokemon.Aipom, Pokemon.Heracross]
        },
        34: {
            land: [Pokemon.Rattata, Pokemon.Abra, Pokemon.Drowzee, Pokemon.Ditto],
            water: [Pokemon.Tentacool, Pokemon.Tentacruel, Pokemon.Krabby, Pokemon.Magikarp, Pokemon.Staryu, Pokemon.Corsola, Pokemon.Kingler],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        35: {
            land: [Pokemon.Pidgey, Pokemon.NidoranF, Pokemon.NidoranM, Pokemon.Abra, Pokemon.Drowzee, Pokemon.Ditto, Pokemon.Hoothoot, Pokemon.Yanma],
            water: [Pokemon.Psyduck, Pokemon.Golduck, Pokemon.Poliwag, Pokemon.Magikarp],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        36: {
            land: [Pokemon.Pidgey, Pokemon.NidoranM, Pokemon.NidoranF, Pokemon.Vulpix, Pokemon.Growlithe, Pokemon.Hoothoot, Pokemon.Stantler, Pokemon.Sudowoodo],
            water: [],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        37: {
            land: [Pokemon.Pidgey, Pokemon.Pidgeotto, Pokemon.Vulpix, Pokemon.Growlithe, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Stantler],
            water: [],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        38: {
            land: [Pokemon.Rattata, Pokemon.Raticate, Pokemon.Meowth, Pokemon.Magnemite, Pokemon.Farfetchd, Pokemon.Tauros, Pokemon.Snubbull, Pokemon.Miltank],
            water: [],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        39: {
            land: [Pokemon.Rattata, Pokemon.Raticate, Pokemon.Meowth, Pokemon.Magnemite, Pokemon.Farfetchd, Pokemon.Tauros, Pokemon.Miltank],
            water: [],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        },
        40: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Tentacruel, Pokemon.Krabby, Pokemon.Magikarp, Pokemon.Staryu, Pokemon.Corsola, Pokemon.Kingler],
            headbutt: []
        },
        41: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Tentacruel, Pokemon.Mantine, Pokemon.Magikarp, Pokemon.Chinchou, Pokemon.Shellder],
            headbutt: []
        },
        42: {
            land: [Pokemon.Spearow, Pokemon.Zubat, Pokemon.Mankey, Pokemon.Mareep, Pokemon.Flaaffy],
            water: [Pokemon.Goldeen, Pokemon.Seaking, Pokemon.Magikarp],
            headbutt: [Pokemon.Spearow, Pokemon.Aipom, Pokemon.Heracross]
        },
        43: {
            land: [Pokemon.Pidgeotto, Pokemon.Venonat, Pokemon.Noctowl, Pokemon.Mareep, Pokemon.Flaaffy, Pokemon.Girafarig],
            water: [Pokemon.Magikarp, Pokemon.Poliwag],
            headbutt: [Pokemon.Venonat, Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Pineco]
        },
        44: {
            land: [Pokemon.Bellsprout, Pokemon.Weepinbell, Pokemon.Lickitung, Pokemon.Tangela],
            water: [Pokemon.Poliwag, Pokemon.Poliwhirl, Pokemon.Magikarp, Pokemon.Remoraid],
            headbutt: [Pokemon.Spearow, Pokemon.Aipom, Pokemon.Heracross]
        },
        45: {
            land: [Pokemon.Geodude, Pokemon.Graveler, Pokemon.Gligar, Pokemon.Teddiursa, Pokemon.Skarmory, Pokemon.Phanpy],
            water: [Pokemon.Magikarp, Pokemon.Poliwag],
            headbutt: [Pokemon.Spearow, Pokemon.Aipom, Pokemon.Heracross]
        },
        46: {
            land: [Pokemon.Spearow, Pokemon.Rattata, Pokemon.Geodude],
            water: [],
            headbutt: [Pokemon.Spearow, Pokemon.Aipom, Pokemon.Heracross]
        },
        47: {
            land: [Pokemon.Raticate, Pokemon.Spearow, Pokemon.Fearow, Pokemon.Gloom, Pokemon.Farfetchd, Pokemon.Ditto, Pokemon.Noctowl, Pokemon.Miltank],
            water: [Pokemon.Tentacool, Pokemon.Seel, Pokemon.Staryu, Pokemon.Magikarp, Pokemon.Shellder, Pokemon.Chinchou, Pokemon.Lanturn],
            headbutt: [Pokemon.Metapod, Pokemon.Butterfree, Pokemon.Kakuna, Pokemon.Beedrill, Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco, Pokemon.Heracross]
        },
        48: {
            land: [Pokemon.Fearow, Pokemon.Vulpix, Pokemon.Gloom, Pokemon.Diglett, Pokemon.Growlithe, Pokemon.Farfetchd, Pokemon.Tauros, Pokemon.Hoppip, Pokemon.Girafarig],
            water: [],
            headbutt: [Pokemon.Exeggcute, Pokemon.Hoothoot, Pokemon.Ledyba, Pokemon.Spinarak, Pokemon.Pineco]
        }
    },
    2: {
        101: {
            land: [Pokemon.Wurmple, Pokemon.Poochyena, Pokemon.Zigzagoon],
            water: [],
            headbutt: []
        },
        102: {
            land: [Pokemon.Poochyena, Pokemon.Wurmple, Pokemon.Lotad, Pokemon.Zigzagoon, Pokemon.Ralts, Pokemon.Seedot],
            water: [Pokemon.Marill, Pokemon.Goldeen, Pokemon.Magikarp, Pokemon.Corphish],
            headbutt: []
        },
        103: {
            land: [Pokemon.Poochyena, Pokemon.Wingull, Pokemon.Zigzagoon],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        104: {
            land: [Pokemon.Poochyena, Pokemon.Wurmple, Pokemon.Marill, Pokemon.Taillow, Pokemon.Wingull],
            water: [Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp],
            headbutt: []
        },
        105: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        106: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        107: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        108: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        109: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        110: {
            land: [Pokemon.Poochyena, Pokemon.Electrike, Pokemon.Gulpin, Pokemon.Minun, Pokemon.Oddish, Pokemon.Wingull, Pokemon.Plusle],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        111: {
            land: [Pokemon.Sandshrew, Pokemon.Trapinch, Pokemon.Baltoy, Pokemon.Cacnea],
            water: [Pokemon.Marill, Pokemon.Goldeen, Pokemon.Magikarp, Pokemon.Barboach],
            headbutt: [Pokemon.Geodude]
        },
        112: {
            land: [Pokemon.Numel, Pokemon.Marill],
            water: [],
            headbutt: []
        },
        113: {
            land: [Pokemon.Spinda, Pokemon.Slugma, Pokemon.Skarmory],
            water: [],
            headbutt: []
        },
        114: {
            land: [Pokemon.Swablu, Pokemon.Lotad, Pokemon.Lombre, Pokemon.Seviper, Pokemon.Nuzleaf],
            water: [Pokemon.Marill, Pokemon.Goldeen, Pokemon.Magikarp, Pokemon.Barboach],
            headbutt: [Pokemon.Geodude]
        },
        115: {
            land: [Pokemon.Swablu, Pokemon.Taillow, Pokemon.Swellow, Pokemon.Jigglypuff, Pokemon.Wingull],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        116: {
            land: [Pokemon.Poochyena, Pokemon.Whismur, Pokemon.Nincada, Pokemon.Abra, Pokemon.Taillow, Pokemon.Skitty],
            water: [],
            headbutt: []
        },
        117: {
            land: [Pokemon.Poochyena, Pokemon.Oddish, Pokemon.Marill, Pokemon.Illumise, Pokemon.Volbeat, Pokemon.Seedot],
            water: [Pokemon.Marill, Pokemon.Goldeen, Pokemon.Magikarp, Pokemon.Corphish],
            headbutt: []
        },
        118: {
            land: [Pokemon.Zigzagoon, Pokemon.Electrike, Pokemon.Linoone, Pokemon.Manectric, Pokemon.Wingull, Pokemon.Kecleon],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Carvanha, Pokemon.Sharpedo],
            headbutt: []
        },
        119: {
            land: [Pokemon.Zigzagoon, Pokemon.Linoone, Pokemon.Oddish, Pokemon.Tropius, Pokemon.Kecleon],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Carvanha],
            headbutt: []
        },
        120: {
            land: [Pokemon.Poochyena, Pokemon.Mightyena, Pokemon.Oddish, Pokemon.Marill, Pokemon.Absol, Pokemon.Kecleon, Pokemon.Seedot],
            water: [Pokemon.Marill, Pokemon.Goldeen, Pokemon.Magikarp, Pokemon.Barboach],
            headbutt: []
        },
        121: {
            land: [Pokemon.Poochyena, Pokemon.Shuppet, Pokemon.Mightyena, Pokemon.Oddish, Pokemon.Gloom, Pokemon.Wingull, Pokemon.Kecleon],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        122: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        123: {
            land: [Pokemon.Poochyena, Pokemon.Shuppet, Pokemon.Mightyena, Pokemon.Oddish, Pokemon.Gloom, Pokemon.Wingull, Pokemon.Kecleon],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer],
            headbutt: []
        },
        124: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        125: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        126: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        127: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        128: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Luvdisc, Pokemon.Wailmer, Pokemon.Corsola],
            headbutt: []
        },
        129: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Wailord, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        130: {
            land: [Pokemon.Wynaut],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        131: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo],
            headbutt: []
        },
        132: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo, Pokemon.Horsea],
            headbutt: []
        },
        133: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo, Pokemon.Horsea],
            headbutt: []
        },
        134: {
            land: [],
            water: [Pokemon.Tentacool, Pokemon.Wingull, Pokemon.Pelipper, Pokemon.Magikarp, Pokemon.Wailmer, Pokemon.Sharpedo, Pokemon.Horsea],
            headbutt: []
        }
    }
};
