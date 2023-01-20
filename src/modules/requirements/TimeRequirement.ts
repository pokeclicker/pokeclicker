import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';
import DayCyclePart from '../dayCycle/DayCyclePart';
import DayCycle from '../dayCycle/DayCycle';

export default class TimeRequirement extends Requirement {
    private updateTrigger = ko.observable(0);
    constructor(public dayCyclePartRequirement: DayCyclePart[], option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress(): number {
        this.updateTrigger();

        return Number(this.dayCyclePartRequirement.includes(DayCycle.currentDayCyclePart()));
    }

    public hint(): string {
        return `Your local part of the day must be ${this.dayCyclePartRequirement.map((dayCyclePart) => DayCyclePart[dayCyclePart]).join(' or ')}`;
    }
}
