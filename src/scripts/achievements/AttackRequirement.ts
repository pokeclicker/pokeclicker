///<reference path="Requirement.ts"/>

class AttackRequirement extends Requirement{
    constructor( value:number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress(){
        return Math.min(App.game.party.calculatePokemonAttack(GameConstants.PokemonType.None, GameConstants.PokemonType.None), this.requiredValue);
    }
}
