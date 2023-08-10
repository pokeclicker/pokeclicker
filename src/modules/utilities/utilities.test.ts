// Override system date
vi.useFakeTimers().setSystemTime(new Date(1675298702433));
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
        expect(SeededRand.state).toBe(201246);
        SeededRand.seedWithDate(new Date());
        expect(SeededRand.state).toBe(201246);
        SeededRand.seed(1234567);
        expect(SeededRand.state).toBe(1234567);
    });

    it('Test int between', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.intBetween(0, 100)).toBe(100);
    });

    it('Test floored value', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.floor(100)).toBe(99);
    });

    it('Test float value', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.float(100)).toBe(99.83839163237312);
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
        expect(SeededRand.fromArray([0, 1, 2, 3, 4, 5, 6])).toBe(6);
    });

    it('Test weighted array', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.fromWeightedArray([0, 1, 2, 3, 4, 5, 6], [0, 1, 2, 3, 4, 5, 6])).toBe(6);
    });

    it('Test enum', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.fromEnum(AchievementType)).toBe(21);
    });

    it('Test random string', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.string(10)).toBe('z6kmo37wt5');
    });

    it('Test shuffle array', () => {
        SeededRand.seedWithDateHour(new Date());
        expect(SeededRand.shuffleArray([0, 1, 2, 3, 4, 5, 6])).toEqual([5, 0, 3, 4, 2, 1, 6]);
    });
});
