import PokemonType from '../enums/PokemonType';
import { Region } from '../GameConstants';
import FilterOption from './FilterOption';
import SettingOption from './SettingOption';
import Settings from './Settings';

const ProteinFilters: Record<string, FilterOption> = {
    search: new FilterOption<RegExp>(
        'Search',
        ko.observable(new RegExp('', 'i')),
    ),
    type: new FilterOption<number>(
        'Type',
        ko.observable(-2).extend({ numeric: 0 }),
        'proteinTypeFilter',
        [
            new SettingOption('All', '-2'),
            ...Settings.enumToSettingOptionArray(PokemonType, (t) => t !== 'None')],
    ),
    region: new FilterOption<number>(
        'Region',
        ko.observable(-2).extend({ numeric: 0 }),
        'proteinRegionFilter',
        [
            new SettingOption('All', '-2'),
            ...Settings.enumToSettingOptionArray(Region, (t) => t !== 'None')],
    ),
};

export default ProteinFilters;
