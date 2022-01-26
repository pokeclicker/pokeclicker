/// <reference path="../DataStore/common/Saveable.d.ts"/>
/// <reference path="./Challenge.d.ts"/>
declare class Challenges implements Saveable {
    saveKey: string;
    defaults: Record<string, any>;
    list: Record<string, Challenge>;
    fromJSON(json: any): void;
    toJSON(): Record<string, any>;
}
