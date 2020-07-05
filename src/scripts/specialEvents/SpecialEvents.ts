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
