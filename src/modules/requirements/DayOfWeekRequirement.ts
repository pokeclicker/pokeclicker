import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class DayOfWeekRequirement extends Requirement {
    DayOfWeekFunction: ()=>boolean;
    constructor(DayOfWeekFunction: ()=>boolean, option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.DayOfWeekFunction = DayOfWeekFunction;
    }

    public getProgress(): number {
        return +this.DayOfWeekFunction();
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Try again another day.';
    }
}
