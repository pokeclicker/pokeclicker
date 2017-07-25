///<reference path="Property.ts"/>

class MoneyProperty extends Requirement{
    constructor( requiredValue:number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(requiredValue, type);
    }

    public getProgress(){
        return Math.min(player.money, this.requiredValue);
    }
}