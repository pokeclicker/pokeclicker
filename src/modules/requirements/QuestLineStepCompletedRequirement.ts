import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';

import Requirement from './Requirement';

export default class QuestLineStepCompletedRequirement extends Requirement {
    questLineName: string;
    questIndex: number;

    constructor(questLineName: string, questIndex: number, option = AchievementOption.equal) {
        super(1, option);
        this.questLineName = questLineName;
        this.questIndex = questIndex;
    }

    public getProgress(): number {
        return (App.game.quests.getQuestLine(this.questLineName).state() === QuestLineState.ended || App.game.quests.getQuestLine(this.questLineName).curQuest() > this.questIndex) ? 1 : 0;
    }

    public hint(): string {
        return `Progress further in questline ${this.questLineName}.`;
    }
}
