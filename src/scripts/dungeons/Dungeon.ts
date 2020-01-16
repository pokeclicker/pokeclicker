///<reference path="DungeonBossPokemon.ts"/>
///<reference path="../worldmap/WorldLocation.ts"/>
///<reference path="DungeonName.ts"/>
///<reference path="../worldmap/worldRequirements/BadgeRequirement.ts"/>

class Dungeon extends WorldLocation {

    name: DungeonName;

    requirements: WorldRequirement[];

    pokemonList: string[];
    itemList: GameConstants.BattleItemType[];
    baseHealth: number;
    bossList: DungeonBossPokemon[];
    entryCost: Amount;
    itemRoute: number;
    level: number;
    allPokemonNames: string[];

    constructor(name: DungeonName, pokemonList: string[], itemList: GameConstants.BattleItemType[], baseHealth: number, bossList: DungeonBossPokemon[], tokenCost: number, requirements: WorldRequirement[], itemRoute: number, level: number) {
        super();
        this.name = name;
        this.pokemonList = pokemonList;
        this.itemList = itemList;
        this.baseHealth = baseHealth;
        this.bossList = bossList;
        this.entryCost = new Amount(tokenCost, GameConstants.Currency.dungeonToken);
        this.requirements = requirements;
        this.itemRoute = itemRoute;
        this.level = level;
        this.calculateAllPokemonNames();
    }

    private calculateAllPokemonNames() {
        this.allPokemonNames = JSON.parse(JSON.stringify(this.pokemonList));
        for (let i = 0; i < this.bossList.length; i++) {
            this.allPokemonNames.push(this.bossList[i].name);
        }
    }
}

/**
 * Data list that contains all dungeons, accessible by name.
 */

// Johto Dungeons

// dungeonList['Sprout Tower'] = new Dungeon('Sprout Tower',
//     ['Rattata', 'Gastly', 'Hoothoot'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
//     28735,
//     [new DungeonBossPokemon('Bellsprout', 2000, 10)],
//     2500, BadgeCase.Badge.Elite_KantoChampion, 31, 5
// );
//
// dungeonList['Ruins of Alph'] = new Dungeon('Ruins of Alph',
//     ['Natu', 'Wooper', 'Quagsire', 'Smeargle', 'Magikarp', 'Poliwag', 'Poliwhirl'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
//     600,
//     [new DungeonBossPokemon('Unown', 3000, 14)],
//     3000, BadgeCase.Badge.Zephyr, 32, 7
// );
//
// dungeonList['Union Cave'] = new Dungeon('Union Cave',
//     ['Rattata', 'Sandshrew', 'Zubat', 'Geodude', 'Onix', 'Goldeen', 'Magikarp'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
//     600,
//     [new DungeonBossPokemon('Wooper', 3000, 14)],
//     3000, BadgeCase.Badge.Zephyr, 32, 7
// );
//
// dungeonList['Slowpoke Well'] = new Dungeon('Slowpoke Well',
//     ['Zubat', 'Slowpoke'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     900,
//     [new DungeonBossPokemon('Slowbro', 4000, 20)],
//     3500, BadgeCase.Badge.Zephyr, 33, 12
// );
//
// dungeonList['Ilex Forest'] = new Dungeon('Ilex Forest',
//     ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Oddish', 'Paras', 'Hoothoot'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
//     1200,
//     [new DungeonBossPokemon('Noctowl', 5000, 30), new DungeonBossPokemon('Beedrill', 5000, 30), new DungeonBossPokemon('Butterfree', 5000, 30), new DungeonBossPokemon('Celebi', 300000, 50)],
//     4000, BadgeCase.Badge.Hive, 34, 15
// );
//
// dungeonList['Burned Tower'] = new Dungeon('Burned Tower',
//     ['Rattata', 'Zubat', 'Koffing', 'Raticate'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
//     1500,
//     [new DungeonBossPokemon('Golbat', 6000, 35), new DungeonBossPokemon('Weezing', 6000, 35), new DungeonBossPokemon('Shuckle', 300000, 50)],
//     4500, BadgeCase.Badge.Fog, 37, 20
// );
//
// dungeonList['Tin Tower'] = new Dungeon('Tin Tower',
//     ['Rattata', 'Gastly'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
//     1500,
//     [new DungeonBossPokemon('Raticate', 6000, 35), new DungeonBossPokemon('Haunter', 6000, 35), new DungeonBossPokemon('Ho-Oh', 300000, 70)],
//     4500, BadgeCase.Badge.Fog, 37, 20
// );
//
// dungeonList['Whirl Islands'] = new Dungeon('Whirl Islands',
//     ['Zubat', 'Golbat', 'Seel', 'Krabby', 'Horsea'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xExp],
//     1800,
//     [new DungeonBossPokemon('Dewgong', 7000, 40), new DungeonBossPokemon('Kingler', 7000, 40), new DungeonBossPokemon('Lugia', 300000, 70)],
//     5000, BadgeCase.Badge.Storm, 41, 25
// );
//
// dungeonList['Mt Mortar'] = new Dungeon('Mt Mortar',
//     ['Rattata', 'Zubat', 'Geodude', 'Marill', 'Raticate', 'Golbat', 'Graveler'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
//     2100,
//     [new DungeonBossPokemon('Tyrogue', 8000, 45)],
//     5500, BadgeCase.Badge.Storm, 42, 30
// );
//
// dungeonList['Ice Path'] = new Dungeon('Ice Path',
//     ['Zubat', 'Jynx', 'Swinub'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_incense],
//     2400,
//     [new DungeonBossPokemon('Delibird', 9000, 50)],
//     6000, BadgeCase.Badge.Glacier, 44, 32
// );
//
// dungeonList['Dark Cave'] = new Dungeon('Dark Cave',
//     ['Zubat', 'Geodude', 'Golbat', 'Graveler', 'Wobbuffet'],
//     [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
//     3000,
//     [new DungeonBossPokemon('Dunsparce', 10000, 55)],
//     6500, BadgeCase.Badge.Rising, 45, 35
// );
//
// dungeonList['Mt Silver'] = new Dungeon('Mt Silver',
//     ['Ponyta', 'Doduo', 'Tangela', 'Sneasel', 'Ursaring', 'Donphan', 'Teddiursa', 'Phanpy', 'Quagsire', 'Misdreavus'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     3500,
//     [new DungeonBossPokemon('Larvitar', 12000, 60)],
//     10000, BadgeCase.Badge.Elite_Karen, 28, 50
// );
//
// // Hoenn Dungeons
//
// dungeonList['Petalburg Woods'] = new Dungeon('Petalburg Woods',
//     ['Poochyena', 'Zigzagoon', 'Wurmple', 'Silcoon', 'Cascoon', 'Taillow', 'Shroomish'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Slakoth', 100000, 10)],
//     12000, null, 101, 5);
//
// dungeonList['Rusturf Tunnel'] = new Dungeon('Rusturf Tunnel',
//     ['Whismur'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Whismur', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Granite Cave'] = new Dungeon('Granite Cave',
//     ['Zubat', 'Abra', 'Geodude', 'Makuhita', 'Aron', 'Sableye'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Mawile', 100000, 20), new DungeonBossPokemon('Nosepass', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Fiery Path'] = new Dungeon('Fiery Path',
//     ['Machop', 'Grimer', 'Koffing', 'Slugma', 'Numel'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Torkoal', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Meteor Falls'] = new Dungeon('Meteor Falls',
//     ['Zubat', 'Golbat', 'Goldeen', 'Magikarp', 'Barboach'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [
//       new DungeonBossPokemon('Bagon', 100000, 20),
//       new DungeonBossPokemon('Solrock', 100000, 20),
//       new DungeonBossPokemon('Lunatone', 100000, 20),
//     ],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Mt. Chimney'] = new Dungeon('Mt. Chimney',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Jagged Pass'] = new Dungeon('Jagged Pass',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['New Mauville'] = new Dungeon('New Mauville',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Sea Mauville'] = new Dungeon('Sea Mauville',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Mt. Pyre'] = new Dungeon('Mt. Pyre',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Shoal Cave'] = new Dungeon('Shoal Cave',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Cave of Origin'] = new Dungeon('Cave of Origin',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Seafloor Cavern'] = new Dungeon('Seafloor Cavern',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Sky Pillar'] = new Dungeon('Sky Pillar',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
//
// dungeonList['Victory Road Hoenn'] = new Dungeon('Victory Road Hoenn',
//     ['Unown'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Unown', 100000, 20)],
//     12000, BadgeCase.Badge.Stone, 101, 5);
