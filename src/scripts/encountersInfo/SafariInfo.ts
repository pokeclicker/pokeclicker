class SafariInfo {
    public static getName() : string {
        return player.town.name;
    }

    public static itemList : KnockoutObservable<InfoItemList[]> = ko.pureComputed(() => {
        return SafariInfo.getItemList();
    });

    private static getItemList() : InfoItemList[] {
        const itemsArray : InfoItem[] =
            SafariItemController.list[player.region]
                ?.map((item) => (new InfoItem(String(item.item.id), 'item', item.requirement)));
        const array: InfoItemList[] = [];
        array.push(new InfoItemList('items', 'Items', (itemsArray ?? [])));
        return array;
    }
}
