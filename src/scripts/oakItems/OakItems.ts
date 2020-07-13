class OakItems implements Feature {
    name = 'Oak Items';
    saveKey = 'oakItems';

    itemList: OakItem[];
    unlockRequirements: number[];

    defaults: Record<string, any>;

    constructor(unlockRequirements: number[]) {
        this.itemList = [];
        this.unlockRequirements = unlockRequirements;
    }

    canAccess(): boolean {
        return App.game.party.caughtPokemon.length > 15;
    }

    initialize() {
        this.itemList = [
            new OakItem(OakItems.OakItem.Magic_Ball, 'Magic Ball', [5, 6, 7, 8, 9, 10], 0, true, 20, 'Gives a bonus to your catchrate', 2),
            new OakItem(OakItems.OakItem.Amulet_Coin, 'Amulet Coin', [1.25, 1.30, 1.35, 1.40, 1.45, 1.50], 1, true, 30, 'Gain more coins from battling', 1),
            new OakItem(OakItems.OakItem.Poison_Barb, 'Poison Barb', [1.25, 1.30, 1.35, 1.40, 1.45, 1.50], 1, true, 40, 'Clicks do more damage', 3),
            new OakItem(OakItems.OakItem.Exp_Share, 'Exp Share', [1.15, 1.18, 1.21, 1.24, 1.27, 1.30], 1, true, 50, 'Gain more exp from battling', 1),
            new OakItem(OakItems.OakItem.Sprayduck, 'Sprayduck', [1.25, 1.30, 1.35, 1.40, 1.45, 1.50], 1, false, 60, 'Makes your berries grow faster', 3),
            new OakItem(OakItems.OakItem.Shiny_Charm, 'Shiny Charm', [1.50, 1.60, 1.70, 1.80, 1.90, 2.00], 1, true, 70, 'Encounter shinies more often', 150),
            new OakItem(OakItems.OakItem.Blaze_Cassette, 'Blaze Cassette', [1.50, 1.60, 1.70, 1.80, 1.90, 2.00], 1, false, 80, 'Hatch eggs faster', 10),
            new OakItem(OakItems.OakItem.Cell_Battery, 'Cell Battery', [1.25, 1.30, 1.35, 1.40, 1.45, 1.50], 1, false, 90, 'More passive mining energy regen', 50),
        ];
    }

    calculateBonus(item: OakItems.OakItem) {
        const oakItem = this.itemList[item];
        if (oakItem == undefined) {
            console.error('Could not find oakItem', item, 'This could have unintended consequences');
            return 1;
        }
        return oakItem.calculateBonus();
    }

    isUnlocked(item: OakItems.OakItem) {
        if (this.itemList[item] == undefined) {
            return false;
        }
        return App.game.party.caughtPokemon.length >= this.itemList[item].unlockReq;
    }

    use(item: OakItems.OakItem) {
        if (!this.isUnlocked(item)) {
            return;
        }
        this.itemList[item].use();
    }

    maxActiveCount() {
        for (let i = 0; i < this.unlockRequirements.length; i++) {
            if (App.game.party.caughtPokemon.length < this.unlockRequirements[i]) {
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

    hasAvailableSlot(): boolean {
        return this.activeCount() < this.maxActiveCount();
    }

    fromJSON(json: Record<string, any>): void {
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                this.itemList[OakItems.OakItem[key]].fromJSON(json[key]);
            }
        }
    }

    toJSON(): Record<string, any> {
        const save = {};
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
        if (!this.isUnlocked(item)) {
            return;
        }
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
        'Magic_Ball' = 0,
        'Amulet_Coin',
        'Poison_Barb',
        'Exp_Share',
        'Sprayduck',
        'Shiny_Charm',
        'Blaze_Cassette',
        'Cell_Battery',
    }
}
