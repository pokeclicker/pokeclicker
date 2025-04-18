import {
    Computed as KnockoutComputed,
} from 'knockout';
import '../koExtenders';
import { Saveable } from '../DataStore/common/Saveable';
import OakItemType from '../enums/OakItemType';
import OakItemLoadout from './OakItemLoadout';

export default class OakItemLoadouts implements Saveable {
    public static MAX_SLOTS = 5;

    saveKey = 'oakItemLoadouts';

    defaults = {};
    loadouts: Array<OakItemLoadout> = Array(OakItemLoadouts.MAX_SLOTS).fill(0).map((_, i) => new OakItemLoadout(`Loadout ${i + 1}`));

    public activateLoadout(index: number) {
        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }

        const loadout = this.loadouts[index]?.loadout;

        if (!loadout) {
            return;
        }

        App.game.oakItems.deactivateAll();
        loadout().forEach(oakItemType => App.game.oakItems.activate(oakItemType));
    }

    public isLoadoutActive(index: number): KnockoutComputed<boolean> {
        return ko.pureComputed(() => this.loadouts[index]?.loadout().every(oakItemType => App.game.oakItems.itemList[oakItemType].isActive) &&
            this.loadouts[index]?.loadout().length === App.game.oakItems.activeCount());
    }

    public toggleOakItemInLoadout(loadoutIndex: number, oakItemType: OakItemType) {
        const loadout = this.loadouts[loadoutIndex]?.loadout;
        if (loadout().includes(oakItemType)) {
            loadout.remove(oakItemType);
        } else if (loadout().length < App.game.oakItems.maxActiveCount() && App.game.oakItems.isUnlocked(oakItemType)) {
            loadout.push(oakItemType);
            loadout.sort((a, b) => a - b);
        }
    }

    public loadoutHasOakItem(loadoutIndex: number, oakItemType: OakItemType): KnockoutComputed<boolean> {
        return ko.pureComputed(() => this.loadouts[loadoutIndex]?.loadout().includes(oakItemType));
    }

    fromJSON(json: Array<{ name: string, loadout: Array<number> }>) {
        json?.forEach((loadout, index) => {
            this.loadouts[index] = new OakItemLoadout(loadout.name, loadout.loadout.sort((a, b) => a - b));
        });
    }

    toJSON() {
        return ko.toJS(this.loadouts.map((loadout) => ({
            ...loadout,
            name: loadout.name(),
        })));
    }
}
