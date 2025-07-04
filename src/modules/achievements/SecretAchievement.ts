import { ExtraAchievementCategories } from '../GameConstants';
import AchievementRequirement from '../requirements/AchievementRequirement';
import Achievement from './Achievement';

export default class SecretAchievement extends Achievement {
    constructor(
        name: string,
        description: string,
        property: AchievementRequirement,
        private _hint: string,
        persist: boolean = false,
    ) {
        super(name, description, property, 0, AchievementHandler.getAchievementCategoryByExtraCategory(ExtraAchievementCategories.secret), null, persist);
        this.notificationTitle = 'Secret Achievement';
        this.notificationTimeout = 3e4;
    }

    get description(): string {
        return this.unlocked() ? this._description : `Hint: ${this._hint}`;
    }

    get displayName(): string {
        return this.unlocked() ? this.name : '???';
    }
}
