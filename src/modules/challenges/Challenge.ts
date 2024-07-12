import { Observable as KnockoutObservable } from 'knockout';
import * as GameConstants from '../GameConstants';
import Notifier from '../notifications/Notifier';
import NotificationOption from '../notifications/NotificationOption';

export default class Challenge {
    public active: KnockoutObservable<boolean>;

    constructor(
        public type: string,
        public description: string,
        active = false,
    ) {
        this.active = ko.observable(active);
    }

    activate(): void {
        this.active(true);
    }

    async disable(): Promise<void> {
        // If the player hasn't selected a starter yet, no need to confirm
        if (player.regionStarters[GameConstants.Region.kanto]() === GameConstants.Starter.None) {
            this.active(false);
            return;
        }

        // Confirm they want to disable the challenge mode
        if (await Notifier.confirm({
            title: `Disable "${this.type}" challenge`,
            message: 'Are you sure you want to disable this challenge?\n\nOnce disabled, you will not be able to enable it again later!',
            confirm: '<span style="white-space: nowrap;">Permanently disable</span>',
            type: NotificationOption.danger,
        })) {
            this.active(false);
        }
    }

    toJSON(): boolean {
        return this.active();
    }
}
