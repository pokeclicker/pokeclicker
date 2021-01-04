/// <reference path="../../declarations/enums/Badges.d.ts"/>

class BadgeCaseController {
    static getDisplayableBadges() {
        const region = player.highestRegion();
        const highestAvailableBadge = gymList[GameConstants.RegionGyms[region][GameConstants.RegionGyms[region].length - 1]].badgeReward;
        return Object.keys(BadgeEnums).filter(b =>
            !b.startsWith('Elite') && b != 'None' && BadgeEnums[b] <= highestAvailableBadge
        );
    }
}
