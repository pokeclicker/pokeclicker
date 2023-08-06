import { MINUTE, HOUR } from '../GameConstants';

export default class SeededRand {
    public static state = 12345;
    public static readonly MOD: number = 233280;
    public static readonly OFFSET: number = 49297;
    public static readonly MULTIPLIER: number = 9301;

    public static next(): number {
        this.state = (this.state * this.MULTIPLIER + this.OFFSET) % this.MOD;
        return this.state / this.MOD;
    }

    public static seedWithDate(d: Date): void {
        this.state = Number((d.getFullYear() - 1900) * d.getDate() + 1000 * d.getMonth() + 100000 * d.getDate());
    }

    // hours specifies how many hours the seed should remain the same
    public static seedWithDateHour(d: Date, hours = 1): void {
        // Adjust date for timezone offset and hours rounded
        const time = d.getTime();
        const offset = -(d.getTimezoneOffset() * (MINUTE));
        const offsetTime = time + offset;
        const newDate = new Date(time - (offsetTime % (HOUR * hours)));
        const newHour = newDate.getHours();
        // Set state based on adjusted date
        this.seedWithDate(newDate);
        // Update state based on current hour
        this.state += 1000000 * newHour;
    }

    public static seed(state: number): void {
        this.state = Math.abs(state);
    }

    // get a number between min and max (both inclusive)
    public static intBetween(min: number, max: number): number {
        return Math.floor((max - min + 1) * this.next() + min);
    }

    // get a floored number from 0 to max (excluding max)
    public static floor(max: number): number {
        return Math.floor(this.next() * max);
    }

    // get a number from 0 to max (excluding max)
    public static float(max: number): number {
        return this.next() * max;
    }

    // 50/50 chance of true or false
    public static boolean(): boolean {
        return !!this.intBetween(0, 1);
    }

    // If number is more than one, the chance is 1/chance otherwise the chance is a percentage
    public static chance(chance: number): boolean {
        return this.next() <= (chance >= 1 ? 1 / chance : chance);
    }

    // Pick an element from an array
    public static fromArray<T>(arr: Array<T>): T {
        return arr[this.intBetween(0, arr.length - 1)];
    }

    // Pick an element from an array with specified weights
    public static fromWeightedArray<T>(arr: Array<T>, weights: Array<number>): T {
        const max = weights.reduce((acc, weight) => acc + weight, 0);
        let rand = this.next() * max;
        return arr.find((_e, i) => (rand -= weights[i]) <= 0) || arr[0];
    }

    // Filters out any enum values that are less than 0 (for None)
    public static fromEnum(_enum): number {
        const arr = Object.keys(_enum).map(Number).filter((item) => item >= 0);
        return this.fromArray(arr);
    }

    // Get a string of letters and numbers (lowercase)
    public static string(length: number): string {
        return [...Array(length)].map(() => this.next().toString(36)[2]).join('');
    }

    // Shuffle an array
    public static shuffleArray<T>(arr: Array<T>): Array<T> {
        const output = [...arr];
        for (let i = output.length; i; i--) {
            const j = this.floor(i);
            const x = output[i - 1];
            output[i - 1] = output[j];
            output[j] = x;
        }
        return output;
    }

    // Shuffle an array based on the weights of the items
    public static shuffleWeightedArray<T>(arr: Array<T>, weights: Array<number>): Array<T> {
        const output = [];
        for (let i = 0; arr.length; i++) {
            const item = this.fromWeightedArray(arr, weights);
            const ind = arr.findIndex(a => a == item);
            arr.splice(ind, 1);
            weights.splice(ind, 1);
            output.push(item);
        }
        return output;
    }
}
