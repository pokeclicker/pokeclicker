class Challenge {
    public active: KnockoutObservable<boolean>;

    constructor(
      public type: string,
      public description: string,
      active = false
    ) {
        this.active = ko.observable(active);
    }

    activate(): void {
        if (confirm(`Are you sure you want to activate ${this.type} challenge mode?\n Once activated, It cannot be disabled again later.`)) {
            this.active(true);
        }
    }

    toJSON(): boolean {
        return this.active();
    }
}
