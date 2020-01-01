class KeyItemController {
    private static _inspectedItem: KnockoutObservable<KeyItem> = ko.observable(null);
    private static _selectedItem: KnockoutObservable<KeyItem> = ko.observable(null);



    public static hover(name: string) {
        // this.inspectedItem = KeyItemHandler.getKeyItemByName(name);
    }

    public static hoverRelease() {
        this.inspectedItem = this.selectedItem;
    }

    public static click(name: string) {
        // this.selectedItem = KeyItemHandler.getKeyItemByName(name);
    }

    static get inspectedItem() {
        return this._inspectedItem();
    }

    static set inspectedItem(item: KeyItem) {
        this._inspectedItem(item);
    }

    static get selectedItem() {
        return this._selectedItem();
    }

    static set selectedItem(item: KeyItem) {
        this._selectedItem(item);
    }
}

