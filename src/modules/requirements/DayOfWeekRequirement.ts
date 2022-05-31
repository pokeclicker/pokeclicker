import { Observable as KnockoutObservable } from 'knockout';
import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class DayOfWeekRequirement extends Requirement {
    public static date: KnockoutObservable<Number> = ko.observable(new Date().getDay());
    DayOfWeek: number;
    constructor(DayOfWeek: number, option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.DayOfWeek = DayOfWeek;
    }

    public getProgress(): number {
        return +(DayOfWeekRequirement.date() === this.DayOfWeek);
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Try again another day.';
    }
}
