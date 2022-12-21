import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';

import Requirement from './Requirement';

export default class QuestLineStartedRequirement extends Requirement {
    cachedQuest: any;
    get quest() {
        if (!this.cachedQuest) {
            this.cachedQuest = App.game.quests.getQuestLine(this.questLineName);
        }
        return this.cachedQuest;
    }

    constructor(private questLineName: string, option = AchievementOption.equal) {
        super(1, option);
    }

    public getProgress(): number {
        return (this.quest.state() === QuestLineState.started
            || this.quest.state() === QuestLineState.ended)
            ? 1 : 0;
    }

    public hint(): string {
        return `Questline ${this.questLineName} needs to be started.`;
    }
}
