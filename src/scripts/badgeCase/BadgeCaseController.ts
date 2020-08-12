class BadgeCaseController {
    static getDisplayableBadges() {
        return Object.keys(BadgeCase.Badge).filter(b =>
            !b.startsWith('Elite') && b != 'None' && BadgeCase.Badge[b] <= App.game.badgeCase.highestAvailableBadge()
        );
    }
}
