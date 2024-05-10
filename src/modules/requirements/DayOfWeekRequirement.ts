import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';
import GameHelper from '../GameHelper';

export default class DayOfWeekRequirement extends Requirement {
    DayOfWeekNum: number;
    constructor(DayOfWeekNum: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.equal) {
        super(1, option);
        this.DayOfWeekNum = DayOfWeekNum;
    }

    public getProgress(): number {
        return +(GameHelper.today().getDay() === this.DayOfWeekNum);
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return `Come back on ${GameConstants.DayOfWeek[this.DayOfWeekNum]}.`;
    }
}
