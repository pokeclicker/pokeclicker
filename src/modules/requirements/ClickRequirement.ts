import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class ClickRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Attack);
    }

    public getProgress() {
        return Math.min(App.game.statistics.clickAttacks(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} click attacks need to be completed.`;
    }
}
