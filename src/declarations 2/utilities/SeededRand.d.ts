declare class SeededRand {
    private static state;
    private static readonly MOD;
    private static readonly OFFSET;
    private static readonly MULTIPLIER;
    static next(): number;
    static seedWithDate(d: Date): void;
    static seedWithDateHour(d: Date, hours?: number): void;
    static seed(state: number): void;
    static intBetween(min: number, max: number): number;
    static floor(max: number): number;
    static float(max: number): number;
    static boolean(): boolean;
    static chance(chance: number): boolean;
    static fromArray<T>(arr: Array<T>): T;
    static fromWeightedArray<T>(arr: Array<T>, weights: Array<number>): T;
    static fromEnum(_enum: any): number;
    static string(length: number): string;
}
