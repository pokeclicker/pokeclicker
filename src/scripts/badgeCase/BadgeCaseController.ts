/// <reference path="../../declarations/enums/Badges.d.ts"/>

class BadgeCaseController {
    static getDisplayableBadges() {
        const region = player.highestRegion();
        return GameConstants.RegionGyms.slice(0, region + 1).map(regionGyms => regionGyms.map(gym => BadgeEnums[gymList[gym].badgeReward]).filter(b => !b.startsWith('Elite') && b != 'None')).flat();
    }
}
