import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class WeekdayRequirement extends Requirement {
    // 0 -> Sunday, 1 -> Monday, 2 -> Tuesday, 3 -> Wednesday, 4 -> Thursday, 5 -> Friday, 6 -> Saturday
    WeekdayFunction: ()=>boolean;
    constructor(WeekdayFunction: ()=>boolean, option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.WeekdayFunction = WeekdayFunction;
    }

    public getProgress(): number {
        return +this.WeekdayFunction();
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Try again another day.';
    }
}
