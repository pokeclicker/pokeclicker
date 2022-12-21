export interface Saveable {
    saveKey: string;
    defaults: Record<string, any>;

    toJSON(): Record<string, any> ;

    fromJSON(json: Record<string, any>): void;
}
