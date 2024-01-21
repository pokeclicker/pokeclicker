import SeededRand from './SeededRand';

export default class SeededDateRand extends SeededRand {
    public static next(): number {
        return this.state / this.MAX_UINT_32;
    }

    public static seedWithDate(d: Date): void {
        super.seedWithDate(d);
        super.next();
    }
}
