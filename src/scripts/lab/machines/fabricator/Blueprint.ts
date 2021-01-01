class Blueprint {

    constructor(
        public type: BlueprintType,
        public time: number,
        public cost: { item: BagItem, amount: number}[],
        public research?: Lab.Research
    ) { }

}
