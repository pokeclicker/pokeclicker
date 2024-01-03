import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';

export default abstract class AchievementRequirement extends Requirement {
    constructor(
        requiredValue: number,
        option: GameConstants.AchievementOption,
        public achievementType: GameConstants.AchievementType = GameConstants.AchievementType.None,
    ) {
        super(requiredValue, option);
    }

    public toString(): string {
        return `${this.constructor.name} ${this.option}`;
    }
}
