import '../koExtenders';
import { PokeBlockColor } from '../GameConstants';

export default class PokeBlockController {
    public static currentlySelected = ko.observable(0).extend({ numeric: 0 });
    public static currentlySelectedName = ko.computed(() => `PokeBlock_${PokeBlockColor[this.currentlySelected()]}`);
    public static multiplier = ['×1', '×5', '×10', '×50', '×80', '×150', '×220', 'Max'];
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

    public static getImage(blockColor) {
        const color = PokeBlockColor[blockColor ?? this.currentlySelected()];
        return `assets/images/items/pokeblock/PokeBlock_${color}.png`;
    }
}
