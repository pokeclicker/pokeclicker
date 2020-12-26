class VitaminController {
    public static vitaminMultipliers = ['×1', '×5', 'x10', 'Max'];
    public static vitaminIndex = ko.observable(0);

    public static vitaminIncrease() {
        this.vitaminIndex((this.vitaminIndex() + 1) % this.vitaminMultipliers.length);
    }

    public static vitaminDecrease() {
        this.vitaminIndex((this.vitaminIndex() + this.vitaminMultipliers.length - 1) % this.vitaminMultipliers.length);
    }
}
