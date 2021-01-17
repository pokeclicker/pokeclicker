/* eslint-disable class-methods-use-this */
import { ObservableArray } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import LogBookLog from './LogBookLog';
import { LogBookType } from './LogBookTypes';

export default class LogBook implements Feature {
    name = 'Log Book';
    saveKey = 'logbook';
    defaults: Record<string, any>;

    public logs: ObservableArray<LogBookLog> = ko.observableArray([]);

    newLog(type: LogBookType, message: string) {
        const length = this.logs.unshift(new LogBookLog(type, message));
        if (length > 1000) {
            this.logs.pop();
        }
    }

    fromJSON(json: { logs: Array<{ type: LogBookType; description: string; date: number }> }): void {
        if (json == null || !json.logs) {
            return;
        }

        json.logs.forEach((entry) => {
            this.logs.push(new LogBookLog(entry.type, entry.description, entry.date));
        });
    }

    toJSON(): { logs: Array<{ type: LogBookType; description: string; date: number }> } {
        return {
            logs: this.logs.slice(0, 100),
        };
    }

    initialize(): void {}

    canAccess(): boolean {
        return true;
    }

    update(): void {} // This method intentionally left blank
}
