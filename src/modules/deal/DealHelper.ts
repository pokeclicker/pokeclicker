import { BattleItemType, StoneType } from '../GameConstants';
import GameHelper from '../GameHelper';
import BerryType from '../enums/BerryType';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Item from '../items/Item';
import { ItemList } from '../items/ItemList';
import UndergroundItems from '../underground/UndergroundItems';
import SeededRand from '../utilities/SeededRand';

export default class DealHelper {
    public static randomBerry(berryList: BerryType[]): BerryType {
        return SeededRand.fromArray(berryList);
    }

    public static randomBattleItem(): Item {
        const battleItem = SeededRand.fromArray(GameHelper.enumStrings(BattleItemType));
        return ItemList[battleItem];
    }

    public static randomEvoItem(): Item {
        const evoItem = SeededRand.fromArray(
            GameHelper.enumStrings(StoneType).filter(name => !([
                'None', 'Black_DNA', 'White_DNA', 'Solar_light', 'Key_stone',
                'Lunar_light', 'Pure_light', 'Crystallized_shadow',
                'Black_mane_hair', 'White_mane_hair',
            ]).includes(name)),
        );
        return ItemList[evoItem];
    }

    public static randomUndergroundItem(): Item {
        const uItem = SeededRand.fromArray(
            UndergroundItems.list.filter(item =>
                item.valueType !== UndergroundItemValueType.MegaStone &&
                item.valueType !== UndergroundItemValueType.Special),
        ).itemName;
        return ItemList[uItem];
    }
}
