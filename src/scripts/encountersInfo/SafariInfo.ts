class SafariInfo {
    public static itemList = ko.pureComputed(() => {
        return SafariInfo.getItemList();
    });

    public static getName() {
        return player.town.name;
    }

    private static getItemList() {
        const itemsArray =
            SafariItemController.list[player.region]
                .map((item) => ({item: item.item.id, type: 'item', requirement: item.requirement}));
        return {
            items: {category: 'Items', data: (itemsArray ?? [])},
        };
    }
}
