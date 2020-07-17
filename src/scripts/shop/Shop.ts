class Shop {
    items: KnockoutObservableArray<Item>;

    constructor(items: Item[]) {
        this.items = ko.observableArray(items);
    }
}

