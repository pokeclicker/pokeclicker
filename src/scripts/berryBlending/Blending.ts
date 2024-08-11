/// <reference path="../../declarations/GameHelper.d.ts" />
/// <reference path="../../declarations/DataStore/common/Feature.d.ts" />

class Blending implements Feature {
    name = 'Blending';
    saveKey = 'blending';

    defaults = {
    };

    constructor() {
    }

    initialize(): void {
    }

    update(delta: number): void {
    }

    canAccess(): boolean {
        return App.game.keyItems.hasKeyItem(KeyItemType.Wailmer_pail); // Pokeblock case
    }

    toJSON(): Record<string, any> {
        return {
        };
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }
    }
}

