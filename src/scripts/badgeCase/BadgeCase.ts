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

    gainBadge(badge: BadgeCase.Badge) {
        this.badgeList[badge] = true;
    }

    hasBadge(badge: BadgeCase.Badge) {
        if (badge == null || badge == BadgeCase.Badge.None) {
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

namespace BadgeCase {
    export enum Badge {
        'None',
        // Kanto
        'Boulder',
        'Cascade',
        'Thunder',
        'Rainbow',
        'Soul',
        'Marsh',
        'Volcano',
        'Earth',
        'Elite_Lorelei',
        'Elite_Bruno',
        'Elite_Agatha',
        'Elite_Lance',
        'Elite_KantoChampion',
        // Johto
        'Zephyr',
        'Hive',
        'Plain',
        'Fog',
        'Storm',
        'Mineral',
        'Glacier',
        'Rising',
        'Elite_Will',
        'Elite_Koga',
        'Elite_Bruno2',
        'Elite_Karen',
        'Elite_JohtoChampion',
        // Hoenn
        'Stone',
        'Knuckle',
        'Dynamo',
        'Heat',
        'Balance',
        'Feather',
        'Mind',
        'Rain',
        'Elite_Sidney',
        'Elite_Phoebe',
        'Elite_Glacia',
        'Elite_Drake',
        'Elite_HoennChampion',
        //Sinnoh
        'Coal',
        'Forest',
        'Relic',
        'Cobble',
        'Fen',
        'Mine',
        'Icicle',
        'Beacon',
        'Elite_Aaron',
        'Elite_Bertha',
        'Elite_Flint',
        'Elite_Lucian',
        'Elite_SinnohChampion',
    }
}
