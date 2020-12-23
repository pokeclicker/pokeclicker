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
import Settings from './settings/index';
import { SortOptionConfigs, SortOptions } from './settings/SortOptions';
import NotificationConstants from './notifications/NotificationConstants';
import Notifier from './notifications/Notifier';
import LogBook from './logbook/LogBook';
import { LogBookTypes } from './logbook/LogBookTypes';
import ChangelogItems from './changelog/ChangelogItems';
import Amount from './wallet/Amount';
import AmountFactory from './wallet/AmountFactory';

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
    Settings,
    NotificationConstants,
    Notifier,
    SortOptionConfigs,
    SortOptions,
    LogBook,
    LogBookTypes,
    ChangelogItems,
    Amount,
    AmountFactory,
});
