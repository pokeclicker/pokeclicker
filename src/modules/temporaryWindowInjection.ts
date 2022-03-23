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
import { SpriteCredits, CodeCredits } from './Credits';
import * as modalUtils from './utilities/Modal';
import PokemonCategories from './party/Category';
import Information from './utilities/Information';
import TypeHelper from './types/TypeHelper';
import Upgrade from './upgrades/Upgrade';
import ExpUpgrade from './upgrades/ExpUpgrade';
import OakItemType from './enums/OakItemType';
import OakItem from './oakItems/OakItem';
import OakItems from './oakItems/OakItems';
import BoughtOakItem from './oakItems/BoughtOakItem';
import OakItemController from './oakItems/OakItemController';
import OakItemLoadouts from './oakItems/OakItemLoadouts';
import SpecialRoutePokemon from './routes/SpecialRoutePokemon';
import RoutePokemon from './routes/RoutePokemon';
import RegionRoute from './routes/RegionRoute';
import Requirement from './requirements/Requirement';
import AchievementRequirement from './requirements/AchievementRequirement';
import NullRequirement from './requirements/NullRequirement';
import MultiRequirement from './requirements/MultiRequirement';
import OneFromManyRequirement from './requirements/OneFromManyRequirement';
import UndergroundItemsFoundRequirement from './requirements/UndergroundItemsFoundRequirement';
import UndergroundLayersMinedRequirement from './requirements/UndergroundLayersMinedRequirement';

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
    SpriteCredits,
    CodeCredits,
    modalUtils,
    PokemonCategories,
    Information,
    TypeHelper,
    Upgrade,
    ExpUpgrade,
    OakItemType,
    OakItem,
    OakItems,
    BoughtOakItem,
    OakItemController,
    OakItemLoadouts,
    SpecialRoutePokemon,
    RoutePokemon,
    RegionRoute,
    Requirement,
    AchievementRequirement,
    NullRequirement,
    MultiRequirement,
    OneFromManyRequirement,
    UndergroundItemsFoundRequirement,
    UndergroundLayersMinedRequirement,
});
