/// <reference path="../../declarations/enums/Badges.d.ts"/>
///<reference path="ClearGymRequirement.ts"/>

class GymBadgeRequirement extends Requirement {
    public badge: BadgeEnums;
    constructor(badge: BadgeEnums, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(1, option, GameConstants.AchievementType.None);
        this.badge = badge;
    }

    public getProgress() {
        return +App.game.badgeCase.hasBadge(this.badge);
    }

    public hint(): string {
        return `Requires the ${GameConstants.camelCaseToString(BadgeEnums[this.badge])} badge.`;
    }
}
