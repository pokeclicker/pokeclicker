class Shop {
    name: ShopName;
    items: KnockoutObservableArray<Item>;

    constructor(name: ShopName, items: string[]) {
        this.name = name;
        const itemList: Item[] = [];

        for (const item of items) {
            itemList.push(ItemList[item]);
        }

        this.items = ko.observableArray(itemList);
    }
}

