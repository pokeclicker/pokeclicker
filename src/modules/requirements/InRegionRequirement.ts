import { AchievementOption, Region } from '../GameConstants';
import Requirement from './Requirement';

export default class InRegionRequirement extends Requirement {
    constructor(public regions: Region[], option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(this.regions.includes(player.region));
    }

    public hint(): string {
        return `You must be in one of the following regions: ${
            this.regions.join(', ')
        }`;
    }
}
