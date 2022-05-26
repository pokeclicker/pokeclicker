///<reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="DungeonBossPokemon.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/MultiRequirement.d.ts"/>
///<reference path="../../declarations/requirements/SeededDateRequirement.d.ts"/>
///<reference path="../../declarations/utilities/SeededDateRand.d.ts"/>
///<reference path="../achievements/ObtainedPokemonRequirement.ts"/>
///<reference path="./DungeonTrainer.ts"/>
///<reference path="../gym/GymPokemon.ts"/>

interface EnemyOptions {
    weight?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
    reward?: Amount,
    hide?: boolean,
}

interface DetailedPokemon {
    pokemon: PokemonNameType,
    options: EnemyOptions
}

interface Loot {
    loot: ItemNameType | PokemonNameType | UndergroundItemNameType | BerryNameType,
    weight?: number,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
    amount?: number,
}

type Enemy = PokemonNameType | DetailedPokemon | DungeonTrainer;

type Boss = DungeonBossPokemon | DungeonTrainer;

interface EncounterInfo {
    image: string,
    shiny: boolean,
    hide: boolean,
    hidden: boolean,
    locked: boolean,
    lockMessage: string,
}

// Gain a gym badge after first completion of a dungeon
const DungeonGainGymBadge = (gym: Gym, badge: BadgeEnums) => {
    // Check that the player hasn't already obtained the badge
    if (!App.game.badgeCase.hasBadge(badge)) {
        // Set the set to our expected gym
        // This updates our modal values
        GymRunner.gymObservable(gym);
        GymBattle.gym = gym;
        // Give the player the badge
        App.game.badgeCase.gainBadge(badge);
        // Show the modal
        $('#receiveBadgeModal').modal('show');
    }
};

/**
 * Gym class.
 */
class Dungeon {

    constructor(
        public name: string,
        public enemyList: Enemy[],
        public itemList: Loot[],
        public baseHealth: number,
        public bossList: Boss[],
        public tokenCost: number,
        public difficultyRoute: number, // Closest route in terms of difficulty, used for egg steps, dungeon tokens etc.
        public rewardFunction = () => {}
    ) { }

    public isUnlocked(): boolean {
        // Player requires the Dungeon Ticket to access the dungeons
        if (!App.game.keyItems.hasKeyItem(KeyItemType.Dungeon_ticket)) {
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
     * Gets all available Pokemon in the dungeon
     */
    public allAvailablePokemon(): PokemonNameType[] {
        const encounterInfo = [];

        // Handling minions
        this.enemyList.forEach((enemy) => {
            // Handling Pokemon
            if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {
                let pokemonName: PokemonNameType;
                if (enemy.hasOwnProperty('pokemon')) {
                    // Check if requirements have been met
                    if ((enemy as DetailedPokemon).options?.requirement) {
                        if (!(enemy as DetailedPokemon).options.requirement.isCompleted()) {
                            return;
                        }
                    }
                    pokemonName = (<DetailedPokemon>enemy).pokemon;
                } else {
                    pokemonName = <PokemonNameType>enemy;
                }
                encounterInfo.push(pokemonName);
            // Handling Trainers
            } else { /* We don't include Trainers */ }
        });

        // Handling Bosses
        this.bossList.forEach((boss) => {
            // Handling Pokemon
            if (boss instanceof DungeonBossPokemon) {
                if (boss.options?.requirement) {
                    if (!boss.options.requirement.isCompleted()) {
                        return;
                    }
                }
                const pokemonName = boss.name;
                encounterInfo.push(pokemonName);
            // Handling Trainer
            } else { /* We don't include Trainers */ }
        });

        return encounterInfo;
    }

    /**
     * Retrieves the weights for all the possible enemies
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
     * Retrieves the weights for all the possible Loot, weight values are utilized as 10^Weight. Should use values in Dungeon Initialization from 0 (least likely) to 4 (most likely), anything > 4 is probably too much
     */
    get lootWeightList(): number[] {
        return this.itemList.map((loot) => {
            if (loot.requirement && !loot.requirement.isCompleted()) {
                return 0;
            }
            if (loot.weight < 2 && GameConstants.getDungeonRegion(this.name) < player.highestRegion() - 2) {
                return 0.1 * Math.max(0.5,loot.weight);
            }
            // Minimum of 1 times cleared for division
            const timesCleared = Math.min(500, Math.max(1, App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex(this.name)]()));
            // Calculate total weight based on times cleared, minimum weight being original number specified
            return Math.max(loot.weight, Math.pow(15, loot.weight) / timesCleared) + 1 || 1;
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
     * Gets all non-boss Pokemon encounters in the dungeon
     * Used for generating the dungeon encounter list view
     */
    get normalEncounterList(): EncounterInfo[] {
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

        return encounterInfo;
    }


    /**
     * Gets all boss encounters in the dungeon
     * Used for generating the dungeon encounter list view
     */
    get bossEncounterList(): EncounterInfo[] {
        const encounterInfo = [];

        // Handling Bosses
        this.bossList.forEach((boss) => {
            // Handling Pokemon
            if (boss instanceof DungeonBossPokemon) {
                const pokemonName = boss.name;
                const encounter = {
                    image: `assets/images/${(App.game.party.alreadyCaughtPokemonByName(pokemonName, true) ? 'shiny' : '')}pokemon/${pokemonMap[pokemonName].id}.png`,
                    shiny:  App.game.party.alreadyCaughtPokemonByName(pokemonName, true),
                    hide: boss.options?.hide ? (boss.options?.requirement ? !boss.options?.requirement.isCompleted() : boss.options?.hide) : false,
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
                    hide: boss.options?.hide ? (boss.options?.requirement ? !boss.options?.requirement.isCompleted() : boss.options?.hide) : false,
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
                new GymPokemon('Weedle', 68, 6),
                new GymPokemon('Caterpie', 68, 6),
            ], { weight: 1 }, 'Rick'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Weedle', 46, 7),
                new GymPokemon('Kakuna', 46, 7),
                new GymPokemon('Weedle', 46, 7),
            ], { weight: 1 }, 'Doug'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Caterpie', 68, 7),
                new GymPokemon('Caterpie', 68, 8),
            ], { weight: 1 }, 'Anthony'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Metapod', 46, 7),
                new GymPokemon('Caterpie', 46, 7),
                new GymPokemon('Metapod', 46, 7),
            ], { weight: 1 }, 'Charlie'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Pecha', weight: 3.5},
        {loot: 'Pokeball', weight: 3},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Grass_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Viridian Forest'))},
        {loot: 'Leaf_stone', weight: 0},
    ],
    102,
    [
        new DungeonBossPokemon('Pikachu', 510, 7),
        new DungeonTrainer('Bug Catcher',
            [new GymPokemon('Weedle', 510, 9)],
            { weight: 1 }, 'Sammy'),
    ],
    50, 1);

dungeonList['Digletts Cave'] = new Dungeon('Digletts Cave',
    ['Diglett'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Mystery_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Digletts Cave'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Wiki', weight: 0},
    ],
    1208,
    [new DungeonBossPokemon('Dugtrio', 6040, 31)],
    95, 2);

dungeonList['Mt. Moon'] = new Dungeon('Mt. Moon',
    [
        {pokemon: 'Sandshrew', options: { weight: 8.8 }},
        {pokemon: 'Clefairy', options: { weight: 8.8 }},
        {pokemon: 'Zubat', options: { weight: 8.8 }},
        {pokemon: 'Paras', options: { weight: 8.8 }},
        {pokemon: 'Geodude', options: { weight: 8.8 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Weedle', 556, 11),
                new GymPokemon('Kakuna', 556, 11),
            ], { weight: 1 }, 'Kent'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Clefairy', 1112, 14)],
            { weight: 1 }, 'Iris'),
        new DungeonTrainer('Super Nerd',
            [
                new GymPokemon('Magnemite', 556, 11),
                new GymPokemon('Voltorb', 556, 11),
            ], { weight: 1 }, 'Jovan'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Caterpie', 371, 10),
                new GymPokemon('Metapod', 371, 10),
                new GymPokemon('Caterpie', 371, 10),
            ], { weight: 1 }, 'Robby'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Oddish', 556, 11),
                new GymPokemon('Bellsprout', 556, 11),
            ], { weight: 1 }, 'Miriam'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Rattata', 371, 10),
                new GymPokemon('Rattata', 371, 10),
                new GymPokemon('Zubat', 371, 10),
            ], { weight: 1 }, 'Josh'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 371, 10),
                new GymPokemon('Geodude', 371, 10),
                new GymPokemon('Onix', 371, 10),
            ], { weight: 1 }, 'Marcos'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Sandshrew', 371, 11),
                new GymPokemon('Rattata', 371, 11),
                new GymPokemon('Zubat', 371, 11),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 556, 13),
                new GymPokemon('Ekans', 556, 13),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 556, 13),
                new GymPokemon('Sandshrew', 556, 13),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 556, 13),
                new GymPokemon('Zubat', 556, 13),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Greatball', weight: 1},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Helix Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt. Moon'))},
        {loot: 'Dome Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt. Moon'))},
        {loot: 'Moon_stone', weight: 0},
    ],
    834,
    [
        new DungeonTrainer('Super Nerd',
            [
                new GymPokemon('Grimer', 2780, 12),
                new GymPokemon('Voltorb', 2780, 12),
                new GymPokemon('Koffing', 2780, 12),
            ], { weight: 1 }, 'Miguel'),
    ],
    75, 4,
    () => {
        if (App.game.statistics.dungeonsCleared[GameConstants.getDungeonIndex('Mt. Moon')]() <= 1) {
            const item = Rand.boolean() ? 'Dome Fossil' : 'Helix Fossil';
            Underground.gainMineItem(Underground.getMineItemByName(item).id, 1);
            Notifier.notify({
                message: `You were awarded a ${GameConstants.humanifyString(item)} for defeating the Super Nerd`,
                type: NotificationConstants.NotificationOption.success,
                setting: NotificationConstants.NotificationSetting.Items.dungeon_item_found,
            });
        }
    });

dungeonList['Rock Tunnel'] = new Dungeon('Rock Tunnel',
    [
        {pokemon: 'Zubat', options: { weight: 20 }},
        {pokemon: 'Geodude', options: { weight: 20 }},
        {pokemon: 'Machop', options: { weight: 20 }},
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Cubone', 2745, 23),
                new GymPokemon('Slowpoke', 2745, 23),
            ], { weight: 1 }, 'Ashton'),
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Slowpoke', 5490, 25)],
            { weight: 1 }, 'Winston'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Oddish', 2745, 22),
                new GymPokemon('Bulbasaur', 2745, 22),
            ], { weight: 1 }, 'Martha'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Charmander', 2745, 22),
                new GymPokemon('Cubone', 2745, 22),
            ], { weight: 1 }, 'Steve'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Geodude', 5490, 25)],
            { weight: 1 }, 'Allen'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Machop', 2745, 20),
                new GymPokemon('Onix', 2745, 20),
            ], { weight: 1 }, 'Eric'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 1373, 19),
                new GymPokemon('Onix', 1373, 19),
                new GymPokemon('Geodude', 1373, 19),
                new GymPokemon('Geodude', 1373, 19),
            ], { weight: 1 }, 'Lenny'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Onix', 1830, 20),
                new GymPokemon('Onix', 1830, 20),
                new GymPokemon('Geodude', 1830, 20),
            ], { weight: 1 }, 'Oliver'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 2745, 21),
                new GymPokemon('Graveler', 2745, 21),
            ], { weight: 1 }, 'Lucas'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Jigglypuff', 1830, 21),
                new GymPokemon('Pidgey', 1830, 21),
                new GymPokemon('Meowth', 1830, 21),
            ], { weight: 1 }, 'Sofia'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 1830, 21),
                new GymPokemon('Geodude', 1830, 21),
                new GymPokemon('Graveler', 1830, 21),
            ], { weight: 1 }, 'Dudley'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Slowpoke', 1830, 20),
                new GymPokemon('Slowpoke', 1830, 20),
                new GymPokemon('Slowpoke', 1830, 20),
            ], { weight: 1 }, 'Cooper'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Bellsprout', 2745, 22),
                new GymPokemon('Clefairy', 2745, 22),
            ], { weight: 1 }, 'Leah'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Meowth', 1830, 20),
                new GymPokemon('Oddish', 1830, 20),
                new GymPokemon('Pidgey', 1830, 20),
            ], { weight: 1 }, 'Dana'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Leppa', weight: 3.5},
        {loot: 'Pokeball', weight: 3},
        {loot: 'Greatball', weight: 2},
        {loot: 'Revive', weight: 1.75},
        {loot: 'MediumRestore', weight: 1},
        {loot: 'Oval Stone', weight: 1},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Star Piece', weight: 0},
    ],
    4117,
    [
        new DungeonBossPokemon('Onix', 20585, 17),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Pidgey', 5147, 19),
                new GymPokemon('Rattata', 5147, 19),
                new GymPokemon('Rattata', 5147, 19),
                new GymPokemon('Bellsprout', 5147, 19),
            ], { weight: 1 }, 'Ariana'),
    ],
    500, 5);

dungeonList['Power Plant'] = new Dungeon('Power Plant',
    ['Pikachu', 'Raichu', 'Magnemite', 'Magneton', 'Grimer', 'Muk', 'Voltorb', 'Electrode'],
    [
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Cheri', weight: 3.5},
        {loot: 'Electrode', weight: 3.5},
        {loot: 'Electric_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Power Plant'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Thunder_stone', weight: 0},
        {loot: 'Metal_coat', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Power Plant'))},
        {loot: 'Electirizer', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Power Plant'))},
    ],
    13507,
    [
        new DungeonBossPokemon('Electabuzz', 67535, 35),
        new DungeonBossPokemon('Zapdos', 101302, 50),
    ],
    1000, 8);

dungeonList['Pokemon Tower'] = new Dungeon('Pokemon Tower',
    [
        {pokemon: 'Gastly', options: { weight: 21.3 }},
        {pokemon: 'Haunter', options: { weight: 21.3 }},
        {pokemon: 'Cubone', options: { weight: 21.3 }},
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 23)],
            { weight: 1 }, 'Hope'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 22)],
            { weight: 1 }, 'Patricia'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 24)],
            { weight: 1 }, 'Carly'),
        new DungeonTrainer('Channeler',
            [
                new GymPokemon('Gastly', 5016, 23),
                new GymPokemon('Gastly', 5016, 23),
            ], { weight: 1 }, 'Laurel'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 22)],
            { weight: 1 }, 'Jody'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 24)],
            { weight: 1 }, 'Paula'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 22)],
            { weight: 1 }, 'Ruth'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Haunter', 10031, 23)],
            { weight: 1 }, 'Tammy'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 24)],
            { weight: 1 }, 'Karina'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 22)],
            { weight: 1 }, 'Janae'),
        new DungeonTrainer('Channeler',
            [
                new GymPokemon('Gastly', 3344, 22),
                new GymPokemon('Gastly', 3344, 22),
                new GymPokemon('Gastly', 3344, 22),
            ], { weight: 1 }, 'Angelica'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 24)],
            { weight: 1 }, 'Jennifer'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 10031, 24)],
            { weight: 1 }, 'Emilia'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 3344, 25),
                new GymPokemon('Zubat', 3344, 25),
                new GymPokemon('Golbat', 3344, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 5016, 26),
                new GymPokemon('Drowzee', 5016, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 2508, 23),
                new GymPokemon('Rattata', 2508, 23),
                new GymPokemon('Raticate', 2508, 23),
                new GymPokemon('Zubat', 2508, 23),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Chesto', weight: 3.5},
        {loot: 'Greatball', weight: 2.5},
        {loot: 'Fighting_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Pokemon Tower'))},
        {loot: 'MediumRestore', weight: 0.5},
        {loot: 'Star Piece', weight: 0.5},
        {loot: 'Revive', weight: 0.5},
        {loot: 'Rare Bone', weight: 0},
        {loot: 'Ultraball', weight: 0},
        {loot: 'LargeRestore', weight: 0},
        {loot: 'Soothe_bell', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pokemon Tower'))},
        {loot: 'Trade_stone', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pokemon Tower'))},
    ],
    7523,
    [new DungeonBossPokemon('Marowak', 37615, 30)],
    750, 10);

dungeonList['Seafoam Islands'] = new Dungeon('Seafoam Islands',
    ['Zubat', 'Golbat', 'Goldeen', 'Poliwag', 'Magikarp', 'Slowpoke', 'Slowbro', 'Tentacool', 'Krabby', 'Kingler', 'Staryu'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Aspear', weight: 3.5},
        {loot: 'Revive', weight: 1.75},
        {loot: 'Water_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Seafoam Islands'))},
        {loot: 'Ultraball', weight: 1},
        {loot: 'Water_stone', weight: 0},
    ],
    17226,
    [
        new DungeonBossPokemon('Seel', 86130, 35),
        new DungeonBossPokemon('Articuno', 129195, 50),
    ],
    1250, 15);

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
                new GymPokemon('Ekans', 7894, 33),
                new GymPokemon('Ekans', 7894, 33),
                new GymPokemon('Raticate', 7894, 34),
            ], { weight: 1 }, 'Johnson'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Charmander', 11840, 34),
                new GymPokemon('Charmeleon', 11840, 34),
            ], { weight: 1 }, 'Arnie'),
        new DungeonTrainer('Burglar',
            [new GymPokemon('Ninetales', 23680, 38)],
            { weight: 1 }, 'Simon'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 7894, 33),
                new GymPokemon('Magneton', 7894, 33),
                new GymPokemon('Voltorb', 7894, 33),
            ], { weight: 1 }, 'Braydon', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 11840, 29),
                new GymPokemon('Weezing', 11840, 29),
            ], { weight: 1 }, 'Ted', '(male)'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Growlithe', 11840, 34),
                new GymPokemon('Ponyta', 11840, 34),
            ], { weight: 1 }, 'Lewis'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 11840, 34),
                new GymPokemon('Electrode', 11840, 34),
            ], { weight: 1 }, 'Ivan', '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Rawst', weight: 3.5},
        {loot: 'Figy', weight: 3},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'Mystery_egg', weight: 1.5, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Pokemon Mansion'))},
        {loot: 'Fire_egg', weight: 0.5, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Pokemon Mansion'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Fire_stone', weight: 0},
        {loot: 'Magmarizer', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pokemon Mansion'))},
    ],
    17760,
    [new DungeonBossPokemon('Magmar', 88800, 40)],
    1500, 16);

dungeonList['Victory Road'] = new Dungeon('Victory Road',
    [
        {pokemon: 'Zubat', options: { weight: 8.8 }},
        {pokemon: 'Golbat', options: { weight: 8.8 }},
        {pokemon: 'Geodude', options: { weight: 8.8 }},
        {pokemon: 'Graveler', options: { weight: 8.8 }},
        {pokemon: 'Onix', options: { weight: 8.8 }},
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Persian', 15769, 42),
                new GymPokemon('Ponyta', 15769, 42),
                new GymPokemon('Rapidash', 15769, 42),
                new GymPokemon('Vulpix', 15769, 42),
                new GymPokemon('Ninetales', 15769, 42),
            ], { weight: 1 }, 'Naomi', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Raticate', 15769, 42),
                new GymPokemon('Ivysaur', 15769, 42),
                new GymPokemon('Wartortle', 15769, 42),
                new GymPokemon('Charmeleon', 15769, 42),
                new GymPokemon('Charizard', 15769, 42),
            ], { weight: 1 }, 'Rolando', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Machoke', 26281, 43),
                new GymPokemon('Machop', 26281, 43),
                new GymPokemon('Machoke', 26281, 43),
            ], { weight: 1 }, 'Daisuke'),
        new DungeonTrainer('Juggler',
            [
                new GymPokemon('Drowzee', 19711, 41),
                new GymPokemon('Hypno', 19711, 41),
                new GymPokemon('Kadabra', 19711, 41),
                new GymPokemon('Kadabra', 19711, 41),
            ], { weight: 1 }, 'Nelson'),
        new DungeonTrainer('Tamer',
            [
                new GymPokemon('Persian', 39422, 44),
                new GymPokemon('Golduck', 39422, 44),
            ], { weight: 1 }, 'Vincent'),
        new DungeonTrainer('Juggler',
            [new GymPokemon('Mr. Mime', 78843, 48)],
            { weight: 1 }, 'Gregory'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Exeggutor', 15769, 42),
                new GymPokemon('Sandslash', 15769, 42),
                new GymPokemon('Cloyster', 15769, 42),
                new GymPokemon('Electrode', 15769, 42),
                new GymPokemon('Arcanine', 15769, 42),
            ], { weight: 1 }, 'George', '(male)'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Charmeleon', 26281, 40),
                new GymPokemon('Lapras', 26281, 40),
                new GymPokemon('Lickitung', 26281, 40),
            ], { weight: 1 }, 'Dawson'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Clefairy', 15769, 42),
                new GymPokemon('Jigglypuff', 15769, 42),
                new GymPokemon('Persian', 15769, 42),
                new GymPokemon('Dewgong', 15769, 42),
                new GymPokemon('Chansey', 15769, 42),
            ], { weight: 1 }, 'Alexa', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Kingler', 15769, 41),
                new GymPokemon('Poliwhirl', 15769, 42),
                new GymPokemon('Tentacruel', 15769, 42),
                new GymPokemon('Seadra', 15769, 42),
                new GymPokemon('Blastoise', 15769, 42),
            ], { weight: 1 }, 'Colby', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Bellsprout', 15769, 42),
                new GymPokemon('Weepinbell', 15769, 42),
                new GymPokemon('Victreebel', 15769, 42),
                new GymPokemon('Paras', 15769, 42),
                new GymPokemon('Parasect', 15769, 42),
            ], { weight: 1 }, 'Caroline', '(female)'),
    ],
    [
        {loot: 'xClick', weight: 3.75},
        {loot: 'Lucky_egg', weight: 3.75},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Dragon_egg', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Victory Road'))},
        {loot: 'Leaf_stone', weight: 0},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
    ],
    59132,
    [
        new DungeonBossPokemon('Machoke', 295658, 42),
        new DungeonBossPokemon('Moltres', 295658, 50),
        new DungeonTrainer('Cool Couple',
            [
                new GymPokemon('Nidoking', 147829, 45),
                new GymPokemon('Nidoqueen', 147829, 45),
            ], { weight: 1 }, 'Ray & Tyra'),
    ],
    2000, 20);

dungeonList['Cerulean Cave'] = new Dungeon('Cerulean Cave',
    ['Arbok', 'Raichu', 'Sandslash', 'Golbat', 'Gloom', 'Parasect', 'Venomoth', 'Weepinbell', 'Graveler', 'Ditto', 'Chansey', 'Magikarp', 'Poliwag', 'Goldeen', 'Seaking'],
    [
        {loot: 'Pokeball', weight: 4},
        {loot: 'Token_collector', weight: 4},
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Graveler', weight: 3.5},
        {loot: 'Greatball', weight: 3},
        {loot: 'Ultraball', weight: 2},
        {loot: 'LargeRestore', weight: 1},
        {loot: 'Old Amber', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Cerulean Cave'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(500, GameConstants.getDungeonIndex('Cerulean Cave'))},
        {loot: 'Dusk_stone', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Cerulean Cave'))},
    ],
    68565,
    [
        new DungeonBossPokemon('Rhydon', 342825, 60),
        new DungeonBossPokemon('Mewtwo', 342825, 100),
    ],
    2500, 20);

// Johto Dungeons

dungeonList['Sprout Tower'] = new Dungeon('Sprout Tower',
    [
        {pokemon: 'Rattata', options: { weight: 8 }},
        {pokemon: 'Gastly', options: { weight: 8 }},
        {pokemon: 'Hoothoot', options: { weight: 8 }},
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 40171, 3),
                new GymPokemon('Bellsprout', 40171, 3),
                new GymPokemon('Bellsprout', 40171, 3),
            ], { weight: 1 }, 'Nico'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 40171, 3),
                new GymPokemon('Bellsprout', 40171, 3),
                new GymPokemon('Bellsprout', 40171, 3),
            ], { weight: 1 }, 'Chow'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 40171, 3),
                new GymPokemon('Bellsprout', 40171, 3),
                new GymPokemon('Bellsprout', 40171, 3),
            ], { weight: 1 }, 'Edmond'),
        new DungeonTrainer('Sage',
            [new GymPokemon('Bellsprout', 120511, 6)],
            { weight: 1 }, 'Jin'),
        new DungeonTrainer('Sage',
            [new GymPokemon('Bellsprout', 120511, 6)],
            { weight: 1 }, 'Neal'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 60256, 7),
                new GymPokemon('Hoothoot', 60256, 7),
            ], { weight: 1 }, 'Troy'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Lucky_incense', weight: 3.5},
        {loot: 'Lucky_egg', weight: 3.5},
        {loot: 'Meadow Plate', weight: 2},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Grass_egg', weight: 1},
    ],
    90383,
    [
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 150638, 7),
                new GymPokemon('Bellsprout', 150638, 7),
                new GymPokemon('Hoothoot', 150638, 10),
            ],
            { weight: 1 }, 'Li'),
    ],
    2500, 31);

// All Unown except "E?!"
SeededRand.seed(1337);
const AlphUnownList = SeededRand.shuffleArray('ABCDFGHIJKLMNOPQRSTUVWXYZ'.split(''));

dungeonList['Ruins of Alph'] = new Dungeon('Ruins of Alph',
    [
        {pokemon: 'Poliwag', options: { weight: 0.6 }},
        {pokemon: 'Poliwhirl', options: { weight: 0.6 }},
        {pokemon: 'Magikarp', options: { weight: 0.6 }},
        {pokemon: 'Natu', options: { weight: 0.6 }},
        {pokemon: 'Wooper', options: { weight: 0.6 }},
        {pokemon: 'Quagsire', options: { weight: 0.6 }},
        {pokemon: 'Smeargle', options: { weight: 0.6 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Girafarig', 125907, 26)],
            { weight: 1 }, 'Nathan', '(male)'),
    ],
    [
        {loot: 'Oran', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Pecha', weight: 3.5},
        {loot: 'Sitrus', weight: 3.5},
        {loot: 'Leppa', weight: 2.5},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Moon Stone', weight: 0.5},
        {loot: 'LargeRestore', weight: 0},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Old Amber', weight: 0},
        {loot: 'Helix Fossil', weight: 0},
        {loot: 'Dome Fossil', weight: 0},
    ],
    94430,
    [
        new DungeonBossPokemon('Unown (A)', 472148, 14, {
            hide: true,
            requirement: new ObtainedPokemonRequirement(pokemonMap['Unown (A)'], true),
        }),
        ...AlphUnownList.map((char) => new DungeonBossPokemon(`Unown (${char})` as PokemonNameType, 472148, 14, {
            hide: true,
            requirement: new SeededDateRequirement(() => SeededDateRand.fromArray(AlphUnownList) == char),
        })),
    ],
    3000, 32);

dungeonList['Union Cave'] = new Dungeon('Union Cave',
    [
        {pokemon: 'Rattata', options: { weight: 1.5 }},
        {pokemon: 'Sandshrew', options: { weight: 1.5 }},
        {pokemon: 'Zubat', options: { weight: 1.5 }},
        {pokemon: 'Geodude', options: { weight: 1.5 }},
        {pokemon: 'Onix', options: { weight: 1.5 }},
        {pokemon: 'Goldeen', options: { weight: 1.5 }},
        {pokemon: 'Magikarp', options: { weight: 1.5 }},
        {pokemon: 'Wooper', options: { weight: 1.5 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 43768, 4),
                new GymPokemon('Geodude', 43768, 6),
                new GymPokemon('Geodude', 43768, 8),
            ], { weight: 1 }, 'Russell'),
        new DungeonTrainer('Firebreather',
            [
                new GymPokemon('Koffing', 65652, 6),
                new GymPokemon('Koffing', 65652, 6),
            ], { weight: 1 }, 'Bill'),
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Slowpoke', 131303, 10)],
            { weight: 1 }, 'Larry'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'xClick', weight: 4},
        {loot: 'Geodude', weight: 3.5},
        {loot: 'Greatball', weight: 3},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Revive', weight: 1.75},
        {loot: 'LargeRestore', weight: 1},
        {loot: 'Ultraball', weight: 0},
    ],
    98477,
    [
        new DungeonTrainer('Hiker',
            [new GymPokemon('Onix', 492383, 11)],
            { weight: 1 }, 'Daniel'),
        new DungeonTrainer('Firebreather',
            [new GymPokemon('Vulpix', 492383, 9)],
            { weight: 1 }, 'Ray'),
    ],
    3000, 32);

dungeonList['Slowpoke Well'] = new Dungeon('Slowpoke Well',
    [
        {pokemon: 'Zubat', options: { weight: 6 }},
        {pokemon: 'Slowpoke', options: { weight: 6 }},
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 71330, 9),
                new GymPokemon('Rattata', 71330, 9),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 71330, 9),
                new GymPokemon('Ekans', 71330, 11),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 47554, 7),
                new GymPokemon('Zubat', 47554, 9),
                new GymPokemon('Zubat', 47554, 9),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Greatball', weight: 2},
        {loot: 'Splash Plate', weight: 2},
        {loot: 'Kings_rock', weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Slowpoke Well'))},
        {loot: 'Water_egg', weight: 0.5},
        {loot: 'MediumRestore', weight: 0.5},
    ],
    106995,
    [
        new DungeonTrainer('Rocket Executive',
            [new GymPokemon('Koffing', 534975, 14)],
            { weight: 1 }, 'Proton', '(proton)'),
    ],
    3500, 33);

dungeonList['Ilex Forest'] = new Dungeon('Ilex Forest',
    [
        {pokemon: 'Caterpie', options: { weight: 0.5 }},
        {pokemon: 'Metapod', options: { weight: 0.5 }},
        {pokemon: 'Weedle', options: { weight: 0.5 }},
        {pokemon: 'Kakuna', options: { weight: 0.5 }},
        {pokemon: 'Zubat', options: { weight: 0.5 }},
        {pokemon: 'Oddish', options: { weight: 0.5 }},
        {pokemon: 'Paras', options: { weight: 0.5 }},
        {pokemon: 'Hoothoot', options: { weight: 0.5 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Ledyba', 74314, 8),
                new GymPokemon('Paras', 74314, 10),
            ], { weight: 1 }, 'Wayne'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Lucky_egg', weight: 3.75},
        {loot: 'Insect Plate', weight: 2},
        {loot: 'Revive', weight: 1.75},
        {loot: 'MediumRestore', weight: 1},
        {loot: 'Zap Plate', weight: 0},
    ],
    111470,
    [
        new DungeonBossPokemon('Noctowl', 557348, 30),
        new DungeonBossPokemon('Beedrill', 557348, 30),
        new DungeonBossPokemon('Butterfree', 557348, 30),
        new DungeonBossPokemon('Celebi', 1617083, 50, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)}),
    ],
    4000, 33);

dungeonList['Burned Tower'] = new Dungeon('Burned Tower',
    ['Rattata', 'Raticate', 'Zubat', 'Koffing'],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Flame Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'Revive', weight: 1.25},
        {loot: 'Electric_egg', weight: 0},
        {loot: 'Water_egg', weight: 0},
        {loot: 'Fire_egg', weight: 0},
    ],
    145449,
    [
        new DungeonBossPokemon('Golbat', 727245, 35),
        new DungeonBossPokemon('Weezing', 727245, 35),
        new DungeonBossPokemon('Shuckle', 727245, 50),
    ],
    4500, 37);

dungeonList['Tin Tower'] = new Dungeon('Tin Tower',
    ['Rattata', 'Gastly'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Token_collector', weight: 4},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Spooky Plate', weight: 2},
        {loot: 'Flame Plate', weight: 2},
        {loot: 'Sky Plate', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Max Revive', weight: 0},
    ],
    226151,
    [
        new DungeonBossPokemon('Raticate', 1130753, 35),
        new DungeonBossPokemon('Haunter', 1130753, 35),
        new DungeonBossPokemon('Ho-Oh', 1617083, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Raikou),
            new ObtainedPokemonRequirement(pokemonMap.Entei),
            new ObtainedPokemonRequirement(pokemonMap.Suicune),
        ])}),
    ],
    4500, 43);

dungeonList['Whirl Islands'] = new Dungeon('Whirl Islands',
    ['Zubat', 'Golbat', 'Seel', 'Krabby', 'Horsea'],
    [
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Token_collector', weight: 4},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Mind Plate', weight: 2},
        {loot: 'Sky Plate', weight: 2},
        {loot: 'Revive', weight: 1.75},
        {loot: 'Water_egg', weight: 1},
        {loot: 'Max Revive', weight: 0},
    ],
    226151,
    [
        new DungeonBossPokemon('Dewgong', 1130753, 40),
        new DungeonBossPokemon('Kingler', 1130753, 40),
        new DungeonBossPokemon('Lugia', 1130753, 100),
    ],
    5000, 43);

dungeonList['Mt Mortar'] = new Dungeon('Mt Mortar',
    [
        {pokemon: 'Rattata', options: { weight: 0.5 }},
        {pokemon: 'Raticate', options: { weight: 0.5 }},
        {pokemon: 'Zubat', options: { weight: 0.5 }},
        {pokemon: 'Golbat', options: { weight: 0.5 }},
        {pokemon: 'Geodude', options: { weight: 0.5 }},
        {pokemon: 'Graveler', options: { weight: 0.5 }},
        {pokemon: 'Marill', options: { weight: 0.5 }},
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Nidoking', 104130, 17),
                new GymPokemon('Nidoqueen', 104130, 17),
            ], { weight: 1 }, 'Miller'),
        new DungeonTrainer('Super Nerd',
            [new GymPokemon('Slowpoke', 208260, 19)],
            { weight: 1 }, 'Markus'),
        new DungeonTrainer('Super Nerd',
            [new GymPokemon('Seadra', 208260, 39)],
            { weight: 1 }, 'Hugh'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Golem', weight: 3.25},
        {loot: 'Iron Plate', weight: 2},
        {loot: 'Stone Plate', weight: 2},
        {loot: 'Earth Plate', weight: 2},
        {loot: 'Draco Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.75},
        {loot: 'Revive', weight: 1.75},
        {loot: 'Fighting_egg', weight: 1},
        {loot: 'Dragon_scale', weight: 0.75, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt Mortar'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Protector', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Mt Mortar'))},
    ],
    156195,
    [
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Hitmonlee', 390487, 34),
                new GymPokemon('Hitmonchan', 390487, 34),
            ], { weight: 1 }, 'Kiyo'),
        new DungeonBossPokemon('Tyrogue', 780975, 45, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt Mortar'))}),
    ],
    5500, 37);

dungeonList['Team Rockets Hideout'] = new Dungeon('Team Rockets Hideout',
    [
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 54263, 16),
                new GymPokemon('Rattata', 54263, 16),
                new GymPokemon('Rattata', 54263, 16),
                new GymPokemon('Rattata', 54263, 16),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 72351, 20),
                new GymPokemon('Magnemite', 72351, 20),
                new GymPokemon('Magnemite', 72351, 20),
            ], { weight: 1 }, 'Jed', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Drowzee', 108526, 17),
                new GymPokemon('Zubat', 108526, 19),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 72351, 16),
                new GymPokemon('Grimer', 72351, 17),
                new GymPokemon('Rattata', 72351, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Venonat', 108526, 18),
                new GymPokemon('Venonat', 108526, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Golbat', 217052, 18)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 72351, 17),
                new GymPokemon('Zubat', 72351, 17),
                new GymPokemon('Rattata', 72351, 17),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Ekans', 108526, 18),
                new GymPokemon('Gloom', 108526, 18),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Raticate', 217052, 19)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Koffing', 108526, 22),
                new GymPokemon('Koffing', 108526, 22),
            ], { weight: 1 }, 'Ross', '(male)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Ditto', 217052, 24)],
            { weight: 1 }, 'Mitch', '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Token_collector', weight: 4},
        {loot: 'Geodude', weight: 3.5},
        {loot: 'Voltorb', weight: 3.5},
        {loot: 'Electrode', weight: 3.5},
        {loot: 'Koffing', weight: 3.5},
        {loot: 'Dread Plate', weight: 2},
        {loot: 'Splash Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'Revive', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Team Rockets Hideout'))},
    ],
    217052,
    [
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Zubat', 361753, 22),
                new GymPokemon('Koffing', 361753, 22),
                new GymPokemon('Raticate', 361753, 24),
            ], { weight: 1 }, 'Petrel', '(petrel)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Arbok', 361753, 23),
                new GymPokemon('Gloom', 361753, 23),
                new GymPokemon('Murkrow', 361753, 25),
            ], { weight: 1 }, 'Ariana', '(ariana)'),
    ],
    5500, 43);

dungeonList['Radio Tower'] = new Dungeon('Radio Tower',
    [
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Rattata', 221601, 27)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Muk', 73867, 23),
                new GymPokemon('Koffing', 73867, 23),
                new GymPokemon('Rattata', 73867, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 110801, 24),
                new GymPokemon('Muk', 110801, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Growlithe', 110801, 26),
                new GymPokemon('Koffing', 110801, 24),
            ], { weight: 1 }, 'Eddie'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Koffing', 73867, 23),
                new GymPokemon('Magmar', 73867, 25),
                new GymPokemon('Koffing', 73867, 23),
            ], { weight: 1 }, 'Duncan'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Gloom', 110801, 25),
                new GymPokemon('Gloom', 110801, 25),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 110801, 24),
                new GymPokemon('Golbat', 110801, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Grimer', 110801, 26),
                new GymPokemon('Weezing', 110801, 23),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 110801, 25),
                new GymPokemon('Koffing', 110801, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 110801, 24),
                new GymPokemon('Raticate', 110801, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Arbok', 221601, 26)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 44321, 21),
                new GymPokemon('Rattata', 44321, 21),
                new GymPokemon('Rattata', 44321, 21),
                new GymPokemon('Rattata', 44321, 21),
                new GymPokemon('Rattata', 44321, 21),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Grimer', 73867, 23),
                new GymPokemon('Grimer', 73867, 23),
                new GymPokemon('Muk', 73867, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 110801, 26),
                new GymPokemon('Zubat', 110801, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 55401, 23),
                new GymPokemon('Zubat', 55401, 23),
                new GymPokemon('Rattata', 55401, 23),
                new GymPokemon('Grimer', 55401, 23),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 73867, 27),
                new GymPokemon('Magnemite', 73867, 27),
                new GymPokemon('Magnemite', 73867, 27),
            ], { weight: 1 }, 'Marc', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Weezing', 221601, 26)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 110801, 24),
                new GymPokemon('Koffing', 110801, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 73867, 22),
                new GymPokemon('Golbat', 73867, 24),
                new GymPokemon('Grimer', 73867, 22),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Porygon', 221601, 30)],
            { weight: 1 }, 'Rich', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Ekans', 55401, 21),
                new GymPokemon('Oddish', 55401, 23),
                new GymPokemon('Ekans', 55401, 21),
                new GymPokemon('Gloom', 55401, 24),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xClick', weight: 3.75},
        {loot: 'Lucky_egg', weight: 3.75},
        {loot: 'Persim', weight: 2},
        {loot: 'Razz', weight: 2},
        {loot: 'Bluk', weight: 2},
        {loot: 'Nanab', weight: 2},
        {loot: 'Wepear', weight: 2},
        {loot: 'Pinap', weight: 2},
        {loot: 'Figy', weight: 2},
        {loot: 'Wiki', weight: 2},
        {loot: 'Mago', weight: 2},
        {loot: 'Aguav', weight: 2},
        {loot: 'Iapapa', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Lum', weight: 0, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Radio Tower'))},
    ],
    221601,
    [
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Houndour', 369335, 33),
                new GymPokemon('Koffing', 369335, 32),
                new GymPokemon('Houndoom', 369335, 35),
            ], { weight: 1 }, 'Archer', '(archer)'),
        new DungeonTrainer('Rocket Executive',
            [new GymPokemon('Golbat', 1108005   , 36)],
            { weight: 1 }, 'Proton', '(proton)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Koffing', 174668, 30),
                new GymPokemon('Koffing', 174668, 30),
                new GymPokemon('Koffing', 174668, 30),
                new GymPokemon('Koffing', 174668, 30),
                new GymPokemon('Weezing', 234668, 32),
                new GymPokemon('Koffing', 174668, 30),
            ], { weight: 1 }, 'Petrel', '(petrel)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Arbok', 369335, 32),
                new GymPokemon('Gloom', 369335, 32),
                new GymPokemon('Murkrow', 369335, 32),
            ], { weight: 1 }, 'Ariana', '(ariana)'),
    ],
    5750, 43);

dungeonList['Ice Path'] = new Dungeon('Ice Path',
    ['Zubat', 'Jynx', 'Swinub'],
    [
        {loot: 'xClick', weight: 3.5},
        {loot: 'Lucky_egg', weight: 3.5},
        {loot: 'Token_collector', weight: 3.5},
        {loot: 'Icicle Plate', weight: 2},
        {loot: 'Revive', weight: 1},
        {loot: 'Dragon_egg', weight: 0.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Ice Path'))},
    ],
    230697,
    [new DungeonBossPokemon('Delibird', 1153485, 50)],
    6000, 44);

dungeonList['Dark Cave'] = new Dungeon('Dark Cave',
    ['Zubat', 'Golbat', 'Geodude', 'Graveler', 'Wobbuffet'],
    [
        {loot: 'Pokeball', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Dread Plate', weight: 2},
        {loot: 'SmallRestore', weight: 1.5},
        {loot: 'Revive', weight: 1},
        {loot: 'Star Piece', weight: 1},
        {loot: 'LargeRestore', weight: 0.5},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
    ],
    244848,
    [new DungeonBossPokemon('Dunsparce', 1224240, 55)],
    6500, 45);

dungeonList['Victory Road Johto'] = new Dungeon('Victory Road Johto',
    ['Golbat', 'Graveler', 'Onix', 'Rhyhorn'],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Graveler', weight: 3.25},
        {loot: 'Earth Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'SmallRestore', weight: 1.5},
        {loot: 'LargeRestore', weight: 1},
        {loot: 'Dragon_scale', weight: 0},
        {loot: 'Max Revive', weight: 0},
    ],
    306641,
    [
        new DungeonBossPokemon('Sandslash', 1533203, 55),
        new DungeonBossPokemon('Rhydon', 1533203, 55),
    ],
    7000, 26);

dungeonList['Mt Silver'] = new Dungeon('Mt Silver',
    ['Ponyta', 'Doduo', 'Tangela', 'Sneasel', 'Ursaring', 'Donphan', 'Teddiursa', 'Phanpy', 'Quagsire', 'Misdreavus'],
    [
        {loot: 'Token_collector', weight: 3.75},
        {loot: 'Lucky_egg', weight: 3.75},
        {loot: 'Fist Plate', weight: 2},
        {loot: 'Zap Plate', weight: 2},
        {loot: 'Ultraball', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.75},
        {loot: 'Revive', weight: 1.5},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Mt Silver'))},
        {loot: 'Dawn_stone', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Mt Silver'))},
    ],
    323417,
    [new DungeonBossPokemon('Larvitar', 1617083, 60)],
    10000, 28);

// Hoenn Dungeons

dungeonList['Petalburg Woods'] = new Dungeon('Petalburg Woods',
    [
        {pokemon: 'Poochyena', options: { weight: 1.33 }},
        {pokemon: 'Wurmple', options: { weight: 1.33 }},
        {pokemon: 'Silcoon', options: { weight: 1.33 }},
        {pokemon: 'Cascoon', options: { weight: 1.33 }},
        {pokemon: 'Taillow', options: { weight: 1.33 }},
        {pokemon: 'Shroomish', options: { weight: 1.33 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Wurmple', 138291, 3),
                new GymPokemon('Wurmple', 138291, 3),
                new GymPokemon('Wurmple', 138291, 3),
                new GymPokemon('Wurmple', 138291, 3),
            ], { weight: 1 }, 'Lyle'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Nincada', 276582, 6),
                new GymPokemon('Nincada', 276582, 6),
            ], { weight: 1 }, 'James'),
    ],
    [
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'Token_collector', weight: 3.75},
        {loot: 'Greatball', weight: 3},
        {loot: 'Meadow Plate', weight: 2},
        {loot: 'Insect Plate', weight: 2},
        {loot: 'Iron Plate', weight: 2},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Grass_egg', weight: 1},
    ],
    414872,
    [
        new DungeonBossPokemon('Slakoth', 2074358, 10, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))}),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 2074358, 9)],
            { weight: 1 }, undefined, '(male)'),
    ],
    12000, 104);

dungeonList['Rusturf Tunnel'] = new Dungeon('Rusturf Tunnel',
    [
        {pokemon: 'Whismur', options: { weight: 4 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 145118, 16),
                new GymPokemon('Geodude', 145118, 16),
                new GymPokemon('Machop', 145118, 16),
            ], { weight: 1 }, 'Mike'),
    ],
    [
        {loot: 'xClick', weight: 3.75},
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'Lucky_egg', weight: 3.75},
        {loot: 'Stone Plate', weight: 2},
        {loot: 'Iron Plate', weight: 2},
        {loot: 'Earth Plate', weight: 2},
        {loot: 'Revive', weight: 1},
        {loot: 'Star Piece', weight: 0.5},
        {loot: 'Hard Stone', weight: 0.5},
        {loot: 'Heart Scale', weight: 0},
    ],
    435354,
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 2176770, 11)],
            { weight: 1 }, undefined, '(male)'),
    ],
    14000, 116);

dungeonList['Granite Cave'] = new Dungeon('Granite Cave',
    ['Zubat', 'Abra', 'Geodude', 'Makuhita', 'Nosepass', 'Aron'],
    [
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_egg', weight: 3.75},
        {loot: 'Iron Plate', weight: 2},
        {loot: 'Earth Plate', weight: 2},
        {loot: 'Everstone', weight: 1.75},
        {loot: 'Revive', weight: 1.75},
        {loot: 'MediumRestore', weight: 1},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Hard Stone', weight: 1},
        {loot: 'Heart Scale', weight: 0},
    ],
    445896,
    [
        new DungeonBossPokemon('Sableye', 2229480, 20),
        new DungeonBossPokemon('Mawile', 2229480, 20),
    ],
    16000, 116);

dungeonList['Fiery Path'] = new Dungeon('Fiery Path',
    ['Machop', 'Grimer', 'Koffing', 'Slugma', 'Numel'],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Flame Plate', weight: 2},
        {loot: 'Draco Plate', weight: 2},
        {loot: 'Dragon_egg', weight: 1.5},
        {loot: 'Fire_egg', weight: 1.5},
        {loot: 'Fire_stone', weight: 1},
    ],
    523346,
    [new DungeonBossPokemon('Torkoal', 2616728, 20)],
    17000, 112);

dungeonList['Meteor Falls'] = new Dungeon('Meteor Falls',
    [
        {pokemon: 'Zubat', options: { weight: 0.8 }},
        {pokemon: 'Golbat', options: { weight: 0.8 }},
        {pokemon: 'Goldeen', options: { weight: 0.8 }},
        {pokemon: 'Magikarp', options: { weight: 0.8 }},
        {pokemon: 'Barboach', options: { weight: 0.8 }},
        new DungeonTrainer('Old Couple',
            [
                new GymPokemon('Medicham', 380706, 39),
                new GymPokemon('Hariyama', 380706, 39),
            ], { weight: 1 }, 'John and Jay'),
    ],
    [
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Pokeball', weight: 3.5},
        {loot: 'Greatball', weight: 3},
        {loot: 'Stone Plate', weight: 2},
        {loot: 'Iron Plate', weight: 2},
        {loot: 'Sky Plate', weight: 2},
        {loot: 'Draco Plate', weight: 2},
        {loot: 'Mystery_egg', weight: 1.5},
        {loot: 'Star Piece', weight: 1},
        {loot: 'Moon_stone', weight: 0},
    ],
    571059,
    [
        new DungeonBossPokemon('Solrock', 2855295, 20),
        new DungeonBossPokemon('Lunatone', 2855295, 20),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Altaria', 1427648, 37),
                new GymPokemon('Altaria', 1427648, 37),
            ], { weight: 1 }, 'Nicolas'),
    ],
    18000, 101);

dungeonList['Mt. Chimney Crater'] = new Dungeon('Mt. Chimney Crater',
    [
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Numel', 583463, 20)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Zubat', 583463, 20)],
            { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Magma Admin',
            [
                new GymPokemon('Numel', 95177, 18),
                new GymPokemon('Poochyena', 95177, 20),
                new GymPokemon('Numel', 95177, 22),
                new GymPokemon('Zubat', 95177, 22),
            ], { weight: 1 }, 'Tabitha'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Token_collector', weight: 3.5},
        {loot: 'Flame Plate', weight: 2},
        {loot: 'Fire_egg', weight: 1.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Mt. Chimney Crater'))},
    ],
    583463,
    [
        new DungeonTrainer('Magma Leader',
            [
                new GymPokemon('Mightyena', 873108, 24),
                new GymPokemon('Zubat', 873108, 24),
                new GymPokemon('Camerupt', 1073108, 25),
            ], { weight: 1 }, 'Maxie'),
    ],
    20000, 114);

dungeonList['Jagged Pass'] = new Dungeon('Jagged Pass',
    [
        {pokemon: 'Machop', options: { weight: 0.8 }},
        {pokemon: 'Numel', options: { weight: 0.8 }},
        {pokemon: 'Spoink', options: { weight: 0.8 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 397244, 20),
                new GymPokemon('Baltoy', 397244, 20),
            ], { weight: 1 }, 'Eric'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Shroomish', 264829, 19),
                new GymPokemon('Oddish', 264829, 19),
                new GymPokemon('Swablu', 264829, 19),
            ], { weight: 1 }, 'Diana'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Shroomish', 794487, 21)],
            { weight: 1 }, 'Autumn'),
        new DungeonTrainer('Triathlete',
            [new GymPokemon('Magnemite', 794487, 21)],
            { weight: 1 }, 'Julio', '(malecycling)'),
        new DungeonTrainer('Camper',
            [
                new GymPokemon('Zigzagoon', 397244, 20),
                new GymPokemon('Taillow', 397244, 20),
            ], { weight: 1 }, 'Ethan'),
    ],
    [
        {loot: 'xClick', weight: 3.5},
        {loot: 'Lucky_egg', weight: 3.5},
        {loot: 'Greatball', weight: 2.5},
        {loot: 'Dread Plate', weight: 2},
        {loot: 'Stone Plate', weight: 2},
        {loot: 'Moon_stone', weight: 1},
    ],
    595865,
    [
        new DungeonTrainer('Team Magma Grunt',
            [
                new GymPokemon('Mightyena', 700000, 22),
                new GymPokemon('Zubat', 700000, 22),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    22000, 115);

dungeonList['New Mauville'] = new Dungeon('New Mauville',
    ['Magnemite', 'Voltorb'],
    [
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Cheri', weight: 3.75},
        {loot: 'Voltorb', weight: 3.25},
        {loot: 'Razz', weight: 3},
        {loot: 'Ultraball', weight: 3},
        {loot: 'Zap Plate', weight: 2.5},
        {loot: 'Thunder_stone', weight: 2},
        {loot: 'Metal_coat', weight: 2},
        {loot: 'Electric_egg', weight: 1.5},
    ],
    729618,
    [
        new DungeonBossPokemon('Magneton', 3648090, 20),
        new DungeonBossPokemon('Electrode', 3648090, 20),
    ],
    24000, 109);

dungeonList['Weather Institute'] = new Dungeon('Weather Institute',
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 787761, 28)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Zubat', 393881, 27),
                new GymPokemon('Poochyena', 393881, 27),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Poochyena', 393881, 27),
                new GymPokemon('Carvanha', 393881, 27),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Zubat', 393881, 27),
                new GymPokemon('Poochyena', 393881, 27),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Poochyena', 262587, 26),
                new GymPokemon('Zubat', 262587, 26),
                new GymPokemon('Carvanha', 262587, 26),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_egg', weight: 3.5},
        {loot: 'Damp Rock', weight: 2.25},
        {loot: 'Smooth Rock', weight: 2.25},
        {loot: 'Heat Rock', weight: 2.25},
        {loot: 'Icy Rock', weight: 2.25},
        {loot: 'Splash Plate', weight: 2},
        {loot: 'Sun Stone', weight: 1},
    ],
    787761,
    [
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Carvanha', 1969403, 28),
                new GymPokemon('Mightyena', 1969403, 28),
            ], { weight: 1 }, 'Shelly', '(shelly)'),
        new DungeonBossPokemon('Castform', 3938805, 20, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))}),
    ],
    26000, 119);
//TODO
dungeonList['Mt. Pyre'] = new Dungeon('Mt. Pyre',
    [
        {pokemon: 'Shuppet', options: { weight: 12 }},
        {pokemon: 'Duskull', options: { weight: 12 }},
        {pokemon: 'Vulpix', options: { weight: 12 }},
        {pokemon: 'Wingull', options: { weight: 12 }},
        {pokemon: 'Meditite', options: { weight: 12 }},
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Rhyhorn', 1173443, 31)],
            { weight: 1 }, 'Mark'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Spoink', 1173443, 31)],
            { weight: 1 }, 'Leah', '(hoenn)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Hariyama', 1173443, 31)],
            { weight: 1 }, 'Zander'),
        new DungeonTrainer('Young Couple',
            [
                new GymPokemon('Delcatty', 586722, 31),
                new GymPokemon('Manectric', 586722, 31),
            ],
            { weight: 1 }, 'Dez & Luke'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Wobbuffet', 391148, 26),
                new GymPokemon('Natu', 391148, 26),
                new GymPokemon('Kadabra', 391148, 26),
            ],
            { weight: 1 }, 'Kayla', '(female)'),
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Skitty', 195574, 26),
                new GymPokemon('Poochyena', 195574, 26),
                new GymPokemon('Zigzagoon', 195574, 26),
                new GymPokemon('Lotad', 195574, 26),
                new GymPokemon('Seedot', 195574, 26),
                new GymPokemon('Taillow', 195574, 26),
            ],
            { weight: 1 }, 'Gabrielle', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Ralts', 391148, 26),
                new GymPokemon('Ralts', 391148, 26),
                new GymPokemon('Kirlia', 391148, 26),
            ],
            { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Shuppet', 1173443, 32)],
            { weight: 1 }, 'Tasha', '(hoenn)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Hariyama', 1173443, 32)],
            { weight: 1 }, 'Atsushi'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Sableye', 1173443, 32)],
            { weight: 1 }, 'Valerie', '(hoenn)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Wobbuffet', 1173443, 32)],
            { weight: 1 }, 'Cedric', '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 1173443, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 1173443, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Poochyena', 586722, 30),
                new GymPokemon('Carvanha', 586722, 30),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Wailmer', 586722, 30),
                new GymPokemon('Zubat', 586722, 30),
            ],
            { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_incense', weight: 3.75},
        {loot: 'Ultraball', weight: 2.5},
        {loot: 'Spooky Plate', weight: 2},
        {loot: 'Fist Plate', weight: 2},
        {loot: 'Mind Plate', weight: 2},
        {loot: 'Dusk_stone', weight: 0.5, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt. Pyre'))},
        {loot: 'Shiny_stone', weight: 0.5, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt. Pyre'))},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Mt. Pyre'))},
    ],
    880082,
    [
        new DungeonBossPokemon('Shuppet', 4400408, 20),
        new DungeonBossPokemon('Duskull', 4400408, 20),
        new DungeonBossPokemon('Chimecho', 4400408, 20),
    ],
    28000, 122);

dungeonList['Magma Hideout'] = new Dungeon('Magma Hideout',
    [
        {pokemon: 'Geodude', options: { weight: 12 }},
        {pokemon: 'Graveler', options: { weight: 12 }},
        {pokemon: 'Torkoal', options: { weight: 12 }},
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Poochyena', 1194883, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Numel', 1194883, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Mightyena', 1194883, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [
                new GymPokemon('Baltoy', 896162, 28),
                new GymPokemon('Numel', 896162, 28),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Zubat', 1194883, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Numel', 1194883, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Mightyena', 1194883, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Baltoy', 1194883, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Baltoy', 1194883, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Magma Admin',
            [
                new GymPokemon('Numel', 298721, 26),
                new GymPokemon('Mightyena', 298721, 28),
                new GymPokemon('Zubat', 298721, 30),
                new GymPokemon('Camerupt', 298721, 33),
            ],
            { weight: 1 }, 'Tabitha'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Figy', weight: 3.5},
        {loot: 'Pinap', weight: 3},
        {loot: 'Fire_egg', weight: 0.5},
    ],
    896162,
    [
        new DungeonTrainer('Magma Leader',
            [
                new GymPokemon('Mightyena', 1193603, 37),
                new GymPokemon('Crobat', 1193603, 38),
                new GymPokemon('Camerupt', 2093603, 39),
            ],
            { weight: 1 }, 'Maxie'),
    ],
    29000, 122);

dungeonList['Aqua Hideout'] = new Dungeon('Aqua Hideout',
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 912240, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 912240, 32)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Zubat', 456120, 31),
                new GymPokemon('Carvanha', 456120, 31),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Poochyena', 456120, 31),
                new GymPokemon('Zubat', 456120, 31),
            ],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 912240, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 912240, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 912240, 32)],
            { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'Token_collector', weight: 3.75},
        {loot: 'Pokeball', weight: 3.5},
        {loot: 'Electrode', weight: 3.25},
        {loot: 'Dread Plate', weight: 2.5},
        {loot: 'Splash Plate', weight: 2.5},
        {loot: 'Duskball', weight: 2},
        {loot: 'Max Revive', weight: 0},
    ],
    912240,
    [
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Mightyena', 2280600, 34),
                new GymPokemon('Golbat', 2280600, 34),
            ],
            { weight: 1 }, 'Matt', '(matt)'),
    ],
    30000, 122);

dungeonList['Shoal Cave'] = new Dungeon('Shoal Cave',
    ['Zubat', 'Golbat', 'Spheal', 'Tentacool', 'Magikarp', 'Wailmer'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Lucky_incense', weight: 3.75},
        {loot: 'Revive', weight: 2},
        {loot: 'Star Piece', weight: 2},
        {loot: 'Water_egg', weight: 2},
        {loot: 'Icicle Plate', weight: 2},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
    ],
    978660,
    [new DungeonBossPokemon('Snorunt', 4893300, 20)],
    30000, 125);

dungeonList['Cave of Origin'] = new Dungeon('Cave of Origin',
    ['Zubat', 'Golbat', 'Sableye', 'Mawile'],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Pomeg', weight: 3.25},
        {loot: 'Grepa', weight: 3.25},
        {loot: 'Revive', weight: 2},
        {loot: 'Mystery_egg', weight: 1},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Cave of Origin'))},
        {loot: 'Lum', weight: 0, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Cave of Origin'))},
        {loot: 'Liechi', weight: 0, requirement: new ClearDungeonRequirement(1500, GameConstants.getDungeonIndex('Cave of Origin'))},
        {loot: 'Ganlon', weight: 0, requirement: new ClearDungeonRequirement(1500, GameConstants.getDungeonIndex('Cave of Origin'))},
    ],
    1120074,
    [
        new DungeonBossPokemon('Exploud', 5600370, 50),
        new DungeonBossPokemon('Kyogre', 7078935, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)}),
        new DungeonBossPokemon('Groudon', 7078935, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)}),
    ],
    34000, 128);

dungeonList['Seafloor Cavern'] = new Dungeon('Seafloor Cavern',
    [
        {pokemon: 'Zubat', options: { weight: 4.8 }},
        {pokemon: 'Golbat', options: { weight: 4.8 }},
        {pokemon: 'Tentacool', options: { weight: 4.8 }},
        {pokemon: 'Magikarp', options: { weight: 4.8 }},
        {pokemon: 'Wailmer', options: { weight: 4.8 }},
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 1444848, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 1444848, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 1444848, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 1444848, 36)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Mightyena', 722424, 35),
                new GymPokemon('Golbat', 722424, 35),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Sharpedo', 722424, 37),
                new GymPokemon('Mightyena', 722424, 37),
            ], { weight: 1 }, 'Shelly', '(shelly)'),
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Token_collector', weight: 4},
        {loot: 'Bluk', weight: 3},
        {loot: 'Rabuta', weight: 2.5},
        {loot: 'Splash Plate', weight: 2},
        {loot: 'Earth Plate', weight: 2},
        {loot: 'Heart Scale', weight: 0},
    ],
    1083636,
    [
        new DungeonTrainer('Aqua Leader',
            [
                new GymPokemon('Mightyena', 1506060, 41),
                new GymPokemon('Crobat', 1506060, 41),
                new GymPokemon('Sharpedo', 2206060, 43),
            ],
            { weight: 1 }, 'Archie'),
    ],
    32000, 128);

dungeonList['Sky Pillar'] = new Dungeon('Sky Pillar',
    ['Golbat', 'Sableye', 'Claydol', 'Banette', 'Mawile', 'Altaria'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Ultraball', weight: 2.5},
        {loot: 'Draco Plate', weight: 2},
        {loot: 'Sky Plate', weight: 2},
        {loot: 'Mind Plate', weight: 2},
        {loot: 'Dragon_scale', weight: 2},
        {loot: 'Salac', weight: 0, requirement: new ClearDungeonRequirement(1750, GameConstants.getDungeonIndex('Sky Pillar'))},
    ],
    1195148,
    [
        new DungeonBossPokemon('Dusclops', 5975737, 20),
        new DungeonBossPokemon('Rayquaza', 5975737, 100),
    ],
    34000, 131);

dungeonList['Sealed Chamber'] = new Dungeon('Sealed Chamber',
    ['Zubat', 'Golbat', 'Tentacool'],
    [
        {loot: 'xClick', weight: 3.5},
        {loot: 'Token_collector', weight: 3.5},
        {loot: 'Stone Plate', weight: 2},
        {loot: 'Icicle Plate', weight: 2},
        {loot: 'Iron Plate', weight: 2},
        {loot: 'Hard Stone', weight: 1},
        {loot: 'Root Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Sealed Chamber'))},
        {loot: 'Claw Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Sealed Chamber'))},
    ],
    1313331,
    [
        new DungeonBossPokemon('Regirock', 6566655, 20),
        new DungeonBossPokemon('Regice', 6566655, 20),
        new DungeonBossPokemon('Registeel', 6566655, 20),
    ],
    36000, 134);

dungeonList['Victory Road Hoenn'] = new Dungeon('Victory Road Hoenn',
    [
        {pokemon: 'Zubat', options: { weight: 4 }},
        {pokemon: 'Golbat', options: { weight: 4 }},
        {pokemon: 'Goldeen', options: { weight: 4 }},
        {pokemon: 'Magikarp', options: { weight: 4 }},
        {pokemon: 'Whismur', options: { weight: 4 }},
        {pokemon: 'Loudred', options: { weight: 4 }},
        {pokemon: 'Makuhita', options: { weight: 4 }},
        {pokemon: 'Hariyama', options: { weight: 4 }},
        {pokemon: 'Aron', options: { weight: 4 }},
        {pokemon: 'Lairon', options: { weight: 4 }},
        {pokemon: 'Mawile', options: { weight: 4 }},
        {pokemon: 'Meditite', options: { weight: 4 }},
        {pokemon: 'Medicham', options: { weight: 4 }},
        {pokemon: 'Barboach', options: { weight: 4 }},
        {pokemon: 'Whiscash', options: { weight: 4 }},
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Magneton', 848792, 43),
                new GymPokemon('Muk', 848792, 43),
            ], { weight: 1 }, 'Albert', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [new GymPokemon('Roselia', 1697584, 45)],
            { weight: 1 }, 'Hope', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [new GymPokemon('Claydol', 1697584, 45)],
            { weight: 1 }, 'Shannon', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Swellow', 565862, 42),
                new GymPokemon('Mawile', 565862, 42),
                new GymPokemon('Kadabra', 565862, 42),
            ], { weight: 1 }, 'Samuel', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Sandslash', 565862, 42),
                new GymPokemon('Ninetales', 565862, 42),
                new GymPokemon('Tropius', 565862, 42),
            ], { weight: 1 }, 'Julie', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Claydol', 848792, 43),
                new GymPokemon('Lanturn', 848792, 43),
            ], { weight: 1 }, 'Dianne', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Medicham', 848792, 43),
                new GymPokemon('Claydol', 848792, 43),
            ], { weight: 1 }, 'Felix', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Skarmory', 848792, 43),
                new GymPokemon('Sableye', 848792, 43),
            ], { weight: 1 }, 'Caroline', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Dodrio', 424396, 42),
                new GymPokemon('Kadabra', 424396, 42),
                new GymPokemon('Electrode', 424396, 42),
                new GymPokemon('Shiftry', 424396, 42),
            ], { weight: 1 }, 'Vito', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Torkoal', 565862, 42),
                new GymPokemon('Medicham', 565862, 42),
                new GymPokemon('Ludicolo', 565862, 42),
            ], { weight: 1 }, 'Michelle', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Lunatone', 848792, 43),
                new GymPokemon('Solrock', 848792, 43),
            ], { weight: 1 }, 'Mitchell', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Sableye', 848792, 43),
                new GymPokemon('Absol', 848792, 43),
            ], { weight: 1 }, 'Halle', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Cacturne', 848792, 43),
                new GymPokemon('Pelipper', 848792, 43),
            ], { weight: 1 }, 'Edgar', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Gardevoir', 848792, 43),
                new GymPokemon('Slaking', 848792, 43),
            ], { weight: 1 }, 'Katelynn', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Slaking', 848792, 43),
                new GymPokemon('Dusclops', 848792, 43),
            ], { weight: 1 }, 'Quincy', '(male)'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_egg', weight: 3.75},
        {loot: 'Ultraball', weight: 2.5},
        {loot: 'Mind Plate', weight: 2},
        {loot: 'Flame Plate', weight: 2},
        {loot: 'Dawn_stone', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Victory Road Hoenn'))},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Victory Road Hoenn'))},
    ],
    1273188,
    [
        new DungeonTrainer('PKMN Trainer',
            [
                new GymPokemon('Altaria', 1173188, 44),
                new GymPokemon('Delcatty', 1173188, 43),
                new GymPokemon('Roselia', 1173188, 44),
                new GymPokemon('Magneton', 1173188, 41),
                new GymPokemon('Gardevoir', 1673188, 45),
            ], { weight: 1 }, 'Wally', '(wally)'),
    ],
    37000, 133);

// Sinnoh

dungeonList['Oreburgh Gate'] = new Dungeon('Oreburgh Gate',
    [
        {pokemon: 'Zubat', options: { weight: 1.1 }},
        {pokemon: 'Golbat', options: { weight: 1.1 }},
        {pokemon: 'Psyduck', options: { weight: 1.1 }},
        {pokemon: 'Golduck', options: { weight: 1.1 }},
        {pokemon: 'Geodude', options: { weight: 1.1 }},
        {pokemon: 'Magikarp', options: { weight: 1.1 }},
        {pokemon: 'Barboach', options: { weight: 1.1 }},
        new DungeonTrainer('Camper',
            [
                new GymPokemon('Starly', 1002466, 7),
                new GymPokemon('Shinx', 1002466, 7),
            ], { weight: 1 }, 'Curtis'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Bidoof', 2004931, 9)],
            { weight: 1 }, 'Diana'),
    ],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Item_magnet', weight: 3.5},
        {loot: 'Earth Plate', weight: 2.5},
        {loot: 'Fist Plate', weight: 2.5},
        {loot: 'Shuca', weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Oreburgh Gate'))},
        {loot: 'Chople', weight: 0, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Oreburgh Gate'))},
    ],
    1503698,
    [
        new DungeonBossPokemon('Gyarados', 7518488, 14),
        new DungeonBossPokemon('Whiscash', 7518488, 14),
    ],
    39000, 203);

dungeonList['Valley Windworks'] = new Dungeon('Valley Windworks',
    [
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Glameow', 1548858, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Zubat', 1548858, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Glameow', 774429, 11),
                new GymPokemon('Stunky', 774429, 11),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Stunky', 1548858, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Zubat', 774429, 11),
                new GymPokemon('Zubat', 774429, 11),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Pokeball', weight: 3.5},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Stone Plate', weight: 2.75},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Charti', weight: 0, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Ravaged Path'))},
    ],
    1548858,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Zubat', 3872145, 15),
                new GymPokemon('Purugly', 3872145, 17),
            ], { weight: 1 }, 'Mars', '(mars)'),
        new DungeonBossPokemon('Drifloon', 7744290, 14, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Valley Windworks'))}),
    ],
    43000, 204);

dungeonList['Eterna Forest'] = new Dungeon('Eterna Forest',
    [
        {pokemon: 'Gastly', options: { weight: 1.8 }},
        {pokemon: 'Hoothoot', options: { weight: 1.8 }},
        {pokemon: 'Wurmple', options: { weight: 1.8 }},
        {pokemon: 'Silcoon', options: { weight: 1.8 }},
        {pokemon: 'Cascoon', options: { weight: 1.8 }},
        {pokemon: 'Bidoof', options: { weight: 1.8 }},
        {pokemon: 'Kricketot', options: { weight: 1.8 }},
        {pokemon: 'Budew', options: { weight: 1.8 }},
        {pokemon: 'Buneary', options: { weight: 1.8 }},
        new DungeonTrainer('Bookworms',
            [
                new GymPokemon('Wurmple', 547206, 9),
                new GymPokemon('Silcoon', 547206, 11),
                new GymPokemon('Beautifly', 547206, 13),
                new GymPokemon('Pachirisu', 547206, 14),
            ], { weight: 1 }, 'Jack & Briana'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Abra', 1094412, 15),
                new GymPokemon('Abra', 1094412, 15),
            ], { weight: 1 }, 'Linsey & Elijah', '(both)'),
        new DungeonTrainer('Bug Buds',
            [
                new GymPokemon('Wurmple', 437765, 9),
                new GymPokemon('Cascoon', 437765, 11),
                new GymPokemon('Dustox', 437765, 13),
                new GymPokemon('Burmy (plant)', 437765, 12),
                new GymPokemon('Kricketune', 437765, 12),
            ], { weight: 1 }, 'Philip & Donald'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Meditite', 1094412, 15),
                new GymPokemon('Psyduck', 1094412, 15),
            ], { weight: 1 }, 'Kody & Rachael', '(both)'),
    ],
    [
        {loot: 'Cheri', weight: 4},
        {loot: 'Oran', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Razz', weight: 3},
        {loot: 'Bluk', weight: 3},
        {loot: 'Insect Plate', weight: 2.75},
        {loot: 'Meadow Plate', weight: 2.75},
        {loot: 'SmallRestore', weight: 1.75},
        {loot: 'Soothe_bell', weight: 0},
    ],
    1641617,
    [
        new DungeonBossPokemon('Beautifly', 7744290, 30),
        new DungeonBossPokemon('Dustox', 7744290, 30),
    ],
    48000, 205);

dungeonList['Old Chateau'] = new Dungeon('Old Chateau',
    ['Gastly', 'Haunter', 'Gengar'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Dread Plate', weight: 2.75},
        {loot: 'Spooky Plate', weight: 2.75},
        {loot: 'Zap Plate', weight: 2.75},
        {loot: 'Kasib', weight: 2, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Old Chateau'))},
        {loot: 'Odd Keystone', weight: 1.75},
    ],
    1618223,
    [new DungeonBossPokemon('Rotom', 8091113, 100)],
    52500, 205);

dungeonList['Team Galactic Eterna Building'] = new Dungeon('Team Galactic Eterna Building',
    [
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Zubat', 809112, 17),
                new GymPokemon('Stunky', 809112, 17),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Zubat', 809112, 16),
                new GymPokemon('Glameow', 809112, 18),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Glameow', 1618223, 19)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Croagunk', 1618223, 19)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Stunky', 539408, 16),
                new GymPokemon('Croagunk', 539408, 16),
                new GymPokemon('Glameow', 539408, 16),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Kadabra', 1618223, 20)],
            { weight: 1 }, 'Travon', '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    1618223,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Zubat', 4045557, 21),
                new GymPokemon('Skuntank', 4045557, 23),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonBossPokemon('Rotom (heat)', 8091113, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Rotom),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (wash)', 8091113, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Rotom),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (frost)', 8091113, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Rotom),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (fan)', 8091113, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Rotom),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (mow)', 8091113, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement(pokemonMap.Rotom),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
    ],
    54250, 205);

dungeonList['Wayward Cave'] = new Dungeon('Wayward Cave',
    [
        {pokemon: 'Zubat', options: { weight: 6.7 }},
        {pokemon: 'Geodude', options: { weight: 6.7 }},
        {pokemon: 'Onix', options: { weight: 6.7 }},
        new DungeonTrainer('Mountain Men',
            [
                new GymPokemon('Geodude', 729608, 20),
                new GymPokemon('Geodude', 729608, 20),
                new GymPokemon('Onix', 729608, 22),
            ], { weight: 1 }, 'Reginald & Lorenzo'),
        new DungeonTrainer('Siblings',
            [
                new GymPokemon('Buneary', 547206, 22),
                new GymPokemon('Staravia', 547206, 17),
                new GymPokemon('Ponyta', 547206, 20),
                new GymPokemon('Shellos (west)', 547206, 20),
            ], { weight: 1 }, 'Cassidy & Wayne'),
        new DungeonTrainer('Nature Friends',
            [
                new GymPokemon('Psyduck', 1094412, 22),
                new GymPokemon('Aipom', 1094412, 22),
            ], { weight: 1 }, 'Tori & Diego'),
        new DungeonTrainer('Nature Friends',
            [
                new GymPokemon('Hoothoot', 729608, 22),
                new GymPokemon('Buizel', 729608, 20),
                new GymPokemon('Shinx', 729608, 20),
            ], { weight: 1 }, 'Ana & Parker'),
        new DungeonTrainer('Amateur Archaeologists',
            [
                new GymPokemon('Gible', 729608, 22),
                new GymPokemon('Geodude', 729608, 19),
                new GymPokemon('Bronzor', 729608, 21),
            ], { weight: 1 }, 'Terry & Gerald'),
    ],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Rawst', weight: 3.75},
        {loot: 'Razz', weight: 3.5},
        {loot: 'Greatball', weight: 3},
        {loot: 'Earth Plate', weight: 2.75},
        {loot: 'Draco Plate', weight: 2.75},
        {loot: 'Revive', weight: 2},
        {loot: 'SmallRestore', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'Dusk_stone', weight: 0},
    ],
    1641617,
    [new DungeonBossPokemon('Bronzor', 8208083, 100)],
    56500, 206);

dungeonList['Mt. Coronet South'] = new Dungeon('Mt. Coronet South',
    ['Clefairy', 'Zubat', 'Machop', 'Geodude', 'Magikarp', 'Cleffa', 'Barboach', 'Chingling'],
    [
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Lucky_incense', weight: 3.5},
        {loot: 'Stone Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'Dawn_stone', weight: 0},
        {loot: 'Moon_stone', weight: 0},
    ],
    1689224,
    [
        new DungeonBossPokemon('Nosepass', 8446118, 35),
        new DungeonBossPokemon('Meditite', 8446118, 50),
        new DungeonBossPokemon('Bronzor', 8446118, 50),
    ],
    60500, 207);

// All Unown except "FHP?!"
SeededRand.seed(420);
const SolaceonUnownList = SeededRand.shuffleArray('ABCDEGIJKLMNOQRSTUVWXYZ'.split(''));

dungeonList['Solaceon Ruins'] = new Dungeon('Solaceon Ruins',
    [
        {pokemon: 'Zubat', options: { weight: 0.8 }},
        {pokemon: 'Geodude', options: { weight: 0.8 }},
        {pokemon: 'Natu', options: { weight: 0.8 }},
        {pokemon: 'Bronzor', options: { weight: 0.8 }},
        {pokemon: 'Hippopotas', options: { weight: 0.8 }},
        new DungeonTrainer('Ruin Maniac',
            [
                new GymPokemon('Geodude', 794187, 19),
                new GymPokemon('Geodude', 794187, 21),
                new GymPokemon('Bronzor', 794187, 23),
            ], { weight: 1 }, 'Karl'),
    ],
    [
        {loot: 'Lucky_incense', weight: 3.75},
        {loot: 'Persim', weight: 3.25},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'Sky Plate', weight: 2.5},
        {loot: 'Fire_stone', weight: 0},
        {loot: 'Water_stone', weight: 0},
        {loot: 'Thunder_stone', weight: 0},
    ],
    1786920,
    [
        ...SolaceonUnownList.map((char) => new DungeonBossPokemon(`Unown (${char})` as PokemonNameType, 8934600, 30, {
            hide: true,
            requirement: new SeededDateRequirement(() => SeededDateRand.fromArray(SolaceonUnownList) == char),
        })),
    ],
    62500, 209);

dungeonList['Iron Island'] = new Dungeon('Iron Island',
    [
        {pokemon: 'Zubat', options: { weight: 3.3 }},
        {pokemon: 'Golbat', options: { weight: 3.3 }},
        {pokemon: 'Tentacool', options: { weight: 3.3 }},
        {pokemon: 'Tentacruel', options: { weight: 3.3 }},
        {pokemon: 'Geodude', options: { weight: 3.3 }},
        {pokemon: 'Graveler', options: { weight: 3.3 }},
        {pokemon: 'Onix', options: { weight: 3.3 }},
        {pokemon: 'Steelix', options: { weight: 3.3 }},
        {pokemon: 'Wingull', options: { weight: 3.3 }},
        {pokemon: 'Pelipper', options: { weight: 3.3 }},
        {pokemon: 'Finneon', options: { weight: 3.3 }},
        new DungeonTrainer('Camper',
            [
                new GymPokemon('Aipom', 1436950, 34),
                new GymPokemon('Floatzel', 1436950, 36),
            ], { weight: 1 }, 'Lawrence'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Raichu', 2873899, 37)],
            { weight: 1 }, 'Summer'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Magnemite', 1436950, 34),
                new GymPokemon('Magnemite', 1436950, 36),
            ], { weight: 1 }, 'Noel'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Steelix', 2873899, 37)],
            { weight: 1 }, 'Braden'),
        new DungeonTrainer('Mountain Men',
            [
                new GymPokemon('Nosepass', 574780, 35),
                new GymPokemon('Onix', 574780, 33),
                new GymPokemon('Steelix', 574780, 34),
                new GymPokemon('Graveler', 574780, 35),
                new GymPokemon('Rhyhorn', 574780, 35),
            ], { weight: 1 }, 'Damon & Maurice'),
        new DungeonTrainer('Crush Kin',
            [
                new GymPokemon('Toxicroak', 1436950, 38),
                new GymPokemon('Medicham', 1436950, 38),
            ], { weight: 1 }, 'Kendal & Tyler'),
        new DungeonTrainer('Co-workers',
            [
                new GymPokemon('Geodude', 478984, 33),
                new GymPokemon('Geodude', 478984, 33),
                new GymPokemon('Machoke', 478984, 36),
                new GymPokemon('Magnemite', 478984, 34),
                new GymPokemon('Graveler', 478984, 34),
                new GymPokemon('Machop', 478984, 34),
            ], { weight: 1 }, 'Brendon & Quentin'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Quagsire', 478984, 35),
                new GymPokemon('Staraptor', 478984, 36),
                new GymPokemon('Hippopotas', 478984, 38),
                new GymPokemon('Lopunny', 478984, 38),
                new GymPokemon('Medicham', 478984, 35),
                new GymPokemon('Kirlia', 478984, 36),
            ], { weight: 1 }, 'Jonah & Brenda'),
    ],
    [
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Pokeball', weight: 3.5},
        {loot: 'Iron Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2.25},
        {loot: 'Revive', weight: 2},
        {loot: 'Duskball', weight: 1.75},
        {loot: 'Star Piece', weight: 1.5},
        {loot: 'Shiny_stone', weight: 0},
        {loot: 'Metal_coat', weight: 0},
        {loot: 'Protector', weight: 0},
    ],
    2155424,
    [
        new DungeonTrainer('Galactic Grunts',
            [
                new GymPokemon('Zubat', 1796187, 34),
                new GymPokemon('Houndour', 1796187, 34),
                new GymPokemon('Golbat', 1796187, 34),
                new GymPokemon('Glameow', 1796187, 34),
                new GymPokemon('Croagunk', 1796187, 34),
                new GymPokemon('Stunky', 1796187, 34),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    66500, 218);

dungeonList['Lake Valor'] = new Dungeon('Lake Valor',
    [
        {pokemon: 'Psyduck', options: { weight: 2 }},
        {pokemon: 'Golduck', options: { weight: 2 }},
        {pokemon: 'Goldeen', options: { weight: 2 }},
        {pokemon: 'Magikarp', options: { weight: 2 }},
        {pokemon: 'Staravia', options: { weight: 2 }},
        {pokemon: 'Bibarel', options: { weight: 2 }},
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Glameow', 1444428, 35),
                new GymPokemon('Murkrow', 1444428, 35),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Golbat', 2888855, 37)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Croagunk', 722214, 33),
                new GymPokemon('Houndour', 722214, 33),
                new GymPokemon('Stunky', 722214, 33),
                new GymPokemon('Glameow', 722214, 33),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Sitrus', weight: 3.75},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'Electric_egg', weight: 1},
        {loot: 'Thunder_stone', weight: 0},
    ],
    2166641,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Golbat', 3611068, 38),
                new GymPokemon('Bronzor', 3611068, 38),
                new GymPokemon('Toxicroak', 3611068, 40),
            ], { weight: 1 }, 'Saturn', '(saturn)'),
        new DungeonBossPokemon('Azelf', 12223028, 50, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))}),
    ],
    69500, 218);

dungeonList['Lake Verity'] = new Dungeon('Lake Verity',
    [
        {pokemon: 'Psyduck', options: { weight: 2.7 }},
        {pokemon: 'Golduck', options: { weight: 2.7 }},
        {pokemon: 'Goldeen', options: { weight: 2.7 }},
        {pokemon: 'Magikarp', options: { weight: 2.7 }},
        {pokemon: 'Starly', options: { weight: 2.7 }},
        {pokemon: 'Bidoof', options: { weight: 2.7 }},
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Glameow', 962952, 33),
                new GymPokemon('Golbat', 962952, 33),
                new GymPokemon('Murkrow', 962952, 36),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Croagunk', 2888855, 37)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Stunky', 1444428, 35),
                new GymPokemon('Houndour', 1444428, 35),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Houndour', 1444428, 34),
                new GymPokemon('Glameow', 1444428, 36),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Sitrus', weight: 3.75},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Fire_stone', weight: 0},
    ],
    2166641,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Golbat', 3611068, 38),
                new GymPokemon('Bronzor', 3611068, 38),
                new GymPokemon('Toxicroak', 3611068, 40),
            ], { weight: 1 }, 'Mars', '(mars)'),
    ],
    72500, 218);

dungeonList['Mt. Coronet North'] = new Dungeon('Mt. Coronet North',
    ['Clefairy', 'Zubat', 'Machop', 'Geodude', 'Magikarp', 'Noctowl', 'Meditite', 'Barboach', 'Chingling', 'Bronzor', 'Snover'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Stone Plate', weight: 2.5},
        {loot: 'Draco Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Light Clay', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1.5},
        {loot: 'Sun_stone', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Mt. Coronet North'))},
        {loot: 'Max Revive', weight: 0},
    ],
    2177858,
    [
        new DungeonBossPokemon('Graveler', 10889288, 35),
        new DungeonBossPokemon('Feebas', 10889288, 50),
        new DungeonBossPokemon('Medicham', 10889288, 50),
    ],
    74500, 218);

dungeonList['Lake Acuity'] = new Dungeon('Lake Acuity',
    ['Psyduck', 'Golduck', 'Goldeen', 'Magikarp', 'Gyarados', 'Sneasel', 'Snorunt', 'Bibarel', 'Snover'],
    [
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Sitrus', weight: 3.75},
        {loot: 'Icicle Plate', weight: 2.5},
        {loot: 'Mind Plate', weight: 2.5},
    ],
    2268458,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Bronzor', 3780763, 38),
                new GymPokemon('Zubat', 3780763, 38),
                new GymPokemon('Skuntank', 3780763, 40),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonBossPokemon('Uxie', 12223028, 50, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))}),
    ],
    78000, 217);

dungeonList['Team Galactic HQ'] = new Dungeon('Team Galactic HQ',
    [
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Glameow', 2326289, 41)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Glameow', 775430, 37),
                new GymPokemon('Murkrow', 775430, 38),
                new GymPokemon('Croagunk', 775430, 39),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Kirlia', 1163145, 40),
                new GymPokemon('Kadabra', 1163145, 40),
            ], { weight: 2 }, 'Frederick', '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Stunky', 2326289, 41)],
            { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Murkrow', 1163145, 41),
                new GymPokemon('Stunky', 1163145, 41),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Golbat', 1163145, 40),
                new GymPokemon('Golbat', 1163145, 38),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Golbat', 1163145, 39),
                new GymPokemon('Houndour', 1163145, 39),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Porygon2', 2326289, 42)],
            { weight: 2 }, 'Darrius', '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Stunky', 1163145, 38),
                new GymPokemon('Croagunk', 1163145, 40),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Croagunk', 775430, 38),
                new GymPokemon('Stunky', 775430, 38),
                new GymPokemon('Glameow', 775430, 38),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Golbat', 775430, 42),
                new GymPokemon('Bronzor', 775430, 42),
                new GymPokemon('Toxicroak', 775430, 42),
            ], { weight: 1 }, 'Saturn', '(saturn)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2326289,
    [
        new DungeonTrainer('Galactic Boss',
            [
                new GymPokemon('Sneasel', 3877148, 44),
                new GymPokemon('Crobat', 3877148, 44),
                new GymPokemon('Honchkrow', 3877148, 46),
            ], { weight: 1 }, 'Cyrus', '(cyrus)'),
    ],
    82500, 219);

dungeonList['Spear Pillar'] = new Dungeon('Spear Pillar',
    [
        {pokemon: 'Clefairy', options: { weight: 3 }},
        {pokemon: 'Golbat', options: { weight: 3 }},
        {pokemon: 'Machoke', options: { weight: 3 }},
        {pokemon: 'Graveler', options: { weight: 3 }},
        {pokemon: 'Nosepass', options: { weight: 3 }},
        {pokemon: 'Noctowl', options: { weight: 3 }},
        {pokemon: 'Medicham', options: { weight: 3 }},
        {pokemon: 'Chimecho', options: { weight: 3 }},
        {pokemon: 'Absol', options: { weight: 3 }},
        {pokemon: 'Chingling', options: { weight: 3 }},
        {pokemon: 'Bronzong', options: { weight: 3 }},
        {pokemon: 'Snover', options: { weight: 3 }},
        {pokemon: 'Abomasnow', options: { weight: 3 }},
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Stunky', 3180004, 43)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Murkrow', 3180004, 43)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Houndour', 1060002, 40),
                new GymPokemon('Golbat', 1060002, 40),
                new GymPokemon('Houndour', 1060002, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Stunky', 1590002, 42),
                new GymPokemon('Golbat', 1590002, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Golbat', 3180004, 43)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Murkrow', 1060002, 39),
                new GymPokemon('Glameow', 1060002, 42),
                new GymPokemon('Murkrow', 1060002, 39),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Croagunk', 1060002, 38),
                new GymPokemon('Croagunk', 1060002, 42),
                new GymPokemon('Stunky', 1060002, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Houndour', 1590002, 40),
                new GymPokemon('Glameow', 1590002, 42),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Glameow', 1590002, 41),
                new GymPokemon('Golbat', 1590002, 41),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Golbat', 1060002, 39),
                new GymPokemon('Croagunk', 1060002, 40),
                new GymPokemon('Murkrow', 1060002, 41),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Iron Plate', weight: 2.5},
        {loot: 'Draco Plate', weight: 2.5},
        {loot: 'Splash Plate', weight: 2.5},
    ],
    2385003,
    [
        new DungeonTrainer('Commanders',
            [
                new GymPokemon('Bronzor', 1987503, 44),
                new GymPokemon('Golbat', 1987503, 44),
                new GymPokemon('Purugly', 1987503, 46),
                new GymPokemon('Bronzor', 1987503, 44),
                new GymPokemon('Golbat', 1987503, 44),
                new GymPokemon('Skuntank', 1987503, 46),
            ], { weight: 1 }, 'Mars & Jupiter', '(marsjupiter)'),
        new DungeonBossPokemon('Palkia', 13143908, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)}),
        new DungeonBossPokemon('Dialga', 13143908, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)}),
    ],
    84500, 220);

dungeonList['Distortion World'] = new Dungeon('Distortion World',
    ['Golbat', 'Gastly', 'Duskull', 'Dusclops', 'Chimecho', 'Chingling', 'Bronzor', 'Bronzong'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Ultraball', weight: 3.5},
        {loot: 'Banette', weight: 3},
        {loot: 'Spooky Plate', weight: 2.5},
        {loot: 'Draco Plate', weight: 2.5},
        {loot: 'Rare Bone', weight: 1.75},
        {loot: 'Odd Keystone', weight: 1.75},
        {loot: 'Reaper_cloth', weight: 0},
    ],
    2444606,
    [
        new DungeonTrainer('Galactic Boss',
            [
                new GymPokemon('Houndoom', 2444606, 45),
                new GymPokemon('Honchkrow', 2444606, 47),
                new GymPokemon('Crobat', 2444606, 46),
                new GymPokemon('Gyarados', 2444606, 46),
                new GymPokemon('Weavile', 2444606, 47),
            ], { weight: 1 }, 'Cyrus', '(cyrus)'),
        new DungeonBossPokemon('Giratina (altered)', 13459890, 45, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)}),
    ],
    86500, 221);

dungeonList['Victory Road Sinnoh'] = new Dungeon('Victory Road Sinnoh',
    [
        {pokemon: 'Golbat', options: { weight: 9.3 }},
        {pokemon: 'Graveler', options: { weight: 9.3 }},
        {pokemon: 'Onix', options: { weight: 9.3 }},
        {pokemon: 'Rhyhorn', options: { weight: 9.3 }},
        {pokemon: 'Magneton', options: { weight: 9.3 }},
        {pokemon: 'Floatzel', options: { weight: 9.3 }},
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Haunter', 1140663, 43),
                new GymPokemon('Gengar', 1140663, 46),
                new GymPokemon('Gardevoir', 1140663, 46),
            ], { weight: 1 }, 'Bryce', '(male)'),
        new DungeonTrainer('Bird Keeper',
            [
                new GymPokemon('Noctowl', 1710994, 45),
                new GymPokemon('Togetic', 1710994, 47),
            ], { weight: 1 }, 'Hana'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Blissey', 1140663, 45),
                new GymPokemon('Glalie', 1140663, 46),
                new GymPokemon('Magnezone', 1140663, 48),
            ], { weight: 1 }, 'Mariah', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Mamoswine', 1140663, 45),
                new GymPokemon('Mothim', 1140663, 46),
                new GymPokemon('Rampardos', 1140663, 48),
            ], { weight: 1 }, 'Omar', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Clefable', 1710994, 47),
                new GymPokemon('Torterra', 1710994, 48),
            ], { weight: 1 }, 'Sydney', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Staraptor', 1710994, 47),
                new GymPokemon('Lickilicky', 1710994, 47),
            ], { weight: 1 }, 'Clayton', '(male)'),
        new DungeonTrainer('Double Team',
            [
                new GymPokemon('Staraptor', 1710994, 50),
                new GymPokemon('Ambipom', 1710994, 50),
            ], { weight: 1 }, 'Al & Kay'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Machamp', 3421987, 48)],
            { weight: 1 }, 'Miles'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Chimecho', 1140663, 44),
                new GymPokemon('Absol', 1140663, 45),
                new GymPokemon('Dusknoir', 1140663, 46),
            ], { weight: 1 }, 'Valencia', '(female)'),
        new DungeonTrainer('Double Team',
            [
                new GymPokemon('Lumineon', 1710994, 50),
                new GymPokemon('Rapidash', 1710994, 50),
            ], { weight: 1 }, 'Pat & Jo'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Rhydon', 1710994, 47),
                new GymPokemon('Carnivine', 1710994, 48),
            ], { weight: 1 }, 'Henry', '(male)'),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Altaria', 1710994, 45),
                new GymPokemon('Gabite', 1710994, 47),
            ], { weight: 1 }, 'Ondrej'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Porygon-Z', 1140663, 46),
                new GymPokemon('Tangrowth', 1140663, 46),
                new GymPokemon('Empoleon', 1140663, 46),
            ], { weight: 1 }, 'Edgar', '(male)'),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Gible', 1140663, 43),
                new GymPokemon('Swablu', 1140663, 45),
                new GymPokemon('Gabite', 1140663, 47),
            ], { weight: 1 }, 'Clinton'),
    ],
    [
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Oran', weight: 3.75},
        {loot: 'Graveler', weight: 3.25},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Razor_claw', weight: 0},
        {loot: 'Dusk_stone', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Victory Road Sinnoh'))},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Heart Scale', weight: 0},
    ],
    2566490,
    [
        new DungeonBossPokemon('Rhydon', 12832448, 100),
        new DungeonBossPokemon('Steelix', 12832448, 100),
    ],
    89500, 223);

dungeonList['Sendoff Spring'] = new Dungeon('Sendoff Spring',
    ['Golbat', 'Golduck', 'Graveler', 'Goldeen', 'Magikarp', 'Staravia', 'Bibarel', 'Chingling'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2628782,
    [
        new DungeonBossPokemon('Seaking', 13143908, 100),
        new DungeonBossPokemon('Gyarados', 13143908, 100),
        new DungeonBossPokemon('Dusclops', 13143908, 100),
    ],
    96500, 224);

dungeonList['Hall of Origin'] = new Dungeon('Hall of Origin',
    ['Slowpoke', 'Spearow', 'Garchomp', 'Slakoth', 'Eevee', 'Breloom', 'Absol'],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Cheri', weight: 3.75},
        {loot: 'Ditto', weight: 3.5},
        {loot: 'Draco Plate', weight: 2.5},
        {loot: 'Dread Plate', weight: 2.5},
        {loot: 'Earth Plate', weight: 2.5},
        {loot: 'Fist Plate', weight: 2.5},
        {loot: 'Flame Plate', weight: 2.5},
        {loot: 'Icicle Plate', weight: 2.5},
        {loot: 'Insect Plate', weight: 2.5},
        {loot: 'Iron Plate', weight: 2.5},
        {loot: 'Meadow Plate', weight: 2.5},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'Pixie Plate', weight: 2.5},
        {loot: 'Sky Plate', weight: 2.5},
        {loot: 'Splash Plate', weight: 2.5},
        {loot: 'Spooky Plate', weight: 2.5},
        {loot: 'Stone Plate', weight: 2.5},
        {loot: 'Toxic Plate', weight: 2.5},
        {loot: 'Zap Plate', weight: 2.5},
    ],
    3021705,
    [
        new DungeonBossPokemon('Arceus (normal)', 15108525, 100),
        new DungeonBossPokemon('Slaking', 15108525, 100),
        new DungeonBossPokemon('Snorlax', 15108525, 100),
        new DungeonBossPokemon('Shuckle', 15108525, 100),
        new DungeonBossPokemon('Blissey', 15108525, 100),
    ],
    106500, 230);

dungeonList['Fullmoon Island'] = new Dungeon('Fullmoon Island',
    ['Illumise', 'Minun', 'Hypno', 'Luvdisc'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Nanab', weight: 3.75},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'Dawn_stone', weight: 0},
    ],
    2691978,
    [new DungeonBossPokemon('Clefable', 13459890, 100)],
    96500, 225);

dungeonList['Newmoon Island'] = new Dungeon('Newmoon Island',
    ['Volbeat', 'Plusle', 'Absol', 'Luvdisc'],
    [
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Nanab', weight: 3.75},
        {loot: 'Dread Plate', weight: 2.5},
        {loot: 'Dusk_stone', weight: 0},
    ],
    2691978,
    [new DungeonBossPokemon('Darkrai', 13459890, 100)],
    96500, 225);

dungeonList['Flower Paradise'] = new Dungeon('Flower Paradise',
    ['Gloom', 'Bellsprout', 'Tangela', 'Skiploom', 'Lombre', 'Seedot', 'Roselia'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Mago', weight: 3.5},
        {loot: 'Aguav', weight: 3.5},
        {loot: 'Meadow Plate', weight: 2.5},
        {loot: 'Sky Plate', weight: 2.25},
        {loot: 'Grass_egg', weight: 1},
        {loot: 'Leaf_stone', weight: 0},
    ],
    2628782,
    [
        new DungeonBossPokemon('Parasect', 13143908, 50),
        new DungeonBossPokemon('Breloom', 13143908, 50),
        new DungeonBossPokemon('Shaymin (land)', 13143908, 50),
        new DungeonBossPokemon('Shaymin (sky)', 13143908, 50, {requirement: new ObtainedPokemonRequirement(pokemonMap['Shaymin (land)'])}),
    ],
    96500, 224);

dungeonList['Snowpoint Temple'] = new Dungeon('Snowpoint Temple',
    ['Golbat', 'Sneasel', 'Smoochum'],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Aspear', weight: 3.75},
        {loot: 'Icicle Plate', weight: 2.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Snowpoint Temple'))},
    ],
    2756085,
    [
        new DungeonBossPokemon('Jynx', 13780425, 100),
        new DungeonBossPokemon('Regigigas', 13780425, 100),
    ],
    96500, 226);

dungeonList['Stark Mountain'] = new Dungeon('Stark Mountain',
    [
        {pokemon: 'Fearow', options: { weight: 4 }},
        {pokemon: 'Golbat', options: { weight: 4 }},
        {pokemon: 'Graveler', options: { weight: 4 }},
        {pokemon: 'Weezing', options: { weight: 4 }},
        {pokemon: 'Rhyhorn', options: { weight: 4 }},
        {pokemon: 'Rhydon', options: { weight: 4 }},
        {pokemon: 'Slugma', options: { weight: 4 }},
        {pokemon: 'Magcargo', options: { weight: 4 }},
        {pokemon: 'Numel', options: { weight: 4 }},
        {pokemon: 'Camerupt', options: { weight: 4 }},
        {pokemon: 'Machoke', options: { weight: 4 }},
        new DungeonTrainer('Dragon Tamer',
            [new GymPokemon('Dragonite', 3761476, 60)],
            { weight: 1 }, 'Darien'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Bronzong', 1253826, 58),
                new GymPokemon('Golbat', 1253826, 58),
                new GymPokemon('Purugly', 1253826, 60),
            ], { weight: 1 }, 'Mars', '(mars)'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Bronzong', 1253826, 58),
                new GymPokemon('Golbat', 1253826, 58),
                new GymPokemon('Skuntank', 1253826, 60),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Primeape', 626913, 58),
                new GymPokemon('Banette', 626913, 59),
                new GymPokemon('Electabuzz', 626913, 58),
                new GymPokemon('Jumpluff', 626913, 58),
                new GymPokemon('Ampharos', 626913, 59),
                new GymPokemon('Onix', 626913, 58),
            ], { weight: 1 }, 'Keenan & Kassandra'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Pupitar', 1253826, 58),
                new GymPokemon('Torterra', 1253826, 61),
                new GymPokemon('Drapion', 1253826, 61),
            ], { weight: 1 }, 'Stefan & Jasmin'),
        new DungeonTrainer('Fight & Flight',
            [
                new GymPokemon('Staravia', 752296, 55),
                new GymPokemon('Fearow', 752296, 57),
                new GymPokemon('Noctowl', 752296, 59),
                new GymPokemon('Breloom', 752296, 58),
                new GymPokemon('Toxicroak', 752296, 58),
            ], { weight: 1 }, 'Krystal & Ray'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Glalie', 752296, 59),
                new GymPokemon('Crobat', 752296, 60),
                new GymPokemon('Luxray', 752296, 58),
                new GymPokemon('Ursaring', 752296, 59),
                new GymPokemon('Gliscor', 752296, 58),
            ], { weight: 1 }, 'Abel & Monique'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Lunatone', 940369, 57),
                new GymPokemon('Gardevoir', 940369, 59),
                new GymPokemon('Solrock', 940369, 57),
                new GymPokemon('Gallade', 940369, 59),
            ], { weight: 1 }, 'Chelsey & Sterling', '(both)'),
        new DungeonTrainer('Dragon Warriors',
            [
                new GymPokemon('Raticate', 626913, 57),
                new GymPokemon('Drifblim', 626913, 58),
                new GymPokemon('Shiftry', 626913, 59),
                new GymPokemon('Bagon', 626913, 57),
                new GymPokemon('Shelgon', 626913, 57),
                new GymPokemon('Vibrava', 626913, 57),
            ], { weight: 1 }, 'Harlan & Kenny'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Loudred', 626913, 58),
                new GymPokemon('Rampardos', 626913, 59),
                new GymPokemon('Pelipper', 626913, 58),
                new GymPokemon('Wigglytuff', 626913, 58),
                new GymPokemon('Gardevoir', 626913, 59),
                new GymPokemon('Medicham', 626913, 58),
            ], { weight: 1 }, 'Skylar & Narasha'),
        new DungeonTrainer('Hidden Dragons',
            [
                new GymPokemon('Gible', 940369, 57),
                new GymPokemon('Gabite', 940369, 57),
                new GymPokemon('Dragonair', 940369, 57),
                new GymPokemon('Machamp', 940369, 60),
            ], { weight: 1 }, 'Drake & Jarrett'),
    ],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Rawst', weight: 3.75},
        {loot: 'Flame Plate', weight: 2.5},
        {loot: 'Iron Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.25},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Fire_stone', weight: 0},
        {loot: 'Skull Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Stark Mountain'))},
        {loot: 'Armor Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Stark Mountain'))},
    ],
    2821107,
    [
        new DungeonBossPokemon('Skarmory', 14105535, 100),
        new DungeonBossPokemon('Heatran', 14105535, 100),
    ],
    96500, 230);

// Unova
// TODO: Balancing of dungeon Pokemon HP & rewards.

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
                new GymPokemon('Purrloin', 2198326, 6),
                new GymPokemon('Sewaddle', 2198326, 6),
            ], { weight: 1 }, 'Molly'),
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Lillipup', 2198326, 6),
                new GymPokemon('Mareep', 2198326, 6),
            ], { weight: 1 }, 'Orville'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Patrat', 2198326, 6),
                new GymPokemon('Psyduck', 2198326, 6),
            ], { weight: 1 }, 'Kenny'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Pokeball', weight: 4},
        {loot: 'Cheri', weight: 3.5},
        {loot: 'Nanab', weight: 2.5},
        {loot: 'Wepear', weight: 2.5},
    ],
    3297488,
    [new DungeonBossPokemon('Riolu', 16487438, 100)],
    126500, 20);

dungeonList['Liberty Garden'] = new Dungeon('Liberty Garden',
    ['Vulpix', 'Abra', 'Sentret', 'Sunkern', 'Wingull', 'Pidove'],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Figy', weight: 3.75},
        {loot: 'Greatball', weight: 3},
        {loot: 'Flame Plate', weight: 2.5},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Fire_egg', weight: 1},
    ],
    3346604,
    [
        new DungeonBossPokemon('Kadabra', 16733018, 100),
        new DungeonBossPokemon('Chimecho', 16733018, 100),
        new DungeonBossPokemon('Victini', 16733018, 100),
    ],
    136500, 20);

dungeonList['Castelia Sewers'] = new Dungeon('Castelia Sewers',
    [
        {pokemon: 'Rattata', options: { weight: 5.6 }},
        {pokemon: 'Zubat', options: { weight: 5.6 }},
        {pokemon: 'Grimer', options: { weight: 5.6 }},
        {pokemon: 'Muk', options: { weight: 5.6 }},
        {pokemon: 'Trubbish', options: { weight: 5.6 }},
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Lillipup', 2214698, 16),
                new GymPokemon('Trubbish', 2214698, 16),
            ], { weight: 1 }, 'Felix'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Sewaddle', 4429395, 17)],
            { weight: 1 }, 'Heath'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Drilbur', 4429395, 17)],
            { weight: 1 }, 'Zack'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Timburr', 4429395, 17)],
            { weight: 1 }, 'Scott'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Grimer', 4429395, 17)],
            { weight: 1 }, 'Caroline', '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Magnemite', 4429395, 17)],
            { weight: 1 }, 'Clarke', '(male)'),
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Marill', 2214698, 31),
                new GymPokemon('Cinccino', 2214698, 31),
            ], { weight: 1 }, 'Brady'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 3.75},
        {loot: 'Toxic Plate', weight: 2.5},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'SmallRestore', weight: 2},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'Rare Bone', weight: 1.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Heart Scale', weight: 0},
    ],
    3322046,
    [
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Sandile', 16610228, 16)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scraggy', 16610228, 16)],
            { weight: 1 }, undefined, '(female)'),
    ],
    146500, 20);

dungeonList['Relic Passage'] = new Dungeon('Relic Passage',
    [
        {pokemon: 'Rattata', options: { weight: 8 }},
        {pokemon: 'Raticate', options: { weight: 8 }},
        {pokemon: 'Roggenrola', options: { weight: 8 }},
        {pokemon: 'Woobat', options: { weight: 8 }},
        {pokemon: 'Timburr', options: { weight: 8 }},
        new DungeonTrainer('Scientist',
            [new GymPokemon('Grimer', 4797492, 18)],
            { weight: 1 }, 'Terrance', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Venipede', 2398746, 17),
                new GymPokemon('Koffing', 2398746, 17),
            ], { weight: 1 }, 'Lumina', '(female)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Herdier', 4797492, 18)],
            { weight: 1 }, 'Kendall', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Sandslash', 4797492, 32)],
            { weight: 1 }, 'Eileen', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Drilbur', 2398746, 31),
                new GymPokemon('Roggenrola', 2398746, 31),
            ], { weight: 1 }, 'Keith'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Raticate', 4797492, 32)],
            { weight: 1 }, 'Randall', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Roggenrola', 2398746, 31),
                new GymPokemon('Timburr', 2398746, 31),
            ], { weight: 1 }, 'Tobias'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Swoobat', 4797492, 33)],
            { weight: 1 }, 'Tully', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Watchog', 4797492, 32)],
            { weight: 1 }, 'Annie', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Baltoy', 2398746, 32),
                new GymPokemon('Yamask', 2398746, 32),
            ], { weight: 1 }, 'Ena', '(female)'),
    ],
    [
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Item_magnet', weight: 3.75},
        {loot: 'Stone Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Relic Passage'))},
    ],
    3598119,
    [
        new DungeonBossPokemon('Onix', 17990595, 100),
        new DungeonBossPokemon('Drilbur', 17990595, 100),
    ],
    176500, 5);

dungeonList['Relic Castle'] = new Dungeon('Relic Castle',
    [
        {pokemon: 'Sandshrew', options: { weight: 1.33 }},
        {pokemon: 'Sandslash', options: { weight: 1.33 }},
        {pokemon: 'Baltoy', options: { weight: 1.33 }},
        {pokemon: 'Sandile', options: { weight: 1.33 }},
        {pokemon: 'Krokorok', options: { weight: 1.33 }},
        {pokemon: 'Yamask', options: { weight: 1.33 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Gothita', 4594428, 23)],
            { weight: 1 }, 'Dua', '(female)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Solosis', 4594428, 23)],
            { weight: 1 }, 'Low', '(male)'),
    ],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Mago', weight: 3.75},
        {loot: 'Greatball', weight: 3.25},
        {loot: 'Earth Plate', weight: 2.5},
        {loot: 'Insect Plate', weight: 2.25},
        {loot: 'Flame Plate', weight: 2.25},
        {loot: 'Revive', weight: 2},
        {loot: 'Ultraball', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Sun_stone', weight: 0},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Darmanitan (Zen)', weight: 0, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Relic Castle'))},
        {loot: 'Cover Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Relic Castle'))},
        {loot: 'Plume Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Relic Castle'))},
    ],
    3445821,
    [
        new DungeonBossPokemon('Volcarona', 17990595, 35, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex['Relic Passage'])}),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Sigilyph', 17229105, 23)],
            { weight: 1 }, 'Perry', '(male)'),
    ],
    156500, 25);

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
                new GymPokemon('Tranquill', 2347648, 24),
                new GymPokemon('Liepard', 2347648, 24),
            ], { weight: 1 }, 'Galen', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Trubbish', 4695296, 26)],
            { weight: 1 }, 'Serenity', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Emolga', 4695296, 26)],
            { weight: 1 }, 'Forrest', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Larvesta', 939060, 51),
                new GymPokemon('Pinsir', 939060, 51),
                new GymPokemon('Heracross', 939060, 51),
                new GymPokemon('Leavanny', 939060, 51),
                new GymPokemon('Scolipede', 939060, 51),
            ], { weight: 1 }, 'Murphy', '(male)'),
    ],
    [
        {loot: 'Iapapa', weight: 4},
        {loot: 'xClick', weight: 3.75},
        {loot: 'Greatball', weight: 3.75},
        {loot: 'Foongus', weight: 3.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Grass_egg', weight: 1},
        {loot: 'Leaf_stone', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Lostlorn Forest'))},
        {loot: 'Zoroark', weight: 0, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Lostlorn Forest'))},
    ],
    3521472,
    [
        new DungeonBossPokemon('Pinsir', 17607360, 100),
        new DungeonBossPokemon('Heracross', 17607360, 100),
        new DungeonBossPokemon('Emolga', 17607360, 100),
    ],
    166500, 16);

dungeonList['Chargestone Cave'] = new Dungeon('Chargestone Cave',
    [
        {pokemon: 'Nosepass', options: { weight: 8.8 }},
        {pokemon: 'Boldore', options: { weight: 8.8 }},
        {pokemon: 'Joltik', options: { weight: 8.8 }},
        {pokemon: 'Ferroseed', options: { weight: 8.8 }},
        {pokemon: 'Klink', options: { weight: 8.8 }},
        new DungeonTrainer('Guitarist',
            [new GymPokemon('Emolga', 4901020, 30)],
            { weight: 1 }, 'Anna'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Magneton', 4901020, 30)],
            { weight: 1 }, 'Ronald', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Klink', 1633674, 33),
                new GymPokemon('Unfezant', 1633674, 33),
                new GymPokemon('Sandslash', 1633674, 33),
            ], { weight: 1 }, 'Corky', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Ampharos', 4901020, 34)],
            { weight: 1 }, 'Louis', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Aron', 2450510, 32),
                new GymPokemon('Nosepass', 2450510, 32),
            ], { weight: 1 }, 'Otto'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Minccino', 2450510, 33),
                new GymPokemon('Excadrill', 2450510, 33),
            ], { weight: 1 }, 'Briana', '(female)'),
        new DungeonTrainer('Doctor',
            [
                new GymPokemon('Solosis', 2450510, 32),
                new GymPokemon('Gothita', 2450510, 32),
            ], { weight: 1 }, 'Kit'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Joltik', 2450510, 32),
                new GymPokemon('Golbat', 2450510, 32),
            ], { weight: 1 }, 'Lumi', '(female)'),
        new DungeonTrainer('Guitarist',
            [new GymPokemon('Zebstrika', 4901020, 33)],
            { weight: 1 }, 'Beverly'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Onix', 2450510, 32),
                new GymPokemon('Boldore', 2450510, 32),
            ], { weight: 1 }, 'Jeremy'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Stoutland', 1633674, 33),
                new GymPokemon('Krokorok', 1633674, 33),
                new GymPokemon('Ferroseed', 1633674, 33),
            ], { weight: 1 }, 'Vicki', '(female)'),
    ],
    [
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Aguav', weight: 3.75},
        {loot: 'Zap Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Electric_egg', weight: 1},
        {loot: 'Thunder_stone', weight: 0},
        {loot: 'Metal_coat', weight: 0},
    ],
    3675765,
    [
        new DungeonBossPokemon('Drilbur', 18378825, 100),
        new DungeonBossPokemon('Tynamo', 18378825, 100),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Tirtouga', 9189413, 34),
                new GymPokemon('Magmar', 9189413, 34),
            ], { weight: 1 }, 'Mary', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Archen', 9189413, 34),
                new GymPokemon('Electabuzz', 9189413, 34),
            ], { weight: 1 }, 'Shaye', '(male)'),
    ],
    186500, 6);

dungeonList['Mistralton Cave'] = new Dungeon('Mistralton Cave',
    [
        {pokemon: 'Woobat', options: { weight: 4 }},
        {pokemon: 'Aron', options: { weight: 4 }},
        {pokemon: 'Lairon', options: { weight: 4 }},
        {pokemon: 'Boldore', options: { weight: 4 }},
        new DungeonTrainer('Hiker',
            [new GymPokemon('Boldore', 4953456, 32)],
            { weight: 1 }, 'Shelby'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Onix', 4953456, 32)],
            { weight: 1 }, 'Jebediah'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Tirtouga', 2476728, 33),
                new GymPokemon('Axew', 2476728, 33),
            ], { weight: 1 }, 'Geoff', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Archen', 2476728, 33),
                new GymPokemon('Axew', 2476728, 33),
            ], { weight: 1 }, 'Belle', '(female)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Greatball', weight: 3.75},
        {loot: 'Draco Plate', weight: 2.5},
        {loot: 'Fist Plate', weight: 2.5},
        {loot: 'Iron Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Duskball', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Dusk_stone', weight: 0},
    ],
    3715092,
    [
        new DungeonBossPokemon('Drilbur', 18575460, 100),
        new DungeonBossPokemon('Axew', 18575460, 100),
        new DungeonBossPokemon('Cobalion', 18575460, 100),
    ],
    196500, 6);

dungeonList['Celestial Tower'] = new Dungeon('Celestial Tower',
    [
        {pokemon: 'Golbat', options: { weight: 8 }},
        {pokemon: 'Haunter', options: { weight: 8 }},
        {pokemon: 'Misdreavus', options: { weight: 8 }},
        {pokemon: 'Elgyem', options: { weight: 8 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Musharna', 5005891, 36)],
            { weight: 1 }, 'Joyce', '(female)'),
        new DungeonTrainer('School Kid',
            [new GymPokemon('Litwick', 5005891, 35)],
            { weight: 1 }, 'Alberta', '(female)'),
        new DungeonTrainer('Pokéfan',
            [new GymPokemon('Clefairy', 5005891, 35)],
            { weight: 1 }, 'Jude', '(male)'),
        new DungeonTrainer('Pokéfan',
            [new GymPokemon('Cubchoo', 5005891, 35)],
            { weight: 1 }, 'Georgia', '(female)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Espeon', 5005891, 36)],
            { weight: 1 }, 'Micki', '(male)'),
        new DungeonTrainer('Nurse',
            [new GymPokemon('Leavanny', 5005891, 35)],
            { weight: 1 }, 'Dixie'),
        new DungeonTrainer('Socialite',
            [new GymPokemon('Roselia', 5005891, 35)],
            { weight: 1 }, 'Grace'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Umbreon', 5005891, 35)],
            { weight: 1 }, 'Daniel'),
    ],
    [
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Token_collector', weight: 3.75},
        {loot: 'Spooky Plate', weight: 2.5},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
    ],
    3754418,
    [
        new DungeonBossPokemon('Litwick', 18772088, 100),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Elgyem', 9386044, 35),
                new GymPokemon('Duosion', 9386044, 35),
            ], { weight: 1 }, 'Bryce', '(male)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Yamask', 9386044, 35),
                new GymPokemon('Gothorita', 9386044, 35),
            ], { weight: 1 }, 'Sarah', '(female)'),
    ],
    206500, 7);

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
            [new GymPokemon('Zebstrika', 5058999, 37)],
            { weight: 1 }, 'Jeremiah', '(male)'),
        new DungeonTrainer('Cyclist',
            [new GymPokemon('Unfezant', 5058999, 37)],
            { weight: 1 }, 'Adalaide', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Gurdurr', 2529500, 37),
                new GymPokemon('Crustle', 2529500, 37),
            ], { weight: 1 }, 'Markus'),
        new DungeonTrainer('Backpacker',
            [
                new GymPokemon('Golbat', 2529500, 37),
                new GymPokemon('Swanna', 2529500, 37),
            ], { weight: 1 }, 'Kiyo', '(male)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Swoobat', 5058999, 38)],
            { weight: 1 }, 'Derek'),
        new DungeonTrainer('Backpacker',
            [
                new GymPokemon('Golbat', 2529500, 37),
                new GymPokemon('Darmanitan', 2529500, 37),
            ], { weight: 1 }, 'Kumiko', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Boldore', 2529500, 37),
                new GymPokemon('Excadrill', 2529500, 37),
            ], { weight: 1 }, 'Jared'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Vibrava', 2529500, 39),
                new GymPokemon('Camerupt', 2529500, 39),
            ], { weight: 1 }, 'Ray', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Grumpig', 2529500, 37),
                new GymPokemon('Drifblim', 2529500, 37),
            ], { weight: 1 }, 'Cora', '(female)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Gurdurr', 1686333, 37),
                new GymPokemon('Scraggy', 1686333, 37),
                new GymPokemon('Scraggy', 1686333, 37),
            ], { weight: 1 }, 'Corey'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Riolu', 1686333, 37),
                new GymPokemon('Gurdurr', 1686333, 37),
                new GymPokemon('Riolu', 1686333, 37),
            ], { weight: 1 }, 'Chan'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Banette', 2529500, 38),
                new GymPokemon('Golduck', 2529500, 38),
            ], { weight: 1 }, 'Eliza', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Watchog', 2529500, 38),
                new GymPokemon('Camerupt', 2529500, 38),
            ], { weight: 1 }, 'Lewis', '(male)'),
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Persim', weight: 3.75},
        {loot: 'Ultraball', weight: 3},
        {loot: 'Iron Plate', weight: 2.5},
        {loot: 'Flame Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'Fire_egg', weight: 1},
    ],
    3794249,
    [
        new DungeonBossPokemon('Cacturne', 18971243, 100),
        new DungeonBossPokemon('Heatran', 22985858, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)}),
        new DungeonBossPokemon('Excadrill', 18971243, 100),
    ],
    226500, 7);

dungeonList['Team Plasma Assault'] = new Dungeon('Team Plasma Assault',
    [
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Watchog', 2081452, 44),
                new GymPokemon('Muk', 2081452, 44),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Golbat', 2081452, 44),
                new GymPokemon('Garbodor', 2081452, 44),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Seviper', 2081452, 44),
                new GymPokemon('Weezing', 2081452, 44),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Pawniard', 1387635, 46),
                new GymPokemon('Pawniard', 1387635, 46),
                new GymPokemon('Absol', 1387635, 46),
            ], { weight: 1 }, 'Shadow', '(shadow)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Greatball', weight: 3.75},
        {loot: 'Draco Plate', weight: 2.5},
        {loot: 'Icicle Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
    ],
    4162904,
    [
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Cryogonal', 6938173, 46),
                new GymPokemon('Cryogonal', 6938173, 46),
                new GymPokemon('Weavile', 6938173, 48),
            ], { weight: 1 }, 'Zinzolin', '(zinzolin)'),
    ],
    241500, 11);

dungeonList['Seaside Cave'] = new Dungeon('Seaside Cave',
    [
        {pokemon: 'Golduck', options: { weight: 3.5 }},
        {pokemon: 'Seel', options: { weight: 3.5 }},
        {pokemon: 'Shellder', options: { weight: 3.5 }},
        {pokemon: 'Luvdisc', options: { weight: 3.5 }},
        {pokemon: 'Boldore', options: { weight: 3.5 }},
        {pokemon: 'Woobat', options: { weight: 3.5 }},
        {pokemon: 'Frillish', options: { weight: 3.5 }},
        {pokemon: 'Tynamo', options: { weight: 3.5 }},
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Heracross', 5663571, 47)],
            { weight: 1 }, 'Tia'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Vibrava', 2831786, 46),
                new GymPokemon('Gligar', 2831786, 46),
            ], { weight: 1 }, 'Johan', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Onix', 2831786, 46),
                new GymPokemon('Lairon', 2831786, 46),
            ], { weight: 1 }, 'Mikiko', '(female)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Scrafty', 5663571, 47)],
            { weight: 1 }, 'Drago'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Roggenrola', 1415893, 44),
                new GymPokemon('Roggenrola', 1415893, 44),
                new GymPokemon('Roggenrola', 1415893, 44),
                new GymPokemon('Roggenrola', 1415893, 44),
            ], { weight: 1 }, 'Rocky'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Mienfoo', 5663571, 47)],
            { weight: 1 }, 'Maki'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Gurdurr', 5663571, 47)],
            { weight: 1 }, 'Rich'),
    ],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Persim', weight: 3.75},
        {loot: 'Insect Plate', weight: 2.5},
        {loot: 'Stone Plate', weight: 2.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Seaside Cave'))},
        {loot: 'Heart Scale', weight: 0},
    ],
    4247678,
    [
        new DungeonBossPokemon('Crustle', 21238388, 100),
        new DungeonBossPokemon('Eelektrik', 21238388, 100),
    ],
    246500, 9);

dungeonList['Plasma Frigate'] = new Dungeon('Plasma Frigate',
    [
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Watchog', 2210168, 46),
                new GymPokemon('Garbodor', 2210168, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Golbat', 2210168, 46),
                new GymPokemon('Drapion', 2210168, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Seviper', 2210168, 46),
                new GymPokemon('Garbodor', 2210168, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Krookodile', 4420335, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Drapion', 4420335, 47)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Garbodor', 4420335, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Whirlipede', 2210168, 46),
                new GymPokemon('Watchog', 2210168, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Pawniard', 1473445, 45),
                new GymPokemon('Pawniard', 1473445, 45),
                new GymPokemon('Pawniard', 1473445, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Scraggy', 2210168, 46),
                new GymPokemon('Liepard', 2210168, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Weezing', 4420335, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Krokorok', 2210168, 46),
                new GymPokemon('Raticate', 2210168, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Deino', 1473445, 45),
                new GymPokemon('Deino', 1473445, 45),
                new GymPokemon('Sneasel', 1473445, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Scraggy', 1473445, 45),
                new GymPokemon('Krokorok', 1473445, 45),
                new GymPokemon('Golbat', 1473445, 45),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scrafty', 4420335, 47)],
            { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Pokeball', weight: 4},
        {loot: 'Iron Plate', weight: 2.5},
        {loot: 'Zap Plate', weight: 2.5},
        {loot: 'Icicle Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'Magmarizer', weight: 0},
        {loot: 'Electirizer', weight: 0},
        {loot: 'Max Revive', weight: 0},
    ],
    4420335,
    [
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Cryogonal', 7367225, 48),
                new GymPokemon('Cryogonal', 7367225, 48),
                new GymPokemon('Weavile', 7367225, 50),
            ], { weight: 1 }, 'Zinzolin', '(zinzolin)'),
    ],
    257500, 20);

dungeonList['Giant Chasm'] = new Dungeon('Giant Chasm',
    [
        {pokemon: 'Clefairy', options: { weight: 5.33 }},
        {pokemon: 'Poliwag', options: { weight: 5.33 }},
        {pokemon: 'Seel', options: { weight: 5.33 }},
        {pokemon: 'Tangela', options: { weight: 5.33 }},
        {pokemon: 'Ditto', options: { weight: 5.33 }},
        {pokemon: 'Sneasel', options: { weight: 5.33 }},
        {pokemon: 'Piloswine', options: { weight: 5.33 }},
        {pokemon: 'Delibird', options: { weight: 5.33 }},
        {pokemon: 'Pelipper', options: { weight: 5.33 }},
        {pokemon: 'Lunatone', options: { weight: 5.33 }},
        {pokemon: 'Solrock', options: { weight: 5.33 }},
        {pokemon: 'Metang', options: { weight: 5.33 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 5.33 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 5.33 }},
        {pokemon: 'Vanillish', options: { weight: 5.33 }},
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Weezing', 2976188, 46),
                new GymPokemon('Muk', 2976188, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Scraggy', 1984126, 46),
                new GymPokemon('Scrafty', 1984126, 46),
                new GymPokemon('Whirlipede', 1984126, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Trubbish', 1984126, 46),
                new GymPokemon('Golbat', 1984126, 46),
                new GymPokemon('Garbodor', 1984126, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Skorupi', 1984126, 45),
                new GymPokemon('Foongus', 1984126, 45),
                new GymPokemon('Golbat', 1984126, 45),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Krookodile', 5952376, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Leavanny', 5952376, 49)],
            { weight: 1 }, 'Julius'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scrafty', 5952376, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scolipede', 5952376, 47)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Trubbish', 2976188, 46),
                new GymPokemon('Zangoose', 2976188, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Grimer', 2976188, 46),
                new GymPokemon('Seviper', 2976188, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Raticate', 2976188, 47),
                new GymPokemon('Watchog', 2976188, 47),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Krokorok', 2976188, 47),
                new GymPokemon('Krookodile', 2976188, 47),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Drapion', 5952376, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Deino', 1984126, 45),
                new GymPokemon('Deino', 1984126, 45),
                new GymPokemon('Sneasel', 1984126, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Koffing', 2976188, 46),
                new GymPokemon('Amoonguss', 2976188, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Cryogonal', 1984126, 49),
                new GymPokemon('Cryogonal', 1984126, 49),
                new GymPokemon('Weavile', 1984126, 51),
            ], { weight: 1 }, 'Zinzolin', '(zinzolin)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Magneton', 1190476, 50),
                new GymPokemon('Beheeyem', 1190476, 50),
                new GymPokemon('Metang', 1190476, 50),
                new GymPokemon('Magnezone', 1190476, 50),
                new GymPokemon('Klinklang', 1190476, 52),
            ], { weight: 1 }, 'Colress', '(colress)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Pawniard', 1984126, 49),
                new GymPokemon('Pawniard', 1984126, 49),
                new GymPokemon('Absol', 1984126, 51),
            ], { weight: 1 }, 'Shadow', '(shadow)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Pawniard', 1984126, 49),
                new GymPokemon('Pawniard', 1984126, 49),
                new GymPokemon('Banette', 1984126, 51),
            ], { weight: 1 }, 'Shadow', '(shadow)'),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Pawniard', 1984126, 49),
                new GymPokemon('Pawniard', 1984126, 49),
                new GymPokemon('Accelgor', 1984126, 51),
            ], { weight: 1 }, 'Shadow', '(shadow)'),
    ],
    [
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Aspear', weight: 3.75},
        {loot: 'Amoonguss', weight: 3.25},
        {loot: 'Icicle Plate', weight: 2.5},
        {loot: 'Draco Plate', weight: 2.25},
        {loot: 'Dread Plate', weight: 2.25},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Razor_claw', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Sun_stone', weight: 0},
    ],
    4464282,
    [
        new DungeonBossPokemon('Tangrowth', 22321410, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Mamoswine', 22321410, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Audino', 22321410, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Giant Chasm'))}),
        new DungeonBossPokemon('Kyurem', 22985858, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)}),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Cofagrigus', 3720235, 50),
                new GymPokemon('Seismitoad', 3720235, 50),
                new GymPokemon('Eelektross', 3720235, 50),
                new GymPokemon('Drapion', 3720235, 50),
                new GymPokemon('Toxicroak', 3720235, 50),
                new GymPokemon('Hydreigon', 3720235, 52),
            ], { weight: 1 }, 'Ghetsis', '(ghetsis)'),
    ],
    266500, 22);

dungeonList['Cave of Being'] = new Dungeon('Cave of Being',
    ['Golbat', 'Kadabra', 'Graveler', 'Onix', 'Woobat', 'Gurdurr'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Token_collector', weight: 4},
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Mind Plate', weight: 2.5},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Water_egg', weight: 1},
        {loot: 'Grass_egg', weight: 1},
        {loot: 'Electric_egg', weight: 1},
        {loot: 'Fighting_egg', weight: 1},
        {loot: 'Dragon_egg', weight: 1},
    ],
    4508229,
    [
        new DungeonBossPokemon('Uxie', 22541145, 100),
        new DungeonBossPokemon('Mesprit', 22541145, 100),
        new DungeonBossPokemon('Azelf', 22541145, 100),
    ],
    286500, 20);

dungeonList['Abundant Shrine'] = new Dungeon('Abundant Shrine',
    [
        {pokemon: 'Vulpix', options: { weight: 1.45 }},
        {pokemon: 'Golduck', options: { weight: 1.45 }},
        {pokemon: 'Goldeen', options: { weight: 1.45 }},
        {pokemon: 'Marill', options: { weight: 1.45 }},
        {pokemon: 'Azumarill', options: { weight: 1.45 }},
        {pokemon: 'Swablu', options: { weight: 1.45 }},
        {pokemon: 'Bronzor', options: { weight: 1.45 }},
        {pokemon: 'Cottonee', options: { weight: 1.45 }},
        {pokemon: 'Petilil', options: { weight: 1.45 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 1.45 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 1.45 }},
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Skorupi', 3005486, 39),
                new GymPokemon('Seviper', 3005486, 39),
            ], { weight: 1 }, 'Wes'),
        new DungeonTrainer('Twins',
            [
                new GymPokemon('Swablu', 3005486, 38),
                new GymPokemon('Swablu', 3005486, 38),
            ], { weight: 1 }, 'Rae & Ula'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Deerling (Spring)', 3005486, 39),
                new GymPokemon('Zangoose', 3005486, 39),
            ], { weight: 1 }, 'Lurleen'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Karrablast', 1502744, 37),
                new GymPokemon('Shelmet', 1502744, 37),
                new GymPokemon('Joltik', 1502744, 37),
                new GymPokemon('Scolipede', 1502744, 37),
            ], { weight: 1 }, 'Jaye'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Mago', weight: 3.75},
        {loot: 'Ultraball', weight: 3.5},
        {loot: 'Amoonguss', weight: 3.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Fighting_egg', weight: 1},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Razor_fang', weight: 0},
        {loot: 'Shiny_stone', weight: 0},
    ],
    4508229,
    [
        new DungeonBossPokemon('Altaria', 22541145, 100),
        new DungeonBossPokemon('Bronzong', 22541145, 100),
        new DungeonBossPokemon('Landorus', 22541145, 100),
    ],
    306500, 14);

dungeonList['Victory Road Unova'] = new Dungeon('Victory Road Unova',
    [
        {pokemon: 'Poliwag', options: { weight: 6.67 }},
        {pokemon: 'Onix', options: { weight: 6.67 }},
        {pokemon: 'Marill', options: { weight: 6.67 }},
        {pokemon: 'Roselia', options: { weight: 6.67 }},
        {pokemon: 'Altaria', options: { weight: 6.67 }},
        {pokemon: 'Banette', options: { weight: 6.67 }},
        {pokemon: 'Buizel', options: { weight: 6.67 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 6.67 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 6.67 }},
        {pokemon: 'Boldore', options: { weight: 6.67 }},
        {pokemon: 'Cottonee', options: { weight: 6.67 }},
        {pokemon: 'Petilil', options: { weight: 6.67 }},
        {pokemon: 'Tranquill', options: { weight: 6.67 }},
        {pokemon: 'Unfezant', options: { weight: 6.67 }},
        {pokemon: 'Gurdurr', options: { weight: 6.67 }},
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Golurk', 3005486, 55),
                new GymPokemon('Sigilyph', 3005486, 55),
            ], { weight: 1 }, 'Billy', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Drifblim', 3005486, 55),
                new GymPokemon('Claydol', 3005486, 55),
            ], { weight: 1 }, 'Jamie', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Lampent', 3005486, 54),
                new GymPokemon('Musharna', 3005486, 54),
            ], { weight: 1 }, 'Alia', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Metang', 3005486, 54),
                new GymPokemon('Cofagrigus', 3005486, 54),
            ], { weight: 1 }, 'Al', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Braviary', 3005486, 55),
                new GymPokemon('Carracosta', 3005486, 55),
            ], { weight: 1 }, 'Claude', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Mandibuzz', 3005486, 55),
                new GymPokemon('Archeops', 3005486, 55),
            ], { weight: 1 }, 'Cecile', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Darmanitan', 3005486, 55),
                new GymPokemon('Tangrowth', 3005486, 55),
            ], { weight: 1 }, 'Chandra', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Whimsicott', 3005486, 55),
                new GymPokemon('Unfezant', 3005486, 55),
            ], { weight: 1 }, 'Beckett', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Swoobat', 3005486, 55),
                new GymPokemon('Lilligant', 3005486, 55),
            ], { weight: 1 }, 'Shelly', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Sigilyph', 3005486, 55),
                new GymPokemon('Crobat', 3005486, 55),
            ], { weight: 1 }, 'Cathy', '(female)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Clefable', 6010972, 54)],
            { weight: 1 }, 'Logan'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Sawsbuck (Spring)', 6010972, 54)],
            { weight: 1 }, 'Mae', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Swanna', 3005486, 55),
                new GymPokemon('Ampharos', 3005486, 55),
            ], { weight: 1 }, 'Pierce', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Gigalith', 3005486, 55),
                new GymPokemon('Skarmory', 3005486, 55),
            ], { weight: 1 }, 'Abraham', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Heatmor', 3005486, 55),
                new GymPokemon('Galvantula', 3005486, 55),
            ], { weight: 1 }, 'Shanta', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Durant', 3005486, 55),
                new GymPokemon('Ferrothorn', 3005486, 55),
            ], { weight: 1 }, 'Webster', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Electabuzz', 3005486, 54),
                new GymPokemon('Probopass', 3005486, 54),
            ], { weight: 1 }, 'Eddie', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Magmar', 3005486, 54),
                new GymPokemon('Camerupt', 3005486, 54),
            ], { weight: 1 }, 'Elle', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Fraxure', 2003658, 54),
                new GymPokemon('Zweilous', 2003658, 54),
                new GymPokemon('Flygon', 2003658, 54),
            ], { weight: 1 }, 'Hugo', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Pinsir', 3005486, 54),
                new GymPokemon('Heracross', 3005486, 54),
            ], { weight: 1 }, 'Martell'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Throh', 3005486, 54),
                new GymPokemon('Sawk', 3005486, 54),
            ], { weight: 1 }, 'Chalina'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Zweilous', 3005486, 55),
                new GymPokemon('Eelektross', 3005486, 55),
            ], { weight: 1 }, 'Elmer', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Fraxure', 3005486, 55),
                new GymPokemon('Vanilluxe', 3005486, 55),
            ], { weight: 1 }, 'Caroll', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Zebstrika', 2003658, 54),
                new GymPokemon('Sawk', 2003658, 54),
                new GymPokemon('Starmie', 2003658, 54),
            ], { weight: 1 }, 'Portia', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Beartic', 2003658, 54),
                new GymPokemon('Throh', 2003658, 54),
                new GymPokemon('Golurk', 2003658, 54),
            ], { weight: 1 }, 'Sterling', '(male)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Zoroark', weight: 3.25},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Dusk_stone', weight: 0},
        {loot: 'Dragon_scale', weight: 0},
        {loot: 'Max Revive', weight: 0},
    ],
    4508229,
    [
        new DungeonBossPokemon('Audino', 22541145, 100),
        new DungeonBossPokemon('Druddigon', 22541145, 100),
        new DungeonBossPokemon('Golurk', 22541145, 100),
        new DungeonBossPokemon('Terrakion', 22541145, 100),
    ],
    326500, 23);

dungeonList['Twist Mountain'] = new Dungeon('Twist Mountain',
    [
        {pokemon: 'Onix', options: { weight: 10.4 }},
        {pokemon: 'Boldore', options: { weight: 10.4 }},
        {pokemon: 'Woobat', options: { weight: 10.4 }},
        {pokemon: 'Gurdurr', options: { weight: 10.4 }},
        {pokemon: 'Beartic', options: { weight: 10.4 }},
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Roggenrola', 2043188, 60),
                new GymPokemon('Graveler', 2043188, 60),
                new GymPokemon('Excadrill', 2043188, 60),
            ], { weight: 1 }, 'Cairn'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Tauros', 2043188, 64),
                new GymPokemon('Crobat', 2043188, 64),
                new GymPokemon('Carracosta', 2043188, 64),
            ], { weight: 1 }, 'Carter', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Glaceon', 1532390, 63),
                new GymPokemon('Bastiodon', 1532390, 63),
                new GymPokemon('Rhyperior', 1532390, 63),
                new GymPokemon('Drapion', 1532390, 63),
            ], { weight: 1 }, 'Julia', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Golett', 3064782, 61),
                new GymPokemon('Mamoswine', 3064782, 61),
            ], { weight: 1 }, 'Wade'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Geodude', 2043188, 60),
                new GymPokemon('Steelix', 2043188, 60),
                new GymPokemon('Boldore', 2043188, 60),
            ], { weight: 1 }, 'Gus'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Machoke', 3064782, 61),
                new GymPokemon('Abomasnow', 3064782, 61),
            ], { weight: 1 }, 'Patton', '(ice)'),
        new DungeonTrainer('Nurse',
            [new GymPokemon('Blissey', 6129563, 62)],
            { weight: 1 }, 'Carol'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Gyarados', 2043188, 64),
                new GymPokemon('Kangaskhan', 2043188, 64),
                new GymPokemon('Archeops', 2043188, 64),
            ], { weight: 1 }, 'Chloris', '(female)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Sigilyph', 6129563, 62)],
            { weight: 1 }, 'Cliff'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Larvitar', 3064782, 61),
                new GymPokemon('Probopass', 3064782, 61),
            ], { weight: 1 }, 'Hunter'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Glalie', 3064782, 61),
                new GymPokemon('Beartic', 3064782, 61),
            ], { weight: 1 }, 'Victor', '(ice)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Smoochum', 2043188, 60),
                new GymPokemon('Claydol', 2043188, 60),
                new GymPokemon('Kadabra', 2043188, 60),
            ], { weight: 1 }, 'Ryan', '(ice)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Weavile', 1532390, 63),
                new GymPokemon('Rampardos', 1532390, 63),
                new GymPokemon('Toxicroak', 1532390, 63),
                new GymPokemon('Aggron', 1532390, 63),
            ], { weight: 1 }, 'Zach', '(male)'),
    ],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Greatball', weight: 3.75},
        {loot: 'Revive', weight: 2},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Duskball', weight: 2},
        {loot: 'Rare Bone', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Helix Fossil', weight: 0},
        {loot: 'Dome Fossil', weight: 0},
        {loot: 'Old Amber', weight: 0},
        {loot: 'Root Fossil', weight: 0},
        {loot: 'Claw Fossil', weight: 0},
        {loot: 'Skull Fossil', weight: 0},
        {loot: 'Armor Fossil', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Dusk_stone', weight: 0},
        {loot: 'Metal_coat', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Twist Mountain'))},
    ],
    4597172,
    [
        new DungeonBossPokemon('Regigigas', 22985858, 100),
        new DungeonBossPokemon('Cryogonal', 22985858, 100),
        new DungeonBossPokemon('Heatmor', 22985858, 100),
        new DungeonBossPokemon('Durant', 22985858, 100),
    ],
    356500, 8);

dungeonList['Dragonspiral Tower'] = new Dungeon('Dragonspiral Tower',
    ['Dratini', 'Tranquill', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Vanillish', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)', 'Beartic', 'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Razz', weight: 3.5},
        {loot: 'Pinap', weight: 3.5},
        {loot: 'Draco Plate', weight: 2.5},
        {loot: 'Zap Plate', weight: 2.5},
        {loot: 'Flame Plate', weight: 2.5},
        {loot: 'Icicle Plate', weight: 2},
        {loot: 'Spooky Plate', weight: 2},
        {loot: 'Splash Plate', weight: 2},
        {loot: 'Iron Plate', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Electric_egg', weight: 1},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Shiny_stone', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Dragonspiral Tower'))},
        {loot: 'Heart Scale', weight: 0},
    ],
    5057763,
    [
        new DungeonBossPokemon('Dragonite', 25288815, 100),
        new DungeonBossPokemon('Reshiram', 25288815, 100),
        new DungeonBossPokemon('Zekrom', 25288815, 100),
    ],
    356500, 17);

dungeonList['Moor of Icirrus'] = new Dungeon('Moor of Icirrus',
    [
        {pokemon: 'Barboach', options: { weight: 2.67 }},
        {pokemon: 'Croagunk', options: { weight: 2.67 }},
        {pokemon: 'Palpitoad', options: { weight: 2.67 }},
        {pokemon: 'Karrablast', options: { weight: 2.67 }},
        {pokemon: 'Shelmet', options: { weight: 2.67 }},
        {pokemon: 'Stunfisk', options: { weight: 2.67 }},
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Accelgor', 2206006, 62),
                new GymPokemon('Swalot', 2206006, 62),
                new GymPokemon('Kecleon', 2206006, 62),
            ], { weight: 1 }, 'Elaine', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Escavalier', 2206006, 62),
                new GymPokemon('Skuntank', 2206006, 62),
                new GymPokemon('Carnivine', 2206006, 62),
            ], { weight: 1 }, 'Parker', '(male)'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Corphish', 2206006, 60),
                new GymPokemon('Poliwag', 2206006, 60),
                new GymPokemon('Stunfisk', 2206006, 60),
            ], { weight: 1 }, 'Eustace'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Poliwhirl', 2206006, 60),
                new GymPokemon('Whiscash', 2206006, 60),
                new GymPokemon('Politoed', 2206006, 60),
            ], { weight: 1 }, 'Arnold'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Greatball', weight: 3},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Lum', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Moor of Icirrus'))},
        {loot: 'Heart Scale', weight: 0},
        {loot: 'Dawn_stone', weight: 0},
    ],
    4963514,
    [
        new DungeonBossPokemon('Whiscash', 24817568, 100),
        new DungeonBossPokemon('Seismitoad', 24817568, 100),
        new DungeonBossPokemon('Keldeo', 24817568, 100),
    ],
    356500, 1);

dungeonList['Pledge Grove'] = new Dungeon('Pledge Grove',
    ['Fearow', 'Furret', 'Ledian', 'Sudowoodo', 'Stantler', 'Breloom', 'Unfezant', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)'],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Lucky_egg', weight: 3.75},
        {loot: 'Ultraball', weight: 3.5},
        {loot: 'Splash Plate', weight: 2.5},
        {loot: 'Fist Plate', weight: 2.5},
        {loot: 'Fire_stone', weight: 0},
        {loot: 'Water_stone', weight: 0},
        {loot: 'Leaf_stone', weight: 0},
        {loot: 'Thunder_stone', weight: 0},
        {loot: 'Trade_stone', weight: 0},
        {loot: 'Sun_stone', weight: 0},
        {loot: 'Soothe_bell', weight: 0},
    ],
    5153087,
    [new DungeonBossPokemon('Keldeo (Resolute)', 25765433, 100)],
    356500, 18);

dungeonList['Pinwheel Forest'] = new Dungeon('Pinwheel Forest',
    [
        {pokemon: 'Goldeen', options: { weight: 6.57 }},
        {pokemon: 'Marill', options: { weight: 6.57 }},
        {pokemon: 'Yanma', options: { weight: 6.57 }},
        {pokemon: 'Vigoroth', options: { weight: 6.57 }},
        {pokemon: 'Toxicroak', options: { weight: 6.57 }},
        {pokemon: 'Gurdurr', options: { weight: 6.57 }},
        {pokemon: 'Tympole', options: { weight: 6.57 }},
        {pokemon: 'Palpitoad', options: { weight: 6.57 }},
        {pokemon: 'Swadloon', options: { weight: 6.57 }},
        {pokemon: 'Whirlipede', options: { weight: 6.57 }},
        {pokemon: 'Cottonee', options: { weight: 6.57 }},
        {pokemon: 'Petilil', options: { weight: 6.57 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 6.57 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 6.57 }},
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Wooper', 3064782, 60),
                new GymPokemon('Tympole', 3064782, 60),
            ], { weight: 1 }, 'Jojo', '(male)'),
        new DungeonTrainer('Nursery Aide',
            [
                new GymPokemon('Exeggcute', 3064782, 61),
                new GymPokemon('Miltank', 3064782, 61),
            ], { weight: 1 }, 'Ethel'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Dratini', 2043188, 59),
                new GymPokemon('Gible', 2043188, 59),
                new GymPokemon('Bagon', 2043188, 59),
            ], { weight: 1 }, 'Samantha', '(female)'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Burmy (plant)', 2043188, 59),
                new GymPokemon('Scyther', 2043188, 59),
                new GymPokemon('Paras', 2043188, 59),
            ], { weight: 1 }, 'José', '(male)'),
        new DungeonTrainer('Twins',
            [
                new GymPokemon('Plusle', 3064782, 60),
                new GymPokemon('Minun', 3064782, 60),
            ], { weight: 1 }, 'Ally & Amy'),
        new DungeonTrainer('Nursery Aide',
            [
                new GymPokemon('Chansey', 3064782, 61),
                new GymPokemon('Leavanny', 3064782, 61),
            ], { weight: 1 }, 'Rosalyn'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Pineco', 3064782, 60),
                new GymPokemon('Ferrothorn', 3064782, 60),
            ], { weight: 1 }, 'Ike', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Sudowoodo', 2043188, 62),
                new GymPokemon('Gloom', 2043188, 62),
                new GymPokemon('Beartic', 2043188, 62),
            ], { weight: 1 }, 'Hillary', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Weepinbell', 2043188, 62),
                new GymPokemon('Luxray', 2043188, 62),
                new GymPokemon('Ursaring', 2043188, 62),
            ], { weight: 1 }, 'Dwayne', '(male)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Mankey', 2043188, 60),
                new GymPokemon('Snubbull', 2043188, 60),
                new GymPokemon('Crawdaunt', 2043188, 60),
            ], { weight: 1 }, 'Keita'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Electrike', 2043188, 62),
                new GymPokemon('Rapidash', 2043188, 62),
                new GymPokemon('Farfetch\'d', 2043188, 62),
            ], { weight: 1 }, 'Ralph', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Crobat', 2043188, 64),
                new GymPokemon('Magmortar', 2043188, 64),
                new GymPokemon('Leafeon', 2043188, 64),
            ], { weight: 1 }, 'Rosaline', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Ludicolo', 2043188, 64),
                new GymPokemon('Electivire', 2043188, 64),
                new GymPokemon('Forretress', 2043188, 64),
            ], { weight: 1 }, 'Sinan', '(male)'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Nidoran(F)', 2043188, 60),
                new GymPokemon('Nidoran(M)', 2043188, 60),
                new GymPokemon('Nidoqueen', 2043188, 60),
            ], { weight: 1 }, 'Helia'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Cascoon', 2043188, 60),
                new GymPokemon('Silcoon', 2043188, 60),
                new GymPokemon('Scolipede', 2043188, 60),
            ], { weight: 1 }, 'Henley'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Munchlax', 2043188, 62),
                new GymPokemon('Zebstrika', 2043188, 62),
                new GymPokemon('Kricketune', 2043188, 62),
            ], { weight: 1 }, 'Melita', '(female)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Phanpy', 2043188, 60),
                new GymPokemon('Doduo', 2043188, 60),
                new GymPokemon('Fearow', 2043188, 60),
            ], { weight: 1 }, 'Nicholas'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Oddish', 2043188, 60),
                new GymPokemon('Tangela', 2043188, 60),
                new GymPokemon('Bellossom', 2043188, 60),
            ], { weight: 1 }, 'Millie', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Furret', 2043188, 63),
                new GymPokemon('Braviary', 2043188, 63),
                new GymPokemon('Seismitoad', 2043188, 63),
            ], { weight: 1 }, 'Kelsey', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Linoone', 2043188, 63),
                new GymPokemon('Mandibuzz', 2043188, 63),
                new GymPokemon('Toxicroak', 2043188, 63),
            ], { weight: 1 }, 'Kathrine', '(female)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Tyrogue', 2043188, 61),
                new GymPokemon('Scrafty', 2043188, 61),
                new GymPokemon('Makuhita', 2043188, 61),
            ], { weight: 1 }, 'Kentaro'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Tyrogue', 2043188, 61),
                new GymPokemon('Machop', 2043188, 61),
                new GymPokemon('Poliwrath', 2043188, 61),
            ], { weight: 1 }, 'Lee'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Venonat', 2043188, 60),
                new GymPokemon('Yanma', 2043188, 60),
                new GymPokemon('Venomoth', 2043188, 60),
            ], { weight: 1 }, 'Keston', '(male)'),
    ],
    [
        {loot: 'Chesto', weight: 4},
        {loot: 'Pecha', weight: 4},
        {loot: 'Sitrus', weight: 4},
        {loot: 'Amoonguss', weight: 3.5},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Meadow Plate', weight: 2.5},
        {loot: 'Fist Plate', weight: 2.5},
        {loot: 'Ultraball', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Upgrade', weight: 0},
        {loot: 'Sun_stone', weight: 0},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Protein', weight: 0},
        {loot: 'Lum', weight: 0, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pinwheel Forest'))},
    ],
    4597172,
    [
        new DungeonBossPokemon('Seismitoad', 22985858, 100),
        new DungeonBossPokemon('Scolipede', 22985858, 100),
        new DungeonBossPokemon('Virizion', 22985858, 100),
    ],
    356500, 8);

dungeonList['Dreamyard'] = new Dungeon('Dreamyard',
    [
        {pokemon: 'Raticate', options: { weight: 4.67 }},
        {pokemon: 'Jigglypuff', options: { weight: 4.67 }},
        {pokemon: 'Golbat', options: { weight: 4.67 }},
        {pokemon: 'Watchog', options: { weight: 4.67 }},
        {pokemon: 'Liepard', options: { weight: 4.67 }},
        {pokemon: 'Munna', options: { weight: 4.67 }},
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Hypno', 3185490, 62),
                new GymPokemon('Dusclops', 3185490, 62),
            ], { weight: 1 }, 'Nandor', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Gastly', 3185490, 63),
                new GymPokemon('Skuntank', 3185490, 63),
            ], { weight: 1 }, 'Athena', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Chingling', 3185490, 62),
                new GymPokemon('Mr. Mime', 3185490, 62),
            ], { weight: 1 }, 'Olesia', '(female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Klang', 3185490, 63),
                new GymPokemon('Porygon', 3185490, 63),
            ], { weight: 1 }, 'Franklin', '(male)'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Shroomish', 3185490, 63),
                new GymPokemon('Tangrowth', 3185490, 63),
            ], { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Slakoth', 3185490, 63),
                new GymPokemon('Slaking', 3185490, 63),
            ], { weight: 1 }, 'Keita'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Igglybuff', 3185490, 63),
                new GymPokemon('Lickilicky', 3185490, 63),
            ], { weight: 1 }, 'Rita', '(female)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Pokeball', weight: 4},
        {loot: 'Mind Plate', weight: 2.75},
        {loot: 'Draco Plate', weight: 2.5},
        {loot: 'SmallRestore', weight: 2},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Reaper_cloth', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Dawn_stone', weight: 0},
    ],
    4778219,
    [
        new DungeonBossPokemon('Dunsparce', 23891093, 100),
        new DungeonBossPokemon('Latias', 23891093, 100),
        new DungeonBossPokemon('Latios', 23891093, 100),
        new DungeonBossPokemon('Audino', 23891093, 100),
    ],
    356500, 3);

dungeonList['P2 Laboratory'] = new Dungeon('P2 Laboratory',
    ['Electrode', 'Scyther', 'Pineco', 'Forretress', 'Metang', 'Ferroseed', 'Ferrothorn'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 3.5},
        {loot: 'Token_collector', weight: 3.5},
        {loot: 'Forretress', weight: 3.25},
        {loot: 'Iron Plate', weight: 2.75},
        {loot: 'Insect Plate', weight: 2.75},
        {loot: 'Zap Plate', weight: 2.5},
        {loot: 'Revive', weight: 2},
        {loot: 'Dubious_disc', weight: 0},
    ],
    5153087,
    [
        new DungeonBossPokemon('Ursaring', 25765433, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Mawile', 25765433, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Sableye', 25765433, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Zangoose', 25765433, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Audino', 25765433, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Durant', 25765433, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Genesect', 25765433, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Magneton', 4294239, 72),
                new GymPokemon('Rotom (wash)', 4294239, 72),
                new GymPokemon('Metagross', 4294239, 72),
                new GymPokemon('Beheeyem', 4294239, 72),
                new GymPokemon('Magnezone', 4294239, 72),
                new GymPokemon('Klinklang', 4294239, 74),
            ], { weight: 1 }, 'Colress', '(colress)'),
    ],
    396500, 18);

// Kalos
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Santalune Forest'] = new Dungeon('Santalune Forest',
    [
        {pokemon: 'Caterpie', options: { weight: 0.88 }},
        {pokemon: 'Metapod', options: { weight: 0.88 }},
        {pokemon: 'Weedle', options: { weight: 0.88 }},
        {pokemon: 'Kakuna', options: { weight: 0.88}},
        {pokemon: 'Pansage', options: { weight: 0.88 }},
        {pokemon: 'Pansear', options: { weight: 0.88 }},
        {pokemon: 'Panpour', options: { weight: 0.88 }},
        {pokemon: 'Fletchling', options: { weight: 0.88 }},
        {pokemon: 'Scatterbug', options: { weight: 0.88 }},
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Scatterbug', 3713178, 3),
                new GymPokemon('Fletchling', 3713178, 3),
            ], { weight: 1 }, 'Joey'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Pikachu', 7426355, 5)],
            { weight: 1 }, 'Anna'),
    ],
    [

        {loot: 'Pokeball', weight: 4},
        {loot: 'Lucky_incense', weight: 3.75},
        {loot: 'Insect Plate', weight: 2.75},
        {loot: 'Fist Plate', weight: 2.5},
        {loot: 'SmallRestore', weight: 2},
        {loot: 'Fighting_egg', weight: 1},
    ],
    5569766,
    [
        new DungeonBossPokemon('Pikachu', 27848828, 4),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Weedle', 13924414, 2),
                new GymPokemon('Bunnelby', 13924414, 4),
            ], { weight: 1 }, 'Lise'),
    ],
    400000, 2
);

dungeonList['Parfum Palace'] = new Dungeon('Parfum Palace',
    ['Goldeen', 'Seaking', 'Magikarp', 'Gyarados', 'Corphish', 'Crawdaunt'],
    [
        {loot: 'Oran', weight: 4},
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Revive', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
    ],
    6094569,
    [new DungeonBossPokemon('Furfrou', 30472845, 50)],
    445000, 6);

dungeonList['Connecting Cave'] = new Dungeon('Connecting Cave',
    [
        {pokemon: 'Zubat', options: { weight: 1.33 }},
        {pokemon: 'Whismur', options: { weight: 1.33 }},
        {pokemon: 'Meditite', options: { weight: 1.33 }},
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'Wepear', weight: 3},
        {loot: 'Toxic Plate', weight: 2.75},
        {loot: 'Sky Plate', weight: 2.75},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Damp Rock', weight: 2},
    ],
    6202973,
    [
        new DungeonBossPokemon('Axew', 31014863, 20),
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Ducklett', 7753716, 12),
                new GymPokemon('Pikachu', 7753716, 12),
                new GymPokemon('Litleo', 7753716, 12),
                new GymPokemon('Oddish', 7753716, 12),
            ],
            { weight: 1 }, 'Mercy', '(female)'),
    ],
    475000, 7);

dungeonList['Glittering Cave'] = new Dungeon('Glittering Cave',
    [
        {pokemon: 'Machop', options: { weight: .88 }},
        {pokemon: 'Cubone', options: { weight: .88 }},
        {pokemon: 'Rhyhorn', options: { weight: .88 }},
        {pokemon: 'Lunatone', options: { weight: .88 }},
        {pokemon: 'Solrock', options: { weight: .88 }},
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Houndour', 4282174, 18),
                new GymPokemon('Zubat', 4282174, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Gulpin', 4282174, 18),
                new GymPokemon('Electrike', 4282174, 18),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'Old Amber', weight: 0.5},
        {loot: 'Skull Fossil', weight: 0.5},
        {loot: 'Armor Fossil', weight: 0.5},
        {loot: 'Dome Fossil', weight: 0.5},
        {loot: 'Helix Fossil', weight: 0.5},
        {loot: 'Cover Fossil', weight: 0.5},
        {loot: 'Plume Fossil', weight: 0.5},
        {loot: 'Claw Fossil', weight: 0.5},
        {loot: 'Root Fossil', weight: 0.5},
        {loot: 'Jaw Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Glittering Cave'))},
        {loot: 'Sail Fossil', weight: 0, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Glittering Cave'))},
    ],
    6423260,
    [
        new DungeonBossPokemon('Kangaskhan', 32116298, 20),
        new DungeonBossPokemon('Mawile', 32116298, 20),
        new DungeonTrainer('Team Flare Grunt Duo',
            [
                new GymPokemon('Scraggy', 16058149, 20),
                new GymPokemon('Croagunk', 16058149, 20),
            ], { weight: 1 }, undefined),
    ],
    505000, 9);

dungeonList['Reflection Cave'] = new Dungeon('Reflection Cave',
    [
        {pokemon: 'Mr. Mime', options: { weight: 4 }},
        {pokemon: 'Wobbuffet', options: { weight: 4 }},
        {pokemon: 'Sableye', options: { weight: 4 }},
        {pokemon: 'Chingling', options: { weight: 4 }},
        {pokemon: 'Roggenrola', options: { weight: 4 }},
        {pokemon: 'Solosis', options: { weight: 4 }},
        {pokemon: 'Carbink', options: { weight: 4 }},
        {pokemon: 'Mime Jr.', options: { weight: 4 }},
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Linoone', 8864284, 26)],
            { weight: 1 }, 'Lane', '(male)'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Throh', 4432142, 25),
                new GymPokemon('Hawlucha', 4432142, 26),
            ], { weight: 1 }, 'Hedvig'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Sandile', 2954762, 23),
                new GymPokemon('Dwebble', 2954762, 23),
                new GymPokemon('Diggersby', 2954762, 24),
            ], { weight: 1 }, 'Dunstan'),
        new DungeonTrainer('Tourist',
            [new GymPokemon('Nidorina', 8864284, 26)],
            { weight: 1 }, 'Monami', '(female)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Sawk', 8864284, 28)],
            { weight: 1 }, 'Igor'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Chimecho', 4432142, 24),
                new GymPokemon('Golett', 4432142, 24),
            ], { weight: 1 }, 'Franz', '(male)'),
        new DungeonTrainer('Tourist',
            [new GymPokemon('Nidorino', 8864284, 26)],
            { weight: 1 }, 'Haruto', '(male)'),
        new DungeonTrainer('Honeymooners',
            [
                new GymPokemon('Combee', 4432142, 26),
                new GymPokemon('Vespiquen', 4432142, 26),
            ], { weight: 1 }, 'Yuu & Ami'),
    ],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Lucky_egg', weight: 4},
        {loot: 'Fist Plate', weight: 2.75},
        {loot: 'Earth Plate', weight: 2.75},
        {loot: 'Mind Plate', weight: 2.75},
        {loot: 'Revive', weight: 2},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Moon_stone', weight: 0},
    ],
    6648213,
    [
        new DungeonBossPokemon('Diancie', 127687090, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)}),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Absol', 16620533, 26),
                new GymPokemon('Pinsir', 16620533, 25),
            ], { weight: 1 }, 'Emil', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Doduo', 11080355, 24),
                new GymPokemon('Granbull', 11080355, 24),
                new GymPokemon('Helioptile', 11080355, 25),
            ], { weight: 1 }, 'Monique', '(female)'),
    ],
    555000, 11);

//Tower of Mastery?

dungeonList['Kalos Power Plant'] = new Dungeon('Kalos Power Plant',
    [
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Croagunk', 3497232, 32),
                new GymPokemon('Scraggy', 3497232, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Golbat', 3497232, 32),
                new GymPokemon('Scraggy', 3497232, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Mightyena', 6994464, 34)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Golbat', 3497232, 32),
                new GymPokemon('Mightyena', 3497232, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Golbat', 3497232, 33),
                new GymPokemon('Croagunk', 3497232, 31),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Liepard', 2331488, 31),
                new GymPokemon('Scraggy', 2331488, 31),
                new GymPokemon('Croagunk', 2331488, 31),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Swalot', 6994464, 34)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Liepard', 3497232, 31),
                new GymPokemon('Swalot', 3497232, 33),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Houndoom', 6994464, 36)],
            { weight: 8 }, undefined, '(male)'),
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Zap Plate', weight: 2.75},
        {loot: 'Dread Plate', weight: 2.5},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Thunder_stone', weight: 0},
    ],
    6994464,
    [
        new DungeonBossPokemon('Volcanion', 42108495, 100,
            {
                requirement: new MultiRequirement([
                    new ClearDungeonRequirement(5, GameConstants.getDungeonIndex('Kalos Power Plant')),
                    new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion),
                ])}),
        new DungeonTrainer('Team Flare Aliana',
            [new GymPokemon('Mightyena', 34972320, 38)], { weight: 1 }),
    ],
    575000, 13);

dungeonList['Sea Spirit\'s Den'] = new Dungeon('Sea Spirit\'s Den',
    ['Lapras', 'Dwebble', 'Lanturn', 'Binacle', 'Woobat', 'Onix'],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Bluk', weight: 3.75},
        {loot: 'Flame Plate', weight: 2.75},
        {loot: 'Sky Plate', weight: 2.75},
        {loot: 'Icicle Plate', weight: 2.75},
        {loot: 'Zap Plate', weight: 2.75},
        {loot: 'Mind Plate', weight: 2.75},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Damp Rock', weight: 2},
        {loot: 'Fire_egg', weight: 1},
        {loot: 'Electric_egg', weight: 1},
    ],
    6877866,
    [new DungeonBossPokemon('Lugia', 34389330, 100)],
    600000, 23);

dungeonList['Pokéball Factory'] = new Dungeon('Pokéball Factory',
    [
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Toxicroak', 7112252, 37)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Mightyena', 3556126, 36),
                new GymPokemon('Golbat', 3556126, 36),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Scraggy', 3556126, 36),
                new GymPokemon('Mightyena', 3556126, 36),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Swalot', 7112252, 37)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Scraggy', 3556126, 37),
                new GymPokemon('Houndoom', 3556126, 38),
            ],
            { weight: 4 }, undefined, '(female)'),
    ],
    [
        {loot: 'Pokeball', weight: 4},
        {loot: 'Greatball', weight: 3.5},
        {loot: 'Ultraball', weight: 2.5},
        {loot: 'Duskball', weight: 2},
        {loot: 'Quickball', weight: 2},
        {loot: 'Fastball', weight: 2},
        {loot: 'Timerball', weight: 2},
        {loot: 'Luxuryball', weight: 2},
    ],
    7112252,
    [
        new DungeonTrainer('Team Flare Celosia',
            [new GymPokemon('Manectric', 35561258, 41)],
            { weight: 1 }),
        new DungeonTrainer('Team Flare Bryony',
            [new GymPokemon('Liepard', 35561258, 41)],
            { weight: 1 }),
    ],
    615000, 14);

dungeonList['Lost Hotel'] = new Dungeon('Lost Hotel',
    [
        {pokemon: 'Magneton', options: { weight: 2.6 }},
        {pokemon: 'Electrode', options: { weight: 2.6 }},
        {pokemon: 'Litwick', options: { weight: 2.6 }},
        {pokemon: 'Pawniard', options: { weight: 2.6 }},
        {pokemon: 'Klefki', options: { weight: 2.6 }},
        new DungeonTrainer('Punk Guy',
            [
                new GymPokemon('Scrafty', 3267291, 39),
                new GymPokemon('Sharpedo', 3267291, 39),
                new GymPokemon('Pawniard', 3267291, 39),
            ],
            { weight: 1 }, 'Sid'),
        new DungeonTrainer('Punk Guy',
            [
                new GymPokemon('Skuntank', 4900936, 40),
                new GymPokemon('Crawdaunt', 4900936, 40),
            ], { weight: 1 }, 'Jacques'),
        new DungeonTrainer('Punk Guy',
            [new GymPokemon('Dunsparce', 9801871, 42)],
            { weight: 1 }, 'Slater'),
        new DungeonTrainer('Punk Girl',
            [
                new GymPokemon('Seviper', 4900936, 40),
                new GymPokemon('Arbok', 4900936, 40),
            ],
            { weight: 1 }, 'Jeanne'),
        new DungeonTrainer('Punk Girl',
            [
                new GymPokemon('Liepard', 4900936, 40),
                new GymPokemon('Liepard', 4900936, 40),
            ],
            { weight: 1 }, 'Cecile'),
    ],
    [
        {loot: 'xClick', weight: 4},
        {loot: 'Lucky_incense', weight: 4},
        {loot: 'Trubbish', weight: 3.5},
        {loot: 'Dread Plate', weight: 2.75},
        {loot: 'Garbodor', weight: 2.5},
        {loot: 'Rotom (heat)', weight: 0},
        {loot: 'Rotom (wash)', weight: 0},
        {loot: 'Rotom (fan)', weight: 0},
        {loot: 'Rotom (frost)', weight: 0},
        {loot: 'Rotom (mow)', weight: 0},
        {loot: 'Protector', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Lost Hotel'))},
    ],
    7351403,
    [
        new DungeonBossPokemon('Rotom', 36757013, 38),
        new DungeonTrainer('Punk Couple',
            [
                new GymPokemon('Garbodor', 18378507, 42),
                new GymPokemon('Pangoro', 18378507, 42),
            ], { weight: 2 }, 'Zoya & Asa'),
    ],
    635000, 15);

dungeonList['Frost Cavern'] = new Dungeon('Frost Cavern',
    [
        {pokemon: 'Haunter', options: { weight: 4.61 }},
        {pokemon: 'Jynx', options: { weight: 4.61 }},
        {pokemon: 'Piloswine', options: { weight: 4.61 }},
        {pokemon: 'Beartic', options: { weight: 4.61 }},
        {pokemon: 'Cryogonal', options: { weight: 4.61 }},
        {pokemon: 'Bergmite', options: { weight: 4.61 }},
        {pokemon: 'Smoochum', options: { weight: 4.61 }},
        {pokemon: 'Vanillite', options: { weight: 4.61 }},
        {pokemon: 'Cubchoo', options: { weight: 4.61 }},
        {pokemon: 'Poliwhirl', options: { weight: 4.61 }},
        {pokemon: 'Floatzel', options: { weight: 4.61 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 4.61 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 4.61 }},
        new DungeonTrainer('Hiker',
            [new GymPokemon('Vibrava', 9641639, 44)],
            { weight: 1 }, 'Ross'),
        new DungeonTrainer('Sky Trainer',
            [
                new GymPokemon('Carnivine', 4820820, 41),
                new GymPokemon('Swanna', 4820820, 44),
            ], { weight: 1 }, 'Celso', '(male)'),
        new DungeonTrainer('Sky Trainer',
            [new GymPokemon('Cryogonal', 9641639, 45)],
            { weight: 1 }, 'Era', '(female)'),
        new DungeonTrainer('Artist',
            [new GymPokemon('Smeargle', 9641639, 44)],
            { weight: 1 }, 'Salvador', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [new GymPokemon('Doublade', 9641639, 46)],
            { weight: 1 }, 'Cordelia', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Raichu', 3213880, 42),
                new GymPokemon('Golduck', 3213880, 42),
                new GymPokemon('Marowak', 3213880, 43),
            ],
            { weight: 1 }, 'Neil', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Graveler', 3213880, 40),
                new GymPokemon('Graveler', 3213880, 41),
                new GymPokemon('Carbink', 3213880, 42),
            ], { weight: 1 }, 'Alain'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Relicanth', 4820820, 42),
                new GymPokemon('Rhydon', 4820820, 42),
            ],
            { weight: 1 }, 'Delmon'),
        new DungeonTrainer('Brains & Brawn',
            [
                new GymPokemon('Grumpig', 4820820, 44),
                new GymPokemon('Hariyama', 4820820, 46),
            ],
            { weight: 1 }, 'Eoin & Wolf'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Scrafty', 4820820, 43),
                new GymPokemon('Throh', 4820820, 44),
            ],
            { weight: 1 }, 'Alonzo'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Sawk', 4820820, 43),
                new GymPokemon('Mienshao', 4820820, 44),
            ],
            { weight: 1 }, 'Kinsey'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Gurdurr', 9641639, 46)], { weight: 1 }, 'Kenji'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Probopass', 9641639, 44)],
            { weight: 1 }, 'Brent'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Medicham', 9641639, 46)],
            { weight: 1 }, 'Gabrielle'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Golbat', 4820820, 42),
                new GymPokemon('Manectric', 4820820, 42),
            ],
            { weight: 1 }, undefined, '(female)'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'xClick', weight: 4},
        {loot: 'Oran', weight: 4},
        {loot: 'Icicle Plate', weight: 2.75},
        {loot: 'Meadow Plate', weight: 2.5},
        {loot: 'Insect Plate', weight: 2.25},
        {loot: 'Iron Plate', weight: 2.25},
        {loot: 'Duskball', weight: 2},
        {loot: 'MediumRestore', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Heart Scale', weight: 0},
    ],
    7231229,
    [
        new DungeonBossPokemon('Abomasnow', 36156143, 50),
        new DungeonTrainer('Team Flare Mable',
            [new GymPokemon('Houndoom', 36156143, 48)],
            { weight: 1 }),
    ],
    665500, 15);

dungeonList['Team Flare Secret HQ'] = new Dungeon('Team Flare Secret HQ',
    [
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Toxicroak', 7472777, 50)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Liepard', 7472777, 48)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Manectric', 7472777, 50)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Mightyena', 7472777, 48)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Houndoom', 7472777, 50)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Scrafty', 7472777, 48)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Liepard', 3736389, 47),
                new GymPokemon('Manectric', 3736389, 48),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Mightyena', 3736389, 47),
                new GymPokemon('Houndoom', 3736389, 48),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Swalot', 7472777, 50)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Golbat', 7472777, 50)],
            { weight: 2 }, undefined, '(male)'),
    ],
    [
        {loot: 'Item_magnet', weight: 4},
        {loot: 'xAttack', weight: 4},
        {loot: 'Pixie Plate', weight: 2.75},
        {loot: 'Dread Plate', weight: 2.75},
        {loot: 'Sky Plate', weight: 2.75},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Team Flare Secret HQ'))},
    ],
    7472777,
    [
        new DungeonBossPokemon('Xerneas', 37363883, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Flare Secret HQ'))}),
        new DungeonBossPokemon('Yveltal', 37363883, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Flare Secret HQ'))}),
        new DungeonTrainer('Team Flare Lysandre',
            [
                new GymPokemon('Mienshao', 9240971, 49),
                new GymPokemon('Honchkrow', 9240971, 49),
                new GymPokemon('Pyroar', 9240971, 51),
                new GymPokemon('Mega Gyarados', 9640971, 53),
            ],
            { weight: 2 }),
    ],
    675000, 17);

dungeonList['Terminus Cave'] = new Dungeon('Terminus Cave',
    [
        {pokemon: 'Sandslash', options: { weight: 3.27 }},
        {pokemon: 'Graveler', options: { weight: 3.27 }},
        {pokemon: 'Pupitar', options: { weight: 3.27 }},
        {pokemon: 'Lairon', options: { weight: 3.27 }},
        {pokemon: 'Durant', options: { weight: 3.27 }},
        {pokemon: 'Geodude', options: { weight: 3.27 }},
        {pokemon: 'Larvitar', options: { weight: 3.27 }},
        {pokemon: 'Aron', options: { weight: 3.27 }},
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Graveler', 3375713, 46),
                new GymPokemon('Graveler', 3375713, 47),
                new GymPokemon('Golem', 3375713, 48),
            ],
            { weight: 1 }, 'Narek'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Steelix', 5063570, 48),
                new GymPokemon('Boldore', 5063570, 48),
            ], { weight: 1 }, 'Bergin'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Rhydon', 10127139, 50)],
            { weight: 1 }, 'Aaron'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Octillery', 10127139, 50)],
            { weight: 1 }, 'Dimitri'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Probopass', 10127139, 50)],
            { weight: 1 }, 'Yusif'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Throh', 5063570, 49),
                new GymPokemon('Conkeldurr', 5063570, 50),
            ], { weight: 1 }, 'Andrea'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Toxicroak', 5063570, 49),
                new GymPokemon('Sawk', 5063570, 50),
            ], { weight: 1 }, 'Gunnar'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Medicham', 5063570, 48),
                new GymPokemon('Hawlucha', 5063570, 51),
            ], { weight: 1 }, 'Hailey'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Hariyama', 10127139, 52)],
            { weight: 1 }, 'Ricardo'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'Pokeball', weight: 3.75},
        {loot: 'Iron Plate', weight: 2.75},
        {loot: 'Earth Plate', weight: 2.75},
        {loot: 'Draco Plate', weight: 2.75},
        {loot: 'Duskball', weight: 2},
        {loot: 'Heat Rock', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Dragon_scale', weight: 0},
        {loot: 'Moon_stone', weight: 0},
        {loot: 'Dusk_stone', weight: 0},
        {loot: 'Reaper_cloth', weight: 0},
    ],
    7595354,
    [
        new DungeonBossPokemon('Zygarde', 42108495, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)}),
        new DungeonTrainer('Pokémon Rangers',
            [
                new GymPokemon('Nidoqueen', 18988384, 51),
                new GymPokemon('Nidoking', 18988384, 51),
            ], { weight: 3 }, 'Fern & Lee'),
    ],
    700000, 18);

dungeonList['Pokémon Village'] = new Dungeon('Pokémon Village',
    ['Jigglypuff', 'Poliwhirl', 'Noctowl', 'Lombre', 'Gothorita', 'Amoonguss'],
    [
        {loot: 'Token_collector', weight: 4},
        {loot: 'Rawst', weight: 3.5},
        {loot: 'Chesto', weight: 3.5},
        {loot: 'Garbodor', weight: 3.25},
        {loot: 'Banette', weight: 3.25},
        {loot: 'Aguav', weight: 3},
        {loot: 'Wiki', weight: 3},
        {loot: 'Pixie Plate', weight: 2.75},
        {loot: 'LargeRestore', weight: 1.5},
    ],
    7844138,
    [
        new DungeonBossPokemon('Ditto', 39220688, 50),
        new DungeonBossPokemon('Zoroark', 39220688, 50),
    ],
    725000, 20);

dungeonList['Victory Road Kalos'] = new Dungeon('Victory Road Kalos',
    [
        {pokemon: 'Haunter', options: { weight: 3.27 }},
        {pokemon: 'Graveler', options: { weight: 3.27 }},
        {pokemon: 'Lickitung', options: { weight: 3.27 }},
        {pokemon: 'Gurdurr', options: { weight: 3.27 }},
        {pokemon: 'Druddigon', options: { weight: 3.27 }},
        {pokemon: 'Zweilous', options: { weight: 3.27 }},
        {pokemon: 'Geodude', options: { weight: 3.27 }},
        {pokemon: 'Lombre', options: { weight: 3.27 }},
        {pokemon: 'Floatzel', options: { weight: 3.27 }},
        {pokemon: 'Poliwhirl', options: { weight: 3.27 }},
        {pokemon: 'Poliwag', options: { weight: 3.27 }},
        {pokemon: 'Noibat', options: { weight: 3.27 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 3.27 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 3.27 }},
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Carbink', 3542379, 56),
                new GymPokemon('Raichu', 3542379, 56),
                new GymPokemon('Kingdra', 3542379, 57),
            ],
            { weight: 1 }, 'Robbie', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [new GymPokemon('Weavile', 10627136, 60)], { weight: 1 }, 'Alanza', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Steelix', 3542379, 56),
                new GymPokemon('Electrode', 3542379, 56),
                new GymPokemon('Kangaskhan', 3542379, 57),
            ],
            { weight: 1 }, 'Bence', '(male)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Machamp', 10627136, 60)],
            { weight: 1 }, 'Markus'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Hawlucha', 5313568, 57),
                new GymPokemon('Mienshao', 5313568, 58),
            ],
            { weight: 1 }, 'Veronique'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Haxorus', 10627136, 58)], { weight: 1 }, 'Farid', '(male)'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Medicham', 10627136, 60)], { weight: 1 }, 'Sigrid'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Pangoro', 5313568, 57),
                new GymPokemon('Heracross', 5313568, 58),
            ], { weight: 1 }, 'Ander'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Espeon', 10627136, 58)],
            { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Brains & Brawn',
            [
                new GymPokemon('Medicham', 5313568, 58),
                new GymPokemon('Gallade', 5313568, 60),
            ],
            { weight: 1 }, 'Arman & Hugo'),
        new DungeonTrainer('Fairy Tale Girl',
            [
                new GymPokemon('Azumarill', 5313568, 56),
                new GymPokemon('Florges (Red)', 5313568, 56),
            ], { weight: 1 }, 'Corinne'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Gourgeist', 10627136, 58)],
            { weight: 1 }, 'Raziah', '(kalos)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Slowbro', 5313568, 57),
                new GymPokemon('Altaria', 5313568, 57),
            ],
            { weight: 1 }, 'Petra', '(female)'),
        new DungeonTrainer('Veteran',
            [new GymPokemon('Talonflame', 10627136, 61)],
            { weight: 1 }, 'Inga', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Crobat', 10627136, 59)], { weight: 1 }, 'Ralf', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Banette', 5313568, 57),
                new GymPokemon('Leafeon', 5313568, 59),
            ], { weight: 1 }, 'Gerard'),
        new DungeonTrainer('Artist',
            [new GymPokemon('Smeargle', 10627136, 58)], { weight: 1 }, 'Vincent', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Torkoal', 5313568, 56),
                new GymPokemon('Golem', 5313568, 56),
            ],
            { weight: 1 }, 'Corwin'),
    ],
    [
        {loot: 'xAttack', weight: 4},
        {loot: 'xClick', weight: 4},
        {loot: 'Ultraball', weight: 2},
        {loot: 'Smooth Rock', weight: 2},
        {loot: 'Revive', weight: 2},
        {loot: 'Duskball', weight: 2},
        {loot: 'Hard Stone', weight: 2},
        {loot: 'Damp Rock', weight: 2},
        {loot: 'Star Piece', weight: 1.75},
        {loot: 'LargeRestore', weight: 1.5},
        {loot: 'Max Revive', weight: 0},
        {loot: 'Protein', weight: 0, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Victory Road Kalos'))},
        {loot: 'Heart Scale', weight: 0},
    ],
    7970352,
    [
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Magcargo', 19925880, 57),
                new GymPokemon('Scizor', 19925880, 58),
            ],
            { weight: 1 }, 'Michele', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Trevenant', 19925880, 57),
                new GymPokemon('Gigalith', 19925880, 59),
            ], { weight: 1 }, 'Timeo', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Glaceon', 19925880, 57),
                new GymPokemon('Snorlax', 19925880, 59),
            ], { weight: 1 }, 'Catrina', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Skarmory', 13283920, 55),
                new GymPokemon('Umbreon', 13283920, 55),
                new GymPokemon('Alakazam', 13283920, 57),
            ], { weight: 1 }, 'Gilles', '(male)'),
    ],
    750500, 21);

//Unknown Dungeon? Contains Mewtwo.



// Alola
// TODO: Balancing of dungeon Pokemon HP & rewards.
dungeonList['Trainers\' School'] = new Dungeon('Trainers\' School',
    [
        {pokemon: 'Alolan Meowth', options: { weight: 2 }},
        {pokemon: 'Abra', options: { weight: 2 }},
        {pokemon: 'Magnemite', options: { weight: 2 }},
        {pokemon: 'Alolan Grimer', options: { weight: 2 }},
        {pokemon: 'Wingull', options: { weight: 2 }},
        {pokemon: 'Mime Jr.', options: { weight: 2 }},
        {pokemon: 'Zorua', options: { weight: 2 }},
        {pokemon: 'Furfrou', options: { weight: 2 }},
        new DungeonTrainer('Youth Athlete',
            [new GymPokemon('Bonsly', 11407339, 7)], { weight: 1 }, 'Hiromi', '(female)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Metapod', 11407339, 7)], { weight: 1 }, 'Mia', '(female)'),
        new DungeonTrainer('Youngster',
            [new GymPokemon('Alolan Grimer', 11407339, 7)], { weight: 1 }, 'Joey'),
        new DungeonTrainer('Rising Star',
            [new GymPokemon('Ekans', 11407339, 8)], { weight: 1 }, 'Joseph', '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    8555504,
    [
        new DungeonTrainer('Teacher',
            [
                new GymPokemon('Litten', 14259173, 10),
                new GymPokemon('Popplio', 14259173, 10),
                new GymPokemon('Rowlet', 14259173, 10),
            ], { weight: 1 }, 'Emily'),
    ],
    757500, 18);

dungeonList['Hau\'oli Cemetery'] = new Dungeon('Hau\'oli Cemetery',
    [
        {pokemon: 'Zubat', options: { weight: 4 }},
        {pokemon: 'Gastly', options: { weight: 4 }},
        {pokemon: 'Misdreavus', options: { weight: 4 }},
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Pikachu', 11587451, 9)], { weight: 1 }, 'Ikue', '(female)'),
        new DungeonTrainer('Office Worker',
            [new GymPokemon('Pikipek', 11587451, 9)], { weight: 1 }, 'Jeremy', '(male)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Happiny', 11587451, 8)], { weight: 1 }, 'Malia', '(female)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    8690588,
    [
        new DungeonBossPokemon('Drifloon', 43452938, 9),
        new DungeonBossPokemon('Litwick', 43452938, 9),
    ],
    800000, 2);

dungeonList['Verdant Cavern'] = new Dungeon('Verdant Cavern',
    [
        {pokemon: 'Alolan Rattata', options: { weight: 0.8 }},
        {pokemon: 'Zubat', options: { weight: 0.8 }},
        {pokemon: 'Alolan Diglett', options: { weight: 0.8 }},
        {pokemon: 'Noibat', options: { weight: 0.8 }},
        {pokemon: 'Yungoos', options: { weight: 0.8 }},
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Drowzee', 11678360, 11)], { weight: 1 }, undefined, '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    8758770,
    [
        new DungeonBossPokemon('Alolan Raticate', 43793850, 12),
        new DungeonBossPokemon('Gumshoos', 43793850, 12),
        new DungeonBossPokemon('Totem Raticate', 82543791, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Gumshoos', 82543791, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    805000, 2,
    () => DungeonGainGymBadge(GymList['Ilima\'s Trial'], BadgeEnums.NormaliumZ));

dungeonList['Melemele Meadow'] = new Dungeon('Melemele Meadow',
    [
        {pokemon: 'Caterpie', options: { weight: 0.66 }},
        {pokemon: 'Metapod', options: { weight: 0.66 }},
        {pokemon: 'Butterfree', options: { weight: 0.66 }},
        {pokemon: 'Cottonee', options: { weight: 0.66 }},
        {pokemon: 'Petilil', options: { weight: 0.66 }},
        {pokemon: 'Cutiefly', options: { weight: 0.66 }},
        new DungeonTrainer('Actor',
            [new GymPokemon('Oricorio (Pom-pom)', 11769271, 12)], { weight: 1 }, 'Meredith'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    8826953,
    [
        new DungeonBossPokemon('Flabébé (Red)', 44134763, 12),
        new DungeonBossPokemon('Oricorio (Pom-pom)', 44134763, 12),
    ],
    825000, 3);

dungeonList['Seaward Cave'] = new Dungeon('Seaward Cave',
    ['Zubat', 'Psyduck', 'Seel', 'Magikarp', 'Smoochum'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    8872836,
    [
        new DungeonBossPokemon('Delibird', 44364180, 12),
        new DungeonBossPokemon('Barboach', 44364180, 17),
    ],
    830000, 3);

dungeonList['Ten Carat Hill'] = new Dungeon('Ten Carat Hill',
    ['Zubat', 'Machop', 'Psyduck', 'Mawile', 'Roggenrola'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    8918720,
    [
        new DungeonBossPokemon('Spinda', 44593598, 14),
        new DungeonBossPokemon('Carbink', 44593598, 14),
        new DungeonBossPokemon('Rockruff', 44593598, 14),
    ],
    835000, 3);


dungeonList['Pikachu Valley'] = new Dungeon('Pikachu Valley',
    ['Pikachu', 'Pichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    8964603,
    [
        new DungeonBossPokemon('Pikachu (Original cap)', 44823015, 15),
        new DungeonBossPokemon('Pikachu (Hoenn cap)', 44823015, 15),
        new DungeonBossPokemon('Pikachu (Sinnoh cap)', 44823015, 15),
        new DungeonBossPokemon('Pikachu (Unova cap)', 44823015, 15),
        new DungeonBossPokemon('Pikachu (Kalos cap)', 44823015, 15),
        new DungeonBossPokemon('Pikachu (Alola cap)', 44823015, 15),
    ],
    850000, 4);

dungeonList['Paniola Ranch'] = new Dungeon('Paniola Ranch',
    [
        {pokemon: 'Mareep', options: { weight: 6.66 }},
        {pokemon: 'Lillipup', options: { weight: 6.66 }},
        {pokemon: 'Mudbray', options: { weight: 6.66 }},
        new DungeonTrainer('Madame',
            [new GymPokemon('Carbink', 12045432, 15)], { weight: 1 }, 'Elizabeth'),
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Tauros', 12045432, 15)], { weight: 1 }, 'Wesley', '(male)'),
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Mudbray', 12045432, 15)], { weight: 1 }, 'Glenn', '(male)'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Sableye', 12045432, 15)], { weight: 1 }, 'Gerald'),
        new DungeonTrainer('Rising Star',
            [
                new GymPokemon('Lillipup', 6022716, 15),
                new GymPokemon('Magnemite', 6022716, 16),
            ], { weight: 1 }, 'Micah', '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    9034074,
    [
        new DungeonBossPokemon('Tauros', 45170370, 15),
        new DungeonBossPokemon('Miltank', 45170370, 15),
    ],
    855000, 4);

dungeonList['Brooklet Hill'] = new Dungeon('Brooklet Hill',
    [
        {pokemon: 'Paras', options: { weight: 1.43 }},
        {pokemon: 'Psyduck', options: { weight: 1.43 }},
        {pokemon: 'Poliwag', options: { weight: 1.43 }},
        {pokemon: 'Tentacool', options: { weight: 1.43 }},
        {pokemon: 'Goldeen', options: { weight: 1.43 }},
        {pokemon: 'Magikarp', options: { weight: 1.43 }},
        {pokemon: 'Wingull', options: { weight: 1.43 }},
        {pokemon: 'Surskit', options: { weight: 1.43 }},
        {pokemon: 'Feebas', options: { weight: 1.43 }},
        {pokemon: 'Finneon', options: { weight: 1.43 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 1.43 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 1.43 }},
        {pokemon: 'Alomomola', options: { weight: 1.43 }},
        {pokemon: 'Dewpider', options: { weight: 1.43 }},
        new DungeonTrainer('Fisherman',
            [new GymPokemon('Tentacool', 12138060, 16)], { weight: 1 }, 'Hal'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Barboach', 6069030, 16),
                new GymPokemon('Goldeen', 6069030, 16),
            ], { weight: 1 }, 'Ernest'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Fletchling', 12138060, 16)], { weight: 1 }, 'Mikiko', '(female)'),
        new DungeonTrainer('Fisherman',
            [new GymPokemon('Poliwag', 12138060, 16)], { weight: 1 }, 'Herbert'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Magikarp', 4046020, 16),
                new GymPokemon('Magikarp', 4046020, 16),
                new GymPokemon('Magikarp', 4046020, 16),
            ], { weight: 1 }, 'Carl'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    9103545,
    [
        new DungeonBossPokemon('Wishiwashi (School)', 45517725, 20),
        new DungeonBossPokemon('Araquanid', 45517725, 20),
        new DungeonBossPokemon('Totem Wishiwashi', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Araquanid', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    875000, 5,
    () => DungeonGainGymBadge(GymList['Lana\'s Trial'], BadgeEnums.WateriumZ));

dungeonList['Wela Volcano Park'] = new Dungeon('Wela Volcano Park',
    [
        {pokemon: 'Cubone', options: { weight: 2 }},
        {pokemon: 'Kangaskhan', options: { weight: 2 }},
        {pokemon: 'Magmar', options: { weight: 2 }},
        {pokemon: 'Magby', options: { weight: 2 }},
        {pokemon: 'Fletchling', options: { weight: 2 }},
        {pokemon: 'Salandit', options: { weight: 2 }},
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Meowth', 12896392, 19)], { weight: 1 }, 'Mariah', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Noibat', 6448196, 20),
                new GymPokemon('Kadabra', 6448196, 21),
            ], { weight: 1 }, 'Jim', '(male)'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Roggenrola', 12896392, 19)], { weight: 1 }, 'Calhoun'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    9672294,
    [
        new DungeonBossPokemon('Alolan Marowak', 48361470, 22),
        new DungeonBossPokemon('Salazzle', 48361470, 22),
        new DungeonBossPokemon('Totem Marowak', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Salazzle', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    900000, 7,
    () => DungeonGainGymBadge(GymList['Kiawe\'s Trial'], BadgeEnums.FiriumZ));

dungeonList['Lush Jungle'] = new Dungeon('Lush Jungle',
    ['Metapod', 'Paras', 'Pinsir', 'Hoothoot', 'Bonsly', 'Trumbeak', 'Fomantis', 'Bounsweet', 'Steenee', 'Comfey', 'Oranguru', 'Passimian'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    9817749,
    [
        new DungeonBossPokemon('Lurantis', 49088745, 24),
        new DungeonBossPokemon('Totem Lurantis', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    925000, 8,
    () => DungeonGainGymBadge(GymList['Mallow\'s Trial'], BadgeEnums.GrassiumZ));

dungeonList['Diglett\'s Tunnel'] = new Dungeon('Diglett\'s Tunnel',
    [
        {pokemon: 'Zubat', options: { weight: 10 }},
        {pokemon: 'Alolan Diglett', options: { weight: 10 }},
        new DungeonTrainer('Worker',
            [new GymPokemon('Shieldon', 13188179, 22)], { weight: 1 }, 'Frank'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Alolan Diglett', 6594090, 22),
                new GymPokemon('Alolan Diglett', 6594090, 22),
            ], { weight: 1 }, 'Jeff'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Archen', 13188179, 22)], { weight: 1 }, 'Vaclav'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Ekans', 13188179, 23)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Salandit', 13188179, 23)], { weight: 1 }, undefined, '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    9891134,
    [new DungeonBossPokemon('Larvitar', 49455668, 23)],
    930000, 8);

dungeonList['Memorial Hill'] = new Dungeon('Memorial Hill',
    [
        {pokemon: 'Zubat', options: { weight: 10 }},
        {pokemon: 'Gastly', options: { weight: 10 }},
        {pokemon: 'Phantump', options: { weight: 10 }},
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Magby', 6643012, 23),
                new GymPokemon('Ledian', 6643012, 23),
            ], { weight: 1 }, 'Liam', '(male)'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Jolteon', 13286024, 24)], { weight: 1 }, 'Smith'),
        new DungeonTrainer('Madame',
            [
                new GymPokemon('Furfrou', 6643012, 24),
                new GymPokemon('Comfey', 6643012, 24),
            ], { weight: 1 }, 'Sayuri'),
        new DungeonTrainer('Punk Girl',
            [new GymPokemon('Ariados', 13286024, 24)], { weight: 1 }, 'Melissa'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    9964518,
    [
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Alolan Raticate', 49822590, 24)], { weight: 1 }, undefined, '(male)'),
    ],
    950000, 9);

dungeonList['Malie Garden'] = new Dungeon('Malie Garden',
    [
        {pokemon: 'Alolan Meowth', options: { weight: 1.14 }},
        {pokemon: 'Psyduck', options: { weight: 1.14 }},
        {pokemon: 'Poliwhirl', options: { weight: 1.14 }},
        {pokemon: 'Goldeen', options: { weight: 1.14 }},
        {pokemon: 'Magikarp', options: { weight: 1.14 }},
        {pokemon: 'Gyarados', options: { weight: 1.14 }},
        {pokemon: 'Ledian', options: { weight: 1.14 }},
        {pokemon: 'Ariados', options: { weight: 1.14 }},
        {pokemon: 'Masquerain', options: { weight: 1.14 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 1.14 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 1.14 }},
        {pokemon: 'Cottonee', options: { weight: 1.14 }},
        {pokemon: 'Petilil', options: { weight: 1.14 }},
        {pokemon: 'Araquanid', options: { weight: 1.14 }},
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Raticate', 13483476, 28)], { weight: 1 }, 'Mitch', '(male)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Cleffa', 13483476, 27)], { weight: 1 }, 'Nancy', '(female)'),
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Raichu', 13483476, 28)], { weight: 1 }, 'Akali', '(female)'),
        new DungeonTrainer('Tourist Couple',
            [
                new GymPokemon('Alolan Vulpix', 6741738, 28),
                new GymPokemon('Vulpix', 6741738, 28),
            ], { weight: 1 }, 'Landon and Yukiro'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    10112607,
    [
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Golisopod', 22281518, 34),
                new GymPokemon('Masquerain', 28281518, 34),
            ],
            { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    975000, 21);

dungeonList['Hokulani Observatory'] = new Dungeon('Hokulani Observatory',
    ['Grubbin', 'Charjabug', 'Elekid', 'Electabuzz', 'Skarmory', 'Dedenne'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    10412757,
    [
        new DungeonBossPokemon('Vikavolt', 52063785, 29),
        new DungeonBossPokemon('Togedemaru', 52063785, 33),
        new DungeonBossPokemon('Totem Vikavolt', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Togedemaru', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    1000000, 22,
    () => DungeonGainGymBadge(GymList['Sophocles\' Trial'], BadgeEnums.ElectriumZ));

dungeonList['Thrifty Megamart'] = new Dungeon('Thrifty Megamart',
    ['Golbat', 'Gastly', 'Haunter', 'Gengar', 'Shuppet', 'Banette', 'Jellicent', 'Klefki'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11029067,
    [
        new DungeonBossPokemon('Mimikyu', 55145333, 35),
        new DungeonBossPokemon('Totem Mimikyu', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    1025000, 14,
    () => DungeonGainGymBadge(GymList['Acerola\'s Trial'], BadgeEnums.GhostiumZ));

dungeonList['Ula\'ula Meadow'] = new Dungeon('Ula\'ula Meadow',
    [
        {pokemon: 'Ledian', options: { weight: 4 }},
        {pokemon: 'Ariados', options: { weight: 4 }},
        {pokemon: 'Cottonee', options: { weight: 4 }},
        {pokemon: 'Petilil', options: { weight: 4 }},
        {pokemon: 'Ribombee', options: { weight: 4 }},
        new DungeonTrainer('Dancer',
            [new GymPokemon('Floette (Red)', 15127052, 36)], { weight: 1 }, 'Mireille', '(female)'),
        new DungeonTrainer('Office Worker',
            [
                new GymPokemon('Torkoal', 7563526, 36),
                new GymPokemon('Whimsicott', 7563526, 36),
            ], { weight: 1 }, 'Michelle', '(female)'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Sneasel', 7563526, 35),
                new GymPokemon('Komala', 7563526, 35),
            ], { weight: 1 }, 'Rylee'),
        new DungeonTrainer('Golfer',
            [
                new GymPokemon('Hariyama', 7563526, 39),
                new GymPokemon('Alakazam', 7563526, 39),
            ], { weight: 1 }, 'Dean', '(male)'),
        new DungeonTrainer('Actor',
            [new GymPokemon('Oricorio (Baile)', 15127052, 36)], { weight: 1 }, 'Meredith'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11345289,
    [
        new DungeonBossPokemon('Floette (Red)', 56726445, 36),
        new DungeonBossPokemon('Oricorio (Baile)', 56726445, 36),
    ],
    1050000, 16);

dungeonList['Po Town'] = new Dungeon('Po Town',
    [
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Spinarak', 11505432, 36)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Trubbish', 11505432, 36)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Drowzee', 11505432, 37)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Alolan Raticate', 5752716, 37),
                new GymPokemon('Golbat', 5752716, 37),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Ekans', 5752716, 37),
                new GymPokemon('Salandit', 5752716, 37),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Fomantis', 5752716, 37),
                new GymPokemon('Mareanie', 5752716, 37),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Scraggy', 11505432, 40)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Office Worker',
            [
                new GymPokemon('Elgyem', 5752716, 40),
                new GymPokemon('Metang', 5752716, 40),
            ], { weight: 1 }, 'Royce', '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Drowzee', 11505432, 38)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Salandit', 5752716, 38),
                new GymPokemon('Fomantis', 5752716, 38),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Trubbish', 5752716, 38),
                new GymPokemon('Houndour', 5752716, 38),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Scraggy', 11505432, 38)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Alolan Rattata', 11505432, 38)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Alolan Raticate', 11505432, 38)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Haunter', 5752716, 38),
                new GymPokemon('Alolan Grimer', 5752716, 38),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Spinarak', 3835144, 38),
                new GymPokemon('Pawniard', 3835144, 38),
                new GymPokemon('Golbat', 3835144, 38),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11505432,
    [
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Golisopod', 16175720, 41),
                new GymPokemon('Masquerain', 16175720, 41),
                new GymPokemon('Pinsir', 25175720, 41),
            ], { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    1075000, 17);

dungeonList['Aether Foundation'] = new Dungeon('Aether Foundation',
    [
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Alolan Dugtrio', 5833809, 40),
                new GymPokemon('Toucannon', 5833809, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Kecleon', 5833809, 40),
                new GymPokemon('Stoutland', 5833809, 40),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Arbok', 5833809, 40),
                new GymPokemon('Lurantis', 5833809, 40),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Parasect', 3889206, 40),
                new GymPokemon('Drifblim', 3889206, 40),
                new GymPokemon('Sudowoodo', 3889206, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Primeape', 11667617, 40)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Arcanine', 11667617, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Anorith', 5833809, 41),
                new GymPokemon('Lileep', 5833809, 41),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Magmar', 2916905, 42),
                new GymPokemon('Houndoom', 2916905, 42),
                new GymPokemon('Electabuzz', 2916905, 42),
                new GymPokemon('Manectric', 2916905, 42),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Branch Chief',
            [
                new GymPokemon('Claydol', 3889206, 44),
                new GymPokemon('Bruxish', 3889206, 44),
                new GymPokemon('Hypno', 3889206, 44),
            ], { weight: 1 }, 'Faba', '(faba)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Alolan Muk', 11667617, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Magneton', 11667617, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Porygon2', 11667617, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Huntail', 5833809, 41),
                new GymPokemon('Gorebyss', 5833809, 41),
            ], { weight: 1 }, undefined, '(both)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Golbat', 11667617, 42)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Alolan Raticate', 11667617, 42)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Golisopod', 2916905, 45),
                new GymPokemon('Vikavolt', 2916905, 45),
                new GymPokemon('Masquerain', 2916905, 45),
                new GymPokemon('Pinsir', 2916905, 45),
            ], { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11667617,
    [
        new DungeonTrainer('Aether President',
            [
                new GymPokemon('Clefable', 10667617, 47),
                new GymPokemon('Lilligant', 10667617, 47),
                new GymPokemon('Lopunny', 10667617, 47),
                new GymPokemon('Milotic', 10667617, 47),
                new GymPokemon('Bewear', 16667617, 47),
            ], { weight: 1 }, 'Lusamine', '(lusamine)'),
    ],
    1080000, 17);

dungeonList['Exeggutor Island Hill'] = new Dungeon('Exeggutor Island Hill',
    ['Exeggcute', 'Pelipper', 'Gastrodon (east)'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11829800,
    [
        new DungeonBossPokemon('Pinsir', 59148998, 45),
        new DungeonBossPokemon('Tropius', 59148998, 45),
    ],
    1100000, 24);

dungeonList['Vast Poni Canyon'] = new Dungeon('Vast Poni Canyon',
    [
        {pokemon: 'Golbat', options: { weight: 4 }},
        {pokemon: 'Alolan Dugtrio', options: { weight: 4 }},
        {pokemon: 'Machoke', options: { weight: 4 }},
        {pokemon: 'Magikarp', options: { weight: 4 }},
        {pokemon: 'Skarmory', options: { weight: 4 }},
        {pokemon: 'Barboach', options: { weight: 4 }},
        {pokemon: 'Corphish', options: { weight: 4 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 4 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 4 }},
        {pokemon: 'Boldore', options: { weight: 4 }},
        {pokemon: 'Mienfoo', options: { weight: 4 }},
        {pokemon: 'Carbink', options: { weight: 4 }},
        {pokemon: 'Lycanroc (Midday)', options: { weight: 4 }},
        {pokemon: 'Lycanroc (Midnight)', options: { weight: 4 }},
        {pokemon: 'Jangmo-o', options: { weight: 4 }},
        {pokemon: 'Hakamo-o', options: { weight: 4 }},
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Beheeyem', 7996022, 47),
                new GymPokemon('Banette', 7996022, 47),
            ], { weight: 1 }, 'Harry', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Spinda', 15992044, 45)], { weight: 1 }, 'Perdy', '(female)'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Alolan Sandslash', 7996022, 47),
                new GymPokemon('Alolan Ninetales', 7996022, 47),
            ], { weight: 1 }, 'Kent and Aimee'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Kabutops', 7996022, 46),
                new GymPokemon('Tyrantrum', 7996022, 46),
            ], { weight: 1 }, 'Zachary'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Xatu', 5330682, 48),
                new GymPokemon('Kangaskhan', 5330682, 48),
                new GymPokemon('Dewgong', 5330682, 48),
            ], { weight: 1 }, 'Lynn', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Mawile', 7996022, 47),
                new GymPokemon('Weavile', 7996022, 47),
            ], { weight: 1 }, 'Junko', '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Magnezone', 15992044, 46)], { weight: 1 }, 'Ikaika', '(male)'),
        new DungeonTrainer('Punk Girl',
            [new GymPokemon('Scrafty', 15992044, 46)], { weight: 1 }, 'Anna'),
        new DungeonTrainer('Punk Guy',
            [
                new GymPokemon('Pangoro', 7996022, 46),
                new GymPokemon('Crawdaunt', 7996022, 46),
            ], { weight: 1 }, 'Adam'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Poliwrath', 15992044, 47)], { weight: 1 }, 'Curtis'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Pawniard', 15992044, 46)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Alolan Graveler', 7996022, 47),
                new GymPokemon('Lapras', 7996022, 48),
            ], { weight: 1 }, 'Hiroshi', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Talonflame', 5330682, 48),
                new GymPokemon('Wailord', 5330682, 48),
                new GymPokemon('Glaceon', 5330682, 48),
            ], { weight: 1 }, 'Heather', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Noctowl', 3998011, 48),
                new GymPokemon('Flygon', 3998011, 48),
                new GymPokemon('Slowking', 3998011, 48),
                new GymPokemon('Gengar', 3998011, 48),
            ], { weight: 1 }, 'Eric', '(male)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Crabominable', 15992044, 47)], { weight: 1 }, 'Terry'),
        new DungeonTrainer('Surfer',
            [new GymPokemon('Golduck', 15992044, 47)], { weight: 1 }, 'Joshah'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    11994033,
    [
        new DungeonBossPokemon('Kommo-o', 59970165, 49),
        new DungeonBossPokemon('Totem Kommo-o', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    1125000, 25,
    () => DungeonGainGymBadge(GymList['Vast Poni Canyon Trial'], BadgeEnums.DragoniumZ));

dungeonList['Mina\'s Houseboat'] = new Dungeon('Mina\'s Houseboat',
    ['Chansey', 'Wingull', 'Pelipper', 'Spritzee', 'Swirlix', 'Cutiefly', 'Comfey', 'Dhelmise'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12076836,
    [new DungeonBossPokemon('Ribombee', 60384180, 55)],
    1150000, 25,
    () => DungeonGainGymBadge(GymList['Mina\'s Trial'], BadgeEnums.FairiumZ));

dungeonList['Mount Lanakila'] = new Dungeon('Mount Lanakila',
    [
        {pokemon: 'Alolan Raticate', options: { weight: 8.67 }},
        {pokemon: 'Alolan Sandshrew', options: { weight: 8.67 }},
        {pokemon: 'Alolan Vulpix', options: { weight: 8.67 }},
        {pokemon: 'Sneasel', options: { weight: 8.67 }},
        {pokemon: 'Snorunt', options: { weight: 8.67 }},
        {pokemon: 'Gumshoos', options: { weight: 8.67 }},
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Scyther', 8106426, 51),
                new GymPokemon('Malamar', 8106426, 52),
            ], { weight: 1 }, 'Seth', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Shiinotic', 8106426, 51),
                new GymPokemon('Clefable', 8106426, 52),
            ], { weight: 1 }, 'Kailee', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Lickitung', 8106426, 52),
                new GymPokemon('Goodra', 8106426, 52),
            ], { weight: 1 }, 'Alonsa', '(female)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Relicanth', 16212851, 50)], { weight: 1 }, 'Ovid'),
        new DungeonTrainer('Sparring Partners',
            [
                new GymPokemon('Bewear', 5404284, 51),
                new GymPokemon('Mienfoo', 5404284, 51),
                new GymPokemon('Machamp', 5404284, 51),
            ], { weight: 1 }, 'Alon and Eimar'),
        new DungeonTrainer('Sparring Partners',
            [
                new GymPokemon('Hawlucha', 5404284, 51),
                new GymPokemon('Crabominable', 5404284, 51),
                new GymPokemon('Pangoro', 5404284, 51),
            ], { weight: 1 }, 'Craig and Jason'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Emolga', 16212851, 51)], { weight: 1 }, 'Peren', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Pyroar', 5404284, 53),
                new GymPokemon('Claydol', 5404284, 53),
                new GymPokemon('Milotic', 5404284, 53),
            ], { weight: 1 }, 'Ella', '(female)'),
        new DungeonTrainer('Collector',
            [new GymPokemon('Florges (White)', 16212851, 51)], { weight: 1 }, 'Minty'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Vanilluxe', 8106426, 52),
                new GymPokemon('Mismagius', 8106426, 53),
            ], { weight: 1 }, 'Jada', '(female)'),
        new DungeonTrainer('Master & Apprentice',
            [
                new GymPokemon('Vikavolt', 3242571, 52),
                new GymPokemon('Forretress', 3242571, 53),
                new GymPokemon('Glalie', 3242571, 53),
                new GymPokemon('Tyranitar', 3242571, 53),
                new GymPokemon('Bisharp', 3242571, 53),
            ], { weight: 1 }, 'Breon and Kaimana'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Gigalith', 16212851, 51)], { weight: 1 }, 'Anuhea'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Carbink', 3242571, 65),
                new GymPokemon('Torkoal', 3242571, 65),
                new GymPokemon('Pelipper', 3242571, 65),
                new GymPokemon('Alolan Ninetales', 3242571, 65),
                new GymPokemon('Gigalith', 3242571, 65),
            ], { weight: 1 }, 'Aristo', '(male)'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12159638,
    [
        new DungeonBossPokemon('Absol', 60798188, 50),
        new DungeonBossPokemon('Glalie', 60798188, 50),
        new DungeonBossPokemon('Vanilluxe', 60798188, 50),
        new DungeonBossPokemon('Necrozma', 60798188, 65),
    ],
    1175000, 26);

dungeonList['Lake of the Sunne and Moone'] = new Dungeon('Lake of the Sunne and Moone',
    ['Clefairy', 'Sunkern', 'Skitty', 'Lunatone', 'Solrock', 'Helioptile'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12326618,
    [
        new DungeonBossPokemon('Cosmog', 61633088, 70),
        new DungeonBossPokemon('Lunala', 63323588, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Lunala)}),
        new DungeonBossPokemon('Solgaleo', 63323588, 100, {requirement: new ObtainedPokemonRequirement(pokemonMap.Solgaleo)}),
    ],
    1200000, 27);

dungeonList['Ruins of Conflict'] = new Dungeon('Ruins of Conflict',
    ['Floette (Red)', 'Comfey', 'Dedenne', 'Ampharos', 'Electabuzz'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12326618,
    [
        new DungeonBossPokemon('Luxray', 61633088, 55),
        new DungeonBossPokemon('Granbull', 61633088, 55),
        new DungeonBossPokemon('Tapu Koko', 61633088, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Life'] = new Dungeon('Ruins of Life',
    ['Floette (Red)', 'Comfey', 'Gardevoir', 'Chimecho', 'Munna'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12326618,
    [
        new DungeonBossPokemon('Wobbuffet', 61633088, 55),
        new DungeonBossPokemon('Granbull', 61633088, 55),
        new DungeonBossPokemon('Tapu Lele', 61633088, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Abundance'] = new Dungeon('Ruins of Abundance',
    ['Floette (Red)', 'Comfey', 'Cottonee', 'Gloom', 'Petilil'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12326618,
    [
        new DungeonBossPokemon('Maractus', 61633088, 55),
        new DungeonBossPokemon('Granbull', 61633088, 55),
        new DungeonBossPokemon('Tapu Bulu', 61633088, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Hope'] = new Dungeon('Ruins of Hope',
    ['Floette (Red)', 'Comfey', 'Azumarill', 'Poliwhirl', 'Clamperl'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12326618,
    [
        new DungeonBossPokemon('Lumineon', 61633088, 55),
        new DungeonBossPokemon('Granbull', 61633088, 55),
        new DungeonBossPokemon('Tapu Fini', 61633088, 60),
    ],
    1200000, 27);

dungeonList['Poni Meadow'] = new Dungeon('Poni Meadow',
    [
        {pokemon: 'Magikarp', options: { weight: 0.57 }},
        {pokemon: 'Dratini', options: { weight: 0.57 }},
        {pokemon: 'Cottonee', options: { weight: 0.57 }},
        {pokemon: 'Petilil', options: { weight: 0.57 }},
        {pokemon: 'Ribombee', options: { weight: 0.57 }},
        {pokemon: 'Misdreavus', options: { weight: 0.57 }},
        {pokemon: 'Barboach', options: { weight: 0.57 }},
        new DungeonTrainer('Actor',
            [new GymPokemon('Oricorio (Sensu)', 16659968, 57)], { weight: 1 }, 'Meredith'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12494976,
    [
        new DungeonBossPokemon('Oricorio (Sensu)', 62474880, 70),
        new DungeonBossPokemon('Floette (Red)', 62474880, 70),
    ],
    1225000, 28);

dungeonList['Resolution Cave'] = new Dungeon('Resolution Cave',
    [
        {pokemon: 'Zubat', options: { weight: 4 }},
        {pokemon: 'Alolan Dugtrio', options: { weight: 4 }},
        {pokemon: 'Druddigon', options: { weight: 4 }},
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Ribombee', 8557232, 61),
                new GymPokemon('Bewear', 8557232, 61),
            ], { weight: 1 }, 'Leticia', '(female)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Manectric', 17114463, 59)], { weight: 1 }, 'Maria', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Alolan Dugtrio', 8557232, 59),
                new GymPokemon('Mudsdale', 8557232, 59),
            ], { weight: 1 }, 'Travis'),
    ],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    12835847,
    [
        new DungeonBossPokemon('Golbat', 64179233, 59),
        new DungeonBossPokemon('Noivern', 64179233, 59),
        new DungeonBossPokemon('Guzzlord', 64179233, 70),
    ],
    1250000, 30);




//Galar Dungeons

dungeonList['Slumbering Weald'] = new Dungeon('Slumbering Weald',
    ['Hoothoot', 'Grubbin', 'Skwovet', 'Rookidee'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Blipbug', 8000000, 70)],
    96500, 201);

dungeonList['Inner Slumbering Weald'] = new Dungeon('Inner Slumbering Weald',
    ['Galarian Weezing', 'Corviknight', 'Galarian Stunfisk', 'Munna', 'Butterfree', 'Orbeetle'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Zamazenta (Battle Hero)', 8000000, 70),
        new DungeonBossPokemon('Zacian (Battle Hero)', 8000000, 70),
    ],
    96500, 201);

dungeonList['Galar Mine'] = new Dungeon('Galar Mine',
    ['Diglett', 'Roggenrola', 'Woobat', 'Drilbur', 'Timburr', 'Rolycoly'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Carkol', 8000000, 70),
        new DungeonBossPokemon('Woobat', 8000000, 70),
    ],
    96500, 201);

dungeonList['Galar Mine No. 2'] = new Dungeon('Galar Mine No. 2',
    ['Shuckle', 'Shellos (east)', 'Croagunk', 'Scraggy', 'Binacle', 'Noibat', 'Chewtle'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Galarian Stunfisk', 8000000, 70),
        new DungeonBossPokemon('Gastrodon (east)', 8000000, 70),
        new DungeonBossPokemon('Drednaw', 8000000, 70),
    ],
    96500, 201);

dungeonList['Rose Tower'] = new Dungeon('Rose Tower',
    ['Cufant', 'Bronzong', 'Klang', 'Mawile', 'Steelix', 'Galarian Stunfisk'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Froslass', 8000000, 70),
        new DungeonBossPokemon('Tsareena', 8000000, 70),
        new DungeonBossPokemon('Salazzle', 8000000, 70),
        new DungeonBossPokemon('Milotic', 8000000, 70),
        new DungeonBossPokemon('Garbodor', 8000000, 70),
    ],
    96500, 201);

dungeonList['Glimwood Tangle'] = new Dungeon('Glimwood Tangle',
    ['Galarian Ponyta', 'Spritzee', 'Swirlix', 'Phantump', 'Oranguru', 'Passimian', 'Sinistea'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Hattrem', 8000000, 70),
        new DungeonBossPokemon('Morgrem', 8000000, 70),
        new DungeonBossPokemon('Indeedee', 8000000, 70),
    ],
    96500, 201);

dungeonList['Watchtower Ruins'] = new Dungeon('Watchtower Ruins',
    ['Gastly', 'Noibat', 'Purrloin', 'Duskull', 'Woobat', 'Haunter', 'Shuckle', 'Ralts', 'Golett', 'Electrike', 'Snorunt'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Corviknight', 8000000, 70),
        new DungeonBossPokemon('Golurk', 8000000, 70),
        new DungeonBossPokemon('Drifblim', 8000000, 70),
        new DungeonBossPokemon('Glalie', 8000000, 70),
    ],
    96500, 201);

dungeonList['Lake of Outrage'] = new Dungeon('Lake of Outrage',
    ['Stonjourner', 'Cramorant', 'Galarian Mr. Mime', 'Morpeko', 'Coalossal', 'Sandaconda', 'Galarian Stunfisk', 'Copperajah', 'Indeedee', 'Obstagoon', 'Grimmsnarl'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Hatterene', 8000000, 70),
        new DungeonBossPokemon('Perrserker', 8000000, 70),
        new DungeonBossPokemon('Barraskewda', 8000000, 70),
        new DungeonBossPokemon('Drakloak', 8000000, 70),
    ],
    96500, 201);

dungeonList['Dusty Bowl'] = new Dungeon('Dusty Bowl',
    ['Gurdurr', 'Ferrothorn', 'Klang', 'Meowstic', 'Barbaracle', 'Applin', 'Hattrem', 'Qwilfish', 'Hitmonlee', 'Hitmonchan', 'Koffing'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Gigalith', 8000000, 70),
        new DungeonBossPokemon('Flygon', 8000000, 70),
        new DungeonBossPokemon('Sigilyph', 8000000, 70),
        new DungeonBossPokemon('Tyranitar', 8000000, 70),
    ],
    96500, 201);



//Isle of Armor
dungeonList['Master Dojo Trial'] = new Dungeon('Master Dojo Trial',
    ['Mienfoo', 'Shinx', 'Kadabra', 'Whirlipede'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Kubfu', 8000000, 70)],
    96500, 201);

dungeonList['Tower of Darkness'] = new Dungeon('Tower of Darkness',
    ['Zorua', 'Scraggy', 'Inkay', 'Krokorok'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Kubfu', 8000000, 70)],
    96500, 201);

dungeonList['Tower of Water'] = new Dungeon('Tower of Water',
    ['Psyduck', 'Krabby', 'Marill', 'Poliwhirl'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Kubfu', 8000000, 70)],
    96500, 201);


//Crown Tundra
dungeonList['Rock Peak Ruins'] = new Dungeon('Rock Peak Ruins',
    ['Trevenant', 'Stonjourner', 'Heatmor', 'Conkeldurr', 'Rhyperior', 'Aerodactyl'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Relicanth', 8000000, 70),
        new DungeonBossPokemon('Regirock', 8000000, 70),
    ],
    96500, 201);

dungeonList['Iron Ruins'] = new Dungeon('Iron Ruins',
    ['Metang', 'Bronzong', 'Dragapult', 'Snorlax', 'Magmortar'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Metagross', 8000000, 70),
        new DungeonBossPokemon('Registeel', 8000000, 70),
    ],
    96500, 201);

dungeonList['Iceberg Ruins'] = new Dungeon('Iceberg Ruins',
    ['Cryogonal', 'Beartic', 'Galarian Darmanitan', 'Aurorus', 'Weavile', 'Vanilluxe', 'Absol', 'Froslass', 'Delibird'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Glalie', 8000000, 70),
        new DungeonBossPokemon('Regice', 8000000, 70),
    ],
    96500, 201);

dungeonList['Split-Decision Ruins'] = new Dungeon('Split-Decision Ruins',
    ['Golurk', 'Electabuzz', 'Drakloak', 'Araquanid', 'Cryogonal', 'Bronzong', 'Claydol', 'Absol', 'Galvantula', 'Audino'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Dragapult', 8000000, 70),
        new DungeonBossPokemon('Electivire', 8000000, 70),
        new DungeonBossPokemon('Regidrago', 8000000, 70),
        new DungeonBossPokemon('Regieleki', 8000000, 70),
    ],
    96500, 201);

dungeonList['Dyna Tree Hill'] = new Dungeon('Dyna Tree Hill',
    ['Magmar', 'Absol', 'Beartic', 'Cryogonal', 'Dubwool', 'Glalie', 'Clefable'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [new DungeonBossPokemon('Greedent', 8000000, 70)],
    96500, 201);

dungeonList['Crown Shrine'] = new Dungeon('Crown Shrine',
    ['Snom', 'Hatenna', 'Solosis', 'Jynx', 'Piloswine', 'Dubwool'],
    [{loot: 'xClick', weight: 4}, {loot: 'Item_magnet', weight: 4}],
    2203000,
    [
        new DungeonBossPokemon('Sneasel', 8000000, 70),
        new DungeonBossPokemon('Calyrex', 8000000, 70, {
            requirement: new MultiRequirement([
                new ObtainedPokemonRequirement(pokemonMap.Spectrier),
                new ObtainedPokemonRequirement(pokemonMap.Glastrier),
            ])}),
    ],
    96500, 201);
