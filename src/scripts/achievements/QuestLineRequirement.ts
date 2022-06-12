///<reference path="../../declarations/requirements/Requirement.d.ts"/>

class QuestLineRequirement extends Requirement {
    private questLineName: string;

    constructor(questLineName: string, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(1, option);
        this.questLineName = questLineName;
    }

    public getProgress() {

        return +(App.game.quests.getQuestLine(this.questLineName).state() == QuestLineState.ended);
    }

    public hint(): string {
        return `The ${this.questLineName} quest line needs to be completed first.`;
    }
}
