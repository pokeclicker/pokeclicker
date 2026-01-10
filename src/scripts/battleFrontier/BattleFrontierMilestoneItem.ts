class BattleFrontierMilestoneItem extends BattleFrontierMilestone {
    itemName: string;
    amount: number;

    constructor (stage: number, itemName: ItemNameType, amount: number, requirement?: Requirement, repeatStage?: number) {
        super(stage, () => {
            if (ItemList[itemName]) {
                ItemList[itemName].gain(amount);
            }
        }, requirement, undefined, undefined, repeatStage);
        this.requirement = requirement;
        this.itemName = itemName;
        this.amount = amount;
    }

    get image() {
        return ItemList[this.itemName].image;
    }

    get description() {
        return `${this.amount.toLocaleString('en-US')} × ${ItemList[this.itemName].displayName}`;
    }
}
