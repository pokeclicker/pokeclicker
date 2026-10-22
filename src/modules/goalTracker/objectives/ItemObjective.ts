import { Observable } from 'knockout';
import { ItemList } from '../../items/ItemList';
import { ItemNameType } from '../../items/ItemNameType';
import { pluralizeString } from '../../GameConstants';
import { itemCategoryDefinitions, itemsByCategory } from '../ItemCategories';
import { ObjectiveOption } from './ObjectiveTypes';

export interface ItemObjectiveConfig {
    category: Observable<string>;
    item: Observable<ItemNameType>;
}

export const itemObjectiveOption: ObjectiveOption<ItemObjectiveConfig> = {
    options: [
        {
            key: 'category',
            label: 'Category',
            values: () => {
                const categorized = itemsByCategory();
                return itemCategoryDefinitions
                    .filter(def => categorized[def.key].length > 0)
                    .map(def => ({ name: def.label, value: def.key }))
                    .sort((a, b) => a.name.localeCompare(b.name));
            },
        },
        {
            key: 'item',
            label: 'Item',
            searchable: true,
            values: (config: ItemObjectiveConfig) => {
                const category = config.category?.();
                if (!category) {
                    return [];
                }

                return [...itemsByCategory()[category]]
                    .sort((a, b) => a.displayName.localeCompare(b.displayName))
                    .map(item => ({ name: item.displayName, value: item.name }));
            },
        },
    ],
    getProgress: (config: ItemObjectiveConfig): number => {
        return ItemList[config.item?.()]?.getBagAmount() ?? 0;
    },
    createConfig: (): ItemObjectiveConfig => {
        const item = ko.observable();
        const category = ko.observable().extend({ clearDependent: item }); // clear item if the category changes
        return { category, item };
    },
    getDisplayName: (config: ItemObjectiveConfig) => {
        const itemName = ItemList[config.item()]?.displayName;
        if (!itemName) return 'Unconfigured Objective';
        return `${pluralizeString(itemName, 2)}`;
    },
};
