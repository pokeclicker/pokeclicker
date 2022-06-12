import SeededRand from './SeededRand';

export default class SeededDateRand extends SeededRand {
    public static next(): number {
        return this.state;
    }

    public static seedWithDate(d: Date): void {
        this.state = Number((d.getFullYear() - 1900) * d.getDate() + 1000 * d.getMonth() + 100000 * d.getDate());
        this.state = (this.state * this.MULTIPLIER + this.OFFSET) % this.MOD;
        this.state /= this.MOD;
    }
}
