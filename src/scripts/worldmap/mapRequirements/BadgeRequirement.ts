class BadgeRequirement implements MapRequirement {
    badge: BadgeCase.Badge;

    constructor(badge: BadgeCase.Badge) {
        this.badge = badge;
    }

    canAccess(): boolean {
        return App.game.badgeCase.hasBadge(this.badge);
    }

    lockedReason(): string {
        return `You need to obtain the ${BadgeCase.Badge[this.badge]} Badge before you can access this location.`;
    }
}