/**
 * Created by dennis on 26-06-17.
 */
class CaughtPokemon  {
    name: string;
    evolved: boolean;
    attackBonus: number;
    exp: number;

    constructor(name: string, evolved: boolean, attackBonus: number, exp: number) {
        this.name = name;
        this.evolved = evolved;
        this.attackBonus = attackBonus;
        this.exp = exp;
    }
}