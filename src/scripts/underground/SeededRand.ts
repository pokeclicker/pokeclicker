class SeededRand {
    private static state = 12345;
    private static readonly MOD: number = 233280;
    private static readonly OFFSET: number = 49297;
    private static readonly MULTIPLIER: number = 9301;

    public static next(): number {
        this.state = (this.state * this.MULTIPLIER + this.OFFSET) % this.MOD;
        return this.state / this.MOD;
    }

    public static seedWithDate(d: Date) {
        this.state = Number((d.getFullYear() - 1900) * d.getDate() + 1000 * d.getMonth() + 100000 * d.getDate());
    }

    public static seed(state: number) {
        this.state = Math.abs(state);
    }

    public static intBetween(min: number, max: number): number {
        return Math.floor( (max - min + 1) * SeededRand.next() + min );
    }

    public static boolean(): boolean {
        return !!this.intBetween(0, 1);
    }

    public static fromArray<T>(arr: Array<T>): T {
        return arr[SeededRand.intBetween(0, arr.length - 1)];
    }

    public static fromEnum(arr): number {
        arr = Object.keys(arr).map(Number).filter(item => item >= 0);
        return this.fromArray(arr);
    }
}
