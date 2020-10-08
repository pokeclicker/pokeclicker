///<reference path="./BadgeTypes.ts"/>

class BadgeCase implements Feature {
    name = 'Badge Case';
    saveKey = 'badgeCase';
    defaults: Record<string, any> = {};

    badgeList: ArrayOfObservables<boolean> = new ArrayOfObservables(new Array(GameConstants.RegionGyms.flat().length).fill(false));
    highestAvailableBadge: KnockoutComputed<number> = ko.pureComputed(() => {
        const region = player.highestRegion();
        return gymList[GameConstants.RegionGyms[region][GameConstants.RegionGyms[region].length - 1]].badgeReward;
    });

    constructor() {}

    badgeCount() {
        return this.badgeList.reduce((a, b) => (+a) + (+b), 0);
    }

    gainBadge(badge: BadgeTypes) {
        this.badgeList[badge] = true;
    }

    hasBadge(badge: BadgeTypes) {
        if (badge == null || badge == BadgeTypes.None) {
            return true;
        }
        return this.badgeList[badge];
    }

    initialize(): void {
        // This method intentionally left blank
    }

    canAccess(): boolean {
        return true;
    }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        json.forEach((hasBadge, index) => {
            this.badgeList[index] = hasBadge;
        });
    }

    toJSON(): Record<string, any> {
        let shouldReturn = false;
        // We only want to save upto the highest badge we have obtained, everything else is assumed to be false
        return [...this.badgeList].reverse().filter(i => shouldReturn || i && (shouldReturn = i)).reverse();
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}
