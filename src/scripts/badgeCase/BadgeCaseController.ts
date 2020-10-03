///<reference path="./BadgeTypes.ts"/>

class BadgeCaseController {
    static getDisplayableBadges() {
        return Object.keys(BadgeTypes).filter(b =>
            !b.startsWith('Elite') && b != 'None' && BadgeTypes[b] <= App.game.badgeCase.highestAvailableBadge()
        );
    }
}
