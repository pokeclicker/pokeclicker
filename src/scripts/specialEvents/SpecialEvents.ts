class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: Record<string, any>;

    static events = [];

    static newEvent(title: string, description: string, startTime: Date, startFunction: EmptyCallback, endTime: Date, endFunction: EmptyCallback) {
        // Check if the event exist before adding it again
        if (!SpecialEvents.events.find(event => event.title == title)) {
            SpecialEvents.events.push(new SpecialEvent(title, description, startTime, startFunction, endTime, endFunction));
        }
    }

    initialize(): void {}

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
// Create our events here for now

// Once off - for now..
SpecialEvents.newEvent('Flying Pikachu', 'Encounter Flying Pikachu for a limited time on any route in Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 6, 1), () => {
        SeededRand.seed(new Date().getFullYear());
        Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => SeededRand.boolean() ? pokemonsPerRoute[GameConstants.Region.kanto][route].land.push('Flying Pikachu') : null);
    },
    // End
    new Date(new Date().getFullYear(), 6, 12, 23), () => {
        Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => pokemonsPerRoute[GameConstants.Region.kanto][route].land = pokemonsPerRoute[GameConstants.Region.kanto][route].land.filter(p => p != 'Flying Pikachu'));
    }
);
// TODO: remove once event finishes
SpecialEvents.newEvent('Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokemon roaming in Kanto.',
    // Start
    new Date(2020, 7, 3, 2), () => {
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Armored Mewtwo', 1000000, 80));
        GameConstants.RoamingPokemon[GameConstants.Region.kanto].push(...['Bulbasaur (clone)', 'Charmander (clone)', 'Squirtle (clone)']);
    },
    // End
    new Date(2020, 7, 9, 2), () => {
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Armored Mewtwo');
        GameConstants.RoamingPokemon[GameConstants.Region.kanto] = GameConstants.RoamingPokemon[GameConstants.Region.kanto].filter(p => !['Bulbasaur (clone)', 'Charmander (clone)', 'Squirtle (clone)'].includes(p));
    }
);

// Yearly
SpecialEvents.newEvent('Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.<br/>Encounter clone Pokemon roaming in Kanto.',
    // Start
    new Date(new Date().getFullYear(), 6, 18, 1), () => {
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Armored Mewtwo', 1000000, 80));
        GameConstants.RoamingPokemon[GameConstants.Region.kanto].push(...['Bulbasaur (clone)', 'Charmander (clone)', 'Squirtle (clone)']);
    },
    // End
    new Date(new Date().getFullYear(), 6, 24, 23), () => {
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Armored Mewtwo');
        GameConstants.RoamingPokemon[GameConstants.Region.kanto] = GameConstants.RoamingPokemon[GameConstants.Region.kanto].filter(p => !['Bulbasaur (clone)', 'Charmander (clone)', 'Squirtle (clone)'].includes(p));
    }
);
SpecialEvents.newEvent('Halloween!', 'Encounter Spooky Pokemon for a limited time around Kanto, Johto and Hoenn.',
    // Start
    new Date(new Date().getFullYear(), 9, 30, 1), () => {
        SeededRand.seed(new Date().getFullYear());
        Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => {
            SeededRand.boolean() ? pokemonsPerRoute[GameConstants.Region.kanto][route].land.push('Spooky Bulbasaur') : null;
            SeededRand.boolean() ? pokemonsPerRoute[GameConstants.Region.kanto][route].land.push('Gastly') : null;
        });
        Object.keys(pokemonsPerRoute[GameConstants.Region.johto]).forEach(route => {
            SeededRand.boolean() ? pokemonsPerRoute[GameConstants.Region.johto][route].land.push('Spooky Togepi') : null;
            SeededRand.boolean() ? pokemonsPerRoute[GameConstants.Region.johto][route].land.push('Misdreavus') : null;
        });
        Object.keys(pokemonsPerRoute[GameConstants.Region.hoenn]).forEach(route => {
            SeededRand.boolean() ? pokemonsPerRoute[GameConstants.Region.hoenn][route].land.push('Pikachu (Gengar)') : null;
            SeededRand.boolean() ? pokemonsPerRoute[GameConstants.Region.hoenn][route].land.push('Shuppet') : null;
            SeededRand.boolean() ? pokemonsPerRoute[GameConstants.Region.hoenn][route].land.push('Duskull') : null;
        });
    },
    // End
    new Date(new Date().getFullYear(), 10, 5, 23), () => {
        Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => pokemonsPerRoute[GameConstants.Region.kanto][route].land = pokemonsPerRoute[GameConstants.Region.kanto][route].land.filter(p => !['Spooky Bulbasaur', 'Gastly'].includes(p)));
        Object.keys(pokemonsPerRoute[GameConstants.Region.johto]).forEach(route => pokemonsPerRoute[GameConstants.Region.johto][route].land = pokemonsPerRoute[GameConstants.Region.johto][route].land.filter(p => !['Spooky Togepi', 'Misdreavus'].includes(p)));
        Object.keys(pokemonsPerRoute[GameConstants.Region.hoenn]).forEach(route => pokemonsPerRoute[GameConstants.Region.hoenn][route].land = pokemonsPerRoute[GameConstants.Region.hoenn][route].land.filter(p => !['Pikachu (Gengar)', 'Shuppet', 'Duskull'].includes(p)));
    }
);
SpecialEvents.newEvent('Merry Christmas!', 'Encounter Santa Dragonite for a limited time roaming around Kanto, Johto and Hoenn.',
    // Start
    new Date(new Date().getFullYear(), 11, 24, 1), () => {
        GameConstants.RoamingPokemon[GameConstants.Region.kanto].push('Santa Dragonite');
        GameConstants.RoamingPokemon[GameConstants.Region.johto].push('Santa Dragonite');
        GameConstants.RoamingPokemon[GameConstants.Region.hoenn].push('Santa Dragonite');
    },
    // End
    new Date(new Date().getFullYear(), 11, 30, 23), () => {
        GameConstants.RoamingPokemon[GameConstants.Region.kanto] = GameConstants.RoamingPokemon[GameConstants.Region.kanto].filter(p => p != 'Santa Dragonite');
        GameConstants.RoamingPokemon[GameConstants.Region.johto] = GameConstants.RoamingPokemon[GameConstants.Region.johto].filter(p => p != 'Santa Dragonite');
        GameConstants.RoamingPokemon[GameConstants.Region.hoenn] = GameConstants.RoamingPokemon[GameConstants.Region.hoenn].filter(p => p != 'Santa Dragonite');
    }
);
