interface LogBookType {
    display: string;
    label: string;
}

const LogBookTypes = {
    NEW: {
        display: 'primary',
        label: 'NEW',
    },
    SHINY: {
        display: 'warning',
        label: 'SHINY',
    },
    CAUGHT: {
        display: 'success',
        label: 'CAUGHT',
    },
    ESCAPED: {
        display: 'danger',
        label: 'ESCAPED',
    },
};

class LogBookLog {

    public type: LogBookType;
    public description: string;
    public date: number;

    constructor(type: LogBookType, description: string, date: number = Date.now()) {
        this.date = date;
        this.type = type;
        this.description = description;
    }
}

class LogBook implements Feature {
    name = 'Log Book';
    saveKey = 'logbook';
    defaults: object;

    public logs: ObservableArrayProxy<LogBookLog> = new ObservableArrayProxy([]);

    newLog(type: LogBookType, message: string) {
        const length = this.logs.unshift(new LogBookLog(type, message));
        if (length > 1000) {
            this.logs.pop();
        }
    }

    fromJSON(json: { logs: Array<{ type: LogBookType, description: string, date: number }> }): void {
        if (json == null || !json.logs) {
            return;
        }

        json.logs.forEach(entry => {
            this.logs.push(new LogBookLog(entry.type, entry.description, entry.date));
        });
    }

    initialize(): void {}

    toJSON(): { logs: Array<{ type: LogBookType, description: string, date: number }> } {
        return {
            logs: this.logs.slice(0, 100),
        };
    }

    canAccess(): boolean {
      return true;
    }

    update(delta: number): void {}  // This method intentionally left blank
}
