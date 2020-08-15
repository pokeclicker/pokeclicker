class BattleFrontierMilestoneItem extends BattleFrontierMilestone {
    itemName: string;
    amount: number;

    constructor (stage: number, itemName: string, amount: number ) {
        const description = `${amount} × ${GameConstants.humanifyString(itemName)}`;
        const image = `assets/images/items/${itemName.replace(/\W/g, '_')}.png`;
        super(stage, description, () => {}, image);

        this.itemName = itemName;
        this.amount = amount;
    }

    gain () {
        if (ItemList[this.itemName]) {
            ItemList[this.itemName].gain(this.amount);
        }
    }
}
