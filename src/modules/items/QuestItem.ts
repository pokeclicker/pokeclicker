import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';
import Item from './Item';
import { ShopOptions } from './types';
import { Currency } from '../GameConstants';

export default class QuestItem extends Item {
    constructor(
        name: string,
        displayName : string,
        description : string,
        private questlineName : QuestLineNameType,
        private endQuestlineName = questlineName,
        basePrice?: number,
        currency?: Currency,
        options?: ShopOptions,
    ) {
        super(name, basePrice, currency, { maxAmount: 1, ...options }, displayName, description, 'quest');
    }

    public isActive() : boolean {
        return App.game.quests.getQuestLine(this.questlineName).state() > QuestLineState.inactive &&
            App.game.quests.getQuestLine(this.endQuestlineName).state() < QuestLineState.ended;
    }

    isSoldOut(): boolean {
        return player.itemList[this.name]() > 0;
    }

}
