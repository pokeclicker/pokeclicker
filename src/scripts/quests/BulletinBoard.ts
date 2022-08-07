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
        if (this.getQuests().filter((q) => q.state() == QuestLineState.inactive).length) {
            return areaStatus.unlockedUnfinished;
        }
        return areaStatus.completed;
    }

    public getQuests() {
        return App.game.quests.questLines().filter(q => {
            if (q.state() == QuestLineState.ended) {
                return false;
            }
            if (q.requirements ? !q.requirements.every((r) => r.isCompleted()) : false) {
                return false;
            }
            if (q.bulletinBoard !== GameConstants.BulletinBoards.All && q.bulletinBoard !== this.board) {
                return false;
            }
            return true;
        });
    }

    constructor(public board: GameConstants.BulletinBoards) {
        super();
    }

}
