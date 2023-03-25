import PokemonType from '../enums/PokemonType';
import { Pokerus } from '../GameConstants';
import SettingOption from './SettingOption';
import Settings from './Settings';
import FilterOption from './FilterOption';

const BreedingFilters: Record<string, FilterOption> = {
    search: new FilterOption<RegExp>(
        'Search',
        ko.observable(new RegExp('', 'i')),
    ),
    category: new FilterOption<number>(
        'Category',
        ko.observable(-1).extend({ numeric: 0 }),
        'breedingCategoryFilter',
    ),
    shinyStatus: new FilterOption<number>(
        'Shiny Status',
        ko.observable(-1).extend({ numeric: 0 }),
        'breedingShinyFilter',
        [
            new SettingOption('All', '-1'),
            new SettingOption('Not Shiny', '0'),
            new SettingOption('Shiny', '1'),
        ],
    ),
    type1: new FilterOption<number[]>(
        'Type 1',
        ko.observable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]),
        'breedingTypeFilter1',
        Settings.enumToNumberSettingOptionArray(PokemonType, (t) => t !== 'None'),
    ),
    type2: new FilterOption<number[]>(
        'Type 2',
        ko.observable([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]),
        'breedingTypeFilter2',
        Settings.enumToNumberSettingOptionArray(PokemonType, (t) => t !== 'None'),
    ),
    region: new FilterOption<number>(
        'Region',
        ko.observable(1).extend({ numeric: 0 }),
        'breedingRegionFilter',
        [],
    ),
    pokerus: new FilterOption<number>(
        'Pokerus',
        ko.observable(-1).extend({ numeric: 0 }),
        'breedingPokerusFilter',
        [
            new SettingOption('All', '-1'),
            ...Settings.enumToSettingOptionArray(Pokerus, (t) => t !== 'Infected'),
        ],
    ),
    uniqueTransformation: new FilterOption<string>(
        'Unique Transformations',
        ko.observable('all'),
        'breedingUniqueTransformationFilter',
        [
            new SettingOption('Show All Pokémon', 'all'),
            new SettingOption('Mega Evolution Available', 'mega-available'),
            new SettingOption('Obtained Mega Evolution', 'mega-pokemon'),
        ],
    ),
};

export default BreedingFilters;
