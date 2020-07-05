class Events implements Feature {
    name = 'Events';
    saveKey = 'events';
    defaults: object;

    public events = {};

    newEvent(id: number, title: string, description: string, start_time: Date, end_time: Date, start_function: Function, end_function: Function) {
        this.events[id] = {
            title,
            description,
            start_time,
            end_time,
            start_function,
            end_function,
        };
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
