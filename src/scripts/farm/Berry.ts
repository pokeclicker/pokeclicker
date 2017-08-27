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
BerryList["Cheri"] = new Berry(GameConstants.BerryType.Cheri, 3, 3, 3);
BerryList["Chesto"] = new Berry(GameConstants.BerryType.Chesto, 3, 3, 3);
BerryList["Pecha"] = new Berry(GameConstants.BerryType.Pecha, 3, 3, 3);
BerryList["Rawst"] = new Berry(GameConstants.BerryType.Rawst, 3, 3, 3);
BerryList["Aspear"] = new Berry(GameConstants.BerryType.Aspear, 3, 3, 3);
BerryList["Leppa"] = new Berry(GameConstants.BerryType.Leppa, 3, 3, 3);
BerryList["Oran"] = new Berry(GameConstants.BerryType.Oran, 3, 3, 3);
BerryList["Sitrus"] = new Berry(GameConstants.BerryType.Sitrus, 3, 3, 3);