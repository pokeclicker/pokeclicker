class PartyController {

    static getCaughtStatus(id: number): CaughtStatus {
        if (App.game.party.alreadyCaughtPokemon(id, true)) {
            return CaughtStatus.CaughtShiny;
        }

        if (App.game.party.alreadyCaughtPokemon(id, false)) {
            return CaughtStatus.Caught;
        }

        return CaughtStatus.NotCaught
    }

    // TODO implement
    // public static sortedPokemonList(): KnockoutComputed<Array<PartyPokemon>> {
    //     return ko.pureComputed(function () {
    //         return this._caughtPokemonList().sort(PokemonHelper.compareBy(GameConstants.SortOptionsEnum[player._sortOption()], player._sortDescending()));
    //     }, this).extend({rateLimit: 1000})
    // }
    //
    // public maxLevelPokemonList(): KnockoutComputed<Array<PartyPokemon>> {
    //     return ko.pureComputed(function () {
    //         return this._caughtPokemonList().filter((pokemon) => {
    //             return pokemon.levelObservable() == 100 && !pokemon.breeding();
    //         })
    //     }, this)
    // }

}
