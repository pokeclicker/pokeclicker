///<reference path="OakItemLoadouts.ts"/>
class OakItemLoadoutsController {
    private static _selectedLoadout: KnockoutObservable<number> = ko.observable(0);
    private static _selectedItem: KnockoutObservable<OakItems.OakItem> = ko.observable(OakItems.OakItem.Magic_Ball);

    public static clickLoadout(num: number) {
        App.game.OakItemLoadouts.clearLoadout(num);
        this.selectedLoadout = num;
    }

    public static click(item: OakItems.OakItem) {
        if (this.selectedLoadout == 0) {
            return;
        }

        App.game.OakItemLoadouts.addItemToLoadout(this.selectedLoadout, item);
    }

    public static isPartOfLoadout(item: OakItems.OakItem) {
        if (this.selectedLoadout == 0) {
            return;
        }

        return App.game.OakItemLoadouts.isPartOfLoadout(this.selectedLoadout, item);
    }

    static get selectedLoadout() {
        return this._selectedLoadout();
    }

    static set selectedLoadout(num: number) {
        this._selectedLoadout(num);
    }
}

