///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class LevelEvolution extends Evolution {

    level: number;
    triggered: boolean;


    constructor(basePokemon: string, evolvedPokemon: string, level: number) {
        super(basePokemon, evolvedPokemon, EvolutionType.Level);
        this.level = level;
    }

    isSatisfied(): boolean {
        return App.game.party.getPokemon(PokemonHelper.getPokemonByName(this.basePokemon).id).level >= this.level;
    }

    evolve(): boolean {
        if (this.triggered) {
            return false;
        }
        this.triggered = true;

        // We have already obtained the evolution
        if (App.game.party.alreadyCaughtPokemonByName(this.evolvedPokemon)) {
            return false;
        }

        return super.evolve(true);
    }
}
