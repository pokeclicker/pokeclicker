import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class ProteinObtainRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Protein);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalProteinsObtained() && App.game.statistics.totalProteinsPurchased(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Proteins need to be obtained.`;
    }
}
