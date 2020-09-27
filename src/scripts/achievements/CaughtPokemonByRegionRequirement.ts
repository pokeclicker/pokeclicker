///<reference path="Requirement.ts"/>

class CaughtUniquePokemonsByRegionRequirement extends Requirement {
    private region: GameConstants.Region;
    constructor(region: GameConstants.Region, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(PokemonHelper.calcUniquePokemonsByRegion(region), type);
        this.region = region;
    }

    public getProgress() {
        return Math.min(App.game.party.caughtPokemon.filter(p => PokemonHelper.calcNativeRegion(p.name) == this.region).length, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
