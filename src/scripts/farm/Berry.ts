///<reference path="../farming/BerryType.ts"/>
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

const BerryList: { [type: number]: Berry } = {};

BerryList['Cheri'] = new Berry(BerryType.Cheri, 30, 100, 6);
BerryList['Chesto'] = new Berry(BerryType.Chesto, 45, 150, 8);
BerryList['Pecha'] = new Berry(BerryType.Pecha, 60, 180, 10);
BerryList['Rawst'] = new Berry(BerryType.Rawst, 90, 240, 14);
BerryList['Aspear'] = new Berry(BerryType.Aspear, 120, 290, 18);
BerryList['Leppa'] = new Berry(BerryType.Leppa, 240, 460, 30);
BerryList['Oran'] = new Berry(BerryType.Oran, 300, 530, 35);
BerryList['Sitrus'] = new Berry(BerryType.Sitrus, 600, 1000, 60);
