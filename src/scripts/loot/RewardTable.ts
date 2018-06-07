class RewardTable {

    public name: string;
    public always: Reward[];
    public oneOf: Reward[];
    public anyOf: Reward[];

    constructor(name: string, always: Reward[], oneOf: Reward[], anyOf: Reward[]) {
        this.name = name;
        this.always = always;
        this.oneOf = oneOf;
        this.anyOf = anyOf
    }

    public getLoot(): Loot[] {

        let always = this.calculateAlwaysLoot();
        let oneof = this.calculateOneOfLoot();
        let anyof = this.calculateAnyOfLoot();

        console.log("Finals:");
        console.log(always);
        console.log(oneof);
        console.log(anyof);


        let total = always.concat(oneof).concat(anyof);

        console.log(total);

        return this.simplifyLoot(total);
    }

    public calculateAlwaysLoot(): Loot[] {
        let alwaysLoot: Loot[] = [];
        for (let reward of this.always) {

            alwaysLoot = alwaysLoot.concat(reward.getLoot());
        }

        return alwaysLoot;
    }

    public calculateOneOfLoot(): Loot[] {
        let sum = RewardTable.calculateWeightSum(this.oneOf);
        let draw = GameConstants.randomIntBetween(0, sum);
        for(let i = 0; i<this.oneOf.length; i++){
            if(draw <= this.oneOf[i].weight){
                return this.oneOf[i].getLoot();
            } else {
                draw -= this.oneOf[i].weight;
            }
        }
        console.log("This should never happen");
        return [];
    }

    public static calculateWeightSum(rewards: Reward[]) {
        let sum = 0;
        for (let key of rewards) {
            sum += key.weight;
        }
        return sum;
    }

    public calculateAnyOfLoot(): Loot[] {
        let anyOfLoot: Loot[] = [];
        for (let reward of this.anyOf) {
            if (GameConstants.randomIntBetween(0, 100) <= reward.weight) {
                anyOfLoot = anyOfLoot.concat(reward.getLoot())
            }
        }
        return anyOfLoot;
    }

    public simplifyLoot(loots: Loot[]): Loot[] {
        let ret: Loot[] = [];
        for (let key in loots) {
            let loot = loots[key];
            let index = ret.findIndex(l => l.name === loot.name);
            if (index !== -1) {
                ret[index].amount += loot.amount;
            } else {
                ret.push(loot);
            }
        }
        return ret;
    }

    static parseRewards(rewards): Reward[] {
        let ret = [];

        for (let i = 0; i < rewards.length; i++) {
            let reward = rewards[i];

            let minAmount = reward.hasOwnProperty("minAmount") ? reward.minAmount : 1;
            let maxAmount = reward.hasOwnProperty("maxAmount") ? reward.maxAmount : 1;

            if (reward.hasOwnProperty("table")) {
                ret.push(new TableReward(reward.name, reward.weight || 1, minAmount, maxAmount));
            } else {
                ret.push(new PercentReward(reward.name, reward.weight || 1, minAmount, maxAmount))
            }
        }
        return ret;
    }
}


