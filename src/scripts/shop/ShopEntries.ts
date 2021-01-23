///<reference path="./ShopEntry.ts"/>

class ShopEntries implements Feature {
    name = 'ShopEntries';
    saveKey = 'shopEntries';
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
