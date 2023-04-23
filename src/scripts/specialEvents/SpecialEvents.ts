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
        RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Vivillon (Fancy)'));
        RoamingPokemonList.add(GameConstants.Region.kalos, 0, new RoamingPokemon('Vivillon (Meadow)'));
        RoamingPokemonList.add(GameConstants.Region.galar, 0, new RoamingPokemon('Vivillon (Fancy)'));
        RoamingPokemonList.add(GameConstants.Region.galar, 2, new RoamingPokemon('Vivillon (Fancy)'));
        RoamingPokemonList.add(GameConstants.Region.galar, 3, new RoamingPokemon('Vivillon (Fancy)'));
        RoamingPokemonList.add(GameConstants.Region.alola, 0, new RoamingPokemon('Vivillon (Meadow)'));
        TownList['Santalune City'].npcs.push(VivillonPhotobook);
    },
    // End
    new Date(new Date().getFullYear(), 1, 7, 23), () => {
        RoamingPokemonList.remove(GameConstants.Region.kalos, 0, 'Vivillon (Fancy)');
        RoamingPokemonList.remove(GameConstants.Region.kalos, 0, 'Vivillon (Meadow)');
        RoamingPokemonList.remove(GameConstants.Region.galar, 0, 'Vivillon (Fancy)');
        RoamingPokemonList.remove(GameConstants.Region.galar, 2, 'Vivillon (Fancy)');
        RoamingPokemonList.remove(GameConstants.Region.galar, 3, 'Vivillon (Fancy)');
        RoamingPokemonList.remove(GameConstants.Region.alola, 0, 'Vivillon (Meadow)');
        TownList['Santalune City'].npcs = TownList['Santalune City'].npcs.filter(NPC => NPC.name != 'Vivillon Photobook');
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
        TownList['Cherrygrove City'].content.push(TemporaryBattleList['Youngster Joey']);
    },
    // End
    new Date(new Date().getFullYear(), 3, 2, 1), () => {
        // do not end questline, so ppl can finish it
        TownList['Cherrygrove City'].content = TownList['Cherrygrove City'].content.filter(t => t != TemporaryBattleList['Youngster Joey']);
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
    },
    // End
    new Date(new Date().getFullYear(), 6, 12, 23), () => {
    }
);
// Pokemon the first movie release date
SpecialEvents.newEvent('Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokémon roaming in Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 18, 1), () => {
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Bulbasaur (Clone)'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Charmander (Clone)'));
        RoamingPokemonList.add(GameConstants.Region.kanto, 0, new RoamingPokemon('Squirtle (Clone)'));
    },
    // End
    new Date(new Date().getFullYear(), 6, 24, 23), () => {
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
    }
);
// Golden Week
SpecialEvents.newEvent('Golden Week', 'Enjoy your time off in the "Golden Week"! Travel tip: Visit the Flower Paradise in Sinnoh on your well earned vacation and enjoy the bloom of roses.',
    // Start
    new Date(new Date().getFullYear(), 3, 29, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 4, 6, 23), () => {
    }
);
