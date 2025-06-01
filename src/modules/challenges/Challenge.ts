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

    async disable(confirm = true) {
        // If the player hasn't selected a starter yet, no need to confirm
        if (player.regionStarters[GameConstants.Region.kanto]() === GameConstants.Starter.None) {
            this.active(false);
            return;
        }

        // Confirm they want to disable the challenge mode
        if (!confirm || await Notifier.confirm({
            title: 'DISABLE CHALLENGE',
            message: `<p class="text-center m-2"><b>Warning</b>: Disabling "${this.type}" challenge is <b>permanent</b>.<br/><br/>Are you sure you want to continue?</p>`,
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
