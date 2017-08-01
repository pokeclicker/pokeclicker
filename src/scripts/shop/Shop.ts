/**
 * Created by dennis on 03-07-17.
 */
class Shop {
    items: KnockoutObservableArray<Item>;

    constructor(items: string[]) {
        let itemList: Item[] = [];

        for (let item of items) {
            itemList.push(ItemList[item]);
        }

        this.items = ko.observableArray(itemList);
    }
}

