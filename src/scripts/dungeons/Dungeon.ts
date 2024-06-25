///<reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="DungeonBossPokemon.ts"/>
///<reference path="../../declarations/requirements/GymBadgeRequirement.d.ts"/>
///<reference path="../../declarations/requirements/MultiRequirement.d.ts"/>
///<reference path="../../declarations/requirements/OneFromManyRequirement.d.ts"/>
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
    hideTrainer?: boolean,
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
    shadow: boolean,
    hide: boolean, // try to not hide pokemon required as per the Pokedex Challenge whose unlock method can be avoided through regular gameplay
    uncaught: boolean,
    lock: boolean,
    lockMessage: string,
    pokemonName: PokemonNameType,
}

// Gain a gym badge after first completion of a dungeon
// Used for trials pre 10.16, could be useful for something else?
const DungeonGainGymBadge = (gym: Gym) => {
    // Check that the player hasn't already obtained the badge
    if (!App.game.badgeCase.hasBadge(gym.badgeReward)) {
        // Set the set to our expected gym
        // This updates our modal values
        GymRunner.gymObservable(gym);
        GymBattle.gym = gym;
        // Give the player the badge
        gym.firstWinReward();
    }
};

/**
 * Gym class.
 */
 interface optionalDungeonParameters {
    dungeonRegionalDifficulty?: GameConstants.Region,
    requirement?: MultiRequirement | OneFromManyRequirement | Requirement,
}
class Dungeon {
    private mimicList: PokemonNameType[] = [];

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
    ) {
        // Keep a list of mimics to use with getCaughtMimics()
        Object.entries(this.lootTable).forEach(([_, itemList]) => {
            itemList.forEach((loot) => {
                const mimic = pokemonMap[loot.loot].name;
                if (mimic != 'MissingNo.') {
                    this.mimicList.push(mimic);
                }
            });
        });
    }

    public isUnlocked(): boolean {
        // Player requires the Dungeon Ticket to access the dungeons
        if (!App.game.keyItems.hasKeyItem(KeyItemType.Dungeon_ticket)) {
            return false;
        }
        // Player may not meet the requirements to start the dungeon
        const dungeonTown = TownList[this.name];
        const dungeonRequirement = this.optionalParameters.requirement;
        // Use dungeonRequirement if it exists, else default to dungeonTown status
        if (dungeonRequirement ? !dungeonRequirement.isCompleted() : !dungeonTown.isUnlocked()) {
            return false;
        }
        return true;
    }

    public getRequirementHints() {
        const dungeonTown = TownList[this.name];
        const reqsList = [];
        dungeonTown.requirements?.forEach(req => {
            if (!req.isCompleted()) {
                reqsList.push(req.hint());
            }
        });
        if (this.optionalParameters.requirement ? !this.optionalParameters.requirement.isCompleted() : false) {
            reqsList.push(this.optionalParameters.requirement.hint());
        }
        return reqsList;
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
        const encounterInfo = this.allAvailableShadowPokemon();

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

        this.getCaughtMimics().forEach((mimic) => encounterInfo.push(mimic));

        return encounterInfo;
    }

    public allShadowPokemon(): PokemonNameType[] {
        const encounterInfo = this.normalEncounterList.filter(e => e.shadow).map(e => e.pokemonName);
        encounterInfo.push(...this.bossEncounterList.filter(e => e.shadow).map(e => e.pokemonName));
        return encounterInfo;
    }

    public allAvailableShadowPokemon(): PokemonNameType[] {
        const encounterInfo = this.normalEncounterList.filter(e => e.shadow && !e.hide).map(e => e.pokemonName);
        encounterInfo.push(...this.bossEncounterList.filter(e => e.shadow && !e.hide).map(e => e.pokemonName));
        return encounterInfo;
    }

    public getCaughtMimics(): PokemonNameType[] {
        return this.mimicList.filter(p => App.game.party.alreadyCaughtPokemonByName(p));
    }

    public getRandomLootTier(clears: number, debuffed = false, onlyDebuffable = false): LootTier {
        const tierWeights = this.getLootTierWeights(clears, debuffed, onlyDebuffable);
        return Rand.fromWeightedArray(Object.keys(tierWeights), Object.values(tierWeights)) as LootTier;
    }

    private lootFilter = (loot: Loot, onlyDebuffable: boolean) => ((!loot.requirement || loot.requirement.isCompleted()) && (!ItemList[loot.loot] || (ItemList[loot.loot].isAvailable() && !ItemList[loot.loot].isSoldOut()))) && !(onlyDebuffable && loot.ignoreDebuff);

    public getRandomLoot(tier: LootTier, onlyDebuffable = false): Loot {
        const lootTable = this.lootTable[tier].filter((loot) => this.lootFilter(loot, onlyDebuffable));
        return Rand.fromWeightedArray(lootTable, lootTable.map((loot) => loot.weight ?? 1));
    }

    public getLootTierWeights(clears: number, debuffed : boolean, onlyDebuffable = false): Record<LootTier, number> {
        if (debuffed) {
            return Object.entries(nerfedLootTierChance).reduce((chances, [tier, chance]) => {
                if (tier in this.lootTable &&
                    this.lootTable[tier].some((loot: Loot) => this.lootFilter(loot, onlyDebuffable))
                ) {
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


    private getEncounterInfo(pokemonName: PokemonNameType, mimicData, hideEncounter = false, shadow = false): EncounterInfo {
        const partyPokemon = App.game.party.getPokemonByName(pokemonName);
        const pokerus = partyPokemon?.pokerus;
        const caught = App.game.party.alreadyCaughtPokemonByName(pokemonName);
        const shinyCaught = App.game.party.alreadyCaughtPokemonByName(pokemonName, true);
        const shadowCaught = partyPokemon?.shadow >= GameConstants.ShadowStatus.Shadow;
        const purified = partyPokemon?.shadow >= GameConstants.ShadowStatus.Purified;
        const encounter = {
            pokemonName,
            image: `assets/images/${shinyCaught ? 'shiny' : ''}${shadow && shadowCaught ? 'shadow' : ''}pokemon/${pokemonMap[pokemonName].id}.png`,
            shadowBackground: shadow && !shadowCaught ? `assets/images/shadowpokemon/${pokemonMap[pokemonName].id}.png` : '',
            pkrsImage: pokerus > GameConstants.Pokerus.Uninfected ? `assets/images/breeding/pokerus/${GameConstants.Pokerus[pokerus]}.png` : '',
            EVs: pokerus >= GameConstants.Pokerus.Contagious ? `EVs: ${partyPokemon.evs().toLocaleString('en-US')}` : '',
            shiny: shinyCaught,
            hide: hideEncounter,
            uncaught: !caught,
            lock: !!mimicData?.lockedMessage,
            lockMessage: mimicData?.lockedMessage ?? '',
            mimic: !!mimicData,
            mimicTier: mimicData?.tier,
            shadow,
            shadowCaught,
            purified,
        };
        return encounter;
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
                let hideEncounter = false;
                if (enemy.hasOwnProperty('pokemon')) {
                    const pokemon = <DetailedPokemon>enemy;
                    pokemonName = pokemon.pokemon;
                    hideEncounter = pokemon.options?.hide ? (pokemon.options?.requirement ? !pokemon.options?.requirement.isCompleted() : pokemon.options?.hide) : false;
                } else {
                    pokemonName = <PokemonNameType>enemy;
                }
                encounterInfo.push(this.getEncounterInfo(pokemonName, null, hideEncounter));
            // Handling Trainers (only those with shadow Pokemon)
            } else if (enemy instanceof DungeonTrainer) {
                const hideEncounter = (enemy.options?.requirement && !enemy.options.requirement.isCompleted());
                const shadowPokemon = enemy.getTeam().filter(p => p.shadow == GameConstants.ShadowStatus.Shadow);
                if (shadowPokemon.length) {
                    const shadowEncounters = shadowPokemon.map(p => this.getEncounterInfo(p.name, null, hideEncounter, true));
                    const trainerEncounter = {
                        image: enemy.image,
                        EVs: '',
                        hide: hideEncounter,
                        lockMessage: '',
                        shadowTrainer: true,
                    };
                    encounterInfo.push(...shadowEncounters);
                    encounterInfo.push(trainerEncounter);
                }
            }
        });

        // Handling Mimics
        this.getCaughtMimics().forEach(enemy => {
            const pokemonName = enemy;
            encounterInfo.push(this.getEncounterInfo(pokemonName, this.getMimicData(pokemonName)));
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
            const hideEncounter = boss.options?.hide ? (boss.options?.requirement ? !boss.options?.requirement.isCompleted() : boss.options?.hide) : false;
            const lock = boss.options?.requirement ? !boss.options?.requirement.isCompleted() : false;
            const lockMessage = boss.options?.requirement ? boss.options?.requirement.hint() : '';
            // Handling Pokemon
            if (boss instanceof DungeonBossPokemon) {
                const encounter = this.getEncounterInfo(boss.name, null, hideEncounter);
                encounter.lock = lock;
                encounter.lockMessage = lockMessage;
                encounterInfo.push(encounter);
            // Handling Trainer
            } else {
                // Check for Shadow Pokemon
                const shadowPokemon = boss.getTeam().filter(p => p.shadow == GameConstants.ShadowStatus.Shadow);
                const shadowEncounter = shadowPokemon.length > 0;
                if (shadowEncounter) {
                    const shadowEncounters = shadowPokemon.map(p => this.getEncounterInfo(p.name, null, hideEncounter, true));
                    encounterInfo.push(...shadowEncounters);
                }
                const encounter = {
                    image: boss.image,
                    EVs: '',
                    shiny:  false,
                    hide: hideEncounter,
                    uncaught: false,
                    lock,
                    lockMessage,
                    shadowTrainer: shadowEncounter,
                };
                encounterInfo.push(encounter);
            }
        });

        return encounterInfo;
    }

    public isThereQuestAtLocation = ko.pureComputed(() => {
        return App.game.quests.currentQuests().some(q => q instanceof DefeatDungeonQuest && q.dungeon == this.name);
    });

    public getMimicData(pokemonName: PokemonNameType): {tier: LootTier, lockedMessage: string} {
        let res;
        (Object.keys(this.lootTable) as LootTier[]).forEach(tier => {
            this.lootTable[tier].forEach(loot => {
                if (loot.loot === pokemonName) {
                    res = {tier: tier, lockedMessage: (loot.requirement?.isCompleted() ?? true) ? '' : loot.requirement.hint()};
                }
            });
        });
        return res;
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
        new DungeonTrainer('Egg Hunter',
            [new GymPokemon('Togepi (Flowering Crown)', 300000, 100)],
            {
                hide: true,
                weight: 2,
                requirement: new MultiRequirement([
                    new QuestLineStartedRequirement('Egg Hunt'),
                    new QuestLineStepCompletedRequirement('Egg Hunt', 0, GameConstants.AchievementOption.less),
                ]),
            }),
        new DungeonBossPokemon('Pikachu (Easter)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Pikachu (Easter)', 0, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
        new DungeonBossPokemon('Vivillon (High Plains)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 28),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 29, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (High Plains)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
    [
        new DungeonBossPokemon('Dugtrio', 16040, 31),
        new DungeonBossPokemon('Pikachu (Easter)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Pikachu (Easter)', 1, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
    ],
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
            ], { weight: 1 }, 'Giovanni', 'Giovanni'),
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
    [
        new DungeonBossPokemon('Marowak', 37615, 30),
        new DungeonBossPokemon('Pikachu (Easter)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Pikachu (Easter)', 2, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
    ],
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
            ], { weight: 1, requirement: new QuestLineStepCompletedRequirement('Team Rocket', 2)}, 'Beau', '(male)'),
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
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magneton', 10322, 26),
                new GymPokemon('Magnemite', 10322, 26),
                new GymPokemon('Koffing', 10322, 26),
                new GymPokemon('Weezing', 12915, 26),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Team Rocket', 2, GameConstants.AchievementOption.less)}, 'Beau', '(male)'),
        new DungeonTrainer('Team Rocket Boss',
            [
                new GymPokemon('Nidorino', 12144, 37),
                new GymPokemon('Rhyhorn', 12144, 37),
                new GymPokemon('Kangaskhan', 12144, 35),
                new GymPokemon('Nidoqueen', 16144, 41),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Team Rocket', 2)}, 'Giovanni', 'Giovanni'),
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
        new DungeonBossPokemon('Pikachu (Easter)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Pikachu (Easter)', 3, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
        epic : [{loot: 'Snorlax (Snowman)', ignoreDebuff : true, requirement : new SpecialEventRequirement('Merry Christmas!')}],
        legendary: [{loot: 'Revive'}],
        mythic: [{loot: 'Ultraball'}],
    },
    17226,
    [
        new DungeonBossPokemon('Seel', 86130, 35),
        new DungeonBossPokemon('Articuno', 129195, 50),
        new DungeonBossPokemon('Pikachu (Easter)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Pikachu (Easter)', 4, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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

dungeonList['New Island'] = new Dungeon('New Island',
    [
        new DungeonTrainer('Armored Mewtwo',
            [
                new GymPokemon('Tentacruel', 18500, 40),
                new GymPokemon('Gyarados', 18500, 40),
            ], { weight: 1 }, ''),
        new DungeonTrainer('Armored Mewtwo',
            [
                new GymPokemon('Sandslash', 18500, 40),
                new GymPokemon('Vaporeon', 18500, 40),
                new GymPokemon('Golduck', 18500, 40),
            ], { weight: 1 }, ''),
        new DungeonTrainer('Armored Mewtwo',
            [
                new GymPokemon('Nidoqueen', 18500, 40),
                new GymPokemon('Ninetales', 18500, 40),
            ], { weight: 1 }, ''),
        new DungeonTrainer('Armored Mewtwo',
            [new GymPokemon('Blastoise (Clone)', 20000, 50)],
            { weight: 2 }, ''),
        new DungeonTrainer('Armored Mewtwo',
            [new GymPokemon('Venusaur (Clone)', 20000, 50)]
            , { weight: 2 }, ''),
        new DungeonTrainer('Armored Mewtwo',
            [new GymPokemon('Charmander (Clone)', 20000, 50)],
            { weight: 2 }, ''),
        new DungeonTrainer('Armored Mewtwo',
            [
                new GymPokemon('Vulpix', 18500, 40),
                new GymPokemon('Vileplume', 18500, 40),
            ], { weight: 1 }, ''),
        new DungeonTrainer('Armored Mewtwo',
            [
                new GymPokemon('Wigglytuff', 18500, 40),
                new GymPokemon('Rapidash', 18500, 40),
            ], { weight: 1 }, ''),
        new DungeonTrainer('Armored Mewtwo',
            [new GymPokemon('Rhydon', 18500, 40)],
            { weight: 1 }, ''),
        new DungeonTrainer('Jessie and James',
            [new GymPokemon('Meowth', 150, 10)],
            { weight: 1 }, ''),
    ],
    {
        common: [{loot: 'xClick'}],
        rare: [{loot: 'Yellow Shard'}],
        mythic: [{loot: 'Heart Scale'}],
    },
    18500,
    [new DungeonBossPokemon('Armored Mewtwo', 131500, 70)],
    1800, 40);

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
        new DungeonBossPokemon('Pikachu (Easter)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Pikachu (Easter)', 5, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
        new DungeonBossPokemon('Vivillon (Modern)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 2),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 3, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Modern)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Ochre Shard'},
        ],
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
            {loot: 'Pinkan Pikachu', ignoreDebuff : true, requirement: new TemporaryBattleRequirement('Ash Ketchum Pinkan'), weight: 2},
            {loot: 'Qualot'},
            {loot: 'Magost'},
            {loot: 'Watmel'},
        ],
        legendary: [{loot: 'Fairy_Feather'}],
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
        new DungeonBossPokemon('Vivillon (Archipelago)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 12),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 13, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Archipelago)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
            {loot: 'Leppa'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
        ],
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
        new DungeonBossPokemon('Togepi (Flowering Crown)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Togepi (Flowering Crown)', 0, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
        new DungeonBossPokemon('Togepi (Flowering Crown)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Togepi (Flowering Crown)', 1, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
        epic : [{loot: 'Spiky-eared Pichu', ignoreDebuff : true, requirement : new QuestLineStepCompletedRequirement('Unfinished Business', 7)}],
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
        new DungeonBossPokemon('Celebi', 800000, 50, {requirement: new QuestLineStepCompletedRequirement('Unfinished Business', 12)}),
        new DungeonBossPokemon('Grinch Celebi', 1600000, 100, {
            hide: true,
            requirement: new MultiRequirement([
                new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion),
                new SpecialEventRequirement('Merry Christmas!'),
            ])}),
        new DungeonTrainer('Egg Hunter',
            [new GymPokemon('Togepi (Flowering Crown)', 900000, 100)],
            {
                hide: true,
                weight: 2,
                requirement: new MultiRequirement([
                    new QuestLineStepCompletedRequirement('Egg Hunt', 0),
                    new QuestLineStepCompletedRequirement('Egg Hunt', 1, GameConstants.AchievementOption.less),
                ]),
            }),
        new DungeonBossPokemon('Togepi (Flowering Crown)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Togepi (Flowering Crown)', 2, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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

dungeonList['Olivine Lighthouse'] = new Dungeon('Olivine Lighthouse',
    [
        new DungeonTrainer('Gentleman',
            [new GymPokemon('Noctowl', 4550, 22)],
            { weight: 1 }, 'Alfred'),
        new DungeonTrainer('Sailor',
            [
                new GymPokemon('Poliwag', 4550, 18),
                new GymPokemon('Poliwhirl', 4550, 20),
            ],
            { weight: 1 }, 'Huey'),
        new DungeonTrainer('Bird Keeper',
            [
                new GymPokemon('Pidgey', 4200, 17),
                new GymPokemon('Pidgey', 4200, 15),
                new GymPokemon('Pidgey', 4200, 19),
                new GymPokemon('Pidgey', 4200, 15),
                new GymPokemon('Pidgey', 4200, 15),
            ],
            { weight: 1 }, 'Theo'),
        new DungeonTrainer('Sailor',
            [
                new GymPokemon('Krabby', 4550, 18),
                new GymPokemon('Krabby', 4550, 20),
            ],
            { weight: 1 }, 'Kent'),
        new DungeonTrainer('Bird Keeper',
            [
                new GymPokemon('Spearow', 4550, 18),
                new GymPokemon('Fearow', 4550, 20),
                new GymPokemon('Spearow', 4550, 18),
            ],
            { weight: 1 }, 'Denis'),
        new DungeonTrainer('Gentleman',
            [
                new GymPokemon('Growlithe', 4550, 18),
                new GymPokemon('Growlithe', 4550, 18),
            ],
            { weight: 1 }, 'Preston'),
        new DungeonTrainer('Lass',
            [new GymPokemon('Marill', 4550, 21)],
            { weight: 1 }, 'Connie'),
        new DungeonTrainer('Sailor',
            [new GymPokemon('Poliwhirl', 4550, 20)],
            { weight: 1 }, 'Terell'),
    ],
    {
        common: [
            {loot: 'Lucky_incense', weight: 2},
            {loot: 'Dowsing_machine'},
        ],
        rare: [{loot: 'Yellow Shard'}],
        epic: [{loot: 'Greatball'}],
        legendary: [
            {loot: 'Zap Plate'},
            {loot: 'MediumRestore'},
        ],
        mythic: [
            {loot: 'Ultraball'},
            {loot: 'LargeRestore'},
        ],
    },
    88500,
    [
        new DungeonTrainer('Sailor',
            [
                new GymPokemon('Machop', 125000, 18),
                new GymPokemon('Machop', 125000, 18),
                new GymPokemon('Poliwhirl', 125000, 18),
            ], { weight: 1 }, 'Roberto'),
    ],
    4500, 40);

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
        new DungeonBossPokemon('Ho-Oh', 1410000, 100, {requirement: new QuestLineStepCompletedRequirement('Rainbow Guardian', 1)}),
        new DungeonBossPokemon('Togepi (Flowering Crown)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Togepi (Flowering Crown)', 4, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
        epic: [{loot: 'Moonball'}],
        legendary: [
            {loot: 'Revive'},
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
        new DungeonBossPokemon('Lugia', 1410000, 100, {requirement: new QuestLineStepCompletedRequirement('Whirl Guardian', 9)}),
        new DungeonBossPokemon('Togepi (Flowering Crown)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Togepi (Flowering Crown)', 3, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
        rare: [{loot: 'Grey Shard'}],
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
        new DungeonBossPokemon('Tyrogue', 420000, 45, {hide: true, requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Mt. Mortar'))}),
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
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
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
            {loot: 'Metal_Powder'},
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
            {loot: 'Blue Shard'},
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
    [
        new DungeonBossPokemon('Delibird', 440000, 50),
        new DungeonBossPokemon('Togepi (Flowering Crown)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Togepi (Flowering Crown)', 5, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
    ],
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
    [
        new DungeonBossPokemon('Dunsparce', 460000, 55),
        new DungeonBossPokemon('Vivillon (Monsoon)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 6),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 7, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Monsoon)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
    ],
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
            {loot: 'Hard Stone'},
            {loot: 'SmallRestore'},
            {loot: 'Fairy_Feather'},
            {loot: 'Rock_Incense'},
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
        new DungeonBossPokemon('Slakoth', 860000, 10, {hide: true, requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Petalburg Woods'))}),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 860000, 9)],
            { weight: 1 }, undefined, '(male)'),
        new DungeonTrainer('Egg Hunter',
            [new GymPokemon('Togepi (Flowering Crown)', 2700000, 100)],
            {
                hide: true,
                weight: 0.34,
                requirement: new MultiRequirement([
                    new QuestLineStepCompletedRequirement('Egg Hunt', 1),
                    new QuestLineStepCompletedRequirement('Egg Hunt', 2, GameConstants.AchievementOption.less),
                ]),
            }),
        new DungeonBossPokemon('Torchic (Egg)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Torchic (Egg)', 0, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
        new DungeonBossPokemon('Torchic (Egg)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Torchic (Egg)', 1, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
            {loot: 'Star Piece', ignoreDebuff : true},
            {loot: 'Rock_Incense'},
        ],
        mythic: [{loot: 'Heart Scale'}],
    },
    410000,
    [
        new DungeonBossPokemon('Mawile', 960000, 20),
        new DungeonBossPokemon('Nosepass', 660000, 20),
        new DungeonTrainer('Lorekeeper',
            [
                new GymPokemon('Tyrantrum', 4073950, 57),
                new GymPokemon('Altaria', 4073950, 57),
                new GymPokemon('Salamence', 4073950, 57),
                new GymPokemon('Whismur', 4073950, 57),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('The Delta Episode', 9)}, 'Zinnia'),
    ],
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
            {loot: 'Sky Plate'},
            {loot: 'Draco Plate'},
            {loot: 'Moonball'},
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
        new DungeonTrainer('Draconid Elder',
            [
                new GymPokemon('Dragonite', 4073950, 57),
                new GymPokemon('Flygon', 4073950, 57),
                new GymPokemon('Haxorus', 4073950, 57),
                new GymPokemon('Garchomp', 4073950, 57),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('The Delta Episode', 16)}),
        new DungeonBossPokemon('Torchic (Egg)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Torchic (Egg)', 2, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
            ], { weight: 2, hide: true, requirement: new QuestLineCompletedRequirement('The Delta Episode', GameConstants.AchievementOption.less)}, 'Maxie'),
        new DungeonTrainer('Magma Leader',
            [
                new GymPokemon('Mightyena', 4500000, 54),
                new GymPokemon('Zubat', 4500000, 54),
                new GymPokemon('Mega Camerupt', 4700000, 55),
            ], { weight: 2, hide: true, requirement: new QuestLineCompletedRequirement('The Delta Episode')}, 'Maxie'),
        new DungeonBossPokemon('Meta Groudon', 1820000, 20, {hide: true, requirement: new QuestLineStepCompletedRequirement('A Meta Discovery', 3)}),
        new DungeonBossPokemon('Vivillon (Sun)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 10),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 11, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Sun)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
        ],
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
        new DungeonBossPokemon('Vivillon (Continental)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 18),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 19, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Continental)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
        new DungeonBossPokemon('Torchic (Egg)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Torchic (Egg)', 3, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
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
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 9, GameConstants.AchievementOption.less)}, 'Shelly', '(shelly)'),
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Carvanha', 4500000, 58),
                new GymPokemon('Mightyena', 4500000, 58),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 9)}, 'Shelly', '(shelly)'),
        new DungeonBossPokemon('Castform', 1820000, 20, {hide: true, requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Weather Institute'))}),
        new DungeonBossPokemon('Castform (Sunny)', 1820000, 20, {hide: true, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Castform'), new WeatherRequirement([WeatherType.Harsh_Sunlight])])}),
        new DungeonBossPokemon('Castform (Rainy)', 1820000, 20, {hide: true, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Castform'), new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm])])}),
        new DungeonBossPokemon('Castform (Snowy)', 1820000, 20, {hide: true, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Castform'), new WeatherRequirement([WeatherType.Snow, WeatherType.Blizzard, WeatherType.Hail])])}),
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
        rare: [{loot: 'Purple Shard'}],
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
            { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('The Delta Episode', GameConstants.AchievementOption.less)}, 'Maxie'),
        new DungeonTrainer('Magma Leader',
            [
                new GymPokemon('Mightyena', 6300000, 37),
                new GymPokemon('Crobat', 6400000, 38),
                new GymPokemon('Mega Camerupt', 6500000, 39),
            ],
            { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('The Delta Episode')}, 'Maxie'),
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
            {loot: 'Never_Melt_Ice'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Heart Scale'},
        ],
    },
    490000,
    [
        new DungeonBossPokemon('Snorunt', 1900000, 20),
        new DungeonBossPokemon('Glalie', 61614300, 60, {hide: true, requirement: new TemporaryBattleRequirement('Icy Boulder')}),
    ],
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
        new DungeonBossPokemon('Kyogre', 4700000, 100, {requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), new QuestLineStepCompletedRequirement('The Weather Trio', 5)])}),
        new DungeonBossPokemon('Groudon', 4700000, 100, {requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Elite_HoennChampion), new QuestLineStepCompletedRequirement('The Weather Trio', 5)])}),
        new DungeonBossPokemon('Primal Kyogre', 95743340, 80, {hide: true, requirement: new MultiRequirement([new QuestLineCompletedRequirement('Primal Reversion'), new WeatherRequirement([WeatherType.Rain])])}),
        new DungeonBossPokemon('Primal Groudon', 95743340, 80, {hide: true, requirement: new MultiRequirement([new QuestLineCompletedRequirement('Primal Reversion'), new WeatherRequirement([WeatherType.Harsh_Sunlight])])}),
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
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7, GameConstants.AchievementOption.less)}, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 32000, 36)],
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7, GameConstants.AchievementOption.less)}, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 32000, 36)],
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7, GameConstants.AchievementOption.less)}, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 32000, 36)],
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7, GameConstants.AchievementOption.less)}, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Mightyena', 32000, 35),
                new GymPokemon('Golbat', 32000, 35),
            ],
            { weight: 1 ,  requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7, GameConstants.AchievementOption.less)}, undefined, '(male)'),
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Sharpedo', 32000, 37),
                new GymPokemon('Mightyena', 32000, 37),
            ], { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7, GameConstants.AchievementOption.less)}, 'Shelly', '(shelly)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Poochyena', 3200000, 36)],
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7)}, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 3200000, 36)],
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7)}, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Zubat', 3200000, 36)],
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7)}, undefined, '(male)'),
        new DungeonTrainer('Team Aqua Grunt',
            [new GymPokemon('Carvanha', 3200000, 36)],
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7)}, undefined, '(female)'),
        new DungeonTrainer('Team Aqua Grunt',
            [
                new GymPokemon('Mightyena', 3200000, 35),
                new GymPokemon('Golbat', 3200000, 35),
            ],
            { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7)}, undefined, '(male)'),
        new DungeonTrainer('Aqua Admin',
            [
                new GymPokemon('Sharpedo', 3200000, 37),
                new GymPokemon('Mightyena', 3200000, 37),
            ], { weight: 1 , requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7)}, 'Shelly', '(shelly)'),

    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Hard Stone', requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7)},
            {loot: 'SmallRestore', requirement: new QuestLineStepCompletedRequirement('Primal Reversion', 7)},
        ],
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
            { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('The Delta Episode', GameConstants.AchievementOption.less)}, 'Archie'),
        new DungeonTrainer('Aqua Leader',
            [
                new GymPokemon('Mightyena', 7000000, 61),
                new GymPokemon('Crobat', 7000000, 61),
                new GymPokemon('Mega Sharpedo', 9000000, 63),
            ],
            { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('The Delta Episode')}, 'Archie'),
    ],
    32000, 101);

dungeonList['Sky Pillar'] = new Dungeon('Sky Pillar',
    ['Golbat', 'Sableye', 'Ariados', 'Banette', 'Mawile', 'Swablu'],
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
        new DungeonBossPokemon('Claydol', 3200000, 20),
        new DungeonBossPokemon('Altaria', 3200000, 20),
        new DungeonBossPokemon('Dusclops', 3200000, 20),
        new DungeonBossPokemon('Rayquaza', 5824002, 100, {requirement: new QuestLineStepCompletedRequirement('The Weather Trio', 5)}),
        new DungeonBossPokemon('Vivillon (Polar)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 22),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 23, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Polar)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
        new DungeonBossPokemon('Torchic (Egg)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Torchic (Egg)', 5, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
            {loot: 'Blue Shard'},
            {loot: 'Grey Shard'},
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
        new DungeonBossPokemon('Torchic (Egg)', 2700000, 23, {
            requirement: new MultiRequirement([
                new PokemonDefeatedSelectNRequirement('Torchic (Egg)', 4, 6, 1),
                new SpecialEventRequirement('Easter'),
                new QuestLineCompletedRequirement('Egg Hunt'),
            ]),
            hide: true,
        }),
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
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
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

dungeonList['Near Space'] = new Dungeon('Near Space',
    ['Solrock','Lunatone', 'Elgyem', 'Beheeyem'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Pink Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Duskball'},
            {loot: 'Moonball'},
            {loot: 'Star Piece'},
        ],
        legendary: [
            {loot: 'Stone Plate'},
            {loot: 'Mind Plate'},
            {loot: 'Iron Plate'},
        ],
        mythic: [{loot: 'Carbos', requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Near Space'))}],
    },
    9000000,
    [
        new DungeonBossPokemon('Deoxys', 95743340, 80),
        new DungeonBossPokemon('Deoxys (Attack)', 95743340, 80, {hide: true, requirement: new ObtainedPokemonRequirement('Deoxys (Attack)')}),
        new DungeonBossPokemon('Deoxys (Defense)', 95743340, 80, {hide: true, requirement: new ObtainedPokemonRequirement('Deoxys (Defense)')}),
        new DungeonBossPokemon('Deoxys (Speed)', 95743340, 80, {hide: true, requirement: new ObtainedPokemonRequirement('Deoxys (Speed)')}),
    ],
    700000, 131,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.kalos});

// Orre

dungeonList['Phenac City Battles'] = new Dungeon('Phenac City Battles',
    [
        new DungeonTrainer('Miror B. Peon',
            [
                new GymPokemon('Whismur', 38000, 24),
                new GymPokemon('Whismur', 38000, 25),
            ], { weight: 1, requirement: new ClearDungeonRequirement(25, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less)}, 'Folly', '(folly)'),
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Corphish', 38000, 25),
                new GymPokemon('Koffing', 38000, 27),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less)}, 'Wakin'),
        new DungeonTrainer('Miror B. Peon',
            [
                new GymPokemon('Whismur', 38000, 26),
                new GymPokemon('Lotad', 38000, 25),
            ], { weight: 1, requirement: new ClearDungeonRequirement(75, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less)}, 'Folly', '(folly)'),
        new DungeonTrainer('Mystery Troop Green',
            [
                new GymPokemon('Grimer', 38000, 26),
                new GymPokemon('Spoink', 38000, 24),
                new GymPokemon('Bayleef', 38000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Verde'),
        new DungeonTrainer('Mystery Troop Red',
            [
                new GymPokemon('Grimer', 38000, 26),
                new GymPokemon('Spoink', 38000, 24),
                new GymPokemon('Quilava', 38000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Rosso'),
        new DungeonTrainer('Mystery Troop Blue',
            [
                new GymPokemon('Grimer', 38000, 26),
                new GymPokemon('Spoink', 38000, 24),
                new GymPokemon('Croconaw', 38000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Bluno'),
        new DungeonTrainer('Miror B. Peon',
            [
                new GymPokemon('Exploud', 38000, 53),
                new GymPokemon('Ludicolo', 38000, 55),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less)}, 'Folly', '(folly)'),
        new DungeonTrainer('Miror B. Peon',
            [
                new GymPokemon('Dusclops', 38000, 54),
                new GymPokemon('Spinarak', 38000, 53),
                new GymPokemon('Machoke', 38000, 53),
            ], { weight: 1, requirement: new ClearDungeonRequirement(125, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less)}, 'Trudly', '(trudly)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Seviper', 38000, 20),
                new GymPokemon('Snorunt', 38000, 20, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Golbat', 38000, 22),
                new GymPokemon('Mightyena', 38000, 21),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 12)}, 'Exinn', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Murkrow', 38000, 22),
                new GymPokemon('Pineco', 38000, 20, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Ariados', 38000, 22),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 12)}, 'Gonrag', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Poochyena', 38000, 22),
                new GymPokemon('Magnemite', 38000, 21),
                new GymPokemon('Staryu', 38000, 21),
                new GymPokemon('Absol', 38000, 21),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)]) }, 'Ertlig', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Duskull', 38000, 21),
                new GymPokemon('Corphish', 38000, 20),
                new GymPokemon('Qwilfish', 38000, 21),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(175, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)]) }, 'Forgs', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Sudowoodo', 38000, 20),
                new GymPokemon('Clamperl', 38000, 21),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)]) }, 'Pellim', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Mightyena', 38000, 21),
                new GymPokemon('Goldeen', 38000, 21),
                new GymPokemon('Carvanha', 38000, 21),
                new GymPokemon('Koffing', 38000, 21),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(225, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)]) }, 'Fenton', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Shuppet', 38000, 21),
                new GymPokemon('Teddiursa', 38000, 21),
                new GymPokemon('Corsola', 38000, 21),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)]) }, 'Ezoor', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Volbeat', 38000, 20),
                new GymPokemon('Illumise', 38000, 20),
                new GymPokemon('Spoink', 38000, 21),
                new GymPokemon('Seviper', 38000, 21),
                new GymPokemon('Wailmer', 38000, 22),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(275, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)]) }, 'Kepen', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Nuzleaf', 38000, 23),
                new GymPokemon('Torkoal', 38000, 22),
                new GymPokemon('Swinub', 38000, 22, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 12)}, 'Greck', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Slugma', 38000, 20),
                new GymPokemon('Numel', 38000, 20),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)])}, 'Resix', 'Resix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Horsea', 38000, 21),
                new GymPokemon('Goldeen', 38000, 20),
                new GymPokemon('Beldum', 38000, 19),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(325, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)])}, 'Blusix', 'Blusix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Noctowl', 38000, 20),
                new GymPokemon('Vigoroth', 38000, 20),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)])}, 'Browsix', 'Browsix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Chinchou', 38000, 20),
                new GymPokemon('Electrike', 38000, 20),
                new GymPokemon('Magnemite', 38000, 20),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(375, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)])}, 'Yellosix', 'Yellosix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Grimer', 38000, 20),
                new GymPokemon('Koffing', 38000, 20),
                new GymPokemon('Tentacool', 38000, 20),
                new GymPokemon('Zubat', 38000, 20),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)])}, 'Purpsix', 'Purpsix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Lotad', 38000, 19),
                new GymPokemon('Oddish', 38000, 18),
                new GymPokemon('Cacnea', 38000, 18),
                new GymPokemon('Shroomish', 38000, 19),
                new GymPokemon('Pineco', 38000, 20),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(425, GameConstants.getDungeonIndex('Phenac City Battles'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 12)])}, 'Greesix', 'Greesix'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Splash Plate'},
            {loot: 'Meadow Plate'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Revive'},
            {loot: 'Charcoal'},
            {loot: 'Miracle_Seed'},
            {loot: 'Mystic_Water'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Phenac City Battles'))}],
    },
    570000,
    [
        new DungeonTrainer('Miror B. Peon',
            [
                new GymPokemon('Duskull', 870000, 25),
                new GymPokemon('Spinarak', 870000, 25),
                new GymPokemon('Makuhita', 870000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Trudly', '(trudly)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Kirlia', 23925000, 22),
                new GymPokemon('Linoone', 23925000, 20),
                new GymPokemon('Natu', 23925000, 22, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 12)}, 'Eloin', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Remoraid', 23925000, 22),
                new GymPokemon('Golbat', 23925000, 20),
                new GymPokemon('Roselia', 23925000, 22, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 12)}, 'Fasin', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Kadabra', 21125000, 22),
                new GymPokemon('Sneasel', 21125000, 22),
                new GymPokemon('Misdreavus', 21125000, 22),
                new GymPokemon('Meowth', 21125000, 22, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 12)}, 'Fostin', 'XD (male)'),
    ],
    38000, 110);

dungeonList['Pyrite Town Battles'] = new Dungeon('Pyrite Town Battles',
    [
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Sentret', 41000, 25),
                new GymPokemon('Taillow', 41000, 25),
                new GymPokemon('Slaking', 41000, 26),
            ], { weight: 1, requirement: new ClearDungeonRequirement(25, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Calda', '(male)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Gulpin', 41000, 27),
                new GymPokemon('Zubat', 41000, 27),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Emok', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Skitty', 41000, 28),
                new GymPokemon('Zigzagoon', 41000, 28),
                new GymPokemon('Misdreavus', 41000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Vant', '(male)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Psyduck', 41000, 29),
                new GymPokemon('Quagsire', 41000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Divel'),
        new DungeonTrainer('Roller Boy',
            [
                new GymPokemon('Igglybuff', 41000, 28),
                new GymPokemon('Azurill', 41000, 27),
                new GymPokemon('Swablu', 41000, 27),
                new GymPokemon('Slugma', 41000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Lon'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Ledyba', 41000, 27),
                new GymPokemon('Wingull', 41000, 27),
                new GymPokemon('Noctowl', 41000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Nover', '(male)'),
        new DungeonTrainer('Street Performer',
            [
                new GymPokemon('Shroomish', 41000, 29),
                new GymPokemon('Flaaffy', 41000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Diogo'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Oddish', 41000, 26),
                new GymPokemon('Dustox', 41000, 26),
                new GymPokemon('Skiploom', 41000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Leba', '(female)'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Beldum', 41000, 34),
                new GymPokemon('Aron', 41000, 35),
            ], { weight: 1, requirement: new ClearDungeonRequirement(75, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Hadar', '(male)'),
        new DungeonTrainer('Rogue',
            [
                new GymPokemon('Snubbull', 41000, 35),
                new GymPokemon('Kirlia', 41000, 35),
                new GymPokemon('Nuzleaf', 41000, 35),
                new GymPokemon('Machop', 41000, 35),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Cail', 'Cail'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Furret', 41000, 35),
                new GymPokemon('Taillow', 41000, 32),
                new GymPokemon('Slakoth', 41000, 21),
            ], { weight: 1, requirement: new ClearDungeonRequirement(125, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Calda', '(male)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Gulpin', 41000, 36),
                new GymPokemon('Golbat', 41000, 36),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Emok', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Skitty', 41000, 28),
                new GymPokemon('Zigzagoon', 41000, 28),
                new GymPokemon('Shuppet', 41000, 29),
            ], { weight: 1, requirement: new ClearDungeonRequirement(175, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Vant', '(male)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Psyduck', 41000, 29),
                new GymPokemon('Horsea', 41000, 30),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Divel'),
        new DungeonTrainer('Roller Boy',
            [
                new GymPokemon('Igglybuff', 41000, 28),
                new GymPokemon('Numel', 41000, 25),
                new GymPokemon('Azurill', 41000, 27),
                new GymPokemon('Swablu', 41000, 27),
            ], { weight: 1, requirement: new ClearDungeonRequirement(225, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Lon'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Doduo', 41000, 26),
                new GymPokemon('Ledyba', 41000, 27),
                new GymPokemon('Wingull', 41000, 27),
            ], { weight: 1, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Nover', '(male)'),
        new DungeonTrainer('Street Performer',
            [
                new GymPokemon('Pichu', 41000, 27),
                new GymPokemon('Shroomish', 41000, 26),
            ], { weight: 1, requirement: new ClearDungeonRequirement(275, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Diogo'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Sunkern', 41000, 28),
                new GymPokemon('Oddish', 41000, 26),
                new GymPokemon('Dustox', 41000, 26),
            ], { weight: 1, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Pyrite Town Battles'), GameConstants.AchievementOption.less)}, 'Leba', '(female)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Joy_Scent', ignoreDebuff : true},
            {loot: 'Toxic Plate'},
            {loot: 'Spooky Plate'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Revive'},
            {loot: 'Spell_Tag'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Pyrite Town Battles'))}],
    },
    580000,
    [
        new DungeonTrainer('Rogue',
            [
                new GymPokemon('Machop', 900000, 29),
                new GymPokemon('Seedot', 900000, 29),
                new GymPokemon('Ralts', 900000, 29),
                new GymPokemon('Furret', 900000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Cail', 'Cail'),
    ],
    41000, 116);

dungeonList['Pyrite Colosseum'] = new Dungeon('Pyrite Colosseum',
    [
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Barboach', 43000, 30),
                new GymPokemon('Sandshrew', 43000, 31),
            ], { weight: 1}, 'Hoks', '(male)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Natu', 43000, 30),
                new GymPokemon('Meditite', 43000, 30),
            ], { weight: 1}, 'Tisler', '(female)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Electrike', 43000, 30),
                new GymPokemon('Cacnea', 43000, 31),
                new GymPokemon('Vulpix', 43000, 31),
            ], { weight: 1}, 'Vilch'),
    ],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Grey Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Joy_Scent', ignoreDebuff : true},
            {loot: 'Icicle Plate'},
            {loot: 'Zap Plate'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Revive'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Pyrite Colosseum'))}],
    },
    620000,
    [
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Bagon', 940000, 32),
                new GymPokemon('Goldeen', 940000, 32),
                new GymPokemon('Magnemite', 940000, 31),
                new GymPokemon('Delibird', 940000, 34),
            ], { weight: 0.25}, 'Mirez', '(male)'),
    ],
    43000, 121);

dungeonList['Pyrite Building'] = new Dungeon('Pyrite Building',
    [
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Yanma', 45000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Pineco', 45000, 32),
                new GymPokemon('Nincada', 45000, 31),
                new GymPokemon('Surskit', 45000, 32),
            ], { weight: 0.5 }, 'Nore', '(male)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Phanpy', 45000, 31),
                new GymPokemon('Trapinch', 45000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(25, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less)}, 'Kai', '(female)'),
        new DungeonTrainer('Roller Boy',
            [
                new GymPokemon('Taillow', 45000, 33),
                new GymPokemon('Hoothoot', 45000, 34),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less) }, 'Pike'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Larvitar', 45000, 31),
                new GymPokemon('Barboach', 45000, 32),
                new GymPokemon('Carvanha', 45000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(75, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less) }, 'Geats'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Wingull', 45000, 32),
                new GymPokemon('Wooper', 45000, 33),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less) }, 'Loba'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Electrike', 45000, 31),
                new GymPokemon('Voltorb', 45000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(125, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less) }, 'Akmen', '(male)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Doduo', 45000, 32),
                new GymPokemon('Ledyba', 45000, 32),
                new GymPokemon('Swablu', 45000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less) }, 'Raleen', '(female)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Spheal', 45000, 31),
                new GymPokemon('Snorunt', 45000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(175, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less) }, 'Tura', '(male)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Horsea', 45000, 31),
                new GymPokemon('Oddish', 45000, 32),
                new GymPokemon('Sandshrew', 45000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less) }, 'Toti', '(female)'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Cacnea', 45000, 32),
                new GymPokemon('Tentacool', 45000, 33),
            ], { weight: 1, requirement: new ClearDungeonRequirement(225, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less) }, 'Elidi', '(female)'),
        new DungeonTrainer('Miror B. Peon',
            [
                new GymPokemon('Remoraid', 45000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Spinarak', 45000, 33),
                new GymPokemon('Luvdisc', 45000, 32),
            ], { weight: 0.5 }, 'Reath', '(reath)'),
        new DungeonTrainer('Miror B. Peon',
            [
                new GymPokemon('Mantine', 45000, 28, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Aipom', 45000, 28),
                new GymPokemon('Furret', 45000, 28),
                new GymPokemon('Yanma', 45000, 28),
            ], { weight: 0.5 }, 'Ferma', '(ferma)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Carvanha', 45000, 18),
                new GymPokemon('Barboach', 45000, 17),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 10)]) }, 'Rett', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Corphish', 45000, 18),
                new GymPokemon('Electrike', 45000, 17),
                new GymPokemon('Grimer', 45000, 18),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(275, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 10)]) }, 'Mocor', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Kecleon', 45000, 19),
                new GymPokemon('Surskit', 45000, 21),
                new GymPokemon('Makuhita', 45000, 18, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 10)}, 'Torkin', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Doduo', 45000, 20),
                new GymPokemon('Tentacool', 45000, 18),
                new GymPokemon('Chimecho', 45000, 20),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 10)]) }, 'Elox', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Qwilfish', 45000, 19),
                new GymPokemon('Rhyhorn', 45000, 20),
                new GymPokemon('Chinchou', 45000, 20),
                new GymPokemon('Koffing', 45000, 20),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(325, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 10)]) }, 'Rixor', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Spinarak', 45000, 20),
                new GymPokemon('Beautifly', 45000, 19),
                new GymPokemon('Dustox', 45000, 20),
                new GymPokemon('Vulpix', 45000, 18, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 10)}, 'Mesin', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Gulpin', 45000, 19),
                new GymPokemon('Mareep', 45000, 18),
                new GymPokemon('Luvdisc', 45000, 20),
                new GymPokemon('Bellossom', 45000, 21),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 10)]) }, 'Dilly', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Furret', 45000, 19),
                new GymPokemon('Zigzagoon', 45000, 20),
                new GymPokemon('Togetic', 45000, 19),
                new GymPokemon('Delibird', 45000, 21),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(375, GameConstants.getDungeonIndex('Pyrite Building'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 10)]) }, 'Edlos', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Sneasel', 45000, 20),
                new GymPokemon('Yanma', 45000, 19),
                new GymPokemon('Misdreavus', 45000, 20),
                new GymPokemon('Duskull', 45000, 18, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 10)}, 'Lobar', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Kadabra', 45000, 20),
                new GymPokemon('Flaaffy', 45000, 19),
                new GymPokemon('Vigoroth', 45000, 20),
                new GymPokemon('Ralts', 45000, 18, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 10)}, 'Feldas', 'XD (male)'),
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
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        epic: [{loot: 'Fastball'}],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Revive'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Pyrite Building'))},
            {loot: 'Vivid_Scent', ignoreDebuff : true},
        ],
    },
    630000,
    [
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Qwilfish', 950000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Goldeen', 950000, 33),
                new GymPokemon('Linoone', 950000, 33),
            ], { weight: 1 }, 'Doken', '(male)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Loudred', 21750000, 23),
                new GymPokemon('Girafarig', 21750000, 23),
                new GymPokemon('Mawile', 21750000, 22, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Raichu', 21750000, 23),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 10)}, 'Commander Exol', '(commander)'),
    ],
    45000, 126);

dungeonList['Pyrite Cave'] = new Dungeon('Pyrite Cave',
    [
        new DungeonTrainer('Street Performer',
            [
                new GymPokemon('Anorith', 46000, 32),
                new GymPokemon('Lotad', 46000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(25, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Simes'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Koffing', 46000, 32),
                new GymPokemon('Ralts', 46000, 31),
                new GymPokemon('Shroomish', 46000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Maiz', '(male)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Meditite', 46000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Bagon', 46000, 33),
                new GymPokemon('Numel', 46000, 32),
            ], { weight: 0.5 }, 'Twan', '(male)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Lotad', 46000, 32),
                new GymPokemon('Whismur', 46000, 33),
                new GymPokemon('Slakoth', 46000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(75, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Valen', '(male)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Geodude', 46000, 32),
                new GymPokemon('Lotad', 46000, 31),
                new GymPokemon('Snorunt', 46000, 32),
                new GymPokemon('Slakoth', 46000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Rehan', '(female)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Lotad', 46000, 32),
                new GymPokemon('Lotad', 46000, 33),
                new GymPokemon('Lotad', 46000, 33),
                new GymPokemon('Lotad', 46000, 33),
            ], { weight: 1, requirement: new ClearDungeonRequirement(125, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Noxy'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Dunsparce', 46000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Mareep', 46000, 34),
                new GymPokemon('Cacnea', 46000, 34),
            ], { weight: 0.5 }, 'Sosh', '(female)'),
        new DungeonTrainer('Roller Boy',
            [
                new GymPokemon('Lotad', 46000, 32),
                new GymPokemon('Lombre', 46000, 33),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Evat'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Swablu', 46000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Lotad', 46000, 31),
                new GymPokemon('Beldum', 46000, 32),
                new GymPokemon('Lombre', 46000, 32),
            ], { weight: 0.5 }, 'Zalo', '(male)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Shuppet', 46000, 33),
                new GymPokemon('Pineco', 46000, 30),
                new GymPokemon('Koffing', 46000, 30),
            ], { weight: 1, requirement: new ClearDungeonRequirement(175, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Derid', '(male)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Zigzagoon', 46000, 32),
                new GymPokemon('Zigzagoon', 46000, 32),
                new GymPokemon('Linoone', 46000, 33),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Meli', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Natu', 46000, 33),
                new GymPokemon('Tentacool', 46000, 32),
                new GymPokemon('Teddiursa', 46000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(225, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Mela', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Lileep', 46000, 32),
                new GymPokemon('Spheal', 46000, 34),
                new GymPokemon('Dustox', 46000, 33),
            ], { weight: 1, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Pyrite Cave'), GameConstants.AchievementOption.less) }, 'Sema', '(female)'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Lombre', 46000, 17),
                new GymPokemon('Lombre', 46000, 17),
                new GymPokemon('Lombre', 46000, 17),
                new GymPokemon('Voltorb', 46000, 19, undefined, undefined, GameConstants.ShadowStatus.Shadow), // Located here as make-up if missed in Temp Battle
            ], { weight: 0.25, requirement: new QuestLineCompletedRequirement('Gale of Darkness')}, 'Miror B.', 'Miror B'),
    ],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Fastball'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Twisted_Spoon'},
            {loot: 'Macho_Brace'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Pyrite Cave'))},
            {loot: 'Carbos', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Pyrite Cave'))},
        ],
    },
    650000,
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Ludicolo', 950000, 28),
                new GymPokemon('Ludicolo', 950000, 29),
                new GymPokemon('Ludicolo', 950000, 31),
                new GymPokemon('Ludicolo', 950000, 30),
                new GymPokemon('Sudowoodo', 950000, 35, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Miror B.', 'Miror B'),
        new DungeonTrainer('Peon',
            [
                new GymPokemon('Seaking', 950000, 39),
                new GymPokemon('Ludicolo', 950000, 39),
                new GymPokemon('Ludicolo', 950000, 39),
                new GymPokemon('Ludicolo', 950000, 39),
                new GymPokemon('Sudowoodo', 950000, 39),
            ], { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('Shadows in the Desert')}, 'Mirakle B.', '(mirakle b)'),
    ],
    46000, 131);

dungeonList['Relic Cave'] = new Dungeon('Relic Cave',
    [
        new DungeonTrainer('Old Man',
            [
                new GymPokemon('Machop', 48000, 34),
                new GymPokemon('Beldum', 48000, 35),
                new GymPokemon('Lombre', 48000, 34),
            ], { weight: 1 }, 'Skof'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Swellow', 48000, 39),
                new GymPokemon('Rhyhorn', 48000, 39),
                new GymPokemon('Sunflora', 48000, 40),
            ], { weight: 1 }, 'Dury', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Spheal', 48000, 33),
                new GymPokemon('Carvanha', 48000, 34),
            ], { weight: 1 }, 'Doven', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Shroomish', 48000, 34),
                new GymPokemon('Cacnea', 48000, 34),
            ], { weight: 1 }, 'Silton', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Baltoy', 48000, 35),
                new GymPokemon('Ralts', 48000, 35),
                new GymPokemon('Kirlia', 48000, 35),
            ], { weight: 1 }, 'Kass', '(female)'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Lombre', 48000, 39),
                new GymPokemon('Lombre', 48000, 39),
                new GymPokemon('Lombre', 48000, 39),
                new GymPokemon('Voltorb', 48000, 39, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25,  requirement: new QuestLineCompletedRequirement('Gale of Darkness') }, 'Miror B.', 'Miror B'),
    ],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Fist Plate'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Silver_Powder'},
            {loot: 'Silk_Scarf'},
        ],
        mythic: [
            {loot: 'Lum'},
            {loot: 'Vivid_Scent', ignoreDebuff : true},
        ],
    },
    665000,
    [
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Wynaut', 960000, 37),
                new GymPokemon('Clamperl', 960000, 38),
                new GymPokemon('Geodude', 960000, 38),
                new GymPokemon('Hitmontop', 960000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Skrub', '(male)'),
    ],
    48000, 131);

dungeonList['Mt. Battle'] = new Dungeon('Mt. Battle',
    [
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Trapinch', 52000, 35),
                new GymPokemon('Numel', 52000, 34),
                new GymPokemon('Sandshrew', 52000, 35),
            ], { weight: 1 }, 'Turo', '(male)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Swinub', 52000, 35),
                new GymPokemon('Baltoy', 52000, 36),
                new GymPokemon('Larvitar', 52000, 37),
            ], { weight: 1 }, 'Drovic', '(male)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Sandshrew', 52000, 37),
                new GymPokemon('Geodude', 52000, 36),
                new GymPokemon('Numel', 52000, 36),
            ], { weight: 1 }, 'Kimit', '(female)'),
        new DungeonTrainer('Athlete',
            [
                new GymPokemon('Pikachu', 52000, 40),
                new GymPokemon('Vulpix', 52000, 39),
                new GymPokemon('Abra', 52000, 38),
            ], { weight: 1 }, 'Aidel', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Pineco', 52000, 35),
                new GymPokemon('Baltoy', 52000, 35),
                new GymPokemon('Houndour', 52000, 37),
                new GymPokemon('Graveler', 52000, 37),
            ], { weight: 1 }, 'Riden', '(male)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Trapinch', 52000, 38),
                new GymPokemon('Barboach', 52000, 36),
                new GymPokemon('Trapinch', 52000, 38),
                new GymPokemon('Lileep', 52000, 36),
            ], { weight: 1 }, 'Telia', '(female)'),
        new DungeonTrainer('Street Performer',
            [
                new GymPokemon('Cacnea', 52000, 37),
                new GymPokemon('Spinda', 52000, 3),
                new GymPokemon('Kadabra', 52000, 37),
            ], { weight: 1 }, 'Nortz'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Graveler', 52000, 36),
                new GymPokemon('Sandslash', 52000, 37),
                new GymPokemon('Vibrava', 52000, 37),
            ], { weight: 1 }, 'Weeg', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Houndour', 52000, 37),
                new GymPokemon('Duskull', 52000, 36),
                new GymPokemon('Koffing', 52000, 37),
                new GymPokemon('Kirlia', 52000, 36),
            ], { weight: 1 }, 'Kison', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Geodude', 52000, 36),
                new GymPokemon('Geodude', 52000, 36),
                new GymPokemon('Sandslash', 52000, 38),
            ], { weight: 1 }, 'Berin', '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Grey Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'LargeRestore'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Charcoal'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Mt. Battle'))},
            {loot: 'Carbos', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Mt. Battle'))},
        ],
    },
    680000,
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Metang', 999000, 37),
                new GymPokemon('Golem', 999000, 38),
                new GymPokemon('Marshtomp', 999000, 38),
                new GymPokemon('Camerupt', 999000, 38),
                new GymPokemon('Entei', 999000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Dakim', 'Dakim'),
    ],
    52000, 131);

dungeonList['The Under'] = new Dungeon('The Under',
    [
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Skitty', 57000, 35),
                new GymPokemon('Oddish', 57000, 34),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('The Under'), GameConstants.AchievementOption.less) }, 'Zada', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Magikarp', 57000, 36),
                new GymPokemon('Wailord', 57000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('The Under'), GameConstants.AchievementOption.less) }, 'Gurks', '(male)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Skitty', 57000, 35),
                new GymPokemon('Oddish', 57000, 34),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('The Under'), GameConstants.AchievementOption.less) }, 'Zada', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Feebas', 57000, 36),
                new GymPokemon('Wailord', 57000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('The Under'), GameConstants.AchievementOption.less) }, 'Gurks', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Ledian', 57000, 40, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Volbeat', 57000, 38),
                new GymPokemon('Spinarak', 57000, 39),
            ], { weight: 0.25 }, 'Kloak', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Ariados', 57000, 38),
                new GymPokemon('Illumise', 57000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('The Under'), GameConstants.AchievementOption.less) }, 'Dagur', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Gloom', 57000, 39),
                new GymPokemon('Illumise', 57000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('The Under'), GameConstants.AchievementOption.less) }, 'Dagur', '(female)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Shroomish', 57000, 35),
                new GymPokemon('Jigglypuff', 57000, 38),
                new GymPokemon('Teddiursa', 57000, 37),
                new GymPokemon('Gligar', 57000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Frena', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Kirlia', 57000, 37),
                new GymPokemon('Gloom', 57000, 38),
                new GymPokemon('Roselia', 57000, 38),
                new GymPokemon('Stantler', 57000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Liaks', '(female)'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Octillery', 57000, 38),
                new GymPokemon('Dunsparce', 57000, 39),
                new GymPokemon('Masquerain', 57000, 38),
                new GymPokemon('Piloswine', 57000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Lonia', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Loudred', 57000, 41),
                new GymPokemon('Seviper', 57000, 40),
                new GymPokemon('Corsola', 57000, 41),
                new GymPokemon('Sneasel', 57000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Nelis', '(female)'),
    ],
    {
        common: [
            {loot: 'Lucky_incense'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'LargeRestore'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Black_Glasses'},
            {loot: 'Timerball'},
            {loot: 'Soft_Sand'},
        ],
        mythic: [
            {loot: 'Carbos', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('The Under'))},
            {loot: 'Vivid_Scent', ignoreDebuff : true},
        ],
    },
    740000,
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Delcatty', 1010000, 45),
                new GymPokemon('Steelix', 1010000, 45),
                new GymPokemon('Banette', 1010000, 45),
                new GymPokemon('Vileplume', 1010000, 44),
                new GymPokemon('Suicune', 1010000, 40, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Venus', 'Venus'),
    ],
    57000, 131);

dungeonList['Cipher Lab'] = new Dungeon('Cipher Lab',
    [
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Voltorb', 62000, 38),
                new GymPokemon('Voltorb', 62000, 38),
            ], { weight: 1 }, 'Myron', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Furret', 62000, 37),
                new GymPokemon('Remoraid', 62000, 39),
                new GymPokemon('Castform', 62000, 41),
                new GymPokemon('Aipom', 62000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Cole', '(female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 62000, 39),
                new GymPokemon('Magneton', 62000, 39),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Odlow', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magnemite', 62000, 39),
                new GymPokemon('Magneton', 62000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(75, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Coren', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Chinchou', 62000, 38),
                new GymPokemon('Magnemite', 62000, 37),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Lethco', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 62000, 39),
                new GymPokemon('Magnemite', 62000, 38),
            ], { weight: 1, requirement: new ClearDungeonRequirement(125, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Odlow', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 62000, 40),
                new GymPokemon('Magneton', 62000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Coren', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Chinchou', 62000, 38),
                new GymPokemon('Electrike', 62000, 39),
            ], { weight: 1, requirement: new ClearDungeonRequirement(175, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Lethco', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Nuzleaf', 62000, 38),
                new GymPokemon('Carvanha', 62000, 38),
                new GymPokemon('Houndour', 62000, 38),
                new GymPokemon('Murkrow', 62000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Lare', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Pupitar', 62000, 40),
                new GymPokemon('Zubat', 62000, 40),
                new GymPokemon('Swablu', 62000, 40),
                new GymPokemon('Forretress', 62000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Vana', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Rhyhorn', 62000, 40),
                new GymPokemon('Grovyle', 62000, 40),
                new GymPokemon('Ariados', 62000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Lesar', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Linoone', 62000, 38),
                new GymPokemon('Vigoroth', 62000, 39),
                new GymPokemon('Granbull', 62000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Tanie', '(female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 62000, 37),
                new GymPokemon('Electrode', 62000, 37),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Dubik', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Magneton', 62000, 40),
                new GymPokemon('Ampharos', 62000, 41),
            ], { weight: 1, requirement: new ClearDungeonRequirement(225, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Kotan', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Electrode', 62000, 42),
                new GymPokemon('Ampharos', 62000, 41),
            ], { weight: 1, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less) }, 'Kotan', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Kadabra', 62000, 42),
                new GymPokemon('Swellow', 62000, 42),
                new GymPokemon('Kecleon', 62000, 43),
                new GymPokemon('Vibrava', 62000, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25 }, 'Remil', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Slugma', 62000, 14),
                new GymPokemon('Houndour', 62000, 17, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Resix', 'Resix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Horsea', 62000, 11),
                new GymPokemon('Goldeen', 62000, 12),
                new GymPokemon('Spheal', 62000, 17, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Blusix', 'Blusix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Hoothoot', 62000, 14),
                new GymPokemon('Baltoy', 62000, 17, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Browsix', 'Browsix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Chinchou', 62000, 11),
                new GymPokemon('Electrike', 62000, 12),
                new GymPokemon('Mareep', 62000, 17, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Yellosix', 'Yellosix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Grimer', 62000, 11),
                new GymPokemon('Koffing', 62000, 10),
                new GymPokemon('Tentacool', 62000, 10),
                new GymPokemon('Gulpin', 62000, 17, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Purpsix', 'Purpsix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Lotad', 62000, 11),
                new GymPokemon('Oddish', 62000, 10),
                new GymPokemon('Cacnea', 62000, 10),
                new GymPokemon('Shroomish', 62000, 10),
                new GymPokemon('Pineco', 62000, 10),
                new GymPokemon('Seedot', 62000, 17, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Greesix', 'Greesix'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Duskull', 62000, 14),
                new GymPokemon('Skitty', 62000, 14),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(275, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Corla', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Doduo', 62000, 13),
                new GymPokemon('Taillow', 62000, 14),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Javion', 'XD (female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Lileep', 62000, 13),
                new GymPokemon('Anorith', 62000, 13),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(325, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Mesak', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Swinub', 62000, 14),
                new GymPokemon('Shuppet', 62000, 13),
                new GymPokemon('Spinarak', 62000, 14, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Nexir', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Ralts', 62000, 14),
                new GymPokemon('Voltorb', 62000, 13),
                new GymPokemon('Bagon', 62000, 13),
                new GymPokemon('Numel', 62000, 14, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Solox', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Snorunt', 62000, 14),
                new GymPokemon('Barboach', 62000, 14),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Crink', 'XD (male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Spoink', 62000, 16),
                new GymPokemon('Lotad', 62000, 14),
                new GymPokemon('Staryu', 62000, 14),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(375, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Morbit', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Natu', 62000, 16),
                new GymPokemon('Nincada', 62000, 14),
                new GymPokemon('Wailmer', 62000, 15),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Meda', 'XD (female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Swablu', 62000, 17),
                new GymPokemon('Wynaut', 62000, 16),
                new GymPokemon('Corsola', 62000, 15),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(425, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Elrok', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Dustox', 62000, 14),
                new GymPokemon('Wingull', 62000, 17),
                new GymPokemon('Pineco', 62000, 16),
                new GymPokemon('Qwilfish', 62000, 15),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Coffy', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Abra', 62000, 17),
                new GymPokemon('Machop', 62000, 16),
                new GymPokemon('Feebas', 62000, 16),
                new GymPokemon('Makuhita', 62000, 16),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(475, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Digor', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Carvanha', 62000, 15, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Magnemite', 62000, 15),
                new GymPokemon('Psyduck', 62000, 15),
                new GymPokemon('Remoraid', 62000, 16),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Cabol', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Jigglypuff', 62000, 15),
                new GymPokemon('Chimecho', 62000, 17),
                new GymPokemon('Dunsparce', 62000, 16),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(500, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Nopia', 'XD (female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Shroomish', 62000, 15, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Snubbull', 62000, 16),
                new GymPokemon('Kecleon', 62000, 16),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6) }, 'Klots', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Clamperl', 62000, 13),
                new GymPokemon('Corphish', 62000, 14),
                new GymPokemon('Zubat', 62000, 15),
            ], { weight: 1, requirement: new MultiRequirement([new ClearDungeonRequirement(525, GameConstants.getDungeonIndex('Cipher Lab'), GameConstants.AchievementOption.less), new QuestLineStepCompletedRequirement('Gale of Darkness', 6)]) }, 'Tekot', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Beldum', 62000, 18),
                new GymPokemon('Murkrow', 62000, 18),
                new GymPokemon('Teddiursa', 62000, 18, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Rhyhorn', 62000, 18),
            ], { weight: 0.25, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6) }, 'Naps', '(yellow)'),
    ],
    {
        common: [
            {loot: 'Token_collector'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Diveball'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Dragon_Fang'},
            {loot: 'Silver_Powder'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Cipher Lab'))},
            {loot: 'Carbos', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Cipher Lab'))},
        ],
    },
    800000,
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Golbat', 1060000, 48),
                new GymPokemon('Huntail', 1060000, 47),
                new GymPokemon('Lanturn', 1060000, 47),
                new GymPokemon('Altaria', 1060000, 46),
                new GymPokemon('Raikou', 1060000, 40, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Ein', 'Ein'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Luvdisc', 17400000, 20),
                new GymPokemon('Beautifly', 17400000, 19),
                new GymPokemon('Roselia', 17400000, 19),
                new GymPokemon('Delcatty', 17400000, 18, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 6)}, 'Lovrina', 'Lovrina'),
    ],
    62000, 131);

dungeonList['Realgam Tower Battles'] = new Dungeon('Realgam Tower Battles',
    [
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Grimer', 70000, 39),
                new GymPokemon('Seviper', 70000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(25, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Bopen', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Dustox', 70000, 38),
                new GymPokemon('Seviper', 70000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Bopen', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Delibird', 70000, 45, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Piloswine', 70000, 42),
                new GymPokemon('Glalie', 70000, 42),
            ], { weight: 0.5 }, 'Arton', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Sunflora', 70000, 45, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Jumpluff', 70000, 42),
                new GymPokemon('Gloom', 70000, 41),
            ], { weight: 0.5 }, 'Baila', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Masquerain', 70000, 42),
                new GymPokemon('Ariados', 70000, 41),
                new GymPokemon('Heracross', 70000, 45, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.5 }, 'Dioge', '(male)'),
        new DungeonTrainer('Mystery Troop Green',
            [
                new GymPokemon('Muk', 70000, 45),
                new GymPokemon('Grumpig', 70000, 44),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Verde'),
        new DungeonTrainer('Mystery Troop Red',
            [
                new GymPokemon('Muk', 70000, 45),
                new GymPokemon('Grumpig', 70000, 44),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Rosso'),
        new DungeonTrainer('Mystery Troop Blue',
            [
                new GymPokemon('Muk', 70000, 45),
                new GymPokemon('Grumpig', 70000, 44),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Bluno'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Shelgon', 70000, 40),
                new GymPokemon('Vigoroth', 70000, 41),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Rugen', '(male)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Hariyama', 70000, 41),
                new GymPokemon('Lombre', 70000, 42),
            ], { weight: 1, requirement: new ClearDungeonRequirement(175, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Klest'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Nuzleaf', 70000, 39),
                new GymPokemon('Graveler', 70000, 42),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Klest'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Metang', 70000, 39),
                new GymPokemon('Mawile', 70000, 40),
                new GymPokemon('Lairon', 70000, 41),
            ], { weight: 1, requirement: new ClearDungeonRequirement(225, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Aline', '(female)'),
        new DungeonTrainer('Street Performer',
            [
                new GymPokemon('Seadra', 70000, 39),
                new GymPokemon('Feraligatr', 70000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Luper'),
        new DungeonTrainer('Street Performer',
            [
                new GymPokemon('Qwilfish', 70000, 40),
                new GymPokemon('Octillery', 70000, 39),
            ], { weight: 1, requirement: new ClearDungeonRequirement(275, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Luper'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Loudred', 70000, 45),
                new GymPokemon('Wigglytuff', 70000, 43),
            ], { weight: 1, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Givern', '(male)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Ninetales', 70000, 40),
                new GymPokemon('Machoke', 70000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(325, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Trus', '(male)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Swellow', 70000, 40),
                new GymPokemon('Magneton', 70000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Trus', '(male)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Quagsire', 70000, 41),
                new GymPokemon('Donphan', 70000, 40),
                new GymPokemon('Sandslash', 70000, 40),
            ], { weight: 1, requirement: new ClearDungeonRequirement(375, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Kevel', '(male)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Swalot', 70000, 40),
                new GymPokemon('Chimecho', 70000, 41),
            ], { weight: 1, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Elose', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Cradily', 70000, 41),
                new GymPokemon('Noctowl', 70000, 41),
            ], { weight: 1, requirement: new ClearDungeonRequirement(425, GameConstants.getDungeonIndex('Realgam Tower Battles'), GameConstants.AchievementOption.less) }, 'Elose', '(female)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        epic: [{loot: 'Lureball'}],
        legendary: [
            {loot: 'Never_Melt_Ice'},
            {loot: 'Sharp_Beak'},
        ],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Realgam Tower Battles'))},
            {loot: 'Carbos', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Realgam Tower Battles'))},
            {loot: 'Vivid_Scent', ignoreDebuff : true},
        ],
    },
    850000,
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Crobat', 1100000, 48),
                new GymPokemon('Pelipper', 1100000, 49),
                new GymPokemon('Rhydon', 1100000, 50),
                new GymPokemon('Starmie', 1100000, 49),
                new GymPokemon('Manectric', 1100000, 50),
            ], { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('Shadows in the Desert', GameConstants.AchievementOption.less) }, 'Ein', 'Ein'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Ludicolo', 1100000, 44),
                new GymPokemon('Ludicolo', 1100000, 45),
                new GymPokemon('Loudred', 1100000, 46),
                new GymPokemon('Golduck', 1100000, 45),
                new GymPokemon('Armaldo', 1100000, 43),
            ], { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('Shadows in the Desert', GameConstants.AchievementOption.less) }, 'Miror B.', 'Miror B'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Claydol', 1100000, 46),
                new GymPokemon('Forretress', 1100000, 45),
                new GymPokemon('Flygon', 1100000, 46),
                new GymPokemon('Whiscash', 1100000, 46),
                new GymPokemon('Houndoom', 1100000, 47),
            ], { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('Shadows in the Desert', GameConstants.AchievementOption.less) }, 'Dakim', 'Dakim'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Bellossom', 1100000, 47),
                new GymPokemon('Misdreavus', 1100000, 47),
                new GymPokemon('Raichu', 1100000, 48),
                new GymPokemon('Wigglytuff', 1100000, 48),
                new GymPokemon('Milotic', 1100000, 48),
            ], { weight: 1, hide: true,  requirement: new QuestLineCompletedRequirement('Shadows in the Desert', GameConstants.AchievementOption.less) }, 'Venus', 'Venus'),
        new DungeonTrainer('Snagem Head',
            [
                new GymPokemon('Crawdaunt', 1100000, 47),
                new GymPokemon('Shiftry', 1100000, 47),
                new GymPokemon('Pinsir', 1100000, 48),
                new GymPokemon('Hariyama', 1100000, 48),
                new GymPokemon('Skarmory', 1100000, 48, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Gonzap', '(gonzap)'),
    ],
    70000, 131);

dungeonList['Realgam Colosseum'] = new Dungeon('Realgam Colosseum',
    [
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Porygon2', 75200, 45),
                new GymPokemon('Zangoose', 75200, 45),
                new GymPokemon('Miltank', 75200, 48, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.5 }, 'Jomas', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Mightyena', 75200, 46),
                new GymPokemon('Sharpedo', 75200, 47),
                new GymPokemon('Absol', 75200, 48, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.5 }, 'Delan', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Torkoal', 75200, 47),
                new GymPokemon('Magcargo', 75200, 46),
                new GymPokemon('Houndoom', 75200, 48, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.5 }, 'Nella', '(female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Cradily', 75200, 48),
                new GymPokemon('Vileplume', 75200, 48),
                new GymPokemon('Cacturne', 75200, 49),
                new GymPokemon('Tropius', 75200, 49, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.5 }, 'Ston', '(male)'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Lombre', 75200, 48),
                new GymPokemon('Lombre', 75200, 48),
                new GymPokemon('Lombre', 75200, 49),
                new GymPokemon('Nosepass', 75200, 49, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Ludicolo', 75200, 49),
            ], { weight: 0.5,  requirement: new QuestLineCompletedRequirement('Gale of Darkness') }, 'Miror B.', 'Miror B'),
    ],
    {
        common: [
            {loot: 'Lucky_incense'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        epic: [{loot: 'Ultraball'}],
        legendary: [
            {loot: 'Macho_Brace'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Realgam Colosseum'))},
            {loot: 'Carbos', requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Realgam Colosseum'))},
        ],
    },
    1010000,
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Dusclops', 1280000, 55),
                new GymPokemon('Gardevoir', 1280000, 55),
                new GymPokemon('Blaziken', 1280000, 54),
                new GymPokemon('Xatu', 1280000, 54),
                new GymPokemon('Walrein', 1280000, 56),
                new GymPokemon('Metagross', 1280000, 50, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Nascour', '(nascour)'),
        new DungeonTrainer('Cipher Head',
            [
                new GymPokemon('Slowking', 1280000, 61),
                new GymPokemon('Scizor', 1280000, 60),
                new GymPokemon('Machamp', 1280000, 61),
                new GymPokemon('Salamence', 1280000, 60),
                new GymPokemon('Slaking', 1280000, 60),
                new GymPokemon('Tyranitar', 1280000, 55, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Evice', '(evice)'),
    ],
    75200, 134);

dungeonList['Snagem Hideout'] = new Dungeon('Snagem Hideout',
    [
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Lanturn', 80200, 50),
                new GymPokemon('Starmie', 80200, 52),
            ], { weight: 1, requirement: new ClearDungeonRequirement(25, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Driton'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Shelgon', 80200, 54),
                new GymPokemon('Carvanha', 80200, 51),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Colas', '(male)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Weezing', 80200, 52),
                new GymPokemon('Swalot', 80200, 51),
            ], { weight: 1, requirement: new ClearDungeonRequirement(75, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Crudo'),
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Vigoroth', 80200, 52),
                new GymPokemon('Zangoose', 80200, 53),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Niver'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Mightyena', 80200, 50),
                new GymPokemon('Linoone', 80200, 53),
            ], { weight: 1, requirement: new ClearDungeonRequirement(125, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Rions', '(male)'),
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Swellow', 80200, 54),
                new GymPokemon('Golbat', 80200, 53),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Fuston'),
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Seadra', 80200, 55),
                new GymPokemon('Pelipper', 80200, 53),
            ], { weight: 1, requirement: new ClearDungeonRequirement(175, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Driton'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Pupitar', 80200, 54),
                new GymPokemon('Spinda', 80200, 51),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Colas', '(male)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Sandslash', 80200, 53),
                new GymPokemon('Linoone', 80200, 55),
            ], { weight: 1, requirement: new ClearDungeonRequirement(225, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Crudo'),
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Grovyle', 80200, 52),
                new GymPokemon('Rhyhorn', 80200, 52),
            ], { weight: 1, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Niver'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Poochyena', 80200, 54),
                new GymPokemon('Kadabra', 80200, 53),
            ], { weight: 1, requirement: new ClearDungeonRequirement(275, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Rions', '(male)'),
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Beautifly', 80200, 53),
                new GymPokemon('Delibird', 80200, 54),
            ], { weight: 1, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Fuston'),
        new DungeonTrainer('Mystery Troop Green',
            [
                new GymPokemon('Muk', 80200, 55),
                new GymPokemon('Grumpig', 80200, 54),
                new GymPokemon('Sharpedo', 80200, 53),
                new GymPokemon('Bayleef', 80200, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Verde'),
        new DungeonTrainer('Mystery Troop Red',
            [
                new GymPokemon('Muk', 80200, 55),
                new GymPokemon('Grumpig', 80200, 54),
                new GymPokemon('Breloom', 80200, 53),
                new GymPokemon('Quilava', 80200, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Rosso'),
        new DungeonTrainer('Mystery Troop Blue',
            [
                new GymPokemon('Muk', 80200, 55),
                new GymPokemon('Grumpig', 80200, 54),
                new GymPokemon('Camerupt', 80200, 53),
                new GymPokemon('Croconaw', 80200, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Bluno'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Octillery', 80200, 54),
                new GymPokemon('Walrein', 80200, 52),
            ], { weight: 1, requirement: new ClearDungeonRequirement(325, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Lonia', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Seviper', 80200, 52),
                new GymPokemon('Sharpedo', 80200, 50),
            ], { weight: 1, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Nelis', '(female)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Mawile', 80200, 53),
                new GymPokemon('Donphan', 80200, 51),
            ], { weight: 1, requirement: new ClearDungeonRequirement(375, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Frena', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Jumpluff', 80200, 53),
                new GymPokemon('Noctowl', 80200, 52),
            ], { weight: 1, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Liaks', '(female)'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Flaaffy', 80200, 55),
                new GymPokemon('Dunsparce', 80200, 51),
            ], { weight: 1, requirement: new ClearDungeonRequirement(425, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Lonia', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Corsola', 80200, 51),
                new GymPokemon('Loudred', 80200, 54),
            ], { weight: 1, requirement: new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Nelis', '(female)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Jigglypuff', 80200, 52),
                new GymPokemon('Shroomish', 80200, 53),
            ], { weight: 1, requirement: new ClearDungeonRequirement(475, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Frena', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Gloom', 80200, 53),
                new GymPokemon('Golduck', 80200, 53),
            ], { weight: 1, requirement: new ClearDungeonRequirement(500, GameConstants.getDungeonIndex('Snagem Hideout'), GameConstants.AchievementOption.less) }, 'Liaks', '(female)'),
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Smeargle', 80200, 52),
                new GymPokemon('Smeargle', 80200, 51),
                new GymPokemon('Smeargle', 80200, 50),
                new GymPokemon('Smeargle', 80200, 45, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Biden'),
        new DungeonTrainer('Team Snagem',
            [
                new GymPokemon('Marshtomp', 80200, 55),
                new GymPokemon('Machoke', 80200, 52),
                new GymPokemon('Shiftry', 80200, 50),
                new GymPokemon('Ursaring', 80200, 45, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Agrev'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Red Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        epic: [{loot: 'Timerball'}],
        legendary: [
            {loot: 'Max Revive'},
            {loot: 'Miracle_Seed'},
            {loot: 'Mystic_Water'},
            {loot: 'Charcoal'},
        ],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Snagem Hideout'))},
            {loot: 'Carbos', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Snagem Hideout'))},
            {loot: 'Vivid_Scent', ignoreDebuff : true},
        ],
    },
    1310000,
    [
        new DungeonTrainer('Snagem Head',
            [
                new GymPokemon('Breloom', 1500000, 64),
                new GymPokemon('Crawdaunt', 1500000, 64),
                new GymPokemon('Granbull', 1500000, 64),
                new GymPokemon('Armaldo', 1500000, 64),
                new GymPokemon('Machamp', 1500000, 64),
                new GymPokemon('Skarmory', 1500000, 64, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Gonzap', '(gonzap)'),
    ],
    80200, 134);

dungeonList['Deep Colosseum'] = new Dungeon('Deep Colosseum',
    [
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Tropius', 88800, 61),
                new GymPokemon('Zangoose', 88800, 60),
                new GymPokemon('Nuzleaf', 88800, 60),
            ], { weight: 1}, 'Dewig', '(male)'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Typhlosion', 88800, 61),
                new GymPokemon('Vigoroth', 88800, 61),
                new GymPokemon('Hariyama', 88800, 62),
            ], { weight: 1}, 'Palen', '(female)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Houndour', 88800, 62),
                new GymPokemon('Dodrio', 88800, 62),
            ], { weight: 1}, 'Toway', '(male)'),
        new DungeonTrainer('Worker',
            [
                new GymPokemon('Ledian', 88800, 63),
                new GymPokemon('Girafarig', 88800, 62),
            ], { weight: 1}, 'Toway', '(male)'),
        new DungeonTrainer('Street Performer',
            [
                new GymPokemon('Jumpluff', 88800, 61),
                new GymPokemon('Sneasel', 88800, 60),
                new GymPokemon('Electrode', 88800, 60),
            ], { weight: 1}, 'Regol'),
        new DungeonTrainer('Old Man',
            [
                new GymPokemon('Delibird', 88800, 62),
                new GymPokemon('Marshtomp', 88800, 61),
                new GymPokemon('Walrein', 88800, 61),
            ], { weight: 1}, 'Gorbel'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Linoone', 88800, 63),
                new GymPokemon('Xatu', 88800, 62),
            ], { weight: 1}, 'Lobert'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Medicham', 88800, 62),
                new GymPokemon('Azumarill', 88800, 62),
            ], { weight: 1}, 'Lobert'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Machop', 88800, 60),
                new GymPokemon('Ursaring', 88800, 61),
                new GymPokemon('Machoke', 88800, 60),
            ], { weight: 1}, 'Varug', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Spinda', 88800, 62),
                new GymPokemon('Granbull', 88800, 62),
                new GymPokemon('Delcatty', 88800, 62),
            ], { weight: 1}, 'Zogo', '(male)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Wigglytuff', 88800, 62),
                new GymPokemon('Donphan', 88800, 61),
            ], { weight: 1}, 'Shatol', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Volbeat', 88800, 60),
                new GymPokemon('Beautifly', 88800, 60),
            ], { weight: 1}, 'Drook', '(male)'),
        new DungeonTrainer('Roller Boy',
            [
                new GymPokemon('Octillery', 88800, 61),
                new GymPokemon('Exploud', 88800, 61),
            ], { weight: 1}, 'Dult'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Wailmer', 88800, 63),
                new GymPokemon('Graveler', 88800, 61),
            ], { weight: 1}, 'Shatol', '(female)'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Nuzleaf', 88800, 60),
                new GymPokemon('Jumpluff', 88800, 61),
            ], { weight: 1}, 'Drook', '(male)'),
        new DungeonTrainer('Roller Boy',
            [
                new GymPokemon('Lanturn', 88800, 60),
                new GymPokemon('Lairon', 88800, 60),
            ], { weight: 1}, 'Dult'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Marshtomp', 88800, 63),
                new GymPokemon('Swellow', 88800, 62),
                new GymPokemon('Crawdaunt', 88800, 62),
            ], { weight: 1}, 'Ophel', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Nincada', 88800, 64),
                new GymPokemon('Horsea', 88800, 63),
                new GymPokemon('Shuppet', 88800, 63),
            ], { weight: 1}, 'Nelon', '(female)'),
        new DungeonTrainer('Athlete',
            [
                new GymPokemon('Misdreavus', 88800, 64),
                new GymPokemon('Kadabra', 88800, 64),
                new GymPokemon('Seadra', 88800, 65),
                new GymPokemon('Kecleon', 88800, 65),
            ], { weight: 1}, 'Lorge', '(male)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Mawile', 88800, 66),
                new GymPokemon('Relicanth', 88800, 67),
                new GymPokemon('Murkrow', 88800, 66),
            ], { weight: 1}, 'Grons', '(male)'),
    ],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Lucky_egg'},
        ],
        rare: [
            {loot: 'Grey Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Stone Plate'},
            {loot: 'Earth Plate'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [{loot: 'Max Revive'}],
        mythic: [
            {loot: 'Protein', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Deep Colosseum'))},
            {loot: 'Carbos', requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Deep Colosseum'))},
            {loot: 'Vivid_Scent', ignoreDebuff : true},
        ],
    },
    1403000,
    [
        new DungeonTrainer('Deep King',
            [
                new GymPokemon('Skarmory', 1750000, 66),
                new GymPokemon('Girafarig', 1750000, 68),
                new GymPokemon('Sableye', 1750000, 69),
                new GymPokemon('Kingdra', 1750000, 70),
                new GymPokemon('Shedinja', 1750000, 68),
                new GymPokemon('Shuckle', 1750000, 45, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Angol', '(angol)'),
    ],
    88800, 134);

dungeonList['Phenac Stadium'] = new Dungeon('Phenac Stadium',
    [
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Azurill', 89500, 40),
                new GymPokemon('Sentret', 89500, 40),
            ], { weight: 1}, 'Flitz', '(male)'),
        new DungeonTrainer('Roller Boy',
            [
                new GymPokemon('Tentacool', 89500, 40),
                new GymPokemon('Doduo', 89500, 40),
            ], { weight: 1}, 'Greb'),
        new DungeonTrainer('Athlete',
            [
                new GymPokemon('Psyduck', 89500, 41),
                new GymPokemon('Pineco', 89500, 41),
            ], { weight: 1}, 'Adel', '(female)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Mudkip', 89500, 42),
                new GymPokemon('Zubat', 89500, 41),
                new GymPokemon('Cacnea', 89500, 41),
            ], { weight: 1}, 'Rewin', '(male)'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Wingull', 89500, 40),
                new GymPokemon('Igglybuff', 89500, 40),
            ], { weight: 1}, 'Lang', '(male)'),
        new DungeonTrainer('Athlete',
            [
                new GymPokemon('Snorunt', 89500, 40),
                new GymPokemon('Taillow', 89500, 40),
            ], { weight: 1}, 'Bilal', '(male)'),
        new DungeonTrainer('Old Lady',
            [
                new GymPokemon('Horsea', 89500, 41),
                new GymPokemon('Snubbull', 89500, 41),
            ], { weight: 1}, 'Oris'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Luvdisc', 89500, 41),
                new GymPokemon('Hoothoot', 89500, 41),
                new GymPokemon('Treecko', 89500, 42),
            ], { weight: 1}, 'Buna', '(female)'),
        new DungeonTrainer('Lady',
            [
                new GymPokemon('Remoraid', 89500, 40),
                new GymPokemon('Skitty', 89500, 40),
            ], { weight: 1}, 'Rima'),
        new DungeonTrainer('Old Man',
            [
                new GymPokemon('Spheal', 89500, 40),
                new GymPokemon('Machop', 89500, 40),
            ], { weight: 1}, 'Varl'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Wooper', 89500, 41),
                new GymPokemon('Sandshrew', 89500, 41),
            ], { weight: 1}, 'Emia', '(female)'),
        new DungeonTrainer('Teacher',
            [
                new GymPokemon('Clamperl', 89500, 41),
                new GymPokemon('Torchic', 89500, 41),
                new GymPokemon('Mareep', 89500, 42),
            ], { weight: 1}, 'Holen'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Goldeen', 89500, 40),
                new GymPokemon('Wurmple', 89500, 40),
            ], { weight: 1}, 'Harl', '(male)'),
        new DungeonTrainer('Lady',
            [
                new GymPokemon('Bagon', 89500, 40),
                new GymPokemon('Swablu', 89500, 40),
            ], { weight: 1}, 'Brin'),
        new DungeonTrainer('Cooltrainer',
            [
                new GymPokemon('Barboach', 89500, 41),
                new GymPokemon('Seedot', 89500, 41),
            ], { weight: 1}, 'Tock', '(male)'),
        new DungeonTrainer('Teacher',
            [
                new GymPokemon('Staryu', 89500, 41),
                new GymPokemon('Ledyba', 89500, 41),
                new GymPokemon('Pichu', 89500, 42),
            ], { weight: 1}, 'Glais'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Pelipper', 89500, 23),
                new GymPokemon('Electrike', 89500, 22),
                new GymPokemon('Spearow', 89500, 22, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 13)}, 'Ezin', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Chimecho', 89500, 23),
                new GymPokemon('Stantler', 89500, 23),
                new GymPokemon('Grimer', 89500, 23, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 13)}, 'Faltly', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Hoothoot', 89500, 25),
                new GymPokemon('Graveler', 89500, 26),
                new GymPokemon('Gulpin', 89500, 26),
                new GymPokemon('Seel', 89500, 23, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 13)}, 'Egrog', '(yellow)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Diveball'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Silk_Scarf'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Phenac Stadium'))}],
    },
    1503000,
    [
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Sableye', 2000000, 40),
                new GymPokemon('Grimer', 2000000, 41),
                new GymPokemon('Gulpin', 2000000, 40),
                new GymPokemon('Togepi', 2000000, 20, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Crelf', '(male)'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Skitty', 2000000, 51),
                new GymPokemon('Qwilfish', 2000000, 50),
                new GymPokemon('Duskull', 2000000, 50),
                new GymPokemon('Mareep', 2000000, 37, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Harle', '(female)'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Murkrow', 2000000, 60),
                new GymPokemon('Claydol', 2000000, 60),
                new GymPokemon('Steelix', 2000000, 60),
                new GymPokemon('Scizor', 2000000, 50, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Bodhi', '(male)'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Lanturn', 15790500, 26),
                new GymPokemon('Quagsire', 15790500, 26),
                new GymPokemon('Lunatone', 15790500, 25, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Castform', 15790500, 27),
                new GymPokemon('Metang', 15790500, 28),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Gale of Darkness', 13)}, 'Snattle', 'Snattle'),
    ],
    89500, 134);

dungeonList['Under Colosseum'] = new Dungeon('Under Colosseum',
    [
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Rhyhorn', 91500, 50),
                new GymPokemon('Grovyle', 91500, 50),
                new GymPokemon('Masquerain', 91500, 50),
            ], { weight: 1}, 'Sainz', '(male)'),
        new DungeonTrainer('Teacher',
            [
                new GymPokemon('Mawile', 91500, 50),
                new GymPokemon('Luvdisc', 91500, 50),
                new GymPokemon('Kirlia', 91500, 50),
            ], { weight: 1}, 'Foshe'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Wailord', 91500, 50),
                new GymPokemon('Piloswine', 91500, 50),
                new GymPokemon('Illumise', 91500, 50),
            ], { weight: 1}, 'Glya', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Azumarill', 91500, 50),
                new GymPokemon('Breloom', 91500, 50),
                new GymPokemon('Wobbuffet', 91500, 50),
            ], { weight: 1}, 'Fokil', '(male)'),
        new DungeonTrainer('Reporter',
            [
                new GymPokemon('Jumpluff', 91500, 50),
                new GymPokemon('Sealeo', 91500, 50),
                new GymPokemon('Lanturn', 91500, 50),
            ], { weight: 1}, 'Sclim'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Sandslash', 91500, 50),
                new GymPokemon('Camerupt', 91500, 50),
                new GymPokemon('Magcargo', 91500, 50),
            ], { weight: 1}, 'Rina', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Zangoose', 91500, 50),
                new GymPokemon('Grumpig', 91500, 50),
                new GymPokemon('Absol', 91500, 50),
            ], { weight: 1}, 'Kou', '(female)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Rhydon', 91500, 50),
                new GymPokemon('Tropius', 91500, 50),
                new GymPokemon('Seviper', 91500, 50),
            ], { weight: 1}, 'Roblin'),
        new DungeonTrainer('School Kid',
            [
                new GymPokemon('Dustox', 91500, 50),
                new GymPokemon('Yanma', 91500, 50),
                new GymPokemon('Ariados', 91500, 50),
            ], { weight: 1}, 'Sainz', '(male)'),
        new DungeonTrainer('Teacher',
            [
                new GymPokemon('Delcatty', 91500, 50),
                new GymPokemon('Beautifly', 91500, 50),
                new GymPokemon('Roselia', 91500, 50),
            ], { weight: 1}, 'Foshe'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Lunatone', 91500, 50),
                new GymPokemon('Metang', 91500, 50),
                new GymPokemon('Electrode', 91500, 50),
            ], { weight: 1}, 'Glya', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Shuckle', 91500, 50),
                new GymPokemon('Murkrow', 91500, 50),
                new GymPokemon('Misdreavus', 91500, 50),
            ], { weight: 1}, 'Fokil', '(male)'),
        new DungeonTrainer('Reporter',
            [
                new GymPokemon('Castform', 91500, 50),
                new GymPokemon('Torkoal', 91500, 50),
                new GymPokemon('Glalie', 91500, 50),
            ], { weight: 1}, 'Sclim'),
        new DungeonTrainer('Hunter',
            [
                new GymPokemon('Forretress', 91500, 50),
                new GymPokemon('Cacturne', 91500, 50),
                new GymPokemon('Skarmory', 91500, 50),
            ], { weight: 1}, 'Rina', '(female)'),
        new DungeonTrainer('Rider',
            [
                new GymPokemon('Tentacruel', 91500, 50),
                new GymPokemon('Cradily', 91500, 50),
                new GymPokemon('Hariyama', 91500, 50),
            ], { weight: 1}, 'Kou', '(female)'),
        new DungeonTrainer('Bandana Guy',
            [
                new GymPokemon('Armaldo', 91500, 50),
                new GymPokemon('Exploud', 91500, 50),
                new GymPokemon('Aggron', 91500, 50),
            ], { weight: 1}, 'Roblin'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Pokeball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Persim'},
            {loot: 'Sitrus'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Lum', requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Under Colosseum'))},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [
            {loot: 'Muscle_Band', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Under Colosseum'))},
            {loot: 'Vivid_Scent', ignoreDebuff : true},
        ],
    },
    1603000,
    [
        new DungeonTrainer('Shady Guy',
            [
                new GymPokemon('Armaldo', 2100000, 68),
                new GymPokemon('Milotic', 2100000, 68),
                new GymPokemon('Manectric', 2100000, 68),
                new GymPokemon('Houndoom', 2100000, 68),
                new GymPokemon('Gyarados', 2100000, 68),
                new GymPokemon('Togetic', 2100000, 70, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1 }, 'Fein', '(wes)'),
    ],
    91500, 134);

dungeonList['Gateon Port Battles'] = new Dungeon('Gateon Port Battles',
    [
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Swablu', 6002000, 6),
                new GymPokemon('Feebas', 6002000, 6),
            ], { weight: 1, requirement: new ClearDungeonRequirement(25, GameConstants.getDungeonIndex('Gateon Port Battles'), GameConstants.AchievementOption.less) }, 'Laken', '(female)'),
        new DungeonTrainer('Sailor',
            [
                new GymPokemon('Wingull', 6002000, 6),
                new GymPokemon('Lotad', 6002000, 6),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Gateon Port Battles'), GameConstants.AchievementOption.less) }, 'Berk'),
        new DungeonTrainer('Sailor',
            [
                new GymPokemon('Whismur', 6002000, 6),
                new GymPokemon('Marill', 6002000, 6),
            ], { weight: 1, requirement: new ClearDungeonRequirement(75, GameConstants.getDungeonIndex('Gateon Port Battles'), GameConstants.AchievementOption.less) }, 'Bost'),
        new DungeonTrainer('Old Man',
            [
                new GymPokemon('Taillow', 80200, 6),
                new GymPokemon('Ledyba', 80200, 10, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Cyle'),
        new DungeonTrainer('Bodybuilder',
            [
                new GymPokemon('Zubat', 80200, 6),
                new GymPokemon('Poochyena', 80200, 10, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Kilen', '(female)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Pokeball'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Crimson Shard'},
        ],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Insect Plate'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Mystic_Water'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [{loot: 'Heart Scale'}],
    },
    6002000,
    [
        new DungeonTrainer('Thug',
            [new GymPokemon('Zangoose', 58000000, 28, undefined, undefined, GameConstants.ShadowStatus.Shadow)], { weight: 1 }, 'Zook'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Ludicolo', 14000000, 57),
                new GymPokemon('Ludicolo', 14000000, 57),
                new GymPokemon('Ludicolo', 14000000, 57),
                new GymPokemon('Ludicolo', 14000000, 57),
                new GymPokemon('Ludicolo', 14000000, 57),
                new GymPokemon('Dragonite', 14000000, 55, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1, hide: true, requirement: new QuestLineCompletedRequirement('Gale of Darkness')}, 'Miror B.', 'Miror B'),
    ],
    443500, 134,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.unova});
dungeonList['Cipher Key Lair'] = new Dungeon('Cipher Key Lair',
    [
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Lanturn', 6708000, 31),
                new GymPokemon('Relicanth', 6708000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(25, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Kollo', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Ledian', 6708000, 28),
                new GymPokemon('Illumise', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Grezle', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Clamperl', 6708000, 31),
                new GymPokemon('Octillery', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(75, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Kollo', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Minun', 6708000, 30),
                new GymPokemon('Beautifly', 6708000, 30),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Grezle', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Seviper', 6708000, 29),
                new GymPokemon('Murkrow', 6708000, 29),
                new GymPokemon('Paras', 6708000, 28, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Growlithe', 6708000, 28, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Humah', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Xatu', 6708000, 31),
                new GymPokemon('Volbeat', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(125, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Ibsol', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Masquerain', 6708000, 31),
                new GymPokemon('Bellossom', 6708000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Jelstin', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Plusle', 6708000, 30),
                new GymPokemon('Dustox', 6708000, 30),
            ], { weight: 1, requirement: new ClearDungeonRequirement(175, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Ibsol', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Roselia', 6708000, 32),
                new GymPokemon('Hoppip', 6708000, 32),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Jelstin', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Shellder', 6708000, 29, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Rhyhorn', 6708000, 29),
                new GymPokemon('Swalot', 6708000, 29),
                new GymPokemon('Golbat', 6708000, 29),
                new GymPokemon('Sharpedo', 6708000, 30),
            ], { weight: 0.25}, 'Gorog', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Beedrill', 6708000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Furret', 6708000, 30),
                new GymPokemon('Togetic', 6708000, 31),
                new GymPokemon('Pidgeotto', 6708000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Lok', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Donphan', 6708000, 30),
                new GymPokemon('Ampharos', 6708000, 31),
                new GymPokemon('Tentacruel', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(225, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Kleto', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Noctowl', 6708000, 30),
                new GymPokemon('Mightyena', 6708000, 29),
            ], { weight: 1, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Flipis', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Absol', 6708000, 30),
                new GymPokemon('Smeargle', 6708000, 31),
                new GymPokemon('Tentacruel', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(275, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Kleto', 'XD (female)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Chimecho', 6708000, 31),
                new GymPokemon('Kecleon', 6708000, 30),
            ], { weight: 1, requirement: new ClearDungeonRequirement(300, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Flipis', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Ninetales', 6708000, 30),
                new GymPokemon('Jumpluff', 6708000, 30),
                new GymPokemon('Azumarill', 6708000, 32),
                new GymPokemon('Tangela', 6708000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Butterfree', 6708000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Targ', 'XD (female)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Vileplume', 6708000, 31),
                new GymPokemon('Stantler', 6708000, 31),
                new GymPokemon('Granbull', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(325, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Hospel', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Ariados', 6708000, 30),
                new GymPokemon('Girafarig', 6708000, 29),
                new GymPokemon('Granbull', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Hospel', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Shedinja', 6708000, 31),
                new GymPokemon('Wobbuffet', 6708000, 30),
                new GymPokemon('Vibrava', 6708000, 35),
                new GymPokemon('Magneton', 6708000, 30, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Snidle', 'XD (male)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Forretress', 6708000, 31),
                new GymPokemon('Mantine', 6708000, 32),
                new GymPokemon('Crobat', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(375, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Peon Fudler', '(commander)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Machoke', 6708000, 31),
                new GymPokemon('Golem', 6708000, 31),
                new GymPokemon('Forretress', 6708000, 31),
            ], { weight: 1, requirement: new ClearDungeonRequirement(400, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Peon Fudler', '(commander)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Golduck', 6708000, 33),
                new GymPokemon('Hitmontop', 6708000, 33),
                new GymPokemon('Hariyama', 6708000, 34),
                new GymPokemon('Venomoth', 6708000, 32, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Weepinbell', 6708000, 32, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Peon Angic', '(commander)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Camerupt', 6708000, 35),
                new GymPokemon('Seaking', 6708000, 34),
                new GymPokemon('Piloswine', 6708000, 34),
            ], { weight: 1, requirement: new ClearDungeonRequirement(425, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Acrod', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Grumpig', 6708000, 34),
                new GymPokemon('Seadra', 6708000, 34),
                new GymPokemon('Camerupt', 6708000, 35),
            ], { weight: 1, requirement: new ClearDungeonRequirement(450, GameConstants.getDungeonIndex('Cipher Key Lair'), GameConstants.AchievementOption.less) }, 'Acrod', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Huntail', 6708000, 33),
                new GymPokemon('Cacturne', 6708000, 33),
                new GymPokemon('Weezing', 6708000, 34),
                new GymPokemon('Ursaring', 6708000, 34),
                new GymPokemon('Arbok', 6708000, 32, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Smarton', '(yellow)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Pokeball'},
        ],
        rare: [
            {loot: 'Purple Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [
            {loot: 'Earth Plate'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Max Revive'},
            {loot: 'Poison_Barb'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [{loot: 'Calcium'}],
    },
    6708000,
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Lairon', 10574965, 36),
                new GymPokemon('Sealeo', 10565837, 36),
                new GymPokemon('Slowking', 10538602, 36),
                new GymPokemon('Ursaring', 10565784, 36),
                new GymPokemon('Primeape', 10538602, 34, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Hypno', 10538602, 34, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ],
            { weight: 1 }, 'Gorigan', 'Gorigan'),
    ],
    513600, 134,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.unova});

dungeonList['Citadark Isle'] = new Dungeon('Citadark Isle',
    [
        new DungeonTrainer('Sailor',
            [
                new GymPokemon('Mantine', 7409000, 33),
                new GymPokemon('Golduck', 7409000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Sableye', 7409000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Abson'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Dodrio', 7409000, 34, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Whiscash', 7409000, 33),
                new GymPokemon('Raticate', 7409000, 34, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Furgy', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Claydol', 7409000, 36),
                new GymPokemon('Kangaskhan', 7409000, 35, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Banette', 7409000, 37, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Litnar', 'XD (male)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Vileplume', 7409000, 34),
                new GymPokemon('Magmar', 7409000, 36, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Pinsir', 7409000, 35, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Peon Grupel', '(commander)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Muk', 7409000, 38),
                new GymPokemon('Rapidash', 7409000, 40, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Magcargo', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Kolest', 'XD (male)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Xatu', 7409000, 38),
                new GymPokemon('Hitmonchan', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Peon Karbon', '(commander)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Metang', 7409000, 39),
                new GymPokemon('Hariyama', 7409000, 39),
                new GymPokemon('Hitmonlee', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Peon Petro', '(commander)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Magneton', 7409000, 41),
                new GymPokemon('Lickitung', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Geftal', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Exploud', 7409000, 41),
                new GymPokemon('Scyther', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Chansey', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Leden', 'XD (female)'),
        new DungeonTrainer('Sailor',
            [
                new GymPokemon('Crawdaunt', 7409000, 33),
                new GymPokemon('Pelipper', 7409000, 33),
                new GymPokemon('Golduck', 7409000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Sableye', 7409000, 33, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Abson'),
        new DungeonTrainer('Chaser',
            [
                new GymPokemon('Xatu', 7409000, 34),
                new GymPokemon('Dodrio', 7409000, 34, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Raticate', 7409000, 34, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Furgy', '(male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Electrode', 7409000, 34),
                new GymPokemon('Misdreavus', 7409000, 34),
                new GymPokemon('Kangaskhan', 7409000, 35, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Banette', 7409000, 37, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Litnar', 'XD (male)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Houndoom', 7409000, 37),
                new GymPokemon('Ninetales', 7409000, 37),
                new GymPokemon('Magmar', 7409000, 36, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Pinsir', 7409000, 35, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Peon Grupel', '(commander)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Camerupt', 7409000, 37),
                new GymPokemon('Weezing', 7409000, 37),
                new GymPokemon('Rapidash', 7409000, 40, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Magcargo', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Kolest', 'XD (male)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Medicham', 7409000, 38),
                new GymPokemon('Golem', 7409000, 38),
                new GymPokemon('Hitmonchan', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Peon Karbon', '(commander)'),
        new DungeonTrainer('Cipher',
            [
                new GymPokemon('Grumpig', 7409000, 39),
                new GymPokemon('Skarmory', 7409000, 39),
                new GymPokemon('Hitmonlee', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Peon Petro', '(commander)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Lanturn', 7409000, 41),
                new GymPokemon('Lickitung', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Geftal', 'XD (male)'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Stantler', 7409000, 41),
                new GymPokemon('Scyther', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Chansey', 7409000, 38, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 1}, 'Leden', 'XD (female)'),
    ],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Black Shard'},
        ],
        epic: [
            {loot: 'Duskball'},
            {loot: 'Flame Plate'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Timerball'},
            {loot: 'Charcoal'},
            {loot: 'Dragon_Fang'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [
            {loot: 'Calcium'},
            {loot: 'Carbos'},
        ],
    },
    7409000,
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Gardevoir', 13958953, 36),
                new GymPokemon('Gorebyss', 13958953, 36),
                new GymPokemon('Roselia', 13958953, 37),
                new GymPokemon('Farfetch\'d', 13958953, 36, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Altaria', 13958953, 36, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ],
            { weight: 1 }, 'Lovrina', 'Lovrina'),
    ],
    577700, 134,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.unova});

dungeonList['Citadark Isle Dome'] = new Dungeon('Citadark Isle Dome', // Difficulty comperable to Pokéball Factory
    [
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Scizor', 8173950, 42),
                new GymPokemon('Solrock', 8173950, 41, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Castform', 8173950, 42),
                new GymPokemon('Starmie', 8173950, 41, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Snattle', 'Snattle'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Swellow', 8173950, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Heracross', 8173950, 44),
                new GymPokemon('Electabuzz', 8173950, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Snorlax', 8173950, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Ardos', 'Ardos'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Aggron', 7409000, 43),
                new GymPokemon('Walrein', 7409000, 44),
                new GymPokemon('Poliwrath', 7409000, 42, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Mr. Mime', 7409000, 42, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Gorigan', 'Gorigan'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Breloom', 7409000, 42),
                new GymPokemon('Donphan', 7409000, 44),
                new GymPokemon('Dugtrio', 7409000, 40, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Kolax', 'XD (male)'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Manectric', 8173950, 44, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Salamence', 8173950, 50, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Flygon', 8173950, 45),
                new GymPokemon('Marowak', 8173950, 44, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Lapras', 8173950, 44, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Eldes', 'Eldes'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Miltank', 8173950, 44),
                new GymPokemon('Armaldo', 8173950, 41),
                new GymPokemon('Slaking', 8173950, 43),
            ], { weight: 1, requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Citadark Isle Dome'), GameConstants.AchievementOption.less) }, 'Loket', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Cradily', 8173950, 44),
                new GymPokemon('Milotic', 8173950, 44),
                new GymPokemon('Gyarados', 8173950, 42),
            ], { weight: 1, requirement: new ClearDungeonRequirement(150, GameConstants.getDungeonIndex('Citadark Isle Dome'), GameConstants.AchievementOption.less) }, 'Kaller', '(male)'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Metang', 8173950, 42),
                new GymPokemon('Quagsire', 8173950, 42),
                new GymPokemon('Solrock', 8173950, 41, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Starmie', 8173950, 41, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Snattle', 'Snattle'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Swellow', 8173950, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Alakazam', 8173950, 44),
                new GymPokemon('Kingdra', 8173950, 44),
                new GymPokemon('Electabuzz', 8173950, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Snorlax', 8173950, 43, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Ardos', 'Ardos'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Slowking', 7409000, 42),
                new GymPokemon('Ursaring', 7409000, 43),
                new GymPokemon('Poliwrath', 7409000, 42, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Mr. Mime', 7409000, 42, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Gorigan', 'Gorigan'),
        new DungeonTrainer('Cipher Peon',
            [
                new GymPokemon('Glalie', 7409000, 41),
                new GymPokemon('Ampharos', 7409000, 44),
                new GymPokemon('Dugtrio', 7409000, 40, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Kolax', 'XD (male)'),
        new DungeonTrainer('Cipher Admin',
            [
                new GymPokemon('Ninjask', 8173950, 45),
                new GymPokemon('Manectric', 8173950, 44, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Salamence', 8173950, 50, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Marowak', 8173950, 44, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Lapras', 8173950, 44, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ], { weight: 0.25}, 'Eldes', 'Eldes'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Shiftry', 8173950, 44),
                new GymPokemon('Granbull', 8173950, 44),
                new GymPokemon('Slaking', 8173950, 43),
            ], { weight: 1, requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Citadark Isle Dome'), GameConstants.AchievementOption.less) }, 'Loket', '(male)'),
        new DungeonTrainer('Scientist',
            [
                new GymPokemon('Corsola', 8173950, 44),
                new GymPokemon('Tentacruel', 8173950, 44),
                new GymPokemon('Gyarados', 8173950, 42),
            ], { weight: 1, requirement: new ClearDungeonRequirement(250, GameConstants.getDungeonIndex('Citadark Isle Dome'), GameConstants.AchievementOption.less) }, 'Kaller', '(male)'),
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Black Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Revive'},
            {loot: 'Joy_Scent', ignoreDebuff : true},
        ],
        legendary: [
            {loot: 'Sharp_Beak'},
            {loot: 'Soft_Sand'},
            {loot: 'Excite_Scent', ignoreDebuff : true},
        ],
        mythic: [{loot: 'Vivid_Scent', ignoreDebuff : true}],
    },
    8173950,
    [
        new DungeonTrainer('Grand Master',
            [new GymPokemon('XD001', 83753718, 50, undefined, undefined, GameConstants.ShadowStatus.Shadow)],
            { weight: 1 }, 'Greevil', 'Greevil'),
        new DungeonTrainer('Grand Master',
            [
                new GymPokemon('Rhydon', 13958953, 46, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Moltres', 13958953, 50, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Exeggutor', 13958953, 46, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Tauros', 13958953, 46, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Articuno', 13958953, 50, undefined, undefined, GameConstants.ShadowStatus.Shadow),
                new GymPokemon('Zapdos', 13958953, 50, undefined, undefined, GameConstants.ShadowStatus.Shadow),
            ],
            { weight: 1, requirement: new QuestLineCompletedRequirement('Gale of Darkness') }, 'Greevil', 'Greevil'),
    ],
    615000, 134,
    () => {},
    {dungeonRegionalDifficulty: GameConstants.Region.unova});
// Sinnoh

// Sinnoh Dungeons
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
            {loot: 'Ultraball'},
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
        new DungeonBossPokemon('Drifloon', 3803000, 14, {hide: true, requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Valley Windworks'))}),
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
        rare: [{loot: 'Lime Shard'}],
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
        new DungeonBossPokemon('Parasect', 4500000, 30, {hide: true, requirement: new MultiRequirement([
            new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 8, GameConstants.AchievementOption.less),
            new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 7),
        ])}),
        new DungeonBossPokemon('Vivillon (River)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 20),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 21, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (River)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
            {loot: 'Yellow Shard'},
            {loot: 'Purple Shard'},
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
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Purple Shard'},
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
        new DungeonBossPokemon('Rotom (Heat)', 4300000, 100, {hide: true, requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (Wash)', 4300000, 100, {hide: true, requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (Frost)', 4300000, 100, {hide: true, requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (Fan)', 4300000, 100, {hide: true, requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Rotom'),
            new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Team Galactic Eterna Building')),
        ])}),
        new DungeonBossPokemon('Rotom (Mow)', 4300000, 100, {hide: true, requirement: new MultiRequirement([
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
            {loot: 'Grey Shard'},
        ],
        epic: [
            {loot: 'Earth Plate'},
            {loot: 'Draco Plate'},
        ],
        legendary: [
            {loot: 'Revive', weight: 2},
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
            {loot: 'Ultraball'},
        ],
        rare: [{loot: 'Grey Shard'}],
        epic: [
            {loot: 'Iron Plate', weight: 2},
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
            ], { weight: 2 }, 'Saturn', '(saturn)'),
        new DungeonBossPokemon('Azelf', 10060000, 50, {requirement: new QuestLineCompletedRequirement('A New World')}),
        new DungeonBossPokemon('Vivillon (Marine)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 0),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 1, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Marine)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
            {loot: 'Red Shard'},
            {loot: 'Crimson Shard'},
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
        new DungeonBossPokemon('Vivillon (Marine)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 0),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 1, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Marine)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
    ],
    72500, 218);

dungeonList['Mt. Coronet North'] = new Dungeon('Mt. Coronet North',
    ['Clefairy', 'Zubat', 'Machop', 'Geodude', 'Magikarp', 'Noctowl', 'Meditite', 'Barboach', 'Chingling', 'Bronzor', 'Snover'],
    {
        common: [
            {loot: 'xClick', weight: 2},
            {loot: 'Ultraball'},
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
        rare: [{loot: 'Yellow Shard'}],
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
            ], { weight: 2 }, 'Jupiter', '(jupiter)'),
        new DungeonBossPokemon('Uxie', 10070000, 50, {requirement: new QuestLineCompletedRequirement('A New World')}),
        new DungeonBossPokemon('Vivillon (Marine)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 0),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 1, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Marine)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
        epic: [{loot: 'Sky Plate'}],
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
            {loot: 'Blue Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Crimson Shard'},
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
        rare: [
            {loot: 'Purple Shard'},
            {loot: 'Crimson Shard'},
        ],
        legendary: [
            {loot: 'Rare Bone'},
            {loot: 'Odd Keystone'},
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
            ], { weight: 2 }, 'Cyrus', '(cyrus)'),
        new DungeonBossPokemon('Giratina (Altered)', 11880000, 45, {requirement: new QuestLineStepCompletedRequirement('Zero\'s Ambition', 13)}),
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
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
        ],
        legendary: [{loot: 'Repeatball'}],
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
            {loot: 'Green Shard'},
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
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'White Shard'},
            {loot: 'Black Shard'},
        ],
        epic: [
            {loot: 'Blank Plate'},
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
        new DungeonBossPokemon('Slaking', 10000000, 100),
        new DungeonBossPokemon('Snorlax', 10000000, 100),
        new DungeonBossPokemon('Blissey', 10000000, 100),
        new DungeonBossPokemon('Staraptor', 10000000, 100),
        new DungeonBossPokemon('Arceus (Normal)', 13000000, 100),
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
        epic: [
            {loot: 'Mind Plate'},
            {loot: 'Moonball'},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Lunatone', 11000000, 100),
        new DungeonBossPokemon('Clefable', 11000000, 100),
    ],
    96500, 230);

dungeonList['Newmoon Island'] = new Dungeon('Newmoon Island',
    ['Volbeat', 'Plusle', 'Sneasel', 'Luvdisc'],
    {
        common: [
            {loot: 'Lucky_egg', weight: 2},
            {loot: 'Nanab'},
        ],
        rare: [{loot: 'Black Shard'}],
        epic: [
            {loot: 'Dread Plate'},
            {loot: 'Moonball'},
        ],
        legendary: [{loot: 'Black_Glasses'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Lunatone', 9900000, 100),
        new DungeonBossPokemon('Absol', 9900000, 100),
        new DungeonBossPokemon('Darkrai', 11000000, 100),
    ],
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
        new DungeonBossPokemon('Breloom', 9900000, 50),
        new DungeonBossPokemon('Shaymin (Land)', 11000000, 50),
        new DungeonBossPokemon('Shaymin (Sky)', 11000000, 50, {hide: true, requirement: new ObtainedPokemonRequirement('Shaymin (Land)')}),
        new DungeonBossPokemon('Bulbasaur (Rose)', 16000000, 100, {
            hide: true,
            requirement: new MultiRequirement([
                new ClearDungeonRequirement(10, GameConstants.getDungeonIndex('Flower Paradise')),
                new SpecialEventRequirement('Golden Week'),
            ])}),
        new DungeonBossPokemon('Vivillon (Garden)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 26),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 27, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Garden)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
        epic: [{loot: 'Blank Plate'}],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Never_Melt_Ice'},
        ],
        mythic: [{loot: 'Protein', requirement: new ClearDungeonRequirement(350, GameConstants.getDungeonIndex('Snowpoint Temple'))}],
    },
    2603000,
    [
        new DungeonBossPokemon('Steelix', 10000000, 100),
        new DungeonBossPokemon('Jynx', 10000000, 100),
        new DungeonBossPokemon('Regigigas', 11000000, 100),
    ],
    96500, 230);

dungeonList['Stark Mountain'] = new Dungeon('Stark Mountain',
    [
        {pokemon: 'Fearow', options: { weight: 4.4 }},
        {pokemon: 'Golbat', options: { weight: 4.4 }},
        {pokemon: 'Graveler', options: { weight: 4.4 }},
        {pokemon: 'Weezing', options: { weight: 4.4 }},
        {pokemon: 'Rhyhorn', options: { weight: 4.4 }},
        {pokemon: 'Rhydon', options: { weight: 4.4 }},
        {pokemon: 'Slugma', options: { weight: 4.4 }},
        {pokemon: 'Magcargo', options: { weight: 4.4 }},
        {pokemon: 'Numel', options: { weight: 4.4 }},
        {pokemon: 'Machoke', options: { weight: 4.4 }},
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
            {loot: 'Grey Shard'},
        ],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Iron Plate'},
        ],
        legendary: [
            {loot: 'Metal_Powder'},
            {loot: 'Star Piece', weight: 2},
            {loot: 'Charcoal'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Skarmory', 10000000, 100),
        new DungeonBossPokemon('Camerupt', 10000000, 100),
        new DungeonBossPokemon('Heatran', 11000000, 100),
    ],
    96500, 230);

// Unova Dungeons

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
            {loot: 'Ultraball'},
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
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Green Shard'},
        ],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Mind Plate'},
        ],
    },
    2703000,
    [
        new DungeonBossPokemon('Chimecho', 14000000, 100),
        new DungeonBossPokemon('Kadabra', 14000000, 100),
        new DungeonBossPokemon('Victini', 14000000, 100),
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
            {loot: 'Green Shard'},
            {loot: 'Purple Shard'},
        ],
        epic: [
            {loot: 'Toxic Plate'},
            {loot: 'Mind Plate'},
        ],
        legendary: [
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
        legendary: [{loot: 'Rock_Incense'}],
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
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [
            {loot: 'Earth Plate'},
            {loot: 'Insect Plate'},
            {loot: 'Flame Plate'},
        ],
        legendary: [
            {loot: 'Revive'},
            {loot: 'Smooth Rock'},
            {loot: 'LargeRestore', weight: 2},
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
            { weight: 2 }, 'Perry', '(male)'),
        new DungeonBossPokemon('Volcarona', 21000000, 100, {requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Relic Passage'))}), // don't hide, because the dungeons associated with it are optional
        new DungeonBossPokemon('Vivillon (Sandstorm)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 24),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 25, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Sandstorm)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
    ],
    166500, 25);

dungeonList['Lostlorn Forest'] = new Dungeon('Lostlorn Forest',
    [
        {pokemon: 'Roselia', options: { weight: 2.29 }},
        {pokemon: 'Combee', options: { weight: 2.29 }},
        {pokemon: 'Sewaddle', options: { weight: 2.29 }},
        {pokemon: 'Venipede', options: { weight: 2.29 }},
        {pokemon: 'Cottonee', options: { weight: 2.29 }},
        {pokemon: 'Petilil', options: { weight: 2.29 }},
        {pokemon: 'Vespiquen', options: { weight: 2.29, hide: true, requirement: new ObtainedPokemonRequirement('Vespiquen')}},
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
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Lime Shard'},
        ],
        legendary: [{loot: 'Zoroark', requirement: new ClearDungeonRequirement(50, GameConstants.getDungeonIndex('Lostlorn Forest'))}],
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
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Grey Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Draco Plate'},
            {loot: 'Fist Plate'},
            {loot: 'Iron Plate'},
        ],
        legendary: [
            {loot: 'Duskball'},
            {loot: 'LargeRestore'},
        ],
    },
    3603000,
    [
        new DungeonBossPokemon('Drilbur', 23000000, 100),
        new DungeonBossPokemon('Axew', 24000000, 100),
        new DungeonBossPokemon('Cobalion', 25000000, 100, {
            requirement: new QuestLineStepCompletedRequirement('Swords of Justice', 21),
        }),
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
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Grey Shard'},
        ],
        epic: [
            {loot: 'Iron Plate'},
            {loot: 'Flame Plate'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Metal_Powder'},
            {loot: 'Star Piece'},
        ],
    },
    4003000,
    [
        new DungeonBossPokemon('Cacturne', 24000000, 100),
        new DungeonBossPokemon('Vibrava', 24000000, 100),
        new DungeonBossPokemon('Excadrill', 26000000, 100),
        new DungeonBossPokemon('Heatran', 30000000, 100, {hide: true, requirement: new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion)}),
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
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
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
            {loot: 'Crimson Shard'},
            {loot: 'White Shard'},
        ],
        epic: [
            {loot: 'Icicle Plate'},
            {loot: 'Draco Plate'},
            {loot: 'Dread Plate'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
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
        new DungeonBossPokemon('Tangrowth', 30000000, 100, {hide: true, requirement: new TemporaryBattleRequirement('Ghetsis 2')}),
        new DungeonBossPokemon('Audino', 32000000, 100, {hide: true, requirement: new TemporaryBattleRequirement('Ghetsis 2')}),
        new DungeonBossPokemon('Mamoswine', 32000000, 100, {hide: true, requirement: new TemporaryBattleRequirement('Ghetsis 2')}),
        new DungeonBossPokemon('Kyurem', 35000000, 100, {requirement: new MultiRequirement([
            new QuestLineCompletedRequirement('Hollow Truth and Ideals'),
            new GymBadgeRequirement(BadgeEnums.Elite_UnovaChampion),
            new OneFromManyRequirement([
                new QuestLineCompletedRequirement('Swords of Justice'),
                new QuestLineStartedRequirement('Swords of Justice', GameConstants.AchievementOption.less),
            ]),
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
            {loot: 'Yellow Shard'},
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
            {loot: 'Ochre Shard'},
        ],
        legendary: [{loot: 'LargeRestore'}],
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
        {pokemon: 'Poliwag', options: { weight: 5.57 }},
        {pokemon: 'Onix', options: { weight: 5.57 }},
        {pokemon: 'Marill', options: { weight: 5.57 }},
        {pokemon: 'Roselia', options: { weight: 5.57 }},
        {pokemon: 'Altaria', options: { weight: 5.57 }},
        {pokemon: 'Banette', options: { weight: 5.57 }},
        {pokemon: 'Buizel', options: { weight: 5.57 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 5.57 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 5.57 }},
        {pokemon: 'Boldore', options: { weight: 5.57 }},
        {pokemon: 'Cottonee', options: { weight: 5.57 }},
        {pokemon: 'Petilil', options: { weight: 5.57 }},
        {pokemon: 'Tranquill', options: { weight: 5.57 }},
        {pokemon: 'Unfezant', options: { weight: 5.57 }},
        {pokemon: 'Gurdurr', options: { weight: 5.57 }},
        {pokemon: 'Druddigon', options: { weight: 5.57 }},
        {pokemon: 'Sawk', options: { weight: 5.57, hide: true, requirement: new ObtainedPokemonRequirement('Sawk')}},
        {pokemon: 'Throh', options: { weight: 5.57, hide: true, requirement: new ObtainedPokemonRequirement('Throh')}},
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
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
        ],
        epic: [
            {loot: 'Quickball'},
            {loot: 'Timerball'},
            {loot: 'Duskball'},
            {loot: 'Nestball'},
            {loot: 'Repeatball'},
        ],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'LargeRestore'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    5003000,
    [
        new DungeonBossPokemon('Golurk', 44000000, 100),
        new DungeonBossPokemon('Audino', 45000000, 100),
        new DungeonBossPokemon('Terrakion', 45000000, 100, {
            requirement: new QuestLineStepCompletedRequirement('Swords of Justice', 21),
        }),
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
            {loot: 'Ultraball'},
        ],
        rare: [{loot: 'White Shard'}],
        legendary: [
            {loot: 'Rare Bone', weight: 2},
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
    ['Dratini', 'Dragonair', 'Tranquill', 'Basculin (Red-Striped)', 'Basculin (Blue-Striped)', 'Vanillish', 'Sawsbuck (Spring)', 'Sawsbuck (Summer)', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)', 'Beartic', 'Mienfoo', 'Mienshao', 'Golett', 'Golurk'],
    {
        common: [
            {loot: 'xAttack', weight: 2},
            {loot: 'Razz'},
            {loot: 'Pinap'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Crimson Shard'},
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
        new DungeonBossPokemon('Druddigon', 48000000, 100),
        new DungeonBossPokemon('Dragonite', 48000000, 100),
        new DungeonBossPokemon('Reshiram', 50000000, 100),
        new DungeonBossPokemon('Zekrom', 50000000, 100),
        new DungeonBossPokemon('Vivillon (Savanna)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 30),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 31, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Savanna)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Ochre Shard'},
        ],
        legendary: [
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
        new DungeonBossPokemon('Seismitoad', 48000000, 100),
        new DungeonBossPokemon('Whiscash', 48000000, 100),
        new DungeonBossPokemon('Keldeo', 50000000, 100, {
            hide: false,
            requirement: new QuestLineCompletedRequirement('Swords of Justice'),
        }),
        new DungeonBossPokemon('Vivillon (Jungle)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 4),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 5, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Jungle)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
    ],
    356500, 8);

dungeonList['Pledge Grove'] = new Dungeon('Pledge Grove',
    ['Fearow', 'Furret', 'Ledian', 'Sudowoodo', 'Stantler', 'Breloom', 'Sawsbuck (Spring)', 'Sawsbuck (Summer)', 'Sawsbuck (Autumn)', 'Sawsbuck (Winter)'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'xAttack'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Ochre Shard'},
        ],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Fist Plate'},
        ],
        legendary: [{loot: 'Sharp_Beak'}],
    },
    5203000,
    [
        new DungeonBossPokemon('Unfezant', 50000000, 100),
        new DungeonBossPokemon('Politoed', 50000000, 100),
        new DungeonBossPokemon('Keldeo (Resolute)', 52000000, 100),
    ],
    356500, 8);

dungeonList['Pinwheel Forest'] = new Dungeon('Pinwheel Forest',
    [
        {pokemon: 'Goldeen', options: { weight: 5.42 }},
        {pokemon: 'Marill', options: { weight: 5.42 }},
        {pokemon: 'Yanma', options: { weight: 5.42 }},
        {pokemon: 'Vigoroth', options: { weight: 5.42 }},
        {pokemon: 'Toxicroak', options: { weight: 5.42 }},
        {pokemon: 'Gurdurr', options: { weight: 5.42 }},
        {pokemon: 'Tympole', options: { weight: 5.42 }},
        {pokemon: 'Palpitoad', options: { weight: 5.42 }},
        {pokemon: 'Swadloon', options: { weight: 5.42 }},
        {pokemon: 'Whirlipede', options: { weight: 5.42 }},
        {pokemon: 'Cottonee', options: { weight: 5.42 }},
        {pokemon: 'Petilil', options: { weight: 5.42 }},
        {pokemon: 'Basculin (Red-Striped)', options: { weight: 5.42 }},
        {pokemon: 'Basculin (Blue-Striped)', options: { weight: 5.42 }},
        {pokemon: 'Sawk', options: { weight: 5.42, hide: true, requirement: new ObtainedPokemonRequirement('Sawk')}},
        {pokemon: 'Throh', options: { weight: 5.42, hide: true, requirement: new ObtainedPokemonRequirement('Throh')}},
        {pokemon: 'Yanmega', options: { weight: 5.42, hide: true, requirement: new ObtainedPokemonRequirement('Yanmega')}},
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
            {loot: 'Ochre Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Fist Plate'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
            {loot: 'LargeRestore'},
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
        new DungeonBossPokemon('Virizion', 48000000, 100, {
            requirement: new QuestLineStepCompletedRequirement('Swords of Justice', 21),
        }),
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
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Crimson Shard'},
        ],
        epic: [
            {loot: 'Mind Plate', weight: 2},
            {loot: 'Draco Plate'},
            {loot: 'Moonball'},
        ],
        legendary: [
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
        new DungeonBossPokemon('Vivillon (Ocean)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 16),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 17, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Ocean)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
    ],
    356500, 3);

dungeonList['P2 Laboratory'] = new Dungeon('P2 Laboratory',
    ['Frillish', 'Finneon', 'Horsea', 'Herdier', 'Magneton', 'Klang', 'Weezing', 'Watchog', 'Scrafty', 'Audino'],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack', weight: 2},
            {loot: 'Token_collector', weight: 2},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
        ],
        epic: [
            {loot: 'Iron Plate', weight: 2},
            {loot: 'Insect Plate', weight: 2},
            {loot: 'Zap Plate'},
        ],
        legendary: [
            {loot: 'Burn_Drive', ignoreDebuff: true},
            {loot: 'Chill_Drive', ignoreDebuff: true},
            {loot: 'Douse_Drive', ignoreDebuff: true},
            {loot: 'Shock_Drive', ignoreDebuff: true},
        ],
        mythic: [{loot: 'Great_Twisted_Spoon', ignoreDebuff : true, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('An Unrivaled Power', 14), new ItemRequirement(1, 'Great_Twisted_Spoon', GameConstants.AchievementOption.less)])}],
    },
    5403000,
    [
        new DungeonBossPokemon('Stoutland', 58000000, 100, {hide: true, requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Magnezone', 58000000, 100, {hide: true, requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonBossPokemon('Klinklang', 58000000, 100, {hide: true, requirement: new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('P2 Laboratory'))}),
        new DungeonTrainer('Team Plasma',
            [
                new GymPokemon('Magneton', 10000000, 72),
                new GymPokemon('Rotom (Wash)', 10000000, 72),
                new GymPokemon('Metagross', 10000000, 72),
                new GymPokemon('Beheeyem', 10000000, 72),
                new GymPokemon('Magnezone', 10000000, 72),
                new GymPokemon('Klinklang', 11000000, 74),
            ], { weight: 1 }, 'Colress', '(colress)'),
        new DungeonBossPokemon('Genesect', 62000000, 100, {requirement: new QuestLineStepCompletedRequirement('The Legend Awakened', 7)}),
    ],
    396500, 18);

// Kalos Dungeons

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
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Lime Shard'},
        ],
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
        rare: [
            {loot: 'Red Shard'},
            {loot: 'White Shard'},
        ],
        epic: [
            {loot: 'Moonball'},
            {loot: 'Blank Plate'},
        ],
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
        new DungeonBossPokemon('Kangaskhan', 63749659, 20, { requirement : new QuestLineStepCompletedRequirement('A Beautiful World', 3) }),
        new DungeonBossPokemon('Mawile', 61285398, 20, { requirement : new QuestLineStepCompletedRequirement('A Beautiful World', 3) }),
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
            {loot: 'Pink Shard'},
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
            ], { weight: 1.5 }, 'Emil', '(male)'),
        new DungeonTrainer('Ace Trainer',
            [
                new GymPokemon('Doduo', 20365400, 24),
                new GymPokemon('Granbull', 23366400, 24),
                new GymPokemon('Helioptile', 25476400, 25),
            ], { weight: 1.5 }, 'Monique', '(female)'),
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
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
        ],
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
            [new GymPokemon('Mightyena', 75384400, 38)], { weight: 3 }),
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
            {loot: 'Red Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [
            {loot: 'Duskball'},
            {loot: 'Quickball'},
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
        new DungeonBossPokemon('Vivillon (Tundra)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 8),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 9, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Tundra)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
        rare: [
            {loot: 'Pink Shard'},
            {loot: 'Purple Shard'},
        ],
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
        new DungeonBossPokemon('Vivillon (Elegant)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 14),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 15, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Elegant)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
            {loot: 'Green Shard'},
            {loot: 'White Shard'},
        ],
        epic: [
            {loot: 'Icicle Plate'},
            {loot: 'Meadow Plate'},
            {loot: 'Insect Plate'},
            {loot: 'Iron Plate'},
            {loot: 'Duskball'},
        ],
        legendary: [
            {loot: 'LargeRestore', weight: 2},
            {loot: 'Star Piece'},
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
        new DungeonBossPokemon('Abomasnow', 85376500, 50, {hide: true, requirement: new QuestLineStepCompletedRequirement('A Beautiful World', 17)}),
        new DungeonBossPokemon('Vivillon (Icy Snow)',  96662023, 60, {
            hide: true,
            requirement: new OneFromManyRequirement([
                new MultiRequirement([
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 32),
                    new QuestLineStepCompletedRequirement('The Great Vivillon Hunt!', 33, GameConstants.AchievementOption.less),
                ]),
                new MultiRequirement([
                    new ObtainedPokemonRequirement('Vivillon (Icy Snow)'),
                    new SpecialEventRequirement('Lunar New Year'),
                ]),
            ])}),
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
            {loot: 'Blue Shard'},
            {loot: 'Black Shard'},
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
        new DungeonTrainer('Team Flare Aliana',
            [
                new GymPokemon('Houndoom', 47416644, 48),
                new GymPokemon('Druddigon', 48374556, 49),
            ],
            { weight: 2, hide: true, requirement: new MultiRequirement([
                new QuestLineStepCompletedRequirement('A Beautiful World', 24),
                new QuestLineStepCompletedRequirement('A Beautiful World', 25, GameConstants.AchievementOption.less),
            ])}),
        new DungeonTrainer('Team Flare Celosia',
            [
                new GymPokemon('Manectric', 47416644, 48),
                new GymPokemon('Drapion', 48374556, 49),
            ],
            { weight: 2, hide: true, requirement: new MultiRequirement([
                new QuestLineStepCompletedRequirement('A Beautiful World', 25),
                new QuestLineStepCompletedRequirement('A Beautiful World', 26, GameConstants.AchievementOption.less),
            ])}),
        new DungeonTrainer('Team Flare Bryony',
            [
                new GymPokemon('Liepard', 47416644, 48),
                new GymPokemon('Bisharp', 48374556, 49),
            ],
            { weight: 2, hide: true, requirement: new MultiRequirement([
                new QuestLineStepCompletedRequirement('A Beautiful World', 26),
                new QuestLineStepCompletedRequirement('A Beautiful World', 27, GameConstants.AchievementOption.less),
            ])}),
        new DungeonTrainer('Team Flare Mable',
            [
                new GymPokemon('Houndoom', 47416644, 48),
                new GymPokemon('Weavile', 48374556, 49),
            ],
            { weight: 2, hide: true, requirement: new MultiRequirement([
                new QuestLineStepCompletedRequirement('A Beautiful World', 27),
                new QuestLineStepCompletedRequirement('A Beautiful World', 28, GameConstants.AchievementOption.less),
            ])}),
        new DungeonTrainer('Team Flare Lysandre',
            [
                new GymPokemon('Mienshao', 22464940, 47),
                new GymPokemon('Honchkrow', 22564950, 47),
                new GymPokemon('Pyroar', 23375580, 49),
                new GymPokemon('Gyarados', 27385730, 51),
            ],
            { weight: 2, hide: true, requirement: new MultiRequirement([
                new QuestLineStepCompletedRequirement('A Beautiful World', 28),
                new QuestLineStepCompletedRequirement('A Beautiful World', 33, GameConstants.AchievementOption.less),
            ])}),
        new DungeonTrainer('Team Flare Boss Lysandre',
            [
                new GymPokemon('Mienshao', 22464940, 47),
                new GymPokemon('Honchkrow', 22564950, 47),
                new GymPokemon('Pyroar', 23375580, 49),
                new GymPokemon('Mega Gyarados', 27385730, 51),
            ],
            { weight: 3, hide: true, requirement: new QuestLineStepCompletedRequirement('A Beautiful World', 33)}),
        new DungeonBossPokemon('Xerneas', 93659460, 100, {requirement: new QuestLineStepCompletedRequirement('A Beautiful World', 31)}),
        new DungeonBossPokemon('Yveltal', 93659450, 100, {requirement: new QuestLineStepCompletedRequirement('A Beautiful World', 31)}),
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
            {loot: 'Green Shard'},
            {loot: 'Crimson Shard'},
        ],
        epic: [
            {loot: 'Iron Plate'},
            {loot: 'Earth Plate'},
            {loot: 'Draco Plate'},
            {loot: 'Duskball'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
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
        rare: [{loot: 'Pink Shard'}],
        epic: [
            {loot: 'Pixie Plate'},
            {loot: 'Repeatball'},
        ],
        legendary: [
            {loot: 'LargeRestore'},
            {loot: 'Fairy_Feather'},
        ],
        mythic: [{loot: 'Quick_Powder'}],
    },
    9003000,
    [
        new DungeonBossPokemon('Ditto', 94836530, 50),
        new DungeonBossPokemon('Zoroark', 95743340, 50),
        new DungeonTrainer('Anomaly Mewtwo',
            [new GymPokemon('Mega Mewtwo X', 120000000, 70)],
            { hide: true, requirement: new QuestLineCompletedRequirement('An Unrivaled Power'), hideTrainer: true}, undefined, 'X'),
        new DungeonTrainer('Anomaly Mewtwo',
            [new GymPokemon('Mega Mewtwo Y', 120000000, 70)],
            { hide: true, requirement: new MultiRequirement([
                new QuestLineStepCompletedRequirement('An Unrivaled Power', 16),
                new QuestLineCompletedRequirement('An Unrivaled Power', GameConstants.AchievementOption.less),
            ]), hideTrainer: true}, undefined, 'Y'),
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
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
            {loot: 'Pink Shard'},
            {loot: 'Duskball'},
        ],
        legendary: [
            {loot: 'Star Piece', weight: 2},
            {loot: 'Smooth Rock'},
            {loot: 'Revive'},
            {loot: 'Odd Keystone'},
            {loot: 'Rock_Incense'},
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

// Alola Dungeons

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
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
        ],
        epic: [{loot: 'Flame Plate'}],
        legendary: [{loot: 'SmallRestore'}],
    },
    11407338,
    [
        new DungeonTrainer('Teacher',
            [
                new GymPokemon('Litten', 19012230, 10),
                new GymPokemon('Popplio', 19012230, 10),
                new GymPokemon('Rowlet', 19012230, 10),
            ], { weight: 1 }, 'Emily', '(gen7)'),
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
        rare: [{loot: 'Purple Shard'}],
        epic: [{loot: 'Spooky Plate'}],
        legendary: [{loot: 'MediumRestore'}],
    },
    11587450,
    [
        new DungeonBossPokemon('Drifloon', 28968625, 9),
        new DungeonBossPokemon('Litwick', 28968625, 9, {hide: true, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Saturday)}),
    ],
    800000, 2);

dungeonList['Verdant Cavern'] = new Dungeon('Verdant Cavern',
    [
        {pokemon: 'Alolan Rattata', options: { weight: 0.75 }},
        {pokemon: 'Zubat', options: { weight: 0.75 }},
        {pokemon: 'Alolan Diglett', options: { weight: 0.75 }},
        {pokemon: 'Noibat', options: { weight: 0.75 }},
        {pokemon: 'Yungoos', options: { weight: 0.75 }},
        {pokemon: 'Pheromosa', options: { weight: 0.75, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 5)}}, // hide UBs because they show up in too many dungeons and will distract the players
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Drowzee', 11595673, 11)], { weight: 0.5 }, 'A', '(male)'),
        new DungeonTrainer('Team Skull Grunt',
            [new GymPokemon('Drowzee', 11595673, 11)], { weight: 0.5 }, 'B', '(male)'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
        ],
        epic: [{loot: 'Meadow Plate'}],
        legendary: [
            {loot: 'MediumRestore'},
            {loot: 'Revive'},
        ],
    },
    11595673,
    [
        new DungeonBossPokemon('Alolan Raticate', 57978365, 12),
        new DungeonBossPokemon('Gumshoos', 57978365, 12),
        new DungeonBossPokemon('Totem Raticate', 82543791, 70, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Welcome to Paradise, Cousin!')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonBossPokemon('Totem Gumshoos', 82543791, 70, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Welcome to Paradise, Cousin!')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Yungoos', 23191346, 10, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Totem Gumshoos', 34787019, 12, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Alolan Rattata', 23191346, 10, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                ])),
                new GymPokemon('Totem Raticate', 34787019, 12, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                ])),
            ],
            { hide: true, weight: 10, requirement: new QuestLineStepCompletedRequirement('Welcome to Paradise, Cousin!', 5, GameConstants.AchievementOption.less) }, 'of Verdant Cavern'),
    ],
    805000, 2);

dungeonList['Melemele Meadow'] = new Dungeon('Melemele Meadow',
    [
        {pokemon: 'Caterpie', options: { weight: 0.55 }},
        {pokemon: 'Metapod', options: { weight: 0.55 }},
        {pokemon: 'Butterfree', options: { weight: 0.55 }},
        {pokemon: 'Cottonee', options: { weight: 0.55 }},
        {pokemon: 'Petilil', options: { weight: 0.55 }},
        {pokemon: 'Cutiefly', options: { weight: 0.55 }},
        {pokemon: 'Buzzwole', options: { weight: 0.55, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 5)}}, // hide UBs because they show up in too many dungeons and will distract the players
        new DungeonTrainer('Actor',
            [new GymPokemon('Oricorio (Pom-Pom)', 11769270, 12)], { weight: 1 }, 'Meredith'),
    ],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [{loot: 'Meadow Plate'}],
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
            {loot: 'Star Piece'},
            {loot: 'Never_Melt_Ice'},
        ],
        mythic: [{loot: 'Max Revive'}],
    },
    11845338,
    [
        new DungeonBossPokemon('Delibird', 59226690, 12),
        new DungeonBossPokemon('Barboach', 59226690, 17),
        new DungeonBossPokemon('Squirtle', 59226690, 12, {hide: true, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Monday)}),
        new DungeonBossPokemon('Totodile', 59226690, 12, {hide: true, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Monday)}),
    ],
    830000, 3);

dungeonList['Ten Carat Hill'] = new Dungeon('Ten Carat Hill',
    [
        {pokemon: 'Zubat', options: { weight: 1 }},
        {pokemon: 'Machop', options: { weight: 1 }},
        {pokemon: 'Psyduck', options: { weight: 1 }},
        {pokemon: 'Mawile', options: { weight: 1 }},
        {pokemon: 'Roggenrola', options: { weight: 1 }},
        {pokemon: 'Necrozma', options: { weight: 0.25, hide: true, requirement: new MultiRequirement([
            new QuestLineCompletedRequirement('Ultra Beast Hunt'),
            new StatisticRequirement(['pokemonEncountered', PokemonHelper.getPokemonByName('Necrozma').id], 1, 'Must have encountered Necrozma before.'),
        ])}},
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [{loot: 'Cyan Shard'}],
        epic: [{loot: 'MediumRestore'}],
        legendary: [
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
        new DungeonBossPokemon('Onix', 59489105, 14, {hide: true, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Tuesday)}),
        new DungeonBossPokemon('Deino', 59489105, 13, {hide: true, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Tuesday)}),
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Rockruff', 59489105, 30, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vast Poni Canyon'), GameConstants.AchievementOption.less)),
                new GymPokemon('Rockruff', 23795642, 30, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vast Poni Canyon'))),
                new GymPokemon('Hakamo-o', 35693463, 36, new ClearDungeonRequirement(1, GameConstants.getDungeonIndex('Vast Poni Canyon'))),
            ],
            { hide: true, weight: 10, requirement: new QuestLineCompletedRequirement('Welcome to Paradise, Cousin!', GameConstants.AchievementOption.less) }, 'of Ten Carat Hill'),
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
        epic: [
            {loot: 'Zap Plate', weight: 2},
            {loot: 'Pikachu (Partner Cap)', ignoreDebuff : true, requirement: new TemporaryBattleRequirement('Ash Ketchum Alola')},
        ],
        legendary: [{loot: 'Magnet'}],
    },
    11952804,
    [
        new DungeonBossPokemon('Pikachu (Original Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Hoenn Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Sinnoh Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Unova Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Kalos Cap)', 59764020, 15),
        new DungeonBossPokemon('Pikachu (Alola Cap)', 59764020, 15, {hide: true, requirement: new GymBadgeRequirement(BadgeEnums.Champion_Stamp)}),
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
            {loot: 'Green Shard'},
            {loot: 'White Shard'},
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
        {pokemon: 'Marill', options: { weight: 1.43, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Saturday) }},
        {pokemon: 'Marshtomp', options: { weight: 1.43, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Saturday) }},
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
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [
            {loot: 'Splash Plate'},
            {loot: 'Diveball'},
        ],
        legendary: [{loot: 'Mystic_Water'}],
        mythic: [{loot: 'Heart Scale'}],
    },
    12138060,
    [
        new DungeonBossPokemon('Wishiwashi (School)', 60690300, 20),
        new DungeonBossPokemon('Araquanid', 60690300, 20),
        new DungeonBossPokemon('Totem Wishiwashi', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Symbiotic Relations')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonBossPokemon('Totem Araquanid', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Symbiotic Relations')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Masquerain', 15172575, 18, new MultiRequirement([
                    new OneFromManyRequirement([
                        new DayCyclePartRequirement([1]),
                        new DayCyclePartRequirement([2]),
                    ]),
                    new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Harsh_Sunlight, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy]),
                ])),
                new GymPokemon('Dewpider', 15172575, 18, new MultiRequirement([
                    new OneFromManyRequirement([
                        new DayCyclePartRequirement([1]),
                        new DayCyclePartRequirement([2]),
                    ]),
                    new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Harsh_Sunlight, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy]),
                ])),
                new GymPokemon('Totem Araquanid', 30345150, 20, new MultiRequirement([
                    new OneFromManyRequirement([
                        new DayCyclePartRequirement([1]),
                        new DayCyclePartRequirement([2]),
                    ]),
                    new WeatherRequirement([WeatherType.Clear, WeatherType.Overcast, WeatherType.Snow, WeatherType.Hail, WeatherType.Blizzard, WeatherType.Harsh_Sunlight, WeatherType.Sandstorm, WeatherType.Fog, WeatherType.Windy]),
                ])),
                new GymPokemon('Alomomola', 18207090, 18, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                    new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm]),
                ])),
                new GymPokemon('Wishiwashi (Solo)', 12138060, 18, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                    new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm]),
                ])),
                new GymPokemon('Totem Wishiwashi', 30345150, 20, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                    new WeatherRequirement([WeatherType.Rain, WeatherType.Thunderstorm]),
                ])),
            ],
            { hide: true, weight: 10, requirement: new QuestLineStepCompletedRequirement('Symbiotic Relations', 1, GameConstants.AchievementOption.less) }, 'of Brooklet Hill'),
    ],
    875000, 5);

dungeonList['Wela Volcano Park'] = new Dungeon('Wela Volcano Park',
    [
        {pokemon: 'Cubone', options: { weight: 1.7 }},
        {pokemon: 'Kangaskhan', options: { weight: 1.7 }},
        {pokemon: 'Magmar', options: { weight: 1.7 }},
        {pokemon: 'Magby', options: { weight: 1.7 }},
        {pokemon: 'Fletchling', options: { weight: 1.7 }},
        {pokemon: 'Salandit', options: { weight: 1.7 }},
        {pokemon: 'Nihilego', options: { weight: 1.7, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 3)}}, // hide UBs because they show up in too many dungeons and will distract the players
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
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Purple Shard'},
        ],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Quickball'},
        ],
        legendary: [{loot: 'Charcoal'}],
    },
    12896392,
    [
        new DungeonBossPokemon('Alolan Marowak', 64481960, 22),
        new DungeonBossPokemon('Salazzle', 64481960, 22),
        new DungeonBossPokemon('Totem Marowak', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Symbiotic Relations')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonBossPokemon('Totem Salazzle', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Symbiotic Relations')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Salandit', 16120490, 20),
                new GymPokemon('Salandit', 16120490, 20),
                new GymPokemon('Totem Salazzle', 32240980, 22, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Totem Marowak', 32240980, 22, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                ])),
            ],
            { hide: true, weight: 10, requirement: new QuestLineStepCompletedRequirement('Symbiotic Relations', 4, GameConstants.AchievementOption.less) }, 'of Wela Volcano Park'),
    ],
    900000, 7);

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
        {pokemon: 'Xurkitree', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 9)}}, // hide UBs because they show up in too many dungeons and will distract the players
    ],    {
        common: [
            {loot: 'xClick'},
            {loot: 'xAttack'},
            {loot: 'Mago'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Nestball'},
        ],
        legendary: [{loot: 'Miracle_Seed'}],
    },
    13090332,
    [
        new DungeonBossPokemon('Lurantis', 65451660, 24),
        new DungeonBossPokemon('Totem Lurantis', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Symbiotic Relations')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Castform (Sunny)', 8181457, 22),
                new GymPokemon('Trumbeak', 8181457, 22),
                new GymPokemon('Comfey', 8181457, 22),
                new GymPokemon('Kecleon', 8181457, 22),
                new GymPokemon('Totem Lurantis', 32725830, 24),
            ],
            { hide: true, weight: 10, requirement: new QuestLineStepCompletedRequirement('Symbiotic Relations', 5, GameConstants.AchievementOption.less) }, 'of Lush Jungle'),
    ],
    925000, 8);

dungeonList['Diglett\'s Tunnel'] = new Dungeon('Diglett\'s Tunnel',
    [
        {pokemon: 'Zubat', options: { weight: 6.5 }},
        {pokemon: 'Alolan Diglett', options: { weight: 6.5 }},
        {pokemon: 'Nihilego', options: { weight: 6.5, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 3)}}, // hide UBs because they show up in too many dungeons and will distract the players
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
        legendary: [{loot: 'Soft_Sand'}],
    },
    13215839,
    [new DungeonBossPokemon('Larvitar', 66079195, 23)],
    930000, 8);

dungeonList['Memorial Hill'] = new Dungeon('Memorial Hill',
    [
        {pokemon: 'Zubat', options: { weight: 7.5 }},
        {pokemon: 'Gastly', options: { weight: 7.5 }},
        {pokemon: 'Phantump', options: { weight: 7.5 }},
        {pokemon: 'Xurkitree', options: { weight: 7.5, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 9)}}, // hide UBs because they show up in too many dungeons and will distract the players
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
            {loot: 'Purple Shard'},
        ],
        epic: [
            {loot: 'Spooky Plate'},
            {loot: 'Duskball'},
        ],
        legendary: [{loot: 'Spell_Tag'}],
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
        {pokemon: 'Kartana', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 11)}}, // hide UBs because they show up in too many dungeons and will distract the players
        {pokemon: 'Celesteela', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Ultra Beast Hunt', 11)}}, // hide UBs because they show up in too many dungeons and will distract the players
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
            ], { weight: 1, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 2) }, 'Landon and Yuriko'),
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Black Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [
            {loot: 'Spooky Plate'},
            {loot: 'Luxuryball'},
        ],
        legendary: [{loot: 'Rare Bone'}],
    },
    13483476,
    [
        new DungeonBossPokemon('Alolan Persian', 76702881, 23),
        new DungeonTrainer('Tourist Couple',
            [
                new GymPokemon('Alolan Vulpix', 33708690, 28),
                new GymPokemon('Vulpix', 33708690, 28),
            ],
            { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 2, GameConstants.AchievementOption.less) }, 'Landon and Yuriko'),
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Golisopod', 33708690, 34),
                new GymPokemon('Masquerain', 33708690, 34),
            ],
            { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 2) }, 'Guzma', '(guzma)'),
    ],
    975000, 21);

dungeonList['Hokulani Observatory'] = new Dungeon('Hokulani Observatory',
    ['Grubbin', 'Charjabug', 'Elekid', 'Electabuzz', 'Skarmory', 'Dedenne'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
        ],
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
        new DungeonBossPokemon('Totem Vikavolt', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Child of the Stars')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonBossPokemon('Totem Togedemaru', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Child of the Stars')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Charjabug', 13883676, 28, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Charjabug', 20825514, 28, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Totem Vikavolt', 45121947, 29, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Dedenne', 17354595, 31, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                ])),
                new GymPokemon('Skarmory', 13883676, 32, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                ])),
                new GymPokemon('Totem Togedemaru', 27767352, 33, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                ])),
            ],
            { hide: true, weight: 10, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 2, GameConstants.AchievementOption.less) }, 'of Hokulani Observatory'),
    ],
    1000000, 22);

dungeonList['Thrifty Megamart'] = new Dungeon('Thrifty Megamart',
    ['Golbat', 'Gastly', 'Haunter', 'Gengar', 'Shuppet', 'Banette', 'Jellicent', 'Klefki'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Token_collector'},
        ],
        rare: [
            {loot: 'Purple Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [{loot: 'Spooky Plate'}],
        mythic: [{loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Thrifty Megamart'))}],
    },
    14705422,
    [
        new DungeonBossPokemon('Mimikyu', 73527110, 35),
        new DungeonBossPokemon('Totem Mimikyu', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Child of the Stars')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Gengar', 29410844, 27, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                    new DayCyclePartRequirement([3]),
                ])),
                new GymPokemon('Haunter', 29410844, 27, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Jellicent', 29410844, 33, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([3]),
                ])),
                new GymPokemon('Banette', 29410844, 32, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([2]),
                    new DayCyclePartRequirement([3]),
                ])),
                new GymPokemon('Totem Mimikyu', 36763555, 35),
            ],
            { hide: true, weight: 10, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 5, GameConstants.AchievementOption.less) }, 'of Thrifty Megamart'),
        new DungeonBossPokemon('Vivillon (Poké Ball)',  96662023, 60, {
            hide: true,
            requirement: new MultiRequirement([
                new ObtainedPokemonRequirement('Vivillon (Poké Ball)'),
                new SpecialEventRequirement('Lunar New Year'),
                new QuestLineCompletedRequirement('Child of the Stars'),
            ])}),
    ],
    1025000, 14);

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
            {loot: 'Cyan Shard'},
        ],
        epic: [{loot: 'Flame Plate'}],
        legendary: [{loot: 'Repeatball'}],
    },
    15127052,
    [
        new DungeonBossPokemon('Floette (Red)', 75635260, 36),
        new DungeonBossPokemon('Oricorio (Baile)', 75635260, 36),
        new DungeonBossPokemon('Roselia', 75635260, 34, {hide: true, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Wednesday)}),
        new DungeonBossPokemon('Grotle', 75635260, 36, {hide: true, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Wednesday)}),
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
            {loot: 'Lime Shard'},
        ],
        epic: [
            {loot: 'Insect Plate'},
            {loot: 'Toxic Plate'},
            {loot: 'Dread Plate'},
        ],
        legendary: [
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
        new DungeonTrainer('Office Worker',
            [
                new GymPokemon('Elgyem', 38351440, 40),
                new GymPokemon('Metang', 38351440, 40),
            ], { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 6)}, 'Royce', '(male)'),
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
            ], { weight: 0.75 }, undefined, '(male)'),
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
            ], { weight: 0.25 }, undefined, '(male)'),
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
    ],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Chesto'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
            {loot: 'Pink Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Iron Ball'},
            {loot: 'Mind Plate'},
        ],
        legendary: [
            {loot: 'Max Revive'},
            {loot: 'Protein', requirement: new ClearDungeonRequirement(200, GameConstants.getDungeonIndex('Aether Foundation'))},
        ],
    },
    15619682,
    [
        new DungeonTrainer('Dulse',
            [new GymPokemon('Poipole', 78098410, 47)],
            { weight: 0.25, hide: true, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 12, GameConstants.AchievementOption.less) }),
        new DungeonTrainer('Soliera',
            [new GymPokemon('Poipole', 78098410, 47)],
            { weight: 0.25, hide: true, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 12, GameConstants.AchievementOption.less) }),
        new DungeonTrainer('Aether Branch Chief',
            [
                new GymPokemon('Claydol', 26032803, 44),
                new GymPokemon('Bruxish', 26032803, 44),
                new GymPokemon('Hypno', 26032803, 44),
                new GymPokemon('You hateful little Trainer!', 26032803, 47, new MultiRequirement([new QuestLineCompletedRequirement('Eater of Light'), new SpecialEventRequirement('Hoopa Day')]), true),
            ],
            { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 9) }, 'Faba', '(faba)'),
        new DungeonTrainer('Team Skull Boss',
            [
                new GymPokemon('Golisopod', 19524602, 45),
                new GymPokemon('Vikavolt', 19524602, 45),
                new GymPokemon('Masquerain', 19524602, 45),
                new GymPokemon('Pinsir', 19524602, 45),
                new GymPokemon('You hateful little Trainer!', 19524602, 47, new MultiRequirement([new QuestLineCompletedRequirement('Eater of Light'), new SpecialEventRequirement('Hoopa Day')]), false),
            ],
            { weight: 2.5, hide: true, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 10) }, 'Guzma', '(guzma)'),
        new DungeonTrainer('Aether President',
            [
                new GymPokemon('Clefable', 15619682, 47),
                new GymPokemon('Lilligant', 15619682, 47),
                new GymPokemon('Lopunny', 15619682, 47),
                new GymPokemon('Milotic', 15619682, 47),
                new GymPokemon('Bewear', 15619682, 47),
            ],
            { weight: 5, hide: true, requirement: new QuestLineStepCompletedRequirement('Child of the Stars', 11) }, 'Lusamine', '(lusamine)'),
    ],
    1080000, 17);

dungeonList['Exeggutor Island Hill'] = new Dungeon('Exeggutor Island Hill',
    [
        {pokemon: 'Alolan Exeggutor', options: { weight: 1, hide: true, requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Emissary of Light', 2, GameConstants.AchievementOption.less), new SpecialEventRequirement('Hoopa Day')])}},
        {pokemon: 'Alolan Exeggutor', options: { weight: 1, hide: true, requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Emissary of Light', 2, GameConstants.AchievementOption.less), new SpecialEventRequirement('Hoopa Day')])}},
        {pokemon: 'Exeggcute', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Emissary of Light', 2)}},
        {pokemon: 'Alolan Exeggutor', options: { weight: 1, hide: true, requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Emissary of Light', 2, GameConstants.AchievementOption.less), new SpecialEventRequirement('Hoopa Day')])}},
        {pokemon: 'Pelipper', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Emissary of Light', 2)}},
        {pokemon: 'Alolan Exeggutor', options: { weight: 1, hide: true, requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Emissary of Light', 2, GameConstants.AchievementOption.less), new SpecialEventRequirement('Hoopa Day')])}},
        {pokemon: 'Gastrodon (East)', options: { weight: 1, hide: true, requirement: new QuestLineStepCompletedRequirement('Emissary of Light', 2)}},
        {pokemon: 'Alolan Exeggutor', options: { weight: 1, hide: true, requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Emissary of Light', 2, GameConstants.AchievementOption.less), new SpecialEventRequirement('Hoopa Day')])}},
        {pokemon: 'Alolan Exeggutor', options: { weight: 1, hide: true, requirement: new OneFromManyRequirement([new QuestLineStepCompletedRequirement('Emissary of Light', 2, GameConstants.AchievementOption.less), new SpecialEventRequirement('Hoopa Day')])}},
    ],
    {
        common: [
            {loot: 'xClick'},
            {loot: 'Dowsing_machine'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Crimson Shard'},
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
        new DungeonBossPokemon('Pinsir', 78865330, 45, { hide: true, requirement: new QuestLineStepCompletedRequirement('Emissary of Light', 2)}),
        new DungeonBossPokemon('Alolan Exeggutor', 78865330, 45, { hide: true, requirement: new SpecialEventRequirement('Hoopa Day')}),
        new DungeonBossPokemon('Tropius', 78865330, 45, { hide: true, requirement: new QuestLineStepCompletedRequirement('Emissary of Light', 2)}),
        new DungeonBossPokemon('Alolan Exeggutor', 78865330, 45),
        new DungeonBossPokemon('Serperior', 78865330, 43, {hide: true, requirement: new MultiRequirement([new DayOfWeekRequirement(GameConstants.DayOfWeek.Thursday), new QuestLineStepCompletedRequirement('Emissary of Light', 2)])}),
        new DungeonBossPokemon('Chesnaught', 78865330, 45, {hide: true, requirement: new MultiRequirement([new DayOfWeekRequirement(GameConstants.DayOfWeek.Thursday), new QuestLineStepCompletedRequirement('Emissary of Light', 2)])}),
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
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
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
        new DungeonBossPokemon('Totem Kommo-o', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Emissary of Light')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Hakamo-o', 23988066, 32),
                new GymPokemon('Scizor', 19190452, 46),
                new GymPokemon('Noivern', 23988066, 48),
                new GymPokemon('Totem Kommo-o', 55972154, 49),
            ],
            { hide: true, weight: 10, requirement: new QuestLineStepCompletedRequirement('Emissary of Light', 5, GameConstants.AchievementOption.less) }, 'of Vast Poni Canyon'),
    ],
    1125000, 25, undefined, {requirement: new QuestLineStepCompletedRequirement('Emissary of Light', 4)});

dungeonList['Mina\'s Houseboat'] = new Dungeon('Mina\'s Houseboat',
    ['Chansey', 'Wingull', 'Pelipper', 'Spritzee', 'Swirlix', 'Cutiefly', 'Comfey', 'Dhelmise'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
        rare: [
            {loot: 'Lime Shard'},
            {loot: 'Pink Shard'},
        ],
        epic: [{loot: 'Pixie Plate'}],
        legendary: [{loot: 'Fairy_Feather'}],
        mythic: [{loot: 'Heart Scale'}],
    },
    16217412,
    [
        new DungeonBossPokemon('Ribombee', 81087060, 55),
        new DungeonBossPokemon('Totem Ribombee', 82543791, 60, {hide: true, requirement: new MultiRequirement([new GymBadgeRequirement(BadgeEnums.Champion_Stamp), new QuestLineCompletedRequirement('Eater of Light')])}), //new QuestLineCompletedRequirement('Island Challenge')
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Blissey', 24326118, 53),
                new GymPokemon('Pelipper', 24326118, 52),
                new GymPokemon('Totem Ribombee', 32434824, 55),
            ],
            { hide: true, weight: 10, requirement: new QuestLineStepCompletedRequirement('Eater of Light', 3, GameConstants.AchievementOption.less) }, 'of Mina\'s Houseboat'),
    ],
    1150000, 25);

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
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
            {loot: 'Pink Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Icicle Plate'},
            {loot: 'Moonball'},
        ],
        legendary: [{loot: 'Max Revive'}],
    },
    16312850,
    [
        new DungeonBossPokemon('Golbat', 81064250, 50),
        new DungeonBossPokemon('Absol', 81064250, 50),
        new DungeonBossPokemon('Glalie', 81064250, 50),
        new DungeonBossPokemon('Vanilluxe', 81064250, 50),
        new DungeonBossPokemon('Necrozma', 83527125, 65, { requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('Eater of Light', 5), new GymBadgeRequirement(BadgeEnums.Champion_Stamp)]) }),
        new DungeonTrainer('Trial Site',
            [
                new GymPokemon('Sneasel', 20266062, 47),
                new GymPokemon('Alolan Vulpix', 24319275, 47, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Alolan Ninetales', 40532125, 50, new OneFromManyRequirement([
                    new DayCyclePartRequirement([1]),
                    new DayCyclePartRequirement([2]),
                ])),
                new GymPokemon('Alolan Sandshrew', 24319275, 47, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                ])),
                new GymPokemon('Alolan Sandslash', 40532125, 50, new OneFromManyRequirement([
                    new DayCyclePartRequirement([0]),
                    new DayCyclePartRequirement([3]),
                ])),
            ],
            { hide: true, weight: 10, requirement: new MultiRequirement([
                new QuestLineStepCompletedRequirement('Eater of Light', 5),
                new QuestLineCompletedRequirement('Eater of Light', GameConstants.AchievementOption.less),
            ]) }, 'of Mount Lanakila'),
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
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
        ],
        epic: [
            {loot: 'Mind Plate', weight: 2},
            {loot: 'Iron Plate'},
            {loot: 'Spooky Plate'},
            {loot: 'Moonball'},
        ],
    },
    16435490,
    [
        new DungeonBossPokemon('Cosmog', 82177450, 70),
        new DungeonBossPokemon('Minior (Meteor)', 82177450, 60, {hide: true, requirement: new ObtainedPokemonRequirement('Cosmoem', true)}),
        new DungeonBossPokemon('Cosmoem', 82177450, 70, {hide: true, requirement: new ObtainedPokemonRequirement('Cosmoem')}),
        new DungeonBossPokemon('Minior (Yellow Core)', 82177450, 60, {hide: true, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Solgaleo', true), new ObtainedPokemonRequirement('Necrozma', true)])}),
        new DungeonBossPokemon('Solgaleo', 90673816, 100, {hide: true, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Solgaleo'), new ObtainedPokemonRequirement('Necrozma')])}),
        new DungeonBossPokemon('Minior (Violet Core)', 82177450, 60, {hide: true, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Lunala', true), new ObtainedPokemonRequirement('Necrozma', true)])}),
        new DungeonBossPokemon('Lunala', 90673816, 100, {hide: true, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Lunala'), new ObtainedPokemonRequirement('Necrozma')])}),
    ],
    1200000, 27);

dungeonList['Ruins of Conflict'] = new Dungeon('Ruins of Conflict',
    ['Floette (Yellow)', 'Comfey', 'Ampharos', 'Electabuzz'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Cheri'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            {loot: 'Pink Shard'},
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
        new DungeonBossPokemon('Dedenne', 82177450, 55),
        new DungeonBossPokemon('Tapu Koko', 82543791, 60),
    ],
    1200000, 27, undefined, { requirement: new GymBadgeRequirement(BadgeEnums.Champion_Stamp) });

dungeonList['Ruins of Life'] = new Dungeon('Ruins of Life',
    ['Floette (White)', 'Comfey', 'Chimecho', 'Munna'],
    {
        common: [
            {loot: 'Dowsing_machine'},
            {loot: 'Cheri'},
        ],
        rare: [{loot: 'Pink Shard'}],
        epic: [
            {loot: 'Stone Plate'},
            {loot: 'Mind Plate'},
            {loot: 'Pixie Plate'},
        ],
        legendary: [{loot: 'Twisted_Spoon'}],
    },
    16435490,
    [
        new DungeonBossPokemon('Wobbuffet', 82177450, 55),
        new DungeonBossPokemon('Granbull', 82177450, 55),
        new DungeonBossPokemon('Gardevoir', 82177450, 55),
        new DungeonBossPokemon('Tapu Lele', 82543791, 60),
    ],
    1200000, 27, undefined, { requirement: new GymBadgeRequirement(BadgeEnums.Champion_Stamp) });

dungeonList['Ruins of Abundance'] = new Dungeon('Ruins of Abundance',
    ['Floette (Orange)', 'Comfey', 'Cottonee', 'Petilil'],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'Rawst'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Pink Shard'},
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
        new DungeonBossPokemon('Shiinotic', 82177450, 55),
        new DungeonBossPokemon('Tapu Bulu', 82543791, 60),
    ],
    1200000, 27, undefined, { requirement: new GymBadgeRequirement(BadgeEnums.Champion_Stamp) });

dungeonList['Ruins of Hope'] = new Dungeon('Ruins of Hope',
    ['Floette (Blue)', 'Comfey', 'Poliwhirl', 'Clamperl'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Aspear'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            {loot: 'Pink Shard'},
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
        new DungeonBossPokemon('Azumarill', 82177450, 55),
        new DungeonBossPokemon('Tapu Fini', 82543791, 60),
    ],
    1200000, 27, undefined, { requirement: new GymBadgeRequirement(BadgeEnums.Champion_Stamp) });

dungeonList['Poni Meadow'] = new Dungeon('Poni Meadow',
    [
        {pokemon: 'Magikarp', options: { weight: 0.5 }},
        {pokemon: 'Dratini', options: { weight: 0.5 }},
        {pokemon: 'Dragonair', options: { weight: 0.5, hide: true, requirement: new ObtainedPokemonRequirement('Dragonair')}},
        {pokemon: 'Cottonee', options: { weight: 0.5 }},
        {pokemon: 'Petilil', options: { weight: 0.5 }},
        {pokemon: 'Ribombee', options: { weight: 0.5 }},
        {pokemon: 'Misdreavus', options: { weight: 0.5 }},
        {pokemon: 'Barboach', options: { weight: 0.5 }},
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
            {loot: 'Power_Herb'},
        ],
    },
    16659968,
    [
        new DungeonBossPokemon('Oricorio (Sensu)', 83299840, 70),
        new DungeonBossPokemon('Floette (Blue)', 83299840, 70),
        new DungeonBossPokemon('Leavanny', 83299840, 57, {hide: true, requirement: new DayOfWeekRequirement(GameConstants.DayOfWeek.Wednesday)}),
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
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
            {loot: 'Pink Shard'},
            {loot: 'Cyan Shard'},
        ],
        epic: [
            {loot: 'Dread Plate'},
            {loot: 'Draco Plate'},
        ],
        legendary: [{loot: 'Dragon_Fang'}],
    },
    17114462,
    [
        new DungeonBossPokemon('Golbat', 85572310, 59),
        new DungeonBossPokemon('Noivern', 85572310, 59),
        new DungeonBossPokemon('Zygarde', 88406970, 60),
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
        legendary: [{loot: 'Silver_Powder'}],
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
            {loot: 'Ultraball', weight: 5},
            {loot: 'MediumRestore', weight: 1},
            {loot: 'Carkol', weight: 0.5},
            {loot: 'Woobat', weight: 0.5},
        ],
        rare: [
            {loot: 'Crimson Shard'},
            {loot: 'Brown Shard'},
        ],
        legendary: [{loot: 'Rock_Incense'}],
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
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Green Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
            {loot: 'Pink Shard'},
            {loot: 'Cyan Shard'},
            {loot: 'Brown Shard'},
            {loot: 'Rose Shard'},
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
        legendary: [{loot: 'Metal_Powder'}],
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
            { hide: true, weight: 3, requirement: new QuestLineStepCompletedRequirement('The Lair of Giants', 36, GameConstants.AchievementOption.less) }, 'Rose', '(rose)'),
        new DungeonTrainer('Macro Cosmos',
            [
                new GymPokemon('Escavalier', 26704124, 50),
                new GymPokemon('Ferrothorn', 26704124, 50),
                new GymPokemon('Perrserker', 26704124, 50),
                new GymPokemon('Klinklang', 26704124, 51),
                new GymPokemon('Gigantamax Copperajah', 26704124, 52),
            ],
            { hide: true, weight: 2, requirement: new QuestLineStepCompletedRequirement('The Lair of Giants', 36) }, 'Rose', '(rose)'),
        new DungeonBossPokemon('Zacian (Battle Hero)', 169578810, 70, {requirement: new QuestLineStepCompletedRequirement('Sword and Shield', 18)}),
        new DungeonBossPokemon('Zamazenta (Battle Hero)', 169578810, 70, {requirement: new QuestLineStepCompletedRequirement('Sword and Shield', 18)}),
        new DungeonBossPokemon('Eternatus', 169578810, 70, {hide: true, requirement: new QuestLineStepCompletedRequirement('The Lair of Giants', 36)}),
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
        epic: [
            {loot: 'LargeRestore'},
            {loot: 'Moonball'},
        ],
        legendary: [
            {loot: 'Fairy_Feather'},
            {loot: 'Flowering Celebi', ignoreDebuff: true, requirement: new QuestLineStepCompletedRequirement('Secrets of the Jungle', 13)},
        ],
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
        epic: [
            {loot: 'Revive'},
            {loot: 'Rare Bone'},
        ],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'Soft_Sand'},
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
            {loot: 'Max Revive'},
            {loot: 'Black_Belt'},
        ],
    },
    28252100,
    [new DungeonBossPokemon('Kangaskhan', 141260500, 60)],
    1730000, 38);

dungeonList['Courageous Cavern'] = new Dungeon('Courageous Cavern',
    [
        'Pincurchin', 'Dwebble', 'Crustle', 'Swoobat', 'Magikarp', 'Shellder', 'Cloyster', 'Tentacool', 'Chewtle', 'Tentacruel', 'Whiscash',
        {pokemon: 'Clobbopus', options: { hide: true, requirement: new ObtainedPokemonRequirement('Clobbopus')}},
    ],
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
        legendary: [{loot: 'Black_Glasses'}],
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
        legendary: [{loot: 'Mystic_Water'}],
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
            {loot: 'LargeRestore'},
        ],
        legendary: [
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
        rare: [{loot: 'Brown Shard'}],
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
        legendary: [{loot: 'Never_Melt_Ice'}],
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
            {loot: 'Crimson Shard'},
        ],
        legendary: [
            {loot: 'Dragon_Fang'},
            {loot: 'Magnet'},
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
            {loot: 'Rose Shard'},
        ],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Tamato'},
            {loot: 'Hondew'},
        ],
        legendary: [{loot: 'Silk_Scarf'}],
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
            {loot: 'Moonball'},
            {loot: 'Flame Plate'},
        ],
        legendary: [
            {loot: 'Fastball'},
            {loot: 'Repeatball'},
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
            {loot: 'Galarian Darmanitan (Zen)', ignoreDebuff : true},
        ],
    },
    33915762,
    [
        new DungeonBossPokemon('Galarian Rapidash', 161099869, 60),
        new DungeonBossPokemon('Abomasnow', 161099869, 60),
        new DungeonBossPokemon('Trevenant', 161099869, 60),
        new DungeonBossPokemon('Weavile', 161099869, 60),
        new DungeonBossPokemon('Calyrex', 169578810, 80, { requirement: new QuestLineStepCompletedRequirement('The Crown of Galar', 8) }),
    ],
    2200000, 55);

// Function, because we don't have 'player' on load
const maxLairQuestStepRandomIndex = (index: number) => {
    SeededRand.seed(+player.trainerId);
    return SeededRand.shuffleArray([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32])[index];
};
dungeonList['Max Lair'] = new Dungeon('Max Lair',
    ['Ivysaur', 'Charmeleon', 'Wartortle', 'Grovyle', 'Sceptile', 'Combusken', 'Blaziken', 'Marshtomp', 'Swampert', 'Cradily', 'Cofagrigus', 'Fraxure', 'Toxtricity (Amped)', 'Toxtricity (Low Key)'],
    {
        common: [
            {loot: 'xAttack'},
            {loot: 'xClick'},
        ],
        rare: [
            {loot: 'Brown Shard'},
            {loot: 'Rose Shard'},
        ],
        epic: [
            {loot: 'Draco Plate'},
            {loot: 'Toxic Plate'},
        ],
        legendary: [
            {loot: 'Duskball'},
            {loot: 'Quickball'},
            {loot: 'Fastball'},
            {loot: 'Repeatball'},
        ],
        mythic: [
            {loot: 'Carbos', weight: 2},
            {loot: 'Rare_Candy'},
        ],
    },
    33915762,
    [
        new DungeonBossPokemon('Gigantamax Venusaur', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(0)), new ObtainedPokemonRequirement('Gigantamax Venusaur', true)]) }),
        new DungeonBossPokemon('Gigantamax Venusaur', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Venusaur') }),
        new DungeonBossPokemon('Gigantamax Charizard', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(1)), new ObtainedPokemonRequirement('Gigantamax Charizard', true)]) }),
        new DungeonBossPokemon('Gigantamax Charizard', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Charizard') }),
        new DungeonBossPokemon('Gigantamax Blastoise', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(2)), new ObtainedPokemonRequirement('Gigantamax Blastoise', true)]) }),
        new DungeonBossPokemon('Gigantamax Blastoise', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Blastoise') }),
        new DungeonBossPokemon('Gigantamax Butterfree', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(3)), new ObtainedPokemonRequirement('Gigantamax Butterfree', true)]) }),
        new DungeonBossPokemon('Gigantamax Butterfree', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Butterfree') }),
        new DungeonBossPokemon('Gigantamax Pikachu', 164353300, 70, { hide: true, weight: 4, requirement: new ObtainedPokemonRequirement('Gigantamax Pikachu', true) }),
        new DungeonBossPokemon('Gigantamax Pikachu', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Pikachu') }),
        new DungeonBossPokemon('Gigantamax Meowth', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Gigantamax Meowth', true), new QuestLineStepCompletedRequirement('The Lair of Giants', 2)]) }),
        new DungeonBossPokemon('Gigantamax Meowth', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Meowth') }),
        new DungeonBossPokemon('Gigantamax Machamp', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(4)), new ObtainedPokemonRequirement('Gigantamax Machamp', true)]) }),
        new DungeonBossPokemon('Gigantamax Machamp', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Machamp') }),
        new DungeonBossPokemon('Gigantamax Gengar', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(5)), new ObtainedPokemonRequirement('Gigantamax Gengar', true)]) }),
        new DungeonBossPokemon('Gigantamax Gengar', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Gengar') }),
        new DungeonBossPokemon('Gigantamax Kingler', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(6)), new ObtainedPokemonRequirement('Gigantamax Kingler', true)]) }),
        new DungeonBossPokemon('Gigantamax Kingler', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Kingler') }),
        new DungeonBossPokemon('Gigantamax Lapras', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(7)), new ObtainedPokemonRequirement('Gigantamax Lapras', true)]) }),
        new DungeonBossPokemon('Gigantamax Lapras', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Lapras') }),
        new DungeonBossPokemon('Gigantamax Eevee', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new ObtainedPokemonRequirement('Gigantamax Eevee', true), new QuestLineStepCompletedRequirement('The Lair of Giants', 2)]) }),
        new DungeonBossPokemon('Gigantamax Eevee', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Eevee') }),
        new DungeonBossPokemon('Gigantamax Snorlax', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(8)), new ObtainedPokemonRequirement('Gigantamax Snorlax', true)]) }),
        new DungeonBossPokemon('Gigantamax Snorlax', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Snorlax') }),
        new DungeonBossPokemon('Gigantamax Garbodor', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(9)), new ObtainedPokemonRequirement('Gigantamax Garbodor', true)]) }),
        new DungeonBossPokemon('Gigantamax Garbodor', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Garbodor') }),
        new DungeonBossPokemon('Gigantamax Melmetal', 169578810, 70, { hide: true, weight: 2, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(10)), new ObtainedPokemonRequirement('Gigantamax Melmetal', true)]) }),
        new DungeonBossPokemon('Gigantamax Melmetal', 169578810, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Melmetal') }),
        new DungeonBossPokemon('Gigantamax Rillaboom', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(11)), new ObtainedPokemonRequirement('Gigantamax Rillaboom', true)]) }),
        new DungeonBossPokemon('Gigantamax Rillaboom', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Rillaboom') }),
        new DungeonBossPokemon('Gigantamax Cinderace', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(12)), new ObtainedPokemonRequirement('Gigantamax Cinderace', true)]) }),
        new DungeonBossPokemon('Gigantamax Cinderace', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Cinderace') }),
        new DungeonBossPokemon('Gigantamax Inteleon', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(13)), new ObtainedPokemonRequirement('Gigantamax Inteleon', true)]) }),
        new DungeonBossPokemon('Gigantamax Inteleon', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Inteleon') }),
        new DungeonBossPokemon('Gigantamax Corviknight', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(14)), new ObtainedPokemonRequirement('Gigantamax Corviknight', true)]) }),
        new DungeonBossPokemon('Gigantamax Corviknight', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Corviknight') }),
        new DungeonBossPokemon('Gigantamax Orbeetle', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(15)), new ObtainedPokemonRequirement('Gigantamax Orbeetle', true)]) }),
        new DungeonBossPokemon('Gigantamax Orbeetle', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Orbeetle') }),
        new DungeonBossPokemon('Gigantamax Drednaw', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(16)), new ObtainedPokemonRequirement('Gigantamax Drednaw', true)]) }),
        new DungeonBossPokemon('Gigantamax Drednaw', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Drednaw') }),
        new DungeonBossPokemon('Gigantamax Coalossal', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(17)), new ObtainedPokemonRequirement('Gigantamax Coalossal', true)]) }),
        new DungeonBossPokemon('Gigantamax Coalossal', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Coalossal') }),
        new DungeonBossPokemon('Gigantamax Flapple', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(18)), new ObtainedPokemonRequirement('Gigantamax Flapple', true)]) }),
        new DungeonBossPokemon('Gigantamax Flapple', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Flapple') }),
        new DungeonBossPokemon('Gigantamax Appletun', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(19)), new ObtainedPokemonRequirement('Gigantamax Appletun', true)]) }),
        new DungeonBossPokemon('Gigantamax Appletun', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Appletun') }),
        new DungeonBossPokemon('Gigantamax Sandaconda', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(20)), new ObtainedPokemonRequirement('Gigantamax Sandaconda', true)]) }),
        new DungeonBossPokemon('Gigantamax Sandaconda', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Sandaconda') }),
        new DungeonBossPokemon('Gigantamax Toxtricity', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(21)), new ObtainedPokemonRequirement('Gigantamax Toxtricity', true)]) }),
        new DungeonBossPokemon('Gigantamax Toxtricity', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Toxtricity') }),
        new DungeonBossPokemon('Gigantamax Centiskorch', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(22)), new ObtainedPokemonRequirement('Gigantamax Centiskorch', true)]) }),
        new DungeonBossPokemon('Gigantamax Centiskorch', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Centiskorch') }),
        new DungeonBossPokemon('Gigantamax Hatterene', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(23)), new ObtainedPokemonRequirement('Gigantamax Hatterene', true)]) }),
        new DungeonBossPokemon('Gigantamax Hatterene', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Hatterene') }),
        new DungeonBossPokemon('Gigantamax Grimmsnarl', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(24)), new ObtainedPokemonRequirement('Gigantamax Grimmsnarl', true)]) }),
        new DungeonBossPokemon('Gigantamax Grimmsnarl', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Grimmsnarl') }),
        new DungeonBossPokemon('Gigantamax Alcremie', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(25)), new ObtainedPokemonRequirement('Gigantamax Alcremie', true)]) }),
        new DungeonBossPokemon('Gigantamax Alcremie', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Alcremie') }),
        new DungeonBossPokemon('Gigantamax Copperajah', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(26)), new ObtainedPokemonRequirement('Gigantamax Copperajah', true)]) }),
        new DungeonBossPokemon('Gigantamax Copperajah', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Copperajah') }),
        new DungeonBossPokemon('Gigantamax Duraludon', 164353300, 70, { hide: true, weight: 4, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(27)), new ObtainedPokemonRequirement('Gigantamax Duraludon', true)]) }),
        new DungeonBossPokemon('Gigantamax Duraludon', 164353300, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Duraludon') }),
        new DungeonBossPokemon('Gigantamax Urshifu (Single Strike)', 169578810, 70, { hide: true, weight: 2, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(28)), new ObtainedPokemonRequirement('Gigantamax Urshifu (Single Strike)', true)]) }),
        new DungeonBossPokemon('Gigantamax Urshifu (Single Strike)', 169578810, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Urshifu (Single Strike)') }),
        new DungeonBossPokemon('Gigantamax Urshifu (Rapid Strike)', 169578810, 70, { hide: true, weight: 2, requirement: new MultiRequirement([new QuestLineStepCompletedRequirement('The Lair of Giants', () => maxLairQuestStepRandomIndex(29)), new ObtainedPokemonRequirement('Gigantamax Urshifu (Rapid Strike)', true)]) }),
        new DungeonBossPokemon('Gigantamax Urshifu (Rapid Strike)', 169578810, 70, { hide: true, requirement: new ObtainedPokemonRequirement('Gigantamax Urshifu (Rapid Strike)') }),
        new DungeonBossPokemon('Eternamax Eternatus', 176361964, 100, { hide: true, requirement: new QuestLineCompletedRequirement('The Lair of Giants') }),
    ],
    2500000, 46);

//Hisui Dungeons

dungeonList['Floaro Gardens'] = new Dungeon('Floaro Gardens',
    ['Wurmple', 'Silcoon', 'Cascoon', 'Pichu', 'Drifloon', 'Shinx', 'Luxio'],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Rawst'},
            {loot: 'Leppa'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Nanab'},
            {loot: 'Pinap'},
        ],
        rare: [{loot: 'Green Shard'}],
        epic: [
            {loot: 'Meadow Plate'},
            {loot: 'Star Piece'},
        ],
        legendary: [{loot: 'Miracle_Seed'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Beautifly', 10000000, 31),
        new DungeonBossPokemon('Dustox', 10000000, 31),
        new DungeonBossPokemon('Shaymin (Land)', 10000000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
    ],
    96500, 1);

dungeonList['Oreburrow Tunnel'] = new Dungeon('Oreburrow Tunnel',
    ['Geodude', 'Machop', 'Zubat', 'Happiny'],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Rawst'},
            {loot: 'Leppa'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Nanab'},
            {loot: 'Pinap'},
        ],
        rare: [
            {loot: 'Brown Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Stone Plate'}],
        legendary: [{loot: 'Rock_Incense'}],
    },
    2603000,
    [new DungeonBossPokemon('Graveler', 10000000, 28)],
    96500, 11);

dungeonList.Heartwood = new Dungeon('Heartwood',
    ['Geodude', 'Zubat', 'Golbat', 'Psyduck', 'Wurmple', 'Silcoon', 'Cascoon', 'Combee', 'Buneary'],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Rawst'},
            {loot: 'Leppa'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Nanab'},
            {loot: 'Pinap'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Lime Shard'},
        ],
        epic: [{loot: 'Insect Plate'}],
        legendary: [{loot: 'Silver_Powder'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Scyther', 10000000, 31),
        new DungeonBossPokemon('Beautifly', 10000000, 31),
        new DungeonBossPokemon('Dustox', 10000000, 31),
    ],
    96500, 10);

// All Unown
SeededRand.seed(123);
const AncientSolaceonUnownList = SeededRand.shuffleArray('ABCDEFGHIJKLMNOPQRSTUVWXYZ?!'.split(''));

dungeonList['Ancient Solaceon Ruins'] = new Dungeon('Ancient Solaceon Ruins',
    ['Paras', 'Carnivine', 'Croagunk', 'Yanma', 'Stunky', 'Kirlia'],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Pecha'},
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Leppa'},
            {loot: 'Razz'},
        ],
        rare: [
            {loot: 'Pink Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Mind Plate'}],
        legendary: [{loot: 'Twisted_Spoon'}],
    },
    960000,
    [
        ...SolaceonUnownList.map((char) => new DungeonBossPokemon(`Unown (${char})` as PokemonNameType, 4100000, 30, {
            hide: true,
            requirement: new SeededDateRequirement(() => SeededDateRand.fromArray(AncientSolaceonUnownList) == char),
        })),
    ],
    96500, 13);

dungeonList['Shrouded Ruins'] = new Dungeon('Shrouded Ruins',
    ['Geodude', 'Graveler', 'Rhyhorn', 'Gastly', 'Haunter', 'Lickitung', 'Ralts', 'Kirlia', 'Carnivine', 'Burmy (Sand)'],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Pecha'},
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Leppa'},
            {loot: 'Razz'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Black Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [
            {loot: 'Spooky Plate'},
            {loot: 'Dread Plate'},
        ],
        legendary: [{loot: 'Black_Glasses'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Lickilicky', 10000000, 52),
        new DungeonBossPokemon('Spiritomb', 10000000, 80),
    ],
    96500, 16);

dungeonList['Veilstone Cape'] = new Dungeon('Veilstone Cape',
    ['Glameow', 'Murkrow', 'Vulpix', 'Mothim', 'Burmy (Trash)', 'Wormadam (Trash)', 'Geodude', 'Graveler'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Green Shard'},
            {loot: 'Blue Shard'},
        ],
        epic: [{loot: 'Flame Plate'}],
        legendary: [
            {loot: 'Charcoal'},
            {loot: 'Rock_Incense'},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Purugly', 10000000, 45),
        new DungeonBossPokemon('Beautifly', 10000000, 47),
        new DungeonBossPokemon('Dustox', 10000000, 47),
        new DungeonBossPokemon('Hisuian Growlithe', 10000000, 47),
    ],
    96500, 31);

dungeonList['Firespit Island'] = new Dungeon('Firespit Island',
    ['Graveler', 'Magby', 'Magmar'],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Pecha'},
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Leppa'},
            {loot: 'Razz'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Grey Shard'},
        ],
        epic: [
            {loot: 'Flame Plate'},
            {loot: 'Iron Plate'},
        ],
        legendary: [
            {loot: 'Charcoal'},
            {loot: 'Metal_Powder'},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Ninetales', 10000000, 61),
        new DungeonBossPokemon('Heatran', 10000000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
    ],
    96500, 36);

dungeonList['Ancient Wayward Cave'] = new Dungeon('Ancient Wayward Cave',
    ['Zubat', 'Golbat', 'Barboach', 'Whiscash', 'Gible'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Chesto', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Aspear', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Mago', weight: 2},
            {loot: 'Iapapa', weight: 2},
            {loot: 'Wiki', weight: 2},
            {loot: 'Aguav', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Cyan Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Revive'}],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'MediumRestore'},
            {loot: 'LargeRestore'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Ancient Wayward Cave'))},
        ],
    },
    2603000,
    [new DungeonBossPokemon('Crobat', 10000000, 60)],
    96500, 38);

dungeonList['Ancient Quarry'] = new Dungeon('Ancient Quarry',
    ['Bronzor', 'Goomy', 'Stunky', 'Croagunk', 'Skuntank', 'Toxicroak'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Chesto', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Aspear', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Mago', weight: 2},
            {loot: 'Iapapa', weight: 2},
            {loot: 'Wiki', weight: 2},
            {loot: 'Aguav', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Grey Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Revive'}],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'MediumRestore'},
            {loot: 'LargeRestore'},
            {loot: 'Metal_Powder'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Ancient Quarry'))},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Bronzong', 10000000, 55),
        new DungeonBossPokemon('Hisuian Sliggoo', 10000000, 55),
    ],
    96500, 39);

dungeonList['Primeval Grotto'] = new Dungeon('Primeval Grotto',
    ['Bronzor', 'Scyther', 'Gligar', 'Nosepass', 'Gyarados', 'Cherubi', 'Cherrim (Overcast)'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Chesto', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Aspear', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Mago', weight: 2},
            {loot: 'Iapapa', weight: 2},
            {loot: 'Wiki', weight: 2},
            {loot: 'Aguav', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Brown Shard'},
            {loot: 'Purple Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Revive'}],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'MediumRestore'},
            {loot: 'LargeRestore'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Primeval Grotto'))},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Probopass', 10000000, 71),
        new DungeonBossPokemon('Gliscor', 10000000, 71),
        new DungeonBossPokemon('Hisuian Sneasel', 10000000, 71),
    ],
    96500, 42);

dungeonList['Clamberclaw Cliffs'] = new Dungeon('Clamberclaw Cliffs',
    ['Gligar', 'Geodude', 'Graveler', 'Gastly', 'Haunter', 'Gible', 'Burmy (Sand)', 'Wormadam (Sand)', 'Bronzor'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Chesto', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Aspear', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Mago', weight: 2},
            {loot: 'Iapapa', weight: 2},
            {loot: 'Wiki', weight: 2},
            {loot: 'Aguav', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Black Shard'},
            {loot: 'Purple Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [
            {loot: 'Revive'},
            {loot: 'Toxic Plate'},
        ],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'MediumRestore'},
            {loot: 'LargeRestore'},
            {loot: 'Poison_Barb'},
            {loot: 'Black_Glasses'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Clamberclaw Cliffs'))},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Bronzong', 10000000, 44),
        new DungeonBossPokemon('Gabite', 10000000, 47),
        new DungeonBossPokemon('Darkrai', 10000000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
    ],
    96500, 40);

dungeonList['Celestica Ruins'] = new Dungeon('Celestica Ruins',
    ['Geodude', 'Graveler', 'Nosepass', 'Gligar', 'Burmy (Sand)', 'Gastly', 'Haunter', 'Bonsly', 'Misdreavus'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Chesto', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Aspear', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Mago', weight: 2},
            {loot: 'Iapapa', weight: 2},
            {loot: 'Wiki', weight: 2},
            {loot: 'Aguav', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Lime Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Revive'}],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'MediumRestore'},
            {loot: 'LargeRestore'},
            {loot: 'Silver_Powder'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Celestica Ruins'))},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Sudowoodo', 10000000, 57),
        new DungeonBossPokemon('Wormadam (Sand)', 10000000, 57),
    ],
    96500, 40);

dungeonList['Sacred Plaza'] = new Dungeon('Sacred Plaza',
    ['Geodude', 'Graveler', 'Rhyhorn', 'Gastly', 'Haunter', 'Burmy (Sand)', 'Wormadam (Sand)', 'Nosepass', 'Luxio', 'Chingling', 'Chimecho', 'Misdreavus', 'Rotom', 'Hisuian Voltorb'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Chesto', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Aspear', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Mago', weight: 2},
            {loot: 'Iapapa', weight: 2},
            {loot: 'Wiki', weight: 2},
            {loot: 'Aguav', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Revive'}],
        legendary: [
            {loot: 'Star Piece'},
            {loot: 'MediumRestore'},
            {loot: 'LargeRestore'},
            {loot: 'Soft_Sand'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Celestica Ruins'))},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Rhydon', 10000000, 71),
        new DungeonBossPokemon('Luxray', 10000000, 55),
    ],
    96500, 45);

dungeonList['Avalugg\'s Legacy'] = new Dungeon('Avalugg\'s Legacy',
    ['Hisuian Sneasel', 'Bergmite', 'Swinub', 'Piloswine', 'Drifloon', 'Drifblim', 'Bibarel', 'Glalie', 'Froslass'],
    {
        common: [
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Leppa'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Razz'},
        ],
        rare: [
            {loot: 'White Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Icicle Plate'}],
        legendary: [{loot: 'Never_Melt_Ice'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Mamoswine', 10000000, 68),
        new DungeonBossPokemon('Hisuian Avalugg', 10000000, 51),
    ],
    96500, 48);

dungeonList['Ice Column Chamber'] = new Dungeon('Ice Column Chamber',
    ['Bergmite', 'Misdreavus'],
    {
        common: [
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Pecha'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Razz'},
        ],
        rare: [{loot: 'White Shard'}],
        epic: [{loot: 'Icicle Plate'}],
    },
    2603000,
    [new DungeonBossPokemon('Froslass', 10000000, 72)],
    96500, 51);

dungeonList['Icepeak Cavern'] = new Dungeon('Icepeak Cavern',
    ['Bergmite', 'Misdreavus', 'Hisuian Zorua'],
    {
        common: [
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Pecha'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Razz'},
        ],
        rare: [
            {loot: 'White Shard'},
            {loot: 'Purple Shard'},
        ],
        epic: [{loot: 'Icicle Plate'}],
        legendary: [{loot: 'Never_Melt_Ice'}],
    },
    2603000,
    [new DungeonBossPokemon('Hisuian Zoroark', 10000000, 67)],
    96500, 49);

dungeonList['Ancient Snowpoint Temple'] = new Dungeon('Ancient Snowpoint Temple',
    ['Zubat', 'Golbat', 'Graveler', 'Ralts', 'Kirlia', 'Glalie', 'Froslass', 'Bronzor', 'Bronzong'],
    {
        common: [
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Pecha'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Razz'},
        ],
        rare: [{loot: 'White Shard'}],
        // epic: [{loot: 'Blank Plate'}],
        legendary: [{loot: 'Silk_Scarf'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Gallade', 10000000, 70),
        new DungeonBossPokemon('Regigigas', 10000000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
    ],
    96500, 54);

dungeonList['Seaside Hollow'] = new Dungeon('Seaside Hollow',
    ['Octillery', 'Phione'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [{loot: 'Blue Shard'}],
        epic: [{loot: 'Splash Plate'}],
        legendary: [{loot: 'Mystic_Water'}],
    },
    2603000,
    [new DungeonBossPokemon('Manaphy', 10000000, 50)],
    96500, 36);

dungeonList['Ancient Lake Verity'] = new Dungeon('Ancient Lake Verity',
    ['Magikarp', 'Gyarados', 'Luxio', 'Luxray', 'Wormadam (Plant)', 'Drifblim', 'Togekiss'],
    {
        common: [
            {loot: 'Cheri'},
            {loot: 'Rawst'},
            {loot: 'Leppa'},
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Razz'},
            {loot: 'Nanab'},
            {loot: 'Pinap'},
        ],
        rare: [
            {loot: 'Red Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Draco Plate'}],
        legendary: [{loot: 'Twisted_Spoon'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Hisuian Goodra', 10000000, 58),
        new DungeonBossPokemon('Mesprit', 10000000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
    ],
    96500, 3);

dungeonList['Ancient Lake Valor'] = new Dungeon('Ancient Lake Valor',
    ['Graveler', 'Barboach', 'Whiscash'],
    {
        common: [
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Cheri'},
            {loot: 'Pecha'},
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Leppa'},
            {loot: 'Razz'},
        ],
        rare: [
            {loot: 'Blue Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Draco Plate'}],
        legendary: [{loot: 'Twisted_Spoon'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Overqwil', 10000000, 58),
        new DungeonBossPokemon('Azelf', 10000000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
    ],
    96500, 16);

dungeonList['Ancient Lake Acuity'] = new Dungeon('Ancient Lake Acuity',
    ['Abra', 'Kadabra', 'Chingling', 'Chimecho', 'Burmy (Trash)', 'Wormadam (Trash)', 'Rufflet', 'Basculin (White-Striped)'],
    {
        common: [
            {loot: 'Oran'},
            {loot: 'Sitrus'},
            {loot: 'Chesto'},
            {loot: 'Aspear'},
            {loot: 'Leppa'},
            {loot: 'Razz'},
        ],
        rare: [
            {loot: 'Yellow Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [{loot: 'Draco Plate'}],
        legendary: [{loot: 'Twisted_Spoon'}],
    },
    2603000,
    [
        new DungeonBossPokemon('Hisuian Zoroark', 10000000, 58),
        new DungeonBossPokemon('Uxie', 10000000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
    ],
    96500, 54);

dungeonList['Temple of Sinnoh'] = new Dungeon('Temple of Sinnoh',
    ['Bronzong', 'Floatzel', 'Magnezone', 'Lumineon', 'Lucario', 'Bibarel', 'Garchomp'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Chesto', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Aspear', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Figy', weight: 2},
            {loot: 'Mago', weight: 2},
            {loot: 'Iapapa', weight: 2},
            {loot: 'Wiki', weight: 2},
            {loot: 'Aguav', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Red Shard'},
            {loot: 'Blue Shard'},
            {loot: 'Yellow Shard'},
            {loot: 'Green Shard'},
            {loot: 'Purple Shard'},
            {loot: 'Grey Shard'},
            {loot: 'Ochre Shard'},
            {loot: 'Crimson Shard'},
            {loot: 'Lime Shard'},
            {loot: 'Black Shard'},
            {loot: 'White Shard'},
            {loot: 'Pink Shard'},
            {loot: 'Cyan Shard'},
            {loot: 'Brown Shard'},
            {loot: 'Rose Shard'},
            // {loot: 'Beige Shard'},
        ],
        epic: [
            // {loot: 'Blank Plate'},
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
            {loot: 'Revive'},
        ],
        legendary: [
            {loot: 'MediumRestore'},
            {loot: 'LargeRestore'},
            {loot: 'Silk_Scarf'},
        ],
        mythic: [
            {loot: 'Max Revive'},
            {loot: 'Lum', requirement: new ClearDungeonRequirement(100, GameConstants.getDungeonIndex('Temple of Sinnoh'))},
        ],
    },
    1350400,
    [
        new DungeonTrainer('The Galaxy Team\'s Kamado',
            [
                new GymPokemon('Hisuian Braviary', 1128000, 61),
                new GymPokemon('Golem', 1128000, 61),
                new GymPokemon('Clefable', 1128000, 61),
                new GymPokemon('Snorlax', 1128000, 61),
            ], { weight: 4 }),
        new DungeonBossPokemon('Dialga (Origin)', 11880000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
        new DungeonBossPokemon('Palkia (Origin)', 11880000, 70, {hide: true, requirement: new DevelopmentRequirement()}),
    ],
    96500, 46);

dungeonList['Turnback Cave'] = new Dungeon('Turnback Cave',
    ['Gabite', 'Hisuian Sliggoo', 'Dusclops', 'Gengar', 'Rotom', 'Drifblim', 'Hisuian Zorua'],
    {
        common: [
            {loot: 'Cheri', weight: 2},
            {loot: 'Pecha', weight: 2},
            {loot: 'Rawst', weight: 2},
            {loot: 'Oran', weight: 2},
            {loot: 'Sitrus', weight: 2},
            {loot: 'Nanab', weight: 2},
            {loot: 'Leppa', weight: 2},
            {loot: 'Pinap', weight: 2},
            {loot: 'Razz', weight: 2},
            {loot: 'Pokeball', weight: 2},
            {loot: 'Greatball', weight: 1.5},
            {loot: 'Ultraball'},
        ],
        rare: [
            {loot: 'Purple Shard'},
            {loot: 'Black Shard'},
        ],
        epic: [
            {loot: 'Spooky Plate'},
            {loot: 'Draco Plate'},
        ],
        legendary: [
            {loot: 'Spell_Tag'},
            {loot: 'Dragon_Fang'},
        ],
    },
    2603000,
    [
        new DungeonBossPokemon('Garchomp', 10000000, 58),
        new DungeonBossPokemon('Dusknoir', 10000000, 58),
        new DungeonBossPokemon('Mismagius', 10000000, 58),
        new DungeonBossPokemon('Froslass', 10000000, 58),
        new DungeonBossPokemon('Giratina (Origin)', 10000000, 70),
    ],
    96500, 32);

// Paldea Dungeons
dungeonList['Inlet Grotto'] = new Dungeon('Inlet Grotto',
    ['Diglett', 'Houndour', 'Yungoos'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
    },
    33915762,
    [new DungeonBossPokemon('Houndoom', 161099869, 30)],
    2200000, 1);

//This is ridiculous. Should certainly be split up if a way to do so is found, and possibly some encounters removed outright.
dungeonList['Glaseado Mountain'] = new Dungeon('Glaseado Mountain',
    ['Magneton', 'Haunter', 'Sneasel', 'Ursaring', 'Delibird', 'Kirlia', 'Gardevoir', 'Vigoroth', 'Grumpig'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
    },
    33915762,
    [
        new DungeonBossPokemon('Spiritomb', 161099869, 30),
        new DungeonBossPokemon('Cetitan', 161099869, 30),
        new DungeonBossPokemon('Arctibax', 161099869, 30),
    ],
    2200000, 1);

dungeonList['Grasswither Shrine'] = new Dungeon('Grasswither Shrine',
    ['Shiftry', 'Cacturne'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
    },
    33915762,
    [new DungeonBossPokemon('Wo-Chien', 161099869, 60)],
    2200000, 1);

dungeonList['Icerend Shrine'] = new Dungeon('Icerend Shrine',
    ['Weavile'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
    },
    33915762,
    [new DungeonBossPokemon('Chien-Pao', 161099869, 60)],
    2200000, 1);

dungeonList['Groundblight Shrine'] = new Dungeon('Groundblight Shrine',
    ['Krookodile'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
    },
    33915762,
    [new DungeonBossPokemon('Ting-Lu', 161099869, 60)],
    2200000, 1);

dungeonList['Firescourge Shrine'] = new Dungeon('Firescourge Shrine',
    ['Houndoom'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
    },
    33915762,
    [new DungeonBossPokemon('Chi-Yu', 161099869, 60)],
    2200000, 1);

// May be split up into two areas (Area Zero: Heights & Area Zero: Lower (Needs better name)).
//To have some of the regular Paradox mons be exclusive to one area, I am likely going to have Slither Wing/Iron Moth and Sandy Shocks/Iron Thorns be exclusive to Area Zero (pretty sure they actually are, anyway), and Great Tusk/Iron Treads and Flutter Mane/Iron Jugulis be exclusive to Area Zero Depths
dungeonList['Area Zero'] = new Dungeon('Area Zero',
    ['Venomoth', 'Meditite', 'Medicham', 'Braviary', 'Corviknight', 'Floette (White)', 'Raichu', 'Jumpluff', 'Girafarig', 'Volcarona', 'Frosmoth', 'Farigiraf', 'Swablu', 'Altaria', 'Flamigo', 'Phanpy', 'Donphan', 'Talonflame', 'Lycanroc (Midday)', 'Lycanroc (Midnight)', 'Garganacl', 'Masquerain', 'Tadbulb', 'Bellibolt', 'Pawniard', 'Bisharp', 'Numel', 'Camerupt', 'Sneasel', 'Weavile', 'Scream Tail', 'Iron Bundle', 'Brute Bonnet', 'Iron Hands', 'Flutter Mane', 'Iron Jugulis', 'Slither Wing', 'Iron Moth', 'Sandy Shocks', 'Iron Thorns'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
    },
    33915762,
    [
        new DungeonBossPokemon('Glimmora', 161099869, 30, { weight: 4 }),
        new DungeonBossPokemon('Roaring Moon', 161099869, 30, {hide: true, weight: 2, requirement: new TemporaryBattleRequirement('Paradise Protection Protocol')}),
        new DungeonBossPokemon('Iron Valiant', 161099869, 30, {hide: true, weight: 2, requirement: new TemporaryBattleRequirement('Paradise Protection Protocol')}),
    ],
    2200000, 1);

dungeonList['Area Zero Depths'] = new Dungeon('Area Zero Depths',
    ['Glimmet', 'Dunsparce', 'Gible', 'Gabite', 'Sableye', 'Garganacl', 'Greavard', 'Houndstone', 'Dugtrio', 'Zweilous', 'Dreepy', 'Drakloak', 'Espathra', 'Dudunsparce (Two-Segment)', 'Great Tusk', 'Iron Treads', 'Scream Tail', 'Iron Bundle', 'Flutter Mane', 'Iron Jugulis', 'Brute Bonnet', 'Iron Hands', /*Slither Wing and Iron Moth are only found in Grass. I have never seen Grass, nor these Pokémon, in the depths, so they may not actually spawn here*/'Slither Wing', 'Iron Moth', /*Sandy Shocks have the same situation as Slither Wing and Iron Moth, except in Rocky environment*/'Sandy Shocks', 'Iron Thorns'],
    {
        common: [
            {loot: 'Lucky_egg'},
            {loot: 'Lucky_incense'},
        ],
        epic: [{loot: 'Heart Scale'}],
    },
    33915762,
    [
        new DungeonBossPokemon('Glimmora', 161099869, 30, { weight: 5 }),
        new DungeonBossPokemon('Koraidon', 161099869, 30, {hide: true, requirement: new TemporaryBattleRequirement('Paradise Protection Protocol')}),
        new DungeonBossPokemon('Miraidon', 161099869, 30, {hide: true, requirement: new TemporaryBattleRequirement('Paradise Protection Protocol')}),
    ],
    2200000, 1);
