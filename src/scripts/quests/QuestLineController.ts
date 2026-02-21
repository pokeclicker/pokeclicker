class QuestLineController  {
    public static questLineObservable: KnockoutObservable<QuestLine> = ko.observable(null);
    public static questStepObservable: KnockoutObservable<Quest> = ko.observable(null);

    public static showQuestLineDetailsModal(questLine: QuestLine) {
        this.questLineObservable(questLine);
        $('#questLineDetailsModal').modal('show').one('hidden.bs.modal', () => QuestLineController.questLineObservable(null));
    }

    public static showQuestStepClearedModal(quest: Quest) {
        this.questStepObservable(quest);
        $('#questStepClearedModal').modal('show').one('hidden.bs.modal', () => QuestLineController.questStepObservable(null));
    }
}
