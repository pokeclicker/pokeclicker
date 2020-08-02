///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class LevelEvolution extends Evolution {

    level: number;
    evolvedPokemon: string
    triggered: boolean;

    constructor(basePokemon: string, evolvedPokemon: string, level: number) {
        super(basePokemon);
        this.evolvedPokemon = evolvedPokemon;
        this.level = level;
        this.type.push(EvolutionType.Level);
    }

    getEvolvedPokemon(): string {
        return this.evolvedPokemon;
    }

    isSatisfied(): boolean {
        return super.isSatisfied()
            // Check high enough level
            && App.game.party.getPokemon(PokemonHelper.getPokemonByName(this.basePokemon).id).level >= this.level;
    }

    evolve(): boolean {
        if (this.triggered) {
            return false;
        }
        this.triggered = true;

        // We have already obtained the evolution
        if (App.game.party.alreadyCaughtPokemonByName(this.getEvolvedPokemon())) {
            return false;
        }

        return super.evolve(true);
    }
}
