/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: Record<string, any>;

    static events: SpecialEvent[] = [];

    static newEvent(title: string, description: string, startTime: Date, startFunction: EmptyCallback, endTime: Date, endFunction: EmptyCallback) {
        // Check if the event exist before adding it again
        if (!SpecialEvents.events.find(event => event.title == title)) {
            SpecialEvents.events.push(new SpecialEvent(title, description, startTime, startFunction, endTime, endFunction));
        }
    }

    initialize(): void {
        SpecialEvents.events.forEach(event => event.initialize());
    }

    fromJSON(json: any): void {
        if (!json) {
            return;
        }
    }

    toJSON() {
        return {
            // no data to save yet
        };
    }

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {}  // This method intentionally left blank

    getEvent(eventName: string) {
        return SpecialEvents.events.find((e) => e.title == eventName);
    }
}

// TODO: Fetch events from a server each 1/2/3/6/12/24 hours?
// Create our events here for now (yearly)

// Lunar New Year
SpecialEvents.newEvent('Lunar New Year', 'Two kinds of Vivillon are roaming Kalos and later regions, and ones you\'ve previously caught have returned. Check the Photobook in Santalune City for hints!',
    // Start
    new Date(new Date().getFullYear(), 0, 24, 1), () => {
        ([
            ['Lake Verity', 'Vivillon (Marine)'],
            ['Lake Acuity', 'Vivillon (Marine)'],
            ['Lake Valor', 'Vivillon (Marine)'],
            ['Cerulean Cave', 'Vivillon (Modern)'],
            ['Moor of Icirrus', 'Vivillon (Jungle)'],
            ['Dark Cave', 'Vivillon (Monsoon)'],
            ['Poké Ball Factory', 'Vivillon (Tundra)'],
            ['Mt. Chimney Crater', 'Vivillon (Sun)'],
            ['Sprout Tower', 'Vivillon (Archipelago)'],
            ['Lost Hotel', 'Vivillon (Elegant)'],
            ['Dreamyard', 'Vivillon (Ocean)'],
            ['New Mauville', 'Vivillon (Continental)'],
            ['Sky Pillar', 'Vivillon (Polar)'],
            ['Relic Castle', 'Vivillon (Sandstorm)'],
            ['Flower Paradise', 'Vivillon (Garden)'],
            ['Mt. Moon', 'Vivillon (High Plains)'],
            ['Dragonspiral Tower', 'Vivillon (Savanna)'],
            ['Frost Cavern', 'Vivillon (Icy Snow)'],
            ['Thrifty Megamart', 'Vivillon (Poké Ball)'],
        ] as [string, PokemonNameType][]).forEach(([location, vivillon]) => {
            dungeonList[location].bossList.push(
                new DungeonBossPokemon(vivillon, 96662023, 60, {
                    hide: true,
                    requirement: new ObtainedPokemonRequirement(vivillon),
                })
            );
        });
        dungeonList['Eterna Forest'].bossList.push(new DungeonBossPokemon('Vivillon (River)', 96662023, 60, {hide: true, requirement: new MultiRequirement([
            new ObtainedPokemonRequirement('Vivillon (River)'),
            new OneFromManyRequirement([
                new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 7, GameConstants.AchievementOption.less),
                new QuestLineStepCompletedRequirement('Recover the Precious Egg!', 8),
            ]),
        ])}));
        TownList['Santalune City'].npcs.push(VivillonPhotobook);
    },
    // End
    new Date(new Date().getFullYear(), 1, 7, 23), () => {
        [
            ['Lake Verity', 'Vivillon (Marine)'],
            ['Lake Acuity', 'Vivillon (Marine)'],
            ['Lake Valor', 'Vivillon (Marine)'],
            ['Cerulean Cave', 'Vivillon (Modern)'],
            ['Moor of Icirrus', 'Vivillon (Jungle)'],
            ['Dark Cave', 'Vivillon (Monsoon)'],
            ['Poké Ball Factory', 'Vivillon (Tundra)'],
            ['Mt. Chimney Crater', 'Vivillon (Sun)'],
            ['Sprout Tower', 'Vivillon (Archipelago)'],
            ['Lost Hotel', 'Vivillon (Elegant)'],
            ['Dreamyard', 'Vivillon (Ocean)'],
            ['New Mauville', 'Vivillon (Continental)'],
            ['Eterna Forest', 'Vivillon (River)'],
            ['Sky Pillar', 'Vivillon (Polar)'],
            ['Relic Castle', 'Vivillon (Sandstorm)'],
            ['Flower Paradise', 'Vivillon (Garden)'],
            ['Mt. Moon', 'Vivillon (High Plains)'],
            ['Dragonspiral Tower', 'Vivillon (Savanna)'],
            ['Frost Cavern', 'Vivillon (Icy Snow)'],
            ['Thrifty Megamart', 'Vivillon (Poké Ball)'],
        ].forEach(([location, vivillon]) => {
            dungeonList[location].bossList = dungeonList[location].bossList
                .filter(boss => boss.name != vivillon || (boss.name == vivillon && !boss.options?.requirement));
        });
        TownList['Santalune City'].npcs = TownList['Santalune City'].npcs.filter(NPC => NPC.name != 'Vivillon Photobook');
    }
);
//Hoopa Day
// QuestLineHelper.ts: Pikablu (literally Marill) quest; 'How blu mouse?'
SpecialEvents.newEvent('Hoopa Day', 'The Mischief Pokémon unleashes his tricks upon the world.',
    // Start
    new Date(new Date().getFullYear(), 3, 1, 1), () => {
        TownList['Cherrygrove City'].content.push(TemporaryBattleList['Youngster Joey']);
    },
    // End
    new Date(new Date().getFullYear(), 3, 2, 1), () => {
        TownList['Cherrygrove City'].content = TownList['Cherrygrove City'].content.filter(t => t != TemporaryBattleList['Youngster Joey']);
    }
);
// Easter
// QuestLineHelper.ts: Surprise Togepi quest; 'Togepi Egg Hunt'
SpecialEvents.newEvent('Easter', 'Encounter Surprise Togepi for a limited time with a dedicated Quest Line.',
    // Start
    new Date(new Date().getFullYear(), 3, 8, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 3, 29, 23), () => {
    }
);
// First Event
SpecialEvents.newEvent('Flying Pikachu', 'Encounter Flying Pikachu and Red Spearow for a limited time roaming Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 6, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 6, 12, 23), () => {
    }
);
// Pokemon the first movie release date
SpecialEvents.newEvent('Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokémon roaming in Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 18, 1), () => {
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Armored Mewtwo', 1000000, 80));
    },
    // End
    new Date(new Date().getFullYear(), 6, 24, 23), () => {
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Armored Mewtwo');
    }
);
// Halloween
SpecialEvents.newEvent('Halloween!', 'Encounter Spooky Pokémon for a limited time around Kanto, Johto and Hoenn.',
    // Start
    new Date(new Date().getFullYear(), 9, 30, 1), () => {
        SeededRand.seed(new Date().getFullYear());
        Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Spooky Bulbasaur') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Gastly') : null;
        });
        Routes.getRoutesByRegion(GameConstants.Region.johto).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Spooky Togepi') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Misdreavus') : null;
        });
        Routes.getRoutesByRegion(GameConstants.Region.hoenn).forEach(route => {
            SeededRand.boolean() ? route.pokemon.land.push('Pikachu (Gengar)') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Shuppet') : null;
            SeededRand.boolean() ? route.pokemon.land.push('Duskull') : null;
        });
    },
    // End
    new Date(new Date().getFullYear(), 10, 5, 23), () => {
        Routes.getRoutesByRegion(GameConstants.Region.kanto).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Spooky Bulbasaur', 'Gastly'].includes(p)));
        Routes.getRoutesByRegion(GameConstants.Region.johto).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Spooky Togepi', 'Misdreavus'].includes(p)));
        Routes.getRoutesByRegion(GameConstants.Region.hoenn).forEach(route => route.pokemon.land = route.pokemon.land.filter(p => !['Pikachu (Gengar)', 'Shuppet', 'Duskull'].includes(p)));
    }
);
// Let's Go P/E release date
SpecialEvents.newEvent('Let\'s GO!', 'Encounter special Eevee and Pikachu roaming in the Kanto region.',
    // Start
    new Date(new Date().getFullYear(), 10, 16, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 10, 23, 23), () => {
    }
);
// Christmas
SpecialEvents.newEvent('Merry Christmas!', 'Encounter Santa Snorlax roaming the regions and discover the Grinch of Ilex Forest.',
    // Start
    new Date(new Date().getFullYear(), 11, 24, 1), () => {
        dungeonList['Ilex Forest'].bossList.push(new DungeonBossPokemon('Grinch Celebi', 1600000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)}));
    },
    // End
    new Date(new Date().getFullYear(), 11, 30, 23), () => {
        dungeonList['Ilex Forest'].bossList = dungeonList['Ilex Forest'].bossList.filter(boss => boss.name != 'Grinch Celebi');
    }
);
// Golden Week
SpecialEvents.newEvent('Golden Week', 'Enjoy your time off in the "Golden Week"! Travel tip: Visit the Flower Paradise in Sinnoh on your well earned vacation and enjoy the bloom of roses.',
    // Start
    new Date(new Date().getFullYear(), 3, 29, 1), () => {
        dungeonList['Flower Paradise'].bossList.push(new DungeonBossPokemon('Bulbasaur (Rose)', 1600000, 100, {requirement: new ClearDungeonRequirement(10, GameConstants.getDungeonIndex('Flower Paradise'))}));
    },
    // End
    new Date(new Date().getFullYear(), 4, 6, 23), () => {
        dungeonList['Flower Paradise'].bossList = dungeonList['Flower Paradise'].bossList.filter(boss => boss.name != 'Bulbasaur (Rose)');
    }
);
