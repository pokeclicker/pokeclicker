class Farming implements Feature {
    defaults: object;
    name: string;
    saveKey: string;

    canAccess(): boolean {
        return false;
    }

    fromJSON(json: object): void {
    }

    initialize(): void {
    }

    toJSON(): object {
        return undefined;
    }

    update(delta: number): void {
    }

}
