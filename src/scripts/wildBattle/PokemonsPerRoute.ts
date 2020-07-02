/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */
const pokemonsPerRoute = {
    0: {
        1: {
            land: ['Pidgey', 'Rattata'],
            water: [],
            headbutt: [],
        },
        2: {
            land: ['Caterpie', 'Weedle', 'Rattata', 'Nidoran(F)', 'Nidoran(M)'],
            water: [],
            headbutt: [],
        },
        3: {
            land: ['Pidgey', 'Rattata', 'Spearow', 'Sandshrew', 'Jigglypuff', 'Mankey'],
            water: [],
            headbutt: [],
        },
        4: {
            land: ['Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Mankey'],
            water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby', 'Seaking'],
            headbutt: [],
        },
        5: {
            land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Abra', 'Bellsprout'],
            water: [],
            headbutt: [],
        },
        6: {
            land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Abra', 'Bellsprout'],
            water: ['Poliwag', 'Goldeen', 'Shellder', 'Krabby'],
            headbutt: [],
        },
        7: {
            land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Vulpix', 'Jigglypuff', 'Oddish', 'Meowth', 'Mankey', 'Growlithe', 'Abra', 'Bellsprout'],
            water: [],
            headbutt: [],
        },
        8: {
            land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Ekans', 'Sandshrew', 'Vulpix', 'Jigglypuff', 'Meowth', 'Mankey', 'Growlithe', 'Abra', 'Kadabra'],
            water: [],
            headbutt: [],
        },
        9: {
            land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Ekans', 'Sandshrew', 'Nidoran(F)', 'Nidoran(M)', 'Nidorina', 'Nidorino'],
            water: [],
            headbutt: [],
        },
        10: {
            land: ['Rattata', 'Raticate', 'Spearow', 'Ekans', 'Sandshrew', 'Nidoran(F)', 'Nidoran(M)', 'Machop', 'Magnemite', 'Voltorb'],
            water: ['Poliwag', 'Goldeen', 'Poliwhirl', 'Slowpoke', 'Krabby', 'Kingler', 'Horsea'],
            headbutt: [],
        },
        11: {
            land: ['Pidgey', 'Pidgeotto', 'Raticate', 'Rattata', 'Spearow', 'Ekans', 'Sandshrew', 'Drowzee'],
            water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby', 'Horsea'],
            headbutt: [],
        },
        12: {
            land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Snorlax'],
            water: ['Slowbro', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Krabby', 'Horsea', 'Seadra'],
            headbutt: [],
        },
        13: {
            land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Bellsprout', 'Weepinbell', 'Farfetch\'d', 'Ditto'],
            water: ['Slowbro', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacool', 'Krabby', 'Horsea', 'Seadra'],
            headbutt: [],
        },
        14: {
            land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Venomoth', 'Bellsprout', 'Weepinbell', 'Ditto'],
            water: ['Poliwag', 'Goldeen'],
            headbutt: [],
        },
        15: {
            land: ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Venomoth', 'Bellsprout', 'Weepinbell', 'Ditto'],
            water: [],
            headbutt: [],
        },
        16: {
            land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo', 'Snorlax'],
            water: [],
            headbutt: [],
        },
        17: {
            land: ['Raticate', 'Spearow', 'Fearow', 'Ponyta', 'Doduo', 'Dodrio'],
            water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby'],
            headbutt: [],
        },
        18: {
            land: ['Rattata', 'Raticate', 'Spearow', 'Fearow', 'Doduo'],
            water: ['Poliwag', 'Goldeen', 'Tentacool', 'Shellder', 'Krabby'],
            headbutt: [],
        },
        19: {
            land: [],
            water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
            headbutt: [],
        },
        20: {
            land: [],
            water: ['Tentacool', 'Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
            headbutt: [],
        },
        21: {
            land: ['Pidgey', 'Pidgeotto', 'Rattata', 'Raticate', 'Tangela'],
            water: ['Magikarp', 'Poliwag', 'Goldeen', 'Tentacruel', 'Shellder', 'Horsea', 'Staryu'],
            headbutt: [],
        },
        22: {
            land: ['Rattata', 'Spearow', 'Nidoran(F)', 'Nidoran(M)', 'Mankey'],
            water: ['Poliwag', 'Poliwhirl', 'Goldeen'],
            headbutt: [],
        },
        23: {
            land: ['Spearow', 'Fearow', 'Ekans', 'Arbok', 'Sandshrew', 'Sandslash', 'Nidorina', 'Nidorino', 'Mankey', 'Primeape', 'Ditto'],
            water: ['Poliwag', 'Goldeen', 'Poliwhirl', 'Slowbro', 'Kingler', 'Seadra', 'Seaking'],
            headbutt: [],
        },
        24: {
            land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Pidgey', 'Pidgeotto', 'Oddish', 'Venonat', 'Abra', 'Bellsprout'],
            water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby', 'Seaking'],
            headbutt: [],
        },
        25: {
            land: ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Pidgeotto', 'Oddish', 'Venonat', 'Abra', 'Bellsprout'],
            water: ['Poliwag', 'Goldeen', 'Psyduck', 'Krabby'],
            headbutt: [],
        },
    },
    1: {
        26: {
            land: ['Raticate', 'Arbok', 'Sandslash', 'Ponyta', 'Doduo', 'Dodrio', 'Quagsire'],
            water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        27: {
            land: ['Raticate', 'Arbok', 'Sandslash', 'Ponyta', 'Doduo', 'Dodrio', 'Quagsire'],
            water: ['Tentacool', 'Tentacruel', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        28: {
            land: ['Ponyta', 'Tangela', 'Donphan', 'Ursaring', 'Rapidash', 'Doduo', 'Dodrio', 'Sneasel', 'Murkrow'],
            water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
            headbutt: ['Natu', 'Aipom', 'Heracross'],
        },
        29: {
            land: ['Pidgey', 'Rattata', 'Sentret', 'Hoothoot'],
            water: [],
            headbutt: ['Exeggcute', 'Ledyba', 'Spinarak', 'Hoothoot', 'Pineco'],
        },
        30: {
            land: ['Pidgey', 'Rattata', 'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Hoothoot', 'Ledyba', 'Spinarak'],
            water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        31: {
            land: ['Pidgey', 'Rattata', 'Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Poliwag', 'Hoothoot', 'Ledyba', 'Spinarak', 'Bellsprout'],
            water: ['Poliwag', 'Poliwhirl', 'Magikarp'],
            headbutt: ['Spearow', 'Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Aipom', 'Pineco', 'Heracross'],
        },
        32: {
            land: ['Rattata', 'Ekans', 'Zubat', 'Bellsprout', 'Mareep', 'Hoppip', 'Wooper'],
            water: ['Tentacool', 'Tentacruel', 'Quagsire', 'Magikarp', 'Qwilfish'],
            headbutt: ['Exeggcute', 'Hoothoot', 'Pineco'],
        },
        33: {
            land: ['Spearow', 'Rattata', 'Ekans', 'Zubat', 'Hoppip'],
            water: [],
            headbutt: ['Spearow', 'Aipom', 'Heracross'],
        },
        34: {
            land: ['Rattata', 'Abra', 'Drowzee', 'Ditto'],
            water: ['Tentacool', 'Tentacruel', 'Krabby', 'Magikarp', 'Staryu', 'Corsola', 'Kingler'],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        35: {
            land: ['Pidgey', 'Nidoran(F)', 'Nidoran(M)', 'Abra', 'Drowzee', 'Ditto', 'Hoothoot', 'Yanma'],
            water: ['Psyduck', 'Golduck', 'Poliwag', 'Magikarp'],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        36: {
            land: ['Pidgey', 'Nidoran(M)', 'Nidoran(F)', 'Vulpix', 'Growlithe', 'Hoothoot', 'Stantler', 'Sudowoodo'],
            water: [],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        37: {
            land: ['Pidgey', 'Pidgeotto', 'Vulpix', 'Growlithe', 'Hoothoot', 'Ledyba', 'Spinarak', 'Stantler'],
            water: [],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        38: {
            land: ['Rattata', 'Raticate', 'Meowth', 'Magnemite', 'Farfetch\'d', 'Tauros', 'Snubbull', 'Miltank'],
            water: [],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        39: {
            land: ['Rattata', 'Raticate', 'Meowth', 'Magnemite', 'Farfetch\'d', 'Tauros', 'Miltank'],
            water: [],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
        40: {
            land: [],
            water: ['Tentacool', 'Tentacruel', 'Krabby', 'Magikarp', 'Staryu', 'Corsola', 'Kingler'],
            headbutt: [],
        },
        41: {
            land: [],
            water: ['Tentacool', 'Tentacruel', 'Mantine', 'Magikarp', 'Chinchou', 'Shellder'],
            headbutt: [],
        },
        42: {
            land: ['Spearow', 'Zubat', 'Mankey', 'Mareep', 'Flaaffy'],
            water: ['Goldeen', 'Seaking', 'Magikarp'],
            headbutt: ['Spearow', 'Aipom', 'Heracross'],
        },
        43: {
            land: ['Pidgeotto', 'Venonat', 'Noctowl', 'Mareep', 'Flaaffy', 'Girafarig'],
            water: ['Magikarp', 'Poliwag'],
            headbutt: ['Venonat', 'Exeggcute', 'Hoothoot', 'Pineco'],
        },
        44: {
            land: ['Bellsprout', 'Weepinbell', 'Lickitung', 'Tangela'],
            water: ['Poliwag', 'Poliwhirl', 'Magikarp', 'Remoraid'],
            headbutt: ['Spearow', 'Aipom', 'Heracross'],
        },
        45: {
            land: ['Geodude', 'Graveler', 'Gligar', 'Teddiursa', 'Skarmory', 'Phanpy'],
            water: ['Magikarp', 'Poliwag'],
            headbutt: ['Spearow', 'Aipom', 'Heracross'],
        },
        46: {
            land: ['Spearow', 'Rattata', 'Geodude'],
            water: [],
            headbutt: ['Spearow', 'Aipom', 'Heracross'],
        },
        47: {
            land: ['Raticate', 'Spearow', 'Fearow', 'Gloom', 'Farfetch\'d', 'Ditto', 'Noctowl', 'Miltank'],
            water: ['Tentacool', 'Seel', 'Staryu', 'Magikarp', 'Shellder', 'Chinchou', 'Lanturn'],
            headbutt: ['Metapod', 'Butterfree', 'Kakuna', 'Beedrill', 'Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco', 'Heracross'],
        },
        48: {
            land: ['Fearow', 'Vulpix', 'Gloom', 'Diglett', 'Growlithe', 'Farfetch\'d', 'Tauros', 'Hoppip', 'Girafarig'],
            water: [],
            headbutt: ['Exeggcute', 'Hoothoot', 'Ledyba', 'Spinarak', 'Pineco'],
        },
    },
    2: {
        101: {
            land: ['Wurmple', 'Poochyena', 'Zigzagoon'],
            water: [],
            headbutt: [],
        },
        102: {
            land: ['Surskit', 'Poochyena', 'Wurmple', 'Lotad', 'Zigzagoon', 'Ralts', 'Seedot'],
            water: ['Marill', 'Goldeen', 'Magikarp', 'Corphish'],
            headbutt: [],
        },
        103: {
            land: ['Poochyena', 'Wingull', 'Zigzagoon'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        104: {
            land: ['Poochyena', 'Wurmple', 'Marill', 'Taillow', 'Wingull'],
            water: ['Wingull', 'Pelipper', 'Magikarp'],
            headbutt: [],
        },
        105: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        106: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        107: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        108: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        109: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        110: {
            land: ['Poochyena', 'Electrike', 'Gulpin', 'Minun', 'Oddish', 'Wingull', 'Plusle'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        111: {
            land: ['Sandshrew', 'Trapinch', 'Baltoy', 'Cacnea'],
            water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
            headbutt: ['Geodude'],
        },
        112: {
            land: ['Numel', 'Marill'],
            water: [],
            headbutt: [],
        },
        113: {
            land: ['Spinda', 'Slugma', 'Skarmory'],
            water: [],
            headbutt: [],
        },
        114: {
            land: ['Zangoose', 'Surskit', 'Swablu', 'Lotad', 'Lombre', 'Seviper', 'Nuzleaf'],
            water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
            headbutt: ['Geodude'],
        },
        115: {
            land: ['Swablu', 'Taillow', 'Swellow', 'Jigglypuff', 'Wingull'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        116: {
            land: ['Poochyena', 'Whismur', 'Nincada', 'Abra', 'Taillow', 'Skitty'],
            water: [],
            headbutt: [],
        },
        117: {
            land: ['Surskit', 'Poochyena', 'Oddish', 'Marill', 'Illumise', 'Volbeat', 'Seedot'],
            water: ['Marill', 'Goldeen', 'Magikarp', 'Corphish'],
            headbutt: [],
        },
        118: {
            land: ['Zigzagoon', 'Electrike', 'Linoone', 'Manectric', 'Wingull', 'Kecleon'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha', 'Sharpedo'],
            headbutt: [],
        },
        119: {
            land: ['Zigzagoon', 'Linoone', 'Oddish', 'Tropius', 'Kecleon', 'Castform'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha'],
            headbutt: [],
        },
        120: {
            land: ['Surskit', 'Poochyena', 'Mightyena', 'Oddish', 'Marill', 'Absol', 'Kecleon', 'Seedot'],
            water: ['Marill', 'Goldeen', 'Magikarp', 'Barboach'],
            headbutt: [],
        },
        121: {
            land: ['Poochyena', 'Shuppet', 'Mightyena', 'Oddish', 'Gloom', 'Wingull', 'Kecleon'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        122: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        123: {
            land: ['Poochyena', 'Shuppet', 'Mightyena', 'Oddish', 'Gloom', 'Wingull', 'Kecleon'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer'],
            headbutt: [],
        },
        124: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Clamperl', 'Relicanth'],
            headbutt: [],
        },
        125: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        126: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Clamperl', 'Relicanth'],
            headbutt: [],
        },
        127: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        128: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Luvdisc', 'Wailmer', 'Corsola'],
            headbutt: [],
        },
        129: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Wailord', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        130: {
            land: ['Wynaut'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        131: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        132: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
            headbutt: [],
        },
        133: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
            headbutt: [],
        },
        134: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo', 'Horsea'],
            headbutt: [],
        },
    },
};
