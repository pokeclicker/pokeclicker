///<reference path="AchievementRequirement.ts"/>

class CaughtUniquePokemonsByRegionRequirement extends AchievementRequirement {
    private region: GameConstants.Region;
    constructor(region: GameConstants.Region, amount = 0, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(amount || PokemonHelper.calcUniquePokemonsByRegion(region), option, GameConstants.AchievementType['Caught Unique Pokemons By Region']);
        this.region = region;
    }

    public getProgress() {
        let result = 0;
        let currentPokemonThisRegion = false;
        let currentPokemonCaught = false;
        let lastPokemonBaseId = 0;

        // Counts each form once, and only if the baseform is native to this region
        App.game.party.caughtPokemon.sort((a, b) => a.id - b.id).forEach(pokemon => {
            if (pokemon.id < 0) {
                return false;
            }
            if (Math.floor(pokemon.id) !== lastPokemonBaseId) {
                currentPokemonCaught = false;
                if (Math.floor(pokemon.id) === pokemon.id) { // Baseform caught
                    currentPokemonThisRegion = PokemonHelper.calcNativeRegion(pokemon.name) === this.region;
                } else { // Baseform not caught. Find baseform elsewhere
                    currentPokemonThisRegion = PokemonHelper.calcNativeRegion(PokemonHelper.getPokemonById(Math.floor(pokemon.id)).name) === this.region;
                }
            }
            lastPokemonBaseId = Math.floor(pokemon.id);
            if (!currentPokemonThisRegion || currentPokemonCaught) {
                return false;
            }
            result++;
            currentPokemonCaught = true;
        });

        return Math.min(result, this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} unique Pokémon need to be caught.`;
    }
}
