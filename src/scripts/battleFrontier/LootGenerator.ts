function* randStream(count: number) {
    while (true) {
        yield Math.floor(Math.random() * count);
    }
}
interface LootObject {
    name: string;
    divAmount: number;
}
class LootGenerator {
    constructor() {
    }
    public static lootTable: LootObject[] = [
        {name: 'Ultraball', divAmount: 0.03},
        {name: 'Masterball', divAmount: 300},
        {name: 'xAttack', divAmount: 0.06},
        {name: 'Lucky_incense', divAmount: 0.1},
    ];
    public static rand = randStream(LootGenerator.lootTable.length);
    public static getLoot(stage: number) {
        const item = this.lootTable[this.rand.next().value as number];
        return new BattleFrontierMilestoneItem(stage, item.name, Math.floor(stage / item.divAmount));
    }
}
