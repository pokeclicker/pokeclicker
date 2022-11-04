enum EvoTrigger {
    LEVEL,
    STONE,
}

interface EvoData {
    basePokemon: PokemonNameType;
    evolvedPokemon: PokemonNameType;
    trigger: EvoTrigger;
    restrictions: Array<() => boolean>;
}

interface StoneEvoData extends EvoData {
    stone: GameConstants.StoneType;
}

class Evolver {
    static isSatisfied(data: EvoData): boolean {
        return data.restrictions.every(fn => fn());
    }

    static evolve(data: EvoData) {
        App.game.party.getPokemonByName(data.evolvedPokemon);
    }
}

const Evo = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, trigger: EvoTrigger): EvoData => ({
    basePokemon,
    evolvedPokemon,
    trigger,
    restrictions: [() => PokemonHelper.calcNativeRegion(this.getEvolvedPokemon()) <= player.highestRegion()],
});

const restrict = (evo: EvoData, ...restrictions: EvoData['restrictions']) => {
    evo.restrictions.concat(restrictions);
    return evo;
};

const LevelEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, level: number): EvoData => restrict(
    Evo(basePokemon, evolvedPokemon, EvoTrigger.LEVEL),
    () => App.game.party.getPokemon(PokemonHelper.getPokemonByName(basePokemon).id).level >= level
);

const StoneEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, stone: GameConstants.StoneType): StoneEvoData => ({
    ...Evo(basePokemon, evolvedPokemon, EvoTrigger.STONE),
    stone,
});
