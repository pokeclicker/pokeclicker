class BattleFrontierMilestoneItem extends BattleFrontierMilestone {
    itemName: string;
    amount: number;

    constructor (stage: number, itemName: string, amount: number ) {
        super(stage, () => {});

        this.itemName = itemName;
        this.amount = amount;
    }

    gain () {
        if (ItemList[this.itemName]) {
            ItemList[this.itemName].gain(this.amount);
        }
    }

    get imagePath() {
        return ItemList[this.itemName].imagePath;
    }

    get description() {
        return `${this.amount} x ${ItemList[this.itemName].displayName}`;
    }
}
