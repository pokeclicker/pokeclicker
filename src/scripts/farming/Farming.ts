class Farming implements Feature {
    name = 'Farming';
    saveKey = 'farming';

    readonly AMOUNT_OF_BERRIES = 8;
    readonly AMOUNT_OF_PLOTS = 25;

    defaults: object;

    canAccess(): boolean {
        return MapHelper.accessToRoute(14, 0) && App.game.keyItems.hasKeyItem(KeyItems.KeyItem.Wailmer_pail);
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
