/**
 * Static class as an API for handling items.
 */
class BagHandler {

    /**
     * Gets the display name for the item
     * @param item The item identifier
     */
    public static displayName(item: BagItem): string {
        if (!item) {
            return '';
        }
        switch (item.type) {
            case ItemType.item:
                return this.getItem(item.id).displayName;
            case ItemType.underground:
                return this.getUndergroundItem(item.id).displayName;
            case ItemType.berry:
                return `${BerryType[this.getBerry(item.id)]} Berry`;
            case ItemType.gem:
                return `${PokemonType[this.getGem(item.id)]} Gem`;
        }
    }

    /**
     * Gets the image path for the item
     * @param item The item identifier
     */
    public static image(item: BagItem): string {
        if (!item) {
            return '';
        }
        switch (item.type) {
            case ItemType.item:
                return this.getItem(item.id).image;
            case ItemType.underground:
                return this.getUndergroundItem(item.id).image;
            case ItemType.berry:
                return FarmController.getBerryImage(this.getBerry(item.id));
            case ItemType.gem:
                return Gems.image(this.getGem(item.id));
        }
    }

    /**
     * Gets the amount observable for the item. NOTE: You shouldn't use this to modify the amount, as there might
     * be some additional code that needs to be run via the base gainItem API calls. Use BagHandler.gainItem instead.
     * @param item The item identifier
     */
    public static amount(item: BagItem): KnockoutObservable<number> {
        if (!item) {
            return null;
        }
        switch (item.type) {
            case ItemType.item:
                return player.itemList[this.getItem(item.id).name];
            case ItemType.underground:
                return player.itemList[this.getUndergroundItem(item.id).itemName]();
            case ItemType.berry:
                return App.game.farming.berryList[this.getBerry(item.id)];
            case ItemType.gem:
                return App.game.gems.gemWallet[this.getGem(item.id)];
        }
    }

    /**
     * Handles updating the amount for an item. This should be used instead of modifying the amount observable
     * directly, as the base method might have additional handling.
     * @param item The item identifier
     * @param amount The amount to be added to the Bag. Defaults to 1.
     */
    public static gainItem(item: BagItem, amount = 1): void {
        if (!item) {
            return;
        }
        switch (item.type) {
            case ItemType.item:
                this.getItem(item.id).gain(amount);
                return;
            case ItemType.underground:
                UndergroundController.gainMineItem(this.getUndergroundItem(item.id).id, amount);
                return;
            case ItemType.berry:
                App.game.farming.gainBerry(this.getBerry(item.id), amount, false);
                return;
            case ItemType.gem:
                App.game.gems.gainGems(amount, this.getGem(item.id));
                return;
        }
    }

    public static isAvailable(item: BagItem): boolean {
        if (!item) {
            return false;
        }
        switch (item.type) {
            case ItemType.item:
                return this.getItem(item.id).isAvailable() && !this.getItem(item.id).isSoldOut();
            case ItemType.underground:
                return  !this.getUndergroundItem(item.id).requirement || this.getUndergroundItem(item.id).requirement.isCompleted();
            case ItemType.berry:
            case ItemType.gem:
            default:
                return true;
        }
    }

    //#region Item getters

    private static getItem(id: string | number): Item {
        return ItemList[id];
    }

    private static getUndergroundItem(id: string | number): UndergroundItem {
        if (typeof id === 'string') {
            return UndergroundItems.getByName(id);
        } else {
            return UndergroundItems.getById(id);
        }
    }

    private static getBerry(id: string | number): BerryType {
        if (typeof id === 'string') {
            id = App.game.farming.berryData.findIndex((_, idx) => BerryType[idx] === id);
        }
        return id;
    }

    private static getGem(id: string | number): PokemonType {
        if (typeof id === 'string') {
            id = <number>PokemonType[id];
        }
        return id;
    }

    //#endregion

}
