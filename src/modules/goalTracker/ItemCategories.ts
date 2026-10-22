import { ItemList } from '../items/ItemList';
import BattleItem from '../items/BattleItem';
import Item from '../items/Item';
import EnergyRestore from '../items/EnergyRestore';
import MulchItem from '../items/MulchItem';
import PokeballItem from '../items/PokeballItem';
import { MulchShovelItem, ShovelItem } from '../items/ShovelItem';
import EggItem from '../items/EggItem';
import TreasureItem from '../items/TreasureItem';
import Consumable from '../items/Consumable';
import UndergroundItemValueType from '../enums/UndergroundItemValueType';
import Vitamin from '../items/Vitamin';
import { TmpEvolutionStoneType } from '../TemporaryScriptTypes';
import { HeldItem } from '../items/HeldItem';

interface ItemCategoryDefinition {
    key: string;
    label: string;
    filter: (item: Item) => boolean;
}

export const itemCategoryDefinitions: ItemCategoryDefinition[] = [
    { key: 'battleItem', label: 'Battle Item', filter: (i) => i instanceof BattleItem },
    { key: 'energyRestore', label: 'Energy Restore', filter: (i) => i instanceof EnergyRestore },
    { key: 'mulch', label: 'Mulch', filter: (i) => i instanceof MulchItem },
    { key: 'pokeBall', label: 'Poké Ball', filter: (i) => i instanceof PokeballItem },
    { key: 'shovel', label: 'Shovel', filter: (i) => i instanceof ShovelItem || i instanceof MulchShovelItem },
    { key: 'egg', label: 'Egg', filter: (i) => i instanceof EggItem },
    { key: 'vitamin', label: 'Vitamin', filter: (i) => i instanceof Vitamin },
    { key: 'consumable', label: 'Consumable', filter: (i) => i instanceof Consumable },
    { key: 'treasure', label: 'Underground Treasure', filter: (i) => i instanceof TreasureItem &&
        (i.valueType === UndergroundItemValueType.Diamond || i.valueType === UndergroundItemValueType.Special) },
    { key: 'plate', label: 'Gem Plate', filter: (i) => i instanceof TreasureItem && i.valueType === UndergroundItemValueType.Gem },
    { key: 'fossil', label: 'Fossil', filter: (i) => i instanceof TreasureItem &&
        (i.valueType === UndergroundItemValueType.Fossil || i.valueType === UndergroundItemValueType.FossilPiece) },
    { key: 'shard', label: 'Shard', filter: (i) => i instanceof TreasureItem && i.valueType === UndergroundItemValueType.Shard },
    { key: 'heldItem', label: 'Held Item', filter: (i) => i instanceof HeldItem && (i.isUnlocked() || i.getBagAmount() > 0) },
    { key: 'evolutionStone', label: 'Evolution Stone', filter: (i) => i instanceof EvolutionStone && ((i as TmpEvolutionStoneType).unlockedRegion <= player.highestRegion() || i.getBagAmount() > 0) },
    //{ key: 'quest', label: 'Quest', filter: (i) => i.name === 'Wishing_Piece' },
];

type ItemCategory = typeof itemCategoryDefinitions[number]['key'];

export const itemsByCategory = ko.pureComputed((): Record<ItemCategory, Item[]> => {
    const categorized: Record<ItemCategory, Item[]> = Object.fromEntries(
        itemCategoryDefinitions.map(def => [def.key, []]),
    ) as Record<ItemCategory, Item[]>;

    for (const item of Object.values(ItemList)) {
        if (!item.isVisible()) continue;

        const def = itemCategoryDefinitions.find(definition => definition.filter(item));
        if (def) {
            categorized[def.key].push(item);
        }
    }
    return categorized;
});
