import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';

import Requirement from './Requirement';

export default class QuestLineStepCompletedRequirement extends Requirement {
    cachedQuest: any;
    get quest() {
        if (!this.cachedQuest) {
            this.cachedQuest = App.game.quests.getQuestLine(this.questLineName);
        }
        return this.cachedQuest;
    }

    constructor(private questLineName: string, private questIndex: (() => number) | number, option = AchievementOption.equal) {
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
        return `Progress further in questline ${this.questLineName}.`;
    }
}
