///<reference path="Item.ts"/>

class HeldItem extends Item {
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency,
        shopOptions : ShopOptions,
        displayName: string,
        description: string,
        public regionUnlocked: GameConstants.Region) {
        super(name, basePrice, currency, shopOptions, displayName, description, 'heldItems');
    }

    public static getHeldItems() {
        return Object.values(ItemList).filter(i => i instanceof HeldItem);
    }
}

class AttackBonusHeldItem extends HeldItem {
    constructor(
        name: string,
        basePrice: number,
        currency: GameConstants.Currency = GameConstants.Currency.money,
        shopOptions : ShopOptions,
        displayName: string,
        public attackBonus: number,
        regionUnlocked: GameConstants.Region) {
        super(name, basePrice, currency, shopOptions, displayName, `Increases the attack of a pokemon by ${((attackBonus - 1) * 100).toFixed(0)}%.`, regionUnlocked);
    }
}
