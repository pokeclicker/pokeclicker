import {
    Observable as KnockoutObservable,
    ObservableArray as KnockoutObservableArray,
    Computed as KnockoutComputed,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import OakItemType from '../enums/OakItemType';

export default class OakItemLoadouts implements Saveable {
    private static MAX_SLOTS = 3;

    saveKey = 'oakItemLoadouts';

    defaults = {};

    loadouts: Array<KnockoutObservableArray<number>> = Array(OakItemLoadouts.MAX_SLOTS).fill(0).map(() => ko.observableArray());
    selectedLoadout: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });

    activateLoadout(index: number) {
        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }

        App.game.oakItems.deactivateAll();
        this.loadouts[index]().forEach((item: OakItemType) => {
            App.game.oakItems.activate(item);
        });
    }

    toggleItem(item: OakItemType) {
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

    hasItem(item: OakItemType): KnockoutComputed<boolean> {
        return ko.pureComputed(() => this.loadouts[this.selectedLoadout()]().includes(item));
    }

    fromJSON(json: Array<Array<number>>) {
        json?.forEach((loadout, index) => {
            loadout.forEach((item) => this.loadouts[index]?.push(item));
        });
    }

    // eslint-disable-next-line class-methods-use-this
    toJSON() {
        return ko.toJS(App.game.oakItemLoadouts.loadouts);
    }
}
