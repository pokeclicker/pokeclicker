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
        // TODO(@Isha) validate if working correctly
        this.itemList = [
            new OakItem(OakItems.OakItem.Magic_Ball, "Magic Ball", [5, 6, 7, 8, 9, 10], 0, true, 20, "Gives a bonus to your catchrate", 2),
            new OakItem(OakItems.OakItem.Amulet_Coin, "Amulet Coin", [25, 30, 35, 40, 45, 50], 1, true, 30, "Gain more coins from battling", 1),
            new OakItem(OakItems.OakItem.Poison_Barb, "Poison Barb", [25, 30, 35, 40, 45, 50], 1, true, 40, "Clicks do more damage", 3),
            new OakItem(OakItems.OakItem.Exp_Share, "Exp Share", [15, 18, 21, 24, 27, 30], 1, true, 50, "Gain more exp from battling", 1),
            new OakItem(OakItems.OakItem.Sprayduck, "Sprayduck", [25, 30, 35, 40, 45, 50], 0, false, 60, "Makes your berries grow faster", 3),
            new OakItem(OakItems.OakItem.Shiny_Charm, "Shiny Charm", [50, 60, 70, 80, 90, 100], 1, true, 70, "Encounter shinies more often", 150),
            new OakItem(OakItems.OakItem.Blaze_Cassette, "Blaze Cassette", [50, 60, 70, 80, 90, 100], 0, false, 80, "Hatch eggs faster", 10),
            new OakItem(OakItems.OakItem.Cell_Battery, "Cell Battery", [25, 30, 35, 40, 45, 50], 0, false, 80, "More passive mining energy regen", 50),
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

    isUnlocked(item: OakItems.OakItem) {
        if (this.itemList[item] == undefined) {
            return false
        }
        return player.caughtPokemonList.length >= this.itemList[item].unlockReq;
    }

    use(item: OakItems.OakItem) {
        if (!this.isUnlocked(item)) {
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

    activeCount() {
        let count = 0;
        for (let i = 0; i < this.itemList.length; i++) {
            if (this.itemList[i].isActive) {
                count++;
            }
        }
        return count;
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

    activate(item: OakItems.OakItem) {
        if (this.maxActiveCount() == 0) {
            return;
        }
        if (this.maxActiveCount() == 1) {
            this.deactivateAll();
            this.itemList[item].isActive = true;
        }
        if (this.activeCount() < this.maxActiveCount()) {
            this.itemList[item].isActive = true;
        }
    }

    private deactivateAll() {
        for (let i = 0; i < this.itemList.length; i++) {
            this.itemList[i].isActive = false;
        }
    }

    deactivate(item: OakItems.OakItem) {
        this.itemList[item].isActive = false;
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
