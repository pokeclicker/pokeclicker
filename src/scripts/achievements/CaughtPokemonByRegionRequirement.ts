///<reference path="../../declarations/requirements/AchievementRequirement.d.ts"/>

class CaughtUniquePokemonsByRegionRequirement extends AchievementRequirement {
    public region: GameConstants.Region;
    constructor(region: GameConstants.Region, amount = 0, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(amount || PokemonHelper.calcUniquePokemonsByRegion(region), option, GameConstants.AchievementType['Caught Pokemon']);
        this.region = region;
    }

    public getProgress() {
        return Math.min(new Set(App.game.party.caughtPokemon.filter(p => p.id > 0 && PokemonHelper.calcNativeRegion(p.name) === this.region).map(p => Math.floor(p.id))).size, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
