class TableReward extends Reward {

    constructor(name: string, weight: number, minAmount: number, maxAmount: number) {
        super(name, weight, minAmount, maxAmount);
    }

    getLoot(): Loot[] {
        return rewardTableList[this.name].getLoot();
    }
}