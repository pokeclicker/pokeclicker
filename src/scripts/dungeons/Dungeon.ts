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

// // Hoenn Dungeons
//
// new Dungeon(DungeonName.Petalburg Woods,
//     ['Poochyena', 'Zigzagoon', 'Wurmple', 'Silcoon', 'Cascoon', 'Taillow', 'Shroomish'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Slakoth', 100000, 10)],
//     12000, null, 101, 5);
//
// new Dungeon(DungeonName.Rusturf Tunnel,
//     ['Whismur'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Whismur', 100000, 20)],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Granite Cave,
//     ['Zubat', 'Abra', 'Geodude', 'Makuhita', 'Aron', 'Sableye'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Mawile', 100000, 20), new DungeonBossPokemon('Nosepass', 100000, 20)],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Fiery Path,
//     ['Machop', 'Grimer', 'Koffing', 'Slugma', 'Numel'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Torkoal', 100000, 20)],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Meteor Falls,
//     ['Zubat', 'Golbat', 'Goldeen', 'Magikarp', 'Barboach'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [
//       new DungeonBossPokemon('Solrock', 100000, 20),
//       new DungeonBossPokemon('Lunatone', 100000, 20),
//     ],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Mt. Chimney,
//     ['Zubat', 'Poochyena'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Numel', 100000, 20)],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Jagged Pass,
//     ['Machop', 'Numel', 'Spoink'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [
//       new DungeonBossPokemon('Machop', 100000, 20),
//       new DungeonBossPokemon('Numel', 100000, 20),
//       new DungeonBossPokemon('Spoink', 100000, 20),
//     ],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.New Mauville,
//     ['Magnemite', 'Voltorb'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [
//       new DungeonBossPokemon('Magneton', 100000, 20),
//       new DungeonBossPokemon('Electrode', 100000, 20),
//     ],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Mt. Pyre,
//     ['Shuppet', 'Duskull', 'Vulpix', 'Wingull', 'Meditite'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [
//       new DungeonBossPokemon('Shuppet', 100000, 20),
//       new DungeonBossPokemon('Duskull', 100000, 20),
//       new DungeonBossPokemon('Chimecho', 100000, 20),
//     ],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Shoal Cave,
//     ['Zubat', 'Golbat', 'Spheal', 'Tentacool', 'Magikarp', 'Wailmer'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Snorunt', 100000, 20)],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Cave of Origin,
//     ['Zubat', 'Golbat', 'Sableye', 'Mawile'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [
//       new DungeonBossPokemon('Kyogre', 100000, 20),
//       new DungeonBossPokemon('Groudon', 100000, 20),
//     ],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Seafloor Cavern,
//     ['Zubat', 'Golbat', 'Tentacool', 'Magikarp', 'Wailmer'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [new DungeonBossPokemon('Wailmer', 100000, 20)],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Sky Pillar,
//     ['Golbat', 'Sableye', 'Claydol', 'Banette', 'Mawile', 'Altaria'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [
//       new DungeonBossPokemon('Dusclops', 100000, 20),
//       new DungeonBossPokemon('Rayquaza', 100000, 20),
//     ],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
//
// new Dungeon(DungeonName.Victory Road Hoenn,
//     ['Zubat', 'Golbat', 'Whismur', 'Loudred', 'Makuhita', 'Aron', 'Mawile', 'Meditite', 'Geodude', 'Goldeen', 'Magikarp', 'Barboach', 'Whiscash'],
//     [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xExp],
//     4000,
//     [
//       new DungeonBossPokemon('Hariyama', 100000, 20),
//       new DungeonBossPokemon('Lairon', 100000, 20),
//       new DungeonBossPokemon('Medicham', 100000, 20),
//       new DungeonBossPokemon('Graveler', 100000, 20),
//     ],
//     12000, [new BadgeRequirement(BadgeCase.Badge.Stone)] 101, 5);
