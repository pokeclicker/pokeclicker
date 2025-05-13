import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class UndergroundLayersMinedRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Underground);
    }

    public getProgress() {
        return Math.min(App.game.statistics.undergroundLayersMined(), this.requiredValue);
    }

    public hint(): string {
        const suffix = (this.requiredValue > 1) ? 's' : '';
        return `Mine ${this.requiredValue.toLocaleString('en-US')} layer${suffix} in the Underground.`;
    }
}
