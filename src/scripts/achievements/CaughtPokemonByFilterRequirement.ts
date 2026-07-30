///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>

class CaughtUniquePokemonByFilterRequirement extends AchievementRequirement {
    public list: Array<PokemonNameType>;
    constructor(filter: (pokemon: PokemonListData) => boolean, private hintText, amount: number, public shiny = false, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(amount, option, GameConstants.AchievementType[shiny ? 'Shiny Pokemon' : 'Caught Pokemon']);
        this.list = pokemonList.filter(p => filter(p)).map(p => p.name);
    }

    public getProgress() {
        return Math.min(this.list.filter(p => App.game.party.alreadyCaughtPokemonByName(p, this.shiny)).length, this.requiredValue);
    }

    public hint(): string {
        return this.hintText;
    }

    public toString(): string {
        return `${super.toString()} ${this.list.join(' & ')} ${this.shiny}`;
    }
}
