class OakItems implements Feature {
    name: string = "Oak Items";
    saveKey: string = "oakItems";

    itemList: OakItem[];
    unlockRequirements: number[];

    defaults: object;

    constructor(unlockRequirements: number[]) {
        this.itemList = [];
        this.unlockRequirements = unlockRequirements
    }

    canAccess(): boolean {
        return player.caughtPokemonList.length > 15;
    }

    initialize() {
        this.itemList = [
            new OakItem(OakItems.OakItem.Magic_Ball, "Magic Ball", [5, 6, 7, 8, 9, 10], 0, true, 20, "Gives a bonus to your catchrate", 2),
            // new OakItem(OakItems.OakItem.Amulet_Coin, 30, "Gain more coins from battling", 25, 5, 1),
            // new OakItem(OakItems.OakItem.Poison_Barb, 40, "Clicks do more damage", 25, 5, 3),
            // new OakItem(OakItems.OakItem.Exp_Share, 50, "Gain more exp from battling", 15, 3, 1),
            // new OakItem(OakItems.OakItem.Sprayduck, 60, "Makes your berries grow faster", 25, 5, 3),
            // new OakItem(OakItems.OakItem.Shiny_Charm, 70, "Encounter more shinies", 50, 100, 150),
            // new OakItem(OakItems.OakItem.Blaze_Cassette, 80, "Hatch eggs faster", 50, 10, 10),
            //
            // new OakItem(OakItems.OakItem.Cell_Battery, 90, "More passive mining energy regen", 25, 5, 50),
        ]

    }

    calculateBonus(item: OakItems.OakItem) {
        let oakItem = this.itemList[item];
        if (oakItem == undefined) {
            console.log("Warning: could not find oakItem", item, "This could have unintended consequences");
            return 1;
        }
        return oakItem.calculateBonus()
    }

    hasOakItem(item: OakItems.OakItem) {
        if (this.itemList[item] == undefined) {
            return false
        }
        return player.caughtPokemonList.length >= this.itemList[item].unlockReq;
    }

    use(item: OakItems.OakItem) {
        if (!this.hasOakItem(item)) {
            return;
        }
        this.itemList[item].use();
    }

    maxActiveCount() {
        for (let i = 0; i < this.unlockRequirements.length; i++) {
            if (player.caughtPokemonList.length < this.unlockRequirements[i]) {
                return i;
            }
        }
        return this.unlockRequirements.length;
    }


    fromJSON(json: object): void {
        for (let key in json) {
            if (json.hasOwnProperty(key)) {
                this.itemList[KeyItems.KeyItem[key]].fromJSON(json[key]);
            }
        }
    }

    toJSON(): object {
        let save = {};
        for (let i = 0; i < this.itemList.length; i++) {
            save[OakItems.OakItem[this.itemList[i].name]] = this.itemList[i].toJSON();
        }
        return save;
    }

    update(delta: number): void {
        // This method intentionally left blank
    }

    isActive(item: OakItems.OakItem) {
        if (this.itemList[item] == undefined) {
            return false;
        }
        return this.itemList[item].isActive;
    }
}

namespace OakItems {
    export enum OakItem {
        "Magic_Ball" = 0,
        "Amulet_Coin",
        "Poison_Barb",
        "Exp_Share",
        "Sprayduck",
        "Shiny_Charm",
        "Blaze_Cassette",
        "Cell_Battery",
    }
}
