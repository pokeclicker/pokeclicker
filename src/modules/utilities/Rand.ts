import SeededRand from './SeededRand';

export default class Rand extends SeededRand {
    // override the seeded value, and make use of a random value
    public static next(): number {
        return Math.random();
    }
}
