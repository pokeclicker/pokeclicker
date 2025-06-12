import OakItemType from '../enums/OakItemType';

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

    get htmlTooltip(): string {
        return `${this.name()}<br/>${this.loadout().map(oakItem => `<img height="32" src="assets/images/oakitems/${OakItemType[oakItem]}.png">`).join('')}`;
    }
}
