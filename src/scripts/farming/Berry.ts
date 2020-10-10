///<reference path="./BerryType.ts"/>
class Berry {
    public type: BerryType;
    public growthTime: number[];
    public harvestAmount: number;
    public replantRate: number;
    public farmValue: number;

    constructor(type: BerryType, growthTime: number[], harvestAmount: number, replantRate: number, farmValue: number) {
        this.type = type;
        this.growthTime = growthTime;
        this.harvestAmount = harvestAmount;
        this.replantRate = replantRate;
        this.farmValue = farmValue;
    }
}
