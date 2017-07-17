class SeededRand {
    private static state: number = 12345;
    private static readonly MOD: number = 233280;
    private static readonly OFFSET: number = 49297;
    private static readonly MULTIPLIER: number = 9301;

    public static next(): number {
        this.state = (this.state*this.MULTIPLIER + this.OFFSET) % this.MOD;
        return this.state / this.MOD;
    }

    public static seedWithDate(d: Date) {
        let dateSeed = Number((d.getFullYear() - 1900)*d.getDate() + 1000*d.getMonth() + 100000*d.getDate());
        this.state = dateSeed;
    }
}