///<reference path="Reward.ts"/>
class PercentReward extends Reward {

    constructor(name: string, weight: number, minAmount: number, maxAmount: number) {
        super(name, weight, minAmount, maxAmount);
    }

    public getLoot(): Loot[] {
        let amount: number = GameConstants.randomIntBetween(this.minAmount, this.maxAmount);
        return [new Loot(this.name, amount)];
    }
}