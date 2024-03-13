import '../koExtenders';
import PokemonType from '../enums/PokemonType';
import { Pokerus, Region } from '../GameConstants';
import SettingOption from './SettingOption';
import Settings from './Settings';
import FilterOption from './FilterOption';
import GameHelper from '../GameHelper';

const PokedexFilters: Record<string, FilterOption> = {
    name: new FilterOption<RegExp>(
        'Search',
        ko.observable(new RegExp('', 'i')),
    ),
    id: new FilterOption<number>(
        'SearchID',
        ko.observable(-1),
    ),
    region: new FilterOption<Region>(
        'Region',
        ko.observable(null),
        'pokedexRegionFilter',
        [
            new SettingOption('All', null),
            ...Settings.selectOptionsToSettingOptions(
                GameHelper.enumSelectOption(Region).filter((opt) => !['none', 'final'].includes(opt.name)),
            ),
        ],
    ),
    type1: new FilterOption<PokemonType>(
        'Type 1',
        ko.observable(null),
        'pokedexType1Filter',
        [
            new SettingOption('All', null),
            ...Settings.selectOptionsToSettingOptions(
                GameHelper.enumSelectOption(PokemonType).filter((opt) => opt.name !== 'None'),
            ),
            new SettingOption('None', PokemonType.None),
        ],
    ),
    type2: new FilterOption<PokemonType>(
        'Type 2',
        ko.observable(null),
        'pokedexType2Filter',
        [
            new SettingOption('All', null),
            ...Settings.selectOptionsToSettingOptions(
                GameHelper.enumSelectOption(PokemonType).filter((opt) => opt.name !== 'None'),
            ),
            new SettingOption('None', PokemonType.None),
        ],
    ),
    caughtShiny: new FilterOption<string>(
        'Caught Status',
        ko.observable('all'),
        'pokedexShinyFilter',
        [
            new SettingOption('All', 'all'),
            new SettingOption('Uncaught', 'uncaught'),
            new SettingOption('Caught', 'caught'),
            new SettingOption('Caught Not Shiny', 'caught-not-shiny'),
            new SettingOption('Caught Shiny', 'caught-shiny'),
            new SettingOption('Caught Not Shadow', 'caught-not-shadow'),
            new SettingOption('Caught Shadow', 'caught-shadow'),
            new SettingOption('Caught Purified', 'caught-purified'),
        ],
    ),
    statusPokerus: new FilterOption<number>(
        'Pokerus',
        ko.observable(-1).extend({ numeric: 0 }),
        'pokedexPokerusFilter',
        [
            new SettingOption('All', -1),
            ...Settings.enumToNumberSettingOptionArray(Pokerus, (t) => t !== 'Infected'),
        ],
    ),
    category: new FilterOption<number>(
        'Category',
        ko.observable(-1).extend({ numeric: 0 }),
        'pokedexCategoryFilter',
    ),
    uniqueTransformation: new FilterOption<string>(
        'Unique Transformations',
        ko.observable('all'),
        'pokedexUniqueTransformationFilter',
        [
            new SettingOption('Show All Pokémon', 'all'),
            new SettingOption('Mega Evolution/Primal Reversion Available', 'mega-available'),
            new SettingOption('Unobtained Mega Evolution/Primal Reversion', 'mega-unobtained'),
            new SettingOption('Obtained Mega Evolution/Primal Reversion', 'mega-evolution'),
        ],
    ),
    heldItem: new FilterOption<boolean>(
        'Rare Held Item',
        ko.observable(false),
        'pokedexHeldItemFilter',
    ),
    hideAlternate: new FilterOption<boolean>(
        'Hide alternate forms',
        ko.observable(false),
        'pokedexHideAltFilter',
    ),
};

export default PokedexFilters;
