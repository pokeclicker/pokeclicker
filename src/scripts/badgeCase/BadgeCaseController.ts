/// <reference path="../../declarations/enums/Badges.d.ts"/>

class BadgeCaseController {
    private static optionalLeagueNames = ['Orange League', 'Magikarp Jump', 'Orre'];

    static getDisplayableBadges() {
        const highestRegion = player.highestRegion();
        const result = {};
        GameConstants.RegionGyms.forEach((region, i) => {
            // Optional leagues
            if (i >= GameConstants.Region.final) {
                if (!region.some(gym => App.game.badgeCase.hasBadge(GymList[gym].badgeReward))) {
                    return;
                }
                const badges = this.regionToBadges(region);
                if (badges.length) {
                    result[this.optionalLeagueNames[i - GameConstants.Region.final]] = badges;
                }
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
            .filter(b => !b.startsWith('Elite') && !b.endsWith('iumZ') && b != 'None');
    }
}
