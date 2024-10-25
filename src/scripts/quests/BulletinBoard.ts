class BulletinBoard extends TownContent {
    public static selectedBulletinBoard: KnockoutObservable<BulletinBoard> = ko.observable(undefined);

    public static getLocation(bulletinBoard: GameConstants.BulletinBoards) {
        switch (bulletinBoard) {
            case GameConstants.BulletinBoards.Sevii4567:
                return 'Sevii Islands 4567';
            case GameConstants.BulletinBoards.Hoppy:
                return 'Magikarp Jump';
            case GameConstants.BulletinBoards.Armor:
                return 'Isle of Armor';
            case GameConstants.BulletinBoards.Crown:
                return 'Crown Tundra';
            default:
                return GameConstants.BulletinBoards[bulletinBoard];
        }
    }


    public cssClass() {
        return 'btn btn-secondary';
    }
    public text(): string {
        return 'Bulletin Board';
    }
    public onclick(): void {
        BulletinBoard.selectedBulletinBoard(this);
        $('#bulletinBoardModal').modal('show');
    }
    public areaStatus() {
        if (this.getQuests().filter((q) => q.state() == QuestLineState.inactive).length) {
            return [areaStatus.incomplete];
        }
        return [areaStatus.completed];
    }

    public getQuests() {
        return App.game.quests.questLines().filter(q => {
            if (q.state() == QuestLineState.ended) {
                return false;
            }
            if (q.requirement ? (!q.requirement.isCompleted() && q.state() !== QuestLineState.suspended) : false) {
                return false;
            }
            if (q.bulletinBoard !== GameConstants.BulletinBoards.All && q.bulletinBoard !== this.board) {
                return false;
            }
            return true;
        });
    }

    constructor(public board: GameConstants.BulletinBoards) {
        super([new QuestLineCompletedRequirement('Tutorial Quests')]);
    }

}
