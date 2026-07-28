import { AchievementOption, AchievementType } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';
import type { TmpQuestType } from '../TemporaryScriptTypes';

import AchievementRequirement from './AchievementRequirement';

export default class QuestLineCompletedRequirement extends AchievementRequirement {
    cachedQuest: TmpQuestType;
    get quest() {
        if (!this.cachedQuest) {
            this.cachedQuest = App.game.quests.getQuestLine(this.questLineName);
        }
        return this.cachedQuest;
    }

    constructor(private questLineName: QuestLineNameType, option = AchievementOption.equal) {
        super(1, option, AchievementType.Quest);
    }

    public getProgress(): number {
        // Quest lines may not be loaded yet when achievements are first evaluated
        return this.quest?.state() === QuestLineState.ended ? 1 : 0;
    }

    public hint(): string {
        return `Questline ${this.quest?.displayName ?? this.questLineName} needs to be ${this.option !== AchievementOption.less ? 'completed' : 'incomplete'}.`;
    }
}
