///<reference path="Evolution.ts"/>
///<reference path="EvolutionType.ts"/>
class LevelEvolution extends Evolution {

    level: number;
    evolvedPokemon: string
    triggered: boolean;

    constructor(basePokemon: string, evolvedPokemon: string, level: number) {
        super(basePokemon, EvolutionType.Level);
        this.evolvedPokemon = evolvedPokemon;
        this.level = level;
    }

    getEvolvedPokemon(): string {
        return this.evolvedPokemon;
    }

    isSatisfied(): boolean {
        // Check if within region
        return PokemonHelper.calcNativeRegion(this.evolvedPokemon) <= player.highestRegion()
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
