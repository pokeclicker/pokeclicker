class BattleFrontierMilestoneItem extends BattleFrontierMilestone {
    itemName: string;
    amount: number;

    constructor (stage: number, itemName: string, amount: number ) {
        super(stage, () => {
            if (ItemList[this.itemName]) {
                ItemList[this.itemName].gain(this.amount);
            }
        });

        this.itemName = itemName;
        this.amount = amount;
    }

    get image() {
        return ItemList[this.itemName].image;
    }

    get description() {
        return `${this.amount} x ${ItemList[this.itemName].displayName}`;
    }
}
