///<reference path="DungeonBossPokemon.ts"/>
///<reference path="../achievements/GymBadgeRequirement.ts"/>

/**
 * Gym class.
 */
class Dungeon {
    public name: KnockoutObservable<string>;
    allPokemonNames: string[];

    constructor(
        name: string,
        public pokemonList: string[],
        public itemList: GameConstants.BattleItemType[],
        public baseHealth: number,
        public bossList: DungeonBossPokemon[],
        public tokenCost: number,
        public difficultyRoute: number, // Closest route in terms of difficulty, used for egg steps, dungeon tokens etc.
        public level: number
    ) {
        this.name = ko.observable(name);
        this.calculateAllPokemonNames();
    }

    public isUnlocked(): boolean {
        // Player requires the Dungeon Ticket to access the dungeons
        if (!App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Dungeon_ticket)) {
            Notifier.notify({ message: 'You need the Dungeon ticket to access dungeons', type: GameConstants.NotificationOption.danger });
            return false;
        }
        return true;
    }

    private calculateAllPokemonNames() {
        const pokemonNameSet = new Set(this.pokemonList);
        for (let i = 0; i < this.bossList.length; i++) {
            pokemonNameSet.add(this.bossList[i].name);
        }
        this.allPokemonNames = [...pokemonNameSet];
    }
}

/**
 * Data list that contains all dungeons, accessible by name.
 */

const dungeonList: { [dungeonName: string]: Dungeon } = {};

// Kanto Dungeons

dungeonList['Viridian Forest'] = new Dungeon('Viridian Forest',
    ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Pidgey', 'Pidgeotto'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    102,
    [new DungeonBossPokemon('Pikachu', 510, 7)],
    50, 1, 5
);

dungeonList['Digletts Cave'] = new Dungeon('Digletts Cave',
    ['Diglett'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_incense],
    1208,
    [new DungeonBossPokemon('Dugtrio', 6040, 31)],
    95, 2, 22
);

dungeonList['Mt. Moon'] = new Dungeon('Mt. Moon',
    ['Sandshrew', 'Clefairy', 'Zubat', 'Paras', 'Geodude', 'Pidgeotto'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Token_collector],
    834,
    [new DungeonBossPokemon('Kabuto', 4170, 12), new DungeonBossPokemon('Omanyte', 4170, 12)],
    75, 4, 10
);

dungeonList['Rock Tunnel'] = new Dungeon('Rock Tunnel',
    ['Zubat', 'Geodude', 'Machop'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    4117,
    [new DungeonBossPokemon('Onix', 20585, 17)],
    500, 5, 15
);

dungeonList['Power Plant'] = new Dungeon('Power Plant',
    ['Pikachu', 'Raichu', 'Magnemite', 'Magneton', 'Grimer', 'Muk', 'Electrode'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    13507,
    [new DungeonBossPokemon('Electabuzz', 67535, 35), new DungeonBossPokemon('Zapdos', 101302, 50)],
    1000, 8, 25
);

dungeonList['Pokemon Tower'] = new Dungeon('Pokemon Tower',
    ['Gastly', 'Haunter', 'Cubone'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    7523,
    [new DungeonBossPokemon('Marowak', 37615, 30)],
    750, 10, 20
);

dungeonList['Seafoam Islands'] = new Dungeon('Seafoam Islands',
    ['Zubat', 'Golbat', 'Psyduck', 'Golduck', 'Slowpoke', 'Slowbro', 'Shellder', 'Krabby', 'Horsea', 'Staryu'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_egg],
    17226,
    [new DungeonBossPokemon('Seel', 86130, 35), new DungeonBossPokemon('Articuno', 129195, 50)],
    1250, 15, 30
);

dungeonList['Pokemon Mansion'] = new Dungeon('Pokemon Mansion',
    ['Growlithe', 'Vulpix', 'Grimer', 'Muk', 'Koffing', 'Weezing'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    17760,
    [new DungeonBossPokemon('Magmar', 88800, 40)],
    1500, 16, 35
);

dungeonList['Victory Road'] = new Dungeon('Victory Road',
    ['Zubat', 'Golbat', 'Machop', 'Geodude', 'Graveler', 'Onix', 'Marowak', 'Venomoth'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    24595,
    [new DungeonBossPokemon('Machoke', 122975, 42), new DungeonBossPokemon('Moltres', 184462, 50)],
    2000, 20, 40
);

dungeonList['Cerulean Cave'] = new Dungeon('Cerulean Cave',
    ['Arbok', 'Raichu', 'Sandslash', 'Golbat', 'Parasect', 'Venomoth', 'Kadabra', 'Magneton', 'Dodrio', 'Hypno', 'Ditto', 'Wigglytuff', 'Electrode', 'Marowak', 'Chansey'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    28735,
    [new DungeonBossPokemon('Rhydon', 143675, 60), new DungeonBossPokemon('Mewtwo', 215512, 70)],
    2500, 20, 55
);

// Johto Dungeons

dungeonList['Sprout Tower'] = new Dungeon('Sprout Tower',
    ['Rattata', 'Gastly', 'Hoothoot'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    56735,
    [new DungeonBossPokemon('Bellsprout', 240000, 10)],
    2500, 31, 5
);

dungeonList['Ruins of Alph'] = new Dungeon('Ruins of Alph',
    ['Natu', 'Wooper', 'Quagsire', 'Smeargle', 'Magikarp', 'Poliwag', 'Poliwhirl'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    60600,
    [
        new DungeonBossPokemon('Unown (A)', 260000, 14),
        new DungeonBossPokemon('Unown (L)', 260000, 14),
        new DungeonBossPokemon('Unown (P)', 260000, 14),
        new DungeonBossPokemon('Unown (H)', 260000, 14),
    ],
    3000, 32, 7
);

dungeonList['Union Cave'] = new Dungeon('Union Cave',
    ['Rattata', 'Sandshrew', 'Zubat', 'Geodude', 'Onix', 'Goldeen', 'Magikarp'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    63600,
    [new DungeonBossPokemon('Wooper', 260000, 14)],
    3000, 32, 7
);

dungeonList['Slowpoke Well'] = new Dungeon('Slowpoke Well',
    ['Zubat', 'Slowpoke'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    67900,
    [new DungeonBossPokemon('Slowbro', 280000, 20)],
    3500, 33, 12
);

dungeonList['Ilex Forest'] = new Dungeon('Ilex Forest',
    ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Oddish', 'Paras', 'Hoothoot'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    82200,
    [new DungeonBossPokemon('Noctowl', 300000, 30), new DungeonBossPokemon('Beedrill', 300000, 30), new DungeonBossPokemon('Butterfree', 300000, 30), new DungeonBossPokemon('Celebi', 600000, 50)],
    4000, 34, 15
);

dungeonList['Burned Tower'] = new Dungeon('Burned Tower',
    ['Rattata', 'Zubat', 'Koffing', 'Raticate'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    88500,
    [new DungeonBossPokemon('Golbat', 320000, 35), new DungeonBossPokemon('Weezing', 320000, 35), new DungeonBossPokemon('Shuckle', 610000, 50)],
    4500, 37, 20
);

dungeonList['Tin Tower'] = new Dungeon('Tin Tower',
    ['Rattata', 'Gastly'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    88500,
    [new DungeonBossPokemon('Raticate', 320000, 35), new DungeonBossPokemon('Haunter', 320000, 35), new DungeonBossPokemon('Ho-Oh', 610000, 70)],
    4500, 37, 20
);

dungeonList['Whirl Islands'] = new Dungeon('Whirl Islands',
    ['Zubat', 'Golbat', 'Seel', 'Krabby', 'Horsea'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_egg],
    92800,
    [new DungeonBossPokemon('Dewgong', 340000, 40), new DungeonBossPokemon('Kingler', 340000, 40), new DungeonBossPokemon('Lugia', 660000, 70)],
    5000, 41, 25
);

dungeonList['Mt Mortar'] = new Dungeon('Mt Mortar',
    ['Rattata', 'Zubat', 'Geodude', 'Marill', 'Raticate', 'Golbat', 'Graveler'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    104100,
    [new DungeonBossPokemon('Tyrogue', 360000, 45)],
    5500, 42, 30
);

dungeonList['Ice Path'] = new Dungeon('Ice Path',
    ['Zubat', 'Jynx', 'Swinub'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_incense],
    120400,
    [new DungeonBossPokemon('Delibird', 380000, 50)],
    6000, 44, 32
);

dungeonList['Dark Cave'] = new Dungeon('Dark Cave',
    ['Zubat', 'Geodude', 'Golbat', 'Graveler', 'Wobbuffet'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    127000,
    [new DungeonBossPokemon('Dunsparce', 400000, 55)],
    6500, 45, 35
);

dungeonList['Mt Silver'] = new Dungeon('Mt Silver',
    ['Ponyta', 'Doduo', 'Tangela', 'Sneasel', 'Ursaring', 'Donphan', 'Teddiursa', 'Phanpy', 'Quagsire', 'Misdreavus'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    130500,
    [new DungeonBossPokemon('Larvitar', 440000, 60)],
    10000, 28, 50
);

// Hoenn Dungeons

dungeonList['Petalburg Woods'] = new Dungeon('Petalburg Woods',
    ['Poochyena', 'Zigzagoon', 'Wurmple', 'Silcoon', 'Cascoon', 'Taillow', 'Shroomish'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    190000,
    [new DungeonBossPokemon('Slakoth', 560000, 10)],
    12000, 101, 5);

dungeonList['Rusturf Tunnel'] = new Dungeon('Rusturf Tunnel',
    ['Whismur'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    200000,
    [new DungeonBossPokemon('Whismur', 600000, 20)],
    14000, 101, 5);

dungeonList['Granite Cave'] = new Dungeon('Granite Cave',
    ['Zubat', 'Abra', 'Geodude', 'Makuhita', 'Aron', 'Sableye'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    210000,
    [new DungeonBossPokemon('Mawile', 660000, 20), new DungeonBossPokemon('Nosepass', 660000, 20)],
    16000, 101, 5);

dungeonList['Fiery Path'] = new Dungeon('Fiery Path',
    ['Machop', 'Grimer', 'Koffing', 'Slugma', 'Numel'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    224000,
    [new DungeonBossPokemon('Torkoal', 700000, 20)],
    17000, 101, 5);

dungeonList['Meteor Falls'] = new Dungeon('Meteor Falls',
    ['Zubat', 'Golbat', 'Goldeen', 'Magikarp', 'Barboach'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    243000,
    [
        new DungeonBossPokemon('Solrock', 740000, 20),
        new DungeonBossPokemon('Lunatone', 740000, 20),
    ],
    18000, 101, 5);

dungeonList['Mt. Chimney'] = new Dungeon('Mt. Chimney',
    ['Zubat', 'Poochyena'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    260000,
    [new DungeonBossPokemon('Numel', 770000, 20)],
    20000, 101, 5);

dungeonList['Jagged Pass'] = new Dungeon('Jagged Pass',
    ['Machop', 'Numel', 'Spoink'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    260000,
    [
        new DungeonBossPokemon('Machop', 800000, 20),
        new DungeonBossPokemon('Numel', 800000, 20),
        new DungeonBossPokemon('Spoink', 800000, 20),
    ],
    22000, 101, 5);

dungeonList['New Mauville'] = new Dungeon('New Mauville',
    ['Magnemite', 'Voltorb'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    260000,
    [
        new DungeonBossPokemon('Magneton', 850000, 20),
        new DungeonBossPokemon('Electrode', 850000, 20),
    ],
    24000, 101, 5);

dungeonList['Mt. Pyre'] = new Dungeon('Mt. Pyre',
    ['Shuppet', 'Duskull', 'Vulpix', 'Wingull', 'Meditite'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    280000,
    [
        new DungeonBossPokemon('Shuppet', 880000, 20),
        new DungeonBossPokemon('Duskull', 890000, 20),
        new DungeonBossPokemon('Chimecho', 880000, 20),
    ],
    26000, 101, 5);

dungeonList['Shoal Cave'] = new Dungeon('Shoal Cave',
    ['Zubat', 'Golbat', 'Spheal', 'Tentacool', 'Magikarp', 'Wailmer'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    290000,
    [new DungeonBossPokemon('Snorunt', 900000, 20)],
    12000, 101, 5);

dungeonList['Cave of Origin'] = new Dungeon('Cave of Origin',
    ['Zubat', 'Golbat', 'Sableye', 'Mawile'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    390000,
    [
        new DungeonBossPokemon('Kyogre', 1300000, 20),
        new DungeonBossPokemon('Groudon', 1300000, 20),
    ],
    34000, 101, 5);

dungeonList['Seafloor Cavern'] = new Dungeon('Seafloor Cavern',
    ['Zubat', 'Golbat', 'Tentacool', 'Magikarp', 'Wailmer'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    330000,
    [new DungeonBossPokemon('Wailmer', 1000000, 20)],
    31000, 101, 5);

dungeonList['Sky Pillar'] = new Dungeon('Sky Pillar',
    ['Golbat', 'Sableye', 'Claydol', 'Banette', 'Mawile', 'Altaria'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    420000,
    [
        new DungeonBossPokemon('Dusclops', 1200000, 20),
        new DungeonBossPokemon('Rayquaza', 1824002, 20),
    ],
    40000, 101, 5);

dungeonList['Victory Road Hoenn'] = new Dungeon('Victory Road Hoenn',
    ['Zubat', 'Golbat', 'Whismur', 'Loudred', 'Makuhita', 'Aron', 'Mawile', 'Meditite', 'Geodude', 'Goldeen', 'Magikarp', 'Barboach', 'Whiscash'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    360000,
    [
        new DungeonBossPokemon('Hariyama', 1300000, 20),
        new DungeonBossPokemon('Lairon', 1300000, 20),
        new DungeonBossPokemon('Medicham', 1300000, 20),
        new DungeonBossPokemon('Graveler', 1300000, 20),
    ],
    37000, 101, 5);

// Sinnoh

dungeonList['Oreburgh Gate'] = new Dungeon('Oreburgh Gate',
    ['Zubat', 'Psyduck', 'Geodude', 'Golduck', 'Magikarp', 'Barboach'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    420600,
    [
        new DungeonBossPokemon('Gyarados', 1703000, 14),
        new DungeonBossPokemon('Whiscash', 1703000, 14),
    ],
    39000, 201, 7);

dungeonList['Ravaged Path'] = new Dungeon('Ravaged Path',
    ['Zubat', 'Psyduck',  'Golduck', 'Magikarp', 'Barboach'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    456000,
    [
        new DungeonBossPokemon('Gyarados', 1803000, 14),
        new DungeonBossPokemon('Whiscash', 1803000, 14),
    ],
    43000, 201, 7);

dungeonList['Eterna Forest'] = new Dungeon('Eterna Forest',
    ['Gastly', 'Hoothoot', 'Wurmple', 'Silcoon', 'Cascoon', 'Bidoof', 'Kricketot', 'Budew', 'Buneary'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    512000,
    [
        new DungeonBossPokemon('Beautifly', 1950000, 30),
        new DungeonBossPokemon('Dustox', 1950000, 30),
    ],
    48000, 201, 15);

dungeonList['Old Chateau'] = new Dungeon('Old Chateau',
    ['Gastly', 'Haunter', 'Gengar'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    553000,
    [new DungeonBossPokemon('Rotom', 2200000, 70)],
    52500, 201, 35);

dungeonList['Wayward Cave'] = new Dungeon('Wayward Cave',
    ['Zubat', 'Geodude', 'Onix'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    603000,
    [new DungeonBossPokemon('Bronzor', 2400000, 70)],
    56500, 201, 35);

dungeonList['Mt. Coronet South'] = new Dungeon('Mt. Coronet South',
    ['Clefairy', 'Zubat', 'Machop', 'Geodude', 'Nosepass', 'Meditite', 'Chingling', 'Bronzor', 'Magikarp', 'Barboach', 'Clefairy', 'Noctowl'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    651500,
    [
        new DungeonBossPokemon('Machoke', 3000000, 35),
        new DungeonBossPokemon('Bronzong', 3000000, 50),
        new DungeonBossPokemon('Absol', 3000000, 50),
    ],
    60500, 201, 20);

dungeonList['Iron Island'] = new Dungeon('Iron Island',
    ['Tentacool', 'Wingull', 'Tentacruel', 'Pelipper', 'Finneon', 'Zubat', 'Geodude', 'Onix', 'Golbat', 'Graveler'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    683000,
    [new DungeonBossPokemon('Steelix', 3210000, 70)],
    66500, 201, 35);

dungeonList['Mt. Coronet North'] = new Dungeon('Mt. Coronet North',
    ['Clefairy', 'Zubat', 'Machop', 'Geodude', 'Meditite', 'Chingling', 'Bronzor', 'Magikarp', 'Barboach', 'Clefairy', 'Noctowl', 'Snover'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    715000,
    [
        new DungeonBossPokemon('Graveler', 3600000, 35),
        new DungeonBossPokemon('Feebas', 3600000, 50),
        new DungeonBossPokemon('Medicham', 3600000, 50),
    ],
    69500, 201, 20);

dungeonList['Lake Verity'] = new Dungeon('Lake Verity',
    ['Starly', 'Bidoof', 'Psyduck', 'Golduck', 'Magikarp', 'Goldeen'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    768735,
    [
        new DungeonBossPokemon('Mesprit', 3820000, 10),
        new DungeonBossPokemon('Seaking', 3820000, 10),
    ],
    72500, 201, 5);

dungeonList['Lake Valor'] = new Dungeon('Lake Valor',
    ['Staravia', 'Bibarel', 'Psyduck', 'Golduck', 'Magikarp', 'Goldeen'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    811500,
    [
        new DungeonBossPokemon('Noctowl', 3960000, 35),
        new DungeonBossPokemon('Azelf', 8060000, 35),
    ],
    74500, 201, 20);

dungeonList['Lake Acuity'] = new Dungeon('Lake Acuity',
    ['Sneasel', 'Bibarel', 'Psyduck', 'Golduck', 'Magikarp', 'Goldeen','Snover', 'Snorunt'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_egg],
    861800,
    [
        new DungeonBossPokemon('Gyarados', 4070000, 40),
        new DungeonBossPokemon('Uxie', 8070000, 40),
    ],
    78000, 201, 25);

dungeonList['Distortion World'] = new Dungeon('Distortion World',
    ['Golbat', 'Gastly', 'Haunter', 'Duskull', 'Chingling', 'Bronzor', 'Chimecho'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    922100,
    [
        new DungeonBossPokemon('Dusclops', 4280000, 45),
        new DungeonBossPokemon('Bronzong', 4280000, 45),
        new DungeonBossPokemon('Giratina (altered)', 8880000, 45),
    ],
    82500, 201, 30);

dungeonList['Victory Road Sinnoh'] = new Dungeon('Victory Road Sinnoh',
    ['Golbat', 'Graveler', 'Onix', 'Rhyhorn', 'Magneton', 'Azumarill', 'Floatzel'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    1203000,
    [
        new DungeonBossPokemon('Rhydon', 6000000, 70),
        new DungeonBossPokemon('Steelix', 6000000, 70),
        new DungeonBossPokemon('Gabite', 6000000, 70),
    ],
    86500, 201, 35);

dungeonList['Spear Pillar'] = new Dungeon('Spear Pillar',
    ['Croagunk', 'Stunky', 'Glameow', 'Bronzor', 'Golbat'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    1853000,
    [
        new DungeonBossPokemon('Palkia', 9000000, 70),
        new DungeonBossPokemon('Dialga', 9000000, 70),
    ],
    96500, 201, 35);

dungeonList['Hall of Origin'] = new Dungeon('Hall of Origin',
    ['Slowpoke', 'Spearow', 'Garchomp', 'Slakoth', 'Eevee', 'Breloom', 'Absol'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2253000,
    [
        new DungeonBossPokemon('Arceus (normal)', 10000000, 70),
        new DungeonBossPokemon('Slaking', 8000000, 70),
        new DungeonBossPokemon('Snorlax', 8000000, 70),
        new DungeonBossPokemon('Shuckle', 8000000, 70),
        new DungeonBossPokemon('Blissey', 8000000, 70),
    ],
    106500, 201, 35);

dungeonList['Fullmoon Island'] = new Dungeon('Fullmoon Island',
    ['Illumise', 'Minun', 'Espeon', 'Luvdisc'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Cresselia', 9000000, 70)],
    96500, 201, 35);

dungeonList['Newmoon Island'] = new Dungeon('Newmoon Island',
    ['Volbeat', 'Plusle', 'Umbreon', 'Luvdisc'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Darkrai', 9000000, 70)],
    96500, 201, 35);

dungeonList['Flower Paradise'] = new Dungeon('Flower Paradise',
    ['Vileplume', 'Bellsprout', 'Exeggutor', 'Bellossom', 'Skiploom', 'Sunflora', 'Roselia'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_incense],
    220400,
    [
        new DungeonBossPokemon('Venusaur', 7900000, 50),
        new DungeonBossPokemon('Meganium', 7000000, 50),
        new DungeonBossPokemon('Shaymin (land)', 9000000, 50),
        new DungeonBossPokemon('Shaymin (sky)', 9000000, 50),
    ],
    96500, 201, 32);

dungeonList['Snowpoint Temple'] = new Dungeon('Snowpoint Temple',
    ['Golbat', 'Sneasel', 'Smoochum'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Jynx', 8000000, 70),
        new DungeonBossPokemon('Regigigas', 9000000, 70),
    ],
    96500, 201, 35);

dungeonList['Stark Mountain'] = new Dungeon('Stark Mountain',
    ['Golbat', 'Graveler', 'Fearow', 'Weezing', 'Rhyhorn', 'Rhydon', 'Numel', 'Slugma', 'Magcargo', 'Camerupt'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Skarmory', 8000000, 70),
        new DungeonBossPokemon('Heatran', 9000000, 70),
    ],
    96500, 201, 35);
