///<reference path="Requirement.ts"/>

class PokeballRequirement extends Requirement {
    private pokeball: GameConstants.Pokeball;

    constructor(value: number, pokeball: GameConstants.Pokeball, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.pokeball = pokeball;
    }

    public getProgress() {
        return Math.min(App.game.statistics.pokeballsBought[this.pokeball](), this.requiredValue);
    }
}
