import { AchievementOption } from '../GameConstants';
import GameHelper from '../GameHelper';
import SeededDateRand from '../utilities/SeededDateRand';
import Requirement from './Requirement';

export default class SeededDateRequirement extends Requirement {
    seededRandFunction: ()=>boolean;
    constructor(seededRandFunction: ()=>boolean, option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.seededRandFunction = seededRandFunction;
    }

    public getProgress(): number {
        SeededDateRand.seedWithDate(GameHelper.today());
        return +this.seededRandFunction();
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Try again another day.';
    }
}
