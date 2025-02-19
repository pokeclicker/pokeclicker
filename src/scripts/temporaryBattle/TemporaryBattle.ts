/// <reference path="../../declarations/TemporaryScriptTypes.d.ts" />

type TemporaryBattleOptionalArgument = {
    rewardFunction?: () => void,
    firstTimeRewardFunction?: () => void,
    isTrainerBattle?: boolean,
    displayName?: string,
    returnTown?: string, // If in town, that town will be used. If not in town, this will be used, with the Dock town as default
    imageName?: string,
    visibleRequirement?: Requirement,
    hideTrainer?: boolean,
    environment?: GameConstants.Environment[],
    battleBackground?: GameConstants.BattleBackground,
    resetDaily?: boolean,
    finalPokemonImage?: string // trainer image when on final pokemon
};

class TemporaryBattle extends TownContent implements TmpTemporaryBattleType {
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
        } else if (App.game.statistics.temporaryBattleDefeated[GameConstants.getTemporaryBattlesIndex(this.name)]() == 0 && this.isVisible()) {
            return areaStatus.incomplete;
        } else {
            return areaStatus.completed;
        }
    }
    public getDisplayName() {
        return this.optionalArgs.displayName ?? this.name.replace(/( route)? \d+$/, '');
    }

    public getTown(): Town | undefined {
        return this.parent ?? TownList[this.optionalArgs.returnTown];
    }
    public getImage() {
        const imageName = this.optionalArgs?.imageName ?? this.name;
        const finalMonImageName = this.optionalArgs?.finalPokemonImage ?? imageName;
        return TemporaryBattleRunner.finalPokemon() ? `assets/images/npcs/${finalMonImageName}.png` : `assets/images/npcs/${imageName}.png`;
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
