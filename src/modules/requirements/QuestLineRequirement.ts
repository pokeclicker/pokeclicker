import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';

import Requirement from './Requirement';

export default class QuestLineRequirement extends Requirement {
    private questLineName: QuestLineNameType;

    constructor(questLineName: QuestLineNameType, option: AchievementOption = AchievementOption.more) {
        super(1, option);
        this.questLineName = questLineName;
    }

    public getProgress() {
        return +(App.game.quests.getQuestLine(this.questLineName).state() === QuestLineState.ended);
    }

    public hint(): string {
        return `The ${this.questLineName} quest line needs to be completed first.`;
    }
}
