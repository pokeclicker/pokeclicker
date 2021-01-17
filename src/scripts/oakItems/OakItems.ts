class OakItems implements Feature {
    name = 'Oak Items';
    saveKey = 'oakItems';

    itemList: OakItem[];
    unlockRequirements: number[];

    constructor(unlockRequirements: number[], private multiplier: Multiplier) {
        this.itemList = [];
        this.unlockRequirements = unlockRequirements;
    }

    defaults: Record<string, any>;

    canAccess(): boolean {
        return App.game.party.caughtPokemon.length >= 20;
    }

    initialize() {
        this.itemList = [
            new OakItem(OakItems.OakItem.Magic_Ball, 'Magic Ball', 'Gives a bonus to your catchrate',
                true, [5, 6, 7, 8, 9, 10], 0, 20, 2, undefined, undefined, undefined, '%'),
            new OakItem(OakItems.OakItem.Amulet_Coin, 'Amulet Coin', 'Gain more coins from battling',
                true, [1.25, 1.30, 1.35, 1.40, 1.45, 1.50], 1, 30, 1),
            new OakItem(OakItems.OakItem.Poison_Barb, 'Poison Barb', 'Clicks do more damage',
                true, [1.25, 1.30, 1.35, 1.40, 1.45, 1.50], 1, 40, 3),
            new OakItem(OakItems.OakItem.Exp_Share, 'EXP Share', 'Gain more exp from battling',
                true, [1.15, 1.18, 1.21, 1.24, 1.27, 1.30], 1, 50, 1),
            new OakItem(OakItems.OakItem.Sprayduck, 'Sprayduck', 'Makes your berries grow faster',
                false, [1.25, 1.30, 1.35, 1.40, 1.45, 1.50], 1, 60, 1),
            new OakItem(OakItems.OakItem.Shiny_Charm, 'Shiny Charm', 'Encounter shinies more often',
                true, [1.50, 1.60, 1.70, 1.80, 1.90, 2.00], 1, 70, 150),
            new OakItem(OakItems.OakItem.Blaze_Cassette, 'Blaze Cassette', 'Hatch eggs faster',
                false, [1.50, 1.60, 1.70, 1.80, 1.90, 2.00], 1, 80, 10),
            new OakItem(OakItems.OakItem.Cell_Battery, 'Cell Battery', 'More passive mining energy regen',
                false, [1.5, 1.6, 1.7, 1.8, 1.9, 2], 1, 90, 20),
            new BoughtOakItem(OakItems.OakItem.Squirtbottle, 'Squirtbottle', 'Increases the chance of berry mutations', 'Johto Berry Master',
                true, [1.25, 1.5, 1.75, 2, 2.25, 2.5], 1, 10, undefined, undefined, AmountFactory.createArray([2000, 5000, 10000, 20000, 50000], GameConstants.Currency.farmPoint)),
            new BoughtOakItem(OakItems.OakItem.Sprinklotad, 'Sprinklotad', 'Increases the chance of berry replants', 'Hoenn Berry Master',
                true, [1.15, 1.3, 1.45, 1.6, 1.75, 1.9], 1, 2, undefined, undefined, AmountFactory.createArray([2000, 5000, 10000, 20000, 50000], GameConstants.Currency.farmPoint)),
            new BoughtOakItem(OakItems.OakItem.Explosive_Charge, 'Explosive Charge', 'All new mining layers start with damaged tiles', 'Cinnabar Island Shop',
                true, [2, 4, 7, 11, 15, 20], 1, 50, undefined, undefined, AmountFactory.createArray([50000, 100000, 400000, 1000000, 2000000], GameConstants.Currency.money)),
            new BoughtOakItem(OakItems.OakItem.Treasure_Scanner, 'Treasure Scanner', 'Chance to multiply mining rewards', 'Cinnabar Island Shop',
                true, [4, 8, 12, 16, 20, 24], 1, 20, undefined, undefined, AmountFactory.createArray([50000, 100000, 250000, 500000, 1000000], GameConstants.Currency.money), '%'),
        ];

        this.addMultiplier('clickAttack', OakItems.OakItem.Poison_Barb);
        this.addMultiplier('exp', OakItems.OakItem.Exp_Share);
        this.addMultiplier('money', OakItems.OakItem.Amulet_Coin);
        this.addMultiplier('shiny', OakItems.OakItem.Shiny_Charm);
        this.addMultiplier('eggStep', OakItems.OakItem.Blaze_Cassette);
    }

    private addMultiplier(type: keyof typeof MultiplierType, item: OakItems.OakItem) {
        this.multiplier.addBonus(type, this.createMultiplierFunction(item));
    }

    private createMultiplierFunction(item: OakItems.OakItem): GetMultiplierFunction {
        return (useBonus: boolean) => this.calculateBonus(item, useBonus);
    }

    calculateBonus(item: OakItems.OakItem, useItem = false): number {
        const oakItem = this.itemList[item];
        if (oakItem == undefined) {
            console.error('Could not find oakItem', item, 'This could have unintended consequences');
            return 1;
        }

        if (useItem) {
            oakItem.use();
        }

        return oakItem.calculateBonus();
    }

    isUnlocked(item: OakItems.OakItem) {
        if (this.itemList[item] == undefined) {
            return false;
        }
        return this.itemList[item].isUnlocked();
    }

    use(item: OakItems.OakItem, scale = 1) {
        if (!this.isUnlocked(item)) {
            return;
        }
        this.itemList[item].use(undefined, scale);
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
        if (json == null) {
            return;
        }

        // Loading OakItems
        GameHelper.enumStrings(OakItems.OakItem).forEach((oakItem) => {
            if (json.hasOwnProperty(oakItem)) {
                this.itemList[OakItems.OakItem[oakItem]].fromJSON(json[oakItem]);
            }
        });
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
        'Squirtbottle',
        'Sprinklotad',
        'Explosive_Charge',
        'Treasure_Scanner',
    }
}
