///<reference path="Property.ts"/>

class CaughtPokemonProperty extends Requirement {
    constructor(value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(player._caughtPokemonList().length, this.requiredValue);
    }
}