import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';
import { QuestLineNameType } from '../quests/QuestLineNameType';
import type { TmpQuestType } from '../TemporaryScriptTypes';

import Requirement from './Requirement';

export default class QuestLineStepCompletedRequirement extends Requirement {
    cachedQuest: TmpQuestType;
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
        if (typeof this.questIndex === 'function') {
            return this.option !== AchievementOption.less ? `Progress further in questline ${this.quest.displayName}.` : `Questline ${this.quest.displayName} has progressed past this point.`;
        } else {
            const questStep = this.questIndex;
            return this.option !== AchievementOption.less ? `Complete step ${questStep + 1} in the ${this.quest.displayName} quest line.` : `Must have not progressed beyond step ${questStep} in questline ${this.quest.displayName}.`;
        }
    }
}
