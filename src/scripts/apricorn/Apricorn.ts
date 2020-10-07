///<reference path="./ApricornType.ts"/>
class Apricorn {
    public type: ApricornType;
    public growTime: number;
    public harvestTime: number;
    public harvestAmount: number;

    constructor(type: ApricornType, growTime: number, harvestTime: number, harvestAmount: number) {
        this.type = type;
        this.growTime = growTime;
        this.harvestTime = harvestTime;
        this.harvestAmount = harvestAmount;
    }
}
