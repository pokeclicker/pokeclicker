class BattleFrontierMilestonePokemon extends BattleFrontierMilestone {
    pokemonName: string;

    constructor (stage: number, pokemonName: string, image: string) {
        super(stage, () => {
            App.game.party.gainPokemonById(pokemonMap[pokemonName].id);
        }, image);

        this.pokemonName = pokemonName;
    }

    get description() {
        return this.pokemonName;
    }
}
