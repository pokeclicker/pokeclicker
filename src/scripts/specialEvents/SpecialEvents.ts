class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: object;

    public events = [];

    newEvent(event: SpecialEvent) {
        // Check if the event exist before adding it again
        if (!this.events.find(ev => ev.id == event.id)) {
            this.events.push(event);
        }
    }

    fromJSON(json: { logs: Array<{ type: LogBookType; description: string; date: number }> }): void {
        if (!json) {
            return;
        }
    }

    toJSON() {
        return {
            // no data to save yet
        };
    }

    initialize(): void {}

    canAccess(): boolean {
        return true;
    }

    update(delta: number): void {}  // This method intentionally left blank
}
