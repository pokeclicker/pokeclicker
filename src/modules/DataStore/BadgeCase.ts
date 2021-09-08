import { Observable, PureComputed } from 'knockout';
import { Feature } from './common/Feature';
import BadgeEnums from '../enums/Badges';
import GameHelper from '../GameHelper';
import { camelCaseToString } from '../GameConstants';
import LogEvent from '../LogEvent';

const emptyBadgeList = new Array(GameHelper.enumLength(BadgeEnums)).fill(false);

export default class BadgeCase implements Feature {
    name = 'Badge Case';

    saveKey = 'badgeCase';

    defaults: Record<string, any> = {};

    badgeList: Array<Observable<boolean>> = emptyBadgeList.map((v) => ko.observable(v));

    badgeCount(): number {
        return this.badgeList.reduce((acc, b) => (acc + Number(b())), 0);
    }

    gainBadge(badge: BadgeEnums): void {
        this.badgeList[badge](true);

        // Track when users gains a badge and their total attack
        LogEvent('gained badge', 'badges', `gained badge (${camelCaseToString(BadgeEnums[badge])})`,
            App.game.party.calculatePokemonAttack(undefined, undefined, true, undefined, true, false, false));
    }

    hasBadge(badge: BadgeEnums): boolean {
        if (badge === null || badge === BadgeEnums.None) { return true; }
        return !!this.badgeList[badge]();
    }

    public static badgeCaseTooltip: PureComputed<string> = ko.pureComputed(() => {
        let maxLevel = Math.min((App.game.badgeCase.badgeCount() + 2) * 10, 100);

        return `Earning badges raises your Pokémons' maximum level, up to 100.<br>The max level of your Pokémon is <b>${maxLevel}</b>.`;
    });

    // This method intentionally left blank
    // eslint-disable-next-line class-methods-use-this
    initialize(): void { }

    // eslint-disable-next-line class-methods-use-this
    canAccess(): boolean { return true; }

    fromJSON(json: Record<string, any>): void {
        if (json == null) {
            return;
        }

        json.forEach((hasBadge, index) => {
            this.badgeList[index](hasBadge);
        });
    }

    toJSON(): Record<string, any> {
        let shouldReturn = false;
        // We only want to save upto the highest badge we have obtained,
        // everything else is assumed to be false
        return this.badgeList
            .map(ko.unwrap)
            .reverse()
            .filter((hasBadge) => {
                shouldReturn = shouldReturn || hasBadge;
                return shouldReturn;
            })
            .reverse();
    }

    // This method intentionally left blank
    // eslint-disable-next-line class-methods-use-this
    update(): void { }
}
