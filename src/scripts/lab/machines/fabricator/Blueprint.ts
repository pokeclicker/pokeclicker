class Blueprint {

    constructor(
        public name: string,
        public type: BlueprintType,
        public time: number,
        public cost: { item: BagItem, amount: number}[],
        public fabrication: BagItem,
        public research?: Lab.Research
    ) { }

    get canFabricate(): boolean {
        return this.cost.every(cost => {
            return BagHandler.amount(cost.item)() >= cost.amount;
        });
    }

    get costTooltip(): string {
        return this.cost.map(itemCost => {
            return `${BagHandler.displayName(itemCost.item)}: ${itemCost.amount}`;
        }).join('<br>');
    }

    fabricate(): boolean {
        if (!this.canFabricate) {
            return false;
        }
        BagHandler.gainItem(this.fabrication, 1);
        return true;
    }

}
