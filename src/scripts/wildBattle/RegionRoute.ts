class RegionRoute {
    constructor(
        public routeName: string,
        public region: GameConstants.Region,
        public number: number,
        public pokemon: RoutePokemon,
        public requirements: (OneFromManyRequirement | Requirement)[] = [],
        public orderNumber?: number
    ) {
        this.orderNumber = orderNumber || number;
    }

    public isUnlocked() {
        return this.requirements.every(requirement => requirement.isCompleted());
    }
}
