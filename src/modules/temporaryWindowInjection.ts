// TODO: Remove temporary code after all code in ../scripts has been ported.
// This is only here so that the code in ../scripts can use the new functionality

import SaveSelector from './SaveSelector';
import Profile from './profile/Profile';
import DataStore from './DataStore';
import * as GameConstants from './GameConstants';
import GameHelper from './GameHelper';
import LogEvent from './LogEvent';
import BadgeEnums from './enums/Badges';
import PokemonType from './enums/PokemonType';
import ItemType from './enums/ItemType';
import BooleanSetting from './settings/BooleanSetting';
import RangeSetting from './settings/RangeSetting';
import Setting from './settings/Setting';
import SettingOption from './settings/SettingOption';
import WeatherType from './weather/WeatherType';
import Weather from './weather/Weather';
import SeededRand from './utilities/SeededRand';
import Rand from './utilities/Rand';
import Settings from './settings/index';
import { SortOptionConfigs, SortOptions } from './settings/SortOptions';
import NotificationConstants from './notifications/NotificationConstants';
import Notifier from './notifications/Notifier';
import LogBook from './logbook/LogBook';
import { LogBookTypes } from './logbook/LogBookTypes';
import ChangelogItems from './changelog/ChangelogItems';
import RedeemableCode from './codes/RedeemableCode';
import EggType from './breeding/EggType';
import Multiplier from './multiplier/Multiplier';
import MultiplierType from './multiplier/MultiplierType';
import SpecialEvent from './specialEvents/SpecialEvent';
import Challenges from './challenges/Challenges';
import LevelType, { levelRequirements } from './party/LevelType';
import WalletClasses from './wallet/inject';
import GenericProxy from './utilities/GenericProxy';
import Credits from './Credits';

Object.assign(<any>window, {
    SaveSelector,
    Profile,
    GameConstants,
    GameHelper,
    LogEvent,
    DataStore,
    BadgeCase: DataStore.badge,
    Statistics: DataStore.statistics,
    BadgeEnums,
    PokemonType,
    ItemType,
    BooleanSetting,
    RangeSetting,
    Setting,
    SettingOption,
    WeatherType,
    Weather,
    SeededRand,
    Rand,
    Settings,
    NotificationConstants,
    Notifier,
    SortOptionConfigs,
    SortOptions,
    LogBook,
    LogBookTypes,
    ChangelogItems,
    RedeemableCode,
    EggType,
    Multiplier,
    MultiplierType,
    SpecialEvent,
    Challenges,
    LevelType,
    levelRequirements,
    ...WalletClasses,
    GenericProxy,
    Credits,
});
