import { Observable } from 'knockout';
import { AchievementOption } from '../GameConstants';
import Requirement from './Requirement';

export default class CustomRequirement<T> extends Requirement {
    constructor(
        private focus: Observable<T>,
        private required: T,
        private hintText: string,
        option = AchievementOption.more,
    ) {
        super(1, option);
    }

    public getProgress() {
        return Number(this.focus() === this.required);
    }

    public hint(): string {
        return this.hintText;
    }
}
