import { AchievementOption, Environment } from '../GameConstants';
import GameHelper from '../GameHelper';
import Requirement from './Requirement';

export default class InEnvironmentRequirement extends Requirement {
    constructor(public environment: Environment, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(MapHelper.getCurrentEnvironment() === this.environment);
    }

    public hint(): string {
        return `You must be in ${
            GameHelper.anOrA(this.environment)
        } ${
            this.environment
        } environment`;
    }
}
