/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="DungeonBossPokemon.ts"/>
///<reference path="../achievements/GymBadgeRequirement.ts"/>
///<reference path="../achievements/MultiRequirement.ts"/>
///<reference path="../achievements/ObtainedPokemonRequirement.ts"/>

/**
 * Gym class.
 */
class Dungeon {
    public name: KnockoutObservable<string>;
    allPokemonNames: PokemonNameType[];
    allAvailablePokemonNames: PokemonNameType[];

    constructor(
        name: string,
        public pokemonList: PokemonNameType[],
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
            Notifier.notify({
                message: 'You need the Dungeon ticket to access dungeons',
                type: NotificationConstants.NotificationOption.danger,
            });
            return false;
        }
        return true;
    }

    public calculateAllPokemonNames(): void {
        // Put the names into a Set to filter out any duplicate values
        this.allPokemonNames = [...new Set([...this.pokemonList, ...this.bossList.map(b => b.name)])] as PokemonNameType[];
        this.allAvailablePokemonNames = [...new Set([...this.pokemonList, ...this.availableBosses().map(b => b.name)])] as PokemonNameType[];
    }

    public availableBosses(): DungeonBossPokemon[] {
        return this.bossList.filter(b => b.isUnlocked());
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
    ['Sandshrew', 'Clefairy', 'Zubat', 'Paras', 'Geodude'],
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
    ['Pikachu', 'Raichu', 'Magnemite', 'Magneton', 'Grimer', 'Muk', 'Voltorb', 'Electrode'],
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
    ['Zubat', 'Golbat', 'Goldeen', 'Poliwag', 'Magikarp', 'Slowpoke', 'Slowbro', 'Tentacool', 'Krabby', 'Kingler', 'Staryu'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_egg],
    17226,
    [new DungeonBossPokemon('Seel', 86130, 35), new DungeonBossPokemon('Articuno', 129195, 50)],
    1250, 15, 30
);

dungeonList['Pokemon Mansion'] = new Dungeon('Pokemon Mansion',
    ['Rattata', 'Raticate', 'Growlithe', 'Grimer', 'Muk', 'Koffing', 'Weezing', 'Ditto'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    17760,
    [new DungeonBossPokemon('Magmar', 88800, 40)],
    1500, 16, 35
);

dungeonList['Victory Road'] = new Dungeon('Victory Road',
    ['Zubat', 'Golbat', 'Geodude', 'Graveler', 'Onix'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    24595,
    [new DungeonBossPokemon('Machoke', 122975, 42), new DungeonBossPokemon('Moltres', 184462, 50)],
    2000, 20, 40
);

dungeonList['Cerulean Cave'] = new Dungeon('Cerulean Cave',
    ['Arbok', 'Raichu', 'Sandslash', 'Golbat', 'Gloom', 'Parasect', 'Venomoth', 'Weepinbell', 'Graveler', 'Ditto', 'Chansey', 'Magikarp', 'Poliwag', 'Goldeen', 'Seaking'],
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
    [
        new DungeonBossPokemon('Noctowl', 300000, 30),
        new DungeonBossPokemon('Beedrill', 300000, 30),
        new DungeonBossPokemon('Butterfree', 300000, 30),
        new DungeonBossPokemon('Celebi', 600000, 50, new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)),
    ],
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
    [
        new DungeonBossPokemon('Raticate', 320000, 35),
        new DungeonBossPokemon('Haunter', 320000, 35),
        new DungeonBossPokemon('Ho-Oh', 610000, 70, new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Raikou),
            new ObtainedPokemonRequirement(pokemonMap.Entei),
            new ObtainedPokemonRequirement(pokemonMap.Suicune),
        ])),
    ],
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
    28000, 101, 5);

dungeonList['Cave of Origin'] = new Dungeon('Cave of Origin',
    ['Zubat', 'Golbat', 'Sableye', 'Mawile'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    390000,
    [
        new DungeonBossPokemon('Exploud', 1000000, 50),
        new DungeonBossPokemon('Kyogre', 1700000, 70, new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)),
        new DungeonBossPokemon('Groudon', 1700000, 70, new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)),
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
        new DungeonBossPokemon('Rayquaza', 1824002, 70),
    ],
    40000, 101, 5);

dungeonList['Sealed Chamber'] = new Dungeon('Sealed Chamber',
    ['Zubat', 'Golbat', 'Tentacool'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    400000,
    [
        new DungeonBossPokemon('Regirock', 1500000, 20),
        new DungeonBossPokemon('Regice', 1500000, 20),
        new DungeonBossPokemon('Registeel', 1500000, 20),
    ],
    32000, 101, 5);

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
    [
        new DungeonBossPokemon('Rotom', 2200000, 70),
        new DungeonBossPokemon('Rotom (heat)', 2300000, 70, new ObtainedPokemonRequirement(pokemonMap.Rotom)),
        new DungeonBossPokemon('Rotom (wash)', 2300000, 70, new ObtainedPokemonRequirement(pokemonMap.Rotom)),
        new DungeonBossPokemon('Rotom (frost)', 2300000, 70, new ObtainedPokemonRequirement(pokemonMap.Rotom)),
        new DungeonBossPokemon('Rotom (fan)', 2300000, 70, new ObtainedPokemonRequirement(pokemonMap.Rotom)),
        new DungeonBossPokemon('Rotom (mow)', 2300000, 70, new ObtainedPokemonRequirement(pokemonMap.Rotom)),
    ],
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
    ['Starly', 'Bidoof', 'Psyduck', 'Magikarp', 'Goldeen'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    768735,
    [
        new DungeonBossPokemon('Golduck', 3820000, 10),
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
    [new DungeonBossPokemon('Clefable', 9000000, 70)],
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
    2203000,
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

// Unova
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Pledge Grove'] = new Dungeon('Pledge Grove',
    ['Fearow', 'Furret', 'Ledian', 'Sudowoodo', 'Stantler', 'Breloom', 'Unfezant', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Keldeo (Resolute)', 8000000, 70)],
    96500, 201, 35);

dungeonList['Floccesy Ranch'] = new Dungeon('Floccesy Ranch',
    ['Psyduck', 'Mareep', 'Azurill', 'Patrat', 'Lillipup', 'Pidove'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Riolu', 8000000, 70)],
    96500, 201, 35);

dungeonList['Liberty Garden'] = new Dungeon('Liberty Garden',
    ['Vulpix', 'Sunflora', 'Abra', 'Wingull', 'Pidove', 'Sentret'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Victini', 8000000, 70),
        new DungeonBossPokemon('Ninetales', 8000000, 70),
        new DungeonBossPokemon('Alakazam', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Castelia Sewers'] = new Dungeon('Castelia Sewers',
    ['Rattata', 'Zubat', 'Grimer', 'Trubbish'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Muk', 8000000, 70)],
    96500, 201, 35);

dungeonList['Relic Passage'] = new Dungeon('Relic Passage',
    ['Rattata', 'Raticate', 'Roggenrola', 'Woobat', 'Timburr'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Onix', 8000000, 70),
        new DungeonBossPokemon('Drilbur', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Relic Castle'] = new Dungeon('Relic Castle',
    ['Sandshrew', 'Sandslash', 'Sandile', 'Krokorok', 'Yamask'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Baltoy', 8000000, 70),
        new DungeonBossPokemon('Volcarona', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Lostlorn Forest'] = new Dungeon('Lostlorn Forest',
    ['Roselia', 'Combee', 'Sewaddle', 'Venipede', 'Cottonee', 'Petilil'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Heracross', 8000000, 70),
        new DungeonBossPokemon('Pinsir', 8000000, 70),
        new DungeonBossPokemon('Emolga', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Chargestone Cave'] = new Dungeon('Chargestone Cave',
    ['Nosepass', 'Boldore', 'Joltik', 'Ferroseed', 'Klink'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Drilbur', 8000000, 70),
        new DungeonBossPokemon('Tynamo', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Mistralton Cave'] = new Dungeon('Mistralton Cave',
    ['Boldore', 'Woobat', 'Aron', 'Lairon'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Drilbur', 8000000, 70),
        new DungeonBossPokemon('Axew', 8000000, 70),
        new DungeonBossPokemon('Cobalion', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Celestial Tower'] = new Dungeon('Celestial Tower',
    ['Golbat', 'Elgyem', 'Misdreavus', 'Haunter'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Litwick', 8000000, 70)],
    96500, 201, 35);

dungeonList['Reversal Mountain'] = new Dungeon('Reversal Mountain',
    ['Skarmory', 'Numel', 'Camerupt', 'Spoink', 'Grumpig', 'Trapinch', 'Drifblim', 'Skorupi', 'Boldore', 'Woobat'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Cacturne', 8000000, 70),
        new DungeonBossPokemon('Excadrill', 8000000, 70),
        new DungeonBossPokemon('Heatran', 8000000, 70, new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)),
    ],
    96500, 201, 35);
dungeonList['Seaside Cave'] = new Dungeon('Seaside Cave',
    ['Golduck', 'Seel', 'Shellder', 'Luvdisc', 'Boldore', 'Woobat', 'Tynamo', 'Frillish'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Eelektrik', 8000000, 70),
        new DungeonBossPokemon('Crustle', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Giant Chasm'] = new Dungeon('Giant Chasm',
    ['Clefairy', 'Poliwag', 'Seel', 'Tangela', 'Delibird', 'Sneasel', 'Piloswine', 'Pelipper', 'Lunatone', 'Solrock', 'Vanillish', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Ditto', 'Metang'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Tangrowth', 8000000, 70),
        new DungeonBossPokemon('Audino', 8000000, 70),
        new DungeonBossPokemon('Mamoswine', 8000000, 70),
        new DungeonBossPokemon('Kyurem', 8000000, 70, new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)),
    ],
    96500, 201, 35);

dungeonList['Cave of Being'] = new Dungeon('Cave of Being',
    ['Kadabra', 'Golbat', 'Woobat', 'Gurdurr', 'Graveler', 'Onix'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Uxie', 8000000, 70),
        new DungeonBossPokemon('Mesprit', 8000000, 70),
        new DungeonBossPokemon('Azelf', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Abundant Shrine'] = new Dungeon('Abundant Shrine',
    ['Vulpix', 'Golduck', 'Marill', 'Azumarill', 'Swablu', 'Bronzor', 'Cottonee', 'Petilil', 'Goldeen', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Bronzong', 8000000, 70),
        new DungeonBossPokemon('Altaria', 8000000, 70),
        new DungeonBossPokemon('Landorus', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Victory Road Unova'] = new Dungeon('Victory Road Unova',
    ['Poliwag', 'Onix', 'Marill', 'Roselia', 'Altaria', 'Banette', 'Buizel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Boldore', 'Cottonee', 'Petilil', 'Tranquill', 'Unfezant', 'Gurdurr'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Golurk', 8000000, 70),
        new DungeonBossPokemon('Terrakion', 8000000, 70),
        new DungeonBossPokemon('Audino', 8000000, 70),
        new DungeonBossPokemon('Druddigon', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Twist Mountain'] = new Dungeon('Twist Mountain',
    ['Onix', 'Boldore', 'Woobat', 'Gurdurr', 'Beartic'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Durant', 8000000, 70),
        new DungeonBossPokemon('Cryogonal', 8000000, 70),
        new DungeonBossPokemon('Heatmor', 8000000, 70),
        new DungeonBossPokemon('Regigigas', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Dragonspiral Tower'] = new Dungeon('Dragonspiral Tower',
    ['Dratini', 'Tranquill', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Vanillish', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)', 'Beartic', 'Mienfoo', 'Mienshao', 'Golett', 'Golurk'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Dragonite', 8000000, 70),
        new DungeonBossPokemon('Reshiram', 8000000, 70),
        new DungeonBossPokemon('Druddigon', 8000000, 70),
        new DungeonBossPokemon('Zekrom', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Moor of Icirrus'] = new Dungeon('Moor of Icirrus',
    ['Croagunk', 'Palpitoad', 'Karrablast', 'Shelmet', 'Stunfisk', 'Barboach'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Keldeo', 8000000, 70),
        new DungeonBossPokemon('Seismitoad', 8000000, 70),
        new DungeonBossPokemon('Whiscash', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Pinwheel Forest'] = new Dungeon('Pinwheel Forest',
    ['Goldeen', 'Marill', 'Yanma', 'Vigoroth', 'Toxicroak', 'Gurdurr', 'Tympole', 'Palpitoad', 'Swadloon', 'Whirlipede', 'Cottonee', 'Petilil', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Scolipede', 8000000, 70),
        new DungeonBossPokemon('Seismitoad', 8000000, 70),
        new DungeonBossPokemon('Virizion', 8000000, 70),
    ],
    96500, 201, 35);
dungeonList['Dreamyard'] = new Dungeon('Dreamyard',
    ['Raticate', 'Jigglypuff', 'Golbat', 'Watchog', 'Liepard', 'Munna'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Audino', 8000000, 70),
        new DungeonBossPokemon('Dunsparce', 8000000, 70),
        new DungeonBossPokemon('Latias', 8000000, 70),
        new DungeonBossPokemon('Latios', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['P2 Laboratory'] = new Dungeon('P2 Laboratory',
    ['Magneton', 'Rotom', 'Beheeyem', 'Klinklang', 'Porygon2', 'Electrode', 'Metang'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Magnezone', 8000000, 70),
        new DungeonBossPokemon('Porygon-Z', 8000000, 70),
        new DungeonBossPokemon('Metagross', 8000000, 70),
        new DungeonBossPokemon('Genesect', 8000000, 70),
    ],
    96500, 201, 35);

// Kalos
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Santalune Forest'] = new Dungeon('Santalune Forest',
    ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Fletchling'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Pikachu', 8000000, 70),
        new DungeonBossPokemon('Scatterbug', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Parfum Palace'] = new Dungeon('Parfum Palace',
    ['Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Corphish', 'Crawdaunt'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Furfrou', 8000000, 70)],
    96500, 201, 35);

dungeonList['Connecting Cave'] = new Dungeon('Connecting Cave',
    ['Zubat', 'Whismur', 'Meditite'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Axew', 8000000, 70)],
    96500, 201, 35);

dungeonList['Glittering Cave'] = new Dungeon('Glittering Cave',
    ['Machop', 'Onix', 'Cubone', 'Rhyhorn', 'Lunatone', 'Solrock'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Kangaskhan', 8000000, 70),
        new DungeonBossPokemon('Mawile', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Reflection Cave'] = new Dungeon('Reflection Cave',
    ['Mr. Mime', 'Sableye', 'Chingling', 'Roggenrola', 'Solosis'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Wobbuffet', 8000000, 70),
        new DungeonBossPokemon('Carbink', 8000000, 70),
    ],
    96500, 201, 35);

//Tower of Mastery?

dungeonList['Azure bay'] = new Dungeon('Azure bay',
    ['Tentacool', 'Slowpoke', 'Exeggcute', 'Chinchou', 'Remoraid', 'Wingull', 'Chatot', 'Mantyke'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Lapras', 8000000, 70),
        new DungeonBossPokemon('Luvdisc', 8000000, 70),
        new DungeonBossPokemon('Inkay', 8000000, 70),
    ],
    96500, 201, 35);
//Should really be a route

//Sea Spirit's Den? Releases Articuno, Zapdos, Moltres roamers.

//Kalos Power Plant?

//Pokéball Factory?

dungeonList['Lost Hotel'] = new Dungeon('Lost Hotel',
    ['Magneton', 'Electrode', 'Litwick', 'Pawniard'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Trubbish', 8000000, 70),
        new DungeonBossPokemon('Rotom', 8000000, 70),
        new DungeonBossPokemon('Klefki', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Frost Cavern'] = new Dungeon('Frost Cavern',
    ['Poliwhirl', 'Haunter', 'Piloswine', 'Floatzel', 'Bergmite'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Jynx', 8000000, 70),
        new DungeonBossPokemon('Beartic', 8000000, 70),
        new DungeonBossPokemon('Cryogonal', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Team Flare Secret HQ'] = new Dungeon('Team Flare Secret HQ',
    ['Golbat', 'Gyarados', 'Houndoom', 'Mightyena', 'Manectric', 'Swalot', 'Toxicroak', 'Honchkrow', 'Liepard', 'Scrafty', 'Mienshao', 'Pyroar'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Xerneas', 8000000, 70),
        new DungeonBossPokemon('Yveltal', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Terminus Cave'] = new Dungeon('Terminus Cave',
    ['Sandslash', 'Graveler', 'Lairon', 'Shuckle', 'Ariados'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Durant', 8000000, 70),
        new DungeonBossPokemon('Pupitar', 8000000, 70),
        new DungeonBossPokemon('Noibat', 8000000, 70),
        new DungeonBossPokemon('Zygarde', 8000000, 70, new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)),
    ],
    96500, 201, 35);

dungeonList['Pokémon Village'] = new Dungeon('Pokémon Village',
    ['Jigglypuff', 'Poliwhirl', 'Noctowl', 'Lombre', 'Gothorita', 'Amoonguss'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Ditto', 8000000, 70),
        new DungeonBossPokemon('Zoroark', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Victory Road Kalos'] = new Dungeon('Victory Road Kalos',
    ['Graveler', 'Haunter', 'Gurdurr', 'Druddigon', 'Ariados'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Lickitung', 8000000, 70),
        new DungeonBossPokemon('Skarmory', 8000000, 70),
        new DungeonBossPokemon('Zweilous', 8000000, 70),
        new DungeonBossPokemon('Noibat', 8000000, 70),
    ],
    96500, 201, 35);

//Unknown Dungeon? Contains Mewtwo.





//Galar Dungeons

dungeonList['Slumbering Weald'] = new Dungeon('Slumbering Weald',
    ['Hoothoot', 'Grubbin', 'Skwovet', 'Rookidee'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Blipbug', 8000000, 70)],
    96500, 201, 35);

dungeonList['Inner Slumbering Weald'] = new Dungeon('Inner Slumbering Weald',
    ['Weezing (Galar)', 'Corviknight', 'Stunfisk (Galar)', 'Munna', 'Butterfree', 'Orbeetle'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Zamazenta (Battle Hero)', 8000000, 70),
        new DungeonBossPokemon('Zacian (Battle Hero)', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Galar Mine'] = new Dungeon('Galar Mine',
    ['Diglett', 'Roggenrola', 'Woobat', 'Drilbur', 'Timburr', 'Rolycoly'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Carkol', 8000000, 70),
        new DungeonBossPokemon('Woobat', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Galar Mine No. 2'] = new Dungeon('Galar Mine No. 2',
    ['Shuckle', 'Shellos (east)', 'Croagunk', 'Scraggy', 'Binacle', 'Noibat', 'Chewtle'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Stunfisk (Galar)', 8000000, 70),
        new DungeonBossPokemon('Gastrodon (east)', 8000000, 70),
        new DungeonBossPokemon('Drednaw', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Rose Tower'] = new Dungeon('Rose Tower',
    ['Cufant', 'Bronzong', 'Klang', 'Mawile', 'Steelix', 'Stunfisk (Galar)'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Froslass', 8000000, 70),
        new DungeonBossPokemon('Tsareena', 8000000, 70),
        new DungeonBossPokemon('Salazzle', 8000000, 70),
        new DungeonBossPokemon('Milotic', 8000000, 70),
        new DungeonBossPokemon('Garbodor', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Glimwood Tangle'] = new Dungeon('Glimwood Tangle',
    ['Ponyta (Galar)', 'Spritzee', 'Swirlix', 'Phantump', 'Oranguru', 'Passimian', 'Sinistea'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Hattrem', 8000000, 70),
        new DungeonBossPokemon('Morgrem', 8000000, 70),
        new DungeonBossPokemon('Indeedee', 8000000, 70),
    ],
    96500, 201, 35);

//South Wild Area

dungeonList['Watchtower Ruins'] = new Dungeon('Watchtower Ruins',
    ['Gastly', 'Noibat', 'Purrloin', 'Duskull', 'Woobat', 'Haunter', 'Shuckle', 'Ralts', 'Golett', 'Electrike', 'Snorunt'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Corviknight', 8000000, 70),
        new DungeonBossPokemon('Golurk', 8000000, 70),
        new DungeonBossPokemon('Drifblim', 8000000, 70),
        new DungeonBossPokemon('Glalie', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['East Lake Axwell'] = new Dungeon('East Lake Axwell',
    ['Butterfree', 'Pancham', 'Quagsire', 'Xatu', 'Baltoy', 'Shellder', 'Oddish', 'Grubbin', 'Mudbray', 'Onix', 'Frillish'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Weezing (Galar)', 8000000, 70),
        new DungeonBossPokemon('Vanilluxe', 8000000, 70),
        new DungeonBossPokemon('Jellicent', 8000000, 70),
        new DungeonBossPokemon('Gyarados', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['West Lake Axwell'] = new Dungeon('West Lake Axwell',
    ['Dwebble', 'Wishiwashi', 'Bunnelby', 'Tympole', 'Palpitoad', 'Remoraid', 'Budew', 'Lotad', 'Krabby', 'Delibird', 'Joltik'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Grapploct', 8000000, 70),
        new DungeonBossPokemon('Drednaw', 8000000, 70),
        new DungeonBossPokemon('Diggersby', 8000000, 70),
        new DungeonBossPokemon('Lapras', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['North Lake Miloch'] = new Dungeon('North Lake Miloch',
    ['Machop', 'Lucario', 'Stunky', 'Snover', 'Pidove', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Gloom', 'Goldeen', 'Skuntank'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Boltund', 8000000, 70),
        new DungeonBossPokemon('Pelipper', 8000000, 70),
        new DungeonBossPokemon('Seismitoad', 8000000, 70),
        new DungeonBossPokemon('Liepard', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Dappled Grove'] = new Dungeon('Dappled Grove',
    ['Seedot', 'Bounsweet', 'Skwovet', 'Hoothoot', 'Tyrogue', 'Lombre', 'Nuzleaf', 'Vanillite', 'Cherubi', 'Vanillish', 'Claydol'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Orbeetle', 8000000, 70),
        new DungeonBossPokemon('Vileplume', 8000000, 70),
        new DungeonBossPokemon('Bewear', 8000000, 70),
        new DungeonBossPokemon('Ludicolo', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Rolling Fields'] = new Dungeon('Rolling Fields',
    ['Metapod', 'Swinub', 'Minccino', 'Combee', 'Diglett', 'Roggenrola', 'Kirlia', 'Vespiquen', 'Manectric', 'Ninjask', 'Piloswine'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Gardevoir', 8000000, 70),
        new DungeonBossPokemon('Mudsdale', 8000000, 70),
        new DungeonBossPokemon('Crustle', 8000000, 70),
        new DungeonBossPokemon('Dubwool', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['South Lake Miloch'] = new Dungeon('South Lake Miloch',
    ['Nincada', 'Roselia', 'Corphish', 'Pyukumuku', 'Bronzor', 'Galvantula', 'Thievul', 'Machoke', 'Whiscash', 'Octillery', 'Wingull'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Jellicent', 8000000, 70),
        new DungeonBossPokemon('Lanturn', 8000000, 70),
        new DungeonBossPokemon('Milotic', 8000000, 70),
        new DungeonBossPokemon('Seaking', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Giant\s Seat'] = new Dungeon('Giant\'s Seat',
    ['Tranquill', 'Greedent', 'Abomasnow', 'Dusclops', 'Rhydon', 'Bronzong', 'Musharna', 'Vikavolt', 'Natu', 'Wooper', 'Munna'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Steelix', 8000000, 70),
        new DungeonBossPokemon('Duraludon', 8000000, 70),
        new DungeonBossPokemon('Bronzong', 8000000, 70),
        new DungeonBossPokemon('Bisharp', 8000000, 70),
    ],
    96500, 201, 35);

//North Wild Area

dungeonList['Lake of Outrage'] = new Dungeon('Lake of Outrage',
    ['Stonjourner', 'Cramorant', 'Mr. Mime (Galar)', 'Morpeko', 'Coalossal', 'Sandaconda', 'Stunfisk (Galar)', 'Copperajah', 'Indeedee', 'Obstagoon', 'Grimmsnarl'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Hatterene', 8000000, 70),
        new DungeonBossPokemon('Perrserker', 8000000, 70),
        new DungeonBossPokemon('Barraskewda', 8000000, 70),
        new DungeonBossPokemon('Drakloak', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Hammerlocke Hills'] = new Dungeon('Hammerlocke Hills',
    ['Dugtrio', 'Drilbur', 'Karrablast', 'Shelmet', 'Espurr', 'Honedge', 'Inkay', 'Charjabug', 'Corvisquire', 'Roserade', 'Hatenna'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Hawlucha', 8000000, 70),
        new DungeonBossPokemon('Sudowoodo', 8000000, 70),
        new DungeonBossPokemon('Maractus', 8000000, 70),
        new DungeonBossPokemon('Wobbuffet', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Giant\s Cap'] = new Dungeon('Giant\'s Cap',
    ['Shellos (east)', 'Pawniard', 'Dottler', 'Eldegoss', 'Clefairy', 'Noctowl', 'Quagsire', 'Sneasel', 'Linoone (Galar)', 'Torkoal', 'Riolu'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Gengar', 8000000, 70),
        new DungeonBossPokemon('Golisopod', 8000000, 70),
        new DungeonBossPokemon('Excadrill', 8000000, 70),
        new DungeonBossPokemon('Beartic', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Dusty Bowl'] = new Dungeon('Dusty Bowl',
    ['Gurdurr', 'Ferrothorn', 'Klang', 'Meowstic', 'Barbaracle', 'Applin', 'Hattrem', 'Qwilfish', 'Hitmonlee', 'Hitmonchan', 'Koffing'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Gigalith', 8000000, 70),
        new DungeonBossPokemon('Flygon', 8000000, 70),
        new DungeonBossPokemon('Sigilyph', 8000000, 70),
        new DungeonBossPokemon('Tyranitar', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Giant\'s Mirror'] = new Dungeon('Giant\'s Mirror',
    ['Hippowdon', 'Skorupi', 'Cubchoo', 'Mimikyu', 'Milcery', 'Mareanie', 'Impidimp', 'Qwilfish', 'Hitmonlee', 'Hitmonchan', 'Koffing'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Machamp', 8000000, 70),
        new DungeonBossPokemon('Unfezant', 8000000, 70),
        new DungeonBossPokemon('Gastrodon (east)', 8000000, 70),
        new DungeonBossPokemon('Corsola (Galar)', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Stony Wilderness'] = new Dungeon('Stony Wilderness',
    ['Pikachu', 'Rhyhorn', 'Togetic', 'Boldore', 'Cottonee', 'Spritzee', 'Swirlix', 'Carkol', 'Croagunk', 'Bonsly', 'Dewpider'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Ribombee', 8000000, 70),
        new DungeonBossPokemon('Ninjask', 8000000, 70),
        new DungeonBossPokemon('Toxicroak', 8000000, 70),
        new DungeonBossPokemon('Dusknoir', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Bridge Field'] = new Dungeon('Bridge Field',
    ['Togepi', 'Mawile', 'Ferroseed', 'Elgyem', 'Litwick', 'Rufflet', 'Vullaby', 'Binacle', 'Zigzagoon (Galar)', 'Scraggy', 'Cutiefly'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Garbodor', 8000000, 70),
        new DungeonBossPokemon('Drapion', 8000000, 70),
        new DungeonBossPokemon('Beheeyem', 8000000, 70),
        new DungeonBossPokemon('Noivern', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Motostoke Riverbank'] = new Dungeon('Motostoke Riverbank',
    ['Wimpod', 'Arrokuda', 'Munchlax', 'Throh', 'Sawk', 'Salandit', 'Rookidee', 'Gossifleur', 'Wooloo', 'Chewtle', 'Yamper'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Clefable', 8000000, 70),
        new DungeonBossPokemon('Snorlax', 8000000, 70),
        new DungeonBossPokemon('Conkeldurr', 8000000, 70),
        new DungeonBossPokemon('Wailmer', 8000000, 70),
    ],
    96500, 201, 35);



//Isle of Armor
dungeonList['Master Dojo'] = new Dungeon('Master Dojo',
    ['Mienfoo', 'Shinx', 'Kadabra', 'Whirlipede'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Kubfu', 8000000, 70)],
    96500, 201, 35);

dungeonList['Tower of Darkness'] = new Dungeon('Tower of Darkness',
    ['Zorua', 'Scraggy', 'Inkay', 'Krokorok'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Kubfu', 8000000, 70)],
    96500, 201, 35);

dungeonList['Tower of Water'] = new Dungeon('Tower of Water',
    ['Psyduck', 'Krabby', 'Marill', 'Poliwhirl'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Kubfu', 8000000, 70)],
    96500, 201, 35);


//Crown Tundra
dungeonList['Split-Decision Ruins'] = new Dungeon('Split-Decision Ruins',
    ['Golurk', 'Electivire', 'Dragapult', 'Araquanid', 'Cryogonal', 'Bronzong', 'Claydol', 'Absol', 'Galvantula', 'Audino'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Regidrago', 8000000, 70),
        new DungeonBossPokemon('Regieleki', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Dyna Tree Hill'] = new Dungeon('Dyna Tree Hill',
    ['Magmar', 'Absol', 'Beartic', 'Cryogonal', 'Dubwool', 'Glalie', 'Clefable'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Greedent', 8000000, 70)],
    96500, 201, 35);

dungeonList['Crown Shrine'] = new Dungeon('Crown Shrine',
    ['Snom', 'Hatenna', 'Solosis', 'Jynx', 'Piloswine', 'Dubwool'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Sneasel', 8000000, 70),
        new DungeonBossPokemon('Calyrex', 8000000, 70, new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Spectrier),
            new ObtainedPokemonRequirement(pokemonMap.Glastrier),
        ])),
    ],
    96500, 201, 35);
