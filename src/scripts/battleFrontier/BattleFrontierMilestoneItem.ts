class BattleFrontierMilestoneItem extends BattleFrontierMilestone {
    itemName: string;
    amount: number;

    constructor (stage: number, itemName: string, amount: number ) {
        const image = `assets/images/items/${itemName.replace(/[^\w.-\\(\\)]/g, '_')}.png`;
        super(stage, () => {}, image);

        this.itemName = itemName;
        this.amount = amount;
    }

    gain () {
        if (ItemList[this.itemName]) {
            ItemList[this.itemName].gain(this.amount);
        }
    }

    get description() {
        return `${this.amount} x ${ItemList[this.itemName].displayName}`;
    }
}
