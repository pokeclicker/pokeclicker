class BadgeCase implements Feature {
    name: string = "Badge Case";
    saveKey: string = "badgeCase";

    badgeList: ArrayOfObservables<boolean>;
    badgeAmount: number;
    defaults: object = {};

    constructor(badgeAmount: number) {
        this.badgeAmount = badgeAmount;
        this.badgeList = this.createDefaultBadgeList();
    }

    private createDefaultBadgeList(): ArrayOfObservables<boolean> {
        let list = [true];
        for (let i = 1; i < this.badgeAmount; i++) {
            list.push(false);
        }
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
        if (badge == null) {
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

    fromJSON(json: object): void {
        this.badgeList = this.createDefaultBadgeList();
    }

    toJSON(): object {
        return this.badgeList.map(badge => {
            return badge
        });
    }

    update(delta: number): void {
        // This method intentionally left blank
    }
}

namespace BadgeCase {
    export enum Badge {
        "None" = 0,
        "Boulder" = 1,
        "Cascade" = 2,
        "Thunder" = 3,
        "Rainbow" = 4,
        "Soul" = 5,
        "Marsh" = 6,
        "Volcano" = 7,
        "Earth" = 8,
        "Elite_Lorelei" = 9,
        "Elite_Bruno" = 10,
        "Elite_Agatha" = 11,
        "Elite_Lance" = 12,
        "Elite_Champion" = 13,
        "Zephyr" = 14,
        "Hive" = 15,
        "Plain" = 16,
        "Fog" = 17,
        "Storm" = 18,
        "Mineral" = 19,
        "Glacier" = 20,
        "Rising" = 21,
        "Elite_Will" = 22,
        "Elite_Koga" = 23,
        "Elite_Bruno2" = 24,
        "Elite_Karen" = 25,
        "Elite_JohtoChampion" = 26,
        "Stone" = 27,
        "Knuckle" = 28,
        "Dynamo" = 29,
        "Heat" = 30,
        "Balance" = 31,
        "Feather" = 32,
        "Mind" = 33,
        "Rain" = 34,
        "Elite_Sidney" = 35,
        "Elite_Phoebe" = 36,
        "Elite_Glacia" = 37,
        "Elite_Drake" = 38,
        "Elite_HoennChampion" = 39,
    }
}
