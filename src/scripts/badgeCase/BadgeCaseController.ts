/// <reference path="../../declarations/enums/Badges.d.ts"/>

class BadgeCaseController {
    static getDisplayableBadges() {
        const region = player.highestRegion(); //TODO: find a way to use this again
        const result = {};
        GameConstants.RegionGyms.forEach((region, index) => {
            result[GameConstants.BadgeGroups[index]] = region
                .map(gym => BadgeEnums[GymList[gym].badgeReward])
                .filter(b => !b.startsWith('Elite') && b != 'None');
        });
        return result;
    }
}
