import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';
import Item from './Item';
import { ShopOptions } from './types';
import { AchievementOption, Currency } from '../GameConstants';
import MultiRequirement from '../requirements/MultiRequirement';
import QuestLineStartedRequirement from '../requirements/QuestLineStartedRequirement';
import Requirement from '../requirements/Requirement';
import CollectibleItem from './CollectibleItem';

export default class QuestItem extends CollectibleItem {
    constructor(
        name: string,
        displayName : string,
        description : string,
        private questlineName : QuestLineNameType,
        private endQuestlineName : QuestLineNameType | false = questlineName, // false means no end
        basePrice?: number,
        currency?: Currency,
        options?: ShopOptions,
    ) {
        let req : Requirement = new QuestLineStartedRequirement(questlineName);
        if (endQuestlineName) {
            req = new MultiRequirement([req, new QuestLineStartedRequirement(endQuestlineName, AchievementOption.less)]);
        }
        super(name, displayName, description, req, basePrice, currency, options);
    }

    isSoldOut(): boolean {
        return player.itemList[this.name]() > 0;
    }

}
