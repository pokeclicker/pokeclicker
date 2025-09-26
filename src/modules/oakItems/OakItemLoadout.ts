import type { Observable, ObservableArray } from 'knockout';

export default class OakItemLoadout {
    public name: Observable<string>;
    public loadout: ObservableArray<number>;

    constructor(name: string, loadout: Array<number> = []) {
        this.name = ko.observable(name);
        this.loadout = ko.observableArray(loadout);
    }

    public static copy(old: OakItemLoadout): OakItemLoadout {
        return new OakItemLoadout(old.name(), old.loadout());
    }
}
