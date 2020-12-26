///<reference path="Requirement.ts"/>

class QuestLineRequirement extends Requirement {
    private questLineName: string;

    constructor(questLineName: string, option: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(1, option, GameConstants.AchievementType.None);
        this.questLineName = questLineName;
    }

    public getProgress() {

        return +(App.game.quests.getQuestLine(this.questLineName).state() == QuestLineState.ended);
    }

    public hint(): string {
        return `The ${this.questLineName} quest line needs to be completed first.`;
    }
}
