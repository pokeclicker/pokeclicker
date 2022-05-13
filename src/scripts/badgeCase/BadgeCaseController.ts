/// <reference path="../../declarations/enums/Badges.d.ts"/>

class BadgeCaseController {
    static getDisplayableBadges() {
        const region = player.highestRegion();
        const result = {};
        GameConstants.RegionGyms.slice(0, region + 1).forEach((region, index) => {
            result[GameConstants.Region[index].charAt(0).toUpperCase() + GameConstants.Region[index].slice(1)] = region
                .map(gym => BadgeEnums[GymList[gym].badgeReward])
                .filter(b => !b.startsWith('Elite') && b != 'None');
        });
        return result;
    }
}
