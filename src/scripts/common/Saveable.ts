interface Saveable {
    saveKey: string;

    toJSON(): object ;

    fromJSON(json: object): void;
}
