class RewardTable {

    public name: string;
    public always: Reward[];
    public oneOf: Reward[];
    public anyOf: Reward[];

    constructor(name: string, always: Reward[], oneOf: Reward[], anyOf: Reward[]) {
        this.always = always;
        this.oneOf = oneOf;
        this.anyOf = anyOf
    }

    public getLoot(): Loot[] {
        let totalLoot = this.calculateAlwaysLoot().concat(this.calculateOneOfLoot().concat(this.calculateAnyOfLoot()));
        return this.simplifyLoot(totalLoot);
    }

    public calculateAlwaysLoot(): Loot[] {
        let alwaysLoot: Loot[] = [];

        for (let key in this.always) {
            alwaysLoot = alwaysLoot.concat(this.always[key].getLoot());
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
        return [];
    }

    public static calculateWeightSum(rewards: Reward[]) {
        let sum = 0;
        for (let key in rewards) {
            sum += rewards[key].weight;
        }
        return sum;
    }

    public calculateAnyOfLoot(): Loot[] {
        let anyOfLoot: Loot[] = [];
        for (let key in this.anyOf) {
            if (GameConstants.randomIntBetween(0, 100) <= this.anyOf[key].weight) {
                anyOfLoot = anyOfLoot.concat(this.anyOf[key].getLoot())
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

    static initialize() {
        for (let key in GameConstants.rewardTableData) {
            let table = GameConstants.rewardTableData[key];
            let always: Reward[] = RewardTable.parseRewards(table["always"]);
            let oneOf: Reward[] = RewardTable.parseRewards(table["oneof"]);
            let anyOf: Reward[] = RewardTable.parseRewards(table["anyof"]);
            rewardTableList[key] = new RewardTable(key, always, oneOf, anyOf);
        }
    }

    static parseRewards(rewards): Reward[] {
        let ret = [];

        for (let i = 0; i < rewards.length; i++) {
            let reward = rewards[i];

            let minAmount = reward.hasOwnProperty("minAmount") ? reward.minAmount : 1;
            let maxAmount = reward.hasOwnProperty("maxAmount") ? reward.maxAmount : 1;

            if (reward.hasOwnProperty("table")) {
                ret.push(new TableReward(reward.name, reward.weight, minAmount, maxAmount));
            } else {
                ret.push(new PercentReward(reward.name, reward.weight, minAmount, maxAmount))
            }
        }
        return ret;
    }
}

const rewardTableList: {[name: string]: any} = {};



