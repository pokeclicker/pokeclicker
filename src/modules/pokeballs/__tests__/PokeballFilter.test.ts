import { Pokerus } from '../../GameConstants';
import EncounterType from '../../enums/EncounterType';
import PokemonType from '../../enums/PokemonType';
import PokeballFilter from '../PokeballFilter';

describe('Test PokeballFilter', () => {
    const stubTranslator = (key: string, namespace: string) => `(${namespace})${key}`;

    it.each([
        { enabled: false },
        { enabled: true },
    ])('tooltipDescription - return "all catch" filter description with "enabled" set to $enabled', ({ enabled }) => {
        // Arrange
        const data = new PokeballFilter('some filter', {}, undefined, enabled);

        const expectedResult = enabled
            ? '(modules)pokeball.tooltip.filters.all'
            : '(modules)pokeball.tooltip.filters.disabled'
            + '<br/><br/>'
            + '(modules)pokeball.tooltip.filters.all';

        // Act
        const result = PokeballFilter.tooltipDescription(data, stubTranslator);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it.each(Array.from({ length: 2 * 2 * 2 }).map((_, i) => ({
        enabled: !!(Math.round(i / 4)),
        inverted: !!(Math.round(i / 2) % 2),
        value: !!(i % 2),
    })))('tooltipDescription - return "boolean" filter description as "$value" with inverted set to "$inverted" and "enabled" set to "$enabled"', ({ enabled, inverted, value }) => {
        // Arrange
        const data = new PokeballFilter('some filter', {
            shiny: value,
            shadow: value,
            caught: value,
            caughtShiny: value,
            caughtShadow: value,
        }, undefined, enabled, inverted);

        let expectedResult = '';
        expectedResult += enabled ? '' : '(modules)pokeball.tooltip.filters.disabled<br/><br/>';
        expectedResult += `(modules)pokeball.tooltip.filters.${inverted ? 'affectWithoutTraits' : 'affectWithTraits'}`;
        expectedResult += '<ul class="pokeballFilterOptionDescriptions">';
        expectedResult += `<li>(modules)pokeball.filters.shiny.description${value ? '' : '.negative'}</li>`;
        expectedResult += `<li>(modules)pokeball.filters.shadow.description${value ? '' : '.negative'}</li>`;
        expectedResult += `<li>(modules)pokeball.filters.caught.description${value ? '' : '.negative'}</li>`;
        expectedResult += `<li>(modules)pokeball.filters.caughtShiny.description${value ? '' : '.negative'}</li>`;
        expectedResult += `<li>(modules)pokeball.filters.caughtShadow.description${value ? '' : '.negative'}</li>`;
        expectedResult += '</ul>';

        // Act
        const result = PokeballFilter.tooltipDescription(data, stubTranslator);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it.each(Array.from({ length: 2 * 2 * 4 }).map((_, i) => ({
        enabled: !!(Math.round(i / 8)),
        inverted: !!(Math.round(i / 4) % 2),
        value: Pokerus[i % 4],
    })))('tooltipDescription - return "pokerus" filter description as $value with inverted set to "$inverted" and "enabled" set to "$enabled"', ({ enabled, inverted, value }) => {
        // Arrange
        const data = new PokeballFilter('some filter', {
            pokerus: Pokerus[value],
        }, undefined, enabled, inverted);

        let expectedResult = '';
        expectedResult += enabled ? '' : '(modules)pokeball.tooltip.filters.disabled<br/><br/>';
        expectedResult += `(modules)pokeball.tooltip.filters.${inverted ? 'affectWithoutTraits' : 'affectWithTraits'}`;
        expectedResult += '<ul class="pokeballFilterOptionDescriptions">';
        expectedResult += `<li>(modules)pokeball.filters.pokerus.description (constants)pokerus.${value}</li>`;
        expectedResult += '</ul>';

        // Act
        const result = PokeballFilter.tooltipDescription(data, stubTranslator);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it.each(Array.from({ length: 2 * 2 }).map((_, i) => ({
        enabled: !!(Math.round(i / 2) % 2),
        inverted: !!(i % 2),
    })))('tooltipDescription - return "pokemonType" filter description as \'None\' with inverted set to "$inverted" and "enabled" set to "$enabled"', ({ enabled, inverted }) => {
        // Arrange
        const data = new PokeballFilter('some filter', {
            pokemonType: PokemonType.None,
        }, undefined, enabled, inverted);

        let expectedResult = '';
        expectedResult += enabled ? '' : '(modules)pokeball.tooltip.filters.disabled<br/><br/>';
        expectedResult += `(modules)pokeball.tooltip.filters.${inverted ? 'affectWithoutTraits' : 'affectWithTraits'}`;
        expectedResult += '<ul class="pokeballFilterOptionDescriptions">';
        expectedResult += '<li>(modules)pokeball.filters.pokemonType.description (constants)pokemonType.None</li>';
        expectedResult += '</ul>';

        // Act
        const result = PokeballFilter.tooltipDescription(data, stubTranslator);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it.each(Array.from({ length: 2 * 2 * 18 }).map((_, i) => ({
        enabled: !!(Math.round(i / 36)),
        inverted: !!(Math.round(i / 18) % 2),
        value: PokemonType[i % 18],
    })))('tooltipDescription - return "pokemonType" filter description as $value with inverted set to "$inverted" and "enabled" set to "$enabled"', ({ enabled, inverted, value }) => {
        // Arrange
        const data = new PokeballFilter('some filter', {
            pokemonType: PokemonType[value],
        }, undefined, enabled, inverted);

        let expectedResult = '';
        expectedResult += enabled ? '' : '(modules)pokeball.tooltip.filters.disabled<br/><br/>';
        expectedResult += `(modules)pokeball.tooltip.filters.${inverted ? 'affectWithoutTraits' : 'affectWithTraits'}`;
        expectedResult += '<ul class="pokeballFilterOptionDescriptions">';
        expectedResult += `<li>(modules)pokeball.filters.pokemonType.description (constants)pokemonType.${value}</li>`;
        expectedResult += '</ul>';

        // Act
        const result = PokeballFilter.tooltipDescription(data, stubTranslator);

        // Assert
        expect(result).toEqual(expectedResult);
    });

    it.each(Array.from({ length: 2 * 2 * 8 }).map((_, i) => ({
        enabled: !!(Math.round(i / 16)),
        inverted: !!(Math.round(i / 8) % 2),
        key: Object.keys(EncounterType)[i % 8],
    })))('tooltipDescription - return "encounterType" filter description at key $key with inverted set to "$inverted" and "enabled" set to "$enabled"', ({ enabled, inverted, key }) => {
        // Arrange
        const data = new PokeballFilter('some filter', {
            encounterType: EncounterType[key],
        }, undefined, enabled, inverted);

        const value = EncounterType[key].replace(/\s/g, '');
        let expectedResult = '';
        expectedResult += enabled ? '' : '(modules)pokeball.tooltip.filters.disabled<br/><br/>';
        expectedResult += `(modules)pokeball.tooltip.filters.${inverted ? 'affectWithoutTraits' : 'affectWithTraits'}`;
        expectedResult += '<ul class="pokeballFilterOptionDescriptions">';
        expectedResult += `<li>(modules)pokeball.filters.encounterType.description (constants)encounterType.${value}</li>`;
        expectedResult += '</ul>';

        // Act
        const result = PokeballFilter.tooltipDescription(data, stubTranslator);

        // Assert
        expect(result).toEqual(expectedResult);
    });
});
