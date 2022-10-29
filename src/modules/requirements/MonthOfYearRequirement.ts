import { Observable as KnockoutObservable } from 'knockout';
import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';

export default class MonthOfYearRequirement extends Requirement {
    public static date: KnockoutObservable<number> = ko.observable(new Date().getMonth());
    MonthsOfYear: Array<number>;
    constructor(MonthsOfYear: number | Array<number>, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(1, option);
        this.MonthsOfYear = [MonthsOfYear].flat();
    }

    public getProgress(): number {
        return +(this.MonthsOfYear.some((v) => v === MonthOfYearRequirement.date()));
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return `Come back during ${this.MonthsOfYear.map((v) => GameConstants.MonthOfYear[v]).join(' or ')}.`;
    }
}
