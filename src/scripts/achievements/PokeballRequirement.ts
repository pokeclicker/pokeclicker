///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>

class PokeballRequirement extends AchievementRequirement {
    private pokeball: GameConstants.Pokeball;

    constructor(value: number, pokeball: GameConstants.Pokeball, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Pokeball']);
        this.pokeball = pokeball;
    }

    public getProgress() {
        return Math.min(App.game.statistics.pokeballsObtained[this.pokeball](), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} ${GameConstants.Pokeball[this.pokeball]} need to be obtained.`;
    }
}
