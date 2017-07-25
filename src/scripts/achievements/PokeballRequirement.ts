///<reference path="Property.ts"/>

class PokeballProperty extends Requirement {
    private pokeball: GameConstants.Pokeball;

    constructor(value: number, pokeball: GameConstants.Pokeball, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
        this.pokeball = pokeball;
    }

    public getProgress() {
        return Math.min(player._pokeballs[this.pokeball](), this.requiredValue);
    }
}