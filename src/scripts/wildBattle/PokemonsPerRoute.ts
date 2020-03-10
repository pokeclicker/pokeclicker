/**
 * Datalist of all Pokémon that are encountered on the routes
 * No need to ever use this list, use RouteHelper instead
 * If you ever need to use this list, request changes in RouteHelper instead.
 */
const pokemonsPerRoute = {
    2: {
        101: {
            land: ['Wurmple', 'Poochyena', 'Zigzagoon'],
            water: [],
            headbutt: [],
        },
        102: {
            land: ['Poochyena', 'Wurmple', 'Lotad', 'Zigzagoon', 'Ralts', 'Seedot'],
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
            land: ['Swablu', 'Lotad', 'Lombre', 'Seviper', 'Nuzleaf'],
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
            land: ['Poochyena', 'Oddish', 'Marill', 'Illumise', 'Volbeat', 'Seedot'],
            water: ['Marill', 'Goldeen', 'Magikarp', 'Corphish'],
            headbutt: [],
        },
        118: {
            land: ['Zigzagoon', 'Electrike', 'Linoone', 'Manectric', 'Wingull', 'Kecleon'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha', 'Sharpedo'],
            headbutt: [],
        },
        119: {
            land: ['Zigzagoon', 'Linoone', 'Oddish', 'Tropius', 'Kecleon'],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Carvanha'],
            headbutt: [],
        },
        120: {
            land: ['Poochyena', 'Mightyena', 'Oddish', 'Marill', 'Absol', 'Kecleon', 'Seedot'],
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
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        125: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
            headbutt: [],
        },
        126: {
            land: [],
            water: ['Tentacool', 'Wingull', 'Pelipper', 'Magikarp', 'Wailmer', 'Sharpedo'],
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
