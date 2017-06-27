///<reference path="gymPokemon.ts"/>
///<reference path="../pokemons/pokemonFactory.ts"/>

import PokemonType = gameConstants.PokemonType;
class gym {
    leaderName: string;
    town: string;
    pokemons: gymPokemon[];
    badgeReward: string;
    moneyReward: number;
    badgeReq: number;


    constructor(leaderName: string, town: string, pokemons: gymPokemon[], badgeReward: string, moneyReward: number, badgeReq: number) {
        this.leaderName = leaderName;
        this.town = town;
        this.pokemons = pokemons;
        this.badgeReward = badgeReward;
        this.moneyReward = moneyReward;
        this.badgeReq = badgeReq;
    }
}

const gymList: { [townName: string]: gym } = {};
gymList["Pewter City"] = new gym(
    "Brock",
    "Pewter City",
    [new gymPokemon("Geodude", 550, 12),
        new gymPokemon("Onix", 1110, 14)],
    "Boulder",
    250,
    0);

console.log(pokemonFactory.generateGymPokemon("Pewter City", 0));
