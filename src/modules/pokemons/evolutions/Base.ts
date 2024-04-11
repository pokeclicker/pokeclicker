import { StoneType } from '../../GameConstants';
import LazyRequirementWrapper from '../../requirements/LazyRequirementWrapper';
import MaxRegionRequirement from '../../requirements/MaxRegionRequirement';
import ObtainedPokemonRequirement from '../../requirements/ObtainedPokemonRequirement';
import PokemonLevelRequirement from '../../requirements/PokemonLevelRequirement';
import Requirement from '../../requirements/Requirement';
import HeldItemRequirement from '../../requirements/HeldItemRequirement';
import { calcNativeRegion } from '../PokemonHelper';
import { PokemonNameType } from '../PokemonNameType';

export enum EvoTrigger {
    NONE,
    LEVEL,
    STONE,
}

export interface EvoData {
    basePokemon: PokemonNameType;
    evolvedPokemon: PokemonNameType;
    trigger: EvoTrigger;
    restrictions: Array<Requirement>;
    ignoreECChange: boolean;
}

export interface DummyEvoData extends EvoData {
}

export interface LevelEvoData extends EvoData {
}

export interface StoneEvoData extends EvoData {
    stone: StoneType;
}

export const beforeEvolve: Partial<Record<EvoTrigger, (data: EvoData) => boolean>> = {
    [EvoTrigger.LEVEL]: () => true,
};

export const Evo = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, trigger: EvoTrigger, ignoreECChange): EvoData => ({
    basePokemon,
    evolvedPokemon,
    trigger,
    restrictions: [
        new ObtainedPokemonRequirement(basePokemon),
        new LazyRequirementWrapper(
            // wrapping because pokemonMap is needed to calcNativeRegion,
            // but we use Evos while making pokemonMap...
            // wrapping here delays execution until later, after pokemon is available
            () => new MaxRegionRequirement(calcNativeRegion(evolvedPokemon)),
        ),
    ],
    ignoreECChange,
});

export const restrict = <T extends EvoData>(evo: T, ...restrictions: EvoData['restrictions']): T => {
    evo.restrictions.push(...restrictions);
    return evo;
};

export const DummyEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType): DummyEvoData => ({
    ...Evo(basePokemon, evolvedPokemon, EvoTrigger.NONE, false),
});

export const LevelEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, level: number, ignoreECChange = false): LevelEvoData => restrict(
    { ...Evo(basePokemon, evolvedPokemon, EvoTrigger.LEVEL, ignoreECChange) },
    new PokemonLevelRequirement(basePokemon, level),
    new ObtainedPokemonRequirement(evolvedPokemon, true),
    new HeldItemRequirement(basePokemon, 'Everstone', false),
);

export const StoneEvolution = (basePokemon: PokemonNameType, evolvedPokemon: PokemonNameType, stone: StoneType, ignoreECChange = false): StoneEvoData => restrict(
    { ...Evo(basePokemon, evolvedPokemon, EvoTrigger.STONE, ignoreECChange), stone },
    new HeldItemRequirement(basePokemon, 'Everstone', false),
);
