///<reference path="Requirement.ts"/>

class PokeballRequirement extends Requirement {
    private pokeball: GameConstants.Pokeball;

    constructor(value: number, pokeball: GameConstants.Pokeball, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, option, GameConstants.AchievementType['Pokeball']);
        this.pokeball = pokeball;
    }

    public getProgress() {
        return Math.min(App.game.statistics.pokeballsBought[this.pokeball](), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} ${GameConstants.Pokeball[this.pokeball]} need to be obtained.`;
    }
}
