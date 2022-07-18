import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class FarmPlotsUnlockedRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType.Farming);
    }

    public getProgress() {
        return Math.min(App.game.farming.unlockedPlotCount(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Plots in the Farm need to be unlocked.`;
    }
}
