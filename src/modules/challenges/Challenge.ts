import {
    Observable as KnockoutObservable,
} from 'knockout';

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

    disable(): void {
        this.active(false);
    }

    toJSON(): boolean {
        return this.active();
    }
}
