/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="DungeonBossPokemon.ts"/>
///<reference path="../achievements/GymBadgeRequirement.ts"/>
///<reference path="../achievements/MultiRequirement.ts"/>
///<reference path="../achievements/ObtainedPokemonRequirement.ts"/>
///<reference path="./DungeonTrainer.ts"/>
///<reference path="../gym/GymPokemon.ts"/>

interface EnemyOptions {
    weight?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement
}

interface DetailedPokemon {
    pokemon: PokemonNameType,
    options: EnemyOptions
}

type Enemy = PokemonNameType | DetailedPokemon | DungeonTrainer;

type Boss = DungeonBossPokemon | DungeonTrainer;

interface EncounterInfo {
    image: string,
    shiny: boolean,
    hidden: boolean,
    locked: boolean,
    lockMessage: string,
}

/**
 * Gym class.
 */
class Dungeon {

    constructor(
        public name: string,
        public enemyList: Enemy[],
        public itemList: GameConstants.BattleItemType[],
        public baseHealth: number,
        public bossList: Boss[],
        public tokenCost: number,
        public difficultyRoute: number, // Closest route in terms of difficulty, used for egg steps, dungeon tokens etc.
        public level: number
    ) { }

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

    /**
     * Finds the possible Bosses in the dungeon
     * @param includeTrainers Whether to include Trainer Bosses. Defaults to true
     * @param ignoreRequirement Whether to check if requirements are met. Defaults to false
     */
    public availableBosses(includeTrainers = true, ignoreRequirement = false): Boss[] {
        // TODO: HLXII - We need this check as this method is called somewhere during initialization when App isn't initialized yet
        // the requirement.isCompleted call can sometimes use the App object, which will cause this to crash
        // Once App is moved to modules, this check might be able to be removed.
        if (!App.game) {
            return [];
        }
        if (includeTrainers) {
            return this.bossList.filter(boss => {
                return (!ignoreRequirement && boss.options?.requirement) ? boss.options.requirement.isCompleted() : true;
            });
        } else {
            return this.bossList.filter(b => {
                if (b instanceof DungeonBossPokemon) {
                    return (!ignoreRequirement && b.options?.requirement) ? b.options.requirement.isCompleted() : true;
                }
                return false;
            }).map(b => <DungeonBossPokemon>b);
        }
    }

    /**
     * Retreives the weights for all the possible bosses
     */
    get bossWeightList(): number[] {
        return this.availableBosses().map((boss) => {
            return boss.options?.weight ?? 1;
        });
    }

    /**
     * Returns the possible enemies in the dungeon.
     * @param ignoreRequirement Whether to check if requirements are met. Defaults to false
     */
    public availableMinions(ignoreRequirement = false): Enemy[] {
        return this.enemyList.filter((enemy) => {
            if (typeof enemy === 'string') {
                return true;
            } else {
                return (!ignoreRequirement && enemy.options?.requirement) ? enemy.options.requirement.isCompleted() : true;
            }
        });
    }

    /**
     * Retreives the weights for all the possible enemies
     */
    get weightList(): number[] {
        return this.availableMinions().map((enemy) => {
            if (typeof enemy === 'string') {
                return 1;
            } else if (enemy.hasOwnProperty('pokemon')) {
                return (<DetailedPokemon>enemy).options.weight ?? 1;
            } else {
                return (<DungeonTrainer>enemy).options?.weight ?? 1;
            }
        });
    }

    /**
     * Returns the possible minion Pokemon in the dungeon.
     * Filters out Trainers and collapses DetailedPokemon
     */
    get pokemonList(): PokemonNameType[] {
        // Filtering out Trainers
        return this.enemyList.filter((enemy) => {
            return !enemy.hasOwnProperty('name');
        }).map((enemy) => {
            // Collapsing DetailedPokemon
            if (typeof enemy === 'string') {
                return enemy;
            } else if (enemy.hasOwnProperty('pokemon')) {
                return (<DetailedPokemon>enemy).pokemon;
            }
        });
    }

    /**
     * Returns the possible boss Pokemon in the dungeon.
     * Filters out Trainers
     */
    get bossPokemonList(): PokemonNameType[] {
        // Filtering out Trainers
        return this.bossList.filter((enemy) => {
            return enemy instanceof DungeonBossPokemon;
        }).map((enemy) => {
            return enemy.name as PokemonNameType;
        });
    }

    /**
     * Gets all possible Pokemon in the dungeon
     */
    get allPokemon(): PokemonNameType[] {
        return this.pokemonList.concat(this.bossPokemonList);
    }

    /**
     * Finds all possible encounters in the Dungeon and their details.
     * Used for generating the Dungeon Encounter view
     */
    get encounterList(): EncounterInfo[] {
        const encounterInfo = [];

        // Handling minions
        this.enemyList.forEach((enemy) => {
            // Handling Pokemon
            if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {
                let pokemonName: PokemonNameType;
                if (enemy.hasOwnProperty('pokemon')) {
                    pokemonName = (<DetailedPokemon>enemy).pokemon;
                } else {
                    pokemonName = <PokemonNameType>enemy;
                }
                const encounter = {
                    image: `assets/images/${(App.game.party.alreadyCaughtPokemonByName(pokemonName, true) ? 'shiny' : '')}pokemon/${pokemonMap[pokemonName].id}.png`,
                    shiny:  App.game.party.alreadyCaughtPokemonByName(pokemonName, true),
                    hidden: !App.game.party.alreadyCaughtPokemonByName(pokemonName),
                    lock: false,
                    lockMessage: '',
                };
                encounterInfo.push(encounter);
            // Handling Trainers
            } else { /* We don't display minion Trainers */ }
        });

        // Handling Bosses
        this.bossList.forEach((boss) => {
            // Handling Pokemon
            if (boss instanceof DungeonBossPokemon) {
                const pokemonName = boss.name;
                const encounter = {
                    image: `assets/images/${(App.game.party.alreadyCaughtPokemonByName(pokemonName, true) ? 'shiny' : '')}pokemon/${pokemonMap[pokemonName].id}.png`,
                    shiny:  App.game.party.alreadyCaughtPokemonByName(pokemonName, true),
                    hidden: !App.game.party.alreadyCaughtPokemonByName(pokemonName),
                    lock: boss.options?.requirement ? !boss.options?.requirement.isCompleted() : false,
                    lockMessage: boss.options?.requirement ? boss.options?.requirement.hint() : '',
                };
                encounterInfo.push(encounter);
            // Handling Trainer
            } else {
                const encounter = {
                    image: boss.image,
                    shiny:  false,
                    hidden: false,
                    lock: boss.options?.requirement ? !boss.options?.requirement.isCompleted() : false,
                    lockMessage: boss.options?.requirement ? boss.options?.requirement.hint() : '',
                };
                encounterInfo.push(encounter);
            }
        });

        return encounterInfo;
    }
}

/**
 * Data list that contains all dungeons, accessible by name.
 */

const dungeonList: { [dungeonName: string]: Dungeon } = {};

// Kanto Dungeons

dungeonList['Viridian Forest'] = new Dungeon('Viridian Forest',
    [
        {pokemon: 'Caterpie', options: { weight: 2.67 }},
        {pokemon: 'Metapod', options: { weight: 2.67 }},
        {pokemon: 'Weedle', options: { weight: 2.67 }},
        {pokemon: 'Kakuna', options: { weight: 2.67 }},
        {pokemon: 'Pidgey', options: { weight: 2.67 }},
        {pokemon: 'Pidgeotto', options: { weight: 2.67 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Weedle', 50, 6),
                new GymPokemon('Caterpie', 50, 6),
            ], 1, { weight: 1 }, 'Rick'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Weedle', 50, 7),
                new GymPokemon('Kakuna', 50, 7),
                new GymPokemon('Weedle', 50, 7),
            ], 1, { weight: 1 }, 'Doug'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Caterpie', 50, 7),
                new GymPokemon('Caterpie', 50, 8),
            ], 1, { weight: 1 }, 'Anthony'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Metapod', 50, 7),
                new GymPokemon('Caterpie', 50, 7),
                new GymPokemon('Metapod', 50, 7),
            ], 1, { weight: 1 }, 'Charlie'),
    ],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    102,
    [
        new DungeonBossPokemon('Pikachu', 510, 7),
        new DungeonTrainer('Bug Catcher',
            [new GymPokemon('Weedle', 510, 9)],
            1, { weight: 1 }, 'Sammy'),
    ],
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
    [
        {pokemon: 'Sandshrew', options: { weight: 8.8 }},
        {pokemon: 'Clefairy', options: { weight: 8.8 }},
        {pokemon: 'Zubat', options: { weight: 8.8 }},
        {pokemon: 'Paras', options: { weight: 8.8 }},
        {pokemon: 'Geodude', options: { weight: 8.8 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Weedle', 75, 11),
                new GymPokemon('Kakuna', 75, 11),
            ], 1, { weight: 1 }, 'Kent'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Clefairy', 75, 14)],
            1, { weight: 1 }, 'Iris'),
        new DungeonTrainer('Super Nerd',
            [
                new GymPokemon('Magnemite', 75, 11),
                new GymPokemon('Voltorb', 75, 11),
            ], 1, { weight: 1 }, 'Jovan'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Caterpie', 75, 10),
                new GymPokemon('Metapod', 75, 10),
                new GymPokemon('Caterpie', 75, 10),
            ], 1, { weight: 1 }, 'Robby'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Oddish', 75, 11),
                new GymPokemon('Bellsprout', 75, 11),
            ], 1, { weight: 1 }, 'Miriam'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Rattata', 75, 10),
                new GymPokemon('Rattata', 75, 10),
                new GymPokemon('Zubat', 75, 10),
            ], 1, { weight: 1 }, 'Josh'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 75, 10),
                new GymPokemon('Geodude', 75, 10),
                new GymPokemon('Onix', 75, 10),
            ], 1, { weight: 1 }, 'Marcos'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Sandshrew', 75, 11),
                new GymPokemon('Rattata', 75, 11),
                new GymPokemon('Zubat', 75, 11),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 75, 13),
                new GymPokemon('Ekans', 75, 13),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 75, 13),
                new GymPokemon('Sandshrew', 75, 13),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 75, 13),
                new GymPokemon('Zubat', 75, 13),
            ], 1, { weight: 1 }, undefined, '(male)'),
    ],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Token_collector],
    834,
    [
        new DungeonBossPokemon('Kabuto', 4170, 12, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Moon'))}),
        new DungeonBossPokemon('Omanyte', 4170, 12, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Moon'))}),
        new DungeonTrainer('Super Nerd',
            [
                new GymPokemon('Grimer', 2780, 12),
                new GymPokemon('Voltorb', 2780, 12),
                new GymPokemon('Koffing', 2780, 12),
            ], 1, { weight: 1 }, 'Miguel'),
    ],
    75, 4, 10
);

dungeonList['Rock Tunnel'] = new Dungeon('Rock Tunnel',
    [
        {pokemon: 'Zubat', options: { weight: 20 }},
        {pokemon: 'Geodude', options: { weight: 20 }},
        {pokemon: 'Machop', options: { weight: 20 }},
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Cubone', 500, 23),
                new GymPokemon('Slowpoke', 500, 23),
            ], 1, { weight: 1 }, 'Ashton'),
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Slowpoke', 500, 25)],
            1, { weight: 1 }, 'Winston'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Oddish', 500, 22),
                new GymPokemon('Bulbasaur', 500, 22),
            ], 1, { weight: 1 }, 'Martha'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Charmander', 500, 22),
                new GymPokemon('Cubone', 500, 22),
            ], 1, { weight: 1 }, 'Steve'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Geodude', 500, 25)],
            1, { weight: 1 }, 'Allen'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Machop', 500, 20),
                new GymPokemon('Onix', 500, 20),
            ], 1, { weight: 1 }, 'Eric'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 500, 19),
                new GymPokemon('Onix', 500, 19),
                new GymPokemon('Geodude', 500, 19),
                new GymPokemon('Geodude', 500, 19),
            ], 1, { weight: 1 }, 'Lenny'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Onix', 500, 20),
                new GymPokemon('Onix', 500, 20),
                new GymPokemon('Geodude', 500, 20),
            ], 1, { weight: 1 }, 'Oliver'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 500, 21),
                new GymPokemon('Graveler', 500, 21),
            ], 1, { weight: 1 }, 'Lucas'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Jigglypuff', 500, 21),
                new GymPokemon('Pidgey', 500, 21),
                new GymPokemon('Meowth', 500, 21),
            ], 1, { weight: 1 }, 'Sofia'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 500, 21),
                new GymPokemon('Geodude', 500, 21),
                new GymPokemon('Graveler', 500, 21),
            ], 1, { weight: 1 }, 'Dudley'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Slowpoke', 500, 20),
                new GymPokemon('Slowpoke', 500, 20),
                new GymPokemon('Slowpoke', 500, 20),
            ], 1, { weight: 1 }, 'Cooper'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Bellsprout', 500, 22),
                new GymPokemon('Clefairy', 500, 22),
            ], 1, { weight: 1 }, 'Leah'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Meowth', 500, 20),
                new GymPokemon('Oddish', 500, 20),
                new GymPokemon('Pidgey', 500, 20),
            ], 1, { weight: 1 }, 'Dana'),
    ],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    4117,
    [
        new DungeonBossPokemon('Onix', 20585, 17),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Pidgey', 13586, 19),
                new GymPokemon('Rattata', 13586, 19),
                new GymPokemon('Rattata', 13586, 19),
                new GymPokemon('Bellsprout', 13586, 19),
            ], 1, { weight: 1 }, 'Ariana'),
    ],
    500, 5, 15
);

dungeonList['Power Plant'] = new Dungeon('Power Plant',
    ['Pikachu', 'Raichu', 'Magnemite', 'Magneton', 'Grimer', 'Muk', 'Voltorb', 'Electrode'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    13507,
    [
        new DungeonBossPokemon('Electabuzz', 67535, 35),
        new DungeonBossPokemon('Zapdos', 101302, 50),
    ],
    1000, 8, 25
);

dungeonList['Pokemon Tower'] = new Dungeon('Pokemon Tower',
    [
        {pokemon: 'Gastly', options: { weight: 21.3 }},
        {pokemon: 'Haunter', options: { weight: 21.3 }},
        {pokemon: 'Cubone', options: { weight: 21.3 }},
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 23)],
            1, { weight: 1 }, 'Hope'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 22)],
            1, { weight: 1 }, 'Patricia'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            1, { weight: 1 }, 'Carly'),
        new DungeonTrainer('Channeler',
            [
                new GymPokemon('Gastly', 750, 23),
                new GymPokemon('Gastly', 750, 23),
            ], 1, { weight: 1 }, 'Laurel'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 22)],
            1, { weight: 1 }, 'Jody'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            1, { weight: 1 }, 'Paula'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 22)],
            1, { weight: 1 }, 'Ruth'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Haunter', 750, 23)],
            1, { weight: 1 }, 'Tammy'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Haunter', 750, 24)],
            1, { weight: 1 }, 'Karina'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 22)],
            1, { weight: 1 }, 'Janae'),
        new DungeonTrainer('Channeler',
            [
                new GymPokemon('Gastly', 750, 22),
                new GymPokemon('Gastly', 750, 22),
                new GymPokemon('Gastly', 750, 22),
            ], 1, { weight: 1 }, 'Angelica'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            1, { weight: 1 }, 'Jennifer'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            1, { weight: 1 }, 'Emilia'),
        new DungeonTrainer('Team Rocket Grunt M',
            [
                new GymPokemon('Zubat', 750, 25),
                new GymPokemon('Zubat', 750, 25),
                new GymPokemon('Golbat', 750, 25),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt M',
            [
                new GymPokemon('Koffing', 750, 26),
                new GymPokemon('Drowzee', 750, 26),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt M',
            [
                new GymPokemon('Zubat', 750, 23),
                new GymPokemon('Rattata', 750, 23),
                new GymPokemon('Raticate', 750, 23),
                new GymPokemon('Zubat', 750, 23),
            ], 1, { weight: 1 }, undefined, '(male)'),
    ],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    7523,
    [new DungeonBossPokemon('Marowak', 37615, 30)],
    750, 10, 20
);

dungeonList['Seafoam Islands'] = new Dungeon('Seafoam Islands',
    ['Zubat', 'Golbat', 'Goldeen', 'Poliwag', 'Magikarp', 'Slowpoke', 'Slowbro', 'Tentacool', 'Krabby', 'Kingler', 'Staryu'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_egg],
    17226,
    [
        new DungeonBossPokemon('Seel', 86130, 35),
        new DungeonBossPokemon('Articuno', 129195, 50),
    ],
    1250, 15, 30
);

dungeonList['Pokemon Mansion'] = new Dungeon('Pokemon Mansion',
    [
        {pokemon: 'Rattata', options: { weight: 3.5 }},
        {pokemon: 'Raticate', options: { weight: 3.5 }},
        {pokemon: 'Growlithe', options: { weight: 3.5 }},
        {pokemon: 'Grimer', options: { weight: 3.5 }},
        {pokemon: 'Muk', options: { weight: 3.5 }},
        {pokemon: 'Koffing', options: { weight: 3.5 }},
        {pokemon: 'Weezing', options: { weight: 3.5 }},
        {pokemon: 'Ditto', options: { weight: 3.5 }},
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Ekans', 1500, 33),
                new GymPokemon('Ekans', 1500, 33),
                new GymPokemon('Raticate', 1500, 34),
            ], 1, { weight: 1 }, 'Johnson'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Charmander', 1500, 34),
                new GymPokemon('Charmeleon', 1500, 34),
            ], 1, { weight: 1 }, 'Arnie'),
        new DungeonTrainer('Burglar',
            [new GymPokemon('Ninetales', 1500, 38)],
            1, { weight: 1 }, 'Simon'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 1500, 33),
                new GymPokemon('Magneton', 1500, 33),
                new GymPokemon('Voltorb', 1500, 33),
            ], 1, { weight: 1 }, 'Braydon'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 1500, 29),
                new GymPokemon('Weezing', 1500, 29),
            ], 1, { weight: 1 }, 'Ted'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Growlithe', 1500, 34),
                new GymPokemon('Ponyta', 1500, 34),
            ], 1, { weight: 1 }, 'Lewis'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 1500, 34),
                new GymPokemon('Electrode', 1500, 34),
            ], 1, { weight: 1 }, 'Ivan'),
    ],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    17760,
    [new DungeonBossPokemon('Magmar', 88800, 40)],
    1500, 16, 35
);

dungeonList['Victory Road'] = new Dungeon('Victory Road',
    [
        {pokemon: 'Zubat', options: { weight: 8.8 }},
        {pokemon: 'Golbat', options: { weight: 8.8 }},
        {pokemon: 'Geodude', options: { weight: 8.8 }},
        {pokemon: 'Graveler', options: { weight: 8.8 }},
        {pokemon: 'Onix', options: { weight: 8.8 }},
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Persian', 2000, 42),
                new GymPokemon('Ponyta', 2000, 42),
                new GymPokemon('Rapidash', 2000, 42),
                new GymPokemon('Vulpix', 2000, 42),
                new GymPokemon('Ninetales', 2000, 42),
            ], 1, { weight: 1 }, 'Naomi', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Raticate', 2000, 42),
                new GymPokemon('Ivysaur', 2000, 42),
                new GymPokemon('Wartortle', 2000, 42),
                new GymPokemon('Charmeleon', 2000, 42),
                new GymPokemon('Charizard', 2000, 42),
            ], 1, { weight: 1 }, 'Rolando', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Machoke', 2000, 43),
                new GymPokemon('Machop', 2000, 43),
                new GymPokemon('Machoke', 2000, 43),
            ], 1, { weight: 1 }, 'Daisuke'),
        new DungeonTrainer('Juggler',
            [
                new GymPokemon('Drowzee', 2000, 41),
                new GymPokemon('Hypno', 2000, 41),
                new GymPokemon('Kadabra', 2000, 41),
                new GymPokemon('Kadabra', 2000, 41),
            ], 1, { weight: 1 }, 'Nelson'),
        new DungeonTrainer('Tamer',
            [
                new GymPokemon('Persian', 2000, 44),
                new GymPokemon('Golduck', 2000, 44),
            ], 1, { weight: 1 }, 'Vincent'),
        new DungeonTrainer('Juggler',
            [new GymPokemon('Mr. Mime', 2000, 48)],
            1, { weight: 1 }, 'Gregory'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Exeggutor', 2000, 42),
                new GymPokemon('Sandslash', 2000, 42),
                new GymPokemon('Cloyster', 2000, 42),
                new GymPokemon('Electrode', 2000, 42),
                new GymPokemon('Arcanine', 2000, 42),
            ], 1, { weight: 1 }, 'George', '(male)'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Charmeleon', 2000, 40),
                new GymPokemon('Lapras', 2000, 40),
                new GymPokemon('Lickitung', 2000, 40),
            ], 1, { weight: 1 }, 'Dawson'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Clefairy', 2000, 42),
                new GymPokemon('Jigglypuff', 2000, 42),
                new GymPokemon('Persian', 2000, 42),
                new GymPokemon('Dewgong', 2000, 42),
                new GymPokemon('Chansey', 2000, 42),
            ], 1, { weight: 1 }, 'Alexa', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Kingler', 2000, 41),
                new GymPokemon('Poliwhirl', 2000, 42),
                new GymPokemon('Tentacruel', 2000, 42),
                new GymPokemon('Seadra', 2000, 42),
                new GymPokemon('Blastoise', 2000, 42),
            ], 1, { weight: 1 }, 'Colby', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Bellsprout', 2000, 42),
                new GymPokemon('Weepinbell', 2000, 42),
                new GymPokemon('Victreebel', 2000, 42),
                new GymPokemon('Paras', 2000, 42),
                new GymPokemon('Parasect', 2000, 42),
            ], 1, { weight: 1 }, 'Caroline', '(female)'),
    ],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    24595,
    [
        new DungeonBossPokemon('Machoke', 122975, 42),
        new DungeonBossPokemon('Moltres', 184462, 50),
        new DungeonTrainer('Cool Couple',
            [
                new GymPokemon('Nidoking', 122975, 45),
                new GymPokemon('Nidoqueen', 122975, 45),
            ], 1, { weight: 1 }, 'Ray & Tyra'),
    ],
    2000, 20, 40
);

dungeonList['Cerulean Cave'] = new Dungeon('Cerulean Cave',
    ['Arbok', 'Raichu', 'Sandslash', 'Golbat', 'Gloom', 'Parasect', 'Venomoth', 'Weepinbell', 'Graveler', 'Ditto', 'Chansey', 'Magikarp', 'Poliwag', 'Goldeen', 'Seaking'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    28735,
    [
        new DungeonBossPokemon('Rhydon', 183675, 60),
        new DungeonBossPokemon('Mewtwo', 255512, 100),
    ],
    2500, 20, 55
);

// Johto Dungeons

dungeonList['Sprout Tower'] = new Dungeon('Sprout Tower',
    ['Rattata', 'Gastly', 'Hoothoot'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    56735,
    [new DungeonBossPokemon('Bellsprout', 260000, 10)],
    2500, 31, 5
);

dungeonList['Ruins of Alph'] = new Dungeon('Ruins of Alph',
    ['Natu', 'Wooper', 'Quagsire', 'Smeargle', 'Magikarp', 'Poliwag', 'Poliwhirl'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    60600,
    [
        new DungeonBossPokemon('Unown (A)', 280000, 14),
        new DungeonBossPokemon('Unown (L)', 280000, 14),
        new DungeonBossPokemon('Unown (P)', 280000, 14),
        new DungeonBossPokemon('Unown (H)', 280000, 14),
    ],
    3000, 32, 7
);

dungeonList['Union Cave'] = new Dungeon('Union Cave',
    ['Rattata', 'Sandshrew', 'Zubat', 'Geodude', 'Onix', 'Goldeen', 'Magikarp'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    63600,
    [new DungeonBossPokemon('Wooper', 300000, 14)],
    3000, 32, 7
);

dungeonList['Slowpoke Well'] = new Dungeon('Slowpoke Well',
    ['Zubat', 'Slowpoke'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    67900,
    [new DungeonBossPokemon('Slowbro', 320000, 20)],
    3500, 33, 12
);

dungeonList['Ilex Forest'] = new Dungeon('Ilex Forest',
    ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Zubat', 'Oddish', 'Paras', 'Hoothoot'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    82200,
    [
        new DungeonBossPokemon('Noctowl', 340000, 30),
        new DungeonBossPokemon('Beedrill', 340000, 30),
        new DungeonBossPokemon('Butterfree', 340000, 30),
        new DungeonBossPokemon('Celebi', 800000, 50, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)}),
    ],
    4000, 34, 15
);

dungeonList['Burned Tower'] = new Dungeon('Burned Tower',
    ['Rattata', 'Zubat', 'Koffing', 'Raticate'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    88500,
    [new DungeonBossPokemon('Golbat', 360000, 35), new DungeonBossPokemon('Weezing', 320000, 35), new DungeonBossPokemon('Shuckle', 610000, 50)],
    4500, 37, 20
);

dungeonList['Tin Tower'] = new Dungeon('Tin Tower',
    ['Rattata', 'Gastly'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    88500,
    [
        new DungeonBossPokemon('Raticate', 380000, 35),
        new DungeonBossPokemon('Haunter', 380000, 35),
        new DungeonBossPokemon('Ho-Oh', 1410000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Raikou),
            new ObtainedPokemonRequirement(pokemonMap.Entei),
            new ObtainedPokemonRequirement(pokemonMap.Suicune),
        ])}),
    ],
    4500, 37, 20
);

dungeonList['Whirl Islands'] = new Dungeon('Whirl Islands',
    ['Zubat', 'Golbat', 'Seel', 'Krabby', 'Horsea'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_egg],
    92800,
    [new DungeonBossPokemon('Dewgong', 400000, 40), new DungeonBossPokemon('Kingler', 400000, 40), new DungeonBossPokemon('Lugia', 1410000, 100)],
    5000, 41, 25
);

dungeonList['Mt Mortar'] = new Dungeon('Mt Mortar',
    ['Rattata', 'Zubat', 'Geodude', 'Marill', 'Raticate', 'Golbat', 'Graveler'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    104100,
    [new DungeonBossPokemon('Tyrogue', 420000, 45)],
    5500, 42, 30
);

dungeonList['Ice Path'] = new Dungeon('Ice Path',
    ['Zubat', 'Jynx', 'Swinub'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_incense],
    120400,
    [new DungeonBossPokemon('Delibird', 440000, 50)],
    6000, 44, 32
);

dungeonList['Dark Cave'] = new Dungeon('Dark Cave',
    ['Zubat', 'Geodude', 'Golbat', 'Graveler', 'Wobbuffet'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    127000,
    [new DungeonBossPokemon('Dunsparce', 460000, 55)],
    6500, 45, 35
);

dungeonList['Mt Silver'] = new Dungeon('Mt Silver',
    ['Ponyta', 'Doduo', 'Tangela', 'Sneasel', 'Ursaring', 'Donphan', 'Teddiursa', 'Phanpy', 'Quagsire', 'Misdreavus'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    130500,
    [new DungeonBossPokemon('Larvitar', 840000, 60)],
    10000, 28, 50
);

// Hoenn Dungeons

dungeonList['Petalburg Woods'] = new Dungeon('Petalburg Woods',
    ['Poochyena', 'Zigzagoon', 'Wurmple', 'Silcoon', 'Cascoon', 'Taillow', 'Shroomish'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    380000,
    [new DungeonBossPokemon('Slakoth', 860000, 10)],
    12000, 101, 5);

dungeonList['Rusturf Tunnel'] = new Dungeon('Rusturf Tunnel',
    ['Whismur'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    400000,
    [new DungeonBossPokemon('Whismur', 900000, 20)],
    14000, 101, 5);

dungeonList['Granite Cave'] = new Dungeon('Granite Cave',
    ['Zubat', 'Abra', 'Geodude', 'Makuhita', 'Aron', 'Sableye'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    410000,
    [new DungeonBossPokemon('Mawile', 960000, 20), new DungeonBossPokemon('Nosepass', 660000, 20)],
    16000, 101, 5);

dungeonList['Fiery Path'] = new Dungeon('Fiery Path',
    ['Machop', 'Grimer', 'Koffing', 'Slugma', 'Numel'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    424000,
    [new DungeonBossPokemon('Torkoal', 1200000, 20)],
    17000, 101, 5);

dungeonList['Meteor Falls'] = new Dungeon('Meteor Falls',
    ['Zubat', 'Golbat', 'Goldeen', 'Magikarp', 'Barboach'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    443000,
    [
        new DungeonBossPokemon('Solrock', 1240000, 20),
        new DungeonBossPokemon('Lunatone', 1240000, 20),
    ],
    18000, 101, 5);

dungeonList['Mt. Chimney'] = new Dungeon('Mt. Chimney',
    ['Zubat', 'Poochyena'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    460000,
    [new DungeonBossPokemon('Numel', 1370000, 20)],
    20000, 101, 5);

dungeonList['Jagged Pass'] = new Dungeon('Jagged Pass',
    ['Machop', 'Numel', 'Spoink'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    460000,
    [
        new DungeonBossPokemon('Machop', 1400000, 20),
        new DungeonBossPokemon('Numel', 1400000, 20),
        new DungeonBossPokemon('Spoink', 1400000, 20),
    ],
    22000, 101, 5);

dungeonList['New Mauville'] = new Dungeon('New Mauville',
    ['Magnemite', 'Voltorb'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    460000,
    [
        new DungeonBossPokemon('Magneton', 1650000, 20),
        new DungeonBossPokemon('Electrode', 1650000, 20),
    ],
    24000, 101, 5);

dungeonList['Mt. Pyre'] = new Dungeon('Mt. Pyre',
    ['Shuppet', 'Duskull', 'Vulpix', 'Wingull', 'Meditite'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    480000,
    [
        new DungeonBossPokemon('Shuppet', 1880000, 20),
        new DungeonBossPokemon('Duskull', 1890000, 20),
        new DungeonBossPokemon('Chimecho', 1880000, 20),
    ],
    46000, 101, 5);

dungeonList['Shoal Cave'] = new Dungeon('Shoal Cave',
    ['Zubat', 'Golbat', 'Spheal', 'Tentacool', 'Magikarp', 'Wailmer'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    490000,
    [new DungeonBossPokemon('Snorunt', 1900000, 20)],
    28000, 101, 5);

dungeonList['Cave of Origin'] = new Dungeon('Cave of Origin',
    ['Zubat', 'Golbat', 'Sableye', 'Mawile'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    590000,
    [
        new DungeonBossPokemon('Exploud', 2000000, 50),
        new DungeonBossPokemon('Kyogre', 4700000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)}),
        new DungeonBossPokemon('Groudon', 4700000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)}),
    ],
    34000, 101, 5);

dungeonList['Seafloor Cavern'] = new Dungeon('Seafloor Cavern',
    ['Zubat', 'Golbat', 'Tentacool', 'Magikarp', 'Wailmer'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    530000,
    [new DungeonBossPokemon('Wailmer', 2200000, 20)],
    31000, 101, 5);

dungeonList['Sky Pillar'] = new Dungeon('Sky Pillar',
    ['Golbat', 'Sableye', 'Claydol', 'Banette', 'Mawile', 'Altaria'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    720000,
    [
        new DungeonBossPokemon('Dusclops', 3200000, 20),
        new DungeonBossPokemon('Rayquaza', 5824002, 100),
    ],
    40000, 101, 5);

dungeonList['Sealed Chamber'] = new Dungeon('Sealed Chamber',
    ['Zubat', 'Golbat', 'Tentacool'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    500000,
    [
        new DungeonBossPokemon('Regirock', 4500000, 20),
        new DungeonBossPokemon('Regice', 4500000, 20),
        new DungeonBossPokemon('Registeel', 4500000, 20),
    ],
    32000, 101, 5);

dungeonList['Victory Road Hoenn'] = new Dungeon('Victory Road Hoenn',
    ['Zubat', 'Golbat', 'Whismur', 'Loudred', 'Makuhita', 'Aron', 'Mawile', 'Meditite', 'Geodude', 'Goldeen', 'Magikarp', 'Barboach', 'Whiscash'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_egg],
    560000,
    [
        new DungeonBossPokemon('Hariyama', 3300000, 20),
        new DungeonBossPokemon('Lairon', 3300000, 20),
        new DungeonBossPokemon('Medicham', 3300000, 20),
        new DungeonBossPokemon('Graveler', 3300000, 20),
    ],
    37000, 101, 5);

// Sinnoh

dungeonList['Oreburgh Gate'] = new Dungeon('Oreburgh Gate',
    ['Zubat', 'Psyduck', 'Geodude', 'Golduck', 'Magikarp', 'Barboach'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    720600,
    [
        new DungeonBossPokemon('Gyarados', 3703000, 14),
        new DungeonBossPokemon('Whiscash', 3703000, 14),
    ],
    39000, 201, 7);

dungeonList['Ravaged Path'] = new Dungeon('Ravaged Path',
    ['Zubat', 'Psyduck',  'Golduck', 'Magikarp', 'Barboach'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    756000,
    [
        new DungeonBossPokemon('Gyarados', 3803000, 14),
        new DungeonBossPokemon('Whiscash', 3803000, 14),
    ],
    43000, 201, 7);

dungeonList['Eterna Forest'] = new Dungeon('Eterna Forest',
    ['Gastly', 'Hoothoot', 'Wurmple', 'Silcoon', 'Cascoon', 'Bidoof', 'Kricketot', 'Budew', 'Buneary'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    812000,
    [
        new DungeonBossPokemon('Beautifly', 3950000, 30),
        new DungeonBossPokemon('Dustox', 3950000, 30),
    ],
    48000, 201, 15);

dungeonList['Old Chateau'] = new Dungeon('Old Chateau',
    ['Gastly', 'Haunter', 'Gengar'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    853000,
    [
        new DungeonBossPokemon('Rotom', 4200000, 100),
        new DungeonBossPokemon('Rotom (heat)', 4300000, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Rotom)}),
        new DungeonBossPokemon('Rotom (wash)', 4300000, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Rotom)}),
        new DungeonBossPokemon('Rotom (frost)', 4300000, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Rotom)}),
        new DungeonBossPokemon('Rotom (fan)', 4300000, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Rotom)}),
        new DungeonBossPokemon('Rotom (mow)', 4300000, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Rotom)}),
    ],
    52500, 230, 100);

dungeonList['Wayward Cave'] = new Dungeon('Wayward Cave',
    ['Zubat', 'Geodude', 'Onix'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    903000,
    [new DungeonBossPokemon('Bronzor', 4400000, 100)],
    56500, 230, 100);

dungeonList['Mt. Coronet South'] = new Dungeon('Mt. Coronet South',
    [{pokemon: 'Clefairy', options: { weight: 2 }}, 'Zubat', 'Machop', 'Geodude', 'Nosepass', 'Meditite', 'Chingling', 'Bronzor', 'Magikarp', 'Barboach', 'Noctowl'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    951500,
    [
        new DungeonBossPokemon('Machoke', 4000000, 35),
        new DungeonBossPokemon('Bronzong', 4000000, 50),
        new DungeonBossPokemon('Absol', 4000000, 50),
    ],
    60500, 201, 20);

dungeonList['Iron Island'] = new Dungeon('Iron Island',
    ['Tentacool', 'Wingull', 'Tentacruel', 'Pelipper', 'Finneon', 'Zubat', 'Geodude', 'Onix', 'Golbat', 'Graveler'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    983000,
    [new DungeonBossPokemon('Steelix', 4210000, 100)],
    66500, 230, 100);

dungeonList['Mt. Coronet North'] = new Dungeon('Mt. Coronet North',
    [{pokemon: 'Clefairy', options: { weight: 2 }}, 'Zubat', 'Machop', 'Geodude', 'Meditite', 'Chingling', 'Bronzor', 'Magikarp', 'Barboach', 'Noctowl', 'Snover'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_incense],
    1015000,
    [
        new DungeonBossPokemon('Graveler', 4600000, 35),
        new DungeonBossPokemon('Feebas', 4600000, 50),
        new DungeonBossPokemon('Medicham', 4600000, 50),
    ],
    69500, 201, 20);

dungeonList['Lake Verity'] = new Dungeon('Lake Verity',
    ['Starly', 'Bidoof', 'Psyduck', 'Magikarp', 'Goldeen'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Item_magnet],
    1068735,
    [
        new DungeonBossPokemon('Golduck', 4820000, 10),
        new DungeonBossPokemon('Seaking', 4820000, 10),
    ],
    72500, 201, 5);

dungeonList['Lake Valor'] = new Dungeon('Lake Valor',
    ['Staravia', 'Bibarel', 'Psyduck', 'Golduck', 'Magikarp', 'Goldeen'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    1111500,
    [
        new DungeonBossPokemon('Noctowl', 4960000, 35),
        new DungeonBossPokemon('Azelf', 10060000, 35),
    ],
    74500, 201, 20);

dungeonList['Lake Acuity'] = new Dungeon('Lake Acuity',
    ['Sneasel', 'Bibarel', 'Psyduck', 'Golduck', 'Magikarp', 'Goldeen','Snover', 'Snorunt'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Lucky_egg],
    1261800,
    [
        new DungeonBossPokemon('Gyarados', 5070000, 40),
        new DungeonBossPokemon('Uxie', 10070000, 40),
    ],
    78000, 201, 25);

dungeonList['Distortion World'] = new Dungeon('Distortion World',
    ['Golbat', 'Gastly', 'Haunter', 'Duskull', 'Chingling', 'Bronzor', 'Chimecho'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Token_collector],
    1322100,
    [
        new DungeonBossPokemon('Dusclops', 5280000, 45),
        new DungeonBossPokemon('Bronzong', 5280000, 45),
        new DungeonBossPokemon('Giratina (altered)', 11880000, 45),
    ],
    82500, 201, 30);

dungeonList['Victory Road Sinnoh'] = new Dungeon('Victory Road Sinnoh',
    ['Golbat', 'Graveler', 'Onix', 'Rhyhorn', 'Magneton', 'Azumarill', 'Floatzel'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    1503000,
    [
        new DungeonBossPokemon('Rhydon', 7000000, 100),
        new DungeonBossPokemon('Steelix', 7000000, 100),
        new DungeonBossPokemon('Gabite', 7000000, 100),
    ],
    86500, 230, 100);

dungeonList['Spear Pillar'] = new Dungeon('Spear Pillar',
    ['Croagunk', 'Stunky', 'Glameow', 'Bronzor', 'Golbat'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2353000,
    [
        new DungeonBossPokemon('Palkia', 11880000, 100),
        new DungeonBossPokemon('Dialga', 11880000, 100),
    ],
    96500, 230, 100);

dungeonList['Hall of Origin'] = new Dungeon('Hall of Origin',
    ['Slowpoke', 'Spearow', 'Garchomp', 'Slakoth', 'Eevee', 'Breloom', 'Absol'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2653000,
    [
        new DungeonBossPokemon('Arceus (normal)', 13000000, 100),
        new DungeonBossPokemon('Slaking', 10000000, 100),
        new DungeonBossPokemon('Snorlax', 10000000, 100),
        new DungeonBossPokemon('Shuckle', 10000000, 100),
        new DungeonBossPokemon('Blissey', 10000000, 100),
    ],
    106500, 230, 100);

dungeonList['Fullmoon Island'] = new Dungeon('Fullmoon Island',
    ['Illumise', 'Minun', 'Espeon', 'Luvdisc'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2603000,
    [new DungeonBossPokemon('Clefable', 11000000, 100)],
    96500, 230, 100);

dungeonList['Newmoon Island'] = new Dungeon('Newmoon Island',
    ['Volbeat', 'Plusle', 'Umbreon', 'Luvdisc'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2603000,
    [new DungeonBossPokemon('Darkrai', 11000000, 100)],
    96500, 230, 100);

dungeonList['Flower Paradise'] = new Dungeon('Flower Paradise',
    ['Vileplume', 'Bellsprout', 'Exeggutor', 'Bellossom', 'Skiploom', 'Sunflora', 'Roselia'],
    [GameConstants.BattleItemType.xAttack, GameConstants.BattleItemType.Lucky_incense],
    2603000,
    [
        new DungeonBossPokemon('Venusaur', 9900000, 50),
        new DungeonBossPokemon('Meganium', 11000000, 50),
        new DungeonBossPokemon('Shaymin (land)', 11000000, 50),
        new DungeonBossPokemon('Shaymin (sky)', 11000000, 50),
    ],
    96500, 201, 32);

dungeonList['Snowpoint Temple'] = new Dungeon('Snowpoint Temple',
    ['Golbat', 'Sneasel', 'Smoochum'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2603000,
    [
        new DungeonBossPokemon('Jynx', 10000000, 100),
        new DungeonBossPokemon('Regigigas', 11000000, 100),
    ],
    96500, 230, 100);

dungeonList['Stark Mountain'] = new Dungeon('Stark Mountain',
    ['Golbat', 'Graveler', 'Fearow', 'Weezing', 'Rhyhorn', 'Rhydon', 'Numel', 'Slugma', 'Magcargo', 'Camerupt'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2603000,
    [
        new DungeonBossPokemon('Skarmory', 10000000, 100),
        new DungeonBossPokemon('Heatran', 11000000, 100),
    ],
    96500, 230, 100);

// Unova
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Pledge Grove'] = new Dungeon('Pledge Grove',
    ['Fearow', 'Furret', 'Ledian', 'Sudowoodo', 'Stantler', 'Breloom', 'Unfezant', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2403000,
    [new DungeonBossPokemon('Keldeo (Resolute)', 12000000, 100)],
    106500, 20, 100);

dungeonList['Floccesy Ranch'] = new Dungeon('Floccesy Ranch',
    [
        {pokemon: 'Psyduck', options: { weight: 2 }},
        {pokemon: 'Mareep', options: { weight: 2 }},
        {pokemon: 'Azurill', options: { weight: 2 }},
        {pokemon: 'Patrat', options: { weight: 2 }},
        {pokemon: 'Lillipup', options: { weight: 2 }},
        {pokemon: 'Pidove', options: { weight: 2 }},
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Purrloin', 126500, 6),
                new GymPokemon('Sewaddle', 126500, 6),
            ], 1, { weight: 1 }, 'Molly'),
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Lillipup', 126500, 6),
                new GymPokemon('Mareep', 126500, 6),
            ], 1, { weight: 1 }, 'Orville'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Patrat', 126500, 6),
                new GymPokemon('Psyduck', 126500, 6),
            ], 1, { weight: 1 }, 'Kenny'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2503000,
    [new DungeonBossPokemon('Riolu', 13000000, 100)],
    126500, 20, 100);

dungeonList['Liberty Garden'] = new Dungeon('Liberty Garden',
    ['Vulpix', 'Sunflora', 'Abra', 'Wingull', 'Pidove', 'Sentret'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2703000,
    [
        new DungeonBossPokemon('Victini', 14000000, 100),
        new DungeonBossPokemon('Ninetales', 14000000, 100),
        new DungeonBossPokemon('Alakazam', 14000000, 100),
    ],
    136500, 20, 100);

dungeonList['Castelia Sewers'] = new Dungeon('Castelia Sewers',
    [
        {pokemon: 'Rattata', options: { weight: 5.6 }},
        {pokemon: 'Zubat', options: { weight: 5.6 }},
        {pokemon: 'Grimer', options: { weight: 5.6 }},
        {pokemon: 'Muk', options: { weight: 5.6 }},
        {pokemon: 'Trubbish', options: { weight: 5.6 }},
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Lillipup', 146500, 16),
                new GymPokemon('Trubbish', 146500, 16),
            ], 1, { weight: 1 }, 'Felix'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Sewaddle', 146500, 17)],
            1, { weight: 1 }, 'Heath'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Drilbur', 146500, 17)],
            1, { weight: 1 }, 'Zack'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Timburr', 146500, 17)],
            1, { weight: 1 }, 'Scott'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Grimer', 146500, 17)],
            1, { weight: 1 }, 'Caroline', '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Magnemite', 146500, 17)],
            1, { weight: 1 }, 'Clarke', '(male)'),
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Marill', 146500, 31),
                new GymPokemon('Cinccino', 146500, 31),
            ], 1, { weight: 1 }, 'Brady'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2603000,
    [
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Sandile', 15000000, 16)],
            1, { weight: 1 }, 'undefined', '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scraggy', 15000000, 16)],
            1, { weight: 1 }, 'undefined', '(female)'),
    ],
    146500, 4, 100);

dungeonList['Relic Passage'] = new Dungeon('Relic Passage',
    [
        {pokemon: 'Rattata', options: { weight: 8 }},
        {pokemon: 'Raticate', options: { weight: 8 }},
        {pokemon: 'Roggenrola', options: { weight: 8 }},
        {pokemon: 'Woobat', options: { weight: 8 }},
        {pokemon: 'Timburr', options: { weight: 8 }},
        new DungeonTrainer('Scientist',
            [new GymPokemon('Grimer', 156500, 18)],
            1, { weight: 1 }, 'Grimer', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Venipede', 156500, 17),
                new GymPokemon('Koffing', 156500, 17),
            ], 1, { weight: 1 }, 'Lumina', '(female)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Grimer', 156500, 18)],
            1, { weight: 1 }, 'Kendall', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Sandslash', 156500, 32)],
            1, { weight: 1 }, 'Eileen', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Drilbur', 156500, 31),
                new GymPokemon('Roggenrola', 156500, 31),
            ], 1, { weight: 1 }, 'Keith'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Raticate', 156500, 32)],
            1, { weight: 1 }, 'Randall', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Roggenrola', 156500, 31),
                new GymPokemon('Timburr', 156500, 31),
            ], 1, { weight: 1 }, 'Tobias'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Swoobat', 156500, 33)],
            1, { weight: 1 }, 'Randall', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Watchog', 156500, 32)],
            1, { weight: 1 }, 'Annie', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Baltoy', 156500, 32),
                new GymPokemon('Yamask', 156500, 32),
            ], 1, { weight: 1 }, 'Ena', '(female)'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2803000,
    [
        new DungeonBossPokemon('Onix', 16000000, 100),
        new DungeonBossPokemon('Drilbur', 16000000, 100),
    ],
    156500, 25, 100);

dungeonList['Relic Castle'] = new Dungeon('Relic Castle',
    [
        {pokemon: 'Sandshrew', options: { weight: 1.33 }},
        {pokemon: 'Sandslash', options: { weight: 1.33 }},
        {pokemon: 'Sandile', options: { weight: 1.33 }},
        {pokemon: 'Baltoy', options: { weight: 1.33 }},
        {pokemon: 'Krokorok', options: { weight: 1.33 }},
        {pokemon: 'Yamask', options: { weight: 1.33 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Gothita', 166500, 23)],
            1, { weight: 1 }, 'Dua', '(female)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Solosis', 166500, 23)],
            1, { weight: 1 }, 'Low', '(male)'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    3003000,
    [
        new DungeonTrainer('Psychic',
            [new GymPokemon('Sigilyph', 18000000, 23)],
            1, { weight: 1 }, 'Perry', '(male)'),
        new DungeonBossPokemon('Volcarona', 18000000, 100),
    ],
    166500, 25, 100);

dungeonList['Lostlorn Forest'] = new Dungeon('Lostlorn Forest',
    [
        {pokemon: 'Roselia', options: { weight: 2.67 }},
        {pokemon: 'Combee', options: { weight: 2.67 }},
        {pokemon: 'Sewaddle', options: { weight: 2.67 }},
        {pokemon: 'Venipede', options: { weight: 2.67 }},
        {pokemon: 'Cottonee', options: { weight: 2.67 }},
        {pokemon: 'Petilil', options: { weight: 2.67 }},
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Tranquill', 176500, 24),
                new GymPokemon('Liepard', 176500, 24),
            ], 1, { weight: 1 }, 'Galen', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Trubbish', 176500, 26)],
            1, { weight: 1 }, 'Serenity', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Emolga', 176500, 26)],
            1, { weight: 1 }, 'Serenity', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Larvesta', 176500, 51),
                new GymPokemon('Pinsir', 176500, 51),
                new GymPokemon('Heracross', 176500, 51),
                new GymPokemon('Leavanny', 176500, 51),
                new GymPokemon('Scolipede', 176500, 51),
            ], 1, { weight: 1 }, 'Murphy', '(male)'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    3203000,
    [
        new DungeonBossPokemon('Heracross', 19000000, 100),
        new DungeonBossPokemon('Pinsir', 19000000, 100),
        new DungeonBossPokemon('Emolga', 21000000, 100),
    ],
    176500, 16, 100);

dungeonList['Chargestone Cave'] = new Dungeon('Chargestone Cave',
    [
        {pokemon: 'Nosepass', options: { weight: 8.8 }},
        {pokemon: 'Boldore', options: { weight: 8.8 }},
        {pokemon: 'Joltik', options: { weight: 8.8 }},
        {pokemon: 'Ferroseed', options: { weight: 8.8 }},
        {pokemon: 'Klink', options: { weight: 8.8 }},
        new DungeonTrainer('Guitarist',
            [new GymPokemon('Emolga', 186500, 30)],
            1, { weight: 1 }, 'Anna'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Magneton', 186500, 30)],
            1, { weight: 1 }, 'Ronald', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Klink', 186500, 33),
                new GymPokemon('Unfezant', 186500, 33),
                new GymPokemon('Sandslash', 186500, 33),
            ], 1, { weight: 1 }, 'Corky', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Ampharos', 186500, 34)],
            1, { weight: 1 }, 'Louis', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Aron', 186500, 32),
                new GymPokemon('Nosepass', 186500, 32),
            ], 1, { weight: 1 }, 'Otto'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Minccino', 186500, 33),
                new GymPokemon('Excadrill', 186500, 33),
            ], 1, { weight: 1 }, 'Briana', '(female)'),
        new DungeonTrainer('Doctor',
            [
                new GymPokemon('Solosis', 186500, 32),
                new GymPokemon('Gothita', 186500, 32),
            ], 1, { weight: 1 }, 'Kit'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Joltik', 186500, 32),
                new GymPokemon('Golbat', 186500, 32),
            ], 1, { weight: 1 }, 'Lumi', '(female)'),
        new DungeonTrainer('Guitarist',
            [new GymPokemon('Zebstrika', 186500, 33)],
            1, { weight: 1 }, 'Beverly'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Onix', 186500, 32),
                new GymPokemon('Boldore', 186500, 32),
            ], 1, { weight: 1 }, 'Jeremy'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Stoutland', 186500, 33),
                new GymPokemon('Krokorok', 186500, 33),
                new GymPokemon('Ferroseed', 186500, 33),
            ], 1, { weight: 1 }, 'Vicki', '(female)'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    3403000,
    [
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Tirtouga', 22000000, 34),
                new GymPokemon('Magmar', 22000000, 34),
            ], 1, { weight: 1 }, 'Mary', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Archen', 22000000, 34),
                new GymPokemon('Electabuzz', 22000000, 34),
            ], 1, { weight: 1 }, 'Shaye', '(male)'),
        new DungeonBossPokemon('Drilbur', 22000000, 100),
        new DungeonBossPokemon('Tynamo', 22000000, 100),
    ],
    186500, 6, 100);

dungeonList['Mistralton Cave'] = new Dungeon('Mistralton Cave',
    [
        {pokemon: 'Boldore', options: { weight: 4 }},
        {pokemon: 'Woobat', options: { weight: 4 }},
        {pokemon: 'Aron', options: { weight: 4 }},
        {pokemon: 'Lairon', options: { weight: 4 }},
        new DungeonTrainer('Hiker',
            [new GymPokemon('Boldore', 196500, 32)],
            1, { weight: 1 }, 'Shelby'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Onix', 196500, 32)],
            1, { weight: 1 }, 'Jebediah'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Tirtouga', 196500, 33),
                new GymPokemon('Axew', 196500, 33),
            ], 1, { weight: 1 }, 'Geoff', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Archen', 196500, 33),
                new GymPokemon('Axew', 196500, 33),
            ], 1, { weight: 1 }, 'Belle', '(female)'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    3603000,
    [
        new DungeonBossPokemon('Drilbur', 23000000, 100),
        new DungeonBossPokemon('Axew', 24000000, 100),
        new DungeonBossPokemon('Cobalion', 25000000, 100),
    ],
    196500, 6, 100);

dungeonList['Celestial Tower'] = new Dungeon('Celestial Tower',
    [
        {pokemon: 'Golbat', options: { weight: 8 }},
        {pokemon: 'Haunter', options: { weight: 8 }},
        {pokemon: 'Elgyem', options: { weight: 8 }},
        {pokemon: 'Misdreavus', options: { weight: 8 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Musharna', 206500, 36)],
            1, { weight: 1 }, 'Joyce', '(female)'),
        new DungeonTrainer('School Kid',
            [new GymPokemon('Litwick', 206500, 35)],
            1, { weight: 1 }, 'Alberta', '(female)'),
        new DungeonTrainer('Pokéfan',
            [new GymPokemon('Clefairy', 206500, 35)],
            1, { weight: 1 }, 'Jude', '(male)'),
        new DungeonTrainer('Pokéfan',
            [new GymPokemon('Cubchoo', 206500, 35)],
            1, { weight: 1 }, 'Georgia', '(female)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Espeon', 206500, 36)],
            1, { weight: 1 }, 'Micki', '(male)'),
        new DungeonTrainer('Nurse',
            [new GymPokemon('Leavanny', 206500, 35)],
            1, { weight: 1 }, 'Dixie'),
        new DungeonTrainer('Socialite',
            [new GymPokemon('Roselia', 206500, 35)],
            1, { weight: 1 }, 'Grace'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Umbreon', 206500, 35)],
            1, { weight: 1 }, 'Daniel'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    3803000,
    [
        new DungeonBossPokemon('Litwick', 25000000, 100),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Elgyem', 25000000, 35),
                new GymPokemon('Duosion', 25000000, 35),
            ], 1, { weight: 1 }, 'Bryce', '(male)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Yamask', 25000000, 35),
                new GymPokemon('Gothorita', 25000000, 35),
            ], 1, { weight: 1 }, 'Sarah', '(female)'),
    ],
    206500, 7, 100);

dungeonList['Reversal Mountain'] = new Dungeon('Reversal Mountain',
    [
        {pokemon: 'Skarmory', options: { weight: 5.2 }},
        {pokemon: 'Numel', options: { weight: 5.2 }},
        {pokemon: 'Camerupt', options: { weight: 5.2 }},
        {pokemon: 'Spoink', options: { weight: 5.2 }},
        {pokemon: 'Grumpig', options: { weight: 5.2 }},
        {pokemon: 'Trapinch', options: { weight: 5.2 }},
        {pokemon: 'Drifblim', options: { weight: 5.2 }},
        {pokemon: 'Skorupi', options: { weight: 5.2 }},
        {pokemon: 'Boldore', options: { weight: 5.2 }},
        {pokemon: 'Woobat', options: { weight: 5.2 }},
        new DungeonTrainer('Cyclist',
            [new GymPokemon('Zebstrika', 226500, 37)],
            1, { weight: 1 }, 'Jeremiah', '(male)'),
        new DungeonTrainer('Cyclist',
            [new GymPokemon('Unfezant', 226500, 37)],
            1, { weight: 1 }, 'Adalaide', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Gurdurr', 226500, 37),
                new GymPokemon('Crustle', 226500, 37),
            ], 1, { weight: 1 }, 'Markus'),
        new DungeonTrainer('Backpacker',
            [
                new GymPokemon('Golbat', 226500, 37),
                new GymPokemon('Swanna', 226500, 37),
            ], 1, { weight: 1 }, 'Kiyo', '(male)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Swoobat', 226500, 38)],
            1, { weight: 1 }, 'Derek'),
        new DungeonTrainer('Backpacker',
            [
                new GymPokemon('Golbat', 226500, 37),
                new GymPokemon('Darmanitan', 226500, 37),
            ], 1, { weight: 1 }, 'Kumiko', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Boldore', 226500, 37),
                new GymPokemon('Excadrill', 226500, 37),
            ], 1, { weight: 1 }, 'Jared'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Vibrava', 226500, 37),
                new GymPokemon('Camerupt', 226500, 37),
            ], 1, { weight: 1 }, 'Ray', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Grumpig', 226500, 37),
                new GymPokemon('Drifblim', 226500, 37),
            ], 1, { weight: 1 }, 'Cora', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Gurdurr', 226500, 37),
                new GymPokemon('Scraggy', 226500, 37),
                new GymPokemon('Scraggy', 226500, 37),
            ], 1, { weight: 1 }, 'Corey'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Riolu', 226500, 37),
                new GymPokemon('Gurdurr', 226500, 37),
                new GymPokemon('Riolu', 226500, 37),
            ], 1, { weight: 1 }, 'Chan'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Banette', 226500, 38),
                new GymPokemon('Golduck', 226500, 38),
            ], 1, { weight: 1 }, 'Eliza', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Watchog', 226500, 38),
                new GymPokemon('Camerupt', 226500, 38),
            ], 1, { weight: 1 }, 'Lewis', '(male)'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    4003000,
    [
        new DungeonBossPokemon('Cacturne', 24000000, 100),
        new DungeonBossPokemon('Excadrill', 26000000, 100),
        new DungeonBossPokemon('Heatran', 30000000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)}),
    ],
    226500, 14, 100);

dungeonList['Seaside Cave'] = new Dungeon('Seaside Cave',
    [
        {pokemon: 'Golduck', options: { weight: 3.5 }},
        {pokemon: 'Seel', options: { weight: 3.5 }},
        {pokemon: 'Shellder', options: { weight: 3.5 }},
        {pokemon: 'Luvdisc', options: { weight: 3.5 }},
        {pokemon: 'Boldore', options: { weight: 3.5 }},
        {pokemon: 'Woobat', options: { weight: 3.5 }},
        {pokemon: 'Tynamo', options: { weight: 3.5 }},
        {pokemon: 'Frillish', options: { weight: 3.5 }},
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Heracross', 246500, 47)],
            1, { weight: 1 }, 'Tia'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Vibrava', 246500, 46),
                new GymPokemon('Lairon', 246500, 46),
            ], 1, { weight: 1 }, 'Johan', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Onix', 246500, 46),
                new GymPokemon('Gligar', 246500, 46),
            ], 1, { weight: 1 }, 'Mikiko', '(female)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Scrafty', 246500, 47)],
            1, { weight: 1 }, 'Drago'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Roggenrola', 246500, 44),
                new GymPokemon('Roggenrola', 246500, 44),
                new GymPokemon('Roggenrola', 246500, 44),
                new GymPokemon('Roggenrola', 246500, 44),
            ], 1, { weight: 1 }, 'Rocky'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Mienfoo', 246500, 47)],
            1, { weight: 1 }, 'Maki'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Gurdurr', 246500, 47)],
            1, { weight: 1 }, 'Rich'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    4203000,
    [
        new DungeonBossPokemon('Eelektrik', 28000000, 100),
        new DungeonBossPokemon('Crustle', 28000000, 100),
    ],
    246500, 21, 100);

dungeonList['Giant Chasm'] = new Dungeon('Giant Chasm',
    [
        {pokemon: 'Clefairy', options: { weight: 5.33 }},
        {pokemon: 'Poliwag', options: { weight: 5.33 }},
        {pokemon: 'Seel', options: { weight: 5.33 }},
        {pokemon: 'Tangela', options: { weight: 5.33 }},
        {pokemon: 'Delibird', options: { weight: 5.33 }},
        {pokemon: 'Sneasel', options: { weight: 5.33 }},
        {pokemon: 'Piloswine', options: { weight: 5.33 }},
        {pokemon: 'Pelipper', options: { weight: 5.33 }},
        {pokemon: 'Lunatone', options: { weight: 5.33 }},
        {pokemon: 'Solrock', options: { weight: 5.33 }},
        {pokemon: 'Vanillish', options: { weight: 5.33 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 5.33 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 5.33 }},
        {pokemon: 'Ditto', options: { weight: 5.33 }},
        {pokemon: 'Metang', options: { weight: 5.33 }},
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Weezing', 266500, 46),
                new GymPokemon('Muk', 266500, 46),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Scraggy', 266500, 46),
                new GymPokemon('Scrafty', 266500, 46),
                new GymPokemon('Whirlipede', 266500, 46),
            ], 1, { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Trubbish', 266500, 46),
                new GymPokemon('Golbat', 266500, 46),
                new GymPokemon('Garbodor', 266500, 46),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Skorupi', 266500, 46),
                new GymPokemon('Foongus', 266500, 46),
                new GymPokemon('Golbat', 266500, 46),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Krookodile', 266500, 47)],
            1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Leavanny', 266500, 49)],
            1, { weight: 1 }, 'Julius'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scrafty', 266500, 47)],
            1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scolipede', 266500, 47)],
            1, { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Trubbish', 266500, 46),
                new GymPokemon('Zangoose', 266500, 46),
            ], 1, { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Grimer', 266500, 46),
                new GymPokemon('Seviper', 266500, 46),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Raticate', 266500, 47),
                new GymPokemon('Watchog', 266500, 47),
            ], 1, { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Krokorok', 266500, 47),
                new GymPokemon('Krookodile', 266500, 47),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Drapion', 266500, 47)],
            1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Deino', 266500, 45),
                new GymPokemon('Deino', 266500, 45),
                new GymPokemon('Sneasel', 266500, 45),
            ], 1, { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Koffing', 266500, 46),
                new GymPokemon('Amoonguss', 266500, 46),
            ], 1, { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Cryogonal', 266500, 49),
                new GymPokemon('Cryogonal', 266500, 49),
                new GymPokemon('Weavile', 266500, 51),
            ], 1, { weight: 1 }, 'Zinzolin', '(zinzolin)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Magneton', 266500, 50),
                new GymPokemon('Beheeyem', 266500, 50),
                new GymPokemon('Metang', 266500, 50),
                new GymPokemon('Magnezone', 266500, 50),
                new GymPokemon('Klinklang', 266500, 52),
            ], 1, { weight: 1 }, 'Colress', '(colress)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Pawniard', 266500, 49),
                new GymPokemon('Pawniard', 266500, 49),
                new GymPokemon('Absol', 266500, 51),
            ], 1, { weight: 1 }, 'Shadow', '(shadow)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Pawniard', 266500, 49),
                new GymPokemon('Pawniard', 266500, 49),
                new GymPokemon('Banette', 266500, 51),
            ], 1, { weight: 1 }, 'Shadow', '(shadow)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Pawniard', 266500, 49),
                new GymPokemon('Pawniard', 266500, 49),
                new GymPokemon('Accelgor', 266500, 51),
            ], 1, { weight: 1 }, 'Shadow', '(shadow)'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    4403000,
    [
        new DungeonBossPokemon('Tangrowth', 30000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Audino', 32000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Mamoswine', 32000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Kyurem', 35000000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)}),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Cofagrigus', 30000000, 50),
                new GymPokemon('Seismitoad', 30000000, 50),
                new GymPokemon('Eelektross', 30000000, 50),
                new GymPokemon('Drapion', 30000000, 50),
                new GymPokemon('Toxicroak', 30000000, 50),
                new GymPokemon('Hydreigon', 30000000, 52),
            ], 1, { weight: 1 }, 'Ghetsis', '(ghetsis)'),
    ],
    266500, 22, 100);

dungeonList['Cave of Being'] = new Dungeon('Cave of Being',
    ['Kadabra', 'Golbat', 'Woobat', 'Gurdurr', 'Graveler', 'Onix'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    4603000,
    [
        new DungeonBossPokemon('Uxie', 35000000, 100),
        new DungeonBossPokemon('Mesprit', 35000000, 100),
        new DungeonBossPokemon('Azelf', 35000000, 100),
    ],
    286500, 20, 100);

dungeonList['Abundant Shrine'] = new Dungeon('Abundant Shrine',
    [
        {pokemon: 'Vulpix', options: { weight: 1.45 }},
        {pokemon: 'Golduck', options: { weight: 1.45 }},
        {pokemon: 'Marill', options: { weight: 1.45 }},
        {pokemon: 'Azumarill', options: { weight: 1.45 }},
        {pokemon: 'Swablu', options: { weight: 1.45 }},
        {pokemon: 'Bronzor', options: { weight: 1.45 }},
        {pokemon: 'Cottonee', options: { weight: 1.45 }},
        {pokemon: 'Petilil', options: { weight: 1.45 }},
        {pokemon: 'Goldeen', options: { weight: 1.45 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 1.45 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 1.45 }},
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Skorupi', 306500, 39),
                new GymPokemon('Seviper', 306500, 39),
            ], 1, { weight: 1 }, 'Wes'),
        new DungeonTrainer('Twins',
            [
                new GymPokemon('Swablu', 306500, 38),
                new GymPokemon('Swablu', 306500, 38),
            ], 1, { weight: 1 }, 'Rae & Ula'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Deerling (Spring)', 306500, 39),
                new GymPokemon('Zangoose', 306500, 39),
            ], 1, { weight: 1 }, 'Lureen'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Karrablast', 306500, 37),
                new GymPokemon('Shelmet', 306500, 37),
                new GymPokemon('Joltik', 306500, 37),
                new GymPokemon('Scolipede', 306500, 37),
            ], 1, { weight: 1 }, 'Jaye'),
    ],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    4803000,
    [
        new DungeonBossPokemon('Bronzong', 38000000, 100),
        new DungeonBossPokemon('Altaria', 38000000, 100),
        new DungeonBossPokemon('Landorus', 42000000, 100),
    ],
    306500, 14, 100);

dungeonList['Victory Road Unova'] = new Dungeon('Victory Road Unova',
    ['Poliwag', 'Onix', 'Marill', 'Roselia', 'Altaria', 'Banette', 'Buizel', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Boldore', 'Cottonee', 'Petilil', 'Tranquill', 'Unfezant', 'Gurdurr'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    5003000,
    [
        new DungeonBossPokemon('Golurk', 44000000, 100),
        new DungeonBossPokemon('Terrakion', 45000000, 100),
        new DungeonBossPokemon('Audino', 45000000, 100),
        new DungeonBossPokemon('Druddigon', 44000000, 100),
    ],
    326500, 23, 100);

dungeonList['Twist Mountain'] = new Dungeon('Twist Mountain',
    ['Onix', 'Boldore', 'Woobat', 'Gurdurr', 'Beartic'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    5203000,
    [
        new DungeonBossPokemon('Durant', 48000000, 100),
        new DungeonBossPokemon('Cryogonal', 48000000, 100),
        new DungeonBossPokemon('Heatmor', 48000000, 100),
        new DungeonBossPokemon('Regigigas', 50000000, 100),
    ],
    356500, 7, 100);

dungeonList['Dragonspiral Tower'] = new Dungeon('Dragonspiral Tower',
    ['Dratini', 'Tranquill', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Vanillish', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)', 'Beartic', 'Mienfoo', 'Mienshao', 'Golett', 'Golurk'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    5203000,
    [
        new DungeonBossPokemon('Dragonite', 48000000, 100),
        new DungeonBossPokemon('Reshiram', 48000000, 100),
        new DungeonBossPokemon('Druddigon', 48000000, 100),
        new DungeonBossPokemon('Zekrom', 50000000, 100),
    ],
    356500, 7, 100);

dungeonList['Moor of Icirrus'] = new Dungeon('Moor of Icirrus',
    ['Croagunk', 'Palpitoad', 'Karrablast', 'Shelmet', 'Stunfisk', 'Barboach'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    5203000,
    [
        new DungeonBossPokemon('Keldeo', 50000000, 100),
        new DungeonBossPokemon('Seismitoad', 48000000, 100),
        new DungeonBossPokemon('Whiscash', 48000000, 100),
    ],
    356500, 8, 100);

dungeonList['Pinwheel Forest'] = new Dungeon('Pinwheel Forest',
    ['Goldeen', 'Marill', 'Yanma', 'Vigoroth', 'Toxicroak', 'Gurdurr', 'Tympole', 'Palpitoad', 'Swadloon', 'Whirlipede', 'Cottonee', 'Petilil', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    5203000,
    [
        new DungeonBossPokemon('Scolipede', 48000000, 100),
        new DungeonBossPokemon('Seismitoad', 48000000, 100),
        new DungeonBossPokemon('Virizion', 48000000, 100),
    ],
    356500, 3, 100);
dungeonList['Dreamyard'] = new Dungeon('Dreamyard',
    ['Raticate', 'Jigglypuff', 'Golbat', 'Watchog', 'Liepard', 'Munna'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    5203000,
    [
        new DungeonBossPokemon('Audino', 48000000, 100),
        new DungeonBossPokemon('Dunsparce', 48000000, 100),
        new DungeonBossPokemon('Latias', 48000000, 100),
        new DungeonBossPokemon('Latios', 48000000, 100),
    ],
    356500, 3, 100);

dungeonList['P2 Laboratory'] = new Dungeon('P2 Laboratory',
    ['Magneton', 'Rotom', 'Beheeyem', 'Klinklang', 'Porygon2', 'Electrode', 'Metang'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    5403000,
    [
        new DungeonBossPokemon('Magnezone', 48000000, 100),
        new DungeonBossPokemon('Porygon-Z', 48000000, 100),
        new DungeonBossPokemon('Metagross', 48000000, 100),
        new DungeonBossPokemon('Genesect', 62000000, 100),
        new DungeonBossPokemon('Porygon', 62000000, 100),
        new DungeonBossPokemon('Audino', 62000000, 100),
        new DungeonBossPokemon('Mawile', 62000000, 100),
        new DungeonBossPokemon('Sableye', 62000000, 100),
    ],
    396500, 18, 100);

// Kalos
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Santalune Forest'] = new Dungeon('Santalune Forest',
    ['Caterpie', 'Metapod', 'Weedle', 'Kakuna', 'Fletchling'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Pikachu', 8000000, 100),
        new DungeonBossPokemon('Scatterbug', 8000000, 100),
    ],
    96500, 230, 100);

dungeonList['Parfum Palace'] = new Dungeon('Parfum Palace',
    ['Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Corphish', 'Crawdaunt'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Furfrou', 8000000, 100)],
    96500, 230, 100);

dungeonList['Connecting Cave'] = new Dungeon('Connecting Cave',
    ['Zubat', 'Whismur', 'Meditite'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Axew', 8000000, 100)],
    96500, 230, 100);

dungeonList['Glittering Cave'] = new Dungeon('Glittering Cave',
    ['Machop', 'Onix', 'Cubone', 'Rhyhorn', 'Lunatone', 'Solrock'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Kangaskhan', 8000000, 100),
        new DungeonBossPokemon('Mawile', 8000000, 100),
    ],
    96500, 230, 100);

dungeonList['Reflection Cave'] = new Dungeon('Reflection Cave',
    ['Mr. Mime', 'Sableye', 'Chingling', 'Roggenrola', 'Solosis'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Wobbuffet', 8000000, 100),
        new DungeonBossPokemon('Carbink', 8000000, 100),
    ],
    96500, 230, 100);

//Tower of Mastery?

//Sea Spirit's Den? Releases Articuno, Zapdos, Moltres roamers.

//Kalos Power Plant?

//Pokéball Factory?

dungeonList['Lost Hotel'] = new Dungeon('Lost Hotel',
    ['Magneton', 'Electrode', 'Litwick', 'Pawniard'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Trubbish', 8000000, 100),
        new DungeonBossPokemon('Rotom', 8000000, 100),
        new DungeonBossPokemon('Klefki', 8000000, 100),
    ],
    96500, 230, 100);

dungeonList['Frost Cavern'] = new Dungeon('Frost Cavern',
    ['Poliwhirl', 'Haunter', 'Piloswine', 'Floatzel', 'Bergmite'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Jynx', 8000000, 100),
        new DungeonBossPokemon('Beartic', 8000000, 100),
        new DungeonBossPokemon('Cryogonal', 8000000, 100),
    ],
    96500, 230, 100);

dungeonList['Team Flare Secret HQ'] = new Dungeon('Team Flare Secret HQ',
    ['Golbat', 'Gyarados', 'Houndoom', 'Mightyena', 'Manectric', 'Swalot', 'Toxicroak', 'Honchkrow', 'Liepard', 'Scrafty', 'Mienshao', 'Pyroar'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Xerneas', 8000000, 100),
        new DungeonBossPokemon('Yveltal', 8000000, 100),
    ],
    96500, 230, 100);

dungeonList['Terminus Cave'] = new Dungeon('Terminus Cave',
    ['Sandslash', 'Graveler', 'Lairon', 'Shuckle', 'Ariados'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Durant', 8000000, 100),
        new DungeonBossPokemon('Pupitar', 8000000, 100),
        new DungeonBossPokemon('Noibat', 8000000, 100),
        new DungeonBossPokemon('Zygarde', 8000000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)}),
    ],
    96500, 230, 100);

dungeonList['Pokémon Village'] = new Dungeon('Pokémon Village',
    ['Jigglypuff', 'Poliwhirl', 'Noctowl', 'Lombre', 'Gothorita', 'Amoonguss'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Ditto', 8000000, 100),
        new DungeonBossPokemon('Zoroark', 8000000, 100),
    ],
    96500, 230, 100);

dungeonList['Victory Road Kalos'] = new Dungeon('Victory Road Kalos',
    ['Graveler', 'Haunter', 'Gurdurr', 'Druddigon', 'Ariados'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Lickitung', 8000000, 100),
        new DungeonBossPokemon('Skarmory', 8000000, 100),
        new DungeonBossPokemon('Zweilous', 8000000, 100),
        new DungeonBossPokemon('Noibat', 8000000, 100),
    ],
    96500, 230, 100);

//Unknown Dungeon? Contains Mewtwo.



// Alola
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Trainers\' School'] = new Dungeon('Trainers\' School',
    ['Alolan Meowth', 'Abra', 'Magnemite', 'Wingull', 'Mime Jr.', 'Zorua'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Alolan Grimer', 8000000, 70),
        new DungeonBossPokemon('Furfrou', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Hau\'oli Cemetery'] = new Dungeon('Hau\'oli Cemetery',
    ['Zubat', 'Gastly', 'Misdreavus'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Drifloon', 8000000, 70),
        new DungeonBossPokemon('Litwick', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Verdant Cavern'] = new Dungeon('Verdant Cavern',
    ['Zubat', 'Alolan Diglett', 'Noibat', 'Alolan Rattata', 'Yungoos'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Alolan Raticate', 8000000, 70),
        new DungeonBossPokemon('Gumshoos', 8000000, 70),
        new DungeonBossPokemon('Totem Alolan Raticate', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Gumshoos', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    96500, 201, 35);

dungeonList['Melemele Meadow'] = new Dungeon('Melemele Meadow',
    ['Caterpie', 'Metapod', 'Butterfree', 'Cottonee', 'Petilil', 'Cutiefly'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Flabébé (Red)', 8000000, 70),
        new DungeonBossPokemon('Oricorio (Pom-pom)', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Seaward Cave'] = new Dungeon('Seaward Cave',
    ['Zubat', 'Psyduck', 'Seel', 'Magikarp', 'Smoochum'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Delibird', 8000000, 70),
        new DungeonBossPokemon('Barboach', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Ten Carat Hill'] = new Dungeon('Ten Carat Hill',
    ['Zubat', 'Machop', 'Psyduck', 'Mawile', 'Roggenrola'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Spinda', 8000000, 70),
        new DungeonBossPokemon('Carbink', 8000000, 70),
        new DungeonBossPokemon('Rockruff', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Ruins of Conflict'] = new Dungeon('Ruins of Conflict',
    ['Florges (Red)', 'Comfey', 'Dedenne', 'Ampharos', 'Electivire'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Jolteon', 8000000, 70),
        new DungeonBossPokemon('Sylveon', 8000000, 70),
        new DungeonBossPokemon('Tapu Koko', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Pikachu Valley'] = new Dungeon('Pikachu Valley',
    ['Pikachu', 'Pichu'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Pikachu (Original cap)', 8000000, 70),
        new DungeonBossPokemon('Pikachu (Hoenn cap)', 8000000, 70),
        new DungeonBossPokemon('Pikachu (Sinnoh cap)', 8000000, 70),
        new DungeonBossPokemon('Pikachu (Unova cap)', 8000000, 70),
        new DungeonBossPokemon('Pikachu (Kalos cap)', 8000000, 70),
        new DungeonBossPokemon('Pikachu (Alola cap)', 8000000, 70),
        new DungeonBossPokemon('Pikachu (Partner cap)', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Paniola Ranch'] = new Dungeon('Paniola Ranch',
    ['Mareep', 'Lillipup', 'Mudbray'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Tauros', 8000000, 70),
        new DungeonBossPokemon('Miltank', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Brooklet Hill'] = new Dungeon('Brooklet Hill',
    ['Paras', 'Psyduck', 'Poliwag', 'Tentacool', 'Goldeen', 'Magikarp', 'Wingull', 'Surskit', 'Feebas', 'Finneon', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Alomomola', 'Dewpider'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Wishiwashi (School)', 8000000, 70),
        new DungeonBossPokemon('Araquanid', 8000000, 70),
        new DungeonBossPokemon('Totem Wishiwashi (School)', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Araquanid', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    96500, 201, 35);

dungeonList['Wela Volcano Park'] = new Dungeon('Wela Volcano Park',
    ['Cubone', 'Kangaskhan', 'Magby', 'Magmar', 'Fletchling', 'Salandit'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Alolan Marowak', 8000000, 70),
        new DungeonBossPokemon('Salazzle', 8000000, 70),
        new DungeonBossPokemon('Totem Alolan Marowak', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Salazzle', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    96500, 201, 35);

dungeonList['Lush Jungle'] = new Dungeon('Lush Jungle',
    ['Metapod', 'Paras', 'Pinsir', 'Hoothoot', 'Bonsly', 'Trumbeak', 'Fomantis', 'Steenee', 'Comfey', 'Oranguru', 'Passimian'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Lurantis', 8000000, 70),
        new DungeonBossPokemon('Totem Lurantis', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    96500, 201, 35);

dungeonList['Diglett\'s Tunnel'] = new Dungeon('Diglett\'s Tunnel',
    ['Zubat', 'Alolan Diglett'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Larvitar', 8000000, 70)],
    96500, 201, 35);

dungeonList['Memorial Hill'] = new Dungeon('Memorial Hill',
    ['Zubat', 'Gastly'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Phantump', 8000000, 70)],
    96500, 201, 35);

dungeonList['Ruins of Life'] = new Dungeon('Ruins of Life',
    ['Florges (Red)', 'Comfey', 'Gardevoir', 'Chimecho', 'Musharna'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Espeon', 8000000, 70),
        new DungeonBossPokemon('Sylveon', 8000000, 70),
        new DungeonBossPokemon('Tapu Lele', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Malie Garden'] = new Dungeon('Malie Garden',
    ['Alolan Meowth', 'Psyduck', 'Poliwhirl', 'Goldeen', 'Magikarp', 'Gyarados', 'Ledian', 'Ariados', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Cottonee', 'Petilil'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Masquerain', 8000000, 70),
        new DungeonBossPokemon('Araquanid', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Hokulani Observatory'] = new Dungeon('Hokulani Observatory',
    ['Grubbin', 'Charjabug', 'Elekid', 'Electabuzz', 'Skarmory', 'Dedenne'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Vikavolt', 8000000, 70),
        new DungeonBossPokemon('Togedemaru', 8000000, 70),
        new DungeonBossPokemon('Totem Vikavolt', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Togedemaru', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    96500, 201, 35);

dungeonList['Thrifty Megamart'] = new Dungeon('Thrifty Megamart',
    ['Golbat', 'Gastly', 'Haunter', 'Gengar', 'Shuppet', 'Banette', 'Jellicent', 'Klefki'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Mimikyu', 8000000, 70),
        new DungeonBossPokemon('Totem Mimikyu', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    96500, 201, 35);

dungeonList['Ula\'ula Meadow'] = new Dungeon('Ula\'ula Meadow',
    ['Ledian', 'Ariados', 'Cottonee', 'Petilil', 'Ribombee'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Floette (Red)', 8000000, 70),
        new DungeonBossPokemon('Oricorio (Baile)', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Po Town'] = new Dungeon('Po Town',
    ['Alolan Rattata', 'Alolan Raticate', 'Ekans', 'Drowzee', 'Golbat', 'Alolan Grimer', 'Spinarak', 'Houndour', 'Trubbish', 'Scraggy', 'Fomantis', 'Mareanie'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Pawniard', 8000000, 70),
        new DungeonBossPokemon('Masquerain', 8000000, 70),
        new DungeonBossPokemon('Pinsir', 8000000, 70),
        new DungeonBossPokemon('Haunter', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Mount Lanikala'] = new Dungeon('Mount Lanikala',
    ['Alolan Raticate', 'Alolan Sandshrew', 'Alolan Vulpix', 'Sneasel', 'Snorunt', 'Gumshoos'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Absol', 8000000, 70),
        new DungeonBossPokemon('Glalie', 8000000, 70),
        new DungeonBossPokemon('Vanilluxe', 8000000, 70),
        new DungeonBossPokemon('Necrozma', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Ruins of Abundance'] = new Dungeon('Ruins of Abundance',
    ['Florges (Red)', 'Comfey', 'Whimsicott', 'Bellossom', 'Lilligant'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Leafeon', 8000000, 70),
        new DungeonBossPokemon('Sylveon', 8000000, 70),
        new DungeonBossPokemon('Tapu Bulu', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Exeggutor Island Hill'] = new Dungeon('Exeggutor Island Hill',
    ['Exeggcute', 'Pelipper', 'Gastrodon (east)'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Pinsir', 8000000, 70),
        new DungeonBossPokemon('Tropius', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Vast Poni Canyon'] = new Dungeon('Vast Poni Canyon',
    [{pokemon: 'Golbat', options: { weight: 2 }}, 'Alolan Dugtrio', 'Machoke', 'Magikarp', 'Skarmory', 'Barboach', 'Corphish', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Boldore', 'Mienfoo', 'Carbink', 'Lycanroc (Midday)', 'Lycanroc (Midnight)', 'Jangmo-o', 'Hakamo-o'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Kommo-o', 8000000, 70),
        new DungeonBossPokemon('Totem Kommo-o', 8000000, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    96500, 201, 35);

dungeonList['Nebby'] = new Dungeon('Nebby',
    ['Clefable', 'Delcatty', 'Sunflora', 'Heliolisk', 'Lunatone', 'Solrock'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Lunala', 8000000, 70),
        new DungeonBossPokemon('Solgaleo', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Ruins of Hope'] = new Dungeon('Ruins of Hope',
    ['Florges (Red)', 'Comfey', 'Azumarill', 'Politoed', 'Gorebyss'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Vaporeon', 8000000, 70),
        new DungeonBossPokemon('Sylveon', 8000000, 70),
        new DungeonBossPokemon('Tapu Fini', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Poni Meadow'] = new Dungeon('Poni Meadow',
    ['Magikarp', 'Dratini', 'Cottonee', 'Petilil', 'Ribombee', 'Misdreavus', 'Barboach'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Oricorio (Sensu)', 8000000, 70),
        new DungeonBossPokemon('Floette (Red)', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Resolution Cave'] = new Dungeon('Resolution Cave',
    ['Golbat', 'Alolan Dugtrio', 'Druddigon'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Crobat', 8000000, 70),
        new DungeonBossPokemon('Noivern', 8000000, 70),
        new DungeonBossPokemon('Guzzlord', 8000000, 70),
    ],
    96500, 201, 35);




//Galar Dungeons

dungeonList['Slumbering Weald'] = new Dungeon('Slumbering Weald',
    ['Hoothoot', 'Grubbin', 'Skwovet', 'Rookidee'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [new DungeonBossPokemon('Blipbug', 8000000, 70)],
    96500, 201, 35);

dungeonList['Inner Slumbering Weald'] = new Dungeon('Inner Slumbering Weald',
    ['Galarian Weezing', 'Corviknight', 'Galarian Stunfisk', 'Munna', 'Butterfree', 'Orbeetle'],
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
        new DungeonBossPokemon('Galarian Stunfisk', 8000000, 70),
        new DungeonBossPokemon('Gastrodon (east)', 8000000, 70),
        new DungeonBossPokemon('Drednaw', 8000000, 70),
    ],
    96500, 201, 35);

dungeonList['Rose Tower'] = new Dungeon('Rose Tower',
    ['Cufant', 'Bronzong', 'Klang', 'Mawile', 'Steelix', 'Galarian Stunfisk'],
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
    ['Galarian Ponyta', 'Spritzee', 'Swirlix', 'Phantump', 'Oranguru', 'Passimian', 'Sinistea'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Hattrem', 8000000, 70),
        new DungeonBossPokemon('Morgrem', 8000000, 70),
        new DungeonBossPokemon('Indeedee', 8000000, 70),
    ],
    96500, 201, 35);

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

dungeonList['Lake of Outrage'] = new Dungeon('Lake of Outrage',
    ['Stonjourner', 'Cramorant', 'Galarian Mr. Mime', 'Morpeko', 'Coalossal', 'Sandaconda', 'Galarian Stunfisk', 'Copperajah', 'Indeedee', 'Obstagoon', 'Grimmsnarl'],
    [GameConstants.BattleItemType.xClick, GameConstants.BattleItemType.Item_magnet],
    2203000,
    [
        new DungeonBossPokemon('Hatterene', 8000000, 70),
        new DungeonBossPokemon('Perrserker', 8000000, 70),
        new DungeonBossPokemon('Barraskewda', 8000000, 70),
        new DungeonBossPokemon('Drakloak', 8000000, 70),
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



//Isle of Armor
dungeonList['Master Dojo Trial'] = new Dungeon('Master Dojo Trial',
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
        new DungeonBossPokemon('Calyrex', 8000000, 70, {
            requirement: new MultiRequirement([
                new ObtainedPokemonRequirement(pokemonMap.Spectrier),
                new ObtainedPokemonRequirement(pokemonMap.Glastrier),
            ])}),
    ],
    96500, 201, 35);
