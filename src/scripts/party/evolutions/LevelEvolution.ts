///<reference path="Evolution.ts"/>
class LevelEvolution extends Evolution {
    triggered: boolean;

    constructor(
        basePokemon: PokemonNameType,
        public evolvedPokemon: PokemonNameType,
        public level: number
    ) {
        super(basePokemon);
        this.type.push(EvolutionType.Level);
    }

    getEvolvedPokemon(): PokemonNameType {
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
