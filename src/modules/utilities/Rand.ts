export default class Rand {
    public static next(): number {
        return Math.random();
    }

    // get a number between min and max (both inclusive)
    public static intBetween(min: number, max: number): number {
        return Math.floor((max - min + 1) * Rand.next() + min);
    }

    public static boolean(): boolean {
        return !!this.intBetween(0, 1);
    }

    public static fromArray<T>(arr: Array<T>): T {
        return arr[Rand.intBetween(0, arr.length - 1)];
    }

    public static fromWeightedArray<T>(arr: Array<T>, weights: Array<number>): T {
        const max = weights.reduce((acc, weight) => acc + weight, 0);
        let rand = this.intBetween(1, max);
        return arr.find((_e, i) => (rand -= weights[i]) <= 0) || arr[0];
    }

    // Filters out any enum values that are less than 0 (for None)
    public static fromEnum(_enum): number {
        const arr = Object.keys(_enum).map(Number).filter((item) => item >= 0);
        return this.fromArray(arr);
    }
}
