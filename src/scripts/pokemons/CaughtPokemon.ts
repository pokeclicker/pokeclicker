/**
 * Created by dennis on 26-06-17.
 */
class CaughtPokemon {
    name: string;
    evolved: boolean;
    attackBonus: number;
    exp: number;
    levelObservable: KnockoutComputed<number>

    constructor(nm: string, ev: boolean, atBo: number, xp: number) {
        this.name = nm;
        this.evolved = ev;
        this.attackBonus = atBo;
        this.exp = xp;
        this.levelObservable = ko.computed(() => {return PokemonHelper.calculateLevel(this)});
    }
}
