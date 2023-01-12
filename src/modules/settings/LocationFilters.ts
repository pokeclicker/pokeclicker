import LocationType from '../enums/LocationType';
import { Region } from '../GameConstants';
import SettingOption from './SettingOption';
import Settings from './Settings';
import FilterOption from './FilterOption';
import GameHelper from '../GameHelper';

const LocationFilters: Record<string, FilterOption> = {
    name: new FilterOption<string>(
        'Search',
        ko.observable(''),
        'LocationNameFilter',
    ),
    region: new FilterOption<Region>(
        'Region',
        ko.observable(null),
        'LocationRegionFilter',
        [
            new SettingOption('All', null),
            ...Settings.selectOptionsToSettingOptions(
                GameHelper.enumSelectOption(Region).filter(
                    (opt) => !['none', 'final'].includes(opt.name),
                ),
            ),
        ],
    ),
    // subregion: new FilterOption<SubRegionsType>(
    //     'Sub-Region',
    //     ko.observable(null),
    //     'LocationSubRegionFilter',
    //     [
    //         new SettingOption('All', null),
    //         ...Settings.selectOptionsToSettingOptions(
    //             GameHelper.enumSelectOption(SubRegions.getSubRegions(???)).filter((opt) => !['none', 'final'].includes(opt.name)),
    //         ),
    //     ],
    // ),
    type: new FilterOption<LocationType>(
        'Type',
        ko.observable(null),
        'LocationTypeFilter',
        [
            new SettingOption('All', null),
            ...Settings.selectOptionsToSettingOptions(
                GameHelper.enumSelectOption(LocationType),
            ),
        ],
    ),
};

export default LocationFilters;
