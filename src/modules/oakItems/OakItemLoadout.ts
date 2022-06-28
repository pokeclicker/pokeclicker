export default class OakItemLoadout {
    public name: ko.Observable<string>;
    public loadout: ko.ObservableArray<number>;

    constructor(name: string, loadout: Array<number> = []) {
        this.name = ko.observable(name);
        this.loadout = ko.observableArray(loadout);
    }

    public static copy(old: OakItemLoadout): OakItemLoadout {
        return new OakItemLoadout(old.name(), old.loadout());
    }
}
