class BattleFrontierMilestoneItem extends BattleFrontierMilestone {
    itemName: string;
    amount: number;

    constructor (stage: number, itemName: string, amount: number, requirement?: Requirement ) {
        super(stage, () => {
            if (ItemList[itemName]) {
                ItemList[itemName].gain(amount);
            }
        });
        this.requirement = requirement;
        this.itemName = itemName;
        this.amount = amount;
    }

    get image() {
        return ItemList[this.itemName].image;
    }

    get description() {
        return `${this.amount.toLocaleString('en-US')} x ${ItemList[this.itemName].displayName}`;
    }
}
