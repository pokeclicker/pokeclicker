class BadgeCase implements Feature {
    name = 'Badge Case';
    saveKey = 'badgeCase';

    badgeList: ArrayOfObservables<boolean>;
    badgeAmount: number;
    defaults: Record<string, any> = {};

    constructor(highestBadge) {
        this.badgeAmount = highestBadge + 1;
        this.badgeList = this.createDefaultBadgeList();
    }

    private createDefaultBadgeList(): ArrayOfObservables<boolean> {
        const list = new Array(this.badgeAmount).fill(false);
        return new ArrayOfObservables(list);
    }

    badgeCount() {
        let count = 0;
        for (let i = 0; i < this.badgeList.length; i++) {
            if (this.badgeList[i]) {
                count++;
            }
        }
        return count;
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

        for (let i = 0; i < this.badgeList.length; i++) {
            this.badgeList[i] = json[i];
        }
    }

    toJSON(): Record<string, any> {
        return this.badgeList.map(badge => {
            return badge;
        });
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}

namespace BadgeCase {
    export enum Badge {
        'None',
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
    }
}
