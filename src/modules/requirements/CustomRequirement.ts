import { Computed, Observable } from 'knockout';
import { AchievementOption } from '../GameConstants';
import AchievementRequirement from './AchievementRequirement';

export default class CustomRequirement<T> extends AchievementRequirement {
    constructor(
        private focus: Observable<T> | Computed<T>,
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
