import BerryFlavor from '../interfaces/BerryFlavor';
import { ItemNameType } from '../items/ItemNameType';
import Requirement from '../requirements/Requirement';

export default class BlendingRecipe {
    public flavorPrice: BerryFlavor[];

    constructor(
        public item: ItemNameType,
        flavors: number[],
        public requirement?: Requirement,
        public sprite: boolean = false,
    ) {
        this.flavorPrice = [];
        for (let i = 0; i < 5; i++) {
            this.flavorPrice.push({ type: i, value: flavors[i] });
        }
    }

    isUnlocked(): boolean {
        return this.requirement?.isCompleted() ?? true;
    }
}
