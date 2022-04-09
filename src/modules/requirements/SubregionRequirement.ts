import { AchievementOption, camelCaseToString, Region } from '../GameConstants';
import SubRegions from '../subRegion/SubRegions';
import Requirement from './Requirement';

export default class SubregionRequirement extends Requirement {
    constructor(public region: Region, public subregion: number, option: AchievementOption = AchievementOption.equal) {
        super(subregion, option);
    }

    public getProgress() {
        return this.region === player.region && this.subregion === player.subregion ? 100 : 0;
    }

    public hint(): string {
        return `You need to be in the ${SubRegions.getSubRegionById(this.region, this.subregion)} subregion of ${camelCaseToString(Region[this.region])}.`;
    }

    public getProgressPercentage() {
        return this.region === player.region && this.subregion === player.subregion ? '100' : '0';
    }

    public isCompleted() {
        return this.region === player.region && this.subregion === player.subregion;
    }
}
