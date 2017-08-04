///<reference path="Requirement.ts"/>

class CapturedRequirement extends Requirement{
    constructor( value:number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress(){
        return Math.min(Statistics.pokemonCaptured(), this.value);
    }
}
