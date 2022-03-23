///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>


class AttackRequirement extends AchievementRequirement {
    private static attack = ko.pureComputed(() => {
        return App.game.party.calculatePokemonAttack(PokemonType.None, PokemonType.None, true);
    }).extend({ rateLimit: 500 })

    constructor(value: number, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Attack']);
    }

    public getProgress() {
        // Calculate real total attack regardless of current region
        const currentAttack = AttackRequirement.attack();
        return Math.min(currentAttack, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} Attack needed.`;
    }
}
