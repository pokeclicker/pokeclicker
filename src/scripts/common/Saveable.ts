interface Saveable {
    saveKey: string;
    defaults: object;

    toJSON(): object ;

    fromJSON(json: object): void;
}
