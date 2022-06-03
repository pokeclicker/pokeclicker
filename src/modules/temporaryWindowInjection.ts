// TODO: Remove temporary code after all code in ../scripts has been ported.
// This is only here so that the code in ../scripts can use the new functionality

import SaveSelector from './SaveSelector';
import Profile from './profile/Profile';
import DataStore from './DataStore';
import * as GameConstants from './GameConstants';
import GameHelper from './GameHelper';
import LogEvent from './LogEvent';
// enums
import AuraType from './enums/AuraType';
import BadgeEnums from './enums/Badges';
import BerryColor from './enums/BerryColor';
import BerryType from './enums/BerryType';
import PokemonType from './enums/PokemonType';
import CaughtStatus from './enums/CaughtStatus';
import EvolutionType from './enums/EvolutionType';
import FarmNotificationType from './enums/FarmNotificationType';
import FlavorType from './enums/FlavorType';
import ItemType from './enums/ItemType';
import KeyItemType from './enums/KeyItemType';
import MulchType from './enums/MulchType';
import PlotStage from './enums/PlotStage';
// end enums
import BooleanSetting from './settings/BooleanSetting';
import RangeSetting from './settings/RangeSetting';
import Setting from './settings/Setting';
import SettingOption from './settings/SettingOption';
import WeatherType from './weather/WeatherType';
import Weather from './weather/Weather';
import SeededRand from './utilities/SeededRand';
import SeededDateRand from './utilities/SeededDateRand';
import Rand from './utilities/Rand';
import Settings from './settings/index';
import { SortOptionConfigs, SortOptions } from './settings/SortOptions';
import { AchievementSortOptionConfigs, AchievementSortOptions } from './achievements/AchievementSortOptions';
import NotificationConstants from './notifications/NotificationConstants';
import Notifier from './notifications/Notifier';
import LogBook from './logbook/LogBook';
import { LogBookTypes } from './logbook/LogBookTypes';
import ChangelogItems from './changelog/ChangelogItems';
import RedeemableCode from './codes/RedeemableCode';
import RedeemableCodes from './codes/RedeemableCodes';
import RedeemableCodeController from './codes/RedeemableCodeController';
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
import Routes from './routes/Routes';
import SubRegion from './subRegion/SubRegion';
import SubRegions, { AlolaSubRegions } from './subRegion/SubRegions';
import Requirement from './requirements/Requirement';
import AchievementRequirement from './requirements/AchievementRequirement';
import NullRequirement from './requirements/NullRequirement';
import MultiRequirement from './requirements/MultiRequirement';
import OneFromManyRequirement from './requirements/OneFromManyRequirement';
import AttackRequirement from './requirements/AttackRequirement';
import BattleFrontierHighestStageRequirement from './requirements/BattleFrontierHighestStageRequirement';
import BattleFrontierTotalStageRequirement from './requirements/BattleFrontierTotalStageRequirement';
import BerriesUnlockedRequirement from './requirements/BerriesUnlockedRequirement';
import CapturedRequirement from './requirements/CapturedRequirement';
import CaughtPokemonRequirement from './requirements/CaughtPokemonRequirement';
import ClearDungeonRequirement from './requirements/ClearDungeonRequirement';
import ClearGymRequirement from './requirements/ClearGymRequirement';
import ClickRequirement from './requirements/ClickRequirement';
import DefeatedRequirement from './requirements/DefeatedRequirement';
import DiamondRequirement from './requirements/DiamondRequirement';
import FarmPlotsUnlockedRequirement from './requirements/FarmPlotsUnlockedRequirement';
import GymBadgeRequirement from './requirements/GymBadgeRequirement';
import HatchRequirement from './requirements/HatchRequirement';
import MoneyRequirement from './requirements/MoneyRequirement';
import MaxLevelOakItemRequirement from './requirements/MaxLevelOakItemRequirement';
import MaxRegionRequirement from './requirements/MaxRegionRequirement';
import PokeballRequirement from './requirements/PokeballRequirement';
import ProteinObtainRequirement from './requirements/ProteinObtainRequirement';
import QuestRequirement from './requirements/QuestRequirement';
import RouteKillRequirement from './requirements/RouteKillRequirement';
import SeededDateRequirement from './requirements/SeededDateRequirement';
import ShinyPokemonRequirement from './requirements/ShinyPokemonRequirement';
import SubregionRequirement from './requirements/SubregionRequirement';
import TokenRequirement from './requirements/TokenRequirement';
import UndergroundItemsFoundRequirement from './requirements/UndergroundItemsFoundRequirement';
import UndergroundLayersMinedRequirement from './requirements/UndergroundLayersMinedRequirement';
import WeatherRequirement from './requirements/WeatherRequirement';
import { SortModules, SortSaves } from './Sortable';
import KeyItemController from './keyItems/KeyItemController';
import KeyItem from './keyItems/KeyItem';
import KeyItems from './keyItems/KeyItems';
import Achievement from './achievements/Achievement';
import Gems from './gems/Gems';
import QuestLineCompletedRequirement from './requirements/QuestLineCompletedRequirement';
import QuestLineStepCompletedRequirement from './requirements/QuestLineStepCompletedRequirement';
import TemporaryBattleRequirement from './requirements/TemporaryBattleRequirement';
import DayOfWeekRequirement from './requirements/DayOfWeekRequirement';

Object.assign(<any>window, {
    SaveSelector,
    Profile,
    GameConstants,
    GameHelper,
    LogEvent,
    DataStore,
    BadgeCase: DataStore.badge,
    Statistics: DataStore.statistics,
    AuraType,
    BadgeEnums,
    BerryColor,
    BerryType,
    PokemonType,
    CaughtStatus,
    EvolutionType,
    FarmNotificationType,
    FlavorType,
    ItemType,
    KeyItemType,
    MulchType,
    PlotStage,
    BooleanSetting,
    RangeSetting,
    Setting,
    SettingOption,
    WeatherType,
    Weather,
    SeededRand,
    SeededDateRand,
    Rand,
    Settings,
    NotificationConstants,
    Notifier,
    SortOptionConfigs,
    SortOptions,
    AchievementSortOptionConfigs,
    AchievementSortOptions,
    LogBook,
    LogBookTypes,
    ChangelogItems,
    RedeemableCode,
    RedeemableCodes,
    RedeemableCodeController,
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
    Routes,
    SubRegion,
    SubRegions,
    AlolaSubRegions,
    Requirement,
    AchievementRequirement,
    NullRequirement,
    MultiRequirement,
    OneFromManyRequirement,
    AttackRequirement,
    BattleFrontierHighestStageRequirement,
    BattleFrontierTotalStageRequirement,
    BerriesUnlockedRequirement,
    CapturedRequirement,
    CaughtPokemonRequirement,
    ClearDungeonRequirement,
    ClearGymRequirement,
    ClickRequirement,
    DefeatedRequirement,
    DiamondRequirement,
    FarmPlotsUnlockedRequirement,
    GymBadgeRequirement,
    HatchRequirement,
    MoneyRequirement,
    MaxLevelOakItemRequirement,
    MaxRegionRequirement,
    PokeballRequirement,
    ProteinObtainRequirement,
    QuestRequirement,
    RouteKillRequirement,
    SeededDateRequirement,
    ShinyPokemonRequirement,
    SubregionRequirement,
    TokenRequirement,
    UndergroundItemsFoundRequirement,
    UndergroundLayersMinedRequirement,
    WeatherRequirement,
    SortModules,
    SortSaves,
    KeyItemController,
    KeyItem,
    KeyItems,
    Achievement,
    Gems,
    QuestLineCompletedRequirement,
    QuestLineStepCompletedRequirement,
    TemporaryBattleRequirement,
    DayOfWeekRequirement,
});
