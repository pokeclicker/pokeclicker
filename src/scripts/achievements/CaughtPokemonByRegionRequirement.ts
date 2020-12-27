/// <reference path="../../declarations/achievements/Requirement.d.ts" />

class CaughtUniquePokemonsByRegionRequirement extends Requirement {
    private region: GameConstants.Region;
    constructor(region: GameConstants.Region, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(PokemonHelper.calcUniquePokemonsByRegion(region), type);
        this.region = region;
    }

    public getProgress() {
        return Math.min(new Set(App.game.party.caughtPokemon.filter(p => p.id > 0 && PokemonHelper.calcNativeRegion(p.name) === this.region).map(p => Math.floor(p.id))).size, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
