/**
 * Created by dennis on 03-07-17.
 */
class Shop {
    items: KnockoutObservableArray<Item>;

    constructor(items: Item[]) {
        this.items = ko.observableArray(items);
    }
}

