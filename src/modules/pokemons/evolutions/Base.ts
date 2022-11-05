import { Observable as KnockoutObservable } from 'knockout';
import { StoneType } from '../../GameConstants';
import { calcNativeRegion } from '../PokemonHelper';
import { PokemonNameType } from '../PokemonNameType';

export enum EvoTrigger {
    LEVEL,
    STONE,
}

export interface EvoData {
    basePokemon: PokemonNameType;
    evolvedPokemon: PokemonNameType;
    trigger: EvoTrigger;
    restrictions: Array<() => boolean>;
}

export interface LevelEvoData extends EvoData {
    triggered: KnockoutObservable<boolean>;
}

export interface StoneEvoData extends EvoData {
    stone: StoneType;
}

export const beforeEvolve: Partial<Record<EvoTrigger, (data: EvoData) => boolean>> = {
    [EvoTrigger.LEVEL]: (data: LevelEvoData) => {
        data.triggered(true);
        return true;
    },
};

export const Evo = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, trigger: EvoTrigger): EvoData => ({
    basePokemon,
    evolvedPokemon,
    trigger,
    restrictions: [() => calcNativeRegion(evolvedPokemon) <= player.highestRegion()],
});

export const restrict = <T extends EvoData>(evo: T, ...restrictions: EvoData['restrictions']): T => {
    evo.restrictions.push(...restrictions);
    return evo;
};

export const LevelEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, level: number): LevelEvoData => {
    const triggered = ko.observable(false);
    return restrict(
        { ...Evo(basePokemon, evolvedPokemon, EvoTrigger.LEVEL), triggered },
        () => !triggered(),
        () => App.game.party.getPokemonByName(basePokemon).level >= level,
        () => !App.game.party.alreadyCaughtPokemonByName(evolvedPokemon),
    );
};

export const StoneEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, stone: StoneType): StoneEvoData => ({
    ...Evo(basePokemon, evolvedPokemon, EvoTrigger.STONE),
    stone,
});
