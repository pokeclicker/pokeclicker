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
SpecialEvents.newEvent(1, 'Flying Pikachu', 'Encounter Flying Pikachu for a limited time on any route in Kanto.',
    // Start
    new Date(2020, 6, 6), () => {
        Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => pokemonsPerRoute[GameConstants.Region.kanto][route].land.push('Flying Pikachu'));
    },
    // End
    new Date(2020, 6, 13), () => {
        Object.keys(pokemonsPerRoute[GameConstants.Region.kanto]).forEach(route => pokemonsPerRoute[GameConstants.Region.kanto][route].land = pokemonsPerRoute[GameConstants.Region.kanto][route].land.filter(p => p != 'Flying Pikachu'));
    }
);
