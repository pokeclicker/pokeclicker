/**
 * Created by dennis on 26-06-17.
 */
class CaughtPokemon {
    id: number;
    name: string;
    baseAttack: number;
    attack: KnockoutComputed<number>;
    evolved: boolean;
    attackBonus: KnockoutObservable<number>;
    exp: KnockoutObservable<number>;
    levelObservable: KnockoutComputed<number>;
    evolver: KnockoutSubscription;
    breeding: KnockoutObservable<boolean>;

    constructor(pokemonData: DataPokemon, ev: boolean, atBo: number, xp: number, breeding: boolean = false) {
        this.id = pokemonData.id;
        this.name = pokemonData.name;
        this.evolved = ev;
        this.attackBonus = ko.observable(atBo);
        this.exp = ko.observable(xp);
        this.levelObservable = ko.computed(() => {
            return PokemonHelper.calculateLevel(this);
        });
        this.baseAttack = pokemonData.attack;
        this.attack = ko.computed(() => {
            return PokemonHelper.calculateAttack(this.baseAttack, this.attackBonus(), this.levelObservable());
        });

        this.breeding = ko.observable(breeding);
        if (pokemonData.evoLevel && !this.evolved) {
            this.evolver = this.levelObservable.subscribe(() => {
                if (this.levelObservable() >= pokemonData.evoLevel) {
                    Notifier.notify("Your " + pokemonData.name + " has evolved into a " + pokemonData.evolution, GameConstants.NotificationOption.success);
                    player.capturePokemon(pokemonData.evolution, false, true);
                    player.caughtAmount[pokemonData.id](player._caughtAmount[pokemonData.id]() + 1);
                    this.evolved = true;
                    this.evolver.dispose();
                }
            });
        }
    }

    public toJSON() {
        let keep, plainJS;
        keep = ["name", "evolved", "attackBonus", "exp", "breeding"];
        plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep);
    }
}
