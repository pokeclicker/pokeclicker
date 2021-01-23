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
        this.active(true);
    }

    toJSON(): boolean {
        return this.active();
    }
}
