/* eslint-disable class-methods-use-this */
import { Observable, ObservableArray, PureComputed } from 'knockout';
import { Feature } from '../DataStore/common/Feature';
import { LogContent } from './helpers';
import LogBookLog from './LogBookLog';
import { LogBookType, LogBookTypes } from './LogBookTypes';

type SavedLog = { type: LogBookType; content: LogContent; date: number };

export default class LogBook implements Feature {
    name = 'Log Book';
    saveKey = 'logbook';
    defaults: Record<string, any>;

    public filters: Record<string, Observable<boolean>> = Object.keys(LogBookTypes).reduce((_dict, setting) => Object.assign(_dict, { [setting]: ko.observable(true).extend({ boolean: null }) }), {});
    public logs: ObservableArray<LogBookLog> = ko.observableArray([]);
    public filteredLogs: PureComputed<LogBookLog[]> = ko.pureComputed(() => this.logs().filter((log) => this.filters[log.type.label]?.()));

    newLog(type: LogBookType, content: LogContent) {
        const length = this.logs.unshift(new LogBookLog(type, content));
        if (length > 1000) {
            this.logs.pop();
        }
    }

    fromJSON(json: any): void {
        if (json == null) {
            return;
        }

        json.logs?.forEach((entry: SavedLog) => {
            this.logs.push(new LogBookLog(entry.type, entry.content, entry.date));
        });

        Object.entries(json.filters || {}).forEach(([key, value]: [string, boolean]) => {
            this.filters[key]?.(value);
        });
    }

    toJSON(): { logs: Array<SavedLog> } {
        return ko.toJS({
            logs: this.logs.slice(0, 100).map((log) => ({ type: log.type, content: log.content, date: log.date })),
            filters: this.filters,
        });
    }

    initialize(): void {}

    canAccess(): boolean {
        return true;
    }

    update(): void {} // This method intentionally left blank
}
