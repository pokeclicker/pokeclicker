/**
 * Created by dennis on 26-06-17.
 */
class CaughtPokemon {
    id: KnockoutObservable<number>;
    name: string;
    evolved: boolean;
    attackBonus: number;
    exp: KnockoutObservable<number>;
    levelObservable: KnockoutComputed<number>;

    constructor(id : number, nm: string, ev: boolean, atBo: number, xp: number) {
        this.id = ko.observable(id);
        this.name = nm;
        this.evolved = ev;
        this.attackBonus = atBo;
        this.exp = ko.observable(xp);
        this.levelObservable = ko.computed(() => {return PokemonHelper.calculateLevel(this)});
    }
}

