// TODO: Remove temporary code after all code in ../scripts has been ported.
// This is only here so that the code in ../scripts can use the new functionality

import DataStore from './DataStore';
import * as GameConstants from './GameConstants';
import GameHelper from './GameHelper';
import BadgeEnums from './enums/Badges';
import PokemonType from './enums/PokemonType';
import ItemType from './enums/ItemType';
import BooleanSetting from './settings/BooleanSetting';
import RangeSetting from './settings/RangeSetting';
import Setting from './settings/Setting';
import SettingOption from './settings/SettingOption';

Object.assign(<any>window, {
    GameConstants,
    GameHelper,
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
});
