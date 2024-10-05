import BerryFlavor from '../interfaces/BerryFlavor';
import { ItemNameType } from '../items/ItemNameType';
import Requirement from '../requirements/Requirement';

export default class BlendingRecipe {
    public flavorPrice: BerryFlavor[];
    public isUnlocked: KnockoutObservable<boolean>;

    constructor(
        public item: ItemNameType,
        flavors: number[],
        public requirement?: Requirement,
    ) {
        this.flavorPrice = [];
        for (let i = 0; i < 5; i++) {
            this.flavorPrice.push({ type: i, value: flavors[i] });
        }
        this.isUnlocked = ko.observable(requirement?.isCompleted() ?? true);
    }
}
