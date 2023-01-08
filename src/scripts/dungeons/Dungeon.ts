///<reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="DungeonBossPokemon.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/MultiRequirement.d.ts"/>
///<reference path="../../declarations/requirements/SeededDateRequirement.d.ts"/>
///<reference path="../../declarations/requirements/DayOfWeekRequirement.d.ts"/>
///<reference path="../../declarations/requirements/ObtainedPokemonRequirement.d.ts"/>
///<reference path="../../declarations/utilities/SeededDateRand.d.ts"/>
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
    ignoreDebuff?: boolean,
}

type LootTier = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
type LootTable = Partial<Record<LootTier, Loot[]>>;

// These should add up to 1 if you want to keep it easy to judge chances
const baseLootTierChance: Record<LootTier, number> = {
    common: 0.75,
    rare: 0.2,
    epic: 0.04,
    legendary: 0.0099,
    mythic: 0.0001,
};

const nerfedLootTierChance: Record<LootTier, number> = {
    common: 0.75,
    rare: 0.24,
    epic: 0.009,
    legendary: 0.00099,
    mythic: 0.00001,
};

// Should sum to 0
const lootRedistribution: Record<LootTier, number> = {
    common: -1,
    rare: 0.33,
    epic: 0.4,
    legendary: 0.2,
    mythic: 0.07,
};

// Max amount to take from common and redistibute @ 500 clears
const lootRedistibuteAmount = 0.15;

type Enemy = PokemonNameType | DetailedPokemon | DungeonTrainer;

type Boss = DungeonBossPokemon | DungeonTrainer;

interface EncounterInfo {
    image: string,
    shiny: boolean,
    hide: boolean,
    uncaught: boolean,
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
 interface optionalDungeonParameters {
    dungeonRegionalDifficulty?: GameConstants.Region,
}
class Dungeon {

    constructor(
        public name: string,
        public enemyList: Enemy[],
        public lootTable: LootTable,
        public baseHealth: number,
        public bossList: Boss[],
        public tokenCost: number,
        public difficultyRoute: number, // Closest route in terms of difficulty, used for egg steps, dungeon tokens etc.
        public rewardFunction = () => {},
        public optionalParameters: optionalDungeonParameters = {}
    ) { }

    public isUnlocked(): boolean {
        // Player requires the Dungeon Ticket to access the dungeons
        if (!App.game.keyItems.hasKeyItem(KeyItemType.Dungeon_ticket)) {
            Notifier.notify({
                message: 'You need the Dungeon Ticket to access dungeons.\n<i>Check out the shop at Viridian City.</i>',
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

        encounterInfo.concat(this.getCaughtMimics());

        return encounterInfo;
    }

    public getCaughtMimics(): PokemonNameType[] {
        const encounterInfo = [];
        Object.entries(this.lootTable).forEach(([tier, itemList]) => {
            itemList.forEach((loot, i) => {
                const mimic = pokemonMap[loot.loot].name;
                if (mimic != 'MissingNo.' && App.game.party.alreadyCaughtPokemonByName(mimic)) {
                    encounterInfo.push(mimic);
                }
            });
        });
        return encounterInfo;
    }

    public getRandomLootTier(clears: number, debuffed = false): LootTier {
        const tierWeights = this.getLootTierWeights(clears, debuffed);
        return Rand.fromWeightedArray(Object.keys(tierWeights), Object.values(tierWeights)) as LootTier;
    }

    public getRandomLoot(tier: LootTier, onlyDebuffable = false): Loot {
        const lootTable = this.lootTable[tier].filter((loot) => ((!loot.requirement || loot.requirement.isCompleted()) && (!ItemList[loot.loot] || (ItemList[loot.loot].isAvailable() && !ItemList[loot.loot].isSoldOut()))) && !(onlyDebuffable && loot.ignoreDebuff));
        return Rand.fromWeightedArray(lootTable, lootTable.map((loot) => loot.weight ?? 1));
    }

    public getLootTierWeights(clears: number, debuffed : boolean): Record<LootTier, number> {
        if (debuffed) {
            return Object.entries(nerfedLootTierChance).reduce((chances, [tier, chance]) => {
                if (tier in this.lootTable &&
                    this.lootTable[tier].some((loot) => !loot.requirement || loot.requirement.isCompleted())) {
                    chances[tier] = chance;
                }
                return chances;
            }, {} as Record<LootTier, number>);
        }

        const timesCleared = Math.min(500, Math.max(1, clears));
        const redist = lootRedistibuteAmount * timesCleared / 500;

        const updatedChances = Object.entries(baseLootTierChance).reduce((chances, [tier, chance]) => {
            if (tier in this.lootTable &&
                this.lootTable[tier].some((loot) => !loot.requirement || loot.requirement.isCompleted())) {
                chances[tier] = chance + (redist * lootRedistribution[tier]);
            }
            return chances;
        }, {} as Record<LootTier, number>);

        return updatedChances;
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
        return this.pokemonList.concat(this.bossPokemonList, this.getCaughtMimics());
    }


    /**
     * Gets all non-boss Pokemon encounters in the dungeon
     * Used for generating the dungeon encounter list view
     */
    get normalEncounterList(): EncounterInfo[] {
        const encounterInfo = [];
        let pokemonName: PokemonNameType;
        let hideEncounter = false;

        const getEncounterInfo = function(pokemonName, mimic) {
            const encounter = {
                image: `assets/images/${(App.game.party.alreadyCaughtPokemonByName(pokemonName, true) ? 'shiny' : '')}pokemon/${pokemonMap[pokemonName].id}.png`,
                shiny:  App.game.party.alreadyCaughtPokemonByName(pokemonName, true),
                hide: hideEncounter,
                uncaught: !App.game.party.alreadyCaughtPokemonByName(pokemonName),
                lock: false,
                lockMessage: '',
                mimic: mimic,
            };
            return encounter;
        };

        // Handling minions
        this.enemyList.forEach((enemy) => {
            // Handling Pokemon
            if (typeof enemy === 'string' || enemy.hasOwnProperty('pokemon')) {
                if (enemy.hasOwnProperty('pokemon')) {
                    pokemonName = (<DetailedPokemon>enemy).pokemon;
                    hideEncounter = (<DetailedPokemon>enemy).options?.hide ? ((<DetailedPokemon>enemy).options?.requirement ? !(<DetailedPokemon>enemy).options?.requirement.isCompleted() : (<DetailedPokemon>enemy).options?.hide) : false;
                } else {
                    pokemonName = <PokemonNameType>enemy;
                }
                encounterInfo.push(getEncounterInfo(pokemonName, false));
            // Handling Trainers
            } else { /* We don't display minion Trainers */ }
        });

        // Handling Mimics
        this.getCaughtMimics().forEach(enemy => {
            pokemonName = <PokemonNameType>enemy;
            encounterInfo.push(getEncounterInfo(pokemonName, true));
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
                    uncaught: !App.game.party.alreadyCaughtPokemonByName(pokemonName),
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
                    uncaught: false,
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
        {pokemon: 'Caterpie', options: { weight: 4 }},
        {pokemon: 'Metapod', options: { weight: 4 }},
        {pokemon: 'Weedle', options: { weight: 4 }},
        {pokemon: 'Kakuna', options: { weight: 4 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Weedle', 50, 6),
                new GymPokemon('Caterpie', 50, 6),
            ], { weight: 1 }, 'Rick'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Weedle', 50, 7),
                new GymPokemon('Kakuna', 50, 7),
                new GymPokemon('Weedle', 50, 7),
            ], { weight: 1 }, 'Doug'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Caterpie', 50, 7),
                new GymPokemon('Caterpie', 50, 8),
            ], { weight: 1 }, 'Anthony'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Metapod', 50, 7),
                new GymPokemon('Caterpie', 50, 7),
                new GymPokemon('Metapod', 50, 7),
            ], { weight: 1 }, 'Charlie'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Pecha'},
        ],
        epic: [{loot: 'Pokeball'}],
        mythic: [{loot: 'SmallRestore'}],
    },
    102,
    [
        new DungeonBossPokemon('Pikachu', 510, 7),
        new DungeonTrainer('Bug Catcher',
            [new GymPokemon('Weedle', 510, 9)],
            { weight: 1 }, 'Sammy'),
    ],
    50, 1);

dungeonList['Mt. Moon'] = new Dungeon('Mt. Moon',
    [
        {pokemon: 'Clefairy', options: { weight: 11 }},
        {pokemon: 'Zubat', options: { weight: 11 }},
        {pokemon: 'Paras', options: { weight: 11 }},
        {pokemon: 'Geodude', options: { weight: 11 }},
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Weedle', 75, 11),
                new GymPokemon('Kakuna', 75, 11),
            ], { weight: 1 }, 'Kent'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Clefairy', 75, 14)],
            { weight: 1 }, 'Iris'),
        new DungeonTrainer('Super Nerd',
            [
                new GymPokemon('Magnemite', 75, 11),
                new GymPokemon('Voltorb', 75, 11),
            ], { weight: 1 }, 'Jovan'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Caterpie', 75, 10),
                new GymPokemon('Metapod', 75, 10),
                new GymPokemon('Caterpie', 75, 10),
            ], { weight: 1 }, 'Robby'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Oddish', 75, 11),
                new GymPokemon('Bellsprout', 75, 11),
            ], { weight: 1 }, 'Miriam'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Rattata', 75, 10),
                new GymPokemon('Rattata', 75, 10),
                new GymPokemon('Zubat', 75, 10),
            ], { weight: 1 }, 'Josh'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 75, 10),
                new GymPokemon('Geodude', 75, 10),
                new GymPokemon('Onix', 75, 10),
            ], { weight: 1 }, 'Marcos'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Sandshrew', 75, 11),
                new GymPokemon('Rattata', 75, 11),
                new GymPokemon('Zubat', 75, 11),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 75, 13),
                new GymPokemon('Ekans', 75, 13),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 75, 13),
                new GymPokemon('Sandshrew', 75, 13),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 75, 13),
                new GymPokemon('Zubat', 75, 13),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Dowsing_machine'},
        ],
        mythic: [
            {loot: 'Greatball', weight: 2},
            {loot: 'SmallRestore'},
            {loot: 'Star Piece'},
        ],
    },
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
        const item = Rand.boolean() ? 'Dome Fossil' : 'Helix Fossil';

        Underground.gainMineItem(UndergroundItems.getByName(item).id, 1);
        Notifier.notify({
            message: `You were awarded a ${GameConstants.humanifyString(item)} for defeating the Super Nerd!`,
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
        });
    });

dungeonList['Diglett\'s Cave'] = new Dungeon('Diglett\'s Cave',
    ['Diglett'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        mythic: [
            {loot: 'Wiki', weight: 2},
            {loot: 'Max Revive'},
        ],
    },
    2962,
    [new DungeonBossPokemon('Dugtrio', 16040, 31)],
    250, 11);

dungeonList['Rock Tunnel'] = new Dungeon('Rock Tunnel',
    [
        {pokemon: 'Zubat', options: { weight: 14 }},
        {pokemon: 'Mankey', options: { weight: 14 }},
        {pokemon: 'Geodude', options: { weight: 14 }},
        {pokemon: 'Machop', options: { weight: 14 }},
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Cubone', 500, 23),
                new GymPokemon('Slowpoke', 500, 23),
            ], { weight: 1 }, 'Ashton'),
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Slowpoke', 500, 25)],
            { weight: 1 }, 'Winston'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Oddish', 500, 22),
                new GymPokemon('Bulbasaur', 500, 22),
            ], { weight: 1 }, 'Martha'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Charmander', 500, 22),
                new GymPokemon('Cubone', 500, 22),
            ], { weight: 1 }, 'Steve'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Geodude', 500, 25)],
            { weight: 1 }, 'Allen'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Machop', 500, 20),
                new GymPokemon('Onix', 500, 20),
            ], { weight: 1 }, 'Eric'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 500, 19),
                new GymPokemon('Machop', 500, 19),
                new GymPokemon('Geodude', 500, 19),
                new GymPokemon('Geodude', 500, 19),
            ], { weight: 1 }, 'Lenny'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Onix', 500, 20),
                new GymPokemon('Onix', 500, 20),
                new GymPokemon('Geodude', 500, 20),
            ], { weight: 1 }, 'Oliver'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 500, 21),
                new GymPokemon('Graveler', 500, 21),
            ], { weight: 1 }, 'Lucas'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Jigglypuff', 500, 21),
                new GymPokemon('Pidgey', 500, 21),
                new GymPokemon('Meowth', 500, 21),
            ], { weight: 1 }, 'Sofia'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 500, 21),
                new GymPokemon('Geodude', 500, 21),
                new GymPokemon('Graveler', 500, 21),
            ], { weight: 1 }, 'Dudley'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Slowpoke', 500, 20),
                new GymPokemon('Slowpoke', 500, 20),
                new GymPokemon('Slowpoke', 500, 20),
            ], { weight: 1 }, 'Cooper'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Bellsprout', 500, 22),
                new GymPokemon('Clefairy', 500, 22),
            ], { weight: 1 }, 'Leah'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Meowth', 500, 20),
                new GymPokemon('Oddish', 500, 20),
                new GymPokemon('Pidgey', 500, 20),
            ], { weight: 1 }, 'Dana'),
    ],
    {
        common: [
            {loot: 'xClick', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Geodude'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        legendary: [
            {loot: 'Greatball'},
            {loot: 'MediumRestore'},
            {loot: 'Oval Stone'},
            {loot: 'Revive'},
        ],
        mythic: [
            {loot: 'Star Piece', weight: 1.5},
            {loot: 'Heart Scale'},
        ],
    },
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
    500, 9);

dungeonList['Rocket Game Corner'] = new Dungeon('Rocket Game Corner',
    [
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Drowzee', 2910, 21),
                new GymPokemon('Machop', 2910, 21),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 2910, 21),
                new GymPokemon('Raticate', 2910, 21),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 1455, 19),
                new GymPokemon('Raticate', 1455, 19),
                new GymPokemon('Raticate', 1455, 19),
                new GymPokemon('Rattata', 1455, 19),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Grimer', 1940, 20),
                new GymPokemon('Koffing', 1940, 20),
                new GymPokemon('Koffing', 1940, 20),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Grimer', 2910, 22),
                new GymPokemon('Koffing', 2910, 22),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 1164, 17),
                new GymPokemon('Koffing', 1164, 17),
                new GymPokemon('Grimer', 1164, 17),
                new GymPokemon('Zubat', 1164, 17),
                new GymPokemon('Raticate', 1164, 17),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Machop', 2910, 21),
                new GymPokemon('Machop', 2910, 21),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 1940, 20),
                new GymPokemon('Raticate', 1940, 20),
                new GymPokemon('Drowzee', 1940, 20),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 2910, 21),
                new GymPokemon('Zubat', 2910, 21),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Sandshrew', 1940, 23),
                new GymPokemon('Ekans', 1940, 23),
                new GymPokemon('Sandslash', 1940, 23),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Ekans', 1940, 23),
                new GymPokemon('Sandshrew', 1940, 23),
                new GymPokemon('Arbok', 1940, 23),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Pokeball'}],
        legendary: [
            {loot: 'Greatball', weight: 2},
            {loot: 'Revive'},
            {loot: 'Nestball'},
        ],
        mythic: [
            {loot: 'LargeRestore'},
            {loot: 'Max Revive'},
            {loot: 'Star Piece'},
        ],
    },
    5820,
    [
        new DungeonTrainer('Team Rocket Boss',
            [
                new GymPokemon('Onix', 9501, 25),
                new GymPokemon('Rhyhorn', 9501, 24),
                new GymPokemon('Kangaskhan', 10101, 29),
            ], { weight: 1 }, 'Giovanni', '(giovanni)'),
    ],
    625, 7);

dungeonList['Pokémon Tower'] = new Dungeon('Pokémon Tower',
    [
        {pokemon: 'Gastly', options: { weight: 21.3 }},
        {pokemon: 'Haunter', options: { weight: 21.3 }},
        {pokemon: 'Cubone', options: { weight: 21.3 }},
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 23)],
            { weight: 1 }, 'Hope'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 22)],
            { weight: 1 }, 'Patricia'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            { weight: 1 }, 'Carly'),
        new DungeonTrainer('Channeler',
            [
                new GymPokemon('Gastly', 750, 23),
                new GymPokemon('Gastly', 750, 23),
            ], { weight: 1 }, 'Laurel'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 22)],
            { weight: 1 }, 'Jody'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            { weight: 1 }, 'Paula'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 22)],
            { weight: 1 }, 'Ruth'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Haunter', 750, 23)],
            { weight: 1 }, 'Tammy'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            { weight: 1 }, 'Karina'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 22)],
            { weight: 1 }, 'Janae'),
        new DungeonTrainer('Channeler',
            [
                new GymPokemon('Gastly', 750, 22),
                new GymPokemon('Gastly', 750, 22),
                new GymPokemon('Gastly', 750, 22),
            ], { weight: 1 }, 'Angelica'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            { weight: 1 }, 'Jennifer'),
        new DungeonTrainer('Channeler',
            [new GymPokemon('Gastly', 750, 24)],
            { weight: 1 }, 'Emilia'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 750, 25),
                new GymPokemon('Zubat', 750, 25),
                new GymPokemon('Golbat', 750, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 750, 26),
                new GymPokemon('Drowzee', 750, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 750, 23),
                new GymPokemon('Rattata', 750, 23),
                new GymPokemon('Raticate', 750, 23),
                new GymPokemon('Zubat', 750, 23),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Chesto'},
        ],
        rare: [{loot: 'Green Shard'}],
        legendary: [
            {loot: 'Greatball'},
            {loot: 'MediumRestore'},
            {loot: 'Star Piece'},
            {loot: 'Revive'},
        ],
        mythic: [
            {loot: 'Rare Bone'},
            {loot: 'Ultraball'},
            {loot: 'LargeRestore'},
        ],
    },
    7523,
    [new DungeonBossPokemon('Marowak', 37615, 30)],
    750, 7);

dungeonList['Silph Co.'] = new Dungeon('Silph Co.',
    [
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Golbat', 2103, 25),
                new GymPokemon('Zubat', 2103, 25),
                new GymPokemon('Zubat', 2103, 25),
                new GymPokemon('Raticate', 2103, 25),
                new GymPokemon('Zubat', 2103, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 3505, 28),
                new GymPokemon('Voltorb', 3505, 28),
                new GymPokemon('Magneton', 3505, 28),
            ], { weight: 1 }, 'Jerry', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Cubone', 5258, 29),
                new GymPokemon('Zubat', 5258, 29),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Grimer', 2629, 26),
                new GymPokemon('Weezing', 2629, 26),
                new GymPokemon('Koffing', 2629, 26),
                new GymPokemon('Weezing', 2629, 26),
            ], { weight: 1 }, 'Connor', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 3505, 28),
                new GymPokemon('Hypno', 3505, 28),
                new GymPokemon('Raticate', 3505, 28),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 5258, 29),
                new GymPokemon('Weezing', 5258, 29),
            ], { weight: 1 }, 'Jose', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Ekans', 3505, 28),
                new GymPokemon('Zubat', 3505, 28),
                new GymPokemon('Cubone', 3505, 28),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Machop', 5258, 29),
                new GymPokemon('Drowzee', 5258, 29),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Electrode', 10515, 33)],
            { weight: 1 }, 'Rodney', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Hypno', 10515, 33)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Juggler',
            [
                new GymPokemon('Kadabra', 5258, 29),
                new GymPokemon('Mr. Mime', 5258, 29),
            ], { weight: 1 }, 'Dalton'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magneton', 2629, 26),
                new GymPokemon('Magnemite', 2629, 26),
                new GymPokemon('Koffing', 2629, 26),
                new GymPokemon('Weezing', 2629, 26),
            ], { weight: 1 }, 'Beau', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Arbok', 10515, 33)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Machop', 5258, 29),
                new GymPokemon('Machoke', 5258, 29),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 3505, 28),
                new GymPokemon('Zubat', 3505, 28),
                new GymPokemon('Golbat', 3505, 28),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Voltorb', 2103, 25),
                new GymPokemon('Koffing', 2103, 25),
                new GymPokemon('Magneton', 2103, 25),
                new GymPokemon('Magnemite', 2103, 25),
                new GymPokemon('Koffing', 2103, 25),
            ], { weight: 1 }, 'Taylor', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Cubone', 5258, 29),
                new GymPokemon('Cubone', 5258, 29),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 2629, 26),
                new GymPokemon('Zubat', 2629, 26),
                new GymPokemon('Golbat', 2629, 26),
                new GymPokemon('Rattata', 2629, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 5258, 29),
                new GymPokemon('Muk', 5258, 29),
            ], { weight: 1 }, 'Joshua', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Sandshrew', 5258, 29),
                new GymPokemon('Sandslash', 5258, 29),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 2629, 26),
                new GymPokemon('Golbat', 2629, 26),
                new GymPokemon('Arbok', 2629, 26),
                new GymPokemon('Koffing', 2629, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Weezing', 3505, 28),
                new GymPokemon('Golbat', 3505, 28),
                new GymPokemon('Koffing', 3505, 28),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Grimer', 5258, 29),
                new GymPokemon('Electrode', 5258, 29),
            ], { weight: 1 }, 'Parker', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Golbat', 3505, 28),
                new GymPokemon('Drowzee', 3505, 28),
                new GymPokemon('Hypno', 3505, 28),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Drowzee', 3505, 28),
                new GymPokemon('Grimer', 3505, 28),
                new GymPokemon('Machop', 3505, 28),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Voltorb', 3505, 28),
                new GymPokemon('Magneton', 3505, 28),
                new GymPokemon('Koffing', 3505, 28),
            ], { weight: 1 }, 'Ed', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Machoke', 10515, 33)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 5258, 29),
                new GymPokemon('Koffing', 5258, 29),
            ], { weight: 1 }, 'Travis', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 2103, 25),
                new GymPokemon('Zubat', 2103, 25),
                new GymPokemon('Ekans', 2103, 25),
                new GymPokemon('Rattata', 2103, 25),
                new GymPokemon('Rattata', 2103, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Cubone', 3505, 32),
                new GymPokemon('Drowzee', 3505, 32),
                new GymPokemon('Marowak', 3505, 32),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine', weight: 3},
            {loot: 'Lucky_incense', weight: 2},
            {loot: 'Pokeball'},
            {loot: 'Electrode'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Red Shard'},
        ],
        legendary: [{loot: 'Greatball'}],
        mythic: [{loot: 'Ultraball'}],
    },
    10515,
    [
        new DungeonTrainer('Team Rocket Boss',
            [
                new GymPokemon('Nidorino', 12144, 37),
                new GymPokemon('Rhyhorn', 12144, 37),
                new GymPokemon('Kangaskhan', 12144, 35),
                new GymPokemon('Nidoqueen', 16144, 41),
            ], { weight: 1 }, 'Giovanni', '(giovanni)'),
    ],
    875, 7);

dungeonList['Power Plant'] = new Dungeon('Power Plant',
    ['Pikachu', 'Magnemite', 'Magneton', 'Voltorb', 'Electrode'],
    {
        common: [
            {loot: 'Lucky_incense', weight: 4},
            {loot: 'Cheri', weight: 2},
            {loot: 'Electrode'},
        ],
        rare: [{loot: 'Yellow Shard'}],
        mythic: [{loot: 'Max Revive'}],
    },
    13507,
    [
        new DungeonBossPokemon('Electabuzz', 67535, 35),
        new DungeonBossPokemon('Zapdos', 101302, 50),
    ],
    1000, 18);

dungeonList['Seafoam Islands'] = new Dungeon('Seafoam Islands',
    ['Zubat', 'Golbat', 'Psyduck', 'Golduck', 'Slowpoke', 'Slowbro', 'Krabby', 'Horsea', 'Magikarp'],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Aspear'},
        ],
        rare: [{loot: 'Blue Shard'}],
        legendary: [{loot: 'Revive'}],
        mythic: [{loot: 'Ultraball'}],
    },
    17226,
    [
        new DungeonBossPokemon('Seel', 86130, 35),
        new DungeonBossPokemon('Articuno', 129195, 50),
    ],
    1250, 19);

dungeonList['Pokémon Mansion'] = new Dungeon('Pokémon Mansion',
    [
        {pokemon: 'Rattata', options: { weight: 3.11 }},
        {pokemon: 'Raticate', options: { weight: 3.11 }},
        {pokemon: 'Vulpix', options: { weight: 3.11 }},
        {pokemon: 'Growlithe', options: { weight: 3.11 }},
        {pokemon: 'Grimer', options: { weight: 3.11 }},
        {pokemon: 'Muk', options: { weight: 3.11 }},
        {pokemon: 'Koffing', options: { weight: 3.11 }},
        {pokemon: 'Weezing', options: { weight: 3.11 }},
        {pokemon: 'Ditto', options: { weight: 3.11 }},
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Ekans', 1500, 33),
                new GymPokemon('Ekans', 1500, 33),
                new GymPokemon('Raticate', 1500, 34),
            ], { weight: 1 }, 'Johnson'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Charmander', 1500, 34),
                new GymPokemon('Charmeleon', 1500, 34),
            ], { weight: 1 }, 'Arnie'),
        new DungeonTrainer('Burglar',
            [new GymPokemon('Ninetales', 1500, 38)],
            { weight: 1 }, 'Simon'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 1500, 33),
                new GymPokemon('Magneton', 1500, 33),
                new GymPokemon('Voltorb', 1500, 33),
            ], { weight: 1 }, 'Braydon', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 1500, 29),
                new GymPokemon('Weezing', 1500, 29),
            ], { weight: 1 }, 'Ted', '(male)'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Growlithe', 1500, 34),
                new GymPokemon('Ponyta', 1500, 34),
            ], { weight: 1 }, 'Lewis'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 1500, 34),
                new GymPokemon('Electrode', 1500, 34),
            ], { weight: 1 }, 'Ivan', '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Rawst'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [{loot: 'Figy'}],
        legendary: [{loot: 'Ultraball'}],
        mythic: [{loot: 'Max Revive'}],
    },
    17760,
    [new DungeonBossPokemon('Magmar', 88800, 40)],
    1500, 20);

dungeonList['Mt. Ember Summit'] = new Dungeon('Mt. Ember Summit',
    [
        {pokemon: 'Spearow', options: { weight: 1.5 }},
        {pokemon: 'Fearow', options: { weight: 1.5 }},
        {pokemon: 'Machop', options: { weight: 1.5 }},
        {pokemon: 'Machoke', options: { weight: 1.5 }},
        {pokemon: 'Geodude', options: { weight: 1.5 }},
        {pokemon: 'Graveler', options: { weight: 1.5 }},
        {pokemon: 'Ponyta', options: { weight: 1.5 }},
        {pokemon: 'Rapidash', options: { weight: 1.5 }},
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Bellsprout', 18120, 38),
                new GymPokemon('Gloom', 18120, 38),
                new GymPokemon('Gloom', 18120, 38),
            ], { weight: 1 }, 'Beth', '(female)'),
        new DungeonTrainer('Crush Girl',
            [
                new GymPokemon('Hitmonchan', 18120, 38),
                new GymPokemon('Hitmonchan', 18120, 38),
            ], { weight: 1 }, 'Jocelyn'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Exeggcute', 18120, 37),
                new GymPokemon('Exeggutor', 18120, 40),
            ], { weight: 1 }, 'Logan', '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Token_collector'},
        ],
        rare: [{loot: 'Red Shard'}],
        legendary: [{loot: 'Ultraball'}],
    },
    18120,
    [
        new DungeonBossPokemon('Magmar', 101427, 40),
        new DungeonBossPokemon('Moltres', 184462, 50),
    ],
    1750, 27);

dungeonList['Berry Forest'] = new Dungeon('Berry Forest',
    ['Pidgey', 'Pidgeotto', 'Oddish', 'Gloom', 'Venonat', 'Psyduck', 'Golduck', 'Poliwag', 'Bellsprout', 'Weepinbell', 'Slowpoke', 'Slowbro', 'Drowzee', 'Exeggcute', 'Goldeen', 'Magikarp'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Cheri'},
            {loot: 'Chesto'},
            {loot: 'Pecha'},
            {loot: 'Rawst'},
            {loot: 'Aspear'},
            {loot: 'Leppa'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Razz'},
            {loot: 'Persim'},
            {loot: 'Bluk'},
            {loot: 'Nanab'},
            {loot: 'Wepear'},
            {loot: 'Iapapa'},
        ],
        mythic: [{loot: 'Lum', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Berry Forest'))}],
    },
    18120,
    [
        new DungeonBossPokemon('Venomoth', 101427, 30),
        new DungeonBossPokemon('Hypno', 101427, 30),
    ],
    1750, 29);

dungeonList['Victory Road'] = new Dungeon('Victory Road',
    [
        {pokemon: 'Arbok', options: { weight: 4.88 }},
        {pokemon: 'Sandslash', options: { weight: 4.88 }},
        {pokemon: 'Zubat', options: { weight: 4.88 }},
        {pokemon: 'Golbat', options: { weight: 4.88 }},
        {pokemon: 'Primeape', options: { weight: 4.88 }},
        {pokemon: 'Machop', options: { weight: 4.88 }},
        {pokemon: 'Geodude', options: { weight: 4.88 }},
        {pokemon: 'Onix', options: { weight: 4.88 }},
        {pokemon: 'Marowak', options: { weight: 4.88 }},
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Persian', 2000, 42),
                new GymPokemon('Ponyta', 2000, 42),
                new GymPokemon('Rapidash', 2000, 42),
                new GymPokemon('Vulpix', 2000, 42),
                new GymPokemon('Ninetales', 2000, 42),
            ], { weight: 1 }, 'Naomi', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Raticate', 2000, 42),
                new GymPokemon('Ivysaur', 2000, 42),
                new GymPokemon('Wartortle', 2000, 42),
                new GymPokemon('Charmeleon', 2000, 42),
                new GymPokemon('Charizard', 2000, 42),
            ], { weight: 1 }, 'Rolando', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Machoke', 2000, 43),
                new GymPokemon('Machop', 2000, 43),
                new GymPokemon('Machoke', 2000, 43),
            ], { weight: 1 }, 'Daisuke'),
        new DungeonTrainer('Juggler',
            [
                new GymPokemon('Drowzee', 2000, 41),
                new GymPokemon('Hypno', 2000, 41),
                new GymPokemon('Kadabra', 2000, 41),
                new GymPokemon('Kadabra', 2000, 41),
            ], { weight: 1 }, 'Nelson'),
        new DungeonTrainer('Tamer',
            [
                new GymPokemon('Persian', 2000, 44),
                new GymPokemon('Golduck', 2000, 44),
            ], { weight: 1 }, 'Vincent'),
        new DungeonTrainer('Juggler',
            [new GymPokemon('Mr. Mime', 2000, 48)],
            { weight: 1 }, 'Gregory'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Exeggutor', 2000, 42),
                new GymPokemon('Sandslash', 2000, 42),
                new GymPokemon('Cloyster', 2000, 42),
                new GymPokemon('Electrode', 2000, 42),
                new GymPokemon('Arcanine', 2000, 42),
            ], { weight: 1 }, 'George', '(male)'),
        new DungeonTrainer('PokéManiac',
            [
                new GymPokemon('Charmeleon', 2000, 40),
                new GymPokemon('Lapras', 2000, 40),
                new GymPokemon('Lickitung', 2000, 40),
            ], { weight: 1 }, 'Dawson'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Clefairy', 2000, 42),
                new GymPokemon('Jigglypuff', 2000, 42),
                new GymPokemon('Persian', 2000, 42),
                new GymPokemon('Dewgong', 2000, 42),
                new GymPokemon('Chansey', 2000, 42),
            ], { weight: 1 }, 'Alexa', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Kingler', 2000, 41),
                new GymPokemon('Poliwhirl', 2000, 42),
                new GymPokemon('Tentacruel', 2000, 42),
                new GymPokemon('Seadra', 2000, 42),
                new GymPokemon('Blastoise', 2000, 42),
            ], { weight: 1 }, 'Colby', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Bellsprout', 2000, 42),
                new GymPokemon('Weepinbell', 2000, 42),
                new GymPokemon('Victreebel', 2000, 42),
                new GymPokemon('Paras', 2000, 42),
                new GymPokemon('Parasect', 2000, 42),
            ], { weight: 1 }, 'Caroline', '(female)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'SmallRestore'},
        ],
        mythic: [
            {loot: 'Max Revive', weight: 2},
            {loot: 'Star Piece'},
            {loot: 'Heart Scale'},
        ],
    },
    24595,
    [
        new DungeonBossPokemon('Machoke', 122975, 42),
        new DungeonTrainer('Cool Couple',
            [
                new GymPokemon('Nidoking', 61488, 45),
                new GymPokemon('Nidoqueen', 61488, 45),
            ], { weight: 1 }, 'Ray & Tyra'),
    ],
    2000, 23);

dungeonList['Cerulean Cave'] = new Dungeon('Cerulean Cave',
    ['Golbat', 'Parasect', 'Psyduck', 'Golduck', 'Primeape', 'Poliwag', 'Machoke', 'Slowpoke', 'Slowbro', 'Magneton', 'Electrode', 'Goldeen', 'Magikarp', 'Ditto'],
    {
        common: [
            {loot: 'Pokeball', weight: 2},
            {loot: 'Token_collector', weight: 2},
            {loot: 'Lucky_incense', weight: 2},
            {loot: 'Graveler'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Greatball'}],
        legendary: [{loot: 'Ultraball'}],
        mythic: [
            {loot: 'LargeRestore'},
            {loot: 'Max Revive', weight: 2},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(500, GameConstants.getDungeonIndex('Cerulean Cave'))},
        ],
    },
    28735,
    [
        new DungeonBossPokemon('Kadabra', 183675, 60),
        new DungeonBossPokemon('Mewtwo', 255512, 100),
    ],
    2500, 23);

dungeonList['Ruby Path'] = new Dungeon('Ruby Path',
    ['Geodude', 'Graveler', 'Machop', 'Machoke', 'Slugma'],
    {
        common: [
            {loot: 'xAttack', weight: 3},
            {loot: 'Rawst', weight: 3},
            {loot: 'Geodude'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Grey Shard'},
        ],
    },
    720600,
    [new DungeonBossPokemon('Magcargo', 3703000, 20)],
    43000, 30,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.hoenn});

dungeonList['Icefall Cave'] = new Dungeon('Icefall Cave',
    ['Zubat', 'Golbat', 'Seel', 'Psyduck', 'Slowpoke', 'Swinub', 'Delibird', 'Sneasel', 'Wooper', 'Marill', 'Magikarp', 'Poliwag', 'Goldeen', 'Poliwhirl', 'Tentacool', 'Tentacruel', 'Horsea', 'Krabby', 'Shellder', 'Staryu', 'Seadra', 'Kingler', 'Dewgong', 'Gyarados', 'Lapras'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'xClick'},
            {loot: 'Aspear'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Purple Shard'},
        ],
        epic: [
            {loot: 'Ultraball'},
            {loot: 'Splash Plate'},
            {loot: 'Icicle Plate'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Never_Melt_Ice'},
        ],
    },
    720600,
    [
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 250000, 20),
                new GymPokemon('Zubat', 250000, 20),
                new GymPokemon('Golbat', 250000, 20),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    43000, 30,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.hoenn});

dungeonList['Sunburst Island'] = new Dungeon('Sunburst Island',
    ['Hoppip', 'Tentacool', 'Tentacruel', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Kingler', 'Psyduck', 'Slowpoke'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Red Shard'},
        ],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Flame Plate'},
        ],
        legendary: [
            {loot: 'Heat Rock'},
            {loot: 'Icy Rock'},
        ],
    },
    720600,
    [new DungeonBossPokemon('Crystal Onix', 4500000, 20)],
    43000, 31,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.hoenn});

dungeonList['Lost Cave'] = new Dungeon('Lost Cave',
    [
        'Gastly', 'Haunter', 'Zubat', 'Golbat', 'Murkrow', 'Misdreavus',
        new DungeonTrainer('Ruin Maniac',
            [
                new GymPokemon('Onix', 200600, 20),
                new GymPokemon('Graveler', 200600, 20),
                new GymPokemon('Marowak', 200600, 20),
            ], { weight: 0.75 }, 'Lawson'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Natu', 200600, 20),
                new GymPokemon('Natu', 200600, 20),
                new GymPokemon('Xatu', 200600, 20),
            ], { weight: 0.75 }, 'Laura', '(female)'),

    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Purple Shard'},
            {loot: 'Grey Shard'},
        ],
        epic: [
            {loot: 'Toxic Plate'},
            {loot: 'Spooky Plate'},
        ],
        legendary: [
            {loot: 'Max Revive'},
            {loot: 'Silk_Scarf'},
        ],
    },
    720600,
    [
        new DungeonTrainer('Lady',
            [
                new GymPokemon('Persian', 1800000, 49),
                new GymPokemon('Persian', 1800000, 49),
            ], { weight: 1 }, 'Selphy'),
    ],
    36000, 33,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.hoenn});

dungeonList['Pattern Bush'] = new Dungeon('Pattern Bush',
    [
        'Spinarak', 'Ledyba', 'Caterpie', 'Weedle', 'Metapod', 'Kakuna',
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Farfetch\'d', 720600, 20),
                new GymPokemon('Farfetch\'d', 720600, 20),
            ], { weight: 0.125 }, 'Cordell'),
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Chansey', 720600, 20)], { weight: 0.125 }, 'Bethany', '(female)'),
        new DungeonTrainer('Bug Catcher',
            [new GymPokemon('Heracross', 720600, 20)], { weight: 0.125 }, 'Garett'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Snubbull', 720600, 20)], { weight: 0.125 }, 'Joanna'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Weepinbell', 200000, 20),
                new GymPokemon('Weepinbell', 200000, 20),
                new GymPokemon('Victreebel', 200000, 20),
            ], { weight: 0.125 }, 'Nash'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Venonat', 200000, 20),
                new GymPokemon('Venomoth', 200000, 20),
            ], { weight: 0.125 }, 'Vance'),
        new DungeonTrainer('Ruin Maniac',
            [
                new GymPokemon('Sandslash', 200000, 20),
                new GymPokemon('Onix', 200000, 20),
                new GymPokemon('Sandslash', 200000, 20),
            ], { weight: 0.125 }, 'Layton'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Paras', 200000, 20),
                new GymPokemon('Paras', 200000, 20),
                new GymPokemon('Parasect', 200000, 20),
            ], { weight: 0.125 }, 'Marcy'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Yanma', 200000, 20),
                new GymPokemon('Beedrill', 200000, 20),
                new GymPokemon('Yanma', 200000, 20),
                new GymPokemon('Beedrill', 200000, 20),
            ], { weight: 0.125 }, 'Jonah'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Hoppip', 200000, 20),
                new GymPokemon('Hoppip', 200000, 20),
                new GymPokemon('Skiploom', 200000, 20),
                new GymPokemon('Skiploom', 200000, 20),
            ], { weight: 0.125 }, 'Dalia'),
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Clefairy', 200000, 20),
                new GymPokemon('Clefairy', 200000, 20),
                new GymPokemon('Clefable', 200000, 20),
            ], { weight: 0.125 }, 'Allison', '(female)'),
        new DungeonTrainer('Camper',
            [
                new GymPokemon('Pinsir', 200000, 20),
                new GymPokemon('Heracross', 200000, 20),
            ], { weight: 0.125 }, 'Riley'),
    ],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Chesto'},
            {loot: 'Pecha'},
            {loot: 'Rawst'},
            {loot: 'Aspear'},
            {loot: 'Leppa'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
        ],
        rare: [{loot: 'Green Shard'}],
        epic: [
            {loot: 'Persim'},
            {loot: 'Razz'},
            {loot: 'Bluk'},
            {loot: 'Nanab'},
            {loot: 'Wepear'},
            {loot: 'Pinap'},
            {loot: 'Figy'},
            {loot: 'Wiki'},
            {loot: 'Mago'},
            {loot: 'Aguav'},
            {loot: 'Iapapa'},
        ],
        mythic: [{loot: 'Lum', requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Pattern Bush'))}],
    },
    500000,
    [new DungeonBossPokemon('Heracross', 3703000, 20)],
    43000, 35,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.hoenn});

dungeonList['Altering Cave'] = new Dungeon('Altering Cave',
    ['Zubat', 'Mareep', 'Pineco', 'Houndour', 'Teddiursa', 'Aipom', 'Shuckle'],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Grey Shard'},
            {loot: 'Ochre Shard'},
        ],
        legendary: [
            {loot: 'SmallRestore', weight: 3},
            {loot: 'MediumRestore', weight: 2},
            {loot: 'LargeRestore'},
        ],
    },
    720600,
    [
        new DungeonBossPokemon('Stantler', 3703000, 20),
        new DungeonBossPokemon('Smeargle', 3703000, 20),
    ],
    43000, 36,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.hoenn});

// All Unown except "EFHP"
SeededRand.seed(4567);
const TanobyUnownList = SeededRand.shuffleArray('ABCDGIJKLMNOQRSTUVWXYZ!?'.split(''));

dungeonList['Tanoby Ruins'] = new Dungeon('Tanoby Ruins',
    [
        'Tentacool', 'Tentacruel', 'Mantine', 'Magikarp', 'Horsea', 'Krabby', 'Qwilfish', 'Remoraid', 'Gyarados', 'Seadra', 'Psyduck', 'Kingler',
        new DungeonTrainer('Ruin Maniac',
            [new GymPokemon('Onix', 1940, 20)], { weight: 0.75 }, 'Brandon'),
        new DungeonTrainer('Gentleman',
            [
                new GymPokemon('Marowak', 200000, 20),
                new GymPokemon('Golduck', 200000, 20),
            ], { weight: 0.75 }, 'Clifford'),
        new DungeonTrainer('Painter',
            [new GymPokemon('Smeargle', 200000, 20)], { weight: 0.75 }, 'Allison'),
        new DungeonTrainer('Ruin Maniac',
            [
                new GymPokemon('Geodude', 200000, 20),
                new GymPokemon('Graveler', 200000, 20),
                new GymPokemon('Graveler', 200000, 20),
            ], { weight: 0.75 }, 'Benjamin'),
    ],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
        rare: [{loot: 'Grey Shard'}],
        epic: [{loot: 'Mind Plate'}],
        mythic: [{loot: 'Heart Scale'}],
    },
    720600,
    [
        ...TanobyUnownList.map((char) => new DungeonBossPokemon(`Unown (${char})` as PokemonNameType, 4100000, 30, {
            hide: true,
            requirement: new SeededDateRequirement(() => SeededDateRand.fromArray(TanobyUnownList) == char),
        })),
    ],
    43000, 39,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.hoenn});

dungeonList['Pinkan Mountain'] = new Dungeon('Pinkan Mountain',
    ['Pinkan Rattata', 'Pinkan Nidoran(M)', 'Pinkan Nidoran(F)', 'Pinkan Mankey', 'Pinkan Rhyhorn'],
    {
        common: [
            {loot: 'Pecha', weight: 6},
            {loot: 'Persim'},
            {loot: 'Nanab'},
            {loot: 'Mago'},
        ],
        rare: [
            {loot: 'Purple Shard'},
            {loot: 'Pink Shard', requirement: new MaxRegionRequirement(GameConstants.Region.kalos)},
        ],
        epic: [
            {loot: 'Mind Plate'},
            {loot: 'Qualot'},
            {loot: 'Magost'},
            {loot: 'Watmel'},
        ],
        legendary: [{loot: 'Pink_Bow'}],
        mythic: [{loot: 'Heart Scale'}],
    },
    1503000,
    [
        new DungeonBossPokemon('Pinkan Primeape', 7000000, 40),
        new DungeonBossPokemon('Pinkan Rhydon', 7000000, 40),
        new DungeonBossPokemon('Pinkan Nidoking', 7000000, 40),
    ],
    89500, 42,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.hoenn});

// Johto Dungeons

dungeonList['Sprout Tower'] = new Dungeon('Sprout Tower',
    [
        {pokemon: 'Rattata', options: { weight: 8 }},
        {pokemon: 'Gastly', options: { weight: 8 }},
        {pokemon: 'Hoothoot', options: { weight: 8 }},
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 2500, 3),
                new GymPokemon('Bellsprout', 2500, 3),
                new GymPokemon('Bellsprout', 2500, 3),
            ], { weight: 1 }, 'Nico'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 2500, 3),
                new GymPokemon('Bellsprout', 2500, 3),
                new GymPokemon('Bellsprout', 2500, 3),
            ], { weight: 1 }, 'Chow'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 2500, 3),
                new GymPokemon('Bellsprout', 2500, 3),
                new GymPokemon('Bellsprout', 2500, 3),
            ], { weight: 1 }, 'Edmond'),
        new DungeonTrainer('Sage',
            [new GymPokemon('Bellsprout', 2500, 6)],
            { weight: 1 }, 'Jin'),
        new DungeonTrainer('Sage',
            [new GymPokemon('Bellsprout', 2500, 6)],
            { weight: 1 }, 'Neal'),
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 2500, 7),
                new GymPokemon('Hoothoot', 2500, 7),
            ], { weight: 1 }, 'Troy'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_incense'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        legendary: [
            {loot: 'Meadow Plate', weight: 2},
            {loot: 'SmallRestore'},
            {loot: 'Miracle_Seed'},
        ],
    },
    56735,
    [
        new DungeonTrainer('Sage',
            [
                new GymPokemon('Bellsprout', 86000, 7),
                new GymPokemon('Bellsprout', 86000, 7),
                new GymPokemon('Hoothoot', 87000, 10),
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
            [new GymPokemon('Girafarig', 3000, 26)],
            { weight: 1 }, 'Nathan', '(male)'),
    ],
    {
        common: [
            {loot: 'Oran', weight: 2},
            {loot: 'Greatball'},
            {loot: 'Pecha'},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [{loot: 'Leppa'}],
        legendary: [
            {loot: 'SmallRestore', weight: 2},
            {loot: 'Star Piece'},
            {loot: 'Twisted_Spoon'},
        ],
        mythic: [
            {loot: 'LargeRestore'},
            {loot: 'Max Revive'},
        ],
    },
    60600,
    [
        ...AlphUnownList.map((char) => new DungeonBossPokemon(`Unown (${char})` as PokemonNameType, 280000, 14, {
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
                new GymPokemon('Geodude', 2000, 4),
                new GymPokemon('Geodude', 3000, 6),
                new GymPokemon('Geodude', 4000, 8),
            ], { weight: 1 }, 'Russell'),
        new DungeonTrainer('Firebreather',
            [
                new GymPokemon('Koffing', 3000, 6),
                new GymPokemon('Koffing', 3000, 6),
            ], { weight: 1 }, 'Bill'),
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Slowpoke', 3000, 10)],
            { weight: 1 }, 'Larry'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'xClick', weight: 2},
            {loot: 'Geodude'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Greatball'}],
        legendary: [
            {loot: 'SmallRestore'},
            {loot: 'Revive'},
            {loot: 'Soft_Sand', weight: 3},
        ],
        mythic: [
            {loot: 'Ultraball'},
            {loot: 'LargeRestore'},
        ],
    },
    63600,
    [
        new DungeonTrainer('Hiker',
            [new GymPokemon('Onix', 300000, 11)],
            { weight: 1 }, 'Daniel'),
        new DungeonTrainer('Firebreather',
            [new GymPokemon('Vulpix', 300000, 9)],
            { weight: 1 }, 'Ray'),
        new DungeonBossPokemon('Lapras', 450000, 20, {
            hide: true,
            requirement: new MultiRequirement([
                new GymBadgeRequirement(BadgeEnums.Fog),
                new DayOfWeekRequirement(GameConstants.DayOfWeek.Friday),
            ])}),
    ],
    3000, 32);

dungeonList['Slowpoke Well'] = new Dungeon('Slowpoke Well',
    [
        {pokemon: 'Zubat', options: { weight: 6 }},
        {pokemon: 'Slowpoke', options: { weight: 6 }},
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 3500, 9),
                new GymPokemon('Rattata', 3500, 9),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 3500, 9),
                new GymPokemon('Ekans', 3500, 11),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 3500, 7),
                new GymPokemon('Zubat', 3500, 9),
                new GymPokemon('Zubat', 3500, 9),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'Token_collector', weight: 2},
            {loot: 'Dowsing_machine'},
        ],
        rare: [{loot: 'Grey Shard'}],
        epic: [
            {loot: 'Greatball'},
            {loot: 'Lureball'},
        ],
        legendary: [
            {loot: 'Splash Plate', weight: 2},
            {loot: 'MediumRestore'},
            {loot: 'Poison_Barb'},
        ],
    },
    67900,
    [
        new DungeonTrainer('Rocket Executive',
            [new GymPokemon('Koffing', 320000, 14)],
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
                new GymPokemon('Ledyba', 4000, 8),
                new GymPokemon('Paras', 4000, 10),
            ], { weight: 1 }, 'Wayne'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Lucky_egg'},
        ],
        rare: [{loot: 'Green Shard'}],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Insect Plate'},
            {loot: 'MediumRestore'},
            {loot: 'Silver_Powder'},
        ],
        mythic: [{loot: 'Zap Plate'}],
    },
    82200,
    [
        new DungeonBossPokemon('Noctowl', 340000, 30),
        new DungeonBossPokemon('Beedrill', 340000, 30),
        new DungeonBossPokemon('Butterfree', 340000, 30),
        new DungeonBossPokemon('Celebi', 800000, 50, {hide: true, requirement: new QuestLineStepCompletedRequirement('Unfinished Business', 12)}),
    ],
    4000, 34);

dungeonList['Burned Tower'] = new Dungeon('Burned Tower',
    ['Rattata', 'Raticate', 'Zubat', 'Koffing'],
    {
        common: [
            {loot: 'Dowsing_machine', weight: 2},
            {loot: 'xAttack'},
        ],
        rare: [{loot: 'Red Shard'}],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Flame Plate'},
            {loot: 'Ultraball'},
            {loot: 'Charcoal'},
        ],
    },
    88500,
    [new DungeonBossPokemon('Golbat', 360000, 35), new DungeonBossPokemon('Weezing', 320000, 35), new DungeonBossPokemon('Shuckle', 610000, 50)],
    4500, 37);

dungeonList['Tin Tower'] = new Dungeon('Tin Tower',
    ['Rattata', 'Gastly'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Grey Shard'},
        ],
        legendary: [
            {loot: 'MediumRestore'},
            {loot: 'Ultraball'},
            {loot: 'Flame Plate'},
            {loot: 'Spooky Plate'},
            {loot: 'Sky Plate'},
            {loot: 'Sharp_Beak'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    88500,
    [
        new DungeonBossPokemon('Raticate', 380000, 35),
        new DungeonBossPokemon('Haunter', 380000, 35),
        new DungeonBossPokemon('Ho-Oh', 1410000, 100, {hide: true, requirement: new QuestLineStepCompletedRequirement('Rainbow Guardian', 1)}),
    ],
    4500, 37);

dungeonList['Whirl Islands'] = new Dungeon('Whirl Islands',
    ['Zubat', 'Golbat', 'Seel', 'Krabby', 'Horsea'],
    {
        common: [
            {loot: 'Lucky_incense'},
            {loot: 'Token_collector'},
        ],
        rare: [{loot: 'Blue Shard'}],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Ultraball'},
            {loot: 'Mind Plate'},
            {loot: 'Sky Plate'},
            {loot: 'Mystic_Water'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    92800,
    [
        new DungeonBossPokemon('Dewgong', 400000, 40),
        new DungeonBossPokemon('Kingler', 400000, 40),
        new DungeonBossPokemon('Lugia', 1410000, 100, {hide: true, requirement: new QuestLineStepCompletedRequirement('Whirl Guardian', 9)}),
    ],
    5000, 41);

dungeonList['Mt. Mortar'] = new Dungeon('Mt. Mortar',
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
                new GymPokemon('Nidoking', 5500, 17),
                new GymPokemon('Nidoqueen', 5500, 17),
            ], { weight: 1 }, 'Miller'),
        new DungeonTrainer('Super Nerd',
            [new GymPokemon('Slowpoke', 5500, 19)],
            { weight: 1 }, 'Markus'),
        new DungeonTrainer('Super Nerd',
            [new GymPokemon('Seadra', 5500, 39)],
            { weight: 1 }, 'Hugh'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 6},
            {loot: 'Graveler'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Grey Shard'},
        ],
        epic: [
            {loot: 'Iron Plate'},
            {loot: 'Stone Plate'},
            {loot: 'Earth Plate'},
            {loot: 'Draco Plate'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'LargeRestore'},
            {loot: 'Revive'},
            {loot: 'Black_Belt'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    104100,
    [
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Hitmonlee', 210000, 34),
                new GymPokemon('Hitmonchan', 210000, 34),
            ], { weight: 1 }, 'Kiyo'),
        new DungeonBossPokemon('Tyrogue', 420000, 45, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Mortar'))}),
    ],
    5500, 42,
    () => {
        BagHandler.gainItem({type: ItemType.item, id: 'Fighting_egg'}, 1);
        Notifier.notify({
            message: 'You were awarded a Fighting Egg for defeating Black Belt Kiyo.',
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
        });
    });

dungeonList['Team Rocket\'s Hideout'] = new Dungeon('Team Rocket\'s Hideout',
    [
        {pokemon: 'Geodude', options: { weight: 0.5 }},
        {pokemon: 'Voltorb', options: { weight: 0.5 }},
        {pokemon: 'Electrode', options: { weight: 0.5 }},
        {pokemon: 'Koffing', options: { weight: 0.5 }},
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 5500, 16),
                new GymPokemon('Rattata', 5500, 16),
                new GymPokemon('Rattata', 5500, 16),
                new GymPokemon('Rattata', 5500, 16),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 5500, 20),
                new GymPokemon('Magnemite', 5500, 20),
                new GymPokemon('Magnemite', 5500, 20),
            ], { weight: 1 }, 'Jed', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Drowzee', 5500, 17),
                new GymPokemon('Zubat', 5500, 19),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 5500, 16),
                new GymPokemon('Grimer', 5500, 17),
                new GymPokemon('Rattata', 5500, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Venonat', 5500, 18),
                new GymPokemon('Venonat', 5500, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Golbat', 5500, 18)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 5500, 17),
                new GymPokemon('Zubat', 5500, 17),
                new GymPokemon('Rattata', 5500, 17),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Ekans', 5500, 18),
                new GymPokemon('Gloom', 5500, 18),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Raticate', 5500, 19)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Koffing', 5500, 22),
                new GymPokemon('Koffing', 5500, 22),
            ], { weight: 1 }, 'Ross', '(male)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Ditto', 5500, 24)],
            { weight: 1 }, 'Mitch', '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 3},
            {loot: 'Token_collector', weight: 3},
            {loot: 'Electrode'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Purple Shard'},
        ],
        legendary: [
            {loot: 'Ultraball', weight: 2},
            {loot: 'Revive', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Dread Plate'},
            {loot: 'Splash Plate'},
            {loot: 'Black_Glasses'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Team Rocket\'s Hideout'))}],
    },
    104100,
    [
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Zubat', 140000, 22),
                new GymPokemon('Koffing', 140000, 22),
                new GymPokemon('Raticate', 140000, 24),
            ], { weight: 1 }, 'Petrel', '(petrel)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Arbok', 140000, 23),
                new GymPokemon('Gloom', 140000, 23),
                new GymPokemon('Murkrow', 140000, 25),
            ], { weight: 1 }, 'Ariana', '(ariana)'),
    ],
    5500, 43);

dungeonList['Radio Tower'] = new Dungeon('Radio Tower',
    [
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Rattata', 5750, 27)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Muk', 5750, 23),
                new GymPokemon('Koffing', 5750, 23),
                new GymPokemon('Rattata', 5750, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 5750, 24),
                new GymPokemon('Muk', 5750, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Growlithe', 5500, 26),
                new GymPokemon('Koffing', 5500, 24),
            ], { weight: 1 }, 'Eddie'),
        new DungeonTrainer('Burglar',
            [
                new GymPokemon('Koffing', 5500, 23),
                new GymPokemon('Magmar', 5500, 25),
                new GymPokemon('Koffing', 5500, 23),
            ], { weight: 1 }, 'Duncan'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Gloom', 5750, 25),
                new GymPokemon('Gloom', 5750, 25),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 5750, 24),
                new GymPokemon('Golbat', 5750, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Grimer', 5750, 26),
                new GymPokemon('Weezing', 5750, 23),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 5750, 25),
                new GymPokemon('Koffing', 5750, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 5750, 24),
                new GymPokemon('Raticate', 5750, 24),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Arbok', 5750, 26)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Rattata', 5750, 21),
                new GymPokemon('Rattata', 5750, 21),
                new GymPokemon('Rattata', 5750, 21),
                new GymPokemon('Rattata', 5750, 21),
                new GymPokemon('Rattata', 5750, 21),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Grimer', 5750, 23),
                new GymPokemon('Grimer', 5750, 23),
                new GymPokemon('Muk', 5750, 25),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 5750, 26),
                new GymPokemon('Zubat', 5750, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Koffing', 5750, 23),
                new GymPokemon('Zubat', 5750, 23),
                new GymPokemon('Rattata', 5750, 23),
                new GymPokemon('Grimer', 5750, 23),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 5500, 27),
                new GymPokemon('Magnemite', 5500, 27),
                new GymPokemon('Magnemite', 5500, 27),
            ], { weight: 1 }, 'Marc', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [new GymPokemon('Weezing', 5750, 26)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Raticate', 5750, 24),
                new GymPokemon('Koffing', 5750, 26),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Zubat', 5750, 22),
                new GymPokemon('Golbat', 5750, 24),
                new GymPokemon('Grimer', 5750, 22),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Porygon', 5750, 30)],
            { weight: 1 }, 'Rich', '(male)'),
        new DungeonTrainer('Team Rocket Grunt',
            [
                new GymPokemon('Ekans', 5750, 21),
                new GymPokemon('Oddish', 5750, 23),
                new GymPokemon('Ekans', 5750, 21),
                new GymPokemon('Gloom', 5750, 24),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_egg'},
        ],
        rare: [{loot: 'Yellow Shard'}],
        epic: [
            {loot: 'Persim'},
            {loot: 'Razz'},
            {loot: 'Bluk'},
            {loot: 'Nanab'},
            {loot: 'Wepear'},
            {loot: 'Pinap'},
            {loot: 'Figy'},
            {loot: 'Wiki'},
            {loot: 'Mago'},
            {loot: 'Aguav'},
            {loot: 'Iapapa'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'Magnet'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Radio Tower'))},
        ],
    },
    112000,
    [
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Houndour', 143000, 33),
                new GymPokemon('Koffing', 143000, 32),
                new GymPokemon('Houndoom', 144000, 35),
            ], { weight: 1 }, 'Archer', '(archer)'),
        new DungeonTrainer('Rocket Executive',
            [new GymPokemon('Golbat', 430000, 36)],
            { weight: 1 }, 'Proton', '(proton)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Koffing', 71000, 30),
                new GymPokemon('Koffing', 71000, 30),
                new GymPokemon('Koffing', 71000, 30),
                new GymPokemon('Koffing', 71000, 30),
                new GymPokemon('Weezing', 72000, 32),
                new GymPokemon('Koffing', 71000, 30),
            ], { weight: 1 }, 'Petrel', '(petrel)'),
        new DungeonTrainer('Rocket Executive',
            [
                new GymPokemon('Arbok', 143000, 32),
                new GymPokemon('Gloom', 143000, 32),
                new GymPokemon('Murkrow', 144000, 32),
            ], { weight: 1 }, 'Ariana', '(ariana)'),
    ],
    5750, 43);

dungeonList['Ice Path'] = new Dungeon('Ice Path',
    ['Zubat', 'Jynx', 'Swinub'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_egg'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Purple Shard'},
        ],
        legendary: [
            {loot: 'Icicle Plate'},
            {loot: 'Revive'},
            {loot: 'Never_Melt_Ice'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Ice Path'))}],
    },
    120400,
    [new DungeonBossPokemon('Delibird', 440000, 50)],
    6000, 44);

dungeonList['Dark Cave'] = new Dungeon('Dark Cave',
    ['Zubat', 'Golbat', 'Geodude', 'Graveler', 'Wobbuffet'],
    {
        common: [
            {loot: 'Pokeball'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [{loot: 'Purple Shard'}],
        legendary: [
            {loot: 'Dread Plate', weight: 2},
            {loot: 'Revive'},
            {loot: 'Star Piece'},
            {loot: 'SmallRestore'},
            {loot: 'Silk_Scarf'},
        ],
        mythic: [
            {loot: 'Heart Scale'},
            {loot: 'Max Revive'},
        ],
    },
    127000,
    [new DungeonBossPokemon('Dunsparce', 460000, 55)],
    6500, 45);

dungeonList['Tohjo Falls'] = new Dungeon('Tohjo Falls',
    ['Rattata', 'Raticate', 'Zubat', 'Slowpoke', 'Goldeen', 'Magikarp'],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
        ],
        legendary: [
            {loot: 'Greatball'},
            {loot: 'Hard Stone'},
            {loot: 'SmallRestore'},
            {loot: 'Pink_Bow'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    127750,
    [
        new DungeonBossPokemon('Golbat', 480000, 55),
        new DungeonBossPokemon('Seaking', 480000, 55),
    ],
    6750, 45);

dungeonList['Victory Road Johto'] = new Dungeon('Victory Road Johto',
    ['Golbat', 'Graveler', 'Onix', 'Rhyhorn'],
    {
        common: [
            {loot: 'Dowsing_machine', weight: 6},
            {loot: 'Graveler'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
        ],
        legendary: [
            {loot: 'Earth Plate', weight: 2},
            {loot: 'Ultraball', weight: 2},
            {loot: 'SmallRestore', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Dragon_Fang'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    128500,
    [
        new DungeonBossPokemon('Sandslash', 500000, 55),
        new DungeonBossPokemon('Rhydon', 500000, 55),
    ],
    7000, 26);

dungeonList['Mt. Silver'] = new Dungeon('Mt. Silver',
    ['Ponyta', 'Doduo', 'Tangela', 'Sneasel', 'Ursaring', 'Donphan', 'Teddiursa', 'Phanpy', 'Quagsire', 'Misdreavus'],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
        ],
        legendary: [
            {loot: 'Fist Plate', weight: 2},
            {loot: 'Zap Plate', weight: 2},
            {loot: 'Ultraball', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Revive'},
            {loot: 'Star Piece'},
            {loot: 'Spell_Tag'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Heart Scale'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Mt. Silver'))},
        ],
    },
    130500,
    [new DungeonBossPokemon('Larvitar', 840000, 60)],
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
                new GymPokemon('Wurmple', 12000, 3),
                new GymPokemon('Wurmple', 12000, 3),
                new GymPokemon('Wurmple', 12000, 3),
                new GymPokemon('Wurmple', 12000, 3),
            ], { weight: 1 }, 'Lyle'),
        new DungeonTrainer('Bug Catcher',
            [
                new GymPokemon('Nincada', 12000, 6),
                new GymPokemon('Nincada', 12000, 6),
            ], { weight: 1 }, 'James'),
    ],
    {
        common: [
            {loot: 'Pokeball'},
            {loot: 'Token_collector'},
        ],
        rare: [{loot: 'Green Shard'}],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Insect Plate'},
            {loot: 'Iron Plate'},
            {loot: 'Greatball'},
        ],
        legendary: [
            {loot: 'SmallRestore'},
            {loot: 'Miracle_Seed'},
        ],
    },
    380000,
    [
        new DungeonBossPokemon('Slakoth', 860000, 10, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))}),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 860000, 9)],
            { weight: 1 }, undefined, '(male)'),
    ],
    12000, 101);

dungeonList['Rusturf Tunnel'] = new Dungeon('Rusturf Tunnel',
    [
        {pokemon: 'Whismur', options: { weight: 4 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 14000, 16),
                new GymPokemon('Geodude', 14000, 16),
                new GymPokemon('Machop', 14000, 16),
            ], { weight: 1 }, 'Mike'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Pokeball'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        legendary: [
            {loot: 'Stone Plate', weight: 2},
            {loot: 'Iron Plate', weight: 2},
            {loot: 'Earth Plate', weight: 2},
            {loot: 'Revive'},
            {loot: 'Star Piece'},
            {loot: 'Hard Stone'},
        ],
        mythic: [{loot: 'Heart Scale'}],
    },
    400000,
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 900000, 11)],
            { weight: 1 }, undefined, '(male)'),
    ],
    14000, 101);

dungeonList['Granite Cave'] = new Dungeon('Granite Cave',
    ['Zubat', 'Abra', 'Geodude', 'Makuhita', 'Aron', 'Sableye'],
    {
        common: [
            {loot: 'Pokeball'},
            {loot: 'xAttack'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Iron Plate'},
            {loot: 'Earth Plate'},
            {loot: 'Everstone'},
            {loot: 'Revive'},
        ],
        legendary: [
            {loot: 'MediumRestore'},
            {loot: 'Star Piece'},
            {loot: 'Hard Stone'},
        ],
        mythic: [{loot: 'Heart Scale'}],
    },
    410000,
    [new DungeonBossPokemon('Mawile', 960000, 20), new DungeonBossPokemon('Nosepass', 660000, 20)],
    16000, 101);

dungeonList['Fiery Path'] = new Dungeon('Fiery Path',
    ['Machop', 'Grimer', 'Koffing', 'Slugma', 'Numel'],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [{loot: 'Red Shard'}],
        legendary: [
            {loot: 'Flame Plate'},
            {loot: 'Draco Plate'},
        ],
    },
    424000,
    [new DungeonBossPokemon('Torkoal', 1200000, 20)],
    17000, 101);

dungeonList['Meteor Falls'] = new Dungeon('Meteor Falls',
    [
        {pokemon: 'Zubat', options: { weight: 0.8 }},
        {pokemon: 'Golbat', options: { weight: 0.8 }},
        {pokemon: 'Goldeen', options: { weight: 0.8 }},
        {pokemon: 'Magikarp', options: { weight: 0.8 }},
        {pokemon: 'Barboach', options: { weight: 0.8 }},
        new DungeonTrainer('Old Couple',
            [
                new GymPokemon('Medicham', 18000, 39),
                new GymPokemon('Hariyama', 18000, 39),
            ], { weight: 1 }, 'John and Jay'),
    ],
    {
        common: [
            {loot: 'Lucky_incense', weight: 6},
            {loot: 'Pokeball', weight: 4},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Stone Plate'},
            {loot: 'Iron Plate'},
            {loot: 'Sky Plate'},
            {loot: 'Draco Plate'},
        ],
        mythic: [{loot: 'Star Piece'}],
    },
    443000,
    [
        new DungeonBossPokemon('Solrock', 1240000, 20),
        new DungeonBossPokemon('Lunatone', 1240000, 20),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Altaria', 640000, 37),
                new GymPokemon('Altaria', 640000, 37),
            ], { weight: 1 }, 'Nicolas'),
    ],
    18000, 101);

dungeonList['Mt. Chimney Crater'] = new Dungeon('Mt. Chimney Crater',
    [
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Numel', 20000, 20)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Zubat', 20000, 20)],
            { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Magma Admin',
            [
                new GymPokemon('Numel', 18000, 18),
                new GymPokemon('Poochyena', 20000, 20),
                new GymPokemon('Numel', 22000, 22),
                new GymPokemon('Zubat', 22000, 22),
            ], { weight: 1 }, 'Tabitha'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        legendary: [{loot: 'Flame Plate'}],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Mt. Chimney Crater'))}],
    },
    460000,
    [
        new DungeonTrainer('Magma Leader',
            [
                new GymPokemon('Mightyena', 450000, 24),
                new GymPokemon('Zubat', 450000, 24),
                new GymPokemon('Camerupt', 470000, 25),
            ], { weight: 1 }, 'Maxie'),
    ],
    20000, 101);

dungeonList['Jagged Pass'] = new Dungeon('Jagged Pass',
    [
        {pokemon: 'Machop', options: { weight: 0.8 }},
        {pokemon: 'Numel', options: { weight: 0.8 }},
        {pokemon: 'Spoink', options: { weight: 0.8 }},
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Geodude', 22000, 20),
                new GymPokemon('Baltoy', 22000, 20),
            ], { weight: 1 }, 'Eric'),
        new DungeonTrainer('Picnicker',
            [
                new GymPokemon('Shroomish', 22000, 19),
                new GymPokemon('Oddish', 22000, 19),
                new GymPokemon('Swablu', 22000, 19),
            ], { weight: 1 }, 'Diana'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Shroomish', 22000, 21)],
            { weight: 1 }, 'Autumn'),
        new DungeonTrainer('Triathlete',
            [new GymPokemon('Magnemite', 22000, 21)],
            { weight: 1 }, 'Julio', '(malecycling)'),
        new DungeonTrainer('Camper',
            [
                new GymPokemon('Zigzagoon', 22000, 20),
                new GymPokemon('Taillow', 22000, 20),
            ], { weight: 1 }, 'Ethan'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [{loot: 'Greatball'}],
        legendary: [
            {loot: 'Dread Plate'},
            {loot: 'Stone Plate'},
        ],
    },
    460000,
    [
        new DungeonTrainer('Team Magma Grunt',
            [
                new GymPokemon('Mightyena', 700000, 22),
                new GymPokemon('Zubat', 700000, 22),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    22000, 101);

dungeonList['New Mauville'] = new Dungeon('New Mauville',
    ['Magnemite', 'Voltorb'],
    {
        common: [
            {loot: 'Lucky_incense', weight: 3},
            {loot: 'Cheri', weight: 3},
            {loot: 'Voltorb'},
        ],
        rare: [{loot: 'Yellow Shard'}],
        epic: [
            {loot: 'Razz'},
            {loot: 'Ultraball'},
        ],
        legendary: [{loot: 'Zap Plate'}],
    },
    460000,
    [
        new DungeonBossPokemon('Magneton', 1650000, 20),
        new DungeonBossPokemon('Electrode', 1650000, 20),
    ],
    24000, 101);

dungeonList['Weather Institute'] = new Dungeon('Weather Institute',
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 39000, 28)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Zubat', 39000, 27),
                new GymPokemon('Poochyena', 39000, 27),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Poochyena', 39000, 27),
                new GymPokemon('Carvanha', 39000, 27),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Zubat', 39000, 27),
                new GymPokemon('Poochyena', 39000, 27),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Poochyena', 39000, 26),
                new GymPokemon('Zubat', 39000, 26),
                new GymPokemon('Carvanha', 39000, 26),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Damp Rock'},
            {loot: 'Smooth Rock'},
            {loot: 'Heat Rock'},
            {loot: 'Icy Rock'},
        ],
        legendary: [
            {loot: 'Splash Plate'},
            {loot: 'Mystic_Water'},
        ],
    },
    470000,
    [
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Carvanha', 910000, 28),
                new GymPokemon('Mightyena', 910000, 28),
            ], { weight: 1 }, 'Shelly', '(shelly)'),
        new DungeonBossPokemon('Castform', 1820000, 20, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))}),
    ],
    26000, 101);

dungeonList['Mt. Pyre'] = new Dungeon('Mt. Pyre',
    [
        {pokemon: 'Shuppet', options: { weight: 12 }},
        {pokemon: 'Duskull', options: { weight: 12 }},
        {pokemon: 'Vulpix', options: { weight: 12 }},
        {pokemon: 'Wingull', options: { weight: 12 }},
        {pokemon: 'Meditite', options: { weight: 12 }},
        new DungeonTrainer('PokéManiac',
            [new GymPokemon('Rhyhorn', 28000, 31)],
            { weight: 1 }, 'Mark'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Spoink', 28000, 31)],
            { weight: 1 }, 'Leah'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Hariyama', 28000, 31)],
            { weight: 1 }, 'Zander'),
        new DungeonTrainer('Young Couple',
            [
                new GymPokemon('Delcatty', 28000, 31),
                new GymPokemon('Manectric', 28000, 31),
            ],
            { weight: 1 }, 'Dez & Luke'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Wobbuffet', 28000, 26),
                new GymPokemon('Natu', 28000, 26),
                new GymPokemon('Kadabra', 28000, 26),
            ],
            { weight: 1 }, 'Kayla', '(female)'),
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Skitty', 15000, 26),
                new GymPokemon('Poochyena', 15000, 26),
                new GymPokemon('Zigzagoon', 15000, 26),
                new GymPokemon('Lotad', 15000, 26),
                new GymPokemon('Seedot', 15000, 26),
                new GymPokemon('Taillow', 15000, 26),
            ],
            { weight: 1 }, 'Gabrielle', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Ralts', 28000, 26),
                new GymPokemon('Ralts', 28000, 26),
                new GymPokemon('Kirlia', 28000, 26),
            ],
            { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Shuppet', 28000, 32)],
            { weight: 1 }, 'Tasha'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Hariyama', 28000, 32)],
            { weight: 1 }, 'Atsushi'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Sableye', 28000, 32)],
            { weight: 1 }, 'Valerie'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Wobbuffet', 28000, 32)],
            { weight: 1 }, 'Cedric', '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 28000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 28000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Poochyena', 28000, 30),
                new GymPokemon('Carvanha', 28000, 30),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Wailmer', 28000, 30),
                new GymPokemon('Zubat', 28000, 30),
            ],
            { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [{loot: 'Ultraball'}],
        legendary: [
            {loot: 'Spooky Plate'},
            {loot: 'Fist Plate'},
            {loot: 'Mind Plate'},
            {loot: 'Black_Belt'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Mt. Pyre'))}],
    },
    480000,
    [
        new DungeonBossPokemon('Shuppet', 1880000, 20),
        new DungeonBossPokemon('Duskull', 1890000, 20),
        new DungeonBossPokemon('Chimecho', 1880000, 20),
    ],
    28000, 101);

dungeonList['Magma Hideout'] = new Dungeon('Magma Hideout',
    [
        {pokemon: 'Geodude', options: { weight: 12 }},
        {pokemon: 'Graveler', options: { weight: 12 }},
        {pokemon: 'Torkoal', options: { weight: 12 }},
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Poochyena', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Numel', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Mightyena', 29000, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [
                new GymPokemon('Baltoy', 29000, 28),
                new GymPokemon('Numel', 29000, 28),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Zubat', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Numel', 29000, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Mightyena', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Baltoy', 29000, 29)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Magma Grunt',
            [new GymPokemon('Baltoy', 29000, 29)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Magma Admin',
            [
                new GymPokemon('Numel', 6000, 26),
                new GymPokemon('Mightyena', 8000, 28),
                new GymPokemon('Zubat', 10000, 30),
                new GymPokemon('Camerupt', 13000, 33),
            ],
            { weight: 1 }, 'Tabitha'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Figy', weight: 2},
            {loot: 'Pinap'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        legendary: [
            {loot: 'Flame Plate'},
            {loot: 'Dread Plate'},
            {loot: 'Nestball'},
        ],
    },
    490000,
    [
        new DungeonTrainer('Magma Leader',
            [
                new GymPokemon('Mightyena', 630000, 37),
                new GymPokemon('Crobat', 640000, 38),
                new GymPokemon('Camerupt', 650000, 39),
            ],
            { weight: 1 }, 'Maxie'),
    ],
    29000, 101);

dungeonList['Aqua Hideout'] = new Dungeon('Aqua Hideout',
    [
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 30000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 30000, 32)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Zubat', 30000, 31),
                new GymPokemon('Carvanha', 30000, 31),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Poochyena', 30000, 31),
                new GymPokemon('Zubat', 30000, 31),
            ],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 30000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 30000, 32)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 30000, 32)],
            { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'Token_collector', weight: 4},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Electrode'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Lureball'},
            {loot: 'Diveball'},
        ],
        legendary: [
            {loot: 'Dread Plate', weight: 2},
            {loot: 'Splash Plate', weight: 2},
            {loot: 'Duskball'},
            {loot: 'Nestball'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    490000,
    [
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Mightyena', 900000, 34),
                new GymPokemon('Golbat', 900000, 34),
            ],
            { weight: 1 }, 'Matt', '(matt)'),
    ],
    30000, 101);

dungeonList['Shoal Cave'] = new Dungeon('Shoal Cave',
    ['Zubat', 'Golbat', 'Spheal', 'Tentacool', 'Magikarp', 'Wailmer'],
    {
        common: [
            {loot: 'xClick', weight: 2},
            {loot: 'Lucky_incense'},
        ],
        rare: [{loot: 'Ochre Shard'}],
        legendary: [
            {loot: 'Icicle Plate', weight: 2},
            {loot: 'Star Piece'},
            {loot: 'Revive'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Heart Scale'},
            {loot: 'Never_Melt_Ice'},
        ],
    },
    490000,
    [new DungeonBossPokemon('Snorunt', 1900000, 20)],
    30000, 101);

dungeonList['Cave of Origin'] = new Dungeon('Cave of Origin',
    ['Zubat', 'Golbat', 'Sableye', 'Mawile'],
    {
        common: [{loot: 'xAttack'}],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Ochre Shard'},
        ],
        legendary: [{loot: 'Revive'}],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Cave of Origin'))},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Cave of Origin'))},
        ],
    },
    590000,
    [
        new DungeonBossPokemon('Exploud', 2000000, 50),
        new DungeonBossPokemon('Kyogre', 4700000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)}),
        new DungeonBossPokemon('Groudon', 4700000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion)}),
    ],
    34000, 101);

dungeonList['Seafloor Cavern'] = new Dungeon('Seafloor Cavern',
    [
        {pokemon: 'Zubat', options: { weight: 4.8 }},
        {pokemon: 'Golbat', options: { weight: 4.8 }},
        {pokemon: 'Tentacool', options: { weight: 4.8 }},
        {pokemon: 'Magikarp', options: { weight: 4.8 }},
        {pokemon: 'Wailmer', options: { weight: 4.8 }},
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 32000, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 32000, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 32000, 36)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 32000, 36)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Mightyena', 32000, 35),
                new GymPokemon('Golbat', 32000, 35),
            ],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Sharpedo', 32000, 37),
                new GymPokemon('Mightyena', 32000, 37),
            ], { weight: 1 }, 'Shelly', '(shelly)'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Token_collector'},
        ],
        rare: [{loot: 'Blue Shard'}],
        epic: [{loot: 'Bluk'}],
        legendary: [
            {loot: 'Splash Plate'},
            {loot: 'Earth Plate'},
        ],
        mythic: [{loot: 'Heart Scale'}],
    },
    530000,
    [
        new DungeonTrainer('Aqua Leader',
            [
                new GymPokemon('Mightyena', 700000, 41),
                new GymPokemon('Crobat', 700000, 41),
                new GymPokemon('Sharpedo', 900000, 43),
            ],
            { weight: 1 }, 'Archie'),
    ],
    32000, 101);

dungeonList['Sky Pillar'] = new Dungeon('Sky Pillar',
    ['Golbat', 'Sableye', 'Claydol', 'Banette', 'Mawile', 'Altaria'],
    {
        common: [
            {loot: 'xAttack', weight: 4},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [{loot: 'Ultraball'}],
        legendary: [
            {loot: 'Sky Plate'},
            {loot: 'Mind Plate'},
            {loot: 'Draco Plate'},
            {loot: 'Sharp_Beak'},
        ],
    },
    720000,
    [
        new DungeonBossPokemon('Dusclops', 3200000, 20),
        new DungeonBossPokemon('Rayquaza', 5824002, 100),
    ],
    34000, 101);

dungeonList['Sealed Chamber'] = new Dungeon('Sealed Chamber',
    ['Zubat','Magikarp', 'Tentacool', 'Wailmer', 'Horsea'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Greatball'},
            {loot: 'Diveball'},
        ],
        legendary: [
            {loot: 'Stone Plate', weight: 2},
            {loot: 'Icicle Plate', weight: 2},
            {loot: 'Iron Plate', weight: 2},
            {loot: 'Hard Stone'},
        ],
    },
    500000,
    [
        new DungeonBossPokemon('Golbat', 4500000, 20, {hide: true, requirement: new QuestLineStepCompletedRequirement('The Three Golems', 8, GameConstants.AchievementOption.less)}),
        new DungeonBossPokemon('Regirock', 4500000, 20, {requirement: new QuestLineStepCompletedRequirement('The Three Golems', 8)}),
        new DungeonBossPokemon('Regice', 4500000, 20, {requirement: new QuestLineStepCompletedRequirement('The Three Golems', 8)}),
        new DungeonBossPokemon('Registeel', 4500000, 20, {requirement: new QuestLineStepCompletedRequirement('The Three Golems', 8)}),
    ],
    36000, 101);

dungeonList['Victory Road Hoenn'] = new Dungeon('Victory Road Hoenn',
    [
        {pokemon: 'Zubat', options: { weight: 4 }},
        {pokemon: 'Golbat', options: { weight: 4 }},
        {pokemon: 'Goldeen', options: { weight: 4 }},
        {pokemon: 'Magikarp', options: { weight: 4 }},
        {pokemon: 'Whismur', options: { weight: 4 }},
        {pokemon: 'Loudred', options: { weight: 4 }},
        {pokemon: 'Makuhita', options: { weight: 4 }},
        {pokemon: 'Aron', options: { weight: 4 }},
        {pokemon: 'Lairon', options: { weight: 4 }},
        {pokemon: 'Mawile', options: { weight: 4 }},
        {pokemon: 'Meditite', options: { weight: 4 }},
        {pokemon: 'Medicham', options: { weight: 4 }},
        {pokemon: 'Barboach', options: { weight: 4 }},
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Magneton', 37000, 43),
                new GymPokemon('Muk', 37000, 43),
            ], { weight: 1 }, 'Albert', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [new GymPokemon('Roselia', 37000, 45)],
            { weight: 1 }, 'Hope', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [new GymPokemon('Claydol', 37000, 45)],
            { weight: 1 }, 'Shannon', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Swellow', 37000, 42),
                new GymPokemon('Mawile', 37000, 42),
                new GymPokemon('Kadabra', 37000, 42),
            ], { weight: 1 }, 'Samuel', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Sandslash', 37000, 42),
                new GymPokemon('Ninetales', 37000, 42),
                new GymPokemon('Tropius', 37000, 42),
            ], { weight: 1 }, 'Julie', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Claydol', 37000, 43),
                new GymPokemon('Lanturn', 37000, 43),
            ], { weight: 1 }, 'Dianne', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Medicham', 37000, 43),
                new GymPokemon('Claydol', 37000, 43),
            ], { weight: 1 }, 'Felix', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Skarmory', 37000, 43),
                new GymPokemon('Sableye', 37000, 43),
            ], { weight: 1 }, 'Caroline', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Dodrio', 30000, 42),
                new GymPokemon('Kadabra', 30000, 42),
                new GymPokemon('Electrode', 30000, 42),
                new GymPokemon('Shiftry', 30000, 42),
            ], { weight: 1 }, 'Vito', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Torkoal', 37000, 42),
                new GymPokemon('Medicham', 37000, 42),
                new GymPokemon('Ludicolo', 37000, 42),
            ], { weight: 1 }, 'Michelle', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Lunatone', 37000, 43),
                new GymPokemon('Solrock', 37000, 43),
            ], { weight: 1 }, 'Mitchell', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Sableye', 37000, 43),
                new GymPokemon('Absol', 37000, 43),
            ], { weight: 1 }, 'Halle', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Cacturne', 37000, 43),
                new GymPokemon('Pelipper', 37000, 43),
            ], { weight: 1 }, 'Edgar', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Gardevoir', 37000, 43),
                new GymPokemon('Slaking', 37000, 43),
            ], { weight: 1 }, 'Katelynn', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Slaking', 37000, 43),
                new GymPokemon('Dusclops', 37000, 43),
            ], { weight: 1 }, 'Quincy', '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [{loot: 'Ultraball'}],
        legendary: [
            {loot: 'Mind Plate'},
            {loot: 'Flame Plate'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Victory Road Hoenn'))}],
    },
    560000,
    [
        new DungeonBossPokemon('Whiscash', 3003000, 14),
        new DungeonBossPokemon('Hariyama', 3003000, 14),
    ],
    37000, 101);

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
                new GymPokemon('Starly', 720600, 7),
                new GymPokemon('Shinx', 720600, 7),
            ], { weight: 1 }, 'Curtis'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Bidoof', 720600, 9)],
            { weight: 1 }, 'Diana'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Earth Plate'},
            {loot: 'Fist Plate'},
        ],
    },
    720600,
    [
        new DungeonBossPokemon('Gyarados', 3703000, 14),
        new DungeonBossPokemon('Whiscash', 3703000, 14),
    ],
    39000, 203);

dungeonList['Valley Windworks'] = new Dungeon('Valley Windworks',
    [
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Glameow', 756000, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Zubat', 756000, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Glameow', 756000, 11),
                new GymPokemon('Stunky', 756000, 11),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Stunky', 756000, 13)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Zubat', 756000, 11),
                new GymPokemon('Zubat', 756000, 11),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'Lucky_incense'},
            {loot: 'Pokeball'},
            {loot: 'Greatball'},
        ],
        rare: [{loot: 'Yellow Shard'}],
        epic: [{loot: 'Zap Plate'}],
        legendary: [{loot: 'SmallRestore'}],
    },
    756000,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Zubat', 1901500, 15),
                new GymPokemon('Purugly', 1901500, 17),
            ], { weight: 1 }, 'Mars', '(mars)'),
        new DungeonBossPokemon('Drifloon', 3803000, 14, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Valley Windworks'))}),
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
                new GymPokemon('Wurmple', 812000, 9),
                new GymPokemon('Silcoon', 812000, 11),
                new GymPokemon('Beautifly', 812000, 13),
                new GymPokemon('Pachirisu', 812000, 14),
            ], { weight: 1 }, 'Jack & Briana'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Abra', 812000, 15),
                new GymPokemon('Abra', 812000, 15),
            ], { weight: 1 }, 'Linsey & Elijah', '(both)'),
        new DungeonTrainer('Bug Buds',
            [
                new GymPokemon('Wurmple', 812000, 9),
                new GymPokemon('Cascoon', 812000, 11),
                new GymPokemon('Dustox', 812000, 13),
                new GymPokemon('Burmy (Plant)', 812000, 12),
                new GymPokemon('Kricketune', 812000, 12),
            ], { weight: 1 }, 'Philip & Donald'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Meditite', 812000, 15),
                new GymPokemon('Psyduck', 812000, 15),
            ], { weight: 1 }, 'Kody & Rachael', '(both)'),
    ],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Oran'},
            {loot: 'Razz'},
            {loot: 'Bluk'},
            {loot: 'Greatball'},
        ],
        rare: [{loot: 'Green Shard'}],
        epic: [
            {loot: 'Insect Plate'},
            {loot: 'Meadow Plate'},
        ],
        legendary: [
            {loot: 'SmallRestore'},
            {loot: 'Silver_Powder'},
        ],
    },
    812000,
    [
        new DungeonBossPokemon('Beautifly', 3950000, 30),
        new DungeonBossPokemon('Dustox', 3950000, 30),
    ],
    48000, 205);

dungeonList['Old Chateau'] = new Dungeon('Old Chateau',
    ['Gastly', 'Haunter', 'Gengar'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [
            {loot: 'Dread Plate'},
            {loot: 'Spooky Plate'},
            {loot: 'Zap Plate'},
        ],
        legendary: [
            {loot: 'Odd Keystone'},
            {loot: 'Spell_Tag'},
        ],
    },
    853000,
    [new DungeonBossPokemon('Rotom', 4200000, 100)],
    52500, 205);

dungeonList['Team Galactic Eterna Building'] = new Dungeon('Team Galactic Eterna Building',
    [
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Zubat', 877000, 17),
                new GymPokemon('Stunky', 877000, 17),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Zubat', 877000, 16),
                new GymPokemon('Glameow', 877000, 18),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Glameow', 877000, 19)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Croagunk', 877000, 19)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Stunky', 877000, 16),
                new GymPokemon('Croagunk', 877000, 16),
                new GymPokemon('Glameow', 877000, 16),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Kadabra', 877000, 20)],
            { weight: 1 }, 'Travon', '(male)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Red Shard'},
        ],
        epic: [{loot: 'Toxic Plate'}],
        legendary: [{loot: 'Revive'}],
    },
    877000,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Zubat', 2150000, 21),
                new GymPokemon('Skuntank', 2150000, 23),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonBossPokemon('Rotom (Heat)', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (Wash)', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (Frost)', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (Fan)', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (Mow)', 4300000, 100, {requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
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
                new GymPokemon('Geodude', 903000, 20),
                new GymPokemon('Geodude', 903000, 20),
                new GymPokemon('Onix', 903000, 22),
            ], { weight: 1 }, 'Reginald & Lorenzo'),
        new DungeonTrainer('Siblings',
            [
                new GymPokemon('Buneary', 903000, 22),
                new GymPokemon('Staravia', 903000, 17),
                new GymPokemon('Ponyta', 903000, 20),
                new GymPokemon('Shellos (West)', 903000, 20),
            ], { weight: 1 }, 'Cassidy & Wayne'),
        new DungeonTrainer('Nature Friends',
            [
                new GymPokemon('Psyduck', 903000, 22),
                new GymPokemon('Aipom', 903000, 22),
            ], { weight: 1 }, 'Tori & Diego'),
        new DungeonTrainer('Nature Friends',
            [
                new GymPokemon('Hoothoot', 903000, 22),
                new GymPokemon('Buizel', 903000, 20),
                new GymPokemon('Shinx', 903000, 20),
            ], { weight: 1 }, 'Ana & Parker'),
        new DungeonTrainer('Amateur Archaeologists',
            [
                new GymPokemon('Gible', 903000, 22),
                new GymPokemon('Geodude', 903000, 19),
                new GymPokemon('Bronzor', 903000, 21),
            ], { weight: 1 }, 'Terry & Gerald'),
    ],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Rawst', weight: 2},
            {loot: 'Razz'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Greatball'},
            {loot: 'Earth Plate'},
            {loot: 'Draco Plate'},
        ],
        legendary: [
            {loot: 'Revive', weight: 2},
            {loot: 'SmallRestore', weight: 2},
            {loot: 'MediumRestore'},
        ],
    },
    903000,
    [new DungeonBossPokemon('Bronzor', 4400000, 100)],
    56500, 206);

dungeonList['Mt. Coronet South'] = new Dungeon('Mt. Coronet South',
    ['Clefairy', 'Zubat', 'Machop', 'Geodude', 'Magikarp', 'Cleffa', 'Barboach', 'Chingling'],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Stone Plate'}],
        legendary: [{loot: 'Revive', weight: 2}],
    },
    951500,
    [
        new DungeonBossPokemon('Nosepass', 4000000, 35),
        new DungeonBossPokemon('Meditite', 4000000, 50),
        new DungeonBossPokemon('Bronzor', 4000000, 50),
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
                new GymPokemon('Geodude', 960000, 19),
                new GymPokemon('Geodude', 960000, 21),
                new GymPokemon('Bronzor', 960000, 23),
            ], { weight: 1 }, 'Karl'),
    ],
    {
        common: [
            {loot: 'Lucky_incense', weight: 2},
            {loot: 'Persim'},
        ],
        rare: [{loot: 'Crimson Shard'}],
        epic: [
            {loot: 'Mind Plate'},
            {loot: 'Sky Plate'},
        ],
    },
    960000,
    [
        ...SolaceonUnownList.map((char) => new DungeonBossPokemon(`Unown (${char})` as PokemonNameType, 4100000, 30, {
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
                new GymPokemon('Aipom', 983000, 34),
                new GymPokemon('Floatzel', 983000, 36),
            ], { weight: 1 }, 'Lawrence'),
        new DungeonTrainer('Picnicker',
            [new GymPokemon('Raichu', 983000, 37)],
            { weight: 1 }, 'Summer'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Magnemite', 983000, 34),
                new GymPokemon('Magnemite', 983000, 36),
            ], { weight: 1 }, 'Noel', '(male)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Steelix', 983000, 37)],
            { weight: 1 }, 'Braden', '(male)'),
        new DungeonTrainer('Mountain Men',
            [
                new GymPokemon('Nosepass', 983000, 35),
                new GymPokemon('Onix', 983000, 33),
                new GymPokemon('Steelix', 983000, 34),
                new GymPokemon('Graveler', 983000, 35),
                new GymPokemon('Rhyhorn', 983000, 35),
            ], { weight: 1 }, 'Damon & Maurice'),
        new DungeonTrainer('Crush Kin',
            [
                new GymPokemon('Toxicroak', 983000, 38),
                new GymPokemon('Medicham', 983000, 38),
            ], { weight: 1 }, 'Kendal & Tyler'),
        new DungeonTrainer('Co-workers',
            [
                new GymPokemon('Geodude', 983000, 33),
                new GymPokemon('Geodude', 983000, 33),
                new GymPokemon('Machoke', 983000, 36),
                new GymPokemon('Magnemite', 983000, 34),
                new GymPokemon('Graveler', 983000, 34),
                new GymPokemon('Machop', 983000, 34),
            ], { weight: 1 }, 'Brendon & Quentin'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Quagsire', 983000, 35),
                new GymPokemon('Staraptor', 983000, 36),
                new GymPokemon('Hippopotas', 983000, 38),
                new GymPokemon('Lopunny', 983000, 38),
                new GymPokemon('Medicham', 983000, 35),
                new GymPokemon('Kirlia', 983000, 36),
            ], { weight: 1 }, 'Jonah & Brenda'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine', weight: 2},
            {loot: 'Pokeball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Iron Plate', weight: 2},
            {loot: 'Ultraball', weight: 2},
            {loot: 'Revive'},
            {loot: 'Duskball'},
        ],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'Magnet'},
        ],
    },
    983000,
    [
        new DungeonTrainer('Galactic Grunts',
            [
                new GymPokemon('Zubat', 701667, 34),
                new GymPokemon('Houndour', 701667, 34),
                new GymPokemon('Golbat', 701667, 34),
                new GymPokemon('Glameow', 701667, 34),
                new GymPokemon('Croagunk', 701667, 34),
                new GymPokemon('Stunky', 701667, 34),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    66500, 218,
    () => {
        BagHandler.gainItem({type: ItemType.item, id: 'Fighting_egg'}, 1);
        Notifier.notify({
            message: 'You were awarded a Fighting Egg for defeating the Galactic Grunts.',
            type: NotificationConstants.NotificationOption.success,
            setting: NotificationConstants.NotificationSetting.Dungeons.rare_dungeon_item_found,
        });
    });

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
                new GymPokemon('Glameow', 1015000, 35),
                new GymPokemon('Murkrow', 1015000, 35),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Golbat', 1015000, 37)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Croagunk', 1015000, 33),
                new GymPokemon('Houndour', 1015000, 33),
                new GymPokemon('Stunky', 1015000, 33),
                new GymPokemon('Glameow', 1015000, 33),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'Token_collector', weight: 2},
            {loot: 'Sitrus'},
        ],
        rare: [{loot: 'Blue Shard'}],
        epic: [
            {loot: 'Mind Plate'},
            {loot: 'Lureball'},
        ],
    },
    1015000,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Golbat', 1533334, 38),
                new GymPokemon('Bronzor', 1533334, 38),
                new GymPokemon('Toxicroak', 1533334, 40),
            ], { weight: 1 }, 'Saturn', '(saturn)'),
        new DungeonBossPokemon('Azelf', 10060000, 50, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))}),
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
                new GymPokemon('Glameow', 1068735, 33),
                new GymPokemon('Golbat', 1068735, 33),
                new GymPokemon('Murkrow', 1068735, 36),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Croagunk', 1068735, 37)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Stunky', 1068735, 35),
                new GymPokemon('Houndour', 1068735, 35),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Houndour', 1068735, 34),
                new GymPokemon('Glameow', 1068735, 36),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [{loot: 'Mind Plate'}],
    },
    1068735,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Golbat', 1606667, 38),
                new GymPokemon('Bronzor', 1606667, 38),
                new GymPokemon('Purugly', 1606667, 40),
            ], { weight: 1 }, 'Mars', '(mars)'),
    ],
    72500, 218);

dungeonList['Mt. Coronet North'] = new Dungeon('Mt. Coronet North',
    ['Clefairy', 'Zubat', 'Machop', 'Geodude', 'Magikarp', 'Noctowl', 'Meditite', 'Barboach', 'Chingling', 'Bronzor', 'Snover'],
    {
        common: [
            {loot: 'xClick', weight: 2},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Crimson Shard'},
        ],
        epic: [
            {loot: 'Stone Plate'},
            {loot: 'Draco Plate'},
        ],
        legendary: [
            {loot: 'Ultraball', weight: 4},
            {loot: 'Light Clay', weight: 2},
            {loot: 'LargeRestore', weight: 2},
            {loot: 'Star Piece'},
            {loot: 'Soft_Sand'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Mt. Coronet North'))},
        ],
    },
    1111500,
    [
        new DungeonBossPokemon('Graveler', 4960000, 35),
        new DungeonBossPokemon('Feebas', 4960000, 50),
        new DungeonBossPokemon('Medicham', 4960000, 50),
    ],
    74500, 218);

dungeonList['Lake Acuity'] = new Dungeon('Lake Acuity',
    ['Psyduck', 'Golduck', 'Goldeen', 'Magikarp', 'Gyarados', 'Sneasel', 'Snorunt', 'Bibarel', 'Snover'],
    {
        common: [
            {loot: 'Lucky_egg', weight: 2},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [
            {loot: 'Mind Plate'},
            {loot: 'Icicle Plate'},
        ],
    },
    1261800,
    [
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Golbat', 1690000, 38),
                new GymPokemon('Bronzor', 1690000, 38),
                new GymPokemon('Skuntank', 1690000, 40),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonBossPokemon('Uxie', 10070000, 50, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Distortion World'))}),
    ],
    78000, 217);

dungeonList['Team Galactic HQ'] = new Dungeon('Team Galactic HQ',
    [
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Glameow', 1295400, 41)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Glameow', 1295400, 37),
                new GymPokemon('Murkrow', 1295400, 38),
                new GymPokemon('Croagunk', 1295400, 39),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Kirlia', 1295400, 40),
                new GymPokemon('Kadabra', 1295400, 40),
            ], { weight: 2 }, 'Frederick', '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Stunky', 1295400, 41)],
            { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Murkrow', 1295400, 41),
                new GymPokemon('Stunky', 1295400, 41),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Golbat', 1295400, 40),
                new GymPokemon('Golbat', 1295400, 38),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Golbat', 1295400, 39),
                new GymPokemon('Houndour', 1295400, 39),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Porygon2', 1295400, 42)],
            { weight: 2 }, 'Darrius', '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Stunky', 1295400, 38),
                new GymPokemon('Croagunk', 1295400, 40),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Croagunk', 1295400, 38),
                new GymPokemon('Stunky', 1295400, 38),
                new GymPokemon('Glameow', 1295400, 38),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Golbat', 1295400, 42),
                new GymPokemon('Bronzor', 1295400, 42),
                new GymPokemon('Toxicroak', 1295400, 42),
            ], { weight: 1 }, 'Saturn', '(saturn)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [
            {loot: 'Sky Plate'},
            {loot: 'Ultraball'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Poison_Barb'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Team Galactic HQ'))},
        ],
    },
    1295400,
    [
        new DungeonTrainer('Galactic Boss',
            [
                new GymPokemon('Sneasel', 1725000, 44),
                new GymPokemon('Crobat', 1725000, 44),
                new GymPokemon('Honchkrow', 1725000, 46),
            ], { weight: 1 }, 'Cyrus', '(cyrus)'),
    ],
    82500, 217);

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
            [new GymPokemon('Stunky', 1322100, 43)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Murkrow', 1322100, 43)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Houndour', 1322100, 40),
                new GymPokemon('Golbat', 1322100, 40),
                new GymPokemon('Houndour', 1322100, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Stunky', 1322100, 42),
                new GymPokemon('Golbat', 1322100, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [new GymPokemon('Golbat', 1322100, 43)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Murkrow', 1322100, 39),
                new GymPokemon('Glameow', 1322100, 42),
                new GymPokemon('Murkrow', 1322100, 39),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Croagunk', 1322100, 38),
                new GymPokemon('Croagunk', 1322100, 42),
                new GymPokemon('Stunky', 1322100, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Houndour', 1322100, 40),
                new GymPokemon('Glameow', 1322100, 42),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Glameow', 1322100, 41),
                new GymPokemon('Golbat', 1322100, 41),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Galactic Grunt',
            [
                new GymPokemon('Golbat', 1322100, 39),
                new GymPokemon('Croagunk', 1322100, 40),
                new GymPokemon('Murkrow', 1322100, 41),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Iron Plate'},
            {loot: 'Draco Plate'},
            {loot: 'Splash Plate'},
        ],
    },
    1322100,
    [
        new DungeonTrainer('Commanders',
            [
                new GymPokemon('Bronzor', 880000, 44),
                new GymPokemon('Golbat', 880000, 44),
                new GymPokemon('Purugly', 880000, 46),
                new GymPokemon('Bronzor', 880000, 44),
                new GymPokemon('Golbat', 880000, 44),
                new GymPokemon('Skuntank', 880000, 46),
            ], { weight: 1 }, 'Mars & Jupiter', '(marsjupiter)'),
        new DungeonBossPokemon('Palkia', 11880000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)}),
        new DungeonBossPokemon('Dialga', 11880000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_SinnohChampion)}),
    ],
    84500, 217);

dungeonList['Distortion World'] = new Dungeon('Distortion World',
    ['Golbat', 'Gastly', 'Duskull', 'Dusclops', 'Chimecho', 'Chingling', 'Bronzor', 'Bronzong'],
    {
        common: [
            {loot: 'xClick', weight: 4},
            {loot: 'Lucky_incense', weight: 2},
            {loot: 'Banette'},
        ],
        rare: [{loot: 'Lime Shard'}],
        legendary: [
            {loot: 'Rare Bone'},
            {loot: 'Odd Keystone'},
            {loot: 'Ultraball'},
        ],
    },
    1350400,
    [
        new DungeonTrainer('Galactic Boss',
            [
                new GymPokemon('Houndoom', 1128000, 45),
                new GymPokemon('Honchkrow', 1128000, 47),
                new GymPokemon('Crobat', 1128000, 46),
                new GymPokemon('Gyarados', 1128000, 46),
                new GymPokemon('Weavile', 1128000, 47),
            ], { weight: 1 }, 'Cyrus', '(cyrus)'),
        new DungeonBossPokemon('Giratina (Altered)', 11880000, 45, {requirement: new TemporaryBattleRequirement('Zero')}),
    ],
    86500, 217);

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
                new GymPokemon('Haunter', 1503000, 43),
                new GymPokemon('Gengar', 1503000, 46),
                new GymPokemon('Gardevoir', 1503000, 46),
            ], { weight: 1 }, 'Bryce', '(male)'),
        new DungeonTrainer('Bird Keeper',
            [
                new GymPokemon('Noctowl', 1503000, 45),
                new GymPokemon('Togetic', 1503000, 47),
            ], { weight: 1 }, 'Hana'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Blissey', 1503000, 45),
                new GymPokemon('Glalie', 1503000, 46),
                new GymPokemon('Magnezone', 1503000, 48),
            ], { weight: 1 }, 'Mariah', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Mamoswine', 1503000, 45),
                new GymPokemon('Mothim', 1503000, 46),
                new GymPokemon('Rampardos', 1503000, 48),
            ], { weight: 1 }, 'Omar', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Clefable', 1503000, 47),
                new GymPokemon('Torterra', 1503000, 48),
            ], { weight: 1 }, 'Sydney', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Staraptor', 1503000, 47),
                new GymPokemon('Lickilicky', 1503000, 47),
            ], { weight: 1 }, 'Clayton', '(male)'),
        new DungeonTrainer('Double Team',
            [
                new GymPokemon('Staraptor', 1503000, 50),
                new GymPokemon('Ambipom', 1503000, 50),
            ], { weight: 1 }, 'Al & Kay'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Machamp', 1503000, 48)],
            { weight: 1 }, 'Miles'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Chimecho', 1503000, 44),
                new GymPokemon('Absol', 1503000, 45),
                new GymPokemon('Dusknoir', 1503000, 46),
            ], { weight: 1 }, 'Valencia', '(female)'),
        new DungeonTrainer('Double Team',
            [
                new GymPokemon('Lumineon', 1503000, 50),
                new GymPokemon('Rapidash', 1503000, 50),
            ], { weight: 1 }, 'Pat & Jo'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Rhydon', 1503000, 47),
                new GymPokemon('Carnivine', 1503000, 48),
            ], { weight: 1 }, 'Henry', '(male)'),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Altaria', 1503000, 45),
                new GymPokemon('Gabite', 1503000, 47),
            ], { weight: 1 }, 'Ondrej'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Porygon-Z', 1503000, 46),
                new GymPokemon('Tangrowth', 1503000, 46),
                new GymPokemon('Empoleon', 1503000, 46),
            ], { weight: 1 }, 'Edgar', '(male)'),
        new DungeonTrainer('Dragon Tamer',
            [
                new GymPokemon('Gible', 1503000, 43),
                new GymPokemon('Swablu', 1503000, 45),
                new GymPokemon('Gabite', 1503000, 47),
            ], { weight: 1 }, 'Clinton'),
    ],
    {
        common: [
            {loot: 'Lucky_incense', weight: 3},
            {loot: 'Oran', weight: 3},
            {loot: 'Graveler'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'White Shard'},
            {loot: 'Black Shard'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'Repeatball'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Heart Scale'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Victory Road Sinnoh'))},
        ],
    },
    1503000,
    [
        new DungeonBossPokemon('Rhydon', 7000000, 100),
        new DungeonBossPokemon('Steelix', 7000000, 100),
    ],
    89500, 223);

dungeonList['Sendoff Spring'] = new Dungeon('Sendoff Spring',
    ['Golbat', 'Golduck', 'Graveler', 'Goldeen', 'Magikarp', 'Staravia', 'Bibarel', 'Chingling'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'White Shard'},
            {loot: 'Black Shard'},
        ],
        epic: [
            {loot: 'Spooky Plate'},
            {loot: 'Draco Plate'},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Seaking', 10000000, 100),
        new DungeonBossPokemon('Gyarados', 10000000, 100),
        new DungeonBossPokemon('Dusclops', 10000000, 100),
    ],
    96500, 230);

dungeonList['Hall of Origin'] = new Dungeon('Hall of Origin',
    ['Slowpoke', 'Spearow', 'Garchomp', 'Slakoth', 'Eevee', 'Breloom', 'Absol'],
    {
        common: [
            {loot: 'Dowsing_machine', weight: 4},
            {loot: 'Cheri', weight: 2},
            {loot: 'Ditto'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'White Shard'},
            {loot: 'Black Shard'},
        ],
        epic: [
            {loot: 'Draco Plate'},
            {loot: 'Dread Plate'},
            {loot: 'Earth Plate'},
            {loot: 'Fist Plate'},
            {loot: 'Flame Plate'},
            {loot: 'Icicle Plate'},
            {loot: 'Insect Plate'},
            {loot: 'Iron Plate'},
            {loot: 'Meadow Plate'},
            {loot: 'Mind Plate'},
            {loot: 'Pixie Plate'},
            {loot: 'Sky Plate'},
            {loot: 'Splash Plate'},
            {loot: 'Spooky Plate'},
            {loot: 'Stone Plate'},
            {loot: 'Toxic Plate'},
            {loot: 'Zap Plate'},
        ],
    },
    2653000,
    [
        new DungeonBossPokemon('Arceus (Normal)', 13000000, 100),
        new DungeonBossPokemon('Slaking', 10000000, 100),
        new DungeonBossPokemon('Snorlax', 10000000, 100),
        new DungeonBossPokemon('Shuckle', 10000000, 100),
        new DungeonBossPokemon('Blissey', 10000000, 100),
    ],
    106500, 230);

dungeonList['Fullmoon Island'] = new Dungeon('Fullmoon Island',
    ['Illumise', 'Minun', 'Hypno', 'Luvdisc'],
    {
        common: [
            {loot: 'xClick', weight: 2},
            {loot: 'Nanab'},
        ],
        rare: [{loot: 'White Shard'}],
        epic: [{loot: 'Mind Plate'}],
    },
    2603000,
    [new DungeonBossPokemon('Clefable', 11000000, 100)],
    96500, 230);

dungeonList['Newmoon Island'] = new Dungeon('Newmoon Island',
    ['Volbeat', 'Plusle', 'Absol', 'Luvdisc'],
    {
        common: [
            {loot: 'Lucky_egg', weight: 2},
            {loot: 'Nanab'},
        ],
        rare: [{loot: 'Black Shard'}],
        epic: [{loot: 'Dread Plate'}],
        legendary: [{loot: 'Black_Glasses'}],
    },
    2603000,
    [new DungeonBossPokemon('Darkrai', 11000000, 100)],
    96500, 230);

dungeonList['Flower Paradise'] = new Dungeon('Flower Paradise',
    ['Gloom', 'Bellsprout', 'Tangela', 'Skiploom', 'Lombre', 'Seedot', 'Roselia'],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Mago'},
            {loot: 'Aguav'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Sky Plate'},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Parasect', 9900000, 50),
        new DungeonBossPokemon('Breloom', 11000000, 50),
        new DungeonBossPokemon('Shaymin (Land)', 11000000, 50),
        new DungeonBossPokemon('Shaymin (Sky)', 11000000, 50, {requirement: new ObtainedPokemonRequirement('Shaymin (Land)')}),
    ],
    96500, 230);

dungeonList['Snowpoint Temple'] = new Dungeon('Snowpoint Temple',
    ['Golbat', 'Sneasel', 'Smoochum'],
    {
        common: [
            {loot: 'Token_collector', weight: 2},
            {loot: 'Aspear'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'White Shard'},
        ],
        epic: [{loot: 'Icicle Plate'}],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Never_Melt_Ice'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Snowpoint Temple'))}],
    },
    2603000,
    [
        new DungeonBossPokemon('Jynx', 10000000, 100),
        new DungeonBossPokemon('Regigigas', 11000000, 100),
    ],
    96500, 230);

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
            [new GymPokemon('Dragonite', 2603000, 60)],
            { weight: 1 }, 'Darien'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Bronzong', 2603000, 58),
                new GymPokemon('Golbat', 2603000, 58),
                new GymPokemon('Purugly', 2603000, 60),
            ], { weight: 1 }, 'Mars', '(mars)'),
        new DungeonTrainer('Commander',
            [
                new GymPokemon('Bronzong', 2603000, 58),
                new GymPokemon('Golbat', 2603000, 58),
                new GymPokemon('Skuntank', 2603000, 60),
            ], { weight: 1 }, 'Jupiter', '(jupiter)'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Primeape', 2603000, 58),
                new GymPokemon('Banette', 2603000, 59),
                new GymPokemon('Electabuzz', 2603000, 58),
                new GymPokemon('Jumpluff', 2603000, 58),
                new GymPokemon('Ampharos', 2603000, 59),
                new GymPokemon('Onix', 2603000, 58),
            ], { weight: 1 }, 'Keenan & Kassandra'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Pupitar', 2603000, 58),
                new GymPokemon('Torterra', 2603000, 61),
                new GymPokemon('Drapion', 2603000, 61),
            ], { weight: 1 }, 'Stefan & Jasmin'),
        new DungeonTrainer('Fight & Flight',
            [
                new GymPokemon('Staravia', 2603000, 55),
                new GymPokemon('Fearow', 2603000, 57),
                new GymPokemon('Noctowl', 2603000, 59),
                new GymPokemon('Breloom', 2603000, 58),
                new GymPokemon('Toxicroak', 2603000, 58),
            ], { weight: 1 }, 'Krystal & Ray'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Glalie', 2603000, 59),
                new GymPokemon('Crobat', 2603000, 60),
                new GymPokemon('Luxray', 2603000, 58),
                new GymPokemon('Ursaring', 2603000, 59),
                new GymPokemon('Gliscor', 2603000, 58),
            ], { weight: 1 }, 'Abel & Monique'),
        new DungeonTrainer('Melded Minds',
            [
                new GymPokemon('Lunatone', 2603000, 57),
                new GymPokemon('Gardevoir', 2603000, 59),
                new GymPokemon('Solrock', 2603000, 57),
                new GymPokemon('Gallade', 2603000, 59),
            ], { weight: 1 }, 'Chelsey & Sterling', '(both)'),
        new DungeonTrainer('Dragon Warriors',
            [
                new GymPokemon('Raticate', 2603000, 57),
                new GymPokemon('Drifblim', 2603000, 58),
                new GymPokemon('Shiftry', 2603000, 59),
                new GymPokemon('Bagon', 2603000, 57),
                new GymPokemon('Shelgon', 2603000, 57),
                new GymPokemon('Vibrava', 2603000, 57),
            ], { weight: 1 }, 'Harlan & Kenny'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Loudred', 2603000, 58),
                new GymPokemon('Rampardos', 2603000, 59),
                new GymPokemon('Pelipper', 2603000, 58),
                new GymPokemon('Wigglytuff', 2603000, 58),
                new GymPokemon('Gardevoir', 2603000, 59),
                new GymPokemon('Medicham', 2603000, 58),
            ], { weight: 1 }, 'Skylar & Narasha'),
        new DungeonTrainer('Hidden Dragons',
            [
                new GymPokemon('Gible', 2603000, 57),
                new GymPokemon('Gabite', 2603000, 57),
                new GymPokemon('Dragonair', 2603000, 57),
                new GymPokemon('Machamp', 2603000, 60),
            ], { weight: 1 }, 'Drake & Jarrett'),
    ],
    {
        common: [
            {loot: 'Token_collector', weight: 2},
            {loot: 'Rawst'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Black Shard'},
        ],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Iron Plate'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'Revive'},
            {loot: 'Star Piece', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Charcoal'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Skarmory', 10000000, 100),
        new DungeonBossPokemon('Heatran', 11000000, 100),
    ],
    96500, 230);

// Unova

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
            ], { weight: 1 }, 'Molly'),
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Lillipup', 126500, 6),
                new GymPokemon('Mareep', 126500, 6),
            ], { weight: 1 }, 'Orville'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Patrat', 126500, 6),
                new GymPokemon('Psyduck', 126500, 6),
            ], { weight: 1 }, 'Kenny'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Pokeball'},
            {loot: 'Cheri'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Nanab'},
            {loot: 'Wepear'},
        ],
    },
    2503000,
    [new DungeonBossPokemon('Riolu', 13000000, 100)],
    126500, 20);

dungeonList['Liberty Garden'] = new Dungeon('Liberty Garden',
    ['Vulpix', 'Sunkern', 'Abra', 'Wingull', 'Pidove', 'Sentret'],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Figy', weight: 2},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Mind Plate'},
        ],
        legendary: [{loot: 'Ultraball'}],
    },
    2703000,
    [
        new DungeonBossPokemon('Victini', 14000000, 100),
        new DungeonBossPokemon('Chimecho', 14000000, 100),
        new DungeonBossPokemon('Kadabra', 14000000, 100),
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
                new GymPokemon('Lillipup', 146500, 16),
                new GymPokemon('Trubbish', 146500, 16),
            ], { weight: 1 }, 'Felix'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Sewaddle', 146500, 17)],
            { weight: 1 }, 'Heath'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Drilbur', 146500, 17)],
            { weight: 1 }, 'Zack', '(male)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Timburr', 146500, 17)],
            { weight: 1 }, 'Scott', '(male)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Grimer', 146500, 17)],
            { weight: 1 }, 'Caroline', '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Magnemite', 146500, 17)],
            { weight: 1 }, 'Clarke', '(male)'),
        new DungeonTrainer('Janitor',
            [
                new GymPokemon('Marill', 146500, 31),
                new GymPokemon('Cinccino', 146500, 31),
            ], { weight: 1 }, 'Brady'),
    ],
    {
        common: [
            {loot: 'xClick', weight: 2},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [
            {loot: 'Toxic Plate'},
            {loot: 'Mind Plate'},
        ],
        legendary: [
            {loot: 'MediumRestore', weight: 2},
            {loot: 'SmallRestore'},
            {loot: 'Ultraball'},
            {loot: 'Revive'},
            {loot: 'Rare Bone'},
            {loot: 'LargeRestore'},
        ],
        mythic: [{loot: 'Heart Scale'}],
    },
    2603000,
    [
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Sandile', 15000000, 16)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scraggy', 15000000, 16)],
            { weight: 1 }, undefined, '(female)'),
    ],
    146500, 4);

dungeonList['Relic Passage'] = new Dungeon('Relic Passage',
    [
        {pokemon: 'Rattata', options: { weight: 8 }},
        {pokemon: 'Raticate', options: { weight: 8 }},
        {pokemon: 'Roggenrola', options: { weight: 8 }},
        {pokemon: 'Woobat', options: { weight: 8 }},
        {pokemon: 'Timburr', options: { weight: 8 }},
        new DungeonTrainer('Scientist',
            [new GymPokemon('Grimer', 176500, 18)],
            { weight: 1 }, 'Terrance', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Venipede', 176500, 17),
                new GymPokemon('Koffing', 176500, 17),
            ], { weight: 1 }, 'Lumina', '(female)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Herdier', 176500, 18)],
            { weight: 1 }, 'Kendall', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Sandslash', 176500, 32)],
            { weight: 1 }, 'Eileen', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Drilbur', 176500, 31),
                new GymPokemon('Roggenrola', 176500, 31),
            ], { weight: 1 }, 'Keith'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Raticate', 176500, 32)],
            { weight: 1 }, 'Randall', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Roggenrola', 176500, 31),
                new GymPokemon('Timburr', 176500, 31),
            ], { weight: 1 }, 'Tobias'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Swoobat', 176500, 33)],
            { weight: 1 }, 'Tully', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Watchog', 176500, 32)],
            { weight: 1 }, 'Annie', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Baltoy', 176500, 32),
                new GymPokemon('Yamask', 176500, 32),
            ], { weight: 1 }, 'Ena', '(female)'),
    ],
    {
        common: [
            {loot: 'Lucky_egg', weight: 2},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Stone Plate'}],
        legendary: [{loot: 'Hard Stone'}],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Relic Passage'))}],
    },
    3203000,
    [
        new DungeonBossPokemon('Onix', 21000000, 100),
        new DungeonBossPokemon('Drilbur', 21000000, 100),
    ],
    156500, 5);

dungeonList['Relic Castle'] = new Dungeon('Relic Castle',
    [
        {pokemon: 'Sandshrew', options: { weight: 1.33 }},
        {pokemon: 'Sandslash', options: { weight: 1.33 }},
        {pokemon: 'Sandile', options: { weight: 1.33 }},
        {pokemon: 'Baltoy', options: { weight: 1.33 }},
        {pokemon: 'Krokorok', options: { weight: 1.33 }},
        {pokemon: 'Yamask', options: { weight: 1.33 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Gothita', 156500, 23)],
            { weight: 1 }, 'Dua', '(female)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Solosis', 156500, 23)],
            { weight: 1 }, 'Low', '(male)'),
    ],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Mago', weight: 2},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Earth Plate'},
            {loot: 'Insect Plate'},
            {loot: 'Flame Plate'},
        ],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Ultraball'},
            {loot: 'MediumRestore', weight: 2},
            {loot: 'LargeRestore'},
        ],
        mythic: [
            {loot: 'Heart Scale'},
            {loot: 'Darmanitan (Zen)', ignoreDebuff : true},
        ],
    },
    2803000,
    [
        new DungeonTrainer('Psychic',
            [new GymPokemon('Sigilyph', 16000000, 23)],
            { weight: 1 }, 'Perry', '(male)'),
        new DungeonBossPokemon('Volcarona', 21000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Relic Passage'))}),
    ],
    166500, 25);

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
                new GymPokemon('Tranquill', 166500, 24),
                new GymPokemon('Liepard', 166500, 24),
            ], { weight: 1 }, 'Galen', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Trubbish', 166500, 26)],
            { weight: 1 }, 'Serenity', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Emolga', 166500, 26)],
            { weight: 1 }, 'Forrest', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Larvesta', 166500, 51),
                new GymPokemon('Pinsir', 166500, 51),
                new GymPokemon('Heracross', 166500, 51),
                new GymPokemon('Leavanny', 166500, 51),
                new GymPokemon('Scolipede', 166500, 51),
            ], { weight: 1 }, 'Murphy', '(male)'),
    ],
    {
        common: [
            {loot: 'Iapapa'},
            {loot: 'xClick', weight: 2},
            {loot: 'Greatball', weight: 2},
            {loot: 'Foongus'},
        ],
        rare: [{loot: 'Green Shard'}],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'Zoroark', requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Lostlorn Forest'))},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Lostlorn Forest'))}],
    },
    3003000,
    [
        new DungeonBossPokemon('Heracross', 18000000, 100),
        new DungeonBossPokemon('Pinsir', 18000000, 100),
        new DungeonBossPokemon('Emolga', 19000000, 100),
    ],
    176500, 16);

dungeonList['Chargestone Cave'] = new Dungeon('Chargestone Cave',
    [
        {pokemon: 'Nosepass', options: { weight: 8.8 }},
        {pokemon: 'Boldore', options: { weight: 8.8 }},
        {pokemon: 'Joltik', options: { weight: 8.8 }},
        {pokemon: 'Ferroseed', options: { weight: 8.8 }},
        {pokemon: 'Klink', options: { weight: 8.8 }},
        new DungeonTrainer('Guitarist',
            [new GymPokemon('Emolga', 186500, 30)],
            { weight: 1 }, 'Anna', '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Magneton', 186500, 30)],
            { weight: 1 }, 'Ronald', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Klink', 186500, 33),
                new GymPokemon('Unfezant', 186500, 33),
                new GymPokemon('Sandslash', 186500, 33),
            ], { weight: 1 }, 'Corky', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Ampharos', 186500, 34)],
            { weight: 1 }, 'Louis', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Aron', 186500, 32),
                new GymPokemon('Nosepass', 186500, 32),
            ], { weight: 1 }, 'Otto'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Minccino', 186500, 33),
                new GymPokemon('Excadrill', 186500, 33),
            ], { weight: 1 }, 'Briana', '(female)'),
        new DungeonTrainer('Doctor',
            [
                new GymPokemon('Solosis', 186500, 32),
                new GymPokemon('Gothita', 186500, 32),
            ], { weight: 1 }, 'Kit'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Joltik', 186500, 32),
                new GymPokemon('Golbat', 186500, 32),
            ], { weight: 1 }, 'Lumi', '(female)'),
        new DungeonTrainer('Guitarist',
            [new GymPokemon('Zebstrika', 186500, 33)],
            { weight: 1 }, 'Beverly', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Onix', 186500, 32),
                new GymPokemon('Boldore', 186500, 32),
            ], { weight: 1 }, 'Jeremy'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Stoutland', 186500, 33),
                new GymPokemon('Krokorok', 186500, 33),
                new GymPokemon('Ferroseed', 186500, 33),
            ], { weight: 1 }, 'Vicki', '(female)'),
    ],
    {
        common: [
            {loot: 'Lucky_egg', weight: 2},
            {loot: 'Dowsing_machine', weight: 2},
            {loot: 'Aguav'},
        ],
        rare: [{loot: 'Yellow Shard'}],
        epic: [
            {loot: 'Zap Plate'},
            {loot: 'Timerball'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
            {loot: 'Magnet'},
            {loot: 'Revive'},
            {loot: 'LargeRestore'},
        ],
    },
    3403000,
    [
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Tirtouga', 12000000, 34),
                new GymPokemon('Magmar', 12000000, 34),
            ], { weight: 1 }, 'Mary', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Archen', 12000000, 34),
                new GymPokemon('Electabuzz', 12000000, 34),
            ], { weight: 1 }, 'Shaye', '(male)'),
        new DungeonBossPokemon('Drilbur', 22000000, 100),
        new DungeonBossPokemon('Tynamo', 22000000, 100),
    ],
    186500, 6);

dungeonList['Mistralton Cave'] = new Dungeon('Mistralton Cave',
    [
        {pokemon: 'Boldore', options: { weight: 4 }},
        {pokemon: 'Woobat', options: { weight: 4 }},
        {pokemon: 'Aron', options: { weight: 4 }},
        {pokemon: 'Lairon', options: { weight: 4 }},
        new DungeonTrainer('Hiker',
            [new GymPokemon('Boldore', 196500, 32)],
            { weight: 1 }, 'Shelby'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Onix', 196500, 32)],
            { weight: 1 }, 'Jebediah'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Tirtouga', 196500, 33),
                new GymPokemon('Axew', 196500, 33),
            ], { weight: 1 }, 'Geoff', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Archen', 196500, 33),
                new GymPokemon('Axew', 196500, 33),
            ], { weight: 1 }, 'Belle', '(female)'),
    ],
    {
        common: [
            {loot: 'xClick', weight: 2},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Draco Plate'},
            {loot: 'Fist Plate'},
            {loot: 'Iron Plate'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'Revive'},
            {loot: 'Hard Stone'},
            {loot: 'Duskball'},
            {loot: 'LargeRestore'},
        ],
    },
    3603000,
    [
        new DungeonBossPokemon('Drilbur', 23000000, 100),
        new DungeonBossPokemon('Axew', 24000000, 100),
        new DungeonBossPokemon('Cobalion', 25000000, 100),
    ],
    196500, 6);

dungeonList['Celestial Tower'] = new Dungeon('Celestial Tower',
    [
        {pokemon: 'Golbat', options: { weight: 8 }},
        {pokemon: 'Haunter', options: { weight: 8 }},
        {pokemon: 'Elgyem', options: { weight: 8 }},
        {pokemon: 'Misdreavus', options: { weight: 8 }},
        new DungeonTrainer('Psychic',
            [new GymPokemon('Musharna', 206500, 36)],
            { weight: 1 }, 'Joyce', '(female)'),
        new DungeonTrainer('School Kid',
            [new GymPokemon('Litwick', 206500, 35)],
            { weight: 1 }, 'Alberta', '(female)'),
        new DungeonTrainer('Pokéfan',
            [new GymPokemon('Clefairy', 206500, 35)],
            { weight: 1 }, 'Jude', '(male)'),
        new DungeonTrainer('Pokéfan',
            [new GymPokemon('Cubchoo', 206500, 35)],
            { weight: 1 }, 'Georgia', '(female)'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Espeon', 206500, 36)],
            { weight: 1 }, 'Micki', '(male)'),
        new DungeonTrainer('Nurse',
            [new GymPokemon('Leavanny', 206500, 35)],
            { weight: 1 }, 'Dixie'),
        new DungeonTrainer('Socialite',
            [new GymPokemon('Roselia', 206500, 35)],
            { weight: 1 }, 'Grace'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Umbreon', 206500, 35)],
            { weight: 1 }, 'Daniel'),
    ],
    {
        common: [
            {loot: 'Lucky_egg', weight: 2},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Spooky Plate'},
            {loot: 'Mind Plate'},
        ],
        legendary: [
            {loot: 'Revive', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Twisted_Spoon'},
        ],
    },
    3803000,
    [
        new DungeonBossPokemon('Litwick', 25000000, 100),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Elgyem', 14000000, 35),
                new GymPokemon('Duosion', 14000000, 35),
            ], { weight: 1 }, 'Bryce', '(male)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Yamask', 14000000, 35),
                new GymPokemon('Gothorita', 14000000, 35),
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
            [new GymPokemon('Zebstrika', 226500, 37)],
            { weight: 1 }, 'Jeremiah', '(male)'),
        new DungeonTrainer('Cyclist',
            [new GymPokemon('Unfezant', 226500, 37)],
            { weight: 1 }, 'Adalaide', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Gurdurr', 226500, 37),
                new GymPokemon('Crustle', 226500, 37),
            ], { weight: 1 }, 'Markus'),
        new DungeonTrainer('Backpacker',
            [
                new GymPokemon('Golbat', 226500, 37),
                new GymPokemon('Swanna', 226500, 37),
            ], { weight: 1 }, 'Kiyo', '(male)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Swoobat', 226500, 38)],
            { weight: 1 }, 'Derek'),
        new DungeonTrainer('Backpacker',
            [
                new GymPokemon('Golbat', 226500, 37),
                new GymPokemon('Darmanitan', 226500, 37),
            ], { weight: 1 }, 'Kumiko', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Boldore', 226500, 37),
                new GymPokemon('Excadrill', 226500, 37),
            ], { weight: 1 }, 'Jared'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Vibrava', 226500, 39),
                new GymPokemon('Camerupt', 226500, 39),
            ], { weight: 1 }, 'Ray', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Grumpig', 226500, 37),
                new GymPokemon('Drifblim', 226500, 37),
            ], { weight: 1 }, 'Cora', '(female)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Gurdurr', 226500, 37),
                new GymPokemon('Scraggy', 226500, 37),
                new GymPokemon('Scraggy', 226500, 37),
            ], { weight: 1 }, 'Corey'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Riolu', 226500, 37),
                new GymPokemon('Gurdurr', 226500, 37),
                new GymPokemon('Riolu', 226500, 37),
            ], { weight: 1 }, 'Chan'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Banette', 226500, 38),
                new GymPokemon('Golduck', 226500, 38),
            ], { weight: 1 }, 'Eliza', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Watchog', 226500, 38),
                new GymPokemon('Camerupt', 226500, 38),
            ], { weight: 1 }, 'Lewis', '(male)'),
    ],
    {
        common: [
            {loot: 'Persim', weight: 4},
            {loot: 'Dowsing_machine', weight: 2},
            {loot: 'Ultraball'},
        ],
        rare: [{loot: 'Red Shard'}],
        epic: [
            {loot: 'Iron Plate'},
            {loot: 'Flame Plate'},
        ],
        legendary: [
            {loot: 'Revive', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Star Piece'},
        ],
    },
    4003000,
    [
        new DungeonBossPokemon('Cacturne', 24000000, 100),
        new DungeonBossPokemon('Vibrava', 24000000, 100),
        new DungeonBossPokemon('Excadrill', 26000000, 100),
        new DungeonBossPokemon('Heatran', 30000000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)}),
    ],
    226500, 14);

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
            { weight: 1 }, 'Tia'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Vibrava', 246500, 46),
                new GymPokemon('Gligar', 246500, 46),
            ], { weight: 1 }, 'Johan', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Onix', 246500, 46),
                new GymPokemon('Lairon', 246500, 46),
            ], { weight: 1 }, 'Mikiko', '(female)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Scrafty', 246500, 47)],
            { weight: 1 }, 'Drago'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Roggenrola', 246500, 44),
                new GymPokemon('Roggenrola', 246500, 44),
                new GymPokemon('Roggenrola', 246500, 44),
                new GymPokemon('Roggenrola', 246500, 44),
            ], { weight: 1 }, 'Rocky'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Mienfoo', 246500, 47)],
            { weight: 1 }, 'Maki'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Gurdurr', 246500, 47)],
            { weight: 1 }, 'Rich'),
    ],
    {
        common: [
            {loot: 'Token_collector', weight: 2},
            {loot: 'Lucky_egg', weight: 2},
            {loot: 'Persim'},
        ],
        rare: [{loot: 'Blue Shard'}],
        epic: [
            {loot: 'Insect Plate'},
            {loot: 'Stone Plate'},
            {loot: 'Diveball'},
            {loot: 'Lureball'},
        ],
        legendary: [{loot: 'LargeRestore'}],
        mythic: [
            {loot: 'Heart Scale'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Seaside Cave'))},
        ],
    },
    4203000,
    [
        new DungeonBossPokemon('Eelektrik', 28000000, 100),
        new DungeonBossPokemon('Crustle', 28000000, 100),
    ],
    246500, 21);

dungeonList['Plasma Frigate'] = new Dungeon('Plasma Frigate',
    [
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Watchog', 257500, 46),
                new GymPokemon('Garbodor', 257500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Golbat', 257500, 46),
                new GymPokemon('Drapion', 257500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Seviper', 257500, 46),
                new GymPokemon('Garbodor', 257500, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Krookodile', 257500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Drapion', 257500, 47)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Garbodor', 257500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Whirlipede', 257500, 46),
                new GymPokemon('Watchog', 257500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Pawniard', 257500, 45),
                new GymPokemon('Pawniard', 257500, 45),
                new GymPokemon('Pawniard', 257500, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Scraggy', 257500, 46),
                new GymPokemon('Liepard', 257500, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Weezing', 257500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Krokorok', 257500, 46),
                new GymPokemon('Raticate', 257500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Deino', 257500, 45),
                new GymPokemon('Deino', 257500, 45),
                new GymPokemon('Sneasel', 257500, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Scraggy', 257500, 45),
                new GymPokemon('Krokorok', 257500, 45),
                new GymPokemon('Golbat', 257500, 45),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scrafty', 257500, 47)],
            { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Pokeball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Iron Plate'},
            {loot: 'Zap Plate'},
            {loot: 'Icicle Plate'},
        ],
        legendary: [{loot: 'Revive'}],
        mythic: [{loot: 'Max Revive'}],
    },
    4603000,
    [
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Cryogonal', 12000000, 48),
                new GymPokemon('Cryogonal', 12000000, 48),
                new GymPokemon('Weavile', 13000000, 50),
            ], { weight: 1 }, 'Zinzolin', '(zinzolin)'),
    ],
    257500, 20);

dungeonList['Giant Chasm'] = new Dungeon('Giant Chasm',
    [
        {pokemon: 'Clefairy', options: { weight: 4 }},
        {pokemon: 'Poliwag', options: { weight: 4 }},
        {pokemon: 'Seel', options: { weight: 4 }},
        {pokemon: 'Tangela', options: { weight: 4 }},
        {pokemon: 'Delibird', options: { weight: 4 }},
        {pokemon: 'Sneasel', options: { weight: 4 }},
        {pokemon: 'Piloswine', options: { weight: 4 }},
        {pokemon: 'Pelipper', options: { weight: 4 }},
        {pokemon: 'Lunatone', options: { weight: 4 }},
        {pokemon: 'Solrock', options: { weight: 4 }},
        {pokemon: 'Vanillish', options: { weight: 4 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 4 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 4 }},
        {pokemon: 'Ditto', options: { weight: 4 }},
        {pokemon: 'Metang', options: { weight: 4 }},
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Weezing', 266500, 46),
                new GymPokemon('Muk', 266500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Scraggy', 266500, 46),
                new GymPokemon('Scrafty', 266500, 46),
                new GymPokemon('Whirlipede', 266500, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Trubbish', 266500, 46),
                new GymPokemon('Golbat', 266500, 46),
                new GymPokemon('Garbodor', 266500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Skorupi', 266500, 45),
                new GymPokemon('Foongus', 266500, 45),
                new GymPokemon('Golbat', 266500, 45),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Krookodile', 266500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Leavanny', 266500, 49)],
            { weight: 1 }, 'Julius'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scrafty', 266500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Scolipede', 266500, 47)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Trubbish', 266500, 46),
                new GymPokemon('Zangoose', 266500, 46),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Grimer', 266500, 46),
                new GymPokemon('Seviper', 266500, 46),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Raticate', 266500, 47),
                new GymPokemon('Watchog', 266500, 47),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Krokorok', 266500, 47),
                new GymPokemon('Krookodile', 266500, 47),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [new GymPokemon('Drapion', 266500, 47)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Deino', 266500, 45),
                new GymPokemon('Deino', 266500, 45),
                new GymPokemon('Sneasel', 266500, 45),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Plasma Grunt',
            [
                new GymPokemon('Koffing', 266500, 46),
                new GymPokemon('Amoonguss', 266500, 46),
            ], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'Aspear', weight: 4},
            {loot: 'Lucky_incense', weight: 2},
            {loot: 'Amoonguss'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Icicle Plate'},
            {loot: 'Draco Plate'},
            {loot: 'Dread Plate'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
            {loot: 'Ultraball'},
            {loot: 'LargeRestore'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    4403000,
    [
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Cryogonal', 12000000, 49),
                new GymPokemon('Cryogonal', 12000000, 49),
                new GymPokemon('Weavile', 12500000, 51),
            ], { weight: 1 }, 'Zinzolin', '(zinzolin)'),
        new DungeonBossPokemon('Tangrowth', 30000000, 100, {requirement: new TemporaryBattleRequirement('Ghetsis 2')}),
        new DungeonBossPokemon('Audino', 32000000, 100, {requirement: new TemporaryBattleRequirement('Ghetsis 2')}),
        new DungeonBossPokemon('Mamoswine', 32000000, 100, {requirement: new TemporaryBattleRequirement('Ghetsis 2')}),
        new DungeonBossPokemon('Kyurem', 35000000, 100, {requirement: new MultiRequirement([
            new TemporaryBattleRequirement('Ghetsis 2'),
            new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
        ])}),
    ],
    266500, 22);

dungeonList['Cave of Being'] = new Dungeon('Cave of Being',
    ['Kadabra', 'Golbat', 'Woobat', 'Gurdurr', 'Graveler', 'Onix'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack'},
            {loot: 'Lucky_egg'},
            {loot: 'Token_collector'},
            {loot: 'Dowsing_machine'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [{loot: 'Mind Plate'}],
    },
    4603000,
    [
        new DungeonBossPokemon('Uxie', 35000000, 100),
        new DungeonBossPokemon('Mesprit', 35000000, 100),
        new DungeonBossPokemon('Azelf', 35000000, 100),
    ],
    286500, 20);

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
            ], { weight: 1 }, 'Wes'),
        new DungeonTrainer('Twins',
            [
                new GymPokemon('Swablu', 306500, 38),
                new GymPokemon('Swablu', 306500, 38),
            ], { weight: 1 }, 'Rae & Ula'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Deerling (Spring)', 306500, 39),
                new GymPokemon('Zangoose', 306500, 39),
            ], { weight: 1 }, 'Lurleen'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Karrablast', 306500, 37),
                new GymPokemon('Shelmet', 306500, 37),
                new GymPokemon('Joltik', 306500, 37),
                new GymPokemon('Scolipede', 306500, 37),
            ], { weight: 1 }, 'Jaye'),
    ],
    {
        common: [
            {loot: 'Mago', weight: 3},
            {loot: 'xClick', weight: 3},
            {loot: 'Amoonguss'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Green Shard'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'LargeRestore'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    4803000,
    [
        new DungeonBossPokemon('Bronzong', 38000000, 100),
        new DungeonBossPokemon('Altaria', 38000000, 100),
        new DungeonBossPokemon('Landorus', 42000000, 100),
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
                new GymPokemon('Golurk', 326500, 55),
                new GymPokemon('Sigilyph', 326500, 55),
            ], { weight: 1 }, 'Billy', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Drifblim', 326500, 55),
                new GymPokemon('Claydol', 326500, 55),
            ], { weight: 1 }, 'Jamie', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Lampent', 326500, 54),
                new GymPokemon('Musharna', 326500, 54),
            ], { weight: 1 }, 'Alia', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Metang', 326500, 54),
                new GymPokemon('Cofagrigus', 326500, 54),
            ], { weight: 1 }, 'Al', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Braviary', 326500, 55),
                new GymPokemon('Carracosta', 326500, 55),
            ], { weight: 1 }, 'Claude', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Mandibuzz', 326500, 55),
                new GymPokemon('Archeops', 326500, 55),
            ], { weight: 1 }, 'Cecile', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Darmanitan', 326500, 55),
                new GymPokemon('Tangrowth', 326500, 55),
            ], { weight: 1 }, 'Chandra', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Whimsicott', 326500, 55),
                new GymPokemon('Unfezant', 326500, 55),
            ], { weight: 1 }, 'Beckett', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Swoobat', 326500, 55),
                new GymPokemon('Lilligant', 326500, 55),
            ], { weight: 1 }, 'Shelly', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Sigilyph', 326500, 55),
                new GymPokemon('Crobat', 326500, 55),
            ], { weight: 1 }, 'Cathy', '(female)'),
        new DungeonTrainer('Doctor',
            [new GymPokemon('Clefable', 326500, 54)],
            { weight: 1 }, 'Logan'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Sawsbuck (Spring)', 326500, 54)],
            { weight: 1 }, 'Mae', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Swanna', 326500, 55),
                new GymPokemon('Ampharos', 326500, 55),
            ], { weight: 1 }, 'Pierce', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Gigalith', 326500, 55),
                new GymPokemon('Skarmory', 326500, 55),
            ], { weight: 1 }, 'Abraham', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Heatmor', 326500, 55),
                new GymPokemon('Galvantula', 326500, 55),
            ], { weight: 1 }, 'Shanta', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Durant', 326500, 55),
                new GymPokemon('Ferrothorn', 326500, 55),
            ], { weight: 1 }, 'Webster', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Electabuzz', 326500, 54),
                new GymPokemon('Probopass', 326500, 54),
            ], { weight: 1 }, 'Eddie', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Magmar', 326500, 54),
                new GymPokemon('Camerupt', 326500, 54),
            ], { weight: 1 }, 'Elle', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Fraxure', 326500, 54),
                new GymPokemon('Zweilous', 326500, 54),
                new GymPokemon('Flygon', 326500, 54),
            ], { weight: 1 }, 'Hugo', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Pinsir', 326500, 54),
                new GymPokemon('Heracross', 326500, 54),
            ], { weight: 1 }, 'Martell'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Throh', 326500, 54),
                new GymPokemon('Sawk', 326500, 54),
            ], { weight: 1 }, 'Chalina'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Zweilous', 326500, 55),
                new GymPokemon('Eelektross', 326500, 55),
            ], { weight: 1 }, 'Elmer', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Fraxure', 326500, 55),
                new GymPokemon('Vanilluxe', 326500, 55),
            ], { weight: 1 }, 'Caroll', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Zebstrika', 326500, 54),
                new GymPokemon('Sawk', 326500, 54),
                new GymPokemon('Starmie', 326500, 54),
            ], { weight: 1 }, 'Portia', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Beartic', 326500, 54),
                new GymPokemon('Throh', 326500, 54),
                new GymPokemon('Golurk', 326500, 54),
            ], { weight: 1 }, 'Sterling', '(male)'),
    ],
    {
        common: [
            {loot: 'xClick', weight: 3},
            {loot: 'xAttack', weight: 3},
            {loot: 'Zoroark'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Quickball'},
            {loot: 'Timerball'},
            {loot: 'Duskball'},
            {loot: 'Nestball'},
            {loot: 'Repeatball'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'Star Piece'},
            {loot: 'LargeRestore'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    5003000,
    [
        new DungeonBossPokemon('Golurk', 44000000, 100),
        new DungeonBossPokemon('Terrakion', 45000000, 100),
        new DungeonBossPokemon('Audino', 45000000, 100),
        new DungeonBossPokemon('Druddigon', 44000000, 100),
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
                new GymPokemon('Roggenrola', 356500, 60),
                new GymPokemon('Graveler', 356500, 60),
                new GymPokemon('Excadrill', 356500, 60),
            ], { weight: 1 }, 'Cairn', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Tauros', 356500, 64),
                new GymPokemon('Crobat', 356500, 64),
                new GymPokemon('Carracosta', 356500, 64),
            ], { weight: 1 }, 'Carter', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Glaceon', 356500, 63),
                new GymPokemon('Bastiodon', 356500, 63),
                new GymPokemon('Rhyperior', 356500, 63),
                new GymPokemon('Drapion', 356500, 63),
            ], { weight: 1 }, 'Julia', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Golett', 356500, 61),
                new GymPokemon('Mamoswine', 356500, 61),
            ], { weight: 1 }, 'Wade'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Geodude', 356500, 60),
                new GymPokemon('Steelix', 356500, 60),
                new GymPokemon('Boldore', 356500, 60),
            ], { weight: 1 }, 'Gus', '(male)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Machoke', 356500, 61),
                new GymPokemon('Abomasnow', 356500, 61),
            ], { weight: 1 }, 'Patton', '(ice)'),
        new DungeonTrainer('Nurse',
            [new GymPokemon('Blissey', 356500, 62)],
            { weight: 1 }, 'Carol'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Gyarados', 356500, 64),
                new GymPokemon('Kangaskhan', 356500, 64),
                new GymPokemon('Archeops', 356500, 64),
            ], { weight: 1 }, 'Chloris', '(female)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Sigilyph', 356500, 62)],
            { weight: 1 }, 'Cliff', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Larvitar', 356500, 61),
                new GymPokemon('Probopass', 356500, 61),
            ], { weight: 1 }, 'Hunter'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Glalie', 356500, 61),
                new GymPokemon('Beartic', 356500, 61),
            ], { weight: 1 }, 'Victor', '(ice)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Smoochum', 356500, 60),
                new GymPokemon('Claydol', 356500, 60),
                new GymPokemon('Kadabra', 356500, 60),
            ], { weight: 1 }, 'Ryan', '(ice)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Weavile', 356500, 63),
                new GymPokemon('Rampardos', 356500, 63),
                new GymPokemon('Toxicroak', 356500, 63),
                new GymPokemon('Aggron', 356500, 63),
            ], { weight: 1 }, 'Zach', '(male)'),
    ],
    {
        common: [
            {loot: 'Token_collector', weight: 3},
            {loot: 'Lucky_incense', weight: 3},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        legendary: [
            {loot: 'Rare Bone', weight: 2},
            {loot: 'Revive'},
            {loot: 'Ultraball'},
            {loot: 'Duskball'},
            {loot: 'LargeRestore'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Twist Mountain'))}],
    },
    5203000,
    [
        new DungeonBossPokemon('Durant', 48000000, 100),
        new DungeonBossPokemon('Cryogonal', 48000000, 100),
        new DungeonBossPokemon('Heatmor', 48000000, 100),
        new DungeonBossPokemon('Regigigas', 50000000, 100),
    ],
    356500, 7);

dungeonList['Dragonspiral Tower'] = new Dungeon('Dragonspiral Tower',
    ['Dratini', 'Tranquill', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Vanillish', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)', 'Beartic', 'Mienfoo', 'Mienshao', 'Druddigon', 'Golett', 'Golurk'],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Razz'},
            {loot: 'Pinap'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Draco Plate'},
            {loot: 'Zap Plate'},
            {loot: 'Flame Plate'},
            {loot: 'Icicle Plate'},
            {loot: 'Spooky Plate'},
            {loot: 'Splash Plate'},
            {loot: 'Iron Plate'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
            {loot: 'Dragon_Fang'},
            {loot: 'LargeRestore'},
        ],
        mythic: [
            {loot: 'Heart Scale'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Dragonspiral Tower'))},
        ],
    },
    5203000,
    [
        new DungeonBossPokemon('Dragonite', 48000000, 100),
        new DungeonBossPokemon('Reshiram', 50000000, 100),
        new DungeonBossPokemon('Zekrom', 50000000, 100),
    ],
    356500, 7);

dungeonList['Moor of Icirrus'] = new Dungeon('Moor of Icirrus',
    [
        {pokemon: 'Croagunk', options: { weight: 2.67 }},
        {pokemon: 'Palpitoad', options: { weight: 2.67 }},
        {pokemon: 'Karrablast', options: { weight: 2.67 }},
        {pokemon: 'Shelmet', options: { weight: 2.67 }},
        {pokemon: 'Stunfisk', options: { weight: 2.67 }},
        {pokemon: 'Barboach', options: { weight: 2.67 }},
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Accelgor', 356500, 62),
                new GymPokemon('Swalot', 356500, 62),
                new GymPokemon('Kecleon', 356500, 62),
            ], { weight: 1 }, 'Elaine', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Escavalier', 356500, 62),
                new GymPokemon('Skuntank', 356500, 62),
                new GymPokemon('Carnivine', 356500, 62),
            ], { weight: 1 }, 'Parker', '(male)'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Corphish', 356500, 60),
                new GymPokemon('Poliwag', 356500, 60),
                new GymPokemon('Stunfisk', 356500, 60),
            ], { weight: 1 }, 'Eustace'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Poliwhirl', 356500, 60),
                new GymPokemon('Whiscash', 356500, 60),
                new GymPokemon('Politoed', 356500, 60),
            ], { weight: 1 }, 'Arnold'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 3},
            {loot: 'Lucky_egg', weight: 3},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        legendary: [
            {loot: 'Ultraball', weight: 2},
            {loot: 'Revive', weight: 2},
            {loot: 'LargeRestore'},
        ],
        mythic: [
            {loot: 'Heart Scale'},
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Moor of Icirrus'))},
        ],
    },
    5203000,
    [
        new DungeonBossPokemon('Keldeo', 50000000, 100),
        new DungeonBossPokemon('Seismitoad', 48000000, 100),
        new DungeonBossPokemon('Whiscash', 48000000, 100),
    ],
    356500, 8);

dungeonList['Pledge Grove'] = new Dungeon('Pledge Grove',
    ['Fearow', 'Furret', 'Ledian', 'Sudowoodo', 'Stantler', 'Breloom', 'Unfezant', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Fist Plate'},
        ],
        legendary: [
            {loot: 'Ultraball'},
            {loot: 'Sharp_Beak'},
        ],
    },
    5203000,
    [new DungeonBossPokemon('Keldeo (Resolute)', 52000000, 100)],
    356500, 8);

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
                new GymPokemon('Wooper', 356500, 60),
                new GymPokemon('Tympole', 356500, 60),
            ], { weight: 1 }, 'Jojo', '(male)'),
        new DungeonTrainer('Nursery Aide',
            [
                new GymPokemon('Exeggcute', 356500, 61),
                new GymPokemon('Miltank', 356500, 61),
            ], { weight: 1 }, 'Ethel'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Dratini', 356500, 59),
                new GymPokemon('Gible', 356500, 59),
                new GymPokemon('Bagon', 356500, 59),
            ], { weight: 1 }, 'Samantha', '(female)'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Burmy (Plant)', 356500, 59),
                new GymPokemon('Scyther', 356500, 59),
                new GymPokemon('Paras', 356500, 59),
            ], { weight: 1 }, 'José', '(male)'),
        new DungeonTrainer('Twins',
            [
                new GymPokemon('Plusle', 356500, 60),
                new GymPokemon('Minun', 356500, 60),
            ], { weight: 1 }, 'Ally & Amy'),
        new DungeonTrainer('Nursery Aide',
            [
                new GymPokemon('Chansey', 356500, 61),
                new GymPokemon('Leavanny', 356500, 61),
            ], { weight: 1 }, 'Rosalyn'),
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Pineco', 356500, 60),
                new GymPokemon('Ferrothorn', 356500, 60),
            ], { weight: 1 }, 'Ike', '(male)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Sudowoodo', 356500, 62),
                new GymPokemon('Gloom', 356500, 62),
                new GymPokemon('Beartic', 356500, 62),
            ], { weight: 1 }, 'Hillary', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Weepinbell', 356500, 62),
                new GymPokemon('Luxray', 356500, 62),
                new GymPokemon('Ursaring', 356500, 62),
            ], { weight: 1 }, 'Dwayne', '(male)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Mankey', 356500, 60),
                new GymPokemon('Snubbull', 356500, 60),
                new GymPokemon('Crawdaunt', 356500, 60),
            ], { weight: 1 }, 'Keita'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Electrike', 356500, 62),
                new GymPokemon('Rapidash', 356500, 62),
                new GymPokemon('Farfetch\'d', 356500, 62),
            ], { weight: 1 }, 'Ralph', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Crobat', 356500, 64),
                new GymPokemon('Magmortar', 356500, 64),
                new GymPokemon('Leafeon', 356500, 64),
            ], { weight: 1 }, 'Rosaline', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Ludicolo', 356500, 64),
                new GymPokemon('Electivire', 356500, 64),
                new GymPokemon('Forretress', 356500, 64),
            ], { weight: 1 }, 'Sinan', '(male)'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Nidoran(F)', 356500, 60),
                new GymPokemon('Nidoran(M)', 356500, 60),
                new GymPokemon('Nidoqueen', 356500, 60),
            ], { weight: 1 }, 'Helia'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Cascoon', 356500, 60),
                new GymPokemon('Silcoon', 356500, 60),
                new GymPokemon('Scolipede', 356500, 60),
            ], { weight: 1 }, 'Henley'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Munchlax', 356500, 62),
                new GymPokemon('Zebstrika', 356500, 62),
                new GymPokemon('Kricketune', 356500, 62),
            ], { weight: 1 }, 'Melita', '(female)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Phanpy', 356500, 60),
                new GymPokemon('Doduo', 356500, 60),
                new GymPokemon('Fearow', 356500, 60),
            ], { weight: 1 }, 'Nicholas'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Oddish', 356500, 60),
                new GymPokemon('Tangela', 356500, 60),
                new GymPokemon('Bellossom', 356500, 60),
            ], { weight: 1 }, 'Millie', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Furret', 356500, 63),
                new GymPokemon('Braviary', 356500, 63),
                new GymPokemon('Seismitoad', 356500, 63),
            ], { weight: 1 }, 'Kelsey', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Linoone', 356500, 63),
                new GymPokemon('Mandibuzz', 356500, 63),
                new GymPokemon('Toxicroak', 356500, 63),
            ], { weight: 1 }, 'Kathrine', '(female)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Tyrogue', 356500, 61),
                new GymPokemon('Scrafty', 356500, 61),
                new GymPokemon('Makuhita', 356500, 61),
            ], { weight: 1 }, 'Kentaro'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Tyrogue', 356500, 61),
                new GymPokemon('Machop', 356500, 61),
                new GymPokemon('Poliwrath', 356500, 61),
            ], { weight: 1 }, 'Lee'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Venonat', 356500, 60),
                new GymPokemon('Yanma', 356500, 60),
                new GymPokemon('Venomoth', 356500, 60),
            ], { weight: 1 }, 'Keston', '(male)'),
    ],
    {
        common: [
            {loot: 'Chesto', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Amoonguss'},
            {loot: 'Greatball'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Fist Plate'},
        ],
        legendary: [
            {loot: 'MediumRestore', weight: 2},
            {loot: 'Star Piece', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Ultraball'},
            {loot: 'Nestball'},
            {loot: 'Miracle_Seed'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pinwheel Forest'))},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Pinwheel Forest'))},
        ],
    },
    5203000,
    [
        new DungeonBossPokemon('Scolipede', 48000000, 100),
        new DungeonBossPokemon('Seismitoad', 48000000, 100),
        new DungeonBossPokemon('Virizion', 48000000, 100),
    ],
    356500, 3);

dungeonList.Dreamyard = new Dungeon('Dreamyard',
    [
        {pokemon: 'Raticate', options: { weight: 4.67 }},
        {pokemon: 'Jigglypuff', options: { weight: 4.67 }},
        {pokemon: 'Golbat', options: { weight: 4.67 }},
        {pokemon: 'Watchog', options: { weight: 4.67 }},
        {pokemon: 'Liepard', options: { weight: 4.67 }},
        {pokemon: 'Munna', options: { weight: 4.67 }},
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Hypno', 356500, 62),
                new GymPokemon('Dusclops', 356500, 62),
            ], { weight: 1 }, 'Nandor', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Gastly', 356500, 63),
                new GymPokemon('Skuntank', 356500, 63),
            ], { weight: 1 }, 'Athena', '(female)'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Chingling', 356500, 62),
                new GymPokemon('Mr. Mime', 356500, 62),
            ], { weight: 1 }, 'Olesia', '(female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Klang', 356500, 63),
                new GymPokemon('Porygon', 356500, 63),
            ], { weight: 1 }, 'Franklin', '(male)'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Shroomish', 356500, 63),
                new GymPokemon('Tangrowth', 356500, 63),
            ], { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Youngster',
            [
                new GymPokemon('Slakoth', 356500, 63),
                new GymPokemon('Slaking', 356500, 63),
            ], { weight: 1 }, 'Keita'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Igglybuff', 356500, 63),
                new GymPokemon('Lickilicky', 356500, 63),
            ], { weight: 1 }, 'Rita', '(female)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Pokeball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [
            {loot: 'Mind Plate', weight: 2},
            {loot: 'Draco Plate'},
        ],
        legendary: [
            {loot: 'SmallRestore', weight: 2},
            {loot: 'Ultraball', weight: 2},
            {loot: 'Revive', weight: 2},
            {loot: 'LargeRestore'},
        ],
    },
    5203000,
    [
        new DungeonBossPokemon('Audino', 48000000, 100),
        new DungeonBossPokemon('Dunsparce', 48000000, 100),
        new DungeonBossPokemon('Latias', 48000000, 100),
        new DungeonBossPokemon('Latios', 48000000, 100),
    ],
    356500, 3);

dungeonList['P2 Laboratory'] = new Dungeon('P2 Laboratory',
    ['Scyther', 'Electrode', 'Pineco', 'Forretress', 'Metang', 'Ferroseed', 'Ferrothorn'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack', weight: 2},
            {loot: 'Token_collector', weight: 2},
            {loot: 'Forretress'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Iron Plate', weight: 2},
            {loot: 'Insect Plate', weight: 2},
            {loot: 'Zap Plate'},
        ],
        legendary: [{loot: 'Revive'}],
    },
    5403000,
    [
        new DungeonBossPokemon('Ursaring', 58000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Mawile', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Sableye', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Zangoose', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Audino', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Durant', 58000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Genesect', 62000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Magneton', 10000000, 72),
                new GymPokemon('Rotom (Wash)', 10000000, 72),
                new GymPokemon('Metagross', 10000000, 72),
                new GymPokemon('Beheeyem', 10000000, 72),
                new GymPokemon('Magnezone', 10000000, 72),
                new GymPokemon('Klinklang', 11000000, 74),
            ], { weight: 1 }, 'Colress', '(colress)'),
    ],
    396500, 18);

// Kalos

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
                new GymPokemon('Scatterbug', 5803000, 3),
                new GymPokemon('Fletchling', 5803000, 3),
            ], { weight: 1 }, 'Joey'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Pikachu', 5803000, 5)],
            { weight: 1 }, 'Anna'),
    ],
    {
        common: [
            {loot: 'Pokeball', weight: 2},
            {loot: 'Lucky_incense'},
        ],
        rare: [{loot: 'Green Shard'}],
        epic: [
            {loot: 'Insect Plate'},
            {loot: 'Fist Plate'},
        ],
        legendary: [
            {loot: 'SmallRestore'},
            {loot: 'Silver_Powder'},
            {loot: 'Heracronite', ignoreDebuff: true},
        ],
    },
    5803020,
    [
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Weedle', 24303000, 2),
                new GymPokemon('Bunnelby', 27303000, 4),
            ], { weight: 1 }, 'Lise'),
        new DungeonBossPokemon('Pikachu', 51738600, 4),
    ],
    400000, 2
);

dungeonList['Connecting Cave'] = new Dungeon('Connecting Cave',
    [
        {pokemon: 'Zubat', options: { weight: 1.33 }},
        {pokemon: 'Whismur', options: { weight: 1.33 }},
        {pokemon: 'Meditite', options: { weight: 1.33 }},
    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Wepear'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Toxic Plate'},
            {loot: 'Sky Plate'},
        ],
        legendary: [
            {loot: 'Hard Stone'},
            {loot: 'Damp Rock'},
            {loot: 'Silk_Scarf'},
        ],
    },
    6503370,
    [
        new DungeonTrainer('Pokémon Breeder',
            [
                new GymPokemon('Ducklett', 13374965, 12),
                new GymPokemon('Pikachu', 14465837, 12),
                new GymPokemon('Litleo', 17438602, 12),
                new GymPokemon('Oddish', 19365784, 12),
            ],
            { weight: 1 }, 'Mercy', '(female)'),
        new DungeonBossPokemon('Axew', 59867590, 20),
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
                new GymPokemon('Houndour', 7037592, 18),
                new GymPokemon('Zubat', 7037592, 18),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Gulpin', 7037592, 18),
                new GymPokemon('Electrike', 7037592, 18),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack'},
        ],
        rare: [{loot: 'Red Shard'}],
        legendary: [
            {loot: 'Hard Stone'},
            {loot: 'Revive'},
            {loot: 'Kangaskhanite', ignoreDebuff: true},
        ],
    },
    7037500,
    [
        new DungeonTrainer('Team Flare Grunt Duo',
            [
                new GymPokemon('Scraggy', 33084827, 20),
                new GymPokemon('Croagunk', 31937395, 20),
            ], { weight: 1 }, undefined),
        new DungeonBossPokemon('Kangaskhan', 63749659, 20),
        new DungeonBossPokemon('Mawile', 61285398, 20),
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
            [new GymPokemon('Linoone', 7353000, 26)],
            { weight: 1 }, 'Lane', '(male)'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Throh', 7353000, 25),
                new GymPokemon('Hawlucha', 7353000, 26),
            ], { weight: 1 }, 'Hedvig'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Sandile', 7353000, 23),
                new GymPokemon('Dwebble', 7353000, 23),
                new GymPokemon('Diggersby', 7353000, 24),
            ], { weight: 1 }, 'Dunstan'),
        new DungeonTrainer('Tourist',
            [new GymPokemon('Nidorina', 7353000, 26)],
            { weight: 1 }, 'Monami', '(female)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Sawk', 7353000, 28)],
            { weight: 1 }, 'Igor'),
        new DungeonTrainer('Psychic',
            [
                new GymPokemon('Chimecho', 7353000, 24),
                new GymPokemon('Golett', 7353000, 24),
            ], { weight: 1 }, 'Franz', '(male)'),
        new DungeonTrainer('Tourist',
            [new GymPokemon('Nidorino', 7353000, 26)],
            { weight: 1 }, 'Haruto', '(male)'),
        new DungeonTrainer('Honeymooners',
            [
                new GymPokemon('Combee', 7353000, 26),
                new GymPokemon('Vespiquen', 7353000, 26),
            ], { weight: 1 }, 'Yuu & Ami'),
    ],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Red Shard'},
        ],
        epic: [
            {loot: 'Fist Plate'},
            {loot: 'Earth Plate'},
            {loot: 'Mind Plate'},
            {loot: 'Nestball'},
        ],
        legendary: [
            {loot: 'Revive', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Black_Belt'},
        ],
    },
    7353000,
    [
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Absol', 33468400, 26),
                new GymPokemon('Pinsir', 37474200, 25),
            ], { weight: 1 }, 'Emil', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Doduo', 20365400, 24),
                new GymPokemon('Granbull', 23366400, 24),
                new GymPokemon('Helioptile', 25476400, 25),
            ], { weight: 1 }, 'Monique', '(female)'),
        new DungeonBossPokemon('Diancie', 69694200, 100, {requirement: new QuestLineStepCompletedRequirement('Princess Diancie', 7)}),
    ],
    555000, 11);

//Tower of Mastery?

dungeonList['Kalos Power Plant'] = new Dungeon('Kalos Power Plant',
    [
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Croagunk', 7903570, 32),
                new GymPokemon('Scraggy', 7903570, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Golbat', 7903570, 32),
                new GymPokemon('Scraggy', 7903570, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Mightyena', 7903570, 34)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Golbat', 7903570, 32),
                new GymPokemon('Mightyena', 7903570, 32),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Golbat', 7903570, 33),
                new GymPokemon('Croagunk', 7903570, 31),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Liepard', 7903570, 31),
                new GymPokemon('Scraggy', 7903570, 31),
                new GymPokemon('Croagunk', 7903570, 31),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Swalot', 7903570, 34)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Liepard', 7903570, 31),
                new GymPokemon('Swalot', 7903570, 33),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Houndoom', 7903570, 36)],
            { weight: 8 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'xAttack'},
        ],
        rare: [{loot: 'Yellow Shard'}],
        epic: [
            {loot: 'Zap Plate'},
            {loot: 'Dread Plate'},
        ],
        legendary: [
            {loot: 'Repeatball', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Magnet'},
        ],
    },
    7903570,
    [
        new DungeonTrainer('Team Flare Aliana',
            [new GymPokemon('Mightyena', 75384400, 38)], { weight: 1 }),
        new DungeonBossPokemon('Volcanion', 83945700, 100,
            {
                requirement: new MultiRequirement([
                    new ClearDungeonRequirement(5, GameConstants.getDungeonIndex('Kalos Power Plant')),
                    new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion),
                ])}),
    ],
    575000, 13);

dungeonList['Sea Spirit\'s Den'] = new Dungeon('Sea Spirit\'s Den',
    ['Lapras', 'Dwebble', 'Lanturn', 'Binacle', 'Woobat', 'Onix'],
    {
        common: [
            {loot: 'xClick', weight: 2},
            {loot: 'Bluk'},
        ],
        rare: [{loot: 'Blue Shard'}],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Sky Plate'},
            {loot: 'Icicle Plate'},
            {loot: 'Zap Plate'},
            {loot: 'Mind Plate'},
            {loot: 'Lureball'},
        ],
        legendary: [
            {loot: 'Hard Stone'},
            {loot: 'Damp Rock'},
            {loot: 'Mystic_Water'},
        ],
    },
    7543000,
    [new DungeonBossPokemon('Lugia', 92375000, 100)],
    600000, 23);

dungeonList['Poké Ball Factory'] = new Dungeon('Poké Ball Factory',
    [
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Toxicroak', 8173950, 37)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Mightyena', 8173950, 36),
                new GymPokemon('Golbat', 8173950, 36),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Scraggy', 8173950, 36),
                new GymPokemon('Mightyena', 8173950, 36),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Swalot', 8173950, 37)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Scraggy', 8173950, 37),
                new GymPokemon('Houndoom', 8173950, 38),
            ],
            { weight: 4 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'Pokeball', weight: 4},
            {loot: 'Greatball', weight: 2},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [
            {loot: 'Duskball'},
            {loot: 'Quickball'},
            {loot: 'Fastball'},
            {loot: 'Timerball'},
            {loot: 'Luxuryball'},
            {loot: 'Lureball'},
            {loot: 'Diveball'},
            {loot: 'Repeatball'},
        ],
    },
    8173950,
    [
        new DungeonTrainer('Team Flare Celosia',
            [new GymPokemon('Manectric', 79385030, 41)],
            { weight: 1 }),
        new DungeonTrainer('Team Flare Bryony',
            [new GymPokemon('Liepard', 79284730, 41)],
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
                new GymPokemon('Scrafty', 8375300, 39),
                new GymPokemon('Sharpedo', 8375300, 39),
                new GymPokemon('Pawniard', 8375300, 39),
            ],
            { weight: 1 }, 'Sid'),
        new DungeonTrainer('Punk Guy',
            [
                new GymPokemon('Skuntank', 8375300, 40),
                new GymPokemon('Crawdaunt', 8375300, 40),
            ], { weight: 1 }, 'Jacques'),
        new DungeonTrainer('Punk Guy',
            [new GymPokemon('Dunsparce', 8375300, 42)],
            { weight: 1 }, 'Slater'),
        new DungeonTrainer('Punk Girl',
            [
                new GymPokemon('Seviper', 8375300, 40),
                new GymPokemon('Arbok', 8375300, 40),
            ],
            { weight: 1 }, 'Jeanne'),
        new DungeonTrainer('Punk Girl',
            [
                new GymPokemon('Liepard', 8375300, 40),
                new GymPokemon('Liepard', 8375300, 40),
            ],
            { weight: 1 }, 'Cecile'),
    ],
    {
        common: [
            {loot: 'xClick', weight: 8},
            {loot: 'Lucky_incense', weight: 6},
            {loot: 'Trubbish', weight: 2},
            {loot: 'Garbodor'},
        ],
        rare: [{loot: 'Pink Shard'}],
        epic: [
            {loot: 'Dread Plate'},
            {loot: 'Duskball'},
        ],
        legendary: [
            {loot: 'Rotom (Heat)'},
            {loot: 'Rotom (Wash)'},
            {loot: 'Rotom (Fan)'},
            {loot: 'Rotom (Frost)'},
            {loot: 'Rotom (Mow)'},
            {loot: 'Spell_Tag'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Lost Hotel'))}],
    },
    8375300,
    [
        new DungeonTrainer('Punk Couple',
            [
                new GymPokemon('Garbodor', 42664500, 42),
                new GymPokemon('Pangoro', 42765500, 42),
            ], { weight: 2 }, 'Zoya & Asa'),
        new DungeonBossPokemon('Rotom', 82376500, 38),
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
            [new GymPokemon('Vibrava', 8537490, 44)],
            { weight: 1 }, 'Ross'),
        new DungeonTrainer('Sky Trainer',
            [
                new GymPokemon('Carnivine', 8537490, 41),
                new GymPokemon('Swanna', 8537490, 44),
            ], { weight: 1 }, 'Celso', '(male)'),
        new DungeonTrainer('Sky Trainer',
            [new GymPokemon('Cryogonal', 8537490, 45)],
            { weight: 1 }, 'Era', '(female)'),
        new DungeonTrainer('Artist',
            [new GymPokemon('Smeargle', 8537490, 44)],
            { weight: 1 }, 'Salvador', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [new GymPokemon('Doublade', 8537490, 46)],
            { weight: 1 }, 'Cordelia', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Raichu', 8537490, 42),
                new GymPokemon('Golduck', 8537490, 42),
                new GymPokemon('Marowak', 8537490, 43),
            ],
            { weight: 1 }, 'Neil', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Graveler', 8537490, 40),
                new GymPokemon('Graveler', 8537490, 41),
                new GymPokemon('Carbink', 8537490, 42),
            ], { weight: 1 }, 'Alain'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Relicanth', 8537490, 42),
                new GymPokemon('Rhydon', 8537490, 42),
            ],
            { weight: 1 }, 'Delmon'),
        new DungeonTrainer('Brains & Brawn',
            [
                new GymPokemon('Grumpig', 8537490, 44),
                new GymPokemon('Hariyama', 8537490, 46),
            ],
            { weight: 1 }, 'Eoin & Wolf'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Scrafty', 8537490, 43),
                new GymPokemon('Throh', 8537490, 44),
            ],
            { weight: 1 }, 'Alonzo'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Sawk', 8537490, 43),
                new GymPokemon('Mienshao', 8537490, 44),
            ],
            { weight: 1 }, 'Kinsey'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Gurdurr', 8537490, 46)], { weight: 1 }, 'Kenji'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Probopass', 8537490, 44)],
            { weight: 1 }, 'Brent'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Medicham', 8537490, 46)],
            { weight: 1 }, 'Gabrielle'),
        new DungeonTrainer('Team Flare Grunt',
            [
                new GymPokemon('Golbat', 8537490, 42),
                new GymPokemon('Manectric', 8537490, 42),
            ],
            { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
            {loot: 'Oran'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Icicle Plate'},
            {loot: 'Meadow Plate'},
            {loot: 'Insect Plate'},
            {loot: 'Iron Plate'},
            {loot: 'Duskball'},
        ],
        legendary: [
            {loot: 'MediumRestore', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Never_Melt_Ice'},
            {loot: 'Abomasite', ignoreDebuff: true},
        ],
        mythic: [{loot: 'Heart Scale'}],
    },
    8537490,
    [
        new DungeonTrainer('Team Flare Mable',
            [new GymPokemon('Houndoom', 87365830, 48)],
            { weight: 1 }),
        new DungeonBossPokemon('Abomasnow', 85376500, 50),
    ],
    665500, 15);

dungeonList['Team Flare Secret HQ'] = new Dungeon('Team Flare Secret HQ',
    [
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Toxicroak', 8739480, 50)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Liepard', 8739480, 48)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Manectric', 8739480, 50)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Mightyena', 8739480, 48)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Houndoom', 8739480, 50)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Grunt',
            [new GymPokemon('Scrafty', 8739480, 48)],
            { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Liepard', 8739480, 47),
                new GymPokemon('Manectric', 8739480, 48),
            ], { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [
                new GymPokemon('Mightyena', 8739480, 47),
                new GymPokemon('Houndoom', 8739480, 48),
            ], { weight: 2 }, undefined, '(male)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Swalot', 8739480, 50)],
            { weight: 2 }, undefined, '(female)'),
        new DungeonTrainer('Team Flare Admin',
            [new GymPokemon('Golbat', 8739480, 50)],
            { weight: 2 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [
            {loot: 'Pixie Plate'},
            {loot: 'Dread Plate'},
            {loot: 'Sky Plate'},
        ],
        legendary: [{loot: 'Black_Glasses'}],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Team Flare Secret HQ'))}],
    },
    8739480,
    [
        new DungeonTrainer('Team Flare Lysandre',
            [
                new GymPokemon('Mienshao', 22464940, 49),
                new GymPokemon('Honchkrow', 22564950, 49),
                new GymPokemon('Pyroar', 23375580, 51),
                new GymPokemon('Mega Gyarados', 27385730, 53),
            ],
            { weight: 2 }),
        new DungeonBossPokemon('Xerneas', 93659460, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Flare Secret HQ'))}),
        new DungeonBossPokemon('Yveltal', 93659450, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Flare Secret HQ'))}),
    ],
    675000, 16);

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
                new GymPokemon('Graveler', 8924330, 46),
                new GymPokemon('Graveler', 8924330, 47),
                new GymPokemon('Golem', 8924330, 48),
            ],
            { weight: 1 }, 'Narek', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Steelix', 8924330, 48),
                new GymPokemon('Boldore', 8924330, 48),
            ], { weight: 1 }, 'Bergin'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Rhydon', 8924330, 50)],
            { weight: 1 }, 'Aaron'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Octillery', 8924330, 50)],
            { weight: 1 }, 'Dimitri', '(male)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Probopass', 8924330, 50)],
            { weight: 1 }, 'Yusif', '(male)'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Throh', 8924330, 49),
                new GymPokemon('Conkeldurr', 8924330, 50),
            ], { weight: 1 }, 'Andrea'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Toxicroak', 8924330, 49),
                new GymPokemon('Sawk', 8924330, 50),
            ], { weight: 1 }, 'Gunnar'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Medicham', 8924330, 48),
                new GymPokemon('Hawlucha', 8924330, 51),
            ], { weight: 1 }, 'Hailey'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Hariyama', 8924330, 52)],
            { weight: 1 }, 'Ricardo'),
    ],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Pokeball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [
            {loot: 'Iron Plate'},
            {loot: 'Earth Plate'},
            {loot: 'Draco Plate'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
            {loot: 'Duskball'},
            {loot: 'Heat Rock'},
            {loot: 'LargeRestore'},
        ],
    },
    8924330,
    [
        new DungeonTrainer('Pokémon Rangers',
            [
                new GymPokemon('Nidoqueen', 46659450, 51),
                new GymPokemon('Nidoking', 46654990, 51),
            ], { weight: 3 }, 'Fern & Lee'),
        new DungeonBossPokemon('Zygarde', 92485360, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_KalosChampion)}),
    ],
    700000, 18);

dungeonList['Pokémon Village'] = new Dungeon('Pokémon Village',
    ['Jigglypuff', 'Poliwhirl', 'Noctowl', 'Lombre', 'Gothorita', 'Amoonguss'],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Rawst'},
            {loot: 'Chesto'},
            {loot: 'Aguav'},
            {loot: 'Wiki'},
            {loot: 'Garbodor'},
            {loot: 'Banette'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [
            {loot: 'Pixie Plate'},
            {loot: 'Repeatball'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Pink_Bow'},
        ],
    },
    9003000,
    [
        new DungeonBossPokemon('Ditto', 94836530, 50),
        new DungeonBossPokemon('Zoroark', 95743340, 50),
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
                new GymPokemon('Carbink', 3500000, 56),
                new GymPokemon('Raichu', 3500000, 56),
                new GymPokemon('Kingdra', 3500000, 57),
            ],
            { weight: 1 }, 'Robbie', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [new GymPokemon('Weavile', 3500000, 60)], { weight: 1 }, 'Alanza', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Steelix', 3500000, 56),
                new GymPokemon('Electrode', 3500000, 56),
                new GymPokemon('Kangaskhan', 3500000, 57),
            ],
            { weight: 1 }, 'Bence', '(male)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Machamp', 3500000, 60)],
            { weight: 1 }, 'Markus'),
        new DungeonTrainer('Battle Girl',
            [
                new GymPokemon('Hawlucha', 3500000, 57),
                new GymPokemon('Mienshao', 3500000, 58),
            ],
            { weight: 1 }, 'Veronique'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Haxorus', 3500000, 58)], { weight: 1 }, 'Farid', '(male)'),
        new DungeonTrainer('Battle Girl',
            [new GymPokemon('Medicham', 3500000, 60)], { weight: 1 }, 'Sigrid'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Pangoro', 3500000, 57),
                new GymPokemon('Heracross', 3500000, 58),
            ], { weight: 1 }, 'Ander'),
        new DungeonTrainer('Psychic',
            [new GymPokemon('Espeon', 3500000, 58)],
            { weight: 1 }, 'William', '(male)'),
        new DungeonTrainer('Brains & Brawn',
            [
                new GymPokemon('Medicham', 3500000, 58),
                new GymPokemon('Gallade', 3500000, 60),
            ],
            { weight: 1 }, 'Arman & Hugo'),
        new DungeonTrainer('Fairy Tale Girl',
            [
                new GymPokemon('Azumarill', 3500000, 56),
                new GymPokemon('Florges (Red)', 3500000, 56),
            ], { weight: 1 }, 'Corinne'),
        new DungeonTrainer('Hex Maniac',
            [new GymPokemon('Gourgeist (Average)', 3500000, 58)],
            { weight: 1 }, 'Raziah'),
        new DungeonTrainer('Pokémon Ranger',
            [
                new GymPokemon('Slowbro', 3500000, 57),
                new GymPokemon('Altaria', 3500000, 57),
            ],
            { weight: 1 }, 'Petra', '(female)'),
        new DungeonTrainer('Veteran',
            [new GymPokemon('Talonflame', 3500000, 61)],
            { weight: 1 }, 'Inga', '(female)'),
        new DungeonTrainer('Pokémon Ranger',
            [new GymPokemon('Crobat', 3500000, 59)], { weight: 1 }, 'Ralf', '(male)'),
        new DungeonTrainer('Black Belt',
            [
                new GymPokemon('Banette', 3500000, 57),
                new GymPokemon('Leafeon', 3500000, 59),
            ], { weight: 1 }, 'Gerard'),
        new DungeonTrainer('Artist',
            [new GymPokemon('Smeargle', 3500000, 58)], { weight: 1 }, 'Vincent', '(male)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Torkoal', 3500000, 56),
                new GymPokemon('Golem', 3500000, 56),
            ],
            { weight: 1 }, 'Corwin'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Pink Shard'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
            {loot: 'Ultraball'},
            {loot: 'Smooth Rock'},
            {loot: 'Revive'},
            {loot: 'Duskball'},
            {loot: 'Hard Stone'},
            {loot: 'Damp Rock'},
            {loot: 'LargeRestore'},
            {loot: 'Garchompite', ignoreDebuff: true},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Heart Scale'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Victory Road Kalos'))},
        ],
    },
    9003000,
    [
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Magcargo', 48593850, 57),
                new GymPokemon('Scizor', 49355840, 58),
            ],
            { weight: 1 }, 'Michele', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Trevenant', 48329640, 57),
                new GymPokemon('Gigalith', 49355820, 59),
            ], { weight: 1 }, 'Timeo', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Glaceon', 48395740, 57),
                new GymPokemon('Snorlax', 49265840, 59),
            ], { weight: 1 }, 'Catrina', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Skarmory', 32395730, 55),
                new GymPokemon('Umbreon', 33254840, 55),
                new GymPokemon('Alakazam', 35385940, 57),
            ], { weight: 1 }, 'Gilles', '(male)'),
    ],
    750500, 21);

//Unknown Dungeon? Contains Mewtwo.

// Alola

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
            [new GymPokemon('Bonsly', 11407338, 7)], { weight: 1 }, 'Hiromi', '(female)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Metapod', 11407338, 7)], { weight: 1 }, 'Mia', '(female)'),
        new DungeonTrainer('Youngster',
            [new GymPokemon('Alolan Grimer', 11407338, 7)], { weight: 1 }, 'Joey'),
        new DungeonTrainer('Rising Star',
            [new GymPokemon('Ekans', 11407338, 8)], { weight: 1 }, 'Joseph', '(male)'),
    ],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Pokeball'},
            {loot: 'Oran'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Greatball'},
        ],
        legendary: [{loot: 'SmallRestore'}],
    },
    11407338,
    [
        new DungeonTrainer('Teacher',
            [
                new GymPokemon('Litten', 19012230, 10),
                new GymPokemon('Popplio', 19012230, 10),
                new GymPokemon('Rowlet', 19012230, 10),
            ], { weight: 1 }, 'Emily'),
    ],
    757500, 18);

dungeonList['Hau\'oli Cemetery'] = new Dungeon('Hau\'oli Cemetery',
    [
        {pokemon: 'Zubat', options: { weight: 4 }},
        {pokemon: 'Gastly', options: { weight: 4 }},
        {pokemon: 'Misdreavus', options: { weight: 4 }},
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Pikachu', 11587450, 9)], { weight: 1 }, 'Ikue', '(female)'),
        new DungeonTrainer('Office Worker',
            [new GymPokemon('Pikipek', 11587450, 9)], { weight: 1 }, 'Jeremy', '(male)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Happiny', 11587450, 8)], { weight: 1 }, 'Malia', '(female)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [{loot: 'Spooky Plate'}],
        legendary: [{loot: 'MediumRestore'}],
    },
    11587450,
    [
        new DungeonBossPokemon('Drifloon', 28968625, 9),
        new DungeonBossPokemon('Litwick', 28968625, 9),
    ],
    800000, 2);

dungeonList['Verdant Cavern'] = new Dungeon('Verdant Cavern',
    [
        {pokemon: 'Alolan Rattata', options: { weight: 0.75 }},
        {pokemon: 'Zubat', options: { weight: 0.75 }},
        {pokemon: 'Alolan Diglett', options: { weight: 0.75 }},
        {pokemon: 'Noibat', options: { weight: 0.75 }},
        {pokemon: 'Yungoos', options: { weight: 0.75 }},
        {pokemon: 'Pheromosa', options: { weight: 0.75, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 5)}},
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Drowzee', 11595673, 11)], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Greatball'},
            {loot: 'Meadow Plate'},
        ],
        legendary: [
            {loot: 'MediumRestore'},
            {loot: 'Revive'},
        ],
    },
    11595673,
    [
        new DungeonBossPokemon('Alolan Raticate', 57978365, 12),
        new DungeonBossPokemon('Gumshoos', 57978365, 12),
        new DungeonBossPokemon('Totem Raticate', 82543791, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Gumshoos', 82543791, 70, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    805000, 2,
    () => DungeonGainGymBadge(GymList['Ilima\'s Trial'], BadgeEnums.NormaliumZ));

dungeonList['Melemele Meadow'] = new Dungeon('Melemele Meadow',
    [
        {pokemon: 'Caterpie', options: { weight: 0.55 }},
        {pokemon: 'Metapod', options: { weight: 0.55 }},
        {pokemon: 'Butterfree', options: { weight: 0.55 }},
        {pokemon: 'Cottonee', options: { weight: 0.55 }},
        {pokemon: 'Petilil', options: { weight: 0.55 }},
        {pokemon: 'Cutiefly', options: { weight: 0.55 }},
        {pokemon: 'Buzzwole', options: { weight: 0.55, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 5)}},
        new DungeonTrainer('Actor',
            [new GymPokemon('Oricorio (Pom-Pom)', 11769270, 12)], { weight: 1 }, 'Meredith'),
    ],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Greatball'},
            {loot: 'Meadow Plate'},
        ],
    },
    11769270,
    [
        new DungeonBossPokemon('Flabébé (Red)', 58846350, 12),
        new DungeonBossPokemon('Oricorio (Pom-Pom)', 58846350, 12),
    ],
    825000, 3);

dungeonList['Seaward Cave'] = new Dungeon('Seaward Cave',
    ['Zubat', 'Psyduck', 'Seel', 'Magikarp', 'Smoochum'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Lureball'},
            {loot: 'Diveball'},
        ],
        legendary: [
            {loot: 'MediumRestore'},
            {loot: 'Star Piece'},
            {loot: 'Never_Melt_Ice'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    11845338,
    [
        new DungeonBossPokemon('Delibird', 59226690, 12),
        new DungeonBossPokemon('Barboach', 59226690, 17),
    ],
    830000, 3);

dungeonList['Ten Carat Hill'] = new Dungeon('Ten Carat Hill',
    ['Zubat', 'Machop', 'Psyduck', 'Mawile', 'Roggenrola'],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Greatball'},
            {loot: 'MediumRestore'},
        ],
        legendary: [
            {loot: 'Hard Stone'},
            {loot: 'Ultraball'},
            {loot: 'Star Piece'},
            {loot: 'Sharp_Beak'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Ten Carat Hill'))}],
    },
    11897821,
    [
        new DungeonBossPokemon('Spinda', 59489105, 14),
        new DungeonBossPokemon('Carbink', 59489105, 14),
        new DungeonBossPokemon('Rockruff', 59489105, 14),
    ],
    835000, 3);


dungeonList['Pikachu Valley'] = new Dungeon('Pikachu Valley',
    ['Pikachu', 'Pichu', 'Plusle', 'Minun', 'Pachirisu', 'Emolga', 'Dedenne'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Cheri'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Zap Plate'}],
        legendary: [{loot: 'Magnet'}],
    },
    11952804,
    [
        new DungeonBossPokemon('Pikachu (Original Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Hoenn Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Sinnoh Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Unova Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Kalos Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Alola Cap)', 59764020, 15, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Pikachu (World Cap)', 59764020, 15, {hide: true, requirement: new GymBadgeRequirement(BadgeEnums.Elite_GalarChampion)}),
    ],
    850000, 4);

dungeonList['Paniola Ranch'] = new Dungeon('Paniola Ranch',
    [
        {pokemon: 'Mareep', options: { weight: 6.66 }},
        {pokemon: 'Lillipup', options: { weight: 6.66 }},
        {pokemon: 'Mudbray', options: { weight: 6.66 }},
        new DungeonTrainer('Madame',
            [new GymPokemon('Carbink', 12161328, 15)], { weight: 1 }, 'Elizabeth'),
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Tauros', 12161328, 15)], { weight: 1 }, 'Wesley', '(male)'),
        new DungeonTrainer('Pokémon Breeder',
            [new GymPokemon('Mudbray', 12161328, 15)], { weight: 1 }, 'Glenn', '(male)'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Sableye', 12161328, 15)], { weight: 1 }, 'Gerald'),
        new DungeonTrainer('Rising Star',
            [
                new GymPokemon('Lillipup', 12161328, 15),
                new GymPokemon('Magnemite', 12161328, 16),
            ], { weight: 1 }, 'Micah', '(male)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [{loot: 'Splash Plate'}],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Oval Stone'},
        ],
    },
    12111328,
    [
        new DungeonBossPokemon('Tauros', 30278320, 15),
        new DungeonBossPokemon('Miltank', 30278320, 15),
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
                new GymPokemon('Barboach', 12138060, 16),
                new GymPokemon('Goldeen', 12138060, 16),
            ], { weight: 1 }, 'Ernest'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Fletchling', 12138060, 16)], { weight: 1 }, 'Mikiko', '(female)'),
        new DungeonTrainer('Fisherman',
            [new GymPokemon('Poliwag', 12138060, 16)], { weight: 1 }, 'Herbert'),
        new DungeonTrainer('Fisherman',
            [
                new GymPokemon('Magikarp', 12138060, 16),
                new GymPokemon('Magikarp', 12138060, 16),
                new GymPokemon('Magikarp', 12138060, 16),
            ], { weight: 1 }, 'Carl'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_incense'},
        ],
        rare: [{loot: 'Blue Shard'}],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Diveball'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Revive'},
            {loot: 'Mystic_Water'},
        ],
        mythic: [{loot: 'Heart Scale'}],
    },
    12138060,
    [
        new DungeonBossPokemon('Wishiwashi (School)', 60690300, 20),
        new DungeonBossPokemon('Araquanid', 60690300, 20),
        new DungeonBossPokemon('Totem Wishiwashi', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Araquanid', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    875000, 5,
    () => DungeonGainGymBadge(GymList['Lana\'s Trial'], BadgeEnums.WateriumZ));

dungeonList['Wela Volcano Park'] = new Dungeon('Wela Volcano Park',
    [
        {pokemon: 'Cubone', options: { weight: 1.7 }},
        {pokemon: 'Kangaskhan', options: { weight: 1.7 }},
        {pokemon: 'Magmar', options: { weight: 1.7 }},
        {pokemon: 'Magby', options: { weight: 1.7 }},
        {pokemon: 'Fletchling', options: { weight: 1.7 }},
        {pokemon: 'Salandit', options: { weight: 1.7 }},
        {pokemon: 'Nihilego', options: { weight: 1.7, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 3)}},
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Meowth', 12896392, 19)], { weight: 1 }, 'Mariah', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Noibat', 12896392, 20),
                new GymPokemon('Kadabra', 12896392, 21),
            ], { weight: 1 }, 'Jim', '(male)'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Roggenrola', 12896392, 19)], { weight: 1 }, 'Calhoun'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Rawst'},
        ],
        rare: [{loot: 'Red Shard'}],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Quickball'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Charcoal'},
        ],
    },
    12896392,
    [
        new DungeonBossPokemon('Alolan Marowak', 64481960, 22),
        new DungeonBossPokemon('Salazzle', 64481960, 22),
        new DungeonBossPokemon('Totem Marowak', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Salazzle', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    900000, 7,
    () => DungeonGainGymBadge(GymList['Kiawe\'s Trial'], BadgeEnums.FiriumZ));

dungeonList['Lush Jungle'] = new Dungeon('Lush Jungle',
    [
        {pokemon: 'Metapod', options: { weight: 1 }},
        {pokemon: 'Paras', options: { weight: 1 }},
        {pokemon: 'Pinsir', options: { weight: 1 }},
        {pokemon: 'Hoothoot', options: { weight: 1 }},
        {pokemon: 'Bonsly', options: { weight: 1 }},
        {pokemon: 'Trumbeak', options: { weight: 1 }},
        {pokemon: 'Fomantis', options: { weight: 1 }},
        {pokemon: 'Bounsweet', options: { weight: 1 }},
        {pokemon: 'Steenee', options: { weight: 1 }},
        {pokemon: 'Comfey', options: { weight: 1 }},
        {pokemon: 'Oranguru', options: { weight: 1 }},
        {pokemon: 'Passimian', options: { weight: 1 }},
        {pokemon: 'Xurkitree', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 9)}},
    ],    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack'},
            {loot: 'Mago'},
        ],
        rare: [{loot: 'Green Shard'}],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Nestball'},
        ],
        legendary: [
            {loot: 'MediumRestore', weight: 2},
            {loot: 'LargeRestore'},
            {loot: 'Miracle_Seed'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    13090332,
    [
        new DungeonBossPokemon('Lurantis', 65451660, 24),
        new DungeonBossPokemon('Totem Lurantis', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    925000, 8,
    () => DungeonGainGymBadge(GymList['Mallow\'s Trial'], BadgeEnums.GrassiumZ));

dungeonList['Diglett\'s Tunnel'] = new Dungeon('Diglett\'s Tunnel',
    [
        {pokemon: 'Zubat', options: { weight: 6.5 }},
        {pokemon: 'Alolan Diglett', options: { weight: 6.5 }},
        {pokemon: 'Nihilego', options: { weight: 6.5, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 3)}},
        new DungeonTrainer('Worker',
            [new GymPokemon('Shieldon', 13215839, 22)], { weight: 1 }, 'Frank', '(male)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Alolan Diglett', 13215839, 22),
                new GymPokemon('Alolan Diglett', 13215839, 22),
            ], { weight: 1 }, 'Jeff', '(male)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Archen', 13215839, 22)], { weight: 1 }, 'Vaclav', '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Ekans', 13215839, 23)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Salandit', 13215839, 23)], { weight: 1 }, undefined, '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Earth Plate'},
            {loot: 'Duskball'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Soft_Sand'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    13215839,
    [new DungeonBossPokemon('Larvitar', 66079195, 23)],
    930000, 8);

dungeonList['Memorial Hill'] = new Dungeon('Memorial Hill',
    [
        {pokemon: 'Zubat', options: { weight: 7.5 }},
        {pokemon: 'Gastly', options: { weight: 7.5 }},
        {pokemon: 'Phantump', options: { weight: 7.5 }},
        {pokemon: 'Xurkitree', options: { weight: 7.5, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 9)}},
        new DungeonTrainer('Preschooler',
            [
                new GymPokemon('Magby', 13286024, 23),
                new GymPokemon('Ledian', 13286024, 23),
            ], { weight: 1 }, 'Liam', '(male)'),
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Jolteon', 13286024, 24)], { weight: 1 }, 'Smith'),
        new DungeonTrainer('Madame',
            [
                new GymPokemon('Furfrou', 13286024, 24),
                new GymPokemon('Comfey', 13286024, 24),
            ], { weight: 1 }, 'Sayuri'),
        new DungeonTrainer('Punk Girl',
            [new GymPokemon('Ariados', 13286024, 24)], { weight: 1 }, 'Melissa'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Spooky Plate'},
            {loot: 'Duskball'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Spell_Tag'},
        ],
    },
    13286024,
    [
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Alolan Raticate', 66430120, 24)], { weight: 1 }, undefined, '(male)'),
    ],
    950000, 9);

dungeonList['Malie Garden'] = new Dungeon('Malie Garden',
    [
        {pokemon: 'Alolan Meowth', options: { weight: 1 }},
        {pokemon: 'Psyduck', options: { weight: 1 }},
        {pokemon: 'Poliwhirl', options: { weight: 1 }},
        {pokemon: 'Goldeen', options: { weight: 1 }},
        {pokemon: 'Magikarp', options: { weight: 1 }},
        {pokemon: 'Gyarados', options: { weight: 1 }},
        {pokemon: 'Ledian', options: { weight: 1 }},
        {pokemon: 'Ariados', options: { weight: 1 }},
        {pokemon: 'Masquerain', options: { weight: 1 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 1 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 1 }},
        {pokemon: 'Cottonee', options: { weight: 1 }},
        {pokemon: 'Petilil', options: { weight: 1 }},
        {pokemon: 'Araquanid', options: { weight: 1 }},
        {pokemon: 'Kartana', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 11)}},
        {pokemon: 'Celesteela', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 11)}},
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Raticate', 13483476, 28)], { weight: 1 }, 'Mitch', '(male)'),
        new DungeonTrainer('Preschooler',
            [new GymPokemon('Cleffa', 13483476, 27)], { weight: 1 }, 'Nancy', '(female)'),
        new DungeonTrainer('Sightseer',
            [new GymPokemon('Raichu', 13483476, 28)], { weight: 1 }, 'Akali', '(female)'),
        new DungeonTrainer('Tourist Couple',
            [
                new GymPokemon('Alolan Vulpix', 13483476, 28),
                new GymPokemon('Vulpix', 13483476, 28),
            ], { weight: 1 }, 'Landon and Yukiro'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [
            {loot: 'Spooky Plate'},
            {loot: 'Luxuryball'},
        ],
        legendary: [{loot: 'Rare Bone'}],
    },
    13483476,
    [
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Golisopod', 33708690, 34),
                new GymPokemon('Masquerain', 33708690, 34),
            ],
            { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    975000, 21);

dungeonList['Hokulani Observatory'] = new Dungeon('Hokulani Observatory',
    ['Grubbin', 'Charjabug', 'Elekid', 'Electabuzz', 'Skarmory', 'Dedenne'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Token_collector'},
        ],
        rare: [{loot: 'Yellow Shard'}],
        epic: [
            {loot: 'Zap Plate'},
            {loot: 'Iron Plate'},
        ],
        legendary: [{loot: 'Quickball'}],
    },
    13883676,
    [
        new DungeonBossPokemon('Vikavolt', 69418380, 29),
        new DungeonBossPokemon('Togedemaru', 69418380, 33),
        new DungeonBossPokemon('Totem Vikavolt', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
        new DungeonBossPokemon('Totem Togedemaru', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    1000000, 22,
    () => DungeonGainGymBadge(GymList['Sophocles\' Trial'], BadgeEnums.ElectriumZ));

dungeonList['Thrifty Megamart'] = new Dungeon('Thrifty Megamart',
    ['Golbat', 'Gastly', 'Haunter', 'Gengar', 'Shuppet', 'Banette', 'Jellicent', 'Klefki'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [{loot: 'Spooky Plate'}],
        mythic: [{loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Thrifty Megamart'))}],
    },
    14705422,
    [
        new DungeonBossPokemon('Mimikyu', 73527110, 35),
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
                new GymPokemon('Torkoal', 15127052, 36),
                new GymPokemon('Whimsicott', 15127052, 36),
            ], { weight: 1 }, 'Michelle', '(female)'),
        new DungeonTrainer('Lass',
            [
                new GymPokemon('Sneasel', 15127052, 35),
                new GymPokemon('Komala', 15127052, 35),
            ], { weight: 1 }, 'Rylee'),
        new DungeonTrainer('Golfer',
            [
                new GymPokemon('Hariyama', 15127052, 39),
                new GymPokemon('Alakazam', 15127052, 39),
            ], { weight: 1 }, 'Dean', '(male)'),
        new DungeonTrainer('Actor',
            [new GymPokemon('Oricorio (Baile)', 15127052, 36)], { weight: 1 }, 'Meredith'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Flame Plate'}],
        legendary: [{loot: 'Repeatball'}],
    },
    15127052,
    [
        new DungeonBossPokemon('Floette (Red)', 75635260, 36),
        new DungeonBossPokemon('Oricorio (Baile)', 75635260, 36),
    ],
    1050000, 16);

dungeonList['Po Town'] = new Dungeon('Po Town',
    [
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Spinarak', 15340576, 36)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Trubbish', 15340576, 36)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Drowzee', 15340576, 37)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Alolan Raticate', 15340576, 37),
                new GymPokemon('Golbat', 15340576, 37),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Ekans', 15340576, 37),
                new GymPokemon('Salandit', 15340576, 37),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Fomantis', 15340576, 37),
                new GymPokemon('Mareanie', 15340576, 37),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Scraggy', 15340576, 40)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Office Worker',
            [
                new GymPokemon('Elgyem', 15340576, 40),
                new GymPokemon('Metang', 15340576, 40),
            ], { weight: 1 }, 'Royce', '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Drowzee', 15340576, 38)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Salandit', 15340576, 38),
                new GymPokemon('Fomantis', 15340576, 38),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Trubbish', 15340576, 38),
                new GymPokemon('Houndour', 15340576, 38),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Scraggy', 15340576, 38)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Alolan Rattata', 15340576, 38)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Alolan Raticate', 15340576, 38)], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Haunter', 15340576, 38),
                new GymPokemon('Alolan Grimer', 15340576, 38),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [
                new GymPokemon('Spinarak', 15340576, 38),
                new GymPokemon('Pawniard', 15340576, 38),
                new GymPokemon('Golbat', 15340576, 38),
            ], { weight: 1 }, undefined, '(female)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Insect Plate'},
            {loot: 'Toxic Plate'},
            {loot: 'Dread Plate'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Max Revive'},
            {loot: 'Poison_Barb'},
        ],
    },
    15340576,
    [
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Golisopod', 25567627, 41),
                new GymPokemon('Masquerain', 25567627, 41),
                new GymPokemon('Pinsir', 25567627, 41),
            ], { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    1075000, 17);

dungeonList['Aether Foundation'] = new Dungeon('Aether Foundation',
    [
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Alolan Dugtrio', 15619682, 40),
                new GymPokemon('Toucannon', 15619682, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Kecleon', 15619682, 40),
                new GymPokemon('Stoutland', 15619682, 40),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Arbok', 15619682, 40),
                new GymPokemon('Lurantis', 15619682, 40),
            ], { weight: 1 }, undefined, '(female)'),
        new DungeonTrainer('Aether Foundation Employee',
            [
                new GymPokemon('Parasect', 15619682, 40),
                new GymPokemon('Drifblim', 15619682, 40),
                new GymPokemon('Sudowoodo', 15619682, 40),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Primeape', 15619682, 40)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Arcanine', 15619682, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Anorith', 15619682, 41),
                new GymPokemon('Lileep', 15619682, 41),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Magmar', 15619682, 42),
                new GymPokemon('Houndoom', 15619682, 42),
                new GymPokemon('Electabuzz', 15619682, 42),
                new GymPokemon('Manectric', 15619682, 42),
            ], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Aether Branch Chief',
            [
                new GymPokemon('Claydol', 15619682, 44),
                new GymPokemon('Bruxish', 15619682, 44),
                new GymPokemon('Hypno', 15619682, 44),
            ], { weight: 1 }, 'Faba', '(faba)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Alolan Muk', 15619682, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Magneton', 15619682, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employee',
            [new GymPokemon('Porygon2', 15619682, 41)], { weight: 1 }, undefined, '(masked)'),
        new DungeonTrainer('Aether Foundation Employees',
            [
                new GymPokemon('Huntail', 15619682, 41),
                new GymPokemon('Gorebyss', 15619682, 41),
            ], { weight: 1 }, undefined, '(both)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Golbat', 15619682, 42)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Alolan Raticate', 15619682, 42)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Golisopod', 15619682, 45),
                new GymPokemon('Vikavolt', 15619682, 45),
                new GymPokemon('Masquerain', 15619682, 45),
                new GymPokemon('Pinsir', 15619682, 45),
            ], { weight: 1 }, 'Guzma', '(guzma)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Chesto'},
        ],
        rare: [{loot: 'Cyan Shard'}],
        epic: [
            {loot: 'Revive'},
            {loot: 'Iron Ball'},
            {loot: 'Mind Plate'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Max Revive'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Aether Foundation'))},
        ],
    },
    15619682,
    [
        new DungeonTrainer('Aether President',
            [
                new GymPokemon('Clefable', 15619682, 47),
                new GymPokemon('Lilligant', 15619682, 47),
                new GymPokemon('Lopunny', 15619682, 47),
                new GymPokemon('Milotic', 15619682, 47),
                new GymPokemon('Bewear', 15619682, 47),
            ], { weight: 1 }, 'Lusamine', '(lusamine)'),
    ],
    1080000, 17);

dungeonList['Exeggutor Island Hill'] = new Dungeon('Exeggutor Island Hill',
    ['Exeggcute', 'Pelipper', 'Gastrodon (East)'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Earth Plate'},
            {loot: 'Draco Plate'},
            {loot: 'Meadow Plate'},
        ],
        legendary: [{loot: 'Revive'}],
        mythic: [{loot: 'Heart Scale'}],
    },
    15773066,
    [
        new DungeonBossPokemon('Pinsir', 78865330, 45),
        new DungeonBossPokemon('Tropius', 78865330, 45),
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
                new GymPokemon('Beheeyem', 15992044, 47),
                new GymPokemon('Banette', 15992044, 47),
            ], { weight: 1 }, 'Harry', '(male)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Spinda', 15992044, 45)], { weight: 1 }, 'Perdy', '(female)'),
        new DungeonTrainer('Ace Duo',
            [
                new GymPokemon('Alolan Sandslash', 15992044, 47),
                new GymPokemon('Alolan Ninetales', 15992044, 47),
            ], { weight: 1 }, 'Kent and Aimee'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Kabutops', 15992044, 46),
                new GymPokemon('Tyrantrum', 15992044, 46),
            ], { weight: 1 }, 'Zachary'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Xatu', 15992044, 48),
                new GymPokemon('Kangaskhan', 15992044, 48),
                new GymPokemon('Dewgong', 15992044, 48),
            ], { weight: 1 }, 'Lynn', '(female)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Mawile', 15992044, 47),
                new GymPokemon('Weavile', 15992044, 47),
            ], { weight: 1 }, 'Junko', '(female)'),
        new DungeonTrainer('Scientist',
            [new GymPokemon('Magnezone', 15992044, 46)], { weight: 1 }, 'Ikaika', '(male)'),
        new DungeonTrainer('Punk Girl',
            [new GymPokemon('Scrafty', 15992044, 46)], { weight: 1 }, 'Anna'),
        new DungeonTrainer('Punk Guy',
            [
                new GymPokemon('Pangoro', 15992044, 46),
                new GymPokemon('Crawdaunt', 15992044, 46),
            ], { weight: 1 }, 'Adam'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Poliwrath', 15992044, 47)], { weight: 1 }, 'Curtis'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Pawniard', 15992044, 46)], { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Alolan Graveler', 15992044, 47),
                new GymPokemon('Lapras', 15992044, 48),
            ], { weight: 1 }, 'Hiroshi', '(male)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Talonflame', 15992044, 48),
                new GymPokemon('Wailord', 15992044, 48),
                new GymPokemon('Glaceon', 15992044, 48),
            ], { weight: 1 }, 'Heather', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Noctowl', 15992044, 48),
                new GymPokemon('Flygon', 15992044, 48),
                new GymPokemon('Slowking', 15992044, 48),
                new GymPokemon('Gengar', 15992044, 48),
            ], { weight: 1 }, 'Eric', '(male)'),
        new DungeonTrainer('Black Belt',
            [new GymPokemon('Crabominable', 15992044, 47)], { weight: 1 }, 'Terry'),
        new DungeonTrainer('Surfer',
            [new GymPokemon('Golduck', 15992044, 47)], { weight: 1 }, 'Joshah'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Draco Plate'},
            {loot: 'Pixie Plate'},
            {loot: 'Duskball'},
            {loot: 'Repeatball'},
        ],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'Max Revive'},
        ],
        mythic: [
            {loot: 'Heart Scale'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Vast Poni Canyon'))},
        ],
    },

    15992044,
    [
        new DungeonBossPokemon('Kommo-o', 79960220, 49),
        new DungeonBossPokemon('Totem Kommo-o', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
    1125000, 25,
    () => DungeonGainGymBadge(GymList['Vast Poni Canyon Trial'], BadgeEnums.DragoniumZ));

dungeonList['Mina\'s Houseboat'] = new Dungeon('Mina\'s Houseboat',
    ['Chansey', 'Wingull', 'Pelipper', 'Spritzee', 'Swirlix', 'Cutiefly', 'Comfey', 'Dhelmise'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Pixie Plate'}],
        legendary: [{loot: 'Pink_Bow'}],
        mythic: [{loot: 'Heart Scale'}],
    },
    16217412,
    [
        new DungeonBossPokemon('Ribombee', 81087060, 55),
        new DungeonBossPokemon('Totem Ribombee', 82543791, 60, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_AlolaChampion)}),
    ],
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
                new GymPokemon('Scyther', 16212850, 51),
                new GymPokemon('Malamar', 16212850, 52),
            ], { weight: 1 }, 'Seth', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Shiinotic', 16212850, 51),
                new GymPokemon('Clefable', 16212850, 52),
            ], { weight: 1 }, 'Kailee', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Lickitung', 16212850, 52),
                new GymPokemon('Goodra', 16212850, 52),
            ], { weight: 1 }, 'Alonsa', '(female)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Relicanth', 16212850, 50)], { weight: 1 }, 'Ovid', '(male)'),
        new DungeonTrainer('Sparring Partners',
            [
                new GymPokemon('Bewear', 16212850, 51),
                new GymPokemon('Mienfoo', 16212850, 51),
                new GymPokemon('Machamp', 16212850, 51),
            ], { weight: 1 }, 'Alon and Eimar'),
        new DungeonTrainer('Sparring Partners',
            [
                new GymPokemon('Hawlucha', 16212850, 51),
                new GymPokemon('Crabominable', 16212850, 51),
                new GymPokemon('Pangoro', 16212850, 51),
            ], { weight: 1 }, 'Craig and Jason'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Emolga', 16212850, 51)], { weight: 1 }, 'Peren', '(female)'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Pyroar', 16212850, 53),
                new GymPokemon('Claydol', 16212850, 53),
                new GymPokemon('Milotic', 16212850, 53),
            ], { weight: 1 }, 'Ella', '(female)'),
        new DungeonTrainer('Collector',
            [new GymPokemon('Florges (White)', 16212850, 51)], { weight: 1 }, 'Minty'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Vanilluxe', 16212850, 52),
                new GymPokemon('Mismagius', 16212850, 53),
            ], { weight: 1 }, 'Jada', '(female)'),
        new DungeonTrainer('Master & Apprentice',
            [
                new GymPokemon('Vikavolt', 16212850, 52),
                new GymPokemon('Forretress', 16212850, 53),
                new GymPokemon('Glalie', 16212850, 53),
                new GymPokemon('Tyranitar', 16212850, 53),
                new GymPokemon('Bisharp', 16212850, 53),
            ], { weight: 1 }, 'Breon and Kaimana'),
        new DungeonTrainer('Hiker',
            [new GymPokemon('Gigalith', 16212850, 51)], { weight: 1 }, 'Anuhea'),
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Carbink', 16212850, 65),
                new GymPokemon('Torkoal', 16212850, 65),
                new GymPokemon('Pelipper', 16212850, 65),
                new GymPokemon('Alolan Ninetales', 16212850, 65),
                new GymPokemon('Gigalith', 16212850, 65),
            ], { weight: 1 }, 'Aristo', '(male)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [{loot: 'Icicle Plate'}],
        legendary: [{loot: 'Max Revive'}],
    },
    16312850,
    [
        new DungeonBossPokemon('Absol', 81064250, 50),
        new DungeonBossPokemon('Glalie', 81064250, 50),
        new DungeonBossPokemon('Vanilluxe', 81064250, 50),
        new DungeonBossPokemon('Necrozma', 83527125, 65),
    ],
    1175000, 26);

dungeonList['Lake of the Sunne and Moone'] = new Dungeon('Lake of the Sunne and Moone',
    ['Clefairy', 'Sunkern', 'Skitty', 'Lunatone', 'Solrock', 'Helioptile'],
    {
        common: [
            {loot: 'Lucky_incense'},
            {loot: 'Chesto'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [
            {loot: 'Mind Plate', weight: 2},
            {loot: 'Iron Plate'},
            {loot: 'Spooky Plate'},
        ],
    },
    16435490,
    [
        new DungeonBossPokemon('Cosmog', 82177450, 70),
        new DungeonBossPokemon('Lunala', 90673816, 100, {requirement: new MultiRequirement([new ObtainedPokemonRequirement('Lunala'), new ObtainedPokemonRequirement('Necrozma')])}),
        new DungeonBossPokemon('Solgaleo', 90673816, 100, {requirement: new MultiRequirement([new ObtainedPokemonRequirement('Solgaleo'), new ObtainedPokemonRequirement('Necrozma')])}),
    ],
    1200000, 27);

dungeonList['Ruins of Conflict'] = new Dungeon('Ruins of Conflict',
    ['Floette (Red)', 'Comfey', 'Dedenne', 'Ampharos', 'Electabuzz'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Cheri'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Zap Plate'},
            {loot: 'Pixie Plate'},
        ],
    },
    16435490,
    [
        new DungeonBossPokemon('Luxray', 82177450, 55),
        new DungeonBossPokemon('Granbull', 82177450, 55),
        new DungeonBossPokemon('Tapu Koko', 82543791, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Life'] = new Dungeon('Ruins of Life',
    ['Floette (Red)', 'Comfey', 'Gardevoir', 'Chimecho', 'Munna'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Cheri'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Stone Plate'},
            {loot: 'Mind Plate'},
            {loot: 'Pixie Plate'},
            {loot: 'Twisted_Spoon'},
        ],
    },
    16435490,
    [
        new DungeonBossPokemon('Wobbuffet', 82177450, 55),
        new DungeonBossPokemon('Granbull', 82177450, 55),
        new DungeonBossPokemon('Tapu Lele', 82543791, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Abundance'] = new Dungeon('Ruins of Abundance',
    ['Floette (Red)', 'Comfey', 'Cottonee', 'Gloom', 'Petilil'],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Rawst'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Insect Plate'},
            {loot: 'Fist Plate'},
        ],
    },
    16435490,
    [
        new DungeonBossPokemon('Maractus', 82177450, 55),
        new DungeonBossPokemon('Granbull', 82177450, 55),
        new DungeonBossPokemon('Tapu Bulu', 82543791, 60),
    ],
    1200000, 27);

dungeonList['Ruins of Hope'] = new Dungeon('Ruins of Hope',
    ['Floette (Red)', 'Comfey', 'Azumarill', 'Poliwhirl', 'Clamperl'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Aspear'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Pixie Plate'},
        ],
    },
    16435490,
    [
        new DungeonBossPokemon('Lumineon', 82177450, 55),
        new DungeonBossPokemon('Granbull', 82177450, 55),
        new DungeonBossPokemon('Tapu Fini', 82543791, 60),
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
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Aspear'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Pixie Plate'},
        ],
    },
    16659968,
    [
        new DungeonBossPokemon('Oricorio (Sensu)', 83299840, 70),
        new DungeonBossPokemon('Floette (Blue)', 83299840, 70),
    ],
    1225000, 28);

dungeonList['Resolution Cave'] = new Dungeon('Resolution Cave',
    [
        {pokemon: 'Zubat', options: { weight: 4 }},
        {pokemon: 'Alolan Dugtrio', options: { weight: 4 }},
        {pokemon: 'Druddigon', options: { weight: 4 }},
        new DungeonTrainer('Veteran',
            [
                new GymPokemon('Ribombee', 17114462, 61),
                new GymPokemon('Bewear', 17114462, 61),
            ], { weight: 1 }, 'Leticia', '(female)'),
        new DungeonTrainer('Backpacker',
            [new GymPokemon('Manectric', 17114462, 59)], { weight: 1 }, 'Maria', '(female)'),
        new DungeonTrainer('Hiker',
            [
                new GymPokemon('Alolan Dugtrio', 17114462, 59),
                new GymPokemon('Mudsdale', 17114462, 59),
            ], { weight: 1 }, 'Travis'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Pecha'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Dread Plate'},
            {loot: 'Draco Plate'},
        ],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'Dragon_Fang'},
        ],
    },
    17114462,
    [
        new DungeonBossPokemon('Golbat', 85572310, 59),
        new DungeonBossPokemon('Noivern', 85572310, 59),
        new DungeonBossPokemon('Guzzlord', 90673816, 70),
    ],
    1250000, 30);


//Galar Dungeons

dungeonList['Slumbering Weald Shrine'] = new Dungeon('Slumbering Weald Shrine',
    ['Galarian Stunfisk', 'Munna', 'Butterfree', 'Orbeetle', 'Whiscash', 'Barboach', 'Magikarp'],
    {
        common: [
            {loot: 'Chesto'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [
            {loot: 'Pixie Plate'},
            {loot: 'Fist Plate'},
            {loot: 'Iron Plate'},
        ],
        legendary: [{loot: 'LargeRestore'}],
    },
    27009504,
    [
        new DungeonBossPokemon('Corviknight', 135047520, 60),
        new DungeonBossPokemon('Galarian Weezing', 135047520, 60),
    ],
    2000000, 32);

dungeonList['Galar Mine'] = new Dungeon('Galar Mine',
    [
        {pokemon: 'Rolycoly', options: { weight: 2.7 }},
        {pokemon: 'Timburr', options: { weight: 2.7 }},
        {pokemon: 'Roggenrola', options: { weight: 2.7 }},
        {pokemon: 'Woobat', options: { weight: 2.7 }},
        {pokemon: 'Diglett', options: { weight: 2.7 }},
        {pokemon: 'Drilbur', options: { weight: 2.7 }},
        new DungeonTrainer('Worker',
            [new GymPokemon('Roggenrola', 20767840, 14)],
            { weight: 1 }, 'Keith', '(male)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Timburr', 20767840, 14),
                new GymPokemon('Timburr', 20767840, 14),
                new GymPokemon('Timburr', 20767840, 14),
            ],
            { weight: 1 }, 'Georgia', '(female)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Diglett', 20767840, 14),
                new GymPokemon('Drilbur', 20767840, 15),
            ],
            { weight: 1 }, 'Sandra', '(female)'),
        new DungeonTrainer('Worker',
            [new GymPokemon('Rolycoly', 20767840, 14)],
            { weight: 1 }, 'Russell', '(male)'),
    ],
    {
        common: [
            {loot: 'Greatball', weight: 5},
            {loot: 'MediumRestore', weight: 1},
            {loot: 'Carkol', weight: 0.5},
            {loot: 'Woobat', weight: 0.5},
        ],
        rare: [
            {loot: 'Crimson Shard'},
            {loot: 'Brown Shard'},
        ],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Star Piece'},
            {loot: 'Hard Stone'},
        ],
    },
    20767840,
    [new DungeonBossPokemon('Carkol', 103839200, 18)],
    1320000, 12);

dungeonList['Galar Mine No. 2'] = new Dungeon('Galar Mine No. 2',
    [
        {pokemon: 'Shellos (East)', options: { weight: 1.6 }},
        {pokemon: 'Wimpod', options: { weight: 1.6 }},
        {pokemon: 'Binacle', options: { weight: 1.6 }},
        {pokemon: 'Chewtle', options: { weight: 1.6 }},
        {pokemon: 'Scraggy', options: { weight: 1.6 }},
        {pokemon: 'Croagunk', options: { weight: 1.6 }},
        {pokemon: 'Shuckle', options: { weight: 1.6 }},
        {pokemon: 'Noibat', options: { weight: 1.6 }},
        {pokemon: 'Barboach', options: { weight: 1.6 }},
        {pokemon: 'Corphish', options: { weight: 1.6 }},
        new DungeonTrainer('Worker',
            [new GymPokemon('Carkol', 21294640, 21)],
            { weight: 1 }, 'Francis', '(male)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Roggenrola', 21294640, 20),
                new GymPokemon('Timburr', 21294640, 21),
            ],
            { weight: 1 }, 'Yvonne', '(female)'),
        new DungeonTrainer('Team Yell Grunts',
            [
                new GymPokemon('Thievul', 21294640, 21),
                new GymPokemon('Galarian Linoone', 21294640, 22),
                new GymPokemon('Liepard', 21294640, 22),
                new GymPokemon('Pancham', 21294640, 21),
            ],
            { weight: 1 }, undefined),
        new DungeonTrainer('Rail Staff',
            [
                new GymPokemon('Drilbur', 21294640, 22),
                new GymPokemon('Onix', 21294640, 23),
            ],
            { weight: 1 }, 'Vincent'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine', weight: 4},
            {loot: 'xClick', weight: 2.5},
            {loot: 'Galarian Stunfisk', weight: 0.5},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Earth Plate'},
            {loot: 'Duskball'},
        ],
        legendary: [{loot: 'Star Piece'}],
    },
    21294640,
    [
        new DungeonBossPokemon('Galarian Stunfisk', 106473200, 25),
        new DungeonBossPokemon('Gastrodon (East)', 106473200, 50),
        new DungeonBossPokemon('Drednaw', 106473200, 24),
    ],
    1430000, 14);

dungeonList['Rose Tower'] = new Dungeon('Rose Tower',
    [
        new DungeonTrainer('Macro Cosmos',
            [new GymPokemon('Durant', 26400842, 48)],
            { weight: 1 }, 'Elijah', '(male)'),
        new DungeonTrainer('Macro Cosmos',
            [new GymPokemon('Cufant', 26400842, 48)],
            { weight: 1 }, 'Jane', '(female)'),
        new DungeonTrainer('Macro Cosmos',
            [new GymPokemon('Bronzong', 26400842, 48)],
            { weight: 1 }, 'Mateo', '(male)'),
        new DungeonTrainer('Macro Cosmos',
            [new GymPokemon('Klang', 26400842, 48)],
            { weight: 1 }, 'Kevin', '(male)'),
        new DungeonTrainer('Macro Cosmos',
            [new GymPokemon('Mawile', 26400842, 48)],
            { weight: 1 }, 'Carla', '(female)'),
        new DungeonTrainer('Macro Cosmos',
            [new GymPokemon('Steelix', 26400842, 49)],
            { weight: 1 }, 'Adalyn', '(female)'),
        new DungeonTrainer('Macro Cosmos',
            [new GymPokemon('Galarian Stunfisk', 26400842, 49)],
            { weight: 1 }, 'Justin', '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Rose Shard'},
            {loot: 'Grey Shard'},
        ],
        epic: [{loot: 'Iron Plate'}],
    },
    26400842,
    [
        new DungeonTrainer('Macro Cosmos',
            [
                new GymPokemon('Froslass', 26400842, 50),
                new GymPokemon('Tsareena', 26400842, 50),
                new GymPokemon('Salazzle', 26400842, 50),
                new GymPokemon('Milotic', 26400842, 51),
                new GymPokemon('Gigantamax Garbodor', 26400842, 52),
            ],
            { weight: 1 }, 'Oleana', '(oleana)'),
    ],
    1800000, 32);

dungeonList['Energy Plant'] = new Dungeon('Energy Plant',
    ['Steelix', 'Mawile', 'Bronzong', 'Durant', 'Bisharp', 'Doublade', 'Golisopod', 'Galarian Stunfisk'],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Lucky_egg'},
            {loot: 'Pokeball'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
        ],
    },
    26704124,
    [
        new DungeonTrainer('Macro Cosmos',
            [
                new GymPokemon('Escavalier', 26704124, 50),
                new GymPokemon('Ferrothorn', 26704124, 50),
                new GymPokemon('Perrserker', 26704124, 50),
                new GymPokemon('Klinklang', 26704124, 51),
                new GymPokemon('Gigantamax Copperajah', 26704124, 52),
            ],
            { weight: 3 }, 'Rose', '(rose)'),
        new DungeonBossPokemon('Zacian (Battle Hero)', 169578810, 70, {hide: true, requirement: new QuestLineStepCompletedRequirement('Sword and Shield', 18)}),
        new DungeonBossPokemon('Zamazenta (Battle Hero)', 169578810, 70, {hide: true, requirement: new QuestLineStepCompletedRequirement('Sword and Shield', 18)}),
    ],
    1850000, 32);

dungeonList['Glimwood Tangle'] = new Dungeon('Glimwood Tangle',
    [
        {pokemon: 'Shiinotic', options: { weight: 1.8 }},
        {pokemon: 'Galarian Ponyta', options: { weight: 1.8 }},
        {pokemon: 'Sinistea', options: { weight: 1.8 }},
        {pokemon: 'Phantump', options: { weight: 1.8 }},
        {pokemon: 'Swirlix', options: { weight: 1.8 }},
        {pokemon: 'Spritzee', options: { weight: 1.8 }},
        {pokemon: 'Passimian', options: { weight: 1.8 }},
        {pokemon: 'Oranguru', options: { weight: 1.8 }},
        {pokemon: 'Impidimp', options: { weight: 1.8 }},
        new DungeonTrainer('Rail Staff',
            [new GymPokemon('Ninetales', 23764848, 34)],
            { weight: 1 }, 'Robert'),
        new DungeonTrainer('Cook',
            [
                new GymPokemon('Milcery', 23764848, 33),
                new GymPokemon('Sinistea', 23764848, 33),
                new GymPokemon('Shiinotic', 23764848, 34),
            ],
            { weight: 1 }, 'Derek'),
        new DungeonTrainer('Madame',
            [
                new GymPokemon('Indeedee (Male)', 23764848, 33),
                new GymPokemon('Indeedee (Female)', 23764848, 33),
            ],
            { weight: 1 }, 'Judy'),
        new DungeonTrainer('Beauty',
            [new GymPokemon('Kirlia', 23764848, 34)],
            { weight: 1 }, 'Jacqueline'),
    ],
    {
        common: [
            {loot: 'Cheri', weight: 3},
            {loot: 'Pecha', weight: 3},
            {loot: 'Impidimp'},
        ],
        rare: [
            {loot: 'White Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [{loot: 'LargeRestore'}],
    },
    23764848,
    [
        new DungeonBossPokemon('Hattrem', 118824240, 36),
        new DungeonBossPokemon('Morgrem', 118824240, 36),
        new DungeonBossPokemon('Indeedee (Male)', 118824240, 36),
        new DungeonBossPokemon('Indeedee (Female)', 118824240, 36),
    ],
    1680000, 23);

dungeonList['Dusty Bowl'] = new Dungeon('Dusty Bowl',
    ['Gurdurr', 'Ferrothorn', 'Klang', 'Meowstic', 'Barbaracle', 'Applin', 'Hattrem', 'Qwilfish', 'Hitmonlee', 'Hitmonchan', 'Koffing'],
    {
        common: [
            {loot: 'Pokeball'},
            {loot: 'Greatball'},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Ochre Shard'},
            {loot: 'Grey Shard'},
        ],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Max Revive'},
            {loot: 'Rare Bone'},
            {loot: 'Star Piece'},
        ],
    },
    22923210,
    [
        new DungeonBossPokemon('Gigalith', 114616050, 60),
        new DungeonBossPokemon('Flygon', 114616050, 60),
        new DungeonBossPokemon('Sigilyph', 114616050, 60),
        new DungeonBossPokemon('Tyranitar', 114616050, 60),
    ],
    1570000, 20);


//Isle of Armor
dungeonList['Warm-Up Tunnel'] = new Dungeon('Warm-Up Tunnel',
    ['Sandshrew', 'Cubone', 'Torkoal'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Brown Shard'},
        ],
        epic: [{loot: 'Quickball'}],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Max Revive'},
        ],
    },
    28252100,
    [new DungeonBossPokemon('Kangaskhan', 141260500, 60)],
    1730000, 38);

dungeonList['Courageous Cavern'] = new Dungeon('Courageous Cavern',
    ['Pincurchin', 'Dwebble', 'Crustle', 'Swoobat', 'Magikarp', 'Shellder', 'Cloyster', 'Tentacool', 'Chewtle', 'Tentacruel', 'Whiscash'],
    {
        common: [
            {loot: 'Pokeball'},
            {loot: 'Greatball'},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [
            {loot: 'Duskball'},
            {loot: 'Quickball'},
        ],
        legendary: [
            {loot: 'Icy Rock'},
            {loot: 'Star Piece'},
            {loot: 'Revive'},
            {loot: 'Oval Stone'},
            {loot: 'Everstone'},
            {loot: 'Hard Stone'},
        ],
    },
    26704124,
    [
        new DungeonBossPokemon('Golisopod', 133520620, 60),
        new DungeonBossPokemon('Druddigon', 133520620, 60),
        new DungeonBossPokemon('Drednaw', 133520620, 60),
    ],
    1730000, 33);

dungeonList['Brawlers\' Cave'] = new Dungeon('Brawlers\' Cave',
    ['Whismur', 'Woobat', 'Azurill', 'Lickitung', 'Loudred', 'Swoobat', 'Golduck', 'Poliwag', 'Barboach', 'Whiscash', 'Chansey', 'Psyduck'],
    {
        common: [
            {loot: 'Greatball', weight: 3},
            {loot: 'Ultraball', weight: 3},
            {loot: 'MediumRestore'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Rose Shard'},
        ],
        epic: [
            {loot: 'Duskball'},
            {loot: 'Nestball'},
            {loot: 'Timerball'},
            {loot: 'Luxuryball'},
        ],
        legendary: [
            {loot: 'Rare Bone'},
            {loot: 'Hard Stone'},
            {loot: 'Star Piece'},
            {loot: 'LargeRestore'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Brawlers\' Cave'))}],
    },
    27009504,
    [
        new DungeonBossPokemon('Gigalith', 135047520, 60),
        new DungeonBossPokemon('Druddigon', 135047520, 60),
        new DungeonBossPokemon('Poliwrath', 135047520, 60),
    ],
    1730000, 34);

dungeonList['Tower of Darkness'] = new Dungeon('Tower of Darkness',
    [
        new DungeonTrainer('Master Dojo',
            [new GymPokemon('Zorua', 28886112, 65)],
            { weight: 1 }, 'Student'),
        new DungeonTrainer('Master Dojo',
            [new GymPokemon('Scraggy', 28886112, 66)],
            { weight: 1 }, 'Student'),
        new DungeonTrainer('Master Dojo',
            [new GymPokemon('Inkay', 28886112, 67)],
            { weight: 1 }, 'Student'),
        new DungeonTrainer('Master Dojo',
            [new GymPokemon('Krokorok', 28886112, 68)],
            { weight: 1 }, 'Student'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Black Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [{loot: 'Dread Plate'}],
    },
    28886112,
    [
        new DungeonTrainer('Dojo Master',
            [new GymPokemon('Kubfu', 144430560, 70)], { weight: 1 }, 'Mustard'),
    ],
    2000000, 40,
    () => {
        App.game.party.gainPokemonByName('Urshifu (Single Strike)');
        Notifier.notify({
            message: 'Kubfu evolved into Urshifu (Single Strike)!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 3e4,
        });
    });

dungeonList['Tower of Waters'] = new Dungeon('Tower of Waters',
    [
        new DungeonTrainer('Master Dojo',
            [new GymPokemon('Psyduck', 28886112, 65)],
            { weight: 1 }, 'Student'),
        new DungeonTrainer('Master Dojo',
            [new GymPokemon('Krabby', 28886112, 66)],
            { weight: 1 }, 'Student'),
        new DungeonTrainer('Master Dojo',
            [new GymPokemon('Marill', 28886112, 67)],
            { weight: 1 }, 'Student'),
        new DungeonTrainer('Master Dojo',
            [new GymPokemon('Poliwhirl', 28886112, 68)],
            { weight: 1 }, 'Student'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [{loot: 'Splash Plate'}],
    },
    28886112,
    [
        new DungeonTrainer('Dojo Master',
            [new GymPokemon('Kubfu', 144430560, 70)], { weight: 1 }, 'Mustard'),
    ],
    2000000, 36,
    () => {
        App.game.party.gainPokemonByName('Urshifu (Rapid Strike)');
        Notifier.notify({
            message: 'Kubfu evolved into Urshifu (Rapid Strike)!',
            type: NotificationConstants.NotificationOption.success,
            timeout: 3e4,
        });
    });

//Crown Tundra
dungeonList['Roaring-Sea Caves'] = new Dungeon('Roaring-Sea Caves',
    [
        'Zubat', 'Carbink', 'Piloswine', 'Deino', 'Larvitar', 'Riolu', 'Audino', 'Golbat', 'Barboach', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Magikarp', 'Feebas',
        {pokemon: 'Omanyte', options: { hide: true, requirement: new ObtainedPokemonRequirement('Omanyte')}},
        {pokemon: 'Kabuto', options: { hide: true, requirement: new ObtainedPokemonRequirement('Kabuto')}},
    ],
    {
        common: [
            {loot: 'Greatball'},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Duskball'},
            {loot: 'MediumRestore'},
            {loot: 'LargeRestore'},
        ],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Max Revive'},
            {loot: 'Hard Stone'},
            {loot: 'Star Piece'},
            {loot: 'Everstone'},
            {loot: 'Rare Bone'},
        ],
    },
    32184888,
    [
        new DungeonBossPokemon('Kabutops', 160924440, 60, {hide: true, requirement: new ObtainedPokemonRequirement('Kabutops')}),
        new DungeonBossPokemon('Omastar', 160924440, 60, {hide: true, requirement: new ObtainedPokemonRequirement('Omastar')}),
        new DungeonBossPokemon('Tyranitar', 160924440, 60),
        new DungeonBossPokemon('Hydreigon', 160924440, 60),
        new DungeonBossPokemon('Lucario', 160924440, 60),
    ],
    1730000, 50);

dungeonList['Rock Peak Ruins'] = new Dungeon('Rock Peak Ruins',
    [
        'Stonjourner', 'Rhyperior', 'Aggron', 'Coalossal', 'Barbaracle', 'Gigalith', 'Crustle',
        {pokemon: 'Aerodactyl', options: { hide: true, requirement: new ObtainedPokemonRequirement('Aerodactyl')}},
    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Brown Shard'},
            {loot: 'Grey Shard'},
        ],
        epic: [
            {loot: 'Hard Stone'},
            {loot: 'Everstone'},
            {loot: 'Stone Plate'},
        ],
    },
    31507840,
    [
        new DungeonBossPokemon('Relicanth', 149662240, 60),
        new DungeonBossPokemon('Regirock', 157539200, 70, { hide: true, requirement: new QuestLineStepCompletedRequirement('The Ancient Golems', 4) }),
    ],
    1920000, 48);

dungeonList['Iron Ruins'] = new Dungeon('Iron Ruins',
    ['Bronzong', 'Duraludon', 'Copperajah', 'Corviknight', 'Perrserker', 'Bisharp', 'Ferrothorn', 'Excadrill'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Lucky_incense'},
        ],
        rare: [{loot: 'Grey Shard'}],
        epic: [
            {loot: 'Hard Stone'},
            {loot: 'Everstone'},
            {loot: 'Iron Plate'},
        ],
    },
    31507840,
    [
        new DungeonBossPokemon('Metagross', 149662240, 60),
        new DungeonBossPokemon('Registeel', 157539200, 70, { hide: true, requirement: new QuestLineStepCompletedRequirement('The Ancient Golems', 4) }),
    ],
    1920000, 48);

dungeonList['Iceberg Ruins'] = new Dungeon('Iceberg Ruins',
    [
        'Cryogonal', 'Beartic', 'Galarian Darumaka', 'Weavile', 'Vanilluxe', 'Froslass', 'Delibird',
        {pokemon: 'Aurorus', options: { hide: true, requirement: new ObtainedPokemonRequirement('Aurorus')}},
    ],
    {
        common: [
            {loot: 'Dowsing_machine', weight: 3},
            {loot: 'Lucky_incense', weight: 3},
            {loot: 'Cryogonal'},
        ],
        rare: [
            {loot: 'White Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Hard Stone'},
            {loot: 'Everstone'},
            {loot: 'Icicle Plate'},
        ],
    },
    31507840,
    [
        new DungeonBossPokemon('Glalie', 149662240, 60),
        new DungeonBossPokemon('Regice', 157539200, 70, { hide: true, requirement: new QuestLineStepCompletedRequirement('The Ancient Golems', 4) }),
    ],
    1920000, 54);

dungeonList['Split-Decision Ruins'] = new Dungeon('Split-Decision Ruins',
    ['Electabuzz', 'Cryogonal', 'Bronzong', 'Stonjourner', 'Galvantula', 'Relicanth', 'Glalie', 'Metagross'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'White Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Purple Shard'},
        ],
        mythic: [
            {loot: 'Draco Plate'},
            {loot: 'Zap Plate'},
        ],
    },
    32870660,
    [
        new DungeonBossPokemon('Altaria', 156135635, 60),
        new DungeonBossPokemon('Electivire', 156135635, 60),
        new DungeonBossPokemon('Regidrago', 164353300, 70),
        new DungeonBossPokemon('Regieleki', 164353300, 70),
    ],
    2000000, 52);

dungeonList['Lakeside Cave'] = new Dungeon('Lakeside Cave',
    ['Zubat', 'Aron', 'Carbink', 'Carkol', 'Ferroseed', 'Mawile', 'Sableye', 'Audino', 'Lairon'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Grey Shard'},
            {loot: 'Brown Shard'},
        ],
        epic: [{loot: 'Duskball'}],
        legendary: [
            {loot: 'Rare Bone'},
            {loot: 'Star Piece'},
            {loot: 'Hard Stone'},
            {loot: 'Everstone'},
        ],
    },
    33216830,
    [
        new DungeonBossPokemon('Noivern', 166608415, 60),
        new DungeonBossPokemon('Aggron', 166608415, 60),
        new DungeonBossPokemon('Coalossal', 166608415, 60),
    ],
    1750000, 53);

dungeonList['Dyna Tree Hill'] = new Dungeon('Dyna Tree Hill',
    ['Magmar', 'Absol', 'Beartic', 'Cryogonal', 'Dubwool', 'Glalie', 'Clefable'],
    {
        common: [
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Cyan Shard'},
            {loot: 'Rose Shard'},
        ],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Tamato'},
            {loot: 'Hondew'},
        ],
    },
    33216830,
    [new DungeonBossPokemon('Greedent', 166608415, 60)],
    1920000, 53);

dungeonList['Tunnel to the Top'] = new Dungeon('Tunnel to the Top',
    ['Zubat', 'Golbat', 'Carbink', 'Snorunt', 'Gible', 'Bagon', 'Clefairy', 'Clefable', 'Audino', 'Druddigon'],
    {
        common: [
            {loot: 'Rawst'},
            {loot: 'Aspear'},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Brown Shard'},
            {loot: 'Rose Shard'},
        ],
        epic: [
            {loot: 'Duskball'},
            {loot: 'Quickball'},
            {loot: 'Flame Plate'},
            {loot: 'LargeRestore'},
        ],
        legendary: [
            {loot: 'Hard Stone'},
            {loot: 'Heat Rock'},
            {loot: 'Icy Rock'},
            {loot: 'Everstone'},
            {loot: 'Rare Bone'},
            {loot: 'Revive'},
            {loot: 'Star Piece'},
            {loot: 'Max Revive'},
        ],
    },
    33565196,
    [
        new DungeonBossPokemon('Froslass', 167825980, 60),
        new DungeonBossPokemon('Garchomp', 167825980, 60),
        new DungeonBossPokemon('Salamence', 167825980, 60),
    ],
    2000000, 54);

dungeonList['Crown Shrine'] = new Dungeon('Crown Shrine',
    ['Dhelmise', 'Hatterene', 'Reuniclus', 'Mr. Rime', 'Mamoswine', 'Roserade'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Brown Shard'},
            {loot: 'Rose Shard'},
        ],
        epic: [
            {loot: 'Mind Plate'},
            {loot: 'Icicle Plate'},
            {loot: 'Spooky Plate'},
        ],
        legendary: [{loot: 'Max Revive'}],
        mythic: [
            {loot: 'Heart Scale', weight: 2},
            {loot: 'Galarian Darmanitan (Zen)'},
        ],
    },
    33915762,
    [
        new DungeonBossPokemon('Galarian Rapidash', 161099869, 60),
        new DungeonBossPokemon('Abomasnow', 161099869, 60),
        new DungeonBossPokemon('Trevenant', 161099869, 60),
        new DungeonBossPokemon('Weavile', 161099869, 60),
        new DungeonBossPokemon('Calyrex', 169578810, 80, { hide: true, requirement: new QuestLineStepCompletedRequirement('The Crown of Galar', 8) }),
    ],
    2200000, 55);
