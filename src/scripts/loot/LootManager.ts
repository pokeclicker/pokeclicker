class LootManager {


    static rewardTableList: { [name: string]: any } = {};

    public static roll(tableName: string, amount: number = 1): Loot[] {
        let table: RewardTable = this.rewardTableList[tableName];
        let loot = table.getLoot();
        return loot;

    }

    public static initialize() {
        // Get all tables from somwhere
        let data = this.getAllTableData();

        for (let table of data) {
            let name = table.name;
            let always: Reward[] = RewardTable.parseRewards(table["always"]);
            let oneOf: Reward[] = RewardTable.parseRewards(table["oneof"]);
            let anyOf: Reward[] = RewardTable.parseRewards(table["anyof"]);

            this.rewardTableList[name] = new RewardTable(name, always, oneOf, anyOf);
        }
    }


    public static getAllTableData() {
        // Compile the data from somewhere.
        return [
            {
                "name": "small_1",
                "always": [
                    {"name": "a"}
                ],
                "oneof": [
                    {"name": "b", "weight": 10},
                    {"name": "c", "weight": 3}
                ],
                "anyof": [
                    {"name": "a", "weight": 100}
                ]
            }
        ]
    }


}

