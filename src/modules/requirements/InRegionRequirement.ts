import { AchievementOption, camelCaseToString, Region } from '../GameConstants';
import Requirement from './Requirement';

export default class InRegionRequirement extends Requirement {
    constructor(public regions: Region[], option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(this.regions.includes(player.region));
    }

    public hint(): string {
        return this.regions.length > 1
            ? `You must be in one of the following regions: ${
                this.regions.map((r) => camelCaseToString(Region[r])).join(', ')
            }`
            : `You must be in the ${
                camelCaseToString(Region[this.regions[0]])
            } region`;
    }
}
