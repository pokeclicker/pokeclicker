class VitaminController {
    public static counter = 0;
    public static vitaminmultipliers = ['×1', '×5', 'x10'];
    public static vitaminIndex = ko.observable(0);

    public static vitaminIncrease() {
        this.vitaminIndex((this.vitaminIndex() + 1) % this.vitaminmultipliers.length);
    }

    public static vitaminDecrease() {
        this.vitaminIndex((this.vitaminIndex() + this.vitaminmultipliers.length - 1) % this.vitaminmultipliers.length);
    }
}
