import * as GameConstants from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class ClearGymRequirement extends AchievementRequirement {
    public gymIndex: number; // Gym name index in array GameConstants.Gyms

    constructor(value: number, gymIndex: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Clear Gym']);
        this.gymIndex = gymIndex;
    }

    public getProgress() {
        return Math.min(App.game.statistics.gymsDefeated[this.gymIndex](), this.requiredValue);
    }

    public hint(): string {
        if (this.requiredValue === 1) {
            return `Requires the ${GameConstants.RegionGyms.flat()[this.gymIndex]} Gym to be completed.`;
        }
        return `Requires the ${GameConstants.RegionGyms.flat()[this.gymIndex]} Gym to be defeated ${this.requiredValue} times.`;
    }

    public toString(): string {
        return `${super.toString()} ${this.gymIndex}`;
    }
}
