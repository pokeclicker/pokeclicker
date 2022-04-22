class OneTimeBattle extends TownContent {
    public completed: boolean;

    public cssClass(): string {
        return 'btn btn-secondary';
    }
    public text(): string {
        return `Fight ${this.name}`;
    }
    public isVisible(): boolean {
        return this.isUnlocked() && !this.completed;
    }
    public onclick(): void {
        OneTimeBattleRunner.startBattle(this);
    }

    constructor(
        public name: string,
        public pokemons: GymPokemon[],
        public defeatMessage: string,
        requirements: (Requirement | OneFromManyRequirement)[] = []
    ) {
        super(requirements);
    }
}
