import {
    Observable as KnockoutObservable,
} from 'knockout';
import * as GameConstants from '../GameConstants';
import Notifier from '../notifications/Notifier';
import { ChallengeType } from '../GameConstants';

export default class Challenge {
    public active: KnockoutObservable<boolean>;

    constructor(
        public name: string,
        public description: string,
        public type: ChallengeType,
    ) {
        this.active = ko.observable(type === ChallengeType.Recommended);
    }

    activate(): void {
        this.active(true);
    }

    async disable(): Promise<void> {
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
