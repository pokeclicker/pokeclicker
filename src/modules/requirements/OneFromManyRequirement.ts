import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';

export default class OneFromManyRequirement extends Requirement {
    constructor(public requirements: (Requirement)[] = []) {
        super(1, GameConstants.AchievementOption.more);
    }

    public getProgressPercentage() {
        return ((this.getProgress() / this.requiredValue) * 100).toFixed(1);
    }

    public isCompleted() {
        return this.requirements.some((requirement) => requirement.isCompleted());
    }

    public hint(): string {
        const output = [];
        this.requirements.forEach((requirement) => {
            if (!requirement.isCompleted()) {
                output.push(requirement.hint().replace(/\./g, ''));
            }
        });
        return `${output.join(' or ')}.`;
    }

    public getProgress() {
        const completed = this.requirements.filter((requirement) => requirement.isCompleted()).length;
        return Math.min(completed, this.requiredValue);
    }
}
