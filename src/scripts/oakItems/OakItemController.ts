///<reference path="OakItems.ts"/>
class OakItemController {
    private static _inspectedItem: KnockoutObservable<OakItems.OakItem> = ko.observable(OakItems.OakItem.Magic_Ball);
    private static _selectedItem: KnockoutObservable<OakItems.OakItem> = ko.observable(OakItems.OakItem.Magic_Ball);

    public static click(item: OakItems.OakItem) {
        this.selectedItem = item;

        if (App.game.oakItems.isActive(item)) {
            App.game.oakItems.deactivate(item);
            return;
        }

        if (App.game.challenges.list.disableOakItems.active()) {
            return;
        }

        App.game.oakItems.activate(item);
    }

    public static hover(item: OakItems.OakItem) {
        this.inspectedItem = item;
    }

    public static hoverRelease() {
        this.inspectedItem = this.selectedItem;
    }

    static get inspectedItem() {
        return this._inspectedItem();
    }

    static set inspectedItem(item: OakItems.OakItem) {
        this._inspectedItem(item);
    }

    static get selectedItem() {
        return this._selectedItem();
    }

    static set selectedItem(item: OakItems.OakItem) {
        this._selectedItem(item);
    }
}
