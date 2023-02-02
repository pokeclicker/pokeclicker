// Override system date
jest.useFakeTimers().setSystemTime(new Date(1675298702433));

import GameHelper from './GameHelper';
// eslint-disable-next-line @typescript-eslint/no-redeclare
import * as ko from 'knockout';
import { AchievementOption } from './GameConstants';

describe('Test Credits', () => {
    it('time until tomorrow', () => {
        expect(GameHelper.formattedTimeUntilTomorrow()).toBe('10:14');
        expect(GameHelper.formattedLetterTimeUntilTomorrow()).toBe('10h14m');
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
});
