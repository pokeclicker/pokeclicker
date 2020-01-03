class PartyController {

    clickAttackObservable = ko.computed(function () {
        return App.game.party.calculateClickAttack()
    }, this);

    pokemonAttackObservable = ko.computed(function () {
        return App.game.party.calculatePokemonAttack(GameConstants.PokemonType.None, GameConstants.PokemonType.None);
    }, this);

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
