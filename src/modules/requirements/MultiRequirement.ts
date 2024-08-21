import * as GameConstants from '../GameConstants';
import { MultiRequirementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class MultiRequirement extends Requirement {
    private _option: MultiRequirementOption;

    constructor(public requirements: (Requirement)[] = [], option: MultiRequirementOption = MultiRequirementOption.every) {
        super(requirements.length, GameConstants.AchievementOption.more);
        this._option = option;
    }

    public isCompleted() {
        if (this._option === MultiRequirementOption.any) {
            return this.requirements.some((requirement) => requirement.isCompleted());
        }
        return this.requirements.every((requirement) => requirement.isCompleted());
    }

    public hint(): string {
        if (this.isCompleted()) {
            return '.';
        }

        const output = [];
        this.requirements.forEach((requirement) => {
            if (!requirement.isCompleted()) {
                output.push(requirement.hint().replace(/\./g, ''));
            }
        });
        return `${output.join(' and ')}.`;
    }

    public getProgress() {
        if (this.isCompleted()) {
            return this.requiredValue;
        }

        const completed = this.requirements.filter((requirement) => requirement.isCompleted()).length;
        return Math.min(completed, this.requiredValue);
    }
}
