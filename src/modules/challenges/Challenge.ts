/* eslint-disable no-console */
import {
    Observable as KnockoutObservable,
} from 'knockout';
import * as GameConstants from '../GameConstants';
import Notifier from '../notifications/Notifier';

export default class Challenge {
    public active: KnockoutObservable<boolean>;
    public needDataInput : KnockoutObservable<boolean>;
    public data : KnockoutObservable<any>;
    public isMod : KnockoutObservable<boolean>;
    constructor(
        public type: string,
        public description: string,
        active = false,
        needDataInput = false,
        isMod = false,
    ) {
        this.active = ko.observable(active);
        this.needDataInput = ko.observable(needDataInput);
        this.data = ko.observable('');
        this.isMod = ko.observable(isMod);
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
            title: `Disable "${this.type}" challenge`,
            message: 'Are you sure you want to disable this challenge?\n\nOnce disabled, you will not be able to enable it again later!',
        })) {
            this.active(false);
        }
    }
    toJSON(): Record<string, any> {
        return {
            active: this.active(),
            data: this.data(),
            needDataInput: this.needDataInput(),
        };
    }
    fromJSON(json: Record<string, any>) {
        console.log(json);
        this.active(json.active);
        this.data(json.data);
        this.needDataInput(json.needDataInput);
    }
}
