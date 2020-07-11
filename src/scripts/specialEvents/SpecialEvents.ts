class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: object;

    static events = [];

    static newEvent(id: number, title: string, description: string, startTime: Date, startFunction: Function, endTime: Date, endFunction: Function) {
        // Check if the event exist before adding it again
        if (!SpecialEvents.events.find(event => event.id == id)) {
            SpecialEvents.events.push(new SpecialEvent(id, title, description, startTime, startFunction, endTime, endFunction));
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

// TODO: Fetch events from a server each 1/2/3/6/12/24 hours
// Create our events here for now

// Once off - for now..
SpecialEvents.newEvent(1, 'Flying Pikachu', 'Encounter Flying Pikachu for a limited time on any route in Kanto.',
    // Start
    new Date(2020, 6, 6, 2), () => {
        Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => pokemonsPerRoute[GameConstants.Region.kanto][route].land.push('Flying Pikachu'));
    },
    // End
    new Date(2020, 6, 12, 22), () => {
        Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => pokemonsPerRoute[GameConstants.Region.kanto][route].land = pokemonsPerRoute[GameConstants.Region.kanto][route].land.filter(p => p != 'Flying Pikachu'));
    }
);
SpecialEvents.newEvent(2, 'Mewtwo strikes back!', 'Encounter Armored Mewtwo for a limited time in Cerulean Cave.',
    // Start
    new Date(2020, 7, 3, 2), () => {
        dungeonList['Cerulean Cave'].bossList.push(new DungeonBossPokemon('Armored Mewtwo', 1000000, 80));
    },
    // End
    new Date(2020, 7, 9, 2), () => {
        dungeonList['Cerulean Cave'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Armored Mewtwo');
    }
);
//
// // Yearly
// SpecialEvents.newEvent(3, 'Halloween!', 'Encounter Spooky Pokemon for a limited time around Kanto and Johto.',
//     // Start
//     new Date(new Date().getFullYear(), 9, 30, 1), () => {
//         Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => pokemonsPerRoute[GameConstants.Region.kanto][route].land.push('Spooky Bulbasaur'));
//         Object.keys(pokemonsPerRoute[GameConstants.Region.johto]).forEach(route => pokemonsPerRoute[GameConstants.Region.johto][route].land.push('Spooky Togepi'));
//     },
//     // End
//     new Date(new Date().getFullYear(), 10, 1, 23), () => {
//         Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => pokemonsPerRoute[GameConstants.Region.kanto][route].land = pokemonsPerRoute[GameConstants.Region.kanto][route].land.filter(p => p != 'Spooky Bulbasaur'));
//         Object.keys(pokemonsPerRoute[GameConstants.Region.johto]).forEach(route => pokemonsPerRoute[GameConstants.Region.johto][route].land = pokemonsPerRoute[GameConstants.Region.johto][route].land.filter(p => p != 'Spooky Togepi'));
//     }
// );
// SpecialEvents.newEvent(4, 'Merry Christmas!', 'Encounter Santa Dragonite for a limited time on Victory Road.',
//     // Start
//     new Date(new Date().getFullYear(), 11, 25, 2), () => {
//         dungeonList['Victory Road'].bossList.push(new DungeonBossPokemon('Santa Dragonite', 1000000, 80));
//     },
//     // End
//     new Date(new Date().getFullYear(), 11, 27, 22), () => {
//         dungeonList['Victory Road'].bossList = dungeonList['Cerulean Cave'].bossList.filter(boss => boss.name != 'Santa Dragonite');
//     }
// );
