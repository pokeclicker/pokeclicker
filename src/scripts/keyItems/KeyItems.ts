class KeyItems implements Feature {
    name = "Key Items";
    saveKey = "keyItems";

    itemList: KeyItem[];

    defaults: object;

    constructor() {
        this.itemList = [];
    }

    initialize() {
        this.itemList = [
            new KeyItem(KeyItems.KeyItem.Teachy_tv, "A television set that is tuned to a program with useful tips for novice TRAINERS", null, true),
            new KeyItem(KeyItems.KeyItem.Coin_case, "A case for holding money. It can hold up to 1,000,000 coins", null, true),
            new KeyItem(KeyItems.KeyItem.Pokeball_bag, "A tiny bag that can hold up to 4 different types of PokéBalls", null, true),
            new KeyItem(KeyItems.KeyItem.Town_map, "A very convenient map that can be viewed anytime. It even shows you your present location in the region", function () {
                return player.routeKillsObservable(1)() > player.routeKillsNeeded - 1;
            }),
            // TODO obtain somewhere at the start
            new KeyItem(KeyItems.KeyItem.Factory_key, "This pass serves as an ID card for gaining access to the Pokéball factory that lies along Route 13"),
            new KeyItem(KeyItems.KeyItem.Dungeon_ticket, "This ticket grants access to all dungeons in the Kanto region,<br/><strong>Tip:</strong> You gain Dungeon Tokens by capturing Pokémon"),
            new KeyItem(KeyItems.KeyItem.Super_rod, "The best fishing rod for catching wild water Pokémon", function () {
                return player.routeKillsObservable(12)() > player.routeKillsNeeded - 1;
            }),
            // TODO obtain somewhere at the start
            new KeyItem(KeyItems.KeyItem.Holo_caster, "A device that allows users to receive and view hologram clips at any time. It’s also used to chat with others"),
            new KeyItem(KeyItems.KeyItem.Mystery_egg, "A mysterious Egg obtained from Mr. Pokémon. What is in the Egg is unknown", function () {
                return player.maxLevelPokemonList()().length > 0;
            }),
            new KeyItem(KeyItems.KeyItem.Safari_ticket, "This ticket grants access to the Safari Zone in Fuchsia City"),
            new KeyItem(KeyItems.KeyItem.Wailmer_pail, "This is a tool for watering Berries you planted to make them grow more quickly", function () {
                return MapHelper.accessToRoute(14, 1) && player.berryList[0]() >= 5
            }),

            new KeyItem(KeyItems.KeyItem.Explorer_kit, "A bag filled with convenient tools for exploring. It provides access to the Underground"),
            // TODO buy for 500 quest points
            new KeyItem(KeyItems.KeyItem.Event_calendar, "This calendar will keep you up to date on the latest events"),
            // TODO obtain after first prestige
            new KeyItem(KeyItems.KeyItem.Shard_case, "A case specifically designed for holding shards", function () {
                return false;
            })
        ];
    }

    hasKeyItem(item: KeyItems.KeyItem) {
        if (this.itemList[item] == undefined) {
            return false
        }
        return this.itemList[item].isUnlocked;
    }

    gainKeyItem(item: KeyItems.KeyItem) {
        if (!this.hasKeyItem(item)) {
            KeyItemController.showGainModal(item);
            this.itemList[item].unlock();
        }
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: object): void {
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                if (json[key] === true) {
                    // Unlock to dispose unlocker if needed
                    this.itemList[KeyItems.KeyItem[key]].unlock();
                }
            }
        }
    }

    toJSON(): object {
        const save = {};
        for (let i = 0; i < this.itemList.length; i++) {
            save[KeyItems.KeyItem[this.itemList[i].name]] = this.itemList[i].isUnlocked;
        }
        return save;
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}

namespace KeyItems {
    export enum KeyItem {
        "Teachy_tv",
        "Coin_case",
        "Pokeball_bag",
        "Town_map",
        "Factory_key",
        "Dungeon_ticket",
        "Super_rod",
        "Holo_caster",
        "Mystery_egg",
        "Safari_ticket",
        "Wailmer_pail",
        "Explorer_kit",
        "Event_calendar",
        "Shard_case"
    }
}
