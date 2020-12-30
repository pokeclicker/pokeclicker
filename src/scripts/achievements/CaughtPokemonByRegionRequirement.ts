///<reference path="AchievementRequirement.ts"/>

class CaughtUniquePokemonsByRegionRequirement extends AchievementRequirement {
    private region: GameConstants.Region;
    constructor(region: GameConstants.Region, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(PokemonHelper.calcUniquePokemonsByRegion(region), option, GameConstants.AchievementType['Caught Unique Pokemons By Region']);
        this.region = region;
    }

    public getProgress() {
        return Math.min(new Set(App.game.party.caughtPokemon.filter(p => p.id > 0 && PokemonHelper.calcNativeRegion(p.name) === this.region).map(p => Math.floor(p.id))).size, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
