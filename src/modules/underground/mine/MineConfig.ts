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

MineConfigs.add({ type: MineType.Random, displayName: 'Chaos Cavern',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => ![UndergroundItemValueType.MegaStone, UndergroundItemValueType.Special].includes(item.valueType)),
});
MineConfigs.add({ type: MineType.Diamond, displayName: 'Treasure Trove',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Diamond),
});
MineConfigs.add({ type: MineType.GemPlate, displayName: 'Arceus\' Forge',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Gem),
});
MineConfigs.add({ type: MineType.Shard, displayName: 'Fractured Quarry',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Shard),
});
MineConfigs.add({ type: MineType.Fossil, displayName: 'Ancient Excavation',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Fossil || item.valueType === UndergroundItemValueType.FossilPiece),
});
MineConfigs.add({ type: MineType.EvolutionItem, displayName: 'Evolution Nexus',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.EvolutionItem),
});
MineConfigs.add({ type: MineType.Special, displayName: 'Mystery Mine',
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => [UndergroundItemValueType.MegaStone, UndergroundItemValueType.Special].includes(item.valueType)),
    fixedItemCount: 1,
});
