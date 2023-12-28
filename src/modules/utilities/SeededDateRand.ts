import SeededRand from './SeededRand';

export default class SeededDateRand extends SeededRand {
    public static next(): number {
        return this.state / this.MOD;
    }

    public static seedWithDate(d: Date): void {
        super.seedWithDate(d);
        super.next();
    }
}
