import { QuestLineNameType } from '../quests/QuestLineNameType';
import { ShopOptions } from './types';
import { AchievementOption, Currency } from '../GameConstants';
import CollectibleItem from './CollectibleItem';
import QuestLineCompletedRequirement from '../requirements/QuestLineCompletedRequirement';

export default class QuestItem extends CollectibleItem {
    constructor(
        name: string,
        displayName : string,
        description : string,
        questlineName : QuestLineNameType,
        basePrice?: number,
        currency?: Currency,
        options?: ShopOptions,
    ) {
        const req = new QuestLineCompletedRequirement(questlineName, AchievementOption.less);
        super(name, displayName, description, req, basePrice, currency, { maxAmount: 1, ...options });
    }

    isSoldOut(): boolean {
        return player.itemList[this.name]() >= this.maxAmount;
    }

}
