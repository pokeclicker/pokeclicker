import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class SeededDateRequirement extends Requirement {
    seededRandFunction: ()=>boolean;
    constructor(seededRandFunction: ()=>boolean, option: AchievementOption = AchievementOption.equal) {
        super(1, option);
        this.seededRandFunction = seededRandFunction;
    }

    public getProgress(): number {
        return +this.seededRandFunction();
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Try again another day.';
    }
}
