import UndergroundItems from '../UndergroundItems';
import UndergroundItemValueType from '../../enums/UndergroundItemValueType';
import UndergroundItem from '../UndergroundItem';

export enum MineType {
    Random,
    Diamond,
    GemPlate,
    Shard,
    Fossil,
    EvolutionItem,
    Special,
}

export interface MineConfig {
    type: MineType;
    displayName: string;
    getAvailableItems: () => UndergroundItem[];
    fixedItemCount?: number;
}

export class MineConfigs {
    private static _list: Array<MineConfig> = [];

    public static add(config: MineConfig) {
        this._list.push(config);
    }

    public static find(type: MineType): MineConfig {
        return this._list.find(config => config.type === type) || this._list[0];
    }
}

MineConfigs.add({ type: MineType.Random, displayName: 'Random',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => ![UndergroundItemValueType.MegaStone, UndergroundItemValueType.Special].includes(item.valueType)),
});
MineConfigs.add({ type: MineType.Diamond, displayName: 'Diamond',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Diamond),
});
MineConfigs.add({ type: MineType.GemPlate, displayName: 'Gem plate',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Gem),
});
MineConfigs.add({ type: MineType.Shard, displayName: 'Shard',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Shard),
});
MineConfigs.add({ type: MineType.Fossil, displayName: 'Fossil',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Fossil || item.valueType === UndergroundItemValueType.FossilPiece),
});
MineConfigs.add({ type: MineType.EvolutionItem, displayName: 'Evolution item',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.EvolutionItem),
});
MineConfigs.add({ type: MineType.Special, displayName: 'Special',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => [UndergroundItemValueType.MegaStone, UndergroundItemValueType.Special].includes(item.valueType)),
    fixedItemCount: 1,
});
