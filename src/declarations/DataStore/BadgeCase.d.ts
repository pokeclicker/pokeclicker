/// <reference path="knockout.d.ts"/>
/// <reference path="./common/Feature.d.ts"/>
/// <reference path="../enums/Badges.d.ts"/>
declare class BadgeCase implements Feature {
    name: string;
    saveKey: string;
    defaults: Record<string, any>;
    badgeList: Array<Observable<boolean>>;
    badgeCount(): number;
    gainBadge(badge: BadgeEnums): void;
    hasBadge(badge: BadgeEnums): boolean;
    initialize(): void;
    canAccess(): boolean;
    fromJSON(json: Record<string, any>): void;
    toJSON(): Record<string, any>;
    update(): void;
}
