class Wallet implements Feature {
    saveKey: string;

    defaults = {

    };


    initialize(): void {
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: object): void {
    }

    toJSON(): object {
        return undefined;
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}
