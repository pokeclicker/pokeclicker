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
}

// TODO: Fetch events from a server each 1/2/3/6/12/24 hours?
// Create our events here for now (yearly)

// Lunar New Year
SpecialEvents.newEvent('Lunar New Year', 'Vivillon are everywhere! Two kinds are roaming Kalos and later regions, ones you\'ve previously caught have returned, and Poké Ball Vivillon roams an abandoned Megamart...',
    // Start
    new Date(new Date().getFullYear(), 0, 24, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Vivillon (Fancy)'));
        RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Vivillon (Meadow)'));
        RoamingPokemonList.add(GameConstants.Region.galar, 0, new RoamingPokemon('Vivillon (Fancy)'));
        RoamingPokemonList.add(GameConstants.Region.alola, 0, new RoamingPokemon('Vivillon (Meadow)'));
        dungeonList['Lake Verity'].bossList.push(new DungeonBossPokemon('Vivillon (Marine)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Marine)')}));
        dungeonList['Lake Acuity'].bossList.push(new DungeonBossPokemon('Vivillon (Marine)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Marine)')}));
        dungeonList['Lake Valor'].bossList.push(new DungeonBossPokemon('Vivillon (Marine)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Marine)')}));
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Vivillon (Modern)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Modern)')}));
        dungeonList['Moor of Icirrus'].bossList.push(new DungeonBossPokemon('Vivillon (Jungle)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Jungle)')}));
        dungeonList['Dark Cave'].bossList.push(new DungeonBossPokemon('Vivillon (Monsoon)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Monsoon)')}));
        dungeonList['Poké Ball Factory'].bossList.push(new DungeonBossPokemon('Vivillon (Tundra)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Tundra)')}));
        dungeonList['Mt. Chimney Crater'].bossList.push(new DungeonBossPokemon('Vivillon (Sun)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Sun)')}));
        dungeonList['Sprout Tower'].bossList.push(new DungeonBossPokemon('Vivillon (Archipelago)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Archipelago)')}));
        dungeonList['Lost Hotel'].bossList.push(new DungeonBossPokemon('Vivillon (Elegant)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Elegant)')}));
        dungeonList.Dreamyard.bossList.push(new DungeonBossPokemon('Vivillon (Ocean)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Ocean)')}));
        dungeonList['New Mauville'].bossList.push(new DungeonBossPokemon('Vivillon (Continental)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Continental)')}));
        dungeonList['Eterna Forest'].bossList.push(new DungeonBossPokemon('Vivillon (River)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (River)')}));
        dungeonList['Sky Pillar'].bossList.push(new DungeonBossPokemon('Vivillon (Polar)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Polar)')}));
        dungeonList['Relic Castle'].bossList.push(new DungeonBossPokemon('Vivillon (Sandstorm)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Sandstorm)')}));
        dungeonList['Flower Paradise'].bossList.push(new DungeonBossPokemon('Vivillon (Garden)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Garden)')}));
        dungeonList['Mt. Moon'].bossList.push(new DungeonBossPokemon('Vivillon (High Plains)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (High Plains)')}));
        dungeonList['Dragonspiral Tower'].bossList.push(new DungeonBossPokemon('Vivillon (Savanna)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Savanna)')}));
        dungeonList['Frost Cavern'].bossList.push(new DungeonBossPokemon('Vivillon (Icy Snow)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Icy Snow)')}));
        dungeonList['Thrifty Megamart'].bossList.push(new DungeonBossPokemon('Vivillon (Poké Ball)', 96662023, 60, {requirement: new ObtainedPokemonRequirement('Vivillon (Poké Ball)')}));
    },
    // End
    new Date(new Date().getFullYear(), 1, 7, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kalos, 0, 'Vivillon (Fancy)');
        RoamingPokemonList.remove(GameConstants.Region.kalos, 0, 'Vivillon (Meadow)');
        RoamingPokemonList.remove(GameConstants.Region.galar, 0, 'Vivillon (Fancy)');
        RoamingPokemonList.remove(GameConstants.Region.alola, 0, 'Vivillon (Meadow)');
        dungeonList['Lake Verity'].bossList = dungeonList['Lake Verity'].bossList.filter(boss => boss.name != 'Vivillon (Marine)' || (boss.name == 'Vivillon (Marine)' && !boss.options?.requirement));
        dungeonList['Lake Acuity'].bossList = dungeonList['Lake Acuity'].bossList.filter(boss => boss.name != 'Vivillon (Marine)' || (boss.name == 'Vivillon (Marine)' && !boss.options?.requirement));
        dungeonList['Lake Valor'].bossList = dungeonList['Lake Valor'].bossList.filter(boss => boss.name != 'Vivillon (Marine)' || (boss.name == 'Vivillon (Marine)' && !boss.options?.requirement));
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Vivillon (Modern)' || (boss.name == 'Vivillon (Modern)' && !boss.options?.requirement));
        dungeonList['Moor of Icirrus'].bossList = dungeonList['Moor of Icirrus'].bossList.filter(boss => boss.name != 'Vivillon (Jungle)' || (boss.name == 'Vivillon (Jungle)' && !boss.options?.requirement));
        dungeonList['Dark Cave'].bossList = dungeonList['Dark Cave'].bossList.filter(boss => boss.name != 'Vivillon (Monsoon)' || (boss.name == 'Vivillon (Monsoon)' && !boss.options?.requirement));
        dungeonList['Poké Ball Factory'].bossList = dungeonList['Poké Ball Factory'].bossList.filter(boss => boss.name != 'Vivillon (Tundra)' || (boss.name == 'Vivillon (Tundra)' && !boss.options?.requirement));
        dungeonList['Mt. Chimney Crater'].bossList = dungeonList['Mt. Chimney Crater'].bossList.filter(boss => boss.name != 'Vivillon (Sun)' || (boss.name == 'Vivillon (Sun)' && !boss.options?.requirement));
        dungeonList['Sprout Tower'].bossList = dungeonList['Sprout Tower'].bossList.filter(boss => boss.name != 'Vivillon (Archipelago)' || (boss.name == 'Vivillon (Archipelago)' && !boss.options?.requirement));
        dungeonList['Lost Hotel'].bossList = dungeonList['Lost Hotel'].bossList.filter(boss => boss.name != 'Vivillon (Elegant)' || (boss.name == 'Vivillon (Elegant)' && !boss.options?.requirement));
        dungeonList.Dreamyard.bossList = dungeonList.Dreamyard.bossList.filter(boss => boss.name != 'Vivillon (Ocean)' || (boss.name == 'Vivillon (Ocean)' && !boss.options?.requirement));
        dungeonList['New Mauville'].bossList = dungeonList['New Mauville'].bossList.filter(boss => boss.name != 'Vivillon (Continental)' || (boss.name == 'Vivillon (Continental)' && !boss.options?.requirement));
        dungeonList['Eterna Forest'].bossList = dungeonList['Eterna Forest'].bossList.filter(boss => boss.name != 'Vivillon (River)' || (boss.name == 'Vivillon (River)' && !boss.options?.requirement));
        dungeonList['Sky Pillar'].bossList = dungeonList['Sky Pillar'].bossList.filter(boss => boss.name != 'Vivillon (Polar)' || (boss.name == 'Vivillon (Polar)' && !boss.options?.requirement));
        dungeonList['Relic Castle'].bossList = dungeonList['Relic Castle'].bossList.filter(boss => boss.name != 'Vivillon (Sandstorm)' || (boss.name == 'Vivillon (Sandstorm)' && !boss.options?.requirement));
        dungeonList['Flower Paradise'].bossList = dungeonList['Flower Paradise'].bossList.filter(boss => boss.name != 'Vivillon (Garden)' || (boss.name == 'Vivillon (Garden)' && !boss.options?.requirement));
        dungeonList['Mt. Moon'].bossList = dungeonList['Mt. Moon'].bossList.filter(boss => boss.name != 'Vivillon (High Plains)' || (boss.name == 'Vivillon (High Plains)' && !boss.options?.requirement));
        dungeonList['Dragonspiral Tower'].bossList = dungeonList['Dragonspiral Tower'].bossList.filter(boss => boss.name != 'Vivillon (Savanna)' || (boss.name == 'Vivillon (Savanna)' && !boss.options?.requirement));
        dungeonList['Frost Cavern'].bossList = dungeonList['Frost Cavern'].bossList.filter(boss => boss.name != 'Vivillon (Icy Snow)' || (boss.name == 'Vivillon (Icy Snow)' && !boss.options?.requirement));
        dungeonList['Thrifty Megamart'].bossList = dungeonList['Thrifty Megamart'].bossList.filter(boss => boss.name != 'Vivillon (Poké Ball)');
    }
);
//Hoopa Day
SpecialEvents.newEvent('Hoopa Day', 'The Mischief Pokémon unleashes his tricks upon the world.',
    // Start
    new Date(new Date().getFullYear(), 3, 1, 1), () => {
        const pikabluQuestLine = App.game.quests.getQuestLine('How blu mouse?');
        if (pikabluQuestLine.state() == QuestLineState.inactive) {
            App.game.quests.getQuestLine('How blu mouse?').beginQuest();
        }
    },
    // End
    new Date(new Date().getFullYear(), 3, 2, 1), () => {
        // do not end questline, so ppl can finish it
    }
);
// Easter
SpecialEvents.newEvent('Easter', 'Encounter Surprise Togepi for a limited time with a dedicated Quest Line.',
    // Start
    new Date(new Date().getFullYear(), 3, 8, 1), () => {
        const togepiEggHuntQuestLine = App.game.quests.getQuestLine('Togepi Egg Hunt');
        if (togepiEggHuntQuestLine.state() == QuestLineState.inactive) {
            App.game.quests.getQuestLine('Togepi Egg Hunt').beginQuest();
        }
    },
    // End
    new Date(new Date().getFullYear(), 3, 29, 23), () => {
        // do not end questline, so ppl can finish it
    }
);
// First Event
SpecialEvents.newEvent('Flying Pikachu', 'Encounter Flying Pikachu and Red Spearow for a limited time roaming Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 6, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Flying Pikachu'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Red Spearow'));
    },
    // End
    new Date(new Date().getFullYear(), 6, 12, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Flying Pikachu');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Red Spearow');
    }
);
// Pokemon the first movie release date
SpecialEvents.newEvent('Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokémon roaming in Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 18, 1), () => {
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Armored Mewtwo', 1000000, 80));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Bulbasaur (Clone)'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Charmander (Clone)'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Squirtle (Clone)'));
    },
    // End
    new Date(new Date().getFullYear(), 6, 24, 23), () => {
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Armored Mewtwo');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Bulbasaur (Clone)');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Charmander (Clone)');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Squirtle (Clone)');
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
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Let\'s Go Pikachu'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Let\'s Go Eevee'));
    },
    // End
    new Date(new Date().getFullYear(), 10, 23, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Let\'s Go Pikachu');
        RoamingPokemonList.remove(GameConstants.Region.kanto, 0, 'Let\'s Go Eevee');
    }
);
// Christmas
SpecialEvents.newEvent('Merry Christmas!', 'Encounter Santa Snorlax roaming the regions and discover the Grinch of Ilex Forest.',
    // Start
    new Date(new Date().getFullYear(), 11, 24, 1), () => {
        // Add to every roaming group that has at least one roamer
        RoamingPokemonList.roamerGroups.forEach((regionGroups, region) => {
            regionGroups.forEach((_, subRegionGroup) => {
                if (RoamingPokemonList.list[region][subRegionGroup]?.length) {
                    RoamingPokemonList.add(region, subRegionGroup, new RoamingPokemon('Santa Snorlax'));
                }
            });
        });
        dungeonList['Ilex Forest'].bossList.push(new DungeonBossPokemon('Grinch Celebi', 1600000, 100, {requirement: new GymBadgeRequirement(BadgeEnums.Elite_JohtoChampion)}));
    },
    // End
    new Date(new Date().getFullYear(), 11, 30, 23), () => {
        // Remove from every roaming group
        RoamingPokemonList.roamerGroups.forEach((regionGroups, region) => {
            regionGroups.forEach((_, subRegionGroup) => {
                if (RoamingPokemonList.list[region][subRegionGroup]) {
                    RoamingPokemonList.remove(region, subRegionGroup, 'Santa Snorlax');
                }
            });
        });
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
