///<reference path="./BadgeTypes.ts"/>

class BadgeCaseController {
    static getDisplayableBadges() {
        const region = player.highestRegion();
        const highestAvailableBadge = gymList[GameConstants.RegionGyms[region][GameConstants.RegionGyms[region].length - 1]].badgeReward;
        return Object.keys(BadgeTypes).filter(b =>
            !b.startsWith('Elite') && b != 'None' && BadgeTypes[b] <= highestAvailableBadge
        );
    }
}
