class KeyItemController {
    private static _inspectedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv);
    private static _selectedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv);
    private static _latestGainedItem: KnockoutObservable<KeyItemType> = ko.observable(KeyItemType.Teachy_tv)

    static showGainModal(item: KeyItemType) {
        this.latestGainedItem = item;
        $('.modal').modal('hide');
        $('#keyItemModal').modal({
            backdrop: 'static',
            keyboard: false,
        });
    }

    public static hover(item: KeyItemType) {
        this.inspectedItem = item;
    }

    public static hoverRelease() {
        this.selectedItem = this.inspectedItem;
    }

    static get inspectedItem() {
        return this._inspectedItem();
    }

    static set inspectedItem(item: KeyItemType) {
        this._inspectedItem(item);
    }

    static get selectedItem() {
        return this._selectedItem();
    }

    static set selectedItem(item: KeyItemType) {
        this._selectedItem(item);
    }

    static get latestGainedItem() {
        return this._latestGainedItem();
    }

    static set latestGainedItem(item: KeyItemType) {
        this._latestGainedItem(item);
    }
}

