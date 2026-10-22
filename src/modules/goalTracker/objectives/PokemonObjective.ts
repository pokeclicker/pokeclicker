import { Observable } from 'knockout';
import { ObjectiveOption } from './ObjectiveTypes';
import { PokemonNameType } from '../../pokemons/PokemonNameType';
import { SortOptionConfigs, SortOptions } from '../../settings/SortOptions';
import { pokemonMap } from '../../pokemons/PokemonList';
import { camelCaseToString } from '../../GameConstants';

export interface PokemonObjectiveConfig {
    pokemon: Observable<PokemonNameType>;
    property: Observable<string>;
}

export const pokemonObjectiveOption: ObjectiveOption<PokemonObjectiveConfig> = {
    options: [
        {
            key: 'pokemon',
            label: 'Pokémon',
            searchable: true,
            values: () => {
                return [...App.game.party.caughtPokemon]
                    .sort((a, b) => a.id - b.id)
                    .map(p => ({ name: `#${Math.floor(p.id).toString().padStart(3, '0')} - ${p.displayName}`, value: p.name }));
            },
        },
        {
            key: 'property',
            label: 'Property',
            values: () => {
                const options = [SortOptions.attackMaxLevel, SortOptions.evs, SortOptions.evBonus]
                    .map((option) => ({ name: SortOptionConfigs[option].text, value: SortOptions[option] }));

                options.push(...[
                    { name: 'Total Encountered', value: 'pokemonEncountered' },
                    { name: 'Total Defeated', value: 'pokemonDefeated' },
                    { name: 'Total Captured', value: 'pokemonCaptured' },
                    { name: 'Total Hatched', value: 'pokemonHatched' },
                    { name: 'Total Shiny Encountered', value: 'shinyPokemonEncountered' },
                    { name: 'Total Shiny Defeated', value: 'shinyPokemonDefeated' },
                    { name: 'Total Shiny Captured', value: 'shinyPokemonCaptured' },
                    { name: 'Total Shiny Hatched', value: 'shinyPokemonHatched' },
                ]);

                return options;
            },
        },
    ],
    getProgress: (config: PokemonObjectiveConfig): number => {
        const pokemonName = config.pokemon?.();
        const property = config.property?.();

        if (!pokemonName || !property) return 0;

        const statistic = App.game.statistics[property];
        if (statistic) {
            const id = pokemonMap[pokemonName]?.id;
            if (id === undefined) return 0;
            return App.game.statistics[property][id]?.() ?? 0;
        }

        const partyPokemon = App.game.party.getPokemonByName(pokemonName);
        const sortOption = SortOptions[property];
        if (partyPokemon && sortOption !== undefined) {
            return SortOptionConfigs[sortOption].getValue(partyPokemon);
        }

        return 0;
    },
    createConfig: (): PokemonObjectiveConfig => ({ pokemon: ko.observable(), property: ko.observable() }),
    getDisplayName: (config: PokemonObjectiveConfig) => {
        const pokemon = config.pokemon();
        const property = config.property();

        if (!pokemon || !property) return 'Unconfigured Objective';

        const pokemonName = App.game.party.getPokemonByName(pokemon)?.displayName ?? pokemon;

        const sortOption = SortOptions[property];
        if (sortOption !== undefined) {
            const statLabel = SortOptionConfigs[sortOption].text;
            return `${pokemonName} - ${statLabel}`;
        }

        const isShiny = property.startsWith('shiny');
        const rawStatName = property.replace(/^(pokemon|shinyPokemon)/, '');
        return `${pokemonName} - Total ${isShiny ? 'Shiny ' : ''}${camelCaseToString(rawStatName)}`;
    },
};
