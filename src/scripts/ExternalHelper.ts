class ExternalHelper {
    private static townCache: {[name: string] : boolean} = {};
    private static questlineCache: {[name: string] : boolean} = {};

    public static isInLiveVersion(content: Town | QuestLine) {
        if (content instanceof Town) {
            if (ExternalHelper.townCache[content.name] == undefined) {
                ExternalHelper.townCache[content.name] = ExternalHelper.containsDevRequirement(content.requirements);
            }
            return !ExternalHelper.townCache[content.name];
        }
        if (content instanceof QuestLine) {
            if (ExternalHelper.questlineCache[content.name] == undefined) {
                ExternalHelper.questlineCache[content.name] = ExternalHelper.containsDevRequirement(content.requirements);
            }
            return !ExternalHelper.questlineCache[content.name];
        }
        return true;
    }

    private static containsDevRequirement(requirements?: Requirement | Requirement[]) {
        if (!requirements) {
            return false;
        }
        if (requirements instanceof Requirement) {
            requirements = [requirements];
        }


        requirements.forEach((r) => {
            if (r instanceof DevelopmentRequirement) {
                return true;
            }
            if (r instanceof QuestLineCompletedRequirement) {
                return ExternalHelper.isInLiveVersion(App.game.quests.getQuestLine(r.quest));
            }
            if (r instanceof QuestLineStartedRequirement) {
                return ExternalHelper.isInLiveVersion(App.game.quests.getQuestLine(r.quest));
            }
            if (r instanceof QuestLineStepCompletedRequirement) {
                return ExternalHelper.isInLiveVersion(App.game.quests.getQuestLine(r.quest));
            }
        });
    }
}
