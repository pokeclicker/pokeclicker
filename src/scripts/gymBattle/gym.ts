/**
 * Created by dennis on 26-06-17.
 */
class gym {
    leaderName: string;
    town: string;
    pokemons: battlePokemon[];
    badgeReward: string;
    moneyReward: number;
    badgeReq: number;


    constructor(leaderName: string, town: string, pokemons: battlePokemon[], badgeReward: string, moneyReward: number, badgeReq: number) {
        this.leaderName = leaderName;
        this.town = town;
        this.pokemons = pokemons;
        this.badgeReward = badgeReward;
        this.moneyReward = moneyReward;
        this.badgeReq = badgeReq;
    }
}

const gymList: { [townName: string]: gym } = {};
gymList["Pewter City"] = new gym("Brock", "Pewter City", null, "Boulder", 250, 0);