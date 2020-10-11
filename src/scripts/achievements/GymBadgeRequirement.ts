///<reference path="../badgeCase/BadgeTypes.ts"/>
///<reference path="ClearGymRequirement.ts"/>

class GymBadgeRequirement extends Requirement {
    public badge: BadgeTypes;
    constructor(badge: BadgeTypes, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(1, type);
        this.badge = badge;
    }

    public getProgress() {
        return +App.game.badgeCase.hasBadge(this.badge);
    }

    public hint(): string {
        return `Requires the ${GameConstants.camelCaseToString(BadgeTypes[this.badge])} badge.`;
    }
}
