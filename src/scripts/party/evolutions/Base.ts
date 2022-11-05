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

interface LevelEvoData extends EvoData {
    triggered: KnockoutObservable<boolean>;
}

interface StoneEvoData extends EvoData {
    stone: GameConstants.StoneType;
}

const beforeEvolve: Partial<Record<EvoTrigger, (data: EvoData) => boolean>> = {
    [EvoTrigger.LEVEL]: (data: LevelEvoData) => {
        data.triggered(true);
        return true;
    },
};

const Evo = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, trigger: EvoTrigger): EvoData => ({
    basePokemon,
    evolvedPokemon,
    trigger,
    restrictions: [() => PokemonHelper.calcNativeRegion(evolvedPokemon) <= player.highestRegion()],
});

const restrict = <T extends EvoData>(evo: T, ...restrictions: EvoData['restrictions']): T => {
    evo.restrictions.push(...restrictions);
    return evo;
};

const LevelEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, level: number): LevelEvoData => {
    const triggered = ko.observable(false);
    return restrict(
        { ...Evo(basePokemon, evolvedPokemon, EvoTrigger.LEVEL), triggered },
        () => !triggered(),
        () => App.game.party.getPokemonByName(basePokemon).level >= level,
        () => !App.game.party.alreadyCaughtPokemonByName(evolvedPokemon)
    );
};

const StoneEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, stone: GameConstants.StoneType): StoneEvoData => ({
    ...Evo(basePokemon, evolvedPokemon, EvoTrigger.STONE),
    stone,
});
