import { AchievementOption } from '../GameConstants';
import QuestLineState from '../quests/QuestLineState';
import Requirement from './Requirement';

export default class QuestLineRequirement extends Requirement {
    private questLineName: string;

    constructor(questLineName: string, option: AchievementOption = AchievementOption.more) {
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
