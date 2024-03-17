class Pokeball {
    public quantity: KnockoutObservable<number>;

    constructor(
        public type: GameConstants.Pokeball,
        public catchBonus: (opts: CatchOptions) => number,
        public catchTime: number,
        public description: string,
        public unlockRequirement: Requirement | MultiRequirement = new MultiRequirement(),
        quantity = 0
    ) {
        this.quantity = ko.observable(quantity);
    }

    public unlocked() {
        return this.unlockRequirement.isCompleted();
    }
}
