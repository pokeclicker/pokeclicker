class KeyItemHandler {

    public static keyItemList: KnockoutObservable<KeyItem>[];

    public static initialize() {
        KeyItemHandler.keyItemList = [];

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Shard Case", "A case specifically designed for holding shards", new Function('return player.money > 10;') )));
    }


}