import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';
import DayCyclePart from '../dayCycle/DayCyclePart';
import DayCycle from '../dayCycle/DayCycle';

export default class DayCyclePartRequirement extends Requirement {
    private updateTrigger = ko.observable(0);
    constructor(public dayCycleParts: DayCyclePart[], option = AchievementOption.more) {
        super(1, option);
    }

    public getProgress(): number {
        this.updateTrigger();

        return Number(this.dayCycleParts.includes(DayCycle.currentDayCyclePart()));
    }

    public hint(): string {
        return `Your local part of the day must be ${this.dayCycleParts.map((dayCyclePart) => DayCyclePart[dayCyclePart]).join(' or ')}`;
    }
}
