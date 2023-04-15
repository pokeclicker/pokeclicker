import QuestLineState from '../quests/QuestLineState';
import Item from './Item';

export default class QuestItem extends Item {
    constructor(name: string, displayName : string, description : string, private questlineName : string, private endQuestlineName : string = undefined) {
        super(name, undefined, undefined, undefined, displayName, description, 'quest');
        endQuestlineName = endQuestlineName ?? questlineName;
    }

    public isActive() : boolean {
        return App.game.quests.getQuestLine(this.questlineName).state() > QuestLineState.inactive &&
            App.game.quests.getQuestLine(this.endQuestlineName).state() < QuestLineState.ended;
    }
}
