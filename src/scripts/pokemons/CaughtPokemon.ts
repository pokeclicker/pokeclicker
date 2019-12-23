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
    evoRegion: GameConstants.Region;

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
        this.evolver = {};
        this.checkForEvolution();
    }

    public toJSON() {
        let keep, plainJS;
        keep = ["name", "evolved", "attackBonus", "exp", "breeding"];
        plainJS = ko.toJS(this);
        return Save.filter(plainJS, keep);
    }

    public checkForEvolution(reset = false){
        // reset if pokemon has just hatched
        if (!!reset){
          this.evolved = false;
        }

        const pokemonData = pokemonMapId[this.id];

        // pokemon doesn't have an evolution, is already evolved, or currently breeding
        if (!pokemonData.evoLevel || this.evolved || this.breeding()){
          return;
        }

        pokemonData.evoLevel.forEach((evo, index)=>{
            if (evo.constructor === Number){
                if (this.evolver[index]){
                  this.evolver[index].dispose();
                }

                // Check if player has already caught all of the possible evolutions
                const obtainedAllEvolutions = reset ? !PokemonHelper.getPokemonByName(this.name).evolutionByIndex(index, true, true).some(p => !player.alreadyCaughtPokemon(p)) : false;

                if (obtainedAllEvolutions){
                  this.evolved = true;
                  return;
                }

                // Get evolutions for current region, else calculate a evolution for any region for when we reach that region
                const evolution = PokemonHelper.getPokemonByName(this.name).evolutionByIndex(index, true) || PokemonHelper.getPokemonByName(this.name).evolutionByIndex(index, false);
                const evoRegion = PokemonHelper.calcNativeRegion(evolution);
                this.evolver[index] = this.levelObservable.subscribe(() => {
                    if (this.levelObservable() >= evo && player.highestRegion() >= evoRegion) {
                        Notifier.notify("Your " + this.name + " has evolved into a " + evolution, GameConstants.NotificationOption.success);
                        player.capturePokemon(evolution, false, true);
                        player.caughtAmount[this.id](player._caughtAmount[this.id]() + 1);
                        this.evolved = true;
                        this.evolver[index].dispose();
                    }
                });
            }
        });
    }
}
