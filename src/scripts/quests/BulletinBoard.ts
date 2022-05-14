class BulletinBoard extends TownContent {
    public cssClass() {
        return 'btn btn-secondary';
    }
    public text(): string {
        return 'Bulletin board';
    }
    public isVisible(): boolean {
        return true;
    }
    public onclick(): void {
        $('#bulletinBoardModal').modal('show');
    }

    public areaStatus() {
        if (App.game.quests.questLines().some(q => q.state() == QuestLineState.onBulletinBoard)) {
            return areaStatus.unlockedUnfinished;
        }
        return areaStatus.completed;
    }

}
