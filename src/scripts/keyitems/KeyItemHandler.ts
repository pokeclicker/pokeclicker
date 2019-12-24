class KeyItemHandler {

    public static keyItemList: KnockoutObservable<KeyItem>[];
    public static inspectedItem: KnockoutObservable<KeyItem> = ko.observable(null);
    public static selectedItem:  KnockoutObservable<KeyItem> = ko.observable(null);

    public static initialize() {
        KeyItemHandler.keyItemList = [];

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Teachy tv", "A television set that is tuned to a program with useful tips for novice TRAINERS")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Coin case", "A case for holding money. It can hold up to 1,000,000 coins")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Pokeball bag", "A tiny bag that can hold up to 4 different types of PokéBalls")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Town map", "A very convenient map that can be viewed anytime. It even shows you your present location in the region", function(){
            return player.routeKillsObservable(1)() > player.routeKillsNeeded -1;
        })));

        // TODO obtain somewhere at the start
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Factory key", "This pass serves as an ID card for gaining access to the Pokéball factory that lies along Route 13")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Dungeon ticket", "This ticket grants access to all dungeons in the Kanto region,<br/><strong>Tip:</strong> You gain Dungeon Tokens by capturing Pokémon")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Super rod", "The best fishing rod for catching wild water Pokémon", function(){
            return player.routeKillsObservable(12)() > player.routeKillsNeeded - 1;
        })));

        // TODO obtain somewhere at the start
        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Holo caster", "A device that allows users to receive and view hologram clips at any time. It’s also used to chat with others")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Mystery egg", "A mysterious Egg obtained from Mr. Pokémon. What is in the Egg is unknown", function () {
            return player.maxLevelPokemonList()().length > 0;
        })));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Safari ticket", "This ticket grants access to the Safari Zone in Fuchsia City")));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Wailmer pail", "This is a tool for watering Berries you planted to make them grow more quickly", function () {
            return MapHelper.accessToRoute(14,1) && player.berryList[0]() >= 5
        })));

        KeyItemHandler.keyItemList.push(ko.observable(new KeyItem("Explorer kit", "A bag filled with convenient tools for exploring. It provides access to the Underground")));

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

    public static getKeyItemObservableByName(name:string): KnockoutObservable<KeyItem>{
        for(let i = 0 ; i<KeyItemHandler.keyItemList.length; i++){
            if(KeyItemHandler.keyItemList[i]().name() == name){
                return KeyItemHandler.keyItemList[i];
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
