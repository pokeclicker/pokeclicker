import {
    Observable as KnockoutObservable,
    Computed as KnockoutComputed,
} from 'knockout';

// For helper functions that may be needed across all files
// TODO: Convert this to not be a class after everything is TS modules
export default class GameHelper {
    public static counter = 0;
    public static currentTime: KnockoutObservable<Date> = ko.observable(new Date());
    public static today: KnockoutObservable<Date> = ko.observable(GameHelper.getToday());
    public static tomorrow: KnockoutComputed<Date> = ko.pureComputed<Date>(() => {
        const tomorrow = new Date(GameHelper.today());
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });

    public static msUntilTomorrow: KnockoutComputed<number>
    = ko.pureComputed<number>(() => Number(GameHelper.tomorrow()) - Number(GameHelper.currentTime()));

    public static formattedTimeUntilTomorrow: KnockoutComputed<string>
    = ko.pureComputed<string>(() => {
        let milliseconds = GameHelper.msUntilTomorrow();
        const hours = Math.floor(milliseconds / GameHelper.MS_IN_HOUR);
        milliseconds -= hours * GameHelper.MS_IN_HOUR;
        const minutes = Math.floor(milliseconds / GameHelper.MS_IN_MIN);
        return `${hours}:${GameHelper.twoDigitNumber(minutes)}`;
    });

    public static formattedLetterTimeUntilTomorrow: KnockoutComputed<string>
    = ko.pureComputed<string>(() => {
        let milliseconds = GameHelper.msUntilTomorrow();
        const hours = Math.floor(milliseconds / GameHelper.MS_IN_HOUR);
        milliseconds -= hours * GameHelper.MS_IN_HOUR;
        const minutes = Math.floor(milliseconds / GameHelper.MS_IN_MIN);
        return `${hours}h${GameHelper.twoDigitNumber(minutes)}m`;
    });

    private static readonly MS_IN_MIN = 1000 * 60;
    private static readonly MS_IN_HOUR = GameHelper.MS_IN_MIN * 60;

    public static incrementObservable(obs: KnockoutObservable<number>, amt = 1): void {
        if (typeof obs !== 'function') { return; }
        const trueAmount = (Number.isNaN(amt) || amt === 0) ? 1 : amt;
        obs(obs() + trueAmount);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static enumLength(enumerable: any): number {
        return Object.keys(enumerable).length / 2;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static enumStrings(enumerable: any): string[] {
        return Object.keys(enumerable).filter((k) => Number.isNaN(Number(k)));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static enumNumbers(enumerable: any): number[] {
        return Object.keys(enumerable).map(Number).filter((k) => !Number.isNaN(k));
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static enumSelectOption(enumerable: any): { name: string; value: any; }[] {
        return Object.keys(enumerable).filter((k) => Number.isNaN(Number(k))).map((key) => ({ name: key, value: enumerable[key] }));
    }

    // default value as a function so objects/arrays as defaults creates a new one for each key
    public static objectFromEnumStrings<T extends {}, V>(enumerable: T, defaultValue: () => V): Record<keyof T, V> {
        return (this.enumStrings(enumerable).reduce((keys, type) => ({ ...keys, [type]: defaultValue() }), {}) as Record<keyof T, V>);
    }

    public static tick(): void {
        this.counter = 0;
        GameHelper.currentTime(new Date());
    }

    public static updateDay(): void {
        const now = new Date();
        if (now.getDate() !== GameHelper.today().getDate()) {
            GameHelper.today(GameHelper.getToday());
        }
    }

    public static formatAmount(n: number): string {
        if (n >= 1e9) { return `${Math.floor(n / 1e9)}b`; }
        if (n >= 1e6) { return `${Math.floor(n / 1e6)}m`; }
        if (n >= 1e3) { return `${Math.floor(n / 1e3)}k`; }
        return `${n}`;
    }

    public static getIndexFromDistribution(a: number[]): number {
        const rand = Math.random();
        for (let i = 0; i < a.length; i += 1) {
            if (rand <= a[i]) {
                return i;
            }
        }
        // If none matched for whatever reason (should never happen) return the
        // last index
        return a.length - 1;
    }

    public static createArray(start: number, max: number, step: number): Array<number> {
        const array = [];
        for (let i = start; i <= max; i += step) {
            array.push(i);
        }
        return array;
    }

    // Filter out any falsy values from the end of an array
    public static filterArrayEnd(arr) {
        let check = false;
        return [...arr].reverse().filter((v) => {
            check = check || !!v;
            return check;
        }).reverse();
    }

    public static anOrA(name: string): string {
        return ['a', 'e', 'i', 'o', 'u'].includes(name[0].toLowerCase()) ? 'an' : 'a';
    }

    public static shallowEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        return keys1.every((key) => object1[key] === object2[key]);
    }

    // Find the largest integer between min and max that does not return true when passed to testTooHigh, using a binary search
    public static binarySearch(testTooHigh: (guess: number) => boolean, min: number, max: number): number {
        if (max - min <= 1) return min;

        const mid = Math.floor((max + min) / 2);
        const [newMin, newMax] = testTooHigh(mid) ? [min, mid] : [mid, max];

        return this.binarySearch(testTooHigh, newMin, newMax);
    }

    public static chunk<T>(size: number, array: Array<T>): Array<Array<T>> {
        let i = 0;
        let residx = 0;
        const res = [];
        while (i < array.length) {
            res[residx] = array.slice(i, i += size);
            residx += 1;
        }
        return res;
    }

    public static saveFileName(nameFormat : string, changes : Record<string, string>, isBackup = false) {
        return `${Object.entries(changes).reduce((filename, [format, value]) => filename.replace(format, value), nameFormat)}${isBackup ? ' Backup' : ''}.txt`;
    }

    public static escapeStringRegex(s: string): string {
        return s.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    public static safelyBuildRegex(pattern: string, allowRaw = true, flags = 'i'): RegExp {
        if (allowRaw && /^\/.+\/$/.test(pattern)) {
            // pattern is a string representation of regex e.g. /pattern/, remove the slashes
            const rawPattern = pattern.slice(1, -1);
            try {
                return new RegExp(rawPattern, flags);
            } catch {
                return new RegExp(GameHelper.escapeStringRegex(rawPattern), flags);
            }
        } else {
            return new RegExp(GameHelper.escapeStringRegex(pattern), flags);
        }
    }

    public static twoDigitNumber(n: number): string {
        // For use in clocks / showing time
        // Turns 4 into 04, does nothing to 23, turns 173 into 73
        return (`0${n}`).slice(-2);
    }

    private static getToday() {
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return today;
    }

    // Check if HTML container with the given ID is overflowing horizontally
    public static isOverflownX(htmlID) {
        const element = document.querySelector(htmlID);
        return element.scrollWidth > element.clientWidth;
    }

    // Get scroll bar size (in pixels)
    public static getScrollBarSize() {
        var $outer = $('<div>').css({ visibility: 'hidden', width: 100, overflow: 'scroll' }).appendTo('body'),
            widthWithScroll = $('<div>').css({ width: '100%' }).appendTo($outer).outerWidth();
        $outer.remove();
        return 100 - widthWithScroll;
    }

    /**
     * Insecure hash, but should keep some of the nosy people out.
     * @param text
     */
    public static hash(text: string): number {
        let hash = 0;
        let i = 0;
        let chr = 0;
        if (text.length === 0) {
            return hash;
        }

        for (i = 0; i < text.length; i++) {
            chr = text.charCodeAt(i);
            // eslint-disable-next-line no-bitwise
            hash = ((hash << 5) - hash) + chr;
            // eslint-disable-next-line no-bitwise
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    public static isColorLight(color: string): boolean {
        const r = parseInt(color.substring(1, 3), 16), g = parseInt(color.substring(3, 5), 16), b = parseInt(color.substring(5), 16);
        const grey = r * 0.299 + g * 0.587 + b * 0.114; // Range between 0 and 255, based on NTSC formula.
        return grey > 127;
    }

    public static isDevelopmentBuild(): boolean {
        // This was done like this so es/tslint doesn't throw errors
        try {
            return !!JSON.parse('$DEVELOPMENT');
        } catch (e) {
            return false;
        }
    }
}
