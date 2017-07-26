class Berry {
    public name: string;
    public harvestTime: number;
    public moneyValue: number;
    public farmValue: number;


    constructor(name: string, harvestTime: number, moneyValue: number, farmValue: number) {
        this.name = name;
        this.harvestTime = harvestTime;
        this.moneyValue = moneyValue;
        this.farmValue = farmValue;
    }
}