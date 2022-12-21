import { Observable as KnockoutObservable } from 'knockout';
import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';

export default class DayOfWeekRequirement extends Requirement {
    public static date: KnockoutObservable<Number> = ko.observable(new Date().getDay());
    DayOfWeekNum: number;
    constructor(DayOfWeekNum: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(1, option);
        this.DayOfWeekNum = DayOfWeekNum;
    }

    public getProgress(): number {
        return +(DayOfWeekRequirement.date() === this.DayOfWeekNum);
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return `Come back on ${GameConstants.DayOfWeek[this.DayOfWeekNum]}.`;
    }
}
