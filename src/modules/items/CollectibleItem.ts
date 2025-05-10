import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';
import Item from './Item';
import { ShopOptions } from './types';
import { AchievementOption, Currency } from '../GameConstants';
import MultiRequirement from '../requirements/MultiRequirement';
import QuestLineStartedRequirement from '../requirements/QuestLineStartedRequirement';
import Requirement from '../requirements/Requirement';

export default class CollectibleItem extends Item {
    constructor(
        name: string,
        displayName : string,
        description : string,
        requirement: Requirement,
        basePrice?: number,
        currency?: Currency,
        options?: ShopOptions,
    ) {
        super(name, basePrice, currency, { ...options, visible: requirement }, displayName, description, 'collectible');
    }

}
