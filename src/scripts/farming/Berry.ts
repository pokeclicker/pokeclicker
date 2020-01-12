///<reference path="./BerryType.ts"/>
class Berry {
    public type: BerryType;
    public harvestTime: number;
    public moneyValue: number;
    public farmValue: number;

    constructor(type: BerryType, harvestTime: number, moneyValue: number, farmValue: number) {
        this.type = type;
        this.harvestTime = harvestTime;
        this.moneyValue = moneyValue;
        this.farmValue = farmValue;
    }
}
