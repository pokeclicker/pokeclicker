class BulletinBoard extends TownContent {
    public static selectedBulletinBoard: KnockoutObservable<BulletinBoard> = ko.observable(undefined);

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
        BulletinBoard.selectedBulletinBoard(this);
        $('#bulletinBoardModal').modal('show');
    }
    public areaStatus() {
        if (this.getQuests().length) {
            return areaStatus.unlockedUnfinished;
        }
        return areaStatus.completed;
    }

    public getQuests() {
        return App.game.quests.questLines().filter(q => q.state() == QuestLineState.onBulletinBoard &&
            (q.bulletinBoard == GameConstants.BulletinBoards.All ||
            q.bulletinBoard == this.board));
    }

    constructor(public board: GameConstants.BulletinBoards) {
        super();
    }

}
