class VitaminController {
    public static multiplier = ['×1', '×5', 'x10', 'Max'];
    public static multiplierIndex = ko.observable(0);

    public static incrementMultiplier() {
        this.multiplierIndex((this.multiplierIndex() + 1) % this.multiplier.length);
    }

    public static decrementMultiplier() {
        this.multiplierIndex((this.multiplierIndex() + this.multiplier.length - 1) % this.multiplier.length);
    }

    public static getMultiplier() {
        return Number(VitaminController.multiplier[VitaminController.multiplierIndex()].replace(/\D/g, '')) || Infinity;
    }
}
