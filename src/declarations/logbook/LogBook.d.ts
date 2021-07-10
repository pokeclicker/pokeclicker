/// <reference path="knockout.d.ts"/>
/// <reference path="../DataStore/common/Feature.d.ts"/>
/// <reference path="./LogBookLog.d.ts"/>
/// <reference path="./LogBookTypes.d.ts"/>
declare class LogBook implements Feature {
    name: string;
    saveKey: string;
    defaults: Record<string, any>;
    logs: ObservableArray<LogBookLog>;
    newLog(type: LogBookType, message: string): void;
    fromJSON(json: {
        logs: Array<{
            type: LogBookType;
            description: string;
            date: number;
        }>;
    }): void;
    toJSON(): {
        logs: Array<{
            type: LogBookType;
            description: string;
            date: number;
        }>;
    };
    initialize(): void;
    canAccess(): boolean;
    update(): void;
}
