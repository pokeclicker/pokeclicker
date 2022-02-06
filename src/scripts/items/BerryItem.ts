///<reference path="Item.ts"/>

class BerryItem extends Item {
    public berryName: string;

    constructor(public berry: BerryType, basePrice: number, currency = GameConstants.Currency.farmPoint, public berryReq?: BerryType) {
        super(`${BerryType[berry]}Berry`, basePrice, currency, { maxAmount: 1 }, `${BerryType[berry]} Berry`);
        this.berryName = BerryType[berry];
    }

    gain(amt: number) {
        App.game.farming.gainBerry(this.berry, amt, false);
    }

    get description(): string {
        return `Obtain a ${this.berryName}<br/><i>(No Oak Item challenge runs only)</i>`;
    }

    isAvailable(): boolean {
        const hasBerry = !!App.game.farming.berryList[this.berry]() ?? false;
        const unlockedBerryReq = App.game.farming.unlockedBerries[this.berryReq]?.() ?? false;
        const noOakItemChallenge = App.game.challenges.list.disableOakItems.active();
        return super.isAvailable() && !hasBerry && unlockedBerryReq && noOakItemChallenge;
    }

    get image() {
        return `assets/images/items/berry/${this.berryName}.png`;
    }
}

ItemList['ChopleBerry']   = new BerryItem(BerryType.Chople, 10000, GameConstants.Currency.farmPoint, BerryType.Spelon);
ItemList['KebiaBerry']   = new BerryItem(BerryType.Kebia, 10000, GameConstants.Currency.farmPoint, BerryType.Pamtre);
ItemList['ShucaBerry']   = new BerryItem(BerryType.Shuca, 10000, GameConstants.Currency.farmPoint, BerryType.Watmel);
ItemList['ChartiBerry']   = new BerryItem(BerryType.Charti, 10000, GameConstants.Currency.farmPoint, BerryType.Cornn);
