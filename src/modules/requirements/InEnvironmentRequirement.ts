import { AchievementOption, Environment, camelCaseToString } from '../GameConstants';
import GameHelper from '../GameHelper';
import Requirement from './Requirement';

export default class InEnvironmentRequirement extends Requirement {
    constructor(public environment: Environment, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(MapHelper.getCurrentEnvironments().includes(this.environment));
    }

    public hint(): string {
        return `You must be in ${
            GameHelper.anOrA(this.environment)
        } ${
            camelCaseToString(this.environment)
        } environment`;
    }
}
