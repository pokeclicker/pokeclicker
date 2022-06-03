import { AchievementOption } from '../GameConstants';

import Requirement from './Requirement';

export default class QuestLineStepCompletedRequirement extends Requirement {
    questLineName: string;
    questIndex: number;

    constructor(questLineName: string, questIndex: number) {
        super(1, AchievementOption.equal);
        this.questLineName = questLineName;
        this.questIndex = questIndex;
    }

    public getProgress(): number {
        return App.game.quests.getQuestLine(this.questLineName).quests()[this.questIndex].isCompleted() ? 1 : 0;
    }

    public hint(): string {
        return `Progress further in questline ${this.questLineName}.`;
    }
}
