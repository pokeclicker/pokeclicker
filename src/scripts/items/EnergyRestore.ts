/**
 * Created by dennis on 11-07-17.
 */
class EnergyRestore extends Item {

    type: GameConstants.EnergyRestoreSize;

    constructor(name: string, basePrice: number, priceMultiplier: number, type: GameConstants.EnergyRestoreSize) {
        super(name, basePrice, priceMultiplier);
        this.type = type;
    }

    onBuy() {
    }

    onUse() {
    }
}