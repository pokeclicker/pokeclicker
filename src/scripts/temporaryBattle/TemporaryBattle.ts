type TemporaryBattleOptionalArgument = {
    rewardFunction?: () => void,
    firstTimeRewardFunction?: () => void,
    isTrainerBattle?: boolean,
    displayName?: string,
    returnTown?: string, // If in town, that town will be used. If not in town, this will be used, with the Dock town as default
    imageName?: string,
    visibleRequirement?: Requirement,
    hideTrainer?: boolean,
};

class TemporaryBattle extends TownContent {
    completeRequirements: (Requirement | OneFromManyRequirement)[];

    public cssClass(): string {
        return App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.name)]() ?
            'btn btn-success' :
            'btn btn-secondary';
    }
    public text(): string {
        return `Fight ${this.getDisplayName()}`;
    }
    public isVisible(): boolean {
        return (this.isUnlocked() || this.optionalArgs.visibleRequirement?.isCompleted()) && !this.completeRequirements.every(r => r.isCompleted());
    }
    public onclick(): void {
        TemporaryBattleRunner.startBattle(this);
    }
    public areaStatus() {
        if (!this.isUnlocked()) {
            return areaStatus.locked;
        } else if (App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.name)]() == 0) {
            return areaStatus.unlockedUnfinished;
        } else {
            return areaStatus.completed;
        }
    }
    public getDisplayName() {
        return this.optionalArgs.displayName ?? this.name;
    }

    public getImageName() {
        return this.optionalArgs.imageName ?? this.name;
    }

    public getTown() {
        return this.parent ?? TownList[this.optionalArgs.returnTown] ?? TownList[GameConstants.DockTowns[player.region]];
    }
    public getImage() {
        const imageName = this.optionalArgs?.imageName ?? this.name;
        return `assets/images/temporaryBattle/${imageName}.png`;
    }

    constructor(
        public name: string,
        private pokemons: GymPokemon[],
        public defeatMessage: string,
        requirements: Requirement[] = [],
        completeRequirements: Requirement[] = undefined,
        public optionalArgs: TemporaryBattleOptionalArgument = {}
    ) {
        super(requirements);
        if (!completeRequirements) {
            completeRequirements = [new TemporaryBattleRequirement(name)];
        }
        if (optionalArgs.isTrainerBattle == undefined) {
            optionalArgs.isTrainerBattle = true;
        }
        this.completeRequirements = completeRequirements;
    }

    public getPokemonList() {
        return this.pokemons.filter((p) => p.requirements.every((r => r.isCompleted())));
    }
}
