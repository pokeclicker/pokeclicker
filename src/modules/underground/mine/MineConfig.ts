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
    getAvailableItems: () => UndergroundItem[];
    fixedItemCount?: number;
}

export const RandomMineConfig: MineConfig = {
    type: MineType.Random,
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => ![UndergroundItemValueType.MegaStone].includes(item.valueType)),
};

export const DiamondMineConfig: MineConfig = {
    type: MineType.Diamond,
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Diamond),
};

export const GemPlateMineConfig: MineConfig = {
    type: MineType.GemPlate,
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Gem),
};

export const ShardMineConfig: MineConfig = {
    type: MineType.Shard,
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Shard),
};

export const FossilMineConfig: MineConfig = {
    type: MineType.Fossil,
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.Fossil || item.valueType === UndergroundItemValueType.FossilPiece),
};

export const EvolutionItemMineConfig: MineConfig = {
    type: MineType.EvolutionItem,
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.EvolutionItem),
};

export const SpecialMineConfig: MineConfig = {
    type: MineType.Special,
    getAvailableItems: () => UndergroundItems.getUnlockedItems().filter(item => item.valueType === UndergroundItemValueType.MegaStone),
    fixedItemCount: 1,
};
