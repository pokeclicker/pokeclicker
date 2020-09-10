///<reference path="Requirement.ts"/>

class AttackRequirement extends Requirement {
    constructor( value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        // Calculate real total attack regardless of current region
        const currentAttack = App.game.party.calculatePokemonAttack(PokemonType.None, PokemonType.None, true);
        return Math.min(currentAttack, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Attack needed.`;
    }
}
