class TemporaryBattle extends TownContent {
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
        TemporaryBattleRunner.startBattle(this);
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
            completeRequirements = [new TemporaryBattleRequirement(name)];
        }
        this.completeRequirements = completeRequirements;
    }
}
