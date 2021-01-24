///<reference path="./ShopEntry.ts"/>

class Shops implements Feature {
    name = 'Shops';
    saveKey = 'shops';
    defaults: Record<string, any>;

    public shopEntries: Record<string, ShopEntryData>;

    constructor() {
        this.shopEntries = {};
        Object.keys(ShopEntriesList).forEach(shopEntry => {
            this.shopEntries[shopEntry] = new ShopEntryData();
        });
    }

    initialize() { }

    canAccess(): boolean {
        return true;
    }

    update(delta: number) {
    }

    lowerItemMultipliers(multiplierDecreaser: MultiplierDecreaser, amount = 1) {
        for (const obj in ShopEntriesList) {
            const shopEntry = ShopEntriesList[obj];
            shopEntry.decreasePriceMultiplier(amount, multiplierDecreaser);
        }
    }

    toJSON(): Record<string, any> {
        const json = {};

        Object.keys(this.shopEntries).forEach(shopEntry => {
            json[shopEntry] = this.shopEntries[shopEntry].toJSON();
        });

        return json;
    }

    fromJSON(json: Record<string, any>) {
        if (!json) {
            return;
        }
        Object.keys(this.shopEntries).forEach(shopEntry => {
            if (json.hasOwnProperty(shopEntry)) {
                this.shopEntries[shopEntry].fromJSON(json[shopEntry]);
            }
        });
    }

}

const ShopEntriesList: { [name: string]: ShopEntry } = {};
