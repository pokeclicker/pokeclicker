///<reference path="Item.ts"/>

class HeldItem extends Item {
    public static heldItemSelected: KnockoutObservable<HeldItem> = ko.observable(undefined);

    regionUnlocked: GameConstants.Region;

    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        description: string,
        regionUnlocked: GameConstants.Region) {
        super(name, basePrice, currency, shopOptions, displayName, description, 'heldItems');
        this.regionUnlocked = regionUnlocked;
    }

    public static getHeldItems() {
        return Object.values(ItemList).filter(i => i instanceof HeldItem);
    }

    public isUnlocked() {
        return player.highestRegion() >= this.regionUnlocked;
    }
}

class AttackBonusHeldItem extends HeldItem {
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        public attackBonus: number,
        regionUnlocked: GameConstants.Region) {
        super(name, basePrice, currency, shopOptions, displayName, `A held item that raises the attack of the pokémon by ${((attackBonus - 1) * 100).toFixed(0)}%.`, regionUnlocked);
    }
}

class EVsGainedBonusHeldItem extends HeldItem { // TODO: make sure this class does something
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        public gainedBonus: number,
        regionUnlocked: GameConstants.Region) {
        super(name, basePrice, currency, shopOptions, displayName, `A held item that increases the EVs the pokémon gains by ${((gainedBonus - 1) * 100).toFixed(0)}%.`, regionUnlocked);
    }
}

ItemList['Macho_Brace'] = new EVsGainedBonusHeldItem('Macho_Brace', 6655321, GameConstants.Currency.money, undefined, 'Macho Brace', 2, GameConstants.Region.final /* GameConstants.Region.sinnoh */);
