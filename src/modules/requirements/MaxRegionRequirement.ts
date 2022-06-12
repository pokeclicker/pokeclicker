import { AchievementOption, Region } from '../GameConstants';
import Requirement from './Requirement';

export default class MaxRegionRequirement extends Requirement {
    constructor(maxRegion = Region.none, option: AchievementOption = AchievementOption.more) {
        super(maxRegion, option);
    }

    public getProgress() {
        return Math.min(player.highestRegion(), this.requiredValue);
    }

    public hint(): string {
        return `You need to reach the ${Region[this.requiredValue]} region.`;
    }
}
