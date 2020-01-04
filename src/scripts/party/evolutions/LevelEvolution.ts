///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class LevelEvolution extends Evolution {

    level: number;
    triggered: boolean;


    constructor(basePokemon: string, evolvedPokemon: string, level: number) {
        super(basePokemon, evolvedPokemon, EvolutionType.Level);
        this.level = level;
    }

    isSatisfied() : boolean{
        return App.game.party.getPokemon(PokemonHelper.getPokemonByName(this.basePokemon).id).levelObservable() >= this.level;
    }

    evolve(): boolean {
        if (this.triggered ){
            return;
        }
        this.triggered = true;
        return super.evolve(true);
    }
}
