/// <reference path="Player.ts"/>

class PlayerView {
    money: KnockoutObservable<number>;
    clickAttack : KnockoutObservable<number>;
    pokemonAttack : KnockoutObservable<number>;

    constructor(money: number, clickAttack : number, pokemonAttack: number) {
        this.money = ko.observable(money);
        this.clickAttack = ko.observable(clickAttack);
        this.pokemonAttack = ko.observable(pokemonAttack);
    }
}

$(document).ready(function () {
    ko.applyBindings(new PlayerView(Player.money, Player.calculateClickAttack(), Player.calculatePokemonAttack(Battle.enemyPokemon.type1, Battle.enemyPokemon.type2)));
});
