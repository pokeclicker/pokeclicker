import { AchievementOption, Region, Starter } from '../GameConstants';
import Requirement from './Requirement';

export default class StarterRequirement extends Requirement {
    region: Region;
    constructor(region: Region, starter: Starter) {
        super(starter, AchievementOption.equal);
        this.region = region;
    }

    public getProgress() {
        return player.regionStarters[this.region]();
    }

    // eslint-disable-next-line class-methods-use-this
    public hint(): string {
        return 'Wrong starter.';
    }
}
