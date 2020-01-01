class KeyItemController {
    private static _inspectedItem: KnockoutObservable<KeyItems.KeyItem> = ko.observable(KeyItems.KeyItem.Teachy_tv);
    private static _selectedItem: KnockoutObservable<KeyItems.KeyItem> = ko.observable(KeyItems.KeyItem.Teachy_tv);

    public static hover(item: KeyItems.KeyItem) {
        this.inspectedItem = item;
    }

    public static hoverRelease() {
        this.selectedItem = this.inspectedItem;
    }

    static get inspectedItem() {
        return this._inspectedItem();
    }

    static set inspectedItem(item: KeyItems.KeyItem) {
        this._inspectedItem(item);
    }

    static get selectedItem() {
        return this._selectedItem();
    }

    static set selectedItem(item: KeyItems.KeyItem) {
        this._selectedItem(item);
    }
}

