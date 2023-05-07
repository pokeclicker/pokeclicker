import PokemonType from '../enums/PokemonType';
import { Pokerus } from '../GameConstants';
import SettingOption from './SettingOption';
import Settings from './Settings';
import FilterOption from './FilterOption';
import GameHelper from '../GameHelper';

const BreedingFilters: Record<string, FilterOption> = {
    name: new FilterOption<RegExp>(
        'Search',
        ko.observable(new RegExp('', 'i')),
    ),
    id: new FilterOption<number>(
        'SearchID',
        ko.observable(-1),
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
        ko.observable(GameHelper.enumNumbers(PokemonType).filter(v => v !== PokemonType.None)),
        'breedingTypeFilter1',
        Settings.enumToNumberSettingOptionArray(PokemonType, (t) => t !== 'None'),
    ),
    type2: new FilterOption<number[]>(
        'Type 2',
        ko.observable(GameHelper.enumNumbers(PokemonType).filter(v => v !== PokemonType.None)),
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
            new SettingOption('Mega Evolution/Primal Reversion Available', 'mega-available'),
            new SettingOption('Unobtained Mega Evolution/Primal Reversion', 'mega-unobtained'),
            new SettingOption('Obtained Mega Evolution/Primal Reversion', 'mega-evolution'),
        ],
    ),
};

export default BreedingFilters;
