// Override system date
vi.useFakeTimers().setSystemTime(new Date(1675298702433));
// Override Math.random() to always return the same value
vi.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

import { SpriteCredits, CodeCredits } from './Credits';

describe('Test Credits', () => {
    it('should have the correct properties', () => {
        [...SpriteCredits, ...CodeCredits].forEach((credit) => {
            expect(credit).toHaveProperty('name');
            expect(credit).toHaveProperty('link');
            expect(credit).toHaveProperty('image');
            expect(credit).toHaveProperty('resources');
        });
    });
});

import {
    camelCaseToString,
    cleanHTMLString,
    clipNumber,
    expRandomElement,
    formatDate,
    formatNumber,
    formatSecondsToTime,
    formatTime,
    formatTimeFullLetters,
    formatTimeShortWords,
    getDungeonIndex,
    getDungeonRegion,
    getGymIndex,
    getGymRegion,
    getTemporaryBattlesIndex,
    humanifyString,
    pluralizeString,
    Region,
} from './GameConstants';

describe('Test GameConstants', () => {
    it('clean html strings', () => {
        expect(cleanHTMLString('<div onclick="alert(\'test\')">Text here</div>')).toEqual('&#60;div onclick=&#34;alert&#40;\'test\'&#41;&#34;&#62;Text here&#60;/div&#62;');
    });
    it('humanify variable strings', () => {
        expect(humanifyString('probably_a_variable_name')).toEqual('probably a variable name');
    });
    it('humanify camelcase strings', () => {
        expect(camelCaseToString('probablyAVariableName')).toEqual('Probably A Variable Name');
    });
    it('pluralize strings', () => {
        expect(pluralizeString('test', 1)).toEqual('test');
        expect(pluralizeString('test', 2)).toEqual('tests');
        expect(pluralizeString('crunch', 2)).toEqual('crunches');
        expect(pluralizeString('crunchy', 2)).toEqual('crunchies');
        expect(pluralizeString('glasses', 2)).toEqual('glasses');
    });
    it('format dates', () => {
        expect(formatDate(new Date(1675298702433))).toEqual('2023-02-02 00:45:02');
    });
    it('format time string from seconds', () => {
        expect(formatTime(100000)).toEqual('27:46:40');
        expect(formatTime(0)).toEqual('Ready');
        expect(formatTime(Infinity)).toEqual('∞');
    });
    it('format times from seconds with full letters', () => {
        expect(formatTimeFullLetters(1000000)).toEqual('01w 04d 13h');
        expect(formatTimeFullLetters(10000)).toEqual('02h 46m 40s');
        expect(formatTimeFullLetters(0)).toEqual('-');
    });
    it('format times until ms with short words', () => {
        expect(formatTimeShortWords(100000 * 1e3)).toEqual('< 2 days');
        expect(formatTimeShortWords(10000 * 1e3)).toEqual('< 3 hours');
        expect(formatTimeShortWords(1000 * 1e3)).toEqual('< 17 mins');
        expect(formatTimeShortWords(0)).toEqual('now');
    });
    it('format time names from seconds', () => {
        expect(formatSecondsToTime(1000000)).toEqual('1 week</br>4 days</br>13 hours</br>46 mins</br>40 secs');
    });
    it('format number amount to string', () => {
        expect(formatNumber(9876543210000)).toEqual('9.8T');
        expect(formatNumber(9876543210)).toEqual('9.8B');
        expect(formatNumber(6543210)).toEqual('6.5M');
        expect(formatNumber(3210)).toEqual('3.2K');
        expect(formatNumber(210)).toEqual('210');
    });
    it('return a number with a minimum and maximum', () => {
        expect(clipNumber(123, 0, 100)).toEqual(100);
    });
    it('return a random element form an array, while exponentially increasing the chance', () => {
        // Will always return the same value due to us overriding Math.random()
        expect(expRandomElement([1, 2, 3, 4], 2)).toEqual(1);
    });
    it('return the gyms total index', () => {
        expect(getGymIndex('Aspertia City')).toEqual(52);
        expect(getGymIndex('Not a real gym')).toEqual(-1);
    });
    it('return the region a gym is in', () => {
        expect(getGymRegion('Aspertia City')).toEqual(Region.unova);
        expect(getGymRegion('Not a real gym')).toEqual(-1);
    });
    it('return the dungeons total index', () => {
        expect(getDungeonIndex('Abundant Shrine')).toEqual(115);
        expect(getDungeonIndex('Not a real dungeon')).toEqual(-1);
    });
    it('return the region a dungeon is in', () => {
        expect(getDungeonRegion('Abundant Shrine')).toEqual(Region.unova);
        expect(getDungeonRegion('Not a real dungeon')).toEqual(-1);
    });
    it('return the temp battles total index', () => {
        expect(getTemporaryBattlesIndex('Underground Fighting Ring')).toEqual(163);
        expect(getTemporaryBattlesIndex('Not a real temp battle')).toEqual(-1);
    });
});

import GameHelper from './GameHelper';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import * as ko from 'knockout';
import { AchievementOption } from './GameConstants';

describe('Test GameHelper', () => {
    it('time until tomorrow', () => {
        expect(GameHelper.formattedTimeUntilTomorrow()).toBe('23:14');
        expect(GameHelper.formattedLetterTimeUntilTomorrow()).toBe('23h14m');
    });

    it('increment observables', () => {
        const testObservable = ko.observable(1);
        GameHelper.incrementObservable(testObservable, 2);
        expect(testObservable()).toBe(3);
    });

    it('enum lengths', () => {
        expect(GameHelper.enumLength(AchievementOption)).toBe(3);
    });

    it('enum string values', () => {
        expect(GameHelper.enumStrings(AchievementOption)).toEqual(['less', 'equal', 'more']);
    });

    it('enum number values', () => {
        expect(GameHelper.enumNumbers(AchievementOption)).toEqual([0, 1, 2]);
    });

    it('tick', () => {
        GameHelper.counter = 1;
        GameHelper.tick();
        expect(GameHelper.counter).toEqual(0);
    });

    it('update time, tomorrow', () => {
        GameHelper.tomorrow = GameHelper.currentTime();
        GameHelper.updateTime();
        expect(GameHelper.tomorrow).not.toEqual(GameHelper.currentTime());
    });

    it('format number amount string', () => {
        expect(GameHelper.formatAmount(9876543210000)).toEqual('9876b');
        expect(GameHelper.formatAmount(9876543210)).toEqual('9b');
        expect(GameHelper.formatAmount(6543210)).toEqual('6m');
        expect(GameHelper.formatAmount(3210)).toEqual('3k');
        expect(GameHelper.formatAmount(210)).toEqual('210');
    });

    it('create an array', () => {
        expect(GameHelper.createArray(1, 3, 1)).toEqual([1, 2, 3]);
    });

    it('remove falsy values from end of an array', () => {
        expect(GameHelper.filterArrayEnd([0, 1, 0, 1, 1, 0, 0, 0])).toEqual([0, 1, 0, 1, 1]);
    });

    it('return an or a depending on the word supplied', () => {
        expect(GameHelper.anOrA('Pikachu')).toEqual('a');
        expect(GameHelper.anOrA('Eevee')).toEqual('an');
    });

    it('escape regex values from a string', () => {
        expect(GameHelper.escapeStringRegex('/[Just a test](.*?)/')).toEqual('\\/\\[Just a test\\]\\(\\.\\*\\?\\)\\/');
    });
});

import SaveSelector from './SaveSelector';
describe('SaveSelector', () => {
    describe('encoding', () => {
        it('encodes and decodes chinese characters', () => {
            const input = '妙蛙种子';
            const encoded = SaveSelector.btoa(input);
            expect(encoded).toBe('JUU1JUE2JTk5JUU4JTlCJTk5JUU3JUE3JThEJUU1JUFEJTkw');
            const decoded = SaveSelector.atob(encoded);
            expect(decoded).toBe(input);
        });

        it('encodes and decodes emoji', () => {
            const input = '🙂';
            const encoded = SaveSelector.btoa(input);
            expect(encoded).toBe('JUYwJTlGJTk5JTgy');
            const decoded = SaveSelector.atob(encoded);
            expect(decoded).toBe(input);
        });

        it('encodes and decodes uri encoded strings', () => {
            const input = 'hello %20 world';
            const encoded = SaveSelector.btoa(input);
            expect(encoded).toBe('aGVsbG8gJTI1MjAgd29ybGQ=');
            const decoded = SaveSelector.atob(encoded);
            expect(decoded).toBe(input);
        });

        it('encodes and decodes non-uri % characters', () => {
            const input = '% % % %';
            const encoded = SaveSelector.btoa(input);
            expect(encoded).toBe('JTI1ICUyNSAlMjUgJTI1');
            const decoded = SaveSelector.atob(encoded);
            expect(decoded).toBe(input);
        });
    });
});
