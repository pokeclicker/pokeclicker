import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';

import Requirement from './Requirement';

export default class QuestLineStepCompletedRequirement extends Requirement {
    cachedQuest: any;
    get quest() {
        if (!this.cachedQuest) {
            this.cachedQuest = App.game.quests.getQuestLine(this.questLineName);
        }
        return this.cachedQuest;
    }

    constructor(private questLineName: QuestLineNameType, private questIndex: (() => number) | number, option = AchievementOption.equal) {
        super(1, option);
    }

    public getProgress(): number {
        let questIndex = typeof this.questIndex === 'number' ? this.questIndex : (typeof this.questIndex === 'function' ? this.questIndex() : 0);
        return (this.quest.state() === QuestLineState.ended || this.quest.curQuest() > questIndex) ? 1 : 0;
    }

    public isCompleted() {
        return this.quest.state() == QuestLineState.suspended ? false : super.isCompleted();
    }

    public hint(): string {
        return this.option !== AchievementOption.less ? `Progress further in questline ${this.questLineName}.` : `Questline ${this.questLineName} has progressed past this point.`;
    }
}
