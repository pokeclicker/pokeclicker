/// <reference path="../../declarations/enums/Badges.d.ts"/>

class BadgeCaseController {
    private static optionalLeagueNames = ['Orange League', 'Magikarp Jump'];

    static getDisplayableBadges() {
        const highestRegion = player.highestRegion();
        const result = {};
        GameConstants.RegionGyms.forEach((region, i) => {
            // Optional leagues
            if (i >= GameConstants.Region.final) {
                if (!region.some(gym => App.game.badgeCase.hasBadge(GymList[gym].badgeReward))) {
                    return;
                }
                result[this.optionalLeagueNames[i - GameConstants.Region.final]] = this.regionToBadges(region);
                return;
            }

            // Normal leagues
            if (i > highestRegion) {
                return;
            }
            result[GameConstants.Region[i].charAt(0).toUpperCase() + GameConstants.Region[i].slice(1)] = this.regionToBadges(region);
        });
        return result;
    }

    private static regionToBadges(region: string[]) {
        return region
            .map(gym => BadgeEnums[GymList[gym].badgeReward])
            .filter(b => !b.startsWith('Elite') && b != 'None');
    }
}
