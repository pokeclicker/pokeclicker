enum GeneratorFuelType {
    'electric_shard' = 0,
    'zap_plate',
    'wacan_berry',
    'thunder_stone',
    'electirizer',
}

class GeneratorFuel {

    public itemAmount: KnockoutComputed<number>;

    constructor(public id: GeneratorFuelType,
        public itemId: string | number,
        public type: ItemType,
        public fuelAmount: number,
        public research?: Lab.Research) {

    }

}
