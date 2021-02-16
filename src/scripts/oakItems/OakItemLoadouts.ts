/// <reference path="../../declarations/GameHelper.d.ts" />

class OakItemLoadouts implements Saveable {
    saveKey = 'oakItemLoadouts';

    private static MAX_SLOTS = 3;

    defaults = {}

    loadouts: Array<KnockoutObservableArray<number>> = Array(OakItemLoadouts.MAX_SLOTS).fill(0).map(() => ko.observableArray());
    selectedLoadout: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });

    constructor() {}

    activateLoadout(index: number) {
        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }

        App.game.oakItems.deactivateAll();
        this.loadouts[index]().forEach((item: OakItems.OakItem) => {
            App.game.oakItems.activate(item);
        });
    }

    toggleItem(item: OakItems.OakItem) {
        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }

        const loadout = this.loadouts[this.selectedLoadout()];
        if (loadout().includes(item)) {
            const index = loadout().indexOf(item);
            if (index !== -1) {
                loadout.splice(index, 1);
            }
        } else if (loadout().length < App.game.oakItems.maxActiveCount() && App.game.oakItems.isUnlocked(item)) {
            loadout.push(item);
        }
    }

    hasItem(item: OakItems.OakItem): KnockoutComputed<boolean> {
        return ko.pureComputed(() => {
            return this.loadouts[this.selectedLoadout()]().includes(item);
        });
    }

    fromJSON(json: Array<Array<number>>) {
        json?.forEach((loadout, index) => {
            loadout.forEach(item => this.loadouts[index]?.push(item));
        });
    }

    toJSON() {
        return ko.toJS(App.game.oakItemLoadouts.loadouts);
    }
}
