class KeyItemHandler {

    public static keyItemList: KnockoutObservable<KeyItem>[];
    public static inspectedItem: KnockoutObservable<KeyItem> = ko.observable(null);
    public static selectedItem:  KnockoutObservable<KeyItem> = ko.observable(null);

    public static initialize() {
        KeyItemHandler.keyItemList = [];

        // TODO obtain after the tutorial
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Teachy tv", "A television set that is tuned to a program with useful tips for novice TRAINERS")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Coin case", "A case for holding money. It can hold up to 1,000,000 coins")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Town map", "A very convenient map that can be viewed anytime. It even shows you your present location in the region", function(){
            return player.routeKillsObservable(1)() > player.routeKillsNeeded -1;
        })));



        // TODO obtain somewhere at the start
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Dungeon ticket", "This ticket grants access to all dungeons in the Kanto region")));

        // TODO obtain somewhere at the start
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Holo caster", "A device that allows users to receive and view hologram clips at any time. It’s also used to chat with others")));

        // TODO obtain after the first Pokémon is lvl 100
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Mystery egg", "A mysterious Egg obtained from Mr. Pokémon. What is in the Egg is unknown")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Safari ticket", "This ticket grants access to the Safari Zone in Fuchsia City", function () {
            return player.hasBadge(GameConstants.Badge.Soul);
        })));

        // TODO obtain when the player has 10 seeds
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Wailmer pail", "This is a tool for watering Berries you planted to make them grow more quickly", function () {
            return false;
        })));

        // TODO buy for 100 quest points
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Explorer kit", "A bag filled with convenient tools for exploring. It provides access to the Underground in the Sinnoh region")));

        // TODO buy for 500 quest points
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Event calendar", "This calendar will keep you up to date on the latest events")));

        // TODO obtain after first prestige
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Shard case", "A case specifically designed for holding shards", function () {
            return false;
        })));

        let item: KeyItem = KeyItemHandler.getKeyItemByName("Teachy tv");
        KeyItemHandler.selectedItem(item);
    }

    public static getKeyItemByName(name:string): KeyItem{
        for(let i = 0 ; i<KeyItemHandler.keyItemList.length; i++){
            if(KeyItemHandler.keyItemList[i]().name() == name){
                return KeyItemHandler.keyItemList[i]();
            }
        }
    }

    public static hover(name:string){
        KeyItemHandler.inspectedItem(KeyItemHandler.getKeyItemByName(name));
    }

    public static hoverRelease(){
        KeyItemHandler.inspectedItem(KeyItemHandler.selectedItem());
    }

    public static click(name:string){
        let item: KeyItem = KeyItemHandler.getKeyItemByName(name);
        KeyItemHandler.selectedItem(item);
    }


}