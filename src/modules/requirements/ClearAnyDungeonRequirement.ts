import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class ClearAnyDungeonRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Clear Dungeon']);
    }

    public getProgress() {
        const highestCleared = Math.max(...Object.values(App.game.statistics.dungeonsCleared).map(d => d()));
        return Math.min(highestCleared, this.requiredValue);
    }

    public hint(): string {
        return `Clear any dungeon a total of ${this.requiredValue} times.`;
    }
}
