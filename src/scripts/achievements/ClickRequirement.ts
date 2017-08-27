///<reference path="Requirement.ts"/>

class ClickRequirement extends Requirement{
    constructor( value:number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress(){
        return Math.min(player.statistics.clicks, this.requiredValue);
    }
}
