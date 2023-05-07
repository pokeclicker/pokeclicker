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

/* Lunar New Year
    RoamingPokemonList.ts:
        Vivillon (Meadow)
        Vivillon (Fancy)
    Dungeon.ts:
        Vivillon (High Plains) in Mt. Moon
        Vivillon (Modern) in Cerulean Cave
        Vivillon (Archipelago) in Sprout Tower
        Vivillon (Monsoon) in Dark Cave
        Vivillon (Sun) in Mt. Chimney Crater
        Vivillon (Continental) in New Mauville
        Vivillon (Polar) in Sky Pillar
        Vivillon (River) in Eterna Forest
        Vivillon (Marine) in Lake Valor, Verity, and Acuity
        Vivillon (Garden) in Flower Paradise
        Vivillon (Sandstorm) in Relic Castle
        Vivillon (Savanna) in Dragonspiral Tower
        Vivillon (Jungle) in Moor of Icirrus
        Vivillon (Ocean) in Dreamyard
        Vivillon (Tundra) in Poké Ball Factory
        Vivillon (Elegant) in Lost Hotel
        Vivillon (Icy Snow) in Frost Cavern
        Vivillon (Poké Ball) in Thrifty Megamart
    TownList.ts:
        Vivillon Photobook in Santalune
    */
SpecialEvents.newEvent('Lunar New Year', 'Two kinds of Vivillon are roaming Kalos and later regions, and ones you\'ve previously caught have returned. Check the Photobook in Santalune City for hints!',
    // Start
    new Date(new Date().getFullYear(), 0, 24, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 1, 7, 23), () => {
    }
);
//Hoopa Day
/*
TownList.ts and TemporaryBattleList.ts: Youngster Joey in Cherrygrove
QuestLineHelper.ts: Pikablu (literally Marill) quest; 'How blu mouse?'
*/
SpecialEvents.newEvent('Hoopa Day', 'The Mischief Pokémon unleashes his tricks upon the world.',
    // Start
    new Date(new Date().getFullYear(), 3, 1, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 3, 2, 1), () => {
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
/* First Event
    RoamingPokemonList.ts:
        Flying Pikachu
        Red Spearow
    */
SpecialEvents.newEvent('Flying Pikachu', 'Encounter Flying Pikachu and Red Spearow for a limited time roaming Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 6, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 6, 12, 23), () => {
    }
);
/* Pokemon the first movie release date
    RoamingPokemonList.ts:
        Bulbausaur (Clone)
        Charmander (Clone)
        Squirtle (Clone)
    Dungeon.ts:
        Armored Mewtwo in Cerulean Cave
    */
SpecialEvents.newEvent('Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokémon roaming in Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 18, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 6, 24, 23), () => {
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
/* Let's Go P/E release date
    RoamingPokemonList.ts:
        Let's Go Pikachu
        Let's Go Eevee
    */
SpecialEvents.newEvent('Let\'s GO!', 'Encounter special Eevee and Pikachu roaming in the Kanto region.',
    // Start
    new Date(new Date().getFullYear(), 10, 16, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 10, 23, 23), () => {
    }
);
/* Christmas
    RoamingPokemonList.ts:
        Santa Snorlax
    Dungeon.ts:
        Grinch Celebi in Ilex Forest
    */
SpecialEvents.newEvent('Merry Christmas!', 'Encounter Santa Snorlax roaming the regions and discover the Grinch of Ilex Forest.',
    // Start
    new Date(new Date().getFullYear(), 11, 24, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 11, 30, 23), () => {
    }
);
/* Golden Week
    Dungeon.ts:
        Bulbasaur (Rose) in Flower Paradise
    */
SpecialEvents.newEvent('Golden Week', 'Enjoy your time off in the "Golden Week"! Travel tip: Visit the Flower Paradise in Sinnoh on your well earned vacation and enjoy the bloom of roses.',
    // Start
    new Date(new Date().getFullYear(), 3, 29, 1), () => {
    },
    // End
    new Date(new Date().getFullYear(), 4, 6, 23), () => {
    }
);
