import BadgeEnums from '../enums/Badges';
import * as GameConstants from '../GameConstants';
import Requirement from './Requirement';

export default class GymBadgeRequirement extends Requirement {
    public badge: BadgeEnums;
    constructor(badge: BadgeEnums, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(1, option);
        this.badge = badge;
    }

    public getProgress() {
        return +App.game.badgeCase.hasBadge(this.badge);
    }

    public hint(): string {
        return `Requires the ${GameConstants.camelCaseToString(BadgeEnums[this.badge])} badge.`;
    }
}
