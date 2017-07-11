class BattleItem extends Item {

    type: GameConstants.BattleItemType;

    constructor(name: string, basePrice: number, priceMultiplier: number, type: GameConstants.BattleItemType) {
        super(name, basePrice, priceMultiplier);
        this.type = type;
    }

    onBuy() {
    }

    onUse() {
    }
}

