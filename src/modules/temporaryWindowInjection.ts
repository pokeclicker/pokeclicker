// TODO: Remove temporary code after all code in ../scripts has been ported.
// This is only here so that the code in ../scripts can use the new functionality

import DataStore from './DataStore';
import * as GameConstants from './GameConstants';
import GameHelper from './GameHelper';
import BadgeEnums from './enums/Badges';
import PokemonType from './enums/PokemonType';
import BooleanSetting from './settings/BooleanSetting';
import RangeSetting from './settings/RangeSetting';
import Setting from './settings/Setting';
import SettingOption from './settings/SettingOption';
import WeatherType from './weather/WeatherType';
import Weather from './weather/Weather';
import SeededRand from './utilities/SeededRand';

Object.assign(<any>window, {
    GameConstants,
    GameHelper,
    DataStore,
    BadgeCase: DataStore.badge,
    Statistics: DataStore.statistics,
    BadgeEnums,
    PokemonType,
    BooleanSetting,
    RangeSetting,
    Setting,
    SettingOption,
    WeatherType,
    Weather,
    SeededRand,
});
