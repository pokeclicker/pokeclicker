import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';
import type { TmpQuestType } from '../TemporaryScriptTypes';

import Requirement from './Requirement';

export default class QuestLineCompletedRequirement extends Requirement {
    cachedQuest: TmpQuestType;
    get quest() {
        if (!this.cachedQuest) {
            this.cachedQuest = App.game.quests.getQuestLine(this.questLineName);
        }
        return this.cachedQuest;
    }

    constructor(private questLineName: QuestLineNameType, option = AchievementOption.equal) {
        super(1, option);
    }

    public getProgress(): number {
        return this.quest.state() === QuestLineState.ended ? 1 : 0;
    }

    public hint(): string {
        return `Questline ${this.quest.displayName} needs to be ${this.option !== AchievementOption.less ? 'completed' : 'incomplete'}.`;
    }
}
