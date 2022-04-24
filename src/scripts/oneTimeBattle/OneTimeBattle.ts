class OneTimeBattle extends TownContent {
    public defeated: boolean;
    completeRequirements: (Requirement | OneFromManyRequirement)[];

    public cssClass(): string {
        return 'btn btn-secondary';
    }
    public text(): string {
        return `Fight ${this.name}`;
    }
    public isVisible(): boolean {
        return this.isUnlocked() && !this.completeRequirements.every(r => r.isCompleted());
    }
    public onclick(): void {
        OneTimeBattleRunner.startBattle(this);
    }

    constructor(
        public name: string,
        public pokemons: GymPokemon[],
        public defeatMessage: string,
        requirements: (Requirement | OneFromManyRequirement)[] = [],
        completeRequirements: (Requirement | OneFromManyRequirement)[] = [],
        public rewardFunction: () => void = () => {},
        public isTrainerBattle = true
    ) {
        super(requirements);
        if (completeRequirements.length == 0) {
            completeRequirements = [new OneTimeBattleRequirement(name)];
        }
        this.completeRequirements = completeRequirements;
    }
}
