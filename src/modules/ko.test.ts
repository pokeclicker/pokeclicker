import './koExtenders';

describe('Test numeric extender', () => {
    it('should round to integers', () => {
        const intObs = ko.observable(0).extend({ numeric: 0 });
        intObs(2);
        expect(intObs()).toBe(2);
        intObs(1.3);
        expect(intObs()).toBe(1);
        intObs(1.5);
        expect(intObs()).toBe(2);
        intObs(-1.5);
        expect(intObs()).toBe(-1);
        intObs(12345);
        expect(intObs()).toBe(12345);
        intObs(12345.678);
        expect(intObs()).toBe(12346);
        intObs((Number.MAX_SAFE_INTEGER - 1) / 4);
        expect(intObs()).toBe(2251799813685248);
        intObs(-(Number.MAX_SAFE_INTEGER - 1) / 4);
        expect(intObs()).toBe(-2251799813685247);
    });

    it('should round to decimals', () => {
        const hundredthsObs = ko.observable(0).extend({ numeric: 2 });
        hundredthsObs(1);
        expect(hundredthsObs()).toBe(1);
        hundredthsObs(1.3);
        expect(hundredthsObs()).toBe(1.3);
        hundredthsObs(1.316);
        expect(hundredthsObs()).toBe(1.32);
        hundredthsObs(4.111);
        expect(hundredthsObs()).toBe(4.11);
        hundredthsObs(3.115);
        expect(hundredthsObs()).toBe(3.12);
        hundredthsObs(12345);
        expect(hundredthsObs()).toBe(12345);
        hundredthsObs(12345.678);
        expect(hundredthsObs()).toBe(12345.68);
    });

    it('should round to powers of ten', () => {
        const hundredsObs = ko.observable(0).extend({ numeric: -2 });
        hundredsObs(100);
        expect(hundredsObs()).toBe(100);
        hundredsObs(1);
        expect(hundredsObs()).toBe(0);
        hundredsObs(230);
        expect(hundredsObs()).toBe(200);
        hundredsObs(250.123);
        expect(hundredsObs()).toBe(300);
        hundredsObs(12345);
        expect(hundredsObs()).toBe(12300);
        hundredsObs(12345678);
        expect(hundredsObs()).toBe(12345700);
    });

    it('should stay within max/min SAFE_INTEGERs', () => {
        const intObs = ko.observable(0).extend({ numeric: 0 });
        intObs(Number.MAX_SAFE_INTEGER * 10);
        expect(intObs()).toBe(Number.MAX_SAFE_INTEGER);
        intObs(Number.MIN_SAFE_INTEGER - 10);
        expect(intObs()).toBe(Number.MIN_SAFE_INTEGER);
        const hundredthsObs = ko.observable(0).extend({ numeric: 2 });
        hundredthsObs(Number.MAX_SAFE_INTEGER + 0.8);
        expect(hundredthsObs()).toBe(Number.MAX_SAFE_INTEGER);
        const thousandsObs = ko.observable(0).extend({ numeric: -3 });
        thousandsObs(Number.MAX_SAFE_INTEGER - 10);
        expect(thousandsObs()).toBe(Math.floor(Number.MAX_SAFE_INTEGER / 1000) * 1000);
    });

    it('should round initial input', () => {
        expect(ko.observable('a').extend({ numeric: 0 })()).toBe(0);
        expect(ko.observable(1).extend({ numeric: 0 })()).toBe(1);
        expect(ko.observable('2.3').extend({ numeric: 0 })()).toBe(2);
        expect(ko.observable(10.1).extend({ numeric: 0 })()).toBe(10);
        expect(ko.observable(10.9).extend({ numeric: 0 })()).toBe(11);
        expect(ko.observable(10.13).extend({ numeric: 1 })()).toBe(10.1);
        expect(ko.observable(11).extend({ numeric: -1 })()).toBe(10);
        expect(ko.observable(Number.MAX_VALUE).extend({ numeric: 0 })()).toBe(Number.MAX_SAFE_INTEGER);
        expect(ko.observable(-Number.MAX_VALUE).extend({ numeric: 0 })()).toBe(Number.MIN_SAFE_INTEGER);
    });
});