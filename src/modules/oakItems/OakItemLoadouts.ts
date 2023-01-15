import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
} from 'knockout';
import { Saveable } from '../DataStore/common/Saveable';
import OakItemType from '../enums/OakItemType';
import OakItemLoadout from './OakItemLoadout';

export default class OakItemLoadouts implements Saveable {
    private static MAX_SLOTS = 5;

    saveKey = 'oakItemLoadouts';

    defaults = {};

    loadouts: Array<OakItemLoadout> = Array(OakItemLoadouts.MAX_SLOTS).fill(0).map((_, i) => new OakItemLoadout(`Loadout ${i + 1}`));
    selectedLoadout: KnockoutObservable<number> = ko.observable(0).extend({ numeric: 0 });

    activateLoadout(index: number) {
        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }

        App.game.oakItems.deactivateAll();
        this.loadouts[index].loadout().forEach((item: OakItemType) => {
            App.game.oakItems.activate(item);
        });
    }

    toggleItem(item: OakItemType) {
        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }

        const { loadout } = this.loadouts[this.selectedLoadout()];
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
        return ko.pureComputed(() => this.loadouts[this.selectedLoadout()].loadout().includes(item));
    }

    getSelectedLoadout(): OakItemLoadout {
        return this.loadouts[this.selectedLoadout()];
    }

    fromJSON(json: Array<{name: string, loadout: Array<number>}>) {
        json?.forEach((loadout, index) => {
            this.loadouts[index] = new OakItemLoadout(decodeURI(loadout.name), loadout.loadout);
        });
    }

    toJSON() {
        return ko.toJS(this.loadouts.map((loadout) => ({
            ...loadout,
            name: encodeURI(loadout.name()),
        })));
    }
}
