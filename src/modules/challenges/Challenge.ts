import {
    Observable as KnockoutObservable,
} from 'knockout';
import * as GameConstants from '../GameConstants';
import Notifier from '../notifications/Notifier';
import { ChallengeType } from '../GameConstants';
import NotificationOption from '../notifications/NotificationOption';

export default class Challenge {
    public active: KnockoutObservable<boolean>;
    challengesRequired: Challenge[];
    public challengesDepending = Array<Challenge>();

    constructor(
        public name: string,
        public description: string,
        public type: ChallengeType,
        challengesRequired: Challenge[] = [],
    ) {
        this.challengesRequired = challengesRequired;
        this.challengesRequired.forEach((c) => c.challengesDepending.push(this));
        this.active = ko.observable(type === ChallengeType.Recommended);
    }

    activate(): void {
        if (this.challengesRequired.some((c) => !c.active())) {
            Notifier.notify({
                title: 'Can\'t activate challenge',
                message: `Challenge '${this.challengesRequired.find((c) => !c.active()).name}' needs to be active.`,
                type: NotificationOption.danger,
            });
            return;
        }
        this.active(true);
    }

    async disable(): Promise<void> {
        if (this.challengesDepending.some((c) => c.active())) {
            Notifier.notify({
                title: 'Can\'t disable challenge',
                message: `Challenge '${this.challengesDepending.find((c) => c.active()).name}' needs to be disabled first.`,
                type: NotificationOption.danger,
            });
            return;
        }

        // If the player hasn't selected a starter yet, no need to confirm
        if (player.starter() === GameConstants.Starter.None) {
            this.active(false);
            return;
        }

        // Confirm they want to disable the challenge mode
        if (await Notifier.confirm({
            title: `Disable "${this.name}" challenge`,
            message: 'Are you sure you want to disable this challenge?\n\nOnce disabled, you will not be able to enable it again later!',
        })) {
            this.active(false);
        }
    }

    toJSON(): boolean {
        return this.active();
    }
}
