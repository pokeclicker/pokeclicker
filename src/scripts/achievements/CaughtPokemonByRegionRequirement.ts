///<reference path="AchievementRequirement.ts"/>

class CaughtUniquePokemonsByRegionRequirement extends AchievementRequirement {
    private region: GameConstants.Region;
    constructor(region: GameConstants.Region, amount = 0, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(amount || PokemonHelper.calcUniquePokemonsByRegion(region), option, GameConstants.AchievementType['Caught Unique Pokemons By Region']);
        this.region = region;
    }

    public getProgress() {
        return Math.min(PokemonHelper.numberOfPokemonsCaughtWithBaseFormNativeToRegion(this.region), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
