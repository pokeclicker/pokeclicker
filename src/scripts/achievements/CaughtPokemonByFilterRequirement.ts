///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>

class CaughtUniquePokemonByFilterRequirement extends AchievementRequirement {
    constructor(public filter: (pokemon: PartyPokemon) => boolean, private hintText, amount: number, public shiny = false, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(amount, option, GameConstants.AchievementType['Caught Pokemon']);
    }

    public getProgress() {
        return Math.min(App.game.party.caughtPokemon.filter(p => this.filter(p) && (p.shiny || !this.shiny)).length, this.requiredValue);
    }

    public hint(): string {
        return this.hintText;
    }

    public toString(): string {
        return `${super.toString()} ${this.filter} ${this.shiny}`;
    }
}
