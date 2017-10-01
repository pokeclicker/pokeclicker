class Berry {
    public type: GameConstants.BerryType;
    public harvestTime: number;
    public moneyValue: number;
    public farmValue: number;

    constructor(type: GameConstants.BerryType, harvestTime: number, moneyValue: number, farmValue: number) {
        this.type = type;
        this.harvestTime = harvestTime;
        this.moneyValue = moneyValue;
        this.farmValue = farmValue;
    }
}

const BerryList: { [type: number]: Berry } = {};
//TODO balancing
BerryList["Cheri"] = new Berry(GameConstants.BerryType.Cheri, 30, 100, 6);
BerryList["Chesto"] = new Berry(GameConstants.BerryType.Chesto, 45, 150, 8);
BerryList["Pecha"] = new Berry(GameConstants.BerryType.Pecha, 60, 180, 10);
BerryList["Rawst"] = new Berry(GameConstants.BerryType.Rawst, 90, 240, 14);
BerryList["Aspear"] = new Berry(GameConstants.BerryType.Aspear, 120, 290, 17);
BerryList["Leppa"] = new Berry(GameConstants.BerryType.Leppa, 240, 460, 28);
BerryList["Oran"] = new Berry(GameConstants.BerryType.Oran, 300, 530, 32);
BerryList["Sitrus"] = new Berry(GameConstants.BerryType.Sitrus, 600, 800, 52);