import { AchievementOption, SubEnvironment, camelCaseToString } from '../GameConstants';
import GameHelper from '../GameHelper';
import Requirement from './Requirement';

export default class InEnvironmentRequirement extends Requirement {
    constructor(public subEnvironment: SubEnvironment, option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress() {
        return Number(MapHelper.getCurrentSubEnvironment() === this.subEnvironment);
    }

    public hint(): string {
        return `You must be in ${
            GameHelper.anOrA(this.subEnvironment)
        } ${
            camelCaseToString(this.subEnvironment)
        } sub environment`;
    }
}
