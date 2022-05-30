import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class WeekdayRequirement extends Requirement {
    // 0 -> Sunday, 1 -> Monday, 2 -> Tuesday, 3 -> Wednesday, 4 -> Thursday, 5 -> Friday, 6 -> Saturday
    date = new Date();
    day: number;
    constructor(day: number, option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.day = day;
    }

    public getProgress(): number {
        return this.date.getDay() === this.day ? 1 : 0;
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Try again another day.';
    }
}
