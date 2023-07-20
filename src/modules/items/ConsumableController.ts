import { ConsumableType } from '../GameConstants';

export default class ConsumableController {
    public static currentlySelected = ko.observable(ConsumableType.Rare_Candy).extend({ numeric: 0 });
    public static currentlySelectedName = ko.computed(() => ConsumableType[this.currentlySelected()]);
    public static multiplier = ['×1', '×5', '×10', 'Max'];
    public static multiplierIndex = ko.observable(0);

    public static incrementMultiplier() {
        this.multiplierIndex((this.multiplierIndex() + 1) % this.multiplier.length);
    }

    public static decrementMultiplier() {
        this.multiplierIndex((this.multiplierIndex() + this.multiplier.length - 1) % this.multiplier.length);
    }

    public static getMultiplier() {
        return Number(this.multiplier[this.multiplierIndex()].replace(/\D/g, '')) || Infinity;
    }

    public static getImage(consumableType) {
        const consumableName = ConsumableType[consumableType ?? this.currentlySelected()];
        return `assets/images/items/consumable/${consumableName}.png`;
    }
}
