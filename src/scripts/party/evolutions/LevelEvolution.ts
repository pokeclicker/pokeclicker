///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class LevelEvolution extends Evolution {

    level: number;

    constructor(basePokemon: string, evolvedPokemon: string, level: number) {
        super(basePokemon, evolvedPokemon, EvolutionType.Level);
        this.level = level;
    }

    isSatisfied() : boolean{
        return App.game.party.getPokemon(PokemonHelper.getPokemonByName(this.basePokemon).id).levelObservable() >= this.level;
    }
}
