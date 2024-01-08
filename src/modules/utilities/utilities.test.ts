// Override system date
vi.useFakeTimers().setSystemTime(new Date(1706832000000));
// Override Math.random() to always return the same value
vi.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

import SeededRand from './SeededRand';
import { AchievementType } from '../GameConstants';
import Rand from './Rand';

describe('Test SeededRand & Rand', () => {
    it('Test rand', () => {
        expect(Rand.intBetween(0, 100)).toBe(12);
    });

    it('Test seeding', () => {
        SeededRand.seedWithDateHour(new Date(), 3);
        expect(SeededRand.state).toBe(201248);
        SeededRand.seedWithDate(new Date());
        expect(SeededRand.state).toBe(201248);
        SeededRand.seed(1234567);
        expect(SeededRand.state).toBe(1234567);
    });

    it('Test int between', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.intBetween(0, 100)).toBe(71);
    });

    it('Test floored value', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.floor(100)).toBe(71);
    });

    it('Test float value', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.float(100)).toBe(71.05994095817672);
    });

    it('Test boolean', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.boolean()).toBe(true);
    });

    it('Test chance', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.chance(50)).toBe(false);
        expect(SeededRand.chance(0.5)).toBe(true);
    });

    it('Test array', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.fromArray([0, 1, 2, 3, 4, 5, 6])).toBe(4);
    });

    it('Test weighted array', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.fromWeightedArray([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6])).toBe(5);
    });

    it('Test enum', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.fromEnum(AchievementType)).toBe(15);
    });

    it('Test random string', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.string(10)).toBe('pcvqpeza3a');
    });

    it('Test shuffle array', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.shuffleArray([0, 1, 2, 3, 4, 5, 6])).toEqual([1, 0, 3, 5, 6, 2, 4]);
    });
});
