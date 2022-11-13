import { BREEDING_ATTACK_BONUS } from '../GameConstants';
import { pokemonMap } from '../pokemons/PokemonList';
import Settings from './Settings';

export enum SortOptions {
    id = 0,
    name = 1,
    attack = 2,
    level = 3,
    shiny = 4,
    baseAttack = 5,
    breedingEfficiency = 6,
    eggCycles = 7,
    timesHatched = 8,
    category = 9,
    proteinsUsed = 10,
    evs = 11,
}

export type SortOptionConfig = {
    // Display text in sort dropdown
    text: string;

    // How to get the comparison value from a PartyPokemon
    // TODO: type this p as a PartyPokemon when it is available as a module
    getValue: (p) => any;

    // true if the default sort direction should be descending
    invert?: boolean;
};

export const SortOptionConfigs: Record<SortOptions, SortOptionConfig> = {
    [SortOptions.id]: {
        text: 'Pokémon #',
        getValue: (p) => p.id,
    },

    [SortOptions.name]: {
        text: 'Name',
        getValue: (p) => p.displayName,
    },

    [SortOptions.attack]: {
        text: 'Attack',
        getValue: (p) => p.attack,
    },

    [SortOptions.level]: {
        text: 'Level',
        getValue: (p) => p.level,
    },

    [SortOptions.shiny]: {
        text: 'Shiny',
        getValue: (p) => p.shiny,
    },

    [SortOptions.baseAttack]: {
        text: 'Base Attack',
        getValue: (p) => p.baseAttack,
    },

    [SortOptions.breedingEfficiency]: {
        text: 'Breeding Efficiency',
        getValue: (p) => (
            (
                (p.baseAttack * (BREEDING_ATTACK_BONUS / 100) + p.proteinsUsed())
            * (Settings.getSetting('breedingIncludeEVBonus').observableValue() ? p.calculateEVAttackBonus() : 1))
            / pokemonMap[p.name].eggCycles),
    },

    [SortOptions.eggCycles]: {
        text: 'Egg Steps',
        getValue: (p) => pokemonMap[p.name].eggCycles,
    },

    [SortOptions.timesHatched]: {
        text: 'Times Hatched',
        getValue: (p) => App.game.statistics.pokemonHatched[p.id]() || 0,
    },

    [SortOptions.category]: {
        text: 'Category',
        getValue: (p) => p.category,
        invert: true,
    },

    [SortOptions.proteinsUsed]: {
        text: 'Proteins Used',
        getValue: (p) => p.proteinsUsed() || 0,
    },

    [SortOptions.evs]: {
        text: 'EVs',
        getValue: (p) => p.evs() || 0,
    },
};
