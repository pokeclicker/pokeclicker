abstract class Reward {

    public name:string;
    public weight: number;
    public minAmount: number;
    public maxAmount:number;


    constructor(name: string, weight: number, minAmount: number = 1, maxAmount: number = 1) {
        this.name = name;
        this.weight = weight;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
    }

    public abstract getLoot(): Loot[]
}