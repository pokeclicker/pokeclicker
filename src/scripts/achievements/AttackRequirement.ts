///<reference path="AchievementRequirement.ts"/>

class AttackRequirement extends AchievementRequirement {
    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Attack']);
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
