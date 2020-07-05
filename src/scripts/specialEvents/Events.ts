class SpecialEvents implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: object;

    public events = {};

    newEvent(event: SpecialEvent) {
        this.events.push(event);
    }

    fromJSON(json: { logs: Array<{ type: LogBookType; description: string; date: number }> }): void {
        if (!json) {
            return;
        }
    }

    toJSON(): { logs: Array<{ type: LogBookType; description: string; date: number }> } {
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
