class FlavorAmount {
    constructor(
        public amount: number,
        public flavor: FlavorType
    ) {
        this.amount = Math.round(amount);
        this.flavor = flavor;
    }

    public toString() {
        return `Flavor Amount(${this.amount}, ${FlavorType[this.flavor]})`;
    }
}
