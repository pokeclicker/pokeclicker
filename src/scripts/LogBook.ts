const logBookType = {
    NEW: {
        rowType: 'primary',
        label: 'NEW',
    },
    SHINY: {
        rowType: 'warning',
        label: 'SHINY',
    },
    CAUGHT: {
        rowType: 'success',
        label: 'CAUGHT',
    },
    ESCAPED: {
        rowType: 'danger',
        label: 'ESCAPED',
    },
};

class LogBookEntry {

    public type: logBookType;
    public description: string;
    public date: number;

    constructor(type: logBookType, description: string, date: number = Date.now()) {
        this.date = date;
        this.type = type;
        this.description = description;
    }
}

class LogBook implements Feature {
    name = 'Log Book';
    saveKey = 'logbook';

    public entries: ObservableArrayProxy<LogBookEntry> = new ObservableArrayProxy([]);

    newEntry(type: logBookType, message: string) {
        const length = this.entries.unshift(new LogBookEntry(type, message));
        if (length > 1000) {
            this.entries.pop();
        }
    }

    fromJSON(json: object): void {
        if (json == null) {
            return;
        }

        json.entries.forEach(entry => {
            this.entries.push(new LogBookEntry(entry.type, entry.description, entry.date));
        });
    }

    initialize(): void {}

    toJSON(): object {
        return {
            entries: this.entries.slice(0, 100),
        };
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}
